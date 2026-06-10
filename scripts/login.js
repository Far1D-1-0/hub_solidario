    // Show banner based on URL param (?pendiente=1 or ?rechazado=1)
    (function () {
      const params  = new URLSearchParams(window.location.search);
      const banner  = document.getElementById('pending-banner');
      const msg     = document.getElementById('pending-banner-msg');
      if (params.get('pendiente')) {
        banner.classList.add('is-warning');
        msg.textContent = 'Tu solicitud está pendiente de aprobación por un administrador. Podrás iniciar sesión una vez que sea aprobada.';
        banner.style.display = 'flex';
      } else if (params.get('rechazado')) {
        banner.classList.add('is-error');
        msg.textContent = 'Tu solicitud fue rechazada. Contacta al administrador para más información.';
        banner.style.display = 'flex';
      }
    })();

    document.querySelectorAll('.eye-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.field-wrap')?.querySelector('input');
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    function setError(fieldId, errId, show, msg) {
      document.getElementById(fieldId).classList.toggle('has-error', show);
      const errEl = document.getElementById(errId);
      errEl.classList.toggle('show', show);
      if (msg) errEl.textContent = msg;
    }

    document.getElementById('form-login').addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('login-user').value.trim();
      const pass  = document.getElementById('login-pass').value.trim();

      let valid = true;
      if (!email) { setError('field-user', 'err-user', true, 'Por favor ingresa tu correo'); valid = false; }
      else         { setError('field-user', 'err-user', false); }

      if (!pass)  { setError('field-pass', 'err-pass', true, 'Por favor ingresa tu contraseña'); valid = false; }
      else         { setError('field-pass', 'err-pass', false); }

      if (!valid) return;

      const btn = e.target.querySelector('[type=submit]');
      btn.disabled = true;

      try {
        const res  = await fetch('controllers/auth/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, contrasena: pass }),
        });
        const json = await res.json();

        if (!json.ok) {
          setError('field-pass', 'err-pass', true, json.error || 'Credenciales incorrectas');
          return;
        }

        window.location.href = 'index.html';
      } catch {
        setError('field-pass', 'err-pass', true, 'Error de conexión, intenta de nuevo');
      } finally {
        btn.disabled = false;
      }
    });

    ['login-user', 'login-pass'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        const fieldId = id === 'login-user' ? 'field-user' : 'field-pass';
        const errId   = id === 'login-user' ? 'err-user'   : 'err-pass';
        setError(fieldId, errId, false);
      });
    });
