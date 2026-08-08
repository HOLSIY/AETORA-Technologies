import React, { useState } from 'react';
import { WebsiteProject } from '../../types';
import { ShoppingBag, Star, Phone, Mail, Calendar, Check, ArrowRight } from 'lucide-react';

interface GenericProps {
  project: WebsiteProject;
  onContactClick?: () => void;
}

export const GenericWebRecreation: React.FC<GenericProps> = ({ project, onContactClick }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [inquired, setInquired] = useState(false);

  return (
    <div className="bg-[#111827] text-gray-100 font-sans min-h-screen">
      {/* Header Bar */}
      <header className="bg-[#1F2937] px-8 py-4 border-b border-gray-800 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
            {project.title.charAt(0)}
          </div>
          <div>
            <h1 className="font-bold text-base text-white">{project.title}</h1>
            <span className="text-[10px] text-indigo-400 font-medium uppercase tracking-wider block">{project.category} Website</span>
          </div>
        </div>

        <button
          onClick={onContactClick}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg shadow transition-all"
        >
          Purchase / Order Design
        </button>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto py-12 px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="bg-indigo-900/60 text-indigo-300 text-xs font-bold px-3.5 py-1.5 rounded-full border border-indigo-700/50 uppercase tracking-widest inline-block">
              {project.status} • {project.priceEstimate}
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="text-sm text-gray-300 leading-relaxed font-light">
              {project.fullDescription || project.description}
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider">Key Features Included:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {project.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-800/60 p-2.5 rounded-lg border border-gray-700/60">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-gray-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onContactClick}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                Inquire For Your Business <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
            <img
              src={project.previewImageUrl}
              alt={project.title}
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-gray-900/90 backdrop-blur-md rounded-xl border border-gray-700 text-xs text-gray-300">
              <span className="font-bold text-white block">Pixel-Perfect Recreation</span>
              Matching uploaded screenshot design with responsive components.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
