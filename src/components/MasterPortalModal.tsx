import React, { useState, useEffect } from 'react';
import { WebsiteProject, DeveloperProfile, Testimonial, SkillItem, ProjectCategory, MediaItem, GalleryScreenshot } from '../types';
import { ProjectGalleryLightbox } from './ProjectGalleryLightbox';
import {
  saveStoredProfile,
  saveStoredProjects,
  saveStoredTestimonials,
  saveStoredSkills
} from '../data/store';
import {
  isSupabaseConfigured,
  uploadAndSaveCloudImage,
  updateCloudSiteSettings,
  fetchCloudSiteSettings,
  getCustomSupabaseCredentials,
  saveCustomSupabaseCredentials
} from '../lib/siteSettings';
import { useMasterEdit } from './MasterEditContext';
import {
  Lock, Plus, Trash2, Edit3, Upload, Check, X, ShieldCheck, Image as ImageIcon,
  Save, RefreshCw, KeyRound, Building2, User, Star, Layers, Sparkles, LogOut, Download, Search, Sliders, Database,
  ArrowUp, ArrowDown, Eye, EyeOff
} from 'lucide-react';

interface MasterPortalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: WebsiteProject[];
  profile: DeveloperProfile;
  testimonials: Testimonial[];
  skills: SkillItem[];
  onUpdateProjects: (updatedProjects: WebsiteProject[]) => void;
  onUpdateProfile: (updatedProfile: DeveloperProfile) => void;
  onUpdateTestimonials: (updatedTestimonials: Testimonial[]) => void;
  onUpdateSkills: (updatedSkills: SkillItem[]) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'Restaurant',
  'Cafe',
  'Hospital',
  'Hotel',
  'School',
  'Business',
  'Corporate',
  'Ecommerce',
  'Portfolio',
  'Real Estate',
];

export const MasterPortalModal: React.FC<MasterPortalProps> = ({
  isOpen,
  onClose,
  projects,
  profile,
  testimonials,
  skills,
  onUpdateProjects,
  onUpdateProfile,
  onUpdateTestimonials,
  onUpdateSkills,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('aetora_master_auth') === 'true';
  });

  const {
    isVisualEditMode,
    setIsVisualEditMode,
    mediaItems,
    addMediaItem,
    deleteMediaItem,
    openImagePicker
  } = useMasterEdit();

  const [activeTab, setActiveTab] = useState<'company' | 'hero_bg' | 'sections' | 'projects' | 'testimonials' | 'services' | 'images' | 'media' | 'gallery_manager'>('company');
  const [mediaSearch, setMediaSearch] = useState('');
  const [mediaCatFilter, setMediaCatFilter] = useState('All');

  // Gallery Manager State
  const [galleryProjId, setGalleryProjId] = useState<string>('oakwood-academy');
  const [newScrTitle, setNewScrTitle] = useState('');
  const [newScrCaption, setNewScrCaption] = useState('');
  const [newScrUrl, setNewScrUrl] = useState('');
  const [editingScrId, setEditingScrId] = useState<string | null>(null);

  // Forms State
  const [profileForm, setProfileForm] = useState<DeveloperProfile>(profile);
  const [editingProject, setEditingProject] = useState<Partial<WebsiteProject> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [newServiceInput, setNewServiceInput] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);

  // Cloud Storage & Database Sync State
  const [isUploadingCloud, setIsUploadingCloud] = useState(false);
  const [cloudStatusMsg, setCloudStatusMsg] = useState<string | null>(null);
  const [supabaseCreds, setSupabaseCreds] = useState(() => getCustomSupabaseCredentials());
  const [showCloudConfig, setShowCloudConfig] = useState(false);
  const [showSqlSetup, setShowSqlSetup] = useState(false);

  useEffect(() => {
    setProfileForm(profile);
  }, [profile]);

  // Cloud Image Upload Handlers for Logo & CEO Image
  const handleCloudLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCloud(true);
    setCloudStatusMsg('Uploading logo to persistent Supabase Cloud Storage...');

    try {
      const result = await uploadAndSaveCloudImage(file, 'logo');
      if (result.success && result.url) {
        const updated = { ...profileForm, logoUrl: result.url };
        setProfileForm(updated);
        saveStoredProfile(updated);
        onUpdateProfile(updated);
        setCloudStatusMsg('✅ Logo saved persistently in Cloud Storage & Database (site_settings)!');
      } else {
        handleFileUpload(e, 'logo');
        setCloudStatusMsg('⚠️ Local fallback saved. ' + (result.error || 'Configure Supabase credentials for cloud persistence across devices.'));
      }
    } catch (err: any) {
      handleFileUpload(e, 'logo');
      setCloudStatusMsg('⚠️ Upload notice: ' + err.message);
    } finally {
      setIsUploadingCloud(false);
    }
  };

  const handleCloudCeoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingCloud(true);
    setCloudStatusMsg('Uploading CEO image to persistent Supabase Cloud Storage...');

    try {
      const result = await uploadAndSaveCloudImage(file, 'ceo');
      if (result.success && result.url) {
        const updated = { ...profileForm, profilePhotoUrl: result.url };
        setProfileForm(updated);
        saveStoredProfile(updated);
        onUpdateProfile(updated);
        setCloudStatusMsg('✅ CEO Photo saved persistently in Cloud Storage & Database (site_settings)!');
      } else {
        handleFileUpload(e, 'profile');
        setCloudStatusMsg('⚠️ Local fallback saved. ' + (result.error || 'Configure Supabase credentials for cloud persistence across devices.'));
      }
    } catch (err: any) {
      handleFileUpload(e, 'profile');
      setCloudStatusMsg('⚠️ Upload notice: ' + err.message);
    } finally {
      setIsUploadingCloud(false);
    }
  };

  const handleLogoUrlChange = (url: string) => {
    const updated = { ...profileForm, logoUrl: url };
    setProfileForm(updated);
    saveStoredProfile(updated);
    onUpdateProfile(updated);
    if (url.trim()) {
      updateCloudSiteSettings({ logo_url: url });
    }
  };

  const handleCeoUrlChange = (url: string) => {
    const updated = { ...profileForm, profilePhotoUrl: url };
    setProfileForm(updated);
    saveStoredProfile(updated);
    onUpdateProfile(updated);
    if (url.trim()) {
      updateCloudSiteSettings({ ceo_image_url: url });
    }
  };

  const handleSyncCloudSettings = async () => {
    setCloudStatusMsg('Fetching latest site settings from Supabase Cloud DB...');
    const cloudData = await fetchCloudSiteSettings();
    if (cloudData) {
      const updated = { ...profileForm };
      let updatedCount = 0;
      if (cloudData.logo_url) {
        updated.logoUrl = cloudData.logo_url;
        updatedCount++;
      }
      if (cloudData.ceo_image_url) {
        updated.profilePhotoUrl = cloudData.ceo_image_url;
        updatedCount++;
      }
      setProfileForm(updated);
      saveStoredProfile(updated);
      onUpdateProfile(updated);
      setCloudStatusMsg(`✅ Synchronized ${updatedCount} setting(s) from Cloud DB!`);
    } else {
      setCloudStatusMsg('⚠️ Could not fetch settings. Check Supabase connection & site_settings table.');
    }
  };

  const handleSaveSupabaseCredentials = () => {
    saveCustomSupabaseCredentials(supabaseCreds.url, supabaseCreds.anonKey);
    setCloudStatusMsg('✅ Supabase configuration saved! Testing database connection...');
    handleSyncCloudSettings();
  };

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'mastersenaf68' || passcode === 'senaf2026' || passcode === 'master123') {
      setIsAuthenticated(true);
      localStorage.setItem('aetora_master_auth', 'true');
    } else {
      alert('Incorrect Passcode. Valid passcode: mastersenaf68');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aetora_master_auth');
  };

  // Image Upload Handler with Canvas Compression
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'project' | 'profile' | 'hero' | 'preview_center' | 'logo') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxDimension = target === 'profile' || target === 'logo' ? 500 : 1200;
    const quality = 0.8;

    const reader = new FileReader();
    reader.onerror = () => alert('Failed to read uploaded image file.');
    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => alert('Failed to process image format.');
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedUrl = canvas.toDataURL('image/jpeg', quality);
          applyImageTarget(compressedUrl, target);
        } else {
          applyImageTarget(event.target?.result as string, target);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const applyImageTarget = (base64Url: string, target: 'project' | 'profile' | 'hero' | 'preview_center' | 'logo') => {
    setUploadPreview(base64Url);

    if (target === 'project' && editingProject) {
      setEditingProject({ ...editingProject, previewImageUrl: base64Url });
    } else if (target === 'profile') {
      const updated = { ...profileForm, profilePhotoUrl: base64Url };
      setProfileForm(updated);
      saveStoredProfile(updated);
      onUpdateProfile(updated);
    } else if (target === 'hero') {
      const updated = { ...profileForm, heroBackgroundImageUrl: base64Url };
      setProfileForm(updated);
      saveStoredProfile(updated);
      onUpdateProfile(updated);
    } else if (target === 'logo') {
      const updated = { ...profileForm, logoUrl: base64Url };
      setProfileForm(updated);
      saveStoredProfile(updated);
      onUpdateProfile(updated);
    }
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e, 'logo');
  };

  // Default Section Order
  const defaultSections = [
    { id: 'hero' as const, name: 'Hero Landing Section', enabled: true },
    { id: 'showcase' as const, name: 'ENTERPRISE SHOWCASE & DESIGNS', enabled: true },
    { id: 'about' as const, name: 'About AETORA & Technical Capabilities', enabled: true },
    { id: 'testimonials' as const, name: 'Client Reviews & Contact Callout', enabled: true },
  ];

  const currentSections = profileForm.sectionsOrder && profileForm.sectionsOrder.length > 0
    ? profileForm.sectionsOrder
    : defaultSections;

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    const list = [...currentSections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;
    const updatedProfile = { ...profileForm, sectionsOrder: list };
    setProfileForm(updatedProfile);
    onUpdateProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
  };

  const handleToggleSection = (index: number) => {
    const list = currentSections.map((sec, idx) => idx === index ? { ...sec, enabled: !sec.enabled } : sec);
    const updatedProfile = { ...profileForm, sectionsOrder: list };
    setProfileForm(updatedProfile);
    onUpdateProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
  };

  const handleResetSections = () => {
    const updatedProfile = { ...profileForm, sectionsOrder: defaultSections };
    setProfileForm(updatedProfile);
    onUpdateProfile(updatedProfile);
    saveStoredProfile(updatedProfile);
    alert('Section layout restored to default sequence!');
  };

  // Profile / Company Save
  const handleSaveCompany = () => {
    saveStoredProfile(profileForm);
    onUpdateProfile(profileForm);
    alert('AETORA Technologies company details saved and updated live!');
  };

  // Save Project (Add/Edit)
  const handleSaveProject = () => {
    if (!editingProject?.title || !editingProject?.category) {
      alert('Please fill in at least the project title and category.');
      return;
    }

    let updatedList: WebsiteProject[];
    if (editingProject.id) {
      updatedList = projects.map((p) =>
        p.id === editingProject.id ? ({ ...p, ...editingProject } as WebsiteProject) : p
      );
    } else {
      const newProj: WebsiteProject = {
        id: `proj-${Date.now()}`,
        title: editingProject.title || 'New Web Solution',
        subtitle: editingProject.subtitle || 'Built by AETORA Technologies',
        category: (editingProject.category as ProjectCategory) || 'Business',
        description: editingProject.description || 'Custom website design and development.',
        fullDescription: editingProject.fullDescription || 'High-performance responsive platform built for growth.',
        priceEstimate: editingProject.priceEstimate || '$1,200',
        status: editingProject.status || 'Available for Purchase',
        previewImageUrl: editingProject.previewImageUrl || uploadPreview || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
        recreationComponentId: editingProject.recreationComponentId || 'generic',
        technologies: editingProject.technologies || ['React', 'Tailwind CSS', 'TypeScript'],
        features: editingProject.features || ['Responsive Design', 'Fast Load Times', 'SEO Optimized'],
        badges: [{ label: 'NEW', type: 'featured' }, { label: 'PREMIUM', type: 'premium' }],
        rating: 5.0,
        reviewsCount: 1,
        deliverables: ['Full Source Code', 'Figma Files', 'Cloud Deployment'],
        includedPages: ['Home', 'About', 'Services', 'Contact'],
        createdAt: new Date().toISOString().split('T')[0],
        createdBy: 'AETORA Technologies',
      };
      updatedList = [newProj, ...projects];
    }

    saveStoredProjects(updatedList);
    onUpdateProjects(updatedList);
    setEditingProject(null);
    setUploadPreview(null);
    alert('Project saved and published live across all clients!');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this project from the showcase?')) {
      const updated = projects.filter((p) => p.id !== id);
      saveStoredProjects(updated);
      onUpdateProjects(updated);
    }
  };

  // Services Add/Remove
  const handleAddService = () => {
    if (!newServiceInput.trim()) return;
    const currentServices = profileForm.services || [];
    const updatedServices = [...currentServices, newServiceInput.trim()];
    const updatedProfile = { ...profileForm, services: updatedServices };
    setProfileForm(updatedProfile);
    saveStoredProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
    setNewServiceInput('');
  };

  const handleRemoveService = (serviceName: string) => {
    const currentServices = profileForm.services || [];
    const updatedServices = currentServices.filter((s) => s !== serviceName);
    const updatedProfile = { ...profileForm, services: updatedServices };
    setProfileForm(updatedProfile);
    saveStoredProfile(updatedProfile);
    onUpdateProfile(updatedProfile);
  };

  // Testimonial Save
  const handleSaveTestimonial = () => {
    if (!editingTestimonial?.quote || !editingTestimonial?.author) return;

    let updated: Testimonial[];
    if (editingTestimonial.id) {
      updated = testimonials.map((t) =>
        t.id === editingTestimonial.id ? ({ ...t, ...editingTestimonial } as Testimonial) : t
      );
    } else {
      const newT: Testimonial = {
        id: `t-${Date.now()}`,
        quote: editingTestimonial.quote || '',
        author: editingTestimonial.author || 'Business Client',
        role: editingTestimonial.role || 'Executive',
        company: editingTestimonial.company || 'Clients of AETORA Technologies',
        avatarUrl: editingTestimonial.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        rating: 5,
      };
      updated = [newT, ...testimonials];
    }

    saveStoredTestimonials(updated);
    onUpdateTestimonials(updated);
    setEditingTestimonial(null);
    alert('Review saved and published!');
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm('Delete this client review?')) {
      const updated = testimonials.filter((t) => t.id !== id);
      saveStoredTestimonials(updated);
      onUpdateTestimonials(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4 font-sans text-[#E8E4DF]">
      <div className="bg-[#1C1A17] max-w-5xl w-full rounded-3xl border border-[#3D3833] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col relative">
        
        {/* Header Bar */}
        <div className="bg-[#2B2723] px-6 py-4 border-b border-[#3D3833] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D49E6A] to-[#E5C198] text-[#121110] font-bold flex items-center justify-center shadow">
              <ShieldCheck className="w-6 h-6 text-[#121110]" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white">AETORA Technologies • Master CMS Portal</h2>
              <span className="text-[10px] text-[#D49E6A] uppercase tracking-widest block font-bold">
                Owner: Senaf Wondimmu • Real-Time Database Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                title="Log out session"
                className="p-2 text-rose-400 hover:text-rose-300 bg-[#3D3833] rounded-xl flex items-center gap-1 text-xs font-bold px-3"
              >
                <LogOut className="w-4 h-4" /> Exit
              </button>
            )}
            <button onClick={onClose} className="p-2 text-[#9E958C] hover:text-white rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="p-4 bg-[#2B2723] rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-[#3D3833] shadow-xl">
              <KeyRound className="w-10 h-10 text-[#D49E6A]" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-white">Master Authentication</h3>
              <p className="text-xs text-[#9E958C]">
                Enter passcode to access AETORA Technologies Master CMS Portal.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter Master Passcode (mastersenaf68)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#2B2723] border border-[#3D3833] rounded-2xl px-5 py-3.5 text-sm text-center text-white focus:outline-none focus:border-[#D49E6A] font-mono"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D49E6A] to-[#B8804E] text-[#121110] font-bold py-3.5 rounded-2xl uppercase text-xs tracking-wider shadow-lg hover:opacity-95"
              >
                Unlock Master CMS Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Master CMS Portal */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Top Navigation Tabs */}
            <div className="flex flex-wrap border-b border-[#3D3833] gap-2 text-xs font-bold uppercase tracking-wider pb-1">
              <button
                onClick={() => setActiveTab('company')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'company' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <Building2 className="w-4 h-4" /> Company & Owner Info
              </button>
              <button
                onClick={() => setActiveTab('hero_bg')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'hero_bg' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Hero Background Manager
              </button>
              <button
                onClick={() => setActiveTab('sections')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'sections' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <Sliders className="w-4 h-4" /> Section Manager
              </button>
              <button
                onClick={() => { setActiveTab('projects'); setEditingProject(null); }}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'projects' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <Layers className="w-4 h-4" /> Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'services' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Services & Capabilities
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'testimonials' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <Star className="w-4 h-4" /> Reviews ({testimonials.length})
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'images' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Upload Center
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'media' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <Database className="w-4 h-4" /> Media Manager ({mediaItems.length})
              </button>
              <button
                onClick={() => setActiveTab('gallery_manager')}
                className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'gallery_manager' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:bg-[#2B2723]'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Gallery Manager (Oakwood & Projects)
              </button>
            </div>

            {/* TAB 1: Company & Owner Profile CMS */}
            {activeTab === 'company' && (
              <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-6 text-xs">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#3D3833] pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                      Company Identity & Global Image Storage
                    </h3>
                    <p className="text-[#9E958C] text-[11px] mt-0.5">
                      Uploaded logos and founder photos are stored in Cloud Database & Storage to survive Vercel redeployments.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSyncCloudSettings}
                      className="bg-[#1C1A17] hover:bg-[#3D3833] text-[#D49E6A] font-bold px-3.5 py-2 rounded-xl uppercase flex items-center gap-1.5 border border-[#3D3833] transition-colors"
                      title="Fetch latest saved logo and CEO photo from Cloud DB"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Sync Cloud DB
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveCompany}
                      className="bg-[#D49E6A] hover:bg-[#c28e5c] text-[#121110] font-bold px-5 py-2 rounded-xl uppercase flex items-center gap-2 shadow-lg transition-colors"
                    >
                      <Save className="w-4 h-4" /> Save & Synchronize
                    </button>
                  </div>
                </div>

                {/* Persistent Cloud Database & Storage Status Banner */}
                <div className="bg-[#1C1A17] p-4 rounded-2xl border border-[#3D3833] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-3 h-3 rounded-full ${isSupabaseConfigured() ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                        Cloud Storage Status: {isSupabaseConfigured() ? 'Active (Supabase Cloud Connected)' : 'Using Environment Credentials / Local Fallback'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCloudConfig(!showCloudConfig)}
                        className="text-[11px] font-bold text-[#D49E6A] hover:underline flex items-center gap-1 uppercase"
                      >
                        <KeyRound className="w-3.5 h-3.5" /> {showCloudConfig ? 'Hide Credentials' : 'Configure Supabase Keys'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowSqlSetup(!showSqlSetup)}
                        className="text-[11px] font-bold text-[#9E958C] hover:text-white flex items-center gap-1 uppercase"
                      >
                        <Database className="w-3.5 h-3.5" /> Database SQL Schema
                      </button>
                    </div>
                  </div>

                  {cloudStatusMsg && (
                    <p className="text-[11px] font-semibold text-[#D49E6A] bg-[#2B2723] p-2.5 rounded-xl border border-[#3D3833]">
                      {cloudStatusMsg}
                    </p>
                  )}

                  {/* Supabase Dynamic Configuration Panel */}
                  {showCloudConfig && (
                    <div className="bg-[#2B2723] p-4 rounded-xl border border-[#3D3833] space-y-3 mt-2">
                      <span className="text-[11px] font-bold text-white uppercase block">
                        Supabase Environment Credentials Overrides
                      </span>
                      <p className="text-[10px] text-[#9E958C]">
                        Enter your Supabase URL and Anon Key below or configure <code className="text-[#D49E6A]">VITE_SUPABASE_URL</code> and <code className="text-[#D49E6A]">VITE_SUPABASE_ANON_KEY</code> in Vercel project environment settings.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-[#9E958C] uppercase mb-1">Supabase Project URL</label>
                          <input
                            type="url"
                            placeholder="https://xyz.supabase.co"
                            value={supabaseCreds.url}
                            onChange={(e) => setSupabaseCreds({ ...supabaseCreds, url: e.target.value })}
                            className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D49E6A]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-[#9E958C] uppercase mb-1">Supabase Anon Key</label>
                          <input
                            type="password"
                            placeholder="eyJhbG..."
                            value={supabaseCreds.anonKey}
                            onChange={(e) => setSupabaseCreds({ ...supabaseCreds, anonKey: e.target.value })}
                            className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-2.5 text-white focus:outline-none focus:border-[#D49E6A]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={handleSaveSupabaseCredentials}
                          className="bg-[#D49E6A] text-[#121110] font-bold px-4 py-2 rounded-xl uppercase text-[10px] flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" /> Save Credentials & Test Sync
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SQL Schema Assistant */}
                  {showSqlSetup && (
                    <div className="bg-[#121110] p-4 rounded-xl border border-[#3D3833] space-y-2 mt-2">
                      <span className="text-[11px] font-bold text-[#D49E6A] uppercase block">
                        Supabase Database Setup SQL (site_settings table)
                      </span>
                      <p className="text-[10px] text-[#9E958C]">
                        Run this script in Supabase SQL Editor if table is not created yet:
                      </p>
                      <pre className="bg-[#0C0B0A] p-3 rounded-lg text-[10px] text-emerald-400 font-mono overflow-x-auto select-all">
{`CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'global',
  logo_url TEXT,
  ceo_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public write" ON public.site_settings FOR ALL USING (true);`}
                      </pre>
                    </div>
                  )}
                </div>

                {/* Brand Logo Upload Section */}
                <div className="bg-[#1C1A17] p-5 rounded-2xl border border-[#3D3833] space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif font-bold text-sm text-[#D49E6A] uppercase flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" /> AETORA Technologies Brand Logo Management
                    </h4>
                    {profileForm.logoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...profileForm, logoUrl: '' };
                          setProfileForm(updated);
                          saveStoredProfile(updated);
                          onUpdateProfile(updated);
                          updateCloudSiteSettings({ logo_url: '' });
                        }}
                        className="text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 uppercase"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Custom Logo
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Upload Controls */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1 uppercase text-[11px]">
                          Upload Logo File (Saved to Cloud Storage & DB)
                        </label>
                        <label className={`w-full bg-[#2B2723] hover:bg-[#3D3833] border border-[#3D3833] text-white font-bold p-3 rounded-xl uppercase cursor-pointer flex items-center justify-center gap-2 transition-colors ${isUploadingCloud ? 'opacity-50 cursor-wait' : ''}`}>
                          <Upload className="w-4 h-4 text-[#D49E6A]" /> {isUploadingCloud ? 'Uploading to Cloud...' : 'Select Logo Image From Device'}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingCloud}
                            onChange={handleCloudLogoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1 uppercase text-[11px]">Or Enter Persistent Logo Image URL</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={profileForm.logoUrl || ''}
                          onChange={(e) => handleLogoUrlChange(e.target.value)}
                          className="w-full bg-[#2B2723] border border-[#3D3833] rounded-xl p-3 text-white focus:outline-none focus:border-[#D49E6A]"
                        />
                      </div>
                    </div>

                    {/* Live Logo Preview Box */}
                    <div className="bg-[#2B2723] p-4 rounded-xl border border-[#3D3833] text-center space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#9E958C] block">Logo Live Header & Footer Preview</span>
                      <div className="bg-[#121110] p-4 rounded-xl border border-[#3D3833] flex items-center justify-center min-h-[70px]">
                        {profileForm.logoUrl ? (
                          <img
                            src={profileForm.logoUrl}
                            alt="Uploaded Logo Preview"
                            className="h-10 max-w-[180px] object-contain rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D49E6A] to-[#B87D4B] text-[#121110] font-serif font-black flex items-center justify-center">
                              A
                            </div>
                            <span className="font-serif font-bold text-sm text-white">{profileForm.companyName || 'AETORA Technologies'}</span>
                            <span className="text-[10px] text-[#9E958C]">(Fallback Text Active)</span>
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-[#9E958C]">
                        {profileForm.logoUrl ? 'Custom logo active! Saved to Cloud DB and published live across Header & Footer.' : 'No custom logo uploaded. Standard text title fallback active.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CEO / Founder Profile Photo Upload Section */}
                <div className="bg-[#1C1A17] p-5 rounded-2xl border border-[#3D3833] space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-serif font-bold text-sm text-[#D49E6A] uppercase flex items-center gap-2">
                      <User className="w-4 h-4" /> Founder & CEO Profile Photo Management
                    </h4>
                    {profileForm.profilePhotoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = { ...profileForm, profilePhotoUrl: '' };
                          setProfileForm(updated);
                          saveStoredProfile(updated);
                          onUpdateProfile(updated);
                          updateCloudSiteSettings({ ceo_image_url: '' });
                        }}
                        className="text-[11px] font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 uppercase"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove Photo
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Upload Controls */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1 uppercase text-[11px]">
                          Upload CEO / Founder File (Saved to Cloud Storage & DB)
                        </label>
                        <label className={`w-full bg-[#2B2723] hover:bg-[#3D3833] border border-[#3D3833] text-white font-bold p-3 rounded-xl uppercase cursor-pointer flex items-center justify-center gap-2 transition-colors ${isUploadingCloud ? 'opacity-50 cursor-wait' : ''}`}>
                          <Upload className="w-4 h-4 text-[#D49E6A]" /> {isUploadingCloud ? 'Uploading to Cloud...' : 'Select CEO Photo From Device'}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingCloud}
                            onChange={handleCloudCeoUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1 uppercase text-[11px]">Or Enter Persistent CEO Image URL</label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={profileForm.profilePhotoUrl || ''}
                          onChange={(e) => handleCeoUrlChange(e.target.value)}
                          className="w-full bg-[#2B2723] border border-[#3D3833] rounded-xl p-3 text-white focus:outline-none focus:border-[#D49E6A]"
                        />
                      </div>
                    </div>

                    {/* Live CEO Photo Preview Box */}
                    <div className="bg-[#2B2723] p-4 rounded-xl border border-[#3D3833] text-center space-y-2">
                      <span className="text-[10px] uppercase font-bold text-[#9E958C] block">CEO Photo Live Preview</span>
                      <div className="bg-[#121110] p-3 rounded-xl border border-[#3D3833] flex items-center justify-center min-h-[90px]">
                        {profileForm.profilePhotoUrl ? (
                          <img
                            src={profileForm.profilePhotoUrl}
                            alt="CEO Photo Preview"
                            className="w-20 h-20 object-cover rounded-full border-2 border-[#D49E6A]/50 shadow-md"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-[#3D3833] flex items-center justify-center text-[#9E958C]">
                            <User className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <p className="text-[10px] text-[#9E958C]">
                        CEO Photo is published live across the Hero Section badge, About Section founder card, and Contact Modal.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#D49E6A] font-bold mb-1 uppercase">Company Name</label>
                    <input
                      type="text"
                      value={profileForm.companyName || 'AETORA Technologies'}
                      onChange={(e) => setProfileForm({ ...profileForm, companyName: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D49E6A] font-bold mb-1 uppercase">Founder & Owner Name</label>
                    <input
                      type="text"
                      value={profileForm.ownerName || 'Senaf Wondimmu'}
                      onChange={(e) => setProfileForm({ ...profileForm, ownerName: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#D49E6A] font-bold mb-1 uppercase">Position Title</label>
                    <input
                      type="text"
                      value={profileForm.ownerTitle || 'Founder & CEO'}
                      onChange={(e) => setProfileForm({ ...profileForm, ownerTitle: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[#9E958C] font-bold mb-1 uppercase">Official Email</label>
                    <input
                      type="text"
                      value={profileForm.email || 'senafwondimu@gmail.com'}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9E958C] font-bold mb-1 uppercase">Phone Line</label>
                    <input
                      type="text"
                      value={profileForm.phone || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9E958C] font-bold mb-1 uppercase">Location</label>
                    <input
                      type="text"
                      value={profileForm.location || 'Addis Ababa / Worldwide Remote'}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    />
                  </div>
                </div>

                {/* Hero Headlines Editor */}
                <div className="space-y-4 pt-4 border-t border-[#3D3833]">
                  <h4 className="font-bold text-sm text-[#D49E6A] uppercase">Hero Section Copywriting</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#9E958C] mb-1">Hero Heading Line 1</label>
                      <input
                        type="text"
                        value={profileForm.heroHeadingTitle || 'Modern Websites.'}
                        onChange={(e) => setProfileForm({ ...profileForm, heroHeadingTitle: e.target.value })}
                        className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9E958C] mb-1">Hero Heading Line 2 (Italic)</label>
                      <input
                        type="text"
                        value={profileForm.heroHeadingSubtitle || 'Powerful Digital Experiences.'}
                        onChange={(e) => setProfileForm({ ...profileForm, heroHeadingSubtitle: e.target.value })}
                        className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#9E958C] mb-1">Hero Heading Line 3</label>
                      <input
                        type="text"
                        value={profileForm.heroHeadingSuffix || 'Built by AETORA Technologies.'}
                        onChange={(e) => setProfileForm({ ...profileForm, heroHeadingSuffix: e.target.value })}
                        className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#9E958C] mb-1">Hero Description Text</label>
                    <textarea
                      rows={2}
                      value={profileForm.heroDescription || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, heroDescription: e.target.value })}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Hero Background Manager */}
            {activeTab === 'hero_bg' && (
              <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-6 text-xs">
                <div className="flex justify-between items-center border-b border-[#3D3833] pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Hero Background Manager</h3>
                    <p className="text-[11px] text-[#D49E6A]">
                      Upload, replace, or delete the Hero background image. The new background becomes the permanent default across all devices and sessions.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveCompany}
                    className="bg-[#D49E6A] text-[#121110] font-bold px-5 py-2.5 rounded-xl uppercase flex items-center gap-2 shadow"
                  >
                    <Save className="w-4 h-4" /> Save Background Permanently
                  </button>
                </div>

                {/* Current Background Preview */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold uppercase text-[#D49E6A]">Current Hero Background Live Preview</span>
                  <div className="relative h-64 rounded-2xl overflow-hidden border-2 border-[#3D3833] bg-[#121110]">
                    <img
                      src={profileForm.heroBackgroundImageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000'}
                      alt="Hero Background Preview"
                      className="w-full h-full object-cover"
                      style={{
                        filter: `blur(${profileForm.heroBackgroundBlur ?? 2}px)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 bg-[#121110]"
                      style={{ opacity: profileForm.heroBackgroundOverlayOpacity ?? 0.75 }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-white space-y-2 z-10">
                      <span className="text-2xl font-serif font-bold">{profileForm.heroHeadingTitle || 'Modern Websites.'}</span>
                      <span className="text-xs text-[#D49E6A] italic">{profileForm.heroHeadingSubtitle || 'Powerful Digital Experiences.'}</span>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 bg-black/60 px-3 py-1 rounded-full border border-emerald-500/40">
                        Live Master Preview
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upload & Replacement Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#3D3833]">
                  {/* Upload Local Image */}
                  <div className="space-y-3 bg-[#1F1C19] p-5 rounded-2xl border border-[#332F2B]">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <Upload className="w-4 h-4 text-[#D49E6A]" /> Upload New Hero Image from Computer
                    </h4>
                    <p className="text-[11px] text-[#9E958C]">
                      Select a high-resolution 3D, tech, or luxury image file from your computer.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'hero')}
                      className="block text-xs text-[#D49E6A] file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#D49E6A] file:text-[#121110] cursor-pointer"
                    />
                  </div>

                  {/* Custom URL & Reset */}
                  <div className="space-y-3 bg-[#1F1C19] p-5 rounded-2xl border border-[#332F2B]">
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-[#D49E6A]" /> Image Direct Web Address (URL)
                    </h4>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={profileForm.heroBackgroundImageUrl || ''}
                      onChange={(e) => {
                        const newUrl = e.target.value;
                        const updated = { ...profileForm, heroBackgroundImageUrl: newUrl };
                        setProfileForm(updated);
                        onUpdateProfile(updated);
                        saveStoredProfile(updated);
                      }}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white focus:outline-none focus:border-[#D49E6A]"
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          const updated = { ...profileForm, heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000' };
                          setProfileForm(updated);
                          onUpdateProfile(updated);
                          saveStoredProfile(updated);
                        }}
                        className="text-xs text-rose-400 hover:text-rose-300 underline font-bold"
                      >
                        Reset Background to Default Dark Tech
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3D Effects & Slider Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#3D3833]">
                  <div>
                    <label className="block text-[#9E958C] font-bold mb-1 uppercase">Overlay Opacity ({Math.round((profileForm.heroBackgroundOverlayOpacity ?? 0.75) * 100)}%)</label>
                    <input
                      type="range"
                      min="0.1"
                      max="0.95"
                      step="0.05"
                      value={profileForm.heroBackgroundOverlayOpacity ?? 0.75}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        const updated = { ...profileForm, heroBackgroundOverlayOpacity: val };
                        setProfileForm(updated);
                        onUpdateProfile(updated);
                        saveStoredProfile(updated);
                      }}
                      className="w-full accent-[#D49E6A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9E958C] font-bold mb-1 uppercase">Backdrop Blur ({profileForm.heroBackgroundBlur ?? 2}px)</label>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      step="1"
                      value={profileForm.heroBackgroundBlur ?? 2}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        const updated = { ...profileForm, heroBackgroundBlur: val };
                        setProfileForm(updated);
                        onUpdateProfile(updated);
                        saveStoredProfile(updated);
                      }}
                      className="w-full accent-[#D49E6A] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[#9E958C] font-bold mb-1 uppercase">3D Floating Glass & Nodes</label>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...profileForm, hero3DEnabled: !(profileForm.hero3DEnabled ?? true) };
                        setProfileForm(updated);
                        onUpdateProfile(updated);
                        saveStoredProfile(updated);
                      }}
                      className={`w-full py-2.5 rounded-xl font-bold uppercase text-xs transition-colors ${
                        (profileForm.hero3DEnabled ?? true) ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {(profileForm.hero3DEnabled ?? true) ? '3D Canvas Enabled' : '3D Canvas Disabled'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Section Manager */}
            {activeTab === 'sections' && (
              <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-6 text-xs">
                <div className="flex justify-between items-center border-b border-[#3D3833] pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Section Manager & Page Layout Sequence</h3>
                    <p className="text-[11px] text-[#D49E6A]">
                      Rearrange section sequence (up/down) or show/hide website sections. The configured order will render live on the website.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleResetSections}
                      className="bg-[#3D3833] hover:bg-[#4D4742] text-white font-bold px-4 py-2.5 rounded-xl uppercase"
                    >
                      Reset Default Sequence
                    </button>
                    <button
                      onClick={handleSaveCompany}
                      className="bg-[#D49E6A] text-[#121110] font-bold px-5 py-2.5 rounded-xl uppercase flex items-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" /> Save Section Order
                    </button>
                  </div>
                </div>

                {/* Section List */}
                <div className="space-y-3">
                  {currentSections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                        sec.enabled
                          ? 'bg-[#1C1A17] border-[#3D3833] text-white'
                          : 'bg-[#161412] border-[#2B2723] text-[#78716C] opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#2B2723] border border-[#3D3833] flex items-center justify-center font-bold text-[#D49E6A] text-xs">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-white">{sec.name}</h4>
                          <span className="text-[10px] text-[#9E958C] font-mono">Section ID: {sec.id}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Visibility Toggle */}
                        <button
                          onClick={() => handleToggleSection(idx)}
                          className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold ${
                            sec.enabled
                              ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                              : 'bg-rose-950/60 border-rose-500/50 text-rose-400'
                          }`}
                        >
                          {sec.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          <span>{sec.enabled ? 'Visible' : 'Hidden'}</span>
                        </button>

                        {/* Move Up */}
                        <button
                          disabled={idx === 0}
                          onClick={() => handleMoveSection(idx, 'up')}
                          className="p-2 bg-[#2B2723] hover:bg-[#3D3833] disabled:opacity-30 text-white rounded-xl border border-[#3D3833]"
                          title="Move section up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>

                        {/* Move Down */}
                        <button
                          disabled={idx === currentSections.length - 1}
                          onClick={() => handleMoveSection(idx, 'down')}
                          className="p-2 bg-[#2B2723] hover:bg-[#3D3833] disabled:opacity-30 text-white rounded-xl border border-[#3D3833]"
                          title="Move section down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Projects Showcase CMS */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#9E958C]">Manage, edit, or upload new website showcase projects.</span>
                  <button
                    onClick={() => setEditingProject({})}
                    className="bg-[#D49E6A] text-[#121110] font-bold text-xs uppercase px-4 py-2.5 rounded-xl flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add New Showcase Project
                  </button>
                </div>

                {editingProject ? (
                  /* Project Add / Edit Form */
                  <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-4 text-xs">
                    <h3 className="font-serif text-lg font-bold text-white">
                      {editingProject.id ? 'Edit Showcase Project' : 'Create & Publish New Showcase Project'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1">Project Title</label>
                        <input
                          type="text"
                          placeholder="e.g. SOLARA Fine Dining Platform"
                          value={editingProject.title || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1">Category</label>
                        <select
                          value={editingProject.category || 'Restaurant'}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
                          className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                        >
                          {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1">Price Estimate</label>
                        <input
                          type="text"
                          placeholder="e.g. $1,250"
                          value={editingProject.priceEstimate || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, priceEstimate: e.target.value })}
                          className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1">Recreation Component Key</label>
                        <select
                          value={editingProject.recreationComponentId || 'generic'}
                          onChange={(e) => setEditingProject({ ...editingProject, recreationComponentId: e.target.value })}
                          className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white font-mono"
                        >
                          <option value="solara">SOLARA Dining (Interactive)</option>
                          <option value="flavoro">Flavoro Bistro (Interactive)</option>
                          <option value="brewbliss">Brew Bliss Cafe (Interactive)</option>
                          <option value="umi">UMI Sushi Bar (Interactive)</option>
                          <option value="slice">Slice Pizzeria (Interactive)</option>
                          <option value="coffeesweet">Coffee Sweet Moments (Interactive)</option>
                          <option value="generic">Generic Web Platform (Default)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#9E958C] font-bold mb-1">Upload Cover Screenshot Image</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'project')}
                        className="text-xs text-[#9E958C]"
                      />
                      {(editingProject.previewImageUrl || uploadPreview) && (
                        <div className="mt-2 flex items-center gap-3">
                          <img
                            src={editingProject.previewImageUrl || uploadPreview!}
                            alt="Preview"
                            className="w-24 h-16 object-cover rounded-xl border border-[#3D3833]"
                          />
                          <span className="text-[10px] text-emerald-400 font-bold">✓ Image attached</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[#9E958C] font-bold mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingProject.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                        className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                      ></textarea>
                    </div>

                    <div className="pt-3 flex justify-end gap-3">
                      <button
                        onClick={() => setEditingProject(null)}
                        className="bg-[#3D3833] text-white font-bold px-5 py-2.5 rounded-xl uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProject}
                        className="bg-[#D49E6A] text-[#121110] font-bold px-6 py-2.5 rounded-xl uppercase flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" /> Save Project
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Projects List Grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="bg-[#2B2723] p-4 rounded-2xl border border-[#3D3833] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={proj.previewImageUrl}
                            alt={proj.title}
                            className="w-16 h-16 object-cover rounded-xl border border-[#3D3833]"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-white line-clamp-1">{proj.title}</h4>
                            <span className="text-[10px] text-[#D49E6A] font-bold uppercase">
                              {proj.category} • {proj.priceEstimate}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-2 bg-[#3D3833] hover:bg-[#D49E6A] hover:text-[#121110] text-white rounded-xl transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="p-2 bg-rose-950 hover:bg-rose-700 text-rose-300 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: Services & Capabilities CMS */}
            {activeTab === 'services' && (
              <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-6 text-xs">
                <h3 className="font-serif text-lg font-bold text-white">Company Services & Capabilities CMS</h3>
                
                <div className="space-y-3">
                  <label className="block text-[#D49E6A] font-bold uppercase">Add New Service</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. AI Integration, Custom SaaS Development"
                      value={newServiceInput}
                      onChange={(e) => setNewServiceInput(e.target.value)}
                      className="flex-1 bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                    />
                    <button
                      onClick={handleAddService}
                      className="bg-[#D49E6A] text-[#121110] font-bold px-5 py-3 rounded-xl uppercase"
                    >
                      + Add Service
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="text-[#9E958C] font-bold uppercase block">Active AETORA Services ({profileForm.services?.length || 0})</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(profileForm.services || []).map((srv, idx) => (
                      <div key={idx} className="bg-[#1C1A17] p-3 rounded-xl border border-[#3D3833] flex items-center justify-between">
                        <span className="font-bold text-white">{srv}</span>
                        <button
                          onClick={() => handleRemoveService(srv)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Testimonials CMS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-4 text-xs">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-lg font-bold text-white">Clients of AETORA Technologies Reviews</h3>
                  <button
                    onClick={() => setEditingTestimonial({})}
                    className="bg-[#D49E6A] text-[#121110] font-bold px-4 py-2.5 rounded-xl uppercase flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add New Review
                  </button>
                </div>

                {editingTestimonial ? (
                  <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#9E958C] mb-1 font-bold">Client Author Name</label>
                        <input
                          type="text"
                          value={editingTestimonial.author || ''}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                          className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[#9E958C] mb-1 font-bold">Company / Organization</label>
                        <input
                          type="text"
                          value={editingTestimonial.company || 'Clients of AETORA Technologies'}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                          className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#9E958C] mb-1 font-bold">Review Quote</label>
                      <textarea
                        rows={3}
                        value={editingTestimonial.quote || ''}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                        className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-white"
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        onClick={() => setEditingTestimonial(null)}
                        className="bg-[#3D3833] text-white font-bold px-5 py-2.5 rounded-xl uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveTestimonial}
                        className="bg-[#D49E6A] text-[#121110] font-bold px-6 py-2.5 rounded-xl uppercase"
                      >
                        Save Review
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testimonials.map((t) => (
                      <div key={t.id} className="bg-[#2B2723] p-4 rounded-2xl border border-[#3D3833] flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-white text-sm">{t.author} — <span className="text-[#D49E6A] font-normal">{t.company}</span></h4>
                          <p className="text-[#9E958C] text-xs italic mt-0.5">"{t.quote}"</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingTestimonial(t)}
                            className="p-2 bg-[#3D3833] text-white rounded-xl"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(t.id)}
                            className="p-2 bg-rose-950 text-rose-300 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: File Image Upload Center */}
            {activeTab === 'images' && (
              <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-6 text-xs">
                <h3 className="font-serif text-lg font-bold text-white">Local Image Upload Center</h3>
                <p className="text-[#9E958C]">
                  Select any screenshot or image from your local computer to convert and use in your portfolio project showcase or profile.
                </p>

                <div className="p-8 border-2 border-dashed border-[#D49E6A]/50 rounded-3xl text-center space-y-4 bg-[#1C1A17]">
                  <ImageIcon className="w-12 h-12 text-[#D49E6A] mx-auto" />
                  <div>
                    <span className="font-bold text-white block text-sm">Upload Screenshot / Image File</span>
                    <span className="text-[#9E958C] text-xs">PNG, JPG, WEBP accepted (max 5MB)</span>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'profile')}
                    className="mx-auto block text-xs text-[#D49E6A] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#D49E6A] file:text-[#121110] cursor-pointer"
                  />
                </div>

                {uploadPreview && (
                  <div className="p-4 bg-[#1C1A17] rounded-2xl border border-[#3D3833] space-y-2">
                    <span className="font-bold text-emerald-400 block">✓ Live Image File Loaded</span>
                    <img src={uploadPreview} alt="Uploaded preview" className="max-h-48 rounded-xl object-contain mx-auto" />
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: Central Media Manager */}
            {activeTab === 'media' && (
              <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-6 text-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#3D3833] pb-4">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Central Media Manager</h3>
                    <p className="text-[#9E958C]">Manage hero backgrounds, logos, portfolio images, client avatars, and asset library.</p>
                  </div>
                  <button
                    onClick={() => {
                      openImagePicker({
                        title: 'Add New Asset to Media Library',
                        currentUrl: '',
                        onSave: () => {},
                      });
                    }}
                    className="bg-[#D49E6A] text-[#121110] font-bold px-4 py-2.5 rounded-xl uppercase flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Upload & Register Asset
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-[#9E958C]" />
                    <input
                      type="text"
                      placeholder="Search media assets..."
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white"
                    />
                  </div>
                  <select
                    value={mediaCatFilter}
                    onChange={(e) => setMediaCatFilter(e.target.value)}
                    className="bg-[#1C1A17] border border-[#3D3833] rounded-xl px-4 py-2.5 text-xs text-white"
                  >
                    <option value="All">All Categories</option>
                    <option value="Hero Background">Hero Backgrounds</option>
                    <option value="Portfolio">Portfolio Previews</option>
                    <option value="Profile">Profile Photos</option>
                    <option value="Logo">Logos & Icons</option>
                    <option value="QR Code">QR Codes</option>
                    <option value="General">General</option>
                  </select>
                </div>

                {/* Media Assets Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[50vh] overflow-y-auto p-1">
                  {mediaItems
                    .filter((m) => {
                      const matchesSearch = m.name.toLowerCase().includes(mediaSearch.toLowerCase());
                      const matchesCat = mediaCatFilter === 'All' || m.category === mediaCatFilter;
                      return matchesSearch && matchesCat;
                    })
                    .map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#1C1A17] p-3 rounded-2xl border border-[#3D3833] space-y-2 relative group"
                      >
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#121110] relative">
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                          <span className="absolute top-1 left-1 bg-[#121110]/90 text-[#D49E6A] text-[9px] font-bold px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-white text-xs truncate">{item.name}</h4>
                        <div className="flex justify-between items-center text-[10px] text-[#9E958C]">
                          <span>{item.createdAt}</span>
                          <button
                            onClick={() => deleteMediaItem(item.id)}
                            className="text-rose-400 hover:text-rose-300 p-1"
                            title="Delete Asset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAB 7: Showcase Project Gallery Manager */}
            {activeTab === 'gallery_manager' && (() => {
              const currentProj = projects.find((p) => p.id === galleryProjId || p.recreationComponentId === galleryProjId) || projects[0];
              const currentScreenshots: GalleryScreenshot[] = currentProj?.galleryScreenshots || (currentProj?.screenshotUrls || []).map((url, i) => ({
                id: `scr-${i}`,
                url,
                title: `Screenshot ${i + 1}`,
                caption: `Preview Screenshot ${i + 1}`
              }));

              const updateProjectGallery = (updatedList: GalleryScreenshot[]) => {
                if (!currentProj) return;
                const updatedProjects = projects.map((p) => {
                  if (p.id === currentProj.id) {
                    return {
                      ...p,
                      galleryScreenshots: updatedList,
                      screenshotUrls: updatedList.map((s) => s.url)
                    };
                  }
                  return p;
                });
                onUpdateProjects(updatedProjects);
                saveStoredProjects(updatedProjects);
              };

              const handleAddScreenshot = (urlToAdd: string) => {
                if (!urlToAdd.trim()) return;
                const newItem: GalleryScreenshot = {
                  id: `scr-${Date.now()}`,
                  url: urlToAdd,
                  title: newScrTitle.trim() || `Page Preview ${currentScreenshots.length + 1}`,
                  caption: newScrCaption.trim() || undefined
                };
                const updatedList = [...currentScreenshots, newItem];
                updateProjectGallery(updatedList);
                setNewScrTitle('');
                setNewScrCaption('');
                setNewScrUrl('');
              };

              const handleMove = (index: number, direction: 'up' | 'down') => {
                const newList = [...currentScreenshots];
                const targetIdx = direction === 'up' ? index - 1 : index + 1;
                if (targetIdx < 0 || targetIdx >= newList.length) return;
                const temp = newList[index];
                newList[index] = newList[targetIdx];
                newList[targetIdx] = temp;
                updateProjectGallery(newList);
              };

              const handleDelete = (id: number | string) => {
                if (!confirm('Are you sure you want to delete this screenshot from the gallery?')) return;
                const newList = currentScreenshots.filter((s, idx) => s.id !== id && idx !== id);
                updateProjectGallery(newList);
              };

              const handleUpdateItem = (index: number, updatedFields: Partial<GalleryScreenshot>) => {
                const newList = [...currentScreenshots];
                newList[index] = { ...newList[index], ...updatedFields };
                updateProjectGallery(newList);
              };

              const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>, targetIdx?: number) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let w = img.width;
                    let h = img.height;
                    const maxDim = 1200;
                    if (w > maxDim || h > maxDim) {
                      if (w > h) {
                        h = Math.round((h * maxDim) / w);
                        w = maxDim;
                      } else {
                        w = Math.round((w * maxDim) / h);
                        h = maxDim;
                      }
                    }
                    canvas.width = w;
                    canvas.height = h;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, w, h);
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);

                    if (targetIdx !== undefined) {
                      handleUpdateItem(targetIdx, { url: compressedBase64 });
                    } else {
                      handleAddScreenshot(compressedBase64);
                    }
                  };
                  img.src = evt.target?.result as string;
                };
                reader.readAsDataURL(file);
              };

              return (
                <div className="bg-[#2B2723] p-6 rounded-3xl border border-[#3D3833] space-y-8 text-xs">
                  
                  {/* Gallery Manager Header & Project Selector */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#3D3833] pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">LIVE REAL-TIME CMS</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white">Project Preview Gallery Manager</h3>
                      <p className="text-[#9E958C]">Manage high-resolution screenshot galleries, captions, and reorder screenshots for Oakwood International School Portal & Showcase Projects.</p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#1C1A17] p-2 rounded-2xl border border-[#3D3833]">
                      <span className="text-[11px] font-bold uppercase text-[#D49E6A] pl-2">Select Project:</span>
                      <select
                        value={galleryProjId}
                        onChange={(e) => setGalleryProjId(e.target.value)}
                        className="bg-[#2B2723] border border-[#3D3833] rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#D49E6A]"
                      >
                        {projects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title} ({p.category})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Add New Screenshot Form */}
                  <div className="bg-[#1C1A17] p-5 rounded-2xl border border-[#3D3833] space-y-4">
                    <h4 className="font-serif font-bold text-base text-white flex items-center gap-2">
                      <Plus className="w-4 h-4 text-[#D49E6A]" /> Add New Screenshot to {currentProj?.title}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[#9E958C] font-bold mb-1 uppercase">Page Title / Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Admissions Portal or Student Dashboard"
                          value={newScrTitle}
                          onChange={(e) => setNewScrTitle(e.target.value)}
                          className="w-full bg-[#2B2723] border border-[#3D3833] rounded-xl p-3 text-white focus:outline-none focus:border-[#D49E6A]"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-[#9E958C] font-bold mb-1 uppercase">Caption / Description</label>
                        <input
                          type="text"
                          placeholder="Brief description of features shown on this page..."
                          value={newScrCaption}
                          onChange={(e) => setNewScrCaption(e.target.value)}
                          className="w-full bg-[#2B2723] border border-[#3D3833] rounded-xl p-3 text-white focus:outline-none focus:border-[#D49E6A]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 w-full">
                        <label className="block text-[#9E958C] font-bold mb-1 uppercase">Option A: Image Web URL</label>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={newScrUrl}
                          onChange={(e) => setNewScrUrl(e.target.value)}
                          className="w-full bg-[#2B2723] border border-[#3D3833] rounded-xl p-3 text-white focus:outline-none focus:border-[#D49E6A]"
                        />
                      </div>

                      <div className="shrink-0 pt-5">
                        <label className="bg-[#3D3833] hover:bg-[#4D4742] text-white font-bold px-4 py-3 rounded-xl uppercase cursor-pointer flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#D49E6A]" /> Option B: Upload File
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleUploadFile(e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="shrink-0 pt-5">
                        <button
                          type="button"
                          onClick={() => handleAddScreenshot(newScrUrl)}
                          disabled={!newScrUrl.trim() && !newScrTitle.trim()}
                          className="bg-gradient-to-r from-[#D49E6A] to-[#B87D4B] disabled:opacity-50 text-[#121110] font-bold px-6 py-3 rounded-xl uppercase flex items-center gap-2 shadow-lg"
                        >
                          <Plus className="w-4 h-4" /> Add Screenshot
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Manage Screenshots List */}
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-base text-white flex items-center justify-between">
                      <span>Current Screenshots ({currentScreenshots.length})</span>
                      <span className="text-xs font-sans text-[#D49E6A] font-bold">Use arrows to reorder gallery items</span>
                    </h4>

                    {currentScreenshots.length === 0 ? (
                      <p className="text-center py-8 text-[#9E958C] bg-[#1C1A17] rounded-2xl border border-[#3D3833]">
                        No screenshots added yet. Add your first screenshot using the form above.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {currentScreenshots.map((scr, idx) => (
                          <div
                            key={scr.id || idx}
                            className="bg-[#1C1A17] p-4 rounded-2xl border border-[#3D3833] flex flex-col md:flex-row items-center gap-4 group"
                          >
                            {/* Reorder Buttons */}
                            <div className="flex md:flex-col gap-1 shrink-0">
                              <button
                                onClick={() => handleMove(idx, 'up')}
                                disabled={idx === 0}
                                title="Move Up"
                                className="p-2 bg-[#2B2723] hover:bg-[#3D3833] disabled:opacity-30 text-[#D49E6A] rounded-lg transition-colors"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleMove(idx, 'down')}
                                disabled={idx === currentScreenshots.length - 1}
                                title="Move Down"
                                className="p-2 bg-[#2B2723] hover:bg-[#3D3833] disabled:opacity-30 text-[#D49E6A] rounded-lg transition-colors"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Thumbnail */}
                            <div className="w-36 aspect-video bg-black/60 rounded-xl overflow-hidden shrink-0 relative border border-[#3D3833]">
                              <img src={scr.url} alt={scr.title} className="w-full h-full object-cover" />
                              <span className="absolute top-1 left-1 bg-black/80 text-[#D49E6A] text-[9px] font-bold px-1.5 py-0.5 rounded">
                                #{idx + 1}
                              </span>
                            </div>

                            {/* Info Fields */}
                            <div className="flex-1 space-y-2 w-full">
                              <input
                                type="text"
                                value={scr.title}
                                onChange={(e) => handleUpdateItem(idx, { title: e.target.value })}
                                placeholder="Screenshot Title"
                                className="w-full bg-[#2B2723] border border-[#3D3833] rounded-lg p-2 text-white font-serif font-bold text-sm focus:outline-none focus:border-[#D49E6A]"
                              />
                              <input
                                type="text"
                                value={scr.caption || ''}
                                onChange={(e) => handleUpdateItem(idx, { caption: e.target.value })}
                                placeholder="Caption description..."
                                className="w-full bg-[#2B2723] border border-[#3D3833] rounded-lg p-2 text-xs text-[#9E958C] focus:outline-none focus:border-[#D49E6A]"
                              />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 shrink-0">
                              <label className="p-2.5 bg-[#2B2723] hover:bg-[#3D3833] text-[#D49E6A] rounded-xl cursor-pointer border border-[#3D3833]" title="Replace Image">
                                <Upload className="w-4 h-4" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleUploadFile(e, idx)}
                                  className="hidden"
                                />
                              </label>

                              <button
                                onClick={() => handleDelete(scr.id || idx)}
                                title="Delete Screenshot"
                                className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/20 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Live Interactive Preview */}
                  <div className="pt-4 border-t border-[#3D3833] space-y-4">
                    <h4 className="font-serif font-bold text-base text-white flex items-center gap-2">
                      <Eye className="w-4 h-4 text-emerald-400" /> Live Gallery Lightbox Preview ({currentProj?.title})
                    </h4>
                    <div className="p-6 bg-[#121110] rounded-3xl border border-[#3D3833]">
                      <ProjectGalleryLightbox
                        screenshots={currentScreenshots}
                        projectTitle={currentProj?.title}
                      />
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
};
