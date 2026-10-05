/**
 * Tracking & Analytics Configuration
 * Central source of truth for GA4, GTM, Meta Pixel
 */

export const TRACKING_CONFIG = {
  GA4_MEASUREMENT_ID: import.meta?.env?.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  GTM_CONTAINER_ID: import.meta?.env?.VITE_GTM_CONTAINER_ID || 'GTM-XXXXXXX',
  META_PIXEL_ID: import.meta?.env?.VITE_META_PIXEL_ID || '',
  DEFAULT_CURRENCY: 'BDT',
};
