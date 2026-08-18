import React, { useState } from 'react';
import { MEMORY_VIDEOS } from '../constants';
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MemoryVault: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState(MEMORY_VIDEOS[0]);

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 md:p-6 backdrop-blur-md h-full flex flex-col">
      <h2 className="text-hud-cyan font-mono text-xl mb-4 uppercase tracking-widest flex items-center gap-2 shrink-0">
        <span className="w-2 h-2 bg-hud-cyan rounded-full animate-pulse"/>
        Memory_Vault.mp4
      </h2>
      
      {/* Disclaimer Box */}
      <div className="mb-4 p-3 border border-hud-cyan/50 bg-hud-cyan/5 rounded-lg text-[10px] md:text-xs font-mono text-hud-cyan relative overflow-hidden shrink-0">
         <div className="absolute top-0 left-0 w-1 h-full bg-hud-cyan animate-pulse"/>
         <strong className="block mb-1">SYSTEM NOTE: DIGITAL ECOSYSTEM ARCHITECTURE</strong>
         <p className="opacity-80 leading-relaxed">
            The footage in this vault is not standard archival video. These videos are AI-generated visual reconstructions of actual memories, created by Christian Kota using Google AI Studio (Veo 3.1). This is a creative digital scrapbook designed to bring past memories to life, ensuring they are preserved forever in this digital nervous system.
         </p>
      </div>
      
      <div className="flex-grow flex flex-col md:flex-row gap-6 overflow-hidden">
        {/* Main Player */}
        <div className="md:w-2/3 flex flex-col gap-2">
          <div className="relative flex-grow bg-black rounded-lg overflow-hidden border border-tungsten/50 shadow-2xl min-h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeVideo.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                >
                    {activeVideo.type === 'image' ? (
                       <img 
                          src={activeVideo.url} 
                          alt={activeVideo.title}
                          className="w-full h-full object-contain bg-black"
                       />
                    ) : (
                       <video 
                          controls 
                          autoPlay
                          muted={activeVideo.id !== "mem-002"}
                          loop
                          playsInline
                          className="w-full h-full object-contain bg-black outline-none"
                          src={activeVideo.url}
                          poster={activeVideo.thumbnail}
                          onLoadedData={(e) => { 
                              if (activeVideo.id === "mem-002") { 
                                  e.currentTarget.volume = 0.75; 
                              } 
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                    )}
                </motion.div>
            </AnimatePresence>
          </div>
          <motion.div 
            key={`info-${activeVideo.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-2 shrink-0"
          >
            <h3 className="text-white font-bold text-lg">{activeVideo.title}</h3>
            <p className="text-hud-cyan font-mono text-xs">{activeVideo.date}</p>
            <p className="text-gray-400 text-sm mt-1">{activeVideo.description}</p>
          </motion.div>
        </div>

        {/* Playlist */}
        <div className="md:w-1/3 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-tungsten font-mono text-xs uppercase mb-2 border-b border-tungsten/30 pb-1 shrink-0">Archive Index</h3>
          {MEMORY_VIDEOS.map((video) => (
            <motion.div 
              key={video.id}
              onClick={() => setActiveVideo(video)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`p-2 rounded-lg cursor-pointer transition-colors border ${
                activeVideo.id === video.id 
                  ? 'bg-hud-cyan/10 border-hud-cyan' 
                  : 'bg-black/20 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="aspect-video w-full bg-black rounded overflow-hidden relative shrink-0">
                    {/* Thumbnail Logic: Use thumbnail if provided. If not, check if it's an image type and use url. Else placeholder. */}
                    {(video.thumbnail || video.type === 'image') ? (
                        <img 
                            src={video.thumbnail || video.url} 
                            className="w-full h-full object-cover opacity-60" 
                            alt={video.title} 
                        />
                    ) : (
                        <video 
                            src={video.url} 
                            className="w-full h-full object-cover opacity-60" 
                            preload="auto"
                            muted
                            playsInline
                            onLoadedData={(e) => {
                                e.currentTarget.currentTime = 0.1;
                            }}
                        />
                    )}
                    
                    {/* Only show play icon overlay for videos */}
                    {video.type !== 'image' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Play className={`w-8 h-8 drop-shadow-lg ${activeVideo.id === video.id ? 'text-hud-cyan' : 'text-white/80'}`} />
                        </div>
                    )}
                </div>
                <div>
                    <h4 className={`text-sm font-bold leading-tight mb-1 ${activeVideo.id === video.id ? 'text-white' : 'text-gray-400'}`}>
                        {video.title}
                    </h4>
                    <span className="text-[10px] font-mono text-tungsten block">{video.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryVault;