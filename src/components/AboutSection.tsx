import React from 'react';
import { DeveloperProfile, SkillItem } from '../types';
import { Shield, Zap, Lock, Globe, CheckCircle2, Cpu, Layers } from 'lucide-react';
import { useMasterEdit, EditableText } from './MasterEditContext';
import senafOwnerPhoto from '../assets/senaf_owner.jpg';

interface AboutSectionProps {
  profile: DeveloperProfile;
  skills: SkillItem[];
  onUpdateProfile?: (updated: Partial<DeveloperProfile>) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile, skills, onUpdateProfile }) => {
  const { theme } = useMasterEdit();
  const isLight = theme === 'light';

  const companyServices = profile.services || [
    'Website Design',
    'Web Application Development',
    'Business Systems',
    'Restaurant Systems',
    'Hospital Websites',
    'School Portals',
    'Hotel Platforms',
    'E-Commerce Solutions',
    'Admin Dashboards',
    'CMS Development',
    'UI/UX Design',
    'API Integration',
    'SEO Optimization',
    'Website Maintenance',
    'Hosting Support',
    'Performance Optimization'
  ];

  return (
    <section id="about" className={`scroll-mt-24 py-20 px-6 border-b font-serif transition-colors duration-300 ${
      isLight
        ? 'bg-[#FAF8F5] text-[#111827] border-[#E2D9CE]'
        : 'bg-[#121110] text-[#E8E4DF] border-[#2E2A25]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Title Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B87D4B] font-bold block">
            ABOUT AETORA TECHNOLOGIES
          </span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-bold uppercase tracking-tight ${
            isLight ? 'text-[#111827]' : 'text-white'
          }`}>
            INNOVATION • PERFORMANCE • SCALABILITY
          </h2>
          <div className="w-16 h-0.5 bg-[#B87D4B] mx-auto"></div>
        </div>

        {/* Company Mission, Vision & Founder Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
          
          {/* Mission Card */}
          <div className={`lg:col-span-4 p-8 rounded-3xl border shadow-sm space-y-4 flex flex-col justify-between transition-colors ${
            isLight
              ? 'bg-white border-[#E5E7EB]'
              : 'bg-[#1C1A17] border-[#2E2A25]'
          }`}>
            <div className="space-y-3">
              <div className={`p-3 w-fit rounded-2xl ${isLight ? 'bg-[#F4EDE2] text-[#B87D4B]' : 'bg-[#2B2723] text-[#D49E6A]'}`}>
                <Globe className="w-6 h-6" />
              </div>
              <h3 className={`font-serif font-bold text-xl uppercase tracking-wider ${isLight ? 'text-[#111827]' : 'text-white'}`}>
                OUR MISSION
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-[#4B5563]' : 'text-[#A69D92]'}`}>
                <EditableText
                  value={profile.aboutMission || 'At AETORA Technologies, our mission is to design and develop enterprise-grade web applications, custom digital platforms, and high-conversion software solutions that propel businesses forward.'}
                  onSave={(val) => onUpdateProfile?.({ aboutMission: val })}
                  multiline
                />
              </p>
            </div>
            <div className="pt-2 border-t border-gray-200/20 text-[11px] font-bold text-[#B87D4B] uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Enterprise Software Standards
            </div>
          </div>

          {/* Founder Section Card */}
          <div className={`lg:col-span-4 p-8 rounded-3xl shadow-xl border space-y-6 flex flex-col justify-between ${
            isLight
              ? 'bg-[#111827] text-white border-[#B87D4B]/30'
              : 'bg-[#1C1A17] text-[#FAF7F2] border-[#D49E6A]/40'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#B87D4B]">
                  <img
                    src={profile.profilePhotoUrl || senafOwnerPhoto}
                    alt={profile.ownerName || "Senaf Wondimmu"}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== senafOwnerPhoto) {
                        target.src = senafOwnerPhoto;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B87D4B] font-bold block">FOUNDER & CEO</span>
                  <h4 className="font-serif font-bold text-lg text-white">
                    <EditableText
                      value={profile.ownerName || 'Senaf Wondimmu'}
                      onSave={(val) => onUpdateProfile?.({ ownerName: val })}
                    />
                  </h4>
                </div>
              </div>

              <span className="text-4xl font-serif text-[#B87D4B] block leading-none">“</span>
              <p className="font-serif italic text-sm text-[#E8E4DF] leading-relaxed">
                "<EditableText
                  value={profile.founderBio || 'AETORA Technologies was built on a foundation of technical excellence, visual sophistication, and relentless focus on client growth.'}
                  onSave={(val) => onUpdateProfile?.({ founderBio: val })}
                  multiline
                />"
              </p>
            </div>

            <div className="pt-4 border-t border-gray-700 text-xs font-sans text-gray-400 flex justify-between items-center">
              <span>{profile.ownerTitle || 'Founder & CEO'}</span>
              <span className="text-[#B87D4B] font-bold">AETORA Tech</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className={`lg:col-span-4 p-8 rounded-3xl border shadow-sm space-y-4 flex flex-col justify-between transition-colors ${
            isLight
              ? 'bg-white border-[#E5E7EB]'
              : 'bg-[#1C1A17] border-[#2E2A25]'
          }`}>
            <div className="space-y-3">
              <div className={`p-3 w-fit rounded-2xl ${isLight ? 'bg-[#F4EDE2] text-[#B87D4B]' : 'bg-[#2B2723] text-[#D49E6A]'}`}>
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className={`font-serif font-bold text-xl uppercase tracking-wider ${isLight ? 'text-[#111827]' : 'text-white'}`}>
                OUR VISION
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-[#4B5563]' : 'text-[#A69D92]'}`}>
                <EditableText
                  value={profile.aboutVision || 'To set the global benchmark for web performance, security, and responsive UI/UX architecture, transforming digital challenges into strategic competitive advantages.'}
                  onSave={(val) => onUpdateProfile?.({ aboutVision: val })}
                  multiline
                />
              </p>
            </div>
            <div className="pt-2 border-t border-gray-200/20 text-[11px] font-bold text-[#B87D4B] uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Next-Generation Innovation
            </div>
          </div>

        </div>

        {/* Company Services Section */}
        <div id="services" className="scroll-mt-24 pt-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-[0.25em] uppercase text-[#B87D4B] font-bold block">
              WHAT WE DO
            </span>
            <h3 className={`text-2xl sm:text-3xl font-serif font-bold uppercase ${isLight ? 'text-[#111827]' : 'text-white'}`}>
              COMPANY SERVICES & SOLUTIONS
            </h3>
            <p className={`text-xs font-sans max-w-xl mx-auto ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
              AETORA Technologies provides comprehensive end-to-end software development and digital engineering services.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-sans">
            {companyServices.map((service, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border shadow-sm transition-all flex items-center gap-3 group ${
                  isLight
                    ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                    : 'bg-[#1C1A17] border-[#2E2A25] hover:border-[#D49E6A]'
                }`}
              >
                <div className={`p-2 rounded-xl group-hover:scale-110 transition-transform shrink-0 ${
                  isLight ? 'bg-[#F4EDE2] text-[#B87D4B]' : 'bg-[#2B2723] text-[#D49E6A]'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className={`font-bold text-xs transition-colors ${
                  isLight ? 'text-[#111827] group-hover:text-[#B87D4B]' : 'text-white group-hover:text-[#D49E6A]'
                }`}>
                  <EditableText
                    value={service}
                    onSave={(newService) => {
                      const updated = [...companyServices];
                      updated[idx] = newService;
                      onUpdateProfile?.({ services: updated });
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Skills & Capabilities */}
        <div id="skills" className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t ${
          isLight ? 'border-[#E2D9CE]' : 'border-[#2E2A25]'
        }`}>
          
          {/* Progress Bars */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className={`font-serif font-bold text-xl uppercase tracking-wider mb-4 ${
              isLight ? 'text-[#111827]' : 'text-white'
            }`}>
              TECHNICAL CAPABILITIES
            </h3>

            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-1.5 font-sans">
                <div className={`flex justify-between text-xs font-bold uppercase tracking-wider ${
                  isLight ? 'text-[#111827]' : 'text-[#E8E4DF]'
                }`}>
                  <span>{skill.name}</span>
                  <span className="text-[#B87D4B] font-serif">{skill.percentage}%</span>
                </div>
                <div className={`w-full h-2.5 rounded-full overflow-hidden ${isLight ? 'bg-[#E5E7EB]' : 'bg-[#2E2A25]'}`}>
                  <div
                    className="bg-gradient-to-r from-[#B87D4B] to-[#D49E6A] h-full rounded-full transition-all duration-1000"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* 4 Feature Pillars */}
          <div className="lg:col-span-6 space-y-6 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#1C1A17] border-[#2E2A25]'
              }`}>
                <div className={`p-2.5 w-fit rounded-xl ${isLight ? 'bg-[#F4EDE2] text-[#B87D4B]' : 'bg-[#2B2723] text-[#D49E6A]'}`}>
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-xs uppercase tracking-wider ${isLight ? 'text-[#111827]' : 'text-white'}`}>MODERN DESIGN</h4>
                <p className={`text-[11px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Artistic layout with pixel-perfect accuracy and clear typographic hierarchy.</p>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#1C1A17] border-[#2E2A25]'
              }`}>
                <div className={`p-2.5 w-fit rounded-xl ${isLight ? 'bg-[#F4EDE2] text-[#B87D4B]' : 'bg-[#2B2723] text-[#D49E6A]'}`}>
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-xs uppercase tracking-wider ${isLight ? 'text-[#111827]' : 'text-white'}`}>LIGHTNING PERFORMANCE</h4>
                <p className={`text-[11px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Optimized frontend rendering, responsive assets, and fast page load speeds.</p>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#1C1A17] border-[#2E2A25]'
              }`}>
                <div className={`p-2.5 w-fit rounded-xl ${isLight ? 'bg-[#F4EDE2] text-[#B87D4B]' : 'bg-[#2B2723] text-[#D49E6A]'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-xs uppercase tracking-wider ${isLight ? 'text-[#111827]' : 'text-white'}`}>ENTERPRISE SECURITY</h4>
                <p className={`text-[11px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Strict API security, robust authentication, and cloud data protection.</p>
              </div>

              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#1C1A17] border-[#2E2A25]'
              }`}>
                <div className={`p-2.5 w-fit rounded-xl ${isLight ? 'bg-[#F4EDE2] text-[#B87D4B]' : 'bg-[#2B2723] text-[#D49E6A]'}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className={`font-bold text-xs uppercase tracking-wider ${isLight ? 'text-[#111827]' : 'text-white'}`}>SCALABLE ARCHITECTURE</h4>
                <p className={`text-[11px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Built to handle high user volume with modular code structures.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

