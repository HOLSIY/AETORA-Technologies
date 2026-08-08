import React, { useState } from 'react';
import { WebsiteProject, DeveloperProfile } from '../types';
import { ProjectGalleryLightbox } from './ProjectGalleryLightbox';
import { SolaraFineDiningRecreation } from './recreations/SolaraFineDiningRecreation';
import { FlavoroRestaurantRecreation } from './recreations/FlavoroRestaurantRecreation';
import { BrewBlissCafeRecreation } from './recreations/BrewBlissCafeRecreation';
import { UmiSushiBarRecreation } from './recreations/UmiSushiBarRecreation';
import { SlicePizzeriaRecreation } from './recreations/SlicePizzeriaRecreation';
import { CoffeeSweetMomentsRecreation } from './recreations/CoffeeSweetMomentsRecreation';
import { StarlightMedicalRecreation } from './recreations/StarlightMedicalRecreation';
import { GrandPalaceHotelRecreation } from './recreations/GrandPalaceHotelRecreation';
import { OakwoodSchoolRecreation, defaultOakwoodScreenshots } from './recreations/OakwoodSchoolRecreation';
import { GenericWebRecreation } from './recreations/GenericWebRecreation';
import { ArrowLeft, Monitor, Smartphone, Tablet, CheckCircle, PhoneCall, ExternalLink, ShieldCheck, Activity } from 'lucide-react';

interface ProjectDetailProps {
  project: WebsiteProject;
  profile: DeveloperProfile;
  onBack: () => void;
  onContactClick: (projectTitle?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailProps> = ({
  project,
  profile,
  onBack,
  onContactClick,
}) => {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [viewMode, setViewMode] = useState<'recreation' | 'screenshot'>('recreation');

  // Render the specific pixel perfect component based on project ID
  const renderRecreationComponent = () => {
    switch (project.recreationComponentId) {
      case 'solara':
      case 'solara-dining':
        return <SolaraFineDiningRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'flavoro':
      case 'flavoro-restaurant':
        return <FlavoroRestaurantRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'brewbliss':
      case 'brew-bliss-cafe':
        return <BrewBlissCafeRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'umi':
      case 'umi-sushi-bar':
        return <UmiSushiBarRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'slice':
      case 'slice-pizzeria':
        return <SlicePizzeriaRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'coffeesweet':
      case 'coffee-sweet-moments':
        return <CoffeeSweetMomentsRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'starlight':
      case 'starlight-medical':
      case 'starlight-hospital':
        return <StarlightMedicalRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'grandpalace':
      case 'grand-palace':
      case 'grand-palace-hotel':
        return <GrandPalaceHotelRecreation onContactClick={() => onContactClick(project.title)} />;
      case 'oakwood':
      case 'oakwood-school':
      case 'oakwood-academy':
        return <OakwoodSchoolRecreation project={project} onContactClick={() => onContactClick(project.title)} />;
      default:
        return <GenericWebRecreation project={project} onContactClick={() => onContactClick(project.title)} />;
    }
  };

  return (
    <div className="bg-[#121110] text-[#E8E4DF] min-h-screen font-sans">
      
      {/* Top Sticky Navigation Control Bar */}
      <div className="sticky top-0 z-50 bg-[#1C1A17]/95 backdrop-blur-md px-6 py-3 border-b border-[#332F2B] flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Back Button & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#2B2723] hover:bg-[#3D3833] text-[#D49E6A] px-4 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Showcase
          </button>

          <div>
            <h1 className="font-serif font-bold text-base text-white">{project.title}</h1>
            <span className="text-[10px] text-[#9E958C] uppercase tracking-widest block">
              {project.category} Platform • {project.priceEstimate} • Engineered by AETORA Technologies
            </span>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-[#2B2723] p-1 rounded-xl border border-[#3D3833] text-xs">
          <button
            onClick={() => setViewMode('recreation')}
            className={`px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
              viewMode === 'recreation' ? 'bg-[#D49E6A] text-[#121110] shadow' : 'text-[#9E958C] hover:text-white'
            }`}
          >
            Live Web App
          </button>
          <button
            onClick={() => setViewMode('screenshot')}
            className={`px-3.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
              viewMode === 'screenshot' ? 'bg-[#D49E6A] text-[#121110] shadow' : 'text-[#9E958C] hover:text-white'
            }`}
          >
            Design Preview
          </button>
        </div>

        {/* Device Frame Viewport Selectors */}
        <div className="hidden sm:flex items-center gap-1 bg-[#2B2723] p-1 rounded-xl border border-[#3D3833]">
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Desktop View"
            className={`p-2 rounded-lg transition-colors ${
              deviceMode === 'desktop' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet View"
            className={`p-2 rounded-lg transition-colors ${
              deviceMode === 'tablet' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile View"
            className={`p-2 rounded-lg transition-colors ${
              deviceMode === 'mobile' ? 'bg-[#D49E6A] text-[#121110]' : 'text-[#9E958C] hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right Action Button */}
        <button
          onClick={() => onContactClick(project.title)}
          className="bg-gradient-to-r from-[#D49E6A] to-[#B8804E] text-[#121110] font-bold text-xs uppercase px-5 py-2 rounded-xl shadow hover:opacity-95 transition-opacity"
        >
          Order This Solution
        </button>
      </div>

      {/* Main View Area with Resizable Device Frame */}
      <div className="py-8 px-4 sm:px-8 max-w-[1600px] mx-auto flex flex-col items-center">
        
        {/* Container Device Wrapper */}
        <div
          className={`transition-all duration-500 bg-white text-gray-900 rounded-3xl shadow-2xl border-4 border-[#332F2B] overflow-hidden my-4 ${
            deviceMode === 'desktop'
              ? 'w-full max-w-full'
              : deviceMode === 'tablet'
              ? 'w-[768px] max-w-full'
              : 'w-[390px] max-w-full'
          }`}
        >
          {/* Professional Frame Header Bar */}
          <div className="bg-[#1C1A17] text-[#9E958C] px-4 py-2.5 flex items-center gap-3 border-b border-[#3D3833] text-xs font-mono">
            {/* Sleek Professional Pulse Indicator (Replacing colored dots) */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D49E6A] animate-ping"></span>
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D49E6A]">AETORA SECURE FRAME</span>
            </div>

            {/* Address Bar URL matching requirements */}
            <div className="flex-1 bg-[#2B2723] px-3.5 py-1 rounded-lg text-[11px] text-[#D49E6A] font-mono truncate border border-[#3D3833]">
              https://aetora.tech/showcase/{project.recreationComponentId || project.id}
            </div>

            <span className="text-[10px] text-[#78716C] uppercase font-sans font-semibold hidden md:inline">
              LIVE PREVIEW
            </span>
          </div>

          {/* Viewport Content */}
          <div className="min-h-[75vh] max-h-[85vh] overflow-y-auto p-4 sm:p-6 bg-[#121110]">
            {viewMode === 'recreation' ? (
              renderRecreationComponent()
            ) : (
              <div className="p-4 sm:p-6">
                <ProjectGalleryLightbox
                  screenshots={project.galleryScreenshots && project.galleryScreenshots.length > 0 
                    ? project.galleryScreenshots 
                    : (project.recreationComponentId === 'oakwood' || project.id === 'oakwood-academy' ? defaultOakwoodScreenshots : undefined)}
                  rawUrls={project.screenshotUrls && project.screenshotUrls.length > 0 ? project.screenshotUrls : undefined}
                  projectTitle={project.title}
                />
              </div>
            )}
          </div>
        </div>

        {/* Specifications & Deliverables Below */}
        <div className="w-full max-w-5xl mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-[#1C1A17] rounded-3xl border border-[#332F2B]">
          
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-white">Project Overview</h3>
            <p className="text-xs text-[#9E958C] leading-relaxed">{project.fullDescription || project.description}</p>
            <div className="pt-2 text-xs text-[#D49E6A] font-bold">
              Category: <span className="text-white">{project.category}</span>
            </div>
            <div className="text-[11px] text-[#78716C]">
              Built & Maintained by <span className="text-[#FAF7F2] font-semibold">AETORA Technologies</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif font-bold text-lg text-white">Included Features</h3>
            <ul className="space-y-2 text-xs text-[#C4BDB5]">
              {project.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#D49E6A] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 bg-[#2B2723] p-5 rounded-2xl border border-[#3D3833]">
            <div>
              <span className="text-[10px] uppercase text-[#9E958C] tracking-wider font-bold block">ESTIMATED INVESTMENT</span>
              <span className="font-serif text-2xl font-bold text-[#D49E6A]">{project.priceEstimate}</span>
            </div>

            <button
              onClick={() => onContactClick(project.title)}
              className="w-full bg-gradient-to-r from-[#D49E6A] to-[#B8804E] text-[#121110] font-bold text-xs uppercase py-3 rounded-xl shadow text-center"
            >
              Order This Solution Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
