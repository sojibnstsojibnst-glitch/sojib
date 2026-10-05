export type ProductCategory = 'Skincare' | 'Makeup' | 'Haircare' | 'Body Care' | 'Fragrance';

export type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Sensitive' | 'Normal';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  description: string;
  price: number;
  compareAtPrice: number;
  discount: number;
  images: string[];
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  skinType: SkinType[];
  productType: string;
  keyBenefits: string[];
  ingredients: string[];
  howToUse: string;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
  postalCode: string;
  notes?: string;
}

export interface Order {
  orderNumber: string;
  date: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'sslcommerz';
  paymentStatus: 'pending' | 'completed';
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  readTime: string;
  publishedDate: string;
  image: string;
  author: string;
}

export type ViewState =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'journal'
  | 'journal-detail'
  | 'wishlist'
  | 'account';

export interface FilterState {
  category?: ProductCategory | 'All';
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  skinTypes: SkinType[];
  productType?: string;
  minRating?: number;
  onlyDiscounted?: boolean;
  inStockOnly?: boolean;
  sortBy: 'featured' | 'best-selling' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
