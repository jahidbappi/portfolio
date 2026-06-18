const DATA = window.PORTFOLIO_DATA || {};
const GITHUB_API_URL = `https://api.github.com/users/${DATA.githubUsername || 'jahidbappi'}/repos`;

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

const CATEGORY_LABELS = {
    web: 'WEB',
    ai: 'AI',
    mobile: 'MOBILE',
};

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    fetchAndDisplayProjects();
    fetchGitHubStats();
    setupFormHandling();
    setupScrollSpy();
    setupNavbarScroll();
    setupScrollAnimations();
    setupSkillBars();
});

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
        const isOpen = navMenu.classList.contains('active');
        isOpen ? closeMenu() : openMenu();
    });

    if (backdrop) backdrop.addEventListener('click', closeMenu);

    document.querySelectorAll('.nav-menu a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) closeMenu();
    });
}

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener(
        'scroll',
        () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        },
        { passive: true }
    );
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
                        const href = link.getAttribute('href');
                        link.classList.toggle('active', href === `#${id}`);
                    });
                }
            });
        },
        { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}

function getFeaturedMap() {
    const map = new Map();
    (DATA.featuredLiveProjects || []).forEach((project) => {
        map.set(project.name.toLowerCase(), project);
    });
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

    grid.innerHTML =
        '<div class="loading-projects"><div class="spinner"></div><p>Loading projects from GitHub...</p></div>';

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

    grid.innerHTML = projects.map((project) => createProjectCard(project)).join('');

    grid.querySelectorAll('.project-card').forEach((card, index) => {
        card.classList.add('reveal');
        card.style.transitionDelay = `${index * 50}ms`;
        observeReveal(card);
    });
}

function createProjectCard(project) {
    const date = project.updated ? new Date(project.updated) : new Date();
    const timeAgo = getTimeAgo(date);

    return `
        <article class="project-card${project.featured ? ' featured' : ''}" data-category="${project.category}">
            <span class="project-category">${CATEGORY_LABELS[project.category] || project.category.toUpperCase()}</span>
            <h3 class="project-title">${escapeHtml(project.name)}</h3>
            <p class="project-description">${escapeHtml(project.description)}</p>
            <div class="project-tech">
                ${project.tech.map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
            </div>
            <p class="project-updated">Updated ${timeAgo}</p>
            <div class="project-stats">
                <span>&#9733; ${project.stars || 0}</span>
                <span>&#127860; ${project.forks || 0}</span>
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
        </article>
    `;
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
            const filtered =
                filter === 'all' ? allProjects : allProjects.filter((p) => p.category === filter);
            displayProjects(filtered);
        });
    });
}

async function fetchGitHubStats() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) throw new Error('Failed to fetch');

        const repos = await response.json();
        const excluded = new Set((DATA.excludedRepos || []).map((name) => name.toLowerCase()));
        const nonForkRepos = repos.filter(
            (repo) => !repo.fork && !excluded.has(repo.name.toLowerCase())
        );

        const stats = {
            totalRepos: nonForkRepos.length,
            totalStars: nonForkRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            totalForks: nonForkRepos.reduce((sum, repo) => sum + repo.forks_count, 0),
            languages: new Set(nonForkRepos.map((repo) => repo.language).filter(Boolean)).size,
        };

        Object.entries(stats).forEach(([key, value]) => {
            const idMap = {
                totalRepos: 'totalRepos',
                totalStars: 'totalStars',
                totalForks: 'totalForks',
                languages: 'languages',
            };
            const el = document.getElementById(idMap[key]);
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

function setupSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.dataset.width || '0';
                    fill.style.setProperty('--target-width', `${width}%`);
                    fill.classList.add('animated');
                    fill.style.width = `${width}%`;
                    observer.unobserve(fill);
                }
            });
        },
        { threshold: 0.4 }
    );

    fills.forEach((fill) => observer.observe(fill));
}

function observeReveal(el) {
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
    const selectors = [
        '.metric-card',
        '.skill-panel',
        '.timeline-item',
        '.stat-box',
        '.stack-card',
        '.about-quote',
        '.contact-shell',
    ];

    document.querySelectorAll(selectors.join(',')).forEach((el, index) => {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(index % 4) * 80}ms`;
        observeReveal(el);
    });
}

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

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                });

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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
