    /* ── Load categories for dropdown ───────────────────── */
    async function loadCategories() {
      try {
        const res  = await fetch('controllers/categories/list.php');
        const json = await res.json();
        if (!json.ok) return;
        const select = document.getElementById('pf-categoria');
        // Clear existing options except placeholder
        while (select.options.length > 1) select.remove(1);
        json.data.forEach(cat => {
          const opt = document.createElement('option');
          opt.value       = cat.id;
          opt.textContent = cat.nombre;
          select.appendChild(opt);
        });
      } catch {}
    }

    loadCategories();

    /* ── Auto-fill leader from session ─────────────────── */
    getUser().then(function (sessionUser) {
      if (!sessionUser || !sessionUser.loggedIn || !sessionUser.nombre) return;
      const liderInput = document.getElementById('pf-lider');
      if (liderInput) {
        liderInput.value = sessionUser.nombre;
        const hint = document.getElementById('pf-lider-hint');
        if (hint) hint.style.display = 'flex';
      }
    });

    /* ── File upload ─────────────────────────────────────── */
    const uploadArea    = document.getElementById('upload-area');
    const fileInput     = document.getElementById('file-input');
    const uploadPreview = document.getElementById('upload-preview');
    const previewImg    = document.getElementById('preview-img');
    const removeImg     = document.getElementById('remove-img');

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') fileInput.click(); });
    uploadArea.addEventListener('dragover',  e => { e.preventDefault(); uploadArea.classList.add('drag-over'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
    uploadArea.addEventListener('drop', e => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) loadPreview(file);
    });
    fileInput.addEventListener('change', () => { if (fileInput.files[0]) loadPreview(fileInput.files[0]); });

    function loadPreview(file) {
      const reader = new FileReader();
      reader.onload = ev => {
        previewImg.src = ev.target.result;
        uploadArea.style.display    = 'none';
        uploadPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
    removeImg.addEventListener('click', () => {
      previewImg.src = '';
      fileInput.value = '';
      uploadPreview.style.display = 'none';
      uploadArea.style.display    = 'block';
    });

    /* ── Validation ──────────────────────────────────────── */
    function setError(fieldId, errId, show, msg) {
      document.getElementById(fieldId).classList.toggle('has-error', show);
      const err = document.getElementById(errId);
      err.classList.toggle('show', show);
      if (msg) err.textContent = msg;
    }

    [
      ['pf-nombre',     'field-nombre',     'err-nombre'],
      ['pf-desc-corta', 'field-desc-corta', 'err-desc-corta'],
      ['pf-desc-larga', 'field-desc-larga', 'err-desc-larga'],
      ['pf-categoria',  'field-categoria',  'err-categoria'],
      ['pf-lider',      'field-lider',      'err-lider'],
    ].forEach(([inputId, fieldId, errId]) => {
      const el = document.getElementById(inputId);
      el.addEventListener('input',  () => setError(fieldId, errId, false));
      el.addEventListener('change', () => setError(fieldId, errId, false));
    });

    document.getElementById('form-project').addEventListener('submit', async e => {
      e.preventDefault();
      let valid = true;

      const nombre      = document.getElementById('pf-nombre').value.trim();
      const descCorta   = document.getElementById('pf-desc-corta').value.trim();
      const descLarga   = document.getElementById('pf-desc-larga').value.trim();
      const categoriaId = document.getElementById('pf-categoria').value;
      const lider       = document.getElementById('pf-lider').value.trim();
      const ubicacion   = document.getElementById('pf-ubicacion')?.value.trim() || '';

      if (!nombre)      { setError('field-nombre',     'err-nombre',     true, 'Por favor ingresa el nombre del proyecto'); valid = false; }
      if (!descCorta)   { setError('field-desc-corta', 'err-desc-corta', true, 'Por favor ingresa una descripción corta');  valid = false; }
      if (!descLarga)   { setError('field-desc-larga', 'err-desc-larga', true, 'Por favor ingresa una descripción detallada'); valid = false; }
      if (!categoriaId) { setError('field-categoria',  'err-categoria',  true, 'Por favor selecciona una categoría');        valid = false; }
      if (!lider)       { setError('field-lider',       'err-lider',      true, 'Por favor ingresa el nombre del líder social'); valid = false; }

      if (!valid) {
        document.querySelector('.pf-field.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const btn = e.target.querySelector('[type=submit]');
      btn.disabled = true;

      try {
        const payload = {
          nombre,
          descripcion: descCorta,
          about:       descLarga,
          ubicacion:   ubicacion || null,
          id_categoria: parseInt(categoriaId, 10),
        };

        const res  = await fetch('controllers/projects/create.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();

        if (!json.ok) {
          setError('field-nombre', 'err-nombre', true, json.error || 'Error al crear el proyecto');
          btn.disabled = false;
          return;
        }

        window.location.href = `project-page.html?id=${json.data.id}`;
      } catch {
        setError('field-nombre', 'err-nombre', true, 'Error de conexión, intenta de nuevo');
        btn.disabled = false;
      }
    });
