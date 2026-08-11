import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SiteSettingsRecord {
  id: string;
  logo_url?: string | null;
  ceo_image_url?: string | null;
  updated_at?: string | null;
}

const BUCKET_NAME = 'aetora-assets';
const SETTINGS_RECORD_ID = 'global';
const CUSTOM_SUPABASE_KEY = 'aetora_custom_supabase_config';

// 1. Retrieve Supabase credentials from environment variables or custom config
let envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
let envSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export function getCustomSupabaseCredentials() {
  try {
    const saved = localStorage.getItem(CUSTOM_SUPABASE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return { url: parsed.url, anonKey: parsed.anonKey };
      }
    }
  } catch (e) {
    // Ignore error
  }
  return { url: envSupabaseUrl, anonKey: envSupabaseAnonKey };
}

export function isSupabaseConfigured(): boolean {
  const { url, anonKey } = getCustomSupabaseCredentials();
  return Boolean(url && anonKey && url.startsWith('http'));
}

export function saveCustomSupabaseCredentials(url: string, anonKey: string) {
  if (url && anonKey) {
    localStorage.setItem(CUSTOM_SUPABASE_KEY, JSON.stringify({ url, anonKey }));
  } else {
    localStorage.removeItem(CUSTOM_SUPABASE_KEY);
  }
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getCustomSupabaseCredentials();
  if (!url || !anonKey || !url.startsWith('http')) return null;

  try {
    return createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e);
    return null;
  }
}

// Ensure Storage Bucket exists
async function ensureBucket(client: SupabaseClient) {
  try {
    const { data: buckets } = await client.storage.listBuckets();
    if (buckets && !buckets.some((b) => b.name === BUCKET_NAME)) {
      await client.storage.createBucket(BUCKET_NAME, { public: true });
    }
  } catch (e) {
    // Ignore error if list/create bucket permission is restricted
  }
}

// Fetch global site settings from Supabase Database
export async function fetchCloudSiteSettings(): Promise<SiteSettingsRecord | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('site_settings')
      .select('*')
      .eq('id', SETTINGS_RECORD_ID)
      .maybeSingle();

    if (error) {
      console.warn('Supabase site_settings fetch notice:', error.message);
      return null;
    }

    return data as SiteSettingsRecord;
  } catch (err) {
    console.warn('Failed to fetch site settings from cloud DB:', err);
    return null;
  }
}

// Utility: Convert base64 Data URL to a File
export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

// Update Database Record (site_settings)
export async function updateCloudSiteSettings(
  updates: Partial<SiteSettingsRecord>
): Promise<{ url: string; success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { url: '', success: false, error: 'Supabase is not configured.' };
  }

  try {
    const payload = {
      id: SETTINGS_RECORD_ID,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { error } = await client
      .from('site_settings')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('Failed to update site_settings table:', error);
      return { url: '', success: false, error: error.message };
    }

    const targetUrl = updates.logo_url || updates.ceo_image_url || '';
    return { url: targetUrl, success: true };
  } catch (err: any) {
    console.error('Cloud DB update error:', err);
    return { url: '', success: false, error: err.message };
  }
}

// Primary Handler: Upload image file to Supabase Storage & Save URL to Database
export async function uploadAndSaveCloudImage(
  fileOrBase64: File | string,
  type: 'logo' | 'ceo'
): Promise<{ url: string; success: boolean; error?: string }> {
  const client = getSupabaseClient();
  if (!client) {
    const fallbackUrl = typeof fileOrBase64 === 'string' ? fileOrBase64 : '';
    return {
      url: fallbackUrl,
      success: false,
      error: 'Supabase credentials missing. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    };
  }

  try {
    await ensureBucket(client);

    let fileToUpload: File;
    if (typeof fileOrBase64 === 'string') {
      if (fileOrBase64.startsWith('data:')) {
        const isJpg = fileOrBase64.includes('image/jpeg') || fileOrBase64.includes('image/jpg');
        const ext = isJpg ? 'jpg' : 'png';
        fileToUpload = dataURLtoFile(fileOrBase64, `${type}_${Date.now()}.${ext}`);
      } else {
        // Direct URL passed
        const dbField = type === 'logo' ? 'logo_url' : 'ceo_image_url';
        return await updateCloudSiteSettings({ [dbField]: fileOrBase64 });
      }
    } else {
      fileToUpload = fileOrBase64;
    }

    const fileExt = fileToUpload.name.split('.').pop() || 'png';
    const filePath = `${type}/${type}_${Date.now()}.${fileExt}`;

    // Upload to Supabase Storage bucket
    const { data: uploadData, error: uploadError } = await client.storage
      .from(BUCKET_NAME)
      .upload(filePath, fileToUpload, {
        cacheControl: '3600',
        upsert: true,
        contentType: fileToUpload.type,
      });

    if (uploadError) {
      console.error('Supabase storage upload error:', uploadError);
      return { url: '', success: false, error: uploadError.message };
    }

    // Retrieve public URL
    const { data: publicUrlData } = client.storage
      .from(BUCKET_NAME)
      .getPublicUrl(uploadData.path);

    const publicUrl = publicUrlData.publicUrl;
    // Append timestamp parameter to force browser refresh of modified images
    const finalUrl = `${publicUrl}?t=${Date.now()}`;

    // Save to database table site_settings
    const dbField = type === 'logo' ? 'logo_url' : 'ceo_image_url';
    const dbResult = await updateCloudSiteSettings({ [dbField]: finalUrl });

    return {
      url: finalUrl,
      success: dbResult.success,
      error: dbResult.error,
    };
  } catch (err: any) {
    console.error('Unexpected cloud image upload error:', err);
    return { url: '', success: false, error: err.message || 'Upload error' };
  }
}
