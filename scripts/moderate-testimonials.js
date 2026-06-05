  const PROJECTS_TITLES   = ["Banco de Alimentos Universitario","Tutorías Académicas Gratuitas","Limpieza de Espacios Naturales","Brigadas de Salud Comunitaria","Construcción de Viviendas Dignas","Alfabetización Digital para Adultos","Huertos Urbanos Comunitarios","Centro de Apoyo Psicológico","Biblioteca Comunitaria Móvil","Taller de Arte y Expresión Joven","Red de Reciclaje Escolar","Emprendimiento Social Femenino","Cocinas Comunitarias Solidarias","Programa de Reforestación Costera","Clínica Dental Comunitaria"];
  const PROJECTS_LEADERS  = ["María González","Carlos Ramírez","Ana Martínez","Dr. Luis Torres","Roberto Sánchez","Ing. Fernanda López","Diana Herrera","Psic. Claudia Vega","Prof. Miguel Ángel Ruiz","Sofía Ramos","Tomás Guerrero","Patricia Morales","Rosa Elena Fuentes","Biol. Jorge Espinoza","Dra. Valeria Soto"];
  const ROLE_CLASS = { Beneficiario: 'role-beneficiario', Voluntario: 'role-voluntario', Estudiante: 'role-estudiante', Colaborador: 'role-colaborador' };

  const params     = new URLSearchParams(location.search);
  const projId     = parseInt(params.get('id') || '0', 10);
  const storageKey = `testimonials_${projId}`;
  const projTitle  = PROJECTS_TITLES[projId] || 'Proyecto';
  const projLeader = PROJECTS_LEADERS[projId] || '';

  document.title = `Moderación - ${projTitle}`;

  // Check if logged-in user is the leader
  function isLeader() {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (!u || !u.loggedIn) return false;
      const userName   = (u.nombre || '').trim().toLowerCase();
      const leaderName = projLeader.trim().toLowerCase();
      return userName === leaderName || leaderName.includes(userName) || userName.includes(leaderName);
    } catch(e) { return false; }
  }

  function getTestimonials() { return JSON.parse(localStorage.getItem(storageKey) || '[]'); }
  function saveTestimonials(list) { localStorage.setItem(storageKey, JSON.stringify(list)); }

  // Seed pending demo testimonials if there are none pending yet
  const PENDING_SEEDS = [
    [
      { name: 'Ana Martínez',       role: 'Beneficiario', text: '"Ser parte de este proyecto ha sido una experiencia increíble. Ver el impacto positivo que tenemos en la comunidad me motiva a seguir colaborando."' },
      { name: 'José Luis Hernández',role: 'Estudiante',   text: '"Las capacitaciones que recibí fueron de gran calidad. Los instructores son muy profesionales y siempre están dispuestos a ayudar."' },
      { name: 'Fernanda Cruz',      role: 'Voluntario',   text: '"Nunca imaginé que donar unas horas de mi tiempo podría generar tanto impacto. Estoy muy agradecida por la oportunidad."' }
    ],
    [
      { name: 'Sofía Ángeles',      role: 'Estudiante',   text: '"El apoyo de los tutores cambió mi desempeño escolar completamente. Aprobé materias que pensé que nunca podría pasar."' },
      { name: 'Marcos Rivera',      role: 'Beneficiario', text: '"Mi hijo ha mejorado mucho en matemáticas gracias a las tutorías. Es un servicio invaluable para familias como la nuestra."' }
    ],
    [
      { name: 'Tomás Ríos',         role: 'Voluntario',   text: '"Participar en las jornadas de limpieza me hizo entender cuánto importa cada pequeña acción. El parque de mi colonia ahora luce increíble."' },
      { name: 'Gabriela Núñez',     role: 'Colaborador',  text: '"Apoyamos con materiales y el equipo aprovechó cada recurso al máximo. El resultado en el ecosistema es visible."' }
    ],
    [
      { name: 'Don Aurelio Pérez',  role: 'Beneficiario', text: '"La brigada me revisó por primera vez en años. Gracias a ellos descubrí a tiempo un problema de salud que no sabía que tenía."' },
      { name: 'Estudiante de Medicina', role: 'Estudiante', text: '"Mis prácticas con la brigada me formaron más que cualquier hospital. Medicina real, humana y comprometida."' }
    ],
    [
      { name: 'Familia Torres',     role: 'Beneficiario', text: '"Gracias a este proyecto mis hijos tienen paredes sólidas y un techo seguro. Es un sueño hecho realidad para nosotros."' },
      { name: 'Luis Espinoza',      role: 'Voluntario',   text: '"No sé de construcción pero aquí aprendí. Ver a una familia entrar a su nuevo hogar fue lo más emocionante que he vivido."' }
    ],
    [
      { name: 'Doña Carmen Veloz',  role: 'Beneficiario', text: '"A mis 75 años aprendí a videollamar a mis hijos. Ahora los veo cada semana aunque vivan lejos. Este programa me devolvió la familia."' },
      { name: 'Rodrigo Salinas',    role: 'Colaborador',  text: '"Donamos equipos y ver cómo adultos mayores los usan con alegría es una recompensa que ningún negocio puede dar."' }
    ],
    [
      { name: 'Elena Vargas',       role: 'Beneficiario', text: '"Mi huerto produce tomates y chiles. Ahora como mejor y gasto menos. Nunca pensé que cultivaría mi propia comida en la ciudad."' },
      { name: 'Santiago Mora',      role: 'Estudiante',   text: '"Mi tesis fue sobre estos huertos y los datos de impacto nutricional son impresionantes. Un modelo replicable en toda la ciudad."' }
    ],
    [
      { name: 'Anónimo',            role: 'Beneficiario', text: '"Por primera vez hablé de lo que sentía y encontré herramientas reales para manejar mis emociones. Las sesiones cambiaron mi vida."' },
      { name: 'Berenice Salado',    role: 'Voluntario',   text: '"Atender personas que no podrían costear terapia es el trabajo más significativo de mi carrera. El impacto es profundo."' }
    ],
    [
      { name: 'Camila Ríos',        role: 'Beneficiario', text: '"Nunca había tenido un libro propio. Ahora leo todos los días y soy parte del club. Los libros me abren mundos que no conocía."' },
      { name: 'Ricardo Castillo',   role: 'Colaborador',  text: '"Donamos 300 libros y recibimos cartas escritas por los niños. Fue el regalo más hermoso que hemos recibido como empresa."' }
    ],
    [
      { name: 'Diego Salinas',      role: 'Beneficiario', text: '"El taller de teatro me salvó. Estaba en malos pasos y aquí encontré un espacio seguro y amigos que me aceptan como soy."' },
      { name: 'Valeria Moreno',     role: 'Estudiante',   text: '"Mi fotografía fue seleccionada para la exposición. Por primera vez sentí que mi trabajo artístico podía mover a las personas."' }
    ],
    [
      { name: 'Maestra Irma Cruz',  role: 'Colaborador',  text: '"Mis alumnos ahora separan la basura en casa también. El programa generó un cambio de mentalidad real que va más allá del aula."' },
      { name: 'Niña Abril, 10 años',role: 'Estudiante',   text: '"Yo le enseñé a mi mamá a reciclar. Ella dice que soy la experta de la casa y eso me hace sentir muy orgullosa."' }
    ],
    [
      { name: 'Verónica López',     role: 'Beneficiario', text: '"Con la mentoría lancé mi negocio de costura. Ya tengo clientes fijos y genero un ingreso estable para mis hijos por primera vez."' },
      { name: 'Gabriela Fuentes',   role: 'Estudiante',   text: '"Diseñé el plan de negocios de tres emprendedoras del programa. Los tres negocios son rentables. Fue mi mejor proyecto universitario."' }
    ],
    [
      { name: 'Laura Mendoza',      role: 'Beneficiario', text: '"Cuando llegamos al comedor mi familia llevaba días sin comer bien. El calor de los voluntarios y la comida nutritiva nos dieron fuerzas."' },
      { name: 'Juan Carlos Ríos',   role: 'Estudiante',   text: '"Diseñé los menús semanales durante mis prácticas de nutrición. Fue la experiencia más valiosa y humana de toda mi carrera."' },
      { name: 'Patricia Alvarado',  role: 'Colaborador',  text: '"Donar tiempo como nutricionista asesora fue una de las mejores decisiones de mi vida profesional. El impacto en salud es real."' }
    ],
    [
      { name: 'Pescador Don Aurelio',role:'Beneficiario',  text: '"El manglar está volviendo y con él los peces. Mis hijos podrán vivir de la pesca, algo que ya no creía posible hace dos años."' },
      { name: 'Turista Ecoresponsable',role:'Colaborador', text: '"Vine de viaje y me uní a una jornada de siembra. Esa mañana cambió mi forma de viajar y de pensar en los ecosistemas."' }
    ],
    [
      { name: 'Doña Rosario',       role: 'Beneficiario', text: '"Mis hijos ya no le tienen miedo al dentista porque aquí los tratan con mucho cuidado. Nunca antes habíamos tenido este servicio."' },
      { name: 'Interno de Odontología', role: 'Estudiante', text: '"Mis prácticas aquí fueron más retadoras y humanas que en cualquier clínica privada. Aprendí a trabajar con corazón."' }
    ]
  ];

  function seedPendingIfEmpty() {
    const list = getTestimonials();
    if (list.some(t => t.status === 'pending')) return; // already has pending
    const seeds = (PENDING_SEEDS[projId] || PENDING_SEEDS[0]).map((t, i) => ({
      id: Date.now() + i + 9000,
      name: t.name,
      role: t.role,
      text: t.text,
      avatar: null,
      status: 'pending',
      date: new Date(Date.now() - i * 3600000).toLocaleDateString('es-MX', { day:'numeric', month:'long', year:'numeric' })
    }));
    saveTestimonials([...list, ...seeds]);
  }

  let activeTab = 'pending';

  function renderPage() {
    const card = document.getElementById('m-card');

    if (!isLeader()) {
      card.innerHTML = `
        <div class="m-denied">
          <div class="m-denied-icon">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <h2>Acceso restringido</h2>
          <p>Esta sección es solo para el líder del proyecto. Debes iniciar sesión con las credenciales del líder para moderar los testimonios.</p>
          <a href="project-page.html?id=${projId}" class="btn-back-proj">Ir al proyecto</a>
        </div>`;
      return;
    }

    seedPendingIfEmpty();
    const all     = getTestimonials();
    const pending  = all.filter(t => t.status === 'pending');
    const approved = all.filter(t => t.status === 'approved');
    const rejected = all.filter(t => t.status === 'rejected');

    const list = activeTab === 'pending' ? pending : activeTab === 'approved' ? approved : rejected;

    card.innerHTML = `
      <div class="m-head">
        <div class="m-head-top">
          <a href="project-page.html?id=${projId}" class="m-back">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            ${projTitle}
          </a>
        </div>
        <h1>Moderación de testimonios</h1>
        <p>Revisa los testimonios enviados por los participantes y decide cuáles se publicarán en el proyecto.</p>
        <div class="m-tabs">
          <button class="m-tab ${activeTab === 'pending' ? 'active' : ''}" data-tab="pending">
            Pendientes <span class="m-tab-count">${pending.length}</span>
          </button>
          <button class="m-tab ${activeTab === 'approved' ? 'active' : ''}" data-tab="approved">
            Aprobados <span class="m-tab-count">${approved.length}</span>
          </button>
          <button class="m-tab ${activeTab === 'rejected' ? 'active' : ''}" data-tab="rejected">
            Rechazados <span class="m-tab-count">${rejected.length}</span>
          </button>
        </div>
      </div>
      <div class="m-body">
        ${list.length === 0 ? `
          <div class="m-empty">
            <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            <p>${activeTab === 'pending' ? 'No hay testimonios pendientes de revisión.' : activeTab === 'approved' ? 'No hay testimonios aprobados aún.' : 'No hay testimonios rechazados.'}</p>
          </div>` :
          list.map(t => `
            <div class="m-item ${activeTab !== 'pending' ? activeTab : ''}" data-id="${t.id}">
              <div class="m-item-head">
                <div class="m-avatar">${t.name[0].toUpperCase()}</div>
                <div class="m-info">
                  <div class="m-name">${t.name}</div>
                  <div class="m-role ${ROLE_CLASS[t.role] || ''}">${t.role}</div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                  ${activeTab !== 'pending' ? `<span class="m-status-badge ${activeTab}">${activeTab === 'approved' ? 'Aprobado' : 'Rechazado'}</span>` : ''}
                  <div class="m-date">${t.date}</div>
                </div>
              </div>
              <p class="m-text">${t.text}</p>
              ${activeTab === 'pending' ? `
                <div class="m-actions">
                  <button class="btn-reject" onclick="moderate(${t.id}, 'rejected')">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    Rechazar
                  </button>
                  <button class="btn-accept" onclick="moderate(${t.id}, 'approved')">
                    <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    Aceptar
                  </button>
                </div>` :
                activeTab === 'rejected' ? `
                <div class="m-actions">
                  <button class="btn-accept" onclick="moderate(${t.id}, 'approved')" style="font-size:.78rem;padding:6px 14px">
                    <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                    Aprobar
                  </button>
                </div>` : ''}
            </div>`).join('')
        }
      </div>`;

    // Tab click
    card.querySelectorAll('.m-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.tab;
        renderPage();
      });
    });
  }

  function moderate(id, status) {
    const list = getTestimonials();
    const item = list.find(t => t.id === id);
    if (item) item.status = status;
    saveTestimonials(list);
    renderPage();
  }

  renderPage();
