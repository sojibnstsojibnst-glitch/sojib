/**
 * Standard GA4 E-commerce Item Interface and Event Types
 */

export interface GA4Item {
  item_id: string;
  item_name: string;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  price: number;
  quantity?: number;
  item_variant?: string;
  currency?: string;
}

export interface GA4ViewItemListParams {
  item_list_id?: string;
  item_list_name?: string;
  items: GA4Item[];
}

export interface GA4SelectItemParams {
  item_list_id?: string;
  item_list_name?: string;
  items: GA4Item[];
}

export interface GA4ViewItemParams {
  currency: string;
  value: number;
  items: GA4Item[];
}

export interface GA4AddToCartParams {
  currency: string;
  value: number;
  items: GA4Item[];
}

export interface GA4RemoveFromCartParams {
  currency: string;
  value: number;
  items: GA4Item[];
}

export interface GA4ViewCartParams {
  currency: string;
  value: number;
  items: GA4Item[];
}

export interface GA4BeginCheckoutParams {
  currency: string;
  value: number;
  coupon?: string;
  items: GA4Item[];
}

export interface GA4AddPaymentInfoParams {
  currency: string;
  value: number;
  payment_type: string;
  items: GA4Item[];
}

export interface GA4PurchaseParams {
  transaction_id: string;
  value: number;
  currency: string;
  tax?: number;
  shipping: number;
  coupon?: string;
  items: GA4Item[];
}

export interface GA4SearchParams {
  search_term: string;
}

export interface GA4AddToWishlistParams {
  currency: string;
  value: number;
  items: GA4Item[];
}

export interface GA4UserAuthParams {
  method?: string;
}
