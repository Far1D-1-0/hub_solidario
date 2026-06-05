    (function () {
      const stored = JSON.parse(localStorage.getItem('user') || 'null');
      const panel  = document.getElementById('user-panel');
      const avatar = document.getElementById('nav-avatar');
      const uname  = document.getElementById('nav-username');
      const logoutBtn  = document.getElementById('nav-logout');
      const perfilLink = document.querySelector('.nav-links a[href="login.html"]');

      function getFriendlyName(u) {
        if (u.nombre) return u.nombre;
        if (u.username) {
          const raw = u.username.includes('@') ? u.username.split('@')[0] : u.username;
          return raw.charAt(0).toUpperCase() + raw.slice(1);
        }
        return 'Usuario';
      }

      if (stored && stored.loggedIn) {
        const name = getFriendlyName(stored);
        panel.classList.add('visible');
        uname.textContent  = name;
        avatar.textContent = name[0].toUpperCase();
        if (perfilLink) perfilLink.setAttribute('href', 'profile.html');
      }

      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        panel.classList.remove('visible');
        if (perfilLink) perfilLink.setAttribute('href', 'login.html');
        closeNav();
      });
    })();

    const menuBtn = document.getElementById('menu-btn');
    const sideNav = document.getElementById('side-nav');
    const overlay = document.getElementById('nav-overlay');

    function openNav()  { sideNav.classList.add('open'); overlay.classList.add('show'); menuBtn.classList.add('open'); }
    function closeNav() { sideNav.classList.remove('open'); overlay.classList.remove('show'); menuBtn.classList.remove('open'); }

    menuBtn.addEventListener('click', openNav);
    overlay.addEventListener('click', closeNav);
    document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', closeNav));
