  const PROJECTS_TITLES = ["Banco de Alimentos Universitario","Tutorías Académicas Gratuitas","Limpieza de Espacios Naturales","Brigadas de Salud Comunitaria","Construcción de Viviendas Dignas","Alfabetización Digital para Adultos","Huertos Urbanos Comunitarios","Centro de Apoyo Psicológico","Biblioteca Comunitaria Móvil","Taller de Arte y Expresión Joven","Red de Reciclaje Escolar","Emprendimiento Social Femenino","Cocinas Comunitarias Solidarias","Programa de Reforestación Costera","Clínica Dental Comunitaria"];

  const params    = new URLSearchParams(location.search);
  const projId    = parseInt(params.get('id') || '0', 10);
  const storageKey= `testimonials_${projId}`;
  const projTitle = PROJECTS_TITLES[projId] || 'Proyecto';

  document.title = `Enviar Testimonio - ${projTitle}`;
  document.getElementById('s-project-tag').innerHTML = `
    <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
    ${projTitle}`;
  document.getElementById('s-back').href              = `testimonials.html?id=${projId}`;
  document.getElementById('ss-back-btn').href         = `testimonials.html?id=${projId}`;
  document.getElementById('ss-proj-btn').href         = `project-page.html?id=${projId}`;

  // Pre-fill name from localStorage if logged in
  try {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    if (u && u.loggedIn && u.nombre) {
      document.getElementById('f-name').value = u.nombre;
    }
  } catch(e) {}

  // Char counter
  const textarea   = document.getElementById('f-text');
  const charCount  = document.getElementById('char-count');
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len} / 600`;
    charCount.className = 's-char-count' + (len > 550 ? ' over' : len > 450 ? ' warn' : '');
  });

  // Validation helpers
  function setError(id, show) {
    document.getElementById(id).classList.toggle('show', show);
  }
  function clearErrors() {
    ['err-name','err-role','err-text'].forEach(id => setError(id, false));
    ['f-name','f-role','f-text'].forEach(id => document.getElementById(id).classList.remove('error'));
  }

  // Form submit
  document.getElementById('s-form').addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('f-name').value.trim();
    const role = document.getElementById('f-role').value;
    const text = document.getElementById('f-text').value.trim();
    let valid = true;

    if (!name) {
      document.getElementById('f-name').classList.add('error');
      setError('err-name', true);
      valid = false;
    }
    if (!role) {
      document.getElementById('f-role').classList.add('error');
      setError('err-role', true);
      valid = false;
    }
    if (text.length < 20) {
      document.getElementById('f-text').classList.add('error');
      setError('err-text', true);
      valid = false;
    }
    if (!valid) return;

    // Disable button during "submit"
    const btn = document.getElementById('s-submit-btn');
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    setTimeout(() => {
      const testimonials = JSON.parse(localStorage.getItem(storageKey) || '[]');
      testimonials.push({
        id: Date.now(),
        name,
        role,
        text: `"${text}"`,
        avatar: null,
        status: 'pending',
        date: new Date().toLocaleDateString('es-MX', { day:'numeric', month:'long', year:'numeric' })
      });
      localStorage.setItem(storageKey, JSON.stringify(testimonials));

      document.getElementById('s-form-view').style.display = 'none';
      document.getElementById('s-success').classList.add('show');
    }, 600);
  });
