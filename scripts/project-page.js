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
    progress:     'Progreso del proyecto',
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

    // ── Dashboard / Stats from KPIs ───────────────────────────────
    const kpis = project.kpis || [];
    if (!kpis.length) {
      document.getElementById('dash-stats').closest('.pp-dash-body').innerHTML = `
        <div class="pp-empty-state">
          <div class="pp-empty-icon"><svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
          <div class="pp-empty-title">Dashboard sin datos aún</div>
          <p class="pp-empty-sub">Los indicadores del proyecto aparecerán aquí una vez que se registren KPIs.</p>
        </div>`;
    } else {
      const statIconBg    = ['#EFF6FF','#F0FDF4','#FFF7ED','#F5F3FF'];
      const statIconColor = ['#3B82F6','#22C55E','#F97316','#7C3AED'];
      const statIcons = [
        `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
        `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
        `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
        `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
      ];
      const visibleKpis = kpis.slice(0, 4);
      document.getElementById('dash-stats').innerHTML = visibleKpis.map((k, i) => {
        const val = k.valor_actual !== null && k.valor_actual !== undefined
          ? parseFloat(k.valor_actual).toLocaleString('es-MX') + (k.unidad_simbolo ? ' ' + k.unidad_simbolo : '')
          : '—';
        const pct = k.valor_meta > 0 && k.valor_actual != null
          ? Math.round((k.valor_actual / k.valor_meta) * 100)
          : null;
        return `
          <div class="pp-stat-card">
            <div class="pp-stat-top">
              <div class="pp-stat-icon" style="background:${statIconBg[i]};color:${statIconColor[i]}">${statIcons[i]}</div>
              <div class="pp-stat-label">${k.nombre}</div>
            </div>
            <div class="pp-stat-value">${val}</div>
            <div class="pp-stat-change neu">
              ${pct !== null ? `Meta: ${parseFloat(k.valor_meta).toLocaleString('es-MX')} ${k.unidad_simbolo || ''} (${pct}%)` : ''}
            </div>
          </div>`;
      }).join('');
    }

    // ── Progress from KPIs ────────────────────────────────────────
    if (!kpis.length) {
      emptyState('prog-body',
        `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
        'Sin métricas de progreso',
        'Los KPIs registrados mostrarán el progreso hacia las metas del proyecto.'
      );
    } else {
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
            <div class="pp-prog-track">
              <div class="pp-prog-fill" style="width:${pct}%"></div>
            </div>
          </div>`;
      }).join('');
    }

    // ── Leader moderation link ────────────────────────────────────
    const me = user || null;
    const isLeader = me && me.loggedIn && (
      me.id === project.lider_id ||
      me.rol_codigo === 'ADMIN'
    );

    const testCount = (project.testimonios_resumen || []).reduce((s, t) => s + parseInt(t.total || 0), 0);
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
      document.getElementById('pub-body').innerHTML = pubs.map(p => `
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

  let chartB, chartA;

  function fmtMes(ym) {
    const [y, m] = ym.split('-');
    return new Date(y, m - 1).toLocaleDateString('es-MX', { month: 'short', year: '2-digit' });
  }

  function buildCharts(project) {
    const chartData = project.chart_data || {};
    const kpis      = project.kpis || [];

    function noData(canvasId) {
      const c = document.getElementById(canvasId);
      if (!c) return;
      c.style.display = 'none';
      if (!c.parentElement.querySelector('.pp-empty-sub')) {
        c.insertAdjacentHTML('afterend', '<p class="pp-empty-sub" style="text-align:center;padding:32px 0;font-size:.8rem">Sin datos históricos aún</p>');
      }
    }

    const accent = getAccentColor() || '#1A56E8';
    const baseOpts = {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.05)' }, ticks: { font: { size: 10 } } },
        x: { grid: { display: false },                              ticks: { font: { size: 10 } } }
      }
    };

    // Gráfica 1 (línea): primer KPI
    const kpi1  = kpis[0];
    const data1 = kpi1 ? (chartData[kpi1.id_kpi] || []) : [];
    if (data1.length >= 2) {
      if (chartB) chartB.destroy();
      chartB = new Chart(document.getElementById('chart-beneficiaries'), {
        type: 'line',
        data: {
          labels: data1.map(d => fmtMes(d.mes)),
          datasets: [{
            data: data1.map(d => d.valor),
            borderColor: accent, borderWidth: 2,
            backgroundColor: 'transparent',
            pointBackgroundColor: accent, pointRadius: 4,
            tension: 0.35,
          }]
        },
        options: baseOpts
      });
    } else { noData('chart-beneficiaries'); }

    // Gráfica 2 (barras): tercer KPI (o segundo si no hay tercero)
    const kpi2  = kpis[2] || kpis[1];
    const data2 = kpi2 ? (chartData[kpi2.id_kpi] || []) : [];
    if (data2.length >= 2) {
      if (chartA) chartA.destroy();
      chartA = new Chart(document.getElementById('chart-activities'), {
        type: 'bar',
        data: {
          labels: data2.map(d => fmtMes(d.mes)),
          datasets: [{
            data: data2.map(d => d.valor),
            backgroundColor: accent,
            borderRadius: 4,
            borderSkipped: false,
          }]
        },
        options: baseOpts
      });
    } else { noData('chart-activities'); }
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
  function getCurrentHidden() { return [...document.querySelectorAll('.pp-widget.hidden')].map(w => w.dataset.widgetId); }
  function getCurrentOrder()  { return [...document.querySelectorAll('.pp-widget')].map(w => w.dataset.widgetId); }

  /* ─── PANEL ─────────────────────────────────────────────────── */
  let settings    = { palette: 'default', widgetOrder: ['description','dashboard','progress','content','publications'], hiddenWidgets: [] };
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

    document.getElementById('del-proj-name').textContent = project.nombre;
    document.getElementById('btn-upload-data').href = `upload-data.html?id=${projId}`;

    fillPage(project, user);

    applyPalette(settings.palette);
    applyWidgetOrder(settings.widgetOrder);
    applyHidden(settings.hiddenWidgets);
    buildCharts(project);
  }

  init();
