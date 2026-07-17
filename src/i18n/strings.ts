export type Lang = 'es' | 'en';

export interface SkillItem {
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'cursed';
  tip: string;
}

const es = {
  meta: {
    title: 'Unai Guerra Matas — Desarrollador de Software',
    description:
      'Portfolio de Unai Guerra Matas, desarrollador de software multiplataforma: escritorio, web y móvil (.NET, Android). Automatización de procesos e IA.',
  },
  hud: {
    brand: 'UNAI.G',
    nav: [
      { id: 'about', label: 'PERFIL' },
      { id: 'experience', label: 'EXPERIENCIA' },
      { id: 'skills', label: 'STACK' },
      { id: 'projects', label: 'PROYECTOS' },
      { id: 'contact', label: 'CONTACTO' },
    ],
    langTarget: '/en/',
    langLabel: 'EN',
    themeLabel: 'Cambiar tema',
    menuLabel: 'Abrir menú',
    menuCloseLabel: 'Cerrar menú',
  },
  hero: {
    eyebrow: 'PORTFOLIO — 2026',
    name: 'UNAI GUERRA',
    role: 'DESARROLLADOR DE SOFTWARE',
    tagline: 'Construyo software multiplataforma.',
    cta1: 'VER PROYECTOS',
    cta2: 'CONTACTO',
    ticker: [
      'APPS MULTIPLATAFORMA',
      'AUTOMATIZACIÓN DE PROCESOS',
      '.NET',
      'ANDROID NATIVO',
      'IA: EN PROGRESO',
      'BUGS: LOS JUSTOS',
    ],
  },
  about: {
    tag: '01 — PERFIL',
    title: 'SOBRE MÍ',
    bio: 'Especialista en desarrollo de aplicaciones multiplataforma y automatización de procesos. Escritorio, web y móvil (Android/iOS), con base sólida en .NET. Ahora mismo: profundizando en Inteligencia Artificial.',
    bioAside: '«Hago que los ordenadores hagan el trabajo aburrido.»',
    stats: [
      { key: 'ROL', value: 'Dev Multiplataforma' },
      { key: 'FOCO', value: 'Automatización · .NET' },
      { key: 'AHORA', value: 'Inteligencia Artificial' },
      { key: 'ÁMBITOS', value: 'Escritorio · Web · Móvil' },
    ],
    portraitHint: 'AÑADE portrait.jpg → src/assets/',
    portraitHover: 'HOVER = ASCII',
    portraitTap: 'TOCA = ASCII',
  },
  experience: {
    tag: '02 — TRAYECTORIA',
    title: 'EXPERIENCIA',
    now: {
      label: 'AHORA MISMO',
      name: 'Especialización en IA',
      note: 'Integrando modelos avanzados para mejorar la eficiencia empresarial.',
    },
    entries: [
      {
        date: '03/2026 — 05/2026',
        company: 'AYCE LABORYTAX',
        role: 'Prácticas — Desarrollo de Software',
        log: [
          'Diseño y desarrollo de aplicaciones internas con .NET.',
          'Automatización de tareas recurrentes con Power Automate.',
          'Análisis de requisitos y propuestas de mejora.',
        ],
        stack: ['.NET', 'Power Automate'],
      },
      {
        date: '05/2025',
        company: 'Kanzan Tech (OutSystems)',
        role: 'Prácticas — Desarrollo low-code',
        log: [
          'Desarrollo y mantenimiento de aplicaciones con OutSystems.',
          'Formularios, lógica y consumo de APIs REST.',
        ],
        stack: ['OutSystems', 'APIs REST'],
      },
    ],
    stackLabel: 'STACK',
  },
  skills: {
    tag: '03 — STACK',
    title: 'SKILLS',
    note: 'Pasa el cursor por un elemento para inspeccionarlo.',
    rarities: {
      common: 'COMÚN',
      rare: 'RARO',
      epic: 'ÉPICO',
      legendary: 'LEGENDARIO',
      cursed: 'MALDITO',
    },
    categories: [
      {
        name: 'Lenguajes',
        items: [
          { name: 'Java', rarity: 'epic', tip: 'Fiable desde el primer día. Nunca falla, nunca sorprende.' },
          { name: 'Kotlin', rarity: 'rare', tip: 'Java con menos ceremonia. +20% de alegría en Android.' },
          { name: 'JavaScript', rarity: 'common', tip: 'Arma de doble filo. Literalmente.' },
          { name: 'Python', rarity: 'rare', tip: 'Invoca IA. A veces responde.' },
        ] as SkillItem[],
      },
      {
        name: 'Backend',
        items: [
          { name: '.NET', rarity: 'epic', tip: 'Armadura corporativa. +15 DEF, +30 empleabilidad.' },
          { name: 'Node.js', rarity: 'common', tip: 'Un solo hilo. Cero miedo.' },
          { name: 'Spring Boot', rarity: 'rare', tip: 'Arranque lento. Gran poder.' },
        ] as SkillItem[],
      },
      {
        name: 'Frontend',
        items: [
          { name: 'React', rarity: 'common', tip: 'Se re-renderiza cuando quiere.' },
          { name: 'HTML5', rarity: 'common', tip: 'No es un lenguaje de programación. No empieces.' },
          { name: 'CSS3', rarity: 'cursed', tip: 'Centrar un div sigue dando experiencia.' },
          { name: 'Bootstrap', rarity: 'common', tip: 'Reliquia venerable. Aún funciona.' },
        ] as SkillItem[],
      },
      {
        name: 'Móvil',
        items: [
          { name: 'Android', rarity: 'epic', tip: 'Terreno principal. Se conoce todos los atajos.' },
          { name: 'Jetpack Compose', rarity: 'rare', tip: 'Interfaces declarativas. El XML descansa en paz.' },
        ] as SkillItem[],
      },
      {
        name: 'Datos',
        items: [
          { name: 'SQL', rarity: 'rare', tip: 'SELECT * FROM excusas WHERE valida = 1; → 0 rows' },
          { name: 'Oracle', rarity: 'legendary', tip: 'El jefe final cobra entrada.' },
        ] as SkillItem[],
      },
      {
        name: 'Herramientas',
        items: [
          { name: 'Git / GitHub', rarity: 'legendary', tip: 'Máquina del tiempo. No preguntes por el force push.' },
          { name: 'Power Automate', rarity: 'rare', tip: 'Automatiza el aburrimiento.' },
          { name: 'VS Code', rarity: 'common', tip: 'Campamento base.' },
        ] as SkillItem[],
      },
    ],
  },
  projects: {
    tag: '04 — TRABAJO',
    title: 'PROYECTOS',
    repoLabel: 'VER REPO',
    entries: [
      {
        title: 'English With Alex',
        kind: 'App móvil / Educación',
        description:
          'Diccionario para estudiar inglés con búsqueda rápida, favoritos y modo práctica. Incluye estadísticas de repaso diario.',
        aside: 'Los verbos irregulares no se aprenden solos.',
        stack: ['Android', 'Jetpack Compose', 'SQLite'],
        link: 'https://github.com/Yunii226',
      },
    ],
    next: 'ESPACIO RESERVADO — siguiente proyecto en compilación',
    imageHint: 'AÑADE captura → src/assets/projects/',
  },
  contact: {
    tag: '05 — CONTACTO',
    title: 'HABLAMOS',
    subtitle: 'Respondo rápido. Ping bajo.',
    links: [
      { label: 'GITHUB', value: 'github.com/Yunii226', url: 'https://github.com/Yunii226' },
      {
        label: 'LINKEDIN',
        value: 'in/unai-guerra',
        url: 'https://www.linkedin.com/in/unai-guerra-matas-918a87384',
      },
      { label: 'EMAIL', value: 'guerramatasunai@gmail.com', url: 'mailto:guerramatasunai@gmail.com' },
    ],
    stats: {
      session: 'SESIÓN',
      cookies: 'COOKIES: 0 (no usamos)',
      copyright: '© 2026 UNAI GUERRA MATAS',
    },
  },
  konami: 'CÓDIGO SECRETO ACEPTADO. Que aproveche.',
};

const en: typeof es = {
  meta: {
    title: 'Unai Guerra Matas — Software Developer',
    description:
      'Portfolio of Unai Guerra Matas, cross-platform software developer: desktop, web and mobile (.NET, Android). Process automation and AI.',
  },
  hud: {
    brand: 'UNAI.G',
    nav: [
      { id: 'about', label: 'PROFILE' },
      { id: 'experience', label: 'EXPERIENCE' },
      { id: 'skills', label: 'STACK' },
      { id: 'projects', label: 'PROJECTS' },
      { id: 'contact', label: 'CONTACT' },
    ],
    langTarget: '/',
    langLabel: 'ES',
    themeLabel: 'Toggle theme',
    menuLabel: 'Open menu',
    menuCloseLabel: 'Close menu',
  },
  hero: {
    eyebrow: 'PORTFOLIO — 2026',
    name: 'UNAI GUERRA',
    role: 'SOFTWARE DEVELOPER',
    tagline: 'I build cross-platform software.',
    cta1: 'VIEW PROJECTS',
    cta2: 'CONTACT',
    ticker: [
      'CROSS-PLATFORM APPS',
      'PROCESS AUTOMATION',
      '.NET',
      'NATIVE ANDROID',
      'AI: IN PROGRESS',
      'BUGS: A REASONABLE AMOUNT',
    ],
  },
  about: {
    tag: '01 — PROFILE',
    title: 'ABOUT ME',
    bio: 'Specialist in cross-platform application development and process automation. Desktop, web and mobile (Android/iOS), with a solid .NET foundation. Currently: going deep on Artificial Intelligence.',
    bioAside: '“I make computers do the boring work.”',
    stats: [
      { key: 'ROLE', value: 'Cross-platform Dev' },
      { key: 'FOCUS', value: 'Automation · .NET' },
      { key: 'NOW', value: 'Artificial Intelligence' },
      { key: 'DOMAINS', value: 'Desktop · Web · Mobile' },
    ],
    portraitHint: 'ADD portrait.jpg → src/assets/',
    portraitHover: 'HOVER = ASCII',
    portraitTap: 'TAP = ASCII',
  },
  experience: {
    tag: '02 — TRACK RECORD',
    title: 'EXPERIENCE',
    now: {
      label: 'RIGHT NOW',
      name: 'AI Specialization',
      note: 'Integrating advanced models to improve business efficiency.',
    },
    entries: [
      {
        date: '03/2026 — 05/2026',
        company: 'AYCE LABORYTAX',
        role: 'Internship — Software Development',
        log: [
          'Design and development of internal applications with .NET.',
          'Automation of recurring tasks with Power Automate.',
          'Requirements analysis and improvement proposals.',
        ],
        stack: ['.NET', 'Power Automate'],
      },
      {
        date: '05/2025',
        company: 'Kanzan Tech (OutSystems)',
        role: 'Internship — Low-code Development',
        log: [
          'Development and maintenance of OutSystems applications.',
          'Forms, logic and REST API consumption.',
        ],
        stack: ['OutSystems', 'REST APIs'],
      },
    ],
    stackLabel: 'STACK',
  },
  skills: {
    tag: '03 — STACK',
    title: 'SKILLS',
    note: 'Hover an item to inspect it.',
    rarities: {
      common: 'COMMON',
      rare: 'RARE',
      epic: 'EPIC',
      legendary: 'LEGENDARY',
      cursed: 'CURSED',
    },
    categories: [
      {
        name: 'Languages',
        items: [
          { name: 'Java', rarity: 'epic', tip: 'Reliable since day one. Never fails, never surprises.' },
          { name: 'Kotlin', rarity: 'rare', tip: 'Java with less ceremony. +20% joy on Android.' },
          { name: 'JavaScript', rarity: 'common', tip: 'Double-edged weapon. Literally.' },
          { name: 'Python', rarity: 'rare', tip: 'Summons AI. Sometimes it answers.' },
        ] as SkillItem[],
      },
      {
        name: 'Backend',
        items: [
          { name: '.NET', rarity: 'epic', tip: 'Corporate armor. +15 DEF, +30 employability.' },
          { name: 'Node.js', rarity: 'common', tip: 'One thread. Zero fear.' },
          { name: 'Spring Boot', rarity: 'rare', tip: 'Slow to boot. Great power.' },
        ] as SkillItem[],
      },
      {
        name: 'Frontend',
        items: [
          { name: 'React', rarity: 'common', tip: 'Re-renders when it feels like it.' },
          { name: 'HTML5', rarity: 'common', tip: 'Not a programming language. Don’t start.' },
          { name: 'CSS3', rarity: 'cursed', tip: 'Centering a div still grants experience.' },
          { name: 'Bootstrap', rarity: 'common', tip: 'Venerable relic. Still works.' },
        ] as SkillItem[],
      },
      {
        name: 'Mobile',
        items: [
          { name: 'Android', rarity: 'epic', tip: 'Home turf. Knows every shortcut.' },
          { name: 'Jetpack Compose', rarity: 'rare', tip: 'Declarative UI. XML rests in peace.' },
        ] as SkillItem[],
      },
      {
        name: 'Data',
        items: [
          { name: 'SQL', rarity: 'rare', tip: 'SELECT * FROM excuses WHERE valid = 1; → 0 rows' },
          { name: 'Oracle', rarity: 'legendary', tip: 'The final boss charges admission.' },
        ] as SkillItem[],
      },
      {
        name: 'Tools',
        items: [
          { name: 'Git / GitHub', rarity: 'legendary', tip: 'Time machine. Don’t ask about the force push.' },
          { name: 'Power Automate', rarity: 'rare', tip: 'Automates boredom.' },
          { name: 'VS Code', rarity: 'common', tip: 'Base camp.' },
        ] as SkillItem[],
      },
    ],
  },
  projects: {
    tag: '04 — WORK',
    title: 'PROJECTS',
    repoLabel: 'VIEW REPO',
    entries: [
      {
        title: 'English With Alex',
        kind: 'Mobile app / Education',
        description:
          'Dictionary app for studying English with quick search, favorites and practice mode. Includes daily review statistics.',
        aside: 'Irregular verbs don’t learn themselves.',
        stack: ['Android', 'Jetpack Compose', 'SQLite'],
        link: 'https://github.com/Yunii226',
      },
    ],
    next: 'RESERVED SPACE — next project compiling',
    imageHint: 'ADD screenshot → src/assets/projects/',
  },
  contact: {
    tag: '05 — CONTACT',
    title: 'LET’S TALK',
    subtitle: 'Fast replies. Low ping.',
    links: [
      { label: 'GITHUB', value: 'github.com/Yunii226', url: 'https://github.com/Yunii226' },
      {
        label: 'LINKEDIN',
        value: 'in/unai-guerra',
        url: 'https://www.linkedin.com/in/unai-guerra-matas-918a87384',
      },
      { label: 'EMAIL', value: 'guerramatasunai@gmail.com', url: 'mailto:guerramatasunai@gmail.com' },
    ],
    stats: {
      session: 'SESSION',
      cookies: 'COOKIES: 0 (none used)',
      copyright: '© 2026 UNAI GUERRA MATAS',
    },
  },
  konami: 'SECRET CODE ACCEPTED. Enjoy the cake.',
};

export const strings: Record<Lang, typeof es> = { es, en };
