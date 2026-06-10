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

/* ─── IMPACTO EN LOS ODS (index only) ───────────────────────── */
(function () {
  const odsGrid   = document.getElementById('ods-grid');
  const odsBottom = document.getElementById('ods-bottom');
  if (!odsGrid || !odsBottom) return;

  function fmt(n) {
    return n > 0 ? n.toLocaleString('es-MX') : '0';
  }

  function observeNew(container) {
    container.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    container.querySelectorAll('.progress-bar .fill').forEach(el => barObserver.observe(el));
  }

  function renderOdsCard(c) {
    const val = c.valor_actual > 0 ? fmt(c.valor_actual) : '—';
    const pct = c.porcentaje > 0 ? c.porcentaje + '% de meta anual' : 'Sin resultados registrados';
    return `
      <div class="ods-card reveal">
        <div class="ods-tag">
          <div class="dot" style="background:${c.color}"></div>ODS ${c.ods_numero}
        </div>
        <h4>${c.ods_nombre}</h4>
        <div class="ods-number" style="color:${c.color}">${val}</div>
        <div class="ods-sublabel">${c.etiqueta}</div>
        <div class="progress-bar">
          <div class="fill" style="width:${c.porcentaje}%;background:${c.color}"></div>
        </div>
        <div class="progress-pct">${pct}</div>
      </div>`;
  }

  function renderOdsBottomCard(c) {
    const desc = c.valor_actual > 0
      ? fmt(c.valor_actual) + ' ' + c.etiqueta.toLowerCase()
      : 'Sin resultados registrados';
    return `
      <div class="ods-bottom-card reveal">
        <div class="ods-tag">
          <svg width="14" height="14" fill="none" stroke="${c.color}" stroke-width="1.8" viewBox="0 0 24 24">
            <circle cx="9" cy="7" r="4"/><path d="M2 20c0-4 3.1-7 7-7"/>
            <circle cx="16" cy="9" r="3"/><path d="M14 20c0-3 2-5 5-5"/>
          </svg>
          ODS ${c.ods_numero}: ${c.ods_nombre}
        </div>
        <p>${desc}</p>
        <div class="progress-bar">
          <div class="fill" style="width:${c.porcentaje}%;background:${c.color}"></div>
        </div>
      </div>`;
  }

  fetch('controllers/dashboard/impact.php')
    .then(r => r.json())
    .then(json => {
      if (!json.ok) return;
      const t = json.data.totales;
      const cats = json.data.por_categoria || [];

      // Stat cards
      const elBenef = document.getElementById('stat-num-beneficiarios');
      const elSubB  = document.getElementById('stat-sub-beneficiarios');
      const elHoras = document.getElementById('stat-num-horas');
      const elSubH  = document.getElementById('stat-sub-horas');
      const elOds   = document.getElementById('stat-num-ods');

      if (elBenef) elBenef.textContent = fmt(t.beneficiarios);
      if (elSubB)  elSubB.textContent  = t.proyectos_activos + ' proyecto' + (t.proyectos_activos !== 1 ? 's' : '') + ' activo' + (t.proyectos_activos !== 1 ? 's' : '');
      if (elHoras) elHoras.textContent = fmt(t.horas_voluntariado);
      if (elSubH)  elSubH.textContent  = t.proyectos_activos + ' proyecto' + (t.proyectos_activos !== 1 ? 's' : '') + ' activo' + (t.proyectos_activos !== 1 ? 's' : '');
      if (elOds)   elOds.textContent   = t.ods_impactados;

      // ODS grid (primeras 4 categorías)
      odsGrid.innerHTML = cats.slice(0, 4).map(renderOdsCard).join('');
      observeNew(odsGrid);

      // ODS bottom (categorías 5-7)
      odsBottom.innerHTML = cats.slice(4).map(renderOdsBottomCard).join('');
      observeNew(odsBottom);
    })
    .catch(() => {});
})();
