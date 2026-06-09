  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  let allPubs   = [];
  let isManager = false;

  function fmtDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function initials(name) {
    return (name || '?').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }

  // ── Modal ────────────────────────────────────────────────────
  const mgrOverlay = document.getElementById('mgr-overlay');
  const modal    = document.getElementById('mgr-modal');
  const mgrTitle = document.getElementById('mgr-title');
  const mgrBody  = document.getElementById('mgr-body');

  function openModal(title, bodyHtml) {
    mgrTitle.textContent = title;
    mgrBody.innerHTML    = bodyHtml;
    mgrOverlay.style.display = 'block';
    modal.style.display      = 'block';
    setTimeout(() => modal.querySelector('textarea, input')?.focus(), 50);
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

  // ── Stat chip ───────────────────────────────────────────────
  function updateStatChip() {
    document.getElementById('pub-stat-row').innerHTML = `
      <div class="pub-stat-chip">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <div>
          <div class="sc-num">${allPubs.length}</div>
          <div class="sc-lbl">Publicación${allPubs.length !== 1 ? 'es' : ''}</div>
        </div>
      </div>`;
  }

  // ── Render ───────────────────────────────────────────────────
  function renderPublications(list) {
    const el = document.getElementById('pub-list');
    if (!list.length) {
      el.innerHTML = '<div class="pub-empty">Este proyecto no tiene publicaciones aún.</div>';
      return;
    }

    el.innerHTML = list.map(p => {
      const autor   = p.autor_nombre || 'Autor';
      const actions = isManager ? `
        <div class="pub-card-actions">
          <button class="pub-btn-edit" data-id="${p.id}" title="Editar">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="pub-btn-del" data-id="${p.id}" title="Eliminar">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>` : '';
      return `
        <div class="pub-card" data-pub-id="${p.id}">
          <div class="pub-card-head">
            <div class="pub-avatar">${initials(autor)}</div>
            <div>
              <div class="pub-author">${autor}</div>
              <div class="pub-date">${fmtDate(p.fecha_publicacion)}</div>
            </div>
            ${actions}
          </div>
          <div class="pub-content">${p.contenido || ''}</div>
        </div>`;
    }).join('');

    if (!isManager) return;

    el.querySelectorAll('.pub-btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id  = parseInt(btn.dataset.id);
        const pub = allPubs.find(p => p.id === id);
        if (!pub) return;
        openModal('Editar publicación', `
          <textarea id="mgr-txt" class="mgr-textarea" rows="7">${pub.contenido}</textarea>
          <p id="mgr-msg" class="mgr-msg" style="display:none"></p>
          <div class="mgr-btn-row">
            <button class="mgr-btn mgr-btn-cancel" id="mgr-cancel">Cancelar</button>
            <button class="mgr-btn mgr-btn-save"   id="mgr-save">Guardar</button>
          </div>`);
        document.getElementById('mgr-cancel').onclick = closeModal;
        document.getElementById('mgr-save').onclick   = async () => {
          const contenido = document.getElementById('mgr-txt').value.trim();
          if (!contenido) return showMsg('El contenido no puede estar vacío.', false);
          try {
            const res  = await fetch('controllers/publications/update.php', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id, contenido }),
            });
            const json = await res.json();
            if (!json.ok) return showMsg(json.error || 'Error al guardar.', false);
            pub.contenido = contenido;
            closeModal();
            renderPublications(allPubs);
          } catch { showMsg('Error de conexión.', false); }
        };
      });
    });

    el.querySelectorAll('.pub-btn-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        openModal('Eliminar publicación', `
          <p class="mgr-confirm-txt">¿Seguro que quieres eliminar esta publicación? Esta acción no se puede deshacer.</p>
          <div class="mgr-btn-row">
            <button class="mgr-btn mgr-btn-cancel" id="mgr-cancel">Cancelar</button>
            <button class="mgr-btn mgr-btn-del"    id="mgr-confirm">Eliminar</button>
          </div>`);
        document.getElementById('mgr-cancel').onclick  = closeModal;
        document.getElementById('mgr-confirm').onclick = async () => {
          try {
            const res  = await fetch('controllers/publications/delete.php', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id }),
            });
            const json = await res.json();
            if (!json.ok) return alert(json.error || 'Error al eliminar');
            allPubs = allPubs.filter(p => p.id !== id);
            closeModal();
            renderPublications(allPubs);
            updateStatChip();
          } catch { alert('Error de conexión'); }
        };
      });
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  async function init() {
    if (!projId) {
      document.getElementById('pub-subtitle').textContent = 'Proyecto no especificado';
      return;
    }

    let liderIdProject = 0;

    try {
      const r = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const j = await r.json();
      if (j.ok) {
        const name     = j.data.nombre;
        liderIdProject = parseInt(j.data.lider_id || 0);
        document.title = `Publicaciones - ${name}`;
        document.getElementById('pub-subtitle').textContent = name;
      }
    } catch {}

    document.getElementById('pub-back-link').href = `project-page.html?id=${projId}`;

    const user = await getUser();
    if (user && user.loggedIn) {
      isManager = user.rol_codigo === 'ADMIN' || parseInt(user.id) === liderIdProject;
    }

    if (isManager) {
      const fab = document.getElementById('mgr-fab');
      fab.style.display = 'flex';
      fab.addEventListener('click', () => {
        openModal('Nueva publicación', `
          <textarea id="mgr-txt" class="mgr-textarea" rows="7" placeholder="Escribe el contenido de la publicación..."></textarea>
          <p id="mgr-msg" class="mgr-msg" style="display:none"></p>
          <div class="mgr-btn-row">
            <button class="mgr-btn mgr-btn-cancel" id="mgr-cancel">Cancelar</button>
            <button class="mgr-btn mgr-btn-save"   id="mgr-save">Publicar</button>
          </div>`);
        document.getElementById('mgr-cancel').onclick = closeModal;
        document.getElementById('mgr-save').onclick   = async () => {
          const contenido = document.getElementById('mgr-txt').value.trim();
          if (!contenido) return showMsg('El contenido no puede estar vacío.', false);
          try {
            const res  = await fetch('controllers/publications/create.php', {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_proyecto: projId, contenido }),
            });
            const json = await res.json();
            if (!json.ok) return showMsg(json.error || 'Error.', false);
            allPubs.unshift(json.data);
            closeModal();
            renderPublications(allPubs);
            updateStatChip();
          } catch { showMsg('Error de conexión.', false); }
        };
      });
    }

    try {
      const res  = await fetch(`controllers/publications/list.php?proyecto=${projId}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'Error');
      allPubs = json.data;
      updateStatChip();
      renderPublications(allPubs);
    } catch (err) {
      document.getElementById('pub-list').innerHTML =
        `<div class="pub-empty">Error al cargar publicaciones: ${err.message}</div>`;
    }
  }

  init();
