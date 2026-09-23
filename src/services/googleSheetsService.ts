import { Exhibitor, StandCategory, ExhibitorScheduleItem } from '../types';

export interface SheetParseResult {
  success: boolean;
  exhibitors?: Exhibitor[];
  error?: string;
  rowCount?: number;
}

export const EXHIBITOR_EXPORT_HEADERS = [
  'Stand',
  'Nombre del Emprendimiento',
  'Slogan',
  'Categoría',
  'Tipo de Espacio',
  'Descripción',
  'Fundador / Emprendedor',
  'Cargo del Fundador',
  'Foto Avatar Fundador (URL)',
  'Teléfono / WhatsApp',
  'Correo Electrónico',
  'Sitio Web',
  'Instagram',
  'TikTok',
  'Facebook',
  'LinkedIn',
  'URL del Logo',
  'Productos Destacados (separados por punto y coma)',
  'Mobiliario y Equipamiento (separados por punto y coma)',
  'Agenda y Pitches (Formato: Hora | Título | Lugar ;; ...)',
  'Color Categoría (HEX)',
  'Color Fondo Badge',
];

/**
 * Extracts a Google Spreadsheet ID from a URL or raw ID string.
 */
export function extractSpreadsheetId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  
  if (/^[a-zA-Z0-9-_]{25,60}$/.test(trimmed)) {
    return trimmed;
  }
  
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }

  return null;
}

/**
 * Serializes a schedule array into a clean single-cell text representation.
 */
export function serializeSchedule(schedule: ExhibitorScheduleItem[]): string {
  if (!schedule || schedule.length === 0) return '';
  return schedule.map((s) => `${s.time} | ${s.title} | ${s.location}`).join(' ;; ');
}

/**
 * Deserializes schedule string back into ExhibitorScheduleItem array.
 */
export function parseSchedule(raw: string, standNum: string): ExhibitorScheduleItem[] {
  if (!raw || !raw.trim()) {
    return [
      { time: '09:00 AM - 11:30 AM', title: 'Atención al público y demostraciones en vivo', location: `Stand ${standNum}` },
      { time: '02:00 PM - 03:30 PM', title: 'Networking y citas comerciales', location: `Stand ${standNum}` },
      { time: '04:00 PM - 05:30 PM', title: 'Pitch de innovación abierta', location: 'Escenario Principal' },
    ];
  }
  const items: ExhibitorScheduleItem[] = [];
  const parts = raw.split(/;;|\n/);
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const pieces = trimmed.split('|').map((p) => p.trim());
    if (pieces.length >= 3) {
      items.push({ time: pieces[0], title: pieces[1], location: pieces[2] });
    } else if (pieces.length === 2) {
      items.push({ time: pieces[0], title: pieces[1], location: `Stand ${standNum}` });
    } else {
      items.push({ time: '09:00 AM - 11:30 AM', title: pieces[0], location: `Stand ${standNum}` });
    }
  }
  return items.length > 0
    ? items
    : [
        { time: '09:00 AM - 11:30 AM', title: 'Atención al público y demostraciones en vivo', location: `Stand ${standNum}` },
        { time: '02:00 PM - 03:30 PM', title: 'Networking y citas comerciales', location: `Stand ${standNum}` },
        { time: '04:00 PM - 05:30 PM', title: 'Pitch de innovación abierta', location: 'Escenario Principal' },
      ];
}

/**
 * Serializes an Exhibitor into a full 22-column array matching EXHIBITOR_EXPORT_HEADERS.
 */
export function serializeExhibitorToRow(e: Exhibitor): string[] {
  return [
    e.standNumber,
    e.name,
    e.slogan || '',
    e.category,
    e.spaceType || `Stand Módulo ${e.standNumber}`,
    e.description,
    e.founder.name,
    e.founder.role || 'Fundador & Líder de Proyecto',
    e.founder.avatar || '',
    e.contact.phone,
    e.contact.email,
    e.contact.website || '',
    e.contact.instagram || '',
    e.contact.tiktok || '',
    e.contact.facebook || '',
    e.contact.linkedin || '',
    e.logoUrl || '',
    (e.products || []).join('; '),
    (e.amenities || []).join('; '),
    serializeSchedule(e.schedule),
    e.categoryColor,
    e.badgeBg,
  ];
}

/**
 * Converts a column index (1-based) to Excel/Sheets column letters (1 -> A, 22 -> V, etc.).
 */
export function getColumnLetter(colIndex: number): string {
  let temp;
  let letter = '';
  let n = colIndex;
  while (n > 0) {
    temp = (n - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    n = Math.floor((n - temp - 1) / 26);
  }
  return letter;
}

/**
 * Fetches rows from a publicly shared or published Google Sheet using Google Visualizer API.
 * Handles both the comprehensive 22-column format and legacy positional sheets.
 */
export async function fetchPublicGoogleSheet(
  spreadsheetIdOrUrl: string,
  sheetName: string = 'Sheet1'
): Promise<SheetParseResult> {
  const spreadsheetId = extractSpreadsheetId(spreadsheetIdOrUrl);
  if (!spreadsheetId) {
    return {
      success: false,
      error: 'El enlace o ID de Google Sheets proporcionado no es válido.',
    };
  }

  // Google Visualization API endpoint: returns JSON with table data
  const tqUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(
    sheetName
  )}`;

  try {
    const response = await fetch(tqUrl);
    if (!response.ok) {
      throw new Error(`Error de red HTTP ${response.status}: Asegúrate de que el archivo esté compartido como "Cualquier persona con el enlace".`);
    }

    const text = await response.text();
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);
    if (!jsonMatch || !jsonMatch[1]) {
      throw new Error('No se pudo interpretar la respuesta de Google Sheets. Verifica que el archivo sea una hoja de cálculo válida.');
    }

    const data = JSON.parse(jsonMatch[1]);
    if (data.status === 'error') {
      const msg = data.errors?.[0]?.detailed_message || data.errors?.[0]?.message || 'Error desconocido';
      throw new Error(`Google Sheets reportó un error: ${msg}`);
    }

    const table = data.table;
    if (!table || !table.rows || table.rows.length === 0) {
      return {
        success: false,
        error: 'La hoja de cálculo está vacía o no contiene filas de datos.',
      };
    }

    // Inspect columns from gviz table metadata or row 0
    const colLabels: string[] = (table.cols || []).map((col: any) =>
      (col.label || '').trim().toLowerCase()
    );

    let dataRows = table.rows;
    let detectedHeaders = colLabels;

    // Check if the very first row contains text headers instead of stand numbers
    if (dataRows.length > 0) {
      const firstRowCols = dataRows[0].c || [];
      const firstVal = String(firstRowCols[0]?.v || '').trim().toLowerCase();
      if (firstVal.includes('stand') || firstVal.includes('número') || firstVal.includes('numero') || firstVal.includes('pos')) {
        detectedHeaders = firstRowCols.map((c: any) => String(c?.v || c?.f || '').trim().toLowerCase());
        dataRows = dataRows.slice(1);
      }
    }

    // Helper to find column index by matching header substrings
    const findIdx = (keywords: string[], fallbackIdx: number): number => {
      for (let i = 0; i < detectedHeaders.length; i++) {
        const h = detectedHeaders[i];
        if (h && keywords.some((k) => h.includes(k))) return i;
      }
      return fallbackIdx;
    };

    const idxStand = findIdx(['stand', 'número', 'numero', 'módulo', 'modulo'], 0);
    const idxName = findIdx(['nombre', 'marca', 'emprendimiento', 'empresa'], 1);
    const idxSlogan = findIdx(['slogan', 'frase', 'lema'], 2);
    const idxCategory = findIdx(['categoría', 'categoria', 'sector', 'rubro'], 3);
    const idxSpaceType = findIdx(['tipo de espacio', 'espacio', 'formato'], 4);
    const idxDescription = findIdx(['descripción', 'descripcion', 'resumen'], 5);
    const idxFounder = findIdx(['fundador', 'emprendedor', 'representante', 'líder', 'lider'], 6);
    const idxFounderRole = findIdx(['cargo', 'rol', 'especialidad'], 7);
    const idxFounderAvatar = findIdx(['avatar', 'foto', 'foto avatar', 'imagen fundador'], 8);
    const idxPhone = findIdx(['teléfono', 'telefono', 'whatsapp', 'celular', 'móvil', 'movil'], 9);
    const idxEmail = findIdx(['correo', 'email', 'mail'], 10);
    const idxWebsite = findIdx(['sitio web', 'web', 'página', 'pagina', 'url web'], 11);
    const idxInstagram = findIdx(['instagram', 'ig'], 12);
    const idxTiktok = findIdx(['tiktok', 'tik tok', 'tk'], 13);
    const idxFacebook = findIdx(['facebook', 'fb'], 14);
    const idxLinkedin = findIdx(['linkedin', 'in'], 15);
    const idxLogoUrl = findIdx(['logo', 'url logo', 'icono'], 16);
    const idxProducts = findIdx(['productos', 'servicios', 'oferta'], 17);
    const idxAmenities = findIdx(['mobiliario', 'equipamiento', 'amenities', 'dotación'], 18);
    const idxSchedule = findIdx(['agenda', 'pitches', 'programación', 'horario'], 19);
    const idxColor = findIdx(['color categoría', 'color categoria', 'color hex', 'color'], 20);
    const idxBadgeBg = findIdx(['badge', 'fondo badge', 'bg badge'], 21);

    const parsedExhibitors: Exhibitor[] = [];

    dataRows.forEach((rowObj: any, rowIndex: number) => {
      const c = rowObj.c || [];
      const getVal = (idx: number): string => {
        if (idx < 0 || !c[idx] || c[idx].v === null || c[idx].v === undefined) return '';
        return String(c[idx].f || c[idx].v).trim();
      };

      let rawStand = getVal(idxStand);
      const standMatch = rawStand.match(/\d+/);
      const standNum = standMatch
        ? String(parseInt(standMatch[0], 10)).padStart(2, '0')
        : String(rowIndex + 1).padStart(2, '0');

      const name = getVal(idxName) || `Expositor Stand ${standNum}`;
      const slogan = getVal(idxSlogan) || 'Innovación y Emprendimiento CUN';
      const rawCategory = getVal(idxCategory);
      const category = normalizeCategory(rawCategory);
      const spaceType = getVal(idxSpaceType) || `Stand Módulo ${standNum} (2.5m x 2.0m)`;
      const description = getVal(idxDescription) || `Espacio de exhibición para ${name} en la Feria de Emprendimiento CUN.`;
      
      const founderName = getVal(idxFounder) || 'Representante CUN';
      const founderRole = getVal(idxFounderRole) || 'Fundador & Líder de Proyecto';
      const founderAvatar = getVal(idxFounderAvatar) || undefined;

      const phone = getVal(idxPhone) || '+57 300 000 0000';
      const email = getVal(idxEmail) || `stand${standNum}@cun.edu.co`;
      const website = getVal(idxWebsite) || 'https://cun.edu.co';
      const instagram = getVal(idxInstagram) || `@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      const tiktok = getVal(idxTiktok) || `@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
      const facebook = getVal(idxFacebook) || name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const linkedin = getVal(idxLinkedin) || 'https://linkedin.com/school/cun-corporacion-unificada-nacional';
      
      const logoUrl = getVal(idxLogoUrl) || undefined;

      const rawProducts = getVal(idxProducts);
      const products = rawProducts
        ? rawProducts.split(/[,;\n•]+/).map((p) => p.trim()).filter(Boolean)
        : ['Innovación', 'Calidad CUN', 'Muestra'];

      const rawAmenities = getVal(idxAmenities);
      const amenities = rawAmenities
        ? rawAmenities.split(/[,;\n•]+/).map((p) => p.trim()).filter(Boolean)
        : ['Toma eléctrica 110V', 'Wifi de alta velocidad', 'Mobiliario ergonómico'];

      const rawSchedule = getVal(idxSchedule);
      const schedule = parseSchedule(rawSchedule, standNum);

      const customColor = getVal(idxColor);
      const categoryColor = customColor && /^#[0-9A-Fa-f]{6}$/.test(customColor) ? customColor : getCategoryColor(category);

      const customBadge = getVal(idxBadgeBg);
      const badgeBg = customBadge && /^#[0-9A-Fa-f]{6}$/.test(customBadge) ? customBadge : getCategoryBg(category);

      parsedExhibitors.push({
        id: standNum,
        standNumber: standNum,
        name,
        category,
        categoryColor,
        badgeBg,
        slogan,
        description,
        spaceType,
        logoUrl,
        founder: {
          name: founderName,
          role: founderRole,
          avatar: founderAvatar,
        },
        contact: {
          phone,
          email,
          instagram,
          website,
          tiktok,
          facebook,
          linkedin,
        },
        products,
        amenities,
        schedule,
      });
    });

    return {
      success: true,
      exhibitors: parsedExhibitors,
      rowCount: parsedExhibitors.length,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Error al conectar con Google Sheets.',
    };
  }
}

/**
 * Generates a clean CSV file content formatted for Google Sheets import with 100% of the fields.
 */
export function generateExhibitorsCsv(exhibitors: Exhibitor[]): string {
  const escapeCsv = (str: string) => {
    if (!str) return '""';
    const escaped = str.replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = exhibitors.map((e) => serializeExhibitorToRow(e).map(escapeCsv));

  const csvString = [
    EXHIBITOR_EXPORT_HEADERS.map(escapeCsv).join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\r\n');

  return '\uFEFF' + csvString; // Add UTF-8 BOM for Excel and Google Sheets compatibility
}

/**
 * Generates a downloadable CSV Blob.
 */
export function downloadCsvFile(content: string, filename: string = 'Expositores_Feria_CUN.csv') {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Updates Google Sheets directly via Google Sheets API v4 using an OAuth Bearer token,
 * writing the full set of 22 fields.
 */
export async function updateGoogleSheetsWithApi(
  spreadsheetId: string,
  accessToken: string,
  exhibitors: Exhibitor[],
  sheetName: string = 'Sheet1'
): Promise<{ success: boolean; updatedRows?: number; error?: string }> {
  try {
    const values = [
      EXHIBITOR_EXPORT_HEADERS,
      ...exhibitors.map((e) => serializeExhibitorToRow(e)),
    ];

    const endColumnLetter = getColumnLetter(EXHIBITOR_EXPORT_HEADERS.length); // Column V (22)
    const range = `${sheetName}!A1:${endColumnLetter}${values.length}`;
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      range
    )}?valueInputOption=USER_ENTERED`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        range,
        majorDimension: 'ROWS',
        values,
      }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `Error HTTP ${res.status}`);
    }

    const result = await res.json();
    return {
      success: true,
      updatedRows: result.updatedRows || values.length,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Error al escribir en Google Sheets.',
    };
  }
}

function normalizeCategory(cat: string): StandCategory {
  const c = (cat || '').toLowerCase().trim();
  if (c.includes('video') || c.includes('juego') || c.includes('game')) return 'Video juegos';
  if (c.includes('mascota') || c.includes('pet')) return 'Mascotas';
  if (c.includes('regalo') || c.includes('detalle') || c.includes('mathu')) return 'Regalos y detalles';
  if (c.includes('cun') || c.includes('institucional')) return 'CUN Institucional';
  if (c.includes('innova') || c.includes('servicio')) return 'Innovación & Servicios';
  if (c.includes('belleza') || c.includes('facial') || c.includes('skincare')) return 'Belleza';
  if (c.includes('moda') || c.includes('accesorio') || c.includes('ropa') || c.includes('pin')) return 'Moda y accesorios';
  if (c.includes('bio') || c.includes('alim')) return 'Biotecnología & Alimentos';
  if (c.includes('gastro') || c.includes('agro')) return 'Gastronomía & Agro';
  if (c.includes('software') || (c.includes('edtech') && c.includes('soft'))) return 'EdTech & Software';
  if (c.includes('hardware') || (c.includes('edtech') && c.includes('hard'))) return 'EdTech & Hardware';
  if (c.includes('fin')) return 'FinTech';
  if (c.includes('sostenib') || c.includes('diseño')) return 'Sostenibilidad & Diseño';
  if (c.includes('energ')) return 'Energías Limpias';
  if (c.includes('salud')) return 'Salud & Mascotas';
  if (c.includes('logíst') || c.includes('transp')) return 'Logística & Transporte';
  if (c.includes('health') || c.includes('ia')) return 'HealthTech & IA';
  if (c.includes('bebida')) return 'Alimentos & Bebidas';
  if (c.includes('arq') || c.includes('hábitat')) return 'Arquitectura & Hábitat';
  return 'Moda y accesorios';
}

function getCategoryColor(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('tecnolog') || c.includes('software') || c.includes('ia')) return '#2563eb';
  if (c.includes('sostenib') || c.includes('eco') || c.includes('verde') || c.includes('agro')) return '#16a34a';
  if (c.includes('diseño') || c.includes('moda') || c.includes('textil') || c.includes('creativ')) return '#9333ea';
  if (c.includes('alimento') || c.includes('gastronom') || c.includes('café')) return '#ea580c';
  if (c.includes('salud') || c.includes('bienestar') || c.includes('biomed')) return '#0d9488';
  if (c.includes('educa') || c.includes('edtech')) return '#ca8a04';
  return '#0284c7';
}

function getCategoryBg(category: string): string {
  const c = category.toLowerCase();
  if (c.includes('tecnolog') || c.includes('software') || c.includes('ia')) return '#dbeafe';
  if (c.includes('sostenib') || c.includes('eco') || c.includes('verde') || c.includes('agro')) return '#dcfce7';
  if (c.includes('diseño') || c.includes('moda') || c.includes('textil') || c.includes('creativ')) return '#f3e8ff';
  if (c.includes('alimento') || c.includes('gastronom') || c.includes('café')) return '#ffedd5';
  if (c.includes('salud') || c.includes('bienestar') || c.includes('biomed')) return '#ccfbf1';
  if (c.includes('educa') || c.includes('edtech')) return '#fef9c3';
  return '#e0f2fe';
}
