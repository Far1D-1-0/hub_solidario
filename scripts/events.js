  const params        = new URLSearchParams(location.search);
  const filterProject = params.get('proyecto') ? parseInt(params.get('proyecto'), 10) : null;

  let allEvents  = [];
  let byDate     = {};
  let viewYear, viewMonth;
  let selectedDate   = null;
  let isEvManager    = false;
  let evManagerAdmin = false;
  let managedProjIds = new Set();

  const MONTHS   = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const DAY_HDRS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  const PALETTE  = ['#1A56E8','#16A34A','#F97316','#7C3AED','#E11D48','#0891B2','#B45309','#0F766E'];
  const projColorMap = {};
  let colorIdx = 0;

  function getColor(projId) {
    if (!(projId in projColorMap)) {
      projColorMap[projId] = PALETTE[colorIdx++ % PALETTE.length];
    }
    return projColorMap[projId];
  }

  function fmtTime(iso) {
    if (!iso) return '';
    return new Date(iso).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
  }

  function fmtDateLabel(dateStr) {
    const [y, m, d] = dateStr.split('-').map(Number);
    return `${d} de ${MONTHS[m - 1]} de ${y}`;
  }

  function toDateStr(isoOrDate) {
    const s = typeof isoOrDate === 'string' ? isoOrDate : isoOrDate.toISOString();
    return s.substring(0, 10);
  }

  function groupByDate(events) {
    const map = {};
    events.forEach(e => {
      const d = toDateStr(e.fecha_realizacion);
      if (!map[d]) map[d] = [];
      map[d].push(e);
    });
    return map;
  }

  function renderCalendar() {
    const grid  = document.getElementById('cal-grid');
    const label = document.getElementById('month-label');
    label.textContent = `${MONTHS[viewMonth]} ${viewYear}`;

    const today    = new Date();
    const todayStr = toDateStr(today);

    const firstDayJs = new Date(viewYear, viewMonth, 1).getDay(); // 0=Dom
    const offset     = firstDayJs === 0 ? 6 : firstDayJs - 1;    // ajuste lunes=0
    const daysInMon  = new Date(viewYear, viewMonth + 1, 0).getDate();
    const prevDays   = new Date(viewYear, viewMonth, 0).getDate();

    let html = DAY_HDRS.map(h => `<div class="ecd-hdr">${h}</div>`).join('');

    // Días del mes anterior
    for (let i = offset - 1; i >= 0; i--) {
      const d   = prevDays - i;
      const pm  = viewMonth === 0 ? 11 : viewMonth - 1;
      const py  = viewMonth === 0 ? viewYear - 1 : viewYear;
      const ds  = `${py}-${String(pm + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      html += `<div class="ecd-day other-month" data-date="${ds}"><span class="ecd-num">${d}</span></div>`;
    }

    // Días del mes actual
    for (let d = 1; d <= daysInMon; d++) {
      const ds     = `${viewYear}-${String(viewMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const evs    = byDate[ds] || [];
      let cls      = 'ecd-day';
      if (ds === todayStr)    cls += ' is-today';
      if (ds === selectedDate) cls += ' is-selected';

      const dots = evs.slice(0, 4).map(e =>
        `<span class="ecd-dot" style="background:${getColor(e.id_proyecto)}"></span>`
      ).join('');

      html += `<div class="${cls}" data-date="${ds}">
        <span class="ecd-num">${d}</span>
        ${dots ? `<div class="ecd-dots">${dots}</div>` : ''}
      </div>`;
    }

    // Días del mes siguiente para completar la cuadrícula
    const total     = offset + daysInMon;
    const remainder = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (let d = 1; d <= remainder; d++) {
      const nm = viewMonth === 11 ? 0 : viewMonth + 1;
      const ny = viewMonth === 11 ? viewYear + 1 : viewYear;
      const ds = `${ny}-${String(nm + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      html += `<div class="ecd-day other-month" data-date="${ds}"><span class="ecd-num">${d}</span></div>`;
    }

    grid.innerHTML = html;

    grid.querySelectorAll('.ecd-day:not(.other-month)').forEach(cell => {
      cell.addEventListener('click', () => {
        selectedDate = cell.dataset.date;
        renderCalendar();
        showDayEvents(selectedDate);
      });
    });

    renderLegend();
  }

  function renderLegend() {
    const legend = document.getElementById('ev-legend');
    if (!Object.keys(projColorMap).length) { legend.innerHTML = ''; return; }

    // Build a name map
    const nameMap = {};
    allEvents.forEach(e => { nameMap[e.id_proyecto] = e.proyecto_nombre; });

    legend.innerHTML = Object.entries(projColorMap).map(([id, color]) => `
      <div class="ev-legend-item">
        <span class="ev-legend-dot" style="background:${color}"></span>
        <span>${nameMap[id] || 'Proyecto'}</span>
      </div>`).join('');
  }

  function showDayEvents(dateStr) {
    const evs   = byDate[dateStr] || [];
    const title = document.getElementById('evp-title');
    const list  = document.getElementById('evp-list');

    title.textContent = `Eventos · ${fmtDateLabel(dateStr)}`;

    if (!evs.length) {
      list.innerHTML = '<div class="evp-empty">No hay eventos este día.</div>';
      return;
    }
    list.innerHTML = evs.map(e => buildEventItem(e, false)).join('');
  }

  function showUpcoming() {
    const today    = new Date(); today.setHours(0, 0, 0, 0);
    const upcoming = allEvents
      .filter(e => new Date(e.fecha_realizacion) >= today)
      .slice(0, 6);

    document.getElementById('evp-title').textContent = 'Próximos eventos';

    if (!upcoming.length) {
      document.getElementById('evp-list').innerHTML =
        '<div class="evp-empty">No hay eventos próximos.</div>';
      return;
    }
    document.getElementById('evp-list').innerHTML =
      upcoming.map(e => buildEventItem(e, true)).join('');
  }

  function buildEventItem(e, showDate) {
    const dateStr    = toDateStr(e.fecha_realizacion);
    const time       = fmtTime(e.fecha_realizacion);
    const estado     = (e.estado || '').toLowerCase();
    const label      = { publicado:'Publicado', programado:'Programado', pasado:'Pasado', activo:'Activo', cancelado:'Cancelado' }[estado] || e.estado;
    const canManage  = isEvManager && (evManagerAdmin || managedProjIds.has(parseInt(e.id_proyecto)));
    const isCancelled = estado === 'cancelado';

    return `
      <div class="evp-item">
        <div class="evp-bar" style="background:${getColor(e.id_proyecto)}"></div>
        <div class="evp-body">
          <div class="evp-name">${e.nombre}</div>
          <div class="evp-project">${e.proyecto_nombre}</div>
          <div class="evp-time">${showDate ? fmtDateLabel(dateStr) + ' · ' : ''}${time}</div>
          ${e.descripcion ? `<div class="evp-desc">${e.descripcion}</div>` : ''}
          <span class="evp-estado evp-estado-${estado}">${label}</span>
          ${canManage ? `<div class="evpa-row">
            ${!isCancelled ? `<button class="evpa-btn evpa-edit" data-id="${e.id_evento}">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Editar
            </button>
            <button class="evpa-btn evpa-cancel" data-id="${e.id_evento}">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              Anular
            </button>` : ''}
            <button class="evpa-btn evpa-del" data-id="${e.id_evento}">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
              Eliminar
            </button>
          </div>` : ''}
        </div>
      </div>`;
  }

  function renderStats() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const thisMonth = allEvents.filter(e => {
      const d = new Date(e.fecha_realizacion);
      return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
    }).length;
    const upcoming = allEvents.filter(e => new Date(e.fecha_realizacion) >= today).length;

    document.getElementById('ev-stat-row').innerHTML = `
      <div class="ev-stat-chip">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <div><div class="sc-num">${allEvents.length}</div><div class="sc-lbl">Eventos totales</div></div>
      </div>
      <div class="ev-stat-chip">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <div><div class="sc-num">${thisMonth}</div><div class="sc-lbl">Este mes</div></div>
      </div>
      <div class="ev-stat-chip">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div><div class="sc-num">${upcoming}</div><div class="sc-lbl">Próximos</div></div>
      </div>`;
  }

  async function init() {
    const today = new Date();
    viewYear  = today.getFullYear();
    viewMonth = today.getMonth();

    document.getElementById('prev-month').addEventListener('click', () => {
      if (--viewMonth < 0) { viewMonth = 11; viewYear--; }
      renderCalendar();
    });
    document.getElementById('next-month').addEventListener('click', () => {
      if (++viewMonth > 11) { viewMonth = 0; viewYear++; }
      renderCalendar();
    });

    // Mostrar botón "Volver" si viene de un proyecto
    if (filterProject) {
      const backEl = document.getElementById('ev-back-link');
      backEl.href         = `project-page.html?id=${filterProject}`;
      backEl.style.display = 'inline-flex';
    }

    // Cargar eventos
    const url = filterProject
      ? `controllers/events/list.php?proyecto=${filterProject}`
      : 'controllers/events/list.php';

    try {
      const res  = await fetch(url);
      const json = await res.json();
      if (json.ok) {
        allEvents = json.data;
        byDate    = groupByDate(allEvents);
      }
    } catch {}

    renderStats();
    renderCalendar();
    showUpcoming();
  }

  init();

  // ── Gestor de eventos (ADMIN / LIDER) ────────────────────────────────────

  (function initManager() {
    const fab        = document.getElementById('ev-fab');
    const evOverlay  = document.getElementById('ev-modal-overlay');
    const modalTitle = document.querySelector('.ev-modal-title');
    const closeBtn   = document.getElementById('ev-modal-close');
    const cancelBtn  = document.getElementById('evm-cancel');
    const saveBtn    = document.getElementById('evm-save');
    const proySelect = document.getElementById('evm-proyecto');
    const msgEl      = document.getElementById('evm-msg');

    let editingEventId = null;

    function openModal(ev) {
      editingEventId         = ev ? parseInt(ev.id_evento) : null;
      modalTitle.textContent = ev ? 'Editar Evento'    : 'Nuevo Evento';
      saveBtn.textContent    = ev ? 'Guardar Cambios'  : 'Crear Evento';
      proySelect.disabled    = !!ev;

      if (ev) {
        document.getElementById('evm-nombre').value = ev.nombre || '';
        document.getElementById('evm-fecha').value  = (ev.fecha_realizacion || '').replace(' ', 'T').slice(0, 16);
        document.getElementById('evm-desc').value   = ev.descripcion || '';
        proySelect.value = ev.id_proyecto;
      } else {
        document.getElementById('evm-nombre').value = '';
        const now = new Date();
        document.getElementById('evm-fecha').value  =
          new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
        document.getElementById('evm-desc').value   = '';
        proySelect.value = '';
      }
      msgEl.textContent       = '';
      saveBtn.disabled        = false;
      evOverlay.style.display = 'flex';
    }

    function closeModal() {
      evOverlay.style.display = 'none';
      editingEventId          = null;
      msgEl.textContent       = '';
      saveBtn.disabled        = false;
      proySelect.disabled     = false;
    }

    evOverlay.addEventListener('click', e => { if (e.target === evOverlay) closeModal(); });
    closeBtn.addEventListener('click',  closeModal);
    cancelBtn.addEventListener('click', closeModal);
    fab.addEventListener('click', () => openModal(null));

    // Delegación de clics en los botones de acción de cada evento
    document.getElementById('evp-list').addEventListener('click', async e => {
      const btn = e.target.closest('.evpa-btn');
      if (!btn) return;
      const id = parseInt(btn.dataset.id);
      const ev = allEvents.find(x => parseInt(x.id_evento) === id);
      if (!ev) return;

      if (btn.classList.contains('evpa-edit')) {
        openModal(ev);

      } else if (btn.classList.contains('evpa-cancel')) {
        if (!confirm(`¿Anular el evento "${ev.nombre}"?\nEl evento quedará como cancelado.`)) return;
        try {
          const res  = await fetch('controllers/events/cancel.php', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          const json = await res.json();
          if (!json.ok) { alert(json.error || 'Error al anular.'); return; }
          ev.estado = 'CANCELADO';
          renderStats();
          renderCalendar();
          if (selectedDate) showDayEvents(selectedDate); else showUpcoming();
        } catch { alert('Error al anular el evento.'); }

      } else if (btn.classList.contains('evpa-del')) {
        if (!confirm(`¿Eliminar el evento "${ev.nombre}"?\nEsta acción no se puede deshacer.`)) return;
        try {
          const res  = await fetch('controllers/events/delete.php', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
          });
          const json = await res.json();
          if (!json.ok) { alert(json.error || 'Error al eliminar.'); return; }
          allEvents = allEvents.filter(x => parseInt(x.id_evento) !== id);
          byDate    = groupByDate(allEvents);
          renderStats();
          renderCalendar();
          if (selectedDate) showDayEvents(selectedDate); else showUpcoming();
        } catch { alert('Error al eliminar el evento.'); }
      }
    });

    saveBtn.addEventListener('click', async () => {
      const nombre = document.getElementById('evm-nombre').value.trim();
      const fecha  = document.getElementById('evm-fecha').value;
      const desc   = document.getElementById('evm-desc').value.trim();
      const proyId = proySelect.value;

      if (!nombre) { msgEl.textContent = 'El nombre es requerido.'; return; }
      if (!fecha)  { msgEl.textContent = 'La fecha es requerida.'; return; }
      if (!editingEventId && !proyId) { msgEl.textContent = 'Selecciona un proyecto.'; return; }

      saveBtn.disabled  = true;
      msgEl.textContent = '';

      if (editingEventId) {
        // ── Editar ──
        try {
          const res  = await fetch('controllers/events/update.php', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editingEventId, nombre, descripcion: desc || null,
              fecha_realizacion: fecha.replace('T', ' ') })
          });
          const json = await res.json();
          if (!json.ok) { msgEl.textContent = json.error || 'Error al guardar.'; saveBtn.disabled = false; return; }

          const ev = allEvents.find(x => parseInt(x.id_evento) === editingEventId);
          if (ev) { ev.nombre = nombre; ev.descripcion = desc || null; ev.fecha_realizacion = fecha.replace('T', ' '); }
          allEvents.sort((a, b) => new Date(a.fecha_realizacion) - new Date(b.fecha_realizacion));
          byDate = groupByDate(allEvents);
          renderStats(); renderCalendar();
          if (selectedDate) showDayEvents(selectedDate); else showUpcoming();
          closeModal();
        } catch { msgEl.textContent = 'Error al guardar.'; saveBtn.disabled = false; }

      } else {
        // ── Crear ──
        try {
          const res  = await fetch('controllers/events/create.php', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, descripcion: desc || null,
              fecha_realizacion: fecha.replace('T', ' '), id_proyecto: parseInt(proyId) })
          });
          const json = await res.json();
          if (!json.ok) { msgEl.textContent = json.error || 'Error al crear el evento.'; saveBtn.disabled = false; return; }

          allEvents.push(json.data);
          allEvents.sort((a, b) => new Date(a.fecha_realizacion) - new Date(b.fecha_realizacion));
          byDate = groupByDate(allEvents);
          renderStats(); renderCalendar();
          if (selectedDate) showDayEvents(selectedDate); else showUpcoming();
          closeModal();
        } catch { msgEl.textContent = 'Error al crear el evento.'; saveBtn.disabled = false; }
      }
    });

    getUser().then(async user => {
      if (!user || !user.loggedIn) return;
      if (user.rol_codigo !== 'ADMIN' && user.rol_codigo !== 'LIDER') return;

      try {
        const res  = await fetch('controllers/projects/list.php');
        const json = await res.json();
        let projects = json.data || [];

        if (user.rol_codigo === 'LIDER') {
          projects = projects.filter(p => p.lider_id == user.id);
          if (!projects.length) return;
          managedProjIds = new Set(projects.map(p => parseInt(p.id)));
        } else {
          evManagerAdmin = true;
        }
        isEvManager = true;

        proySelect.innerHTML = '<option value="">Selecciona un proyecto...</option>' +
          projects.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');

        fab.style.display = 'flex';

        // Re-renderizar el panel con botones de acción ahora que isEvManager=true
        if (selectedDate) showDayEvents(selectedDate); else showUpcoming();
      } catch {}
    });
  })();
