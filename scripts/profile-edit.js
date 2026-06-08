    const user = JSON.parse(localStorage.getItem('user') || '{}');

    document.getElementById('ep-nombre').value    = user.nombre    || '';
    document.getElementById('ep-about').value     = user.about     || '';
    document.getElementById('ep-phone').value     = user.telefono  || '';
    document.getElementById('ep-linktree').value  = user.linktree  || '';
    document.getElementById('ep-instagram').value = user.instagram || '';
    document.getElementById('ep-linkedin').value  = user.linkedin  || '';

    // Email is read-only — just show it
    const emailEl = document.getElementById('ep-email');
    if (emailEl) {
      emailEl.value    = user.email || '';
      emailEl.readOnly = true;
      emailEl.style.opacity = '.6';
    }

    // JS error helpers
    function showError(inputId, message) {
      clearError(inputId);
      const input = document.getElementById(inputId);
      const field = input.closest('.pf-field');
      field.classList.add('has-error');
      const label = field.querySelector('label');
      if (label) label.style.color = '#EF4444';
      const span = document.createElement('span');
      span.className = 'error-msg show';
      span.dataset.errorFor = inputId;
      span.textContent = message;
      const row = input.closest('.pf-social-row');
      (row || input).insertAdjacentElement('afterend', span);
    }

    function clearError(inputId) {
      const input = document.getElementById(inputId);
      if (!input) return;
      const field = input.closest('.pf-field');
      field.classList.remove('has-error');
      const label = field.querySelector('label');
      if (label) label.style.color = '';
      field.querySelector('.error-msg')?.remove();
    }

    ['ep-nombre','ep-phone','ep-linktree','ep-instagram','ep-linkedin','ep-about'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => clearError(id));
    });

    document.getElementById('form-edit').addEventListener('submit', async e => {
      e.preventDefault();
      let valid = true;

      const nombre = document.getElementById('ep-nombre').value.trim();
      if (!nombre) {
        showError('ep-nombre', 'Por favor ingresa tu nombre completo');
        valid = false;
      }
      if (!valid) {
        document.querySelector('.pf-field.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const btn = e.target.querySelector('[type=submit]');
      btn.disabled = true;

      const payload = {
        nombre,
        about:     document.getElementById('ep-about').value.trim()     || null,
        telefono:  document.getElementById('ep-phone').value.trim()     || null,
        linktree:  document.getElementById('ep-linktree').value.trim()  || null,
        instagram: document.getElementById('ep-instagram').value.trim() || null,
        linkedin:  document.getElementById('ep-linkedin').value.trim()  || null,
      };

      try {
        const res  = await fetch('controllers/profile/update.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const json = await res.json();
        if (!json.ok) {
          showError('ep-nombre', json.error || 'Error al guardar');
          btn.disabled = false;
          return;
        }
        // Merge updated fields into localStorage
        const updated = { ...user, ...json.data };
        localStorage.setItem('user', JSON.stringify(updated));
        window.location.href = 'profile.html';
      } catch {
        showError('ep-nombre', 'Error de conexión, intenta de nuevo');
        btn.disabled = false;
      }
    });

    document.getElementById('btn-cancel').addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
