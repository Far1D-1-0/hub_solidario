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

    const ROL_MAP = {
      'Administrador': 'ADMIN',
      'Líder Social':  'LIDER',
      'Usuario':       'USUARIO',
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById('form-register').addEventListener('submit', async e => {
      e.preventDefault();
      let valid = true;

      const nombre  = document.getElementById('reg-nombre').value.trim();
      const email   = document.getElementById('reg-email').value.trim();
      const pass    = document.getElementById('reg-pass').value;
      const confirm = document.getElementById('reg-confirm').value;
      const rol     = document.getElementById('reg-rol').value;

      if (!nombre) {
        setError('field-nombre', 'err-nombre', true, 'Por favor ingresa tu nombre completo');
        valid = false;
      } else { setError('field-nombre', 'err-nombre', false); }

      if (!email) {
        setError('field-email', 'err-email', true, 'Por favor ingresa tu correo electrónico');
        valid = false;
      } else if (!emailRegex.test(email)) {
        setError('field-email', 'err-email', true, 'Por favor ingresa un correo válido');
        valid = false;
      } else { setError('field-email', 'err-email', false); }

      if (!pass) {
        setError('field-pass', 'err-pass', true, 'Por favor crea una contraseña');
        valid = false;
      } else if (pass.length < 6) {
        setError('field-pass', 'err-pass', true, 'La contraseña debe tener al menos 6 caracteres');
        valid = false;
      } else { setError('field-pass', 'err-pass', false); }

      if (!confirm) {
        setError('field-confirm', 'err-confirm', true, 'Por favor confirma tu contraseña');
        valid = false;
      } else if (confirm !== pass) {
        setError('field-confirm', 'err-confirm', true, 'Las contraseñas no coinciden');
        valid = false;
      } else { setError('field-confirm', 'err-confirm', false); }

      if (!rol) {
        setError('field-rol', 'err-rol', true, 'Por favor selecciona un rol');
        valid = false;
      } else { setError('field-rol', 'err-rol', false); }

      if (!valid) return;

      const btn = e.target.querySelector('[type=submit]');
      btn.disabled = true;

      try {
        const res  = await fetch('controllers/auth/register.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre,
            email,
            contrasena: pass,
            rol_codigo: ROL_MAP[rol] ?? 'USUARIO',
            rol_nombre: rol,
          }),
        });
        const json = await res.json();

        if (!json.ok) {
          if (json.error?.toLowerCase().includes('correo')) {
            setError('field-email', 'err-email', true, json.error);
          } else {
            setError('field-nombre', 'err-nombre', true, json.error || 'Error al registrar');
          }
          return;
        }

        // Usuarios se logean directo; líderes/admins esperan validación
        if (json.data.loggedIn) {
          window.location.href = 'index.html';
        } else {
          window.location.href = 'login.html?pendiente=1';
        }
      } catch {
        setError('field-nombre', 'err-nombre', true, 'Error de conexión, intenta de nuevo');
      } finally {
        btn.disabled = false;
      }
    });

    [
      ['reg-nombre',  'field-nombre',  'err-nombre'],
      ['reg-email',   'field-email',   'err-email'],
      ['reg-pass',    'field-pass',    'err-pass'],
      ['reg-confirm', 'field-confirm', 'err-confirm'],
      ['reg-rol',     'field-rol',     'err-rol'],
    ].forEach(([inputId, fieldId, errId]) => {
      document.getElementById(inputId).addEventListener('input',  () => setError(fieldId, errId, false));
      document.getElementById(inputId).addEventListener('change', () => setError(fieldId, errId, false));
    });
