import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Glasses, 
  ShieldCheck, 
  Database, 
  Zap, 
  Lock, 
  Network, 
  FileText, 
  Server, 
  Package, 
  Brain, 
  CheckCircle2, 
  ExternalLink, 
  ArrowUpRight, 
  Layers, 
  Radio, 
  Terminal, 
  Activity, 
  Sparkles, 
  Award,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { LINKTREE_URL } from '../constants';

type ProjectCategory = 'ALL' | 'AR_HARDWARE' | 'NATIONAL_SECURITY' | 'INSURTECH' | 'KNOWLEDGE_DATABASE';

const EngineeringPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [isGlassModalOpen, setIsGlassModalOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto p-4 md:p-8 space-y-12"
    >
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-hud-cyan/10 text-hud-cyan border border-hud-cyan/30 font-mono text-xs font-bold mb-3">
            <Cpu size={14} />
            SYSTEMS & INNOVATIONS REPOSITORY
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-sans tracking-tight">
            Projects & Innovations
          </h1>
          <p className="text-hud-cyan font-mono text-xs md:text-sm">
            AUGMENTED REALITY • NATIONAL SECURITY INTELLIGENCE • REGULATED AUTOMATION & ENGINES
          </p>
        </div>
        <div className="text-right hidden md:block font-mono text-xs text-gray-500 space-y-1">
          <p>STATUS: <span className="text-hud-cyan">OPERATIONAL</span></p>
          <p>ARCHITECT: <span className="text-white">CHRISTIAN KOTA SPURLIN</span></p>
          <p>DISCIPLINES: <span className="text-gray-400">EMBEDDED / DISTRIBUTED / DEVSECOPS</span></p>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4 font-mono text-xs">
        <button
          onClick={() => setSelectedCategory('ALL')}
          className={`px-3 py-1.5 rounded transition-all ${
            selectedCategory === 'ALL'
              ? 'bg-hud-cyan text-black font-bold shadow-[0_0_15px_rgba(18,181,203,0.4)]'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
          }`}
        >
          ALL INNOVATIONS
        </button>
        <button
          onClick={() => setSelectedCategory('AR_HARDWARE')}
          className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
            selectedCategory === 'AR_HARDWARE'
              ? 'bg-hud-cyan text-black font-bold shadow-[0_0_15px_rgba(18,181,203,0.4)]'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
          }`}
        >
          <Glasses size={14} /> AR & HARDWARE
        </button>
        <button
          onClick={() => setSelectedCategory('NATIONAL_SECURITY')}
          className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
            selectedCategory === 'NATIONAL_SECURITY'
              ? 'bg-hud-cyan text-black font-bold shadow-[0_0_15px_rgba(18,181,203,0.4)]'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
          }`}
        >
          <Lock size={14} /> NATIONAL SECURITY INTELLIGENCE
        </button>
        <button
          onClick={() => setSelectedCategory('INSURTECH')}
          className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
            selectedCategory === 'INSURTECH'
              ? 'bg-hud-cyan text-black font-bold shadow-[0_0_15px_rgba(18,181,203,0.4)]'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
          }`}
        >
          <ShieldCheck size={14} /> REGULATED AUTOMATION
        </button>
        <button
          onClick={() => setSelectedCategory('KNOWLEDGE_DATABASE')}
          className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 ${
            selectedCategory === 'KNOWLEDGE_DATABASE'
              ? 'bg-hud-cyan text-black font-bold shadow-[0_0_15px_rgba(18,181,203,0.4)]'
              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
          }`}
        >
          <Database size={14} /> KNOWLEDGE DATABASE
        </button>
      </div>

      {/* 1. FLAGSHIP PROJECT: TELEPROMPT GLASS (Featured AR Innovation) */}
      {(selectedCategory === 'ALL' || selectedCategory === 'AR_HARDWARE') && (
        <section className="relative bg-gradient-to-br from-black/80 via-white/[0.04] to-black/90 border border-hud-cyan/40 rounded-2xl p-6 md:p-10 overflow-hidden shadow-[0_0_50px_rgba(18,181,203,0.12)]">
          {/* Subtle Cyber Glow Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-hud-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Header / Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-hud-cyan text-black font-mono font-bold text-xs rounded-full shadow-[0_0_12px_rgba(18,181,203,0.4)]">
                  FLAGSHIP INNOVATION
                </span>
                <span className="px-3 py-1 bg-blue-600/30 text-blue-300 border border-blue-500/40 font-mono text-xs rounded-full flex items-center gap-1">
                  <Award size={12} /> MICROSOFT PARTNER ($150K GRANT)
                </span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 font-mono text-xs rounded-full">
                  EST. 2019 • 2 WEEKS POST-CHATGPT-2
                </span>
              </div>
              <div className="font-mono text-xs text-hud-cyan flex items-center gap-1">
                <Radio size={14} className="animate-pulse" />
                AMERICA'S FIRST AI AR SMART GLASSES
              </div>
            </div>

            {/* Main Project Hero Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Image & Lightbox Showcase */}
              <div className="lg:col-span-6 space-y-3">
                <div 
                  className="relative group cursor-pointer rounded-xl overflow-hidden border border-white/20 bg-black aspect-video flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                  onClick={() => setIsGlassModalOpen(true)}
                >
                  <img 
                    src="https://dl.dropboxusercontent.com/scl/fi/lslxs3m59elp0kp8d04hs/ChatGPT-Image-Feb-17-2026-04_22_37-PM.png?rlkey=1905kdwsu7v9dqy2mmnmdp2h4&st=gri8wsob&raw=1" 
                    alt="TelePrompt Glass AI Smart Glasses"
                    className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-white flex items-center gap-1.5 group-hover:bg-hud-cyan group-hover:text-black transition-all">
                    <Maximize2 size={12} /> CLICK TO ZOOM HARDWARE
                  </div>
                  <div className="absolute top-3 left-3 bg-hud-cyan/20 border border-hud-cyan/50 text-hud-cyan px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    PROTOTYPE HUD ACTIVE
                  </div>
                </div>
                <p className="text-[11px] font-mono text-gray-400 text-center">
                  TelePrompt Glass optical heads-up projection & embedded sensory unit.
                </p>
              </div>

              {/* Story & Specifications */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-sans tracking-tight mb-2">
                    TelePrompt Glass
                  </h2>
                  <p className="text-hud-cyan font-mono text-sm font-semibold">
                    AI-POWERED AUGMENTED REALITY TRANSCRIPTION & HUD ENGINE
                  </p>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  Invented by Christian Kota Spurlin just two weeks after the public release of ChatGPT-2, 
                  <strong> TelePrompt Glass</strong> stood as the first artificial intelligence-driven augmented reality 
                  smart glasses engineered in America. Built to eliminate cognitive friction and grant real-time conversational 
                  superpowers, the system streams live transcription, context-aware teleprompting, and geo-situational intelligence 
                  directly into the user's peripheral field of view.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-black/60 border border-white/10 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-hud-cyan uppercase">Core Architecture</div>
                    <div className="text-sm font-bold text-white font-mono">C++ Embedded Engine</div>
                    <div className="text-[10px] text-gray-400">Micro-controller firmware & low-latency execution</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-hud-cyan uppercase">Context Intelligence</div>
                    <div className="text-sm font-bold text-white font-mono">Google Maps API</div>
                    <div className="text-[10px] text-gray-400">Geo-temporal transcription & location triggers</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-hud-cyan uppercase">Backing & Acceleration</div>
                    <div className="text-sm font-bold text-white font-mono">Microsoft Founders Hub</div>
                    <div className="text-[10px] text-gray-400">$150,000 cloud infrastructure & GPU grants</div>
                  </div>
                  <div className="bg-black/60 border border-white/10 p-3 rounded-lg">
                    <div className="text-[10px] font-mono text-hud-cyan uppercase">Optical Mechanism</div>
                    <div className="text-sm font-bold text-white font-mono">Waveguide HUD</div>
                    <div className="text-[10px] text-gray-400">Zero-obstruction transparent collimator</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep Technical Capabilities Breakdown */}
            <div className="border-t border-white/10 pt-6 space-y-4">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Terminal size={16} className="text-hud-cyan" />
                SYSTEM CAPABILITIES & ARCHITECTURAL BREAKDOWN
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                    <Radio size={14} className="text-hud-cyan" /> Real-Time Ambient Ingestion
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Dual directional noise-canceling MEMS microphones capture conversational audio, passing packets over high-speed Bluetooth LE to a localized inference layer for sub-200ms speech-to-text tokenization.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                    <Brain size={14} className="text-purple-400" /> Contextual Neural Teleprompt
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Integrated LLM logic evaluates live speaker intent and synthesizes talking points, technical counter-arguments, and key factual citations, projecting discrete bullet-points on the user's optical lens.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
                  <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                    <Zap size={14} className="text-yellow-400" /> Spatial Grounding
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Fuses Google Maps geospatial coordinates with local environment metadata, providing turn-by-turn situational awareness overlays and location-triggered memory anchors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. NATIONAL SECURITY INTELLIGENCE PIPELINES */}
      {(selectedCategory === 'ALL' || selectedCategory === 'NATIONAL_SECURITY') && (
        <section className="relative bg-white/5 border border-hud-cyan/30 rounded-2xl p-6 md:p-10 overflow-hidden shadow-[0_0_30px_rgba(18,181,203,0.05)]">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-hud-cyan/20 text-hud-cyan border border-hud-cyan/50 font-mono text-xs font-bold">
                <Lock size={14} />
                ACTIVE DEFENSE & INTELLIGENCE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight font-sans">
                National Security Intelligence Tools
              </h2>
              <div className="font-mono text-xs text-gray-400 space-y-2 border-l-2 border-white/10 pl-4">
                <p><span className="text-white font-bold">ROLE:</span> Software Engineer & Intelligence Analyst</p>
                <p><span className="text-white font-bold">SCOPE:</span> Ingestion-to-Analysis Autonomous Pipelines</p>
                <p><span className="text-white font-bold">STACK:</span> Python, Node.js, Distributed Ingestion, MITRE ATT&CK</p>
              </div>
              
              {/* KEY METRIC */}
              <div className="bg-black/60 border border-hud-cyan/30 p-5 rounded-xl">
                <div className="text-4xl md:text-5xl font-bold text-hud-cyan font-mono">60,000+</div>
                <div className="text-xs text-gray-300 font-mono uppercase tracking-wider mt-1">High-Priority Intelligence Targets Processed</div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="text-white font-bold text-lg flex items-center gap-2 font-mono">
                  <Server size={18} className="text-hud-cyan"/> Technical Architecture: Ingestion Pipeline
                </h3>
                
                {/* Pipeline Flow Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-black/50 p-4 rounded-xl border border-white/10 text-center">
                    <div className="text-hud-cyan font-mono text-xs font-bold mb-1">01. COLLECTION</div>
                    <div className="text-[11px] text-gray-400">Distributed Web Crawlers & Multi-Source Ingestion</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/10 text-center">
                    <div className="text-hud-cyan font-mono text-xs font-bold mb-1">02. PROCESSING</div>
                    <div className="text-[11px] text-gray-400">Normalization, Sanitization & Adversarial Scoring</div>
                  </div>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/10 text-center">
                    <div className="text-hud-cyan font-mono text-xs font-bold mb-1">03. ANALYSIS</div>
                    <div className="text-[11px] text-gray-400">Pattern Fusion, Graph Correlation & Threat Scoring</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-300 leading-relaxed font-sans">
                <p>
                  Architected and engineered distributed pipelines capable of processing thousands of suspect signatures and adversarial patterns. 
                  Aligned system heuristics with the <strong>MITRE ATT&CK framework</strong> to classify multi-stage reconnaissance and infiltration signals.
                </p>
                <p>
                  Built with strict isolation barriers, automated failover queues, and horizontally scalable cluster workers to guarantee high availability during live mission-interest operations.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. SAPHYRE SOLUTIONS (Regulated Enterprise & Insurtech) */}
      {(selectedCategory === 'ALL' || selectedCategory === 'INSURTECH') && (
        <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-hud-cyan border border-white/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className="text-xs font-mono text-gray-500 mb-1">PRINCIPAL ARCHITECT & FOUNDER</div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Saphyre Solutions LLC</h2>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">
                Enterprise automation & Insurtech platform operating under strict regulatory compliance constraints.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 bg-blue-900/30 text-blue-300 text-xs font-mono rounded border border-blue-500/30">HIPAA SECURITY RULE</span>
                <span className="px-2.5 py-1 bg-blue-900/30 text-blue-300 text-xs font-mono rounded border border-blue-500/30">NIST CSF</span>
                <span className="px-2.5 py-1 bg-blue-900/30 text-blue-300 text-xs font-mono rounded border border-blue-500/30">PII/PHI ENCLAVES</span>
              </div>
            </div>

            <div className="lg:col-span-8 bg-black/40 border border-white/10 rounded-xl p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-bold mb-2 flex items-center gap-2 font-mono text-sm">
                    <Lock size={16} className="text-alert-red"/> Regulated Automation Engine
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Engineered multi-step workflow automation pipelines handling protected health information (PHI). Enforced end-to-end cryptographic safeguards, zero-trust role-based access controls (RBAC), and immutable audit logs.
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2 flex items-center gap-2 font-mono text-sm">
                    <Network size={16} className="text-hud-cyan"/> Carrier Integration Hub
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    Constructed a unified API aggregation layer evaluating insurance plan matrices across dozens of external carrier endpoints with sub-second response times and automated webhook retry queues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. OFFLINERAG (Hybrid Knowledge Database) */}
      {(selectedCategory === 'ALL' || selectedCategory === 'KNOWLEDGE_DATABASE') && (
        <section className="relative bg-gradient-to-br from-[#0a0512] via-[#110820] to-[#050010] border border-purple-500/30 rounded-2xl p-6 md:p-10 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold rounded-full">
                  <Database size={12} className="inline mr-1" />
                  KNOWLEDGE DATABASE
                </span>
                <span className="px-3 py-1 bg-white/10 text-gray-300 font-mono text-xs rounded-full">
                  64,310+ CHUNKS • 768-D EMBEDDINGS
                </span>
              </div>
              <div className="font-mono text-xs text-purple-400">
                FULLY LOCAL HYBRID RETRIEVAL ENGINE
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-5">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-sans tracking-tight mb-2">
                    OfflineRAG
                  </h2>
                  <p className="text-purple-400 font-mono text-sm font-semibold">
                    THE LIVING ENGINE OF A PRIVATE DIGITAL TWIN
                  </p>
                </div>
                
                <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-sans">
                  <p>
                    <strong>OfflineRAG</strong> is a fully local hybrid knowledge database designed to reclaim the value of a life's data. 
                    It is an architecture of radical self-love and sovereign memory—ingesting a decade of texts, emails, locations, medical records, and real-time voice streams.
                  </p>
                  <p>
                    Built to operate entirely offline on a 4GB GPU laptop, it refuses to let history remain fragmented or trapped in corporate clouds. 
                    The system acts as a lifelong companion: a digital twin that remembers everything, senses patterns, and protects context, returning quoted evidence instead of hallucinations.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 bg-purple-900/30 text-purple-300 text-xs font-mono rounded border border-purple-500/30">HDF5 LAKE</span>
                  <span className="px-2.5 py-1 bg-purple-900/30 text-purple-300 text-xs font-mono rounded border border-purple-500/30">LANCEDB</span>
                  <span className="px-2.5 py-1 bg-purple-900/30 text-purple-300 text-xs font-mono rounded border border-purple-500/30">HYBRID FUSION</span>
                  <span className="px-2.5 py-1 bg-purple-900/30 text-purple-300 text-xs font-mono rounded border border-purple-500/30">AUTOSYNC</span>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="bg-black/60 border border-white/10 p-5 rounded-xl space-y-4">
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <Server size={16} className="text-purple-400" />
                    TECHNICAL ARCHITECTURE
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="border-l-2 border-purple-500/50 pl-3">
                      <div className="text-sm font-bold text-white font-mono">Master Lake (HDF5)</div>
                      <div className="text-xs text-gray-400 mt-1">Durable ground truth. Stores 64k+ embedded chunks, raw text, and provenance without semantic loss.</div>
                    </div>
                    <div className="border-l-2 border-hud-cyan/50 pl-3">
                      <div className="text-sm font-bold text-white font-mono">Hybrid Projection (LanceDB)</div>
                      <div className="text-xs text-gray-400 mt-1">Fast vector + Full-Text Search (FTS) indexes on disk. Reciprocal Rank Fusion (RRF) combines lexical certainty with semantic meaning.</div>
                    </div>
                    <div className="border-l-2 border-emerald-500/50 pl-3">
                      <div className="text-sm font-bold text-white font-mono">Dense Proxy & MCP Bridge</div>
                      <div className="text-xs text-gray-400 mt-1">Rust-based dense proxy for rapid embedding. Streamable MCP bridge exposes precise search tools to local LLM agents.</div>
                    </div>
                    <div className="border-l-2 border-yellow-500/50 pl-3">
                      <div className="text-sm font-bold text-white font-mono">Autonomous Sync Daemon</div>
                      <div className="text-xs text-gray-400 mt-1">Monitors the lake, debounces changes, rebuilds LanceDB projections (~45s), and hot-reloads indexes without human intervention.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. SUPPLY CHAIN, SLSA & RESPONSIBLE AI GOVERNANCE */}
      <section className="bg-black/40 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
          <Activity size={18} className="text-hud-cyan" />
          SECURITY GOVERNANCE, SUPPLY CHAIN (SLSA/SBOM) & AI RISK FRAMEWORK
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
            <h3 className="text-white font-bold flex items-center gap-2 font-mono text-sm">
              <Package size={16} className="text-yellow-400" /> Supply Chain & Build Provenance (SLSA / EO 14028)
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 text-hud-cyan shrink-0" />
                <span><strong className="text-white">Automated SBOM Generation:</strong> Machine-readable Software Bill of Materials for dependency vulnerability tracing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 text-hud-cyan shrink-0" />
                <span><strong className="text-white">SLSA Level Compliance:</strong> Tamper-resistant build workflows with cryptographic artifact verification.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
            <h3 className="text-white font-bold flex items-center gap-2 font-mono text-sm">
              <Brain size={16} className="text-purple-400" /> Responsible AI (NIST AI RMF)
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-300 font-mono">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 text-hud-cyan shrink-0" />
                <span><strong className="text-white">NIST AI RMF Alignment:</strong> Systematic evaluation of hallucination rates, safety thresholds, and bias metrics.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 text-hud-cyan shrink-0" />
                <span><strong className="text-white">Data Provenance Enclaves:</strong> Strict training and inference isolation boundaries ensuring proprietary IP security.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for TelePrompt Glass */}
      <AnimatePresence>
        {isGlassModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8 cursor-zoom-out"
            onClick={() => setIsGlassModalOpen(false)}
          >
            <div className="relative max-w-5xl w-full flex flex-col items-center">
              <button 
                onClick={() => setIsGlassModalOpen(false)}
                className="absolute -top-12 right-0 text-gray-400 hover:text-white p-2 rounded-lg bg-white/10 transition-colors flex items-center gap-1 font-mono text-xs"
              >
                <X size={16} /> CLOSE ESC
              </button>
              <img 
                src="https://dl.dropboxusercontent.com/scl/fi/lslxs3m59elp0kp8d04hs/ChatGPT-Image-Feb-17-2026-04_22_37-PM.png?rlkey=1905kdwsu7v9dqy2mmnmdp2h4&st=gri8wsob&raw=1" 
                alt="TelePrompt Glass High Definition" 
                className="max-h-[75vh] w-auto object-contain rounded-xl border-2 border-hud-cyan shadow-[0_0_50px_rgba(18,181,203,0.4)]"
              />
              <div className="mt-4 text-center">
                <h4 className="text-white font-bold font-mono text-lg">TelePrompt Glass — Hardware & Optical Waveguide Unit</h4>
                <p className="text-hud-cyan font-mono text-xs mt-1">First AI-powered AR Smart Glasses in America • C++ Embedded Firmware • Microsoft Partner Program</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EngineeringPage;
