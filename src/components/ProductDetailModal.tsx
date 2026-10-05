import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { X, Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateToProduct,
  } = useShop();

  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleFullDetails = () => {
    const prod = quickViewProduct;
    closeQuickView();
    navigateToProduct(prod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#351C2B]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FFF8F3] rounded-2xl shadow-2xl border border-[#E8B7C5]/40 overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-[#C96C8A] bg-white/80 rounded-full shadow-xs transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-[#FAF6F4] aspect-square md:aspect-auto">
          <img
            src={quickViewProduct.images[0]}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {quickViewProduct.discount > 0 && (
            <div className="absolute top-4 left-4 bg-[#351C2B] text-white text-[10px] font-bold px-2 py-1 tracking-wider uppercase rounded-xs">
              -{quickViewProduct.discount}% Off
            </div>
          )}
        </div>

        {/* Product Quick Info */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C96C8A] mb-1">
              {quickViewProduct.brand} · {quickViewProduct.category}
            </p>

            <h3 className="font-serif text-2xl text-[#351C2B] font-medium leading-snug mb-2">
              {quickViewProduct.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-[#C9A227]">
                <Star className="w-4 h-4 fill-[#C9A227]" />
              </div>
              <span className="text-xs font-semibold text-[#351C2B] tabular-nums">
                {quickViewProduct.rating}
              </span>
              <span className="text-xs text-stone-400">·</span>
              <span className="text-xs text-[#2B2024]/70">
                {quickViewProduct.reviewCount} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-[#351C2B] tabular-nums">
                ৳{quickViewProduct.price.toLocaleString()}
              </span>
              {quickViewProduct.compareAtPrice > quickViewProduct.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ৳{quickViewProduct.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs text-[#2B2024]/80 leading-relaxed mb-4 line-clamp-3">
              {quickViewProduct.description}
            </p>

            {/* Recommended Skin Type */}
            <div className="text-[11px] text-stone-500 mb-4">
              <strong className="text-[#351C2B]">Ideal For:</strong>{' '}
              {quickViewProduct.skinType.join(', ')} Skin
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-3 border-t border-[#E8B7C5]/30">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#E8B7C5]/60 rounded-md bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1.5 text-stone-600 hover:bg-[#FFF8F3]"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-[#351C2B] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))}
                  className="px-2.5 py-1.5 text-stone-600 hover:bg-[#FFF8F3]"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={() => {
                  addToCart(quickViewProduct, quantity);
                  closeQuickView();
                }}
                className="flex-1 py-3 bg-[#351C2B] text-[#FFF8F3] hover:bg-[#C96C8A] rounded-md text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-3 rounded-md border transition-colors ${
                  isFavorited
                    ? 'border-[#C96C8A] text-[#C96C8A] bg-[#FFF8F3]'
                    : 'border-[#E8B7C5]/60 text-stone-500 hover:text-[#C96C8A]'
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C96C8A]' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleFullDetails}
              className="w-full text-center text-xs font-medium text-[#C96C8A] hover:underline flex items-center justify-center gap-1 pt-1"
            >
              <span>View Full Ingredients & Routine Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
