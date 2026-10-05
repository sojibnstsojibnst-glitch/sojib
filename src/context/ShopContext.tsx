import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { trackEcommerce } from '../analytics/ecommerce.ts';
import { ARTICLES } from '../data/articles.ts';
import { PRODUCTS } from '../data/products.ts';
import {
  Article,
  CartItem,
  CustomerInfo,
  FilterState,
  Order,
  Product,
  ProductCategory,
  ViewState,
} from '../types/index.ts';

interface ShopContextType {
  // Navigation & View
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedArticle: Article | null;
  setSelectedArticle: (article: Article | null) => void;
  navigateToProduct: (product: Product) => void;
  navigateToCategory: (category: ProductCategory | 'All') => void;
  navigateToShop: (filterOverrides?: Partial<FilterState>) => void;
  navigateToArticle: (article: Article) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  totalAmount: number;
  deliveryLocation: 'inside_dhaka' | 'outside_dhaka';
  setDeliveryLocation: (location: 'inside_dhaka' | 'outside_dhaka') => void;
  appliedCoupon: string | null;
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Wishlist
  wishlistIds: string[];
  wishlistProducts: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Checkout & Orders
  lastOrder: Order | null;
  orders: Order[];
  placeOrder: (customer: CustomerInfo, paymentMethod: 'cod' | 'bkash' | 'nagad' | 'sslcommerz') => Order;

  // Toast
  toast: { message: string; id: number } | null;
  showToast: (message: string) => void;

  // Account Modal
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  userEmail: string | null;
  loginUser: (email: string) => void;
  logoutUser: () => void;
}

const initialFilters: FilterState = {
  category: 'All',
  skinTypes: [],
  sortBy: 'featured',
  onlyDiscounted: false,
  inStockOnly: false,
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View state
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // User auth simulation
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem('lumera_user_email');
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Cart persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed
          .filter((item: any) => item && item.product && item.product.id)
          .map((item: any) => {
            const fresh = PRODUCTS.find((p) => p.id === item.product.id) || item.product;
            return {
              ...item,
              product: fresh,
              quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
            };
          });
      }
      return [];
    } catch {
      return [];
    }
  });

  // Wishlist persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders persistence
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('lumera_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('lumera_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Coupon and Delivery state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');

  // Toast
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumera_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('lumera_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem('lumera_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    if (lastOrder) {
      try {
        localStorage.setItem('lumera_last_order', JSON.stringify(lastOrder));
      } catch (e) {
        console.error(e);
      }
    }
  }, [lastOrder]);

  // Handle SEO title update on view switch
  useEffect(() => {
    if (currentView === 'home') {
      document.title = 'LUMÉRA BEAUTY – Glow. Care. Confidence. | Luxury Cosmetics & Skincare';
    } else if (currentView === 'shop') {
      const catText = filters.category && filters.category !== 'All' ? `${filters.category} Collection | ` : '';
      document.title = `${catText}Shop Luxury Beauty | LUMÉRA BEAUTY`;
    } else if (currentView === 'product' && selectedProduct) {
      document.title = `${selectedProduct.name} – ${selectedProduct.brand} | LUMÉRA BEAUTY`;
    } else if (currentView === 'cart') {
      document.title = 'Shopping Bag | LUMÉRA BEAUTY';
    } else if (currentView === 'checkout') {
      document.title = 'Secure Checkout | LUMÉRA BEAUTY';
    } else if (currentView === 'order-success') {
      document.title = 'Order Confirmed ✨ | LUMÉRA BEAUTY';
    } else if (currentView === 'journal') {
      document.title = 'Beauty Journal & Dermal Wisdom | LUMÉRA BEAUTY';
    } else if (currentView === 'wishlist') {
      document.title = 'Saved Wishlist | LUMÉRA BEAUTY';
    } else if (currentView === 'account') {
      document.title = 'My Account & Orders | LUMÉRA BEAUTY';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, selectedProduct, filters.category]);

  // Cart calculations
  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  // Free delivery threshold: ৳3,000
  const deliveryCharge = useMemo(() => {
    if (subtotal === 0) return 0;
    if (subtotal >= 3000) return 0; // Free delivery for orders ৳3000+
    return deliveryLocation === 'inside_dhaka' ? 70 : 130;
  }, [subtotal, deliveryLocation]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon === 'GLOW10') {
      return Math.round(subtotal * 0.1);
    }
    if (appliedCoupon === 'LUMERA15') {
      return Math.round(subtotal * 0.15);
    }
    if (appliedCoupon === 'BDT500') {
      return Math.min(500, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const totalAmount = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + deliveryCharge);
  }, [subtotal, discountAmount, deliveryCharge]);

  // Cart actions
  const addToCart = (product: Product, quantity = 1, variant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });

    // GA4 Tracking
    trackEcommerce.addToCart({
      currency: 'BDT',
      value: product.price * quantity,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price,
          quantity: quantity,
          item_variant: variant,
          currency: 'BDT',
        },
      ],
    });

    showToast(`Added to Cart: “${product.name}”`);
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = cart.find((item) => item.product.id === productId);
    if (itemToRemove) {
      trackEcommerce.removeFromCart({
        currency: 'BDT',
        value: itemToRemove.product.price * itemToRemove.quantity,
        items: [
          {
            item_id: itemToRemove.product.id,
            item_name: itemToRemove.product.name,
            item_brand: itemToRemove.product.brand,
            item_category: itemToRemove.product.category,
            price: itemToRemove.product.price,
            quantity: itemToRemove.quantity,
            currency: 'BDT',
          },
        ],
      });
    }
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag.');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: Math.min(item.product.stock, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GLOW10') {
      setAppliedCoupon('GLOW10');
      showToast('Coupon “GLOW10” applied: 10% discount ✨');
      return { success: true, message: '10% discount applied!' };
    }
    if (clean === 'LUMERA15') {
      setAppliedCoupon('LUMERA15');
      showToast('Coupon “LUMERA15” applied: 15% discount ✨');
      return { success: true, message: '15% luxury discount applied!' };
    }
    if (clean === 'BDT500') {
      setAppliedCoupon('BDT500');
      showToast('Coupon “BDT500” applied: ৳500 flat discount ✨');
      return { success: true, message: '৳500 flat discount applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try GLOW10 or LUMERA15' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.');
  };

  // Wishlist actions
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const toggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed “${product.name}” from wishlist.`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      trackEcommerce.addToWishlist({
        currency: 'BDT',
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_brand: product.brand,
            item_category: product.category,
            price: product.price,
            currency: 'BDT',
          },
        ],
      });
      showToast(`Added “${product.name}” to wishlist.`);
    }
  };

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    trackEcommerce.viewItem({
      currency: 'BDT',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price,
          currency: 'BDT',
        },
      ],
    });
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Navigation helpers
  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    trackEcommerce.viewItem({
      currency: 'BDT',
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_brand: product.brand,
          item_category: product.category,
          price: product.price,
          currency: 'BDT',
        },
      ],
    });
  };

  const navigateToCategory = (category: ProductCategory | 'All') => {
    setFilters({
      ...initialFilters,
      category,
    });
    setCurrentView('shop');
    trackEcommerce.viewItemList({
      item_list_id: `category_${category.toLowerCase()}`,
      item_list_name: `${category} Products`,
      items: PRODUCTS.filter((p) => category === 'All' || p.category === category).map((p) => ({
        item_id: p.id,
        item_name: p.name,
        item_brand: p.brand,
        item_category: p.category,
        price: p.price,
        currency: 'BDT',
      })),
    });
  };

  const navigateToShop = (filterOverrides?: Partial<FilterState>) => {
    if (filterOverrides) {
      setFilters((prev) => ({ ...prev, ...filterOverrides }));
    }
    setCurrentView('shop');
  };

  const navigateToArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('journal-detail');
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
  };

  // Checkout and Order Placement
  const placeOrder = (customer: CustomerInfo, paymentMethod: 'cod' | 'bkash' | 'nagad' | 'sslcommerz'): Order => {
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `LUM-${randomDigits}`;
    const newOrder: Order = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      customer,
      items: [...cart],
      subtotal,
      delivery: deliveryCharge,
      discount: discountAmount,
      couponCode: appliedCoupon || undefined,
      total: totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
      status: 'Processing',
    };

    // GA4 Purchase Event
    trackEcommerce.purchase({
      transaction_id: orderNumber,
      value: totalAmount,
      currency: 'BDT',
      shipping: deliveryCharge,
      coupon: appliedCoupon || undefined,
      items: cart.map((item) => ({
        item_id: item.product.id,
        item_name: item.product.name,
        item_brand: item.product.brand,
        item_category: item.product.category,
        price: item.product.price,
        quantity: item.quantity,
        currency: 'BDT',
      })),
    });

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);
    setCurrentView('order-success');
    return newOrder;
  };

  // Auth simulation
  const loginUser = (email: string) => {
    setUserEmail(email);
    localStorage.setItem('lumera_user_email', email);
    trackEcommerce.login({ method: 'email' });
    showToast(`Signed in as ${email}`);
  };

  const logoutUser = () => {
    setUserEmail(null);
    localStorage.removeItem('lumera_user_email');
    showToast('Signed out of LUMÉRA account.');
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProduct,
        setSelectedProduct,
        selectedArticle,
        setSelectedArticle,
        navigateToProduct,
        navigateToCategory,
        navigateToShop,
        navigateToArticle,
        cart,
        cartCount,
        subtotal,
        deliveryCharge,
        discountAmount,
        totalAmount,
        deliveryLocation,
        setDeliveryLocation,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlistIds,
        wishlistProducts,
        toggleWishlist,
        isInWishlist,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        filters,
        setFilters,
        resetFilters,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        lastOrder,
        orders,
        placeOrder,
        toast,
        showToast,
        isAccountModalOpen,
        setIsAccountModalOpen,
        userEmail,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
