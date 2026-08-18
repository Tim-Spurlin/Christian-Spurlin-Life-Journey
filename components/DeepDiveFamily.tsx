import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  Heart, 
  Clock, 
  Palmtree, 
  MessageSquareCode, 
  Compass, 
  Radio,
  ArrowRight,
  Home,
  Users2,
  Globe2,
  CheckCircle2
} from 'lucide-react';
import { PageView } from '../types';
import { DeepDiveNav } from './DeepDiveNav';

const AUDIO_URLS = {
  en: "https://dl.dropboxusercontent.com/scl/fi/h7bdz1ufm8mkc2bm2qly5/p6-Buying_back_time_in_the_Bolivian_Amazon.m4a?rlkey=gzyid2dcrobcc5la8xciwxjaw&st=oa2rgxd9&raw=1",
  es: "https://dl.dropboxusercontent.com/scl/fi/snzhflzchafj75gtvgb0l/p6-Mudarse_a_Bolivia_para_ser_padre_presente.m4a?rlkey=h4fg2b93seo1y1d5p0o472rhk&st=drijesdu&raw=1"
};

const TEXT_CONTENT = {
  en: {
    badge: "EPISODE 06 • DEEP DIVE INVESTIGATION",
    title: "Deep Dive Analysis: Family Values & The Decision to Leave America",
    subtitle: "Buying Back Time in Trinidad, Bolivia, Overcoming the U.S. Time Deficit & Real-Time Translation AI",
    overviewIntro: "An examination of Christian’s lifelong priority of becoming a genuinely present husband and father, why modern American economic structures rendered family presence mathematically unfeasible, and how geographic leverage in the Bolivian Amazon enabled him to reclaim time and build an inverse life model.",
    audioPlayerTitle: "Audio Overview",
    audioTrackName: "Buying Back Time in the Bolivian Amazon",
    listenPrompt: "Click play to listen to the two AI hosts walk through the family philosophy, geographic freedom in Trinidad, and the real-time language engine.",
    switchLangBtn: "Español",

    // Section 1: The Core Desire & The American Work Pattern
    desireTitle: "The Lifelong Priority: Present Fatherhood & Marriage",
    desireSubtitle: "Observing Relational Drift & The Dual-Income Trap",
    desireText: "More than business, accolades, or status, Christian has always prioritized building a thriving, unified family. Yet across relationships in the United States, an inescapable structural dynamic recurred: both partners working 50+ hours a week, exhausting commutes, never occupying the same room during waking hours, and inevitable emotional drift. He witnessed this gradual erosion happen to virtually every household around him.",

    // Section 2: Mathematical Impossibility in the U.S.
    usTrapTitle: "The American Time Deficit",
    usTrapSubtitle: "High Cost of Living Turning Presence into a Theory",
    usTrapText: "In the United States, skyrocketing costs for housing, childcare, medical care, and general living expenses turned the roles of 'husband' and 'father' into abstract concepts rather than daily practices. When both parents must trade all daylight hours simply to service baseline overhead, parenting is outsourced and spouses become passing roommates in their own home.",

    // Section 3: Relocation to Trinidad, Bolivia
    boliviaTitle: "Geographic Freedom: Trinidad, Bolivia",
    boliviaSubtitle: "Converting Monthly Capital into Family Sovereignty",
    boliviaText: "Christian's tax-free disability compensation provided complete location independence. Rather than remaining in a system where that income barely covered single-person living costs, he relocated to Trinidad in the Bolivian Amazon. In Trinidad, the exact same capital comfortably provides a secure home, organic food, private education, top-tier healthcare, and above all else—unfettered, daily time together.",

    // Section 4: Real-Time Translation & Language Engine
    translatorTitle: "Active Engineering: Real-Time Translation AI",
    translatorSubtitle: "Bridging Isolation Through Interactive Linguistic Architecture",
    translatorText: "Relocating to a new continent brought immediate challenges: cultural isolation, knowing few people, and language barriers. Rather than remaining passive, Christian devotes his engineering hours to developing an advanced real-time speech-translation and language-acquisition application. The system listens during live ambient conversations, injects real-time cultural context, and actively teaches Spanish through each genuine daily exchange.",

    // Section 5: The Logical Endpoint
    endpointTitle: "The Culmination of the Negative Blueprint",
    endpointSubtitle: "Using Financial Leverage to Build the Exact Opposite Life",
    endpointText: "This geographic move represents the ultimate manifestation of Christian's core psychological pattern: having spent his early life mapping what he refused to replicate, he used the first true financial leverage in his life to dismantle artificial constraints and engineer an environment of presence, peace, and family unity.",

    // Interactive Comparison Matrix
    modelTitle: "Structural Comparison: Time Sovereignty vs. Overhead",
    modelSubtitle: "Contrasting U.S. Dual-Work Friction Against Trinidad Family Leverage",
    node1Title: "U.S. Overhead Trap",
    node1Desc: "60+ hour work weeks, dual commutes, and childcare costs reducing family presence to exhausted evenings.",
    node2Title: "Geographic Freedom",
    node2Desc: "Global tax-free compensation deployed where cost of living is 80% lower, buying back 100% of daytime hours.",
    node3Title: "Trinidad Baseline",
    node3Desc: "High-quality housing, organic nutrition, healthcare, and education secured with ample surplus reserves.",
    node4Title: "Linguistic AI Engine",
    node4Desc: "Custom-built real-time translation app turning daily conversations into fluent Spanish acquisition.",

    keyTerms: [
      "Present Fatherhood",
      "Time Sovereignty",
      "Trinidad, Bolivia",
      "Dual-Income Drift",
      "Geographic Arbitrage",
      "Real-Time Translation AI",
      "Negative Blueprint Fulfilled",
      "Family-First Architecture"
    ],
    liveStatus: "READY",
    switchEpisodeBtn: "View Episode 05: Psychology of the Mind"
  },
  es: {
    badge: "EPISODIO 06 • INVESTIGACIÓN EN PROFUNDIDAD",
    title: "Análisis en Profundidad: Valores Familiares y la Decisión de Salir de EE.UU.",
    subtitle: "Recuperar el Tiempo en Trinidad, Bolivia, Superar el Déficit de Presencia y la IA de Traducción en Vivo",
    overviewIntro: "Un análisis de la prioridad vital de Christian de ser un esposo y padre verdaderamente presente, por qué la estructura económica estadounidense hacía imposible esa presencia a nivel matemático, y cómo el apalancamiento geográfico en la Amazonía boliviana le permitió recuperar su tiempo y construir un modelo de vida opuesto.",
    audioPlayerTitle: "Resumen de Audio",
    audioTrackName: "Mudarse a Bolivia Para Ser Padre Presente",
    listenPrompt: "Haz clic en reproducir para escuchar a los dos presentadores IA explicar la filosofía familiar, la libertad geográfica en Trinidad y el motor de traducción lingüística en tiempo real.",
    switchLangBtn: "English",

    // Section 1: The Core Desire & The American Work Pattern
    desireTitle: "La Prioridad de Vida: Paternidad y Matrimonio Presentes",
    desireSubtitle: "El Distanciamiento en Parejas y la Trampa del Doble Empleo",
    desireText: "Por encima de negocios o reconocimientos, Christian siempre ha querido formar una familia unida y presente. Sin embargo, en cada relación en Estados Unidos se repetía el mismo patrón estructural: ambas personas trabajando más de 50 horas semanales, largos traslados, sin coincidir en el mismo espacio durante el día y un eventual distanciamiento emocional inevitable.",

    // Section 2: Mathematical Impossibility in the U.S.
    usTrapTitle: "El Déficit de Tiempo en Estados Unidos",
    usTrapSubtitle: "El Alto Costo de Vida Convirtiendo la Paternidad en un Concepto Teórico",
    usTrapText: "En los Estados Unidos, los costos astronómicos de vivienda, guarderías, salud y vida cotidiana convirtieron los roles de 'esposo' y 'padre' en conceptos abstractos. Cuando ambos padres deben vender todas las horas de luz solo para cubrir los gastos básicos, la crianza se delega y la pareja pasa a ser meros compañeros de cuarto.",

    // Section 3: Relocation to Trinidad, Bolivia
    boliviaTitle: "Libertad Geográfica: Trinidad, Bolivia",
    boliviaSubtitle: "Transformando Ingresos Mensuales en Soberanía Familiar",
    boliviaText: "La compensación mensual libre de impuestos de la VA le otorgó independencia geográfica total. En lugar de quedarse donde ese ingreso apenas cubría los gastos de una persona sola, eligió Trinidad, en la Amazonía boliviana. En Trinidad, ese mismo capital cubre holgadamente un hogar amplio, alimentación orgánica, educación, salud y, sobre todo, tiempo real compartido cada día.",

    // Section 4: Real-Time Translation & Language Engine
    translatorTitle: "Ingeniería Activa: IA de Traducción en Tiempo Real",
    translatorSubtitle: "Superando el Aislamiento Mediante Arquitectura Lingüística",
    translatorText: "Mudarse a otro continente trajo desafíos inmediatos: soledad, barreras idiomáticas y no conocer a casi nadie. Lejos de quedarse pasivo, Christian dedica sus horas de ingeniería a construir una aplicación avanzada de traducción de voz y aprendizaje de idiomas en tiempo real. El sistema escucha durante conversaciones cotidianas, aporta contexto cultural y le enseña español dinámicamente en el mismo intercambio.",

    // Section 5: The Logical Endpoint
    endpointTitle: "La Culminación del Plano Inverso",
    endpointSubtitle: "Aprovechar la Primera Palanca Financiera para Vivir lo Opuesto",
    endpointText: "Este cambio geográfico es el desenlace lógico de toda su vida: un hombre que pasó su infancia trazando lo que no quería repetir, y que utilizó su primera palanca financiera real para derribar las limitaciones y construir un entorno de presencia, calma y unión familiar.",

    // Interactive Comparison Matrix
    modelTitle: "Matriz de Comparación: Soberanía del Tiempo vs. Desgaste",
    modelSubtitle: "Contraste Entre el Desgaste Laboral en EE.UU. y el Apalancamiento en Trinidad",
    node1Title: "Trampa de Gastos en EE.UU.",
    node1Desc: "Semanas de más de 60 horas y costos que reducen la convivencia familiar a noches de agotamiento.",
    node2Title: "Libertad Geográfica",
    node2Desc: "Ingreso libre de impuestos en un entorno con 80% menor costo, recuperando el 100% de las horas diurnas.",
    node3Title: "Base de Vida en Trinidad",
    node3Desc: "Hogar, nutrición de primera, salud y educación asegurados con holgado margen para ahorro e inversión.",
    node4Title: "Motor de IA Lingüística",
    node4Desc: "App de traducción en tiempo real que convierte las charlas diarias en aprendizaje fluido de español.",

    keyTerms: [
      "Paternidad Presente",
      "Soberanía del Tiempo",
      "Trinidad, Bolivia",
      "Distanciamiento Laboral",
      "Arbitraje Geográfico",
      "IA de Traducción en Vivo",
      "Plano Inverso Cumplido",
      "Arquitectura Familiar"
    ],
    liveStatus: "LISTO",
    switchEpisodeBtn: "Ver Episodio 05: Psicología de la Mente"
  }
};

interface DeepDiveFamilyProps {
  onNavigate?: (page: PageView) => void;
}

const DeepDiveFamily: React.FC<DeepDiveFamilyProps> = ({ onNavigate }) => {
  // Automatically detect user/visitor device default language
  const [lang, setLang] = useState<'en' | 'es'>(() => {
    if (typeof navigator !== 'undefined') {
      const browserLang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
      if (browserLang.startsWith('es')) {
        return 'es';
      }
    }
    return 'en';
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const t = TEXT_CONTENT[lang];
  const activeAudioUrl = AUDIO_URLS[lang];

  // Language switch handler
  const handleToggleLanguage = (targetLang?: 'en' | 'es') => {
    const nextLang = targetLang || (lang === 'en' ? 'es' : 'en');
    setLang(nextLang);
  };

  // Sync audio source when language changes
  useEffect(() => {
    if (!audioRef.current) return;
    const wasPlaying = isPlaying;
    audioRef.current.pause();
    audioRef.current.src = AUDIO_URLS[lang];
    audioRef.current.load();
    setCurrentTime(0);
    
    if (wasPlaying) {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.warn("Auto-play error on switch:", err);
          setIsPlaying(false);
          setIsLoading(false);
        });
    } else {
      setIsPlaying(false);
    }
  }, [lang]);

  // Audio element listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Play / Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(err => {
          console.warn("Play error:", err);
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  // Seek bar
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  // Volume control
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      audioRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // Time formatting helper
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Amazonian Emerald, Sunrise Gold & Warm Teal Waveform Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const barCount = 48;
    const barHeights = new Array(barCount).fill(4);

    const render = () => {
      phase += 0.08;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / barCount) - 3;

      for (let i = 0; i < barCount; i++) {
        let targetHeight = 4;
        if (isPlaying) {
          // Dynamic conversational synthesis
          const wave1 = Math.sin(phase + i * 0.29) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.5 + i * 0.2) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.8 - i * 0.38) * 0.5 + 0.5;
          const speechFactor = Math.abs(Math.sin(phase * 2.3 + (i % 6))) * 0.6 + 0.4;
          
          targetHeight = 6 + (wave1 * 0.39 + wave2 * 0.36 + wave3 * 0.25) * speechFactor * (height - 12);
        }

        // Smooth interpolation
        barHeights[i] += (targetHeight - barHeights[i]) * 0.25;
        const currentH = Math.max(3, barHeights[i]);

        const x = i * (barWidth + 3);
        const y = (height - currentH) / 2;

        // Amazonian emerald to amber-gold and turquoise gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + currentH);
        const hue = (145 + i * 4 + phase * 25) % 360;
        
        if (isPlaying) {
          gradient.addColorStop(0, `hsla(${hue}, 100%, 65%, 0.95)`);
          gradient.addColorStop(0.5, `hsla(${(hue + 45) % 360}, 95%, 55%, 0.85)`);
          gradient.addColorStop(1, `hsla(${(hue + 90) % 360}, 100%, 50%, 0.95)`);
        } else {
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0.08)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, currentH, 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <div id="deep-dive-family-section" className="max-w-5xl mx-auto px-4 py-8 relative">
      {/* Hidden audio engine element for direct streaming */}
      <audio 
        ref={audioRef} 
        src={activeAudioUrl} 
        preload="metadata" 
      />

      {/* Main Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-black/60 border border-teal-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.08)]"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent opacity-70" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper Navigation */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <DeepDiveNav currentEpisode={6} onNavigate={onNavigate} lang={lang} position="top" />
        </div>

        {/* Top Bar with Language Selector & Episode Switchers */}
        <div className="p-6 md:p-8 pt-2 md:pt-2 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/40 text-teal-400 font-mono text-xs font-semibold tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                {t.badge}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">SYS://DEEP_DIVE_06</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-teal-400/90 font-mono mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Language Switch Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex items-center p-1 bg-black/80 border border-teal-500/40 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-teal-400 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Switch to English"
              >
                <Languages className="w-3.5 h-3.5" />
                EN
              </button>
              <button
                type="button"
                onClick={() => handleToggleLanguage('es')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'es'
                    ? 'bg-teal-400 text-black shadow-[0_0_15px_rgba(20,184,166,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
                title="Cambiar a Español"
              >
                <Languages className="w-3.5 h-3.5" />
                ES
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            STREAMING AUDIO OVERVIEW PLAYER WITH AMAZONIAN VISUALIZER
            ======================================================== */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-teal-500/5 to-transparent border-b border-white/10">
          <div className="bg-black/80 border border-teal-500/40 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-400 via-emerald-400 to-amber-400" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
                    {t.audioPlayerTitle}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
                    {lang.toUpperCase()} STREAM
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white font-sans">
                  {t.audioTrackName}
                </h3>
                <p className="text-xs text-gray-400">
                  {t.listenPrompt}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 self-start lg:self-center">
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-teal-400 shadow-[0_0_10px_#2dd4bf] animate-ping' : 'bg-teal-500/50'}`} />
                <span className="text-xs font-mono text-gray-400">
                  {isPlaying ? (lang === 'es' ? 'TRANSMITIENDO AUDIO...' : 'STREAMING LIVE...') : t.liveStatus}
                </span>
              </div>
            </div>

            {/* COLORFUL WAVEFORM CANVAS VISUALIZER */}
            <div className="my-4 bg-black/90 rounded-lg p-3 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-amber-500/10 pointer-events-none opacity-50" />
              <canvas 
                ref={canvasRef} 
                width={800} 
                height={70} 
                className="w-full h-16 block relative z-10"
              />
            </div>

            {/* PROGRESS & SCRUBBER */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-teal-400 min-w-[42px]">
                  {formatTime(currentTime)}
                </span>
                
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-400 focus:outline-none"
                />

                <span className="text-xs font-mono text-gray-400 min-w-[42px] text-right">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* PLAYER CONTROLS */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={togglePlay}
                  disabled={isLoading}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-400 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(20,184,166,0.4)] disabled:opacity-50"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  )}
                </button>

                <div>
                  <span className="text-xs font-mono text-white font-bold block">
                    {isPlaying ? (lang === 'es' ? 'Reproduciendo' : 'Now Playing') : (lang === 'es' ? 'Pausado' : 'Paused')}
                  </span>
                  <span className="text-[11px] font-mono text-gray-400">
                    {t.audioTrackName}
                  </span>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={toggleMute}
                  className="text-gray-400 hover:text-white transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 md:w-24 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            FAMILY VALUES & BOLIVIA BREAKDOWN
            ======================================================== */}
        <div className="p-6 md:p-8 space-y-8 text-gray-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 text-white font-medium">
            <p className="text-base md:text-lg leading-relaxed">
              {t.overviewIntro}
            </p>
          </div>

          {/* Time Sovereignty Comparison Matrix */}
          <div className="bg-white/5 border border-teal-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <h3>{t.modelTitle}</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                <Palmtree className="w-3.5 h-3.5" />
                {t.modelSubtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {/* Node 1 */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-teal-400/50 transition-all">
                <div className="flex items-center gap-2 text-red-400 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node1Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node1Desc}</p>
              </div>

              {/* Node 2 */}
              <div className="p-4 rounded-lg bg-black/60 border border-teal-500/40 hover:border-teal-400 transition-all">
                <div className="flex items-center gap-2 text-teal-400 mb-1">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node2Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node2Desc}</p>
              </div>

              {/* Node 3 */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-teal-400/50 transition-all">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Home className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node3Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node3Desc}</p>
              </div>

              {/* Node 4 */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-teal-400/50 transition-all">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <MessageSquareCode className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node4Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node4Desc}</p>
              </div>
            </div>
          </div>

          {/* Grid: Priority & The U.S. Trap */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Heart className="w-4 h-4" />
                <h3>{t.desireTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.desireSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.desireText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-teal-500/50 transition-all group">
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Clock className="w-4 h-4" />
                <h3>{t.usTrapTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.usTrapSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.usTrapText}
              </p>
            </div>
          </div>

          {/* Grid: Trinidad, Bolivia & Translation AI */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-teal-500/50 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Palmtree className="w-4 h-4" />
                <h3>{t.boliviaTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.boliviaSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.boliviaText}
              </p>
            </div>

            <div className="bg-teal-950/20 border border-teal-500/30 rounded-xl p-6 hover:border-teal-500/60 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                <MessageSquareCode className="w-4 h-4" />
                <h3>{t.translatorTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.translatorSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.translatorText}
              </p>
            </div>
          </div>

          {/* Full Width: The Logical Endpoint */}
          <div className="bg-gradient-to-r from-teal-950/30 via-black to-emerald-950/30 border border-teal-500/40 rounded-xl p-6 hover:border-teal-500/70 transition-all">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
              <Compass className="w-4 h-4" />
              <h3>{t.endpointTitle}</h3>
            </div>
            <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.endpointSubtitle}</h4>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              {t.endpointText}
            </p>

            {/* Interactive Concept Chips */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
              {t.keyTerms.map((term, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-teal-500/10 border border-teal-500/30 rounded-lg text-xs text-teal-300 font-mono font-semibold"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Episode Navigation */}
          <DeepDiveNav currentEpisode={6} onNavigate={onNavigate} lang={lang} position="bottom" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDiveFamily;
