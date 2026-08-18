import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  Zap, 
  GraduationCap, 
  Target, 
  Pill, 
  Cpu, 
  Radio,
  ArrowRight,
  Terminal,
  Activity,
  Dumbbell,
  ShieldCheck,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { PageView } from '../types';
import { DeepDiveNav } from './DeepDiveNav';

const AUDIO_URLS = {
  en: "https://dl.dropboxusercontent.com/scl/fi/j9nu17z7jy5j6r1c4nsyj/p7-The_Student_Who_Speedran_High_School.m4a?rlkey=btdhmloqczhbwapht4r1lf3ax&st=e43s4gmb&raw=1",
  es: "https://dl.dropboxusercontent.com/scl/fi/iq0bc5vpjbam43wks6be9/p7-C-mo_Christian_Spurlin_hacke-_la_preparatoria.m4a?rlkey=35h4kx0jp6w3nto6fmvdefw2c&st=kohkyqyf&raw=1"
};

const TEXT_CONTENT = {
  en: {
    badge: "EPISODE 07 • DEEP DIVE INVESTIGATION",
    title: "Deep Dive Analysis: High-School Transitions, Credit-Recovery Hack & Enlistment",
    subtitle: "Tippettville Isolation, Pharmacokinetics, Speedrunning 11th & 12th Grade, and Early Air Force Preparation",
    overviewIntro: "An investigative breakdown of Christian's accelerated high school career: replacing digital screens with marksmanship and medical biochemistry in rural Georgia, reverse-engineering Colquitt County High School's self-paced credit software to complete two years of academics in one, and receiving early clearance to prepare for Air Force active duty.",
    audioPlayerTitle: "Audio Overview",
    audioTrackName: "The Student Who Speedran High School",
    listenPrompt: "Click play to listen to the two AI hosts analyze the Tippettville transition, the self-paced credit lab speedrun, and early enlistment logistics.",
    switchLangBtn: "Español",

    // Section 1: Tippettville Road & 10th Grade
    tippettvilleTitle: "10th Grade: Tippettville Road & Wilderness Immersion",
    tippettvilleSubtitle: "Screen-Free Isolation, Expert Ballistics & Biochemical Obsession",
    tippettvilleText: "Following the $2,000 check incident, Christian relocated to Aunt Laura’s house on Tippettville Road along the Wilcox/Dooly county line. Surrounded by endless Georgia woods with no internet access, he replaced digital screens with rigorous physical crafts: hunting, compound archery, rifles, and handguns—achieving expert-level marksmanship. During this time, he unearthed his great-grandmother’s dense medical pill-reference guide, developing an intense obsession with pharmacokinetics, receptor binding, and the biochemistry of how pharmaceuticals alter human physiology.",

    // Section 2: The Credit-Recovery Computer Lab Hack
    labHackTitle: "11th Grade: The Credit-Recovery Speedrun",
    labHackSubtitle: "Reverse-Engineering the Colquitt County High School Curriculum",
    labHackText: "Returning to Colquitt County High School for 11th grade, Christian discovered his Wilcox County credits did not transfer cleanly. Administrators placed him into an isolated, self-paced credit-recovery computer lab designed for at-risk students. Christian immediately spotted the architectural flaw in the curriculum: the software lacked rate limiters and automatically unlocked subsequent modules upon test completion. Operating at full cognitive focus, he completed every 11th-grade requirement—and then systematically completed every single 12th-grade credit as well.",

    // Section 3: The Principal's Office Resolution
    principalTitle: "Senior Year: 'No Reason For You to Sit in Class'",
    principalSubtitle: "Two Weeks into 12th Grade: Official Transcript Clearance",
    principalText: "Two weeks into what was scheduled to be his senior year, his lab instructor walked him down to the principal's office. Examining his completed academic transcript, the principal stated plainly that Christian had already met every state requirement for a high school diploma and had no reason to sit in standard classes. The school granted him immediate release with full permission to work, train, and walk across the stage with his graduating class.",

    // Section 4: Physical Conditioning & Enlistment Pipeline
    enlistmentTitle: "Enlistment Pipeline: Physical & Mental Conditioning",
    enlistmentSubtitle: "Distance Running, Strength Training & Monthly Air Force Drills",
    enlistmentText: "Accepting the early release immediately, Christian converted his schedule into full-time military preparation: rigorous daily distance running, heavy strength training, studying military protocols, and attending monthly Air Force unit drills. After walking at high school graduation as scheduled, he immediately shipped out to active duty.",

    // Section 5: The System-Mastery Pattern
    patternTitle: "The Master Pattern: System Deconstruction",
    patternSubtitle: "From Bubble Gum Logistics to Academic Acceleration",
    patternText: "This academic speedrun exhibited the exact behavioral archetype that began in childhood: identify the operational rules of any structured environment, analyze its mechanics without artificial assumptions, and execute with an intensity that bypasses standard institutional bottlenecks.",

    // Interactive Breakdown Cards
    stat1Title: "Marksmanship & Biochemistry",
    stat1Desc: "Wilderness marksmanship accuracy paired with deep-dive study of pharmaceutical mechanisms.",
    stat2Title: "Dual-Year Academic Hack",
    stat2Desc: "Completed both 11th & 12th grade curricula in a single year via self-paced computer lab modules.",
    stat3Title: "Early Campus Release",
    stat3Desc: "Officially cleared by the principal two weeks into senior year with 100% diploma requirements fulfilled.",
    stat4Title: "Active Duty Pipeline",
    stat4Desc: "Converted freed academic hours into physical conditioning and drills prior to immediate shipping.",

    keyTerms: [
      "Tippettville Road",
      "Pharmacokinetics Study",
      "Expert Marksmanship",
      "Credit-Recovery Lab Hack",
      "Colquitt County High School",
      "Accelerated Graduation",
      "Air Force Preparation",
      "System Architecture Optimization"
    ],
    liveStatus: "READY",
    switchEpisodeBtn: "View Episode 06: Family & Bolivia"
  },
  es: {
    badge: "EPISODIO 07 • INVESTIGACIÓN EN PROFUNDIDAD",
    title: "Análisis en Profundidad: Transición Escolar, el 'Hack' de Créditos y el Alistamiento",
    subtitle: "Aislamiento en Tippettville, Farmacocinética, Completar 11º y 12º Grado en un Año y Preparación para la Fuerza Aérea",
    overviewIntro: "Un desglose de la acelerada etapa escolar de Christian: sustituir las pantallas por tiro de precisión y bioquímica médica en la Georgia rural, descifrar el software de créditos de Colquitt County High School para cursar dos años académicos en uno solo, y obtener la autorización para prepararse físicamente para el servicio activo en la Fuerza Aérea.",
    audioPlayerTitle: "Resumen de Audio",
    audioTrackName: "Cómo Christian Spurlin Hackeó la Preparatoria",
    listenPrompt: "Haz clic en reproducir para escuchar a los dos presentadores IA analizar la etapa en Tippettville, el hack del laboratorio de créditos y el alistamiento militar.",
    switchLangBtn: "English",

    // Section 1: Tippettville Road & 10th Grade
    tippettvilleTitle: "10º Grado: Tippettville Road y Vida en el Bosque",
    tippettvilleSubtitle: "Aislamiento Sin Pantallas, Tiro de Precisión y Obsesión Bioquímica",
    tippettvilleText: "Tras el incidente del cheque de $2,000, Christian se mudó con su tía Laura a Tippettville Road (límite entre Wilcox y Dooly). En medio de kilómetros de bosque y sin internet, cambió las pantallas por la caza, tiro con arco, rifles y pistolas, alcanzando precisión de nivel experto. En esa época descubrió el libro de referencia farmacológica de su bisabuela, obsesionándose con la farmacocinética, la bioquímica y el impacto de los medicamentos en el cuerpo.",

    // Section 2: The Credit-Recovery Computer Lab Hack
    labHackTitle: "11º Grado: El Acelerador de Créditos Académicos",
    labHackSubtitle: "Descifrando el Sistema de Colquitt County High School",
    labHackText: "Al volver a Colquitt County High School en 11º grado, sus créditos de Wilcox no cuadraban del todo, por lo que fue asignado al aula de recuperación de créditos por computadora. Christian notó que el sistema no tenía frenos de tiempo: al terminar un examen, se abría el siguiente módulo. Enfocado al máximo, completó todas las materias de 11º grado y, de inmediato, todos los créditos de 12º grado en ese mismo curso.",

    // Section 3: The Principal's Office Resolution
    principalTitle: "Último Año: 'Ya No Tienes Nada Que Hacer en Clase'",
    principalSubtitle: "A las Dos Semanas de 12º Grado: Autorización Oficial",
    principalText: "A solo dos semanas de iniciar lo que debía ser su último año, su profesor lo llevó ante el director. Al revisar su expediente, el director confirmó que Christian ya había cumplido todos los requisitos para graduarse. Le propuso dejar de asistir a clases, conseguir empleo, prepararse y regresar solo para desfilar en la ceremonia de graduación.",

    // Section 4: Physical Conditioning & Enlistment Pipeline
    enlistmentTitle: "Entrenamiento y Alistamiento Militar",
    enlistmentSubtitle: "Carrera Continua, Gimnasio y Simulacros Mensuales",
    enlistmentText: "Christian aceptó la propuesta de inmediato y dedicó su tiempo a una preparación rigurosa: carreras de larga distancia, levantamiento de pesas, simulacros mensuales con la Fuerza Aérea y acondicionamiento mental. Tras desfilar en la graduación con su generación, partió de inmediato al servicio activo.",

    // Section 5: The System-Mastery Pattern
    patternTitle: "El Patrón Maestro: Dominio del Sistema",
    patternSubtitle: "De la Venta de Chicles al Desglose Académico",
    patternText: "Este avance aceleró el mismo patrón presente desde su infancia: comprender las reglas exactas de cualquier sistema, eliminar supuestos artificiales y operar con un nivel de rendimiento y velocidad que nadie anticipaba.",

    // Interactive Breakdown Cards
    stat1Title: "Tiro y Bioquímica",
    stat1Desc: "Destreza en tiro en el bosque combinada con estudio minucioso de farmacología y bioquímica.",
    stat2Title: "Dos Años en Uno",
    stat2Desc: "Completó todo 11º y 12º grado en un solo ciclo lectivo mediante el laboratorio informático.",
    stat3Title: "Liberación Temprana",
    stat3Desc: "Autorizado por el director a retirarse con el 100% de los requisitos de graduación cumplidos.",
    stat4Title: "Rumbo a la Fuerza Aérea",
    stat4Desc: "Dedicó sus meses libres a acondicionamiento físico extremo y simulacros antes de partir.",

    keyTerms: [
      "Tippettville Road",
      "Farmacocinética",
      "Tiro de Precisión",
      "Hack de Créditos",
      "Colquitt County High School",
      "Graduación Acelerada",
      "Fuerza Aérea",
      "Optimización de Sistemas"
    ],
    liveStatus: "LISTO",
    switchEpisodeBtn: "Ver Episodio 06: Familia y Bolivia"
  }
};

interface DeepDiveHighSchoolProps {
  onNavigate?: (page: PageView) => void;
}

const DeepDiveHighSchool: React.FC<DeepDiveHighSchoolProps> = ({ onNavigate }) => {
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

  // Speedrun Flame & High-Frequency Cyber Orange/Cyan Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    const barCount = 48;
    const barHeights = new Array(barCount).fill(4);

    const render = () => {
      phase += 0.09;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / barCount) - 3;

      for (let i = 0; i < barCount; i++) {
        let targetHeight = 4;
        if (isPlaying) {
          // Dynamic conversational synthesis with high-energy speedrun oscillations
          const wave1 = Math.sin(phase + i * 0.32) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.6 + i * 0.18) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.9 - i * 0.42) * 0.5 + 0.5;
          const speedFactor = Math.abs(Math.sin(phase * 2.5 + (i % 5))) * 0.65 + 0.35;
          
          targetHeight = 6 + (wave1 * 0.42 + wave2 * 0.34 + wave3 * 0.24) * speedFactor * (height - 12);
        }

        // Smooth interpolation
        barHeights[i] += (targetHeight - barHeights[i]) * 0.26;
        const currentH = Math.max(3, barHeights[i]);

        const x = i * (barWidth + 3);
        const y = (height - currentH) / 2;

        // Blazing cyber orange to electric gold & tactical cyan gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + currentH);
        const hue = (25 + i * 3.5 + phase * 30) % 360;
        
        if (isPlaying) {
          gradient.addColorStop(0, `hsla(${hue}, 100%, 65%, 0.95)`);
          gradient.addColorStop(0.5, `hsla(${(hue + 35) % 360}, 95%, 55%, 0.9)`);
          gradient.addColorStop(1, `hsla(${(hue + 180) % 360}, 100%, 55%, 0.95)`);
        } else {
          gradient.addColorStop(0, 'rgba(249, 115, 22, 0.3)');
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0.08)');
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
    <div id="deep-dive-highschool-section" className="max-w-5xl mx-auto px-4 py-8 relative">
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
        className="bg-black/60 border border-orange-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.08)]"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-70" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper Navigation */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <DeepDiveNav currentEpisode={7} onNavigate={onNavigate} lang={lang} position="top" />
        </div>

        {/* Top Bar with Language Selector & Episode Switchers */}
        <div className="p-6 md:p-8 pt-2 md:pt-2 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/40 text-orange-400 font-mono text-xs font-semibold tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                {t.badge}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">SYS://DEEP_DIVE_07</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-orange-400/90 font-mono mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Language Switch Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex items-center p-1 bg-black/80 border border-orange-500/40 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-orange-400 text-black shadow-[0_0_15px_rgba(249,115,22,0.5)]'
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
                    ? 'bg-orange-400 text-black shadow-[0_0_15px_rgba(249,115,22,0.5)]'
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
            STREAMING AUDIO OVERVIEW PLAYER WITH CYBER FLAME VISUALIZER
            ======================================================== */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-orange-500/5 to-transparent border-b border-white/10">
          <div className="bg-black/80 border border-orange-500/40 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 via-amber-400 to-cyan-400" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
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
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-orange-400 shadow-[0_0_10px_#fb923c] animate-ping' : 'bg-orange-500/50'}`} />
                <span className="text-xs font-mono text-gray-400">
                  {isPlaying ? (lang === 'es' ? 'TRANSMITIENDO AUDIO...' : 'STREAMING LIVE...') : t.liveStatus}
                </span>
              </div>
            </div>

            {/* COLORFUL WAVEFORM CANVAS VISUALIZER */}
            <div className="my-4 bg-black/90 rounded-lg p-3 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-cyan-500/10 pointer-events-none opacity-50" />
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
                <span className="text-xs font-mono text-orange-400 min-w-[42px]">
                  {formatTime(currentTime)}
                </span>
                
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-400 focus:outline-none"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-400 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] disabled:opacity-50"
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
                  className="w-16 md:w-24 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-400"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            HIGH-SCHOOL SPEEDRUN & ENLISTMENT BREAKDOWN
            ======================================================== */}
        <div className="p-6 md:p-8 space-y-8 text-gray-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-white font-medium">
            <p className="text-base md:text-lg leading-relaxed">
              {t.overviewIntro}
            </p>
          </div>

          {/* 4-Node Sequence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 text-orange-400 mb-2">
                <Target className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">{t.stat1Title}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{t.stat1Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-orange-500/40 hover:border-orange-400 transition-all">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">{t.stat2Title}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{t.stat2Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">{t.stat3Title}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{t.stat3Desc}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 text-emerald-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-mono font-bold">{t.stat4Title}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">{t.stat4Desc}</p>
            </div>
          </div>

          {/* Grid: 10th Grade vs 11th Grade Speedrun */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Target className="w-4 h-4" />
                <h3>{t.tippettvilleTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.tippettvilleSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.tippettvilleText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4" />
                <h3>{t.labHackTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.labHackSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.labHackText}
              </p>
            </div>
          </div>

          {/* Grid: Senior Year Principal Clearance & Air Force Enlistment */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/50 transition-all">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
                <GraduationCap className="w-4 h-4" />
                <h3>{t.principalTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.principalSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.principalText}
              </p>
            </div>

            <div className="bg-orange-950/20 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/60 transition-all">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Dumbbell className="w-4 h-4" />
                <h3>{t.enlistmentTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.enlistmentSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.enlistmentText}
              </p>
            </div>
          </div>

          {/* Full Width: The System Deconstruction Pattern */}
          <div className="bg-gradient-to-r from-orange-950/30 via-black to-amber-950/30 border border-orange-500/40 rounded-xl p-6 hover:border-orange-500/70 transition-all">
            <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
              <Terminal className="w-4 h-4" />
              <h3>{t.patternTitle}</h3>
            </div>
            <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.patternSubtitle}</h4>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              {t.patternText}
            </p>

            {/* Interactive Concept Chips */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
              {t.keyTerms.map((term, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg text-xs text-orange-300 font-mono font-semibold"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Episode Navigation */}
          <DeepDiveNav currentEpisode={7} onNavigate={onNavigate} lang={lang} position="bottom" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDiveHighSchool;
