import { certifications, site } from './data';

export const resumeMeta = {
  fileName: 'Jahid_Bappi_Resume.pdf',
  portfolioUrl: 'https://jahidbappi.vercel.app',
};

export type ResumeExperience = {
  role: string;
  organization: string;
  period: string;
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  tech: string;
  bullets: string[];
  link?: string;
};

export type ResumeSkillGroup = {
  label: string;
  skills: string[];
};

export type ResumeEducation = {
  program: string;
  institution: string;
  period: string;
  bullets?: string[];
};

export const resumeSummary =
  'AI engineer and full-stack developer based in Bangladesh with production experience shipping web platforms, multimodal AI applications, and 200+ Android apps and games on Google Play. Built Iris (real-time voice+vision AI studio), Mosaic RAG (benchmarked retrieval evaluation), and Kiln (unified ML/CV benchmark platform). AWS Certified Developer with strengths in React, Next.js, Node.js, Python, and practical LLM/RAG integrations from prototype to Vercel deployment.';

export const resumeContact = {
  name: site.fullName,
  displayName: site.name,
  title: 'AI Engineer · Full-Stack Developer',
  email: site.social.email,
  github: site.social.github.replace('https://', ''),
  linkedin: site.social.linkedin.replace('https://', ''),
  location: site.social.location,
  portfolio: resumeMeta.portfolioUrl.replace('https://', ''),
};

/** Strict reverse-chronological: newest role first. */
export const resumeExperience: ResumeExperience[] = [
  {
    role: 'AI Engineer',
    organization: 'Independent',
    period: 'Jun 2026 – Present',
    bullets: [
      'Architected Iris, a real-time multimodal voice-and-vision AI studio deployed at iris-puce.vercel.app using Next.js, TypeScript, and Ollama (LLaVA, llama3.1).',
      'Built Mosaic RAG, a multimodal retrieval engine achieving 76.7% hybrid MRR on SciFact benchmarks vs. 73.5% BM25 baseline.',
      'Integrated Web Speech API, local OSS models, and Vercel production pipelines for live AI demos.',
      'Published open-source repos with documented benchmarks and deployment guides on GitHub.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    organization: 'VibeFlow',
    period: '2025 – Present',
    bullets: [
      'Designed and deployed a production software marketplace serving users at vibeflow.tech.',
      'Built React frontend, Node.js API, product catalog management, and Vercel CI/CD pipeline.',
      'Delivered maintainable full-stack architecture with modern UX and deploy-ready infrastructure.',
    ],
  },
  {
    role: 'Web Technologies Project Lead',
    organization: 'University Group Project (Group 08)',
    period: 'May 2026',
    bullets: [
      'Led a team delivering a full-stack project-management platform with auth, workspaces, and Kanban boards.',
      'Merged three sprint deliverables into a unified PHP/MySQL application with shared session architecture.',
      'Coordinated frontend practices, code reviews, and final integration across Task 1–3 modules.',
    ],
  },
  {
    role: 'Web Developer',
    organization: 'Freelance / Client Projects',
    period: '2024 – Present',
    bullets: [
      'Delivered responsive, performance-optimized business websites for multiple clients.',
      'Implemented accessible front-end patterns and production-ready deployment workflows on Vercel.',
      'Built custom React utilities including an identifier-length validator for cross-language schema safety.',
    ],
  },
  {
    role: 'Android Developer',
    organization: 'Independent',
    period: '2023 – Present',
    bullets: [
      'Published 200+ production Android apps and games on Google Play across business and utilities.',
      'Built Kotlin apps with privacy-first, offline-first architecture for booking, real estate, wholesale, and legal services.',
      'Managed Play Store releases, client branding, and production maintenance for international business clients.',
    ],
  },
];

/** Reverse-chronological by recency of active development. */
export const resumeProjects: ResumeProject[] = [
  {
    name: 'Kiln',
    tech: 'Python, scikit-learn, Keras, YOLO, Next.js',
    bullets: [
      'Unified ML/CV benchmark platform — 20+ models across 4 tracks with reproducible CLI and live leaderboards.',
      'CNN achieves ~90–92% on Fashion-MNIST vs ~82–85% flatten+RF; YOLOv8s reaches 65.8% mAP@50 on Hard Hat detection.',
    ],
    link: 'https://kiln-ml.vercel.app',
  },
  {
    name: 'Iris',
    tech: 'Next.js, TypeScript, Ollama, Web Speech API',
    bullets: [
      'Real-time multimodal AI studio combining voice input and vision analysis with local OSS model support.',
    ],
    link: 'https://iris-puce.vercel.app',
  },
  {
    name: 'Mosaic RAG',
    tech: 'Python, BGE/MiniLM, Next.js',
    bullets: [
      'Multimodal RAG evaluation harness with published SciFact hybrid-retrieval benchmarks (76.7% MRR).',
    ],
    link: 'https://mosaic-rag.vercel.app',
  },
  {
    name: 'VibeFlow',
    tech: 'React, Node.js, JavaScript, Vercel',
    bullets: [
      'Full-stack software marketplace with catalog management and live production deployment.',
    ],
    link: 'https://vibeflow.tech',
  },
  {
    name: 'code-reviewer-ai',
    tech: 'TypeScript, React, AI',
    bullets: [
      'AI-powered code review tool with multi-language support, delivering structured feedback in seconds.',
    ],
    link: 'https://github.com/jahidbappi/code-reviewer-ai',
  },
  {
    name: 'Smart Relief BD',
    tech: 'Full-Stack, PHP, MySQL',
    bullets: [
      'Disaster relief management platform with resource tracking and role-based coordination workflows.',
    ],
    link: 'https://github.com/jahidbappi/Smart_Relief_BD',
  },
];

export const resumeSkills: ResumeSkillGroup[] = [
  {
    label: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Kotlin', 'PHP', 'C++', 'SQL'],
  },
  {
    label: 'Frameworks',
    skills: ['React', 'Next.js', 'Node.js', 'Django', 'Flask', 'Tailwind CSS'],
  },
  {
    label: 'AI / ML',
    skills: ['RAG', 'LLM integrations', 'PyTorch', 'TensorFlow', 'scikit-learn', 'Ollama', 'Pandas', 'NumPy'],
  },
  {
    label: 'Databases',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
  },
  {
    label: 'Cloud & Tools',
    skills: ['AWS', 'Vercel', 'Docker', 'Git', 'Android Studio', 'Postman'],
  },
  {
    label: 'Mobile',
    skills: ['Android', 'Kotlin', 'Google Play', 'Offline-first', 'Privacy-first UX'],
  },
];

/** Reverse-chronological: most recent education first. */
export const resumeEducation: ResumeEducation[] = [
  {
    program: 'Bachelor of Science in Computer Science & Engineering (B.Sc. CSE)',
    institution: 'American International University-Bangladesh (AIUB)',
    period: '2023 – Present',
    bullets: [
      'Coursework in algorithms, data structures, software engineering, and relational database systems (Oracle SQL, MySQL, PostgreSQL).',
      'Applied full-stack web development, AI/ML foundations (Python, PyTorch, TensorFlow), and cloud tooling (AWS, Docker, Vercel) across academic and project work.',
      'Project lead, Group 08 — delivered a full-stack PHP/MySQL Web Technologies capstone with authentication, workspaces, and Kanban boards.',
    ],
  },
];

/** Reverse-chronological by year; undated certs follow dated entries. */
export const resumeCertifications = [...certifications].sort((a, b) => {
  const yearA = a.year ? Number(a.year) : 0;
  const yearB = b.year ? Number(b.year) : 0;
  return yearB - yearA;
});
