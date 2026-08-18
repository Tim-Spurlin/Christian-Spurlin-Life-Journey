import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  Cpu, 
  DollarSign, 
  Layers, 
  Globe2, 
  TrendingUp, 
  AlertTriangle,
  Radio,
  ArrowRight
} from 'lucide-react';
import { PageView } from '../types';
import { DeepDiveNav } from './DeepDiveNav';

const AUDIO_URLS = {
  en: "https://dl.dropboxusercontent.com/scl/fi/56dam8jjm2djfk0rfbvo5/1-english-How_Gum_Money_Built_a_Phone_Empire.m4a?rlkey=ud71b3l9at8k6qz65t816whpb&st=lv96xm7z&raw=1",
  es: "https://dl.dropboxusercontent.com/scl/fi/4akrpcq7j7ntr3iq9izyo/1-spanish-El_imperio_de_hardware_de_Christian_Spurlin.m4a?rlkey=phuzbuboiclasbrb4xxv7ckp8&st=3odtq6dx&raw=1"
};

const TEXT_CONTENT = {
  en: {
    badge: "EPISODE 01 • DEEP DIVE INVESTIGATION",
    title: "Deep Dive Analysis: The 13-Year-Old Architect",
    subtitle: "Infinity Phones, 8th-Grade Cashflow, & The Early Hardware Empire",
    overviewIntro: "An intricate analysis of Christian’s entrepreneurial activities from 8th grade through early 9th grade, detailing the raw ingenuity, systems-thinking, and patience of his early hardware & drop-shipping empire.",
    audioPlayerTitle: "Audio Overview",
    audioTrackName: "How Gum Money Built a Phone Empire",
    listenPrompt: "Click play to listen to the two AI hosts analyze the math, supply chain, and psychology of Christian's 13-year-old empire.",
    switchLangBtn: "Español",
    hustleMathTitle: "The Hustle Math (2006-2007)",
    hustleMathText: "In 8th grade, Christian sold chewing gum at school: 4 pieces per day at 50¢ each for 39 school weeks = $390. Simultaneously, he charged $5 per yard clearing pine cones, sticks, and fallen limbs on Seminole Drive and Cherokee Drive around Indian Lake. Combined savings reached $600 before summer. Great-grandmother Merle matched the $600 exactly as promised, giving him $1,200. The Windows Vista computer he wanted cost $1,000; leftover funds plus extra summer work covered the rest. He received the machine the day 8th grade ended (late May 2007).",
    infinityBrandTitle: "The Infinity Brand Vision",
    infinityBrandText: "Researching the upcoming iPhone during summer 2007 on his new Vista machine, Christian discovered that fully functional, button-less, touchscreen Android phones with expandable SD-card memory, unlocked for every carrier, louder speakers, and configurable software had already existed for years on DHGate (Chinese wholesale platform operating since 2005). Orders took 30 days. He placed small test orders and confirmed they were genuine Android devices (never counterfeits). He named the brand 'Infinity' because a single glass touchscreen felt boundless—you could expand memory, install anything, switch carriers, and dive deeper forever.",
    dropshipTitle: "Inventing the Two-Vendor Dropship Pipeline",
    dropshipText: "Before 'drop-shipping' became a common industry term, 13-year-old Christian engineered a seamless two-vendor pipeline: Vendor 1 supplied the raw unlocked hardware; Vendor 2 (also on DHGate) applied custom-designed 'Infinity' OEM branding and packaging, then shipped directly to the customer. He never touched physical inventory after the test units.",
    scalingTitle: "Rapid Scaling & Self-Taught Code (9th Grade)",
    scalingText: "9th grade began August 2007 (~40-50 days after the real iPhone launched). Having already received 3 finished Infinity units plus 1 for himself, he sold all 3 in the first week. Reinvesting immediately, he expanded to cases, earbuds, and chargers via an eBay store. Profits funded a PS2, PS3, projector, games, and a guitar. He taught himself Blender for 3D product renders and Python for automation scripts (batch-renaming images and organizing files).",
    collapseTitle: "The Sudden Collapse",
    collapseText: "Transitioning 100% online, a $2,000 PayPal check arrived representing accumulated inventory profits. Aunt Charlene deposited the check into her personal bank account and refused to return it. This unprovoked seizure starved the business of operating capital, collapsing the entire global logistics pipeline and forcing Christian out of the household.",
    conclusionQuote: "The sophistication of a 13-year-old mastering cash-flow, branding, global logistics, and 30-day patience laid the groundwork for the extreme systems-thinking that would define the rest of his life.",
    terms: [
      "DHGate Wholesale",
      "OEM Custom Packaging",
      "Unlocked GSM",
      "Micro-SD Expandable Storage",
      "30-Day China Freight",
      "PayPal Instant Payouts",
      "Two-Vendor Pipeline",
      "Early Python Automation"
    ],
    liveStatus: "READY"
  },
  es: {
    badge: "EPISODIO 01 • INVESTIGACIÓN EN PROFUNDIDAD",
    title: "Análisis en Profundidad: El Arquitecto de 13 Años",
    subtitle: "Teléfonos Infinity, Flujo de Caja en 8º Grado y el Primer Imperio de Hardware",
    overviewIntro: "Un desglose minucioso de las actividades empresariales de Christian desde el 8º grado hasta principios del 9º grado, detallando el ingenio, el pensamiento sistémico y la paciencia de su temprano imperio de hardware y drop-shipping.",
    audioPlayerTitle: "Resumen de Audio",
    audioTrackName: "El Imperio de Hardware de Christian Spurlin",
    listenPrompt: "Haz clic en reproducir para escuchar a los dos presentadores IA analizar las matemáticas, la cadena de suministro y la visión del imperio de Christian a los 13 años.",
    switchLangBtn: "English",
    hustleMathTitle: "La Matemática del Emprendimiento (2006-2007)",
    hustleMathText: "En 8º grado, Christian vendía chicle en la escuela: 4 piezas al día a 50¢ cada una durante 39 semanas escolares = $390. Simultáneamente, cobraba $5 por patio limpiando piñas de pino, ramas y palos en Seminole Drive y Cherokee Drive alrededor de Indian Lake. Sus ahorros combinados alcanzaron $600 antes del verano. Su bisabuela Merle igualó los $600 exactamente como prometió, dándole $1,200. La computadora con Windows Vista que deseaba costaba $1,000; el dinero restante más trabajo de verano cubrieron el resto. Recibió la máquina el día que terminó 8º grado (finales de mayo de 2007).",
    infinityBrandTitle: "La Visión de la Marca Infinity",
    infinityBrandText: "Investigando el próximo iPhone durante el verano de 2007 en su nueva máquina Vista, Christian descubrió que ya existían desde hacía años teléfonos Android táctiles, sin botones, con memoria expandible por tarjeta SD, liberados para cualquier operador, altavoces potentes y software configurable en DHGate (sitio mayorista chino operativo desde 2005). Los pedidos tardaban 30 días. Hizo pequeños pedidos de prueba y confirmó que eran dispositivos Android auténticos (nunca falsificaciones). Llamó a la marca 'Infinity' porque una pantalla de vidrio se sentía infinita: podías ampliar memoria, instalar cualquier cosa, cambiar de operador y explorar sin límites.",
    dropshipTitle: "Invención del Sistema Dropship de Dos Proveedores",
    dropshipText: "Antes de que el término 'drop-shipping' fuera común en la industria, Christian a los 13 años diseñó un proceso fluido de dos proveedores: el Proveedor 1 suministraba el hardware liberado; el Proveedor 2 (también en DHGate) aplicaba empaquetado y marca OEM personalizada 'Infinity', enviándolo directamente al cliente. Nunca volvió a tocar inventario físico después de las unidades de prueba.",
    scalingTitle: "Expansión Rápida y Código Autodidacta (9º Grado)",
    scalingText: "El 9º grado comenzó en agosto de 2007 (~40-50 días tras el lanzamiento del iPhone real). Habiendo recibido 3 unidades Infinity terminadas más 1 para él, vendió las 3 en la primera semana. Reinvirtiendo de inmediato, se expandió a fundas, auriculares y cargadores mediante una tienda de eBay. Las ganancias financiaron una PS2, PS3, proyector, videojuegos y una guitarra. Aprendió Blender de forma autodidacta para renders 3D de productos y Python para scripts de automatización (renombrado por lotes de imágenes y organización de archivos).",
    collapseTitle: "El Repentino Colapso",
    collapseText: "Al pasar al 100% en línea, llegó un cheque de PayPal de $2,000 que representaba las ganancias acumuladas de inventario. Su tía Charlene depositó el cheque en su cuenta bancaria personal y se negó a devolverlo. Esta retención indebida privó al negocio de capital de trabajo, colapsando toda la cadena logística global y forzando a Christian a mudarse.",
    conclusionQuote: "La sofisticación de un joven de 13 años dominando el flujo de caja, la creación de marca, la logística global y la paciencia de 30 días sentó las bases del pensamiento sistémico extremo que definiría el resto de su vida.",
    terms: [
      "Venta Mayorista DHGate",
      "Empaquetado OEM Personalizado",
      "GSM Desbloqueado",
      "Memoria Expandible Micro-SD",
      "Flete de 30 Días desde China",
      "Pagos Instantáneos PayPal",
      "Cadena de Dos Proveedores",
      "Automatización Temprana en Python"
    ],
    liveStatus: "LISTO"
  }
};

interface DeepDivePromptProps {
  onNavigate?: (page: PageView) => void;
}

const DeepDivePrompt: React.FC<DeepDivePromptProps> = ({ onNavigate }) => {
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

  // Colorful Animated Audio Visualizer
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
          // Complex synthetic waveform simulation for talking voices
          const wave1 = Math.sin(phase + i * 0.3) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.5 + i * 0.15) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.7 - i * 0.4) * 0.5 + 0.5;
          const speechFactor = Math.abs(Math.sin(phase * 2.2 + (i % 7))) * 0.6 + 0.4;
          
          targetHeight = 6 + (wave1 * 0.35 + wave2 * 0.35 + wave3 * 0.3) * speechFactor * (height - 12);
        }

        // Smooth interpolation
        barHeights[i] += (targetHeight - barHeights[i]) * 0.25;
        const currentH = Math.max(3, barHeights[i]);

        const x = i * (barWidth + 3);
        const y = (height - currentH) / 2;

        // Dynamic vibrant color gradient (cyan -> emerald -> violet -> gold)
        const gradient = ctx.createLinearGradient(0, y, 0, y + currentH);
        const hue = (i * 7 + phase * 40) % 360;
        
        if (isPlaying) {
          gradient.addColorStop(0, `hsla(${hue}, 95%, 65%, 0.95)`);
          gradient.addColorStop(0.5, `hsla(${(hue + 45) % 360}, 90%, 55%, 0.85)`);
          gradient.addColorStop(1, `hsla(${(hue + 90) % 360}, 95%, 50%, 0.95)`);
        } else {
          gradient.addColorStop(0, 'rgba(0, 240, 255, 0.25)');
          gradient.addColorStop(1, 'rgba(0, 240, 255, 0.08)');
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
    <div id="deep-dive-section" className="max-w-5xl mx-auto px-4 py-8 relative">
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
        className="bg-black/60 border border-hud-cyan/30 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.08)]"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-hud-cyan to-transparent opacity-70" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-hud-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper Navigation */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <DeepDiveNav currentEpisode={1} onNavigate={onNavigate} lang={lang} position="top" />
        </div>

        {/* Top Bar with Language Selector */}
        <div className="p-6 md:p-8 pt-2 md:pt-2 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-hud-cyan/10 border border-hud-cyan/40 text-hud-cyan font-mono text-xs font-semibold tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-hud-cyan animate-pulse" />
                {t.badge}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">SYS://DEEP_DIVE_01</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-hud-cyan/90 font-mono mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Language Switch Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex items-center p-1 bg-black/80 border border-hud-cyan/40 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-hud-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]'
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
                    ? 'bg-hud-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.5)]'
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
        <div className="p-6 md:p-8 bg-gradient-to-b from-hud-cyan/5 to-transparent border-b border-white/10">
          <div className="bg-black/80 border border-hud-cyan/40 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-hud-cyan via-purple-500 to-emerald-400" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-hud-cyan animate-pulse" />
                  <span className="text-xs font-mono font-bold text-hud-cyan uppercase tracking-wider">
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
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-ping' : 'bg-hud-cyan/50'}`} />
                <span className="text-xs font-mono text-gray-400">
                  {isPlaying ? (lang === 'es' ? 'TRANSMITIENDO AUDIO...' : 'STREAMING LIVE...') : t.liveStatus}
                </span>
              </div>
            </div>

            {/* COLORFUL WAVEFORM CANVAS VISUALIZER */}
            <div className="my-4 bg-black/90 rounded-lg p-3 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-hud-cyan/10 via-purple-500/10 to-emerald-500/10 pointer-events-none opacity-50" />
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
                <span className="text-xs font-mono text-hud-cyan min-w-[42px]">
                  {formatTime(currentTime)}
                </span>
                
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-hud-cyan focus:outline-none"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-hud-cyan text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] disabled:opacity-50"
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
                  className="w-16 md:w-24 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-hud-cyan"
                  title="Volume"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            INTRICATE CONTENT BREAKDOWN (Bilingual)
            ======================================================== */}
        <div className="p-6 md:p-8 space-y-8 text-gray-300 font-sans leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-hud-cyan/10 border border-hud-cyan/30 text-white font-medium">
            <p className="text-base md:text-lg leading-relaxed">
              {t.overviewIntro}
            </p>
          </div>

          {/* Grid: Hustle Math & Infinity Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-hud-cyan/50 transition-all group">
              <div className="flex items-center gap-2 text-hud-cyan font-mono text-xs uppercase tracking-wider mb-3">
                <DollarSign className="w-4 h-4" />
                <h3>{t.hustleMathTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.hustleMathText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-hud-cyan/50 transition-all group">
              <div className="flex items-center gap-2 text-hud-cyan font-mono text-xs uppercase tracking-wider mb-3">
                <Globe2 className="w-4 h-4" />
                <h3>{t.infinityBrandTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.infinityBrandText}
              </p>
            </div>
          </div>

          {/* Full-width: Dropshipping Pipeline */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-hud-cyan/50 transition-all">
            <div className="flex items-center gap-2 text-hud-cyan font-mono text-xs uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4" />
              <h3>{t.dropshipTitle}</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-300 mb-5">
              {t.dropshipText}
            </p>

            {/* Interactive Concept Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {t.terms.map((term, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-hud-cyan/10 border border-hud-cyan/30 rounded-lg text-xs text-hud-cyan font-mono"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Grid: Rapid Scaling & Sudden Collapse */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-hud-cyan/50 transition-all">
              <div className="flex items-center gap-2 text-hud-cyan font-mono text-xs uppercase tracking-wider mb-3">
                <TrendingUp className="w-4 h-4" />
                <h3>{t.scalingTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.scalingText}
              </p>
            </div>

            <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-6 hover:border-red-500/60 transition-all">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider mb-3">
                <AlertTriangle className="w-4 h-4" />
                <h3>{t.collapseTitle}</h3>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.collapseText}
              </p>
            </div>
          </div>

          {/* Conclusion Quote */}
          <div className="pt-6 border-t border-white/10 text-center">
            <blockquote className="text-sm md:text-base text-gray-400 italic max-w-3xl mx-auto font-sans leading-relaxed">
              "{t.conclusionQuote}"
            </blockquote>
          </div>

          {/* Bottom Episode Navigation */}
          <DeepDiveNav currentEpisode={1} onNavigate={onNavigate} lang={lang} position="bottom" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDivePrompt;
