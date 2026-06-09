  const ALLOWED_ROLES = new Set(['Beneficiario', 'Estudiante']);
  const ROLE_CLASS = { Beneficiario: 'role-beneficiario', Estudiante: 'role-estudiante' };

  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  let projTitle = 'Proyecto';
  let activeTab = 'PENDIENTE';
  let tabData   = { PENDIENTE: [], APROBADO: [], RECHAZADO: [] };

  function fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // ── Auth check via session ───────────────────────────────────
  async function canModerate() {
    const u = await getUser();
    return u && u.loggedIn && (u.rol_codigo === 'ADMIN' || u.rol_codigo === 'LIDER');
  }

  // ── Fetch one tab's data ─────────────────────────────────────
  async function fetchTab(estado) {
    try {
      const res  = await fetch(`controllers/testimonials/list.php?proyecto=${projId}&estado=${estado}`);
      const json = await res.json();
      if (json.ok) tabData[estado] = json.data.filter(t => ALLOWED_ROLES.has(t.tipo_participante));
    } catch {}
  }

  // ── Moderate action ──────────────────────────────────────────
  async function moderate(id, accion) {
    try {
      const res  = await fetch('controllers/testimonials/moderate.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, accion }),
      });
      const json = await res.json();
      if (!json.ok) { alert(json.error || 'No se pudo moderar'); return; }
      // Reload both relevant tabs
      await Promise.all([fetchTab('PENDIENTE'), fetchTab('APROBADO'), fetchTab('RECHAZADO')]);
      renderPage();
    } catch {
      alert('Error de conexión');
    }
  }

  // ── Render ───────────────────────────────────────────────────
  function renderPage() {
    const card = document.getElementById('m-card');

    if (!canModerate()) {
      card.innerHTML = `
        <div class="m-denied">
          <div class="m-denied-icon">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <h2>Acceso restringido</h2>
          <p>Esta sección es solo para líderes del proyecto y administradores. Inicia sesión con las credenciales correspondientes.</p>
          <a href="project-page.html?id=${projId}" class="btn-back-proj">Ir al proyecto</a>
        </div>`;
      return;
    }

    const pending  = tabData['PENDIENTE'];
    const approved = tabData['APROBADO'];
    const rejected = tabData['RECHAZADO'];
    const list     = activeTab === 'PENDIENTE' ? pending : activeTab === 'APROBADO' ? approved : rejected;
    const tabLabel = { PENDIENTE: 'Pendientes', APROBADO: 'Aprobados', RECHAZADO: 'Rechazados' };

    card.innerHTML = `
      <div class="m-head">
        <div class="m-head-top">
          <a href="project-page.html?id=${projId}" class="m-back">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            ${projTitle}
          </a>
        </div>
        <h1>Moderación de testimonios</h1>
        <p>Revisa los testimonios enviados y decide cuáles se publicarán en el proyecto.</p>
        <div class="m-tabs">
          ${['PENDIENTE','APROBADO','RECHAZADO'].map(tab => `
            <button class="m-tab ${activeTab === tab ? 'active' : ''}" data-tab="${tab}">
              ${tabLabel[tab]} <span class="m-tab-count">${tabData[tab].length}</span>
            </button>`).join('')}
        </div>
      </div>
      <div class="m-body">
        ${list.length === 0
          ? `<div class="m-empty">
              <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
              <p>No hay testimonios ${activeTab === 'PENDIENTE' ? 'pendientes' : activeTab === 'APROBADO' ? 'aprobados' : 'rechazados'}.</p>
             </div>`
          : list.map(t => {
              const name = t.nombre_publico || t.autor_nombre || 'Anónimo';
              const role = t.tipo_participante || 'Colaborador';
              return `
                <div class="m-item ${activeTab !== 'PENDIENTE' ? activeTab.toLowerCase() : ''}" data-id="${t.id}">
                  <div class="m-item-head">
                    <div class="m-avatar">${name[0].toUpperCase()}</div>
                    <div class="m-info">
                      <div class="m-name">${name}</div>
                      <div class="m-role ${ROLE_CLASS[role] || ''}">${role}</div>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                      ${activeTab !== 'PENDIENTE' ? `<span class="m-status-badge ${activeTab.toLowerCase()}">${activeTab === 'APROBADO' ? 'Aprobado' : 'Rechazado'}</span>` : ''}
                      <div class="m-date">${fmtDate(t.fecha)}</div>
                    </div>
                  </div>
                  <p class="m-text">"${t.contenido}"</p>
                  ${activeTab === 'PENDIENTE' ? `
                    <div class="m-actions">
                      <button class="btn-reject"  data-id="${t.id}" data-accion="RECHAZADO">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        Rechazar
                      </button>
                      <button class="btn-accept"  data-id="${t.id}" data-accion="APROBADO">
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        Aceptar
                      </button>
                    </div>` : activeTab === 'RECHAZADO' ? `
                    <div class="m-actions">
                      <button class="btn-accept" data-id="${t.id}" data-accion="APROBADO" style="font-size:.78rem;padding:6px 14px">
                        <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        Aprobar
                      </button>
                    </div>` : ''}
                </div>`;
            }).join('')
        }
      </div>`;

    card.querySelectorAll('.m-tab').forEach(btn => {
      btn.addEventListener('click', () => { activeTab = btn.dataset.tab; renderPage(); });
    });

    card.querySelectorAll('[data-accion]').forEach(btn => {
      btn.addEventListener('click', () => moderate(parseInt(btn.dataset.id, 10), btn.dataset.accion));
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  async function init() {
    if (!projId) return;

    try {
      const r = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const j = await r.json();
      if (j.ok) {
        projTitle = j.data.nombre;
        document.title = `Moderación - ${projTitle}`;
      }
    } catch {}

    await Promise.all([fetchTab('PENDIENTE'), fetchTab('APROBADO'), fetchTab('RECHAZADO')]);
    renderPage();
  }

  init();
