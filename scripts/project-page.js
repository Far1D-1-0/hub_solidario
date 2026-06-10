  /* ─── PALETTES ──────────────────────────────────────────────── */
  const PALETTES = {
    default: { accent: '#1E293B', accentBg: '#F8FAFC', accentLight: '#F1F5F9', accentMuted: '#64748B' },
    blue:    { accent: '#1A56E8', accentBg: '#EFF6FF', accentLight: '#DBEAFE', accentMuted: '#3B82F6' },
    green:   { accent: '#16A34A', accentBg: '#F0FDF4', accentLight: '#DCFCE7', accentMuted: '#22C55E' },
    orange:  { accent: '#EA580C', accentBg: '#FFF7ED', accentLight: '#FFEDD5', accentMuted: '#F97316' },
    purple:  { accent: '#7C3AED', accentBg: '#F5F3FF', accentLight: '#EDE9FE', accentMuted: '#A78BFA' },
    rose:    { accent: '#E11D48', accentBg: '#FFF1F2', accentLight: '#FFE4E6', accentMuted: '#FB7185' }
  };

  const WIDGET_LABELS = {
    description:  'Descripción del proyecto',
    dashboard:    'Dashboard de impacto',
    content:      'Contenido del proyecto',
    publications: 'Últimas publicaciones'
  };

  const params = new URLSearchParams(location.search);
  const projId = parseInt(params.get('id') || '0', 10);

  /* ─── HELPERS ───────────────────────────────────────────────── */
  function fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function emptyState(targetId, icon, title, sub) {
    document.getElementById(targetId).innerHTML = `
      <div class="pp-empty-state">
        <div class="pp-empty-icon">${icon}</div>
        <div class="pp-empty-title">${title}</div>
        <p class="pp-empty-sub">${sub}</p>
      </div>`;
  }

  /* ─── FILL PAGE ─────────────────────────────────────────────── */
  function fillPage(project, user) {
    document.title = project.nombre + ' - Proyectos Solidarios';
    document.getElementById('pp-cover').src   = project.imagen || '';
    document.getElementById('pp-cover').alt   = project.nombre;
    document.getElementById('pp-title').textContent  = project.nombre;

    const leaderHref = project.lider_id
      ? `profile.html?id=${project.lider_id}`
      : project.lider_nombre
        ? `profile.html?leader=${encodeURIComponent(project.lider_nombre)}`
        : '#';
    document.getElementById('pp-leader').innerHTML =
      `<a href="${leaderHref}" class="leader-link-page">${project.lider_nombre || '—'}</a>`;

    document.getElementById('pp-hero-desc').textContent = project.descripcion || '';

    // ── Description ──────────────────────────────────────────────
    document.getElementById('desc-about').textContent = project.about || '';
    document.getElementById('desc-objectives').innerHTML =
      (project.objetivos || []).map(o => `<li>${o}</li>`).join('') ||
      '<li>Sin objetivos registrados</li>';
    document.getElementById('desc-community').textContent = project.comunidad || '';

    const op = project.operacion || {};
    document.getElementById('desc-operation').innerHTML = [
      { label: 'Horarios',      value: op.schedule      || '—' },
      { label: 'Ubicaciones',   value: op.locations     || (project.ubicacion || '—') },
      { label: 'Participación', value: op.participation || '—' }
    ].map(o => `
      <div class="pp-op-card">
        <div class="op-label">${o.label}</div>
        <div class="op-value">${o.value.replace(/\n/g, '<br>')}</div>
      </div>`).join('');

    // ── Dashboard & Progress delegated to standalone functions ──────
    const kpis = project.kpis || [];
    renderDashboard(kpis);
    renderProgress(kpis);

    // ── Leader moderation link ────────────────────────────────────
    const me = user || null;
    const isLeader = me && me.loggedIn && (
      me.id === project.lider_id ||
      me.rol_codigo === 'ADMIN'
    );

    const testCount = (project.testimonios_resumen || [])
      .filter(t => t.estado === 'APROBADO')
      .reduce((s, t) => s + parseInt(t.total || 0), 0);
    const contentCards = [
      {
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
        iconBg: '#EFF6FF', iconColor: '#3B82F6',
        title: 'Publicaciones',
        sub: 'Historias de impacto, noticias y actualizaciones del proyecto',
        count: (project.publicaciones || []).length + ' publicaciones',
        href: `publications.html?id=${projId}`
      },
      {
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
        iconBg: '#F0FDF4', iconColor: '#16A34A',
        title: 'Testimonios',
        sub: 'Experiencias de beneficiarios, voluntarios y colaboradores',
        count: testCount + ' testimonios',
        href: `testimonials.html?id=${projId}`,
        extraLink: isLeader ? { label: 'Moderar', href: `moderate-testimonials.html?id=${projId}` } : null
      },
      {
        icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
        iconBg: '#F5F3FF', iconColor: '#7C3AED',
        title: 'KPIs del proyecto',
        sub: 'Indicadores clave de desempeño y métricas de impacto',
        count: kpis.length + ' indicadores',
        href: `kpis.html?id=${projId}`
      }
    ];
    document.getElementById('content-grid').innerHTML = contentCards.map(c => `
      <div class="pp-content-card" style="cursor:default">
        <div class="pp-cc-icon" style="background:${c.iconBg};color:${c.iconColor}">${c.icon}</div>
        <div class="pp-cc-title">${c.title}</div>
        <div class="pp-cc-sub">${c.sub}</div>
        <div class="pp-cc-footer">
          <span class="pp-cc-count">${c.count}</span>
          <div style="display:flex;gap:10px;align-items:center">
            ${c.extraLink ? `<a href="${c.extraLink.href}" style="font-size:.73rem;font-weight:700;color:#E11D48;text-decoration:none;display:flex;align-items:center;gap:3px"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>${c.extraLink.label}</a>` : ''}
            <a href="${c.href}" class="pp-cc-link" style="text-decoration:none">Ver más <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></a>
          </div>
        </div>
      </div>`).join('');

    // ── Publications ──────────────────────────────────────────────
    const pubs = project.publicaciones || [];
    if (!pubs.length) {
      emptyState('pub-body',
        `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
        'Sin publicaciones aún',
        'Las publicaciones del proyecto aparecerán aquí.'
      );
    } else {
      document.getElementById('pub-body').innerHTML = pubs.slice(0, 5).map(p => `
        <div class="pp-pub-item">
          <div class="pp-pub-info">
            <div class="pp-pub-title">${(p.contenido || '').substring(0, 90)}${p.contenido?.length > 90 ? '…' : ''}</div>
            <div class="pp-pub-date">${fmtDate(p.fecha_publicacion)}</div>
          </div>
          <span class="pp-pub-badge badge-articulo">Publicación</span>
        </div>`).join('');
    }

    // ── Leader / Admin bar ────────────────────────────────────────
    if (isLeader) {
      document.getElementById('pp-leader-bar').classList.add('visible');
      document.getElementById('btn-edit-cover').classList.add('visible');
      document.getElementById('btn-add-kpi').style.display = 'flex';
      const btnAddChart = document.getElementById('btn-add-chart');
      btnAddChart.style.display = 'flex';
      btnAddChart.addEventListener('click', e => { e.stopPropagation(); toggleChartDropdown(project, btnAddChart); });
      if (window._showToolsTrigger) window._showToolsTrigger();
      if (me.rol_codigo !== 'ADMIN') {
        const delBtn = document.getElementById('btn-delete-project');
        delBtn.style.display = 'flex';
        delBtn.onmouseenter = () => { delBtn.style.background='rgba(239,68,68,.35)'; delBtn.style.color='white'; delBtn.style.borderColor='rgba(239,68,68,.5)'; };
        delBtn.onmouseleave = () => { delBtn.style.background='rgba(255,255,255,.12)'; delBtn.style.color='rgba(255,255,255,.7)'; delBtn.style.borderColor='rgba(255,255,255,.2)'; };
      }
    }
  }

  /* ─── CHARTS ────────────────────────────────────────────────── */
  function getAccentColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--pp-accent').trim() || '#1E293B';
  }

  function fmtMes(ym) {
    const [y, m] = ym.split('-');
    return new Date(y, m - 1).toLocaleDateString('es-MX', { month: 'short', year: '2-digit' });
  }

  const TIPO_LABELS = { histograma: 'Histograma', puntos: 'Puntos', pie: 'Pie chart' };
  const PIE_COLORS  = ['#1A56E8','#16A34A','#F97316','#7C3AED','#E11D48','#0891B2','#CA8A04','#DC2626'];

  const _chartInstances = [];

  function buildCharts(project) {
    _chartInstances.forEach(c => { try { c.destroy(); } catch {} });
    _chartInstances.length = 0;

    const chartData    = project.chart_data    || {};
    const chartsConfig = project.charts_config || [];
    const kpis         = project.kpis          || [];
    const container    = document.getElementById('pp-charts-dynamic');
    if (!container) return;

    if (!chartsConfig.length) {
      container.innerHTML = '<p class="pp-empty-sub" style="text-align:center;padding:32px 0;font-size:.8rem;color:#9CA3AF;grid-column:1/-1">No hay gráficas en el dashboard. Los líderes pueden agregar gráficas con el botón <strong>Agregar gráfica</strong>.</p>';
      return;
    }

    const accent = getAccentColor() || '#1A56E8';
    container.innerHTML = chartsConfig.map((cfg, idx) => {
      const kpi    = kpis.find(k => parseInt(k.id_kpi) === parseInt(cfg.id_kpi));
      const nombre = kpi ? kpi.nombre : `KPI ${cfg.id_kpi}`;
      return `
        <div class="pp-chart-box" data-chart-kpi="${cfg.id_kpi}">
          <div class="pp-chart-header">
            <h4>${nombre}</h4>
            <div style="display:flex;align-items:center;gap:8px">
              <span class="pp-chart-badge">${TIPO_LABELS[cfg.tipo_grafica] || cfg.tipo_grafica}</span>
              <button class="pp-chart-remove" data-kpi-id="${cfg.id_kpi}" style="display:none" title="Eliminar gráfica">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          <canvas id="chart-dyn-${idx}"></canvas>
        </div>`;
    }).join('');

    chartsConfig.forEach((cfg, idx) => {
      const rawData = chartData[cfg.id_kpi] || chartData[String(cfg.id_kpi)] || [];
      const canvas  = document.getElementById(`chart-dyn-${idx}`);
      if (!canvas) return;

      if (!rawData.length) {
        canvas.style.display = 'none';
        canvas.insertAdjacentHTML('afterend', '<p class="pp-empty-sub" style="text-align:center;padding:24px 0;font-size:.8rem">Sin datos históricos aún</p>');
        return;
      }

      const labels = rawData.map(d => fmtMes(d.mes));
      const values = rawData.map(d => parseFloat(d.valor));
      let chartCfg;

      if (cfg.tipo_grafica === 'histograma') {
        chartCfg = {
          type: 'bar',
          data: { labels, datasets: [{ data: values, backgroundColor: accent, borderRadius: 4, borderSkipped: false }] },
          options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.05)' }, ticks: { font: { size: 10 } } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } } }
        };
      } else if (cfg.tipo_grafica === 'puntos') {
        chartCfg = {
          type: 'line',
          data: { labels, datasets: [{ data: values, showLine: false, pointBackgroundColor: accent, pointBorderColor: accent, pointRadius: 6, borderColor: 'transparent' }] },
          options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.05)' }, ticks: { font: { size: 10 } } }, x: { grid: { display: false }, ticks: { font: { size: 10 } } } } }
        };
      } else if (cfg.tipo_grafica === 'pie') {
        const slices = rawData.slice(-8);
        chartCfg = {
          type: 'doughnut',
          data: { labels: slices.map(d => fmtMes(d.mes)), datasets: [{ data: slices.map(d => parseFloat(d.valor)), backgroundColor: PIE_COLORS.slice(0, slices.length), borderWidth: 2, borderColor: 'white' }] },
          options: { responsive: true, plugins: { legend: { position: 'right', labels: { font: { size: 10 }, boxWidth: 12 } } } }
        };
      }

      if (chartCfg) {
        const inst = new Chart(canvas, chartCfg);
        _chartInstances.push(inst);
      }
    });
  }

  /* ─── CHART DROPDOWN ─────────────────────────────────────────── */
  let _chartDropdownEl = null;

  function closeChartDropdown() {
    if (_chartDropdownEl) { _chartDropdownEl.remove(); _chartDropdownEl = null; }
  }

  function toggleChartDropdown(project, anchorEl) {
    if (_chartDropdownEl) { closeChartDropdown(); return; }

    const chartData    = project.chart_data    || {};
    const chartsConfig = project.charts_config || [];
    const kpis         = project.kpis          || [];
    const addedIds     = chartsConfig.map(c => parseInt(c.id_kpi));

    // Only KPIs with historical data not yet in the dashboard
    const eligible = kpis.filter(k => {
      const data = chartData[k.id_kpi] || chartData[String(k.id_kpi)] || [];
      return data.length > 0 && !addedIds.includes(parseInt(k.id_kpi));
    });

    const dd = document.createElement('div');
    dd.className = 'chart-dropdown';
    dd.innerHTML = eligible.length
      ? eligible.map(k => {
          const count = (chartData[k.id_kpi] || chartData[String(k.id_kpi)] || []).length;
          return `<button class="chart-dd-item" data-kpi-id="${k.id_kpi}">
            <span class="chart-dd-name">${k.nombre}</span>
            <span class="chart-dd-count">${count} registro${count !== 1 ? 's' : ''}</span>
          </button>`;
        }).join('')
      : '<div class="chart-dd-empty">Todos los KPIs con datos ya están en el dashboard</div>';

    const rect = anchorEl.getBoundingClientRect();
    dd.style.top  = (rect.bottom + window.scrollY + 6) + 'px';
    dd.style.left = (rect.right  + window.scrollX - dd.offsetWidth) + 'px';
    document.body.appendChild(dd);
    // Adjust left after render (offsetWidth available now)
    dd.style.left = Math.max(8, rect.right + window.scrollX - dd.offsetWidth) + 'px';
    _chartDropdownEl = dd;

    dd.querySelectorAll('.chart-dd-item').forEach(btn => {
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.querySelector('.chart-dd-name').textContent = 'Agregando…';
        try {
          const res = await fetch('controllers/charts/add.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_proyecto: projId, id_kpi: parseInt(btn.dataset.kpiId) }),
          });
          const j = await res.json();
          if (!j.ok) { alert(j.error || 'Error al agregar'); btn.disabled = false; return; }
          project.charts_config = j.data.charts;
          closeChartDropdown();
          buildCharts(project);
          wireChartRemoveButtons(project);
        } catch { alert('Error de conexión'); btn.disabled = false; }
      });
    });

    setTimeout(() => {
      document.addEventListener('click', function onOutside(e) {
        if (_chartDropdownEl && !_chartDropdownEl.contains(e.target) && e.target !== anchorEl) {
          closeChartDropdown();
          document.removeEventListener('click', onOutside);
        }
      });
    }, 0);
  }

  function wireChartRemoveButtons(project) {
    document.querySelectorAll('.pp-chart-remove').forEach(btn => {
      btn.style.display = 'flex';
      btn.addEventListener('click', async () => {
        if (!confirm('¿Quitar esta gráfica del dashboard?')) return;
        btn.disabled = true;
        try {
          const res = await fetch('controllers/charts/remove.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_proyecto: projId, id_kpi: parseInt(btn.dataset.kpiId) }),
          });
          const j = await res.json();
          if (!j.ok) { alert(j.error || 'Error'); btn.disabled = false; return; }
          project.charts_config = j.data.charts;
          buildCharts(project);
          wireChartRemoveButtons(project);
        } catch { alert('Error de conexión'); btn.disabled = false; }
      });
    });
  }

  /* ─── PALETTE ───────────────────────────────────────────────── */
  function applyPalette(name) {
    const p    = PALETTES[name] || PALETTES.default;
    const root = document.documentElement;
    root.style.setProperty('--pp-accent',       p.accent);
    root.style.setProperty('--pp-accent-bg',    p.accentBg);
    root.style.setProperty('--pp-accent-light', p.accentLight);
    root.style.setProperty('--pp-accent-muted', p.accentMuted);
    document.getElementById('pp-leader-bar').style.background = p.accent;
    document.querySelectorAll('.palette-btn').forEach(b => b.classList.toggle('active', b.dataset.palette === name));
  }

  /* ─── WIDGET ORDER & VISIBILITY ─────────────────────────────── */
  function applyWidgetOrder(order) {
    const container = document.getElementById('pp-widgets');
    order.forEach(id => {
      const el = container.querySelector(`[data-widget-id="${id}"]`);
      if (el) container.appendChild(el);
    });
  }

  function applyHidden(hidden) {
    document.querySelectorAll('.pp-widget').forEach(w => {
      w.classList.toggle('hidden', hidden.includes(w.dataset.widgetId));
    });
    // Apply to project sections too
    document.querySelectorAll('#pp-sections-wrap [data-sec-id]').forEach(el => {
      el.classList.toggle('hidden', hidden.includes(`sec_${el.dataset.secId}`));
    });
  }

  function buildSectionToggleList(sections) {
    const wrap = document.getElementById('pp-sec-toggles-wrap');
    const list = document.getElementById('pp-sec-toggle-list');
    if (!wrap || !list) return;
    const topLevel = sections || [];
    if (!topLevel.length) { wrap.style.display = 'none'; return; }
    wrap.style.display = 'block';
    const hidden = getCurrentHidden();
    list.innerHTML = topLevel.map(s => {
      const id = `sec_${s.id_seccion}`;
      return `<div class="widget-toggle-item" data-wid="${id}">
        <span class="wt-label">${s.nombre}</span>
        <label class="toggle-switch">
          <input type="checkbox" data-widget="${id}" ${hidden.includes(id) ? '' : 'checked'}>
          <span class="slider"></span>
        </label>
      </div>`;
    }).join('');
    list.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', () => {
        const el = document.querySelector(`#pp-sections-wrap [data-sec-id="${cb.dataset.widget.slice(4)}"]`);
        if (el) el.classList.toggle('hidden', !cb.checked);
      });
    });
  }

  function buildToggleList(order, hidden) {
    const list = document.getElementById('widget-toggle-list');
    list.innerHTML = order.map(id => `
      <div class="widget-toggle-item" data-wid="${id}">
        <span class="drag-handle">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.5" fill="#CBD5E1"/><circle cx="9" cy="12" r="1.5" fill="#CBD5E1"/><circle cx="9" cy="19" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="5" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="12" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="19" r="1.5" fill="#CBD5E1"/></svg>
        </span>
        <span class="wt-label">${WIDGET_LABELS[id]}</span>
        <label class="toggle-switch">
          <input type="checkbox" data-widget="${id}" ${hidden.includes(id) ? '' : 'checked'}>
          <span class="slider"></span>
        </label>
      </div>`).join('');

    list.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', () => {
        const widget = document.querySelector(`.pp-widget[data-widget-id="${cb.dataset.widget}"]`);
        if (widget) widget.classList.toggle('hidden', !cb.checked);
      });
    });

    let dragSrc = null;
    list.querySelectorAll('.widget-toggle-item').forEach(item => {
      item.addEventListener('dragstart', e => { dragSrc = item; item.style.opacity = '.4'; e.dataTransfer.effectAllowed = 'move'; });
      item.addEventListener('dragend',   () => { item.style.opacity = ''; dragSrc = null; });
      item.addEventListener('dragover',  e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
      item.addEventListener('drop', e => {
        e.preventDefault();
        if (dragSrc && dragSrc !== item) {
          const items  = [...list.querySelectorAll('.widget-toggle-item')];
          const srcIdx = items.indexOf(dragSrc);
          const tgtIdx = items.indexOf(item);
          if (srcIdx < tgtIdx) item.after(dragSrc); else item.before(dragSrc);
          const newOrder = [...list.querySelectorAll('.widget-toggle-item')].map(i => i.dataset.wid);
          applyWidgetOrder(newOrder);
        }
      });
      item.setAttribute('draggable', 'true');
    });
  }

  /* ─── DRAG-TO-REORDER ON PAGE ───────────────────────────────── */
  let pageDragSrc = null;
  function enablePageDrag(enable) {
    document.querySelectorAll('.pp-widget').forEach(w => {
      w.setAttribute('draggable', enable ? 'true' : 'false');
      if (enable) {
        w.addEventListener('dragstart', onPageDragStart);
        w.addEventListener('dragend',   onPageDragEnd);
        w.addEventListener('dragover',  onPageDragOver);
        w.addEventListener('drop',      onPageDrop);
      } else {
        w.removeEventListener('dragstart', onPageDragStart);
        w.removeEventListener('dragend',   onPageDragEnd);
        w.removeEventListener('dragover',  onPageDragOver);
        w.removeEventListener('drop',      onPageDrop);
      }
    });
  }
  function onPageDragStart(e) { pageDragSrc = this; this.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
  function onPageDragEnd()    { this.classList.remove('dragging', 'drag-over'); pageDragSrc = null; }
  function onPageDragOver(e)  { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; document.querySelectorAll('.pp-widget').forEach(w => w.classList.remove('drag-over')); this.classList.add('drag-over'); }
  function onPageDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    if (pageDragSrc && pageDragSrc !== this) {
      const container = document.getElementById('pp-widgets');
      const widgets   = [...container.querySelectorAll('.pp-widget')];
      const srcIdx    = widgets.indexOf(pageDragSrc);
      const tgtIdx    = widgets.indexOf(this);
      if (srcIdx < tgtIdx) this.after(pageDragSrc); else this.before(pageDragSrc);
      const newOrder = [...container.querySelectorAll('.pp-widget')].map(w => w.dataset.widgetId);
      buildToggleList(newOrder, getCurrentHidden());
    }
  }
  function getCurrentHidden() {
    const ids = [...document.querySelectorAll('.pp-widget.hidden')].map(w => w.dataset.widgetId);
    document.querySelectorAll('#pp-sections-wrap [data-sec-id].hidden').forEach(el => ids.push(`sec_${el.dataset.secId}`));
    return ids;
  }
  function getCurrentOrder()  { return [...document.querySelectorAll('.pp-widget')].map(w => w.dataset.widgetId); }

  /* ─── PANEL ─────────────────────────────────────────────────── */
  let settings    = { palette: 'default', widgetOrder: ['description','dashboard','content','publications'], hiddenWidgets: [] };
  let tempPalette = 'default';

  function openPanel() {
    tempPalette = settings.palette;
    buildToggleList(getCurrentOrder(), getCurrentHidden());
    document.getElementById('pp-panel-overlay').classList.add('show');
    document.getElementById('pp-customize-panel').classList.add('open');
    document.body.classList.add('edit-mode');
    enablePageDrag(true);
  }
  function closePanel(save) {
    if (save) {
      settings.palette       = tempPalette;
      settings.widgetOrder   = getCurrentOrder();
      settings.hiddenWidgets = getCurrentHidden();
      fetch('controllers/projects/settings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projId, ...settings }),
      }).catch(() => {});
    } else {
      applyPalette(settings.palette);
      applyWidgetOrder(settings.widgetOrder);
      applyHidden(settings.hiddenWidgets);
    }
    document.getElementById('pp-panel-overlay').classList.remove('show');
    document.getElementById('pp-customize-panel').classList.remove('open');
    document.body.classList.remove('edit-mode');
    enablePageDrag(false);
  }

  document.getElementById('btn-open-panel').addEventListener('click', openPanel);
  document.getElementById('pp-panel-close').addEventListener('click', () => closePanel(false));
  document.getElementById('btn-cancel-settings').addEventListener('click', () => closePanel(false));
  document.getElementById('btn-save-settings').addEventListener('click', () => closePanel(true));
  document.getElementById('pp-panel-overlay').addEventListener('click', () => closePanel(false));

  document.getElementById('palette-grid').addEventListener('click', e => {
    const btn = e.target.closest('.palette-btn');
    if (!btn) return;
    tempPalette = btn.dataset.palette;
    applyPalette(tempPalette);
  });

  /* ─── DELETE PROJECT ────────────────────────────────────────── */
  (function initDelete() {
    const delOverlay = document.getElementById('del-overlay');

    document.getElementById('btn-delete-project').addEventListener('click', () => {
      delOverlay.style.display = 'flex';
    });
    document.getElementById('del-cancel').addEventListener('click', () => {
      delOverlay.style.display = 'none';
    });
    delOverlay.addEventListener('click', e => {
      if (e.target === delOverlay) delOverlay.style.display = 'none';
    });
    document.getElementById('del-confirm').addEventListener('click', async () => {
      try {
        const res  = await fetch('controllers/projects/delete.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: projId }),
        });
        const json = await res.json();
        if (!json.ok) { alert(json.error || 'No se pudo eliminar el proyecto'); return; }
        window.location.href = 'catalog.html';
      } catch {
        alert('Error de conexión al eliminar el proyecto');
      }
    });
  })();

  /* ─── COVER IMAGE EDIT ──────────────────────────────────────── */
  (function initCoverEdit() {
    const coverEl   = document.getElementById('pp-cover');
    const overlay   = document.getElementById('img-modal-overlay');
    const urlInput  = document.getElementById('img-url-input');
    const preview   = document.getElementById('img-preview');
    const fileInput = document.getElementById('img-file-input');

    let debounce;
    urlInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => { if (urlInput.value.trim()) preview.src = urlInput.value.trim(); }, 400);
    });

    document.getElementById('img-upload-btn').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => { urlInput.value = ''; preview.src = e.target.result; preview._base64 = e.target.result; };
      reader.readAsDataURL(file);
      fileInput.value = '';
    });

    document.getElementById('btn-edit-cover').addEventListener('click', () => {
      preview._base64 = null;
      urlInput.value  = '';
      preview.src     = coverEl.src;
      overlay.classList.add('show');
    });

    function closeModal() { overlay.classList.remove('show'); preview._base64 = null; }
    document.getElementById('img-btn-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

    document.getElementById('img-btn-save').addEventListener('click', async () => {
      const src = preview._base64 || urlInput.value.trim() || preview.src;
      if (!src || src === location.href) return;
      try {
        const res  = await fetch('controllers/projects/update-cover.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: projId, imagen: src }),
        });
        const json = await res.json();
        if (!json.ok) { alert(json.error || 'Error al guardar la imagen'); return; }
        coverEl.src = src;
        closeModal();
      } catch {
        alert('Error de conexión al guardar la imagen');
      }
    });
  })();

  /* ─── EDIT INFO ─────────────────────────────────────────────── */
  let currentProject    = null;
  let cachedCategories  = null;

  (function initEditInfo() {
    const eiOverlay = document.getElementById('ei-overlay');
    const eiMsg     = document.getElementById('ei-msg');

    function showMsg(txt, ok) {
      eiMsg.textContent   = txt;
      eiMsg.style.color   = ok ? '#16A34A' : '#EF4444';
      eiMsg.style.display = 'block';
    }

    function closeEi() { eiOverlay.style.display = 'none'; }

    document.getElementById('ei-close').addEventListener('click', closeEi);
    document.getElementById('ei-cancel').addEventListener('click', closeEi);
    eiOverlay.addEventListener('click', e => { if (e.target === eiOverlay) closeEi(); });

    document.getElementById('btn-edit-info').addEventListener('click', async () => {
      if (!currentProject) return;
      eiMsg.style.display = 'none';

      // Load categories once
      if (!cachedCategories) {
        try {
          const r = await fetch('controllers/categories/list.php');
          const j = await r.json();
          cachedCategories = j.ok ? j.data : [];
        } catch { cachedCategories = []; }
      }

      const sel = document.getElementById('ei-categoria');
      sel.innerHTML = '<option value="">Sin categoría</option>' +
        cachedCategories.map(c =>
          `<option value="${c.id}" ${parseInt(currentProject.id_categoria) === c.id ? 'selected' : ''}>${c.nombre}</option>`
        ).join('');

      // Pre-fill fields
      document.getElementById('ei-nombre').value        = currentProject.nombre || '';
      document.getElementById('ei-desc').value          = currentProject.descripcion || '';
      document.getElementById('ei-ubicacion').value     = currentProject.ubicacion || '';
      document.getElementById('ei-about').value         = currentProject.about || '';
      document.getElementById('ei-comunidad').value     = currentProject.comunidad || '';

      const objs = Array.isArray(currentProject.objetivos) ? currentProject.objetivos : [];
      document.getElementById('ei-objetivos').value = objs.join('\n');

      const op = (currentProject.operacion && !Array.isArray(currentProject.operacion))
        ? currentProject.operacion : {};
      document.getElementById('ei-schedule').value     = op.schedule     || '';
      document.getElementById('ei-locations').value    = op.locations    || '';
      document.getElementById('ei-participation').value = op.participation || '';

      eiOverlay.style.display = 'flex';
      document.getElementById('ei-nombre').focus();
    });

    document.getElementById('ei-save').addEventListener('click', async () => {
      const nombre = document.getElementById('ei-nombre').value.trim();
      if (!nombre) return showMsg('El nombre del proyecto es requerido.', false);
      eiMsg.style.display = 'none';

      const objetivos = document.getElementById('ei-objetivos').value
        .split('\n').map(s => s.trim()).filter(Boolean);
      const operacion = {
        schedule:      document.getElementById('ei-schedule').value.trim(),
        locations:     document.getElementById('ei-locations').value.trim(),
        participation: document.getElementById('ei-participation').value.trim(),
      };
      const payload = {
        id:                       projId,
        nombre,
        descripcion:              document.getElementById('ei-desc').value.trim(),
        ubicacion:                document.getElementById('ei-ubicacion').value.trim(),
        about:                    document.getElementById('ei-about').value.trim(),
        comunidad:                document.getElementById('ei-comunidad').value.trim(),
        objetivos,
        operacion,
        id_categoria:             document.getElementById('ei-categoria').value || null,
      };

      try {
        const res  = await fetch('controllers/projects/update.php', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.ok) return showMsg(json.error || 'Error al guardar.', false);

        // Update currentProject and displayed data
        Object.assign(currentProject, {
          nombre:       payload.nombre,
          descripcion:  payload.descripcion,
          ubicacion:    payload.ubicacion,
          about:        payload.about,
          comunidad:    payload.comunidad,
          objetivos:    payload.objetivos,
          operacion:    payload.operacion,
          id_categoria: payload.id_categoria,
        });

        document.title = nombre + ' - Proyectos Solidarios';
        document.getElementById('pp-title').textContent    = nombre;
        document.getElementById('pp-hero-desc').textContent = payload.descripcion;
        document.getElementById('desc-about').textContent  = payload.about;
        document.getElementById('desc-community').textContent = payload.comunidad;
        document.getElementById('desc-objectives').innerHTML =
          payload.objetivos.length
            ? payload.objetivos.map(o => `<li>${o}</li>`).join('')
            : '<li>Sin objetivos registrados</li>';
        document.getElementById('desc-operation').innerHTML = [
          { label: 'Horarios',      value: operacion.schedule      || '—' },
          { label: 'Ubicaciones',   value: operacion.locations     || (payload.ubicacion || '—') },
          { label: 'Participación', value: operacion.participation || '—' },
        ].map(o => `
          <div class="pp-op-card">
            <div class="op-label">${o.label}</div>
            <div class="op-value">${o.value.replace(/\n/g, '<br>')}</div>
          </div>`).join('');

        closeEi();
      } catch { showMsg('Error de conexión.', false); }
    });
  })();

  /* ─── DASHBOARD RENDER ─────────────────────────────────────── */
  const STAT_BG    = ['#EFF6FF','#F0FDF4','#FFF7ED','#F5F3FF','#FFF1F2','#ECFDF5'];
  const STAT_COLOR = ['#3B82F6','#22C55E','#F97316','#7C3AED','#E11D48','#10B981'];
  const STAT_ICONS = [
    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  ];

  function renderDashboard(kpis) {
    const dashBody = document.querySelector('.pp-dash-body');
    if (!dashBody) return;

    if (!kpis || !kpis.length) {
      dashBody.innerHTML = `
        <div class="pp-empty-state">
          <div class="pp-empty-icon"><svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
          <div class="pp-empty-title">Dashboard sin datos aún</div>
          <p class="pp-empty-sub">Añade KPIs al proyecto para ver las tarjetas de impacto aquí.</p>
        </div>`;
      return;
    }

    // Restore full layout if it was replaced by empty state
    if (!document.getElementById('dash-stats')) {
      dashBody.innerHTML = `
        <div class="pp-stat-cards" id="dash-stats"></div>
        <div class="pp-charts-row">
          <div class="pp-chart-box"><h4>Evolución de beneficiarios</h4><canvas id="chart-beneficiaries"></canvas></div>
          <div class="pp-chart-box"><h4>Actividades realizadas</h4><canvas id="chart-activities"></canvas></div>
        </div>`;
    }

    document.getElementById('dash-stats').innerHTML = kpis.map((k, i) => {
      const idx   = i % STAT_BG.length;
      const val   = k.valor_actual !== null && k.valor_actual !== undefined
        ? parseFloat(k.valor_actual).toLocaleString('es-MX') + (k.unidad_simbolo ? ' ' + k.unidad_simbolo : '')
        : '—';
      const pct   = k.valor_meta > 0 && k.valor_actual != null
        ? Math.round((k.valor_actual / k.valor_meta) * 100)
        : null;
      const pctBar = pct !== null ? Math.min(100, pct) : 0;
      return `
        <div class="pp-stat-card">
          <div class="pp-stat-top">
            <div class="pp-stat-icon" style="background:${STAT_BG[idx]};color:${STAT_COLOR[idx]}">${STAT_ICONS[idx]}</div>
            <div class="pp-stat-label">${k.nombre}</div>
          </div>
          <div class="pp-stat-value">${val}</div>
          <div class="pp-stat-progress-wrap">
            <div class="pp-stat-progress-track">
              <div class="pp-stat-progress-fill" style="width:${pctBar}%;background:${STAT_COLOR[idx]}"></div>
            </div>
          </div>
          <div class="pp-stat-change neu">
            ${pct !== null ? `Meta: ${parseFloat(k.valor_meta).toLocaleString('es-MX')} ${k.unidad_simbolo || ''} · ${pct}%` : 'Sin valor registrado aún'}
          </div>
        </div>`;
    }).join('');
  }

  function renderProgress(kpis) {
    if (!document.getElementById('prog-body')) return;
    if (!kpis || !kpis.length) {
      emptyState('prog-body',
        `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
        'Sin métricas de progreso',
        'Los KPIs registrados mostrarán el progreso hacia las metas del proyecto.'
      );
      return;
    }
    document.getElementById('prog-body').innerHTML = kpis.map(k => {
      const current = parseFloat(k.valor_actual ?? 0);
      const meta    = parseFloat(k.valor_meta);
      const pct     = meta > 0 ? Math.min(100, Math.round((current / meta) * 100)) : 0;
      const sym     = k.unidad_simbolo ? ' ' + k.unidad_simbolo : '';
      return `
        <div class="pp-prog-item">
          <div class="pp-prog-header">
            <span class="pp-prog-lbl">${k.nombre} (${current.toLocaleString('es-MX')}${sym} / ${meta.toLocaleString('es-MX')}${sym})</span>
            <span class="pp-prog-pct">${pct}%</span>
          </div>
          <div class="pp-prog-track"><div class="pp-prog-fill" style="width:${pct}%"></div></div>
        </div>`;
    }).join('');
  }

  /* ─── ADD KPI MODAL ─────────────────────────────────────────── */
  (function initKpiModal() {
    const overlay  = document.getElementById('kpi-modal-overlay');
    const msgEl    = document.getElementById('kpi-modal-msg');
    const saveBtn  = document.getElementById('kpi-modal-save');
    let unitsCache = null;

    function showMsg(txt, ok) {
      msgEl.textContent = txt;
      msgEl.className   = 'tools-msg ' + (ok ? 'success' : 'error');
      msgEl.style.display = 'block';
    }
    function closeModal() {
      overlay.style.display = 'none';
      msgEl.style.display   = 'none';
      document.getElementById('kpi-nombre').value = '';
      document.getElementById('kpi-desc').value   = '';
      document.getElementById('kpi-meta').value   = '';
    }

    document.getElementById('kpi-modal-close').addEventListener('click', closeModal);
    document.getElementById('kpi-modal-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

    document.getElementById('btn-add-kpi').addEventListener('click', async () => {
      msgEl.style.display = 'none';
      if (!unitsCache) {
        try {
          const r = await fetch('controllers/units/list.php');
          const j = await r.json();
          unitsCache = j.ok ? j.data : [];
        } catch { unitsCache = []; }
      }
      const sel = document.getElementById('kpi-unidad');
      sel.innerHTML = '<option value="">— Sin unidad —</option>' +
        unitsCache.map(u => `<option value="${u.id}">${u.nombre} (${u.simbolo})</option>`).join('');
      overlay.style.display = 'flex';
      document.getElementById('kpi-nombre').focus();
    });

    saveBtn.addEventListener('click', async () => {
      const nombre = document.getElementById('kpi-nombre').value.trim();
      const meta   = parseFloat(document.getElementById('kpi-meta').value);
      const desc   = document.getElementById('kpi-desc').value.trim();
      const unidad = document.getElementById('kpi-unidad').value || null;

      if (!nombre)      return showMsg('El nombre del KPI es requerido.', false);
      if (!meta || meta <= 0) return showMsg('El valor meta debe ser mayor a 0.', false);

      saveBtn.disabled = true;
      try {
        const res  = await fetch('controllers/kpis/create.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id_proyecto: projId,
            nombre,
            descripcion: desc || null,
            valor_meta:  meta,
            id_unidad_medida: unidad ? parseInt(unidad) : null,
          }),
        });
        const json = await res.json();
        if (!json.ok) { showMsg(json.error || 'Error al crear el KPI.', false); return; }

        showMsg(`KPI "${nombre}" creado correctamente.`, true);
        document.getElementById('kpi-nombre').value = '';
        document.getElementById('kpi-desc').value   = '';
        document.getElementById('kpi-meta').value   = '';

        // Reload all KPIs and refresh dashboard + progress
        const lr  = await fetch(`controllers/kpis/list.php?id=${projId}`);
        const lj  = await lr.json();
        if (lj.ok) {
          renderDashboard(lj.data);
          renderProgress(lj.data);
          if (currentProject) currentProject.kpis = lj.data;
        }
      } catch { showMsg('Error de conexión.', false); }
      finally { saveBtn.disabled = false; }
    });
  })();

  /* ─── SECTIONS RENDER ──────────────────────────────────────── */
  let _isLeaderFlag = false;

  const ESTADO_CLASS = { PUBLICADA: 'pub', BORRADOR: 'borra', ARCHIVADA: 'arch' };

  function pageCardHtml(p, isLeader) {
    const estadoClass = ESTADO_CLASS[p.estado_codigo] || 'borra';
    return `
      <a class="pp-page-card pp-page-card--link" href="page-view.html?id=${p.id_pagina}">
        <div class="pp-page-card-title">${p.titulo}</div>
        <div class="pp-page-card-badges">
          <span class="pp-page-badge tipo">${p.tipo_nombre || p.tipo_codigo}</span>
          ${isLeader ? `<span class="pp-page-badge ${estadoClass}">${p.estado_nombre || p.estado_codigo}</span>` : ''}
        </div>
      </a>`;
  }

  function subsectionHtml(s, isLeader) {
    const pages    = isLeader ? (s.pages || []) : (s.pages || []).filter(p => p.estado_codigo === 'PUBLICADA');
    const pagesHtml = pages.length
      ? `<div class="pp-subsection-pages">${pages.map(p => pageCardHtml(p, isLeader)).join('')}</div>`
      : `<div class="pp-section-empty">Sin páginas${isLeader ? ' en esta subsección' : ' publicadas'}</div>`;
    return `
      <div class="pp-subsection-card">
        <div class="pp-subsection-head">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          <span class="pp-subsection-name">${s.nombre}</span>
        </div>
        ${pagesHtml}
      </div>`;
  }

  function sectionCardHtml(s, isLeader) {
    const visiblePages = isLeader ? (s.pages || []) : (s.pages || []).filter(p => p.estado_codigo === 'PUBLICADA');
    const totalPages   = visiblePages.length +
      (s.children ? s.children.reduce((acc, c) => {
        const childPgs = isLeader ? (c.pages||[]) : (c.pages||[]).filter(p => p.estado_codigo === 'PUBLICADA');
        return acc + childPgs.length;
      }, 0) : 0);

    const addBtn = isLeader
      ? `<button class="pp-section-add-page" data-seccion="${s.id_seccion}" data-nombre="${s.nombre}">
          <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          Añadir página
        </button>`
      : '';

    const pagesGrid = visiblePages.length
      ? `<div class="pp-section-pages">${visiblePages.map(p => pageCardHtml(p, isLeader)).join('')}</div>`
      : `<div class="pp-section-empty">Sin páginas${isLeader ? ' en esta sección — usa el botón para añadir una.' : ' publicadas en esta sección.'}</div>`;

    const childrenHtml = s.children && s.children.length
      ? `<div class="pp-subsections">${s.children.map(c => subsectionHtml(c, isLeader)).join('')}</div>`
      : '';

    return `
      <div class="pp-section-card" data-sec-id="${s.id_seccion}">
        <div class="pp-section-card-head">
          <div class="pp-section-card-icon">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
          </div>
          <span class="pp-section-card-name">${s.nombre}</span>
          <span class="pp-section-card-meta">${totalPages} ${totalPages === 1 ? 'página' : 'páginas'}</span>
          ${addBtn}
        </div>
        ${pagesGrid}
        ${childrenHtml}
      </div>`;
  }

  function renderSections(sections, isLeader) {
    const wrap = document.getElementById('pp-sections-wrap');
    if (!wrap) return;

    if (!sections || !sections.length) {
      if (isLeader) {
        wrap.innerHTML = `
          <div class="pp-sections-leader-hint" id="hint-add-section">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
            <span>Este proyecto aún no tiene secciones. Usa <strong>Herramientas → Añadir Sección</strong> para comenzar a estructurar el contenido.</span>
          </div>`;
        document.getElementById('hint-add-section').addEventListener('click', () => {
          document.getElementById('tools-btn-section').click();
        });
      }
      // Non-leaders: don't show anything when no sections
      return;
    }

    // For non-leaders, filter out sections that have no visible pages at all
    const visibleSections = isLeader ? sections : sections.filter(s => {
      const hasPages = (s.pages || []).some(p => p.estado_codigo === 'PUBLICADA');
      const childHas = (s.children || []).some(c => (c.pages || []).some(p => p.estado_codigo === 'PUBLICADA'));
      return hasPages || childHas;
    });

    if (!visibleSections.length && !isLeader) {
      wrap.innerHTML = '';
      return;
    }

    wrap.innerHTML = visibleSections.map(s => sectionCardHtml(s, isLeader)).join('');
    // Re-apply hidden state after re-render
    applyHidden(settings.hiddenWidgets);
    // Rebuild section toggles in customize panel (leader only)
    if (isLeader) buildSectionToggleList(visibleSections);

    if (isLeader) {
      wrap.querySelectorAll('.pp-section-add-page').forEach(btn => {
        btn.addEventListener('click', async () => {
          const idSec   = parseInt(btn.dataset.seccion);
          const nombre  = btn.dataset.nombre;
          // open the add-page modal pre-selecting this section
          document.getElementById('tools-btn-page').click();
          await new Promise(r => setTimeout(r, 50));
          const sel = document.getElementById('page-seccion');
          if (sel) {
            for (const opt of sel.options) {
              if (parseInt(opt.value) === idSec) { opt.selected = true; break; }
            }
          }
        });
      });
    }
  }

  /* ─── TOOLS PANEL ──────────────────────────────────────────── */
  (function initToolsPanel() {
    const trigger      = document.getElementById('tools-trigger');
    const overlay      = document.getElementById('tools-overlay');
    const panel        = document.getElementById('tools-panel');
    const closeBtn     = document.getElementById('tools-panel-close');
    const btnSection   = document.getElementById('tools-btn-section');
    const btnPage      = document.getElementById('tools-btn-page');
    const btnTree      = document.getElementById('tools-btn-tree');
    const treeArrow    = document.getElementById('tree-arrow');
    const navTreeWrap  = document.getElementById('tools-nav-tree');
    const treeContent  = document.getElementById('tools-tree-content');

    let treeOpen    = false;
    let sectionsCache = null;

    function openPanel() {
      overlay.classList.add('show');
      panel.classList.add('open');
    }
    function closePanel() {
      overlay.classList.remove('show');
      panel.classList.remove('open');
    }

    trigger.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    /* Flatten section tree to a list (for dropdowns) */
    function flatSections(nodes, depth = 0) {
      const result = [];
      for (const s of nodes) {
        result.push({ ...s, depth });
        if (s.children && s.children.length) {
          result.push(...flatSections(s.children, depth + 1));
        }
      }
      return result;
    }

    async function loadSections(forceRefresh = false) {
      if (sectionsCache && !forceRefresh) return sectionsCache;
      try {
        const r = await fetch(`controllers/sections/list.php?id=${projId}`);
        const j = await r.json();
        sectionsCache = j.ok ? j.data : [];
      } catch { sectionsCache = []; }
      return sectionsCache;
    }

    function populateSectionSelect(selectEl, includePlaceholder, flat) {
      const prefix = includePlaceholder ? '<option value="">— Ninguna (sección raíz) —</option>' : '<option value="">— Selecciona una sección —</option>';
      selectEl.innerHTML = prefix + flat.map(s => {
        const indent = '    '.repeat(s.depth);
        return `<option value="${s.id_seccion}">${indent}${s.nombre}</option>`;
      }).join('');
    }

    /* ── Add Section modal ── */
    const secOverlay   = document.getElementById('sec-modal-overlay');
    const secNombre    = document.getElementById('sec-nombre');
    const secPadre     = document.getElementById('sec-padre');
    const secMsg       = document.getElementById('sec-msg');
    const secSave      = document.getElementById('sec-save');

    function showSecMsg(txt, ok) {
      secMsg.textContent = txt;
      secMsg.className   = 'tools-msg ' + (ok ? 'success' : 'error');
      secMsg.style.display = 'block';
    }
    function closeSecModal() {
      secOverlay.style.display = 'none';
      secNombre.value = '';
      secMsg.style.display = 'none';
    }

    document.getElementById('sec-modal-close').addEventListener('click', closeSecModal);
    document.getElementById('sec-cancel').addEventListener('click', closeSecModal);
    secOverlay.addEventListener('click', e => { if (e.target === secOverlay) closeSecModal(); });

    btnSection.addEventListener('click', async () => {
      secMsg.style.display = 'none';
      secNombre.value = '';
      const flat = flatSections(await loadSections());
      populateSectionSelect(secPadre, true, flat);
      secOverlay.style.display = 'flex';
      secNombre.focus();
    });

    secSave.addEventListener('click', async () => {
      const nombre = secNombre.value.trim();
      if (!nombre) return showSecMsg('El nombre de la sección es requerido.', false);
      const padreVal = secPadre.value ? parseInt(secPadre.value) : null;
      secSave.disabled = true;
      try {
        const res  = await fetch('controllers/sections/create.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_proyecto: projId, nombre, id_seccion_padre: padreVal }),
        });
        const json = await res.json();
        if (!json.ok) { showSecMsg(json.error || 'Error al crear la sección.', false); return; }
        sectionsCache = null;
        showSecMsg(`Sección "${nombre}" creada correctamente.`, true);
        secNombre.value = '';
        if (treeOpen) renderNavTree();
        if (window._reloadNavPanel) window._reloadNavPanel();
        // Refresh home sections
        const sr2 = await fetch(`controllers/sections/list.php?id=${projId}`);
        const sj2 = await sr2.json();
        renderSections(sj2.ok ? sj2.data : [], _isLeaderFlag);
      } catch { showSecMsg('Error de conexión.', false); }
      finally { secSave.disabled = false; }
    });

    /* ── Add Page modal ── */
    const pageOverlay  = document.getElementById('page-modal-overlay');
    const pageTitulo   = document.getElementById('page-titulo');
    const pageSeccion  = document.getElementById('page-seccion');
    const pageTipo     = document.getElementById('page-tipo');
    const pageMsg      = document.getElementById('page-msg');
    const pageSave     = document.getElementById('page-save');

    function showPageMsg(txt, ok) {
      pageMsg.textContent = txt;
      pageMsg.className   = 'tools-msg ' + (ok ? 'success' : 'error');
      pageMsg.style.display = 'block';
    }
    function closePageModal() {
      pageOverlay.style.display = 'none';
      pageTitulo.value = '';
      pageMsg.style.display = 'none';
    }

    document.getElementById('page-modal-close').addEventListener('click', closePageModal);
    document.getElementById('page-cancel').addEventListener('click', closePageModal);
    pageOverlay.addEventListener('click', e => { if (e.target === pageOverlay) closePageModal(); });

    btnPage.addEventListener('click', async () => {
      pageMsg.style.display = 'none';
      pageTitulo.value = '';
      const flat = flatSections(await loadSections());
      if (!flat.length) {
        showPageMsg('Primero debes crear al menos una sección.', false);
        pageOverlay.style.display = 'flex';
        pageSave.disabled = true;
        return;
      }
      pageSave.disabled = false;
      populateSectionSelect(pageSeccion, false, flat);
      pageOverlay.style.display = 'flex';
      pageTitulo.focus();
    });

    pageSave.addEventListener('click', async () => {
      const titulo = pageTitulo.value.trim();
      if (!titulo) return showPageMsg('El título de la página es requerido.', false);
      const idSec = parseInt(pageSeccion.value);
      if (!idSec) return showPageMsg('Selecciona una sección.', false);
      const tipo = pageTipo.value || 'CONTENIDO';
      pageSave.disabled = true;
      try {
        const res  = await fetch('controllers/pages/create.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_seccion: idSec, titulo, tipo_pagina: tipo }),
        });
        const json = await res.json();
        if (!json.ok) { showPageMsg(json.error || 'Error al crear la página.', false); return; }
        sectionsCache = null;
        showPageMsg(`Página "${titulo}" creada correctamente.`, true);
        pageTitulo.value = '';
        if (treeOpen) renderNavTree();
        if (window._reloadNavPanel) window._reloadNavPanel();
        // Refresh home sections
        const sr3 = await fetch(`controllers/sections/list.php?id=${projId}`);
        const sj3 = await sr3.json();
        renderSections(sj3.ok ? sj3.data : [], _isLeaderFlag);
      } catch { showPageMsg('Error de conexión.', false); }
      finally { pageSave.disabled = false; }
    });

    /* ── Nav Tree ── */
    function renderNodePages(pages) {
      if (!pages || !pages.length) {
        return '<div class="tree-no-pages">Sin páginas</div>';
      }
      return `<div class="tree-pages">${pages.map(p => {
        const isPub = p.estado_codigo === 'PUBLICADA';
        return `<a class="tree-page" href="page-view.html?id=${p.id_pagina}" style="text-decoration:none;color:inherit">
          <div class="tree-page-dot"></div>
          <span>${p.titulo}</span>
          <span class="tree-page-badge ${isPub ? 'pub' : ''}">${p.estado_nombre || p.estado_codigo}</span>
        </a>`;
      }).join('')}</div>`;
    }

    function renderNode(s) {
      const childrenHtml = s.children && s.children.length
        ? `<div class="tree-children">${s.children.map(renderNode).join('')}</div>`
        : '';
      return `<div class="tree-section">
        <div class="tree-section-head">
          <div class="tree-section-icon">
            <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          </div>
          <span>${s.nombre}</span>
        </div>
        ${renderNodePages(s.pages)}
        ${childrenHtml}
      </div>`;
    }

    async function renderNavTree() {
      treeContent.innerHTML = '<div class="tools-tree-loading">Cargando estructura…</div>';
      const sections = await loadSections(true);
      if (!sections.length) {
        treeContent.innerHTML = '<div class="tools-tree-empty">Sin secciones aún. Añade la primera sección para comenzar.</div>';
        return;
      }
      treeContent.innerHTML = sections.map(renderNode).join('');
    }

    btnTree.addEventListener('click', async () => {
      treeOpen = !treeOpen;
      navTreeWrap.style.display = treeOpen ? 'block' : 'none';
      treeArrow.style.transform = treeOpen ? 'rotate(90deg)' : '';
      if (treeOpen) renderNavTree();
    });

    /* expose show function */
    window._showToolsTrigger = () => {
      trigger.style.removeProperty('display');
      trigger.classList.add('visible');
    };
  })();

  /* ─── NAV PANEL (right side, all users) ─────────────────────── */
  (function initNavPanel() {
    const trigger  = document.getElementById('pp-nav-trigger');
    const overlay  = document.getElementById('pp-nav-overlay');
    const panel    = document.getElementById('pp-nav-panel');
    const closeBtn = document.getElementById('pp-nav-panel-close');
    const bodyEl   = document.getElementById('pp-nav-panel-body');
    if (!trigger || !panel) return;

    function openPanel() {
      overlay.classList.add('show');
      panel.classList.add('open');
      if (bodyEl && bodyEl.dataset.loaded !== '1') {
        loadNavTree();
      }
    }
    function closePanel() {
      overlay.classList.remove('show');
      panel.classList.remove('open');
    }

    trigger.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    async function loadNavTree() {
      if (!projId) return;
      bodyEl.innerHTML = '<div class="tools-tree-loading">Cargando…</div>';
      bodyEl.dataset.loaded = '1';
      try {
        const r = await fetch(`controllers/sections/list.php?id=${projId}`);
        const j = await r.json();
        const sections = j.ok ? j.data : [];
        if (!sections.length) {
          bodyEl.innerHTML = '<div class="tools-tree-empty">Sin secciones en este proyecto.</div>';
          return;
        }
        bodyEl.innerHTML = sections.map(renderNavNode).join('');
      } catch {
        bodyEl.innerHTML = '<div class="tools-tree-empty">Error al cargar.</div>';
      }
    }

    function renderNavNode(s) {
      const pages = (s.pages || []).filter(p => _isLeaderFlag || p.estado_codigo === 'PUBLICADA');
      const children = (s.children || []);
      const pagesHtml = pages.map(p => {
        const isPub = p.estado_codigo === 'PUBLICADA';
        return `<a class="tree-page" href="page-view.html?id=${p.id_pagina}" style="text-decoration:none;color:inherit">
          <div class="tree-page-dot"></div>
          <span>${p.titulo}</span>
          ${_isLeaderFlag ? `<span class="tree-page-badge ${isPub ? 'pub' : ''}">${isPub ? 'Pub' : p.estado_codigo === 'BORRADOR' ? 'Bor' : 'Arc'}</span>` : ''}
        </a>`;
      }).join('');
      const childHtml = children.map(renderNavNode).join('');
      return `<div class="tree-section">
        <div class="tree-section-head">
          <div class="tree-section-icon"><svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></div>
          <span>${s.nombre}</span>
        </div>
        ${pagesHtml ? `<div class="tree-pages">${pagesHtml}</div>` : ''}
        ${childHtml ? `<div class="tree-children">${childHtml}</div>` : ''}
      </div>`;
    }

    // Re-load nav tree after sections/pages are added
    window._reloadNavPanel = () => { bodyEl.dataset.loaded = '0'; };
  })();

  /* ─── LOAD PROJECT & INIT ───────────────────────────────────── */
  async function init() {
    if (!projId) {
      document.getElementById('pp-title').textContent = 'Proyecto no encontrado';
      return;
    }

    let project, user;
    try {
      const [projRes, userVal] = await Promise.all([
        fetch(`controllers/projects/detail.php?id=${projId}`).then(r => r.json()),
        getUser(),
      ]);
      if (!projRes.ok) throw new Error(projRes.error || 'No encontrado');
      project = projRes.data;
      user    = userVal;
    } catch (err) {
      document.getElementById('pp-hero-desc').textContent = 'Error al cargar el proyecto: ' + err.message;
      return;
    }

    // Load settings from DB
    try {
      const sr = await fetch(`controllers/projects/settings.php?id=${projId}`);
      const sj = await sr.json();
      if (sj.ok && sj.data) settings = { ...settings, ...sj.data };
    } catch {}

    currentProject = project;

    document.getElementById('del-proj-name').textContent = project.nombre;
    document.getElementById('btn-upload-data').href = `upload-data.html?id=${projId}`;

    const isLeader = user && user.loggedIn && (
      user.id === project.lider_id || user.rol_codigo === 'ADMIN'
    );
    _isLeaderFlag = isLeader;

    fillPage(project, user);

    applyPalette(settings.palette);
    applyWidgetOrder(settings.widgetOrder);
    applyHidden(settings.hiddenWidgets);
    buildCharts(project);
    if (isLeader) wireChartRemoveButtons(project);

    // Load and render sections
    try {
      const sr = await fetch(`controllers/sections/list.php?id=${projId}`);
      const sj = await sr.json();
      renderSections(sj.ok ? sj.data : [], isLeader);
    } catch { renderSections([], isLeader); }
  }

  init();
