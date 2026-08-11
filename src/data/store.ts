import { DeveloperProfile, WebsiteProject, Testimonial, SkillItem, MediaItem } from '../types';
import { INITIAL_PROFILE, INITIAL_PROJECTS, INITIAL_TESTIMONIALS, INITIAL_SKILLS, INITIAL_MEDIA } from './initialData';

const PROFILE_KEY = 'aetora_profile_v2';
const PROJECTS_KEY = 'aetora_projects_v6';
const TESTIMONIALS_KEY = 'aetora_testimonials_v1';
const SKILLS_KEY = 'aetora_skills_v1';
const MEDIA_KEY = 'aetora_media_v1';

const BROADCAST_CHANNEL_NAME = 'aetora_cms_sync_channel';

// Get profile with fallback
export function getStoredProfile(): DeveloperProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Auto-migrate if stored profile photo is missing, unbundled string or old default
      if (
        !parsed.profilePhotoUrl ||
        parsed.profilePhotoUrl === '/senaf_owner.jpg' ||
        parsed.profilePhotoUrl.includes('photo-1534528741775-53994a69daeb') ||
        parsed.profilePhotoUrl.startsWith('blob:')
      ) {
        parsed.profilePhotoUrl = INITIAL_PROFILE.profilePhotoUrl;
      }
      // Auto-migrate if logoUrl is missing or empty
      if (!parsed.logoUrl || parsed.logoUrl.trim() === '') {
        parsed.logoUrl = INITIAL_PROFILE.logoUrl;
      }
      return { ...INITIAL_PROFILE, ...parsed };
    }
  } catch (e) {
    console.error('Failed to load profile from storage:', e);
  }
  return INITIAL_PROFILE;
}

// Helper for safe localStorage write with QuotaExceededError protection
function safeSetItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e: any) {
    console.error(`Storage save failed for key "${key}":`, e);
    if (
      e?.name === 'QuotaExceededError' ||
      e?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      e?.code === 22 ||
      e?.code === 1014
    ) {
      alert('Browser storage quota reached! Large uploaded images have been kept in session memory. To persist permanently, consider using direct image web URLs (Unsplash/Imgur) or smaller images.');
    }
    return false;
  }
}

// Save profile
export function saveStoredProfile(profile: DeveloperProfile): void {
  const success = safeSetItem(PROFILE_KEY, JSON.stringify(profile));
  if (success) {
    notifyCMSUpdate();
  }
}

// Get projects with fallback
export function getStoredProjects(): WebsiteProject[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p: WebsiteProject) => {
          const initialMatch = INITIAL_PROJECTS.find(item => item.id === p.id);
          if (initialMatch) {
            const isBroken = (url?: string) => !url || url.includes('oakwood_') || url.includes('assets/oakwood') || url.includes('blob:') || url.includes('photo-1523050854058-8df90110c9f1') || url.includes('/src/assets') || url.trim() === '';
            return {
              ...initialMatch,
              ...p,
              previewImageUrl: isBroken(p.previewImageUrl) || p.id === 'oakwood-academy' ? initialMatch.previewImageUrl : p.previewImageUrl,
              screenshotUrls: (!p.screenshotUrls || p.screenshotUrls.length === 0 || p.id === 'oakwood-academy' || p.screenshotUrls.some(isBroken)) ? initialMatch.screenshotUrls : p.screenshotUrls,
              galleryScreenshots: (!p.galleryScreenshots || p.galleryScreenshots.length === 0 || p.id === 'oakwood-academy' || p.galleryScreenshots.some(s => isBroken(s.url))) ? initialMatch.galleryScreenshots : p.galleryScreenshots,
            };
          }
          return p;
        });
      }
    }
  } catch (e) {
    console.error('Failed to load projects from storage:', e);
  }
  return INITIAL_PROJECTS;
}

// Save projects
export function saveStoredProjects(projects: WebsiteProject[]): void {
  const success = safeSetItem(PROJECTS_KEY, JSON.stringify(projects));
  if (success) {
    notifyCMSUpdate();
  }
}

// Get testimonials
export function getStoredTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(TESTIMONIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load testimonials:', e);
  }
  return INITIAL_TESTIMONIALS;
}

// Save testimonials
export function saveStoredTestimonials(testimonials: Testimonial[]): void {
  const success = safeSetItem(TESTIMONIALS_KEY, JSON.stringify(testimonials));
  if (success) {
    notifyCMSUpdate();
  }
}

// Get skills
export function getStoredSkills(): SkillItem[] {
  try {
    const raw = localStorage.getItem(SKILLS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load skills:', e);
  }
  return INITIAL_SKILLS;
}

// Save skills
export function saveStoredSkills(skills: SkillItem[]): void {
  const success = safeSetItem(SKILLS_KEY, JSON.stringify(skills));
  if (success) {
    notifyCMSUpdate();
  }
}

// Get media items
export function getStoredMedia(): MediaItem[] {
  try {
    const raw = localStorage.getItem(MEDIA_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load media items:', e);
  }
  return INITIAL_MEDIA;
}

// Save media items
export function saveStoredMedia(media: MediaItem[]): void {
  const success = safeSetItem(MEDIA_KEY, JSON.stringify(media));
  if (success) {
    notifyCMSUpdate();
  }
}

// Broadcast event to other listeners
function notifyCMSUpdate() {
  window.dispatchEvent(new CustomEvent('aetora_cms_update'));
  try {
    if ('BroadcastChannel' in window) {
      const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      bc.postMessage({ type: 'CMS_UPDATED', timestamp: Date.now() });
      bc.close();
    }
  } catch (e) {
    // Ignore BroadcastChannel errors
  }
}

// Subscribe to live CMS updates
export function subscribeCMSUpdates(callback: () => void): () => void {
  const handleLocal = () => callback();
  window.addEventListener('aetora_cms_update', handleLocal);
  window.addEventListener('storage', handleLocal);

  let bc: BroadcastChannel | null = null;
  try {
    if ('BroadcastChannel' in window) {
      bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
      bc.onmessage = () => callback();
    }
  } catch (e) {
    // Ignore
  }

  return () => {
    window.removeEventListener('aetora_cms_update', handleLocal);
    window.removeEventListener('storage', handleLocal);
    if (bc) {
      bc.close();
    }
  };
}
