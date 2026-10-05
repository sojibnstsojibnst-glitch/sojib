import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlistIds,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    navigateToShop,
  } = useShop();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF8F3]/95 backdrop-blur-md border-t border-[#E8B7C5]/40 py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setCurrentView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            currentView === 'home' ? 'text-[#C96C8A]' : 'text-stone-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => {
            navigateToShop({ category: 'All' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold tracking-wider uppercase transition-colors ${
            currentView === 'shop' ? 'text-[#C96C8A]' : 'text-stone-600'
          }`}
        >
          <Grid className="w-5 h-5" />
          <span>Shop</span>
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold tracking-wider uppercase text-stone-600 hover:text-[#C96C8A] transition-colors"
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => {
            setCurrentView('wishlist');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold tracking-wider uppercase transition-colors relative ${
            currentView === 'wishlist' ? 'text-[#C96C8A]' : 'text-stone-600'
          }`}
        >
          <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'fill-[#C96C8A] text-[#C96C8A]' : ''}`} />
          <span>Wishlist</span>
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C96C8A] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {wishlistIds.length}
            </span>
          )}
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartDrawerOpen(true)}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold tracking-wider uppercase text-stone-600 hover:text-[#C96C8A] transition-colors relative"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#C9A227] text-[#351C2B] text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
