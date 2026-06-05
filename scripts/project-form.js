    /* ── Auto-fill leader from session ─────────────── */
    let sessionUser = null;
    try {
      sessionUser = JSON.parse(localStorage.getItem('user') || 'null');
      if (sessionUser && sessionUser.loggedIn && sessionUser.nombre) {
        const liderInput = document.getElementById('pf-lider');
        liderInput.value = sessionUser.nombre;
        document.getElementById('pf-lider-hint').style.display = 'flex';
      }
    } catch(e) {}

    /* ── File upload ─────────────────────────────────── */
    const uploadArea    = document.getElementById('upload-area');
    const fileInput     = document.getElementById('file-input');
    const uploadPreview = document.getElementById('upload-preview');
    const previewImg    = document.getElementById('preview-img');
    const removeImg     = document.getElementById('remove-img');

    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') fileInput.click();
    });
    uploadArea.addEventListener('dragover', e => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('drag-over'));
    uploadArea.addEventListener('drop', e => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) loadPreview(file);
    });
    fileInput.addEventListener('change', () => {
      if (fileInput.files[0]) loadPreview(fileInput.files[0]);
    });
    function loadPreview(file) {
      const reader = new FileReader();
      reader.onload = ev => {
        previewImg.src = ev.target.result;
        uploadArea.style.display = 'none';
        uploadPreview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
    removeImg.addEventListener('click', () => {
      previewImg.src = '';
      fileInput.value = '';
      uploadPreview.style.display = 'none';
      uploadArea.style.display = 'block';
    });

    /* ── Validation ──────────────────────────────────── */
    function setError(fieldId, errId, show, msg) {
      document.getElementById(fieldId).classList.toggle('has-error', show);
      const err = document.getElementById(errId);
      err.classList.toggle('show', show);
      if (msg) err.textContent = msg;
    }

    // Clear error on input/change
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

    document.getElementById('form-project').addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const nombre    = document.getElementById('pf-nombre').value.trim();
      const descCorta = document.getElementById('pf-desc-corta').value.trim();
      const descLarga = document.getElementById('pf-desc-larga').value.trim();
      const categoria = document.getElementById('pf-categoria').value;
      const lider     = document.getElementById('pf-lider').value.trim();

      if (!nombre) {
        setError('field-nombre', 'err-nombre', true, 'Por favor ingresa el nombre del proyecto');
        valid = false;
      }
      if (!descCorta) {
        setError('field-desc-corta', 'err-desc-corta', true, 'Por favor ingresa una descripción corta');
        valid = false;
      }
      if (!descLarga) {
        setError('field-desc-larga', 'err-desc-larga', true, 'Por favor ingresa una descripción detallada');
        valid = false;
      }
      if (!categoria) {
        setError('field-categoria', 'err-categoria', true, 'Por favor selecciona una categoría');
        valid = false;
      }
      if (!lider) {
        setError('field-lider', 'err-lider', true, 'Por favor ingresa el nombre del líder social');
        valid = false;
      }

      if (!valid) {
        document.querySelector('.pf-field.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Save to custom_projects in localStorage
      const imgSrc   = document.getElementById('preview-img').src || '';
      const ubicacion= document.getElementById('pf-ubicacion').value.trim();
      const customs  = JSON.parse(localStorage.getItem('custom_projects') || '[]');
      const newProj  = {
        id:         Date.now(),
        title:      nombre,
        desc:       descCorta,
        about:      descLarga,
        category:   categoria,
        img:        imgSrc || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80',
        leader:     lider,
        location:   ubicacion || 'Sin especificar',
        volunteers: 0,
        isCustom:   true,
        createdAt:  Date.now(),
        creatorKey: sessionUser ? (sessionUser.username || sessionUser.nombre || '') : lider
      };
      customs.push(newProj);
      localStorage.setItem('custom_projects', JSON.stringify(customs));

      // Redirect to the new project page
      const newIdx = 15 + (customs.length - 1);
      window.location.href = `project-page.html?id=${newIdx}`;
    });
