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
      document.getElementById('profile-name').textContent  = data.nombre;
      document.getElementById('profile-role').textContent  = data.rol_nombre || 'Líder Social';
      document.getElementById('profile-email').textContent = '—';
      document.getElementById('profile-since').textContent = '—';

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
      // Own profile
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      const displayName = user.nombre || user.username?.split('@')[0] || 'Usuario';
      document.getElementById('profile-name').textContent = displayName;
      document.getElementById('profile-role').textContent = user.rol_nombre || user.rol || '';

      const emailVal = user.email;
      if (emailVal) document.getElementById('profile-email').textContent = emailVal;

      if (user.memberSince) {
        document.getElementById('profile-since').textContent = user.memberSince;
      } else {
        const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                        'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        const now = new Date();
        document.getElementById('profile-since').textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
      }

      if (user.about) {
        document.getElementById('profile-about').textContent = user.about;
      } else {
        document.getElementById('profile-about-section').style.display = 'none';
      }

      const contactMap = {
        telefono:  ['contact-phone',     'profile-phone'],
        linktree:  ['contact-linktree',  'profile-linktree'],
        instagram: ['contact-instagram', 'profile-instagram'],
        linkedin:  ['contact-linkedin',  'profile-linkedin'],
      };
      Object.entries(contactMap).forEach(([key, [rowId, valId]]) => {
        if (user[key]) {
          document.getElementById(valId).textContent = user[key];
          document.getElementById(rowId).style.display = '';
        }
      });

      renderInitials(displayName);

      document.getElementById('edit-profile-btn').addEventListener('click', () => {
        window.location.href = 'profile-edit.html';
      });

      document.getElementById('logout-btn').addEventListener('click', async () => {
        try { await fetch('controllers/auth/logout.php', { method: 'POST' }); } catch {}
        localStorage.removeItem('user');
        window.location.href = 'index.html';
      });
    }
