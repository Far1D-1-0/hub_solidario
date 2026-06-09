    getUser().then(function (user) {
      const name = user.nombre || 'Administrador';
      document.getElementById('admin-name').textContent    = name;
      document.getElementById('admin-role').textContent    = user.rol_nombre || 'Administrador';
      document.getElementById('welcome-title').textContent = `Bienvenido, ${name}`;
      document.getElementById('stat-rol').textContent      = user.rol_nombre || '—';
    });

    // Tab switching
    const tabDash    = document.getElementById('tab-dashboard');
    const tabSol     = document.getElementById('tab-solicitudes');
    const panelDash  = document.getElementById('dashboard-panel');
    const panelSol   = document.getElementById('solicitudes-panel');

    tabDash.addEventListener('click', () => {
      tabDash.classList.add('active'); tabSol.classList.remove('active');
      panelDash.style.display = 'block'; panelSol.style.display = 'none';
    });
    tabSol.addEventListener('click', () => {
      tabSol.classList.add('active'); tabDash.classList.remove('active');
      panelSol.style.display = 'block'; panelDash.style.display = 'none';
      loadSolicitudes();
    });

    // Volver al inicio sin cerrar sesión
    document.getElementById('admin-back').addEventListener('click', () => {
      window.location.href = 'index.html';
    });

    // ── Load pending user counts ──────────────────────────────────
    async function loadStats() {
      try {
        const [pending, validated, rejected] = await Promise.all([
          fetch('controllers/admin/pending-users.php?estado=PENDIENTE').then(r => r.json()),
          fetch('controllers/admin/pending-users.php?estado=VALIDADO').then(r => r.json()),
          fetch('controllers/admin/pending-users.php?estado=RECHAZADO').then(r => r.json()),
        ]);
        document.getElementById('stat-pending').textContent  = pending.ok  ? pending.data.length  : '—';
        document.getElementById('stat-approved').textContent = validated.ok? validated.data.length: '—';
        document.getElementById('stat-denied').textContent   = rejected.ok ? rejected.data.length : '—';
      } catch {}
    }

    // ── Render solicitudes panel ──────────────────────────────────
    let solicitudesLoaded = false;

    async function loadSolicitudes() {
      if (solicitudesLoaded) return;
      solicitudesLoaded = true;

      const list = document.getElementById('req-list');
      list.innerHTML = '<p style="color:#64748B;text-align:center;padding:16px 0">Cargando solicitudes...</p>';

      try {
        const res  = await fetch('controllers/admin/pending-users.php?estado=PENDIENTE');
        const json = await res.json();
        if (!json.ok) throw new Error(json.error);

        const pending = json.data;
        if (!pending.length) {
          list.innerHTML = '<p style="color:#9CA3AF;text-align:center;padding:24px 0">No hay solicitudes pendientes.</p>';
          return;
        }

        list.innerHTML = pending.map(u => `
          <div class="sol-item" data-id="${u.id}">
            <div class="sol-info">
              <div class="sol-name">${u.nombre}</div>
              <div class="sol-meta">${u.email} &middot; ${u.rol_nombre}</div>
            </div>
            <div class="sol-actions">
              <button class="sol-reject"  data-id="${u.id}" data-accion="RECHAZADO">Rechazar</button>
              <button class="sol-approve" data-id="${u.id}" data-accion="VALIDADO">Aprobar</button>
            </div>
          </div>`).join('');

        list.querySelectorAll('[data-accion]').forEach(btn => {
          btn.addEventListener('click', async () => {
            const id     = parseInt(btn.dataset.id, 10);
            const accion = btn.dataset.accion;
            try {
              const r = await fetch('controllers/admin/validate-user.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, accion }),
              });
              const j = await r.json();
              if (!j.ok) { alert(j.error || 'Error al procesar'); return; }
              const item = list.querySelector(`.sol-item[data-id="${id}"]`);
              if (item) item.remove();
              if (!list.querySelector('.sol-item')) {
                list.innerHTML = '<p style="color:#9CA3AF;text-align:center;padding:24px 0">No hay solicitudes pendientes.</p>';
              }
              solicitudesLoaded = false;
              await loadStats();
            } catch { alert('Error de conexión'); }
          });
        });
      } catch (err) {
        list.innerHTML = `<p style="color:#EF4444;text-align:center;padding:16px 0">Error: ${err.message}</p>`;
      }
    }

    loadStats();
