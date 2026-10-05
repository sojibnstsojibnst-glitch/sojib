/**
 * Global Website & Store Settings
 * Central source of truth for settings, delivery, currencies
 */

export const SETTINGS_CONFIG = {
  siteName: 'LUMÉRA BEAUTY',
  tagline: 'Glow. Care. Confidence.',
  currency: 'BDT',
  currencySymbol: '৳',
  freeDeliveryThreshold: 3000,
  shippingRates: {
    insideDhaka: 70,
    outsideDhaka: 130,
  },
  deliveryEstimates: {
    insideDhaka: '24 to 48 Hours',
    outsideDhaka: '2 to 3 Business Days',
  },
  returnPolicyDays: 7,
  coupons: {
    GLOW10: { code: 'GLOW10', discountPercent: 10, description: '10% Welcome discount' },
    LUMERA15: { code: 'LUMERA15', discountPercent: 15, description: '15% Atelier privilege' },
    BDT500: { code: 'BDT500', flatDiscount: 500, description: '৳500 Flat discount' },
  },
};
