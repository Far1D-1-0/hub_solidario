  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);
  let projTitle = 'Proyecto';

  async function initProjectTitle() {
    try {
      const r = await fetch(`controllers/projects/detail.php?id=${projId}`);
      const j = await r.json();
      if (j.ok) {
        projTitle = j.data.nombre;
        document.title = `Enviar Testimonio - ${projTitle}`;
        document.getElementById('s-project-tag').innerHTML = `
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
          ${projTitle}`;
      }
    } catch {}
  }

  document.getElementById('s-back').href      = `testimonials.html?id=${projId}`;
  document.getElementById('ss-back-btn').href = `testimonials.html?id=${projId}`;
  document.getElementById('ss-proj-btn').href = `project-page.html?id=${projId}`;

  initProjectTitle();

  // Pre-fill name if logged in
  try {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (u && u.loggedIn && u.nombre) document.getElementById('f-name').value = u.nombre;
  } catch {}

  // Char counter
  const textarea  = document.getElementById('f-text');
  const charCount = document.getElementById('char-count');
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} / 600`;
    charCount.className   = 's-char-count' + (len > 550 ? ' over' : len > 450 ? ' warn' : '');
  });

  function setError(id, show) { document.getElementById(id).classList.toggle('show', show); }
  function clearErrors() {
    ['err-name','err-role','err-text'].forEach(id => setError(id, false));
    ['f-name','f-role','f-text'].forEach(id => document.getElementById(id).classList.remove('error'));
  }

  document.getElementById('s-form').addEventListener('submit', async e => {
    e.preventDefault();
    clearErrors();

    const nombre_publico   = document.getElementById('f-name').value.trim();
    const tipo_participante= document.getElementById('f-role').value;
    const contenido        = document.getElementById('f-text').value.trim();
    let valid = true;

    if (!nombre_publico) {
      document.getElementById('f-name').classList.add('error');
      setError('err-name', true);
      valid = false;
    }
    if (!tipo_participante) {
      document.getElementById('f-role').classList.add('error');
      setError('err-role', true);
      valid = false;
    }
    if (contenido.length < 20) {
      document.getElementById('f-text').classList.add('error');
      setError('err-text', true);
      valid = false;
    }
    if (!valid) return;

    const btn = document.getElementById('s-submit-btn');
    btn.disabled    = true;
    btn.textContent = 'Enviando...';

    try {
      const res  = await fetch('controllers/testimonials/submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contenido, tipo_participante, nombre_publico, id_proyecto: projId }),
      });
      const json = await res.json();

      if (!json.ok) {
        btn.disabled    = false;
        btn.textContent = 'Enviar testimonio';
        setError('err-text', true);
        document.getElementById('err-text').textContent = json.error || 'Error al enviar';
        return;
      }

      document.getElementById('s-form-view').style.display = 'none';
      document.getElementById('s-success').classList.add('show');
    } catch {
      btn.disabled    = false;
      btn.textContent = 'Enviar testimonio';
      setError('err-text', true);
      document.getElementById('err-text').textContent = 'Error de conexión, intenta de nuevo';
    }
  });
