export const site = {
  name: 'Jahid Bappi',
  fullName: 'Md. Jahidul Islam',
  title: 'Full-Stack Engineer & AI Builder',
  tagline: 'Problem first. Code second.',
  description:
    'Full-stack engineer shipping production web apps, AI tools, and 29+ Android products — from architecture to deployment.',
  githubUsername: 'jahidbappi',
  profileImage: '/assets/profile.jpg',
  resumeUrl: 'https://github.com/jahidbappi',
  social: {
    github: 'https://github.com/jahidbappi',
    linkedin: 'https://linkedin.com/in/jahidbappi',
    email: 'jahidcric2000@gmail.com',
    medium: 'https://medium.com/@jahidcric2000',
    twitter: 'https://twitter.com/jahidbappi_',
    location: 'Bangladesh',
  },
  focus: ['PyTorch', 'AWS Certification', 'Microservices'],
  availability: 'Open to full-time & contract roles',
};

export const heroStats = [
  { value: '13+', label: 'Open-source repos' },
  { value: '29+', label: 'Play Store apps' },
  { value: '5+', label: 'Live web products' },
  { value: '4+', label: 'Certifications' },
];

export const aboutBento = [
  {
    id: 'who',
    title: 'Who I am',
    body: 'Full-stack engineer from Bangladesh. I design systems that survive contact with real users — not demo-day prototypes.',
    accent: 'border-l-white',
    span: 'md:col-span-2',
  },
  {
    id: 'mission',
    title: 'Current mission',
    body: 'Ship products that combine clean engineering, thoughtful UX, and measurable business impact.',
    accent: 'border-l-emerald-400',
    span: 'md:col-span-1',
  },
  {
    id: 'stack',
    title: 'Core stack',
    body: 'React, Node.js, TypeScript, Python, PostgreSQL, and production deployment on Vercel & AWS.',
    accent: 'border-l-blue-400',
    span: 'md:col-span-1',
  },
  {
    id: 'learning',
    title: 'Learning journey',
    body: 'Computer science foundations → full-stack web → AI/ML integrations → mobile at scale on Google Play.',
    accent: 'border-l-violet-400',
    span: 'md:col-span-1',
  },
  {
    id: 'ai',
    title: 'AI interests',
    body: 'LLM-powered dev tools, code review automation, and practical ML pipelines that ship — not research for research’s sake.',
    accent: 'border-l-amber-400',
    span: 'md:col-span-2',
  },
  {
    id: 'mobile',
    title: 'Mobile development',
    body: '29 published Android apps across business, games, and utilities — Kotlin, privacy-first architecture, Play Store production.',
    accent: 'border-l-rose-400',
    span: 'md:col-span-2',
  },
  {
    id: 'facts',
    title: 'Quick facts',
    body: 'Oracle & AWS certified · TensorFlow Developer · Team lead on university full-stack projects · Obsessed learner.',
    accent: 'border-l-zinc-500',
    span: 'md:col-span-1',
  },
];

export const skillGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'Layout',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML & CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'Server',
    skills: ['Node.js', 'Python', 'Django', 'Flask', 'REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    icon: 'Smartphone',
    skills: ['Android', 'Kotlin', 'Google Play', 'Privacy-first UX', 'Offline-first'],
  },
  {
    id: 'ai',
    label: 'AI',
    icon: 'Brain',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'LLM integrations', 'Pandas', 'NumPy'],
  },
  {
    id: 'tools',
    label: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Cursor', 'Postman', 'Android Studio'],
  },
];

export type ProjectCaseStudy = {
  slug: string;
  name: string;
  category: 'web' | 'ai' | 'mobile';
  featured?: boolean;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  github?: string;
  live?: string;
  play?: string;
  image: string;
  imageAlt: string;
};

export const featuredProject: ProjectCaseStudy = {
  slug: 'vibeflow',
  name: 'VibeFlow',
  category: 'web',
  featured: true,
  problem:
    'Independent software creators needed a polished storefront without building commerce infrastructure from scratch.',
  solution:
    'Designed and shipped a full-stack software marketplace — React frontend, Node.js API, catalog management, and Vercel deployment pipeline.',
  impact: 'Live production platform serving real users with modern UX and deploy-ready architecture.',
  tech: ['React', 'Node.js', 'JavaScript', 'Vercel'],
  github: 'https://github.com/jahidbappi/VibeFlow',
  live: 'https://vibe-flow.vercel.app',
  image: '/assets/projects/vibeflow.jpg',
  imageAlt: 'VibeFlow software marketplace interface',
};

export const projects: ProjectCaseStudy[] = [
  featuredProject,
  {
    slug: 'code-reviewer-ai',
    name: 'code-reviewer-ai',
    category: 'ai',
    problem: 'Developers waste cycles on repetitive code review feedback across languages and style guides.',
    solution: 'Built an AI-powered review tool — paste code, select language, receive structured instant feedback.',
    impact: 'Reduced review turnaround from hours to seconds for common patterns and style issues.',
    tech: ['TypeScript', 'AI', 'React'],
    github: 'https://github.com/jahidbappi/code-reviewer-ai',
    image: '/assets/projects/code-reviewer.jpg',
    imageAlt: 'AI code review tool interface',
  },
  {
    slug: 'identifier-tester',
    name: 'Identifier Length Tester',
    category: 'web',
    problem: 'Teams hit silent failures when identifier names exceed compiler or database limits.',
    solution: 'Created a React utility to test identifier length limits across compilers and databases in one place.',
    impact: 'Prevents naming collisions and migration bugs before they reach production schemas.',
    tech: ['React', 'JavaScript'],
    github: 'https://github.com/jahidbappi/Identifier-Length-Limit-Tester',
    image: '/assets/projects/identifier.jpg',
    imageAlt: 'Identifier length testing tool',
  },
  {
    slug: 'smart-relief',
    name: 'Smart Relief BD',
    category: 'web',
    problem: 'Disaster response teams lacked a unified platform to coordinate relief resources during crises.',
    solution: 'Architected a full-stack relief management platform with resource tracking and role-based workflows.',
    impact: 'End-to-end system designed for real-world disaster coordination scenarios.',
    tech: ['Full-Stack', 'Web App', 'MySQL'],
    github: 'https://github.com/jahidbappi/Smart_Relief_BD',
    image: '/assets/projects/smart-relief.jpg',
    imageAlt: 'Smart Relief BD platform',
  },
  {
    slug: 'mobile-portfolio',
    name: 'Android Product Suite',
    category: 'mobile',
    problem: 'Businesses needed native Android apps with ordering, PDF generation, and privacy-first offline flows.',
    solution: 'Shipped 29 production apps across business services, games, and utilities on Google Play.',
    impact: 'Live apps spanning barber booking, real estate, legal services, wholesale, and casual games.',
    tech: ['Android', 'Kotlin', 'Google Play'],
    live: 'https://play.google.com/store/apps/dev?id=8676252920896812364',
    image: '/assets/projects/mobile-suite.jpg',
    imageAlt: 'Android apps on Google Play',
  },
];

export const mobileGroups = [
  {
    id: 'business',
    label: 'Business & Service',
    projects: [
      { name: 'Ditto Frame', play: 'https://play.google.com/store/apps/details?id=com.dittorecordingslimited.dittoframe' },
      { name: 'Solvify', play: 'https://play.google.com/store/apps/details?id=com.hhsolutionsltd.solvofy' },
      { name: 'Ditto Coffee', play: 'https://play.google.com/store/apps/details?id=com.dittocoffeemanchesterlimited.dittocoffee' },
      { name: 'Kouakio LTD', play: 'https://play.google.com/store/apps/details?id=com.kouakioltd.kouakiohealth' },
      { name: 'Farorote Consultancy', play: 'https://play.google.com/store/apps/details?id=com.faroroteltd.faroroteconsultancy' },
      { name: 'PRIMEPICK Delivery', play: 'https://play.google.com/store/apps/details?id=com.primepicktradersltd.primepickdelivery' },
      { name: 'Primepick Traders', play: 'https://play.google.com/store/apps/details?id=com.primepicktradersltd.primepicktraders' },
      { name: 'CBN Barbers', play: 'https://play.google.com/store/apps/details?id=com.cbnmobilebarberltd.cbnbarbers' },
      { name: 'ERWG Homes', play: 'https://play.google.com/store/apps/details?id=com.erwgoedhomesltd.erwghomes' },
      { name: 'Clarion Flow', play: 'https://play.google.com/store/apps/details?id=com.clarionpayrollserviceslimited.clarionflow' },
      { name: 'Noyan Wholesale', play: 'https://play.google.com/store/apps/details?id=com.noyanlimited.noyanwholesale' },
      { name: 'DORL Cars', play: 'https://play.google.com/store/apps/details?id=com.dickensofwrexhamlimited.dorlcars' },
      { name: 'CDM Music', play: 'https://play.google.com/store/apps/details?id=com.cdmmusiclimited.cdmmusic' },
      { name: 'SNL Wheelz', play: 'https://play.google.com/store/apps/details?id=com.solonwlimited.snlwheelz' },
      { name: 'Crafts and More', play: 'https://play.google.com/store/apps/details?id=com.handmadeandmoreltd.craftandmore' },
      { name: 'Bottin Consult', play: 'https://play.google.com/store/apps/details?id=com.bottincreekconsultingltd.bottinconsult' },
      { name: 'Aurelio Decor', play: 'https://play.google.com/store/apps/details?id=com.goldenblindsltd.aureliodecor' },
      { name: 'Baseonix', play: 'https://play.google.com/store/apps/details?id=com.archibaseltd.baseonix' },
    ],
  },
  {
    id: 'games',
    label: 'Games',
    projects: [
      { name: '3Patti Octro', play: 'https://play.google.com/store/apps/details?id=net.octrogame.patticard' },
      { name: 'Jhandi Munda King', play: 'https://play.google.com/store/apps/details?id=net.mdipbnt.jhandimunda.king' },
      { name: 'Teen Patti Bodhi', play: 'https://play.google.com/store/apps/details?id=net.luckybodhi.lucky.ace' },
      { name: 'Whimsy Balloon Puzzle', play: 'https://play.google.com/store/apps/details?id=com.whimsy.balloon.link.puzzle' },
      { name: 'Critter Burst', play: 'https://play.google.com/store/apps/details?id=com.critter.burst.tile.bash' },
      { name: 'Puzzle Adventure', play: 'https://play.google.com/store/apps/details?id=com.yx.puzzle.adv' },
      { name: 'Link Level Up', play: 'https://play.google.com/store/apps/details?id=com.yx.link.level.up' },
      { name: 'Twist Bolt', play: 'https://play.google.com/store/apps/details?id=com.yx.twist.bolt' },
      { name: 'Bubble Fruit Zap', play: 'https://play.google.com/store/apps/details?id=com.yx.bubble.fruit.zap' },
    ],
  },
  {
    id: 'utility',
    label: 'Utilities',
    projects: [
      { name: 'Antivirus Spark', play: 'https://play.google.com/store/apps/details?id=com.avsparklabs.mobile.sec' },
      { name: 'Hypno Clock', play: 'https://play.google.com/store/apps/details?id=com.app.hypnoclock' },
    ],
  },
];

export const timeline = [
  {
    year: '2025 — Present',
    type: 'work',
    title: 'Full-Stack Developer · VibeFlow',
    description: 'Shipped a production software-selling platform — React, Node.js, live on Vercel.',
    tags: ['React', 'Node.js', 'Vercel'],
  },
  {
    year: '2025',
    type: 'project',
    title: 'AI Tools · code-reviewer-ai',
    description: 'Built AI-powered code review with multi-language support and instant feedback.',
    tags: ['TypeScript', 'AI'],
  },
  {
    year: '2025',
    type: 'education',
    title: 'University · Web Technologies Lead',
    description: 'Led final-term full-stack PHP group project with modern frontend practices.',
    tags: ['PHP', 'MySQL', 'Team Lead'],
  },
  {
    year: '2024 — Present',
    type: 'work',
    title: 'Web Developer · Client Projects',
    description: 'Delivered responsive business websites — performance-first, accessible, production-ready.',
    tags: ['JavaScript', 'UI/UX'],
  },
  {
    year: '2024',
    type: 'milestone',
    title: 'Certifications · AWS & TensorFlow',
    description: 'AWS Certified Developer and Google TensorFlow Developer credentials earned.',
    tags: ['AWS', 'TensorFlow'],
  },
  {
    year: '2023 — 2024',
    type: 'education',
    title: 'Computer Science Foundations',
    description: 'Deepened expertise in algorithms, databases, and software engineering principles.',
    tags: ['Oracle', 'Python', 'C++'],
  },
  {
    year: '2023',
    type: 'milestone',
    title: 'Oracle Database Expert',
    description: 'Oracle Academy certification — database architecture and SQL mastery.',
    tags: ['Oracle', 'SQL'],
  },
  {
    year: 'Now',
    type: 'goal',
    title: 'Current goals',
    description: 'PyTorch depth, AWS certification path, and microservices architecture at scale.',
    tags: ['PyTorch', 'AWS', 'Microservices'],
  },
];

export const certifications = [
  { title: 'AWS Certified Developer', provider: 'Amazon Web Services', year: '2024' },
  { title: 'TensorFlow Developer', provider: 'Google', year: '2024' },
  { title: 'Python for Everybody', provider: 'Coursera', year: '2024' },
  { title: 'Oracle Database Expert', provider: 'Oracle Academy', year: '2023' },
];
