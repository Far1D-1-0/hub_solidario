  const ALLOWED_ROLES = new Set(['Beneficiario', 'Estudiante']);
  const ROLE_CLASS = { Beneficiario: 'role-beneficiario', Estudiante: 'role-estudiante' };

  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  let activeRole = '';
  let allTestimonials = [];
  let projTitle = 'Proyecto';

  function fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function buildStats(list) {
    const counts = {};
    list.forEach(t => {
      const role = t.tipo_participante || 'Colaborador';
      counts[role] = (counts[role] || 0) + 1;
    });
    const icons = {
      Beneficiario: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
      Estudiante:   `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    };
    const row = document.getElementById('t-stat-row');
    row.innerHTML = Object.entries(counts).map(([role, count]) => `
      <div class="t-stat-chip">
        ${icons[role] || icons.Colaborador}
        <div>
          <div class="sc-num">${count}</div>
          <div class="sc-lbl">${role}${count !== 1 ? 's' : ''}</div>
        </div>
      </div>`).join('');
  }

  function renderCards(filter) {
    const list = filter ? allTestimonials.filter(t => t.tipo_participante === filter) : allTestimonials;
    const grid = document.getElementById('t-grid');
    if (!list.length) {
      grid.innerHTML = '<div class="t-empty">No hay testimonios en esta categoría aún.</div>';
      return;
    }
    grid.innerHTML = list.map(t => {
      const name = t.nombre_publico || t.autor_nombre || 'Anónimo';
      const role = t.tipo_participante || 'Colaborador';
      const avatarEl = `<div class="t-avatar-init">${name[0].toUpperCase()}</div>`;
      return `
        <div class="t-card">
          <div class="t-card-head">
            ${avatarEl}
            <div class="t-info">
              <div class="t-name">${name}</div>
              <div class="t-role ${ROLE_CLASS[role] || ''}">${role}</div>
              <div class="t-proj-name">${projTitle}</div>
            </div>
            <svg class="t-quote-icon" width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
          </div>
          <p class="t-text">"${t.contenido}"</p>
          <div class="t-date">${fmtDate(t.fecha)}</div>
        </div>`;
    }).join('');
  }

  async function init() {
    if (!projId) return;

    // Fetch project name
    try {
      const r = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const j = await r.json();
      if (j.ok) {
        projTitle = j.data.nombre;
        document.title = `Testimonios - ${projTitle}`;
        document.getElementById('t-subtitle').textContent = projTitle;
      }
    } catch {}

    document.getElementById('t-back-link').href    = `project-page.html?id=${projId}`;
    document.getElementById('t-submit-link').href  = `submit-testimonial.html?id=${projId}`;

    // Fetch approved testimonials
    try {
      const res  = await fetch(`controllers/testimonials/list.php?proyecto=${projId}&estado=APROBADO`);
      const json = await res.json();
      if (json.ok) allTestimonials = json.data.filter(t => ALLOWED_ROLES.has(t.tipo_participante));
    } catch {}

    buildStats(allTestimonials);
    renderCards('');

    document.querySelectorAll('.t-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.t-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeRole = btn.dataset.role;
        renderCards(activeRole);
      });
    });
  }

  init();
