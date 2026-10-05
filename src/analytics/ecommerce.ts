/**
 * Reusable GA4 E-Commerce Event Helper Methods
 * Currency default: BDT
 */
import {
  GA4AddToCartParams,
  GA4AddPaymentInfoParams,
  GA4AddToWishlistParams,
  GA4BeginCheckoutParams,
  GA4Item,
  GA4PurchaseParams,
  GA4RemoveFromCartParams,
  GA4SearchParams,
  GA4SelectItemParams,
  GA4UserAuthParams,
  GA4ViewCartParams,
  GA4ViewItemListParams,
  GA4ViewItemParams,
} from './events.ts';
import { sendAnalyticsEvent } from './ga4.ts';

export const DEFAULT_CURRENCY = 'BDT';

export const trackEcommerce = {
  viewItemList(params: GA4ViewItemListParams) {
    sendAnalyticsEvent('view_item_list', {
      item_list_id: params.item_list_id || 'category_products',
      item_list_name: params.item_list_name || 'Category Products',
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  selectItem(params: GA4SelectItemParams) {
    sendAnalyticsEvent('select_item', {
      item_list_id: params.item_list_id || 'category_products',
      item_list_name: params.item_list_name || 'Category Products',
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  viewItem(params: GA4ViewItemParams) {
    sendAnalyticsEvent('view_item', {
      currency: params.currency || DEFAULT_CURRENCY,
      value: params.value,
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  addToCart(params: GA4AddToCartParams) {
    sendAnalyticsEvent('add_to_cart', {
      currency: params.currency || DEFAULT_CURRENCY,
      value: params.value,
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  removeFromCart(params: GA4RemoveFromCartParams) {
    sendAnalyticsEvent('remove_from_cart', {
      currency: params.currency || DEFAULT_CURRENCY,
      value: params.value,
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  viewCart(params: GA4ViewCartParams) {
    sendAnalyticsEvent('view_cart', {
      currency: params.currency || DEFAULT_CURRENCY,
      value: params.value,
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  beginCheckout(params: GA4BeginCheckoutParams) {
    sendAnalyticsEvent('begin_checkout', {
      currency: params.currency || DEFAULT_CURRENCY,
      value: params.value,
      coupon: params.coupon,
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  addPaymentInfo(params: GA4AddPaymentInfoParams) {
    sendAnalyticsEvent('add_payment_info', {
      currency: params.currency || DEFAULT_CURRENCY,
      value: params.value,
      payment_type: params.payment_type,
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  purchase(params: GA4PurchaseParams) {
    sendAnalyticsEvent('purchase', {
      transaction_id: params.transaction_id,
      value: params.value,
      currency: params.currency || DEFAULT_CURRENCY,
      tax: params.tax || 0,
      shipping: params.shipping,
      coupon: params.coupon || '',
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  search(params: GA4SearchParams) {
    sendAnalyticsEvent('search', {
      search_term: params.search_term,
    });
  },

  addToWishlist(params: GA4AddToWishlistParams) {
    sendAnalyticsEvent('add_to_wishlist', {
      currency: params.currency || DEFAULT_CURRENCY,
      value: params.value,
      items: params.items.map((item) => ({
        ...item,
        currency: item.currency || DEFAULT_CURRENCY,
      })),
    });
  },

  login(params: GA4UserAuthParams = {}) {
    sendAnalyticsEvent('login', {
      method: params.method || 'email',
    });
  },

  signUp(params: GA4UserAuthParams = {}) {
    sendAnalyticsEvent('sign_up', {
      method: params.method || 'email',
    });
  },
};
