const DATA = window.PORTFOLIO_DATA || {};
const GITHUB_API_URL = `https://api.github.com/users/${DATA.githubUsername || 'jahidbappi'}/repos`;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let allProjects = [];
let statsAnimated = false;

const LANGUAGE_CATEGORY_MAP = {
    Python: 'ai',
    'Jupyter Notebook': 'ai',
    TypeScript: 'web',
    JavaScript: 'web',
    HTML: 'web',
    CSS: 'web',
    React: 'web',
    Vue: 'web',
    PHP: 'web',
    Java: 'mobile',
    'C++': 'web',
    C: 'web',
};

const CATEGORY_LABELS = { web: 'WEB', ai: 'AI', mobile: 'MOBILE' };
const CATEGORY_ICONS = { web: 'fa-globe', ai: 'fa-brain', mobile: 'fa-mobile-screen' };

const DEVICON_MAP = {
    Python: 'devicon-python-plain colored',
    JavaScript: 'devicon-javascript-plain colored',
    TypeScript: 'devicon-typescript-plain colored',
    'C++': 'devicon-cplusplus-plain colored',
    'C#': 'devicon-csharp-plain colored',
    Java: 'devicon-java-plain colored',
    Swift: 'devicon-swift-plain colored',
    PHP: 'devicon-php-plain colored',
    Oracle: 'devicon-oracle-original colored',
    MySQL: 'devicon-mysql-plain colored',
    PostgreSQL: 'devicon-postgresql-plain colored',
    MongoDB: 'devicon-mongodb-plain colored',
    React: 'devicon-react-original colored',
    'Node.js': 'devicon-nodejs-plain colored',
    Django: 'devicon-django-plain',
    Flask: 'devicon-flask-original',
    'HTML & CSS': 'devicon-html5-plain colored',
    TensorFlow: 'devicon-tensorflow-original colored',
    PyTorch: 'devicon-pytorch-original colored',
    'scikit-learn': 'devicon-scikitlearn-plain colored',
    Pandas: 'devicon-pandas-original colored',
    NumPy: 'devicon-numpy-original colored',
    AWS: 'devicon-amazonwebservices-original colored',
    Azure: 'devicon-azure-plain colored',
    Docker: 'devicon-docker-plain colored',
    Kubernetes: 'devicon-kubernetes-plain colored',
    Git: 'devicon-git-plain colored',
    'VS Code': 'devicon-vscode-plain colored',
    Jupyter: 'devicon-jupyter-plain colored',
    Postman: 'devicon-postman-plain colored',
    'Android Studio': 'devicon-androidstudio-plain colored',
};

const FA_FALLBACK = {
    'Entity Framework': 'fas fa-diagram-project',
    'REST APIs': 'fas fa-plug',
    Cursor: 'fas fa-arrow-pointer',
    Vercel: 'fas fa-bolt',
};

const MARQUEE_TECH = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Django', 'Flask',
    'TensorFlow', 'PyTorch', 'PostgreSQL', 'MongoDB', 'MySQL', 'Docker',
    'Kubernetes', 'AWS', 'Azure', 'Git', 'HTML & CSS',
];

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    renderHeroStats();
    setupHeroRoleRotator();
    renderAboutMetrics();
    renderSkills();
    buildMarquee();
    renderTimeline();
    renderCertifications();
    fetchAndDisplayProjects();
    fetchGitHubStats();
    setupFormHandling();
    setupScrollSpy();
    setupNavbarScroll();
    setupScrollAnimations();
    setupScrollProgress();
    setupCursorGlow();
    setupParticles();
    setupTilt();
    setupMagnetic();
    setupBackToTop();
    setTimeout(hideLoader, 2200);
});

window.addEventListener('load', () => setTimeout(hideLoader, 300));

function hideLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) loader.classList.add('done');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function techIconHtml(name) {
    const dev = DEVICON_MAP[name];
    if (dev) return `<i class="${dev}" aria-hidden="true"></i>`;
    const fa = FA_FALLBACK[name] || 'fas fa-code';
    return `<i class="${fa}" style="color:var(--accent)" aria-hidden="true"></i>`;
}

/* Hero */
function renderHeroStats() {
    const container = document.getElementById('heroStats');
    const stats = DATA.heroStats || [];
    if (!container || !stats.length) return;

    container.innerHTML = stats
        .map((stat) => {
            const value = String(stat.value).replace('+', '<span class="plus">+</span>');
            return `
        <div class="hero-stat">
            <span class="hero-stat-value">${value}</span>
            <span class="hero-stat-label">${escapeHtml(stat.label)}</span>
        </div>`;
        })
        .join('');
}

function setupHeroRoleRotator() {
    const el = document.getElementById('heroRole');
    const roles = DATA.heroRoles || [];
    if (!el || roles.length <= 1) return;

    let index = 0;
    el.textContent = roles[0];

    setInterval(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(8px)';
        setTimeout(() => {
            index = (index + 1) % roles.length;
            el.textContent = roles[index];
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 300);
    }, 3600);
}

/* About metrics */
function renderAboutMetrics() {
    const container = document.getElementById('aboutMetrics');
    if (!container) return;

    const metrics = [
        { icon: 'fa-folder', value: '13+', label: 'Open-source repos', highlight: false },
        { icon: 'fa-rocket', value: '5+', label: 'Live deployed apps', highlight: true },
        { icon: 'fa-microchip', value: '10+', label: 'Technologies', highlight: false },
        { icon: 'fa-award', value: '4+', label: 'Certifications', highlight: false },
    ];

    container.innerHTML = metrics
        .map(
            (m) => `
        <article class="metric-card${m.highlight ? ' highlight' : ''} reveal">
            <div class="metric-icon"><i class="fas ${m.icon}"></i></div>
            <span class="metric-value">${escapeHtml(m.value)}</span>
            <span class="metric-label">${escapeHtml(m.label)}</span>
        </article>`
        )
        .join('');
}

/* Skills */
function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    const focus = document.getElementById('skillsFocus');
    const groups = DATA.skillGroups || [];

    if (grid && groups.length) {
        grid.innerHTML = groups
            .map((group, index) => {
                const num = String(index + 1).padStart(2, '0');
                const chips = group.skills
                    .map((skill) => `<span class="skill-chip">${techIconHtml(skill)}${escapeHtml(skill)}</span>`)
                    .join('');

                return `
                <article class="skill-card${group.featured ? ' skill-card--featured' : ''} reveal">
                    <div class="skill-card-top">
                        <span class="skill-card-num">${num}</span>
                        <span class="skill-card-icon"><i class="fas ${group.icon}"></i></span>
                    </div>
                    <h3 class="skill-card-title">${escapeHtml(group.title)}</h3>
                    <p class="skill-card-count">${group.skills.length} technologies</p>
                    <div class="skill-chip-list">${chips}</div>
                </article>`;
            })
            .join('');

        grid.querySelectorAll('.skill-card').forEach((card, i) => {
            card.style.transitionDelay = `${i * 60}ms`;
            observeReveal(card);
            card.addEventListener('mousemove', (e) => {
                const r = card.getBoundingClientRect();
                card.style.setProperty('--mx', `${e.clientX - r.left}px`);
                card.style.setProperty('--my', `${e.clientY - r.top}px`);
            });
        });
    }

    const focusing = DATA.focusingOn || [];
    if (focus && focusing.length) {
        focus.innerHTML = `
            <div class="skills-focus-inner reveal">
                <span class="skills-focus-label"><i class="fas fa-seedling"></i> Currently exploring</span>
                <div class="skills-focus-chips">
                    ${focusing.map((item) => `<span class="focus-chip">${escapeHtml(item)}</span>`).join('')}
                </div>
            </div>`;
        observeReveal(focus.querySelector('.skills-focus-inner'));
    }
}

/* Marquee */
function buildMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    const itemsHtml = MARQUEE_TECH
        .map((tech) => `<span class="marquee-item">${techIconHtml(tech)}${escapeHtml(tech)}</span>`)
        .join('');

    track.innerHTML = itemsHtml + itemsHtml;
}

/* Timeline */
function renderTimeline() {
    const container = document.getElementById('timeline');
    const items = DATA.experience || [];
    if (!container || !items.length) return;

    container.innerHTML = items
        .map(
            (item) => `
        <article class="timeline-item reveal">
            <div class="timeline-dot"></div>
            <div class="timeline-body">
                ${item.period ? `<time>${escapeHtml(item.period)}</time>` : ''}
                <h3>${escapeHtml(item.title)}${item.subtitle ? ` · ${escapeHtml(item.subtitle)}` : ''}</h3>
                <p>${escapeHtml(item.description)}</p>
                <div class="pill-row">${(item.tags || [])
                    .map((t) => `<span>${escapeHtml(t)}</span>`)
                    .join('')}</div>
            </div>
        </article>`
        )
        .join('');

    container.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.style.transitionDelay = `${i * 80}ms`;
        observeReveal(el);
    });
}

/* Certifications */
function renderCertifications() {
    const grid = document.getElementById('certGrid');
    const certs = DATA.certifications || [];
    if (!grid || !certs.length) return;

    grid.innerHTML = certs
        .map(
            (cert) => `
        <article class="cert-card tilt reveal">
            <div class="cert-icon"><i class="fas fa-award"></i></div>
            <h3 class="cert-title">${escapeHtml(cert.title)}</h3>
            <p class="cert-provider">${escapeHtml(cert.provider)}</p>
            <span class="cert-year">${escapeHtml(cert.year)}</span>
        </article>`
        )
        .join('');

    grid.querySelectorAll('.cert-card').forEach((card, i) => {
        card.style.transitionDelay = `${i * 80}ms`;
        observeReveal(card);
    });
}

/* Navigation */
function setupNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const backdrop = document.querySelector('.nav-backdrop');
    if (!hamburger || !navMenu) return;

    function closeMenu() {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        navMenu.classList.add('active');
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hamburger.addEventListener('click', () => {
        navMenu.classList.contains('active') ? closeMenu() : openMenu();
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);
    document.querySelectorAll('.nav-menu a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
    });
}

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
}

function setupScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
}

/* Scroll progress */
function setupScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const update = () => {
        const h = document.documentElement;
        const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        bar.style.width = `${scrolled}%`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

/* Back to top */
function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* Cursor glow */
function setupCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || prefersReducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let raf;
    window.addEventListener('mousemove', (e) => {
        glow.style.opacity = '1';
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });
    });
    document.addEventListener('mouseleave', () => (glow.style.opacity = '0'));
}

/* Particle network */
function setupParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas || prefersReducedMotion) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles, raf;
    const isMobile = window.innerWidth < 768;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        const count = Math.min(isMobile ? 28 : 70, Math.floor((w * h) / 16000));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r: Math.random() * 1.6 + 0.6,
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(167, 139, 250, 0.55)';
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j];
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(167, 139, 250, ${0.12 * (1 - dist / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
        raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });
}

/* Tilt */
function setupTilt() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.tilt').forEach((el) => {
        el.style.transformStyle = 'preserve-3d';
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(800px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* Magnetic buttons */
function setupMagnetic() {
    if (prefersReducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.magnetic').forEach((el) => {
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            el.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

/* Projects */
function getFeaturedMap() {
    const map = new Map();
    (DATA.featuredLiveProjects || []).forEach((project) => map.set(project.name.toLowerCase(), project));
    return map;
}

function getCategory(repoName, language) {
    const overrides = DATA.repoCategoryOverrides || {};
    if (overrides[repoName]) return overrides[repoName];
    if (!language) return 'web';
    return LANGUAGE_CATEGORY_MAP[language] || 'web';
}

function mergeWithFeatured(repos) {
    const featuredMap = getFeaturedMap();
    const excluded = new Set((DATA.excludedRepos || []).map((name) => name.toLowerCase()));
    const merged = new Map();

    repos
        .filter((repo) => !repo.fork && !excluded.has(repo.name.toLowerCase()))
        .forEach((repo) => {
            const featured = featuredMap.get(repo.name.toLowerCase());
            merged.set(repo.name.toLowerCase(), {
                id: repo.id,
                name: repo.name,
                description: featured?.description || repo.description || 'No description available',
                category: featured?.category || getCategory(repo.name, repo.language),
                tech: featured?.tech || [repo.language || 'Unknown'].filter(Boolean),
                github: featured?.github || repo.html_url,
                live: featured?.live || repo.homepage || null,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                updated: repo.updated_at,
                featured: featured?.featured ?? false,
            });
        });

    (DATA.featuredLiveProjects || []).forEach((project) => {
        const key = project.name.toLowerCase();
        if (!merged.has(key)) {
            merged.set(key, {
                id: key,
                name: project.name,
                description: project.description,
                category: project.category,
                tech: project.tech,
                github: project.github,
                live: project.live,
                stars: 0,
                forks: 0,
                updated: new Date().toISOString(),
                featured: project.featured ?? true,
            });
        }
    });

    return Array.from(merged.values()).sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return new Date(b.updated) - new Date(a.updated);
    });
}

async function fetchAndDisplayProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    grid.innerHTML = '<div class="loading-projects"><div class="spinner"></div><p>Loading projects from GitHub...</p></div>';

    try {
        const response = await fetch(`${GITHUB_API_URL}?per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch repos');
        const repos = await response.json();
        allProjects = mergeWithFeatured(repos);
        displayProjects(allProjects);
        setupProjectFilters();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        allProjects = (DATA.featuredLiveProjects || []).map((project) => ({
            id: project.name,
            name: project.name,
            description: project.description,
            category: project.category,
            tech: project.tech,
            github: project.github,
            live: project.live,
            stars: 0,
            forks: 0,
            updated: new Date().toISOString(),
            featured: project.featured ?? true,
        }));
        displayProjects(allProjects);
        setupProjectFilters();
    }
}

function displayProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    if (projects.length === 0) {
        grid.innerHTML = '<p class="no-projects">No projects found.</p>';
        return;
    }

    grid.style.opacity = '0';
    grid.innerHTML = projects.map((project) => createProjectCard(project)).join('');
    requestAnimationFrame(() => (grid.style.opacity = '1'));

    grid.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 50}ms`;
        observeReveal(card);
    });
}

function createProjectCard(project) {
    const date = project.updated ? new Date(project.updated) : new Date();
    const timeAgo = getTimeAgo(date);
    const icon = CATEGORY_ICONS[project.category] || 'fa-code';

    return `
        <article class="project-card${project.featured ? ' featured' : ''}" data-category="${project.category}">
            <div class="project-card-header">
                <span class="project-category">${CATEGORY_LABELS[project.category] || project.category.toUpperCase()}</span>
                <span class="project-header-icon"><i class="fas ${icon}"></i></span>
            </div>
            <div class="project-card-body">
                <h3 class="project-title">${escapeHtml(project.name)}</h3>
                <p class="project-description">${escapeHtml(project.description)}</p>
                <div class="project-tech">
                    ${project.tech.map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
                </div>
                <p class="project-updated">Updated ${timeAgo}</p>
                <div class="project-stats">
                    <span><i class="fas fa-star"></i> ${project.stars || 0}</span>
                    <span><i class="fas fa-code-branch"></i> ${project.forks || 0}</span>
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fab fa-github"></i> Code
                    </a>
                    ${
                        project.live
                            ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fas fa-arrow-up-right-from-square"></i> Live
                    </a>`
                            : ''
                    }
                </div>
            </div>
        </article>`;
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
    ];
    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
    return 'just now';
}

function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            const filtered = filter === 'all' ? allProjects : allProjects.filter((p) => p.category === filter);
            displayProjects(filtered);
        });
    });
}

/* GitHub stats */
async function fetchGitHubStats() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Failed to fetch');
        const repos = await response.json();
        const excluded = new Set((DATA.excludedRepos || []).map((name) => name.toLowerCase()));
        const nonForkRepos = repos.filter((repo) => !repo.fork && !excluded.has(repo.name.toLowerCase()));

        const stats = {
            totalRepos: nonForkRepos.length,
            totalStars: nonForkRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            totalForks: nonForkRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
            languages: new Set(nonForkRepos.map((repo) => repo.language).filter(Boolean)).size,
        };

        Object.entries(stats).forEach(([key, value]) => {
            const el = document.getElementById(key);
            if (el) {
                el.dataset.target = value;
                el.textContent = '0';
            }
        });

        const statsSection = document.getElementById('stats');
        if (statsSection) {
            const statsObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !statsAnimated) {
                            statsAnimated = true;
                            animateCounters();
                            statsObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 }
            );
            statsObserver.observe(statsSection);
        }
    } catch (error) {
        console.error('Error fetching GitHub stats:', error);
    }
}

function animateCounters() {
    ['totalRepos', 'totalStars', 'totalForks', 'languages'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = 1600;
        const start = performance.now();
        function update(currentTime) {
            const progress = Math.min((currentTime - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }
        requestAnimationFrame(update);
    });
}

/* Reveal */
function observeReveal(el) {
    if (!el) return;
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
}

function setupScrollAnimations() {
    const selectors = ['.reveal', '.section-head', '.stat-box'];
    document.querySelectorAll(selectors.join(',')).forEach((el) => {
        if (!el.classList.contains('reveal')) el.classList.add('reveal');
        observeReveal(el);
    });
}

/* Contact form */
function setupFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach((input) => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) validateField(input);
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        let isValid = true;
        inputs.forEach((input) => {
            if (!validateField(input)) isValid = false;
        });
        if (!isValid) return;

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        const accessKey = DATA.web3formsAccessKey;
        const hasWeb3Forms = accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY';

        try {
            if (hasWeb3Forms) {
                const formData = new FormData(form);
                formData.append('access_key', accessKey);
                formData.append('subject', `Portfolio contact from ${formData.get('name')}`);
                const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
                const result = await response.json();
                if (!result.success) throw new Error(result.message || 'Failed to send message');
                showToast("Message sent! I'll get back to you soon.");
                form.reset();
            } else {
                const mailtoLink = `mailto:${DATA.social?.email || 'jahidcric2000@gmail.com'}?subject=${encodeURIComponent('Portfolio Contact')}&body=${encodeURIComponent(
                    `Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`
                )}`;
                window.location.href = mailtoLink;
                showToast('Opening your email client…');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showToast('Could not send. Please email me directly.', true);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

function validateField(field) {
    const formGroup = field.closest('.form-group');
    if (!formGroup) return true;
    let isValid = true;
    if (field.required && !field.value.trim()) {
        isValid = false;
    } else if (field.type === 'email' && field.value) {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
    }
    formGroup.classList.toggle('has-error', !isValid);
    field.classList.toggle('error', !isValid);
    return isValid;
}

function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (!toast || !toastMessage) return;
    toast.classList.toggle('toast-error', isError);
    toastMessage.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
        toast.classList.remove('toast-error');
    }, 4000);
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});
