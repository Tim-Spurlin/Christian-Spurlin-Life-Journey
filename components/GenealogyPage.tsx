import React from 'react';
import { motion } from 'framer-motion';
import GenealogyGraph from './GenealogyGraph';
import { Network, ScrollText, Database, ExternalLink } from 'lucide-react';
import { SCRAPBOOK_SECTIONS, HERITAGE_ENGINE_URL } from '../constants';

const GenealogyPage: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-[1920px] mx-auto p-4 md:p-6 lg:p-8 space-y-8 flex flex-col"
    >
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 shrink-0">
            <div className="flex items-center gap-4">
                <Network className="text-hud-cyan" size={32} />
                <div>
                    <h1 className="text-3xl font-bold text-white">Digital Scrapbook & Immediate Roots</h1>
                    <p className="text-xs font-mono text-gray-500">TRACKING THE SPURLIN / WOODSON / DUBOSE / MACDONALD LINEAGE</p>
                </div>
            </div>
             <a 
                href={HERITAGE_ENGINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded hover:border-hud-cyan/50 hover:bg-hud-cyan/5 transition-all group"
            >
                 <div className="text-right">
                    <span className="block text-[9px] text-gray-500 font-mono tracking-widest uppercase">Deep Dive View</span>
                    <span className="block text-sm font-bold text-white group-hover:text-hud-cyan transition-colors flex items-center justify-end gap-2">
                        HERITAGE ENGINE <ExternalLink size={12} />
                    </span>
                 </div>
                 <div className="h-8 w-8 rounded bg-black flex items-center justify-center border border-white/10 group-hover:border-hud-cyan transition-colors">
                    <Database className="text-gray-400 group-hover:text-hud-cyan transition-colors" size={16} />
                 </div>
            </a>
        </header>

        {/* Top Section: Graph */}
        <div className="h-[900px] lg:h-[750px] w-full">
            {/* The Graph */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-1 flex flex-col h-full">
                <div className="p-2 border-b border-white/5 flex justify-between items-center">
                    <span className="text-xs font-mono text-hud-cyan">RELATIONSHIP_MAP_V2.0</span>
                    <span className="text-[10px] font-mono text-alert-red animate-pulse">LIVE DATA</span>
                </div>
                <div className="flex-grow relative overflow-hidden">
                    <GenealogyGraph />
                </div>
                <div className="p-2 text-[10px] font-mono text-gray-500 text-center">
                    Interactive Force-Directed Graph. Drag nodes to rearrange. Use timeline slider to view 1500s-2026.
                </div>
            </div>
        </div>

        {/* Bottom Section: Digital Scrapbook */}
        <div className="space-y-6 pt-4">
            <h2 className="text-xl font-mono text-tungsten flex items-center gap-2 border-b border-white/10 pb-2">
                <ScrollText size={20} /> Digital Scrapbook // Family Ecosystem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SCRAPBOOK_SECTIONS.map((section) => (
                    <div key={section.id} className="bg-white/5 border border-white/10 p-5 rounded-lg hover:border-hud-cyan/30 transition-colors group">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-hud-cyan text-[10px] font-mono uppercase border border-hud-cyan/30 px-2 py-0.5 rounded bg-hud-cyan/10">
                                {section.relation}
                            </span>
                            <span className="text-[10px] font-mono text-gray-500">ID: {section.id}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-hud-cyan transition-colors">{section.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed mb-4 font-sans font-light">
                            {section.content}
                        </p>
                        <div className="flex gap-2 flex-wrap border-t border-white/5 pt-2">
                            {section.tags.map((tag, i) => (
                                <span key={i} className="text-[9px] font-mono text-tungsten bg-black/40 px-1.5 py-0.5 rounded uppercase">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </motion.div>
  );
};

export default GenealogyPage;