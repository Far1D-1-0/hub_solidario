  /* ─── PROJECT DATA ──────────────────────────────────────────── */
  const PROJECTS = [
    {
      title: 'Banco de Alimentos Universitario',
      desc: 'Recolección y distribución de alimentos para familias de la comunidad universitaria en situación vulnerable. Cada semana repartimos más de 200 despensas a quienes más lo necesitan.',
      category: 'Alimentación y Nutrición',
      img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80',
      leader: 'María González',
      location: 'Campus Norte',
      volunteers: 45,
      about: 'El Banco de Alimentos Universitario nació en 2019 como respuesta a la inseguridad alimentaria dentro y alrededor del campus. Trabajamos junto a estudiantes, docentes y empresas locales para recuperar alimentos en buen estado y distribuirlos a familias que lo necesitan. Nuestro modelo integra voluntarios universitarios, redes de donación y logística eficiente para maximizar el impacto.',
      objectives: ['Recolectar y distribuir más de 200 despensas semanales a familias vulnerables','Reducir el desperdicio de alimentos en el campus universitario','Crear una red de donantes locales y empresas comprometidas con la comunidad','Fomentar la conciencia sobre la seguridad alimentaria entre estudiantes'],
      community: 'Atendemos principalmente a familias de colonias populares aledañas al campus, incluyendo trabajadores informales, adultos mayores en situación de abandono y madres solteras con hijos menores. Contamos con un padrón activo de 520 beneficiarios directos y aproximadamente 1,800 beneficiarios indirectos.',
      operation: { schedule: 'Lunes a Viernes\n8:00 - 18:00 hrs', locations: '2 centros de acopio\nCampus Norte', participation: 'Voluntariado abierto\nDonaciones en especie' },
      stats: { beneficiaries: { value: 520, label: 'Beneficiarios', change: '+24% vs. inicio', type: 'pos' }, volunteers: { value: 45, label: 'Voluntarios', change: '+8 este mes', type: 'pos' }, activities: { value: 58, label: 'Actividades', period: 'Último semestre' }, metric4: { value: '10,400', label: 'Despensas repartidas', period: 'Total proyecto' } },
      progress: [{ label: 'Meta de beneficiarios (520/600)', pct: 87 },{ label: 'Objetivo de voluntarios (45/50)', pct: 90 },{ label: 'Metas de actividades (58/70)', pct: 83 },{ label: 'Despensas anuales (10,400/12,000)', pct: 87 }],
      content: { articles: 9, testimonials: 22, kpis: 11 },
      publications: [{ title: 'Récord mensual: 250 despensas en una semana', date: '12 de marzo, 2026', type: 'Artículo' },{ title: '"Este apoyo cambió nuestra semana" - Testimonio de Laura P.', date: '5 de marzo, 2026', type: 'Testimonio' },{ title: 'Informe de impacto - Febrero 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [440,460,465,475,470,476], activities: [8,10,12,11,14,9] }
    },
    {
      title: 'Tutorías Académicas Gratuitas',
      desc: 'Apoyo educativo personalizado para niños y jóvenes de comunidades con bajos recursos. Ofrecemos clases de matemáticas, español, inglés y ciencias con voluntarios universitarios.',
      category: 'Educación y Tutorías',
      img: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=900&q=80',
      leader: 'Carlos Ramírez',
      location: 'Comunidad San Pedro',
      volunteers: 28,
      about: 'Tutorías Académicas Gratuitas surgió en 2020 para cerrar la brecha educativa en comunidades marginadas. Nuestros voluntarios universitarios dedican tiempo cada semana para reforzar conocimientos, preparar a estudiantes para exámenes y acompañarlos en su trayectoria escolar.',
      objectives: ['Brindar apoyo educativo gratuito a 300 niños y jóvenes por ciclo escolar','Mejorar el promedio académico de los estudiantes participantes en al menos 1.5 puntos','Prevenir la deserción escolar en zonas de alta vulnerabilidad','Capacitar a voluntarios universitarios en técnicas de enseñanza efectiva'],
      community: 'Servimos a niños y jóvenes de primaria y secundaria de la Comunidad San Pedro, una zona periurbana con acceso limitado a escuelas de calidad. El 70% de los estudiantes atendidos son primera generación en continuar estudios más allá de secundaria.',
      operation: { schedule: 'Lunes a Sábado\n14:00 - 18:00 hrs', locations: '3 salones habilitados\nComunidad San Pedro', participation: 'Voluntariado universitario\nInscripción gratuita' },
      stats: { beneficiaries: { value: 310, label: 'Estudiantes activos', change: '+18% vs. inicio', type: 'pos' }, volunteers: { value: 28, label: 'Tutores voluntarios', change: '+5 este mes', type: 'pos' }, activities: { value: 48, label: 'Sesiones', period: 'Este mes' }, metric4: { value: '1,440', label: 'Horas de tutoría', period: 'Total ciclo' } },
      progress: [{ label: 'Meta de estudiantes (310/350)', pct: 89 },{ label: 'Voluntarios tutores (28/35)', pct: 80 },{ label: 'Sesiones programadas (48/60)', pct: 80 },{ label: 'Horas de tutoría (1,440/2,000)', pct: 72 }],
      content: { articles: 7, testimonials: 18, kpis: 8 },
      publications: [{ title: 'Estudiante de San Pedro gana olimpiada municipal de matemáticas', date: '10 de marzo, 2026', type: 'Artículo' },{ title: '"Gracias a las tutorías pasé mi examen" - Carlos, 13 años', date: '4 de marzo, 2026', type: 'Testimonio' },{ title: 'Reporte mensual de avance académico - Feb 2026', date: '28 de febrero, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [260,275,280,295,305,310], activities: [40,45,38,50,52,48] }
    },
    {
      title: 'Limpieza de Espacios Naturales',
      desc: 'Jornadas de limpieza y reforestación en parques, playas y áreas verdes urbanas. Hemos recuperado más de 15 espacios públicos y plantado 800 árboles nativos.',
      category: 'Medio Ambiente',
      img: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=900&q=80',
      leader: 'Ana Martínez',
      location: 'Playa del Carmen',
      volunteers: 52,
      about: 'Limpieza de Espacios Naturales es una iniciativa ciudadana que moviliza a voluntarios para recuperar parques, playas y áreas verdes degradadas por el abandono y la contaminación. Combinamos la acción directa con talleres de educación ambiental para generar conciencia duradera.',
      objectives: ['Recuperar y mantener limpios 20 espacios naturales en la región','Plantar 1,000 árboles nativos en zonas degradadas','Sensibilizar a la comunidad sobre el cuidado del medio ambiente','Reducir la basura en espacios públicos en un 40%'],
      community: 'Trabajamos con comunidades costeras, familias de colonias aledañas a parques urbanos y escuelas primarias que participan como co-gestores de los espacios recuperados. Más de 200 familias han adoptado espacios verdes como propios.',
      operation: { schedule: 'Sábados y Domingos\n7:00 - 13:00 hrs', locations: '15+ espacios recuperados\nPlaya del Carmen', participation: 'Voluntariado abierto\nActividades familiares' },
      stats: { beneficiaries: { value: 2400, label: 'Beneficiarios indirectos', change: '+35% vs. inicio', type: 'pos' }, volunteers: { value: 52, label: 'Voluntarios activos', change: '+12 este mes', type: 'pos' }, activities: { value: 72, label: 'Jornadas realizadas', period: 'Total proyecto' }, metric4: { value: '800+', label: 'Árboles plantados', period: 'Total proyecto' } },
      progress: [{ label: 'Espacios recuperados (15/20)', pct: 75 },{ label: 'Árboles plantados (800/1,000)', pct: 80 },{ label: 'Voluntarios activos (52/60)', pct: 87 },{ label: 'Reducción de basura (28%/40%)', pct: 70 }],
      content: { articles: 11, testimonials: 15, kpis: 9 },
      publications: [{ title: 'Jornada récord: 120 voluntarios en playa norte', date: '15 de marzo, 2026', type: 'Artículo' },{ title: '"Mi familia viene cada sábado, es parte de nuestra vida" - Sofía', date: '8 de marzo, 2026', type: 'Testimonio' },{ title: 'Informe ambiental Q1 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [1800,2000,2100,2200,2350,2400], activities: [10,12,8,14,15,13] }
    },
    {
      title: 'Brigadas de Salud Comunitaria',
      desc: 'Servicios médicos básicos, vacunación y campañas de prevención en comunidades rurales sin acceso a atención médica formal. Atendemos más de 300 pacientes por mes.',
      category: 'Salud y Bienestar',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80',
      leader: 'Dr. Luis Torres',
      location: 'Comunidad Rural',
      volunteers: 34,
      about: 'Las Brigadas de Salud Comunitaria llevan atención médica de calidad a comunidades rurales aisladas que carecen de acceso a servicios de salud formales. Con médicos, enfermeros y promotores de salud voluntarios, organizamos jornadas médicas integrales que incluyen consulta general, vacunación y orientación nutricional.',
      objectives: ['Atender a 400 pacientes mensuales en comunidades sin acceso a salud','Vacunar al 80% de la población infantil en zonas de cobertura','Capacitar a 50 promotores de salud comunitaria','Reducir la tasa de enfermedades prevenibles en zonas atendidas'],
      community: 'Servimos a comunidades rurales de difícil acceso, principalmente adultos mayores, niños y mujeres embarazadas que no tienen opciones de atención médica a menos de 2 horas de distancia. Nuestro padrón activo incluye 1,200 pacientes registrados.',
      operation: { schedule: 'Jueves y Viernes\n8:00 - 17:00 hrs', locations: '5 comunidades rurales\nZona serrana', participation: 'Voluntariado médico\nDonación de medicamentos' },
      stats: { beneficiaries: { value: 1200, label: 'Pacientes registrados', change: '+22% vs. inicio', type: 'pos' }, volunteers: { value: 34, label: 'Personal de salud', change: '+4 este mes', type: 'pos' }, activities: { value: 86, label: 'Jornadas médicas', period: 'Total proyecto' }, metric4: { value: '3,800', label: 'Consultas realizadas', period: 'Total proyecto' } },
      progress: [{ label: 'Meta de pacientes (1,200/1,500)', pct: 80 },{ label: 'Cobertura de vacunación (68%/80%)', pct: 85 },{ label: 'Promotores capacitados (35/50)', pct: 70 },{ label: 'Jornadas mensuales (86/120)', pct: 72 }],
      content: { articles: 8, testimonials: 24, kpis: 14 },
      publications: [{ title: 'Campaña de vacunación: 200 niños inmunizados en un día', date: '14 de marzo, 2026', type: 'Artículo' },{ title: '"El doctor llegó por primera vez a nuestra comunidad" - Doña Rosa', date: '6 de marzo, 2026', type: 'Testimonio' },{ title: 'Estadísticas de salud comunitaria - Febrero 2026', date: '28 de febrero, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [900,980,1050,1100,1160,1200], activities: [12,14,10,16,18,16] }
    },
    {
      title: 'Construcción de Viviendas Dignas',
      desc: 'Proyecto de construcción y mejoramiento de viviendas para familias en situación de vulnerabilidad extrema. En el último año hemos edificado 18 hogares con materiales de calidad.',
      category: 'Construcción y Vivienda',
      img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
      leader: 'Roberto Sánchez',
      location: 'Colonia Esperanza',
      volunteers: 19,
      about: 'Construcción de Viviendas Dignas trabaja para garantizar que todas las familias tengan un techo seguro. Junto a voluntarios con y sin experiencia en construcción, edificamos y mejoramos viviendas para familias en situación de pobreza extrema, priorizando aquellas con niños, adultos mayores o personas con discapacidad.',
      objectives: ['Construir 25 viviendas nuevas para familias sin hogar digno en el año','Mejorar 40 viviendas existentes con reparaciones estructurales urgentes','Garantizar acceso a agua potable y saneamiento en cada hogar intervenido','Capacitar a beneficiarios en mantenimiento básico del hogar'],
      community: 'Trabajamos en la Colonia Esperanza, una zona periurbana con alta concentración de familias en pobreza extrema, muchas de las cuales viven en construcciones precarias de cartón, lámina o madera. Priorizamos familias con menores de edad y adultos mayores.',
      operation: { schedule: 'Sábados y Domingos\n7:00 - 16:00 hrs', locations: 'Colonia Esperanza\nZona periurbana', participation: 'Voluntariado abierto\nDonación de materiales' },
      stats: { beneficiaries: { value: 90, label: 'Familias beneficiadas', change: '+45% vs. inicio', type: 'pos' }, volunteers: { value: 19, label: 'Voluntarios activos', change: '+3 este mes', type: 'pos' }, activities: { value: 18, label: 'Viviendas construidas', period: 'Total proyecto' }, metric4: { value: '37', label: 'Mejoras realizadas', period: 'Total proyecto' } },
      progress: [{ label: 'Viviendas nuevas (18/25)', pct: 72 },{ label: 'Mejoras realizadas (37/40)', pct: 93 },{ label: 'Familias con agua potable (72/90)', pct: 80 },{ label: 'Presupuesto ejecutado (78%/100%)', pct: 78 }],
      content: { articles: 6, testimonials: 19, kpis: 7 },
      publications: [{ title: 'Familia Pérez recibe las llaves de su nuevo hogar', date: '11 de marzo, 2026', type: 'Artículo' },{ title: '"Ahora mis hijos tienen un cuarto propio" - Martina', date: '3 de marzo, 2026', type: 'Testimonio' },{ title: 'Avance de construcción - Trimestre 1, 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [55,62,68,75,85,90], activities: [2,3,4,3,4,2] }
    },
    {
      title: 'Alfabetización Digital para Adultos',
      desc: 'Capacitación en tecnología, internet y herramientas digitales para adultos mayores y personas sin acceso previo. Más de 120 participantes certificados hasta la fecha.',
      category: 'Tecnología e Inclusión Digital',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&q=80',
      leader: 'Ing. Fernanda López',
      location: 'Centro Comunitario',
      volunteers: 23,
      about: 'Alfabetización Digital para Adultos cierra la brecha tecnológica para personas mayores y adultos sin educación digital. Enseñamos desde el uso del smartphone hasta videollamadas, trámites en línea y prevención de fraudes digitales, empoderando a los participantes para aprovechar la tecnología de forma segura.',
      objectives: ['Certificar a 200 adultos mayores en competencias digitales básicas','Enseñar el uso seguro de internet, redes sociales y trámites en línea','Reducir el aislamiento social a través de la comunicación digital','Capacitar a instructores voluntarios en andragogía y alfabetización digital'],
      community: 'Servimos a adultos mayores de 60 años y más, así como a adultos de cualquier edad sin acceso previo a tecnología, provenientes de colonias populares del municipio. Muchos de nuestros participantes aprenden a videollamar a sus familias por primera vez.',
      operation: { schedule: 'Martes y Jueves\n10:00 - 13:00 hrs', locations: '2 centros comunitarios\nMunicipio centro', participation: 'Clases gratuitas\nPréstamo de equipos' },
      stats: { beneficiaries: { value: 145, label: 'Participantes activos', change: '+20% vs. inicio', type: 'pos' }, volunteers: { value: 23, label: 'Instructores', change: '+2 este mes', type: 'pos' }, activities: { value: 64, label: 'Talleres impartidos', period: 'Total proyecto' }, metric4: { value: '120', label: 'Certificados otorgados', period: 'Total proyecto' } },
      progress: [{ label: 'Meta de certificados (120/200)', pct: 60 },{ label: 'Instructores formados (23/30)', pct: 77 },{ label: 'Talleres impartidos (64/100)', pct: 64 },{ label: 'Equipos disponibles (18/25)', pct: 72 }],
      content: { articles: 5, testimonials: 16, kpis: 9 },
      publications: [{ title: 'Doña Carmen, 78 años, aprende a videollamar a su nieta', date: '9 de marzo, 2026', type: 'Artículo' },{ title: '"Pensé que nunca podría usar una computadora" - Don Ernesto', date: '2 de marzo, 2026', type: 'Testimonio' },{ title: 'Informe de certificaciones - Febrero 2026', date: '28 de febrero, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [95,108,115,122,138,145], activities: [9,11,8,12,13,11] }
    },
    {
      title: 'Huertos Urbanos Comunitarios',
      desc: 'Diseño, instalación y mantenimiento de huertos orgánicos en azoteas y espacios urbanos. Promovemos la soberanía alimentaria, el compostaje y la agricultura sostenible.',
      category: 'Medio Ambiente',
      img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80',
      leader: 'Diana Herrera',
      location: 'Parque Central',
      volunteers: 31,
      about: 'Huertos Urbanos Comunitarios lleva la producción de alimentos frescos y saludables al corazón de la ciudad. Instalamos huertos en azoteas, patios y espacios comunitarios, enseñando a las familias a cultivar sus propios alimentos de forma orgánica y sostenible, reduciendo costos y mejorando su nutrición.',
      objectives: ['Instalar 30 huertos urbanos en hogares y espacios comunitarios','Capacitar a 150 familias en técnicas de agricultura urbana orgánica','Producir 2 toneladas de alimentos frescos por ciclo','Implementar sistemas de compostaje en cada huerto'],
      community: 'Trabajamos con familias de colonias densamente urbanizadas sin acceso a espacios verdes ni alimentos frescos asequibles. Especial enfoque en madres de familia y adultos mayores interesados en cultivar sus propios alimentos.',
      operation: { schedule: 'Miércoles y Sábados\n8:00 - 12:00 hrs', locations: '22 huertos activos\nZona urbana', participation: 'Talleres gratuitos\nSemillas donadas' },
      stats: { beneficiaries: { value: 180, label: 'Familias con huerto', change: '+30% vs. inicio', type: 'pos' }, volunteers: { value: 31, label: 'Voluntarios activos', change: '+6 este mes', type: 'pos' }, activities: { value: 22, label: 'Huertos activos', period: 'Total proyecto' }, metric4: { value: '1.4 ton', label: 'Alimentos producidos', period: 'Este ciclo' } },
      progress: [{ label: 'Huertos instalados (22/30)', pct: 73 },{ label: 'Familias capacitadas (180/150)', pct: 100 },{ label: 'Producción (1.4/2 ton)', pct: 70 },{ label: 'Sistemas de compostaje (18/22)', pct: 82 }],
      content: { articles: 8, testimonials: 20, kpis: 10 },
      publications: [{ title: 'Primer mercado de productos de huertos urbanos en el parque', date: '13 de marzo, 2026', type: 'Artículo' },{ title: '"Ahora comemos verduras frescas todos los días" - Familia López', date: '7 de marzo, 2026', type: 'Testimonio' },{ title: 'Reporte de producción Q1 2026', date: '2 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [120,135,148,160,172,180], activities: [3,4,4,4,4,3] }
    },
    {
      title: 'Centro de Apoyo Psicológico',
      desc: 'Atención psicológica gratuita e individual para personas en situación de vulnerabilidad. Contamos con profesionales certificados, grupos de apoyo y talleres de bienestar mental.',
      category: 'Salud y Bienestar',
      img: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=900&q=80',
      leader: 'Psic. Claudia Vega',
      location: 'Clínica Comunitaria',
      volunteers: 15,
      about: 'El Centro de Apoyo Psicológico ofrece atención de salud mental gratuita y de calidad a personas que no pueden costear servicios privados. Con un equipo de psicólogos clínicos voluntarios, brindamos consultas individuales, terapia de grupo, talleres de mindfulness y orientación en crisis.',
      objectives: ['Brindar 500 consultas psicológicas gratuitas por trimestre','Operar 4 grupos de apoyo semanales para distintas problemáticas','Capacitar a la comunidad en primeros auxilios psicológicos','Reducir el estigma sobre la salud mental en las comunidades atendidas'],
      community: 'Atendemos a personas adultas en situación de vulnerabilidad: víctimas de violencia, personas con depresión y ansiedad sin recursos, jóvenes en riesgo y adultos mayores en aislamiento. El 60% de nuestros consultantes son mujeres.',
      operation: { schedule: 'Lunes a Viernes\n9:00 - 18:00 hrs', locations: '1 clínica comunitaria\nZona centro', participation: 'Citas gratuitas\nGrupos abiertos' },
      stats: { beneficiaries: { value: 280, label: 'Pacientes atendidos', change: '+15% vs. inicio', type: 'pos' }, volunteers: { value: 15, label: 'Psicólogos voluntarios', change: '+2 este mes', type: 'pos' }, activities: { value: 340, label: 'Consultas realizadas', period: 'Este trimestre' }, metric4: { value: '4', label: 'Grupos de apoyo activos', period: 'Semanales' } },
      progress: [{ label: 'Consultas trimestrales (340/500)', pct: 68 },{ label: 'Grupos de apoyo (4/4)', pct: 100 },{ label: 'Pacientes activos (280/350)', pct: 80 },{ label: 'Capacitaciones en PAP (6/10)', pct: 60 }],
      content: { articles: 6, testimonials: 30, kpis: 8 },
      publications: [{ title: 'Taller de manejo de ansiedad: 40 participantes', date: '10 de marzo, 2026', type: 'Artículo' },{ title: '"La terapia me devolvió las ganas de vivir" - Anónimo', date: '4 de marzo, 2026', type: 'Testimonio' },{ title: 'Reporte de salud mental comunitaria - Febrero 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [220,235,248,258,270,280], activities: [50,60,55,70,80,75] }
    },
    {
      title: 'Biblioteca Comunitaria Móvil',
      desc: 'Llevamos libros, cuentos y material didáctico a comunidades sin acceso a bibliotecas. Organizamos clubes de lectura infantil y talleres de escritura creativa para todas las edades.',
      category: 'Educación y Tutorías',
      img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=900&q=80',
      leader: 'Prof. Miguel Ángel Ruiz',
      location: 'Barrio Sur',
      volunteers: 22,
      about: 'La Biblioteca Comunitaria Móvil lleva el amor por la lectura a donde más se necesita. Con una unidad equipada con más de 2,000 títulos, recorremos colonias y comunidades rurales llevando libros prestados gratuitamente, clubes de lectura y talleres literarios para niños, jóvenes y adultos.',
      objectives: ['Prestar más de 500 libros mensuales en comunidades sin biblioteca','Mantener 6 clubes de lectura infantil activos de forma simultánea','Promover la escritura creativa en jóvenes de comunidades marginadas','Crear 3 bibliotecas fijas en escuelas de la zona'],
      community: 'Servimos a niños y jóvenes del Barrio Sur y colonias aledañas, así como a comunidades rurales en días de visita especial. Muchos de nuestros lectores habituales nunca habían tenido un libro propio antes de conocernos.',
      operation: { schedule: 'Martes a Sábado\n10:00 - 17:00 hrs', locations: '8 puntos de visita\nBarrio Sur y periurbano', participation: 'Préstamo gratuito\nClubs abiertos' },
      stats: { beneficiaries: { value: 420, label: 'Lectores activos', change: '+28% vs. inicio', type: 'pos' }, volunteers: { value: 22, label: 'Voluntarios', change: '+4 este mes', type: 'pos' }, activities: { value: 96, label: 'Visitas realizadas', period: 'Total proyecto' }, metric4: { value: '4,800', label: 'Libros prestados', period: 'Total proyecto' } },
      progress: [{ label: 'Lectores activos (420/500)', pct: 84 },{ label: 'Clubes de lectura (6/6)', pct: 100 },{ label: 'Libros mensuales (480/500)', pct: 96 },{ label: 'Bibliotecas fijas (1/3)', pct: 33 }],
      content: { articles: 10, testimonials: 25, kpis: 8 },
      publications: [{ title: 'Niña de 9 años gana concurso regional de cuentos', date: '12 de marzo, 2026', type: 'Artículo' },{ title: '"Los libros me abrieron un mundo nuevo" - Sebastián, 11 años', date: '5 de marzo, 2026', type: 'Testimonio' },{ title: 'Estadísticas de lectura - Febrero 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [310,345,360,385,405,420], activities: [14,16,12,18,20,16] }
    },
    {
      title: 'Taller de Arte y Expresión Joven',
      desc: 'Talleres semanales de pintura, teatro, música y fotografía para jóvenes en zonas de riesgo. El arte como herramienta de transformación social, prevención y desarrollo personal.',
      category: 'Arte y Cultura',
      img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=80',
      leader: 'Sofía Ramos',
      location: 'Centro Cultural',
      volunteers: 27,
      about: 'El Taller de Arte y Expresión Joven usa el arte como herramienta poderosa de transformación social. Ofrecemos talleres gratuitos de pintura, teatro, música y fotografía para jóvenes de 12 a 22 años en zonas con alta incidencia de violencia y deserción escolar, generando espacios seguros de expresión y comunidad.',
      objectives: ['Mantener 200 jóvenes activos en talleres artísticos de forma continua','Realizar 4 exposiciones y presentaciones públicas por año','Usar el arte como prevención de violencia y adicciones','Vincular a jóvenes talentosos con oportunidades de becas y empleos culturales'],
      community: 'Trabajamos con jóvenes de 12 a 22 años en zonas de alta marginación con escasa oferta cultural. El 40% de nuestros participantes son jóvenes que abandonaron la escuela y el taller se convierte en su principal espacio de desarrollo.',
      operation: { schedule: 'Lunes a Sábado\n14:00 - 19:00 hrs', locations: 'Centro Cultural\nZona norte', participation: 'Talleres gratuitos\nMateriales incluidos' },
      stats: { beneficiaries: { value: 195, label: 'Jóvenes activos', change: '+22% vs. inicio', type: 'pos' }, volunteers: { value: 27, label: 'Artistas voluntarios', change: '+5 este mes', type: 'pos' }, activities: { value: 80, label: 'Talleres impartidos', period: 'Este ciclo' }, metric4: { value: '8', label: 'Exposiciones realizadas', period: 'Total proyecto' } },
      progress: [{ label: 'Jóvenes activos (195/200)', pct: 98 },{ label: 'Talleres del ciclo (80/96)', pct: 83 },{ label: 'Exposiciones (8/4 anuales)', pct: 100 },{ label: 'Becas gestionadas (12/20)', pct: 60 }],
      content: { articles: 13, testimonials: 28, kpis: 9 },
      publications: [{ title: 'Exposición "Voces Jóvenes" reúne a 300 visitantes', date: '14 de marzo, 2026', type: 'Artículo' },{ title: '"El taller me salvó de la calle" - Diego, 17 años', date: '6 de marzo, 2026', type: 'Testimonio' },{ title: 'Informe de impacto cultural - Febrero 2026', date: '28 de febrero, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [148,160,168,178,188,195], activities: [12,14,10,15,16,13] }
    },
    {
      title: 'Red de Reciclaje Escolar',
      desc: 'Programa integral de separación, recolección y reciclaje de residuos en escuelas primarias y secundarias. Hemos evitado el envío de más de 5 toneladas de basura al vertedero este ciclo.',
      category: 'Medio Ambiente',
      img: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&q=80',
      leader: 'Tomás Guerrero',
      location: 'Escuelas Municipales',
      volunteers: 38,
      about: 'La Red de Reciclaje Escolar transforma a las escuelas en agentes de cambio ambiental. Implementamos programas completos de separación de residuos, educación ambiental y recolección periódica en escuelas primarias y secundarias, formando a estudiantes como líderes ambientales en sus comunidades.',
      objectives: ['Implementar el programa en 25 escuelas del municipio','Capacitar a 2,000 estudiantes como promotores ambientales','Evitar el envío de 10 toneladas de residuos al vertedero en el ciclo','Instalar estaciones de reciclaje en cada escuela participante'],
      community: 'Trabajamos con la comunidad educativa: estudiantes, docentes y padres de familia de escuelas públicas del municipio. Los estudiantes capacitados llevan los hábitos de reciclaje a sus hogares, multiplicando el impacto.',
      operation: { schedule: 'Visitas semanales\nDías hábiles escolares', locations: '18 escuelas activas\nMunicipio completo', participation: 'Brigadas escolares\nPadres de familia' },
      stats: { beneficiaries: { value: 3200, label: 'Estudiantes participantes', change: '+40% vs. inicio', type: 'pos' }, volunteers: { value: 38, label: 'Voluntarios activos', change: '+8 este mes', type: 'pos' }, activities: { value: 18, label: 'Escuelas activas', period: 'Total proyecto' }, metric4: { value: '5.2 ton', label: 'Residuos reciclados', period: 'Este ciclo' } },
      progress: [{ label: 'Escuelas incorporadas (18/25)', pct: 72 },{ label: 'Estudiantes capacitados (3,200/5,000)', pct: 64 },{ label: 'Residuos reciclados (5.2/10 ton)', pct: 52 },{ label: 'Estaciones instaladas (18/25)', pct: 72 }],
      content: { articles: 9, testimonials: 18, kpis: 12 },
      publications: [{ title: '5 toneladas de residuos reciclados: un hito del programa', date: '11 de marzo, 2026', type: 'Artículo' },{ title: '"Ahora separamos la basura en casa también" - Mamá de alumno', date: '5 de marzo, 2026', type: 'Testimonio' },{ title: 'Informe ambiental escolar - Q1 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [1800,2200,2500,2800,3050,3200], activities: [12,15,10,16,18,17] }
    },
    {
      title: 'Emprendimiento Social Femenino',
      desc: 'Capacitación en habilidades empresariales, finanzas y mercadeo para mujeres en situación de vulnerabilidad. Hemos apoyado el lanzamiento de 35 microempresas en la región.',
      category: 'Educación y Tutorías',
      img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=900&q=80',
      leader: 'Patricia Morales',
      location: 'Cooperativa Local',
      volunteers: 41,
      about: 'Emprendimiento Social Femenino empodera a mujeres en situación de vulnerabilidad para que desarrollen sus propios negocios sostenibles. Ofrecemos capacitaciones en administración, finanzas personales, marketing digital y acceso a crédito, acompañando cada emprendimiento desde la idea hasta su consolidación.',
      objectives: ['Lanzar 50 microempresas lideradas por mujeres en la región','Capacitar a 200 mujeres en habilidades empresariales básicas','Conectar a emprendedoras con redes de financiamiento y mercados','Lograr que el 60% de las microempresas sean autosustentables al año'],
      community: 'Servimos a mujeres de 20 a 55 años en situación de vulnerabilidad económica, muchas de ellas jefas de hogar sin ingresos formales. Priorizamos mujeres en condición de pobreza, víctimas de violencia doméstica en proceso de recuperación y mujeres rurales.',
      operation: { schedule: 'Martes y Jueves\n10:00 - 14:00 hrs', locations: 'Cooperativa Local\nZona sur', participation: 'Talleres gratuitos\nMentoría personalizada' },
      stats: { beneficiaries: { value: 188, label: 'Mujeres capacitadas', change: '+35% vs. inicio', type: 'pos' }, volunteers: { value: 41, label: 'Mentores voluntarios', change: '+9 este mes', type: 'pos' }, activities: { value: 35, label: 'Microempresas lanzadas', period: 'Total proyecto' }, metric4: { value: '22', label: 'Negocios autosustentables', period: 'Total proyecto' } },
      progress: [{ label: 'Microempresas lanzadas (35/50)', pct: 70 },{ label: 'Mujeres capacitadas (188/200)', pct: 94 },{ label: 'Negocios sustentables (22/30)', pct: 73 },{ label: 'Mentoría activa (35/50)', pct: 70 }],
      content: { articles: 12, testimonials: 32, kpis: 11 },
      publications: [{ title: 'Feria de emprendedoras: 35 negocios presentaron sus productos', date: '15 de marzo, 2026', type: 'Artículo' },{ title: '"Mi negocio de costura me dio independencia" - Verónica', date: '8 de marzo, 2026', type: 'Testimonio' },{ title: 'Reporte de emprendimiento Q1 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [120,138,152,165,178,188], activities: [5,6,5,7,7,5] }
    },
    {
      title: 'Cocinas Comunitarias Solidarias',
      desc: 'Red de cocinas barriales que preparan comidas nutritivas para adultos mayores y familias en situación de pobreza alimentaria. Servimos más de 500 porciones diarias.',
      category: 'Alimentación y Nutrición',
      img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80',
      leader: 'Rosa Elena Fuentes',
      location: 'Barrio Tepito',
      volunteers: 33,
      about: 'Cocinas Comunitarias Solidarias nació en 2020 como respuesta a la crisis alimentaria agravada por la pandemia. Operamos tres cocinas comunitarias en el Barrio Tepito que sirven más de 500 comidas diarias, preparadas con ingredientes frescos y nutritivos por voluntarios y cocineros profesionales que donan su tiempo.',
      objectives: ['Proporcionar al menos una comida nutritiva diaria a 500 familias en situación vulnerable','Crear espacios de encuentro comunitario que fortalezcan el tejido social','Educar sobre nutrición y hábitos alimenticios saludables','Generar oportunidades de voluntariado y participación ciudadana'],
      community: 'El proyecto atiende principalmente a familias de colonias populares en la zona oriente, incluyendo adultos mayores en condición de abandono, madres solteras con hijos pequeños, personas en situación de calle y trabajadores informales con ingresos insuficientes. Contamos con un padrón activo de 520 beneficiarios directos y aproximadamente 1,800 beneficiarios indirectos.',
      operation: { schedule: 'Lunes a Domingo\n12:00 - 15:00 hrs', locations: '3 comedores activos\nZona oriente', participation: 'Voluntariado abierto\nDonaciones en especie' },
      stats: { beneficiaries: { value: 520, label: 'Beneficiarios', change: '+24% vs. inicio', type: 'pos' }, volunteers: { value: 47, label: 'Voluntarios', change: '+12 este mes', type: 'pos' }, activities: { value: 64, label: 'Actividades', period: 'Último semestre' }, metric4: { value: '93,600', label: 'Comidas servidas', period: 'Total proyecto' } },
      progress: [{ label: 'Meta de beneficiarios (520/600)', pct: 87 },{ label: 'Objetivo de voluntarios (47/50)', pct: 94 },{ label: 'Metas de actividades (64/80)', pct: 80 },{ label: 'Comidas servidas (93,600/120,000)', pct: 78 }],
      content: { articles: 12, testimonials: 28, kpis: 15 },
      publications: [{ title: 'Celebramos 500 comidas servidas en un solo día', date: '10 de marzo, 2026', type: 'Artículo' },{ title: '"Este proyecto salvó a mi familia" - Testimonio de Laura M.', date: '5 de marzo, 2026', type: 'Testimonio' },{ title: 'Informe mensual de impacto - Febrero 2026', date: '1 de marzo, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [435,455,462,472,465,476], activities: [8,10,12,11,14,9] }
    },
    {
      title: 'Programa de Reforestación Costera',
      desc: 'Siembra de manglares y vegetación nativa en zonas costeras degradadas. Hemos restaurado 4 km de litoral, protegiendo la biodiversidad marina y reduciendo la erosión costera.',
      category: 'Medio Ambiente',
      img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
      leader: 'Biol. Jorge Espinoza',
      location: 'Costa Verde',
      volunteers: 44,
      about: 'El Programa de Reforestación Costera restaura ecosistemas marinos y costeros degradados a través de la siembra de manglares y vegetación nativa. Trabajamos con comunidades pesqueras, biólogos voluntarios y turistas comprometidos para proteger la costa y la biodiversidad marina para las generaciones futuras.',
      objectives: ['Restaurar 8 km de litoral con manglar y vegetación nativa','Sembrar 10,000 plántulas de especies nativas costeras','Involucrar a comunidades pesqueras como guardianes del ecosistema','Monitorear la recuperación de fauna marina en zonas restauradas'],
      community: 'Colaboramos con comunidades pesqueras locales cuyos medios de vida dependen de la salud del ecosistema costero. También participan estudiantes de biología, turistas responsables y empresas turísticas de la región comprometidas con la sostenibilidad.',
      operation: { schedule: 'Fines de semana\n6:00 - 13:00 hrs', locations: '4 km restaurados\nCosta Verde', participation: 'Jornadas abiertas\nAdoción de zonas' },
      stats: { beneficiaries: { value: 5200, label: 'Beneficiarios indirectos', change: '+50% vs. inicio', type: 'pos' }, volunteers: { value: 44, label: 'Voluntarios activos', change: '+10 este mes', type: 'pos' }, activities: { value: 52, label: 'Jornadas realizadas', period: 'Total proyecto' }, metric4: { value: '6,200', label: 'Plántulas sembradas', period: 'Total proyecto' } },
      progress: [{ label: 'Kilómetros restaurados (4/8 km)', pct: 50 },{ label: 'Plántulas sembradas (6,200/10,000)', pct: 62 },{ label: 'Comunidades participantes (3/5)', pct: 60 },{ label: 'Monitoreos realizados (8/12)', pct: 67 }],
      content: { articles: 9, testimonials: 14, kpis: 12 },
      publications: [{ title: '4 km de litoral recuperado: un hito para el ecosistema', date: '13 de marzo, 2026', type: 'Artículo' },{ title: '"El manglar vuelve y los peces también" - Pescador local', date: '6 de marzo, 2026', type: 'Testimonio' },{ title: 'Informe de monitoreo ambiental - Febrero 2026', date: '28 de febrero, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [2800,3400,3800,4200,4800,5200], activities: [7,9,6,10,11,9] }
    },
    {
      title: 'Clínica Dental Comunitaria',
      desc: 'Atención odontológica preventiva y curativa para niños y adultos sin acceso a servicios dentales privados. Incluye extracciones, limpiezas y talleres de higiene bucal.',
      category: 'Salud y Bienestar',
      img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=900&q=80',
      leader: 'Dra. Valeria Soto',
      location: 'Sector Popular',
      volunteers: 12,
      about: 'La Clínica Dental Comunitaria lleva atención odontológica de calidad a comunidades sin acceso a servicios privados. Con dentistas voluntarios y equipamiento donado, ofrecemos consultas preventivas, limpiezas, extracciones y tratamientos básicos de forma completamente gratuita, priorizando niños en edad escolar.',
      objectives: ['Atender a 600 pacientes anuales con servicios dentales gratuitos','Priorizar la atención infantil y preventiva para evitar problemas futuros','Capacitar a la comunidad en higiene bucal básica','Gestionar donación de equipamiento y materiales dentales de calidad'],
      community: 'Atendemos a niños, adultos y adultos mayores del Sector Popular sin acceso a servicios dentales privados. Muchos de nuestros pacientes nunca habían visitado al dentista antes de conocer nuestra clínica.',
      operation: { schedule: 'Martes, Miércoles y Viernes\n8:00 - 15:00 hrs', locations: '1 clínica equipada\nSector Popular', participation: 'Atención gratuita\nCitas con registro previo' },
      stats: { beneficiaries: { value: 380, label: 'Pacientes atendidos', change: '+18% vs. inicio', type: 'pos' }, volunteers: { value: 12, label: 'Dentistas voluntarios', change: '+2 este mes', type: 'pos' }, activities: { value: 90, label: 'Días de consulta', period: 'Total proyecto' }, metric4: { value: '1,450', label: 'Procedimientos realizados', period: 'Total proyecto' } },
      progress: [{ label: 'Pacientes anuales (380/600)', pct: 63 },{ label: 'Dentistas activos (12/15)', pct: 80 },{ label: 'Procedimientos (1,450/2,000)', pct: 73 },{ label: 'Talleres de higiene (8/12)', pct: 67 }],
      content: { articles: 5, testimonials: 20, kpis: 8 },
      publications: [{ title: 'Jornada especial: 60 niños atendidos en un solo día', date: '12 de marzo, 2026', type: 'Artículo' },{ title: '"Mi hijo por fin no tiene dolor de muela" - Madre de paciente', date: '4 de marzo, 2026', type: 'Testimonio' },{ title: 'Estadísticas de atención odontológica - Febrero 2026', date: '28 de febrero, 2026', type: 'Reporte' }],
      chartData: { months: ['Oct','Nov','Dic','Ene','Feb','Mar'], beneficiaries: [280,308,325,348,365,380], activities: [14,16,12,18,17,13] }
    }
  ];

  /* ─── PALETTES ──────────────────────────────────────────────── */
  const PALETTES = {
    default: { accent: '#1E293B', accentBg: '#F8FAFC', accentLight: '#F1F5F9', accentMuted: '#64748B' },
    blue:    { accent: '#1A56E8', accentBg: '#EFF6FF', accentLight: '#DBEAFE', accentMuted: '#3B82F6' },
    green:   { accent: '#16A34A', accentBg: '#F0FDF4', accentLight: '#DCFCE7', accentMuted: '#22C55E' },
    orange:  { accent: '#EA580C', accentBg: '#FFF7ED', accentLight: '#FFEDD5', accentMuted: '#F97316' },
    purple:  { accent: '#7C3AED', accentBg: '#F5F3FF', accentLight: '#EDE9FE', accentMuted: '#A78BFA' },
    rose:    { accent: '#E11D48', accentBg: '#FFF1F2', accentLight: '#FFE4E6', accentMuted: '#FB7185' }
  };

  const WIDGET_LABELS = {
    description:  'Descripción del proyecto',
    dashboard:    'Dashboard de impacto',
    progress:     'Progreso del proyecto',
    content:      'Contenido del proyecto',
    publications: 'Últimas publicaciones'
  };

  /* ─── MIGRATE: patch creatorKey on custom projects missing it ── */
  (function patchCreatorKey() {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (!u || !u.loggedIn) return;
      const customs = JSON.parse(localStorage.getItem('custom_projects') || '[]');
      let changed = false;
      customs.forEach(p => {
        if (p.isCustom && !p.creatorKey) {
          // Best guess: if current user's nombre matches the leader name, assign them
          const uName = (u.nombre || '').trim().toLowerCase();
          const lName = (p.leader || '').trim().toLowerCase();
          if (uName === lName || lName.includes(uName) || uName.includes(lName)) {
            p.creatorKey = u.username || u.nombre || '';
            changed = true;
          }
        }
      });
      if (changed) localStorage.setItem('custom_projects', JSON.stringify(customs));
    } catch(e) {}
  })();

  /* ─── INIT ──────────────────────────────────────────────────── */
  const params  = new URLSearchParams(location.search);
  const projId  = parseInt(params.get('id') || '0', 10);

  // Load custom projects if needed
  let project;
  if (projId >= 15) {
    const customs = JSON.parse(localStorage.getItem('custom_projects') || '[]');
    const customIdx = projId - 15;
    const raw = customs[customIdx];
    if (raw) {
      project = {
        ...raw,
        objectives: [],
        community: '',
        operation: { schedule: '—', locations: raw.location || '—', participation: '—' },
        stats: null,
        progress: [],
        content: { articles: 0, testimonials: 0, kpis: 0 },
        publications: [],
        chartData: null
      };
    }
  }
  if (!project) project = PROJECTS[projId] || PROJECTS[0];

  const storageKey = `proj_settings_${projId}`;

  // Load saved settings
  let settings = { palette: 'default', widgetOrder: ['description','dashboard','progress','content','publications'], hiddenWidgets: [] };
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (saved) settings = { ...settings, ...saved };
  } catch(e) {}

  /* ─── FILL PAGE ─────────────────────────────────────────────── */
  document.title = project.title + ' - Proyectos Solidarios';
  document.getElementById('pp-cover').src    = project.img;
  document.getElementById('pp-cover').alt    = project.title;
  document.getElementById('pp-title').textContent  = project.title;
  document.getElementById('pp-leader').textContent = project.leader;
  document.getElementById('pp-hero-desc').textContent = project.desc;

  // Description
  document.getElementById('desc-about').textContent = project.about;
  document.getElementById('desc-objectives').innerHTML = project.objectives.map(o => `<li>${o}</li>`).join('');
  document.getElementById('desc-community').textContent = project.community;
  document.getElementById('desc-operation').innerHTML = [
    { label: 'Horarios',       value: project.operation.schedule },
    { label: 'Ubicaciones',    value: project.operation.locations },
    { label: 'Participación',  value: project.operation.participation }
  ].map(op => `
    <div class="pp-op-card">
      <div class="op-label">${op.label}</div>
      <div class="op-value">${op.value.replace(/\n/g,'<br>')}</div>
    </div>`).join('');

  function emptyState(targetId, icon, title, sub) {
    document.getElementById(targetId).innerHTML = `
      <div class="pp-empty-state">
        <div class="pp-empty-icon">${icon}</div>
        <div class="pp-empty-title">${title}</div>
        <p class="pp-empty-sub">${sub}</p>
        <a href="upload-data.html?id=${projId}" class="pp-empty-btn">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Cargar datos del proyecto
        </a>
      </div>`;
  }

  // Stats
  if (!project.stats) {
    document.getElementById('dash-stats').closest('.pp-dash-body').innerHTML = `
      <div class="pp-empty-state">
        <div class="pp-empty-icon"><svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
        <div class="pp-empty-title">Dashboard sin datos aún</div>
        <p class="pp-empty-sub">Carga un archivo JSON con las estadísticas de tu proyecto para activar el dashboard de impacto y las gráficas.</p>
        <a href="upload-data.html?id=${projId}" class="pp-empty-btn">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Cargar datos del proyecto
        </a>
      </div>`;
  } else {
    const s = project.stats;
    const statIconBg = ['#EFF6FF','#F0FDF4','#FFF7ED','#F0FDF4'];
    const statIconColor = ['#3B82F6','#22C55E','#F97316','#22C55E'];
    const statIcons = [
      `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
      `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
      `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
    ];
    const statList = [
      { ...s.beneficiaries, icon: statIcons[0], iconBg: statIconBg[0], iconColor: statIconColor[0] },
      { ...s.volunteers,    icon: statIcons[1], iconBg: statIconBg[1], iconColor: statIconColor[1] },
      { value: s.activities.value, label: s.activities.label, change: s.activities.period, type: 'neu', icon: statIcons[2], iconBg: statIconBg[2], iconColor: statIconColor[2] },
      { value: s.metric4.value,    label: s.metric4.label,    change: s.metric4.period,   type: 'neu', icon: statIcons[3], iconBg: statIconBg[3], iconColor: statIconColor[3] }
    ];
    document.getElementById('dash-stats').innerHTML = statList.map(st => `
      <div class="pp-stat-card">
        <div class="pp-stat-top">
          <div class="pp-stat-icon" style="background:${st.iconBg};color:${st.iconColor}">${st.icon}</div>
          <div class="pp-stat-label">${st.label}</div>
        </div>
        <div class="pp-stat-value">${st.value.toLocaleString ? st.value.toLocaleString() : st.value}</div>
        <div class="pp-stat-change ${st.type || 'neu'}">
          ${st.type === 'pos' ? '<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>' : ''}
          ${st.change}
        </div>
      </div>`).join('');
  }

  // Progress
  if (!project.progress || project.progress.length === 0) {
    emptyState('prog-body',
      `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
      'Sin métricas de progreso',
      'Sube un archivo con las metas y el porcentaje de avance para ver las barras de progreso.'
    );
  } else {
    document.getElementById('prog-body').innerHTML = project.progress.map(p => `
      <div class="pp-prog-item">
        <div class="pp-prog-header">
          <span class="pp-prog-lbl">${p.label}</span>
          <span class="pp-prog-pct">${p.pct}%</span>
        </div>
        <div class="pp-prog-track">
          <div class="pp-prog-fill" style="width:${p.pct}%"></div>
        </div>
      </div>`).join('');
  }

  // Leader moderation link (only shown to leader)
  const leaderLinks = (() => {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (!u || !u.loggedIn) return {};
      const uName = (u.nombre || '').trim().toLowerCase();
      const pLeader = project.leader.trim().toLowerCase();
      const isLdr = uName === pLeader || pLeader.includes(uName) || uName.includes(pLeader);
      return isLdr ? { testimonials: `moderate-testimonials.html?id=${projId}` } : {};
    } catch(e) { return {}; }
  })();

  // Content cards
  const contentCards = [
    { icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`, iconBg: '#EFF6FF', iconColor: '#3B82F6', title: 'Artículos y publicaciones', sub: 'Historias de impacto, noticias del proyecto y actualizaciones', count: project.content.articles + ' publicaciones', href: '#' },
    { icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`, iconBg: '#F0FDF4', iconColor: '#16A34A', title: 'Testimonios', sub: 'Experiencias de beneficiarios, voluntarios y colaboradores', count: project.content.testimonials + ' testimonios', href: `testimonials.html?id=${projId}`, extraLink: leaderLinks.testimonials ? { label: 'Moderar', href: leaderLinks.testimonials } : null },
    { icon: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`, iconBg: '#F5F3FF', iconColor: '#7C3AED', title: 'KPIs del proyecto', sub: 'Indicadores clave de desempeño y métricas detalladas', count: project.content.kpis + ' indicadores', href: '#' }
  ];
  document.getElementById('content-grid').innerHTML = contentCards.map(c => `
    <div class="pp-content-card" style="cursor:default">
      <div class="pp-cc-icon" style="background:${c.iconBg};color:${c.iconColor}">${c.icon}</div>
      <div class="pp-cc-title">${c.title}</div>
      <div class="pp-cc-sub">${c.sub}</div>
      <div class="pp-cc-footer">
        <span class="pp-cc-count">${c.count}</span>
        <div style="display:flex;gap:10px;align-items:center">
          ${c.extraLink ? `<a href="${c.extraLink.href}" style="font-size:.73rem;font-weight:700;color:#E11D48;text-decoration:none;display:flex;align-items:center;gap:3px"><svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>${c.extraLink.label}</a>` : ''}
          <a href="${c.href}" class="pp-cc-link" style="text-decoration:none">Ver más <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg></a>
        </div>
      </div>
    </div>`).join('');

  // Publications
  if (!project.publications || project.publications.length === 0) {
    emptyState('pub-body',
      `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
      'Sin publicaciones aún',
      'Sube un archivo con las publicaciones del proyecto para que aparezcan aquí.'
    );
  } else {
    const badgeClass = { 'Artículo': 'badge-articulo', 'Testimonio': 'badge-testimonio', 'Reporte': 'badge-reporte', 'Evento': 'badge-evento' };
    document.getElementById('pub-body').innerHTML = project.publications.map(p => `
      <div class="pp-pub-item">
        <div class="pp-pub-info">
          <div class="pp-pub-title">${p.title}</div>
          <div class="pp-pub-date">${p.date}</div>
        </div>
        <span class="pp-pub-badge ${badgeClass[p.type] || 'badge-articulo'}">${p.type}</span>
      </div>`).join('');
  }

  /* ─── CHARTS ────────────────────────────────────────────────── */
  function getAccentColor() {
    return getComputedStyle(document.documentElement).getPropertyValue('--pp-accent').trim() || '#1E293B';
  }

  let chartB, chartA;
  function buildCharts() {
    const accent = getAccentColor();
    const cd = project.chartData;
    if (!cd) {
      // Show empty state in chart boxes
      document.querySelectorAll('.pp-chart-box canvas').forEach(c => {
        c.style.display = 'none';
        if (!c.parentElement.querySelector('.pp-empty-sub')) {
          c.insertAdjacentHTML('afterend', '<p class="pp-empty-sub" style="text-align:center;padding:32px 0;font-size:.8rem">Sin datos de gráfica aún</p>');
        }
      });
      return;
    }

    if (chartB) chartB.destroy();
    if (chartA) chartA.destroy();

    Chart.defaults.font.family = "'DM Sans', sans-serif";

    chartB = new Chart(document.getElementById('chart-beneficiaries'), {
      type: 'line',
      data: {
        labels: cd.months,
        datasets: [{ data: cd.beneficiaries, borderColor: accent, backgroundColor: 'transparent', tension: 0.4, pointBackgroundColor: accent, pointRadius: 4, borderWidth: 2 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 11 } } }, y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 11 } } } } }
    });

    chartA = new Chart(document.getElementById('chart-activities'), {
      type: 'bar',
      data: {
        labels: cd.months,
        datasets: [{ data: cd.activities, backgroundColor: accent, borderRadius: 6, borderSkipped: false }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false }, ticks: { font: { size: 11 } } }, y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 11 }, stepSize: 4 } } } }
    });
  }

  /* ─── PALETTE APPLICATION ───────────────────────────────────── */
  function applyPalette(name) {
    const p = PALETTES[name] || PALETTES.default;
    const root = document.documentElement;
    root.style.setProperty('--pp-accent',       p.accent);
    root.style.setProperty('--pp-accent-bg',    p.accentBg);
    root.style.setProperty('--pp-accent-light', p.accentLight);
    root.style.setProperty('--pp-accent-muted', p.accentMuted);
    // Update leader bar bg color
    document.getElementById('pp-leader-bar').style.background = p.accent;
    // Update active palette btn
    document.querySelectorAll('.palette-btn').forEach(b => b.classList.toggle('active', b.dataset.palette === name));
  }

  /* ─── WIDGET ORDER & VISIBILITY ─────────────────────────────── */
  function applyWidgetOrder(order) {
    const container = document.getElementById('pp-widgets');
    order.forEach(id => {
      const el = container.querySelector(`[data-widget-id="${id}"]`);
      if (el) container.appendChild(el);
    });
  }

  function applyHidden(hidden) {
    document.querySelectorAll('.pp-widget').forEach(w => {
      w.classList.toggle('hidden', hidden.includes(w.dataset.widgetId));
    });
  }

  function buildToggleList(order, hidden) {
    const list = document.getElementById('widget-toggle-list');
    list.innerHTML = order.map(id => `
      <div class="widget-toggle-item" data-wid="${id}">
        <span class="drag-handle">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="9" cy="5" r="1.5" fill="#CBD5E1"/><circle cx="9" cy="12" r="1.5" fill="#CBD5E1"/><circle cx="9" cy="19" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="5" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="12" r="1.5" fill="#CBD5E1"/><circle cx="15" cy="19" r="1.5" fill="#CBD5E1"/></svg>
        </span>
        <span class="wt-label">${WIDGET_LABELS[id]}</span>
        <label class="toggle-switch">
          <input type="checkbox" data-widget="${id}" ${hidden.includes(id) ? '' : 'checked'}>
          <span class="slider"></span>
        </label>
      </div>`).join('');

    // Toggle change
    list.querySelectorAll('input[type=checkbox]').forEach(cb => {
      cb.addEventListener('change', () => {
        const wid = cb.dataset.widget;
        const widget = document.querySelector(`.pp-widget[data-widget-id="${wid}"]`);
        if (widget) widget.classList.toggle('hidden', !cb.checked);
      });
    });

    // Drag-to-reorder inside panel list
    let dragSrc = null;
    list.querySelectorAll('.widget-toggle-item').forEach(item => {
      item.addEventListener('dragstart', e => { dragSrc = item; item.style.opacity = '.4'; e.dataTransfer.effectAllowed = 'move'; });
      item.addEventListener('dragend',   () => { item.style.opacity = ''; dragSrc = null; });
      item.addEventListener('dragover',  e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
      item.addEventListener('drop', e => {
        e.preventDefault();
        if (dragSrc && dragSrc !== item) {
          const items = [...list.querySelectorAll('.widget-toggle-item')];
          const srcIdx = items.indexOf(dragSrc);
          const tgtIdx = items.indexOf(item);
          if (srcIdx < tgtIdx) item.after(dragSrc); else item.before(dragSrc);
          // Mirror on page
          const newOrder = [...list.querySelectorAll('.widget-toggle-item')].map(i => i.dataset.wid);
          applyWidgetOrder(newOrder);
        }
      });
      item.setAttribute('draggable', 'true');
    });
  }

  /* ─── DRAG-TO-REORDER ON PAGE (edit mode) ───────────────────── */
  let pageDragSrc = null;
  function enablePageDrag(enable) {
    document.querySelectorAll('.pp-widget').forEach(w => {
      w.setAttribute('draggable', enable ? 'true' : 'false');
      if (enable) {
        w.addEventListener('dragstart', onPageDragStart);
        w.addEventListener('dragend',   onPageDragEnd);
        w.addEventListener('dragover',  onPageDragOver);
        w.addEventListener('drop',      onPageDrop);
      } else {
        w.removeEventListener('dragstart', onPageDragStart);
        w.removeEventListener('dragend',   onPageDragEnd);
        w.removeEventListener('dragover',  onPageDragOver);
        w.removeEventListener('drop',      onPageDrop);
      }
    });
  }
  function onPageDragStart(e) { pageDragSrc = this; this.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; }
  function onPageDragEnd()    { this.classList.remove('dragging', 'drag-over'); pageDragSrc = null; }
  function onPageDragOver(e)  { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; document.querySelectorAll('.pp-widget').forEach(w => w.classList.remove('drag-over')); this.classList.add('drag-over'); }
  function onPageDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    if (pageDragSrc && pageDragSrc !== this) {
      const container = document.getElementById('pp-widgets');
      const widgets   = [...container.querySelectorAll('.pp-widget')];
      const srcIdx    = widgets.indexOf(pageDragSrc);
      const tgtIdx    = widgets.indexOf(this);
      if (srcIdx < tgtIdx) this.after(pageDragSrc); else this.before(pageDragSrc);
      // Sync panel toggle list order
      const newOrder = [...container.querySelectorAll('.pp-widget')].map(w => w.dataset.widgetId);
      buildToggleList(newOrder, getCurrentHidden());
    }
  }
  function getCurrentHidden() {
    return [...document.querySelectorAll('.pp-widget.hidden')].map(w => w.dataset.widgetId);
  }
  function getCurrentOrder() {
    return [...document.querySelectorAll('.pp-widget')].map(w => w.dataset.widgetId);
  }

  /* ─── PANEL OPEN/CLOSE ──────────────────────────────────────── */
  let tempPalette = settings.palette;

  function openPanel() {
    tempPalette = settings.palette;
    buildToggleList(getCurrentOrder(), getCurrentHidden());
    document.getElementById('pp-panel-overlay').classList.add('show');
    document.getElementById('pp-customize-panel').classList.add('open');
    document.body.classList.add('edit-mode');
    enablePageDrag(true);
  }
  function closePanel(save) {
    if (save) {
      settings.palette      = tempPalette;
      settings.widgetOrder  = getCurrentOrder();
      settings.hiddenWidgets = getCurrentHidden();
      localStorage.setItem(storageKey, JSON.stringify(settings));
      buildCharts(); // rebuild with potentially new accent color
    } else {
      // Revert
      applyPalette(settings.palette);
      applyWidgetOrder(settings.widgetOrder);
      applyHidden(settings.hiddenWidgets);
    }
    document.getElementById('pp-panel-overlay').classList.remove('show');
    document.getElementById('pp-customize-panel').classList.remove('open');
    document.body.classList.remove('edit-mode');
    enablePageDrag(false);
  }

  document.getElementById('btn-open-panel').addEventListener('click', openPanel);
  document.getElementById('pp-panel-close').addEventListener('click', () => closePanel(false));
  document.getElementById('btn-cancel-settings').addEventListener('click', () => closePanel(false));
  document.getElementById('btn-save-settings').addEventListener('click', () => closePanel(true));
  document.getElementById('pp-panel-overlay').addEventListener('click', () => closePanel(false));

  // Palette buttons
  document.getElementById('palette-grid').addEventListener('click', e => {
    const btn = e.target.closest('.palette-btn');
    if (!btn) return;
    tempPalette = btn.dataset.palette;
    applyPalette(tempPalette);
    buildCharts();
  });

  /* ─── LEADER CHECK ──────────────────────────────────────────── */
  (function checkLeader() {
    try {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (!u || !u.loggedIn) return;

      const userName   = (u.nombre   || '').trim().toLowerCase();
      const userKey    = (u.username || '').trim().toLowerCase();
      const projLeader = project.leader.trim().toLowerCase();
      const creatorKey = (project.creatorKey || '').trim().toLowerCase();

      // For custom projects: match by creatorKey (exact session identifier saved at creation)
      // For hardcoded projects: fuzzy name match
      const isLeader = project.isCustom
        ? (creatorKey && (userName === creatorKey || userKey === creatorKey))
          || userName === projLeader || projLeader.includes(userName) || userName.includes(projLeader)
        : userName === projLeader || projLeader.includes(userName) || userName.includes(projLeader);

      if (isLeader) {
        document.getElementById('pp-leader-bar').classList.add('visible');
        document.getElementById('btn-edit-cover').classList.add('visible');
        if (project.isCustom) {
          const delBtn = document.getElementById('btn-delete-project');
          delBtn.style.display = 'flex';
          delBtn.onmouseenter = () => { delBtn.style.background = 'rgba(239,68,68,.35)'; delBtn.style.color = 'white'; delBtn.style.borderColor = 'rgba(239,68,68,.5)'; };
          delBtn.onmouseleave = () => { delBtn.style.background = 'rgba(255,255,255,.12)'; delBtn.style.color = 'rgba(255,255,255,.7)'; delBtn.style.borderColor = 'rgba(255,255,255,.2)'; };
        }
      }
    } catch(e) {}
  })();

  /* ─── DELETE PROJECT ────────────────────────────────────────── */
  (function initDelete() {
    const delOverlay = document.getElementById('del-overlay');
    document.getElementById('del-proj-name').textContent = project.title;

    document.getElementById('btn-delete-project').addEventListener('click', () => {
      delOverlay.style.display = 'flex';
    });
    document.getElementById('del-cancel').addEventListener('click', () => {
      delOverlay.style.display = 'none';
    });
    delOverlay.addEventListener('click', e => {
      if (e.target === delOverlay) delOverlay.style.display = 'none';
    });
    document.getElementById('del-confirm').addEventListener('click', () => {
      const customs = JSON.parse(localStorage.getItem('custom_projects') || '[]');
      const customIdx = projId - 15;
      customs.splice(customIdx, 1);
      localStorage.setItem('custom_projects', JSON.stringify(customs));
      // Clean up overrides and settings for this project
      localStorage.removeItem(`project_override_${projId}`);
      localStorage.removeItem(`proj_settings_${projId}`);
      localStorage.removeItem(`testimonials_${projId}`);
      window.location.href = 'catalog.html';
    });
  })();

  /* ─── APPLY UPLOADED DATA OVERRIDE ─────────────────────────── */
  document.getElementById('btn-upload-data').href = `upload-data.html?id=${projId}`;

  /* ─── COVER IMAGE EDIT ───────────────────────────────────────── */
  (function initCoverEdit() {
    const coverEl      = document.getElementById('pp-cover');
    const editBtn      = document.getElementById('btn-edit-cover');
    const overlay      = document.getElementById('img-modal-overlay');
    const urlInput     = document.getElementById('img-url-input');
    const preview      = document.getElementById('img-preview');
    const fileInput    = document.getElementById('img-file-input');

    // Apply saved image if any
    const ov = JSON.parse(localStorage.getItem(`project_override_${projId}`) || '{}');
    if (ov.imagen) coverEl.src = ov.imagen;

    // Live URL preview
    let debounce;
    urlInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        if (urlInput.value.trim()) preview.src = urlInput.value.trim();
      }, 400);
    });

    // File upload → base64
    document.getElementById('img-upload-btn').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = e => {
        urlInput.value = '';
        preview.src = e.target.result;
        preview._base64 = e.target.result;
      };
      reader.readAsDataURL(file);
      fileInput.value = '';
    });

    // Open modal
    document.getElementById('btn-edit-cover').addEventListener('click', () => {
      preview._base64 = null;
      urlInput.value  = '';
      preview.src     = coverEl.src;
      overlay.classList.add('show');
    });

    // Close modal
    function closeModal() {
      overlay.classList.remove('show');
      preview._base64 = null;
    }
    document.getElementById('img-btn-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

    // Save image
    document.getElementById('img-btn-save').addEventListener('click', () => {
      const src = preview._base64 || urlInput.value.trim() || preview.src;
      if (!src || src === location.href) return;
      coverEl.src = src;
      const saved = JSON.parse(localStorage.getItem(`project_override_${projId}`) || '{}');
      saved.imagen = src;
      localStorage.setItem(`project_override_${projId}`, JSON.stringify(saved));
      closeModal();
    });
  })();

  (function applyOverride() {
    try {
      const ov = JSON.parse(localStorage.getItem(`project_override_${projId}`) || 'null');
      if (!ov) return;

      // Stats
      if (ov.beneficiarios !== undefined) {
        const el = document.querySelector('.pp-stat-value');
        if (el) el.textContent = ov.beneficiarios.toLocaleString();
      }
      if (ov.beneficiarios !== undefined || ov.voluntarios !== undefined ||
          ov.actividades !== undefined || ov.metrica4_valor !== undefined) {
        const s = project.stats;
        const statList = [
          { value: ov.beneficiarios ?? s.beneficiaries.value, label: s.beneficiaries.label, change: ov.beneficiarios_cambio ?? s.beneficiaries.change, type: 'pos' },
          { value: ov.voluntarios   ?? s.volunteers.value,    label: s.volunteers.label,    change: ov.voluntarios_cambio   ?? s.volunteers.change,   type: 'pos' },
          { value: ov.actividades   ?? s.activities.value,    label: s.activities.label,    change: ov.actividades_periodo  ?? s.activities.period,   type: 'neu' },
          { value: ov.metrica4_valor?? s.metric4.value,       label: ov.metrica4_label ?? s.metric4.label, change: ov.metrica4_periodo ?? s.metric4.period, type: 'neu' }
        ];
        const iconBg    = ['#EFF6FF','#F0FDF4','#FFF7ED','#F0FDF4'];
        const iconColor = ['#3B82F6','#22C55E','#F97316','#22C55E'];
        const icons = [
          `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
          `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
          `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
          `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`
        ];
        document.getElementById('dash-stats').innerHTML = statList.map((st, i) => `
          <div class="pp-stat-card">
            <div class="pp-stat-top">
              <div class="pp-stat-icon" style="background:${iconBg[i]};color:${iconColor[i]}">${icons[i]}</div>
              <div class="pp-stat-label">${st.label}</div>
            </div>
            <div class="pp-stat-value">${typeof st.value === 'number' ? st.value.toLocaleString() : st.value}</div>
            <div class="pp-stat-change ${st.type}">
              ${st.type === 'pos' ? '<svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>' : ''}
              ${st.change}
            </div>
          </div>`).join('');
      }

      // Progress bars
      if (ov.progreso && Array.isArray(ov.progreso)) {
        document.getElementById('prog-body').innerHTML = ov.progreso.map(p => `
          <div class="pp-prog-item">
            <div class="pp-prog-header">
              <span class="pp-prog-lbl">${p.label}</span>
              <span class="pp-prog-pct">${p.pct}%</span>
            </div>
            <div class="pp-prog-track">
              <div class="pp-prog-fill" style="width:${p.pct}%"></div>
            </div>
          </div>`).join('');
      }

      // Publications
      if (ov.publicaciones && Array.isArray(ov.publicaciones)) {
        const badgeClass = { 'Artículo': 'badge-articulo', 'Testimonio': 'badge-testimonio', 'Reporte': 'badge-reporte', 'Evento': 'badge-evento' };
        document.getElementById('pub-body').innerHTML = ov.publicaciones.map(p => `
          <div class="pp-pub-item">
            <div class="pp-pub-info">
              <div class="pp-pub-title">${p.titulo}</div>
              <div class="pp-pub-date">${p.fecha}</div>
            </div>
            <span class="pp-pub-badge ${badgeClass[p.tipo] || 'badge-articulo'}">${p.tipo}</span>
          </div>`).join('');
      }

      // Chart data
      if (ov.grafica_meses || ov.grafica_beneficiarios || ov.grafica_actividades) {
        if (ov.grafica_meses)        project.chartData.months       = ov.grafica_meses;
        if (ov.grafica_beneficiarios)project.chartData.beneficiaries= ov.grafica_beneficiarios;
        if (ov.grafica_actividades)  project.chartData.activities   = ov.grafica_actividades;
      }
    } catch(e) {}
  })();

  /* ─── APPLY SAVED SETTINGS & BUILD ─────────────────────────── */
  applyPalette(settings.palette);
  applyWidgetOrder(settings.widgetOrder);
  applyHidden(settings.hiddenWidgets);
  buildCharts();
