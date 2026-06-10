/* ══════════════════════════════════════════════════════
   PAGE VIEW  —  block renderer, editor, DnD, nav tree
   ══════════════════════════════════════════════════════ */

const params  = new URLSearchParams(location.search);
const pageId  = parseInt(params.get('id') || '0', 10);

let _page     = null;   // full page data from API
let _isLeader = false;  // resolved after loading
let _blocks   = [];     // ordered blocks
let _projId   = 0;

/* ── Block type definitions ─────────────────────────── */
const BLOCK_TYPES = [
  {
    renderer_key: 'titulo_v1',
    label: 'Título',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h6"/></svg>`,
    defaultConfig: { nivel: 1, alineacion: 'left' },
    defaultTexto: 'Título de sección',
  },
  {
    renderer_key: 'subtitulo_v1',
    label: 'Subtítulo',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h14M4 18h8"/></svg>`,
    defaultConfig: { nivel: 2, alineacion: 'left' },
    defaultTexto: 'Subtítulo',
  },
  {
    renderer_key: 'texto_v1',
    label: 'Texto',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M4 6h16M4 10h16M4 14h12M4 18h8"/></svg>`,
    defaultConfig: { alineacion: 'left' },
    defaultTexto: 'Escribe aquí tu contenido…',
  },
  {
    renderer_key: 'imagen_v1',
    label: 'Imagen',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21"/></svg>`,
    defaultConfig: { src: null, alt: '', pie_foto: '', id_archivo: null, ancho: 'full' },
    defaultTexto: null,
  },
  {
    renderer_key: 'video_v1',
    label: 'Video',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>`,
    defaultConfig: { src: '', tipo: 'url', id_archivo: null, titulo: '' },
    defaultTexto: null,
  },
  {
    renderer_key: 'galeria_v1',
    label: 'Carrusel',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M22 9H2"/></svg>`,
    defaultConfig: { imagenes: [], autoplay: false, mostrar_flechas: true },
    defaultTexto: null,
  },
  {
    renderer_key: 'texto_imagen_v1',
    label: 'Texto + Imagen',
    icon: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="18" rx="1"/><rect x="13" y="3" width="8" height="18" rx="1"/></svg>`,
    defaultConfig: { layout: 'derecha', src: null, alt: '', id_archivo: null },
    defaultTexto: 'Escribe el texto para este bloque…',
  },
];

function blockTypeDef(rk) {
  return BLOCK_TYPES.find(t => t.renderer_key === rk) || null;
}

/* ── Block renderers ─────────────────────────────────── */
function renderBlockHtml(block) {
  const cfg = block.configuracion || {};
  const txt = block.contenido_texto || '';

  switch (block.renderer_key) {
    case 'titulo_v1': {
      const tag   = `h${cfg.nivel || 1}`;
      const align = cfg.alineacion || 'left';
      return `<div class="pv-bloque-titulo" style="text-align:${align}"><${tag}>${escHtml(txt)}</${tag}></div>`;
    }
    case 'subtitulo_v1': {
      const tag   = `h${cfg.nivel || 2}`;
      const align = cfg.alineacion || 'left';
      return `<div class="pv-bloque-subtitulo" style="text-align:${align}"><${tag}>${escHtml(txt)}</${tag}></div>`;
    }
    case 'texto_v1': {
      const align = cfg.alineacion || 'left';
      const paragraphs = txt.split('\n').filter(Boolean)
        .map(p => `<p>${escHtml(p)}</p>`).join('');
      return `<div class="pv-bloque-texto" style="text-align:${align}">${paragraphs || `<p>${escHtml(txt)}</p>`}</div>`;
    }
    case 'imagen_v1': {
      const src     = cfg.src || '';
      const pie     = cfg.pie_foto || '';
      const ancho   = cfg.ancho || 'full';
      if (!src) {
        return `<div class="pv-bloque-imagen ancho-${ancho}"><figure>
          <div class="pv-img-placeholder" data-block="${block.id_bloque}">
            <div class="pv-img-placeholder-inner">
              <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>${_isLeader ? 'Haz clic para subir imagen' : 'Sin imagen'}</span>
            </div>
          </div>
          ${pie ? `<figcaption>${escHtml(pie)}</figcaption>` : ''}
        </figure></div>`;
      }
      return `<div class="pv-bloque-imagen ancho-${ancho}"><figure>
        <img src="${escHtml(src)}" alt="${escHtml(cfg.alt || '')}" loading="lazy"/>
        ${pie ? `<figcaption>${escHtml(pie)}</figcaption>` : ''}
      </figure></div>`;
    }
    case 'video_v1': {
      const src   = cfg.src || '';
      const tipo  = cfg.tipo || 'url';
      const title = cfg.titulo || '';
      if (!src) {
        return `<div class="pv-bloque-video">
          <div class="pv-video-placeholder" data-block="${block.id_bloque}">
            <div class="pv-video-placeholder-inner">
              <svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
              <span>${_isLeader ? 'Haz clic para agregar video' : 'Sin video'}</span>
            </div>
          </div>
        </div>`;
      }
      if (tipo === 'url') {
        const embedSrc = youtubeEmbed(src) || vimeoEmbed(src);
        if (embedSrc) {
          return `<div class="pv-bloque-video">
            ${title ? `<p style="font-weight:600;margin:0 0 8px;font-size:.88rem">${escHtml(title)}</p>` : ''}
            <iframe src="${embedSrc}" allowfullscreen loading="lazy"></iframe>
          </div>`;
        }
        return `<div class="pv-bloque-video">
          <video controls src="${escHtml(src)}"></video>
        </div>`;
      }
      return `<div class="pv-bloque-video">
        ${title ? `<p style="font-weight:600;margin:0 0 8px;font-size:.88rem">${escHtml(title)}</p>` : ''}
        <video controls src="${escHtml(src)}"></video>
      </div>`;
    }
    case 'galeria_v1': {
      const imgs = cfg.imagenes || [];
      if (!imgs.length) {
        return `<div class="pv-bloque-galeria"><div class="pv-galeria-placeholder">
          <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M22 9H2"/></svg>
          <p>${_isLeader ? 'Edita el bloque para agregar imágenes al carrusel' : 'Carrusel vacío'}</p>
        </div></div>`;
      }
      const slides = imgs.map((img, i) =>
        `<div class="pv-carousel-slide">
          <img src="${escHtml(img.src || '')}" alt="${escHtml(img.alt || '')}" loading="${i ? 'lazy' : 'eager'}"/>
        </div>`
      ).join('');
      const dots = imgs.map((_, i) =>
        `<button class="pv-carousel-dot ${i === 0 ? 'active' : ''}" data-idx="${i}"></button>`
      ).join('');
      return `<div class="pv-bloque-galeria" data-block="${block.id_bloque}">
        <div class="pv-carousel-track" id="ct-${block.id_bloque}">${slides}</div>
        ${cfg.mostrar_flechas !== false ? `
          <button class="pv-carousel-btn prev" data-target="${block.id_bloque}">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="pv-carousel-btn next" data-target="${block.id_bloque}">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
          </button>` : ''}
        <div class="pv-carousel-dots" id="cd-${block.id_bloque}">${dots}</div>
      </div>`;
    }
    case 'texto_imagen_v1': {
      const cfg2    = cfg;
      const imgSrc  = cfg2.src || '';
      const layout  = cfg2.layout === 'izquierda' ? 'izquierda' : 'derecha';
      const paragraphs = txt.split('\n').filter(Boolean)
        .map(p => `<p>${escHtml(p)}</p>`).join('');
      const imgPart = imgSrc
        ? `<img src="${escHtml(imgSrc)}" alt="${escHtml(cfg2.alt || '')}" loading="lazy"/>`
        : `<div class="pv-img-placeholder" data-block="${block.id_bloque}" style="padding-top:60%">
            <div class="pv-img-placeholder-inner">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><polyline points="21 15 16 10 5 21"/></svg>
              <span>${_isLeader ? 'Clic para agregar imagen' : 'Sin imagen'}</span>
            </div>
          </div>`;
      return `<div class="pv-bloque-texto-imagen layout-${layout}">
        <div class="pv-ti-text">${paragraphs || `<p>${escHtml(txt)}</p>`}</div>
        <div class="pv-ti-image">${imgPart}</div>
      </div>`;
    }
    default:
      return `<div class="pv-bloque-texto"><p><em>Bloque desconocido: ${escHtml(block.renderer_key)}</em></p></div>`;
  }
}

/* ── Block wrapper (with toolbar for leaders) ─────── */
function blockWrapHtml(block) {
  const content = renderBlockHtml(block);
  const def     = blockTypeDef(block.renderer_key);
  if (!_isLeader) {
    return `<div class="pv-block" data-id="${block.id_bloque}" data-rk="${block.renderer_key}">${content}</div>`;
  }
  return `<div class="pv-block" data-id="${block.id_bloque}" data-rk="${block.renderer_key}" draggable="true">
    <div class="pv-block-toolbar">
      <span class="pv-block-toolbar-btn drag-handle" title="Mover">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.5" fill="currentColor"/><circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="9" cy="19" r="1.5" fill="currentColor"/><circle cx="15" cy="5" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="19" r="1.5" fill="currentColor"/></svg>
      </span>
      <button class="pv-block-toolbar-btn" draggable="false" title="Editar bloque" data-act="edit" data-id="${block.id_bloque}">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="pv-block-toolbar-btn danger" draggable="false" title="Eliminar bloque" data-act="delete" data-id="${block.id_bloque}">
        <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
      </button>
    </div>
    ${content}
  </div>`;
}

/* ── Render all blocks ─────────────────────────────── */
function renderBlocks() {
  const zone = document.getElementById('pv-blocks-zone');
  if (!zone) return;

  if (!_blocks.length) {
    zone.innerHTML = '';
    const hint = document.getElementById('pv-empty-hint');
    if (hint) hint.style.display = _isLeader ? 'block' : 'none';
    updatePanelBlockList();
    return;
  }

  document.getElementById('pv-empty-hint').style.display = 'none';
  zone.innerHTML = _blocks.map(blockWrapHtml).join('');

  // Wire toolbar buttons
  zone.querySelectorAll('[data-act="edit"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      openBlockEdit(parseInt(btn.dataset.id));
    });
  });
  zone.querySelectorAll('[data-act="delete"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      deleteBlock(parseInt(btn.dataset.id));
    });
  });

  // Placeholder clicks for image upload
  zone.querySelectorAll('.pv-img-placeholder').forEach(ph => {
    ph.addEventListener('click', () => {
      const id = parseInt(ph.dataset.block);
      if (id && _isLeader) openBlockEdit(id);
    });
  });
  zone.querySelectorAll('.pv-video-placeholder').forEach(ph => {
    ph.addEventListener('click', () => {
      const id = parseInt(ph.dataset.block);
      if (id && _isLeader) openBlockEdit(id);
    });
  });

  // Carousels
  zone.querySelectorAll('.pv-bloque-galeria').forEach(initCarousel);

  // Block drag-to-reorder
  if (_isLeader) initBlockDnD();

  updatePanelBlockList();
}

/* ── Carousel init ─────────────────────────────────── */
function initCarousel(el) {
  const bid   = el.dataset.block;
  const track = document.getElementById(`ct-${bid}`);
  const dotsEl= document.getElementById(`cd-${bid}`);
  if (!track) return;

  const slides = track.children;
  let cur = 0;

  function go(idx) {
    cur = (idx + slides.length) % slides.length;
    track.style.transform = `translateX(-${cur * 100}%)`;
    if (dotsEl) {
      dotsEl.querySelectorAll('.pv-carousel-dot').forEach((d, i) =>
        d.classList.toggle('active', i === cur));
    }
  }

  el.querySelectorAll('.pv-carousel-btn.prev').forEach(b => b.addEventListener('click', () => go(cur - 1)));
  el.querySelectorAll('.pv-carousel-btn.next').forEach(b => b.addEventListener('click', () => go(cur + 1)));
  if (dotsEl) dotsEl.querySelectorAll('.pv-carousel-dot').forEach(d =>
    d.addEventListener('click', () => go(parseInt(d.dataset.idx))));
}

/* ── Block drag-to-reorder ─────────────────────────── */
let dndSrc = null;

function initBlockDnD() {
  const zone = document.getElementById('pv-blocks-zone');
  if (!zone) return;

  zone.querySelectorAll('.pv-block[draggable]').forEach(el => {
    el.addEventListener('dragstart', e => {
      // Prevent drag from firing when user clicks an action button
      if (e.target.closest('[data-act]')) { e.preventDefault(); return; }
      dndSrc = el;
      el.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', el.dataset.id);
    });
    el.addEventListener('dragend', () => {
      el.classList.remove('dragging', 'drag-over');
      dndSrc = null;
      zone.querySelectorAll('.pv-block').forEach(b => b.classList.remove('drag-over'));
    });
    el.addEventListener('dragover', e => {
      if (!dndSrc || dndSrc === el) return;
      e.preventDefault();
      zone.querySelectorAll('.pv-block').forEach(b => b.classList.remove('drag-over'));
      el.classList.add('drag-over');
    });
    el.addEventListener('dragleave', e => {
      if (!el.contains(e.relatedTarget)) el.classList.remove('drag-over');
    });
    el.addEventListener('drop', async e => {
      e.preventDefault();
      if (!dndSrc || dndSrc === el) return;
      const items  = [...zone.querySelectorAll('.pv-block')];
      const srcIdx = items.indexOf(dndSrc);
      const tgtIdx = items.indexOf(el);
      if (srcIdx < tgtIdx) el.after(dndSrc); else el.before(dndSrc);
      el.classList.remove('drag-over');

      const newOrder = [...zone.querySelectorAll('.pv-block')].map(b => parseInt(b.dataset.id));
      try {
        await fetch('controllers/blocks/reorder.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_pagina: pageId, order: newOrder }),
        });
        const idx = {};
        _blocks.forEach(b => idx[b.id_bloque] = b);
        _blocks = newOrder.map(id => idx[id]).filter(Boolean);
        _blocks.forEach((b, i) => b.orden = i);
        updatePanelBlockList();
      } catch {}
    });
  });
}

/* ── Panel block list ──────────────────────────────── */
function updatePanelBlockList() {
  const listEl = document.getElementById('pv-blocks-list');
  if (!listEl) return;
  if (!_blocks.length) {
    listEl.innerHTML = '<div class="pv-blocks-list-empty">Esta página aún no tiene bloques.</div>';
    return;
  }
  listEl.innerHTML = _blocks.map(b => {
    const def   = blockTypeDef(b.renderer_key);
    const label = def ? def.label : b.renderer_key;
    const preview = b.contenido_texto
      ? (b.contenido_texto.substring(0, 28) + (b.contenido_texto.length > 28 ? '…' : ''))
      : label;
    return `<div class="pv-list-item" draggable="true" data-id="${b.id_bloque}">
      <span class="pv-list-drag">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="6" r="1.5" fill="#CBD5E1"/><circle cx="9" cy="12" r="1.5" fill="#CBD5E1"/><circle cx="9" cy="18" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="6" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="12" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="18" r="1.5" fill="#CBD5E1"/></svg>
      </span>
      <span class="pv-list-label" title="${escHtml(preview)}">${escHtml(preview)}</span>
      <button class="pv-list-edit" data-act="edit" data-id="${b.id_bloque}" title="Editar">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
      </button>
      <button class="pv-list-del" data-act="delete" data-id="${b.id_bloque}" title="Eliminar">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
      </button>
    </div>`;
  }).join('');

  listEl.querySelectorAll('[data-act="edit"]').forEach(btn =>
    btn.addEventListener('click', () => openBlockEdit(parseInt(btn.dataset.id))));
  listEl.querySelectorAll('[data-act="delete"]').forEach(btn =>
    btn.addEventListener('click', () => deleteBlock(parseInt(btn.dataset.id))));
}

/* ── Delete block ──────────────────────────────────── */
async function deleteBlock(id) {
  if (!confirm('¿Eliminar este bloque?')) return;
  try {
    const res = await fetch('controllers/blocks/delete.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_bloque: id }),
    });
    const json = await res.json();
    if (!json.ok) { alert(json.error || 'Error al eliminar'); return; }
    _blocks = _blocks.filter(b => b.id_bloque !== id);
    renderBlocks();
  } catch { alert('Error de conexión'); }
}

/* ── Add block from palette ────────────────────────── */
async function addBlock(rendererKey) {
  const def = blockTypeDef(rendererKey);
  if (!def) return;
  try {
    const res = await fetch('controllers/blocks/create.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_pagina:      pageId,
        renderer_key:   rendererKey,
        contenido_texto: def.defaultTexto || null,
        configuracion:  def.defaultConfig,
      }),
    });
    const json = await res.json();
    if (!json.ok) { alert(json.error || 'Error al crear bloque'); return; }
    const newBlock = {
      id_bloque:      json.data.id_bloque,
      orden:          json.data.orden,
      renderer_key:   rendererKey,
      configuracion:  def.defaultConfig,
      contenido_texto: def.defaultTexto || null,
      id_plantilla_bloque: json.data.id_plantilla_bloque,
    };
    _blocks.push(newBlock);
    renderBlocks();
    // Auto-open edit for new block
    openBlockEdit(newBlock.id_bloque);
  } catch { alert('Error de conexión'); }
}

/* ── Wire edit form interactive elements ───────────── */
function wireEditFormHandlers() {
  ['nivel', 'align', 'ancho', 'layout'].forEach(k => {
    document.querySelectorAll(`[data-${k}]`).forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll(`[data-${k}]`).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
  document.querySelectorAll('[data-vtipo]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-vtipo]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.vtipo;
      const uF = document.getElementById('ef-url-field');
      const fF = document.getElementById('ef-file-field');
      if (uF) uF.style.display = t === 'archivo' ? 'none' : '';
      if (fF) fF.style.display = t === 'archivo' ? '' : 'none';
    });
  });
  const itemsEl = document.getElementById('pv-gallery-items');
  if (itemsEl) {
    itemsEl.querySelectorAll('.pv-gallery-item-del').forEach(b =>
      b.addEventListener('click', () => removeGalleryItem(b.dataset.idx)));
  }
}

/* ── Block edit modal ──────────────────────────────── */
let _editingId = null;
let _editFileInput = null;

function openBlockEdit(id) {
  const block = _blocks.find(b => b.id_bloque === id);
  if (!block) return;
  _editingId = id;

  const overlay = document.getElementById('block-edit-overlay');
  const bodyEl  = document.getElementById('block-edit-body');
  const titleEl = document.getElementById('block-edit-title');

  const def     = blockTypeDef(block.renderer_key);
  titleEl.textContent = def ? `Editar: ${def.label}` : 'Editar bloque';

  bodyEl.innerHTML = buildEditForm(block);
  wireEditFormHandlers();

  // Wire file upload if present
  const fi = document.getElementById('pv-edit-file-input');
  _editFileInput = fi || null;
  if (fi) {
    fi.addEventListener('change', handleEditFileChange);
  }
  const uploadBtn = document.getElementById('pv-edit-upload-btn');
  if (uploadBtn && fi) {
    uploadBtn.addEventListener('click', () => fi.click());
  }

  // Gallery: add image button
  const addGallImg = document.getElementById('pv-gallery-add-btn');
  if (addGallImg) {
    const galFi = document.getElementById('pv-gallery-file-input');
    addGallImg.addEventListener('click', () => galFi && galFi.click());
    if (galFi) galFi.addEventListener('change', handleGalleryFileAdd);
  }

  overlay.style.display = 'flex';
}

function buildEditForm(block) {
  const cfg = block.configuracion || {};
  const txt = block.contenido_texto || '';

  switch (block.renderer_key) {
    case 'titulo_v1':
    case 'subtitulo_v1':
      return `
        <div class="pv-field">
          <label class="pv-label">Texto</label>
          <input id="ef-texto" class="pv-input" type="text" value="${escAttr(txt)}"/>
        </div>
        <div class="pv-field">
          <label class="pv-label">Nivel</label>
          <div class="pv-radio-group" id="ef-nivel-group">
            ${[1,2,3].map(n => `<button class="pv-radio-btn ${cfg.nivel === n ? 'active' : ''}" data-nivel="${n}">H${n}</button>`).join('')}
          </div>
        </div>
        <div class="pv-field">
          <label class="pv-label">Alineación</label>
          <div class="pv-radio-group" id="ef-align-group">
            ${['left','center','right'].map(a => `<button class="pv-radio-btn ${(cfg.alineacion||'left') === a ? 'active' : ''}" data-align="${a}">${{left:'Izq.',center:'Centro',right:'Der.'}[a]}</button>`).join('')}
          </div>
        </div>
        ${radioGroupJs()}`;

    case 'texto_v1':
      return `
        <div class="pv-field">
          <label class="pv-label">Contenido</label>
          <textarea id="ef-texto" class="pv-textarea" rows="5">${escHtml(txt)}</textarea>
        </div>
        <div class="pv-field">
          <label class="pv-label">Alineación</label>
          <div class="pv-radio-group" id="ef-align-group">
            ${['left','center','right','justify'].map(a => `<button class="pv-radio-btn ${(cfg.alineacion||'left') === a ? 'active' : ''}" data-align="${a}">${{left:'Izq.',center:'Centro',right:'Der.',justify:'Justif.'}[a]}</button>`).join('')}
          </div>
        </div>
        ${radioGroupJs()}`;

    case 'imagen_v1':
      return `
        <div class="pv-field">
          <label class="pv-label">Imagen</label>
          <button type="button" class="pv-upload-btn" id="pv-edit-upload-btn">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Subir imagen desde dispositivo
          </button>
          <input type="file" id="pv-edit-file-input" accept="image/*" style="display:none" data-tipo="IMAGEN"/>
          <div class="pv-img-preview-wrap ${cfg.src ? 'has-img' : ''}" id="pv-img-preview-wrap">
            ${cfg.src ? `<img src="${escHtml(cfg.src)}" alt=""/>` : ''}
          </div>
          <p style="font-size:.72rem;color:#94A3B8;margin:6px 0 0">O pega una URL:</p>
          <input id="ef-img-url" class="pv-input" type="url" value="${escAttr(cfg.src || '')}" placeholder="https://…" style="margin-top:6px"/>
        </div>
        <div class="pv-field">
          <label class="pv-label">Texto alternativo (alt)</label>
          <input id="ef-img-alt" class="pv-input" type="text" value="${escAttr(cfg.alt || '')}"/>
        </div>
        <div class="pv-field">
          <label class="pv-label">Pie de foto <span style="font-weight:400;opacity:.6">(opcional)</span></label>
          <input id="ef-img-pie" class="pv-input" type="text" value="${escAttr(cfg.pie_foto || '')}"/>
        </div>
        <div class="pv-field">
          <label class="pv-label">Ancho</label>
          <div class="pv-radio-group" id="ef-ancho-group">
            ${['full','lg','md','sm'].map(w => `<button class="pv-radio-btn ${(cfg.ancho||'full') === w ? 'active' : ''}" data-ancho="${w}">${{full:'Completo',lg:'Grande',md:'Mediano',sm:'Pequeño'}[w]}</button>`).join('')}
          </div>
        </div>
        ${radioGroupJs()}`;

    case 'video_v1':
      return `
        <div class="pv-field">
          <label class="pv-label">Tipo de video</label>
          <div class="pv-radio-group" id="ef-vtipo-group">
            <button class="pv-radio-btn ${(cfg.tipo||'url')==='url' ? 'active' : ''}" data-vtipo="url">URL (YouTube/Vimeo)</button>
            <button class="pv-radio-btn ${cfg.tipo==='archivo' ? 'active' : ''}" data-vtipo="archivo">Archivo subido</button>
          </div>
        </div>
        <div class="pv-field" id="ef-url-field" style="${cfg.tipo === 'archivo' ? 'display:none' : ''}">
          <label class="pv-label">URL del video</label>
          <input id="ef-video-url" class="pv-input" type="url" value="${escAttr(cfg.src || '')}" placeholder="https://youtube.com/watch?v=…"/>
        </div>
        <div class="pv-field" id="ef-file-field" style="${cfg.tipo !== 'archivo' ? 'display:none' : ''}">
          <label class="pv-label">Archivo de video</label>
          <button type="button" class="pv-upload-btn" id="pv-edit-upload-btn">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Subir video
          </button>
          <input type="file" id="pv-edit-file-input" accept="video/*" style="display:none" data-tipo="VIDEO"/>
          <p id="ef-video-file-name" style="font-size:.75rem;color:#64748B;margin:6px 0 0">${cfg.src ? cfg.src.split('/').pop() : 'Sin archivo'}</p>
        </div>
        <div class="pv-field">
          <label class="pv-label">Título <span style="font-weight:400;opacity:.6">(opcional)</span></label>
          <input id="ef-video-titulo" class="pv-input" type="text" value="${escAttr(cfg.titulo || '')}"/>
        </div>
        ${radioGroupJs()}`;  // vtipo toggle wired in wireEditFormHandlers()

    case 'galeria_v1': {
      const imgs = cfg.imagenes || [];
      const itemsHtml = imgs.map((img, i) => `
        <div class="pv-gallery-item" data-idx="${i}">
          <img class="pv-gallery-thumb" src="${escHtml(img.src||'')}" alt=""/>
          <span class="pv-gallery-item-name">${escHtml(img.alt || img.src?.split('/').pop() || `Imagen ${i+1}`)}</span>
          <button class="pv-gallery-item-del" data-idx="${i}" title="Eliminar">
            <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>`).join('');
      return `
        <div class="pv-field">
          <label class="pv-label">Imágenes del carrusel</label>
          <div class="pv-gallery-items" id="pv-gallery-items">${itemsHtml}</div>
          <button type="button" class="pv-upload-btn" id="pv-gallery-add-btn" style="margin-top:8px">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
            Añadir imagen
          </button>
          <input type="file" id="pv-gallery-file-input" accept="image/*" style="display:none" multiple/>
        </div>`;
    }

    case 'texto_imagen_v1':
      return `
        <div class="pv-field">
          <label class="pv-label">Texto</label>
          <textarea id="ef-texto" class="pv-textarea" rows="5">${escHtml(txt)}</textarea>
        </div>
        <div class="pv-field">
          <label class="pv-label">Imagen</label>
          <button type="button" class="pv-upload-btn" id="pv-edit-upload-btn">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Subir imagen
          </button>
          <input type="file" id="pv-edit-file-input" accept="image/*" style="display:none" data-tipo="IMAGEN"/>
          <div class="pv-img-preview-wrap ${cfg.src ? 'has-img' : ''}" id="pv-img-preview-wrap">
            ${cfg.src ? `<img src="${escHtml(cfg.src)}" alt=""/>` : ''}
          </div>
          <input id="ef-img-url" class="pv-input" type="url" value="${escAttr(cfg.src || '')}" placeholder="https://… o deja en blanco" style="margin-top:6px"/>
        </div>
        <div class="pv-field">
          <label class="pv-label">Alt de imagen</label>
          <input id="ef-img-alt" class="pv-input" type="text" value="${escAttr(cfg.alt || '')}"/>
        </div>
        <div class="pv-field">
          <label class="pv-label">Posición de la imagen</label>
          <div class="pv-radio-group" id="ef-layout-group">
            <button class="pv-radio-btn ${(cfg.layout||'derecha')==='derecha' ? 'active' : ''}" data-layout="derecha">Imagen a la derecha</button>
            <button class="pv-radio-btn ${cfg.layout==='izquierda' ? 'active' : ''}" data-layout="izquierda">Imagen a la izquierda</button>
          </div>
        </div>
        ${radioGroupJs()}`;

    default:
      return '<p style="font-size:.82rem;color:#64748B">No hay formulario disponible para este tipo de bloque.</p>';
  }
}

function radioGroupJs() { return ''; }  // handlers wired in wireEditFormHandlers()

/* ── File upload handler for edit form ─────────────── */
async function handleEditFileChange(e) {
  const file    = e.target.files[0];
  const tipo    = e.target.dataset.tipo || 'IMAGEN';
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('tipo_archivo', tipo);

  try {
    const res  = await fetch('controllers/files/upload.php', { method: 'POST', body: formData });
    const json = await res.json();
    if (!json.ok) { alert(json.error || 'Error al subir archivo'); return; }

    const src = json.data.ruta_archivo;

    // Update URL input
    const urlInput = document.getElementById('ef-img-url') || document.getElementById('ef-video-url');
    if (urlInput) urlInput.value = src;

    // Show preview
    const wrap = document.getElementById('pv-img-preview-wrap');
    if (wrap && tipo === 'IMAGEN') {
      wrap.innerHTML = `<img src="${escHtml(src)}" alt=""/>`;
      wrap.classList.add('has-img');
    }
    const vidName = document.getElementById('ef-video-file-name');
    if (vidName) vidName.textContent = json.data.nombre_original;
  } catch { alert('Error de conexión al subir el archivo'); }
}

/* ── Gallery file add ──────────────────────────────── */
async function handleGalleryFileAdd(e) {
  const files = [...e.target.files];
  if (!files.length) return;
  const block = _blocks.find(b => b.id_bloque === _editingId);
  if (!block) return;

  for (const file of files) {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('tipo_archivo', 'IMAGEN');
    try {
      const res  = await fetch('controllers/files/upload.php', { method: 'POST', body: fd });
      const json = await res.json();
      if (!json.ok) continue;
      const img = { src: json.data.ruta_archivo, alt: json.data.nombre_original, id_archivo: json.data.id_archivo_usuario };
      const cfg = block.configuracion || {};
      if (!cfg.imagenes) cfg.imagenes = [];
      cfg.imagenes.push(img);
      block.configuracion = cfg;

      const itemsEl = document.getElementById('pv-gallery-items');
      if (itemsEl) {
        const i = cfg.imagenes.length - 1;
        const div = document.createElement('div');
        div.className = 'pv-gallery-item';
        div.dataset.idx = i;
        div.innerHTML = `<img class="pv-gallery-thumb" src="${escHtml(img.src)}" alt=""/>
          <span class="pv-gallery-item-name">${escHtml(img.alt)}</span>
          <button class="pv-gallery-item-del" data-idx="${i}" title="Eliminar">
            <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>`;
        div.querySelector('.pv-gallery-item-del').addEventListener('click', () => removeGalleryItem(div.dataset.idx));
        itemsEl.appendChild(div);
      }
    } catch {}
  }
  e.target.value = '';
}

function removeGalleryItem(idx) {
  const block = _blocks.find(b => b.id_bloque === _editingId);
  if (!block || !block.configuracion) return;
  block.configuracion.imagenes.splice(parseInt(idx), 1);
  // Re-render list
  const itemsEl = document.getElementById('pv-gallery-items');
  if (itemsEl) {
    itemsEl.innerHTML = (block.configuracion.imagenes || []).map((img, i) => `
      <div class="pv-gallery-item" data-idx="${i}">
        <img class="pv-gallery-thumb" src="${escHtml(img.src||'')}" alt=""/>
        <span class="pv-gallery-item-name">${escHtml(img.alt || `Imagen ${i+1}`)}</span>
        <button class="pv-gallery-item-del" data-idx="${i}" title="Eliminar">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`).join('');
    itemsEl.querySelectorAll('.pv-gallery-item-del').forEach(b =>
      b.addEventListener('click', () => removeGalleryItem(b.dataset.idx)));
  }
}

/* ── Read form values and save block ───────────────── */
async function saveBlockEdit() {
  const block = _blocks.find(b => b.id_bloque === _editingId);
  if (!block) return;

  const cfg     = { ...(block.configuracion || {}) };
  let   texto   = block.contenido_texto;

  const efTexto  = document.getElementById('ef-texto');
  const efNivel  = document.querySelector('#ef-nivel-group .pv-radio-btn.active');
  const efAlign  = document.querySelector('#ef-align-group .pv-radio-btn.active');
  const efAncho  = document.querySelector('#ef-ancho-group .pv-radio-btn.active');
  const efLayout = document.querySelector('#ef-layout-group .pv-radio-btn.active');
  const efVTipo  = document.querySelector('[data-vtipo].active');

  if (efTexto)  texto          = efTexto.value;
  if (efNivel)  cfg.nivel      = parseInt(efNivel.dataset.nivel);
  if (efAlign)  cfg.alineacion = efAlign.dataset.align;
  if (efAncho)  cfg.ancho      = efAncho.dataset.ancho;
  if (efLayout) cfg.layout     = efLayout.dataset.layout;
  if (efVTipo)  cfg.tipo       = efVTipo.dataset.vtipo;

  // Image
  const efImgUrl = document.getElementById('ef-img-url');
  if (efImgUrl && efImgUrl.value.trim()) cfg.src = efImgUrl.value.trim();
  const efImgAlt = document.getElementById('ef-img-alt');
  if (efImgAlt !== null) cfg.alt = efImgAlt.value.trim();
  const efImgPie = document.getElementById('ef-img-pie');
  if (efImgPie !== null) cfg.pie_foto = efImgPie.value.trim();

  // Video
  const efVideoUrl = document.getElementById('ef-video-url');
  if (efVideoUrl && efVideoUrl.value.trim()) cfg.src = efVideoUrl.value.trim();
  const efVideoTitle = document.getElementById('ef-video-titulo');
  if (efVideoTitle) cfg.titulo = efVideoTitle.value.trim();

  // Gallery: already tracked live via handleGalleryFileAdd / removeGalleryItem
  // cfg.imagenes was mutated on block.configuracion directly

  const saveBtn = document.getElementById('block-edit-save');
  saveBtn.disabled = true;
  try {
    const res = await fetch('controllers/blocks/update.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_bloque: _editingId, contenido_texto: texto, configuracion: cfg }),
    });
    const json = await res.json();
    if (!json.ok) { alert(json.error || 'Error al guardar'); return; }
    block.configuracion  = cfg;
    block.contenido_texto = texto;
    renderBlocks();
    closeBlockEdit();
  } catch { alert('Error de conexión'); }
  finally { saveBtn.disabled = false; }
}

function closeBlockEdit() {
  document.getElementById('block-edit-overlay').style.display = 'none';
  _editingId   = null;
  _editFileInput = null;
}

/* ── Block edit modal wiring ───────────────────────── */
document.getElementById('block-edit-close').addEventListener('click', closeBlockEdit);
document.getElementById('block-edit-cancel').addEventListener('click', closeBlockEdit);
document.getElementById('block-edit-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('block-edit-overlay')) closeBlockEdit();
});
document.getElementById('block-edit-save').addEventListener('click', saveBlockEdit);

/* ── Nav tree rendering ────────────────────────────── */
let _sections = [];

function buildNavTree(sections) {
  _sections = sections;
  const treeEl = document.getElementById('pv-nav-tree');
  if (!treeEl) return;
  if (!sections.length) {
    treeEl.innerHTML = '<div class="pv-nav-loading">Sin secciones en este proyecto.</div>';
    return;
  }
  treeEl.innerHTML = sections.map(s => renderNavSection(s)).join('');

  // Wire page links
  treeEl.querySelectorAll('.pv-nav-page-link').forEach(link => {
    link.addEventListener('click', () => {
      const pid = parseInt(link.dataset.pid);
      if (pid) window.location.href = `page-view.html?id=${pid}`;
    });
    // Mark current
    if (parseInt(link.dataset.pid) === pageId) link.classList.add('active');
  });

  // Section toggle
  treeEl.querySelectorAll('.pv-nav-section-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const sid  = btn.dataset.sid;
      const wrap = document.getElementById(`pv-nav-pages-${sid}`);
      if (wrap) {
        const hidden = wrap.style.display === 'none';
        wrap.style.display = hidden ? '' : 'none';
        btn.classList.toggle('open', hidden);
      }
    });
  });
}

function renderNavSection(s) {
  const pages     = (s.pages || []).filter(p => _isLeader || p.estado_codigo === 'PUBLICADA');
  const children  = (s.children || []);
  const pagesHtml = pages.length
    ? pages.map(p => {
        const stClass = { PUBLICADA: 'pub', BORRADOR: 'borra', ARCHIVADA: 'arch' }[p.estado_codigo] || '';
        return `<button class="pv-nav-page-link" data-pid="${p.id_pagina}">
          <span class="pv-nav-page-dot"></span>
          <span class="pv-nav-page-name">${escHtml(p.titulo)}</span>
          ${_isLeader ? `<span class="pv-nav-page-state ${stClass}">${p.estado_codigo === 'PUBLICADA' ? 'Pub' : p.estado_codigo === 'BORRADOR' ? 'Bor' : 'Arc'}</span>` : ''}
        </button>`;
      }).join('')
    : `<div class="pv-nav-no-pages">Sin páginas publicadas</div>`;

  const childHtml = children.map(c => renderNavSection(c)).join('');

  return `<div class="pv-nav-section">
    <div class="pv-nav-section-head">
      <div class="pv-nav-section-icon">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
      </div>
      <span class="pv-nav-section-name">${escHtml(s.nombre)}</span>
      <button class="pv-nav-section-toggle open" data-sid="${s.id_seccion}">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
    <div class="pv-nav-pages" id="pv-nav-pages-${s.id_seccion}">
      ${pagesHtml}
      ${childHtml ? `<div class="pv-nav-children">${childHtml}</div>` : ''}
    </div>
  </div>`;
}

/* ── Estado badge ──────────────────────────────────── */
function updateEstadoBadge(codigo) {
  const badge = document.getElementById('pv-estado-badge');
  if (!badge) return;
  badge.textContent = { PUBLICADA: 'Publicada', BORRADOR: 'Borrador', ARCHIVADA: 'Archivada' }[codigo] || codigo;
  badge.className   = 'pv-estado-badge ' + ({ PUBLICADA: 'pub', BORRADOR: 'borra', ARCHIVADA: 'arch' }[codigo] || '');

  // Update active button in panel
  document.querySelectorAll('.pv-estado-btn').forEach(b => {
    b.classList.remove('active-borra', 'active-pub', 'active-arch');
    if (b.dataset.estado === codigo) {
      b.classList.add(`active-${{ PUBLICADA: 'pub', BORRADOR: 'borra', ARCHIVADA: 'arch' }[codigo] || ''}`);
    }
  });
}

/* ── Tools panel init (leaders) ───────────────────── */
function initToolsPanel() {
  const trigger  = document.getElementById('tools-trigger');
  const overlay  = document.getElementById('tools-overlay');
  const panel    = document.getElementById('tools-panel');
  const closeBtn = document.getElementById('tools-panel-close');

  if (!trigger) return;

  function openPanel()  { overlay.classList.add('show'); panel.classList.add('open'); }
  function closePanel() { overlay.classList.remove('show'); panel.classList.remove('open'); }
  trigger.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  // Estado buttons
  document.querySelectorAll('.pv-estado-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const estado = btn.dataset.estado;
      const msgEl  = document.getElementById('estado-msg');
      try {
        const res  = await fetch('controllers/pages/update-state.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_pagina: pageId, estado }),
        });
        const json = await res.json();
        if (!json.ok) {
          msgEl.textContent = json.error || 'Error';
          msgEl.className   = 'pv-estado-msg error';
          msgEl.style.display = 'block';
          return;
        }
        updateEstadoBadge(estado);
        if (_page) _page.estado_codigo = estado;
        msgEl.textContent = `Estado actualizado a "${estado}"`;
        msgEl.className   = 'pv-estado-msg success';
        msgEl.style.display = 'block';
        setTimeout(() => { msgEl.style.display = 'none'; }, 2500);

        // Update nav tree highlight
        buildNavTree(_sections);
      } catch {
        msgEl.textContent = 'Error de conexión';
        msgEl.className   = 'pv-estado-msg error';
        msgEl.style.display = 'block';
      }
    });
  });

  // Block palette
  const palette = document.getElementById('block-palette');
  if (palette) {
    palette.innerHTML = BLOCK_TYPES.map(t => `
      <div class="pv-palette-card" draggable="true" data-rk="${t.renderer_key}" title="Agregar ${t.label}">
        <div class="pv-palette-icon">${t.icon}</div>
        <div class="pv-palette-label">${t.label}</div>
      </div>`).join('');

    // Click to add
    palette.querySelectorAll('.pv-palette-card').forEach(card => {
      card.addEventListener('click', () => addBlock(card.dataset.rk));
      // Drag from palette
      card.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', 'palette:' + card.dataset.rk);
        e.dataTransfer.effectAllowed = 'copy';
        card.classList.add('dragging-source');
      });
      card.addEventListener('dragend', () => card.classList.remove('dragging-source'));
    });

    // Drop zone for palette drag
    const zone = document.getElementById('pv-blocks-zone');
    if (zone) {
      zone.addEventListener('dragover', e => {
        if (e.dataTransfer.types.includes('text/plain')) {
          e.preventDefault();
          e.dataTransfer.dropEffect = dndSrc ? 'move' : 'copy';
        }
      });
      zone.addEventListener('drop', e => {
        const data = e.dataTransfer.getData('text/plain');
        if (data.startsWith('palette:')) {
          e.preventDefault();
          addBlock(data.slice(8));
        }
      });
    }
  }

  // Show trigger
  trigger.style.removeProperty('display');
  trigger.classList.add('visible');
}

/* ── Nav panel (right side, all users) ─────────────── */
function initNavPanel() {
  const trigger  = document.getElementById('pv-nav-trigger');
  const overlay  = document.getElementById('pv-nav-overlay');
  const panel    = document.getElementById('pv-nav-panel');
  const closeBtn = document.getElementById('pv-nav-panel-close');
  if (!trigger || !panel) return;

  function openPanel()  { overlay.classList.add('show'); panel.classList.add('open'); }
  function closePanel() { overlay.classList.remove('show'); panel.classList.remove('open'); }

  trigger.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
}

/* ── Helpers ─────────────────────────────────────────── */
function escHtml(s) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(s) {
  return String(s ?? '').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function youtubeEmbed(url) {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}
function vimeoEmbed(url) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}` : null;
}

/* ── Init ─────────────────────────────────────────────── */
async function init() {
  if (!pageId) {
    document.getElementById('pv-page-title').textContent = 'Página no encontrada';
    return;
  }

  let data, user;
  try {
    [data, user] = await Promise.all([
      fetch(`controllers/pages/detail.php?id=${pageId}`).then(r => r.json()),
      getUser(),
    ]);
  } catch {
    document.getElementById('pv-page-title').textContent = 'Error al cargar la página';
    return;
  }

  if (!data.ok) {
    document.getElementById('pv-page-title').textContent = data.error || 'Página no disponible';
    return;
  }

  _page     = data.data;
  _blocks   = _page.bloques || [];
  _projId   = _page.id_proyecto;
  _isLeader = !!_page.is_leader;

  // Page head
  document.title = `${_page.titulo} — ${_page.nombre_proyecto}`;
  document.getElementById('pv-page-title').textContent = _page.titulo;
  document.getElementById('pv-bc-section').textContent = _page.nombre_seccion;
  document.getElementById('pv-bc-page').textContent    = _page.titulo;

  // Tipo badge
  const tipoBadge = document.getElementById('pv-tipo-badge');
  if (tipoBadge) tipoBadge.textContent = _page.tipo_nombre || _page.tipo_codigo;

  // Estado badge
  updateEstadoBadge(_page.estado_codigo);

  // Back buttons (breadcrumb + nav panel back btn)
  const backHref = `project-page.html?id=${_projId}`;
  const backEl   = document.getElementById('pv-bc-back');
  const navBack  = document.getElementById('pv-nav-back');
  if (backEl)  { backEl.style.cursor = 'pointer'; backEl.onclick  = () => { window.location.href = backHref; }; }
  if (navBack) { navBack.onclick = () => { window.location.href = backHref; }; }

  // Nav panel project name
  const projName = document.getElementById('pv-nav-proj-name');
  if (projName) projName.textContent = _page.nombre_proyecto;

  // Init nav panel (all users)
  initNavPanel();

  // Load sections for nav tree
  try {
    const sr = await fetch(`controllers/sections/list.php?id=${_projId}`);
    const sj = await sr.json();
    buildNavTree(sj.ok ? sj.data : []);
  } catch { buildNavTree([]); }

  // Render blocks
  renderBlocks();

  // Leader-only features
  if (_isLeader) {
    initToolsPanel();
  }
}

init();
