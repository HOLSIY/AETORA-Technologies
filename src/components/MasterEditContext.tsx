import React, { createContext, useContext, useState, useEffect } from 'react';
import { MediaItem } from '../types';
import { getStoredMedia, saveStoredMedia } from '../data/store';
import { Edit3, Camera, Upload, Image as ImageIcon, Check, X, Search, Trash2, Plus, Sparkles } from 'lucide-react';

interface ImagePickerOptions {
  title: string;
  currentUrl: string;
  category?: 'Hero Background' | 'Logo' | 'Portfolio' | 'Gallery' | 'Profile' | 'QR Code' | 'General';
  onSave: (newUrl: string) => void;
}

interface MasterEditContextType {
  isMasterPortalUnlocked: boolean;
  setIsMasterPortalUnlocked: (unlocked: boolean) => void;
  isVisualEditMode: boolean;
  setIsVisualEditMode: (mode: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  openImagePicker: (opts: ImagePickerOptions) => void;
  mediaItems: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'createdAt'>) => MediaItem;
  deleteMediaItem: (id: string) => void;
}

const MasterEditContext = createContext<MasterEditContextType | null>(null);

export const useMasterEdit = () => {
  const ctx = useContext(MasterEditContext);
  if (!ctx) {
    return {
      isMasterPortalUnlocked: false,
      setIsMasterPortalUnlocked: () => {},
      isVisualEditMode: false,
      setIsVisualEditMode: () => {},
      theme: 'light' as const,
      toggleTheme: () => {},
      setTheme: () => {},
      openImagePicker: () => {},
      mediaItems: [],
      addMediaItem: () => ({ id: '', name: '', url: '', category: 'General' as const, createdAt: '' }),
      deleteMediaItem: () => {},
    };
  }
  return ctx;
};

export const MasterEditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMasterPortalUnlocked, setIsMasterPortalUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('aetora_master_auth') === 'true';
  });
  const [isVisualEditMode, setIsVisualEditMode] = useState<boolean>(true);
  
  // Theme state defaulting to 'light' mode
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('aetora_theme_v1');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  });

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('aetora_theme_v1', newTheme);
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
  };

  const [activeImagePicker, setActiveImagePicker] = useState<ImagePickerOptions | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(getStoredMedia);

  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'url'>('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadName, setUploadName] = useState('');

  useEffect(() => {
    localStorage.setItem('aetora_master_auth', isMasterPortalUnlocked ? 'true' : 'false');
  }, [isMasterPortalUnlocked]);

  const openImagePicker = (opts: ImagePickerOptions) => {
    setActiveImagePicker(opts);
    setCustomUrlInput(opts.currentUrl);
    setUploadPreview(null);
    setUploadName('');
  };

  const closeImagePicker = () => {
    setActiveImagePicker(null);
  };

  const addMediaItem = (item: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem => {
    const newMedia: MediaItem = {
      id: `media-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: item.name || 'Uploaded Asset',
      url: item.url,
      category: item.category || 'General',
      createdAt: new Date().toISOString().split('T')[0],
      size: item.size || 'Base64 Data'
    };
    const updated = [newMedia, ...mediaItems];
    setMediaItems(updated);
    saveStoredMedia(updated);
    return newMedia;
  };

  const deleteMediaItem = (id: string) => {
    const updated = mediaItems.filter(m => m.id !== id);
    setMediaItems(updated);
    saveStoredMedia(updated);
  };

  const handleSelectImage = (url: string) => {
    if (activeImagePicker) {
      activeImagePicker.onSave(url);
      closeImagePicker();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB. Please choose a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setUploadPreview(base64Url);
        if (!uploadName) {
          setUploadName(file.name.replace(/\.[^/.]+$/, ''));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveUploadedImage = () => {
    if (!uploadPreview) return;
    const created = addMediaItem({
      name: uploadName || 'New Visual Asset',
      url: uploadPreview,
      category: activeImagePicker?.category || 'General',
    });
    handleSelectImage(created.url);
  };

  const handleSaveUrlImage = () => {
    if (!customUrlInput.trim()) return;
    const created = addMediaItem({
      name: 'External Image URL',
      url: customUrlInput.trim(),
      category: activeImagePicker?.category || 'General',
    });
    handleSelectImage(created.url);
  };

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MasterEditContext.Provider
      value={{
        isMasterPortalUnlocked,
        setIsMasterPortalUnlocked,
        isVisualEditMode,
        setIsVisualEditMode,
        theme,
        toggleTheme,
        setTheme,
        openImagePicker,
        mediaItems,
        addMediaItem,
        deleteMediaItem,
      }}
    >
      {children}

      {/* Floating Toolbar when Master Portal is active */}
      {isMasterPortalUnlocked && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1C1A17]/95 text-[#E8E4DF] border border-[#D49E6A]/50 px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-4 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold text-white tracking-wide uppercase">Master Portal Live Editor Active</span>
          </div>

          <div className="h-4 w-px bg-[#3D3833]"></div>

          <label className="flex items-center gap-2 cursor-pointer font-bold text-[#D49E6A]">
            <input
              type="checkbox"
              checked={isVisualEditMode}
              onChange={(e) => setIsVisualEditMode(e.target.checked)}
              className="accent-[#D49E6A] w-4 h-4 rounded cursor-pointer"
            />
            <span>Visual Direct Edit</span>
          </label>

          <span className="text-[10px] text-[#9E958C] hidden md:inline">
            (Double-click text or image on page to edit)
          </span>
        </div>
      )}

      {/* Image Picker / Media Manager Popup Dialog */}
      {activeImagePicker && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-sans text-[#E8E4DF]">
          <div className="bg-[#1C1A17] max-w-3xl w-full rounded-3xl border border-[#3D3833] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col relative animate-scale-in">
            
            {/* Modal Header */}
            <div className="bg-[#2B2723] px-6 py-4 border-b border-[#3D3833] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#D49E6A] text-[#121110] rounded-xl font-bold">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white">
                    {activeImagePicker.title || 'Live Image Editor & Media Manager'}
                  </h3>
                  <span className="text-[10px] text-[#D49E6A] uppercase font-bold tracking-wider">
                    Double-Click Asset Manager • Instant Website Update
                  </span>
                </div>
              </div>
              <button
                onClick={closeImagePicker}
                className="p-2 text-[#9E958C] hover:text-white rounded-full bg-[#3D3833]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Sub-Tabs */}
            <div className="flex border-b border-[#3D3833] bg-[#221F1C] px-6 gap-4 text-xs font-bold uppercase tracking-wider pt-2">
              <button
                onClick={() => setActiveTab('library')}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'library'
                    ? 'border-[#D49E6A] text-[#D49E6A]'
                    : 'border-transparent text-[#9E958C] hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Media Library ({mediaItems.length})
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'upload'
                    ? 'border-[#D49E6A] text-[#D49E6A]'
                    : 'border-transparent text-[#9E958C] hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" /> Upload Local Computer Image
              </button>
              <button
                onClick={() => setActiveTab('url')}
                className={`py-3 px-3 border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'url'
                    ? 'border-[#D49E6A] text-[#D49E6A]'
                    : 'border-transparent text-[#9E958C] hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Custom Image Link
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* TAB: Media Library */}
              {activeTab === 'library' && (
                <div className="space-y-4">
                  {/* Search and Category Filter */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-[#9E958C]" />
                      <input
                        type="text"
                        placeholder="Search media assets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#2B2723] border border-[#3D3833] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D49E6A]"
                      />
                    </div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-[#2B2723] border border-[#3D3833] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D49E6A]"
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

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[50vh] overflow-y-auto p-1">
                    {filteredMedia.map((media) => (
                      <div
                        key={media.id}
                        onClick={() => handleSelectImage(media.url)}
                        className={`group relative bg-[#2B2723] rounded-2xl border p-2 cursor-pointer transition-all hover:scale-105 ${
                          activeImagePicker.currentUrl === media.url
                            ? 'border-[#D49E6A] ring-2 ring-[#D49E6A]/50 bg-[#332E2B]'
                            : 'border-[#3D3833] hover:border-[#D49E6A]'
                        }`}
                      >
                        <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#121110] relative">
                          <img
                            src={media.url}
                            alt={media.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <span className="absolute top-1.5 left-1.5 bg-[#121110]/80 text-[#D49E6A] font-bold text-[9px] px-2 py-0.5 rounded">
                            {media.category}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-white truncate mt-2">{media.name}</h4>
                        <div className="flex items-center justify-between text-[10px] text-[#9E958C] mt-1">
                          <span>{media.createdAt}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMediaItem(media.id);
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1"
                            title="Delete image asset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: Local Computer Upload */}
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-[#D49E6A]/50 rounded-3xl p-8 text-center bg-[#221F1C] space-y-4">
                    <Upload className="w-12 h-12 text-[#D49E6A] mx-auto" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Select Image from Your Computer</h4>
                      <p className="text-xs text-[#9E958C]">PNG, JPG, WEBP, SVG supported (max 8MB)</p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="block text-xs text-[#D49E6A] mx-auto file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#D49E6A] file:text-[#121110] cursor-pointer"
                    />
                  </div>

                  {uploadPreview && (
                    <div className="bg-[#2B2723] p-4 rounded-2xl border border-[#3D3833] space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Local Image Ready
                        </span>
                        <input
                          type="text"
                          placeholder="Asset Name (optional)"
                          value={uploadName}
                          onChange={(e) => setUploadName(e.target.value)}
                          className="bg-[#1C1A17] border border-[#3D3833] rounded-xl px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                      <img
                        src={uploadPreview}
                        alt="Upload preview"
                        className="max-h-48 object-contain rounded-xl mx-auto border border-[#3D3833]"
                      />
                      <button
                        onClick={handleSaveUploadedImage}
                        className="w-full bg-[#D49E6A] text-[#121110] font-bold py-3 rounded-xl uppercase text-xs shadow-lg hover:opacity-95"
                      >
                        Apply Image & Update Website Live
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: Image URL */}
              {activeTab === 'url' && (
                <div className="space-y-4 bg-[#221F1C] p-6 rounded-3xl border border-[#3D3833]">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#D49E6A] mb-1">
                      Paste Image Direct Web Address (URL)
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={customUrlInput}
                      onChange={(e) => setCustomUrlInput(e.target.value)}
                      className="w-full bg-[#1C1A17] border border-[#3D3833] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#D49E6A]"
                    />
                  </div>

                  {customUrlInput && (
                    <div className="space-y-3">
                      <span className="text-xs text-[#9E958C] block">Preview:</span>
                      <img
                        src={customUrlInput}
                        alt="URL Preview"
                        className="max-h-48 object-contain rounded-xl mx-auto border border-[#3D3833]"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <button
                    onClick={handleSaveUrlImage}
                    className="w-full bg-[#D49E6A] text-[#121110] font-bold py-3 rounded-xl uppercase text-xs shadow-lg hover:opacity-95"
                  >
                    Apply Image URL & Save
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>
      )}
    </MasterEditContext.Provider>
  );
};

// Component 1: EditableText
interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  as?: React.ElementType;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onSave,
  as: Component = 'span',
  className = '',
  multiline = false,
  placeholder = 'Click to edit...',
  children,
}) => {
  const { isMasterPortalUnlocked, isVisualEditMode } = useMasterEdit();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const canEdit = isMasterPortalUnlocked && isVisualEditMode;

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onSave(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (!multiline || e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setTempValue(value);
    }
  };

  if (isEditing && canEdit) {
    if (multiline) {
      return (
        <textarea
          autoFocus
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={3}
          className={`bg-[#2B2723] text-white border-2 border-[#D49E6A] rounded-xl p-2 w-full focus:outline-none shadow-lg text-sm font-sans ${className}`}
        />
      );
    }
    return (
      <input
        autoFocus
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`bg-[#2B2723] text-white border-2 border-[#D49E6A] rounded-lg px-2 py-0.5 focus:outline-none shadow-lg text-inherit font-inherit ${className}`}
      />
    );
  }

  // Element with double-click listener when canEdit is true
  return (
    <Component
      onDoubleClick={() => {
        if (canEdit) {
          setIsEditing(true);
        }
      }}
      className={`${className} ${
        canEdit
          ? 'hover:outline-dashed hover:outline-2 hover:outline-[#D49E6A] hover:bg-[#D49E6A]/10 rounded transition-all cursor-pointer relative group/edit'
          : ''
      }`}
      title={canEdit ? 'Double-click to edit text directly' : undefined}
    >
      {children || value || placeholder}
      {canEdit && (
        <span className="opacity-0 group-hover/edit:opacity-100 transition-opacity absolute -top-3 -right-3 bg-[#D49E6A] text-[#121110] p-1 rounded-full shadow text-[9px] pointer-events-none z-30">
          <Edit3 className="w-2.5 h-2.5" />
        </span>
      )}
    </Component>
  );
};

// Component 2: EditableImage
interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (newSrc: string) => void;
  className?: string;
  imageTitle?: string;
  category?: 'Hero Background' | 'Logo' | 'Portfolio' | 'Gallery' | 'Profile' | 'QR Code' | 'General';
  children?: React.ReactNode;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  src,
  alt,
  onSave,
  className = '',
  imageTitle = 'Change Image',
  category = 'General',
  children,
}) => {
  const { isMasterPortalUnlocked, isVisualEditMode, openImagePicker } = useMasterEdit();

  const canEdit = isMasterPortalUnlocked && isVisualEditMode;

  const handleDoubleClick = () => {
    if (canEdit) {
      openImagePicker({
        title: `Edit Image: ${imageTitle}`,
        currentUrl: src,
        category,
        onSave,
      });
    }
  };

  return (
    <div
      onDoubleClick={handleDoubleClick}
      className={`relative group/imgEdit ${className} ${
        canEdit ? 'cursor-pointer hover:ring-2 hover:ring-[#D49E6A] rounded-2xl transition-all' : ''
      }`}
      title={canEdit ? 'Double-click to replace image' : undefined}
    >
      {children || <img src={src} alt={alt} className="w-full h-full object-cover" />}
      {canEdit && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/imgEdit:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-1.5 text-white font-sans text-xs font-bold pointer-events-none z-20">
          <Camera className="w-4 h-4 text-[#D49E6A]" />
          <span>Double-click to change</span>
        </div>
      )}
    </div>
  );
};
