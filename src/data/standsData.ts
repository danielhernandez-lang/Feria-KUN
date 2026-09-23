import { Exhibitor, StandCoordinates } from '../types';
import { EXHIBITOR_DEFAULT_LOGOS } from './exhibitorLogos';

export const INITIAL_EXHIBITORS: Exhibitor[] = [
  {
    id: '01',
    standNumber: '01',
    name: 'JOB Store',
    slogan: 'Moda y accesorios',
    category: 'Moda y accesorios',
    categoryColor: '#059669',
    badgeBg: '#ecfdf5',
    description: 'Ropa para dama, Blusas y Bodys ',
    founder: {
      name: 'Natalia Ramírez ',
      role: 'Fundadora',
      avatar: '',
    },
    products: ['Ropa para dama', 'Blusas', 'Bodys '],
    contact: {
      phone: '3234313629',
      email: 'rnatalia858@gmail.com',
      website: '',
      instagram: '@jobstore.bog',
      tiktok: '@jobstore.bog',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '1 Sofá dos puestos',
      '2 mesas altas',
      '2 sillas ergonómicas',
      'Punto eléctrico (Pared)',
    ],
    schedule: [],
    spaceType: 'Stand 01',
    logoUrl: 'https://drive.google.com/file/d/1EJN_k0X3bfeyULGoYyLNAOBLOn9nVuSY/view?usp=drive_link',
  },
  {
    id: '02',
    standNumber: '02',
    name: 'Vinculaciones CUN',
    slogan: 'Conoce a CUN y sus programas académicos',
    category: 'CUN Institucional',
    categoryColor: '#d97706',
    badgeBg: '#fef3c7',
    description: 'Equipo de vinculaciones CUN para oferta de pregrados y posgrados',
    founder: {
      name: 'Luz ',
      role: '',
      avatar: '',
    },
    products: [],
    contact: {
      phone: '',
      email: '',
      website: 'www.cun.edu.co',
      instagram: '@yosoycun',
      tiktok: '@yosoycun',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '1 Sofá 3 puestos',
      '2 mesas bajas',
      '3 puffs',
      'Punto eléctrico (requiere extensión) (Pared)',
    ],
    schedule: [],
    spaceType: 'Stand 02',
    logoUrl: '/Logo_CUN.svg',
  },
  {
    id: '03',
    standNumber: '03',
    name: 'Mr Pin Star ',
    slogan: 'Haz que tu pin hable por tí',
    category: 'Moda y accesorios',
    categoryColor: '#4f46e5',
    badgeBg: '#e0e7ff',
    description: 'Vendemos Sticker Pines que hablan por nuestros clientes.',
    founder: {
      name: 'Johan Tamayo ',
      role: 'Fundador y Director General ',
      avatar: '',
    },
    products: [],
    contact: {
      phone: '3150682247',
      email: 'johantamayo470@gmail.com',
      website: '',
      instagram: '@mr_pinstar',
      tiktok: '',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '3 mesas modulares',
      '2 sillas ergonómicas',
      'Punto eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 03',
    logoUrl: '/logos/mr_pinstar.svg',
  },
  {
    id: '04',
    standNumber: '04',
    name: 'REAL GAMES STORE',
    slogan: 'Lleva tu experiencia gamer al siguiente nivel.',
    category: 'Video juegos ',
    categoryColor: '#0284c7',
    badgeBg: '#e0f2fe',
    description:
      'El emprendimiento lleva a la venta video juegos, consolas, controles, accesorios, video juegos nuevos y retro; adiccional tenemos tambien el tema de servicio técnico.',
    founder: {
      name: 'Geraldine Yanguatin Sierra',
      role: 'Fundadora',
      avatar: '',
    },
    products: [
      'Video juegos (Nuevos y Retro)',
      'Consolas',
      'Controles',
      'Accesorios',
      'Servicio técnico',
    ],
    contact: {
      phone: '3123634921',
      email: 'geraldine.yanguatin@cun.edu.co',
      website: 'https://realgamesstore.com/',
      instagram: '@realgamesstore',
      tiktok: '@realgamesstore',
      facebook: 'https://www.facebook.com/realgamesstorearcade',
      linkedin: '',
    },
    amenities: [
      '3 mesas modulares',
      '2 sillas ergonómicas',
      'Punto eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 04',
    logoUrl: 'https://drive.google.com/file/d/1TJYYId258ZUc8Bv2_mXbE8jB_F5UOoCj/view?usp=drive_link',
  },
  {
    id: '05',
    standNumber: '05',
    name: 'San Geronimo Pets',
    slogan: 'Juguetes para perros y gatos, Snacks para perros, Cajas con 5 artículos para perros',
    category: 'Mascotas',
    categoryColor: '#2563eb',
    badgeBg: '#dbeafe',
    description: 'Venta de accesorios para mascotas',
    founder: {
      name: 'Carolina Bolaños',
      role: 'Fundadora',
      avatar: '',
    },
    products: [
      'Juguetes para perros y gatos',
      'Snacks para perros',
      'Cajas con 5 artículos para perros',
    ],
    contact: {
      phone: '3122487248',
      email: 'distribuidorasangeronimo@gmail.com',
      website: 'https://sangeronimopets.com/',
      instagram: '@sangeronimopets',
      tiktok: '@sangeronimopets',
      facebook: '@sangeronimopets',
      linkedin: '',
    },
    amenities: [
      '1 mesa alta redonda',
      '4 sillas altas',
      'Punto Eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 05',
    logoUrl: 'https://drive.google.com/file/d/15vt31Ock1ePMwdLSdV0aJv49dYtdFUYL/view?usp=drive_link',
  },
  {
    id: '06',
    standNumber: '06',
    name: 'MATHU',
    slogan: 'Especialistas en transformar emociones en detalles.',
    category: 'Regalos y detalles',
    categoryColor: '#0d9488',
    badgeBg: '#ccfbf1',
    description:
      'El emprendimiento ofrece detalles y decoraciones donde maneja anchetas, desayunos, cajas dulcesas, pines en foamy, rosas eternas y diferentes cajas personalizadas',
    founder: {
      name: 'Paula Vanessa Gil Chaparro',
      role: 'Fundadora',
      avatar: '',
    },
    products: [
      'Anchetas',
      'Desayunos',
      'Cajas dulces',
      'Pines en foamy',
      'Rosas eternas',
      'Cajas personalizadas',
    ],
    contact: {
      phone: '3169797995',
      email: 'mathudecoraciones23@gmail.com',
      website: '',
      instagram: '',
      tiktok: '',
      facebook: 'https://www.facebook.com/mathu23esamor',
      linkedin: '',
    },
    amenities: [
      '1 mesa alta redonda',
      '4 sillas altas',
      'Punto Eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 06',
    logoUrl: 'https://drive.google.com/file/d/1FfeW3mdQyFOAwn2D0rE2o8bWM2lEzU7c/view?usp=drive_link',
  },
  {
    id: '07',
    standNumber: '07',
    name: 'Rocketbaby',
    slogan: 'RocketBaby — Donde comienzan las grandes aventuras. 🚀✨',
    category: 'Moda y accesorios',
    categoryColor: '#ea580c',
    badgeBg: '#ffedd5',
    description:
      'Es una marca colombiana de ropa para bebés de 0 a 36 meses, creada para acompañar cada etapa con comodidad, suavidad y estilo, con diseños pensados para el día a día de los pequeños.',
    founder: {
      name: 'Estefany Castañeda',
      role: 'Fundadora',
      avatar: '',
    },
    products: [
      'Primera puesta',
      'Bodys',
      'Camisetas',
      'Pantalones',
      'Conjuntos',
      'Prendas abrigadoras',
      'Packs de básicos',
    ],
    contact: {
      phone: '3238146921',
      email: 'estefany.castaneda@cun.edu.co',
      website: 'https://rocketbabycol.com/',
      instagram: '@Rocketbabycol ',
      tiktok: '@rocketbabycol',
      facebook: '@Rocketbabycol ',
      linkedin: '',
    },
    amenities: [
      '1 mesa alta redonda',
      '4 sillas altas',
      'Punto Eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 07',
    logoUrl: 'https://drive.google.com/file/d/1syVsOqrJn1Dgj1f88JwQ-b5t0Y9DppMA/view?usp=drive_link',
  },
  {
    id: '08',
    standNumber: '08',
    name: '',
    slogan: '',
    category: '',
    categoryColor: '#65a30d',
    badgeBg: '#ecfccb',
    description: '',
    founder: {
      name: '',
      role: '',
      avatar: '',
    },
    products: [],
    contact: {
      phone: '',
      email: '',
      website: '',
      instagram: '',
      tiktok: '',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '1 mesa alta redonda',
      '4 sillas altas',
      'Punto Eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 08',
    logoUrl: '',
  },
  {
    id: '09',
    standNumber: '09',
    name: 'Mersaki',
    slogan: 'Comodidad que inspira, estilo que enamora.',
    category: 'Moda y accesorios',
    categoryColor: '#e11d48',
    badgeBg: '#ffe4e6',
    description:
      'Confeccionamos prendas de dormir para toda la familia, combinando comodidad, diseño y calidad en cada detalle. Somos fabricantes y seleccionamos telas de excelente calidad, suaves, frescas y agradables al tacto, pensadas para brindar descanso y bienestar.',
    founder: {
      name: 'Catalina Martinez',
      role: 'Fundadora y Directora General',
      avatar: '',
    },
    products: ['Pijamas para toda la familia', 'Camisetas', 'Hoddies'],
    contact: {
      phone: '3173098702',
      email: 'ktik8321@gmail.com',
      website: 'https://mersaki.cercia.co/',
      instagram: '@mersakifashion',
      tiktok: '@mersakifashion',
      facebook: '@mersakifashion',
      linkedin: '',
    },
    amenities: [
      '1 Sofá dos puestos',
      '2 mesas altas',
      '2 sillas ergonómicas',
      'Punto eléctrico (Pared)',
    ],
    schedule: [],
    spaceType: 'Stand 09',
    logoUrl: 'https://drive.google.com/file/d/10786_cXztkqWXMB0bsGE31HDQMWR5QOr/view?usp=drive_link',
  },
  {
    id: '10',
    standNumber: '10',
    name: 'Blar Beauty',
    slogan: 'Blar Beauty es una tienda de maquillaje, accesorios y también cuidado facial.',
    category: 'Belleza',
    categoryColor: '#db2777',
    badgeBg: '#fce7f3',
    description:
      'Blar Beauty es una tienda de maquillaje, accesorios y productos de cuidado facial, donde ofrecemos productos de belleza seleccionados para diferentes necesidades y gustos. Buscamos que nuestros clientes no solo encuentren productos que les gusten, sino que también conozcan cómo utilizarlos y cuáles son los más adecuados para ellos.',
    founder: {
      name: 'Lenis Valentina Aroca Rincon',
      role: 'Fundadora & CEO',
      avatar: '',
    },
    products: [
      'Maquillaje',
      'Sombras',
      'Pestañinas',
      'Gloss',
      'Tintas',
      'Iluminadores',
      'Productos para el cuidado y preparación de la piel',
      'Desmaquillantes y productos para la limpieza facial',
      'Accesorios de maquillaje',
      'Colecciones especiales',
      'Kits de maquillaje',
    ],
    contact: {
      phone: '3222397215',
      email: 'lenis.aroca@cun.edu.co',
      website: '',
      instagram: '@BlarBeauty',
      tiktok: '@BlarBeauty',
      facebook: '@BlarBeauty',
      linkedin: '',
    },
    amenities: [
      '1 Sofá dos puestos',
      '2 mesas altas',
      '2 sillas ergonómicas',
      'Punto eléctrico (Pared)',
    ],
    schedule: [],
    spaceType: 'Stand 10',
    logoUrl: 'https://drive.google.com/file/d/1QxBDdiyyOTsBnNkrGBcpsj6CFh-XGm6l/view?usp=drive_link',
  },
  {
    id: '11',
    standNumber: '11',
    name: 'Eres Magia',
    slogan: 'Eres magia 🪄Naciste para brillar 💖',
    category: 'Belleza',
    categoryColor: '#9333ea',
    badgeBg: '#f3e8ff',
    description:
      'Somos una marca dedicada al cuidado personal y la belleza, con una propuesta multimarca que reúne diferentes productos pensados para consentirte y resaltar tu bienestar. Además, elaboramos nuestras propias mantequillas artesanales “Eres Magia”, creadas con dedicación y enfocadas en brindar una experiencia especial para la piel.',
    founder: {
      name: 'Valentina Correa ',
      role: 'Fundadora y Gerente General',
      avatar: '',
    },
    products: [
      'Ramos de maquillaje para regalar de amor y amistad',
      'Mantequillas corporales',
      'Kits de maquillaje',
    ],
    contact: {
      phone: '3043030720',
      email: 'correacamelo06@gmail.com',
      website: '',
      instagram: '@eres_magia_vc ',
      tiktok: '@eres_magia_vc ',
      facebook: 'https://www.facebook.com/p/Eres-magia-vc-61589252401005/',
      linkedin: '',
    },
    amenities: [
      '1 Sofá dos puestos',
      '2 mesas altas',
      '2 sillas ergonómicas',
      'Punto eléctrico (Pared)',
    ],
    schedule: [],
    spaceType: 'Stand 11',
    logoUrl: 'https://drive.google.com/file/d/1tTphI2Bn1aiaDu1QCeb9RgH4IapDIKwq/view?usp=drive_link',
  },
  {
    id: '12',
    standNumber: '12',
    name: 'Engomecepex',
    slogan: 'Pines y accesorios con  personalidad',
    category: 'Moda y accesorios',
    categoryColor: '#0284c7',
    badgeBg: '#f0f9ff',
    description:
      'Engomecepex es un emprendimiento de diseño e ilustración que transforma ideas, personajes y referentes culturales en productos coleccionables y souvenirs. Creamos pines;llaveros;mini CDs;sticker;figuras en 3d;ilustraciones únicas. ',
    founder: {
      name: 'Yule Castillo ',
      role: 'Fundadora y Directora General ',
      avatar: '',
    },
    products: ['Pines', 'Llaveros', 'Mini CDs', 'Sticker', 'Figuras en 3d', 'Ilustraciones únicas'],
    contact: {
      phone: '3028080602',
      email: 'engomecepex@gmail.com',
      website: 'https://engomecepex.my.canva.site/',
      instagram: '@engomecepex',
      tiktok: '',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '1 Sofá dos puestos',
      '2 mesas altas',
      '2 sillas ergonómicas',
      'Punto eléctrico (Pared)',
    ],
    schedule: [],
    spaceType: 'Stand 12',
    logoUrl: 'https://drive.google.com/file/d/1UkbsVes03g41p2tGrNuX6FTykUKQm0mG/view?usp=drive_link',
  },
  {
    id: '13',
    standNumber: '13',
    name: 'OSADÍA',
    slogan: 'Emprendimiento de accesorios que busca complementar el estilo y la personalidad de cada persona. ',
    category: 'Moda y accesorios',
    categoryColor: '#3b82f6',
    badgeBg: '#eff6ff',
    description:
      'Ofrecemos accesorios modernos, versátiles y con un toque de elegancia, pensados para mujeres y hombres que quieren expresar su esencia y atreverse a destacar. ✨',
    founder: {
      name: 'Nicol Guzman Gomez',
      role: 'Fundadora & CEO',
      avatar: '',
    },
    products: ['Gafas', 'Joyas', 'Pañoletas', 'Pinzas', 'Gorras'],
    contact: {
      phone: '3193766818',
      email: 'nicolg2019@gmail.com',
      website: '',
      instagram: '@_osadia22_',
      tiktok: '_osadia22_',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '3 mesas altas',
      '3 sillas ergonómicas',
      'Punto eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 13',
    logoUrl: 'https://drive.google.com/file/d/1fNwWSFsqPYlWgKAtVano2NJABP-PXB4t/view?usp=drive_link',
  },
  {
    id: '14',
    standNumber: '14',
    name: 'Tomodachi Otaku ',
    slogan: 'Vive la pasión por tus hobbies',
    category: 'Moda y accesorios',
    categoryColor: '#8b5cf6',
    badgeBg: '#ede9fe',
    description:
      'Nuestro emprendimiento busca ayudar a los jóvenes a sentirse identificados con sus gustos personales sin miedo a ser juzgados, portando prendas de vestir, accesorios y artículos de series anime de su preferencia, siempre dando un asesoramiento no como una empresa sino como un amigo, tal y como nuestra Marca indica Tomodachi (Amigo) Otaku (persona que gusta de series de anime), buscando la comodidad de nuestros clientes y total sinceridad en nuestros consejos.',
    founder: {
      name: 'Luna Estefanía Bolívar Ortiz ',
      role: 'Fundadora & CEO',
      avatar: '',
    },
    products: ['Peluches', 'Pines', 'Llaveros', 'Bisutería', 'Figuras cultura Geek y K-Pop'],
    contact: {
      phone: '3219855040',
      email: 'valentina27aldana@gmail.com',
      website: '',
      instagram: '@tomodachi.otaku',
      tiktok: '@tomodachi.otaku',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '3 mesas altas',
      '3 sillas ergonómicas',
      'Punto eléctrico (Piso)',
    ],
    schedule: [],
    spaceType: 'Stand 14',
    logoUrl: 'https://drive.google.com/file/d/1vVYB3wY2cHu22Cgqs5-5sQZsPvAV2Y5P/view?usp=sharing',
  },
  {
    id: '15',
    standNumber: '15',
    name: 'LORMI ',
    slogan: 'Ropa para dama y caballero actual y moderna',
    category: 'Moda y accesorios',
    categoryColor: '#10b981',
    badgeBg: '#d1fae5',
    description:
      'Vendemos ropa para dama y caballero actual y moderna, busos con diseños personalizados y artesanias a partir de materiales textiles',
    founder: {
      name: 'Lorena Urrego ',
      role: 'Fundadora',
      avatar: '',
    },
    products: [
      'Ropa para dama',
      'Ropa para caballero',
      'Busos con diseños personalizados',
      'Artesanias a partir de materiales textiles',
    ],
    contact: {
      phone: '3162079713',
      email: 'angie.urregob@cun.edu.co',
      website: '',
      instagram: '@lormi_13',
      tiktok: '@lormi_13',
      facebook: '',
      linkedin: '',
    },
    amenities: [
      '2 sofás',
      '2 mesas bajas (por confirmar)',
      '2 Puntos eléctricos (Pared)',
    ],
    schedule: [],
    spaceType: 'Stand 15',
    logoUrl: 'https://drive.google.com/file/d/1pAi1h4jaPKivnJ1lyLgXDiXmamKV188E/view?usp=drive_link',
  },
];

export const BASE_EXHIBITORS: Exhibitor[] = INITIAL_EXHIBITORS;

// Architectural coordinate mapping matching Plano v03.svg exactly
export const STAND_COORDINATES: Record<string, StandCoordinates> = {
  '01': {
    id: '01',
    x: 72,
    y: 109,
    r: 16,
    label: '01',
    zone: 'Ala Noroccidente - Entrada',
  },
  '02': {
    id: '02',
    x: 170,
    y: 65,
    r: 16,
    label: '02',
    zone: 'Zona Lounge Norte',
  },
  '03': {
    id: '03',
    x: 138,
    y: 185,
    r: 16,
    label: '03',
    zone: 'Módulo Hexagonal Norte',
  },
  '04': {
    id: '04',
    x: 138,
    y: 235,
    r: 16,
    label: '04',
    zone: 'Módulo Hexagonal Sur',
  },
  '05': {
    id: '05',
    x: 390,
    y: 210,
    r: 16,
    label: '05',
    zone: 'Mesa Central 05',
  },
  '06': {
    id: '06',
    x: 390,
    y: 290,
    r: 16,
    label: '06',
    zone: 'Mesa Central 06',
  },
  '07': {
    id: '07',
    x: 390,
    y: 370,
    r: 16,
    label: '07',
    zone: 'Mesa Central 07',
  },
  '08': {
    id: '08',
    x: 390,
    y: 450,
    r: 16,
    label: '08',
    zone: 'Mesa Central 08',
  },
  '09': {
    id: '09',
    x: 583,
    y: 218,
    r: 16,
    label: '09',
    zone: 'Ala Oriental - Módulo 09',
  },
  '10': {
    id: '10',
    x: 583,
    y: 285,
    r: 16,
    label: '10',
    zone: 'Ala Oriental - Módulo 10',
  },
  '11': {
    id: '11',
    x: 583,
    y: 368,
    r: 16,
    label: '11',
    zone: 'Ala Oriental - Módulo 11',
  },
  '12': {
    id: '12',
    x: 583,
    y: 435,
    r: 16,
    label: '12',
    zone: 'Ala Oriental - Módulo 12',
  },
  '13': {
    id: '13',
    x: 553,
    y: 517,
    r: 16,
    label: '13',
    zone: 'Isla Central - Puesto 13',
  },
  '14': {
    id: '14',
    x: 553,
    y: 595,
    r: 16,
    label: '14',
    zone: 'Isla Central - Puesto 14',
  },
  '15': {
    id: '15',
    x: 563,
    y: 640,
    r: 16,
    label: '15',
    zone: 'Lounge Sur - Módulo 15',
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

export const STORAGE_KEY = 'feria_emprendimiento_exhibitors_v5';

export function getStoredExhibitors(): Exhibitor[] {
  if (typeof window === 'undefined') return INITIAL_EXHIBITORS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with the official default exhibitors
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EXHIBITORS));
      } catch (e) {}
      return INITIAL_EXHIBITORS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item: Exhibitor) => {
        const init = INITIAL_EXHIBITORS.find((e) => e.id === item.id);
        return {
          ...init,
          ...item,
          category: (item.category !== undefined ? item.category : (init?.category || 'Moda y accesorios')) as Exhibitor['category'],
          logoUrl: item.logoUrl || init?.logoUrl || EXHIBITOR_DEFAULT_LOGOS[item.id],
          contact: {
            ...init?.contact,
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

export function resetToDefaultExhibitors(): Exhibitor[] {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EXHIBITORS));
    } catch (e) {
      console.error('Error resetting exhibitors to default:', e);
    }
  }
  return INITIAL_EXHIBITORS;
}
