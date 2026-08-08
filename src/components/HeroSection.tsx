import React, { useState } from 'react';
import { DeveloperProfile, WebsiteProject } from '../types';
import { ArrowRight, Eye, Send, Building2, Sliders, Camera, Sparkles, Box } from 'lucide-react';
import { useMasterEdit, EditableText, EditableImage } from './MasterEditContext';
import { Hero3DBackground } from './Hero3DBackground';

interface HeroSectionProps {
  profile: DeveloperProfile;
  selectedProjects: WebsiteProject[];
  onViewDesignsClick: () => void;
  onContactClick: () => void;
  onSelectProject: (project: WebsiteProject) => void;
  onUpdateProfile: (updated: Partial<DeveloperProfile>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  selectedProjects,
  onViewDesignsClick,
  onContactClick,
  onSelectProject,
  onUpdateProfile,
}) => {
  const { isMasterPortalUnlocked, isVisualEditMode, openImagePicker, theme } = useMasterEdit();
  const [showBgSettings, setShowBgSettings] = useState(false);

  const heroBg = profile.heroBackgroundImageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000';
  const overlayOpacity = profile.heroBackgroundOverlayOpacity ?? 0.75;
  const blurAmount = profile.heroBackgroundBlur ?? 2;
  const hero3DEnabled = profile.hero3DEnabled ?? true;
  const hero3DSpeed = profile.hero3DSpeed ?? 1;
  const hero3DParticleCount = profile.hero3DParticleCount ?? 18;
  const hero3DGlowStrength = profile.hero3DGlowStrength ?? 0.8;

  const isLight = theme === 'light';

  const handleEditBgImage = () => {
    openImagePicker({
      title: 'Change Hero Background Image',
      currentUrl: heroBg,
      category: 'Hero Background',
      onSave: (newUrl) => {
        onUpdateProfile({ heroBackgroundImageUrl: newUrl });
      },
    });
  };

  return (
    <section
      id="home"
      onDoubleClick={(e) => {
        if (e.target === e.currentTarget && isMasterPortalUnlocked && isVisualEditMode) {
          handleEditBgImage();
        }
      }}
      className={`scroll-mt-24 pt-8 pb-16 px-6 font-serif border-b relative overflow-hidden transition-colors duration-300 ${
        isLight
          ? 'bg-[#FAF8F5] text-[#111827] border-[#E2D9CE]'
          : 'bg-[#121110] text-[#E8E4DF] border-[#2E2A25]'
      }`}
    >
      {/* Dynamic Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 pointer-events-none"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: `blur(${blurAmount}px)`,
        }}
      />

      {/* Dynamic Dark/Light Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isLight
            ? 'bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/90 to-[#FAF8F5]'
            : 'bg-gradient-to-b from-[#121110] via-[#121110]/90 to-[#121110]'
        }`}
        style={{ opacity: overlayOpacity }}
      />

      {/* Interactive 3D Technology Background Canvas */}
      <Hero3DBackground
        enabled={hero3DEnabled}
        speed={hero3DSpeed}
        particleCount={hero3DParticleCount}
        glowStrength={hero3DGlowStrength}
        theme={theme}
      />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Sub-Header Bar & Master Background Controls */}
        <div className={`flex flex-wrap items-center justify-between text-xs font-sans tracking-widest uppercase border-b pb-3 gap-2 ${
          isLight ? 'border-[#E2D9CE] text-[#4B5563]' : 'border-[#2E2A25] text-[#A69D92]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-[#B87D4B] font-bold text-sm">✴</span>
            <EditableText
              value={profile.companyName || 'AETORA Technologies'}
              onSave={(val) => onUpdateProfile({ companyName: val })}
              className={`font-bold tracking-wider ${isLight ? 'text-[#111827]' : 'text-white'}`}
            />
            <span className={isLight ? 'text-[#D1D5DB]' : 'text-[#59534C]'}>•</span>
            <span className="font-semibold text-[#B87D4B]">OFFICIAL DIGITAL SHOWROOM</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className={`font-semibold hidden sm:inline ${isLight ? 'text-[#111827]' : 'text-[#E8E4DF]'}`}>
                AVAILABLE FOR ENTERPRISE PROJECTS
              </span>
            </div>

            {/* Master Portal Background & 3D Controls Trigger */}
            {isMasterPortalUnlocked && (
              <div className="relative">
                <button
                  onClick={() => setShowBgSettings(!showBgSettings)}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[10px] font-bold uppercase transition-all shadow-md border ${
                    isLight
                      ? 'bg-white text-[#B87D4B] border-[#B87D4B]/40 hover:bg-[#F9FAFB]'
                      : 'bg-[#2B2723] text-[#D49E6A] border-[#D49E6A]/50 hover:bg-[#38332E]'
                  }`}
                >
                  <Sliders className="w-3 h-3" /> Hero 3D & Background Manager
                </button>

                {showBgSettings && (
                  <div className={`absolute right-0 top-9 border rounded-2xl p-4 shadow-2xl z-50 w-80 space-y-4 font-sans text-xs ${
                    isLight ? 'bg-white border-[#E5E7EB] text-[#111827]' : 'bg-[#1C1A17] border-[#3D3833] text-white'
                  }`}>
                    <div className="flex justify-between items-center font-bold text-[#B87D4B]">
                      <span className="flex items-center gap-1.5">
                        <Box className="w-4 h-4" /> 3D & Background Controls
                      </span>
                      <button onClick={() => setShowBgSettings(false)} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
                    </div>

                    {/* 3D Background Toggle */}
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-500/10 border border-gray-500/20">
                      <div>
                        <span className="font-bold block">3D Animated Objects</span>
                        <span className="text-[10px] text-gray-400">Floating glass cards & nodes</span>
                      </div>
                      <button
                        onClick={() => onUpdateProfile({ hero3DEnabled: !hero3DEnabled })}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                          hero3DEnabled ? 'bg-emerald-500 text-white' : 'bg-gray-600 text-gray-200'
                        }`}
                      >
                        {hero3DEnabled ? 'ON' : 'OFF'}
                      </button>
                    </div>

                    {/* 3D Speed */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                        <span>3D Animation Speed</span>
                        <span>{hero3DSpeed.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.1"
                        value={hero3DSpeed}
                        onChange={(e) => onUpdateProfile({ hero3DSpeed: parseFloat(e.target.value) })}
                        className="w-full accent-[#B87D4B] cursor-pointer"
                      />
                    </div>

                    {/* 3D Glow Strength */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                        <span>3D Lighting Glow</span>
                        <span>{Math.round(hero3DGlowStrength * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="1.5"
                        step="0.1"
                        value={hero3DGlowStrength}
                        onChange={(e) => onUpdateProfile({ hero3DGlowStrength: parseFloat(e.target.value) })}
                        className="w-full accent-[#B87D4B] cursor-pointer"
                      />
                    </div>

                    {/* Particle Count */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                        <span>Floating Objects Count</span>
                        <span>{hero3DParticleCount}</span>
                      </div>
                      <input
                        type="range"
                        min="6"
                        max="25"
                        step="1"
                        value={hero3DParticleCount}
                        onChange={(e) => onUpdateProfile({ hero3DParticleCount: parseInt(e.target.value) })}
                        className="w-full accent-[#B87D4B] cursor-pointer"
                      />
                    </div>

                    <div className="border-t border-gray-500/20 pt-3 space-y-3">
                      <button
                        onClick={handleEditBgImage}
                        className="w-full bg-[#B87D4B] text-white p-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs shadow hover:opacity-95"
                      >
                        <Camera className="w-3.5 h-3.5" /> Change Background Image
                      </button>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-gray-400">
                          <span>Overlay Opacity</span>
                          <span>{Math.round(overlayOpacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="0.95"
                          step="0.05"
                          value={overlayOpacity}
                          onChange={(e) => onUpdateProfile({ heroBackgroundOverlayOpacity: parseFloat(e.target.value) })}
                          className="w-full accent-[#B87D4B] cursor-pointer"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-gray-400">
                          <span>Backdrop Blur</span>
                          <span>{blurAmount}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="15"
                          step="1"
                          value={blurAmount}
                          onChange={(e) => onUpdateProfile({ heroBackgroundBlur: parseInt(e.target.value) })}
                          className="w-full accent-[#B87D4B] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hero Headline & Editable Text Elements */}
        <div className="text-center space-y-4 pt-2">
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight leading-tight max-w-5xl mx-auto ${
            isLight ? 'text-[#111827]' : 'text-white'
          }`}>
            <EditableText
              value={profile.heroHeadingTitle || 'Modern Websites.'}
              onSave={(val) => onUpdateProfile({ heroHeadingTitle: val })}
              placeholder="Modern Websites."
              className={`block ${isLight ? 'text-[#111827]' : 'text-white'}`}
            />
            <EditableText
              value={profile.heroHeadingSubtitle || 'Powerful Digital Experiences.'}
              onSave={(val) => onUpdateProfile({ heroHeadingSubtitle: val })}
              placeholder="Powerful Digital Experiences."
              className="italic font-light text-[#B87D4B] block"
            />
            <EditableText
              value={profile.heroHeadingSuffix || 'Built by AETORA Technologies.'}
              onSave={(val) => onUpdateProfile({ heroHeadingSuffix: val })}
              placeholder="Built by AETORA Technologies."
              className={`font-bold block ${isLight ? 'text-[#111827]' : 'text-white'}`}
            />
          </h1>

          <p className={`text-sm sm:text-base font-sans max-w-3xl mx-auto leading-relaxed ${
            isLight ? 'text-[#4B5563]' : 'text-[#A69D92]'
          }`}>
            <EditableText
              value={profile.heroDescription || 'We design and develop premium websites, web applications, and digital platforms for modern enterprises.'}
              onSave={(val) => onUpdateProfile({ heroDescription: val })}
              multiline
              placeholder="We design and develop premium websites..."
            />
          </p>
        </div>

        {/* Hero Grid: Founder Spotlight & Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Left Column: Founder & CEO Spotlight */}
          <div className={`lg:col-span-5 space-y-5 p-8 rounded-3xl border backdrop-blur-md shadow-2xl transition-colors ${
            isLight
              ? 'bg-white/80 border-[#E2D9CE]'
              : 'bg-[#1C1A17]/80 border-[#2E2A25]'
          }`}>
            <div className="flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#B87D4B] font-bold">
              <Building2 className="w-4 h-4" />
              <span>FOUNDER & CEO SPOTLIGHT</span>
            </div>
            
            <div className="space-y-1">
              <h2 className={`text-2xl sm:text-3xl font-serif font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>
                <EditableText
                  value={profile.ownerName || 'Senaf Wondimmu'}
                  onSave={(val) => onUpdateProfile({ ownerName: val })}
                  placeholder="Senaf Wondimmu"
                />
              </h2>
              <p className="text-xs font-sans uppercase tracking-wider text-[#B87D4B] font-semibold">
                <EditableText
                  value={profile.ownerTitle || 'Founder & CEO, Full-Stack Software Engineer, UI/UX Designer'}
                  onSave={(val) => onUpdateProfile({ ownerTitle: val })}
                  placeholder="Founder & CEO, Full-Stack Software Engineer..."
                />
              </p>
            </div>

            <p className={`text-xs sm:text-sm font-sans leading-relaxed ${isLight ? 'text-[#4B5563]' : 'text-[#A69D92]'}`}>
              <EditableText
                value={profile.founderBio || profile.bio || 'Founded by Senaf Wondimmu, AETORA Technologies combines robust full-stack software engineering with modern UI/UX design to build scalable digital solutions.'}
                onSave={(val) => onUpdateProfile({ founderBio: val })}
                multiline
                placeholder="Founded by Senaf Wondimmu, AETORA Technologies..."
              />
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 font-sans">
              <button
                onClick={onViewDesignsClick}
                className="bg-[#B87D4B] hover:bg-[#A36B3B] text-white text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                <Eye className="w-4 h-4" /> Explore Showcase
              </button>
              <button
                onClick={onContactClick}
                className={`border text-xs uppercase tracking-wider font-bold px-6 py-3.5 rounded-full transition-all flex items-center gap-2 ${
                  isLight
                    ? 'border-[#B87D4B] text-[#B87D4B] hover:bg-[#B87D4B] hover:text-white'
                    : 'border-[#D49E6A] text-[#D49E6A] hover:bg-[#D49E6A] hover:text-[#121110]'
                }`}
              >
                <Send className="w-3.5 h-3.5" /> Contact AETORA
              </button>
            </div>
          </div>

          {/* Center Column: Founder Photo & Double-Click Image Replacement */}
          <div className="lg:col-span-4 relative flex items-center justify-center py-4">
            <div className={`relative w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-gradient-to-tr flex items-center justify-center shadow-2xl ${
              isLight
                ? 'from-[#B87D4B] via-[#E5C198] to-white'
                : 'from-[#D49E6A] via-[#8F643A] to-[#121110]'
            }`}>
              <EditableImage
                src={profile.profilePhotoUrl}
                alt={`${profile.ownerName} - Founder & CEO`}
                onSave={(newUrl) => onUpdateProfile({ profilePhotoUrl: newUrl })}
                imageTitle="Founder Photo"
                category="Profile"
                className="w-56 sm:w-64 h-72 sm:h-80 rounded-b-full rounded-t-full overflow-hidden absolute bottom-0 z-10 shadow-2xl"
              >
                <img
                  src={profile.profilePhotoUrl}
                  alt={profile.ownerName}
                  className="w-full h-full object-cover filter contrast-105"
                />
              </EditableImage>
            </div>

            {/* Seal Badge */}
            <div className={`absolute top-0 right-2 p-3 rounded-full shadow-2xl border z-20 text-center w-28 h-28 flex items-center justify-center ${
              isLight
                ? 'bg-white border-[#B87D4B]/40 text-[#B87D4B]'
                : 'bg-[#1C1A17] border-[#D49E6A]/50 text-[#D49E6A]'
            }`}>
              <div className="text-[9px] font-sans font-bold uppercase tracking-tighter leading-tight">
                • AETORA • <br />
                PREMIUM DIGITAL <br />
                EXPERIENCES
              </div>
            </div>
          </div>

          {/* Right Column: Key Attributes & Mission */}
          <div className="lg:col-span-3 space-y-4 font-sans text-xs">
            <div className={`p-5 rounded-2xl backdrop-blur-md border shadow-lg ${
              isLight ? 'bg-white/80 border-[#E2D9CE]' : 'bg-[#1C1A17]/80 border-[#2E2A25]'
            }`}>
              <span className="text-[10px] uppercase tracking-widest text-[#B87D4B] font-bold block mb-1">COMPANY MISSION</span>
              <p className={`text-xs leading-relaxed italic ${isLight ? 'text-[#4B5563]' : 'text-[#A69D92]'}`}>
                "<EditableText
                  value={profile.aboutMission || 'We build future-ready web systems and software solutions.'}
                  onSave={(val) => onUpdateProfile({ aboutMission: val })}
                  multiline
                  placeholder="We build future-ready web systems..."
                />"
              </p>
            </div>

            <div className={`p-5 rounded-2xl backdrop-blur-md border shadow-lg space-y-3 ${
              isLight ? 'bg-white/80 border-[#E2D9CE]' : 'bg-[#1C1A17]/80 border-[#2E2A25]'
            }`}>
              {profile.stats.map((stat, i) => (
                <div key={i} className={`flex justify-between items-center font-bold border-b pb-2 last:border-0 last:pb-0 ${
                  isLight ? 'border-[#E5E7EB] text-[#111827]' : 'border-[#2E2A25] text-[#E8E4DF]'
                }`}>
                  <EditableText
                    value={stat.label}
                    onSave={(newLabel) => {
                      const newStats = [...profile.stats];
                      newStats[i].label = newLabel;
                      onUpdateProfile({ stats: newStats });
                    }}
                  />
                  <EditableText
                    value={stat.value}
                    onSave={(newValue) => {
                      const newStats = [...profile.stats];
                      newStats[i].value = newValue;
                      onUpdateProfile({ stats: newStats });
                    }}
                    className="text-sm text-[#B87D4B] font-serif"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Showcase Carousel Header Strip */}
        <div className={`pt-10 border-t ${isLight ? 'border-[#E2D9CE]' : 'border-[#2E2A25]'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className={`font-serif font-bold text-xl uppercase tracking-tight ${
                isLight ? 'text-[#111827]' : 'text-white'
              }`}>
                FEATURED DIGITAL SHOWCASE
              </h3>
              <p className={`text-xs font-sans ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
                Explore pixel-perfect custom websites engineered by AETORA Technologies.
              </p>
            </div>
            <button
              onClick={onViewDesignsClick}
              className="text-xs font-sans font-bold text-[#B87D4B] hover:underline uppercase tracking-wider flex items-center gap-1"
            >
              VIEW ALL SHOWCASE <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedProjects.slice(0, 4).map((proj, idx) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className={`group cursor-pointer rounded-2xl p-3 border shadow-md hover:shadow-xl transition-all ${
                  isLight
                    ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                    : 'bg-[#1C1A17] border-[#2E2A25] hover:border-[#D49E6A]'
                }`}
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 relative bg-gray-200">
                  <EditableImage
                    src={proj.previewImageUrl}
                    alt={proj.title}
                    onSave={() => {}}
                    imageTitle={proj.title}
                    category="Portfolio"
                    className="w-full h-full"
                  >
                    <img
                      src={proj.previewImageUrl}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </EditableImage>
                  <span className={`absolute top-2 left-2 font-sans font-bold text-[10px] px-2 py-0.5 rounded ${
                    isLight ? 'bg-white/90 text-[#B87D4B]' : 'bg-[#121110]/80 text-[#D49E6A]'
                  }`}>
                    0{idx + 1}
                  </span>
                </div>
                <h4 className={`font-serif font-bold text-xs truncate transition-colors ${
                  isLight ? 'text-[#111827] group-hover:text-[#B87D4B]' : 'text-white group-hover:text-[#D49E6A]'
                }`}>
                  <EditableText
                    value={proj.title}
                    onSave={() => {}}
                  />
                </h4>
                <p className={`text-[10px] font-sans uppercase tracking-wider ${
                  isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'
                }`}>
                  {proj.category} Platform
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

