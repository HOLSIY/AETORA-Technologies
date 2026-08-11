import React, { useState, useEffect, useRef } from 'react';
import { WebsiteProject, DeveloperProfile, Testimonial, SkillItem, SectionOrderItem } from './types';
import {
  getStoredProfile,
  getStoredProjects,
  getStoredTestimonials,
  getStoredSkills,
  saveStoredProfile,
  subscribeCMSUpdates,
  syncCloudSiteSettings
} from './data/store';
import { MasterEditProvider, EditableText } from './components/MasterEditContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectGrid } from './components/ProjectGrid';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ContactModal } from './components/ContactModal';
import { MasterPortalModal } from './components/MasterPortalModal';

export function AppContent() {
  const [projects, setProjects] = useState<WebsiteProject[]>(getStoredProjects);
  const [profile, setProfile] = useState<DeveloperProfile>(getStoredProfile);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getStoredTestimonials);
  const [skills, setSkills] = useState<SkillItem[]>(getStoredSkills);

  const [selectedProject, setSelectedProject] = useState<WebsiteProject | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactProjectTitle, setContactProjectTitle] = useState<string | undefined>(undefined);
  const [isMasterPortalOpen, setIsMasterPortalOpen] = useState(false);

  // Store scroll position before navigating into project detail
  const savedScrollY = useRef<number>(0);

  // Subscribe to live CMS store changes across tabs/windows & sync from persistent cloud
  useEffect(() => {
    const doSync = () => {
      syncCloudSiteSettings().then((updated) => {
        if (updated) {
          setProfile(updated);
        }
      });
    };

    doSync();

    const intervalId = setInterval(doSync, 15000);
    const handleFocus = () => doSync();
    window.addEventListener('focus', handleFocus);

    const syncStore = () => {
      setProjects(getStoredProjects());
      setProfile(getStoredProfile());
      setTestimonials(getStoredTestimonials());
      setSkills(getStoredSkills());
    };

    const unsubscribe = subscribeCMSUpdates(syncStore);
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('focus', handleFocus);
      unsubscribe();
    };
  }, []);

  // Handle route state & browser back button
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (path.includes('mastersenaf68') || hash.includes('mastersenaf68')) {
        setIsMasterPortalOpen(true);
      }

      // Check URL for detail page, e.g. /showcase/solara-dining or #showcase/solara-dining
      const match = path.match(/\/showcase\/([a-z0-9-]+)/) || hash.match(/#showcase\/([a-z0-9-]+)/);
      if (match && match[1]) {
        const found = projects.find(p => p.id === match[1] || p.recreationComponentId === match[1]);
        if (found) {
          setSelectedProject(found);
          return;
        }
      }
    };

    checkRoute();

    const handlePopState = (e: PopStateEvent) => {
      checkRoute();
      if (!window.location.hash.includes('showcase/') && !window.location.pathname.includes('showcase/')) {
        setSelectedProject(null);
        // Restore scroll position
        const restoreY = e.state?.scrollY ?? savedScrollY.current;
        setTimeout(() => {
          window.scrollTo(0, restoreY);
        }, 30);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, [projects]);

  const handleSelectProject = (proj: WebsiteProject) => {
    savedScrollY.current = window.scrollY;
    setSelectedProject(proj);
    window.history.pushState({ projectId: proj.id, scrollY: window.scrollY }, '', `#showcase/${proj.id}`);
    window.scrollTo(0, 0);
  };

  const handleBackToShowcase = () => {
    if (selectedProject) {
      setSelectedProject(null);
      if (window.location.hash.includes('showcase/')) {
        window.history.back();
      }
      setTimeout(() => {
        window.scrollTo(0, savedScrollY.current);
      }, 50);
    }
  };

  const handleOpenContact = (projectTitle?: string) => {
    setContactProjectTitle(projectTitle);
    setIsContactOpen(true);
  };

  const handleUpdateProfile = (updated: Partial<DeveloperProfile>) => {
    const newProfile = { ...profile, ...updated };
    setProfile(newProfile);
    saveStoredProfile(newProfile);
  };

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Default section order: Hero -> Showcase -> About -> Testimonials
  const defaultSections: SectionOrderItem[] = [
    { id: 'hero', name: 'Hero Landing', enabled: true },
    { id: 'showcase', name: 'ENTERPRISE SHOWCASE & DESIGNS', enabled: true },
    { id: 'about', name: 'About AETORA & Technical Capabilities', enabled: true },
    { id: 'testimonials', name: 'Client Reviews & Contact Callout', enabled: true }
  ];

  const activeSections = profile.sectionsOrder && profile.sectionsOrder.length > 0
    ? profile.sectionsOrder
    : defaultSections;

  const renderSectionItem = (secId: string) => {
    switch (secId) {
      case 'hero':
        return (
          <HeroSection
            key="hero"
            profile={profile}
            selectedProjects={projects}
            onViewDesignsClick={scrollToCollection}
            onContactClick={() => handleOpenContact()}
            onSelectProject={(proj) => handleSelectProject(proj)}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'showcase':
        return (
          <ProjectGrid
            key="showcase"
            projects={projects}
            onSelectProject={(proj) => handleSelectProject(proj)}
            onContactClick={(title) => handleOpenContact(title)}
          />
        );
      case 'about':
        return (
          <AboutSection
            key="about"
            profile={profile}
            skills={skills}
          />
        );
      case 'testimonials':
        return (
          <TestimonialsSection
            key="testimonials"
            testimonials={testimonials}
            profile={profile}
            onContactClick={() => handleOpenContact()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#E8E4DF] selection:bg-[#D49E6A] selection:text-[#121110]">
      
      {/* Dynamic View Logic: Project Detail View OR Main Agency Portfolio View */}
      {selectedProject ? (
        <ProjectDetailPage
          project={selectedProject}
          profile={profile}
          onBack={handleBackToShowcase}
          onContactClick={(title) => handleOpenContact(title)}
        />
      ) : (
        <>
          {/* Top Sticky Header */}
          <Header
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onContactClick={() => handleOpenContact()}
            onHomeClick={handleBackToShowcase}
            selectedCategory="All"
            onCategorySelect={() => {}}
            categories={['All', 'Restaurant', 'Cafe', 'Hospital', 'Hotel', 'School', 'Business', 'Corporate', 'Ecommerce', 'Portfolio', 'Real Estate']}
          />

          {/* Dynamic Section Sequence Rendering */}
          {activeSections
            .filter((sec) => sec.enabled)
            .map((sec) => renderSectionItem(sec.id))}

          {/* Official Company Footer */}
          <footer className="bg-[#0C0B0A] text-[#8C857B] py-12 px-6 text-xs font-sans border-t border-[#262320]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                {profile.logoUrl && (
                  <img
                    src={profile.logoUrl}
                    alt={profile.companyName || 'AETORA Technologies'}
                    className="h-9 max-w-[140px] object-contain rounded-lg shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                )}
                <div className="space-y-1 text-center md:text-left">
                  <h3 className="font-serif font-bold text-base text-[#FAF7F2]">
                    <EditableText
                      value={profile.companyName}
                      onSave={(val) => handleUpdateProfile({ companyName: val })}
                    />
                  </h3>
                  <p>
                    <EditableText
                      value={profile.copyrightText}
                      onSave={(val) => handleUpdateProfile({ copyrightText: val })}
                    />
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold uppercase tracking-widest text-[#B5AEA5]">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedProject) handleBackToShowcase();
                    const el = document.getElementById('home') || document.getElementById('hero');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    else window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#D49E6A] transition-colors"
                >
                  Home
                </a>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedProject) handleBackToShowcase();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#D49E6A] transition-colors"
                >
                  Services
                </a>
                <a
                  href="#showcase"
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedProject) handleBackToShowcase();
                    document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#D49E6A] transition-colors"
                >
                  Showcase
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedProject) handleBackToShowcase();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#D49E6A] transition-colors"
                >
                  About AETORA
                </a>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedProject) handleBackToShowcase();
                    document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hover:text-[#D49E6A] transition-colors"
                >
                  Reviews
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    if (selectedProject) handleBackToShowcase();
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    else handleOpenContact();
                  }}
                  className="hover:text-[#D49E6A] transition-colors"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Global Modals */}
      <ContactModal
        profile={profile}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        projectTitle={contactProjectTitle}
      />

      <MasterPortalModal
        isOpen={isMasterPortalOpen}
        onClose={() => setIsMasterPortalOpen(false)}
        projects={projects}
        profile={profile}
        testimonials={testimonials}
        skills={skills}
        onUpdateProjects={(updated) => setProjects(updated)}
        onUpdateProfile={(updated) => setProfile(updated)}
        onUpdateTestimonials={(updated) => setTestimonials(updated)}
        onUpdateSkills={(updated) => setSkills(updated)}
      />

    </div>
  );
}

export function App() {
  return (
    <MasterEditProvider>
      <AppContent />
    </MasterEditProvider>
  );
}

export default App;
