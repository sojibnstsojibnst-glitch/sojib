import React, { useState } from 'react';
import { Product } from '../types/index.ts';
import { useShop } from '../context/ShopContext.tsx';
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openQuickView,
    navigateToProduct,
  } = useShop();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigating if clicking buttons inside card
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigateToProduct(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-xl border border-[#E8B7C5]/30 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Top Media Area */}
      <div
        className="relative aspect-square w-full overflow-hidden bg-[#FAF6F4]"
        onMouseEnter={() => {
          if (product.images.length > 1) {
            setCurrentImgIndex(1);
          }
        }}
        onMouseLeave={() => setCurrentImgIndex(0)}
      >
        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Fallback skeleton while image loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#FFF8F3] animate-pulse flex items-center justify-center text-xs text-[#C96C8A]">
            LUMÉRA
          </div>
        )}

        {/* Discount Tag */}
        {product.discount > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-[#351C2B] text-[#FFF8F3] text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase rounded-xs shadow-xs z-10">
            -{product.discount}%
          </div>
        )}

        {/* Action Icons in Top Right: Wishlist & Quick View */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full transition-all duration-200 shadow-xs cursor-pointer ${
              isFavorited
                ? 'bg-[#FFF8F3] text-[#C96C8A] shadow-md scale-110'
                : 'bg-white/90 backdrop-blur-xs text-[#2B2024]/70 hover:text-[#C96C8A] hover:bg-white'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isFavorited ? 'In your wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#C96C8A]' : ''}`} />
          </button>

          {/* Quick View Icon Button (always accessible) */}
          <button
            type="button"
            onClick={handleQuickView}
            className="p-2 rounded-full bg-white/90 backdrop-blur-xs text-[#2B2024]/70 hover:text-[#C96C8A] hover:bg-white shadow-xs transition-all duration-200 cursor-pointer"
            aria-label={`Quick view ${product.name}`}
            title="Quick view product"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick View Bar on hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-2.5 hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            type="button"
            onClick={handleQuickView}
            className="w-full py-2 bg-white/95 backdrop-blur-xs hover:bg-[#351C2B] hover:text-[#FFF8F3] text-[#351C2B] text-[11px] font-semibold uppercase tracking-wider rounded-md shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1">
        {/* Brand & Category */}
        <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-[#C96C8A] mb-1">
          <span>{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#2B2024]/60">{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-sans text-xs sm:text-sm font-semibold text-[#2B2024] group-hover:text-[#C96C8A] transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-[#2B2024]/75 mb-2.5">
          <div className="flex items-center text-[#C9A227]">
            <Star className="w-3.5 h-3.5 fill-[#C9A227]" />
          </div>
          <span className="font-semibold text-[#351C2B] tabular-nums">{product.rating}</span>
          <span className="text-stone-400">({product.reviewCount})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline justify-between gap-1 flex-wrap mb-2.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-[#351C2B] tabular-nums">
              ৳{product.price.toLocaleString()}
            </span>
            {product.compareAtPrice > product.price && (
              <span className="text-[11px] sm:text-xs text-stone-400 line-through tabular-nums">
                ৳{product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[9px] sm:text-[10px] text-emerald-700 font-semibold shrink-0">
            In Stock
          </span>
        </div>

        {/* Prominent, Clearly Labeled "Add to Cart" Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full mt-auto py-2 sm:py-2.5 px-2 sm:px-3 rounded-lg text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer shadow-xs active:scale-98 ${
            justAdded
              ? 'bg-emerald-700 text-white'
              : 'bg-[#351C2B] text-[#FFF8F3] hover:bg-[#C96C8A]'
          }`}
          aria-label={`Add ${product.name} to cart`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
