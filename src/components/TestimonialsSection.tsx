import React from 'react';
import { Testimonial, DeveloperProfile } from '../types';
import { Mail, Globe, MapPin, ArrowRight } from 'lucide-react';
import { useMasterEdit, EditableText } from './MasterEditContext';

interface TestimonialsProps {
  testimonials: Testimonial[];
  profile: DeveloperProfile;
  onContactClick: () => void;
  onUpdateTestimonials?: (testimonials: Testimonial[]) => void;
}

export const TestimonialsSection: React.FC<TestimonialsProps> = ({
  testimonials,
  profile,
  onContactClick,
  onUpdateTestimonials,
}) => {
  const { theme } = useMasterEdit();
  const isLight = theme === 'light';

  return (
    <section id="reviews" className={`scroll-mt-24 py-20 px-6 border-b font-serif transition-colors duration-300 ${
      isLight
        ? 'bg-[#FAF8F5] text-[#111827] border-[#E2D9CE]'
        : 'bg-[#121110] text-[#E8E4DF] border-[#2E2A25]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Bar */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-6 ${
          isLight ? 'border-[#E2D9CE]' : 'border-[#2E2A25]'
        }`}>
          <div>
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B87D4B] font-bold block mb-1">
              CLIENT TESTIMONIALS & REVIEWS
            </span>
            <h2 className={`text-3xl sm:text-4xl font-serif font-bold uppercase tracking-tight ${
              isLight ? 'text-[#111827]' : 'text-white'
            }`}>
              CLIENTS OF AETORA TECHNOLOGIES
            </h2>
          </div>
          <p className={`text-xs font-sans max-w-sm ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
            Genuine reviews and feedback from enterprise partners and business owners who transformed their digital presence with AETORA Technologies.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <div
              key={test.id}
              className={`p-6 rounded-3xl border shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 ${
                isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#1C1A17] border-[#2E2A25]'
              }`}
            >
              <div className="space-y-4">
                <span className="text-4xl font-serif text-[#B87D4B] block">“</span>
                <p className={`font-serif italic text-sm leading-relaxed ${
                  isLight ? 'text-[#111827]' : 'text-[#E8E4DF]'
                }`}>
                  "<EditableText
                    value={test.quote}
                    onSave={(val) => {
                      const updated = [...testimonials];
                      updated[index] = { ...updated[index], quote: val };
                      onUpdateTestimonials?.(updated);
                    }}
                    multiline
                  />"
                </p>
              </div>

              <div className={`flex items-center gap-3 pt-4 border-t ${
                isLight ? 'border-[#E5E7EB]' : 'border-[#2E2A25]'
              }`}>
                <img
                  src={test.avatarUrl}
                  alt={test.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#B87D4B]/40"
                />
                <div className="font-sans text-xs">
                  <h4 className={`font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>
                    <EditableText
                      value={test.author}
                      onSave={(val) => {
                        const updated = [...testimonials];
                        updated[index] = { ...updated[index], author: val };
                        onUpdateTestimonials?.(updated);
                      }}
                    />
                  </h4>
                  <p className={`text-[10px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
                    <EditableText
                      value={test.role}
                      onSave={(val) => {
                        const updated = [...testimonials];
                        updated[index] = { ...updated[index], role: val };
                        onUpdateTestimonials?.(updated);
                      }}
                    />, <EditableText
                      value={test.company}
                      onSave={(val) => {
                        const updated = [...testimonials];
                        updated[index] = { ...updated[index], company: val };
                        onUpdateTestimonials?.(updated);
                      }}
                    />
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Let's Build Something Great Banner */}
        <div id="contact" className={`scroll-mt-24 p-8 sm:p-12 rounded-3xl shadow-2xl border grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
          isLight
            ? 'bg-[#111827] text-white border-[#B87D4B]/30'
            : 'bg-[#1C1A17] text-[#FAF7F2] border-[#D49E6A]/30'
        }`}>
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B87D4B] font-bold block">
              TRANSFORM YOUR BUSINESS TODAY
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              BUILD WITH <br />
              <span className="text-[#B87D4B] italic font-serif">AETORA TECHNOLOGIES</span>
            </h2>
            <p className="text-xs sm:text-sm font-sans text-gray-400 max-w-md">
              Have a project in mind? Ready to order a customized website or full-stack software platform? Let's build something exceptional together.
            </p>

            <div className="pt-2">
              <button
                onClick={onContactClick}
                className="bg-[#B87D4B] hover:bg-[#9E6535] text-white font-sans text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all flex items-center gap-2"
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#1F2937]/80 p-6 rounded-2xl border border-gray-700 space-y-4 font-sans text-xs">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2.5 rounded-xl text-black shrink-0">
                {profile.logoUrl ? (
                  <img
                    src={profile.logoUrl}
                    alt={profile.companyName || 'AETORA Technologies'}
                    className="w-16 h-16 object-contain rounded bg-[#111827] p-1"
                  />
                ) : (
                  <div className="w-16 h-16 bg-[#111827] p-1 flex items-center justify-center rounded">
                    <span className="text-[8px] text-[#D49E6A] font-mono text-center leading-tight font-bold">
                      AETORA<br />TECH<br />2026
                    </span>
                  </div>
                )}
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B87D4B] font-bold block">COMPANY HEADQUARTERS</span>
                <span className="font-serif text-sm font-bold text-white block">AETORA Technologies</span>
                <p className="text-[10px] text-gray-400">Founded & Managed by Senaf Wondimmu</p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-700 space-y-2 text-gray-300 text-[11px]">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#B87D4B]" /> {profile.email || 'senafwondimu@gmail.com'}</div>
              <div className="flex items-center gap-2"><Globe className="w-3.5 h-3.5 text-[#B87D4B]" /> AETORA Technologies Official</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#B87D4B]" /> {profile.location || 'Addis Ababa / Global Remote'}</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
