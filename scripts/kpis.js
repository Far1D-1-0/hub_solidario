  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  let allKpis      = [];
  let isManager    = false;
  let cachedUnits  = null;

  function fmtDate(iso) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  // ── Modal ─────────────────────────────────────────────────────
  const mgrOverlay = document.getElementById('mgr-overlay');
  const modal    = document.getElementById('mgr-modal');
  const mgrTitle = document.getElementById('mgr-title');
  const mgrBody  = document.getElementById('mgr-body');

  function openModal(title, bodyHtml) {
    mgrTitle.textContent = title;
    mgrBody.innerHTML    = bodyHtml;
    mgrOverlay.style.display = 'block';
    modal.style.display      = 'block';
    setTimeout(() => modal.querySelector('input, select, textarea')?.focus(), 50);
  }

  function closeModal() {
    mgrOverlay.style.display = 'none';
    modal.style.display      = 'none';
  }

  mgrOverlay.addEventListener('click', closeModal);

  function showMsg(text, ok) {
    const el = document.getElementById('mgr-msg');
    if (!el) return;
    el.textContent   = text;
    el.style.color   = ok ? '#16A34A' : '#EF4444';
    el.style.display = 'block';
  }

  // ── Units ─────────────────────────────────────────────────────
  async function getUnits() {
    if (cachedUnits) return cachedUnits;
    try {
      const res  = await fetch('controllers/units/list.php');
      const json = await res.json();
      cachedUnits = json.ok ? json.data : [];
    } catch { cachedUnits = []; }
    return cachedUnits;
  }

  // ── KPI form HTML ─────────────────────────────────────────────
  async function kpiFormHtml(kpi) {
    const units = await getUnits();
    const unitOptions = `<option value="">Sin unidad</option>` +
      units.map(u => `<option value="${u.id}" ${kpi && parseInt(kpi.id_unidad_medida) === u.id ? 'selected' : ''}>${u.nombre} (${u.simbolo})</option>`).join('');
    return `
      <div class="mgr-form-row">
        <label class="mgr-label">Nombre del indicador *</label>
        <input id="mgr-nombre" class="mgr-input" type="text" value="${kpi ? kpi.nombre : ''}" placeholder="Ej: Beneficiarios directos"/>
      </div>
      <div class="mgr-form-row">
        <label class="mgr-label">Descripción</label>
        <input id="mgr-desc" class="mgr-input" type="text" value="${kpi ? (kpi.descripcion || '') : ''}" placeholder="Breve descripción del indicador"/>
      </div>
      <div class="mgr-form-row mgr-form-row-2">
        <div>
          <label class="mgr-label">Meta *</label>
          <input id="mgr-meta" class="mgr-input" type="number" min="0.01" step="any" value="${kpi ? kpi.valor_meta : ''}"/>
        </div>
        <div>
          <label class="mgr-label">Unidad de medida</label>
          <select id="mgr-unit" class="mgr-select">${unitOptions}</select>
        </div>
      </div>
      <p id="mgr-msg" class="mgr-msg" style="display:none"></p>
      <div class="mgr-btn-row">
        <button class="mgr-btn mgr-btn-cancel" id="mgr-cancel">Cancelar</button>
        <button class="mgr-btn mgr-btn-save"   id="mgr-save">Guardar</button>
      </div>`;
  }

  // ── Stats chips ───────────────────────────────────────────────
  function updateStatChips() {
    const kpis     = allKpis;
    const withData = kpis.filter(k => k.valor_actual !== null).length;
    const avgPct   = kpis.length
      ? Math.round(kpis.reduce((sum, k) => {
          if (k.valor_actual !== null && k.valor_meta > 0)
            return sum + Math.min(100, (parseFloat(k.valor_actual) / parseFloat(k.valor_meta)) * 100);
          return sum;
        }, 0) / kpis.length)
      : 0;

    document.getElementById('kpi-stat-row').innerHTML = `
      <div class="kpi-stat-chip">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
        <div><div class="sc-num">${kpis.length}</div><div class="sc-lbl">Indicador${kpis.length !== 1 ? 'es' : ''}</div></div>
      </div>
      <div class="kpi-stat-chip">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <div><div class="sc-num">${withData}</div><div class="sc-lbl">Con datos</div></div>
      </div>
      ${kpis.length ? `
      <div class="kpi-stat-chip">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <div><div class="sc-num">${avgPct}%</div><div class="sc-lbl">Promedio</div></div>
      </div>` : ''}`;
  }

  // ── Render ────────────────────────────────────────────────────
  function renderKPIs(kpis) {
    const grid = document.getElementById('kpi-grid');
    if (!kpis.length) {
      grid.innerHTML = '<div class="kpi-empty">Este proyecto no tiene KPIs activos aún.</div>';
      return;
    }

    grid.innerHTML = kpis.map(k => {
      const actual = k.valor_actual !== null && k.valor_actual !== undefined
        ? parseFloat(k.valor_actual) : null;
      const meta   = k.valor_meta !== null && k.valor_meta !== undefined
        ? parseFloat(k.valor_meta) : null;
      const unit   = k.unidad_simbolo || k.unidad_nombre || '';

      let pctInt = 0, pctClass = 'pct-low';
      if (actual !== null && meta !== null && meta > 0) {
        pctInt   = Math.min(100, Math.round((actual / meta) * 100));
        pctClass = pctInt >= 80 ? 'pct-high' : pctInt >= 40 ? 'pct-mid' : 'pct-low';
      }

      const lastDate = fmtDate(k.fecha_ultimo_resultado);

      const actionsHtml = isManager ? `
        <div class="kpi-card-actions">
          <button class="kca-btn kca-val"  data-id="${k.id_kpi}" title="Actualizar valor">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Actualizar
          </button>
          <button class="kca-btn kca-edit" data-id="${k.id_kpi}" title="Editar KPI">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Editar
          </button>
          <button class="kca-btn kca-del"  data-id="${k.id_kpi}" title="Eliminar KPI">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
            Eliminar
          </button>
        </div>` : '';

      return `
        <div class="kpi-card" data-kpi-id="${k.id_kpi}">
          <div class="kpi-card-top">
            <div class="kpi-name">${k.nombre}</div>
            <span class="kpi-estado">Activo</span>
          </div>
          ${k.descripcion ? `<div class="kpi-desc">${k.descripcion}</div>` : ''}

          ${actual !== null ? `
          <div class="kpi-values">
            <div>
              <span class="kpi-current">${actual.toLocaleString('es-MX')}</span>
              <span class="kpi-unit">${unit}</span>
            </div>
            ${meta !== null ? `<div class="kpi-meta-lbl">Meta: ${meta.toLocaleString('es-MX')} ${unit}</div>` : ''}
          </div>
          ${meta !== null && meta > 0 ? `
          <div class="kpi-bar-wrap">
            <div class="kpi-bar-fill ${pctClass}" style="width:${pctInt}%"></div>
          </div>
          <div class="kpi-footer">
            <span class="kpi-pct">${pctInt}% completado</span>
            ${lastDate ? `<span class="kpi-last-update">Actualizado: ${lastDate}</span>` : ''}
          </div>` : ''}
          ` : `<div class="kpi-no-data">Sin datos registrados aún.</div>`}

          ${actionsHtml}
        </div>`;
    }).join('');

    if (!isManager) return;

    // Set value buttons
    grid.querySelectorAll('.kca-val').forEach(btn => {
      btn.addEventListener('click', () => {
        const id  = parseInt(btn.dataset.id);
        const kpi = allKpis.find(k => k.id_kpi === id);
        const today = new Date().toISOString().split('T')[0];
        openModal(`Actualizar valor: ${kpi?.nombre || ''}`, `
          <div class="mgr-form-row">
            <label class="mgr-label">Nuevo valor *</label>
            <input id="mgr-valor" class="mgr-input" type="number" step="any" placeholder="Ej: 150"/>
          </div>
          <div class="mgr-form-row">
            <label class="mgr-label">Fecha del dato</label>
            <input id="mgr-fecha" class="mgr-input" type="date" value="${today}"/>
          </div>
          <p id="mgr-msg" class="mgr-msg" style="display:none"></p>
          <div class="mgr-btn-row">
            <button class="mgr-btn mgr-btn-cancel" id="mgr-cancel">Cancelar</button>
            <button class="mgr-btn mgr-btn-save"   id="mgr-save">Guardar</button>
          </div>`);
        document.getElementById('mgr-cancel').onclick = closeModal;
        document.getElementById('mgr-save').onclick   = async () => {
          const valor = parseFloat(document.getElementById('mgr-valor').value);
          const fecha = document.getElementById('mgr-fecha').value;
          if (isNaN(valor)) return showMsg('Ingresa un valor numérico.', false);
          try {
            const res  = await fetch('controllers/kpis/set-value.php', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_kpi: id, valor, fecha }),
            });
            const json = await res.json();
            if (!json.ok) return showMsg(json.error || 'Error.', false);
            if (kpi) { kpi.valor_actual = valor; kpi.fecha_ultimo_resultado = fecha; }
            closeModal();
            renderKPIs(allKpis);
            updateStatChips();
          } catch { showMsg('Error de conexión.', false); }
        };
      });
    });

    // Edit buttons
    grid.querySelectorAll('.kca-edit').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id  = parseInt(btn.dataset.id);
        const kpi = allKpis.find(k => k.id_kpi === id);
        if (!kpi) return;
        const formHtml = await kpiFormHtml(kpi);
        openModal('Editar KPI', formHtml);
        document.getElementById('mgr-cancel').onclick = closeModal;
        document.getElementById('mgr-save').onclick   = async () => {
          const nombre    = document.getElementById('mgr-nombre').value.trim();
          const desc      = document.getElementById('mgr-desc').value.trim();
          const meta      = parseFloat(document.getElementById('mgr-meta').value);
          const unitId    = document.getElementById('mgr-unit').value;
          if (!nombre)   return showMsg('El nombre es requerido.', false);
          if (isNaN(meta) || meta <= 0) return showMsg('La meta debe ser mayor a 0.', false);
          try {
            const res  = await fetch('controllers/kpis/update.php', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_kpi: id, nombre, descripcion: desc, valor_meta: meta, id_unidad_medida: unitId || null }),
            });
            const json = await res.json();
            if (!json.ok) return showMsg(json.error || 'Error.', false);
            kpi.nombre      = nombre;
            kpi.descripcion = desc;
            kpi.valor_meta  = meta;
            if (unitId) {
              const units = await getUnits();
              const u = units.find(x => x.id === parseInt(unitId));
              kpi.id_unidad_medida = unitId;
              kpi.unidad_simbolo   = u?.simbolo || null;
              kpi.unidad_nombre    = u?.nombre  || null;
            } else {
              kpi.id_unidad_medida = null;
              kpi.unidad_simbolo   = null;
              kpi.unidad_nombre    = null;
            }
            closeModal();
            renderKPIs(allKpis);
            updateStatChips();
          } catch { showMsg('Error de conexión.', false); }
        };
      });
    });

    // Delete buttons
    grid.querySelectorAll('.kca-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id  = parseInt(btn.dataset.id);
        const kpi = allKpis.find(k => k.id_kpi === id);
        openModal('Eliminar KPI', `
          <p class="mgr-confirm-txt">¿Seguro que quieres eliminar el KPI "<strong>${kpi?.nombre || ''}</strong>"? No se podrán registrar más datos para este indicador.</p>
          <div class="mgr-btn-row">
            <button class="mgr-btn mgr-btn-cancel" id="mgr-cancel">Cancelar</button>
            <button class="mgr-btn mgr-btn-del"    id="mgr-confirm">Eliminar</button>
          </div>`);
        document.getElementById('mgr-cancel').onclick  = closeModal;
        document.getElementById('mgr-confirm').onclick = async () => {
          try {
            const res  = await fetch('controllers/kpis/delete.php', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_kpi: id }),
            });
            const json = await res.json();
            if (!json.ok) return alert(json.error || 'Error al eliminar');
            allKpis = allKpis.filter(k => k.id_kpi !== id);
            closeModal();
            renderKPIs(allKpis);
            updateStatChips();
          } catch { alert('Error de conexión'); }
        };
      });
    });
  }

  // ── Init ──────────────────────────────────────────────────────
  async function init() {
    if (!projId) {
      document.getElementById('kpi-subtitle').textContent = 'Proyecto no especificado';
      return;
    }

    document.getElementById('kpi-back-link').href = `project-page.html?id=${projId}`;

    let liderIdProject = 0;

    try {
      const res  = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Error');

      const project  = json.data;
      liderIdProject = parseInt(project.lider_id || 0);
      allKpis        = project.kpis || [];

      document.title = `KPIs - ${project.nombre}`;
      document.getElementById('kpi-subtitle').textContent = project.nombre;

      updateStatChips();
    } catch (err) {
      document.getElementById('kpi-grid').innerHTML =
        `<div class="kpi-empty">Error al cargar indicadores: ${err.message}</div>`;
      return;
    }

    const user = await getUser();
    if (user && user.loggedIn) {
      isManager = user.rol_codigo === 'ADMIN' || parseInt(user.id) === liderIdProject;
    }

    renderKPIs(allKpis);

    if (isManager) {
      const fab = document.getElementById('mgr-fab');
      fab.style.display = 'flex';
      fab.addEventListener('click', async () => {
        const formHtml = await kpiFormHtml(null);
        openModal('Nuevo KPI', formHtml);
        document.getElementById('mgr-cancel').onclick = closeModal;
        document.getElementById('mgr-save').onclick   = async () => {
          const nombre = document.getElementById('mgr-nombre').value.trim();
          const desc   = document.getElementById('mgr-desc').value.trim();
          const meta   = parseFloat(document.getElementById('mgr-meta').value);
          const unitId = document.getElementById('mgr-unit').value;
          if (!nombre)              return showMsg('El nombre es requerido.', false);
          if (isNaN(meta) || meta <= 0) return showMsg('La meta debe ser mayor a 0.', false);
          try {
            const res  = await fetch('controllers/kpis/create.php', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_proyecto: projId, nombre, descripcion: desc, valor_meta: meta, id_unidad_medida: unitId || null }),
            });
            const json = await res.json();
            if (!json.ok) return showMsg(json.error || 'Error.', false);
            allKpis.push(json.data);
            closeModal();
            renderKPIs(allKpis);
            updateStatChips();
          } catch { showMsg('Error de conexión.', false); }
        };
      });
    }
  }

  init();
