import { STAND_LOGO_DATA_URLS } from './logoDataUrls';

/**
 * Official Brand Logos for the 15 Exhibitors
 * Uses direct in-memory data URLs embedded from the official logos provided,
 * ensuring immediate rendering across all views without network/CORS issues.
 */
export const EXHIBITOR_DEFAULT_LOGOS: Record<string, string> = {
  ...STAND_LOGO_DATA_URLS,
  '1': STAND_LOGO_DATA_URLS['01'] || '/logos/job_store.jpg',
  '01': STAND_LOGO_DATA_URLS['01'] || '/logos/job_store.jpg',

  '2': STAND_LOGO_DATA_URLS['02'] || '/Logo_CUN.svg',
  '02': STAND_LOGO_DATA_URLS['02'] || '/Logo_CUN.svg',

  '3': STAND_LOGO_DATA_URLS['03'] || '/logos/mr_pinstar.svg',
  '03': STAND_LOGO_DATA_URLS['03'] || '/logos/mr_pinstar.svg',

  '4': STAND_LOGO_DATA_URLS['04'] || '/logos/realgamesstore.jpg',
  '04': STAND_LOGO_DATA_URLS['04'] || '/logos/realgamesstore.jpg',

  '5': STAND_LOGO_DATA_URLS['05'] || '/logos/sangeronimopets.jpg',
  '05': STAND_LOGO_DATA_URLS['05'] || '/logos/sangeronimopets.jpg',

  '6': STAND_LOGO_DATA_URLS['06'] || '/logos/mathu.jpg',
  '06': STAND_LOGO_DATA_URLS['06'] || '/logos/mathu.jpg',

  '7': STAND_LOGO_DATA_URLS['07'] || '/logos/rocketbaby.jpg',
  '07': STAND_LOGO_DATA_URLS['07'] || '/logos/rocketbaby.jpg',

  '9': STAND_LOGO_DATA_URLS['09'] || '/logos/mersaki.jpg',
  '09': STAND_LOGO_DATA_URLS['09'] || '/logos/mersaki.jpg',

  '10': STAND_LOGO_DATA_URLS['10'] || '/logos/blarbeauty.jpg',
  '11': STAND_LOGO_DATA_URLS['11'] || '/logos/eresmagia.jpg',
  '12': STAND_LOGO_DATA_URLS['12'] || '/logos/engomecepex.jpg',
  '13': STAND_LOGO_DATA_URLS['13'] || '/logos/osadia.jpg',
  '14': STAND_LOGO_DATA_URLS['14'] || '/logos/tomodachiotaku.jpg',
  '15': STAND_LOGO_DATA_URLS['15'] || '/logos/lormi.jpg',
};
