import React from 'react';
import { PageView } from '../types';
import { ChevronLeft, ChevronRight, Radio } from 'lucide-react';

export interface EpisodeInfo {
  num: number;
  id: string;
  page: PageView;
  titleEn: string;
  titleEs: string;
  shortTitleEn: string;
  shortTitleEs: string;
  accentColor: string;
}

export const DEEP_DIVE_EPISODES: EpisodeInfo[] = [
  {
    num: 1,
    id: "ep-1",
    page: PageView.DEEP_DIVE,
    titleEn: "Episode 01: The 13-Year-Old Architect",
    titleEs: "Episodio 01: El Arquitecto de 13 Años",
    shortTitleEn: "01. Hardware Empire",
    shortTitleEs: "01. Imperio Hardware",
    accentColor: "hud-cyan"
  },
  {
    num: 2,
    id: "ep-2",
    page: PageView.DEEP_DIVE_2,
    titleEn: "Episode 02: Childhood Trauma & Survival",
    titleEs: "Episodio 02: Trauma Infantil y Supervivencia",
    shortTitleEn: "02. Foster Survival",
    shortTitleEs: "02. Supervivencia",
    accentColor: "amber-400"
  },
  {
    num: 3,
    id: "ep-3",
    page: PageView.DEEP_DIVE_3,
    titleEn: "Episode 03: The Air Force Analyst",
    titleEs: "Episodio 03: El Analista de la Fuerza Aérea",
    shortTitleEn: "03. Air Force Intel",
    shortTitleEs: "03. Inteligencia USAF",
    accentColor: "emerald-400"
  },
  {
    num: 4,
    id: "ep-4",
    page: PageView.DEEP_DIVE_4,
    titleEn: "Episode 04: 100% P&T VA Benefits",
    titleEs: "Episodio 04: Beneficios 100% P&T VA",
    shortTitleEn: "04. VA Blueprint",
    shortTitleEs: "04. Beneficios VA",
    accentColor: "yellow-400"
  },
  {
    num: 5,
    id: "ep-5",
    page: PageView.DEEP_DIVE_5,
    titleEn: "Episode 05: Psychology & Mind Architecture",
    titleEs: "Episodio 05: Psicología y Arquitectura Mental",
    shortTitleEn: "05. Mind Psychology",
    shortTitleEs: "05. Psicología",
    accentColor: "purple-400"
  },
  {
    num: 6,
    id: "ep-6",
    page: PageView.DEEP_DIVE_6,
    titleEn: "Episode 06: Family & Bolivia Relocation",
    titleEs: "Episodio 06: Familia y Mudanza a Bolivia",
    shortTitleEn: "06. Family & Bolivia",
    shortTitleEs: "06. Familia y Bolivia",
    accentColor: "sky-400"
  },
  {
    num: 7,
    id: "ep-7",
    page: PageView.DEEP_DIVE_7,
    titleEn: "Episode 07: High School Speedrun & Enlistment",
    titleEs: "Episodio 07: Hack de Preparatoria y Alistamiento",
    shortTitleEn: "07. High School Hack",
    shortTitleEs: "07. Hack Preparatoria",
    accentColor: "rose-400"
  }
];

interface DeepDiveNavProps {
  currentEpisode: number; // 1 through 7
  onNavigate?: (page: PageView) => void;
  lang?: 'en' | 'es';
  position?: 'top' | 'bottom';
}

export const DeepDiveNav: React.FC<DeepDiveNavProps> = ({
  currentEpisode,
  onNavigate,
  lang = 'en',
  position = 'bottom'
}) => {
  if (!onNavigate) return null;

  const currentIndex = currentEpisode - 1;
  const prevEpisode = currentIndex > 0 ? DEEP_DIVE_EPISODES[currentIndex - 1] : null;
  const nextEpisode = currentIndex < DEEP_DIVE_EPISODES.length - 1 ? DEEP_DIVE_EPISODES[currentIndex + 1] : null;

  const handleGo = (page: PageView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page);
  };

  if (position === 'top') {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 w-full pb-4 mb-4 border-b border-white/10">
        {/* Previous Button (if not episode 1) */}
        <div className="flex items-center gap-2">
          {prevEpisode ? (
            <button
              type="button"
              onClick={() => handleGo(prevEpisode.page)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-hud-cyan/40 text-gray-300 hover:text-hud-cyan text-xs font-mono font-medium transition-all group shadow-sm"
              title={lang === 'es' ? `Ir al ${prevEpisode.titleEs}` : `Go to ${prevEpisode.titleEn}`}
            >
              <ChevronLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>{lang === 'es' ? 'Episodio Anterior' : 'Previous Episode'}</span>
            </button>
          ) : (
            <span className="text-[11px] font-mono text-gray-500 px-2 py-1 bg-white/[0.02] border border-white/5 rounded-md">
              {lang === 'es' ? 'Primer Episodio' : 'First Episode'}
            </span>
          )}
        </div>

        {/* Quick Stepper Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {DEEP_DIVE_EPISODES.map((ep) => {
            const isActive = ep.num === currentEpisode;
            return (
              <button
                key={ep.id}
                type="button"
                onClick={() => handleGo(ep.page)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-hud-cyan text-black shadow-[0_0_12px_rgba(0,240,255,0.4)] ring-1 ring-hud-cyan'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
                title={lang === 'es' ? ep.titleEs : ep.titleEn}
              >
                EP {String(ep.num).padStart(2, '0')}
              </button>
            );
          })}
        </div>

        {/* Next Button (if not episode 7) */}
        <div className="flex items-center gap-2">
          {nextEpisode ? (
            <button
              type="button"
              onClick={() => handleGo(nextEpisode.page)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-hud-cyan/15 hover:bg-hud-cyan/25 border border-hud-cyan/40 hover:border-hud-cyan text-hud-cyan hover:text-white text-xs font-mono font-bold transition-all group shadow-[0_0_15px_rgba(0,240,255,0.15)]"
              title={lang === 'es' ? `Ir al ${nextEpisode.titleEs}` : `Go to ${nextEpisode.titleEn}`}
            >
              <span>{lang === 'es' ? 'Siguiente Episodio' : 'Next Episode'}</span>
              <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <span className="text-[11px] font-mono text-gray-500 px-2 py-1 bg-white/[0.02] border border-white/5 rounded-md">
              {lang === 'es' ? 'Último Episodio' : 'Final Episode'}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Bottom Navigation Bar
  return (
    <div className="pt-8 mt-8 border-t border-white/10 space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Previous Episode */}
        {prevEpisode ? (
          <button
            type="button"
            onClick={() => handleGo(prevEpisode.page)}
            className="w-full sm:w-auto flex items-center justify-start gap-3 p-3.5 sm:px-5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-left transition-all group"
          >
            <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-white/10 transition-colors">
              <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                {lang === 'es' ? '← Episodio Anterior' : '← Previous Episode'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-200 group-hover:text-white">
                {lang === 'es' ? prevEpisode.titleEs : prevEpisode.titleEn}
              </div>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block text-xs font-mono text-gray-600">
            {lang === 'es' ? '• Inicio de la Serie (Episodio 01)' : '• Series Origin (Episode 01)'}
          </div>
        )}

        {/* Right: Next Episode */}
        {nextEpisode ? (
          <button
            type="button"
            onClick={() => handleGo(nextEpisode.page)}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3 p-3.5 sm:px-5 rounded-xl bg-hud-cyan/10 hover:bg-hud-cyan/20 border border-hud-cyan/40 hover:border-hud-cyan text-right transition-all group shadow-[0_0_20px_rgba(0,240,255,0.1)]"
          >
            <div>
              <div className="text-[10px] font-mono text-hud-cyan uppercase tracking-wider">
                {lang === 'es' ? 'Siguiente Episodio →' : 'Next Episode →'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white group-hover:text-hud-cyan transition-colors">
                {lang === 'es' ? nextEpisode.titleEs : nextEpisode.titleEn}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-hud-cyan/20 text-hud-cyan group-hover:bg-hud-cyan group-hover:text-black transition-all">
              <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ) : (
          <div className="w-full sm:w-auto flex items-center justify-end gap-2 text-xs font-mono text-gray-500">
            <Radio size={14} className="text-emerald-400" />
            <span>{lang === 'es' ? 'Fin de la Serie de Audio' : 'End of Audio Overview Series'}</span>
          </div>
        )}
      </div>

      {/* Series Progress Indicator */}
      <div className="flex items-center justify-center gap-2 pt-2">
        <span className="text-[11px] font-mono text-gray-500">
          {lang === 'es' 
            ? `EPISODIO ${String(currentEpisode).padStart(2, '0')} DE 07 • DESCRIPCIÓN GENERAL`
            : `EPISODE ${String(currentEpisode).padStart(2, '0')} OF 07 • AUDIO OVERVIEW`}
        </span>
      </div>
    </div>
  );
};
