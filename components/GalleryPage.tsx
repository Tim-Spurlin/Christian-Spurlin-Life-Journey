import React, { useState, useEffect, useRef } from 'react';
import { MEMORY_VIDEOS } from '../constants';
import { Play, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeVideo = MEMORY_VIDEOS[currentIndex] || MEMORY_VIDEOS[0];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topAnchorRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  const scrollToTop = () => {
    if (topAnchorRef.current) {
      topAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
    scrollToTop();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % MEMORY_VIDEOS.length);
    scrollToTop();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + MEMORY_VIDEOS.length) % MEMORY_VIDEOS.length);
    scrollToTop();
  };

  // Ensure on initial load the page starts strictly at the top and never scrolls down
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Center active item ONLY horizontally in the carousel track (without scrolling the page vertically)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeEl = container.children[currentIndex] as HTMLElement;
      if (activeEl) {
        const scrollTarget = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
        container.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 flex flex-col min-h-[calc(100vh-5rem)]"
    >
      {/* Top Anchor */}
      <div ref={topAnchorRef} className="h-0 w-0 -mt-8" />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 shrink-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-hud-cyan/10 border border-hud-cyan/30 text-hud-cyan">
              <ImageIcon size={26} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Memories & Moments</h1>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-3xl leading-relaxed">
            A personal archive of family, friends, places, and milestones.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="font-mono text-xs text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
            MEMORY <span className="text-hud-cyan font-bold">{String(currentIndex + 1).padStart(2, '0')}</span> / {String(MEMORY_VIDEOS.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous memory"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-hud-cyan/10 border border-white/10 hover:border-hud-cyan/40 text-gray-300 hover:text-hud-cyan transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next memory"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-hud-cyan/10 border border-white/10 hover:border-hud-cyan/40 text-gray-300 hover:text-hud-cyan transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Showcase (Active Media + Brief Description) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Media Frame (Left 7 Cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVideo.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="w-full h-full flex items-center justify-center bg-black"
              >
                {activeVideo.type === 'image' ? (
                  <img 
                    src={activeVideo.url} 
                    alt={activeVideo.title}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <video 
                    key={activeVideo.url}
                    controls 
                    autoPlay
                    muted={activeVideo.id !== "mem-002"}
                    loop
                    playsInline
                    className="w-full h-full object-contain bg-black outline-none"
                    src={activeVideo.url}
                    poster={activeVideo.thumbnail}
                    onLoadedData={(e) => { 
                      if (activeVideo.id === "mem-002") { 
                        e.currentTarget.volume = 0.75; 
                      } 
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Details & Description (Right 5 Cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-3">
              <span className="text-hud-cyan font-mono text-xs md:text-sm px-3 py-1 bg-hud-cyan/10 border border-hud-cyan/20 rounded-md">
                {activeVideo.date}
              </span>
              <span className="text-[11px] font-mono text-tungsten uppercase tracking-wider">
                ITEM {currentIndex + 1} OF {MEMORY_VIDEOS.length}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              {activeVideo.title}
            </h2>

            <div className="pt-2">
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                {activeVideo.description}
              </p>
            </div>
          </div>

          {/* Quick Step Buttons */}
          <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-gray-200 transition-all"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-hud-cyan/15 hover:bg-hud-cyan/25 border border-hud-cyan/40 text-sm font-medium text-hud-cyan hover:text-white transition-all shadow-[0_0_15px_rgba(18,181,203,0.15)]"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel (Scrollable without Grid) */}
      <div className="space-y-3 pt-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-mono text-tungsten uppercase tracking-widest">
            Timeline Reel
          </h3>
          <span className="text-[11px] font-mono text-gray-500">
            Click any image to view
          </span>
        </div>

        {/* Scrollable Track */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {MEMORY_VIDEOS.map((video, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={video.id}
                onClick={() => handleSelect(idx)}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`snap-start shrink-0 w-64 md:w-72 text-left rounded-xl overflow-hidden transition-all duration-300 border relative group ${
                  isActive 
                    ? 'border-hud-cyan bg-hud-cyan/10 shadow-[0_0_25px_rgba(18,181,203,0.25)] ring-1 ring-hud-cyan/50' 
                    : 'border-white/10 bg-[#08080c] hover:border-white/30 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="relative aspect-video w-full bg-black overflow-hidden">
                  {(video.thumbnail || video.type === 'image') ? (
                    <img 
                      src={video.thumbnail || video.url} 
                      alt={video.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-105 opacity-100' : 'opacity-75 group-hover:opacity-100'}`}
                    />
                  ) : (
                    <video 
                      src={video.url}
                      preload="metadata"
                      muted
                      playsInline
                      className={`w-full h-full object-cover pointer-events-none transition-transform duration-500 ${isActive ? 'scale-105 opacity-100' : 'opacity-75 group-hover:opacity-100'}`}
                      onLoadedData={(e) => {
                        e.currentTarget.currentTime = 0.1;
                      }}
                    />
                  )}

                  {video.type !== 'image' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-transparent transition-colors">
                      <Play className={`w-8 h-8 drop-shadow-md ${isActive ? 'text-hud-cyan' : 'text-white/80'}`} />
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-t from-black via-[#08080c] to-transparent">
                  <h4 className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                    {video.title}
                  </h4>
                  <p className="text-[11px] font-mono text-tungsten mt-0.5">{video.date}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryPage;
