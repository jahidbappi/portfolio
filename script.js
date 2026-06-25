'use strict';

const DATA = window.PORTFOLIO_DATA || {};
const API = `https://api.github.com/users/${DATA.githubUsername || 'jahidbappi'}/repos`;

let projects = [];
let activeFilter = 'all';
let statsDone = false;

const LANG_MAP = {
  Python: 'ai', 'Jupyter Notebook': 'ai', TypeScript: 'web', JavaScript: 'web',
  HTML: 'web', CSS: 'web', PHP: 'web', Java: 'mobile', 'C++': 'web', C: 'web',
};

const TERMINAL_LINES = [
  '<span class="cm"># Initializing inference pipeline...</span>',
  '<span class="kw">from</span> <span class="fn">jahid</span> <span class="kw">import</span> <span class="str">Engineer</span>',
  'engineer = <span class="fn">Engineer</span>(<span class="str">"AI + Full Stack"</span>)',
  'engineer.<span class="fn">deploy</span>(<span class="str">"production"</span>)  <span class="cm"># ✓ live on Vercel</span>',
  '<span class="cm"># Ready.</span>',
];

document.addEventListener('DOMContentLoaded', init);

function init() {
  renderMetrics();
  renderChecks();
  renderSkills();
  renderFocus();
  renderTimeline();
  renderCerts();
  buildMarquee();
  runTerminal();
  runRoleRotator();
  fetchProjects();
  fetchStats();
  setupNav();
  setupReveal();
  setupParticles();
  setupCursor();
  setupProgress();
  setupFilters();
  setupForm();
  setupBentoGlow();

  window.addEventListener('load', () => setTimeout(() => document.getElementById('boot')?.classList.add('done'), 500));
  setTimeout(() => document.getElementById('boot')?.classList.add('done'), 2500);
}

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

/* ── Render static content ── */

function renderMetrics() {
  const el = $('#heroMetrics');
  if (!el) return;
  el.innerHTML = (DATA.heroStats || []).map(s => `
    <div><span class="metric-val">${esc(s.value)}</span><span class="metric-lbl">${esc(s.label)}</span></div>
  `).join('');
}

function renderChecks() {
  const el = $('#aboutChecks');
  if (!el) return;
  el.innerHTML = (DATA.aboutHighlights || []).map(h =>
    `<li><i class="fa-solid fa-check"></i> ${esc(h)}</li>`
  ).join('');
}

const BENTO_ICONS = {
  Languages: 'fa-code',
  'Databases & ORMs': 'fa-database',
  'Full-Stack Web': 'fa-layer-group',
  'AI & Machine Learning': 'fa-brain',
  'DevOps & Cloud': 'fa-cloud',
  'Tools & IDEs': 'fa-wrench',
};

function renderSkills() {
  const el = $('#skillBento');
  const groups = DATA.skillGroups || [];
  if (!el) return;
  el.innerHTML = groups.map(g => `
    <article class="bento-card${g.featured ? ' featured' : ''}" data-reveal>
      <div class="bento-icon"><i class="fa-solid ${BENTO_ICONS[g.title] || 'fa-circle'}"></i></div>
      <h3>${esc(g.title)}</h3>
      <div class="chips">${g.skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>
    </article>
  `).join('');
  observeReveal(el.querySelectorAll('[data-reveal]'));
}

function renderFocus() {
  const el = $('#focusStrip');
  const items = DATA.focusingOn || [];
  if (!el || !items.length) return;
  el.innerHTML = `<strong>Currently exploring</strong> ${items.map(i => `<span class="pill">${esc(i)}</span>`).join('')}`;
}

function renderTimeline() {
  const el = $('#timeline');
  if (!el) return;
  el.innerHTML = (DATA.experience || []).map(e => `
    <div class="t-item" data-reveal>
      <time>${esc(e.period || '')}</time>
      <h4>${esc(e.title)}${e.subtitle ? ` · ${esc(e.subtitle)}` : ''}</h4>
      <p>${esc(e.description)}</p>
    </div>
  `).join('');
  observeReveal(el.querySelectorAll('[data-reveal]'));
}

function renderCerts() {
  const el = $('#creds');
  if (!el) return;
  el.innerHTML = (DATA.certifications || []).map(c => `
    <div class="cred" data-reveal>
      <h4>${esc(c.title)}</h4>
      <p>${esc(c.provider)}</p>
      <span>${esc(c.year)}</span>
    </div>
  `).join('');
  observeReveal(el.querySelectorAll('[data-reveal]'));
}

function buildMarquee() {
  const el = $('#marquee');
  const skills = (DATA.skillGroups || []).flatMap(g => g.skills.slice(0, 3));
  const unique = [...new Set(skills)];
  const html = unique.map(s => `<span><em>◆</em>${esc(s)}</span>`).join('');
  if (el) el.innerHTML = html + html;
}

/* ── Terminal typing ── */

function runTerminal() {
  const el = $('#terminal');
  if (!el) return;
  let line = 0;
  function showNext() {
    if (line >= TERMINAL_LINES.length) return;
    el.innerHTML = TERMINAL_LINES.slice(0, line + 1).join('\n');
    line++;
    setTimeout(showNext, 550);
  }
  setTimeout(showNext, 900);
}

/* ── Role rotator ── */

function runRoleRotator() {
  const el = $('#roleText');
  const roles = DATA.heroRoles || ['intelligent systems.'];
  if (!el || roles.length < 2) return;
  let i = 0;
  setInterval(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => {
      i = (i + 1) % roles.length;
      el.textContent = roles[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 280);
  }, 3500);
}

/* ── GitHub projects ── */

function getCat(name, lang) {
  const o = DATA.repoCategoryOverrides || {};
  if (o[name]) return o[name];
  return LANG_MAP[lang] || 'web';
}

function mergeRepos(repos) {
  const featured = new Map((DATA.featuredLiveProjects || []).map(p => [p.name.toLowerCase(), p]));
  const excluded = new Set((DATA.excludedRepos || []).map(n => n.toLowerCase()));
  const map = new Map();

  repos.filter(r => !r.fork && !excluded.has(r.name.toLowerCase())).forEach(r => {
    const f = featured.get(r.name.toLowerCase());
    map.set(r.name.toLowerCase(), {
      name: r.name,
      desc: f?.description || r.description || 'Open-source project',
      cat: f?.category || getCat(r.name, r.language),
      tech: f?.tech || [r.language].filter(Boolean),
      github: f?.github || r.html_url,
      live: f?.live || r.homepage || null,
      featured: f?.featured ?? false,
      updated: r.updated_at,
    });
  });

  (DATA.featuredLiveProjects || []).forEach(p => {
    const k = p.name.toLowerCase();
    if (!map.has(k)) {
      map.set(k, {
        name: p.name, desc: p.description, cat: p.category,
        tech: p.tech, github: p.github, live: p.live,
        featured: p.featured ?? true, updated: new Date().toISOString(),
      });
    }
  });

  return [...map.values()].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return new Date(b.updated) - new Date(a.updated);
  });
}

function countMobileApps() {
  return (DATA.mobileGroups || []).reduce((n, g) => n + g.projects.length, 0);
}

function appInitials(name) {
  const words = name.replace(/[^a-zA-Z0-9\s]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

async function fetchProjects() {
  try {
    const res = await fetch(`${API}?per_page=100`);
    if (!res.ok) throw new Error('fetch failed');
    projects = mergeRepos(await res.json());
  } catch {
    projects = (DATA.featuredLiveProjects || []).map(p => ({
      name: p.name, desc: p.description, cat: p.category,
      tech: p.tech, github: p.github, live: p.live, featured: p.featured ?? true,
    }));
  }
  renderWork(activeFilter);
}

function renderWork(filter = 'all') {
  activeFilter = filter;
  renderProjects(projects, filter);
  renderMobileShowcase(filter);
}

function renderProjects(list, filter = 'all') {
  const grid = $('#workGrid');
  if (!grid) return;

  const showGrid = filter === 'all' || filter === 'web' || filter === 'ai';
  grid.hidden = !showGrid;
  if (!showGrid) return;

  const filtered = list.filter(p => filter === 'all' || p.cat === filter);
  if (!filtered.length) {
    grid.innerHTML = '<div class="work-loading">No projects found.</div>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="project${p.featured ? ' featured' : ''}" data-cat="${p.cat}">
      <span class="project-cat ${p.cat}">${p.cat.toUpperCase()}</span>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <div class="project-tags">${(p.tech || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="project-links">
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Code</a>` : ''}
        ${p.live ? `<a href="${p.live}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>` : ''}
      </div>
    </article>
  `).join('');
  observeReveal(grid.querySelectorAll('.project'));
}

function renderMobileShowcase(filter = 'all') {
  const wrap = $('#mobileShowcase');
  const groups = DATA.mobileGroups || [];
  if (!wrap || !groups.length) return;

  const showMobile = filter === 'all' || filter === 'mobile';
  wrap.hidden = !showMobile;
  if (!showMobile) return;

  const total = countMobileApps();
  const compact = filter === 'mobile';

  wrap.innerHTML = `
    <div class="mobile-showcase-head${compact ? ' solo' : ''}">
      <div class="mobile-showcase-intro">
        <span class="mobile-badge"><i class="fa-brands fa-google-play"></i> Google Play</span>
        <h3>${compact ? 'Android apps I built' : 'Published on Google Play'}</h3>
        <p>${total} live Android apps — business platforms, games, and utilities shipped to production.</p>
      </div>
      <div class="mobile-showcase-stats">
        ${groups.map(g => `
          <div class="mobile-stat">
            <span class="mobile-stat-num">${g.projects.length}</span>
            <span class="mobile-stat-lbl">${esc(g.label)}</span>
          </div>
        `).join('')}
      </div>
    </div>
    ${groups.map(g => `
      <section class="mobile-group" data-reveal>
        <div class="mobile-group-head">
          <div class="mobile-group-icon ${g.id}"><i class="fa-solid ${g.icon}"></i></div>
          <div>
            <h4>${esc(g.label)}</h4>
            <span>${g.projects.length} app${g.projects.length === 1 ? '' : 's'}</span>
          </div>
        </div>
        <div class="mobile-apps-grid">
          ${g.projects.map(p => `
            <a class="mobile-app-card" href="${p.play}" target="_blank" rel="noopener">
              <div class="mobile-app-icon ${g.id}">${esc(appInitials(p.name))}</div>
              <div class="mobile-app-body">
                <h5>${esc(p.name)}</h5>
                <p>${esc(p.description)}</p>
              </div>
              <span class="mobile-app-link" aria-hidden="true"><i class="fa-brands fa-google-play"></i></span>
            </a>
          `).join('')}
        </div>
      </section>
    `).join('')}
  `;

  observeReveal(wrap.querySelectorAll('[data-reveal]'));
}

function setupFilters() {
  $$('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderWork(btn.dataset.f);
    });
  });
}

/* ── GitHub stats ── */

async function fetchStats() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error();
    const repos = await res.json();
    const excluded = new Set((DATA.excludedRepos || []).map(n => n.toLowerCase()));
    const clean = repos.filter(r => !r.fork && !excluded.has(r.name.toLowerCase()));
    const stats = {
      totalRepos: clean.length,
      totalStars: clean.reduce((s, r) => s + r.stargazers_count, 0),
      totalForks: clean.reduce((s, r) => s + r.forks_count, 0),
      languages: new Set(clean.map(r => r.language).filter(Boolean)).size,
    };
    Object.entries(stats).forEach(([k, v]) => {
      const el = document.getElementById(k);
      if (el) { el.dataset.target = v; el.textContent = '0'; }
    });
    const row = $('#statsRow');
    if (row) {
      new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !statsDone) {
          statsDone = true;
          countUp();
        }
      }, { threshold: 0.3 }).observe(row);
    }
  } catch { /* silent */ }
}

function countUp() {
  ['totalRepos', 'totalStars', 'totalForks', 'languages'].forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const target = +el.dataset.target || 0;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / 1400, 1);
      el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  });
}

/* ── Nav & UI ── */

function setupNav() {
  const header = $('#header');
  const menuBtn = $('#menuBtn');
  const drawer = $('#drawer');

  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', scrollY > 40), { passive: true });

  menuBtn?.addEventListener('click', () => {
    const open = drawer?.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
  });

  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    drawer.classList.remove('open');
    menuBtn?.classList.remove('open');
  }));

  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id !== '#' && $(id)) {
        e.preventDefault();
        $(id).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function setupReveal() {
  observeReveal($$('[data-reveal]'));
}

function observeReveal(els) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('shown');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

function setupBentoGlow() {
  $$('.bento-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/* ── Particles ── */

function setupParticles() {
  const canvas = $('#field');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ctx = canvas.getContext('2d');
  let w, h, pts;

  const resize = () => {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
    const n = Math.min(innerWidth < 768 ? 35 : 80, Math.floor(w * h / 14000));
    pts = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.5,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - d / 110)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  };

  resize();
  draw();
  addEventListener('resize', resize);
}

function setupCursor() {
  const c = $('#cursor');
  if (!c || !matchMedia('(pointer: fine)').matches) return;
  let raf;
  addEventListener('mousemove', e => {
    c.style.opacity = '1';
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      c.style.left = e.clientX + 'px';
      c.style.top = e.clientY + 'px';
    });
  });
  addEventListener('mouseleave', () => c.style.opacity = '0');
}

function setupProgress() {
  const bar = $('#progress');
  if (!bar) return;
  addEventListener('scroll', () => {
    const d = document.documentElement;
    bar.style.width = (d.scrollTop / (d.scrollHeight - d.clientHeight) * 100) + '%';
  }, { passive: true });
}

/* ── Contact ── */

function setupForm() {
  const form = $('#contactForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    const key = DATA.web3formsAccessKey;
    const hasKey = key && key !== 'YOUR_WEB3FORMS_ACCESS_KEY';
    try {
      if (hasKey) {
        const fd = new FormData(form);
        fd.append('access_key', key);
        fd.append('subject', `Portfolio: ${fd.get('name')}`);
        const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
        const j = await r.json();
        if (!j.success) throw new Error();
        toast("Message sent! I'll reply soon.");
        form.reset();
      } else {
        location.href = `mailto:${DATA.social?.email}?subject=${encodeURIComponent('Portfolio Contact')}&body=${encodeURIComponent(
          `Name: ${form.name.value}\nEmail: ${form.email.value}\n\n${form.message.value}`
        )}`;
        toast('Opening email client…');
      }
    } catch {
      toast('Could not send — email me directly.', true);
    } finally {
      btn.disabled = false;
    }
  });
}

function toast(msg, error = false) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.toggle('error', error);
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show', 'error'), 4000);
}
