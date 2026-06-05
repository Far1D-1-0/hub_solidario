    const CATEGORY_COLORS = {
      'Alimentación y Nutrición':       '#16A34A',
      'Educación y Tutorías':           '#0EA5E9',
      'Medio Ambiente':                 '#059669',
      'Salud y Bienestar':              '#E11D48',
      'Construcción y Vivienda':        '#F05A28',
      'Tecnología e Inclusión Digital': '#7C3AED',
      'Arte y Cultura':                 '#DB2777',
    };

    const PILL_LABELS = {
      'Alimentación y Nutrición':       'Alimentación',
      'Educación y Tutorías':           'Educación',
      'Medio Ambiente':                 'Medio Ambiente',
      'Salud y Bienestar':              'Salud',
      'Construcción y Vivienda':        'Construcción',
      'Tecnología e Inclusión Digital': 'Tecnología',
      'Arte y Cultura':                 'Arte y Cultura',
    };

    const PROJECTS = [
      {
        title: 'Banco de Alimentos Universitario',
        desc: 'Recolección y distribución de alimentos para familias de la comunidad universitaria en situación vulnerable. Cada semana repartimos más de 200 despensas a quienes más lo necesitan.',
        category: 'Alimentación y Nutrición',
        img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80',
        leader: 'María González',
        location: 'Campus Norte',
        volunteers: 45,
      },
      {
        title: 'Tutorías Académicas Gratuitas',
        desc: 'Apoyo educativo personalizado para niños y jóvenes de comunidades con bajos recursos. Ofrecemos clases de matemáticas, español, inglés y ciencias con voluntarios universitarios.',
        category: 'Educación y Tutorías',
        img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80',
        leader: 'Carlos Ramírez',
        location: 'Comunidad San Pedro',
        volunteers: 28,
      },
      {
        title: 'Limpieza de Espacios Naturales',
        desc: 'Jornadas de limpieza y reforestación en parques, playas y áreas verdes urbanas. Hemos recuperado más de 15 espacios públicos y plantado 800 árboles nativos.',
        category: 'Medio Ambiente',
        img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&q=80',
        leader: 'Ana Martínez',
        location: 'Playa del Carmen',
        volunteers: 52,
      },
      {
        title: 'Brigadas de Salud Comunitaria',
        desc: 'Servicios médicos básicos, vacunación y campañas de prevención en comunidades rurales sin acceso a atención médica formal. Atendemos más de 300 pacientes por mes.',
        category: 'Salud y Bienestar',
        img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
        leader: 'Dr. Luis Torres',
        location: 'Comunidad Rural',
        volunteers: 34,
      },
      {
        title: 'Construcción de Viviendas Dignas',
        desc: 'Proyecto de construcción y mejoramiento de viviendas para familias en situación de vulnerabilidad extrema. En el último año hemos edificado 18 hogares con materiales de calidad.',
        category: 'Construcción y Vivienda',
        img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
        leader: 'Roberto Sánchez',
        location: 'Colonia Esperanza',
        volunteers: 19,
      },
      {
        title: 'Alfabetización Digital para Adultos',
        desc: 'Capacitación en tecnología, internet y herramientas digitales para adultos mayores y personas sin acceso previo. Más de 120 participantes certificados hasta la fecha.',
        category: 'Tecnología e Inclusión Digital',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
        leader: 'Ing. Fernanda López',
        location: 'Centro Comunitario',
        volunteers: 23,
      },
      {
        title: 'Huertos Urbanos Comunitarios',
        desc: 'Diseño, instalación y mantenimiento de huertos orgánicos en azoteas y espacios urbanos. Promovemos la soberanía alimentaria, el compostaje y la agricultura sostenible.',
        category: 'Medio Ambiente',
        img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
        leader: 'Diana Herrera',
        location: 'Parque Central',
        volunteers: 31,
      },
      {
        title: 'Centro de Apoyo Psicológico',
        desc: 'Atención psicológica gratuita e individual para personas en situación de vulnerabilidad. Contamos con profesionales certificados, grupos de apoyo y talleres de bienestar mental.',
        category: 'Salud y Bienestar',
        img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80',
        leader: 'Psic. Claudia Vega',
        location: 'Clínica Comunitaria',
        volunteers: 15,
      },
      {
        title: 'Biblioteca Comunitaria Móvil',
        desc: 'Llevamos libros, cuentos y material didáctico a comunidades sin acceso a bibliotecas. Organizamos clubes de lectura infantil y talleres de escritura creativa para todas las edades.',
        category: 'Educación y Tutorías',
        img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
        leader: 'Prof. Miguel Ángel Ruiz',
        location: 'Barrio Sur',
        volunteers: 22,
      },
      {
        title: 'Taller de Arte y Expresión Joven',
        desc: 'Talleres semanales de pintura, teatro, música y fotografía para jóvenes en zonas de riesgo. El arte como herramienta de transformación social, prevención y desarrollo personal.',
        category: 'Arte y Cultura',
        img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80',
        leader: 'Sofía Ramos',
        location: 'Centro Cultural',
        volunteers: 27,
      },
      {
        title: 'Red de Reciclaje Escolar',
        desc: 'Programa integral de separación, recolección y reciclaje de residuos en escuelas primarias y secundarias. Hemos evitado el envío de más de 5 toneladas de basura al vertedero este ciclo.',
        category: 'Medio Ambiente',
        img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
        leader: 'Tomás Guerrero',
        location: 'Escuelas Municipales',
        volunteers: 38,
      },
      {
        title: 'Emprendimiento Social Femenino',
        desc: 'Capacitación en habilidades empresariales, finanzas y mercadeo para mujeres en situación de vulnerabilidad. Hemos apoyado el lanzamiento de 35 microempresas en la región.',
        category: 'Educación y Tutorías',
        img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&q=80',
        leader: 'Patricia Morales',
        location: 'Cooperativa Local',
        volunteers: 41,
      },
      {
        title: 'Cocinas Comunitarias Solidarias',
        desc: 'Red de cocinas barriales que preparan comidas nutritivas para adultos mayores y familias en situación de pobreza alimentaria. Servimos más de 500 porciones diarias.',
        category: 'Alimentación y Nutrición',
        img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
        leader: 'Rosa Elena Fuentes',
        location: 'Barrio Tepito',
        volunteers: 33,
      },
      {
        title: 'Programa de Reforestación Costera',
        desc: 'Siembra de manglares y vegetación nativa en zonas costeras degradadas. Hemos restaurado 4 km de litoral, protegiendo la biodiversidad marina y reduciendo la erosión costera.',
        category: 'Medio Ambiente',
        img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
        leader: 'Biol. Jorge Espinoza',
        location: 'Costa Verde',
        volunteers: 44,
      },
      {
        title: 'Clínica Dental Comunitaria',
        desc: 'Atención odontológica preventiva y curativa para niños y adultos sin acceso a servicios dentales privados. Incluye extracciones, limpiezas y talleres de higiene bucal.',
        category: 'Salud y Bienestar',
        img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80',
        leader: 'Dra. Valeria Soto',
        location: 'Sector Popular',
        volunteers: 12,
      },
    ];

    // Merge custom projects from localStorage
    (function loadCustomProjects() {
      const customs = JSON.parse(localStorage.getItem('custom_projects') || '[]');
      customs.forEach(p => PROJECTS.push(p));
    })();

    let activeCategory = '';
    let searchQuery    = '';

    // Build header stats
    function buildStats() {
      const totalVol = PROJECTS.reduce((s, p) => s + p.volunteers, 0);
      const cats     = new Set(PROJECTS.map(p => p.category)).size;
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

    // Build category pills
    function buildPills() {
      const container = document.getElementById('filter-pills');
      const categories = [...new Set(PROJECTS.map(p => p.category))];
      const all = ['', ...categories];
      container.innerHTML = all.map(cat => {
        const label = cat ? (PILL_LABELS[cat] || cat) : 'Todas';
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
      const arr = [...list];
      if (sort === 'volunteers-desc') return arr.sort((a, b) => b.volunteers - a.volunteers);
      if (sort === 'az') return arr.sort((a, b) => a.title.localeCompare(b.title));
      if (sort === 'za') return arr.sort((a, b) => b.title.localeCompare(a.title));
      return arr;
    }

    function render() {
      const q = searchQuery.toLowerCase();
      let list = PROJECTS.filter(p =>
        !p._hidden &&
        (!activeCategory || p.category === activeCategory) &&
        (!q || p.title.toLowerCase().includes(q) ||
               p.desc.toLowerCase().includes(q)  ||
               p.leader.toLowerCase().includes(q))
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
        const color = CATEGORY_COLORS[p.category] || '#6B7280';
        const shortCat = PILL_LABELS[p.category] || p.category;
        const origIdx = PROJECTS.indexOf(p);
        return `
          <div class="cat-card">
            <div class="cat-img-wrap">
              <img src="${p.img}" alt="${p.title}" loading="lazy"/>
              <span class="cat-badge" style="background:${color}">${shortCat}</span>
              ${p.isCustom ? '<span class="cat-badge" style="background:#7C3AED;top:auto;bottom:12px;left:12px">Nuevo</span>' : ''}
              <button class="cat-admin-del" data-idx="${origIdx}" data-title="${p.title.replace(/"/g,'&quot;')}" title="Eliminar proyecto (Admin)">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
              </button>
              <span class="cat-volunteers-chip">
                <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                ${p.volunteers} voluntarios
              </span>
            </div>
            <div class="cat-body">
              <div class="cat-title">${p.title}</div>
              <p class="cat-desc">${p.desc}</p>
              <div class="cat-meta">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                ${p.leader}
                <span style="margin-left:auto;display:flex;align-items:center;gap:4px">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ${p.location}
                </span>
              </div>
              <a class="cat-link" href="project-page.html?id=${origIdx}">
                Ver detalles
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>`;
      }).join('');

      // Bind admin delete buttons after render
      document.querySelectorAll('.cat-admin-del').forEach(btn => {
        btn.addEventListener('click', e => {
          e.preventDefault();
          pendingDeleteIdx   = parseInt(btn.dataset.idx, 10);
          pendingDeleteTitle = btn.dataset.title;
          document.getElementById('adm-proj-name').textContent = pendingDeleteTitle;
          document.getElementById('admin-del-overlay').classList.add('show');
        });
      });
    }

    // Search events
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

    // ── Admin logic ──────────────────────────────────────────────
    let pendingDeleteIdx   = null;
    let pendingDeleteTitle = '';

    function getHiddenHardcoded() {
      return JSON.parse(localStorage.getItem('hidden_hardcoded_projects') || '[]');
    }
    function saveHiddenHardcoded(arr) {
      localStorage.setItem('hidden_hardcoded_projects', JSON.stringify(arr));
    }

    // Filter out hidden hardcoded projects from PROJECTS before rendering
    (function applyHiddenFilter() {
      const hidden = getHiddenHardcoded();
      hidden.forEach(idx => {
        if (PROJECTS[idx]) PROJECTS[idx]._hidden = true;
      });
    })();

    function deleteProject(idx) {
      const p = PROJECTS[idx];
      if (!p) return;
      if (p.isCustom) {
        // Remove from custom_projects array
        const customIdx = idx - 15;
        const customs = JSON.parse(localStorage.getItem('custom_projects') || '[]');
        customs.splice(customIdx, 1);
        localStorage.setItem('custom_projects', JSON.stringify(customs));
        // Remove from in-memory PROJECTS array
        PROJECTS.splice(idx, 1);
      } else {
        // Mark as hidden in localStorage and in-memory
        const hidden = getHiddenHardcoded();
        if (!hidden.includes(idx)) { hidden.push(idx); saveHiddenHardcoded(hidden); }
        PROJECTS[idx]._hidden = true;
      }
      // Clean up related data
      localStorage.removeItem(`project_override_${idx}`);
      localStorage.removeItem(`proj_settings_${idx}`);
      localStorage.removeItem(`testimonials_${idx}`);
    }

    // Modal events
    document.getElementById('adm-cancel').addEventListener('click', () => {
      document.getElementById('admin-del-overlay').classList.remove('show');
      pendingDeleteIdx = null;
    });
    document.getElementById('admin-del-overlay').addEventListener('click', e => {
      if (e.target === document.getElementById('admin-del-overlay')) {
        document.getElementById('admin-del-overlay').classList.remove('show');
        pendingDeleteIdx = null;
      }
    });
    document.getElementById('adm-confirm').addEventListener('click', () => {
      if (pendingDeleteIdx === null) return;
      deleteProject(pendingDeleteIdx);
      document.getElementById('admin-del-overlay').classList.remove('show');
      pendingDeleteIdx = null;
      buildStats();
      buildPills();
      render();
    });

    // Mark body as admin if user has admin role
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (u && u.loggedIn && (u.rol === 'Administrador' || u.rol === 'Super Usuario')) {
        document.body.classList.add('is-admin');
      }
    } catch(e) {}

    // Init
    buildStats();
    buildPills();
    render();

    // Nav
    (function () {
      const stored = JSON.parse(localStorage.getItem('user') || 'null');
      const panel  = document.getElementById('user-panel');
      const avatar = document.getElementById('nav-avatar');
      const uname  = document.getElementById('nav-username');
      const logoutBtn  = document.getElementById('nav-logout');
      const perfilLink = document.querySelector('.nav-links a[href="login.html"]');

      function getFriendlyName(u) {
        if (u.nombre) return u.nombre;
        if (u.username) {
          const raw = u.username.includes('@') ? u.username.split('@')[0] : u.username;
          return raw.charAt(0).toUpperCase() + raw.slice(1);
        }
        return 'Usuario';
      }

      if (stored && stored.loggedIn) {
        const name = getFriendlyName(stored);
        panel.classList.add('visible');
        uname.textContent  = name;
        avatar.textContent = name[0].toUpperCase();
        if (perfilLink) perfilLink.setAttribute('href', 'profile.html');
      }

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        panel.classList.remove('visible');
        if (perfilLink) perfilLink.setAttribute('href', 'login.html');
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
