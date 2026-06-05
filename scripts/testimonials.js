  const PROJECTS_TITLES = ["Banco de Alimentos Universitario","Tutorías Académicas Gratuitas","Limpieza de Espacios Naturales","Brigadas de Salud Comunitaria","Construcción de Viviendas Dignas","Alfabetización Digital para Adultos","Huertos Urbanos Comunitarios","Centro de Apoyo Psicológico","Biblioteca Comunitaria Móvil","Taller de Arte y Expresión Joven","Red de Reciclaje Escolar","Emprendimiento Social Femenino","Cocinas Comunitarias Solidarias","Programa de Reforestación Costera","Clínica Dental Comunitaria"];

  const SEED_TESTIMONIALS = [
    [
      { name:'María García', role:'Voluntario', text:'"Participar en el banco de alimentos ha sido una experiencia transformadora. Ver las sonrisas de las familias cuando reciben sus despensas me llena de gratitud y propósito."', avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
      { name:'Carlos Mendoza', role:'Beneficiario', text:'"Gracias al banco de alimentos mi familia pudo superar un período muy difícil. La calidad y el cariño con que entregan los alimentos hace toda la diferencia."', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
      { name:'Ana Sánchez', role:'Colaborador', text:'"Como empresa donadora, ver el impacto directo de nuestra colaboración en las familias es increíblemente gratificante. El equipo es muy profesional."', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
      { name:'Roberto Flores', role:'Estudiante', text:'"Hice mi servicio social aquí y aprendí más sobre empatía y compromiso que en cualquier salón de clases. Lo recomiendo ampliamente a todos mis compañeros."', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' }
    ],
    [
      { name:'Sofía Ramírez', role:'Beneficiario', text:'"Las tutorías me ayudaron a pasar mis materias más difíciles. Los voluntarios son muy pacientes y explican todo con ejemplos que entiendo fácilmente."', avatar:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
      { name:'Jorge Martínez', role:'Voluntario', text:'"Dar clases de matemáticas a los niños me ha hecho mejor estudiante también. Cuando explicas algo con claridad, lo entiendes mucho mejor tú mismo."', avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
      { name:'Lucía Torres', role:'Estudiante', text:'"Gracias a las tutorías pude aprobar mi examen de secundaria con buenas calificaciones. Ahora quiero seguir estudiando y ser profesora también algún día."', avatar:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80' },
      { name:'Pedro Ángeles', role:'Colaborador', text:'"Apoyar este programa fue una de las mejores decisiones que tomamos. El impacto académico en los niños es real y medible."', avatar:'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80' }
    ],
    [
      { name:'Elena Vargas', role:'Voluntario', text:'"Cada jornada de limpieza me recuerda por qué elegí estudiar biología. Ver un espacio recuperado semana a semana es una recompensa incomparable."', avatar:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80' },
      { name:'Tomás Cruz', role:'Beneficiario', text:'"El parque de mi colonia ahora es un lugar donde mis hijos pueden jugar seguros. El proyecto cambió completamente nuestra calidad de vida."', avatar:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
      { name:'Valentina Ríos', role:'Estudiante', text:'"Vine a una jornada por mi clase de educación ambiental y me quedé como voluntaria. Esta comunidad me adoptó y yo adopté esta causa."', avatar:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80' }
    ],
    [
      { name:'Don Felipe', role:'Beneficiario', text:'"Por primera vez en años pude recibir atención médica sin pagar. La brigada me revisó, me dio medicamentos y me explicó cómo cuidar mi salud."', avatar:'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80' },
      { name:'Dra. Carmen Pérez', role:'Voluntario', text:'"Donar dos viernes al mes para atender a comunidades sin acceso médico me da una satisfacción que ningún consultorio privado puede igualar."', avatar:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80' },
      { name:'Miguel Santos', role:'Estudiante', text:'"Mis prácticas médicas con las brigadas fueron más enriquecedoras que cualquier hospital. Ves medicina real, humana y comprometida."', avatar:'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80' }
    ],
    [
      { name:'Familia Pérez', role:'Beneficiario', text:'"Tener una casa digna donde vivir con mis hijos es un sueño que este proyecto hizo realidad. Ahora tenemos paredes sólidas y un futuro más seguro."', avatar:'https://images.unsplash.com/photo-1491349174775-aaaefdd81942?w=100&q=80' },
      { name:'Santiago Mora', role:'Voluntario', text:'"No soy albañil pero aquí aprendí a construir y a construir comunidad. Ver una familia entrar a su nuevo hogar es algo que no olvidaré jamás."', avatar:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
      { name:'Andrea Leal', role:'Colaborador', text:'"Donamos materiales de construcción y recibimos fotos de las familias en sus nuevos hogares. El retorno emocional de esta inversión no tiene precio."', avatar:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&q=80' }
    ],
    [
      { name:'Don Ernesto', role:'Beneficiario', text:'"A mis 72 años pensé que nunca podría usar una computadora. Hoy videollamo a mis nietos que viven en otro país. Este programa me devolvió la conexión con mi familia."', avatar:'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=100&q=80' },
      { name:'Fernanda Mejía', role:'Voluntario', text:'"Enseñar tecnología a adultos mayores requiere paciencia y creatividad, pero cuando ves la alegría en su cara al mandar un mensaje sólo es gratificante."', avatar:'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80' },
      { name:'Ingrid Solano', role:'Colaborador', text:'"Donamos computadoras reacondicionadas y fue una de las mejores decisiones. Ver que equipos viejos generan nuevas oportunidades es inspirador."', avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }
    ],
    [
      { name:'Esperanza Núñez', role:'Beneficiario', text:'"Mi huerto en la azotea produce tomates, chiles y hierbas. Ahora como más sano y gasto menos. Nunca imaginé cultivar mis propios alimentos en la ciudad."', avatar:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
      { name:'Luis Aguirre', role:'Voluntario', text:'"Cada huerto instalado es un pequeño ecosistema que creamos juntos. Ver las plantas crecer y saber que esa familia come mejor me llena de satisfacción."', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80' },
      { name:'Claudia Fuentes', role:'Estudiante', text:'"Mi tesis fue sobre estos huertos y los datos de impacto nutricional son impresionantes. El proyecto es un modelo replicable para otras ciudades."', avatar:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80' }
    ],
    [
      { name:'Anónimo', role:'Beneficiario', text:'"Asistir a las sesiones de apoyo psicológico cambió mi vida. Por primera vez hablé de lo que sentía y encontré herramientas para manejar mis emociones."', avatar:null },
      { name:'Psic. Andrea Torres', role:'Voluntario', text:'"Atender a personas que de otra manera no tendrían acceso a terapia es el trabajo más significativo de mi carrera. El impacto es profundo y duradero."', avatar:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80' },
      { name:'Marcos Vidal', role:'Estudiante', text:'"Mi práctica clínica aquí me formó como profesional y como persona. El enfoque comunitario que aprendí guiará toda mi carrera."', avatar:'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80' }
    ],
    [
      { name:'Camila Ríos', role:'Beneficiario', text:'"Nunca había tenido un libro propio. Ahora leo todos los días y soy parte del club de lectura infantil. Los libros me abren mundos que nunca conocí."', avatar:'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80' },
      { name:'Prof. Ana Luna', role:'Voluntario', text:'"Ver a los niños esperar ansiosos la visita de la biblioteca móvil semana a semana es la mejor evidencia de que este proyecto importa."', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
      { name:'Ricardo Castillo', role:'Colaborador', text:'"Donamos 300 libros y recibimos cartas escritas por los niños que los están leyendo. Fue el regalo más hermoso que hemos recibido como empresa."', avatar:'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80' }
    ],
    [
      { name:'Diego Salinas', role:'Beneficiario', text:'"El taller de teatro literalmente me salvó. Estaba en malos pasos y aquí encontré un espacio seguro, amigos y una forma de expresarme que no imaginaba."', avatar:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
      { name:'Sofía Reyes', role:'Voluntario', text:'"Como artista visual, enseñar en este taller me recuerda por qué el arte importa. Ver a los jóvenes descubrir su voz creativa es increíble."', avatar:'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&q=80' },
      { name:'Valeria Moreno', role:'Estudiante', text:'"Mi fotografía fue seleccionada para la exposición del taller. Por primera vez sentí que mi trabajo artístico tenía valor y podía mover a las personas."', avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' }
    ],
    [
      { name:'Maestra Irma', role:'Colaborador', text:'"Desde que implementamos el programa de reciclaje, mis alumnos son verdaderos embajadores ambientales en sus casas. El cambio de mentalidad es real."', avatar:'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&q=80' },
      { name:'Benjamín Castro', role:'Estudiante', text:'"Fui a registrar el impacto del programa para mi tesis de ambiental y me quedé como voluntario. Los datos son impresionantes y el equipo es extraordinario."', avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
      { name:'Niña Abril, 10 años', role:'Beneficiario', text:'"Ahora en mi casa separamos la basura todos los días. Mi mamá dice que yo le enseñé y eso me hace sentir muy importante."', avatar:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80' }
    ],
    [
      { name:'Verónica López', role:'Beneficiario', text:'"Con la mentoría del programa lancé mi negocio de repostería. Ya tengo clientes fijos y estoy generando un ingreso estable para mis hijos por primera vez."', avatar:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
      { name:'Lic. Marco Reyes', role:'Voluntario', text:'"Mentorear a mujeres emprendedoras me ha dado perspectiva sobre la resiliencia humana. Su determinación para salir adelante es una lección diaria."', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
      { name:'Gabriela Fuentes', role:'Estudiante', text:'"Mi proyecto de fin de carrera fue diseñar el plan de negocios de tres emprendedoras del programa. Ahora los tres negocios son rentables."', avatar:'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80' }
    ],
    [
      { name:'Laura Mendoza', role:'Beneficiario', text:'"Cuando llegamos al comedor por primera vez, mi familia llevaba dos días sin comer bien. El calor humano de los voluntarios y la comida nutritiva nos dieron fuerzas para seguir."', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
      { name:'Rodrigo Pérez', role:'Voluntario', text:'"Cocinar para 200 personas cada día es un acto de amor colectivo. El equipo de voluntarios se ha convertido en mi segunda familia."', avatar:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80' },
      { name:'Chef Patricia Alvarado', role:'Colaborador', text:'"Donar mi tiempo como nutricionista asesora de las cocinas fue una de las mejores decisiones de mi vida profesional. El impacto en la salud comunitaria es real."', avatar:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80' },
      { name:'Juan Carlos Ríos', role:'Estudiante', text:'"Hice mis prácticas de nutrición en las cocinas y diseñé los menús semanales. Fue la experiencia práctica más valiosa de toda mi carrera."', avatar:'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&q=80' }
    ],
    [
      { name:'Pescador Don Aurelio', role:'Beneficiario', text:'"El manglar está volviendo y con él los peces. Mis hijos podrán vivir de la pesca como yo, cosa que ya no creía posible hace dos años."', avatar:'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&q=80' },
      { name:'Biol. Renata Cruz', role:'Voluntario', text:'"Cada plántula de manglar que sembramos es una apuesta por el futuro del ecosistema. Ver el litoral recuperarse mes a mes es una emoción científica única."', avatar:'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80' },
      { name:'Turista Ecoresponsable', role:'Colaborador', text:'"Vine de viaje y me uní a una jornada de siembra. Esa mañana cambió mi forma de viajar y de ver mi responsabilidad con los ecosistemas."', avatar:'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&q=80' }
    ],
    [
      { name:'Doña Rosario', role:'Beneficiario', text:'"Mis hijos ahora no tienen miedo al dentista porque aquí los tratan con mucho cuidado y sin dolor. Nunca habíamos tenido acceso a este servicio."', avatar:'https://images.unsplash.com/photo-1491349174775-aaaefdd81942?w=100&q=80' },
      { name:'Dr. Alejandro Vega', role:'Voluntario', text:'"Atender a niños que nunca han ido al dentista es un recordatorio de los privilegios que damos por sentados. Este voluntariado es mi forma de equilibrar esa balanza."', avatar:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
      { name:'Estudiante de Odontología', role:'Estudiante', text:'"Mis prácticas clínicas aquí fueron más desafiantes y enriquecedoras que en el hospital universitario. Aprendí a trabajar con los recursos disponibles y con mucho corazón."', avatar:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' }
    ]
  ];

  const ROLE_CLASS = { Beneficiario: 'role-beneficiario', Voluntario: 'role-voluntario', Estudiante: 'role-estudiante', Colaborador: 'role-colaborador' };

  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);
  const storageKey = `testimonials_${projId}`;
  const projTitle  = PROJECTS_TITLES[projId] || 'Proyectos Solidarios';

  // Seed if needed
  function seed() {
    const existing = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (existing) return;
    const seedData = (SEED_TESTIMONIALS[projId] || SEED_TESTIMONIALS[0]).map((t, i) => ({
      id: Date.now() + i,
      name: t.name,
      role: t.role,
      text: t.text,
      avatar: t.avatar || null,
      status: 'approved',
      date: new Date(Date.now() - (7 - i) * 86400000).toLocaleDateString('es-MX', { day:'numeric', month:'long', year:'numeric' })
    }));
    localStorage.setItem(storageKey, JSON.stringify(seedData));
  }
  seed();

  function getTestimonials() {
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  }

  // Set page title & back link
  document.title = `Testimonios - ${projTitle}`;
  document.getElementById('t-subtitle').textContent = projTitle;
  document.getElementById('t-back-link').href = `project-page.html?id=${projId}`;
  document.getElementById('t-submit-link').href = `submit-testimonial.html?id=${projId}`;

  let activeRole = '';

  function buildStats(all) {
    const approved = all.filter(t => t.status === 'approved');
    const counts = {};
    approved.forEach(t => { counts[t.role] = (counts[t.role] || 0) + 1; });
    const icons = {
      Voluntario:  `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
      Beneficiario:`<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
      Estudiante:  `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
      Colaborador: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
    };
    const row = document.getElementById('t-stat-row');
    row.innerHTML = Object.entries(counts).map(([role, count]) => `
      <div class="t-stat-chip">
        ${icons[role] || icons.Colaborador}
        <div>
          <div class="sc-num">${count}</div>
          <div class="sc-lbl">${role}${count !== 1 ? 's' : ''}</div>
        </div>
      </div>`).join('');
  }

  function renderCards(filter) {
    const all = getTestimonials().filter(t => t.status === 'approved');
    const list = filter ? all.filter(t => t.role === filter) : all;
    const grid = document.getElementById('t-grid');
    if (!list.length) {
      grid.innerHTML = '<div class="t-empty">No hay testimonios en esta categoría aún.</div>';
      return;
    }
    grid.innerHTML = list.map(t => {
      const avatarEl = t.avatar
        ? `<img class="t-avatar" src="${t.avatar}" alt="${t.name}" loading="lazy">`
        : `<div class="t-avatar-init">${t.name[0].toUpperCase()}</div>`;
      return `
        <div class="t-card">
          <div class="t-card-head">
            ${avatarEl}
            <div class="t-info">
              <div class="t-name">${t.name}</div>
              <div class="t-role ${ROLE_CLASS[t.role] || ''}">${t.role}</div>
              <div class="t-proj-name">${projTitle}</div>
            </div>
            <svg class="t-quote-icon" width="26" height="26" fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
          </div>
          <p class="t-text">${t.text}</p>
          <div class="t-date">${t.date}</div>
        </div>`;
    }).join('');
  }

  buildStats(getTestimonials());
  renderCards('');

  document.querySelectorAll('.t-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.t-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeRole = btn.dataset.role;
      renderCards(activeRole);
    });
  });
