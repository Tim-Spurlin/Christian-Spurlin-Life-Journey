import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Cpu, 
    Music, 
    ShieldAlert, 
    Play, 
    Pause, 
    ArrowUpRight, 
    SkipBack, 
    SkipForward, 
    Sparkles, 
    GitBranch, 
    Radio, 
    ChevronLeft, 
    ChevronRight, 
    Headphones, 
    Volume2, 
    FileText, 
    ExternalLink, 
    Compass,
    Disc3,
    Languages,
    Sliders,
    Globe
} from 'lucide-react';
import { BIO_SUMMARY, TIMELINE, MUSIC_TRACKS, MOCK_COMMITS, PROFILE_PICTURE_URL } from '../constants';
import { useAudio } from './AudioContext';
import Visualizer from './Visualizer';
import { PageView } from '../types';

interface BentoProps {
  onOpenTerminal: () => void;
  onNavigate: (page: PageView) => void;
}

interface PodcastEpisode {
  id: number;
  page: PageView;
  episodeNumber: string;
  category: string;
  title: string;
  subtitle: string;
  themeColor: string;
  borderColor: string;
  accentBg: string;
  glowColor: string;
  summary: string;
  audioEn: string;
  audioEs: string;
  tags: string[];
}

const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    page: PageView.DEEP_DIVE,
    episodeNumber: 'EP 01',
    category: 'HARDWARE & SYSTEMS ARCHITECTURE',
    title: 'The 13-Year-Old Architect: Infinity Phones & The Hardware Empire',
    subtitle: 'From Chewing Gum Cashflow to Global Chinese Supply Chains',
    themeColor: 'text-hud-cyan',
    borderColor: 'border-hud-cyan/50',
    accentBg: 'bg-hud-cyan/10',
    glowColor: 'rgba(18,181,203,0.4)',
    summary: 'A deep investigative analysis into Christian’s 8th-grade enterprise: funding a $1,200 Vista machine, inventing a 2-vendor dropshipping pipeline on DHGate before the iPhone launched, and creating the Infinity phone brand.',
    audioEn: 'https://dl.dropboxusercontent.com/scl/fi/56dam8jjm2djfk0rfbvo5/1-english-How_Gum_Money_Built_a_Phone_Empire.m4a?rlkey=ud71b3l9at8k6qz65t816whpb&st=lv96xm7z&raw=1',
    audioEs: 'https://dl.dropboxusercontent.com/scl/fi/4akrpcq7j7ntr3iq9izyo/1-spanish-El_imperio_de_hardware_de_Christian_Spurlin.m4a?rlkey=phuzbuboiclasbrb4xxv7ckp8&st=3odtq6dx&raw=1',
    tags: ['Infinity Brand', 'DHGate Supply Chain', 'Windows Vista', 'Dropshipping']
  },
  {
    id: 2,
    page: PageView.DEEP_DIVE_2,
    episodeNumber: 'EP 02',
    category: 'SURVIVAL & AUTONOMY',
    title: 'Crucible of Autonomy: Childhood Survival, Endurance & Escape',
    subtitle: 'The 20-Mile Bicycle Ride & Court-Ordered Emancipation',
    themeColor: 'text-amber-400',
    borderColor: 'border-amber-400/50',
    accentBg: 'bg-amber-400/10',
    glowColor: 'rgba(251,191,36,0.4)',
    summary: 'A chronological investigation into foster placements, bootcamps, sensory survival adaptations, enduring physical trials, and the relentless quest for legal emancipation to protect his brother.',
    audioEn: 'https://dl.dropboxusercontent.com/scl/fi/m7k7tclvx98siyzuyrz6p/2-english-Christian_Spurlin_s_twenty_mile_bike_ride.m4a?rlkey=qokryhnzoswno6ws0y1ugxms8&st=jr4vrlby&raw=1',
    audioEs: 'https://dl.dropboxusercontent.com/scl/fi/9qto4z2p309atvvkfkk88/2-spanish-El_calvario_de_Christian_Spurlin_en_Georgia.m4a?rlkey=j65v39kip4yyj3yt5k5h9wdw5&st=zin9k50b&raw=1',
    tags: ['Foster System', '20-Mile Ride', 'Emancipation', 'Fortitude']
  },
  {
    id: 3,
    page: PageView.DEEP_DIVE_3,
    episodeNumber: 'EP 03',
    category: 'USAF DEFENSE INTEL',
    title: 'Signal & Sovereign: USAF Intelligence & The Military Vault',
    subtitle: 'Langley AFB, Critical Communications & Operational Resiliency',
    themeColor: 'text-emerald-400',
    borderColor: 'border-emerald-400/50',
    accentBg: 'bg-emerald-400/10',
    glowColor: 'rgba(52,211,153,0.4)',
    summary: 'High-stakes defense communications, OSI Layer 1-3 signal diagnostics under wartime availability standards, and translating military operational rigor directly into mission-critical software engineering.',
    audioEn: 'https://dl.dropboxusercontent.com/scl/fi/og3s762g4cwm40w7ifde2/p3-The_Air_Force_Analyst_Tortured_in_Secret.m4a?rlkey=ob4utziwlrsqldexfl8304igt&st=w9e7bz5j&raw=1',
    audioEs: 'https://dl.dropboxusercontent.com/scl/fi/nbjiqzra36c3bu81u8xsp/p3-spanish-El_prodigio_torturado_en_una_b-veda_militar.m4a?rlkey=o2q7ykllrvzmeblt26xtn0mys&st=ukfl72w1&raw=1',
    tags: ['Langley AFB', 'OSI Layers 1-3', 'RF Signals', 'Defense SRE']
  },
  {
    id: 4,
    page: PageView.DEEP_DIVE_4,
    episodeNumber: 'EP 04',
    category: 'ECONOMIC SOVEREIGNTY',
    title: '100% P&T Benefits: Statutory Mastery & Permanent Independence',
    subtitle: 'The VA Claims Engine, Economic Liberty & Family Security',
    themeColor: 'text-yellow-400',
    borderColor: 'border-yellow-400/50',
    accentBg: 'bg-yellow-400/10',
    glowColor: 'rgba(250,204,21,0.4)',
    summary: 'Deconstructing Title 38 CFR regulations, disability evidence matrices, and algorithmic filing strategies to secure permanent economic sovereignty for pure engineering autonomy and family care.',
    audioEn: 'https://dl.dropboxusercontent.com/scl/fi/lep1ircdlb8lhn1sp4d20/p4-The_100__VA_Disability_Family_Blueprint.m4a?rlkey=4i1yj0ydqon4nazwwbji353ck&st=l8ca3tuy&raw=1',
    audioEs: 'https://dl.dropboxusercontent.com/scl/fi/revcfm6tgbkj77u51bhmb/p4-Beneficios_del_cien_por_ciento_permanente_VA.m4a?rlkey=2pqgvay5l7b048igwyjrrf8ua&st=lho6v1t2&raw=1',
    tags: ['Title 38 CFR', 'VA 100% P&T', 'Economic Liberty', 'Financial Sovereign']
  },
  {
    id: 5,
    page: PageView.DEEP_DIVE_5,
    episodeNumber: 'EP 05',
    category: 'COGNITIVE ARCHITECTURE',
    title: 'The Architect\'s Mind: Cognitive Mastery, Psychology & Self-Defense',
    subtitle: 'De-escalation Protocols, Behavioral Signals & Emotional Armor',
    themeColor: 'text-purple-400',
    borderColor: 'border-purple-400/50',
    accentBg: 'bg-purple-400/10',
    glowColor: 'rgba(192,132,252,0.4)',
    summary: 'Mastering interpersonal dynamics through early adversity—decoding defense mechanisms, identifying cognitive distortions, and engineering unshakeable composure under high-pressure conflict.',
    audioEn: 'https://dl.dropboxusercontent.com/scl/fi/9541d2zq0feufrqvh510s/p5-Christian_Spurlin_and_the_negative_blueprint.m4a?rlkey=rnkfysnrdkdnhxz2aq136im88&st=gik641l1&raw=1',
    audioEs: 'https://dl.dropboxusercontent.com/scl/fi/bqa2ucphplx2eljtweq6x/p5-La_arquitectura_mental_de_Christian_Spurlin.m4a?rlkey=ks1i0x015wog5cggrw0fbccp9&st=hop83kaf&raw=1',
    tags: ['Cognitive Armor', 'De-escalation', 'Subconscious Signals', 'Composure']
  },
  {
    id: 6,
    page: PageView.DEEP_DIVE_6,
    episodeNumber: 'EP 06',
    category: 'FAMILY & SACRED SPACE',
    title: 'Family Values: Buying Back Time in the Bolivian Amazon',
    subtitle: 'Sacred Fatherhood, Tropical Sovereignty & Generational Legacy',
    themeColor: 'text-teal-400',
    borderColor: 'border-teal-400/50',
    accentBg: 'bg-teal-400/10',
    glowColor: 'rgba(45,212,191,0.4)',
    summary: 'The intentional decision to exit Western consumerist treadmills and cultivate an 8-hectare ecological sanctuary in South America, prioritizing unconditional presence with his wife and child.',
    audioEn: 'https://dl.dropboxusercontent.com/scl/fi/h7bdz1ufm8mkc2bm2qly5/p6-Buying_back_time_in_the_Bolivian_Amazon.m4a?rlkey=gzyid2dcrobcc5la8xciwxjaw&st=oa2rgxd9&raw=1',
    audioEs: 'https://dl.dropboxusercontent.com/scl/fi/snzhflzchafj75gtvgb0l/p6-Mudarse_a_Bolivia_para_ser_padre_presente.m4a?rlkey=h4fg2b93seo1y1d5p0o472rhk&st=drijesdu&raw=1',
    tags: ['Amazon Sanctuary', 'Fatherhood', 'Time Sovereignty', 'Generational Legacy']
  },
  {
    id: 7,
    page: PageView.DEEP_DIVE_7,
    episodeNumber: 'EP 07',
    category: 'EDUCATION & SPEEDRUN',
    title: 'The Student Who Speedran High School & Bypassed the System',
    subtitle: 'NovaNET Credit-Recovery Hack, Tippettville & Military ASVAB',
    themeColor: 'text-orange-400',
    borderColor: 'border-orange-400/50',
    accentBg: 'bg-orange-400/10',
    glowColor: 'rgba(251,146,60,0.4)',
    summary: 'Treating a restrictive public school curriculum as an algorithmic speedrun—completing years of coursework in mere weeks through NovaNET and scoring top-tier ASVAB marks for immediate military entry.',
    audioEn: 'https://dl.dropboxusercontent.com/scl/fi/j9nu17z7jy5j6r1c4nsyj/p7-The_Student_Who_Speedran_High_School.m4a?rlkey=btdhmloqczhbwapht4r1lf3ax&st=e43s4gmb&raw=1',
    audioEs: 'https://dl.dropboxusercontent.com/scl/fi/iq0bc5vpjbam43wks6be9/p7-C-mo_Christian_Spurlin_hacke-_la_preparatoria.m4a?rlkey=35h4kx0jp6w3nto6fmvdefw2c&st=kohkyqyf&raw=1',
    tags: ['NovaNET Hack', 'High School Speedrun', 'ASVAB Score', 'USAF Enlistment']
  }
];

const BentoCard: React.FC<{ 
    className?: string; 
    children: React.ReactNode; 
    title?: string;
    icon?: React.ReactNode;
    noPadding?: boolean;
    onClick?: () => void;
    actionLabel?: string;
}> = ({ className, children, title, icon, noPadding = false, onClick, actionLabel }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    onClick={onClick}
    className={`bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden hover:border-hud-cyan transition-all duration-300 group relative flex flex-col ${onClick ? 'cursor-pointer hover:bg-white/[0.07]' : ''} ${className}`}
  >
    {title && (
      <div className="flex items-center justify-between p-4 pb-2 border-b border-white/5 text-hud-cyan font-mono text-xs uppercase tracking-wider">
        <div className="flex items-center gap-2 font-bold">
            {icon}
            {title}
        </div>
        {actionLabel ? (
          <span className="text-[11px] font-mono text-hud-cyan/80 group-hover:text-hud-cyan flex items-center gap-1 transition-colors">
            {actionLabel}
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        ) : onClick ? (
          <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        ) : null}
      </div>
    )}
    <div className={`flex-grow relative ${noPadding ? '' : 'p-4 md:p-5'}`}>
      {children}
    </div>
    {/* Corner HUD Accents */}
    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-white/20 group-hover:border-hud-cyan transition-colors" />
    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-white/20 group-hover:border-hud-cyan transition-colors" />
  </motion.div>
);

const BentoGrid: React.FC<BentoProps> = ({ onOpenTerminal, onNavigate }) => {
  const { isPlaying, currentTrack, togglePlay, playTrack, currentTime, duration } = useAudio();
  const [activeTab, setActiveTab] = useState<'bio' | 'timeline'>('bio');
  const [isAvatarExpanded, setIsAvatarExpanded] = useState(false);
  const [activeEpisodeIndex, setActiveEpisodeIndex] = useState(0);
  const [podcastLang, setPodcastLang] = useState<'en' | 'es'>('en');

  const currentEpisode = PODCAST_EPISODES[activeEpisodeIndex];
  const activeEpisodeTrackId = `podcast-ep-${currentEpisode.id}-${podcastLang}`;
  const isCurrentEpisodePlaying = isPlaying && currentTrack.id === activeEpisodeTrackId;

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = MUSIC_TRACKS.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length;
    playTrack(MUSIC_TRACKS[nextIndex]);
  };

  const handlePrevTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = MUSIC_TRACKS.findIndex(t => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
    playTrack(MUSIC_TRACKS[prevIndex]);
  };

  const handlePrevEpisode = () => {
    setActiveEpisodeIndex((prev) => (prev - 1 + PODCAST_EPISODES.length) % PODCAST_EPISODES.length);
  };

  const handleNextEpisode = () => {
    setActiveEpisodeIndex((prev) => (prev + 1) % PODCAST_EPISODES.length);
  };

  const handlePlayPodcast = () => {
    if (isCurrentEpisodePlaying) {
      togglePlay();
    } else {
      playTrack({
        id: activeEpisodeTrackId,
        title: `${currentEpisode.episodeNumber}: ${currentEpisode.title} (${podcastLang.toUpperCase()})`,
        artist: 'Transmissions Podcast',
        duration: '15:00',
        url: podcastLang === 'en' ? currentEpisode.audioEn : currentEpisode.audioEs,
        coverArt: PROFILE_PICTURE_URL
      });
    }
  };

  return (
    <>
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
      
      {/* GRID SYSTEM: Direct Portals to Core Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 1. PERSONNEL DOSSIER & BIO (Click to open BioPage) */}
        <BentoCard 
          className="md:col-span-2 lg:col-span-2 min-h-[380px]" 
          title="Personnel File & Command Dossier" 
          icon={<ShieldAlert size={15}/>}
          actionLabel="OPEN DOSSIER"
          onClick={() => onNavigate(PageView.BIO)}
        >
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-4">
              <div 
                className="relative group/avatar cursor-pointer z-10 shrink-0" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAvatarExpanded(true);
                }}
                title="Click to expand portrait"
              >
                <img 
                  src={PROFILE_PICTURE_URL} 
                  alt="Christian Kota" 
                  className="w-24 h-32 rounded-xl border-2 border-hud-cyan shadow-[0_0_20px_rgba(18,181,203,0.3)] group-hover/avatar:shadow-[0_0_35px_rgba(18,181,203,0.6)] transition-all duration-300 object-cover group-hover/avatar:scale-105"
                />
                <div className="absolute inset-0 rounded-xl bg-hud-cyan/15 opacity-0 group-hover/avatar:opacity-100 transition-opacity pointer-events-none ring-1 ring-hud-cyan/50" />
              </div>

              <div className="flex-1 py-0.5 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-sans font-bold text-white tracking-tight">Christian Kota Spurlin</h1>
                  <span className="font-mono text-[11px] text-hud-cyan border border-hud-cyan/30 px-2 py-0.5 rounded bg-hud-cyan/10 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-hud-cyan animate-pulse"></span>
                    BUILDING GLOBAL INFRASTRUCTURE
                  </span>
                </div>
                
                <p className="text-gray-300 text-sm font-mono font-medium">
                  Principal Software Architect • Security Engineer • USAF Veteran
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">CYBERSECURITY</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">USAF INTEL</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">DISTRIBUTED SYSTEMS</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">TRADESMAN & ARTIST</span>
                </div>
              </div>
            </div>

            {/* Quick Switcher for Bio / Timeline */}
            <div className="border-t border-white/10 pt-3">
              <div className="flex gap-4 mb-2 font-mono text-xs">
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveTab('bio'); }}
                  className={`pb-1 transition-colors ${activeTab === 'bio' ? 'text-hud-cyan border-b-2 border-hud-cyan font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  EXECUTIVE SUMMARY
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveTab('timeline'); }}
                  className={`pb-1 transition-colors ${activeTab === 'timeline' ? 'text-hud-cyan border-b-2 border-hud-cyan font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                >
                  SERVICE MILESTONES
                </button>
              </div>

              <div className="text-xs text-gray-300">
                {activeTab === 'bio' ? (
                  <p className="leading-relaxed font-sans line-clamp-3 text-gray-300/90">
                    {BIO_SUMMARY}
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {TIMELINE.slice(0, 3).map((event, i) => (
                      <div key={i} className="bg-white/5 p-2 rounded border border-white/5">
                        <span className="text-[10px] font-mono text-hud-cyan font-bold block">{event.year}</span>
                        <span className="text-xs font-semibold text-white truncate block">{event.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-hud-cyan group-hover:underline">
                <FileText size={13} /> View Complete Service Record & Dossier &rarr;
              </span>
            </div>
          </div>
        </BentoCard>

        {/* 2. FORENSIC GENEALOGY MATRIX (Click to open GenealogyPage) */}
        <BentoCard 
          className="min-h-[380px]" 
          title="Forensic Genealogy & Ancestry" 
          icon={<GitBranch size={15}/>}
          actionLabel="VIEW MATRIX"
          onClick={() => onNavigate(PageView.GENEALOGY)}
        >
          <div className="flex flex-col h-full justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-hud-cyan/10 border border-hud-cyan/30 text-hud-cyan text-[11px] font-mono font-bold">
                <Compass size={13} /> MULTI-GENERATIONAL ARCHIVE
              </div>
              <h3 className="text-xl font-bold text-white font-sans">Heritage & Ancestral Lineage</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Interconnected forensic graph tracking deep European, Cherokee, and Appalachian lineages backed by verifiable historical records, military registries, and land patents.
              </p>
            </div>

            {/* Visual Lineage Nodes Preview */}
            <div className="bg-black/40 border border-white/10 rounded-xl p-3.5 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-[11px] text-gray-400 pb-1 border-b border-white/10">
                <span>VERIFIED LINEAGE NODES</span>
                <span className="text-hud-cyan">100% PROVEN</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white font-medium">Timothy Christian Spurlin</span>
                  <span className="text-hud-cyan font-bold">Gen 0</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pl-3 border-l border-hud-cyan/30">
                  <span>Timothy Leo Spurlin</span>
                  <span className="text-gray-400">Gen -1</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 pl-6 border-l border-hud-cyan/30">
                  <span>Aldwin 'Leo' McCoy</span>
                  <span className="text-gray-400">Gen -2</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono">
              <span className="text-gray-500">DATABASE: ARCHIVED</span>
              <span className="text-hud-cyan group-hover:underline flex items-center gap-1">
                Open Full Tree &rarr;
              </span>
            </div>
          </div>
        </BentoCard>

        {/* 3. PROJECTS & INNOVATIONS HUB (Click to open EngineeringPage) */}
        <BentoCard 
          className="md:col-span-2 lg:col-span-2 min-h-[360px]" 
          title="Projects & Innovations Repository" 
          icon={<Cpu size={15}/>}
          actionLabel="EXPLORE SYSTEMS"
          onClick={() => onNavigate(PageView.ENGINEERING)}
        >
          <div className="flex flex-col h-full justify-between space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-2xl font-bold text-white font-sans flex items-center gap-2">
                  Engineering Systems & Patents
                  <Sparkles size={16} className="text-hud-cyan" />
                </h3>
                <p className="text-xs text-hud-cyan font-mono mt-0.5">
                  AUGMENTED REALITY • DEFENSE INTEL • REGULATED AUTOMATION
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono font-bold text-white block">4,281</span>
                <span className="text-[10px] text-green-400 font-mono">CONTRIBUTIONS • 8 ACTIVE SYSTEMS</span>
              </div>
            </div>

            {/* 3 Featured Innovation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 group-hover:border-hud-cyan/40 transition-colors">
                <div className="text-[10px] font-mono text-hud-cyan font-bold">AR HARDWARE PATENT</div>
                <h4 className="text-sm font-bold text-white">TelePrompt Glass</h4>
                <p className="text-[11px] text-gray-400 leading-snug">
                  First AI AR smart glasses in the US. Microsoft Partner ($150k grant), C++ firmware & HUD.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 group-hover:border-hud-cyan/40 transition-colors">
                <div className="text-[10px] font-mono text-emerald-400 font-bold">NATIONAL DEFENSE</div>
                <h4 className="text-sm font-bold text-white">Target Intel Pipeline</h4>
                <p className="text-[11px] text-gray-400 leading-snug">
                  Processed 60,000+ high-priority targets with automated MITRE ATT&CK correlation.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1.5 group-hover:border-hud-cyan/40 transition-colors">
                <div className="text-[10px] font-mono text-amber-400 font-bold">REGULATED AUTOMATION</div>
                <h4 className="text-sm font-bold text-white">Saphyre Solutions</h4>
                <p className="text-[11px] text-gray-400 leading-snug">
                  HIPAA Security Rule & NIST CSF compliant automated Insurtech execution platform.
                </p>
              </div>
            </div>

            {/* Mini Activity Sparkline & Commits */}
            <div className="flex gap-0.5 h-10 items-end bg-black/30 p-1.5 rounded-lg border border-white/5">
              {Array.from({ length: 48 }).map((_, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-hud-cyan/25 group-hover:bg-hud-cyan/50 rounded-sm transition-all duration-300"
                  style={{ height: `${Math.max(15, (Math.sin(i * 0.35) * 40 + 55))}%` }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span className="truncate">LATEST: {MOCK_COMMITS[0].message}</span>
              <span className="text-hud-cyan shrink-0 ml-2 group-hover:underline">
                View All Projects & Architecture &rarr;
              </span>
            </div>
          </div>
        </BentoCard>

        {/* 4. MUSIC PRODUCTION & AUDIO STUDIO ("I make music too") */}
        <BentoCard 
          className="min-h-[360px]" 
          title="Music Production & Studio" 
          icon={<Music size={15}/>}
          actionLabel="EXPLORE STUDIO"
          onClick={() => onNavigate(PageView.MUSIC)}
        >
          <div className="flex flex-col h-full justify-between space-y-3">
            <div className="flex items-start gap-4">
              <div 
                className="w-20 h-20 bg-black rounded-xl border border-white/10 relative overflow-hidden shrink-0 group/cover shadow-lg cursor-pointer"
                onClick={(e) => { e.stopPropagation(); onNavigate(PageView.MUSIC); }}
                title="Open Song Profile"
              >
                <img 
                  src={currentTrack.coverArt} 
                  alt="Cover Art" 
                  className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform" 
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 text-hud-cyan hover:text-white transition-colors z-10"
                  title={isPlaying ? "Pause Track" : "Play Track"}
                >
                  {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current ml-0.5" />}
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[10px] font-mono text-hud-cyan mb-0.5">
                  <Disc3 size={12} className={isPlaying ? "animate-spin" : ""} />
                  <span>{currentTrack.genre ? currentTrack.genre.toUpperCase() : 'ORIGINAL PRODUCTION'}</span>
                </div>
                <h4 
                  onClick={(e) => { e.stopPropagation(); onNavigate(PageView.MUSIC); }}
                  className="text-base font-bold text-white truncate hover:text-hud-cyan cursor-pointer transition-colors"
                >
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-gray-400 font-mono">{currentTrack.artist}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-gray-500">
                  <span>BPM: {currentTrack.bpm || 128}</span>
                  <span>•</span>
                  <span>KEY: {currentTrack.key || 'C Min'}</span>
                  <span>•</span>
                  <span className="text-hud-cyan font-semibold">5 TRACKS</span>
                </div>
              </div>
            </div>

            {/* Quick Track Switcher Pills */}
            <div className="flex gap-1 overflow-x-auto pb-1" onClick={(e) => e.stopPropagation()}>
              {MUSIC_TRACKS.map((t) => {
                const isActive = t.id === currentTrack.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => playTrack(t)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono shrink-0 transition-all border ${
                      isActive 
                        ? 'bg-hud-cyan/20 border-hud-cyan text-hud-cyan font-bold shadow-[0_0_10px_rgba(18,181,203,0.3)]' 
                        : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                    title={`Play ${t.title}`}
                  >
                    {t.title}
                  </button>
                );
              })}
            </div>

            {/* Waveform Visualizer */}
            <div className="w-full h-10 bg-black/60 rounded-xl overflow-hidden border border-white/10 relative p-1">
              <Visualizer />
            </div>

            {/* Playback Controls & Track Duration */}
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span className="text-hud-cyan">{isPlaying ? 'PLAYING AUDIO' : 'PAUSED'}</span>
                <span>{formatTime(duration || 0)}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevTrack} 
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Previous Track"
                  >
                    <SkipBack size={16} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    className="p-2 bg-hud-cyan text-black rounded-lg hover:bg-white transition-colors font-bold"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                  </button>
                  <button 
                    onClick={handleNextTrack} 
                    className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Next Track"
                  >
                    <SkipForward size={16} />
                  </button>
                </div>

                <button 
                  onClick={(e) => { e.stopPropagation(); onNavigate(PageView.MUSIC); }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono text-hud-cyan hover:underline transition-colors"
                  title="View complete profiles and stories for each song"
                >
                  <span>Explore Profiles & Story &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </BentoCard>

      </div>

      {/* 5. PODCAST AUDIO OVERVIEWS DECK (Spacious, Clear, Open with Prominent Play Button) */}
      <section className="bg-gradient-to-b from-[#0e1620] via-black to-[#0a1018] border border-hud-cyan/30 rounded-3xl p-6 md:p-10 space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        
        {/* Top Header & Navigation Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-hud-cyan/15 border border-hud-cyan/40 text-hud-cyan shadow-[0_0_15px_rgba(18,181,203,0.3)]">
                <Radio size={20} className={isPlaying ? "animate-pulse" : ""} />
              </span>
              <span className="font-mono text-xs font-bold text-hud-cyan tracking-widest uppercase">
                INVESTIGATIVE PODCAST AUDIO OVERVIEWS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-sans tracking-tight">
              Transmissions: The Christian Kota Deep Dive Series
            </h2>
            <p className="text-sm text-gray-400 font-sans max-w-2xl">
              7-part investigative audio series covering systems architecture, childhood endurance, USAF defense communications, economic sovereignty, and Amazonian retreat.
            </p>
          </div>

          {/* Episode Counter & Large Navigation Arrows */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-2xl shrink-0 self-start lg:self-auto">
            <div className="text-sm font-mono text-gray-300 pr-2">
              <span className="text-hud-cyan font-bold text-base">{currentEpisode.episodeNumber}</span>
              <span className="text-gray-500"> / EP 07</span>
            </div>
            <button 
              onClick={handlePrevEpisode}
              className="p-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-hud-cyan hover:text-black hover:border-hud-cyan transition-all shadow-md active:scale-95"
              title="Previous Episode"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              onClick={handleNextEpisode}
              className="p-3 rounded-xl bg-white/10 border border-white/10 text-white hover:bg-hud-cyan hover:text-black hover:border-hud-cyan transition-all shadow-md active:scale-95"
              title="Next Episode"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Spacious Episode Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {PODCAST_EPISODES.map((ep, idx) => {
            const isSelected = activeEpisodeIndex === idx;
            return (
              <button
                key={ep.id}
                onClick={() => setActiveEpisodeIndex(idx)}
                className={`p-3 rounded-xl font-mono text-left transition-all relative overflow-hidden flex flex-col justify-between h-20 border ${
                  isSelected 
                    ? `bg-white/10 ${ep.borderColor} text-white shadow-[0_0_20px_${ep.glowColor}] ring-1 ring-white/20` 
                    : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.07] border-white/5'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-xs font-bold ${isSelected ? ep.themeColor : 'text-gray-400'}`}>
                    {ep.episodeNumber}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-hud-cyan animate-ping" />
                  )}
                </div>
                <span className="text-[11px] font-sans font-medium line-clamp-2 leading-tight">
                  {ep.category}
                </span>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-hud-cyan" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Episode Feature Card (Open, Spacious, Clear) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentEpisode.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/[0.03] border-2 ${currentEpisode.borderColor} rounded-3xl p-6 md:p-10 space-y-8 relative overflow-hidden`}
          >
            {/* Header / Category & Language Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold ${currentEpisode.accentBg} ${currentEpisode.themeColor} border ${currentEpisode.borderColor}`}>
                  {currentEpisode.episodeNumber} • {currentEpisode.category}
                </span>
                <span className="text-xs font-mono text-gray-400 bg-black/40 px-3 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <Globe size={13} className="text-hud-cyan" />
                  DUAL AUDIO EN + ES
                </span>
              </div>

              {/* Language Switcher Pill */}
              <div className="flex items-center gap-1 bg-black/60 p-1 rounded-xl border border-white/15 w-fit">
                <span className="text-[11px] font-mono text-gray-400 px-2 flex items-center gap-1">
                  <Languages size={13} /> AUDIO:
                </span>
                <button
                  onClick={() => setPodcastLang('en')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs transition-all font-bold ${
                    podcastLang === 'en' 
                      ? 'bg-hud-cyan text-black shadow-md' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => setPodcastLang('es')}
                  className={`px-3 py-1 rounded-lg font-mono text-xs transition-all font-bold ${
                    podcastLang === 'es' 
                      ? 'bg-hud-cyan text-black shadow-md' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  ESPAÑOL
                </button>
              </div>
            </div>

            {/* Main Content & Big Prominent Play Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Text Synopsis (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-2xl md:text-4xl font-bold text-white font-sans tracking-tight leading-snug">
                  {currentEpisode.title}
                </h3>
                <p className={`text-sm md:text-base font-mono font-medium ${currentEpisode.themeColor}`}>
                  {currentEpisode.subtitle}
                </p>
                <p className="text-base text-gray-300 leading-relaxed font-sans">
                  {currentEpisode.summary}
                </p>

                {/* Theme Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-mono text-gray-500">COVERAGE TOPICS:</span>
                  {currentEpisode.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Deck with Prominent Play Button (4 cols) */}
              <div className="lg:col-span-4 flex flex-col gap-4 bg-black/50 border border-white/10 p-6 rounded-2xl shadow-xl">
                
                {/* Big Primary Play/Pause Button */}
                <button
                  onClick={handlePlayPodcast}
                  className={`w-full py-4 px-6 rounded-2xl font-mono font-bold text-sm md:text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
                    isCurrentEpisodePlaying
                      ? 'bg-hud-cyan text-black ring-4 ring-hud-cyan/30 shadow-[0_0_35px_rgba(18,181,203,0.7)] animate-pulse'
                      : 'bg-white text-black hover:bg-hud-cyan shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(18,181,203,0.5)]'
                  }`}
                >
                  {isCurrentEpisodePlaying ? (
                    <>
                      <Pause size={24} className="fill-current" />
                      <span>PAUSE AUDIO STREAM</span>
                    </>
                  ) : (
                    <>
                      <Play size={24} className="fill-current ml-0.5" />
                      <span>PLAY AUDIO ({podcastLang.toUpperCase()})</span>
                    </>
                  )}
                </button>

                {/* Status Indicator */}
                <div className="flex items-center justify-between text-xs font-mono px-1 text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Volume2 size={14} className={isCurrentEpisodePlaying ? "text-hud-cyan" : ""} />
                    {isCurrentEpisodePlaying ? 'STREAMING NOW' : 'AUDIO READY'}
                  </span>
                  <span className="text-hud-cyan font-bold">~15 MIN DEEP DIVE</span>
                </div>

                {/* Link to Full Webpage with Automation */}
                <button
                  onClick={() => onNavigate(currentEpisode.page)}
                  className="w-full py-3.5 px-5 rounded-xl font-mono font-bold text-xs bg-hud-cyan/15 hover:bg-hud-cyan hover:text-black text-hud-cyan border border-hud-cyan/40 transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_15px_rgba(18,181,203,0.2)]"
                >
                  <Headphones size={16} />
                  <span>OPEN FULL EPISODE PAGE</span>
                  <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </section>

    </div>
    
    {/* Expanded Portrait Avatar Lightbox Modal */}
    <AnimatePresence>
        {isAvatarExpanded && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
                onClick={() => setIsAvatarExpanded(false)}
            >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative flex flex-col items-center"
                >
                  <img 
                      src={PROFILE_PICTURE_URL} 
                      alt="Christian Kota Full" 
                      className="max-h-[80vh] w-auto rounded-2xl border-4 border-hud-cyan shadow-[0_0_50px_rgba(18,181,203,0.5)] object-cover aspect-[2/3]"
                  />
                  <span className="font-mono text-xs text-hud-cyan mt-3">Click anywhere to close</span>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    </>
  );
};

export default BentoGrid;
