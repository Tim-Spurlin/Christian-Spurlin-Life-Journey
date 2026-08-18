const fs = require('fs');

const fileContent = fs.readFileSync('App.tsx', 'utf8');

const navTarget = `              <button 
                onClick={() => navigateTo(PageView.ENGINEERING)}
                className={\`p-2 rounded hover:bg-white/10 transition-colors \${currentPage === PageView.ENGINEERING ? 'text-hud-cyan' : 'text-gray-500'}\`}
                title="Engineering"
              >
                  <Cpu size={20} />
              </button>`;

const navReplacement = `              <button 
                onClick={() => navigateTo(PageView.ENGINEERING)}
                className={\`p-2 rounded hover:bg-white/10 transition-colors \${currentPage === PageView.ENGINEERING ? 'text-hud-cyan' : 'text-gray-500'}\`}
                title="Engineering"
              >
                  <Cpu size={20} />
              </button>
              <button 
                onClick={() => navigateTo(PageView.DEEP_DIVE)}
                className={\`p-2 rounded hover:bg-white/10 transition-colors \${currentPage === PageView.DEEP_DIVE ? 'text-hud-cyan' : 'text-gray-500'}\`}
                title="Deep Dive Resources"
              >
                  <Mic size={20} />
              </button>`;

let newContent = fileContent.replace(navTarget, navReplacement);
fs.writeFileSync('App.tsx', newContent);
console.log("Successfully updated nav in App.tsx");
