import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Languages, 
  Sparkles, 
  ShieldAlert, 
  Home, 
  Flame, 
  Compass, 
  HeartHandshake, 
  AlertOctagon,
  Radio,
  ArrowRight,
  Bike
} from 'lucide-react';
import { PageView } from '../types';
import { DeepDiveNav } from './DeepDiveNav';

const AUDIO_URLS = {
  en: "https://dl.dropboxusercontent.com/scl/fi/m7k7tclvx98siyzuyrz6p/2-english-Christian_Spurlin_s_twenty_mile_bike_ride.m4a?rlkey=qokryhnzoswno6ws0y1ugxms8&st=jr4vrlby&raw=1",
  es: "https://dl.dropboxusercontent.com/scl/fi/9qto4z2p309atvvkfkk88/2-spanish-El_calvario_de_Christian_Spurlin_en_Georgia.m4a?rlkey=j65v39kip4yyj3yt5k5h9wdw5&st=zin9k50b&raw=1"
};

const TEXT_CONTENT = {
  en: {
    badge: "EPISODE 02 • DEEP DIVE INVESTIGATION",
    title: "Deep Dive Analysis: Childhood Trauma & Foster Survival",
    subtitle: "Chronological Sequence of Placements, Physical Endurance, & The 20-Mile Escape",
    overviewIntro: "A rigorous, chronological investigation into the foster placements and domestic environments Christian endured from age ~8 to 13, focusing on concrete sensory events, psychological survival mechanisms, and unyielding fortitude.",
    audioPlayerTitle: "Audio Overview",
    audioTrackName: "Christian Spurlin's Twenty-Mile Bike Ride",
    listenPrompt: "Click play to listen to the two AI hosts analyze the chronological placements, sensory details, and survival endurance.",
    switchLangBtn: "Español",
    
    // Placement 1
    placement1Title: "Placement I: Ms. Jeanie & Mr. Jackie (~Age 60)",
    placement1Subtitle: "Locked Confinement & The Nightly Routine",
    placement1Text: "Living with his younger brother Zachary (~5 years old), the daily cycle was rigidly controlled: an older Black woman named Ms. Fern picked Christian up from school and dropped him at Prime Time (a fenced playground). Later she retrieved the boys, brought them home before dark, tucked them into bed, read stories, and sang 'Take Me Out to the Ball Game.' The bedroom door was then locked from the outside until morning. On weekends, the brothers were locked inside the room all day with only packaged 'bright food' and forbidden to leave. When the frightened young boys cried, Ms. Jeanie violently grabbed both by the face and shook them—an imprint Zachary remembers decades later.",
    
    // Placement 2
    placement2Title: "Placement II: Six Months with Ms. Reba",
    placement2Subtitle: "Stringfellow Elementary & Food Scarcity Defense",
    placement2Text: "Placed in Moultrie with Ms. Reba alongside Antonio and Justin (who shared Christian's exact birthday: July 18, 1993). The household also housed Mr. Carson, a severely disabled man in his 50s. At dinnertime, the second Christian averted his eyes, Mr. Carson would swipe entire handfuls of food, clearing the plate in a single swipe. Christian learned midnight stealth—quietly navigating downstairs after everyone was asleep to retrieve peel-back single-serve cereal bowls. He walked to Stringfellow Elementary safely with Justin and Antonio each day.",

    // Placement 3
    placement3Title: "Four Years in Coolidge: Aunt Connie & Dave (Ages 9–13)",
    placement3Subtitle: "Myron Hart Road & Nightly Military Torment",
    placement3Text: "Surrounded by dirt roads, pine trees, and cotton fields 30 minutes from Walmart. While Dave was a charismatic rattlesnake wrangler and metalworker by day, nights brought relentless alcoholic violence. Dave subjected Christian to 'military drills': standing in underwear in the yard sprayed with a high-pressure hose in freezing winter or humid mosquito-swarmed summer with arms locked straight up behind his head for hours. Corner punishments routinely lasted 24 to 30+ hours (extended after Christian innocently made a water droplet sound, prompting Dave to body-slam him). Choking, beer poured into his eyes, and the repeated accusation 'You hurt my family' occurred nightly. Christian learned complete facial suppression: displaying zero emotion to avoid escalated beatings.",

    // Dissociation / Fireplace
    fireplaceTitle: "The Dancing Flames: Internal Dissociation",
    fireplaceSubtitle: "Survival Chemistry & Psychological Shielding",
    fireplaceText: "After hours of hose torment in the yard, Dave would bring a shivering Christian inside to a pre-lit fireplace, handing him a towel and blanket before retreating. Sitting on the hearth, Christian looked into the fire and imagined the dancing flames as 'happy little families dancing together.' This mental sanctum became his armor; during subsequent physical assaults, he detached entirely from physical pain, retreating into the sanctuary of the dancing flames.",

    // Moral Contrast
    contrastTitle: "The Moral Contrast: Caregivers vs. Domestic Hypocrisy",
    contrastSubtitle: "Unfiltered Observations on Humanity",
    contrastText: "Every memory Christian held of Black caregivers in the state system (Ms. Fern bringing ice cream and singing lullabies; Ms. Reba's protection) was grounded in genuine warmth. In contrast, older white relatives who openly voiced racist outrage about him staying with Black families were the exact individuals who took legal guardianship only to inflict daily physical violence and zero love. This stark contradiction permanently insulated Christian against racial prejudice and forged a lifelong rejection of familial hypocrisy.",

    // The Bike Ride Escape
    escapeTitle: "The 20-Mile Bicycle Escape to Thomasville",
    escapeSubtitle: "Single-Speed Child's Bike & The Catalyst for Freedom",
    escapeText: "In his final year at Coolidge, after Dave and his daughters departed, Connie subjected Christian to relentless psychological breaking without reprieve. Pushed to the brink, Christian mounted a small single-speed kid's bicycle and pedaled 20 miles across Georgia backroads to Thomasville (a grueling 4.5-hour journey). He took refuge in an abandoned house. Kind neighbors across the road noticed him, gave him a sandwich, and let him play a hunting game on PS2 with their son. Police returned him; an officer whipped him with Connie's belt, followed by Connie beating him again. This desperate escape became the undeniable evidence that enabled school counselors to intervene and transfer custody to Aunt Charlene.",

    keyTerms: [
      "20-Mile Single-Speed Escape",
      "Prime Time Confinement",
      "Nightly Military Drills",
      "Fireplace Dissociation Mechanism",
      "Complete Facial Pain Suppression",
      "30-Hour Corner Standing",
      "Coolidge Rural Isolation",
      "Stringfellow Elementary"
    ],
    liveStatus: "READY",
    switchEpisodeBtn: "View Episode 01: The 13-Year-Old Architect"
  },
  es: {
    badge: "EPISODIO 02 • INVESTIGACIÓN EN PROFUNDIDAD",
    title: "Análisis en Profundidad: Trauma Infantil y Supervivencia",
    subtitle: "Secuencia Cronológica de Hogares de Acogida, Resistencia Física y la Fuga de 20 Millas",
    overviewIntro: "Una investigación cronológica rigurosa sobre los hogares de acogida y entornos domésticos que Christian soportó entre los ~8 y 13 años, centrada en hechos sensoriales concretos, mecanismos de supervivencia psicológica y una fortaleza inquebrantable.",
    audioPlayerTitle: "Resumen de Audio",
    audioTrackName: "El Calvario de Christian Spurlin en Georgia",
    listenPrompt: "Haz clic en reproducir para escuchar a los dos presentadores IA analizar los hogares cronológicos, detalles sensoriales y la resistencia de supervivencia.",
    switchLangBtn: "English",
    
    // Placement 1
    placement1Title: "Hogar I: Sra. Jeanie y Sr. Jackie (~60 Años)",
    placement1Subtitle: "Confinamiento Bajo Llave y Rutina Nocturna",
    placement1Text: "Viviendo junto a su hermano menor Zachary (~5 años), el ciclo diario era rígidamente controlado: una mujer afroamericana mayor llamada Sra. Fern recogía a Christian de la escuela y lo llevaba a Prime Time (un parque cercado). Más tarde recogía a los niños, los llevaba a casa antes del anochecer, los arropaba, leía cuentos y cantaba 'Take Me Out to the Ball Game'. Luego la puerta del dormitorio se cerraba con llave desde afuera hasta la mañana. Los fines de semana estaban encerrados en la habitación todo el día con comida empaquetada ('bright food') sin permiso de salir. Cuando los niños lloraban asustados, la Sra. Jeanie los sujetaba con violencia del rostro y los sacudía fuertemente, un impacto que Zachary recuerda décadas después.",

    // Placement 2
    placement2Title: "Hogar II: Seis Meses con la Sra. Reba",
    placement2Subtitle: "Escuela Stringfellow y Defensa contra la Escasez",
    placement2Text: "Ubicado en Moultrie con la Sra. Reba junto a Antonio y Justin (quien compartía exactamente la fecha de cumpleaños de Christian: 18 de julio de 1993). En la casa también vivía el Sr. Carson, un hombre de unos 50 años con discapacidad severa. Durante la cena, en el instante en que Christian apartaba la vista, el Sr. Carson tomaba puñados enteros de comida de su plato. Christian aprendió a moverse sigilosamente a medianoche, bajando las escaleras en silencio para conseguir pequeños recipientes individuales de cereal. Caminaba a la escuela Stringfellow con seguridad junto a Justin y Antonio todos los días.",

    // Placement 3
    placement3Title: "Cuatro Años en Coolidge: Tía Connie y Dave (9 a 13 Años)",
    placement3Subtitle: "Myron Hart Road y Tormento Militar Nocturno",
    placement3Text: "Rodeado de caminos de tierra, pinos y campos de algodón a 30 minutos de Walmart. Aunque de día Dave era un hábil cazador de serpientes de cascabel y herrero, las noches traían violencia alcohólica extrema. Dave sometía a Christian a 'ejercicios militares': permanecer en ropa interior en el patio mientras era rociado con una manguera a presión en invierno helado o veranos infestados de mosquitos, con los brazos extendidos rectos detrás de la cabeza durante horas. Los castigos en el rincón duraban de 24 a más de 30 horas (prolongado tras hacer un sonido de gota de agua con la boca, lo que provocó que Dave lo azotara contra el piso). Golpes, cerveza en los ojos y la constante frase 'Tú lastimaste a mi familia'. Christian aprendió a suprimir todo gesto de dolor en su rostro para evitar violencia peor.",

    // Dissociation / Fireplace
    fireplaceTitle: "Las Llamas Danzantes: Disociación Interna",
    fireplaceSubtitle: "Química de Supervivencia y Escudo Mental",
    fireplaceText: "Tras horas de castigo con la manguera, Dave traía a Christian empapado al interior frente a una chimenea previamente encendida, entregándole una toalla y manta antes de encerrarse en su habitación. Sentado en el suelo, Christian observaba el fuego imaginando que las llamas danzantes eran 'pequeñas familias felices bailando juntas'. Este santuario mental se convirtió en su armadura; durante agresiones posteriores, se desconectaba por completo del dolor físico, refugiándose en las familias de fuego.",

    // Moral Contrast
    contrastTitle: "El Contraste Moral: Cuidadores vs. Hipocresía Familiar",
    contrastSubtitle: "Observaciones Sin Filtro sobre la Naturaleza Humana",
    contrastText: "Cada recuerdo que Christian conservó de los cuidadores afroamericanos en el sistema de acogida (la Sra. Fern dándoles helado y cantando canciones; la protección de la Sra. Reba) estuvo lleno de calidez genuina. En contraste, parientes blancos mayores que expresaban quejas racistas sobre su convivencia con familias negras fueron exactamente los mismos que asumieron su custodia solo para propinarle golpizas diarias sin afecto alguno. Esta contradicción frontal vacunó a Christian de por vida contra el prejuicio racial y forjó un rechazo permanente a la hipocresía.",

    // The Bike Ride Escape
    escapeTitle: "La Fuga de 20 Millas en Bicicleta a Thomasville",
    escapeSubtitle: "Bicicleta Infantil de Una Velocidad y el Detonante de Libertad",
    escapeText: "En su último año en Coolidge, tras la partida de Dave y sus hijas, Connie desató un acoso psicológico incesante sin tregua. Llevado al límite, Christian montó una pequeña bicicleta infantil de una sola velocidad y pedaleó 20 millas por caminos rurales hasta Thomasville (4.5 horas agotadoras). Se refugió en una casa abandonada. Vecinos amables de enfrente lo vieron, le prepararon un sándwich y jugaron un videojuego de cacería en PS2 con su hijo. La policía lo devolvió; un oficial lo golpeó con el cinturón de Connie, y luego Connie volvió a golpearlo. Esta desesperada fuga fue la prueba irrefutable que permitió a los consejeros escolares intervenir y transferir su custodia a su tía Charlene.",

    keyTerms: [
      "Fuga de 20 Millas en Bicicleta",
      "Confinamiento en Prime Time",
      "Entrenamientos Militares Nocturnos",
      "Mecanismo de Disociación con el Fuego",
      "Supresión Facial Total del Dolor",
      "Castigos de 30 Horas en el Rincón",
      "Aislamiento Rural en Coolidge",
      "Primaria Stringfellow"
    ],
    liveStatus: "LISTO",
    switchEpisodeBtn: "Ver Episodio 01: El Arquitecto de 13 Años"
  }
};

interface DeepDiveSurvivalProps {
  onNavigate?: (page: PageView) => void;
}

const DeepDiveSurvival: React.FC<DeepDiveSurvivalProps> = ({ onNavigate }) => {
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

        // Dynamic vibrant color gradient (amber -> crimson -> violet -> cyan)
        const gradient = ctx.createLinearGradient(0, y, 0, y + currentH);
        const hue = (i * 7 + phase * 40 + 20) % 360;
        
        if (isPlaying) {
          gradient.addColorStop(0, `hsla(${hue}, 95%, 65%, 0.95)`);
          gradient.addColorStop(0.5, `hsla(${(hue + 45) % 360}, 90%, 55%, 0.85)`);
          gradient.addColorStop(1, `hsla(${(hue + 90) % 360}, 95%, 50%, 0.95)`);
        } else {
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.25)');
          gradient.addColorStop(1, 'rgba(239, 68, 68, 0.08)');
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
    <div id="deep-dive-survival-section" className="max-w-5xl mx-auto px-4 py-8 relative">
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
        className="bg-black/60 border border-amber-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.08)]"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Stepper Navigation */}
        <div className="px-6 pt-6 md:px-8 md:pt-8">
          <DeepDiveNav currentEpisode={2} onNavigate={onNavigate} lang={lang} position="top" />
        </div>

        {/* Top Bar with Language Selector & Episode Switcher */}
        <div className="p-6 md:p-8 pt-2 md:pt-2 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono text-xs font-semibold tracking-widest uppercase">
                <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                {t.badge}
              </span>
              <span className="text-xs font-mono text-gray-500 uppercase">SYS://DEEP_DIVE_02</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight flex items-center gap-3">
              {t.title}
            </h1>
            <p className="text-sm md:text-base text-amber-400/90 font-mono mt-1">
              {t.subtitle}
            </p>
          </div>

          {/* Language Switch Toggle Button */}
          <div className="flex items-center gap-2 self-start md:self-center">
            <div className="flex items-center p-1 bg-black/80 border border-amber-500/40 rounded-xl shadow-inner">
              <button
                type="button"
                onClick={() => handleToggleLanguage('en')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
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
                    ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)]'
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
        <div className="p-6 md:p-8 bg-gradient-to-b from-amber-500/5 to-transparent border-b border-white/10">
          <div className="bg-black/80 border border-amber-500/40 rounded-xl p-5 md:p-6 relative overflow-hidden shadow-2xl">
            {/* Ambient top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-red-500 to-purple-500" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
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
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-ping' : 'bg-amber-500/50'}`} />
                <span className="text-xs font-mono text-gray-400">
                  {isPlaying ? (lang === 'es' ? 'TRANSMITIENDO AUDIO...' : 'STREAMING LIVE...') : t.liveStatus}
                </span>
              </div>
            </div>

            {/* COLORFUL WAVEFORM CANVAS VISUALIZER */}
            <div className="my-4 bg-black/90 rounded-lg p-3 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-red-500/10 to-purple-500/10 pointer-events-none opacity-50" />
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
                <span className="text-xs font-mono text-amber-400 min-w-[42px]">
                  {formatTime(currentTime)}
                </span>
                
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400 focus:outline-none"
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
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-50"
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
                  className="w-16 md:w-24 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
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
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-white font-medium">
            <p className="text-base md:text-lg leading-relaxed">
              {t.overviewIntro}
            </p>
          </div>

          {/* Grid: Placement 1 & Placement 2 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Home className="w-4 h-4" />
                <h3>{t.placement1Title}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.placement1Subtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.placement1Text}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all group">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
                <ShieldAlert className="w-4 h-4" />
                <h3>{t.placement2Title}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.placement2Subtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.placement2Text}
              </p>
            </div>
          </div>

          {/* Full-width: Four Years in Coolidge */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
              <AlertOctagon className="w-4 h-4" />
              <h3>{t.placement3Title}</h3>
            </div>
            <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.placement3Subtitle}</h4>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              {t.placement3Text}
            </p>
          </div>

          {/* Grid: Dissociation Fireplace & Moral Contrast */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-6 hover:border-amber-500/60 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
                <Flame className="w-4 h-4" />
                <h3>{t.fireplaceTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.fireplaceSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.fireplaceText}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-amber-500/50 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-3">
                <HeartHandshake className="w-4 h-4" />
                <h3>{t.contrastTitle}</h3>
              </div>
              <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.contrastSubtitle}</h4>
              <p className="text-sm leading-relaxed text-gray-300">
                {t.contrastText}
              </p>
            </div>
          </div>

          {/* Full-width: The 20-Mile Bike Ride Escape */}
          <div className="bg-gradient-to-r from-red-950/30 via-black to-amber-950/30 border border-red-500/40 rounded-xl p-6 hover:border-red-500/70 transition-all">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider mb-3">
              <Bike className="w-4 h-4" />
              <h3>{t.escapeTitle}</h3>
            </div>
            <h4 className="text-xs font-mono text-gray-400 mb-2 font-bold">{t.escapeSubtitle}</h4>
            <p className="text-sm leading-relaxed text-gray-300 mb-4">
              {t.escapeText}
            </p>

            {/* Interactive Concept Chips */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {t.keyTerms.map((term, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-400 font-mono"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Episode Navigation */}
          <DeepDiveNav currentEpisode={2} onNavigate={onNavigate} lang={lang} position="bottom" />
        </div>
      </motion.div>
    </div>
  );
};

export default DeepDiveSurvival;
