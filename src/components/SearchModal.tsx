import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { PRODUCTS } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import { trackEcommerce } from '../analytics/ecommerce.ts';
import { Search, X, Sparkles } from 'lucide-react';

const POPULAR_SEARCHES = [
  'Glow Serum',
  'Velvet Lipstick',
  'Vitamin C',
  'Rose Mist',
  'Foundation',
  'Eau de Parfum',
  'Centella',
  'Hair Oil',
];

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useShop();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    return PRODUCTS.filter((item) => {
      const matchName = item.name.toLowerCase().includes(query);
      const matchBrand = item.brand.toLowerCase().includes(query);
      const matchCategory = item.category.toLowerCase().includes(query);
      const matchSub = item.subcategory.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchKey = item.keyBenefits.some((b) => b.toLowerCase().includes(query));
      return matchName || matchBrand || matchCategory || matchSub || matchDesc || matchKey;
    });
  }, [searchTerm]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      trackEcommerce.search({ search_term: searchTerm.trim() });
    }
  };

  const handleSelectPopular = (term: string) => {
    setSearchTerm(term);
    trackEcommerce.search({ search_term: term });
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#351C2B]/70 backdrop-blur-sm flex flex-col justify-start pt-16 sm:pt-20 px-4 overflow-y-auto"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="max-w-4xl w-full mx-auto bg-[#FFF8F3] rounded-2xl shadow-2xl border border-[#E8B7C5]/40 overflow-hidden flex flex-col mb-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8B7C5]/40 bg-white">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-5 h-5 text-[#C96C8A] absolute left-3 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, brand, skincare concern..."
              className="w-full pl-11 pr-12 py-3.5 bg-[#FFF8F3] rounded-xl text-sm font-medium text-[#2B2024] placeholder-stone-400 border border-[#E8B7C5]/50 focus:outline-none focus:border-[#C96C8A]"
            />
            {searchTerm ? (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-12 text-stone-400 hover:text-stone-600 cursor-pointer"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="ml-3 p-2 text-stone-500 hover:text-[#C96C8A] transition-colors cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </form>

          {/* Popular Search Suggestions */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1 text-xs text-stone-500">
            <span className="font-semibold text-[#351C2B] shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C9A227]" /> Popular:
            </span>
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleSelectPopular(term)}
                className="px-2.5 py-1 bg-[#FFF8F3] hover:bg-[#E8B7C5]/30 text-[#351C2B] rounded-full shrink-0 transition-colors cursor-pointer border border-[#E8B7C5]/40"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Area */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {searchTerm.trim() === '' ? (
            <div className="py-12 text-center">
              <p className="text-xs uppercase tracking-widest text-[#C96C8A] font-semibold mb-2">
                Discover LUMÉRA
              </p>
              <h3 className="font-serif text-2xl text-[#351C2B] mb-2">
                What are you looking for today?
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore our botanical skincare, radiant foundation tones, velvet lipsticks, or luxury perfumes.
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-[#E8B7C5]/30 text-[#C96C8A] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-[#351C2B] mb-2">
                No beauty finds yet.
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Try searching for skincare, makeup, haircare or exploring our top sellers.
              </p>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setSearchTerm('Serum')}
                  className="px-4 py-2 bg-white border border-[#E8B7C5]/60 text-xs font-semibold rounded-md hover:bg-[#FFF8F3] cursor-pointer"
                >
                  Serums
                </button>
                <button
                  type="button"
                  onClick={() => setSearchTerm('Lipstick')}
                  className="px-4 py-2 bg-white border border-[#E8B7C5]/60 text-xs font-semibold rounded-md hover:bg-[#FFF8F3] cursor-pointer"
                >
                  Lipsticks
                </button>
                <button
                  type="button"
                  onClick={() => setSearchTerm('Fragrance')}
                  className="px-4 py-2 bg-white border border-[#E8B7C5]/60 text-xs font-semibold rounded-md hover:bg-[#FFF8F3] cursor-pointer"
                >
                  Fragrances
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-stone-600">
                  Found <strong className="text-[#351C2B]">{searchResults.length}</strong> matching results for “{searchTerm}”
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
