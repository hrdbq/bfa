/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, Calendar, Compass, ZoomIn, X, ChevronRight, ChevronLeft, ShieldCheck 
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GalleryProps {
  galleryItems: GalleryItem[];
}

export default function Gallery({ galleryItems }: GalleryProps) {
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Training', 'Matches', 'Events', 'Champions', 'Facilities'];

  // Filters photo elements
  const filteredGallery = galleryItems.filter(item => {
    if (selectedTab === 'All') return true;
    return item.category === selectedTab;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredGallery.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev !== null && prev < filteredGallery.length - 1 ? prev + 1 : 0));
  };

  const lightboxItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  return (
    <div id="gallery-view-container" className="glow-entrance">
      
      {/* Editorial Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-20 bg-secondary-navy border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=1200')" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <span className="font-mono text-xs font-bold text-accent-blue uppercase tracking-[0.25em] block mb-3">
            LENS ON ATHLETICAL DEVELOPMENT
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            MEDIA GALLERY
          </h1>
          <p className="text-white/70 max-w-2xl text-xs sm:text-sm leading-relaxed mt-3">
            A visual documentation of hard work, discipline, tactical focus, and ecstatic championship campaigns. See our athletes active on the court surfaces.
          </p>
        </div>
      </section>

      {/* Categories Tabs & Subtitle Info */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/5">
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6">
          <div className="flex items-center space-x-2 text-white/50 text-xs font-mono">
            <Compass size={14} className="text-accent-blue" />
            <span>Click any directory category to filter visual media archives:</span>
          </div>

          <div className="flex items-center bg-[#000d21]/60 p-1 rounded-lg border border-white/10 overflow-x-auto max-w-full scrollbar-none gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`gallery-cat-${cat}`}
                onClick={() => {
                  setSelectedTab(cat);
                  setLightboxIndex(null); // Reset lightbox to prevent index mismatches
                }}
                className={`px-3.5 py-1.5 rounded font-display text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer min-h-[35px] whitespace-nowrap ${
                  selectedTab === cat
                    ? 'bg-accent-blue text-[#011B41] font-black'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry-style Responsive Photo Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {filteredGallery.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                id={`gallery-photo-card-${item.id}`}
                onClick={() => setLightboxIndex(idx)}
                className="break-inside-avoid bg-secondary-navy/25 rounded-2xl overflow-hidden border border-white/10 shadow-lg group hover:border-accent-blue/30 transition-all duration-300 relative cursor-pointer"
              >
                
                {/* Image panel */}
                <div className="relative overflow-hidden w-full h-auto">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-auto object-cover transform duration-500 group-hover:scale-102"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=600";
                    }}
                  />
                  
                  {/* Hover active indicators */}
                  <div className="absolute inset-0 bg-primary-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6 z-10">
                    <div className="flex justify-end">
                      <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-primary-navy">
                        <ZoomIn size={14} />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-accent-blue font-bold tracking-wider uppercase block leading-none">
                        {item.category} COLLECTION
                      </span>
                      <h4 className="font-display font-black text-sm text-white uppercase tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-white/40 font-mono text-[9px] block">
                        Record logged: {item.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-text container for standard desktop clarity if hover is absent */}
                <div className="p-4 bg-secondary-navy/40 border-t border-white/5 flex items-center justify-between sm:hidden">
                  <div>
                    <h5 className="font-display font-bold text-xs text-white uppercase">{item.title}</h5>
                    <span className="text-[9px] text-[#64B5E6] font-mono uppercase">{item.category}</span>
                  </div>
                  <Camera size={12} className="text-white/40" />
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-secondary-navy/20 rounded-2xl border border-white/10">
            <Camera size={44} className="text-white/25 mx-auto mb-3" />
            <span className="font-display font-bold text-white uppercase text-sm block">No media available in this category</span>
            <p className="text-white/40 text-xs font-mono mt-1">Upload records in the Admin CMS to populate this library.</p>
          </div>
        )}

      </section>

      {/* Lightbox full preview container */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxItem && (
          <div 
            id="lightbox-container"
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-[#000d21]/95 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-primary-navy border border-white/10 text-white/70 hover:text-white transition-all min-h-[44px] cursor-pointer"
              title="Close light box"
            >
              <X size={20} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-xl bg-primary-navy/80 border border-white/10 text-white hover:text-accent-blue transition-all min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              title="Previous picture"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-xl bg-primary-navy/80 border border-white/10 text-white hover:text-accent-blue transition-all min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              title="Next picture"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content Display frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-secondary-navy border border-white/15 rounded-2xl overflow-hidden max-w-4xl w-full flex flex-col"
            >
              
              <div className="relative aspect-video max-h-[70vh] bg-black">
                <img 
                  src={lightboxItem.imageUrl} 
                  alt={lightboxItem.title} 
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-[#000d21] flex justify-between items-center">
                <div>
                  <span className="font-mono text-[9px] text-[#64B5E6] font-black tracking-widest uppercase block mb-1">
                    {lightboxItem.category} CATEGORY
                  </span>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-tight">
                    {lightboxItem.title}
                  </h3>
                  <p className="text-white/40 text-xs font-mono mt-0.5">
                    Logged: {lightboxItem.date}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 text-[10px] uppercase font-mono text-white/50 bg-[#082C5A] border border-white/5 px-3 py-1.5 rounded-lg">
                  <ShieldCheck size={14} className="text-[#64B5E6]" />
                  <span>BCFA Authorized Media</span>
                </div>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
