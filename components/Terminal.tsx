import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { LINKTREE_URL } from '../constants';

interface TerminalProps {
  onClose: () => void;
}

const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [history, setHistory] = useState<string[]>([
    "ChristianKota OS [Version 15.0.1]",
    "(c) 2026 Full-Stack Humanity Corp. All rights reserved.",
    "",
    "Type 'help' for available commands.",
    ""
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let response: string | string[] = [];

    switch (trimmed) {
      case 'help':
        response = [
          "Available commands:",
          "  whoami     - Display current user identity",
          "  ls         - List active projects",
          "  cat bio    - Read system biography",
          "  socials    - Access neural links / social media",
          "  clear      - Clear terminal screen",
          "  exit       - Return to Dashboard UI"
        ];
        break;
      case 'whoami':
        response = "root@christiankota:~/architect";
        break;
      case 'ls':
        response = [
          "drwx------  usaf-intel-archives",
          "drwxr-xr-x  welding-projects",
          "drwxr-xr-x  music-production",
          "-rwxr-xr-x  heart-monitoring-clock.py",
          "-rw-r--r--  source-literacy-manifesto.md"
        ];
        break;
      case 'cat bio':
        response = [
          "SUBJECT: Timothy Christian Spurlin",
          "STATUS: Building Global Infrastructure",
          "-------------------------------------",
          "A polymath forged in the crucible of adversity.",
          "From foster care survival to Top Secret USAF Intel.",
          "Integrating the logic of matter, systems, and emotion."
        ];
        break;
      case 'socials':
      case 'linktree':
        response = `Opening neural link... ${LINKTREE_URL}`;
        window.open(LINKTREE_URL, '_blank');
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        onClose();
        return;
      default:
        response = `Command not found: ${trimmed}`;
    }

    setHistory(prev => [...prev, `root@christiankota:~$ ${cmd}`, ...(Array.isArray(response) ? response : [response]), ""]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="fixed inset-0 bg-black z-50 p-4 font-mono text-green-500 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center border-b border-green-900 pb-2 mb-4">
        <span className="text-sm">TERMINAL MODE - BASH</span>
        <button onClick={onClose} className="hover:text-white"><X size={20} /></button>
      </div>
      <div className="flex-grow overflow-y-auto font-bold text-sm md:text-base">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">{line}</div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center mt-2">
        <span className="mr-2">root@christiankota:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none flex-grow text-green-500 caret-green-500"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;