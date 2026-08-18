import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  ShieldCheck, 
  DollarSign, 
  GraduationCap, 
  HeartPulse, 
  Home, 
  Radio,
  ArrowRight,
  Calculator,
  Globe2,
  Users,
  CheckCircle2
} from 'lucide-react';
import { PageView } from '../types';
import { DeepDiveNav } from './DeepDiveNav';

const AUDIO_URLS = {
  en: "https://dl.dropboxusercontent.com/scl/fi/lep1ircdlb8lhn1sp4d20/p4-The_100__VA_Disability_Family_Blueprint.m4a?rlkey=4i1yj0ydqon4nazwwbji353ck&st=l8ca3tuy&raw=1",
  es: "https://dl.dropboxusercontent.com/scl/fi/revcfm6tgbkj77u51bhmb/p4-Beneficios_del_cien_por_ciento_permanente_VA.m4a?rlkey=2pqgvay5l7b048igwyjrrf8ua&st=lho6v1t2&raw=1"
};

const TEXT_CONTENT = {
  en: {
    badge: "EPISODE 04 • DEEP DIVE INVESTIGATION",
    title: "Deep Dive Analysis: 100% P&T Disability Benefits",
    subtitle: "Exact Federal Rates, Dependents' Arithmetic, Chapter 35 DEA, & Global Portability",
    overviewIntro: "A precise, arithmetic breakdown of Christian’s 100% Permanent and Total (P&T) VA Disability compensation, current 2025–2026 statutory rates, automatic marriage and child rate scaling, Chapter 35 DEA education stipends, CHAMPVA healthcare, and lifelong preserved assets.",
    audioPlayerTitle: "Audio Overview",
    audioTrackName: "The 100% VA Disability Family Blueprint",
    listenPrompt: "Click play to listen to the two AI hosts walk through the exact arithmetic, monthly cashflow breakdowns, and dependent educational stipends.",
    switchLangBtn: "Español",
    
    // Baseline
    baselineTitle: "Single Veteran Baseline: $3,938.58 / Month",
    baselineSubtitle: "100% Permanent & Total Rating (Non-Taxable)",
    baselineText: "As a veteran with a 100% Permanent and Total (P&T) service-connected rating and no dependents, Christian receives a baseline of $3,938.58 every month. This payment is completely tax-free under federal law, subject to statutory annual Cost-of-Living Adjustments (COLA), and carries absolute global portability—deposited directly regardless of international residency.",

    // Marriage Rate
    marriageTitle: "Marriage Scaling: $4,158.17 / Month",
    marriageSubtitle: "Automatic +$219.59 / Month Spousal Addition",
    marriageText: "The moment Christian marries, the monthly compensation automatically scales to $4,158.17 per month. This reflects an immediate statutory increase of +$219.59 every month simply for having a recognized spouse on the award, with zero reduction in veteran tax exemptions.",

    // Children Arithmetic
    childrenTitle: "Children Progression: $4,318.99+ / Month",
    childrenSubtitle: "+$109.11 Minor Children / +$352.45 Qualifying School Age",
    childrenText: "With a spouse and one child under age 18, monthly tax-free compensation increases to $4,318.99. Each additional minor child adds +$109.11 per month. When a child turns 18 and enters a qualifying school program, the monthly add-on jumps to +$352.45 per qualifying student.",

    // DEA Chapter 35
    deaTitle: "Chapter 35 DEA: Dependents' Educational Assistance",
    deaSubtitle: "Direct Student Stipends (Oct 2025 – Sep 2026 Rates)",
    deaText: "Because of the P&T rating, Christian’s future spouse and each child qualify for Chapter 35 DEA educational assistance. This is an independent stipend paid directly to the student for up to 36 months, completely separate from Christian's monthly disability check: Full-Time: $1,574.00/month; 3/4-Time: $1,244.00/month; Half-Time: $912.00/month (or tuition/fees if lower).",

    // CHAMPVA & Medical
    champvaTitle: "CHAMPVA Comprehensive Family Health Coverage",
    champvaSubtitle: "Lifetime Medical & Prescription Benefits for Dependents",
    champvaText: "Dependents are entitled to CHAMPVA (Civilian Health and Medical Program of the Department of Veterans Affairs). CHAMPVA covers most medically necessary healthcare services, inpatient/outpatient care, and prescription medication with extremely low out-of-pocket costs, operating similarly to TRICARE Standard for the family.",

    // Preserved Veteran Assets
    preservedTitle: "Preserved Lifelong Federal Veteran Assets",
    preservedSubtitle: "Unused GI Bill, VA Home Loan & Priority 1 Healthcare",
    preservedText: "In addition to monthly cashflow, Christian retains key untouched federal assets: Priority Group 1 VA Healthcare with full comprehensive coverage for himself; Unused Post-9/11 GI Bill education benefits; and an Unused VA Home Loan Guaranty offering 0% down payment financing and waived VA funding fees.",

    // Arithmetic Walkthrough
    calcTitle: "Live Arithmetic Walkthrough",
    calcSubtitle: "Simulating Family Milestone Cashflow",
    stageSingle: "Single Veteran",
    stageMarried: "Married (Spouse Added)",
    stageOneChild: "Married + 1 Child",
    stageTwoChildren: "Married + 2 Children",
    stageWithDEAFull: "Married + Spouse in Full-Time College (DEA Included)",
    taxFreeNote: "100% Tax-Free • Global Deposit • Annual COLA Protected",

    keyTerms: [
      "$3,938.58 Base Monthly",
      "$4,158.17 Married Rate",
      "$4,318.99 Married + 1 Child",
      "$1,574/Mo Chapter 35 DEA",
      "CHAMPVA Health Coverage",
      "Priority Group 1 VA Care",
      "Unused Post-9/11 GI Bill",
      "Unused VA Home Loan Guaranty"
    ],
    liveStatus: "READY",
    switchEpisodeBtn: "View Episode 03: The Air Force Analyst"
  },
  es: {
    badge: "EPISODIO 04 • INVESTIGACIÓN EN PROFUNDIDAD",
    title: "Análisis en Profundidad: Beneficios del 100% P&T",
    subtitle: "Cifras Oficiales, Aritmética de Dependientes, Asistencia Educativa DEA y Portabilidad Global",
    overviewIntro: "Un desglose aritmético exacto de la compensación por discapacidad de la VA al 100% Permanente y Total (P&T) de Christian, tarifas legales vigentes 2025–2026, aumentos automáticos por matrimonio e hijos, estipendios educativos Capítulo 35 DEA, seguro médico CHAMPVA y activos protegidos de por vida.",
    audioPlayerTitle: "Resumen de Audio",
    audioTrackName: "Beneficios del Cien Por Ciento Permanente VA",
    listenPrompt: "Haz clic en reproducir para escuchar a los dos presentadores IA explicar la aritmética exacta, el flujo de fondos mensual y los estipendios educativos para dependientes.",
    switchLangBtn: "English",
    
    // Baseline
    baselineTitle: "Base de Veterano Soltero: $3,938.58 / Mes",
    baselineSubtitle: "Calificación 100% Permanente y Total (Libre de Impuestos)",
    baselineText: "Como veterano con una calificación de discapacidad del 100% Permanente y Total (P&T) conectada al servicio sin dependientes, Christian recibe un monto base de $3,938.58 cada mes. Este pago está totalmente exento de impuestos según la ley federal, cuenta con ajustes anuales por costo de vida (COLA) y goza de portabilidad global absoluta.",

    // Marriage Rate
    marriageTitle: "Aumento por Matrimonio: $4,158.17 / Mes",
    marriageSubtitle: "Incremento Automático de +$219.59 / Mes por Cónyuge",
    marriageText: "En el momento en que Christian contrae matrimonio, su compensación mensual aumenta automáticamente a $4,158.17 por mes. Esto representa un incremento directo de +$219.59 mensuales por el simple hecho de incorporar a su cónyuge al registro, sin retención alguna de impuestos.",

    // Children Arithmetic
    childrenTitle: "Progresión por Hijos: $4,318.99+ / Mes",
    childrenSubtitle: "+$109.11 por Menor / +$352.45 en Programa Escolar Calificado",
    childrenText: "Con cónyuge y un hijo menor de 18 años, el monto mensual libre de impuestos sube a $4,318.99. Cada hijo menor adicional suma +$109.11 al mes. Cuando un hijo cumple 18 años y asiste a un programa educativo calificado, el suplemento mensual asciende a +$352.45 por estudiante.",

    // DEA Chapter 35
    deaTitle: "Capítulo 35 DEA: Asistencia Educativa para Dependientes",
    deaSubtitle: "Estipendios Directos al Estudiante (Tarifas Oct 2025 – Sep 2026)",
    deaText: "Gracias a la calificación P&T, la futura esposa de Christian y cada uno de sus hijos califican para el beneficio educativo DEA Capítulo 35. Es un estipendio independiente pagado directamente al estudiante por hasta 36 meses: Tiempo Completo: $1,574.00/mes; 3/4 de Tiempo: $1,244.00/mes; Medio Tiempo: $912.00/mes (o costo de matrícula si es menor).",

    // CHAMPVA & Medical
    champvaTitle: "Cobertura Médica Integral Familiar CHAMPVA",
    champvaSubtitle: "Atención Médica y Medicamentos de por Vida para Dependientes",
    champvaText: "Los dependientes tienen derecho a CHAMPVA (Programa Civil de Salud y Medicina de la VA). CHAMPVA cubre la mayoría de los servicios médicos necesarios, hospitalización, consultas ambulatorias y medicamentos con copagos mínimos, funcionando de manera similar a TRICARE Standard.",

    // Preserved Veteran Assets
    preservedTitle: "Activos Federales Preservados de por Vida",
    preservedSubtitle: "GI Bill Intacto, Préstamo Hipotecario VA y Salud Prioridad 1",
    preservedText: "Además del flujo de efectivo mensual, Christian conserva activos federales clave sin usar: Atención médica VA Grupo de Prioridad 1 con cobertura total para él; beneficios educativos intactos del Post-9/11 GI Bill; y Garantía de Préstamo Hipotecario VA sin pago inicial y sin tarifa de financiamiento.",

    // Arithmetic Walkthrough
    calcTitle: "Demostración Aritmética en Tiempo Real",
    calcSubtitle: "Simulación del Flujo de Fondos por Hitos Familiares",
    stageSingle: "Veterano Soltero",
    stageMarried: "Casado (Cónyuge Agregada)",
    stageOneChild: "Casado + 1 Hijo",
    stageTwoChildren: "Casado + 2 Hijos",
    stageWithDEAFull: "Casado + Cónyuge en Universidad a Tiempo Completo (Con DEA)",
    taxFreeNote: "100% Libre de Impuestos • Depósito Global • Protección Anual COLA",

    keyTerms: [
      "$3,938.58 Base Mensual",
      "$4,158.17 Tarifa Casado",
      "$4,318.99 Casado + 1 Hijo",
      "$1,574/Mes Capítulo 35 DEA",
      "Seguro Médico CHAMPVA",
      "Salud VA Grupo Prioridad 1",
      "Post-9/11 GI Bill Intacto",
      "Garantía Hipotecaria VA"
    ],
    liveStatus: "LISTO",
    switchEpisodeBtn: "Ver Episodio 03: El Analista de la Fuerza Aérea"
  }
};

interface DeepDiveBenefitsProps {
  onNavigate?: (page: PageView) => void;
}

const DeepDiveBenefits: React.FC<DeepDiveBenefitsProps> = ({ onNavigate }) => {
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

  // Royal Gold & Electric Sapphire Animated Audio Visualizer
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
          // Dynamic financial & mathematical voice rhythm simulation
          const wave1 = Math.sin(phase + i * 0.28) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.4 + i * 0.18) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.75 - i * 0.35) * 0.5 + 0.5;
          const speechFactor = Math.abs(Math.sin(phase * 2.3 + (i % 6))) * 0.6 + 0.4;
          
          targetHeight = 6 + (wave1 * 0.38 + wave2 * 0.35 + wave3 * 0.27) * speechFactor * (height - 12);
        }

        // Smooth interpolation
        barHeights[i] += (targetHeight - barHeights[i]) * 0.25;
        const currentH = Math.max(3, barHeights[i]);

        const x = i * (barWidth + 3);
        const y = (height - currentH) / 2;

        // Royal gold to sapphire/emerald gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + currentH);
        const hue = (45 + i * 5 + phase * 25) % 360;
        
        if (isPlaying) {
          gradient.addColorStop(0, `hsla(${hue}, 100%, 65%, 0.95)`);
          gradient.addColorStop(0.5, `hsla(${(hue + 40) % 360}, 95%, 55%, 0.85)`);
          gradient.addColorStop(1, `hsla(${(hue + 80) % 360}, 100%, 50%, 0.95)`);
        } else {
          gradient.addColorStop(0, 'rgba(234, 179, 8, 0.25)');
          gradient.addColorStop(1, 'rgba(234, 179, 8, 0.08)');
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
    <div id="deep-dive-benefits-section" className="max-w-5xl mx-auto px-4 py-8 relative">
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
        className="bg-black/60 border border-yellow-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.08)]"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-70" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper Navigation */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <DeepDiveNav currentEpisode={4} onNavigate={onNavigate} lang={lang} position="top" />
        </div>

        {/* Top Bar with Language Selector & Episode Switchers */}
        <div className="p-6 md:p-8 pt-2 md:pt-2 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 font-mono text-xs font-semibold tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
                {t.badge}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">SYS://DEEP_DIVE_04</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-yellow-400/90 font-mono mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Language Switch Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex items-center p-1 bg-black/80 border border-yellow-500/40 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]'
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
                    ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(234,179,8,0.5)]'
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
            STREAMING AUDIO OVERVIEW PLAYER WITH COLORFUL VISUALIZER
            ======================================================== */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-yellow-500/5 to-transparent border-b border-white/10">
          <div className="bg-black/80 border border-yellow-500/40 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-500" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider">
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
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-yellow-400 shadow-[0_0_10px_#eab308] animate-ping' : 'bg-yellow-500/50'}`} />
                <span className="text-xs font-mono text-gray-400">
                  {isPlaying ? (lang === 'es' ? 'TRANSMITIENDO AUDIO...' : 'STREAMING LIVE...') : t.liveStatus}
                </span>
              </div>
            </div>

            {/* COLORFUL WAVEFORM CANVAS VISUALIZER */}
            <div className="my-4 bg-black/90 rounded-lg p-3 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-emerald-500/10 to-blue-500/10 pointer-events-none opacity-50" />
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
                <span className="text-xs font-mono text-yellow-400 min-w-[42px]">
                  {formatTime(currentTime)}
                </span>
                
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400 focus:outline-none"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-400 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] disabled:opacity-50"
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
                  className="w-16 md:w-24 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            EXACT NUMBERS & ARITHMETIC CARDS
            ======================================================== */}
        <div className="p-6 md:p-8 space-y-8 text-gray-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-white font-medium">
            <p className="text-base md:text-lg leading-relaxed">
              {t.overviewIntro}
            </p>
          </div>

          {/* Interactive Progression / Arithmetic Table */}
          <div className="bg-white/5 border border-yellow-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider">
                <Calculator className="w-4 h-4" />
                <h3>{t.calcTitle}</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5" />
                {t.taxFreeNote}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {/* Box 1: Single */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-yellow-400/50 transition-all">
                <span className="text-xs font-mono text-gray-400 block mb-1">{t.stageSingle}</span>
                <span className="text-2xl font-bold font-mono text-white block">$3,938.58</span>
                <span className="text-[11px] font-mono text-yellow-400/80">Base 100% P&T Monthly</span>
              </div>

              {/* Box 2: Married */}
              <div className="p-4 rounded-lg bg-black/60 border border-yellow-500/40 hover:border-yellow-400 transition-all">
                <span className="text-xs font-mono text-gray-400 block mb-1">{t.stageMarried}</span>
                <span className="text-2xl font-bold font-mono text-yellow-400 block">$4,158.17</span>
                <span className="text-[11px] font-mono text-emerald-400">+$219.59 / Mo Extra</span>
              </div>

              {/* Box 3: Married + 1 Child */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-yellow-400/50 transition-all">
                <span className="text-xs font-mono text-gray-400 block mb-1">{t.stageOneChild}</span>
                <span className="text-2xl font-bold font-mono text-white block">$4,318.99</span>
                <span className="text-[11px] font-mono text-emerald-400">+$160.82 / Mo Extra</span>
              </div>

              {/* Box 4: Married + 2 Children */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-yellow-400/50 transition-all">
                <span className="text-xs font-mono text-gray-400 block mb-1">{t.stageTwoChildren}</span>
                <span className="text-2xl font-bold font-mono text-white block">$4,428.10</span>
                <span className="text-[11px] font-mono text-emerald-400">+$109.11 Each Next Minor</span>
              </div>
            </div>
          </div>

          {/* Grid: Baseline & Marriage */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider mb-3">
                <DollarSign className="w-4 h-4" />
                <h3>{t.baselineTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.baselineSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.baselineText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/50 transition-all group">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Users className="w-4 h-4" />
                <h3>{t.marriageTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.marriageSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.marriageText}
              </p>
            </div>
          </div>

          {/* Grid: Children & Chapter 35 DEA */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Users className="w-4 h-4" />
                <h3>{t.childrenTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.childrenSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.childrenText}
              </p>
            </div>

            <div className="bg-yellow-950/20 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500/60 transition-all">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4" />
                <h3>{t.deaTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.deaSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.deaText}
              </p>
            </div>
          </div>

          {/* Grid: CHAMPVA & Preserved Assets */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider mb-3">
                <HeartPulse className="w-4 h-4" />
                <h3>{t.champvaTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.champvaSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.champvaText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
              <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4" />
                <h3>{t.preservedTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.preservedSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.preservedText}
              </p>
            </div>
          </div>

          {/* Summary Box with Interactive Chips */}
          <div className="bg-gradient-to-r from-yellow-950/30 via-black to-emerald-950/30 border border-yellow-500/40 rounded-xl p-6 hover:border-yellow-500/70 transition-all">
            <div className="flex items-center gap-2 text-yellow-400 font-mono text-xs uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <h3>{lang === 'es' ? 'Resumen de Cifras Clave 2025–2026' : 'Key Statutory Numbers & Rates (2025–2026)'}</h3>
            </div>

            {/* Interactive Concept Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {t.keyTerms.map((term, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-400 font-mono font-semibold"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Episode Navigation */}
          <DeepDiveNav currentEpisode={4} onNavigate={onNavigate} lang={lang} position="bottom" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDiveBenefits;
