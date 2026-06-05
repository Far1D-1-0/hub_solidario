    // Eye toggles
    document.querySelectorAll('.eye-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.reg-wrap')?.querySelector('input');
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    function setError(fieldId, errId, show, msg) {
      const field = document.getElementById(fieldId);
      const err   = document.getElementById(errId);
      field.classList.toggle('has-error', show);
      err.classList.toggle('show', show);
      if (msg) err.textContent = msg;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById('form-register').addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const nombre  = document.getElementById('reg-nombre').value.trim();
      const email   = document.getElementById('reg-email').value.trim();
      const pass    = document.getElementById('reg-pass').value;
      const confirm = document.getElementById('reg-confirm').value;
      const rol     = document.getElementById('reg-rol').value;
      const terms   = document.getElementById('accept-terms').checked;

      // Nombre
      if (!nombre) {
        setError('field-nombre', 'err-nombre', true, 'Por favor ingresa tu nombre completo');
        valid = false;
      } else { setError('field-nombre', 'err-nombre', false); }

      // Email
      if (!email) {
        setError('field-email', 'err-email', true, 'Por favor ingresa tu correo electrónico');
        valid = false;
      } else if (!emailRegex.test(email)) {
        setError('field-email', 'err-email', true, 'Por favor ingresa un correo válido');
        valid = false;
      } else { setError('field-email', 'err-email', false); }

      // Contraseña
      if (!pass) {
        setError('field-pass', 'err-pass', true, 'Por favor crea una contraseña');
        valid = false;
      } else if (pass.length < 6) {
        setError('field-pass', 'err-pass', true, 'La contraseña debe tener al menos 6 caracteres');
        valid = false;
      } else { setError('field-pass', 'err-pass', false); }

      // Confirmar contraseña
      if (!confirm) {
        setError('field-confirm', 'err-confirm', true, 'Por favor confirma tu contraseña');
        valid = false;
      } else if (confirm !== pass) {
        setError('field-confirm', 'err-confirm', true, 'Las contraseñas no coinciden');
        valid = false;
      } else { setError('field-confirm', 'err-confirm', false); }

      // Rol
      if (!rol) {
        setError('field-rol', 'err-rol', true, 'Por favor selecciona un rol');
        valid = false;
      } else { setError('field-rol', 'err-rol', false); }

      // Términos
      if (!terms) {
        setError('field-terms', 'err-terms', true, 'Debes aceptar los términos y condiciones');
        valid = false;
      } else { setError('field-terms', 'err-terms', false); }

      if (!valid) return;

      // Save registration data so profile can display it
      const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                      'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      const now = new Date();
      localStorage.setItem('user', JSON.stringify({
        username:    nombre,
        nombre:      nombre,
        email:       email,
        rol:         rol,
        memberSince: `${months[now.getMonth()]} ${now.getFullYear()}`,
        loggedIn:    false
      }));

      window.location.href = 'login.html';
    });

    // Clear errors on input
    [
      ['reg-nombre',  'field-nombre',  'err-nombre'],
      ['reg-email',   'field-email',   'err-email'],
      ['reg-pass',    'field-pass',    'err-pass'],
      ['reg-confirm', 'field-confirm', 'err-confirm'],
      ['reg-rol',     'field-rol',     'err-rol'],
    ].forEach(([inputId, fieldId, errId]) => {
      document.getElementById(inputId).addEventListener('input', () => {
        setError(fieldId, errId, false);
      });
      document.getElementById(inputId).addEventListener('change', () => {
        setError(fieldId, errId, false);
      });
    });

    document.getElementById('accept-terms').addEventListener('change', () => {
      setError('field-terms', 'err-terms', false);
    });
