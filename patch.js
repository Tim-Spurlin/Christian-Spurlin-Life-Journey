const fs = require('fs');
const content = fs.readFileSync('components/MemoryVault.tsx', 'utf8');
const target = `                       <video
                           controls
                           autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-contain bg-black outline-none"
                          src={activeVideo.url}
                          poster={activeVideo.thumbnail}
                        >`;
const replacement = `                       <video
                           controls
                           autoPlay
                          muted={activeVideo.id !== 'mem-002'}
                          loop
                          playsInline
                          className="w-full h-full object-contain bg-black outline-none"
                          src={activeVideo.url}
                          poster={activeVideo.thumbnail}
                          onLoadedData={(e) => {
                              if (activeVideo.id === 'mem-002') {
                                  e.currentTarget.volume = 0.75;
                              }
                          }}
                        >`;
fs.writeFileSync('components/MemoryVault.tsx', content.replace(target, replacement));
