    document.querySelectorAll('.eye-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = btn.closest('.field-wrap')?.querySelector('input');
        if (!input) return;
        input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    function setError(fieldId, errId, show) {
      document.getElementById(fieldId).classList.toggle('has-error', show);
      document.getElementById(errId).classList.toggle('show', show);
    }

    document.getElementById('form-login').addEventListener('submit', e => {
      e.preventDefault();
      const user = document.getElementById('login-user').value.trim();
      const pass = document.getElementById('login-pass').value.trim();

      let valid = true;
      if (!user) { setError('field-user', 'err-user', true); valid = false; }
      else        { setError('field-user', 'err-user', false); }

      if (!pass)  { setError('field-pass', 'err-pass', true); valid = false; }
      else        { setError('field-pass', 'err-pass', false); }

      if (!valid) return;

      // Preserve registration data (nombre, email, rol) if it exists
      const existing = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({
        ...existing,
        username: user,
        loggedIn: true
      }));
      window.location.href = 'index.html';
    });

    // Clear error on input
    ['login-user', 'login-pass'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => {
        const fieldId = id === 'login-user' ? 'field-user' : 'field-pass';
        const errId   = id === 'login-user' ? 'err-user'   : 'err-pass';
        setError(fieldId, errId, false);
      });
    });
