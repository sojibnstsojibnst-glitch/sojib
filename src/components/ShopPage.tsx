import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { PRODUCTS } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import { ProductCategory, SkinType } from '../types/index.ts';
import { SlidersHorizontal, X, RotateCcw, ChevronDown, Check } from 'lucide-react';

const CATEGORIES: (ProductCategory | 'All')[] = [
  'All',
  'Skincare',
  'Makeup',
  'Haircare',
  'Body Care',
  'Fragrance',
];

const BRANDS = [
  'All Brands',
  'LUMÉRA Skin',
  'LUMÉRA Maison',
  'LUMÉRA Botanicals',
  'LUMÉRA Parfums',
  'LUMÉRA Haircare',
];

const SKIN_TYPES: SkinType[] = ['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal'];

export const ShopPage: React.FC = () => {
  const { filters, setFilters, resetFilters } = useShop();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Price range quick options
  const [selectedPriceBracket, setSelectedPriceBracket] = useState<'all' | 'under1500' | '1500to2500' | '2500to3500' | 'above3500'>('all');

  // Filter and sort computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      // Category filter
      if (filters.category && filters.category !== 'All' && item.category !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand && filters.brand !== 'All Brands' && item.brand !== filters.brand) {
        return false;
      }

      // Price filter
      if (selectedPriceBracket === 'under1500' && item.price >= 1500) return false;
      if (selectedPriceBracket === '1500to2500' && (item.price < 1500 || item.price > 2500)) return false;
      if (selectedPriceBracket === '2500to3500' && (item.price < 2500 || item.price > 3500)) return false;
      if (selectedPriceBracket === 'above3500' && item.price <= 3500) return false;

      // Skin Type filter
      if (filters.skinTypes.length > 0) {
        const matchesSkin = filters.skinTypes.some((st) => item.skinType.includes(st));
        if (!matchesSkin) return false;
      }

      // Discounted only
      if (filters.onlyDiscounted && item.discount <= 0) return false;

      // In stock only
      if (filters.inStockOnly && item.stock <= 0) return false;

      // Rating filter
      if (filters.minRating && item.rating < filters.minRating) return false;

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'best-selling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return 0; // featured
    });
  }, [filters, selectedPriceBracket]);

  const toggleSkinType = (type: SkinType) => {
    setFilters((prev) => {
      const exists = prev.skinTypes.includes(type);
      return {
        ...prev,
        skinTypes: exists ? prev.skinTypes.filter((t) => t !== type) : [...prev.skinTypes, type],
      };
    });
  };

  const handleReset = () => {
    resetFilters();
    setSelectedPriceBracket('all');
  };

  return (
    <div className="bg-[#FFF8F3] min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A] mb-2">
            The Complete Atelier
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#351C2B] font-medium tracking-tight">
            {filters.category && filters.category !== 'All' ? `${filters.category} Collection` : 'All Beauty Essentials'}
          </h1>
          <p className="text-sm text-[#2B2024]/70 mt-3">
            Handcrafted and scientifically formulated cosmetics tailored for modern women in Bangladesh.
          </p>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-xl border border-[#E8B7C5]/30 shadow-xs mb-8">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[#E8B7C5]/60 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#351C2B] hover:bg-[#FFF8F3]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C96C8A]" />
              <span>Filters</span>
            </button>

            <span className="text-xs font-medium text-[#2B2024]/70">
              Showing <strong className="text-[#351C2B]">{filteredProducts.length}</strong> beauty essentials
            </span>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 hidden sm:inline">Sort By:</span>
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as any,
                    }))
                  }
                  className="appearance-none bg-[#FFF8F3] border border-[#E8B7C5]/50 text-[#351C2B] font-semibold text-xs py-2 pl-3 pr-8 rounded-lg focus:outline-none focus:border-[#C96C8A] cursor-pointer"
                >
                  <option value="featured">Featured Collection</option>
                  <option value="best-selling">Best Selling</option>
                  <option value="newest">New Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Clear Filters */}
            {(filters.category !== 'All' ||
              filters.skinTypes.length > 0 ||
              filters.brand ||
              selectedPriceBracket !== 'all' ||
              filters.onlyDiscounted) && (
              <button
                onClick={handleReset}
                className="text-xs text-[#C96C8A] hover:underline flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Main Catalog Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#E8B7C5]/30 shadow-xs space-y-6">
              
              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#351C2B] mb-3">
                  Category
                </h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                      className={`w-full text-left py-1 px-2 text-xs rounded-md transition-colors flex items-center justify-between ${
                        filters.category === cat || (!filters.category && cat === 'All')
                          ? 'bg-[#FFF8F3] text-[#C96C8A] font-bold'
                          : 'text-[#2B2024]/75 hover:text-[#351C2B]'
                      }`}
                    >
                      <span>{cat}</span>
                      {filters.category === cat && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Bracket Filter */}
              <div className="pt-4 border-t border-[#E8B7C5]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#351C2B] mb-3">
                  Price (BDT)
                </h4>
                <div className="space-y-1.5 text-xs text-[#2B2024]/75">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under1500', label: 'Under ৳1,500' },
                    { id: '1500to2500', label: '৳1,500 – ৳2,500' },
                    { id: '2500to3500', label: '৳2,500 – ৳3,500' },
                    { id: 'above3500', label: 'Above ৳3,500' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPriceBracket(p.id as any)}
                      className={`w-full text-left py-1 px-2 rounded-md transition-colors flex items-center justify-between ${
                        selectedPriceBracket === p.id
                          ? 'bg-[#FFF8F3] text-[#C96C8A] font-bold'
                          : 'hover:text-[#351C2B]'
                      }`}
                    >
                      <span>{p.label}</span>
                      {selectedPriceBracket === p.id && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Type Filter */}
              <div className="pt-4 border-t border-[#E8B7C5]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#351C2B] mb-3">
                  Skin Type
                </h4>
                <div className="space-y-2">
                  {SKIN_TYPES.map((st) => {
                    const isChecked = filters.skinTypes.includes(st);
                    return (
                      <label
                        key={st}
                        className="flex items-center gap-2.5 text-xs text-[#2B2024]/80 cursor-pointer hover:text-[#351C2B]"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSkinType(st)}
                          className="w-3.5 h-3.5 rounded-xs accent-[#C96C8A]"
                        />
                        <span>{st} Skin</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="pt-4 border-t border-[#E8B7C5]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#351C2B] mb-3">
                  Maison Brand
                </h4>
                <select
                  value={filters.brand || 'All Brands'}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      brand: e.target.value === 'All Brands' ? undefined : e.target.value,
                    }))
                  }
                  className="w-full text-xs p-2 bg-[#FFF8F3] border border-[#E8B7C5]/40 rounded-lg text-[#351C2B] focus:outline-none focus:border-[#C96C8A]"
                >
                  {BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Toggles: Discount & In Stock */}
              <div className="pt-4 border-t border-[#E8B7C5]/30 space-y-2.5">
                <label className="flex items-center gap-2.5 text-xs text-[#2B2024]/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onlyDiscounted || false}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, onlyDiscounted: e.target.checked }))
                    }
                    className="w-3.5 h-3.5 rounded-xs accent-[#C96C8A]"
                  />
                  <span>Special Offers Only</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[#2B2024]/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly || false}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                    }
                    className="w-3.5 h-3.5 rounded-xs accent-[#C96C8A]"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-[#E8B7C5]/30 shadow-xs max-w-md mx-auto">
                <h3 className="font-serif text-2xl text-[#351C2B] mb-2">
                  No beauty finds yet.
                </h3>
                <p className="text-xs text-[#2B2024]/70 mb-6">
                  Try adjusting your skin type or price filters to explore more of our collection.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#351C2B] text-white hover:bg-[#C96C8A] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-in Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-[#351C2B]/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-4/5 max-w-sm bg-[#FFF8F3] h-full p-6 shadow-2xl overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8B7C5]/40 mb-6">
              <span className="font-serif text-xl font-bold text-[#351C2B]">Filter Beauty</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-stone-500 hover:text-[#C96C8A]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              {/* Category */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#351C2B] mb-2">
                  Category
                </h4>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                        filters.category === cat
                          ? 'bg-[#C96C8A] text-white'
                          : 'bg-white text-stone-700 border border-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skin Type */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#351C2B] mb-2">
                  Skin Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKIN_TYPES.map((st) => (
                    <button
                      key={st}
                      onClick={() => toggleSkinType(st)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                        filters.skinTypes.includes(st)
                          ? 'bg-[#351C2B] text-white'
                          : 'bg-white text-stone-700 border border-stone-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E8B7C5]/40 flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 py-3 border border-stone-300 text-xs font-semibold uppercase rounded-md text-stone-700"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#351C2B] text-white text-xs font-semibold uppercase rounded-md"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
