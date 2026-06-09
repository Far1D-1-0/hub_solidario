  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  function fmtDate(iso) {
    if (!iso) return null;
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function renderKPIs(kpis) {
    const grid = document.getElementById('kpi-grid');
    if (!kpis.length) {
      grid.innerHTML = '<div class="kpi-empty">Este proyecto no tiene KPIs activos aún.</div>';
      return;
    }

    grid.innerHTML = kpis.map(k => {
      const actual = k.valor_actual !== null && k.valor_actual !== undefined
        ? parseFloat(k.valor_actual) : null;
      const meta   = k.valor_meta  !== null && k.valor_meta  !== undefined
        ? parseFloat(k.valor_meta)  : null;
      const unit   = k.unidad_simbolo || k.unidad_nombre || '';

      let pctInt = 0;
      let pctClass = 'pct-low';
      if (actual !== null && meta !== null && meta > 0) {
        pctInt   = Math.min(100, Math.round((actual / meta) * 100));
        pctClass = pctInt >= 80 ? 'pct-high' : pctInt >= 40 ? 'pct-mid' : 'pct-low';
      }

      const lastDate = fmtDate(k.fecha_ultimo_resultado);

      return `
        <div class="kpi-card">
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
        </div>`;
    }).join('');
  }

  async function init() {
    if (!projId) {
      document.getElementById('kpi-subtitle').textContent = 'Proyecto no especificado';
      return;
    }

    document.getElementById('kpi-back-link').href = `project-page.html?id=${projId}`;

    try {
      const res  = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Error');

      const project = json.data;
      const kpis    = project.kpis || [];

      document.title = `KPIs - ${project.nombre}`;
      document.getElementById('kpi-subtitle').textContent = project.nombre;

      // Stats chips
      const withData  = kpis.filter(k => k.valor_actual !== null).length;
      const avgPct    = kpis.length
        ? Math.round(kpis.reduce((sum, k) => {
            if (k.valor_actual !== null && k.valor_meta > 0) {
              return sum + Math.min(100, (parseFloat(k.valor_actual) / parseFloat(k.valor_meta)) * 100);
            }
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

      renderKPIs(kpis);
    } catch (err) {
      document.getElementById('kpi-grid').innerHTML =
        `<div class="kpi-empty">Error al cargar indicadores: ${err.message}</div>`;
    }
  }

  init();
