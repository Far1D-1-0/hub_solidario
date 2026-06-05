    const user = JSON.parse(localStorage.getItem('user') || '{}');

    function getFriendlyName(u) {
      if (u.nombre) return u.nombre;
      if (u.username) {
        const raw = u.username.includes('@') ? u.username.split('@')[0] : u.username;
        return raw.charAt(0).toUpperCase() + raw.slice(1);
      }
      return 'Usuario';
    }

    const displayName = getFriendlyName(user);
    document.getElementById('profile-name').textContent = displayName;

    document.getElementById('profile-role').textContent = user.rol || '';

    const emailVal = user.email || (user.username && user.username.includes('@') ? user.username : null);
    if (emailVal) document.getElementById('profile-email').textContent = emailVal;

    if (user.memberSince) {
      document.getElementById('profile-since').textContent = user.memberSince;
    } else {
      const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                      'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
      const now = new Date();
      document.getElementById('profile-since').textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
    }

    const aboutSection = document.getElementById('profile-about-section');
    if (user.about) {
      document.getElementById('profile-about').textContent = user.about;
    } else {
      aboutSection.style.display = 'none';
    }

    const contactMap = {
      phone:     ['contact-phone',     'profile-phone'],
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

    const initials = displayName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    document.querySelector('.profile-avatar').innerHTML = `
      <div style="width:100%;height:100%;background:linear-gradient(135deg,#1A56E8,#38BDF8);
        display:flex;align-items:center;justify-content:center;
        font-family:'Sora',sans-serif;font-weight:800;font-size:1.6rem;color:white;">
        ${initials}
      </div>`;

    document.getElementById('edit-profile-btn').addEventListener('click', () => {
      window.location.href = 'profile-edit.html';
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
