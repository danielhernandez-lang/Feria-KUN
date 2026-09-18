export type StandCategory =
  | 'Biotecnología & Alimentos'
  | 'Gastronomía & Agro'
  | 'EdTech & Software'
  | 'EdTech & Hardware'
  | 'FinTech'
  | 'Sostenibilidad & Diseño'
  | 'Energías Limpias'
  | 'AgroTech'
  | 'Salud & Mascotas'
  | 'Belleza & Cuidado Personal'
  | 'Moda Sostenible'
  | 'Logística & Transporte'
  | 'HealthTech & IA'
  | 'Alimentos & Bebidas'
  | 'Arquitectura & Hábitat';

export type UserRole = 'admin' | 'viewer';

export interface AppUser {
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  isOwner?: boolean;
}

export const OWNER_ADMIN_EMAIL = 'daniel_hernandez@cun.edu.co';
export const OWNER_ADMIN_PASSWORD = ' ';

export interface ExhibitorContact {
  email: string;
  phone: string;
  website?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;
  facebook?: string;
}

export interface ExhibitorScheduleItem {
  time: string;
  title: string;
  location: string;
}

export interface Exhibitor {
  id: string; // e.g. "01"
  standNumber: string; // "01"
  name: string;
  slogan: string;
  category: StandCategory;
  categoryColor: string;
  logoUrl?: string;
  badgeBg: string;
  description: string;
  founder: {
    name: string;
    role: string;
    avatar?: string;
  };
  products: string[];
  contact: ExhibitorContact;
  amenities: string[];
  schedule: ExhibitorScheduleItem[];
  spaceType: string; // e.g. "Mesa de Exhibición", "Zona Lounge", "Isla Diamante"
}

export interface StandCoordinates {
  id: string; // "01" .. "15"
  x: number;
  y: number;
  r: number;
  label: string;
  zone: string;
}

export type FacilityType =
  | 'entrada'
  | 'recepcion'
  | 'bar'
  | 'capacitaciones'
  | 'banos'
  | 'escaleras'
  | 'electricidad'
  | 'descanso';
