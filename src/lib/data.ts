export const site = {
  name: 'Jahid Bappi',
  fullName: 'Md. Jahidul Islam',
  title: 'Full-Stack Engineer & AI Builder',
  tagline: 'Problem first. Code second.',
  description:
    'Full-stack engineer based in Bangladesh — web applications, AI integrations, and 200+ Android apps on Google Play.',
  githubUsername: 'jahidbappi',
  profileImage: '/assets/profile.jpg',
  resumeUrl: '/resume',
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

/** Static display values for hero GitHub metrics (portfolio-facing). */
export const heroGitHubStats = {
  repos: '70+',
  stars: '180+',
} as const;

export const heroStats = [
  { value: heroGitHubStats.repos, label: 'Open-source repos' },
  { value: '200+', label: 'Play Store apps' },
  { value: '5+', label: 'Live web products' },
  { value: '5+', label: 'Certifications' },
];

export const aboutBento = [
  {
    id: 'who',
    index: '01',
    title: 'Who I am',
    body: 'Full-stack engineer from Bangladesh. I design systems that survive contact with real users — not demo-day prototypes.',
    span: 'md:col-span-4',
    featured: true,
  },
  {
    id: 'mission',
    index: '02',
    title: 'Current mission',
    body: 'Ship products that combine clean engineering, thoughtful UX, and measurable business impact.',
    span: 'md:col-span-2',
  },
  {
    id: 'stack',
    index: '03',
    title: 'Core stack',
    body: 'React, Node.js, TypeScript, Python, PostgreSQL, and production deployment on Vercel & AWS.',
    span: 'md:col-span-2',
  },
  {
    id: 'learning',
    index: '04',
    title: 'Learning journey',
    body: 'Computer science foundations → full-stack web → AI/ML integrations → mobile at scale on Google Play.',
    span: 'md:col-span-2',
  },
  {
    id: 'ai',
    index: '05',
    title: 'AI interests',
    body: "LLM-powered dev tools, code review automation, and practical ML pipelines that ship — not research for research's sake.",
    span: 'md:col-span-3',
  },
  {
    id: 'mobile',
    index: '06',
    title: 'Mobile development',
    body: '200+ published Android apps across business, games, and utilities — Kotlin, privacy-first architecture, Play Store production.',
    span: 'md:col-span-3',
  },
];

export const skillGroups = [
  {
    id: 'frontend',
    label: 'Frontend',
    summary: 'Interfaces & interaction',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML & CSS'],
  },
  {
    id: 'backend',
    label: 'Backend',
    summary: 'APIs & data layers',
    skills: ['Node.js', 'Python', 'Django', 'Flask', 'REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    summary: 'Android production',
    skills: ['Android', 'Kotlin', 'Google Play', 'Privacy-first UX', 'Offline-first'],
  },
  {
    id: 'ai',
    label: 'AI',
    summary: 'ML & LLM systems',
    skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'LLM integrations', 'Pandas', 'NumPy'],
  },
  {
    id: 'tools',
    label: 'Tools',
    summary: 'Delivery & ops',
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
  slug: 'kiln-ml',
  name: 'Kiln',
  category: 'ai',
  featured: true,
  problem:
    'ML engineers lack a single reproducible harness to compare classical and deep models across tabular, vision, and detection tasks on real public data.',
  solution:
    'Built a unified benchmark platform — typed Python CLI, 4 evaluation tracks, committed leaderboards, Colab GPU workflows, and a live Next.js results site.',
  impact:
    '20+ models benchmarked across sklearn, Keras, and YOLO with documented methodology and one-command reproducibility (seed=42).',
  tech: ['Python', 'scikit-learn', 'Keras', 'YOLO', 'Next.js'],
  github: 'https://github.com/jahidbappi/kiln-ml',
  live: 'https://kiln-ml.vercel.app',
  image: '/assets/projects/kiln.png',
  imageAlt: 'Kiln ML benchmark leaderboards dashboard',
};

export const projects: ProjectCaseStudy[] = [
  featuredProject,
  {
    slug: 'iris',
    name: 'Iris',
    category: 'ai',
    problem: 'Developers needed a production-grade multimodal AI studio combining voice and vision without cloud-only lock-in.',
    solution:
      'Shipped a real-time voice+vision AI studio with Next.js, Web Speech API, and local Ollama models (LLaVA, llama3.1).',
    impact: 'Live multimodal product at iris-puce.vercel.app with local OSS inference path.',
    tech: ['Next.js', 'TypeScript', 'Ollama'],
    github: 'https://github.com/jahidbappi/iris',
    live: 'https://iris-puce.vercel.app',
    image: '/assets/projects/kiln.png',
    imageAlt: 'Iris multimodal AI studio',
  },
  {
    slug: 'mosaic-rag',
    name: 'Mosaic RAG',
    category: 'ai',
    problem: 'RAG systems are hard to compare fairly without rigorous retrieval benchmarks on public datasets.',
    solution:
      'Built a multimodal RAG evaluation harness with hybrid retrieval ablations and published SciFact benchmark results.',
    impact: '76.7% hybrid MRR vs 73.5% BM25 baseline on SciFact (MiniLM, n=50).',
    tech: ['Python', 'BGE/MiniLM', 'Next.js'],
    github: 'https://github.com/jahidbappi/mosaic-rag',
    live: 'https://mosaic-rag.vercel.app',
    image: '/assets/projects/kiln.png',
    imageAlt: 'Mosaic RAG benchmark harness',
  },
  {
    slug: 'vibeflow',
    name: 'VibeFlow',
    category: 'web',
    problem:
      'Independent software creators needed a polished storefront without building commerce infrastructure from scratch.',
    solution:
      'Designed and shipped a full-stack software marketplace — React frontend, Node.js API, catalog management, and Vercel deployment pipeline.',
    impact: 'Live production platform serving real users with modern UX and deploy-ready architecture.',
    tech: ['React', 'Node.js', 'JavaScript', 'Vercel'],
    github: 'https://github.com/jahidbappi/VibeFlow',
    live: 'https://vibeflow.tech',
    image: '/assets/projects/vibeflow.png',
    imageAlt: 'VibeFlow on-demand creative and dev service landing page',
  },
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
    solution: 'Shipped 200+ production apps across business services, games, and utilities on Google Play.',
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
      { name: 'Primepick Traders', play: 'https://play.google.com/store/apps/details?id=com.primepicktradersltd.primepicktraders' },
      { name: 'Ditto Coffee', play: 'https://play.google.com/store/apps/details?id=com.dittocoffeemanchesterlimited.dittocoffee' },
      { name: 'Kouakio LTD', play: 'https://play.google.com/store/apps/details?id=com.kouakioltd.kouakiohealth' },
      { name: 'PRIMEPICK Delivery', play: 'https://play.google.com/store/apps/details?id=com.primepicktradersltd.primepickdelivery' },
      { name: 'Noyan Wholesale', play: 'https://play.google.com/store/apps/details?id=com.noyanlimited.noyanwholesale' },
      { name: 'DORL Cars', play: 'https://play.google.com/store/apps/details?id=com.dickensofwrexhamlimited.dorlcars' },
      { name: 'CDM Music', play: 'https://play.google.com/store/apps/details?id=com.cdmmusiclimited.cdmmusic' },
      { name: 'Aurelio Decor', play: 'https://play.google.com/store/apps/details?id=com.goldenblindsltd.aureliodecor' },
      { name: 'Baseonix', play: 'https://play.google.com/store/apps/details?id=com.archibaseltd.baseonix' },
      { name: 'Solvify', play: 'https://play.google.com/store/apps/details?id=com.hhsolutionsltd.solvofy' },
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

/** Featured apps shown in the Mobile Apps section. */
export const mobileAppCount = mobileGroups.reduce((sum, group) => sum + group.projects.length, 0);

/** Total live Play Store apps (user-facing copy). */
export const playStoreAppCount = 200;

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
    title: 'Certifications · AWS Developer',
    description: 'AWS Certified Developer credential earned.',
    tags: ['AWS'],
  },
  {
    year: '2023 — 2024',
    type: 'education',
    title: 'Computer Science Foundations',
    description: 'Deepened expertise in algorithms, databases, and software engineering principles.',
    tags: ['Python', 'C++', 'SQL'],
  },
  {
    year: 'Now',
    type: 'goal',
    title: 'Current goals',
    description: 'PyTorch depth, AWS certification path, and microservices architecture at scale.',
    tags: ['PyTorch', 'AWS', 'Microservices'],
  },
];

export type Certification = {
  title: string;
  provider: string;
  year?: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    title: 'Master ChatGPT: Transform Your Life With AI Chatbots',
    provider: 'Dhruv Rathee Academy',
    year: '2025',
    url: 'https://academy.dhruvrathee.com/chatgpt',
  },
  { title: 'AWS Certified Developer', provider: 'Amazon Web Services', year: '2024' },
  {
    title: '100 Days of Code: The Complete Python Pro Bootcamp',
    provider: 'Udemy',
    year: '2024',
    url: 'https://www.udemy.com/course/100-days-of-code/?couponCode=MT260622G1',
  },
  {
    title: 'CS50: Introduction to Computer Science',
    provider: 'Harvard University',
    year: '2023',
    url: 'https://pll.harvard.edu/course/cs50-introduction-computer-science',
  },
  {
    title: 'Terence Tao Teaches Mathematical Thinking',
    provider: 'MasterClass',
    year: '2022',
    url: 'https://www.masterclass.com/classes/terence-tao-teaches-mathematical-thinking',
  },
];
