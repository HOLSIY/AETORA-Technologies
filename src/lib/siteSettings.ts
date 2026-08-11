import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface SiteSettingsRecord {
  id: string;
  logo_url?: string | null;
  ceo_image_url?: string | null;
  company_name?: string | null;
  owner_name?: string | null;
  owner_title?: string | null;
  phone?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  linkedin?: string | null;
  updated_at?: string | null;
}

const BUCKET_NAME = 'aetora-assets';
const SETTINGS_RECORD_ID = 'global';
const CUSTOM_SUPABASE_KEY = 'aetora_custom_supabase_config';
const CENTRAL_CLOUD_SYNC_URL = 'https://kvdb.io/AETORA_GLOBAL_CMS_V3/global_site_settings';

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

// Canvas Image Compression Helper to keep payloads light and crisp
export async function compressImageFile(
  file: File,
  maxWidth: number = 600,
  maxHeight: number = 600,
  quality: number = 0.85
): Promise<{ file: File; dataUrl: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(mime, quality);
        const compressedFile = dataURLtoFile(dataUrl, file.name);
        resolve({ file: compressedFile, dataUrl });
      };
      img.onerror = () => {
        resolve({ file, dataUrl: (e.target?.result as string) || '' });
      };
      img.src = (e.target?.result as string) || '';
    };
    reader.onerror = () => resolve({ file, dataUrl: '' });
    reader.readAsDataURL(file);
  });
}

// Fetch from Universal Central Cloud Sync endpoint (works on all devices & Vercel)
async function fetchFromCentralCloudSync(): Promise<SiteSettingsRecord | null> {
  try {
    const res = await fetch(CENTRAL_CLOUD_SYNC_URL, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === 'object') {
        return data as SiteSettingsRecord;
      }
    }
  } catch (e) {
    console.warn('Central cloud sync fetch notice:', e);
  }
  return null;
}

// Save to Universal Central Cloud Sync endpoint
async function saveToCentralCloudSync(payload: SiteSettingsRecord): Promise<boolean> {
  try {
    const res = await fetch(CENTRAL_CLOUD_SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    console.warn('Central cloud sync save notice:', e);
    return false;
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

// Fetch global site settings from Supabase Database OR Central Cloud Store
export async function fetchCloudSiteSettings(): Promise<SiteSettingsRecord | null> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('site_settings')
        .select('*')
        .eq('id', SETTINGS_RECORD_ID)
        .maybeSingle();

      if (!error && data) {
        return data as SiteSettingsRecord;
      }
    } catch (err) {
      console.warn('Supabase site_settings fetch notice:', err);
    }
  }

  // Fallback to Central Cloud Sync
  return await fetchFromCentralCloudSync();
}

// Update Database Record (site_settings) in both Supabase & Central Cloud Store
export async function updateCloudSiteSettings(
  updates: Partial<SiteSettingsRecord>
): Promise<{ url: string; success: boolean; error?: string }> {
  const existing = (await fetchCloudSiteSettings()) || { id: SETTINGS_RECORD_ID };
  const payload: SiteSettingsRecord = {
    id: SETTINGS_RECORD_ID,
    ...existing,
    ...updates,
    updated_at: new Date().toISOString(),
  };

  let supabaseSuccess = false;
  const client = getSupabaseClient();
  if (client) {
    try {
      const { error } = await client
        .from('site_settings')
        .upsert(payload, { onConflict: 'id' });

      if (!error) {
        supabaseSuccess = true;
      } else {
        console.warn('Supabase DB update notice:', error.message);
      }
    } catch (err) {
      console.warn('Supabase DB update error:', err);
    }
  }

  // Always sync to Central Cloud Store for universal device access
  const centralSuccess = await saveToCentralCloudSync(payload);

  const targetUrl = updates.logo_url || updates.ceo_image_url || payload.logo_url || payload.ceo_image_url || '';
  const isOk = supabaseSuccess || centralSuccess;

  return {
    url: targetUrl,
    success: isOk,
    error: isOk ? undefined : 'Could not reach persistent cloud store.',
  };
}

// Primary Handler: Compress & Upload image to persistent cloud storage & database
export async function uploadAndSaveCloudImage(
  fileOrBase64: File | string,
  type: 'logo' | 'ceo'
): Promise<{ url: string; success: boolean; error?: string }> {
  let finalFile: File;
  let compressedDataUrl = '';

  if (typeof fileOrBase64 === 'string') {
    if (fileOrBase64.startsWith('data:')) {
      const isJpg = fileOrBase64.includes('image/jpeg') || fileOrBase64.includes('image/jpg');
      const ext = isJpg ? 'jpg' : 'png';
      const rawFile = dataURLtoFile(fileOrBase64, `${type}_${Date.now()}.${ext}`);
      const compressed = await compressImageFile(rawFile, type === 'logo' ? 500 : 600, type === 'logo' ? 500 : 600);
      finalFile = compressed.file;
      compressedDataUrl = compressed.dataUrl;
    } else {
      // Direct URL string passed
      const dbField = type === 'logo' ? 'logo_url' : 'ceo_image_url';
      return await updateCloudSiteSettings({ [dbField]: fileOrBase64 });
    }
  } else {
    const compressed = await compressImageFile(fileOrBase64, type === 'logo' ? 500 : 600, type === 'logo' ? 500 : 600);
    finalFile = compressed.file;
    compressedDataUrl = compressed.dataUrl;
  }

  let publicUrl = compressedDataUrl;
  let uploadSuccess = false;

  const client = getSupabaseClient();
  if (client) {
    try {
      await ensureBucket(client);
      const fileExt = finalFile.name.split('.').pop() || 'png';
      const filePath = `${type}/${type}_${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await client.storage
        .from(BUCKET_NAME)
        .upload(filePath, finalFile, {
          cacheControl: '3600',
          upsert: true,
          contentType: finalFile.type,
        });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = client.storage
          .from(BUCKET_NAME)
          .getPublicUrl(uploadData.path);

        if (publicUrlData?.publicUrl) {
          publicUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;
          uploadSuccess = true;
        }
      }
    } catch (e) {
      console.warn('Supabase storage upload fallback:', e);
    }
  }

  // Update central site settings database record
  const dbField = type === 'logo' ? 'logo_url' : 'ceo_image_url';
  const dbResult = await updateCloudSiteSettings({ [dbField]: publicUrl });

  return {
    url: publicUrl,
    success: true,
    error: dbResult.error,
  };
}

