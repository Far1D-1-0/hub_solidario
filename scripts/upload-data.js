  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  document.getElementById('u-back').href = `project-page.html?id=${projId}`;

  /* ── Load project title and existing data from DB ─────────── */
  async function initProject() {
    if (!projId) return;
    try {
      const r = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const j = await r.json();
      if (!j.ok) return;
      document.title = `Cargar Datos - ${j.data.nombre}`;
      document.getElementById('u-proj-name').textContent = j.data.nombre;

      const existing = j.data.datos_importados;
      if (existing && typeof existing === 'object' && Object.keys(existing).length > 0) {
        document.getElementById('json-input').value = JSON.stringify(existing, null, 2);
        renderPreview(existing);
      }
    } catch {}
  }

  initProject();

  /* ── tab switch ───────────────────────────── */
  let activeFmt = 'json';
  document.querySelectorAll('.u-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFmt = btn.dataset.fmt;
      document.querySelectorAll('.u-tab').forEach(b => b.classList.toggle('active', b.dataset.fmt === activeFmt));
      document.getElementById('panel-json').style.display = activeFmt === 'json' ? '' : 'none';
      document.getElementById('panel-csv').style.display  = activeFmt === 'csv'  ? '' : 'none';
      document.getElementById('panel-kpi').style.display  = activeFmt === 'kpi'  ? '' : 'none';
    });
  });

  /* ── schema tabs ─────────────────────────── */
  function showSchema(type) {
    document.getElementById('schema-json').style.display = type === 'json' ? '' : 'none';
    document.getElementById('schema-csv').style.display  = type === 'csv'  ? '' : 'none';
    document.getElementById('stab-json').classList.toggle('active', type === 'json');
    document.getElementById('stab-csv').classList.toggle('active', type === 'csv');
  }

  /* ── file picker ─────────────────────────── */
  const fileInput = document.getElementById('file-input');
  document.getElementById('u-file-btn').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    reader.onload = e => {
      if (ext === 'json') {
        activeFmt = 'json';
        document.querySelectorAll('.u-tab').forEach(b => b.classList.toggle('active', b.dataset.fmt === 'json'));
        document.getElementById('panel-json').style.display = '';
        document.getElementById('panel-csv').style.display  = 'none';
        document.getElementById('json-input').value = e.target.result;
      } else {
        activeFmt = 'csv';
        document.querySelectorAll('.u-tab').forEach(b => b.classList.toggle('active', b.dataset.fmt === 'csv'));
        document.getElementById('panel-json').style.display = 'none';
        document.getElementById('panel-csv').style.display  = '';
        document.getElementById('csv-input').value = e.target.result;
      }
    };
    reader.readAsText(file);
    fileInput.value = '';
  });

  /* ── toast ───────────────────────────────── */
  function showToast(msg) {
    const t = document.getElementById('u-toast');
    document.getElementById('u-toast-msg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  /* ── preview ─────────────────────────────── */
  function renderPreview(data) {
    const preview = document.getElementById('u-preview');
    preview.classList.add('show');
    const sg = document.getElementById('preview-stats');
    const sp = document.getElementById('preview-pubs');
    const stats = [];
    if (data.beneficiarios !== undefined) stats.push({ label: 'Beneficiarios', value: data.beneficiarios });
    if (data.voluntarios   !== undefined) stats.push({ label: 'Voluntarios',   value: data.voluntarios });
    if (data.actividades   !== undefined) stats.push({ label: 'Actividades',   value: data.actividades });
    if (data.metrica4_valor!== undefined) stats.push({ label: data.metrica4_label || 'Métrica 4', value: data.metrica4_valor });
    if (data.progreso) stats.push({ label: 'Barras de progreso', value: data.progreso.length + ' items' });

    sg.innerHTML = stats.map(s => `
      <div class="u-preview-stat">
        <div class="ps-label">${s.label}</div>
        <div class="ps-value">${s.value}</div>
      </div>`).join('') || '<p style="font-size:.8rem;color:#6B7280">Sin datos estadísticos</p>';

    const pubs = data.publicaciones || [];
    sp.innerHTML = pubs.length
      ? '<p style="font-size:.75rem;font-weight:700;color:#374151;margin-bottom:8px">Publicaciones importadas:</p>' +
        pubs.map(p => `<div class="u-preview-pub">${p.titulo}<span>${p.tipo}</span></div>`).join('')
      : '';
  }

  /* ── save helper ─────────────────────────── */
  async function saveToDb(datos_importados) {
    const res  = await fetch('controllers/projects/import-data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: projId, datos_importados }),
    });
    return res.json();
  }

  /* ── JSON import ─────────────────────────── */
  document.getElementById('btn-import-json').addEventListener('click', async () => {
    const raw   = document.getElementById('json-input').value.trim();
    const errEl = document.getElementById('json-error');
    const errTxt = document.getElementById('json-error-text');
    document.getElementById('json-input').classList.remove('error');
    errEl.classList.remove('show');

    if (!raw) {
      document.getElementById('json-input').classList.add('error');
      errTxt.textContent = 'Pega el contenido JSON antes de importar.';
      errEl.classList.add('show');
      return;
    }
    let data;
    try { data = JSON.parse(raw); } catch(e) {
      document.getElementById('json-input').classList.add('error');
      errTxt.textContent = 'JSON inválido: ' + e.message;
      errEl.classList.add('show');
      return;
    }
    if (typeof data !== 'object' || Array.isArray(data)) {
      document.getElementById('json-input').classList.add('error');
      errTxt.textContent = 'El JSON debe ser un objeto {}, no un array.';
      errEl.classList.add('show');
      return;
    }

    try {
      const json = await saveToDb(data);
      if (!json.ok) { showToast('Error al guardar: ' + (json.error || '')); return; }
      renderPreview(json.data);
      showToast('Datos JSON importados y guardados correctamente');
    } catch {
      showToast('Error de conexión al guardar');
    }
  });

  /* ── CSV import ──────────────────────────── */
  function parseCSV(text) {
    const lines = text.trim().split('\n').filter(l => l.trim());
    if (lines.length < 2) return null;
    const headers = lines[0].split(',').map(h => h.replace(/["']/g, '').trim().toLowerCase());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
      const vals = [];
      let cur = '', inQ = false;
      for (const ch of lines[i]) {
        if (ch === '"') { inQ = !inQ; continue; }
        if (ch === ',' && !inQ) { vals.push(cur.trim()); cur = ''; continue; }
        cur += ch;
      }
      vals.push(cur.trim());
      const row = {};
      headers.forEach((h, idx) => { row[h] = vals[idx] || ''; });
      rows.push(row);
    }
    return rows;
  }

  document.getElementById('btn-import-csv').addEventListener('click', async () => {
    const raw   = document.getElementById('csv-input').value.trim();
    const errEl = document.getElementById('csv-error');
    const errTxt = document.getElementById('csv-error-text');
    document.getElementById('csv-input').classList.remove('error');
    errEl.classList.remove('show');

    if (!raw) {
      document.getElementById('csv-input').classList.add('error');
      errTxt.textContent = 'Pega el contenido CSV antes de importar.';
      errEl.classList.add('show');
      return;
    }

    const rows = parseCSV(raw);
    if (!rows || !rows.length) {
      document.getElementById('csv-input').classList.add('error');
      errTxt.textContent = 'CSV inválido. Verifica que la primera fila tenga los encabezados: titulo, fecha, tipo';
      errEl.classList.add('show');
      return;
    }

    const pubs = rows.map(r => ({
      titulo: r.titulo || r.title || '',
      fecha:  r.fecha  || r.date  || '',
      tipo:   r.tipo   || r.type  || 'Artículo'
    })).filter(p => p.titulo);

    if (!pubs.length) {
      document.getElementById('csv-input').classList.add('error');
      errTxt.textContent = 'No se encontraron publicaciones válidas. Verifica que la columna "titulo" tenga datos.';
      errEl.classList.add('show');
      return;
    }

    try {
      const json = await saveToDb({ publicaciones: pubs });
      if (!json.ok) { showToast('Error al guardar: ' + (json.error || '')); return; }
      renderPreview(json.data);
      showToast(`${pubs.length} publicaciones importadas correctamente`);
    } catch {
      showToast('Error de conexión al guardar');
    }
  });

  /* ── KPI file upload ────────────────────── */
  (function initKpiUpload() {
    const zone      = document.getElementById('kpi-file-zone');
    const fileInput = document.getElementById('kpi-file-input');
    const fileLabel = document.getElementById('kpi-file-name');
    const errEl     = document.getElementById('kpi-error');
    const errTxt    = document.getElementById('kpi-error-text');
    const resultEl  = document.getElementById('kpi-result');

    let selectedFile  = null;
    let selectedTipo  = 'histograma';

    // Tipo de gráfica selector
    document.querySelectorAll('.u-tipo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.u-tipo-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedTipo = btn.dataset.tipo;
        document.querySelectorAll('.u-tipo-hint').forEach(h => h.style.display = 'none');
        const hint = document.getElementById('tipo-hint-' + selectedTipo);
        if (hint) hint.style.display = '';
      });
    });

    zone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const f = fileInput.files[0];
      if (!f) return;
      selectedFile = f;
      fileLabel.textContent = f.name + ' (' + (f.size / 1024).toFixed(1) + ' KB)';
      zone.style.borderColor = '#16A34A';
      errEl.classList.remove('show');
      resultEl.style.display = 'none';
      fileInput.value = '';
    });

    document.getElementById('btn-upload-kpi').addEventListener('click', async () => {
      errEl.classList.remove('show');
      resultEl.style.display = 'none';
      if (!selectedFile) {
        errTxt.textContent = 'Selecciona un archivo primero.';
        errEl.classList.add('show');
        return;
      }
      const btn = document.getElementById('btn-upload-kpi');
      btn.disabled = true;
      btn.textContent = 'Subiendo…';

      try {
        const fd = new FormData();
        fd.append('file', selectedFile);
        fd.append('id_proyecto', String(projId));
        fd.append('tipo_grafica', selectedTipo);

        const res  = await fetch('controllers/kpis/import-file.php', { method: 'POST', body: fd });
        const json = await res.json();

        if (!json.ok) {
          errTxt.textContent = json.error || 'Error al importar.';
          errEl.classList.add('show');
          return;
        }
        const d = json.data;
        const errHtml = d.errores && d.errores.length
          ? `<ul style="margin:6px 0 0;padding-left:18px;color:#EF4444;font-size:.77rem">${d.errores.map(e => `<li>${e}</li>`).join('')}</ul>`
          : '';
        resultEl.innerHTML = `
          <strong style="color:#16A34A">✓ Importación completada</strong><br>
          Archivo guardado en: <code style="font-size:.75rem">${d.archivo}</code><br>
          <strong>${d.importados}</strong> registros importados · <strong>${d.omitidos}</strong> omitidos
          ${errHtml}`;
        resultEl.style.display = 'block';
        zone.style.borderColor = '';
        selectedFile = null;
        fileLabel.textContent = 'Haz clic para seleccionar un archivo .csv o .json';
        showToast(`${d.importados} registros de KPI importados al servidor`);
      } catch { errTxt.textContent = 'Error de conexión.'; errEl.classList.add('show'); }
      finally { btn.disabled = false; btn.innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Subir e importar al servidor'; }
    });
  })();

  /* ── template downloads ──────────────────── */
  function download(filename, content, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  document.getElementById('btn-dl-json').addEventListener('click', () => {
    const template = {
      beneficiarios: 0,
      beneficiarios_cambio: "",
      voluntarios: 0,
      voluntarios_cambio: "",
      actividades: 0,
      actividades_periodo: "",
      metrica4_valor: "",
      metrica4_label: "",
      metrica4_periodo: "",
      progreso: [
        { label: "", pct: 0 },
        { label: "", pct: 0 },
        { label: "", pct: 0 },
        { label: "", pct: 0 }
      ],
      publicaciones: [
        { titulo: "", fecha: "", tipo: "" }
      ],
      grafica_meses: ["", "", "", "", "", ""],
      grafica_beneficiarios: [0, 0, 0, 0, 0, 0],
      grafica_actividades: [0, 0, 0, 0, 0, 0]
    };
    download(`plantilla_proyecto_${projId}.json`, JSON.stringify(template, null, 2), 'application/json');
  });

  document.getElementById('btn-dl-csv').addEventListener('click', () => {
    const content = `titulo,fecha,tipo\n"","",""`;
    download(`plantilla_publicaciones_${projId}.csv`, content, 'text/csv');
  });

  document.getElementById('btn-dl-kpi-csv').addEventListener('click', () => {
    const tipo = document.querySelector('.u-tipo-btn.active')?.dataset.tipo || 'histograma';
    const examples = {
      histograma: [
        'kpi_nombre,fecha,valor',
        '"Nombre exacto del KPI",2024-01-01,0',
        '"Nombre exacto del KPI",2024-02-01,0',
        '"Nombre exacto del KPI",2024-03-01,0',
      ],
      puntos: [
        'kpi_nombre,fecha,valor',
        '"Nombre exacto del KPI",2024-01-07,0',
        '"Nombre exacto del KPI",2024-01-14,0',
        '"Nombre exacto del KPI",2024-01-21,0',
        '"Nombre exacto del KPI",2024-01-28,0',
      ],
      pie: [
        'kpi_nombre,fecha,valor',
        '"Nombre exacto del KPI",2024-01-01,0',
        '"Nombre exacto del KPI",2024-04-01,0',
        '"Nombre exacto del KPI",2024-07-01,0',
        '"Nombre exacto del KPI",2024-10-01,0',
      ],
    };
    const content = (examples[tipo] || examples.histograma).join('\n');
    download(`plantilla_kpis_${tipo}_${projId}.csv`, content, 'text/csv');
  });
