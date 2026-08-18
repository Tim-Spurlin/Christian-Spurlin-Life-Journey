const fs = require('fs');

const fileContent = fs.readFileSync('App.tsx', 'utf8');

// 1. Import DeepDivePrompt
let newContent = fileContent.replace(
    "import EngineeringPage from './components/EngineeringPage';",
    "import EngineeringPage from './components/EngineeringPage';\nimport DeepDivePrompt from './components/DeepDivePrompt';"
);

// 2. Add icon to lucide-react import
newContent = newContent.replace(
    "import { Globe, LayoutGrid, User, GitBranch, Cpu, ChevronLeft, ExternalLink, Database, Link } from 'lucide-react';",
    "import { Globe, LayoutGrid, User, GitBranch, Cpu, ChevronLeft, ExternalLink, Database, Link, Mic } from 'lucide-react';"
);

// 3. Add to navigation
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

newContent = newContent.replace(navTarget, navReplacement);

// 4. Add to Main Content Area
const mainTarget = `          {currentPage === PageView.ENGINEERING && <EngineeringPage />}`;
const mainReplacement = `          {currentPage === PageView.ENGINEERING && <EngineeringPage />}
          {currentPage === PageView.DEEP_DIVE && <DeepDivePrompt />}`;

newContent = newContent.replace(mainTarget, mainReplacement);

fs.writeFileSync('App.tsx', newContent);
console.log("Successfully updated App.tsx");
