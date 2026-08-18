import { Track, TimelineEvent, GitCommit, GenealogyData, PsychCaseStudy, MemoryVideo, ScrapbookSection } from './types';

export const LINKTREE_URL = "https://linktr.ee/christiankota";
export const HERITAGE_ENGINE_URL = "https://spurlin-dubose-heritage-engine-219296874904.us-west1.run.app/";
export const PROFILE_PICTURE_URL = "https://dl.dropboxusercontent.com/scl/fi/356edz6vgn101o8h9o5wl/Smile-with-beard-red-shorts-at-center-sitting-on-sink-CROPPED.png?rlkey=lubprlljfbekxo8gggipp3369&st=fte1mqsc&raw=1";

export const BIO_SUMMARY = `
Timothy Christian Spurlin is a Principal Software Architect and Security Engineer.
He bridges the gap between rigorous compliance (NIST, HIPAA) and rapid innovation.
From the kinetic precision of military RF communications to the digital architecture of national security intelligence systems.
`;

export const TIMELINE: TimelineEvent[] = [
  {
    year: 1993,
    title: "Origin: The 15th Day",
    description: "Born July 18. On August 2nd, 1993—at exactly 15 days old—Timothy Christian Spurlin (Kota) was captured in his earliest defining portrait. This specific date marks the recorded beginning of a life narrative that would soon enter the turbulence of the foster care system.",
    category: "survival",
    verification: "Photographic Record: Aug 2, 1993"
  },
  {
    year: 2003,
    title: "The Bootcamp",
    description: "Lived with Aunt Connie and 'Dave' in Coolidge, GA. Subjected to extreme military-style discipline. Dave, a rattlesnake wrangler and welder, inadvertently installed a 'Navy Seal' operating system of pain tolerance and dissociation.",
    category: "survival",
    verification: "Family Witness Testimony"
  },
  {
    year: 2012,
    title: "USAF Intelligence (RF/Network)",
    description: "Langley AFB. Maintained secure RF communications and network infrastructure (OSI Layers 1-3). Executed diagnostics under stringent availability expectations, forming the foundation for modern Site Reliability Engineering (SRE).",
    category: "intel",
    verification: "DD-214 / Signal Diagnostics"
  },
  {
    year: 2015,
    title: "Physical Security Operations",
    description: "U.S. Security Associates (Colorado State Capitol). Conducted threat modeling, access control monitoring, and incident response. Translated physical perimeter defense into Identity & Access Management (IAM) architectural reasoning.",
    category: "survival",
    verification: "U.S. Security Associates Records"
  },
  {
    year: 2017,
    title: "Manufacturing QA Leadership",
    description: "TrueNorth Steel / Norwood Sales. Enforced 'spec-first' execution and zero-defect mindsets. Managed precise tolerances and QA gatekeeping, translating directly to CI/CD pipeline rigor, software validation, and safety-critical process control.",
    category: "trades",
    verification: "QA Logs / Safety Protocols"
  },
  {
    year: 2019,
    title: "The Invention: TelePrompt Glass",
    description: "Invented the first AI-powered AR Smart Glasses in America. Secured Microsoft Partnership ($150k grant). Built Context-Aware Transcription using Google Maps API and C++.",
    category: "intel",
    verification: "Microsoft Partner Portal"
  },
  {
    year: 2021,
    title: "Saphyre Solutions (Principal Architect)",
    description: "Architected compliance-constrained automation platforms for Insurtech. Built multi-step workflows handling sensitive user data (PII/PHI) under HIPAA Security Rule constraints and NIST guidelines.",
    category: "intel",
    verification: "Corporate Architecture Docs"
  },
  {
    year: 2024,
    title: "National Security Intelligence Tools",
    description: "Designing ingestion-to-analysis pipelines processing 60,000+ high-priority intelligence targets. Horizontal scalability for mission-interest agencies. Implementing AI fusion and distributed crawling systems.",
    category: "intel",
    verification: "Current Clearance Status"
  }
];

export const PSYCH_CASE_STUDIES: PsychCaseStudy[] = [
  {
    id: "CS-001",
    title: "The Defeated Giant",
    subject: "6th Grade P.T. Coach",
    classification: "RETROSPECTIVE EMPATHY",
    narrative: "Witnessed a 10-year-old student (Shaneekwa) defy the coach's authority. Instead of anger, I saw deep defeat in his eyes.",
    analysis: "Early realization that adult authority is often a mask for unresolved childhood trauma. The 'Spark' of situational awareness."
  },
  {
    id: "CS-002",
    title: "Projection of Insecurity",
    subject: "Mr. Harp (Math Teacher)",
    classification: "DEFENSE MECHANISM ID",
    narrative: "Subject frequently mocked my height. Years later, I discovered he was only 5'5\".",
    analysis: "Subject was projecting his own physical insecurities onto a student to comfort his inner child. Result: Compassion, not resentment."
  },
  {
    id: "CS-003",
    title: "The Talking Shoes Paradox",
    subject: "Mrs. West (Social Studies)",
    classification: "NON-VERBAL DECODING",
    narrative: "My shoes were falling apart ('talking'). Mrs. West, known for a miserable demeanor, held me back after class. I expected punishment; she gave me brand new Nikes.",
    analysis: "A definitive lesson that facial expressions (Data) do not always match intent (Logic). Destroyed bias against 'mean-looking' individuals."
  },
  {
    id: "CS-004",
    title: "The Bootcamp",
    subject: "Guardian 'Dave'",
    classification: "RESILIENCE TRAINING",
    narrative: "Subjected to extreme discipline (standing in corners 30hrs+, water hose drills). Dave claimed: 'There is a method to my madness.'",
    analysis: "Though abusive, it installed a 'Navy Seal' operating system. Pain tolerance via dissociation (watching the fireplace flames) and a perfectionist work ethic."
  }
];

export const SCRAPBOOK_SECTIONS: ScrapbookSection[] = [
  {
    id: "scrap-001",
    title: "Christian Kota",
    relation: "Subject Zero",
    content: "Born July 18, 1993, I am currently 32 years old. I am the architect of this digital ecosystem. I built this digital scrapbook architecture to bring my memories to life using Google Veo 3.1 so that if I ever lose them, I can watch them in video. My childhood was a turbulent journey of survival: I started in foster care, moved to Aunt Connie's, then to Aunt Charlene's, then to Aunt Laurie's, back to Aunt Connie's again, and finally escaped by joining the military. That kinetic path forged who I am today.",
    tags: ["Creator", "32 Years Old", "Foster Care to Military"]
  },
  {
    id: "scrap-002",
    title: "Zachary",
    relation: "Brother",
    content: "My brother. Our paths diverged early on. While I bounced around the system, Zach was taken out of foster care at a young age and raised entirely by our Grandma Lavina and her husband Dennis. He stayed with them his whole childhood. Because of our drastically different environments, we used to never get along. It wasn't until we got older, became more similar in mindset, and reached a shared maturity that we finally connected and built a strong brotherhood.",
    tags: ["Brother", "Shared Maturity", "Bond"]
  },
  {
    id: "scrap-003",
    title: "Grandma Lavina & Dennis Powers",
    relation: "Grandparents",
    content: "Grandma Lavina provided the stability that kept Zach out of the system. She took him out of foster care at a young age and raised him the whole time I was moving from house to house. She met her husband, Dennis Powers, later in life. Though Dennis was not related by blood, he stepped up to the plate and was a true, constant foundational figure in raising Zach alongside her. They earned their place in this family ecosystem.",
    tags: ["Lavina", "Dennis", "Stability"]
  },
  {
    id: "scrap-004",
    title: "The Georgia Roots",
    relation: "Environment",
    content: "Born and raised out in the boondocks of Georgia. My environment was defined by dirt roads, sprawling cotton fields, expansive watermelon patches, and pine trees that stretched for miles and miles. This raw, rural landscape served as the foundation of my upbringing.",
    tags: ["Georgia", "Dirt Roads", "Pine Trees"]
  },
  {
    id: "scrap-005",
    title: "Mom",
    relation: "Mother",
    content: "A dedicated space for my mother. The AI-restored memories of her youth immortalize her spirit and presence in this digital scrapbook.",
    tags: ["Mother", "Resilience"]
  },
  {
    id: "scrap-006",
    title: "Timothy Leo",
    relation: "Father",
    content: "My dad. We share a deep love for music and singing. He inherited his musical talents and voice directly from his dad, Grandaddy Leo, and passed that exact same passion and voice down to me.",
    tags: ["Father", "Music", "Singing"]
  },
  {
    id: "scrap-007",
    title: "Grandaddy Leo",
    relation: "Paternal Grandfather",
    content: "My dad's dad. He was a musician who loved playing the guitar and singing—the origin of our family's vocal talents. Tragically, he suffered a fatal aneurysm at a young age. I was at the house when Grandma Merle found him dead; thankfully I didn't see the body, but witnessing her absolute devastation left a profound mark on my life.",
    tags: ["Musician", "Guitar", "Tragedy"]
  },
  {
    id: "scrap-008",
    title: "Great Grandma Merle",
    relation: "Great-Grandmother",
    content: "A true cornerstone of our family. It was incredibly rare to ever see her not wearing an apron. She tragically had to endure the unimaginable devastation of finding her own son, Leo, dead, yet she remained a matriarch of immense strength.",
    tags: ["Matriarch", "Apron", "Strength"]
  },
  {
    id: "scrap-009",
    title: "Great Grandpa Jim",
    relation: "Adoptive Great-Grandfather",
    content: "Though he wasn't related by blood, he was my grandfather in every sense of the word. He held me when I was a baby and provided a foundation of pure family love.",
    tags: ["Guardian", "Family"]
  },
  {
    id: "scrap-010",
    title: "The Logic of Matter: Fabrication",
    relation: "Career Origin",
    content: "Before I architected code, I built architecture in steel. Working as a structural welder at Wolf Steel Construction, I laid out my own I-beams and operated multi-directional forklifts. At True North Steel in West Fargo, ND, I pulled grueling weekend shifts, once fully building two massive oil tanks in just 3 days. I also operated like 'Santa's Elf' building weight racks, boat racks, and displays for Scheels Sports. It was intense, hot, heavy work that forged my understanding of precision, tolerances, and the zero-defect mindset I use in software engineering today.",
    tags: ["Welder", "TrueNorth Steel", "Wolf Steel", "Scheels"]
  }
];

export const MEMORY_VIDEOS: MemoryVideo[] = [
  {
    id: "mem-001",
    title: "Origin: 15 Days Old",
    date: "August 2, 1993",
    description: "A photo of me when I was just 15 days old, right at the very start in August 1993.",
    url: "https://dl.dropboxusercontent.com/scl/fi/ms23ksmxrfcw792wrib7i/grok-video-baby-51e83e51.mp4?rlkey=50h1vbpu50mnvb3raxvfu9obp&st=tbkwt6xa&raw=1",
    type: "video"
  },
  {
    id: "mem-003",
    title: "Mom's School Days",
    date: "Childhood Memory",
    description: "My mother posing for her school portrait when she was young.",
    url: "https://dl.dropboxusercontent.com/scl/fi/ed9s4xvlonjitpzs6mdta/grok-video-mom-yearbook-da41dbfc.mp4?rlkey=jyhtx3wmcr5yrqkzbvuhdlccu&st=jovmqv4q&raw=1",
    type: "video"
  },
  {
    id: "mem-004",
    title: "Grandaddy Leo's Guitar",
    date: "1990s Memory",
    description: "My Grandaddy Leo playing his acoustic guitar. He was a passionate musician, and that's where my dad and I got our love for singing.",
    url: "https://res.cloudinary.com/dw3lf8roj/video/upload/v1771375381/grok-video-5c1ea507-62a4-4af7-9e91-ce6844f8efcc_1_qepwau.mp4",
    type: "video"
  },
  {
    id: "mem-005",
    title: "Safe Hands: Grandpa Jim",
    date: "1993 Memory",
    description: "My Great Grandpa Jim holding me when I was an infant. Although we weren't related by blood, he was true family through and through.",
    url: "https://dl.dropboxusercontent.com/scl/fi/9x93govasx4rqzlo2h30q/grok-video-grandpa-holding-baby-baa9c0c2.mp4?rlkey=3a0841mt0ftg737hdkt6gwv6c&st=2ack8nm7&raw=1",
    type: "video"
  },
  {
    id: "mem-006",
    title: "Wolf Steel: Overhead MIG Welding",
    date: "Tradesman Era",
    description: "Overhead short-circuit MIG welding at Wolf Steel Construction, building a large structural frame for an agricultural soybean grain processing order.",
    url: "https://dl.dropboxusercontent.com/scl/fi/rrzq31v64ye7j1421rtco/Overhead-weld-at-Wolf-Steel.mp4?rlkey=tnyl89s3wzsbwj460unfaslle&st=ji45htt7&raw=1",
    type: "video"
  },
  {
    id: "mem-007",
    title: "TrueNorth Steel: Twin Oil Tanks",
    date: "Weekend Shift",
    description: "Working inside massive rolling steel oil tanks in West Fargo, ND. Built two of these complete tanks from scratch over a single 3-day weekend shift.",
    url: "https://dl.dropboxusercontent.com/scl/fi/3g56djhghly3b2vjhlect/true-north-steel-welding-inside-the-tank-while-it-s-rolling.mp4?rlkey=ihxul9m0ci0j5g8peqrd9lnyf&st=4zvjm49d&raw=1",
    type: "video"
  },
  {
    id: "mem-008",
    title: "Wolf Steel: Hot Summer Shift",
    date: "Tradesman Era",
    description: "At Wolf Steel Construction on a very hot summer work day.",
    url: "https://dl.dropboxusercontent.com/scl/fi/94zprh416nd35x98x8xf7/Snapchat-1961190660.mp4?rlkey=2nita8h8jevpjlxygzn25anp7&st=qs8hueq7&raw=1",
    type: "video"
  },
  {
    id: "mem-002",
    title: "Original Music Project",
    date: "Unreleased",
    description: "An unreleased original music and visual demo track that I wrote and produced.",
    url: "https://dl.dropboxusercontent.com/scl/fi/q5us12oci4f3hdfh3cphr/ai-music.mp4?rlkey=apc7y7bilfhgeyiorv7f3amt9&st=e2333sph&raw=1",
    thumbnail: "https://dl.dropboxusercontent.com/scl/fi/euzhbk1xt83g9levojbyr/Screenshot_20260224_112529.png?rlkey=fm5ht8r3lxdgzib88bfkyfnmv&st=ai9x62ku&raw=1",
    type: "video"
  }
];

export const MUSIC_TRACKS: Track[] = [
  {
    id: 't-bajo-lucecitas',
    title: 'Bajo Lucecitas',
    artist: 'Christian Kota',
    duration: '3:24',
    bpm: 104,
    key: 'F# Min',
    url: '/assets/audio/Bajo%20Lucecitas.wav',
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    genre: 'Latin Melodic / Atmospheric Urban',
    year: '2025',
    story: 'A deeply personal nocturnal reflection on intimacy, clarity, and the tranquil glow of city lights beneath an open night sky. It represents those late-night moments where the noise of the world fades into silence, leaving only ambient illumination, heartbeat rhythms, and pure emotional honesty.',
    whyWrittenOrRemixed: 'I crafted this track to capture the feeling of midnight drives and quiet introspective evenings. I blended warm analog synth pads, deep 808 sub-bass, and syncopated Latin percussion with smooth, expressive vocal phrasing. It is an exploration of nocturnal peace and intimate vulnerability.',
    personality: 'Nocturnal, moody, and atmospheric. It carries a hypnotic, laid-back groove that pulls you into a hazy, neon-lit reverie where time slows down.',
    mood: 'Ethereal, Romantic & Introspective',
    lyricsSnippet: '“Bajo las lucecitas de la noche fría... todo se detiene cuando estás cerca de mí.”',
    tags: ['Nocturnal Vibe', '808 Bass', 'Atmospheric Synths', 'Melodic Latin', 'Midnight Drive'],
    vocalHeritage: 'Channeling the natural ear for melody and harmonic warmth passed down through generations from Grandaddy Leo.'
  },
  {
    id: 't-te-vi-pasar',
    title: 'Te Vi Pasar',
    artist: 'Christian Kota',
    duration: '3:18',
    bpm: 112,
    key: 'A Min',
    url: 'https://res.cloudinary.com/dw3lf8roj/video/upload/v1771383681/GulfbreezehittinsunlowinthewestCoverCoverRemastered_abp0hc.mp3',
    coverArt: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    genre: 'Melodic Latin Pop / Rhythmic Romance',
    year: '2025',
    story: 'Written in Brownsville, Texas on a regular afternoon while walking down the street to the store. Out of nowhere, I saw a girl who completely stopped me in my tracks—it was not just how captivating she looked, but the effortless grace and presence in the way she carried herself that words could barely explain. It was a fleeting, serendipitous moment with someone I knew I would likely never cross paths with again, but the impression hit so hard that the moment I got home, the song wrote itself.',
    whyWrittenOrRemixed: 'I wrote this to capture the sudden rush and bittersweet honesty of an unforgettable chance encounter. The arrangement pairs driving acoustic rhythms with bright melodic hooks and punchy Latin percussive drive, echoing the racing heartbeat of watching a total stranger walk by and having time freeze in Brownsville.',
    personality: 'Magnetic, honest, and driving. It balances raw romantic nostalgia with an infectious, sun-drenched Latin pop groove.',
    mood: 'Nostalgic, Electric & Unfiltered',
    lyricsSnippet: '“Te vi pasar como un destello en la multitud... y supe que nada volvería a ser igual.”',
    tags: ['Brownsville Texas', 'Chance Encounter', 'Latin Pop', 'Acoustic Guitar', 'Driving Rhythm', 'True Story'],
    vocalHeritage: 'Expressive dynamic vocal delivery, honoring rhythmic storytelling and melodic passion.'
  },
  {
    id: 't-yo-te-voy-a-amar',
    title: 'Yo Te Voy a Amar (Remix)',
    artist: 'María Becerra x Christian Kota',
    duration: '3:52',
    bpm: 96,
    key: 'D Maj',
    url: '/assets/audio/Yo%20Te%20Voy%20A%20Amar.wav',
    coverArt: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    genre: 'Latin Urban Pop / Cinematic Ballad Remix',
    year: '2025',
    story: 'An impassioned, devotional remix crafted for Argentine singer-songwriter María de los Ángeles Becerra—widely hailed as a leading voice in Argentina’s urban pop movement and an 8-time Latin Grammy nominee (including Best New Artist). The track serves as a monumental oath of unwavering loyalty and shelter, elevating romantic devotion into a sacred, unbreakable promise.',
    whyWrittenOrRemixed: 'I set out to re-imagine María Becerra’s evocative vocal essence through a wider cinematic lens. I reconstructed the harmonic foundation with soaring symphonic string arrangements, resonant 808 sub-bass foundations, and crisp acoustic percussive transients—balancing the raw emotional intimacy of Argentine urban pop with the grand scale of an arena ballad.',
    personality: 'Soulful, monumental, and deeply devotional. It radiates the power of an unyielding anchor in a storm—warm, emotionally resonant, and architecturally vast.',
    mood: 'Devotional, Cinematic & Heartfelt',
    lyricsSnippet: '“En cada tormenta y en cada amanecer... pase lo que pase, yo te voy a amar.”',
    tags: ['María Becerra', 'Latin Grammy Tribute', 'Argentine Urban Pop', 'Cinematic Ballad', '808 Sub-Bass', 'Orchestral Strings', 'Devotional Anthem'],
    vocalHeritage: 'Channeling generational vocal depth and melodic intuition, honoring family singing roots alongside modern Latin urban mastery.'
  },
  {
    id: 't-reloj-en-pausa',
    title: 'Reloj En Pausa',
    artist: 'Christian Kota',
    duration: '3:45',
    bpm: 128,
    key: 'C Min',
    url: '/assets/audio/reloj-en-pausa.mp3',
    coverArt: 'https://dl.dropboxusercontent.com/scl/fi/ftiic0zddislyn93ot3tt/reloj-en-pausa.jpg?rlkey=87z4zudfgfdqfwhhz2ephbm3k&st=feuytcpa&raw=1',
    genre: 'Electronic / Latin Tech-House Hybrid',
    year: '2024',
    story: 'Born from the concept of buying back time and escaping the relentless grind. When you reclaim your autonomy, the ticking clock stops dictating your worth. It represents personal sovereignty and living in the present moment.',
    whyWrittenOrRemixed: 'Engineered with driving 128 BPM kinetic energy, pulsing basslines, and filtered time-stretching vocal chops to literally mimic the sound of a clock breaking out of its mechanical cadence.',
    personality: 'Kinetic, cerebral, and empowering. A high-energy anthem for self-liberation and mental focus.',
    mood: 'Energetic, Resilient & Liberating',
    lyricsSnippet: '“El tiempo ya no manda aquí... el reloj se queda en pausa.”',
    tags: ['128 BPM', 'Electronic Fusion', 'Time Sovereignty', 'Kinetic Bass', 'Autonomy'],
    vocalHeritage: 'Modern rhythmic processing blended with natural pitch dynamics.'
  },
  {
    id: 't-made-it-down-to-texas',
    title: 'Made It Down to Texas',
    artist: 'Christian Kota',
    duration: '4:12',
    bpm: 85,
    key: 'G Maj',
    url: '/assets/audio/Made%20it%20%20Down%20to%20Texas.wav',
    coverArt: 'https://res.cloudinary.com/dw3lf8roj/image/upload/v1771383823/made_it_down_to_texas_cover_photo_otzbew.jpg',
    genre: 'Americana / Southern Country-Rock',
    year: '2024',
    story: 'A raw tribute to Southern resilience, highway miles, open horizon lines, and escaping hardships to find a fresh start. The sun sinking low over the Gulf breeze as you cross the border into Texas.',
    whyWrittenOrRemixed: 'A return to acoustic country-rock storytelling, dirty slide guitars, and unvarnished vocal grit that connects to Christian’s rural Georgia roots and welding days.',
    personality: 'Grounded, gritty, and reflective. Authentic Southern storytelling with highway wind in its hair.',
    mood: 'Nostalgic, Gritty & Triumphant',
    lyricsSnippet: '“Gulf breeze hittin’, sun low in the west... left the ghosts behind, made it down to Texas.”',
    tags: ['Americana', 'Country Rock', 'Acoustic Slide', 'Highway Song', 'Georgia to Texas'],
    vocalHeritage: 'Authentic Southern timbre handed down directly from family roots in Georgia.'
  },
  {
    id: 't-perfecta-por-diseno',
    title: 'Perfecta por Diseño',
    artist: 'Christian Kota',
    duration: '3:30',
    bpm: 115,
    key: 'E Min',
    url: '/assets/audio/1Perfecta%20por%20Dise%C3%B1o.mp3',
    coverArt: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=80',
    genre: 'Latin Pop / Romantic',
    year: '2025',
    story: 'A testament to appreciating someone precisely the way they are built. It speaks to the awe of realizing that true perfection isn’t found in flawlessness, but in the unique and authentic design of the person standing right in front of you.',
    whyWrittenOrRemixed: 'To capture the undeniable electricity of observing someone in their truest element, accompanied by bright guitars and driving rhythms that mimic the excitement of new admiration.',
    personality: 'Uplifting, admiring, and rhythmic.',
    mood: 'Romantic, Vibrant & Admiring',
    lyricsSnippet: '“No cambiaría un solo detalle... perfecta por diseño.”',
    tags: ['Latin Pop', 'Admiration', 'Rhythmic', 'Romantic Anthem'],
    vocalHeritage: 'Harmonic warmth with a dynamic pop delivery.'
  },
  {
    id: 't-bajo-el-mismo-cielo',
    title: 'Bajo El Mismo Cielo',
    artist: 'Christian Kota',
    duration: '3:45',
    bpm: 92,
    key: 'C Maj',
    url: '/assets/audio/Bajo%20el%20mismo%20cielo.wav',
    coverArt: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    genre: 'Acoustic / Latin Ballad',
    year: '2025',
    story: 'Written as a comforting reminder that no matter the physical distance separating two people, they still share the same moon and the same sky. It is about emotional proximity defying geographical barriers.',
    whyWrittenOrRemixed: 'Stripped down to essential acoustics and an emotional vocal performance, designed to feel like an intimate conversation across thousands of miles.',
    personality: 'Intimate, reassuring, and expansive.',
    mood: 'Reassuring, Melancholic & Deep',
    lyricsSnippet: '“Aunque estés lejos... dormimos bajo el mismo cielo.”',
    tags: ['Acoustic', 'Long Distance', 'Intimate', 'Ballad'],
    vocalHeritage: 'Deep emotional resonance and traditional ballad phrasing.'
  },
  {
    id: 't-cruzar-contigo',
    title: 'Cruzar Contigo',
    artist: 'Christian Kota',
    duration: '3:10',
    bpm: 108,
    key: 'F Maj',
    url: '/assets/audio/Cruzar%20Contigo.wav',
    coverArt: 'https://images.unsplash.com/photo-1493225457124-a312410e53a2?auto=format&fit=crop&w=1200&q=80',
    genre: 'Urban Pop / Reggaeton Fusion',
    year: '2025',
    story: 'An upbeat, confident track about taking a leap of faith with someone special. Crossing lines, crossing borders, and crossing paths at the exact right moment in time.',
    whyWrittenOrRemixed: 'Driven by heavy syncopation and a modern dembow-inspired beat, blending storytelling with a danceable, forward-moving momentum.',
    personality: 'Bold, adventurous, and danceable.',
    mood: 'Confident, Energetic & Direct',
    lyricsSnippet: '“No me importa el destino... yo solo quiero cruzar contigo.”',
    tags: ['Urban Pop', 'Dembow', 'Adventure', 'Leap of Faith'],
    vocalHeritage: 'Modern rhythmic delivery with smooth melodic transitions.'
  },
  {
    id: 't-manos-que-oran',
    title: 'Manos Que Oran',
    artist: 'Christian Kota',
    duration: '4:05',
    bpm: 78,
    key: 'A Min',
    url: '/assets/audio/Manos%20que%20Oran%20(Official).wav',
    coverArt: 'https://images.unsplash.com/photo-1544812836-3914a87a8b41?auto=format&fit=crop&w=1200&q=80',
    genre: 'Gospel / Inspirational Acoustic',
    year: '2025',
    story: 'A tribute to the powerful, silent resilience found in prayer and faith. It honors the unwavering strength of the matriarchs and figures in my life whose folded hands held our family together during the hardest times.',
    whyWrittenOrRemixed: 'A soulful, raw composition focusing on piano, acoustic guitar, and choir-like harmonies to reflect the spiritual foundation that kept me grounded through turbulent years.',
    personality: 'Spiritual, profound, and healing.',
    mood: 'Reverent, Soulful & Grounding',
    lyricsSnippet: '“En el silencio de la noche... son esas manos que oran las que me sostienen.”',
    tags: ['Inspirational', 'Faith', 'Family', 'Acoustic Soul'],
    vocalHeritage: 'Channeling the gospel and spiritual roots of Southern upbringing.'
  },
  {
    id: 't-midnight-uber',
    title: 'Midnight Uber',
    artist: 'Christian Kota',
    duration: '2:55',
    bpm: 120,
    key: 'D Min',
    url: '/assets/audio/Midnight%20Uber.wav',
    coverArt: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',
    genre: 'Synthwave / R&B Trap',
    year: '2025',
    story: 'The surreal, cinematic feeling of watching city lights blur past the window in the backseat of a car at 3 AM. It’s about the thoughts that keep you awake when the rest of the world is asleep.',
    whyWrittenOrRemixed: 'Produced with thick 808s, arpeggiated retro synths, and a steady driving beat that perfectly encapsulates late-night transit and isolation.',
    personality: 'Sleek, nocturnal, and slightly detached.',
    mood: 'Late-Night, Cinematic & Hypnotic',
    lyricsSnippet: '“Luces de neón borrosas... a solas en el asiento de atrás.”',
    tags: ['Synthwave', 'Late Night', '808s', 'City Lights'],
    vocalHeritage: 'Smooth R&B phrasing mixed with atmospheric processing.'
  },
  {
    id: 't-tapped-out',
    title: 'Tapped Out',
    artist: 'Christian Kota',
    duration: '3:20',
    bpm: 140,
    key: 'B Min',
    url: '/assets/audio/Tapped_Out.wav',
    coverArt: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80',
    genre: 'Alternative Rap / High-Energy Drill',
    year: '2025',
    story: 'An anthem of exhaustion turned into defiance. When you’ve given everything you have, but you dig deep to find one more reserve of energy. It’s about fighting through burnout and refusing to stay down.',
    whyWrittenOrRemixed: 'Aggressive, fast-paced percussion and heavy bass meant to serve as the ultimate workout or grind-mode track. It’s raw, unapologetic adrenaline.',
    personality: 'Fierce, relentless, and unyielding.',
    mood: 'Aggressive, Defiant & Adrenaline-fueled',
    lyricsSnippet: '“Thought I was tapped out... but I just found another gear.”',
    tags: ['Drill', 'High Energy', 'Defiance', 'Grind Mode'],
    vocalHeritage: 'Fast-paced rhythmic delivery showcasing versatility.'
  },
  {
    id: 't-future-mother-in-law',
    title: 'Future Mother-in-Law',
    artist: 'Christian Kota',
    duration: '3:05',
    bpm: 98,
    key: 'G Maj',
    url: '/assets/audio/future-mother-in%20law.wav',
    coverArt: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    genre: 'Pop Country / Singer-Songwriter',
    year: '2025',
    story: 'A lighthearted, charming acoustic track written from the perspective of trying to win over the parents. It’s playful, honest, and captures the nerve-wracking yet sweet process of showing you’re the right guy.',
    whyWrittenOrRemixed: 'Built on a catchy acoustic guitar riff and conversational lyrics. It’s meant to bring a smile and show a more playful, grounded side of romance.',
    personality: 'Charming, earnest, and playful.',
    mood: 'Lighthearted, Earnest & Sweet',
    lyricsSnippet: '“I know I’m rough around the edges... but I’ll treat her like a queen.”',
    tags: ['Country Pop', 'Acoustic', 'Storytelling', 'Playful'],
    vocalHeritage: 'Classic Southern charm and conversational vocal delivery.'
  }
];

export const MOCK_COMMITS: GitCommit[] = [
  { id: '7f3a1b', message: 'feat: implement SBOM generation pipeline', date: '2 hrs ago', repo: 'secure-supply-chain' },
  { id: '9c2d4e', message: 'fix: NIST AI RMF audit logging', date: '5 hrs ago', repo: 'intelligence-fusion-core' },
  { id: '1a8b3c', message: 'refactor: MITRE ATT&CK mapping logic', date: '1 day ago', repo: 'threat-detection-engine' },
  { id: '4d5e6f', message: 'docs: update SLSA compliance artifacts', date: '2 days ago', repo: 'infrastructure-as-code' },
];

export const GENEALOGY_DATA: GenealogyData = {
  nodes: [
    // 1. IMMEDIATE FAMILY (Modern)
    { id: "Christian Kota", label: "Timothy Christian Spurlin", group: 1, verifiedLevel: 10, birthYear: 1993 },
    { id: "Zachary Spurlin", label: "Zachary Spurlin (Brother)", group: 1, verifiedLevel: 10, birthYear: 1996 },
    { id: "Timothy Leo Spurlin", label: "Timothy Leo Spurlin (Father)", group: 1, verifiedLevel: 10, birthYear: 1969 },
    { id: "Mother", label: "Mother (Native American Descent)", group: 1, verifiedLevel: 10, birthYear: 1970 }, // Est birth
    
    // 2. PATERNAL LINE (McCoy / Croft / Spurlin)
    { id: "Aldwin Leo McCoy", label: "Aldwin 'Leo' McCoy", group: 2, verifiedLevel: 10, birthYear: 1948, deathYear: 2000 },
    { id: "Eugene McCoy", label: "Eugene 'Gene' McCoy", group: 2, verifiedLevel: 9, birthYear: 1916, deathYear: 1974 },
    { id: "Betty Merle Croft", label: "Betty Merle Byrum (Grandma)", group: 2, verifiedLevel: 10, birthYear: 1920, deathYear: 2012 }, // Est
    { id: "Jim Byrum", label: "Grandpa Jim Byrum (Guardian)", group: 1, verifiedLevel: 10, birthYear: 1928, deathYear: 2012 },
    { id: "Ronnie Croft", label: "Great-Uncle Ronnie", group: 2, verifiedLevel: 10, birthYear: 1945 }, // Est
    { id: "Laura", label: "Aunt Laura", group: 2, verifiedLevel: 10, birthYear: 1950 }, // Est
    { id: "Robert", label: "Cousin Robert", group: 2, verifiedLevel: 9, birthYear: 1975 }, // Est
    { id: "Tish Benavides", label: "Aunt Tish (McCoy)", group: 2, verifiedLevel: 9, birthYear: 1970 }, // Est
    
    // 3. MATERNAL LINE (Extended)
    { id: "Maternal Grandmother", group: 3, verifiedLevel: 9, birthYear: 1945 }, // Est
    { id: "Native American Grandfather", group: 3, verifiedLevel: 8, birthYear: 1940, deathYear: 1990 }, // Est
    { id: "Connie", label: "Aunt Connie", group: 3, verifiedLevel: 10, birthYear: 1965 }, // Est
    { id: "Charlene", label: "Aunt Charlene", group: 3, verifiedLevel: 10, birthYear: 1960 }, // Est
    { id: "Jay", label: "Uncle Jay", group: 3, verifiedLevel: 9, birthYear: 1965 }, // Est
    { id: "Dave", label: "Dave (The Welder)", group: 3, verifiedLevel: 9, birthYear: 1960 }, // Est
    { id: "Hali", label: "Cousin Hali", group: 3, verifiedLevel: 9, birthYear: 1990 }, // Est
    { id: "Laci", label: "Cousin Laci", group: 3, verifiedLevel: 9, birthYear: 1992 }, // Est

    // 4. DEEP ANCESTRY (Historical)
    { id: "William M.C. McCoy", group: 4, verifiedLevel: 9, birthYear: 1830, deathYear: 1925 },
    { id: "John McCoy", group: 4, verifiedLevel: 8, birthYear: 1748, deathYear: 1790 },
    { id: "Ian Muiderteach", label: "Ian Muiderteach (The Wolf)", group: 4, verifiedLevel: 9, birthYear: 1502, deathYear: 1584, title: "8th Chief of Clanranald" },
    { id: "Lady Ruth le Poer", label: "Lady Ruth (Baroness)", group: 4, verifiedLevel: 9, birthYear: 1598, deathYear: 1643 },
  ],
  links: [
    // Immediate
    { source: "Timothy Leo Spurlin", target: "Christian Kota", value: 1, type: "biological" },
    { source: "Mother", target: "Christian Kota", value: 1, type: "biological" },
    { source: "Timothy Leo Spurlin", target: "Zachary Spurlin", value: 1, type: "biological" },
    { source: "Mother", target: "Zachary Spurlin", value: 1, type: "biological" },

    // Paternal
    { source: "Aldwin Leo McCoy", target: "Timothy Leo Spurlin", value: 1, type: "biological" },
    { source: "Eugene McCoy", target: "Aldwin Leo McCoy", value: 1, type: "biological" },
    { source: "Betty Merle Croft", target: "Aldwin Leo McCoy", value: 1, type: "biological" },
    { source: "Jim Byrum", target: "Christian Kota", value: 5, type: "adoptive" }, // Guardian Role
    { source: "Ronnie Croft", target: "Betty Merle Croft", value: 2, type: "biological" }, // Sibling
    { source: "Laura", target: "Ronnie Croft", value: 2, type: "marriage" }, // Partner
    { source: "Laura", target: "Robert", value: 1, type: "biological" },
    { source: "Aldwin Leo McCoy", target: "Tish Benavides", value: 1, type: "biological" },

    // Maternal
    { source: "Maternal Grandmother", target: "Mother", value: 1, type: "biological" },
    { source: "Native American Grandfather", target: "Mother", value: 1, type: "biological" },
    { source: "Maternal Grandmother", target: "Connie", value: 1, type: "biological" },
    { source: "Maternal Grandmother", target: "Charlene", value: 1, type: "biological" },
    { source: "Connie", target: "Hali", value: 1, type: "biological" },
    { source: "Connie", target: "Laci", value: 1, type: "biological" },
    { source: "Jay", target: "Hali", value: 1, type: "biological" },
    { source: "Jay", target: "Laci", value: 1, type: "biological" },
    { source: "Dave", target: "Connie", value: 2, type: "marriage" }, // Partner
    { source: "Dave", target: "Christian Kota", value: 5, type: "adoptive" }, // Guardian/Mentor

    // Deep
    { source: "William M.C. McCoy", target: "Eugene McCoy", value: 2, type: "biological" },
    { source: "John McCoy", target: "William M.C. McCoy", value: 3, type: "biological" },
    { source: "Ian Muiderteach", target: "John McCoy", value: 4, type: "biological" }
  ]
};