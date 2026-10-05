import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { ProductCard } from './ProductCard.tsx';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, setCurrentView } = useShop();

  return (
    <div className="bg-[#FFF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-full bg-[#E8B7C5]/30 text-[#C96C8A] flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 fill-[#C96C8A]" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A] mb-1">
            Personal Atelier
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#351C2B] font-medium">
            Saved Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Your handpicked favorite luxury beauty formulations, ready for your next ritual.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-[#E8B7C5]/30 shadow-xs">
            <h3 className="font-serif text-2xl text-[#351C2B] mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Tap the heart icon on any serum, lipstick, or fragrance to curate your personalized vanity wishlist.
            </p>
            <button
              onClick={() => setCurrentView('shop')}
              className="px-6 py-3 bg-[#351C2B] hover:bg-[#C96C8A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
            >
              Discover Best Sellers
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs font-semibold text-stone-500 mb-6">
              You have {wishlistProducts.length} saved beauty essentials
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
