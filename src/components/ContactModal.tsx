import React from 'react';
import { DeveloperProfile } from '../types';
import { Phone, Mail, MessageSquare, Linkedin, Globe, X } from 'lucide-react';
import { useMasterEdit } from './MasterEditContext';

interface ContactModalProps {
  profile: DeveloperProfile;
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  profile,
  isOpen,
  onClose,
  projectTitle,
}) => {
  const { theme } = useMasterEdit();
  const isLight = theme === 'light';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 font-sans">
      <div className={`max-w-[460px] w-full rounded-2xl p-5 sm:p-6 shadow-2xl border relative space-y-4 max-h-[92vh] overflow-y-auto transition-colors duration-300 ${
        isLight
          ? 'bg-[#FAF8F5] text-[#111827] border-[#E2D9CE]'
          : 'bg-[#1C1A17] text-[#E8E4DF] border-[#2E2A25]'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-10 ${
            isLight
              ? 'bg-[#EAE5DF] hover:bg-[#DDD7CF] text-[#111827]'
              : 'bg-[#2B2723] hover:bg-[#38332E] text-white'
          }`}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Company Header */}
        <div className="text-center space-y-2 pt-1">
          <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#B87D4B] shadow-lg bg-[#111827] flex items-center justify-center">
            <img
              src={profile.profilePhotoUrl}
              alt={profile.ownerName || 'Senaf Wondimmu'}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B87D4B] block leading-tight mb-1">
              AETORA Technologies • Corporate Contact
            </span>
            <h2 className={`text-xl sm:text-2xl font-serif font-bold leading-snug ${isLight ? 'text-[#111827]' : 'text-white'}`}>
              {profile.companyName || 'AETORA Technologies'}
            </h2>
            <p className={`text-xs font-semibold ${isLight ? 'text-[#374151]' : 'text-[#A69D92]'}`}>
              {profile.ownerName || 'Senaf Wondimmu'} — {profile.ownerTitle || 'Founder & CEO'}
            </p>
            <p className={`text-[11px] ${isLight ? 'text-[#6B7280]' : 'text-[#8C8377]'}`}>{profile.location || 'Addis Ababa / Worldwide'}</p>
          </div>

          {projectTitle && (
            <div className={`p-2 px-3.5 rounded-xl border text-xs font-bold mt-2 ${
              isLight
                ? 'bg-[#FAF8F5] border-[#E5E7EB] text-[#B87D4B]'
                : 'bg-[#2B2723] border-[#3D3833] text-[#D49E6A]'
            }`}>
              Inquiry for Solution: <span className={`font-normal ${isLight ? 'text-[#111827]' : 'text-white'}`}>{projectTitle}</span>
            </div>
          )}
        </div>

        {/* Contact Methods List */}
        <div className="space-y-2.5 text-xs font-medium">
          <a
            href={`mailto:${profile.email || 'senafwondimu@gmail.com'}?subject=AETORA%20Technologies%20Inquiry%20-${encodeURIComponent(projectTitle || 'General')}`}
            className={`flex items-center justify-between p-3 px-3.5 rounded-xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase block leading-none mb-1 ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Official Email</span>
                <span className={`font-bold text-xs sm:text-[13px] truncate block ${isLight ? 'text-[#111827]' : 'text-white'}`}>{profile.email || 'senafwondimu@gmail.com'}</span>
              </div>
            </div>
            <span className="bg-sky-600 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full shrink-0">
              Send Email
            </span>
          </a>

          <a
            href={`tel:${profile?.phone || ''}`}
            className={`flex items-center justify-between p-3 px-3.5 rounded-xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase block leading-none mb-1 ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Direct Line</span>
                <span className={`font-bold text-xs sm:text-[13px] truncate block ${isLight ? 'text-[#111827]' : 'text-white'}`}>{profile?.phone || '+251 900 000 000'}</span>
              </div>
            </div>
            <span className="bg-emerald-600 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full shrink-0">
              Call Now
            </span>
          </a>

          <a
            href={`https://wa.me/${(profile?.whatsapp || '').replace(/\+/g, '')}?text=Hi%20Senaf,%20I%20am%20interested%20in%20AETORA%20Technologies%20services!`}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-between p-3 px-3.5 rounded-xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase block leading-none mb-1 ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>WhatsApp Business</span>
                <span className={`font-bold text-xs sm:text-[13px] truncate block ${isLight ? 'text-[#111827]' : 'text-white'}`}>{profile?.whatsapp || '+251 900 000 000'}</span>
              </div>
            </div>
            <span className="bg-emerald-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full shrink-0">
              WhatsApp
            </span>
          </a>

          <a
            href={profile?.linkedin || '#'}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-between p-3 px-3.5 rounded-xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="p-2 bg-blue-50 text-blue-700 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase block leading-none mb-1 ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Corporate LinkedIn</span>
                <span className={`font-bold text-xs sm:text-[13px] truncate block ${isLight ? 'text-[#111827]' : 'text-white'}`}>AETORA Technologies</span>
              </div>
            </div>
            <span className="bg-blue-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full shrink-0">
              Connect
            </span>
          </a>

          <a
            href="https://senaf-wondimmu.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-between p-3 px-3.5 rounded-xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <div className="p-2 bg-purple-50 text-purple-700 rounded-lg group-hover:scale-105 transition-transform shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className={`text-[10px] uppercase block leading-none mb-1 ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>PORTFOLIO</span>
                <span className={`font-bold text-xs sm:text-[13px] truncate block ${isLight ? 'text-[#111827]' : 'text-white'}`}>Senaf Wondimmu — Personal Portfolio</span>
              </div>
            </div>
            <span className="bg-purple-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full shrink-0 whitespace-nowrap">
              VIEW PORTFOLIO
            </span>
          </a>
        </div>

        {/* Footer Note */}
        <div className={`text-center pt-1 pb-0.5 text-[11px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
          ⚡ AETORA Technologies • Premium Software & Full-Stack Web Applications
        </div>

      </div>
    </div>
  );
};
