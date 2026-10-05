/**
 * GA4 & Google Tag Manager Configuration and Core Dispatcher
 * Ready for production measurement ID and GTM container insertion.
 */

import { TRACKING_CONFIG } from '../../config/tracking.js';

// Configuration variables (sourced from centralized config/tracking.js)
export const GA4_MEASUREMENT_ID = TRACKING_CONFIG.GA4_MEASUREMENT_ID;
export const GTM_CONTAINER_ID = TRACKING_CONFIG.GTM_CONTAINER_ID;

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Initializes GA4 dataLayer if not already present on window
 */
export function initAnalytics() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }
}

/**
 * Dispatches an event to GA4 dataLayer and gtag
 */
export function sendAnalyticsEvent(eventName: string, params: Record<string, any> = {}) {
  initAnalytics();

  if (typeof window !== 'undefined') {
    // Push event to GTM dataLayer
    window.dataLayer.push({
      event: eventName,
      ...params,
    });

    // Call gtag if configured
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    // Helpful developer notification in console
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[GA4 Event] ${eventName}:`, params);
    }
  }
}
