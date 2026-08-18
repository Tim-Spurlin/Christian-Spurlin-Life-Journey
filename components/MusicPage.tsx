import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Disc3, 
  Sparkles, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Mic2, 
  Tag, 
  Quote, 
  Sliders, 
  Layers, 
  Info,
  Radio,
  Volume2,
  Clock
} from 'lucide-react';
import { MUSIC_TRACKS } from '../constants';
import { useAudio } from './AudioContext';
import Visualizer from './Visualizer';
import { Track } from '../types';

interface MusicPageProps {
  initialTrackId?: string;
}

const MusicPage: React.FC<MusicPageProps> = ({ initialTrackId }) => {
  const { isPlaying, isBuffering, currentTrack, togglePlay, playTrack, seekTo, currentTime, duration, playbackError } = useAudio();
  
  // Local active track state for the showcase inspector
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(() => {
    if (initialTrackId) {
      const idx = MUSIC_TRACKS.findIndex(t => t.id === initialTrackId);
      if (idx !== -1) return idx;
    }
    const currentIdx = MUSIC_TRACKS.findIndex(t => t.id === currentTrack.id);
    return currentIdx !== -1 ? currentIdx : 0;
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const topAnchorRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  const activeTrack: Track = MUSIC_TRACKS[selectedTrackIndex] || MUSIC_TRACKS[0];
  const isSelectedTrackPlaying = isPlaying && currentTrack.id === activeTrack.id;

  const scrollToTop = () => {
    if (topAnchorRef.current) {
      topAnchorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTrack = (index: number, autoPlay: boolean = false) => {
    setSelectedTrackIndex(index);
    const targetTrack = MUSIC_TRACKS[index];
    if (autoPlay) {
      playTrack(targetTrack);
    }
    scrollToTop();
  };

  const handleNext = () => {
    const nextIdx = (selectedTrackIndex + 1) % MUSIC_TRACKS.length;
    setSelectedTrackIndex(nextIdx);
    if (isPlaying) {
      playTrack(MUSIC_TRACKS[nextIdx]);
    }
    scrollToTop();
  };

  const handlePrev = () => {
    const prevIdx = (selectedTrackIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    setSelectedTrackIndex(prevIdx);
    if (isPlaying) {
      playTrack(MUSIC_TRACKS[prevIdx]);
    }
    scrollToTop();
  };

  const handlePlayToggle = () => {
    if (currentTrack.id !== activeTrack.id) {
      playTrack(activeTrack);
    } else {
      togglePlay();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = progress * duration;
    seekTo(targetTime);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ') {
        // Spacebar toggle if not focusing an input
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
          handlePlayToggle();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTrackIndex, currentTrack, isPlaying]);

  // Center active item horizontally in carousel track
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeEl = container.children[selectedTrackIndex] as HTMLElement;
      if (activeEl) {
        const scrollTarget = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
        container.scrollTo({
          left: scrollTarget,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedTrackIndex]);

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
            <div className="p-2.5 rounded-xl bg-hud-cyan/15 border border-hud-cyan/30 text-hud-cyan shadow-[0_0_20px_rgba(18,181,203,0.3)]">
              <Music size={26} className={isSelectedTrackPlaying ? "animate-pulse" : ""} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-hud-cyan tracking-widest uppercase">
                  AUDIO PRODUCTION & DISCOGRAPHY
                </span>
                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                  STUDIO PROFILES
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Original Music & Song Personalities
              </h1>
            </div>
          </div>
          <p className="text-sm md:text-base text-gray-400 max-w-3xl leading-relaxed">
            Each track carries its own identity, personal storytelling, creative impetus, and emotional frequency—from atmospheric Latin melodies to raw Southern Americana.
          </p>
        </div>

        {/* Global Navigation Controls */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="font-mono text-xs text-gray-300 bg-black/60 border border-white/15 px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-inner">
            <Disc3 size={14} className={isSelectedTrackPlaying ? "text-hud-cyan animate-spin" : "text-gray-500"} />
            <span>TRACK</span>
            <span className="text-hud-cyan font-bold text-sm">{String(selectedTrackIndex + 1).padStart(2, '0')}</span>
            <span className="text-gray-500">/ {String(MUSIC_TRACKS.length).padStart(2, '0')}</span>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous track"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-hud-cyan/15 border border-white/10 hover:border-hud-cyan/40 text-gray-300 hover:text-hud-cyan transition-all shadow-md active:scale-95"
              title="Previous Track"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next track"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-hud-cyan/15 border border-white/10 hover:border-hud-cyan/40 text-gray-300 hover:text-hud-cyan transition-all shadow-md active:scale-95"
              title="Next Track"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Showcase (Featured Track Left 6 / Right 6 Cols on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Player Deck & High-Res Cover Showcase (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-gradient-to-b from-[#121a24] via-[#05080c] to-[#0a0f16] border border-gray-700/50 rounded-3xl p-6 md:p-7 space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden group/deck">
            
            {/* Player Status Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${isSelectedTrackPlaying ? 'bg-hud-cyan animate-ping' : 'bg-emerald-400'}`} />
                <span className="text-xs font-mono font-bold text-hud-cyan tracking-wider">
                  {isSelectedTrackPlaying ? 'STREAMING ACTIVE' : 'STUDIO DECK READY'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                HIGH-FIDELITY AUDIO
              </span>
            </div>

            {/* Native Cover Art Frame + Waveform */}
            <div className="space-y-4">
              <div className="relative w-full aspect-square bg-[#05080c] rounded-2xl overflow-hidden border border-gray-600/30 shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeTrack.id}
                    src={activeTrack.coverArt} 
                    alt={activeTrack.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 mix-blend-lighten"
                  />
                </AnimatePresence>

                {/* Glass Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

                {/* Play Button Floating Center */}
                <button
                  onClick={handlePlayToggle}
                  className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-black/60 hover:bg-hud-cyan backdrop-blur-md border border-white/20 text-white hover:text-black flex items-center justify-center transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.8)] hover:scale-110 active:scale-95 group/btn"
                  title={isSelectedTrackPlaying ? "Pause Audio" : "Play Audio"}
                >
                  {isSelectedTrackPlaying ? (
                    <Pause size={32} className="fill-current" />
                  ) : (
                    <Play size={32} className="fill-current ml-1" />
                  )}
                </button>

                {/* Floating Tags on Cover */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-hud-cyan border border-hud-cyan/30">
                    {activeTrack.genre || 'ORIGINAL'}
                  </span>
                  {activeTrack.year && (
                    <span className="px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10">
                      {activeTrack.year}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10 flex items-center gap-1.5">
                  <Clock size={12} className="text-hud-cyan" />
                  <span>{activeTrack.duration}</span>
                </div>
              </div>

              {/* Real-Time Waveform Visualizer */}
              <div className="w-full h-14 bg-black/80 rounded-2xl overflow-hidden border border-hud-cyan/30 relative p-1.5 shadow-inner">
                <Visualizer />
              </div>

              {/* Interactive Timeline Scrubber */}
              <div className="space-y-1.5 pt-1">
                <div 
                  onClick={handleSeek}
                  className="w-full h-2 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer relative overflow-hidden transition-colors group/scrub"
                  title="Click to seek"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-hud-cyan to-cyan-400 rounded-full relative"
                    style={{ 
                      width: `${duration && duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0}%` 
                    }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_#00f0ff] opacity-0 group-hover/scrub:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Progress Time & Status */}
                <div className="flex justify-between text-xs font-mono text-gray-400 px-1">
                  <span className="text-white font-medium">{isSelectedTrackPlaying ? formatTime(currentTime) : '0:00'}</span>
                  <span className="text-hud-cyan font-bold tracking-wider text-[11px] flex items-center gap-1.5">
                    {isBuffering ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                        <span>BUFFERING STREAM...</span>
                      </>
                    ) : isSelectedTrackPlaying ? (
                      <>
                        <span className="h-1.5 w-1.5 rounded-full bg-hud-cyan animate-ping" />
                        <span>SYNCHRONIZED</span>
                      </>
                    ) : (
                      <span>STUDIO READY</span>
                    )}
                  </span>
                  <span>{isSelectedTrackPlaying && duration ? formatTime(duration) : activeTrack.duration}</span>
                </div>
              </div>

              {/* Player Transport Controls */}
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrev}
                    className="p-3 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all active:scale-95"
                    title="Previous Song"
                  >
                    <SkipBack size={18} />
                  </button>
                  
                  <button 
                    onClick={handlePlayToggle}
                    className={`px-6 py-3 rounded-xl font-mono font-bold text-xs flex items-center gap-2 transition-all duration-300 shadow-lg active:scale-95 ${
                      isSelectedTrackPlaying 
                        ? 'bg-hud-cyan text-black shadow-[0_0_20px_rgba(18,181,203,0.5)]' 
                        : 'bg-white text-black hover:bg-hud-cyan'
                    }`}
                    title={isSelectedTrackPlaying ? "Pause" : "Play"}
                  >
                    {isBuffering ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>LOADING</span>
                      </>
                    ) : isSelectedTrackPlaying ? (
                      <>
                        <Pause size={16} className="fill-current" />
                        <span>PAUSE</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} className="fill-current ml-0.5" />
                        <span>PLAY TRACK</span>
                      </>
                    )}
                  </button>

                  <button 
                    onClick={handleNext}
                    className="p-3 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all active:scale-95"
                    title="Next Song"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                {/* Sonic Spec Badges */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                  <span className="px-2 py-1 rounded bg-black/40 border border-white/10">
                    BPM: <strong className="text-white">{activeTrack.bpm}</strong>
                  </span>
                  <span className="px-2 py-1 rounded bg-black/40 border border-white/10">
                    KEY: <strong className="text-white">{activeTrack.key}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Track Switcher Bar inside Player Frame */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
                Quick Jump:
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {MUSIC_TRACKS.map((t, idx) => {
                  const isSelected = idx === selectedTrackIndex;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTrack(idx)}
                      className={`p-2 rounded-xl text-center font-mono text-[11px] transition-all border ${
                        isSelected 
                          ? 'bg-hud-cyan/20 border-hud-cyan text-hud-cyan font-bold shadow-[0_0_15px_rgba(18,181,203,0.3)]' 
                          : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                      title={t.title}
                    >
                      <div className="truncate">{t.title.split(' ')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Song Profile, Story, Meaning, Personality & Creative Intent (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTrack.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0f16]/90 border border-white/15 rounded-3xl p-6 md:p-9 space-y-7 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              {/* Header: Title, Artist & Personality Mood Badge */}
              <div className="space-y-3 border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-hud-cyan/15 border border-hud-cyan/30 text-hud-cyan font-mono text-xs font-bold uppercase tracking-wider">
                      {activeTrack.genre || 'LATIN / ELECTRONIC'}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-mono text-xs">
                      {activeTrack.year || '2025'}
                    </span>
                  </div>

                  {activeTrack.mood && (
                    <span className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold flex items-center gap-1.5">
                      <Sparkles size={13} className="text-purple-400" />
                      {activeTrack.mood}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                  {activeTrack.title}
                </h2>
                <div className="flex items-center gap-3 text-sm font-mono text-gray-400">
                  <span className="text-hud-cyan font-bold">{activeTrack.artist}</span>
                  <span>•</span>
                  <span>Duration: {activeTrack.duration}</span>
                  <span>•</span>
                  <span>BPM: {activeTrack.bpm}</span>
                  <span>•</span>
                  <span>Key: {activeTrack.key}</span>
                </div>
              </div>

              {/* 1. Song Personality & Vibe Profile */}
              {activeTrack.personality && (
                <div className="bg-gradient-to-r from-hud-cyan/10 via-black/40 to-transparent border-l-4 border-hud-cyan p-4 rounded-r-2xl space-y-1.5">
                  <div className="flex items-center gap-2 text-hud-cyan font-mono text-xs font-bold uppercase tracking-wider">
                    <Sliders size={14} />
                    <span>Sonic Personality & Character</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans font-medium">
                    {activeTrack.personality}
                  </p>
                </div>
              )}

              {/* 2. What It Means To Me (The Story & Soul) */}
              {activeTrack.story && (
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Heart size={14} />
                    <span>What It Means To Me • The Personal Story</span>
                  </div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
                    {activeTrack.story}
                  </p>
                </div>
              )}

              {/* 3. Why I Wrote / Remixed It (Production & Creative Impetus) */}
              {activeTrack.whyWrittenOrRemixed && (
                <div className="space-y-2.5 bg-black/40 border border-white/10 p-5 rounded-2xl">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                    <Mic2 size={14} />
                    <span>Why I Made / Remixed It • Creative & Sonic Architecture</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {activeTrack.whyWrittenOrRemixed}
                  </p>
                </div>
              )}

              {/* 4. Memorable Lyric Verse / Snippet */}
              {activeTrack.lyricsSnippet && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 relative overflow-hidden">
                  <div className="absolute top-2 right-3 text-white/5">
                    <Quote size={60} />
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                    <Quote size={13} className="text-hud-cyan" />
                    <span>Featured Lyric Snippet</span>
                  </div>
                  <p className="text-base md:text-xl font-serif italic text-white leading-relaxed">
                    {activeTrack.lyricsSnippet}
                  </p>
                </div>
              )}

              {/* 5. Vocal Heritage Connection */}
              {activeTrack.vocalHeritage && (
                <div className="flex items-start gap-3 p-4 rounded-xl bg-hud-cyan/5 border border-hud-cyan/20 text-xs font-mono text-gray-300">
                  <Info size={16} className="text-hud-cyan shrink-0 mt-0.5" />
                  <div>
                    <span className="text-hud-cyan font-bold block mb-0.5">FAMILY VOCAL LINEAGE:</span>
                    {activeTrack.vocalHeritage}
                  </div>
                </div>
              )}

              {/* 6. Production Tags */}
              {activeTrack.tags && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                    <Tag size={13} />
                    <span>PRODUCTION TAGS:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeTrack.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:border-hud-cyan/40 hover:text-white transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Buttons Bottom of Card */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <button
                  onClick={handlePrev}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-gray-200 transition-all active:scale-95"
                >
                  <ChevronLeft size={16} /> Previous Track
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-hud-cyan/15 hover:bg-hud-cyan/25 border border-hud-cyan/40 text-sm font-medium text-hud-cyan hover:text-white transition-all shadow-[0_0_15px_rgba(18,181,203,0.15)] active:scale-95"
                >
                  Next Track <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Complete Song Catalog & Grid Reel */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight flex items-center gap-2">
              <Layers size={20} className="text-hud-cyan" />
              Complete Song Profiles & Catalog
            </h3>
            <p className="text-xs md:text-sm text-gray-400 font-sans">
              Select any song to explore its unique personality, lyric notes, and personal meaning.
            </p>
          </div>
          <span className="text-xs font-mono text-gray-500">
            5 ORIGINAL COMPOSITIONS • DUAL AUDIO SUPPORT
          </span>
        </div>

        {/* Interactive Grid of All Tracks */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2"
        >
          {MUSIC_TRACKS.map((track, idx) => {
            const isSelected = idx === selectedTrackIndex;
            const isThisTrackPlaying = isPlaying && currentTrack.id === track.id;

            return (
              <motion.div
                key={track.id}
                role="button"
                tabIndex={0}
                onClick={() => handleSelectTrack(idx, false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectTrack(idx, false);
                  }
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left rounded-2xl overflow-hidden transition-all duration-300 border relative flex flex-col justify-between group cursor-pointer ${
                  isSelected 
                    ? 'border-hud-cyan bg-hud-cyan/10 shadow-[0_0_30px_rgba(18,181,203,0.3)] ring-2 ring-hud-cyan/50' 
                    : 'border-white/10 bg-[#080c12] hover:border-white/30 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Cover Image Frame */}
                <div className="relative aspect-square w-full bg-black overflow-hidden">
                  <img 
                    src={track.coverArt} 
                    alt={track.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isSelected ? 'scale-105 opacity-100' : 'opacity-75 group-hover:opacity-100'
                    }`}
                  />
                  
                  {/* Playing Vinyl Animation Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                  {/* Play Trigger */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isThisTrackPlaying) {
                        togglePlay();
                      } else {
                        handleSelectTrack(idx, true);
                      }
                    }}
                    className={`absolute inset-0 m-auto w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isThisTrackPlaying 
                        ? 'bg-hud-cyan text-black shadow-lg scale-100' 
                        : 'bg-black/60 text-white hover:bg-hud-cyan hover:text-black opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                    }`}
                    title={isThisTrackPlaying ? "Pause" : "Play this song"}
                  >
                    {isThisTrackPlaying ? <Pause size={20} className="fill-current" /> : <Play size={20} className="fill-current ml-0.5" />}
                  </button>

                  {/* Track Number Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-gray-300 border border-white/10">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {isSelected && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-hud-cyan text-black text-[10px] font-mono font-bold shadow-md">
                      ACTIVE
                    </div>
                  )}

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-gray-300 border border-white/10">
                    {track.duration}
                  </div>
                </div>

                {/* Track Details */}
                <div className="p-4 flex flex-col justify-between flex-grow space-y-2 bg-gradient-to-b from-[#080c12] to-black">
                  <div>
                    <div className="text-[10px] font-mono text-hud-cyan font-bold uppercase truncate">
                      {track.genre || 'LATIN MELODIC'}
                    </div>
                    <h4 className={`text-base font-bold truncate leading-snug ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                      {track.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono">{track.artist}</p>
                  </div>

                  {track.personality && (
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed font-sans">
                      {track.personality}
                    </p>
                  )}

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>{track.bpm} BPM</span>
                    <span>{track.key}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export default MusicPage;
