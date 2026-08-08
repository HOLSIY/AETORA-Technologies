import React from 'react';
import { WebsiteProject } from '../types';
import { Eye, Star } from 'lucide-react';
import { useMasterEdit } from './MasterEditContext';

interface ProjectCardProps {
  project: WebsiteProject;
  onSelect: (project: WebsiteProject) => void;
  onContactClick: (projectTitle?: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, onContactClick }) => {
  const { theme } = useMasterEdit();
  const isLight = theme === 'light';

  return (
    <div className={`group rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between font-sans ${
      isLight
        ? 'bg-white border-[#E5E7EB] hover:border-[#B87D4B]'
        : 'bg-[#1C1A17] border-[#2E2A25] hover:border-[#D49E6A]'
    }`}>
      
      {/* Top Image Preview & Badges */}
      <div className="relative aspect-[16/10] min-h-[200px] overflow-hidden bg-slate-800 cursor-pointer" onClick={() => onSelect(project)}>
        <img
          src={project.previewImageUrl || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200'}
          alt={project.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200';
          }}
          className="w-full h-full min-h-[200px] object-cover group-hover:scale-105 transition-transform duration-500 block relative z-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity pointer-events-none z-1"></div>

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {project.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm backdrop-blur-md ${
                badge.type === 'featured'
                  ? 'bg-[#B87D4B] text-white'
                  : badge.type === 'premium'
                  ? 'bg-amber-500 text-black'
                  : badge.type === 'bestseller'
                  ? 'bg-rose-600 text-white'
                  : 'bg-[#1C1917]/80 text-[#FAF7F2] border border-white/20'
              }`}
            >
              {badge.label}
            </span>
          ))}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute top-3 right-3 bg-[#1C1917]/90 text-white text-xs font-bold font-serif px-3 py-1 rounded-full border border-white/20 shadow-md">
          {project.priceEstimate}
        </div>

        {/* Hover Quick Action overlay */}
        <div className="absolute inset-0 bg-[#1C1917]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(project); }}
            className="bg-[#FAF7F2] text-[#1C1917] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-lg hover:bg-white transition-all transform hover:scale-105 flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-[#B87D4B]" /> Open Live Website
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#78716C]">
            <span className={`uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
              isLight
                ? 'bg-[#FAF8F5] border-[#E5E7EB] text-[#B87D4B]'
                : 'bg-[#2B2723] border-[#3D3833] text-[#D49E6A]'
            }`}>
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {project.rating} ({project.reviewsCount})
            </span>
          </div>

          <h3
            onClick={() => onSelect(project)}
            className={`font-serif font-bold text-lg transition-colors cursor-pointer line-clamp-1 ${
              isLight
                ? 'text-[#111827] group-hover:text-[#B87D4B]'
                : 'text-white group-hover:text-[#D49E6A]'
            }`}
          >
            {project.title}
          </h3>

          <p className={`text-xs line-clamp-2 leading-relaxed ${
            isLight ? 'text-[#4B5563]' : 'text-[#A69D92]'
          }`}>
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span key={i} className={`text-[10px] font-medium px-2 py-0.5 rounded ${
              isLight
                ? 'bg-[#F3F4F6] text-[#374151]'
                : 'bg-[#2B2723] text-[#D1C7BD]'
            }`}>
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className={`text-[10px] font-semibold ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>

        {/* Action Bar */}
        <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
          isLight ? 'border-[#E5E7EB]' : 'border-[#2E2A25]'
        }`}>
          <button
            onClick={() => onSelect(project)}
            className="flex-1 bg-[#111827] hover:bg-[#1F2937] text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#B87D4B]" /> Open Preview
          </button>

          <button
            onClick={() => onContactClick(project.title)}
            className={`text-xs font-bold uppercase px-4 py-2.5 rounded-xl transition-all border ${
              isLight
                ? 'bg-[#FAF8F5] hover:bg-[#F3F4F6] text-[#B87D4B] border-[#B87D4B]/40 hover:border-[#B87D4B]'
                : 'bg-[#2B2723] hover:bg-[#38332E] text-[#D49E6A] border-[#D49E6A]/40 hover:border-[#D49E6A]'
            }`}
          >
            Inquire
          </button>
        </div>
      </div>

    </div>
  );
};
