    const user = JSON.parse(localStorage.getItem('user') || '{}');

    function getFriendlyName(u) {
      if (u.nombre) return u.nombre;
      if (u.username) {
        const raw = u.username.includes('@') ? u.username.split('@')[0] : u.username;
        return raw.charAt(0).toUpperCase() + raw.slice(1);
      }
      return 'Administrador';
    }

    // Populate navbar user info
    const name = getFriendlyName(user);
    document.getElementById('admin-name').textContent = name;
    if (user.rol) document.getElementById('admin-role').textContent = user.rol;
    document.getElementById('welcome-title').textContent = `Bienvenido, ${name}`;

    // Stat: rol card
    if (user.rol) document.getElementById('stat-rol').textContent = user.rol;

    // Read pending requests from localStorage
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    const pending  = requests.filter(r => r.status === 'pending').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const denied   = requests.filter(r => r.status === 'denied').length;
    document.getElementById('stat-pending').textContent  = pending;
    document.getElementById('stat-approved').textContent = approved;
    document.getElementById('stat-denied').textContent   = denied;

    // Tab switching
    const tabDash = document.getElementById('tab-dashboard');
    const tabSol  = document.getElementById('tab-solicitudes');
    const panelDash = document.getElementById('dashboard-panel');
    const panelSol  = document.getElementById('solicitudes-panel');

    tabDash.addEventListener('click', () => {
      tabDash.classList.add('active'); tabSol.classList.remove('active');
      panelDash.style.display = ''; panelSol.style.display = 'none';
    });
    tabSol.addEventListener('click', () => {
      tabSol.classList.add('active'); tabDash.classList.remove('active');
      panelSol.style.display = ''; panelDash.style.display = 'none';
    });

    // Logout
    document.getElementById('admin-logout').addEventListener('click', () => {
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    });
