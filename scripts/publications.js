  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  function fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function initials(name) {
    return (name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }

  function renderPublications(list) {
    const el = document.getElementById('pub-list');
    if (!list.length) {
      el.innerHTML = '<div class="pub-empty">Este proyecto no tiene publicaciones aún.</div>';
      return;
    }
    el.innerHTML = list.map(p => {
      const autor = p.autor_nombre || 'Autor';
      return `
        <div class="pub-card">
          <div class="pub-card-head">
            <div class="pub-avatar">${initials(autor)}</div>
            <div>
              <div class="pub-author">${autor}</div>
              <div class="pub-date">${fmtDate(p.fecha_publicacion)}</div>
            </div>
          </div>
          <div class="pub-content">${p.contenido || ''}</div>
        </div>`;
    }).join('');
  }

  async function init() {
    if (!projId) {
      document.getElementById('pub-subtitle').textContent = 'Proyecto no especificado';
      return;
    }

    // Fetch project name
    try {
      const r = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const j = await r.json();
      if (j.ok) {
        const name = j.data.nombre;
        document.title     = `Publicaciones - ${name}`;
        document.getElementById('pub-subtitle').textContent = name;
      }
    } catch {}

    document.getElementById('pub-back-link').href = `project-page.html?id=${projId}`;

    // Fetch all publications
    try {
      const res  = await fetch(`controllers/publications/list.php?proyecto=${projId}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Error');
      const list = json.data;

      // Stats chip
      document.getElementById('pub-stat-row').innerHTML = `
        <div class="pub-stat-chip">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          <div>
            <div class="sc-num">${list.length}</div>
            <div class="sc-lbl">Publicación${list.length !== 1 ? 'es' : ''}</div>
          </div>
        </div>`;

      renderPublications(list);
    } catch (err) {
      document.getElementById('pub-list').innerHTML =
        `<div class="pub-empty">Error al cargar publicaciones: ${err.message}</div>`;
    }
  }

  init();
