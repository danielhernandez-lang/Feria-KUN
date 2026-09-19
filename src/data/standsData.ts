import { Exhibitor, StandCoordinates } from '../types';

export const INITIAL_EXHIBITORS: Exhibitor[] = [
  {
    id: '01',
    standNumber: '01',
    name: 'Expositor 01A',
    slogan: 'Superalimentos bioactivos',
    category: 'Biotecnología & Alimentos',
    categoryColor: '#059669', // emerald
    badgeBg: '#ecfdf5',
    description:
      'Empresa biotecnológica que desarrolla harinas proteicas funcionales e ingredientes bioactivos a partir de quinua fermentada, amaranto y semillas ancestrales. Trabajamos en comercio directo y justo con 65 familias campesinas.',
    founder: {
      name: 'Dra. Camila Morales',
      role: 'Biotecnóloga & Co-Fundadora',
    },
    products: [
      'Harina proteica de quinua biofermentada',
      'Snacks energéticos funcionales sin gluten',
      'Extracto antioxidante liofilizado de mortiño',
    ],
    contact: {
      email: 'contacto@andesbiotech.co',
      phone: '+57 312 456 7890',
      website: 'https://andesbiotech.co',
      instagram: '@andes.biotech',
      tiktok: '@andesbiotech',
      facebook: 'andesbiotech.co',
    },
    amenities: [
      'Mesa de exhibición lateral',
      '2 sillas ergonómicas giratorias',
      'Punto eléctrico 110V',
      'Sillón auxiliar de descanso',
    ],
    schedule: [
      {
        time: '10:30 AM',
        title: 'Degustación sensorial y charla sobre nutrición celular',
        location: 'Stand 01',
      },
      {
        time: '03:00 PM',
        title: 'Pitch en el Bar de Emprendedores',
        location: 'Zona BAR',
      },
    ],
    spaceType: 'Módulo Lateral con Sillas Ergonómicas',
  },
  {
    id: '02',
    standNumber: '02',
    name: 'Kallpa Coffee Roasters',
    slogan: 'Café de especialidad con trazabilidad blockchain y comercio directo',
    category: 'Gastronomía & Agro',
    categoryColor: '#d97706', // amber
    badgeBg: '#fef3c7',
    description:
      'Tostadores de cafés especiales de microlotes de altura (1.900+ msnm). Incorporamos códigos QR en cada empaque con trazabilidad verificada por blockchain: notas de cata, curva de tostión y remuneración real a los caficultores.',
    founder: {
      name: 'Mateo Restrepo & Sara Llanos',
      role: 'Q-Grader & Maestros Tostadores',
    },
    products: [
      'Café Geisha proceso Honey edición limitada',
      'Cold Brew infusionado con nitrógeno',
      'Drip bags individuales compostables para viaje',
    ],
    contact: {
      email: 'hola@kallpacoffee.com',
      phone: '+57 320 891 2345',
      website: 'https://kallpacoffee.com',
      instagram: '@kallpacoffee',
      tiktok: '@kallpacoffee',
      facebook: 'kallpacoffeeroasters',
    },
    amenities: [
      'Sala Lounge exclusiva con sofá',
      '2 sillones acolchados y mesas redondas de cata',
      'Punto eléctrico de alta potencia (máquina espresso)',
      'Espacio para banners y display de empaques',
    ],
    schedule: [
      {
        time: '11:15 AM',
        title: 'Cata a ciegas de microlotes ganadores',
        location: 'Stand 02 (Zona Lounge)',
      },
      {
        time: '04:00 PM',
        title: 'Taller express: Cómo preparar el espresso perfecto en casa',
        location: 'Stand 02',
      },
    ],
    spaceType: 'Espacio Lounge VIP de Experiencia Sensorial',
  },
  {
    id: '03',
    standNumber: '03',
    name: 'NeuroLearn XR',
    slogan: 'Entrenamiento inmersivo en realidad virtual para la industria 4.0',
    category: 'EdTech & Software',
    categoryColor: '#4f46e5', // indigo
    badgeBg: '#e0e7ff',
    description:
      'Plataforma SaaS que recrea talleres técnicos y maquinaria industrial pesada en entornos de realidad virtual interactiva. Reduce en un 60% la curva de aprendizaje y elimina riesgos de accidentes en aprendices e ingenieros.',
    founder: {
      name: 'Ing. Sofía Cárdenas',
      role: 'CEO & Diseñadora XR',
    },
    products: [
      'Licencia educativa NeuroLearn VR Classroom',
      'Gemelos digitales de maquinaria automatizada',
      'Módulo de evaluación por telemetría háptica',
    ],
    contact: {
      email: 'info@neurolearnxr.tech',
      phone: '+57 301 772 3456',
      website: 'https://neurolearnxr.tech',
      linkedin: 'company/neurolearn-xr',
      tiktok: '@neurolearnxr',
      facebook: 'neurolearnxr',
    },
    amenities: [
      'Módulo hexagonal Cowork',
      '4 sillas ergonómicas giratorias',
      'Punto de red cableada y tomacorriente central',
      'Área despejada de 3m² para interacción con visor VR',
    ],
    schedule: [
      {
        time: '02:00 PM',
        title: 'Demostración en vivo con cascos VR para asistentes',
        location: 'Stand 03',
      },
      {
        time: '04:30 PM',
        title: 'Conferencia en Sala de Capacitaciones',
        location: 'Sala de Capacitaciones',
      },
    ],
    spaceType: 'Isla Hexagonal Coworking - Módulo Norte',
  },
  {
    id: '04',
    standNumber: '04',
    name: 'RoboNova Dynamics',
    slogan: 'Kits de robótica educativa e IA programables para escuelas',
    category: 'EdTech & Hardware',
    categoryColor: '#0284c7', // light blue
    badgeBg: '#e0f2fe',
    description:
      'Robots modulares con chasis impresos en bioplásticos de maíz, controlados por microcontroladores ESP32 y programación visual por bloques o Python. Diseñados para cerrar la brecha tecnológica en colegios de América Latina.',
    founder: {
      name: 'Santiago Delgado',
      role: 'Director de Hardware & Robótica',
    },
    products: [
      'Kit Explorer Bot v2 con sensores ultrasónicos',
      'Brazo robótico programable de 4 ejes',
      'Portal web interactivo con 40 misiones didácticas',
    ],
    contact: {
      email: 'santiago@robonovadynamics.com',
      phone: '+57 318 642 9812',
      website: 'https://robonovadynamics.com',
      instagram: '@robonova.edu',
      tiktok: '@robonovadynamics',
      facebook: 'robonova.edu',
    },
    amenities: [
      'Módulo hexagonal Cowork inferior',
      '4 sillas ergonómicas',
      'Tomas eléctricas protegidas',
      'Pista de prueba miniatura para robots',
    ],
    schedule: [
      {
        time: '12:00 PM',
        title: 'Taller abierto: Programa tu primer robot en 15 minutos',
        location: 'Stand 04',
      },
      {
        time: '03:45 PM',
        title: 'Batalla amistosa de seguidores de línea',
        location: 'Stand 04',
      },
    ],
    spaceType: 'Isla Hexagonal Coworking - Módulo Sur',
  },
  {
    id: '05',
    standNumber: '05',
    name: 'FinAndes Pay',
    slogan: 'Pasarela de cobros instantáneos y microcréditos para pequeños negocios',
    category: 'FinTech',
    categoryColor: '#2563eb', // blue
    badgeBg: '#dbeafe',
    description:
      'Ecosistema financiero inclusivo que permite a tenderos y emprendedores cobrar con transferencias inmediatas de bajo costo, generar enlaces de pago y acceder a capital de trabajo en menos de 24 horas usando scoring alternativo.',
    founder: {
      name: 'Valentina Rincón',
      role: 'Fundadora & CEO',
    },
    products: [
      'Datáfono Smart Contactless sin cuota mensual',
      'Billetera digital empresarial FinAndes Negocios',
      'Microcréditos productivos a tasa justa',
    ],
    contact: {
      email: 'alianzas@finandespay.co',
      phone: '+57 315 229 8810',
      website: 'https://finandespay.co',
      linkedin: 'company/finandes-pay',
      tiktok: '@finandespay',
      facebook: 'finandespay',
    },
    amenities: [
      'Mesa central en rombo / diamante',
      '4 sillones ejecutivos de negociación',
      'Punto de conexión eléctrica central integrada',
      'Pantalla para demostración de checkout móvil',
    ],
    schedule: [
      {
        time: '11:00 AM',
        title: 'Asesorías 1 a 1 de diagnóstico financiero express',
        location: 'Stand 05',
      },
      {
        time: '02:30 PM',
        title: 'Pitch magistral de inversión',
        location: 'Sala de Capacitaciones',
      },
    ],
    spaceType: 'Isla Diamante Central de Networking 1',
  },
  {
    id: '06',
    standNumber: '06',
    name: 'EcoPlast Circular',
    slogan: 'Mobiliario y materiales constructivos a partir de plástico reciclado',
    category: 'Sostenibilidad & Diseño',
    categoryColor: '#0d9488', // teal
    badgeBg: '#ccfbf1',
    description:
      'Transformamos plásticos de un solo uso recolectados en ríos y costas en tablones de madera plástica indeformables, resistentes al agua y a la intemperie. Diseñamos mobiliario arquitectónico duradero y 100% reciclable.',
    founder: {
      name: 'Lucas Gómez & Mariana Vélez',
      role: 'Diseñadores Industriales & Co-Fundadores',
    },
    products: [
      'Línea de bancas y mesas para exterior EcoUrban',
      'Tablones arquitectónicos para decks y fachadas',
      'Macetas autorriego para agricultura urbana',
    ],
    contact: {
      email: 'contacto@ecoplastcircular.com',
      phone: '+57 311 902 4433',
      website: 'https://ecoplastcircular.com',
      instagram: '@ecoplast.circular',
      tiktok: '@ecoplastcircular',
      facebook: 'ecoplastcircular',
    },
    amenities: [
      'Mesa central en rombo / diamante',
      '4 sillones ejecutivos',
      'Expositor de muestras de materiales y texturas',
      'Punto de energía central',
    ],
    schedule: [
      {
        time: '01:30 PM',
        title: 'Demostración de resistencia mecánica de materiales',
        location: 'Stand 06',
      },
    ],
    spaceType: 'Isla Diamante Central de Networking 2',
  },
  {
    id: '07',
    standNumber: '07',
    name: 'Solaria Grid',
    slogan: 'Sistemas solares fotovoltaicos inteligentes y baterías de litio para PyMEs',
    category: 'Energías Limpias',
    categoryColor: '#ea580c', // orange
    badgeBg: '#ffedd5',
    description:
      'Diseño e instalación de microredes solares conectadas a la red o aisladas con telemetría IoT. Ayudamos a comercios y hogares a reducir hasta un 85% de su gasto eléctrico con monitoreo en tiempo real desde el celular.',
    founder: {
      name: 'Ing. Daniel Villamizar',
      role: 'Especialista en Energías Renovables',
    },
    products: [
      'Kit Solar Comercial 5kW con inversor inteligente',
      'Baterías de almacenamiento LiFePO4 de larga vida',
      'App Solaria Monitor con alertas de eficiencia energética',
    ],
    contact: {
      email: 'proyectos@solariagrid.com',
      phone: '+57 317 482 1199',
      website: 'https://solariagrid.com',
      tiktok: '@solariagrid',
      facebook: 'solariagrid',
    },
    amenities: [
      'Mesa central en rombo / diamante',
      '4 sillones ejecutivos',
      'Display LED con telemetría de generación solar en vivo',
      'Toma eléctrica central',
    ],
    schedule: [
      {
        time: '12:30 PM',
        title: 'Estudio de ahorro energético gratuito con tu última factura',
        location: 'Stand 07',
      },
      {
        time: '04:15 PM',
        title: 'Charla: Transición energética para negocios locales',
        location: 'Stand 07',
      },
    ],
    spaceType: 'Isla Diamante Central de Networking 3',
  },
  {
    id: '08',
    standNumber: '08',
    name: 'AgroDron Intelligence',
    slogan: 'Monitoreo aéreo con drones e IA multiespectral para cultivos de alta precisión',
    category: 'AgroTech',
    categoryColor: '#65a30d', // lime
    badgeBg: '#ecfccb',
    description:
      'Soluciones aéreas no tripuladas equipadas con sensores multiespectrales que generan mapas de vigor fotosintético (NDVI), detectan plagas antes del ojo humano y guían la fertilización variable con precisión milimétrica.',
    founder: {
      name: 'Valeria Rojas & Juan P. Duque',
      role: 'Ingenieros Agrónomos & Pilotos UAV',
    },
    products: [
      'Auditoría aérea multiespectral de cultivos',
      'Mapas digitales de prescripción agronómica',
      'Servicio de dispersión dirigida de bioinsumos',
    ],
    contact: {
      email: 'info@agrodronia.co',
      phone: '+57 314 380 5511',
      website: 'https://agrodronia.co',
      instagram: '@agrodron.ia',
      tiktok: '@agrodronia',
      facebook: 'agrodronia',
    },
    amenities: [
      'Mesa central en rombo / diamante',
      '4 sillones ejecutivos',
      'Dron agrícola profesional en exhibición sobre atril',
      'Conexión eléctrica central',
    ],
    schedule: [
      {
        time: '10:45 AM',
        title: 'Explicación del software de analítica predictiva de cultivos',
        location: 'Stand 08',
      },
      {
        time: '03:15 PM',
        title: 'Simulación en pantalla gigante de vuelo autónomo',
        location: 'Stand 08',
      },
    ],
    spaceType: 'Isla Diamante Central de Networking 4',
  },
  {
    id: '09',
    standNumber: '09',
    name: 'Vitalis Pet Care',
    slogan: 'Alimentación natural personalizada y medicina preventiva para mascotas',
    category: 'Salud & Mascotas',
    categoryColor: '#e11d48', // rose
    badgeBg: '#ffe4e6',
    description:
      'Nutrición canina y felina real cocinada al vacío (Sous-Vide) con ingredientes 100% grado humano, balanceada por médicos veterinarios zootecnistas según edad, raza y condición médica de cada animal.',
    founder: {
      name: 'Dr. Carlos Peñaloza',
      role: 'Médico Veterinario Nutricionista',
    },
    products: [
      'Planes mensuales personalizados Vitalis Fresh BARF',
      'Suplementos naturales de colágeno marino y cúrcuma',
      'Snacks deshidratados monoproteicos 100% naturales',
    ],
    contact: {
      email: 'hola@vitalispetcare.co',
      phone: '+57 310 558 7722',
      website: 'https://vitalispetcare.co',
      instagram: '@vitalispetcare',
      tiktok: '@vitalispetcare',
      facebook: 'vitalispetcare',
    },
    amenities: [
      'Módulo lateral con mostrador y sofá de descanso',
      '2 sillas ergonómicas giratorias',
      'Mini vitrina refrigerada para exhibición de alimentos',
      'Toma eléctrica mural dedicada',
    ],
    schedule: [
      {
        time: '11:45 AM',
        title: 'Consulta rápida de peso y condición corporal para mascotas',
        location: 'Stand 09',
      },
      {
        time: '02:15 PM',
        title: 'Muestra gratuita de snacks artesanales liofilizados',
        location: 'Stand 09',
      },
    ],
    spaceType: 'Módulo de Exhibición Pared Este 1',
  },
  {
    id: '10',
    standNumber: '10',
    name: 'NaturaPiel Botánica',
    slogan: 'Cosmética limpia y fitoterapia con activos de la biodiversidad amazónica',
    category: 'Belleza & Cuidado Personal',
    categoryColor: '#db2777', // pink
    badgeBg: '#fce7f3',
    description:
      'Línea de cuidado facial y corporal vegana, libre de sulfatos, parabenos y crueldad animal. Aprovechamos aceites nativos como el cacay, maracuyá y manteca de cupuazú obtenidos mediante recolección silvestre comunitaria.',
    founder: {
      name: 'Isabela Duarte',
      role: 'Química Farmacéutica & Formuladora Botánica',
    },
    products: [
      'Óleo regenerador facial de Cacay 100% puro',
      'Protector solar mineral SPF 50 con zinc no nano',
      'Bálsamo labial reparador con manteca de copoazú',
    ],
    contact: {
      email: 'ventas@naturapiel.com',
      phone: '+57 316 714 3300',
      website: 'https://naturapielbotanica.com',
      instagram: '@naturapiel.botanica',
      tiktok: '@naturapielbotanica',
      facebook: 'naturapielbotanica',
    },
    amenities: [
      'Módulo lateral con tocador de pruebas y espejo',
      'Sofá cómodo para clientes y 2 sillas ergonómicas',
      'Punto eléctrico para lámpara de diagnóstico facial',
      'Zona de testeadores de aromaterapia',
    ],
    schedule: [
      {
        time: '12:15 PM',
        title: 'Diagnóstico de tipo de piel con microcámara dermatológica',
        location: 'Stand 10',
      },
      {
        time: '04:45 PM',
        title: 'Taller de automasaje facial con gua sha de cuarzo',
        location: 'Stand 10',
      },
    ],
    spaceType: 'Módulo de Exhibición Pared Este 2',
  },
  {
    id: '11',
    standNumber: '11',
    name: 'Hilando Raíces',
    slogan: 'Indumentaria ética y contemporánea co-creada con maestras artesanas',
    category: 'Moda Sostenible',
    categoryColor: '#9333ea', // purple
    badgeBg: '#f3e8ff',
    description:
      'Marca de moda consciente que une siluetas modernas de sastrería urbana con técnicas ancestrales de telar vertical y tintes vegetales. Garantizamos pago digno, comercio justo y preservación del patrimonio textil originario.',
    founder: {
      name: 'Andrea Tique & Rosa Guanga',
      role: 'Directora Creativa & Maestra Tejedora',
    },
    products: [
      'Chaquetas estructuradas con apliques en telar de algodón orgánico',
      'Bolsos utilitarios en fibra de fique y cuero vegetal',
      'Ruanas contemporáneas tejidas en lana de oveja natural',
    ],
    contact: {
      email: 'comercial@hilandoraices.org',
      phone: '+57 319 822 6115',
      website: 'https://hilandoraices.org',
      instagram: '@hilandoraices',
      tiktok: '@hilandoraices',
      facebook: 'hilandoraices',
    },
    amenities: [
      'Módulo lateral con perchero de exhibición iluminado',
      'Sofá de descanso y 2 sillas giratorias',
      'Muestrario de hilos tinturados con cúrcuma e índigo',
      'Toma eléctrica mural',
    ],
    schedule: [
      {
        time: '01:00 PM',
        title: 'Demostración de hilado tradicional en huso y telar',
        location: 'Stand 11',
      },
      {
        time: '05:15 PM',
        title: 'Desfile espontáneo de prendas de la colección nueva',
        location: 'Pasillo Central',
      },
    ],
    spaceType: 'Módulo de Exhibición Pared Este 3',
  },
  {
    id: '12',
    standNumber: '12',
    name: 'OptiFleet Logística Verde',
    slogan: 'Entregas de última milla con flota 100% eléctrica y algoritmos de optimización',
    category: 'Logística & Transporte',
    categoryColor: '#0284c7', // sky
    badgeBg: '#f0f9ff',
    description:
      'Operador logístico carbono neutral para tiendas online y corporaciones. Agrupamos despachos urbanos con vehículos eléctricos compactos y bicicletas de carga, logrando tiempos de entrega récord y cero emisiones directas.',
    founder: {
      name: 'Jorge Iván Marín',
      role: 'Ingeniero de Operaciones & Fundador',
    },
    products: [
      'Servicio Same-Day Delivery carbono cero',
      'Integración API con Shopify, WooCommerce y MercadoLibre',
      'Reporte certificado mensual de reducción de huella de CO2',
    ],
    contact: {
      email: 'hola@optifleet.co',
      phone: '+57 302 449 8190',
      website: 'https://optifleet.co',
      linkedin: 'company/optifleet-logistica',
      tiktok: '@optifleet',
      facebook: 'optifleetlogistica',
    },
    amenities: [
      'Módulo lateral con sofá de reuniones',
      '2 sillas de trabajo ergonómicas',
      'Monitor de rutas en vivo con geolocalización GPS',
      'Toma eléctrica mural',
    ],
    schedule: [
      {
        time: '11:30 AM',
        title: 'Calculadora de costos y ahorro de emisiones para tu ecommerce',
        location: 'Stand 12',
      },
      {
        time: '03:30 PM',
        title: 'Demostración de integración de checkout en 5 minutos',
        location: 'Stand 12',
      },
    ],
    spaceType: 'Módulo de Exhibición Pared Este 4',
  },
  {
    id: '13',
    standNumber: '13',
    name: 'DocAI Health Assistant',
    slogan: 'Copiloto de IA para historia clínica automática y triaje médico inteligente',
    category: 'HealthTech & IA',
    categoryColor: '#3b82f6', // blue
    badgeBg: '#eff6ff',
    description:
      'Software médico avalado clínicamente que transcribe la conversación médico-paciente en tiempo real, redacta la evolución médica en formato SOAP y sugiere códigos diagnósticos CIE-10, ahorrando 2 horas de papeleo diario a los especialistas.',
    founder: {
      name: 'Dr. Fernando Ruiz & Ing. Laura Beltrán',
      role: 'Médico Internista & Científica de Datos',
    },
    products: [
      'DocAI Voice Assistant para consultorios médicos',
      'Módulo de interoperabilidad de historias clínicas',
      'Portal web seguro de teleconsulta asistida por IA',
    ],
    contact: {
      email: 'contacto@docaihealth.io',
      phone: '+57 313 770 1928',
      website: 'https://docaihealth.io',
      linkedin: 'company/docai-health',
      tiktok: '@docaihealth',
      facebook: 'docaihealth',
    },
    amenities: [
      'Módulo central doble (Isla de Trabajo Norte)',
      '4 sillas ergonómicas giratorias',
      'Tomas eléctricas protegidas para laptops de demo',
      'Cercanía al Tablero de anotaciones técnicas',
    ],
    schedule: [
      {
        time: '10:15 AM',
        title: 'Demo interactiva: Simulación de consulta médica en vivo con IA',
        location: 'Stand 13',
      },
      {
        time: '02:45 PM',
        title: 'Sesión técnica de ciberseguridad y protección de datos de salud',
        location: 'Stand 13',
      },
    ],
    spaceType: 'Estación de Trabajo Dual Central - Nivel Superior',
  },
  {
    id: '14',
    standNumber: '14',
    name: 'SensoryBrew Fermentos',
    slogan: 'Kombuchas funcionales y sodas prebióticas elaboradas con botánicos andinos',
    category: 'Alimentos & Bebidas',
    categoryColor: '#8b5cf6', // violet
    badgeBg: '#ede9fe',
    description:
      'Bebidas fermentadas vivas ricas en probióticos y ácidos orgánicos. Elaboradas mediante fermentación lenta tradicional en barricas de roble e infusionadas con gulupa, uchuva, lavanda y adaptógenos que promueven el bienestar digestivo.',
    founder: {
      name: 'Paula Santana',
      role: 'Sommelier & Fermentadora en Jefe',
    },
    products: [
      'Kombucha Artesanal de Gulupa & Jengibre Silvestre',
      'Refresco prebiótico de Flor de Jamaica & Cardamomo',
      'Pack degustación mixología botánica sin alcohol',
    ],
    contact: {
      email: 'ventas@sensorybrew.co',
      phone: '+57 305 918 2004',
      website: 'https://sensorybrew.co',
      instagram: '@sensorybrew',
      tiktok: '@sensorybrew',
      facebook: 'sensorybrew',
    },
    amenities: [
      'Módulo central doble (Isla de Trabajo Sur)',
      '4 sillas ergonómicas',
      'Enfriador dispensador para servicio de degustación',
      'Puntos eléctricos dedicados',
    ],
    schedule: [
      {
        time: '12:45 PM',
        title: 'Cata y maridaje guiado de fermentos probióticos',
        location: 'Stand 14',
      },
      {
        time: '04:15 PM',
        title: 'Taller: Microbiota y bienestar digestivo',
        location: 'Stand 14',
      },
    ],
    spaceType: 'Estación de Trabajo Dual Central - Nivel Inferior',
  },
  {
    id: '15',
    standNumber: '15',
    name: 'TerraViva Arquitectura Modular',
    slogan: 'Módulos habitacionales bioclimáticos de rápida instalación y madera certificada',
    category: 'Arquitectura & Hábitat',
    categoryColor: '#10b981', // emerald
    badgeBg: '#d1fae5',
    description:
      'Diseño y fabricación de módulos prefabricados para ecoturismo, glampings, oficinas de jardín y vivienda rural sostenible. Ensamblaje en seco en menos de 7 días, con aislamiento acústico y térmico de fibra de cáñamo.',
    founder: {
      name: 'Arq. Gabriel Moncada',
      role: 'Arquitecto Bioclimático & Director',
    },
    products: [
      'Tiny House bioclimática modelo Alborada (24m²)',
      'Garden Cube acústico para Home Office (9m²)',
      'Módulos sanitarios ecológicos con biodigestor',
    ],
    contact: {
      email: 'proyectos@terravivamodular.com',
      phone: '+57 321 665 4310',
      website: 'https://terravivamodular.com',
      instagram: '@terraviva.modular',
      tiktok: '@terravivamodular',
      facebook: 'terravivamodular',
    },
    amenities: [
      'Zona VIP Lounge Sur con sofá blanco modular',
      'Puff violeta ergonómico de descanso',
      'Mesa de planos técnicos y maquetas a escala',
      'Toma eléctrica mural y excelente iluminación',
    ],
    schedule: [
      {
        time: '01:15 PM',
        title: 'Presentación de maquetas y recorrido en realidad virtual',
        location: 'Stand 15',
      },
      {
        time: '03:45 PM',
        title: 'Charla: Rentabilidad de glampings sostenibles en Colombia',
        location: 'Sala de Capacitaciones',
      },
    ],
    spaceType: 'Zona Lounge VIP de Arquitectura & Proyectos',
  },
];

// Coordinates inside the SVG (viewBox: 0 0 920 1020)
// matching the exact positions in "Plano v03.svg"
export const STAND_COORDINATES: Record<string, StandCoordinates> = {
  '01': {
    id: '01',
    x: 48,
    y: 110,
    r: 15,
    label: '01',
    zone: 'Entrada Oeste / Módulos',
  },
  '02': {
    id: '02',
    x: 175,
    y: 56,
    r: 15,
    label: '02',
    zone: 'Lounge Norte',
  },
  '03': {
    id: '03',
    x: 138,
    y: 185,
    r: 15,
    label: '03',
    zone: 'Cowork Hexagonal Norte',
  },
  '04': {
    id: '04',
    x: 138,
    y: 235,
    r: 15,
    label: '04',
    zone: 'Cowork Hexagonal Sur',
  },
  '05': {
    id: '05',
    x: 390,
    y: 210,
    r: 15,
    label: '05',
    zone: 'Isla Diamante Central 1',
  },
  '06': {
    id: '06',
    x: 390,
    y: 290,
    r: 15,
    label: '06',
    zone: 'Isla Diamante Central 2',
  },
  '07': {
    id: '07',
    x: 390,
    y: 370,
    r: 15,
    label: '07',
    zone: 'Isla Diamante Central 3',
  },
  '08': {
    id: '08',
    x: 390,
    y: 450,
    r: 15,
    label: '08',
    zone: 'Isla Diamante Central 4',
  },
  '09': {
    id: '09',
    x: 584,
    y: 218,
    r: 15,
    label: '09',
    zone: 'Pared Este - Módulo 1',
  },
  '10': {
    id: '10',
    x: 584,
    y: 285,
    r: 15,
    label: '10',
    zone: 'Pared Este - Módulo 2',
  },
  '11': {
    id: '11',
    x: 584,
    y: 368,
    r: 15,
    label: '11',
    zone: 'Pared Este - Módulo 3',
  },
  '12': {
    id: '12',
    x: 584,
    y: 435,
    r: 15,
    label: '12',
    zone: 'Pared Este - Módulo 4',
  },
  '13': {
    id: '13',
    x: 553,
    y: 516,
    r: 15,
    label: '13',
    zone: 'Isla Central Doble - Norte',
  },
  '14': {
    id: '14',
    x: 553,
    y: 598,
    r: 15,
    label: '14',
    zone: 'Isla Central Doble - Sur',
  },
  '15': {
    id: '15',
    x: 576,
    y: 680,
    r: 15,
    label: '15',
    zone: 'Lounge VIP Sur',
  },
};

// Y-positions for the vertical legend list on the right column
export const RIGHT_LEGEND_ITEMS = [
  { id: '01', y: 158 },
  { id: '02', y: 198 },
  { id: '03', y: 238 },
  { id: '04', y: 278 },
  { id: '05', y: 318 },
  { id: '06', y: 358 },
  { id: '07', y: 398 },
  { id: '08', y: 438 },
  { id: '09', y: 478 },
  { id: '10', y: 518 },
  { id: '11', y: 558 },
  { id: '12', y: 598 },
  { id: '13', y: 638 },
  { id: '14', y: 678 },
  { id: '15', y: 718 },
];

export const STORAGE_KEY = 'feria_emprendimiento_exhibitors_v1';

export function getStoredExhibitors(): Exhibitor[] {
  if (typeof window === 'undefined') return INITIAL_EXHIBITORS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_EXHIBITORS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Merge with default TikTok and Facebook if missing from previously stored records
      return parsed.map((item: Exhibitor) => {
        const init = INITIAL_EXHIBITORS.find((e) => e.id === item.id);
        return {
          ...item,
          contact: {
            tiktok: init?.contact?.tiktok,
            facebook: init?.contact?.facebook,
            ...item.contact,
          },
        };
      });
    }
  } catch (e) {
    console.error('Error loading stored exhibitors:', e);
  }
  return INITIAL_EXHIBITORS;
}

export function saveStoredExhibitors(exhibitors: Exhibitor[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibitors));
  } catch (e) {
    console.error('Error saving exhibitors:', e);
  }
}
