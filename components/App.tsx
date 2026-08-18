import React, { useState } from 'react';
import BentoGrid from './components/BentoGrid';
import Terminal from './components/Terminal';
import BioPage from './components/BioPage';
import GenealogyPage from './components/GenealogyPage';
import EngineeringPage from './components/EngineeringPage';
import { AudioProvider } from './components/AudioContext';
import { Globe, LayoutGrid, User, GitBranch, Cpu, ChevronLeft, ExternalLink, Database } from 'lucide-react';
import { PageView } from './types';
import { LINKTREE_URL, HERITAGE_ENGINE_URL } from './constants';

function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);

  // Navigation Logic
  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AudioProvider>
      <div className="min-h-screen bg-military text-gray-300 font-sans relative selection:bg-hud-cyan selection:text-black flex flex-col">
        {/* Background Effects */}
        <div className="scanline-overlay" />
        <div className="noise-overlay" />

        {/* Global Header */}
        <header className="fixed top-0 left-0 right-0 z-40 bg-military/90 backdrop-blur-xl border-b border-white/10 h-16 flex items-center justify-between px-4 md:px-6">
           <div className="flex items-center gap-2 text-hud-cyan font-mono font-bold tracking-widest text-sm cursor-pointer" onClick={() => navigateTo(PageView.HOME)}>
              <Globe size={18} className="animate-pulse" />
              <span className="hidden md:inline">CHRISTIAN_KOTA.SYS</span>
              <span className="md:hidden">CK.SYS</span>
           </div>

           {/* Navigation Bar */}
           <nav className="flex items-center gap-1 md:gap-4">
              {currentPage !== PageView.HOME && (
                 <button onClick={() => navigateTo(PageView.HOME)} className="flex items-center gap-1 text-xs font-mono text-gray-400 hover:text-white mr-2">
                    <ChevronLeft size={14} /> BACK
                 </button>
              )}
              
              <button 
                onClick={() => navigateTo(PageView.HOME)}
                className={`p-2 rounded hover:bg-white/10 transition-colors ${currentPage === PageView.HOME ? 'text-hud-cyan' : 'text-gray-500'}`}
                title="Dashboard"
              >
                  <LayoutGrid size={20} />
              </button>
              <button 
                onClick={() => navigateTo(PageView.BIO)}
                className={`p-2 rounded hover:bg-white/10 transition-colors ${currentPage === PageView.BIO ? 'text-hud-cyan' : 'text-gray-500'}`}
                title="Personnel File"
              >
                  <User size={20} />
              </button>
              <button 
                onClick={() => navigateTo(PageView.GENEALOGY)}
                className={`p-2 rounded hover:bg-white/10 transition-colors ${currentPage === PageView.GENEALOGY ? 'text-hud-cyan' : 'text-gray-500'}`}
                title="Genealogy"
              >
                  <GitBranch size={20} />
              </button>
              <button 
                onClick={() => navigateTo(PageView.ENGINEERING)}
                className={`p-2 rounded hover:bg-white/10 transition-colors ${currentPage === PageView.ENGINEERING ? 'text-hud-cyan' : 'text-gray-500'}`}
                title="Engineering"
              >
                  <Cpu size={20} />
              </button>

              {/* External Heritage Engine Link */}
              <a 
                href={HERITAGE_ENGINE_URL}
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 flex items-center gap-2 bg-hud-cyan/10 border border-hud-cyan/50 text-hud-cyan px-3 py-1.5 rounded hover:bg-hud-cyan hover:text-black transition-all group"
                title="Launch Heritage Engine"
              >
                 <Database size={16} />
                 <span className="hidden lg:inline text-xs font-bold font-mono">HERITAGE ENGINE</span>
                 <ExternalLink size={12} className="opacity-50 group-hover:opacity-100" />
              </a>
           </nav>
        </header>

        {/* Main Content Area */}
        <main className="pt-20 pb-10 relative z-30 flex-grow">
          {currentPage === PageView.HOME && (
            <BentoGrid 
                onOpenTerminal={() => setShowTerminal(true)} 
                onNavigate={navigateTo}
            />
          )}
          {currentPage === PageView.BIO && <BioPage />}
          {currentPage === PageView.GENEALOGY && <GenealogyPage />}
          {currentPage === PageView.ENGINEERING && <EngineeringPage />}
        </main>

        {/* Footer Telemetry */}
        <footer className="h-8 bg-black border-t border-white/10 flex items-center justify-between px-6 font-mono text-[10px] text-gray-600 z-40">
             <div className="flex gap-4 items-center">
                 <span className="hidden md:inline">LOC: GEORGIA_US</span>
                 <span>STATUS: ONLINE</span>
                 <a href={LINKTREE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-hud-cyan transition-colors ml-4 border-l border-white/20 pl-4">
                    <ExternalLink size={10} /> CONNECT
                 </a>
             </div>
             <div className="flex gap-4">
                 <span>LCP: 0.8s</span>
                 <span className="hidden md:inline">Region: IAD1</span>
                 <span>Build: #7f3a1b</span>
             </div>
        </footer>

        {/* Terminal Overlay */}
        {showTerminal && (
            <Terminal onClose={() => setShowTerminal(false)} />
        )}
      </div>
    </AudioProvider>
  );
}

export default App;