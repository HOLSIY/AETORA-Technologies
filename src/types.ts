export type ProjectCategory = 
  | 'Restaurant'
  | 'Cafe'
  | 'Hospital'
  | 'Hotel'
  | 'School'
  | 'Business'
  | 'Corporate'
  | 'Ecommerce'
  | 'Portfolio'
  | 'Real Estate';

export interface ProjectBadge {
  label: string;
  type: 'featured' | 'premium' | 'responsive' | 'modern' | 'bestseller';
}

export interface GalleryScreenshot {
  id: string;
  url: string;
  title: string;
  caption?: string;
}

export interface WebsiteProject {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  fullDescription: string;
  priceEstimate: string;
  status: 'Available for Purchase' | 'Customizable' | 'Sold' | 'New Release';
  previewImageUrl: string;
  screenshotUrls?: string[];
  galleryScreenshots?: GalleryScreenshot[];
  recreationComponentId: string;
  technologies: string[];
  features: string[];
  badges: ProjectBadge[];
  rating: number;
  reviewsCount: number;
  deliverables: string[];
  includedPages: string[];
  createdAt: string;
  createdBy?: string;
}

export interface SectionOrderItem {
  id: 'hero' | 'showcase' | 'about' | 'testimonials';
  name: string;
  enabled: boolean;
}

export interface DeveloperProfile {
  companyName: string;
  logoUrl?: string;
  ownerName: string;
  ownerTitle: string;
  title: string;
  heroHeadingTitle: string;
  heroHeadingSubtitle: string;
  heroHeadingSuffix: string;
  heroDescription: string;
  bio: string;
  founderBio?: string;
  aboutMission: string;
  aboutVision: string;
  aboutText: string;
  yearsOfExperience: number;
  profilePhotoUrl: string;
  heroBackgroundImageUrl?: string;
  heroBackgroundOverlayOpacity?: number;
  heroBackgroundBlur?: number;
  hero3DEnabled?: boolean;
  hero3DSpeed?: number;
  hero3DParticleCount?: number;
  hero3DGlowStrength?: number;
  sectionsOrder?: SectionOrderItem[];
  email: string;
  phone: string;
  whatsapp: string;
  telegram: string;
  linkedin: string;
  location: string;
  copyrightText: string;
  services: string[];
  technologies: { name: string; category: string; iconName?: string }[];
  stats: { label: string; value: string }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface ServiceDetailItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
}

export interface DesignPrincipleItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'Hero Background' | 'Logo' | 'Portfolio' | 'Gallery' | 'Profile' | 'QR Code' | 'General';
  createdAt: string;
  size?: string;
}

