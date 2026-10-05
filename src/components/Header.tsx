import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { ProductCategory } from '../types/index.ts';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlistIds,
    setIsCartDrawerOpen,
    setIsSearchOpen,
    navigateToCategory,
    navigateToShop,
    setIsAccountModalOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryClick = (category: ProductCategory) => {
    navigateToCategory(category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Slim Promotional Announcement Bar */}
      {announcementVisible && (
        <div className="bg-[#351C2B] text-[#FFF8F3] px-4 py-2 text-xs font-medium tracking-wide flex items-center justify-between border-b border-[#C96C8A]/20">
          <div className="mx-auto flex items-center gap-2 text-center truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
            <span className="truncate">
              Complimentary Delivery across Bangladesh on orders over ৳3,000 · Code <strong className="text-[#C9A227]">GLOW10</strong> for 10% off
            </span>
          </div>
          <button
            type="button"
            onClick={() => setAnnouncementVisible(false)}
            className="text-stone-300 hover:text-white transition-colors ml-2 cursor-pointer"
            aria-label="Close announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF8F3]/95 backdrop-blur-md shadow-sm border-b border-[#E8B7C5]/40 py-3'
            : 'bg-[#FFF8F3] border-b border-[#E8B7C5]/30 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#2B2024] hover:text-[#C96C8A] transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Zone 1: Single Brand Text Element (Wordmark) */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left group cursor-pointer"
                aria-label="LUMÉRA Beauty Home"
              >
                <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#351C2B] uppercase group-hover:text-[#C96C8A] transition-colors">
                  LUMÉRA
                </span>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#C96C8A] font-semibold -mt-1">
                  Beauty
                </span>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Including Best Sellers & New Arrivals) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-semibold uppercase tracking-widest text-[#2B2024]">
              <button
                type="button"
                onClick={() => setCurrentView('home')}
                className={`py-1 transition-colors relative hover:text-[#C96C8A] cursor-pointer ${
                  currentView === 'home' ? 'text-[#C96C8A] font-bold' : ''
                }`}
              >
                Home
                {currentView === 'home' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C96C8A]" />
                )}
              </button>

              <button
                type="button"
                onClick={() => navigateToShop({ category: 'All' })}
                className={`py-1 transition-colors relative hover:text-[#C96C8A] cursor-pointer ${
                  currentView === 'shop' ? 'text-[#C96C8A] font-bold' : ''
                }`}
              >
                Shop All
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('Skincare')}
                className="py-1 transition-colors hover:text-[#C96C8A] cursor-pointer"
              >
                Skincare
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('Makeup')}
                className="py-1 transition-colors hover:text-[#C96C8A] cursor-pointer"
              >
                Makeup
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('Haircare')}
                className="py-1 transition-colors hover:text-[#C96C8A] cursor-pointer"
              >
                Haircare
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('Body Care')}
                className="py-1 transition-colors hover:text-[#C96C8A] cursor-pointer"
              >
                Body Care
              </button>

              <button
                type="button"
                onClick={() => handleCategoryClick('Fragrance')}
                className="py-1 transition-colors hover:text-[#C96C8A] cursor-pointer"
              >
                Fragrance
              </button>

              <button
                type="button"
                onClick={() => navigateToShop({ sortBy: 'best-selling' })}
                className="py-1 transition-colors hover:text-[#C96C8A] cursor-pointer text-[#C96C8A]"
              >
                Best Sellers
              </button>

              <button
                type="button"
                onClick={() => navigateToShop({ sortBy: 'newest' })}
                className="py-1 transition-colors hover:text-[#C96C8A] cursor-pointer"
              >
                New Arrivals
              </button>

              <button
                type="button"
                onClick={() => setCurrentView('journal')}
                className={`py-1 transition-colors relative hover:text-[#C96C8A] cursor-pointer ${
                  currentView === 'journal' ? 'text-[#C96C8A] font-bold' : ''
                }`}
              >
                Journal
              </button>
            </nav>

            {/* Zone 3: Actions (Search, Wishlist, Account, Cart Bag) */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#2B2024] hover:text-[#C96C8A] hover:bg-[#E8B7C5]/20 rounded-full transition-colors cursor-pointer"
                aria-label="Search beauty products"
                title="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => setCurrentView('wishlist')}
                className="p-2 text-[#2B2024] hover:text-[#C96C8A] hover:bg-[#E8B7C5]/20 rounded-full transition-colors relative cursor-pointer"
                aria-label={`Wishlist with ${wishlistIds.length} items`}
                title="Saved Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlistIds.length > 0 ? 'fill-[#C96C8A] text-[#C96C8A]' : ''}`} />
                {wishlistIds.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#C96C8A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              {/* Account */}
              <button
                type="button"
                onClick={() => setIsAccountModalOpen(true)}
                className="p-2 text-[#2B2024] hover:text-[#C96C8A] hover:bg-[#E8B7C5]/20 rounded-full transition-colors hidden sm:flex cursor-pointer"
                aria-label="User account and orders"
                title="Account & Orders"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Clearly Visible & Functional Cart Icon Button with Count */}
              <button
                type="button"
                onClick={() => setIsCartDrawerOpen(true)}
                className="py-2 px-3 sm:px-3.5 bg-[#351C2B] text-[#FFF8F3] hover:bg-[#C96C8A] rounded-full transition-all relative flex items-center gap-2 shadow-sm cursor-pointer group active:scale-95"
                aria-label={`Shopping Cart with ${cartCount} items`}
                title="Open Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#FFF8F3] group-hover:rotate-6 transition-transform" />
                <span className="text-xs font-bold tracking-wider hidden sm:inline">
                  Cart
                </span>
                <span className="bg-[#C9A227] text-[#351C2B] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#351C2B]/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-[#FFF8F3] h-full shadow-2xl flex flex-col p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-6 border-b border-[#E8B7C5]/40">
              <div>
                <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#351C2B] uppercase">
                  LUMÉRA
                </span>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#C96C8A] font-semibold">
                  Beauty
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#2B2024] hover:text-[#C96C8A] cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-3 py-6 text-xs font-semibold tracking-wider uppercase text-[#2B2024]">
              <button
                type="button"
                onClick={() => {
                  setCurrentView('home');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToShop({ category: 'All' });
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Shop All
              </button>
              <button
                type="button"
                onClick={() => handleCategoryClick('Skincare')}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Skincare
              </button>
              <button
                type="button"
                onClick={() => handleCategoryClick('Makeup')}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Makeup
              </button>
              <button
                type="button"
                onClick={() => handleCategoryClick('Haircare')}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Haircare
              </button>
              <button
                type="button"
                onClick={() => handleCategoryClick('Body Care')}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Body Care
              </button>
              <button
                type="button"
                onClick={() => handleCategoryClick('Fragrance')}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Fragrance
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToShop({ sortBy: 'best-selling' });
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-[#C96C8A] font-bold hover:underline cursor-pointer"
              >
                Best Sellers
              </button>
              <button
                type="button"
                onClick={() => {
                  navigateToShop({ sortBy: 'newest' });
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                New Arrivals
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentView('journal');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 hover:text-[#C96C8A] cursor-pointer"
              >
                Beauty Journal
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-[#E8B7C5]/40 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAccountModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#351C2B] hover:text-[#C96C8A] cursor-pointer"
              >
                <User className="w-4 h-4" /> My Account & Orders
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2 px-3 bg-[#351C2B] text-white rounded-lg text-xs font-semibold uppercase tracking-wider"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> View Shopping Cart
                </span>
                <span className="bg-[#C9A227] text-[#351C2B] px-2 py-0.5 rounded-full font-bold">
                  {cartCount}
                </span>
              </button>
              <p className="text-[11px] text-stone-500 mt-2">
                Hotline: +880 1700-LUMERA (Dhaka)
              </p>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
