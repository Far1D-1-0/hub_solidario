/* ─── LOGIN STATE ───────────────────────────────────────────── */
(function () {
  const panel      = document.getElementById('user-panel');
  const avatar     = document.getElementById('nav-avatar');
  const uname      = document.getElementById('nav-username');
  const logoutBtn  = document.getElementById('nav-logout');
  const perfilLink = document.querySelector('.nav-links a[href="login.html"]');

  getUser().then(function (stored) {
    if (!stored || !stored.loggedIn) return;
    const name = stored.nombre || 'Usuario';
    panel.classList.add('visible');
    uname.textContent  = name;
    avatar.textContent = name[0].toUpperCase();
    if (perfilLink) perfilLink.setAttribute('href', 'profile.html');

    if (stored.rol_codigo === 'ADMIN' || stored.rol_codigo === 'LIDER') {
      const registerLink = document.getElementById('nav-register-link');
      if (registerLink) registerLink.style.display = '';
    }
    if (stored.rol_codigo === 'LIDER') {
      fetch('controllers/projects/list.php')
        .then(r => r.json())
        .then(json => {
          const myProjects = (json.data || []).filter(p => p.lider_id == stored.id);
          if (myProjects.length) {
            const tpl = document.getElementById('nav-my-project-link');
            if (tpl) {
              tpl.style.display = '';
              tpl.querySelector('a').href = 'project-page.html?id=' + myProjects[0].id;
              tpl.querySelector('strong').textContent = myProjects[0].nombre;
              for (let i = 1; i < myProjects.length; i++) {
                const clone = tpl.cloneNode(true);
                clone.removeAttribute('id');
                clone.classList.add('nav-my-project-clone');
                clone.querySelector('a').href = 'project-page.html?id=' + myProjects[i].id;
                clone.querySelector('strong').textContent = myProjects[i].nombre;
                tpl.after(clone);
              }
            }
            const registerLink = document.getElementById('nav-register-link');
            if (registerLink) registerLink.style.display = 'none';
          }
        })
        .catch(() => {});
    }
    if (stored.rol_codigo === 'ADMIN') {
      const adminLink = document.getElementById('nav-admin-link');
      if (adminLink) adminLink.style.display = '';
    }
  });

  logoutBtn.addEventListener('click', async () => {
    try { await fetch('controllers/auth/logout.php', { method: 'POST' }); } catch {}
    clearUser();
    panel.classList.remove('visible');
    if (perfilLink) perfilLink.setAttribute('href', 'login.html');
    const registerLink = document.getElementById('nav-register-link');
    if (registerLink) registerLink.style.display = 'none';
    const myProjectLink = document.getElementById('nav-my-project-link');
    if (myProjectLink) myProjectLink.style.display = 'none';
    document.querySelectorAll('.nav-my-project-clone').forEach(el => el.remove());
    const adminLink = document.getElementById('nav-admin-link');
    if (adminLink) adminLink.style.display = 'none';
    closeNav();
  });
})();

/* ─── SIDE NAV ──────────────────────────────────────────────── */
const menuBtn  = document.getElementById('menu-btn');
const sideNav  = document.getElementById('side-nav');
const overlay  = document.getElementById('nav-overlay');
const navLinks = document.querySelectorAll('.nav-links a');

function openNav() {
  sideNav.classList.add('open');
  overlay.classList.add('show');
  menuBtn.classList.add('open');
}

function closeNav() {
  sideNav.classList.remove('open');
  overlay.classList.remove('show');
  menuBtn.classList.remove('open');
}

menuBtn.addEventListener('click', () =>
  sideNav.classList.contains('open') ? closeNav() : openNav()
);
overlay.addEventListener('click', closeNav);
navLinks.forEach(link => link.addEventListener('click', closeNav));

/* ─── SCROLL REVEAL ─────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── PROGRESS BARS ANIMATION ───────────────────────────────── */
const bars = document.querySelectorAll('.progress-bar .fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const targetWidth = entry.target.style.width;
      entry.target.style.width = '0';
      requestAnimationFrame(() => { entry.target.style.width = targetWidth; });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));

/* ─── FEATURED PROJECTS (index only) ────────────────────────── */
(function () {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const COLORS = ['#1A56E8','#F05A28','#16A34A','#7C3AED','#DC2626','#0891B2','#B45309','#0F766E'];

  fetch('controllers/projects/list.php')
    .then(r => r.json())
    .then(json => {
      if (!json.ok) return;
      const projects = (json.data || []).slice(0, 6);
      if (!projects.length) return;

      grid.innerHTML = projects.map((p, i) => {
        const lider = p.lider_nombre || 'Líder';
        const init  = lider[0].toUpperCase();
        const color = COLORS[i % COLORS.length];
        const img   = p.imagen || 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80';
        const desc  = (p.descripcion || '').length > 110
          ? p.descripcion.substring(0, 110) + '…'
          : (p.descripcion || '');
        return `
          <div class="proj-card reveal">
            <div class="proj-img">
              <img src="${img}" alt="${p.nombre}" loading="lazy"/>
              <div class="proj-author">
                <div class="avatar" style="background:${color}">${init}</div>
                ${lider}
              </div>
            </div>
            <div class="proj-body">
              <h3>${p.nombre}</h3>
              <p>${desc}</p>
              <a href="project-page.html?id=${p.id}" class="proj-link">Conocer más →</a>
            </div>
          </div>`;
      }).join('');

      grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    })
    .catch(() => {});
})();
