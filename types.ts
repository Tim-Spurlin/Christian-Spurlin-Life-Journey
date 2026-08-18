export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  TERMINAL = 'TERMINAL'
}

export enum PageView {
  HOME = 'HOME',
  BIO = 'BIO',
  GENEALOGY = 'GENEALOGY',
  ENGINEERING = 'ENGINEERING',
  TRADES = 'TRADES',
  DEEP_DIVE = 'DEEP_DIVE',
  DEEP_DIVE_2 = 'DEEP_DIVE_2',
  DEEP_DIVE_3 = 'DEEP_DIVE_3',
  DEEP_DIVE_4 = 'DEEP_DIVE_4',
  DEEP_DIVE_5 = 'DEEP_DIVE_5',
  DEEP_DIVE_6 = 'DEEP_DIVE_6',
  DEEP_DIVE_7 = 'DEEP_DIVE_7',
  GALLERY = 'GALLERY',
  MUSIC = 'MUSIC'
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  bpm: number;
  key: string;
  url: string; // URL to audio file
  coverArt: string;
  link?: string; // External link
  genre?: string;
  year?: string | number;
  story?: string; // What it means to me
  whyWrittenOrRemixed?: string; // Why I wrote it / why I chose to remix it
  personality?: string; // Its own distinct personality / character
  mood?: string;
  lyricsSnippet?: string;
  tags?: string[];
  vocalHeritage?: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  category: 'survival' | 'trades' | 'intel' | 'art';
  verification?: string; // "Source Literacy" link/text
}

export interface GitCommit {
  id: string;
  message: string;
  date: string;
  repo: string;
}

export interface GenealogyNode {
  id: string;
  group: number; // 1: Self/Modern, 2: McCoy/MacDonald, 3: Power/Irish, 4: DuBois/Guest
  verifiedLevel: number; // 1-10 (Source Literacy)
  birthYear: number;
  deathYear?: number;
  label?: string;
  title?: string;
}

export interface GenealogyLink {
  source: string;
  target: string;
  value: number;
  type: 'biological' | 'adoptive' | 'marriage';
}

export interface GenealogyData {
  nodes: GenealogyNode[];
  links: GenealogyLink[];
}

export interface PsychCaseStudy {
  id: string;
  title: string;
  subject: string;
  classification: string;
  narrative: string;
  analysis: string;
}

export interface ScrapbookSection {
  id: string;
  title: string;
  relation: string;
  content: string;
  tags: string[];
}

export interface MemoryVideo {
  id: string;
  title: string;
  date: string;
  description: string;
  url: string;
  thumbnail?: string;
  type?: 'video' | 'image';
  category?: string;
}