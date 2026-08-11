import React from 'react';
import { DeveloperProfile } from '../types';
import { Phone, Mail, MessageSquare, Linkedin, X } from 'lucide-react';
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
      <div className={`max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border relative space-y-6 transition-colors duration-300 ${
        isLight
          ? 'bg-[#FAF8F5] text-[#111827] border-[#E2D9CE]'
          : 'bg-[#1C1A17] text-[#E8E4DF] border-[#2E2A25]'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isLight
              ? 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#111827]'
              : 'bg-[#2B2723] hover:bg-[#38332E] text-white'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Company Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-[#B87D4B] shadow-xl bg-[#111827] flex items-center justify-center">
            <img
              src={profile.profilePhotoUrl}
              alt={profile.ownerName || 'Senaf Wondimmu'}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B87D4B] block">
              AETORA Technologies • Corporate Contact
            </span>
            <h2 className={`text-2xl font-serif font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>
              {profile.companyName || 'AETORA Technologies'}
            </h2>
            <p className={`text-xs font-semibold mt-0.5 ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
              {profile.ownerName || 'Senaf Wondimmu'} — {profile.ownerTitle || 'Founder & CEO'}
            </p>
            <p className={`text-[11px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>{profile.location || 'Addis Ababa / Worldwide'}</p>
          </div>

          {projectTitle && (
            <div className={`p-2.5 rounded-xl border text-xs font-bold ${
              isLight
                ? 'bg-[#FAF8F5] border-[#E5E7EB] text-[#B87D4B]'
                : 'bg-[#2B2723] border-[#3D3833] text-[#D49E6A]'
            }`}>
              Inquiry for Solution: <span className={`font-normal ${isLight ? 'text-[#111827]' : 'text-white'}`}>{projectTitle}</span>
            </div>
          )}
        </div>

        {/* Contact Methods List */}
        <div className="space-y-3 text-xs font-medium">
          <a
            href={`mailto:${profile.email || 'senafwondimu@gmail.com'}?subject=AETORA%20Technologies%20Inquiry%20-${encodeURIComponent(projectTitle || 'General')}`}
            className={`flex items-center justify-between p-3.5 rounded-2xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl group-hover:scale-110 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] uppercase block ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Official Email</span>
                <span className={`font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>{profile.email || 'senafwondimu@gmail.com'}</span>
              </div>
            </div>
            <span className="bg-sky-600 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full">
              Send Email
            </span>
          </a>

          <a
            href={`tel:${profile?.phone || ''}`}
            className={`flex items-center justify-between p-3.5 rounded-2xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] uppercase block ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Direct Line</span>
                <span className={`font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>{profile?.phone || '+251 900 000 000'}</span>
              </div>
            </div>
            <span className="bg-emerald-600 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full">
              Call Now
            </span>
          </a>

          <a
            href={`https://wa.me/${(profile?.whatsapp || '').replace(/\+/g, '')}?text=Hi%20Senaf,%20I%20am%20interested%20in%20AETORA%20Technologies%20services!`}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-between p-3.5 rounded-2xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] uppercase block ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>WhatsApp Business</span>
                <span className={`font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>{profile?.whatsapp || '+251 900 000 000'}</span>
              </div>
            </div>
            <span className="bg-emerald-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full">
              WhatsApp
            </span>
          </a>

          <a
            href={profile?.linkedin || '#'}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center justify-between p-3.5 rounded-2xl border shadow-sm transition-all group ${
              isLight
                ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
                : 'bg-[#25221E] border-[#3D3833] hover:border-[#D49E6A]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl group-hover:scale-110 transition-transform">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <span className={`text-[10px] uppercase block ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>Corporate LinkedIn</span>
                <span className={`font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>AETORA Technologies</span>
              </div>
            </div>
            <span className="bg-blue-700 text-white font-bold text-[10px] uppercase px-3 py-1.5 rounded-full">
              Connect
            </span>
          </a>
        </div>

        {/* Footer Note */}
        <div className={`text-center pt-2 text-[10px] ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
          ⚡ AETORA Technologies • Premium Full-Stack Web Applications & Software Solutions.
        </div>

      </div>
    </div>
  );
};
