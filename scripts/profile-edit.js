    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // Pre-fill fields — derive friendly name the same way the profile page does
    function getFriendlyName(u) {
      if (u.nombre) return u.nombre;
      if (u.username) {
        const raw = u.username.includes('@') ? u.username.split('@')[0] : u.username;
        return raw.charAt(0).toUpperCase() + raw.slice(1);
      }
      return '';
    }

    document.getElementById('ep-nombre').value    = getFriendlyName(user);
    document.getElementById('ep-email').value     = user.email || (user.username && user.username.includes('@') ? user.username : '');
    document.getElementById('ep-about').value     = user.about     || '';
    document.getElementById('ep-phone').value     = user.phone     || '';
    document.getElementById('ep-linktree').value  = user.linktree  || '';
    document.getElementById('ep-instagram').value = user.instagram || '';
    document.getElementById('ep-linkedin').value  = user.linkedin  || '';

    const rolSelect = document.getElementById('ep-rol');
    if (user.rol) {
      for (const opt of rolSelect.options) {
        if (opt.text === user.rol) { opt.selected = true; break; }
      }
    }

    // JS-managed error helpers — no error spans exist in HTML
    function showError(inputId, message) {
      clearError(inputId);
      const input = document.getElementById(inputId);
      const field = input.closest('.pf-field');
      field.classList.add('has-error');
      // Red label
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
      const field = input.closest('.pf-field');
      field.classList.remove('has-error');
      const label = field.querySelector('label');
      if (label) label.style.color = '';
      field.querySelector('.error-msg')?.remove();
    }

    // Clear errors on input/change
    ['ep-nombre','ep-email','ep-phone','ep-linktree','ep-instagram','ep-linkedin','ep-about'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => clearError(id));
    });
    document.getElementById('ep-rol').addEventListener('change', () => clearError('ep-rol'));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById('form-edit').addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const nombre = document.getElementById('ep-nombre').value.trim();
      const email  = document.getElementById('ep-email').value.trim();

      if (!nombre) {
        showError('ep-nombre', 'Por favor ingresa tu nombre completo');
        valid = false;
      }

      if (email && !emailRegex.test(email)) {
        showError('ep-email', 'Por favor ingresa un correo electrónico válido');
        valid = false;
      }

      if (!valid) {
        document.querySelector('.pf-field.has-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const updated = {
        ...user,
        nombre:    nombre,
        username:  nombre,
        rol:       document.getElementById('ep-rol').value || user.rol || '',
        about:     document.getElementById('ep-about').value.trim(),
        phone:     document.getElementById('ep-phone').value.trim(),
        linktree:  document.getElementById('ep-linktree').value.trim(),
        instagram: document.getElementById('ep-instagram').value.trim(),
        linkedin:  document.getElementById('ep-linkedin').value.trim(),
      };

      if (email) updated.email = email;

      // Remove empty optional fields to keep localStorage clean
      ['rol','about','phone','linktree','instagram','linkedin'].forEach(k => {
        if (!updated[k]) delete updated[k];
      });

      localStorage.setItem('user', JSON.stringify(updated));
      window.location.href = 'profile.html';
    });

    document.getElementById('btn-cancel').addEventListener('click', () => {
      window.location.href = 'profile.html';
    });
