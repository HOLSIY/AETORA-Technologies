import React, { useState } from 'react';
import { WebsiteProject, ProjectCategory } from '../types';
import { ProjectCard } from './ProjectCard';
import { Search, Grid } from 'lucide-react';
import { useMasterEdit } from './MasterEditContext';

interface ProjectGridProps {
  projects: WebsiteProject[];
  onSelectProject: (project: WebsiteProject) => void;
  onContactClick: (projectTitle?: string) => void;
}

const CATEGORIES: (ProjectCategory | 'All')[] = [
  'All',
  'Restaurant',
  'Cafe',
  'Hospital',
  'Hotel',
  'School',
  'Business',
  'Corporate',
  'Ecommerce',
  'Portfolio',
  'Real Estate',
];

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onSelectProject,
  onContactClick,
}) => {
  const { theme } = useMasterEdit();
  const isLight = theme === 'light';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="showcase" className={`scroll-mt-24 py-20 px-6 font-sans border-b transition-colors duration-300 ${
      isLight
        ? 'bg-[#FAF8F5] text-[#111827] border-[#E2D9CE]'
        : 'bg-[#121110] text-[#E8E4DF] border-[#2E2A25]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#B87D4B] font-bold block">
            PREMIUM DIGITAL MARKETPLACE
          </span>
          <h2 className={`text-3xl sm:text-5xl font-serif font-bold tracking-tight uppercase ${
            isLight ? 'text-[#111827]' : 'text-white'
          }`}>
            ENTERPRISE SHOWCASE & DESIGNS
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto font-sans ${
            isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'
          }`}>
            Browse ready-made pixel-perfect website designs engineered by AETORA Technologies. Click any project card to open the live interactive recreation or request customization.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className={`space-y-6 p-6 rounded-3xl border shadow-sm ${
          isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#1C1A17] border-[#2E2A25]'
        }`}>
          {/* Top Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className={`w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 ${
              isLight ? 'text-gray-400' : 'text-[#A69D92]'
            }`} />
            <input
              type="text"
              placeholder="Search designs by keyword, restaurant, cafe, feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-full pl-11 pr-4 py-3 text-xs focus:outline-none focus:border-[#B87D4B] shadow-inner border ${
                isLight
                  ? 'bg-[#FAF8F5] border-[#E5E7EB] text-[#111827]'
                  : 'bg-[#121110] border-[#3D3833] text-white'
              }`}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;

              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#B87D4B] text-white shadow-md'
                      : isLight
                      ? 'bg-[#FAF8F5] hover:bg-[#F3F4F6] text-[#374151] border border-[#E5E7EB]'
                      : 'bg-[#2B2723] hover:bg-[#38332E] text-[#E8E4DF] border border-[#3D3833]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected
                      ? 'bg-white/30 text-white'
                      : isLight
                      ? 'bg-[#E5E7EB] text-[#4B5563]'
                      : 'bg-[#3D3833] text-[#A69D92]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
                onContactClick={onContactClick}
              />
            ))}
          </div>
        ) : (
          <div className={`text-center py-20 rounded-3xl border space-y-4 ${
            isLight ? 'bg-white border-[#E5E7EB]' : 'bg-[#1C1A17] border-[#2E2A25]'
          }`}>
            <Grid className="w-12 h-12 text-[#B87D4B] mx-auto opacity-50" />
            <h3 className={`font-serif text-xl font-bold ${isLight ? 'text-[#111827]' : 'text-white'}`}>
              No Website Designs Found
            </h3>
            <p className={`text-xs ${isLight ? 'text-[#6B7280]' : 'text-[#A69D92]'}`}>
              Try selecting another category or clear your search query.
            </p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="bg-[#B87D4B] text-white text-xs font-bold uppercase px-6 py-2.5 rounded-full"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
