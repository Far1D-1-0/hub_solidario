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

    const menuBtn = document.getElementById('menu-btn');
    const sideNav = document.getElementById('side-nav');
    const overlay = document.getElementById('nav-overlay');

    function openNav()  { sideNav.classList.add('open'); overlay.classList.add('show'); menuBtn.classList.add('open'); }
    function closeNav() { sideNav.classList.remove('open'); overlay.classList.remove('show'); menuBtn.classList.remove('open'); }

    menuBtn.addEventListener('click', openNav);
    overlay.addEventListener('click', closeNav);
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeNav));

    // ── Feed dinámico ──────────────────────────────────────────────────────────

    function escHtml(s) {
      return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function timeAgo(dateStr) {
      const diff  = Date.now() - new Date(dateStr).getTime();
      const mins  = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days  = Math.floor(diff / 86400000);
      if (mins  < 1)  return 'Ahora mismo';
      if (mins  < 60) return `Hace ${mins} ${mins === 1 ? 'minuto' : 'minutos'}`;
      if (hours < 24) return `Hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
      if (days  < 7)  return `Hace ${days} ${days === 1 ? 'día' : 'días'}`;
      return new Date(dateStr).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    const ICO_HEART = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`;
    const ICO_CHAT  = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`;
    const ICO_SHARE = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`;
    const ICO_CAL   = `<svg width="13" height="13" fill="none" stroke="#1A56E8" stroke-width="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`;

    async function initFeed() {
      const list = document.getElementById('feed-list');
      try {
        const res  = await fetch('controllers/feed/list.php?limit=20');
        const json = await res.json();
        if (!json.ok || !json.data.length) {
          list.innerHTML = '<p class="feed-empty">No hay publicaciones aún.</p>';
          return;
        }
        list.innerHTML = json.data.map(pub => `
          <div class="feed-card">
            <div class="feed-top-row">
              <div>
                <div class="feed-author">${escHtml(pub.autor_nombre)}</div>
                <div class="feed-project">
                  <a href="project-page.html?id=${pub.id_proyecto}" class="feed-project-link">${escHtml(pub.proyecto_nombre)}</a>
                </div>
              </div>
              <span class="feed-time">${timeAgo(pub.fecha_publicacion)}</span>
            </div>
            <p class="feed-text">${escHtml(pub.contenido)}</p>
            <div class="feed-actions">
              <button class="feed-btn">${ICO_HEART} Me gusta</button>
              <button class="feed-btn">${ICO_CHAT} Comentar</button>
              <button class="feed-btn">${ICO_SHARE} Compartir</button>
            </div>
          </div>
        `).join('');
      } catch {
        list.innerHTML = '<p class="feed-empty">Error al cargar publicaciones.</p>';
      }
    }

    async function initEvents() {
      const list = document.getElementById('events-list');
      try {
        const res  = await fetch('controllers/events/list.php');
        const json = await res.json();
        if (!json.ok) { list.innerHTML = ''; return; }

        const today    = new Date(); today.setHours(0, 0, 0, 0);
        const upcoming = (json.data || [])
          .filter(e => new Date(e.fecha_realizacion) >= today)
          .slice(0, 3);

        if (!upcoming.length) {
          list.innerHTML = '<p class="feed-empty" style="font-size:.83rem;color:#9CA3AF;padding:8px 0">No hay eventos próximos.</p>';
          return;
        }

        list.innerHTML = upcoming.map(e => `
          <div class="event-item">
            <div class="event-name">${escHtml(e.nombre)}</div>
            <div class="event-project">${escHtml(e.proyecto_nombre)}</div>
            <div class="event-meta-row">${ICO_CAL} ${formatDate(e.fecha_realizacion)}</div>
          </div>
        `).join('');
      } catch {
        list.innerHTML = '';
      }
    }

    initFeed();
    initEvents();
