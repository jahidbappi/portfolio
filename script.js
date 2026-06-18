'use strict';

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

const VCARD_CATEGORY = {
  web: 'web development',
  ai: 'applications',
  mobile: 'web design',
};

const SERVICES = [
  {
    icon: 'assets/images/icon-dev.svg',
    title: 'Full-Stack Development',
    text: 'React, Node.js, Django, and Flask — from API design to polished frontends and live Vercel deployments.',
  },
  {
    icon: 'assets/images/icon-design.svg',
    title: 'AI & Machine Learning',
    text: 'TensorFlow, PyTorch, and practical AI tools like code-reviewer-ai with multi-language support.',
  },
  {
    icon: 'assets/images/icon-app.svg',
    title: 'Database Architecture',
    text: 'Oracle, MySQL, PostgreSQL, and MongoDB — schema design, optimization, and production data layers.',
  },
  {
    icon: 'assets/images/icon-photo.svg',
    title: 'DevOps & Cloud',
    text: 'AWS, Azure, Docker, Kubernetes, and CI/CD workflows for reliable, scalable infrastructure.',
  },
];

const SKILL_BARS = [
  { name: 'Full-Stack Web', value: 90 },
  { name: 'Python & AI/ML', value: 85 },
  { name: 'Database Systems', value: 88 },
  { name: 'DevOps & Cloud', value: 75 },
  { name: 'TypeScript / React', value: 87 },
];

document.addEventListener('DOMContentLoaded', () => {
  renderAboutContent();
  renderServices();
  renderFocusTags();
  renderCertifications();
  renderExperience();
  renderSkillBars();
  initVcardUI();
  fetchAndDisplayProjects();
  fetchGitHubStats();
  setupContactForm();
});

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/* ---- Content from data.js ---- */

function renderAboutContent() {
  const lead = document.getElementById('aboutLead');
  const body = document.getElementById('aboutBody');
  if (lead) {
    lead.textContent = `I'm ${DATA.fullName || 'Md. Jahidul Islam'} — ${DATA.title || 'AI Engineer and Full Stack Developer'}. ${DATA.tagline || ''}`;
  }
  if (body) {
    body.textContent = DATA.description || '';
  }
}

function renderServices() {
  const list = document.getElementById('serviceList');
  if (!list) return;
  list.innerHTML = SERVICES.map(
    (s) => `
    <li class="service-item">
      <div class="service-icon-box">
        <img src="${s.icon}" alt="" width="40">
      </div>
      <div class="service-content-box">
        <h4 class="h4 service-item-title">${escapeHtml(s.title)}</h4>
        <p class="service-item-text">${escapeHtml(s.text)}</p>
      </div>
    </li>`
  ).join('');
}

function renderFocusTags() {
  const container = document.getElementById('focusTags');
  const items = DATA.focusingOn || [];
  if (!container || !items.length) return;
  container.innerHTML = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function renderCertifications() {
  const list = document.getElementById('certTimeline');
  const certs = DATA.certifications || [];
  if (!list) return;
  list.innerHTML = certs
    .map(
      (c) => `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${escapeHtml(c.title)}</h4>
      <span>${escapeHtml(c.year)}</span>
      <p class="timeline-text">${escapeHtml(c.provider)}</p>
    </li>`
    )
    .join('');
}

function renderExperience() {
  const list = document.getElementById('experienceTimeline');
  const items = DATA.experience || [];
  if (!list) return;
  list.innerHTML = items
    .map(
      (item) => `
    <li class="timeline-item">
      <h4 class="h4 timeline-item-title">${escapeHtml(item.title)}${item.subtitle ? ` · ${escapeHtml(item.subtitle)}` : ''}</h4>
      <span>${escapeHtml(item.period || '')}</span>
      <p class="timeline-text">${escapeHtml(item.description)}</p>
    </li>`
    )
    .join('');
}

function renderSkillBars() {
  const list = document.getElementById('skillsBars');
  if (!list) return;
  list.innerHTML = SKILL_BARS.map(
    (skill) => `
    <li class="skills-item">
      <div class="title-wrapper">
        <h5 class="h5">${escapeHtml(skill.name)}</h5>
        <data value="${skill.value}">${skill.value}%</data>
      </div>
      <div class="skill-progress-bg">
        <div class="skill-progress-fill" style="width: ${skill.value}%;"></div>
      </div>
    </li>`
  ).join('');
}

/* ---- vCard UI (sidebar, nav, filters) ---- */

function initVcardUI() {
  const elementToggleFunc = (elem) => elem.classList.toggle('active');

  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener('click', () => elementToggleFunc(sidebar));
  }

  const select = document.querySelector('[data-select]');
  const selectItems = document.querySelectorAll('[data-select-item]');
  const selectValue = document.querySelector('[data-selecct-value]');
  const filterBtns = document.querySelectorAll('[data-filter-btn]');

  if (select) {
    select.addEventListener('click', () => elementToggleFunc(select));
  }

  selectItems.forEach((item) => {
    item.addEventListener('click', function () {
      const label = this.textContent.trim();
      const filter = this.dataset.filter || 'all';
      if (selectValue) selectValue.textContent = label;
      if (select) elementToggleFunc(select);
      filterProjects(filter);
      syncFilterButtons(filter);
    });
  });

  let lastClickedBtn = filterBtns[0];
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter || 'all';
      if (selectValue) selectValue.textContent = this.textContent.trim();
      filterProjects(filter);
      if (lastClickedBtn) lastClickedBtn.classList.remove('active');
      this.classList.add('active');
      lastClickedBtn = this;
    });
  });

  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  navigationLinks.forEach((link) => {
    link.addEventListener('click', function () {
      const pageName = this.textContent.trim().toLowerCase();
      pages.forEach((page) => {
        const match = page.dataset.page === pageName;
        page.classList.toggle('active', match);
      });
      navigationLinks.forEach((navLink) => {
        navLink.classList.toggle('active', navLink === this);
      });
      window.scrollTo(0, 0);
    });
  });

  const form = document.querySelector('[data-form]');
  const formInputs = document.querySelectorAll('[data-form-input]');
  const formBtn = document.querySelector('[data-form-btn]');

  if (form && formBtn) {
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (form.checkValidity()) formBtn.removeAttribute('disabled');
        else formBtn.setAttribute('disabled', '');
      });
    });
  }
}

function syncFilterButtons(selectedFilter) {
  document.querySelectorAll('[data-filter-btn]').forEach((btn) => {
    const f = btn.dataset.filter || 'all';
    btn.classList.toggle('active', f === selectedFilter);
  });
}

function filterProjects(selectedFilter) {
  const items = document.querySelectorAll('[data-filter-item]');
  items.forEach((item) => {
    const cat = item.dataset.category;
    const show = selectedFilter === 'all' || cat === selectedFilter;
    item.classList.toggle('active', show);
  });
}

/* ---- GitHub projects ---- */

function getFeaturedMap() {
  const map = new Map();
  (DATA.featuredLiveProjects || []).forEach((p) => map.set(p.name.toLowerCase(), p));
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
  const excluded = new Set((DATA.excludedRepos || []).map((n) => n.toLowerCase()));
  const merged = new Map();

  repos
    .filter((repo) => !repo.fork && !excluded.has(repo.name.toLowerCase()))
    .forEach((repo) => {
      const featured = featuredMap.get(repo.name.toLowerCase());
      const cat = featured?.category || getCategory(repo.name, repo.language);
      merged.set(repo.name.toLowerCase(), {
        name: repo.name,
        description: featured?.description || repo.description || 'Open-source project',
        category: cat,
        vcardCategory: VCARD_CATEGORY[cat] || 'web development',
        github: featured?.github || repo.html_url,
        live: featured?.live || repo.homepage || null,
        updated: repo.updated_at,
        featured: featured?.featured ?? false,
      });
    });

  (DATA.featuredLiveProjects || []).forEach((project) => {
    const key = project.name.toLowerCase();
    if (!merged.has(key)) {
      merged.set(key, {
        name: project.name,
        description: project.description,
        category: project.category,
        vcardCategory: VCARD_CATEGORY[project.category] || 'web development',
        github: project.github,
        live: project.live,
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
  const list = document.getElementById('projectList');
  if (!list) return;

  try {
    const response = await fetch(`${GITHUB_API_URL}?per_page=100`);
    if (!response.ok) throw new Error('Failed to fetch');
    const repos = await response.json();
    allProjects = mergeWithFeatured(repos);
    displayProjects(allProjects);
  } catch (err) {
    console.error(err);
    allProjects = (DATA.featuredLiveProjects || []).map((p) => ({
      name: p.name,
      description: p.description,
      category: p.category,
      vcardCategory: VCARD_CATEGORY[p.category] || 'web development',
      github: p.github,
      live: p.live,
      featured: p.featured ?? true,
    }));
    displayProjects(allProjects);
  }
}

function displayProjects(projects) {
  const list = document.getElementById('projectList');
  if (!list) return;

  if (!projects.length) {
    list.innerHTML = '<li class="project-item active"><p>No projects found.</p></li>';
    return;
  }

  list.innerHTML = projects.map((p) => createProjectItem(p)).join('');
}

function createProjectItem(project) {
  const initial = project.name.charAt(0).toUpperCase();
  const catClass = project.category === 'ai' ? 'cat-ai' : project.category === 'mobile' ? 'cat-mobile' : 'cat-web';
  const href = project.live || project.github;
  const label = project.vcardCategory || VCARD_CATEGORY[project.category] || 'web development';

  return `
    <li class="project-item active" data-filter-item data-category="${label}">
      <a href="${href}" target="_blank" rel="noopener noreferrer">
        <figure class="project-img">
          <div class="project-item-icon-box">
            <ion-icon name="eye-outline"></ion-icon>
          </div>
          <div class="project-placeholder ${catClass}">${escapeHtml(initial)}</div>
        </figure>
        <h3 class="project-title">${escapeHtml(project.name)}</h3>
        <p class="project-category">${escapeHtml(label)}</p>
      </a>
    </li>`;
}

/* ---- GitHub stats ---- */

async function fetchGitHubStats() {
  try {
    const response = await fetch(GITHUB_API_URL);
    if (!response.ok) throw new Error('Failed');
    const repos = await response.json();
    const excluded = new Set((DATA.excludedRepos || []).map((n) => n.toLowerCase()));
    const nonFork = repos.filter((r) => !r.fork && !excluded.has(r.name.toLowerCase()));

    const stats = {
      totalRepos: nonFork.length,
      totalStars: nonFork.reduce((s, r) => s + r.stargazers_count, 0),
      totalForks: nonFork.reduce((s, r) => s + r.forks_count, 0),
      languages: new Set(nonFork.map((r) => r.language).filter(Boolean)).size,
    };

    Object.entries(stats).forEach(([key, value]) => {
      const el = document.getElementById(key);
      if (el) {
        el.dataset.target = value;
        el.textContent = '0';
      }
    });

    const statsPage = document.querySelector('[data-page="stats"]');
    if (statsPage) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !statsAnimated) {
              statsAnimated = true;
              animateCounters();
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(statsPage);
    }
  } catch (err) {
    console.error(err);
  }
}

function animateCounters() {
  ['totalRepos', 'totalStars', 'totalForks', 'languages'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}

/* ---- Contact form ---- */

function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[data-form-btn]');
    btn.setAttribute('disabled', '');

    const accessKey = DATA.web3formsAccessKey;
    const hasWeb3Forms = accessKey && accessKey !== 'YOUR_WEB3FORMS_ACCESS_KEY';

    try {
      if (hasWeb3Forms) {
        const formData = new FormData(form);
        formData.append('access_key', accessKey);
        formData.append('subject', `Portfolio contact from ${formData.get('name')}`);
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
        const result = await res.json();
        if (!result.success) throw new Error(result.message);
        showToast("Message sent! I'll get back to you soon.");
        form.reset();
      } else {
        const mailto = `mailto:${DATA.social?.email || 'jahidcric2000@gmail.com'}?subject=${encodeURIComponent('Portfolio Contact')}&body=${encodeURIComponent(
          `Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`
        )}`;
        window.location.href = mailto;
        showToast('Opening your email client…');
      }
    } catch (err) {
      console.error(err);
      showToast('Could not send. Please email me directly.', true);
    } finally {
      btn.removeAttribute('disabled');
    }
  });
}

function showToast(message, isError = false) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toastMessage');
  if (!toast || !msg) return;
  toast.classList.toggle('toast-error', isError);
  msg.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible', 'toast-error');
  }, 4000);
}
