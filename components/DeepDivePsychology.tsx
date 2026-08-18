import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  BrainCircuit, 
  Eye, 
  Layers, 
  Zap, 
  Cpu, 
  Radio,
  ArrowRight,
  Scan,
  Compass,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { PageView } from '../types';
import { DeepDiveNav } from './DeepDiveNav';

const AUDIO_URLS = {
  en: "https://dl.dropboxusercontent.com/scl/fi/9541d2zq0feufrqvh510s/p5-Christian_Spurlin_and_the_negative_blueprint.m4a?rlkey=rnkfysnrdkdnhxz2aq136im88&st=gik641l1&raw=1",
  es: "https://dl.dropboxusercontent.com/scl/fi/bqa2ucphplx2eljtweq6x/p5-La_arquitectura_mental_de_Christian_Spurlin.m4a?rlkey=ks1i0x015wog5cggrw0fbccp9&st=hop83kaf&raw=1"
};

const TEXT_CONTENT = {
  en: {
    badge: "EPISODE 05 • DEEP DIVE INVESTIGATION",
    title: "Deep Dive Analysis: Psychology of the Mind",
    subtitle: "How Trauma Wired Hyper-Awareness, High-Resolution Empathy & The Negative Blueprint",
    overviewIntro: "A cognitive and neurobiological reverse-engineering of Christian’s mind—examining how intense early environmental pressures forged acute micro-expression reading, mirror-neuron simulation, cognitive holding of contradictions, and a transformative 'negative blueprint' architecture.",
    audioPlayerTitle: "Audio Overview",
    audioTrackName: "Christian Spurlin and the Negative Blueprint",
    listenPrompt: "Click play to listen to the two AI hosts reverse-engineer the neurological adaptations, anterior insula wiring, and reverse-blueprint mechanics.",
    switchLangBtn: "Español",

    // Section 1: High-Resolution Empathy
    empathyTitle: "Precocious High-Resolution Empathy (Age 10+)",
    empathySubtitle: "Micro-Expression Decryption & Affective Simulation",
    empathyText: "From age 10 onward, Christian displayed unusually early, high-resolution affective empathy. He instinctively decrypted the underlying emotional states of adults around him—such as instantly discerning the deep, existential defeat in his P.T. teacher’s eyes that went far beyond the immediate moment. Later, he intuitively recognized that Mr. Harp's persistent height jokes stemmed from the wounded vulnerability of an adult once bullied as a child, while simultaneously perceiving Mrs. West's concealed protective kindness beneath external gruffness.",

    // Section 2: The Negative Blueprint Mechanism
    negativeBlueprintTitle: "The Negative Blueprint Principle",
    negativeBlueprintSubtitle: "Trauma as an Inverted Architectural Template",
    negativeBlueprintText: "Christian never assimilated into or mirrored his hostile environments; instead, he treated every destructive behavior as a photographic negative of what he refused to become. Cruelty, confinement, and prejudice were mentally inverted into precise design specifications for his future family, moral boundaries, and personal conduct—building an unshakeable antithetical life blueprint.",

    // Section 3: Resulting Cognitive Traits
    traitsTitle: "Emergent Cognitive Architecture",
    traitsSubtitle: "Situational Hyper-Vigilance & Contradiction Holding",
    traitsText: "This neuro-developmental path produced three defining cognitive traits: 1) Extreme 360-degree situational awareness; 2) The cognitive capacity to hold complex contradictions simultaneously (recognizing that an adult can project anger while harboring kindness, or bully out of unhealed weakness); and 3) Memory as an iterative wisdom engine, revisited only when ready to extract another layer of insight without re-traumatization.",

    // Section 4: Neurobiological Systems
    neuroTitle: "Hyper-Trained Neurological Circuitry",
    neuroSubtitle: "Anterior Insula, Mid-Cingulate & Prefrontal Systems",
    neuroText: "Observable adaptations point to specific neural systems over-trained under pressure: The Anterior Insula (visceral sensation of others' internal states); Mid-Cingulate Cortex (conflict monitoring and intrinsic motivation to understand intent); Amygdala (hyper-sensitized salience for micro-expressions); Prefrontal Discrepancy Circuits (storing inconsistencies for deferred rational synthesis); and Mirror-Neuron Networks (enabling a child to simulate and understand adult suffering).",

    // Interactive Architecture Model
    modelTitle: "Neurological Reverse-Engineering Matrix",
    modelSubtitle: "Adaptation Pathways: Pressure → Neural Re-Wiring → Moral Blueprint",
    node1Title: "Anterior Insula",
    node1Desc: "Visceral internal simulation of others' emotional distress and hidden pain.",
    node2Title: "Mid-Cingulate Cortex",
    node2Desc: "Resolves cognitive conflict; channels stress into analytical comprehension.",
    node3Title: "Prefrontal Discrepancy",
    node3Desc: "Catalogs behavioral inconsistencies to extract future wisdom layers.",
    node4Title: "Negative Blueprint Core",
    node4Desc: "Converts observed toxicity into exact inverse principles of conduct.",

    keyTerms: [
      "Negative Blueprint",
      "High-Resolution Empathy",
      "Anterior Insula Wiring",
      "Contradiction Holding",
      "Mirror-Neuron Simulation",
      "Mid-Cingulate Conflict Drive",
      "Iterative Memory Engine",
      "Inverted Moral Architecture"
    ],
    liveStatus: "READY",
    switchEpisodeBtn: "View Episode 04: 100% P&T Benefits"
  },
  es: {
    badge: "EPISODIO 05 • INVESTIGACIÓN EN PROFUNDIDAD",
    title: "Análisis en Profundidad: Psicología de la Mente",
    subtitle: "Cómo el Trauma Moldeó la Hiperconciencia, la Empatía de Alta Resolución y el Plano Inverso",
    overviewIntro: "Una ingeniería inversa cognitiva y neurobiológica de la mente de Christian: analizando cómo las presiones ambientales tempranas forjaron la lectura aguda de microexpresiones, la simulación por neuronas espejo, la capacidad de sostener contradicciones y una arquitectura transformadora de 'plano inverso'.",
    audioPlayerTitle: "Resumen de Audio",
    audioTrackName: "La Arquitectura Mental de Christian Spurlin",
    listenPrompt: "Haz clic en reproducir para escuchar a los dos presentadores IA desglosar las adaptaciones neurológicas, el cableado de la ínsula anterior y la mecánica del plano inverso.",
    switchLangBtn: "English",

    // Section 1: High-Resolution Empathy
    empathyTitle: "Empatía Precoz de Alta Resolución (Desde los 10 Años)",
    empathySubtitle: "Decodificación de Microexpresiones y Simulación Afectiva",
    empathyText: "Desde los 10 años en adelante, Christian mostró una empatía afectiva inusualmente temprana y de alta resolución. Descifraba instintivamente los estados emocionales ocultos de los adultos a su alrededor: detectó al instante la derrota profunda en los ojos de su maestro de educación física, mucho más allá del incidente inmediato. Posteriormente, reconoció que las burlas sobre estatura del Sr. Harp nacían de la vulnerabilidad de un adulto intimidado en su infancia, a la par que percibía la amabilidad protectora oculta de la Sra. West.",

    // Section 2: The Negative Blueprint Mechanism
    negativeBlueprintTitle: "El Principio del Plano Negativo (Inverso)",
    negativeBlueprintSubtitle: "El Trauma como Plantilla Arquitectónica Invertida",
    negativeBlueprintText: "Christian nunca se convirtió en el reflejo de sus entornos hostiles; utilizó cada conducta destructiva como un negativo fotográfico de lo que se rehusaba a ser. La crueldad, el encierro y los prejuicios se transformaron mentalmente en especificaciones exactas para el diseño de su futura familia, sus límites morales y su propia conducta.",

    // Section 3: Resulting Cognitive Traits
    traitsTitle: "Arquitectura Cognitiva Resultante",
    traitsSubtitle: "Hipervigilancia Situacional y Sostén de Contradicciones",
    traitsText: "Este desarrollo neurológico produjo tres rasgos cognitivos determinantes: 1) Conciencia situacional extrema en 360 grados; 2) Capacidad cognitiva para sostener contradicciones simultáneas (comprender que un adulto puede parecer hostil y tener un corazón bondadoso, o intimidar por heridas no resueltas); y 3) La memoria como un motor de sabiduría iterativa, revisitada solo cuando se está listo para extraer una nueva capa de comprensión.",

    // Section 4: Neurobiological Systems
    neuroTitle: "Circuitos Neurológicos Hiperentrenados",
    neuroSubtitle: "Ínsula Anterior, Cíngulo Medio y Redes Prefrontales",
    neuroText: "Las adaptaciones observables señalan sistemas neuronales hiperestimulados bajo presión: la Ínsula Anterior (percepción visceral de estados ajenos); la Corteza Cingulada Media (monitoreo de conflicto y motivación para comprender intenciones); la Amígdala (saliencia agudizada para microexpresiones); Circuitos Prefrontales de Discrepancia (almacenamiento de inconsistencias para síntesis racional diferida); y Redes de Neuronas Espejo.",

    // Interactive Architecture Model
    modelTitle: "Matriz de Ingeniería Inversa Neurológica",
    modelSubtitle: "Rutas de Adaptación: Presión → Reconfiguración Neuronal → Plano Moral",
    node1Title: "Ínsula Anterior",
    node1Desc: "Simulación visceral del dolor emocional oculto y estados internos ajenos.",
    node2Title: "Corteza Cingulada Media",
    node2Desc: "Canaliza el conflicto cognitivo y el estrés en comprensión analítica.",
    node3Title: "Discrepancia Prefrontal",
    node3Desc: "Cataloga inconsistencias de conducta para extraer sabiduría iterativa.",
    node4Title: "Núcleo del Plano Inverso",
    node4Desc: "Convierte la toxicidad observada en principios exactos de conducta opuesta.",

    keyTerms: [
      "Plano Inverso",
      "Empatía de Alta Resolución",
      "Cableado de Ínsula Anterior",
      "Sostén de Contradicciones",
      "Simulación de Neuronas Espejo",
      "Cíngulo Medio y Conflicto",
      "Motor de Memoria Iterativa",
      "Arquitectura Moral Invertida"
    ],
    liveStatus: "LISTO",
    switchEpisodeBtn: "Ver Episodio 04: Beneficios del 100% P&T"
  }
};

interface DeepDivePsychologyProps {
  onNavigate?: (page: PageView) => void;
}

const DeepDivePsychology: React.FC<DeepDivePsychologyProps> = ({ onNavigate }) => {
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

  // Magenta / Violet / Cyan Synaptic Waveform Visualizer
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
          // Dynamic neural pulse & speech rhythm synthesis
          const wave1 = Math.sin(phase + i * 0.32) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.6 + i * 0.22) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.85 - i * 0.4) * 0.5 + 0.5;
          const speechFactor = Math.abs(Math.sin(phase * 2.4 + (i % 5))) * 0.6 + 0.4;
          
          targetHeight = 6 + (wave1 * 0.4 + wave2 * 0.35 + wave3 * 0.25) * speechFactor * (height - 12);
        }

        // Smooth interpolation
        barHeights[i] += (targetHeight - barHeights[i]) * 0.25;
        const currentH = Math.max(3, barHeights[i]);

        const x = i * (barWidth + 3);
        const y = (height - currentH) / 2;

        // Neural purple-to-magenta and cyan synaptic gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + currentH);
        const hue = (280 + i * 4 + phase * 30) % 360;
        
        if (isPlaying) {
          gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.95)`);
          gradient.addColorStop(0.5, `hsla(${(hue + 50) % 360}, 95%, 60%, 0.85)`);
          gradient.addColorStop(1, `hsla(${(hue + 100) % 360}, 100%, 55%, 0.95)`);
        } else {
          gradient.addColorStop(0, 'rgba(192, 132, 252, 0.25)');
          gradient.addColorStop(1, 'rgba(192, 132, 252, 0.08)');
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
    <div id="deep-dive-psychology-section" className="max-w-5xl mx-auto px-4 py-8 relative">
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
        className="bg-black/60 border border-purple-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.08)]"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-70" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper Navigation */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <DeepDiveNav currentEpisode={5} onNavigate={onNavigate} lang={lang} position="top" />
        </div>

        {/* Top Bar with Language Selector & Episode Switchers */}
        <div className="p-6 md:p-8 pt-2 md:pt-2 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/40 text-purple-400 font-mono text-xs font-semibold tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                {t.badge}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">SYS://DEEP_DIVE_05</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-purple-400/90 font-mono mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Language Switch Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex items-center p-1 bg-black/80 border border-purple-500/40 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
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
                    ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]'
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
            STREAMING AUDIO OVERVIEW PLAYER WITH NEURAL VISUALIZER
            ======================================================== */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-purple-500/5 to-transparent border-b border-white/10">
          <div className="bg-black/80 border border-purple-500/40 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
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
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-purple-400 shadow-[0_0_10px_#c084fc] animate-ping' : 'bg-purple-500/50'}`} />
                <span className="text-xs font-mono text-gray-400">
                  {isPlaying ? (lang === 'es' ? 'TRANSMITIENDO AUDIO...' : 'STREAMING LIVE...') : t.liveStatus}
                </span>
              </div>
            </div>

            {/* COLORFUL WAVEFORM CANVAS VISUALIZER */}
            <div className="my-4 bg-black/90 rounded-lg p-3 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 pointer-events-none opacity-50" />
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
                <span className="text-xs font-mono text-purple-400 min-w-[42px]">
                  {formatTime(currentTime)}
                </span>
                
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-400 focus:outline-none"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-500 text-white hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] disabled:opacity-50"
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
                  className="w-16 md:w-24 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            PSYCHOLOGICAL & NEUROLOGICAL ARCHITECTURE BREAKDOWN
            ======================================================== */}
        <div className="p-6 md:p-8 space-y-8 text-gray-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-white font-medium">
            <p className="text-base md:text-lg leading-relaxed">
              {t.overviewIntro}
            </p>
          </div>

          {/* Matrix / Neural Architecture Grid */}
          <div className="bg-white/5 border border-purple-500/30 rounded-xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider">
                <BrainCircuit className="w-4 h-4" />
                <h3>{t.modelTitle}</h3>
              </div>
              <span className="text-xs font-mono text-pink-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                {t.modelSubtitle}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {/* Node 1 */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="flex items-center gap-2 text-purple-400 mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node1Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node1Desc}</p>
              </div>

              {/* Node 2 */}
              <div className="p-4 rounded-lg bg-black/60 border border-purple-500/40 hover:border-purple-400 transition-all">
                <div className="flex items-center gap-2 text-pink-400 mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node2Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node2Desc}</p>
              </div>

              {/* Node 3 */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <Scan className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node3Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node3Desc}</p>
              </div>

              {/* Node 4 */}
              <div className="p-4 rounded-lg bg-black/60 border border-white/10 hover:border-purple-400/50 transition-all">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Compass className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{t.node4Title}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">{t.node4Desc}</p>
              </div>
            </div>
          </div>

          {/* Grid: High-Res Empathy & Negative Blueprint */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all group">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Eye className="w-4 h-4" />
                <h3>{t.empathyTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.empathySubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.empathyText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all group">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Layers className="w-4 h-4" />
                <h3>{t.negativeBlueprintTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.negativeBlueprintSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.negativeBlueprintText}
              </p>
            </div>
          </div>

          {/* Grid: Cognitive Traits & Neurological Systems */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Cpu className="w-4 h-4" />
                <h3>{t.traitsTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.traitsSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.traitsText}
              </p>
            </div>

            <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all">
              <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-3">
                <BrainCircuit className="w-4 h-4" />
                <h3>{t.neuroTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.neuroSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.neuroText}
              </p>
            </div>
          </div>

          {/* Summary Box with Interactive Chips */}
          <div className="bg-gradient-to-r from-purple-950/30 via-black to-pink-950/30 border border-purple-500/40 rounded-xl p-6 hover:border-purple-500/70 transition-all">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-wider mb-3">
              <CheckCircle2 className="w-4 h-4" />
              <h3>{lang === 'es' ? 'Conceptos Clave de la Arquitectura Mental' : 'Core Psychological Architecture Concepts'}</h3>
            </div>

            {/* Interactive Concept Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {t.keyTerms.map((term, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs text-purple-300 font-mono font-semibold"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Episode Navigation */}
          <DeepDiveNav currentEpisode={5} onNavigate={onNavigate} lang={lang} position="bottom" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDivePsychology;
