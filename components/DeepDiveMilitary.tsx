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
  Lock, 
  Radar, 
  Eye, 
  AlertTriangle, 
  FileCheck,
  Radio,
  ArrowRight,
  Plane,
  Terminal,
  Layers
} from 'lucide-react';
import { PageView } from '../types';
import { DeepDiveNav } from './DeepDiveNav';

const AUDIO_URLS = {
  en: "https://dl.dropboxusercontent.com/scl/fi/og3s762g4cwm40w7ifde2/p3-The_Air_Force_Analyst_Tortured_in_Secret.m4a?rlkey=ob4utziwlrsqldexfl8304igt&st=w9e7bz5j&raw=1",
  es: "https://dl.dropboxusercontent.com/scl/fi/nbjiqzra36c3bu81u8xsp/p3-spanish-El_prodigio_torturado_en_una_b-veda_militar.m4a?rlkey=o2q7ykllrvzmeblt26xtn0mys&st=ukfl72w1&raw=1"
};

const TEXT_CONTENT = {
  en: {
    badge: "EPISODE 03 • DEEP DIVE INVESTIGATION",
    title: "Deep Dive Analysis: The Air Force Analyst",
    subtitle: "U-2 Dragon Lady Intelligence, TS/SCI SCIF Operations, & The Three-Month Targeted Torment",
    overviewIntro: "A rigorous, factual exploration of Christian’s three-year active-duty Air Force career, high-level TS/SCI intelligence work managing U-2 spy plane data inside a SCIF, and the severe, private psychological abuse inflicted by a rogue group of superiors.",
    audioPlayerTitle: "Audio Overview",
    audioTrackName: "The Air Force Analyst Tortured in Secret",
    listenPrompt: "Click play to listen to the two AI hosts analyze the technical military credentials, SCIF intelligence work, and the targeted three-month ordeal.",
    switchLangBtn: "Español",
    
    // Tech Ascension
    enlistmentTitle: "High-Speed Ascension: From Credit Hack to Journeyman",
    enlistmentSubtitle: "Accelerated Graduation & Technical Training (Keesler AFB)",
    enlistmentText: "After hacking the high-school credit-recovery computer lab to finish both 11th and 12th grade requirements in a matter of weeks, Christian was cleared by his principal to enlist early. Entering active-duty U.S. Air Force service, he completed basic military training in San Antonio, Texas, followed by 7 intensive months of technical schooling at Keesler Air Force Base, Mississippi. Specialized in Radar and Radio Frequency Transmission Systems, he mastered complex signal architectures, advanced wave propagation, and secure comms, rising rapidly from apprentice to certified journeyman after demanding exams and technical evaluations.",

    // SCIF & U-2 Dragon Lady
    scifTitle: "Langley AFB: TS/SCI Intel & The U-2 Dragon Lady",
    scifSubtitle: "Inside the SCIF (Sensitive Compartmented Information Facility)",
    scifText: "Stationed at Langley AFB in Hampton, Virginia, Christian operated as an intelligence analyst holding a Top Secret / Sensitive Compartmented Information (TS/SCI) clearance. Working within a heavily restricted, electromagnetic-shielded SCIF, his primary mission was managing, decrypting, and processing high-altitude surveillance telemetry streamed from the iconic Lockheed U-2 'Dragon Lady' reconnaissance aircraft. His precision in handling classified raw sensor data earned him high operational responsibility.",

    // Rogue Group Coercion
    rogueTitle: "The Rogue Hierarchy & Coercive Control",
    rogueSubtitle: "Private Abuse by Individuals (Not the USAF Institution)",
    rogueText: "Near the end of his service, a small cabal of individuals in positions of direct authority over him weaponized the isolation of the SCIF. This abuse was neither sanctioned nor known by the U.S. Air Force or the military as an institution. Exploiting Christian's youth and isolation, they manufactured coercive control through fabricated threats of immediate military imprisonment and dishonorable discharges if he failed to comply with their off-the-record demands.",

    // 4-Day Cycle
    chemicalTitle: "Four-Day Hallucinatory Cycles: Forced Stimulants",
    chemicalSubtitle: "Systematic Sleep Deprivation & Physiological Breakdown",
    chemicalText: "The group forced the ingestion of high-dose amphetamines across relentless 4-day non-stop duty shifts. By day four, severe physiological exhaustion and stimulant toxicity induced vivid waking hallucinations. Only then was Christian permitted a brief home sleep cycle before being pulled back into the secure shop to restart the exact same 4-day loop. This chemical and physical exhaustion eroded cognitive defenses while maintaining active operational duty.",

    // Psychological Loop
    psychologicalTitle: "Psychological Weaponization: The Horror Loop",
    psychologicalSubtitle: "Calculated Terror Inside the SCIF",
    psychologicalText: "Knowing from an earlier shop viewing that the graphic remake of 'Evil Dead' triggered acute visceral fear, the superiors weaponized it. They forced Christian to watch the movie on an endless loop in the private office during prolonged shifts. The combination of forced stimulants, hallucinatory sleep deprivation, and cyclical horror was calculated to break his psychological stability and compel him to exit the military.",

    // Honorable Separation
    separationTitle: "Honorable Discharge & The Unbroken Silence (2014)",
    separationSubtitle: "Three-Year Service & Fear of Retaliation",
    separationText: "After enduring three months of relentless targeted torment, Christian formally requested early separation. He was awarded an Honorable Discharge in 2014 after approximately three years of active service. Terrified that the perpetrators would track him down, retaliate, or execute their fabricated threats, he maintained complete silence about the private SCIF abuse for years.",

    keyTerms: [
      "TS/SCI Clearance",
      "SCIF Compartmented Facility",
      "U-2 Dragon Lady Spy Plane",
      "Radar & RF Journeyman",
      "Keesler AFB Tech School",
      "Langley AFB Intelligence",
      "Honorable Discharge (2014)",
      "Coercive Power Exploitation"
    ],
    liveStatus: "READY",
    switchEpisodeBtn: "View Episode 02: Childhood Trauma & Survival"
  },
  es: {
    badge: "EPISODIO 03 • INVESTIGACIÓN EN PROFUNDIDAD",
    title: "Análisis en Profundidad: El Analista de la Fuerza Aérea",
    subtitle: "Inteligencia del U-2 Dragon Lady, Operaciones SCIF TS/SCI y el Tormento Secreto de Tres Meses",
    overviewIntro: "Una exploración rigurosa y documentada sobre la carrera de tres años de Christian en servicio activo en la Fuerza Aérea, su trabajo de inteligencia con credencial TS/SCI gestionando datos del avión espía U-2 dentro de un SCIF, y el abuso psicológico privado infligido por un grupo aislado de superiores.",
    audioPlayerTitle: "Resumen de Audio",
    audioTrackName: "El Prodigio Torturado en una Bóveda Militar",
    listenPrompt: "Haz clic en reproducir para escuchar a los dos presentadores IA analizar las credenciales militares técnicas, el trabajo de inteligencia en el SCIF y los tres meses de tormento dirigido.",
    switchLangBtn: "English",
    
    // Tech Ascension
    enlistmentTitle: "Ascenso Técnico Acelerado: Del Laboratorio a Journeyman",
    enlistmentSubtitle: "Graduación Adelantada y Entrenamiento Técnico (Keesler AFB)",
    enlistmentText: "Tras completar todos los créditos de 11º y 12º grado en cuestión de semanas en el laboratorio de cómputo, el director autorizó su alistamiento anticipado. En servicio activo en la Fuerza Aérea de EE. UU., completó el entrenamiento básico en San Antonio, Texas, y luego 7 meses intensivos de escuela técnica en la Base Aérea Keesler, Misisipi. Especializado en Sistemas de Transmisión de Radar y Radiofrecuencia, dominó complejas arquitecturas de señales y comunicaciones seguras, ascendiendo velozmente de aprendiz a 'Journeyman' certificado tras rigurosos exámenes técnicos.",

    // SCIF & U-2 Dragon Lady
    scifTitle: "Langley AFB: Inteligencia TS/SCI y el Avión Espía U-2",
    scifSubtitle: "Dentro de la Bóveda Blindada SCIF",
    scifText: "Destinado en Langley AFB en Hampton, Virginia, Christian se desempeñó como analista de inteligencia con habilitación de Seguridad Máxima Top Secret / SCI. Operando dentro de una instalación SCIF hermética y blindada electromagnéticamente, su misión principal consistía en procesar, descifrar y gestionar los flujos de telemetría de vigilancia a gran altitud del legendario avión de reconocimiento Lockheed U-2 'Dragon Lady'.",

    // Rogue Group Coercion
    rogueTitle: "La Jerarquía Abusiva y el Control Coercitivo",
    rogueSubtitle: "Abuso Privado por Individuos (No la Institución Militar)",
    rogueText: "Cerca del final de su servicio, un pequeño grupo de superiores directos armó un esquema de abuso aprovechando el aislamiento del SCIF. Este tormento no fue ordenado ni conocido por la Fuerza Aérea ni el gobierno estadounidense. Explotando la juventud y el aislamiento de Christian, ejercieron control mediante falsas amenazas de prisión militar y baja deshonrosa si no acataba sus órdenes extraoficiales.",

    // 4-Day Cycle
    chemicalTitle: "Ciclos Alucinatorios de Cuatro Días: Estimulantes Forzados",
    chemicalSubtitle: "Privación Sistemática del Sueño y Desgaste Fisiológico",
    chemicalText: "El grupo forzó la ingesta de anfetaminas en dosis altas durante agotadores turnos ininterrumpidos de 4 días. Al cuarto día, el colapso fisiológico y la toxicidad provocaban intensas alucinaciones despierto. Solo entonces se le permitía un breve descanso en casa antes de ser devuelto a la bóveda militar para reiniciar el ciclo idéntico de 4 días.",

    // Psychological Loop
    psychologicalTitle: "Armamento Psicológico: El Bucle de Terror",
    psychologicalSubtitle: "Tortura Mental Calculada Dentro del SCIF",
    psychologicalText: "Sabiendo que el remake gráfico de 'Evil Dead' le provocaba un miedo visceral genuino, sus superiores lo convirtieron en un instrumento de tortura. Lo obligaron a ver la película en un bucle interminable en la oficina privada durante los turnos. La mezcla de estimulantes forzados, alucinaciones por falta de sueño y terror repetitivo fue calculada para quebrar su estabilidad y forzar su salida.",

    // Honorable Separation
    separationTitle: "Baja Honorable y el Silencio Absoluto (2014)",
    separationSubtitle: "Tres Años de Servicio y Temor a Represalias",
    separationText: "Tras soportar tres meses de tormento continuo, Christian solicitó su separación anticipada. Recibió una Baja Honorable en 2014 tras aproximadamente tres años de servicio activo. Aterrorizado de que sus agresores lo rastrearan o ejecutaran sus falsas amenazas, mantuvo un silencio absoluto durante años.",

    keyTerms: [
      "Habilitación TS/SCI",
      "Bóveda SCIF Blindada",
      "Avión Espía U-2 Dragon Lady",
      "Journeyman de Radar y RF",
      "Escuela Técnica Keesler AFB",
      "Inteligencia Langley AFB",
      "Baja Honorable (2014)",
      "Coerción y Abuso de Poder"
    ],
    liveStatus: "LISTO",
    switchEpisodeBtn: "Ver Episodio 02: Trauma Infantil y Supervivencia"
  }
};

interface DeepDiveMilitaryProps {
  onNavigate?: (page: PageView) => void;
}

const DeepDiveMilitary: React.FC<DeepDiveMilitaryProps> = ({ onNavigate }) => {
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

  // Cyber Emerald / Electric Cyan Animated Audio Visualizer
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
          // Tactical voice spectrum simulation
          const wave1 = Math.sin(phase + i * 0.35) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.6 + i * 0.2) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.8 - i * 0.3) * 0.5 + 0.5;
          const speechFactor = Math.abs(Math.sin(phase * 2.5 + (i % 5))) * 0.6 + 0.4;
          
          targetHeight = 6 + (wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25) * speechFactor * (height - 12);
        }

        // Smooth interpolation
        barHeights[i] += (targetHeight - barHeights[i]) * 0.25;
        const currentH = Math.max(3, barHeights[i]);

        const x = i * (barWidth + 3);
        const y = (height - currentH) / 2;

        // Tactical neon gradient (emerald -> cyan -> electric blue -> violet)
        const gradient = ctx.createLinearGradient(0, y, 0, y + currentH);
        const hue = (160 + i * 4 + phase * 30) % 360;
        
        if (isPlaying) {
          gradient.addColorStop(0, `hsla(${hue}, 100%, 65%, 0.95)`);
          gradient.addColorStop(0.5, `hsla(${(hue + 30) % 360}, 95%, 55%, 0.85)`);
          gradient.addColorStop(1, `hsla(${(hue + 60) % 360}, 100%, 50%, 0.95)`);
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
    <div id="deep-dive-military-section" className="max-w-5xl mx-auto px-4 py-8 relative">
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
        className="bg-black/60 border border-emerald-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.08)]"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-70" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper Navigation */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <DeepDiveNav currentEpisode={3} onNavigate={onNavigate} lang={lang} position="top" />
        </div>

        {/* Top Bar with Language Selector & Episode Switchers */}
        <div className="p-6 md:p-8 pt-2 md:pt-2 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-semibold tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                {t.badge}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">SYS://DEEP_DIVE_03</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-emerald-400/90 font-mono mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Language Switch Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex items-center p-1 bg-black/80 border border-emerald-500/40 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
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
                    ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
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
        <div className="p-6 md:p-8 bg-gradient-to-b from-emerald-500/5 to-transparent border-b border-white/10">
          <div className="bg-black/80 border border-emerald-500/40 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
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
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 shadow-[0_0_10px_#10b981] animate-ping' : 'bg-emerald-500/50'}`} />
                <span className="text-xs font-mono text-gray-400">
                  {isPlaying ? (lang === 'es' ? 'TRANSMITIENDO AUDIO...' : 'STREAMING LIVE...') : t.liveStatus}
                </span>
              </div>
            </div>

            {/* COLORFUL WAVEFORM CANVAS VISUALIZER */}
            <div className="my-4 bg-black/90 rounded-lg p-3 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 pointer-events-none opacity-50" />
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
                <span className="text-xs font-mono text-emerald-400 min-w-[42px]">
                  {formatTime(currentTime)}
                </span>
                
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-400 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50"
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
                  className="w-16 md:w-24 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            INTRICATE FACTUAL BREAKDOWN (Bilingual)
            ======================================================== */}
        <div className="p-6 md:p-8 space-y-8 text-gray-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-white font-medium">
            <p className="text-base md:text-lg leading-relaxed">
              {t.overviewIntro}
            </p>
          </div>

          {/* Grid: Tech Ascension & Langley SCIF Intel */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Terminal className="w-4 h-4" />
                <h3>{t.enlistmentTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.enlistmentSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.enlistmentText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all group">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Plane className="w-4 h-4" />
                <h3>{t.scifTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.scifSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.scifText}
              </p>
            </div>
          </div>

          {/* Full-width: Rogue Group Coercion */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-500/50 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
              <Lock className="w-4 h-4" />
              <h3>{t.rogueTitle}</h3>
            </div>
            <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.rogueSubtitle}</h4>
            <p className="text-sm leading-relaxed text-gray-300 mb-2">
              {t.rogueText}
            </p>
          </div>

          {/* Grid: 4-Day Hallucinatory Cycles & Psychological Loop */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500/60 transition-all">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
                <AlertTriangle className="w-4 h-4" />
                <h3>{t.chemicalTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.chemicalSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.chemicalText}
              </p>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500/60 transition-all">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Eye className="w-4 h-4" />
                <h3>{t.psychologicalTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.psychologicalSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.psychologicalText}
              </p>
            </div>
          </div>

          {/* Full-width: Honorable Separation */}
          <div className="bg-gradient-to-r from-emerald-950/30 via-black to-cyan-950/30 border border-emerald-500/40 rounded-xl p-6 hover:border-emerald-500/70 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <h3>{t.separationTitle}</h3>
            </div>
            <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.separationSubtitle}</h4>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              {t.separationText}
            </p>

            {/* Interactive Concept Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {t.keyTerms.map((term, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 font-mono"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Episode Navigation */}
          <DeepDiveNav currentEpisode={3} onNavigate={onNavigate} lang={lang} position="bottom" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDiveMilitary;
