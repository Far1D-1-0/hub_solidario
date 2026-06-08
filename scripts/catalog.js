    let PROJECTS        = [];
    let activeCategory  = '';
    let searchQuery     = '';
    let pendingDeleteId = null;

    // ── Cargar proyectos desde la API ─────────────────────────────
    async function loadProjects() {
      try {
        const res  = await fetch('controllers/projects/list.php');
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || 'Error al cargar proyectos');
        PROJECTS = json.data;
      } catch (err) {
        document.getElementById('catalog-grid').innerHTML =
          `<div class="no-results">No se pudieron cargar los proyectos: ${err.message}</div>`;
        return false;
      }
      return true;
    }

    // ── Stats ─────────────────────────────────────────────────────
    function buildStats() {
      const totalVol = PROJECTS.reduce((s, p) => s + (p.num_voluntarios || 0), 0);
      const cats     = new Set(PROJECTS.map(p => p.categoria_nombre).filter(Boolean)).size;
      document.getElementById('catalog-stats').innerHTML = `
        <span class="catalog-stat-chip">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
          ${PROJECTS.length} Proyectos
        </span>
        <span class="catalog-stat-chip">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          ${cats} Categorías
        </span>
        <span class="catalog-stat-chip">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
          ${totalVol}+ Voluntarios
        </span>
      `;
    }

    // ── Filtro de categorías ──────────────────────────────────────
    function buildPills() {
      const container  = document.getElementById('filter-pills');
      const categories = [...new Set(PROJECTS.map(p => p.categoria_nombre).filter(Boolean))];
      const all        = ['', ...categories];
      container.innerHTML = all.map(cat => {
        const label  = cat || 'Todas';
        const active = activeCategory === cat ? 'active' : '';
        return `<button class="filter-pill ${active}" data-cat="${cat}">${label}</button>`;
      }).join('');
      container.querySelectorAll('.filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          activeCategory = btn.dataset.cat;
          buildPills();
          render();
        });
      });
    }

    function getSorted(list) {
      const sort = document.getElementById('catalog-sort').value;
      const arr  = [...list];
      if (sort === 'volunteers-desc') return arr.sort((a, b) => (b.num_voluntarios || 0) - (a.num_voluntarios || 0));
      if (sort === 'az') return arr.sort((a, b) => a.nombre.localeCompare(b.nombre));
      if (sort === 'za') return arr.sort((a, b) => b.nombre.localeCompare(a.nombre));
      return arr;
    }

    function render() {
      const q = searchQuery.toLowerCase();
      let list = PROJECTS.filter(p =>
        (!activeCategory || p.categoria_nombre === activeCategory) &&
        (!q || p.nombre.toLowerCase().includes(q) ||
               (p.descripcion || '').toLowerCase().includes(q) ||
               (p.lider_nombre || '').toLowerCase().includes(q))
      );
      list = getSorted(list);

      document.getElementById('catalog-count').textContent =
        `Mostrando ${list.length} proyecto${list.length !== 1 ? 's' : ''}`;

      const grid = document.getElementById('catalog-grid');
      if (!list.length) {
        grid.innerHTML = '<div class="no-results">No se encontraron proyectos con esos filtros.</div>';
        return;
      }

      grid.innerHTML = list.map(p => {
        const color      = p.categoria_color || '#6B7280';
        const shortCat   = p.categoria_nombre || '';
        const leaderHref = p.lider_id
          ? `profile.html?id=${p.lider_id}`
          : `profile.html?leader=${encodeURIComponent(p.lider_nombre || '')}`;

        return `
          <div class="cat-card">
            <div class="cat-img-wrap">
              ${p.imagen ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy"/>` : '<div class="cat-img-placeholder"></div>'}
              ${shortCat ? `<span class="cat-badge" style="background:${color}">${shortCat}</span>` : ''}
              <button class="cat-admin-del" data-id="${p.id}" data-title="${p.nombre.replace(/"/g,'&quot;')}" title="Eliminar proyecto (Admin)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
              </button>
              <span class="cat-volunteers-chip">
                <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                ${p.num_voluntarios || 0} voluntarios
              </span>
            </div>
            <div class="cat-body">
              <div class="cat-title">${p.nombre}</div>
              <p class="cat-desc">${p.descripcion || ''}</p>
              <div class="cat-meta">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <a href="${leaderHref}" class="leader-link">${p.lider_nombre || '—'}</a>
                <span style="margin-left:auto;display:flex;align-items:center;gap:4px">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${p.ubicacion || ''}
                </span>
              </div>
              <a class="cat-link" href="project-page.html?id=${p.id}">
                Ver detalles
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>`;
      }).join('');

      document.querySelectorAll('.cat-admin-del').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          pendingDeleteId = parseInt(btn.dataset.id, 10);
          document.getElementById('adm-proj-name').textContent = btn.dataset.title;
          document.getElementById('admin-del-overlay').classList.add('show');
        });
      });
    }

    // ── Búsqueda ──────────────────────────────────────────────────
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value;
      searchClear.classList.toggle('show', !!searchQuery);
      render();
    });
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.classList.remove('show');
      searchInput.focus();
      render();
    });
    document.getElementById('catalog-sort').addEventListener('change', render);

    // ── Modal eliminar ────────────────────────────────────────────
    document.getElementById('adm-cancel').addEventListener('click', () => {
      document.getElementById('admin-del-overlay').classList.remove('show');
      pendingDeleteId = null;
    });
    document.getElementById('admin-del-overlay').addEventListener('click', e => {
      if (e.target === document.getElementById('admin-del-overlay')) {
        document.getElementById('admin-del-overlay').classList.remove('show');
        pendingDeleteId = null;
      }
    });
    document.getElementById('adm-confirm').addEventListener('click', async () => {
      if (pendingDeleteId === null) return;
      const id = pendingDeleteId;
      document.getElementById('admin-del-overlay').classList.remove('show');
      pendingDeleteId = null;

      try {
        const res  = await fetch('controllers/projects/delete.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const json = await res.json();
        if (!json.ok) { alert(json.error || 'No se pudo eliminar el proyecto'); return; }
        PROJECTS = PROJECTS.filter(p => p.id !== id);
        buildStats();
        buildPills();
        render();
      } catch {
        alert('Error de conexión al eliminar el proyecto');
      }
    });

    // ── Nav ───────────────────────────────────────────────────────
    (function () {
      const stored     = JSON.parse(localStorage.getItem('user') || 'null');
      const panel      = document.getElementById('user-panel');
      const avatar     = document.getElementById('nav-avatar');
      const uname      = document.getElementById('nav-username');
      const logoutBtn  = document.getElementById('nav-logout');
      const perfilLink = document.querySelector('.nav-links a[href="login.html"]');

      if (stored && stored.loggedIn) {
        const name = stored.nombre || stored.username || 'Usuario';
        panel.classList.add('visible');
        uname.textContent  = name;
        avatar.textContent = name[0].toUpperCase();
        if (perfilLink) perfilLink.setAttribute('href', 'profile.html');

        if (stored.rol_codigo === 'ADMIN' || stored.rol_codigo === 'LIDER') {
          const registerLink = document.getElementById('nav-register-link');
          if (registerLink) registerLink.style.display = '';
        }
        if (stored.rol_codigo === 'ADMIN') {
          document.body.classList.add('is-admin');
          const adminLink = document.getElementById('nav-admin-link');
          if (adminLink) adminLink.style.display = '';
        }
      }

      logoutBtn.addEventListener('click', async () => {
        try { await fetch('controllers/auth/logout.php', { method: 'POST' }); } catch {}
        localStorage.removeItem('user');
        panel.classList.remove('visible');
        document.body.classList.remove('is-admin');
        if (perfilLink) perfilLink.setAttribute('href', 'login.html');
        const registerLink = document.getElementById('nav-register-link');
        if (registerLink) registerLink.style.display = 'none';
        const adminLink = document.getElementById('nav-admin-link');
        if (adminLink) adminLink.style.display = 'none';
        closeNav();
      });
    })();

    const menuBtn = document.getElementById('menu-btn');
    const sideNav = document.getElementById('side-nav');
    const overlay = document.getElementById('nav-overlay');

    function openNav()  { sideNav.classList.add('open'); overlay.classList.add('show'); menuBtn.classList.add('open'); }
    function closeNav() { sideNav.classList.remove('open'); overlay.classList.remove('show'); menuBtn.classList.remove('open'); }

    menuBtn.addEventListener('click', openNav);
    overlay.addEventListener('click', closeNav);
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeNav));

    // ── Init ──────────────────────────────────────────────────────
    loadProjects().then(ok => {
      if (!ok) return;
      buildStats();
      buildPills();
      render();
    });
