    const params      = new URLSearchParams(window.location.search);
    const leaderIdParam = params.get('id');
    const leaderParam   = params.get('leader');

    function renderInitials(name, colors = '135deg,#1A56E8,#38BDF8') {
      const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
      document.querySelector('.profile-avatar').innerHTML = `
        <div style="width:100%;height:100%;background:linear-gradient(${colors});
          display:flex;align-items:center;justify-content:center;
          font-family:'Sora',sans-serif;font-weight:800;font-size:1.6rem;color:white;">
          ${initials}
        </div>`;
    }

    function renderPublicProfile(data) {
      const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                      'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      document.getElementById('profile-name').textContent  = data.nombre;
      document.getElementById('profile-role').textContent  = data.rol_nombre || 'Líder Social';
      document.getElementById('profile-email').textContent = data.email || '—';
      if (data.fecha_registro) {
        const d = new Date(data.fecha_registro);
        document.getElementById('profile-since').textContent = `${months[d.getMonth()]} ${d.getFullYear()}`;
      } else {
        document.getElementById('profile-since').textContent = '—';
      }

      document.getElementById('profile-about-section').style.display = data.about ? '' : 'none';
      if (data.about) document.getElementById('profile-about').textContent = data.about;

      document.getElementById('edit-profile-btn').style.display = 'none';
      document.getElementById('logout-btn').style.display       = 'none';

      renderInitials(data.nombre, '135deg,#16A34A,#38BDF8');

      const backLink = document.querySelector('.back-link');
      backLink.href = 'catalog.html';
      backLink.lastChild.textContent = ' Catálogo';

      // Social links
      if (data.instagram) {
        document.getElementById('profile-instagram').textContent = data.instagram;
        document.getElementById('contact-instagram').style.display = '';
      }
      if (data.linkedin) {
        document.getElementById('profile-linkedin').textContent = data.linkedin;
        document.getElementById('contact-linkedin').style.display = '';
      }
      if (data.linktree) {
        document.getElementById('profile-linktree').textContent = data.linktree;
        document.getElementById('contact-linktree').style.display = '';
      }

      // Projects section
      const proyectos = data.proyectos || [];
      if (proyectos.length) {
        const securitySection = document.querySelector('.profile-section:last-of-type');
        const projectsSection = document.createElement('div');
        projectsSection.className = 'profile-section';
        projectsSection.innerHTML = `
          <h4>PROYECTOS</h4>
          <div class="leader-projects-list">
            ${proyectos.map(p => `
              <a href="project-page.html?id=${p.id}" class="leader-project-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
                ${p.nombre}
                <svg class="arrow" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>`).join('')}
          </div>`;
        securitySection.before(projectsSection);
      }
    }

    async function loadPublicProfileById(id) {
      try {
        const res  = await fetch(`controllers/profile/get.php?id=${id}`);
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || 'No encontrado');
        renderPublicProfile(json.data);
      } catch (err) {
        document.getElementById('profile-name').textContent = 'Perfil no encontrado';
      }
    }

    if (leaderIdParam) {
      // DB-backed public profile
      loadPublicProfileById(parseInt(leaderIdParam, 10));

    } else if (leaderParam) {
      // Legacy name-based public profile (fallback)
      document.getElementById('profile-name').textContent  = leaderParam;
      document.getElementById('profile-role').textContent  = 'Líder Social';
      document.getElementById('profile-email').textContent = '—';
      document.getElementById('profile-since').textContent = '—';
      document.getElementById('profile-about-section').style.display = 'none';
      document.getElementById('edit-profile-btn').style.display = 'none';
      document.getElementById('logout-btn').style.display       = 'none';
      renderInitials(leaderParam, '135deg,#16A34A,#38BDF8');
      const backLink = document.querySelector('.back-link');
      backLink.href = 'catalog.html';
      backLink.lastChild.textContent = ' Catálogo';

    } else {
      // Own profile — load from session + DB
      (async () => {
        const user = await getUser();
        if (!user || !user.loggedIn) {
          window.location.href = 'login.html';
          return;
        }

        // Render extended profile (about, social, projects) using the shared renderer
        try {
          const res  = await fetch('controllers/profile/own.php');
          const json = await res.json();
          if (json.ok) renderPublicProfile(json.data);
        } catch {}

        // Owner-specific overrides applied after renderPublicProfile
        const displayName = user.nombre || 'Usuario';
        document.getElementById('profile-name').textContent = displayName;
        document.getElementById('profile-role').textContent = user.rol_nombre || '';
        if (user.email) document.getElementById('profile-email').textContent = user.email;

        renderInitials(displayName);

        const backLink = document.querySelector('.back-link');
        if (backLink) {
          backLink.href = 'index.html';
          if (backLink.lastChild) backLink.lastChild.textContent = ' Inicio';
        }

        document.getElementById('edit-profile-btn').style.display = '';
        document.getElementById('logout-btn').style.display = '';

        document.getElementById('edit-profile-btn').addEventListener('click', () => {
          window.location.href = 'profile-edit.html';
        });
        document.getElementById('logout-btn').addEventListener('click', async () => {
          try { await fetch('controllers/auth/logout.php', { method: 'POST' }); } catch {}
          clearUser();
          window.location.href = 'index.html';
        });

        // Password change form
        const pwForm    = document.getElementById('pw-change-form');
        const pwMsg     = document.getElementById('pw-msg');
        document.getElementById('pw-toggle-btn').addEventListener('click', () => {
          pwForm.style.display = pwForm.style.display === 'none' ? '' : 'none';
          pwMsg.style.display  = 'none';
          document.getElementById('pw-current').value = '';
          document.getElementById('pw-new').value     = '';
          document.getElementById('pw-confirm').value = '';
        });
        document.getElementById('pw-cancel').addEventListener('click', () => {
          pwForm.style.display = 'none';
        });
        document.getElementById('pw-save').addEventListener('click', async () => {
          const current = document.getElementById('pw-current').value.trim();
          const nuevo   = document.getElementById('pw-new').value.trim();
          const confirm = document.getElementById('pw-confirm').value.trim();

          const showMsg = (text, color) => {
            pwMsg.textContent    = text;
            pwMsg.style.color    = color;
            pwMsg.style.display  = '';
          };

          if (!current || !nuevo || !confirm) return showMsg('Completa todos los campos.', '#EF4444');
          if (nuevo.length < 6)               return showMsg('La nueva contraseña debe tener al menos 6 caracteres.', '#EF4444');
          if (nuevo !== confirm)               return showMsg('Las contraseñas no coinciden.', '#EF4444');

          const btn = document.getElementById('pw-save');
          btn.disabled    = true;
          btn.textContent = 'Guardando…';

          try {
            const res  = await fetch('controllers/auth/change-password.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ contrasena_actual: current, contrasena_nueva: nuevo }),
            });
            const json = await res.json();
            if (!json.ok) {
              showMsg(json.error || 'Error al cambiar contraseña.', '#EF4444');
            } else {
              showMsg('Contraseña actualizada correctamente.', '#16A34A');
              document.getElementById('pw-current').value = '';
              document.getElementById('pw-new').value     = '';
              document.getElementById('pw-confirm').value = '';
            }
          } catch {
            showMsg('Error de conexión.', '#EF4444');
          } finally {
            btn.disabled    = false;
            btn.textContent = 'Guardar';
          }
        });
      })();
    }
