import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GalleryScreenshot } from '../types';
import { ChevronLeft, ChevronRight, X, Maximize2, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectGalleryLightboxProps {
  screenshots?: GalleryScreenshot[];
  rawUrls?: string[];
  projectTitle?: string;
}

export const ProjectGalleryLightbox: React.FC<ProjectGalleryLightboxProps> = ({
  screenshots = [],
  rawUrls = [],
  projectTitle = 'Project Gallery',
}) => {
  // Normalize items to unified GalleryScreenshot array
  const items: GalleryScreenshot[] = React.useMemo(() => {
    if (screenshots && screenshots.length > 0) {
      return screenshots;
    }
    if (rawUrls && rawUrls.length > 0) {
      return rawUrls.map((url, idx) => ({
        id: `raw-${idx}`,
        url,
        title: `Screenshot ${idx + 1}`,
        caption: `${projectTitle} Preview ${idx + 1}`,
      }));
    }
    return [];
  }, [screenshots, rawUrls, projectTitle]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // Touch swipe refs for mobile navigation
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const goToNext = useCallback(() => {
    if (selectedIndex === null || items.length === 0) return;
    setSlideDirection('right');
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % items.length : 0));
  }, [selectedIndex, items.length]);

  const goToPrev = useCallback(() => {
    if (selectedIndex === null || items.length === 0) return;
    setSlideDirection('left');
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + items.length) % items.length : 0));
  }, [selectedIndex, items.length]);

  // Keyboard Navigation Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, goToNext, goToPrev]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (diff > minSwipeDistance) {
      // Swiped Left -> Next Image
      goToNext();
    } else if (diff < -minSwipeDistance) {
      // Swiped Right -> Previous Image
      goToPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-[#9E958C] bg-[#1C1A17] rounded-3xl border border-[#3D3833]">
        <Layers className="w-8 h-8 mx-auto text-[#D49E6A] mb-2 opacity-60" />
        No gallery screenshots available for this project yet.
      </div>
    );
  }

  const currentItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif font-bold text-lg text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#D49E6A]" />
            High-Resolution Preview Gallery ({items.length})
          </h3>
          <p className="text-xs text-[#9E958C]">
            Click any screenshot below to open the interactive full-screen lightbox preview.
          </p>
        </div>
      </div>

      {/* Responsive Thumbnail Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => openLightbox(idx)}
            className="group relative bg-[#1C1A17] rounded-2xl border border-[#3D3833] overflow-hidden shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
          >
            {/* Aspect-Ratio Enforced Container (16:9) */}
            <div className="aspect-video relative w-full overflow-hidden bg-[#2B2723]">
              <img
                src={item.url}
                alt={item.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200';
                }}
                className="w-full h-full object-cover object-top block group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Hover Overlay Icon */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-[#D49E6A] text-[#121110] font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 className="w-4 h-4" /> Expand Screenshot
                </div>
              </div>

              {/* Counter Tag */}
              <div className="absolute top-3 left-3 bg-[#121110]/80 backdrop-blur-md border border-[#3D3833] text-[10px] font-bold uppercase tracking-wider text-[#D49E6A] px-2.5 py-1 rounded-lg">
                View {idx + 1}
              </div>
            </div>

            {/* Thumbnail Caption Card */}
            <div className="p-4 space-y-1 border-t border-[#2B2723]">
              <h4 className="font-serif font-bold text-sm text-white group-hover:text-[#D49E6A] transition-colors truncate">
                {item.title}
              </h4>
              {item.caption && (
                <p className="text-[11px] text-[#9E958C] line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div
              className="flex items-center justify-between text-white z-10 max-w-7xl w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D49E6A] animate-pulse" />
                <div>
                  <h4 className="font-serif font-bold text-base text-white">{projectTitle}</h4>
                  <span className="text-xs text-[#D49E6A] font-bold uppercase tracking-wider block">
                    {currentItem.title} • Image {selectedIndex + 1} of {items.length}
                  </span>
                </div>
              </div>

              <button
                onClick={closeLightbox}
                className="p-3 bg-[#2B2723] hover:bg-[#3D3833] text-white rounded-2xl border border-[#3D3833] transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
              >
                <span>Close</span>
                <X className="w-5 h-5 text-[#D49E6A]" />
              </button>
            </div>

            {/* Center Image Viewport with Slide Transition & Touch Support */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Previous Arrow Button */}
              <button
                onClick={goToPrev}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-2xl bg-[#1C1A17]/80 hover:bg-[#D49E6A] text-white hover:text-[#121110] border border-[#3D3833] shadow-2xl transition-all transform hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Main Image Frame */}
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, x: slideDirection === 'right' ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: slideDirection === 'right' ? -80 : 80 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="max-h-[75vh] max-w-[90vw] flex flex-col items-center justify-center"
                >
                  <img
                    src={currentItem.url}
                    alt={currentItem.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200';
                    }}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl border-2 border-[#3D3833] shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Arrow Button */}
              <button
                onClick={goToNext}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-2xl bg-[#1C1A17]/80 hover:bg-[#D49E6A] text-white hover:text-[#121110] border border-[#3D3833] shadow-2xl transition-all transform hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              className="bg-[#1C1A17]/90 border border-[#3D3833] p-4 rounded-2xl max-w-4xl mx-auto w-full text-center space-y-1 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <h5 className="font-serif font-bold text-white text-base">{currentItem.title}</h5>
              {currentItem.caption && (
                <p className="text-xs text-[#9E958C] max-w-2xl mx-auto">{currentItem.caption}</p>
              )}
              <div className="pt-2 flex justify-center gap-1.5">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSlideDirection(i > selectedIndex ? 'right' : 'left');
                      setSelectedIndex(i);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      i === selectedIndex ? 'w-8 bg-[#D49E6A]' : 'w-2 bg-[#3D3833] hover:bg-[#78716C]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
