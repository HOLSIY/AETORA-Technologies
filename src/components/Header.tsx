import React, { useState, useEffect } from 'react';
import { PhoneCall, Sun, Moon, Menu, X } from 'lucide-react';
import { useMasterEdit, EditableText } from './MasterEditContext';
import { DeveloperProfile } from '../types';

interface HeaderProps {
  profile?: DeveloperProfile;
  onContactClick: () => void;
  selectedCategory?: string;
  onCategorySelect?: (category: string) => void;
  categories?: string[];
  onUpdateProfile?: (updated: Partial<DeveloperProfile>) => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  onContactClick,
  onUpdateProfile,
  onHomeClick,
}) => {
  const { theme, toggleTheme } = useMasterEdit();
  const isLight = theme === 'light';

  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Nav Items Configuration in exact visual page order: Home -> Showcase -> About Us -> Services -> Reviews -> Contact Us
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'showcase', label: 'Showcase' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact Us' },
  ];

  // Scroll listener for sticky header shadow & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = ['home', 'showcase', 'about', 'services', 'reviews', 'contact'];

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting);
      if (visible.length > 0) {
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visible[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-80px 0px -40% 0px',
      threshold: [0.1, 0.25, 0.5, 0.75],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle initial page load with URL hash anchor
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'showcase', 'about', 'services', 'reviews', 'contact'].includes(hash)) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const header = document.querySelector('header');
          const headerHeight = header ? header.offsetHeight : 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerHeight;
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
          setActiveSection(hash);
        }
      }, 150);
    }
  }, []);

  // Smooth Scroll Handler (No Page Reload, No Hash Jump, No Flickering)
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    // If currently in detail view, handle returning to main view
    if (onHomeClick) {
      onHomeClick();
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', `#${sectionId}`);
      }

      setActiveSection(sectionId);
    }
  };

  // Logo Click Handler: Always smooth scrolls back to Home section
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHomeClick) {
      onHomeClick();
    }
    const element = document.getElementById('home');
    if (element) {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.history.pushState) {
      window.history.pushState(null, '', '#home');
    }
    setActiveSection('home');
  };

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'bg-[#FAF8F5]/95 border-[#E2D9CE] shadow-lg shadow-black/5'
            : 'bg-[#121110]/95 border-[#2A2724] shadow-2xl shadow-black/50'
          : isLight
          ? 'bg-[#FAF8F5]/80 border-[#E2D9CE]'
          : 'bg-[#121110]/80 border-[#2A2724]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Company Logo / Name Navigation */}
        <a
          href="#home"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group cursor-pointer focus:outline-none"
          title="Back to Top / Hero Section"
        >
          {profile?.logoUrl ? (
            <img
              src={profile.logoUrl}
              alt={profile?.companyName || 'AETORA Technologies'}
              className="h-10 max-w-[160px] object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D49E6A] to-[#B87D4B] text-[#121110] font-serif font-black text-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              A
            </div>
          )}
          <div>
            <span
              className={`font-serif text-lg font-bold tracking-tight block transition-colors ${
                isLight ? 'text-[#111827] group-hover:text-[#B87D4B]' : 'text-[#FAF7F2] group-hover:text-[#D49E6A]'
              }`}
            >
              <EditableText
                value={profile?.companyName || 'AETORA Technologies'}
                onSave={(val) => onUpdateProfile?.({ companyName: val })}
              />
            </span>
            <span
              className={`text-[9px] tracking-[0.2em] uppercase font-sans font-bold block ${
                isLight ? 'text-[#6B7280]' : 'text-[#9E958C]'
              }`}
            >
              PREMIUM WEB & SOFTWARE SOLUTIONS
            </span>
          </div>
        </a>

        {/* Center Desktop Navigation with Active Highlighting */}
        <nav
          className={`hidden lg:flex items-center gap-1 text-xs font-sans font-semibold tracking-wider uppercase transition-colors p-1.5 rounded-2xl ${
            isLight ? 'bg-black/5 text-[#4B5563]' : 'bg-white/5 text-[#C4BDB5]'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-200 relative ${
                  isActive
                    ? isLight
                      ? 'bg-white text-[#B87D4B] shadow-sm font-bold'
                      : 'bg-[#2B2723] text-[#D49E6A] shadow-md font-bold'
                    : isLight
                    ? 'hover:text-[#B87D4B] hover:bg-black/5'
                    : 'hover:text-[#D49E6A] hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#D49E6A] rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-2 text-xs font-medium ${
              isLight
                ? 'bg-white border-[#E5E7EB] text-[#374151] hover:bg-[#F3F4F6] hover:border-[#D1D5DB] shadow-sm'
                : 'bg-[#2B2723] border-[#3D3833] text-[#E8E4DF] hover:bg-[#38332E]'
            }`}
          >
            {isLight ? (
              <>
                <Moon className="w-4 h-4 text-[#B87D4B]" />
                <span className="hidden sm:inline text-[11px] font-semibold">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4 text-[#D49E6A]" />
                <span className="hidden sm:inline text-[11px] font-semibold">Light</span>
              </>
            )}
          </button>

          {/* Contact Button */}
          <button
            onClick={onContactClick}
            className="flex items-center gap-2 bg-gradient-to-r from-[#D49E6A] to-[#B87D4B] hover:opacity-95 text-[#121110] font-sans font-bold text-xs uppercase px-5 py-2.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contact Us</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl border transition-colors ${
              isLight ? 'bg-white border-gray-200 text-gray-700' : 'bg-[#2B2723] border-[#3D3833] text-white'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D49E6A]" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t px-6 py-4 space-y-2 transition-all duration-300 ${
            isLight ? 'bg-[#FAF8F5] border-gray-200 text-gray-800' : 'bg-[#1C1A17] border-[#3D3833] text-white'
          }`}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`block px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-[#D49E6A] text-[#121110]'
                    : isLight
                    ? 'hover:bg-gray-100 text-gray-700'
                    : 'hover:bg-[#2B2723] text-gray-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
