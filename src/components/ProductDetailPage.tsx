import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { Product, Review } from '../types/index.ts';
import { PRODUCTS } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronRight,
  Sparkles,
  Share2,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    navigateToCategory,
    showToast,
  } = useShop();

  if (!selectedProduct) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4">
        <h2 className="font-serif text-2xl text-[#351C2B] mb-4">No product selected</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-[#351C2B] text-white text-xs uppercase tracking-wider rounded-md"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'benefits' | 'ingredients' | 'howToUse' | 'reviews'>('description');
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>(selectedProduct.reviews || []);

  const isFavorited = isInWishlist(selectedProduct.id);

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setCurrentView('checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: reviewName.trim(),
      rating: reviewRating,
      date: 'Just now',
      title: reviewTitle.trim() || 'Verified Purchase Feedback',
      comment: reviewComment.trim(),
      verified: true,
    };

    setLocalReviews([newRev, ...localReviews]);
    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
    showToast('Thank you! Your verified review has been published.');
  };

  // Structured Data (JSON-LD) for SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: selectedProduct.name,
    image: selectedProduct.images[0],
    description: selectedProduct.description,
    sku: selectedProduct.sku,
    brand: {
      '@type': 'Brand',
      name: selectedProduct.brand,
    },
    offers: {
      '@type': 'Offer',
      price: selectedProduct.price,
      priceCurrency: 'BDT',
      availability: selectedProduct.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: window.location.href,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: selectedProduct.rating,
      reviewCount: selectedProduct.reviewCount,
    },
  };

  return (
    <div className="bg-[#FFF8F3] min-h-screen py-8 md:py-12">
      {/* Inject Product Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#2B2024]/60 mb-8 overflow-x-auto whitespace-nowrap py-1">
          <button
            onClick={() => setCurrentView('home')}
            className="hover:text-[#C96C8A] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => setCurrentView('shop')}
            className="hover:text-[#C96C8A] transition-colors"
          >
            Shop
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button
            onClick={() => navigateToCategory(selectedProduct.category)}
            className="hover:text-[#C96C8A] transition-colors"
          >
            {selectedProduct.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#351C2B] font-semibold truncate max-w-xs">
            {selectedProduct.name}
          </span>
        </nav>

        {/* Product Purchase Module (Contiguous Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 bg-white rounded-2xl p-4 sm:p-10 border border-[#E8B7C5]/30 shadow-xs mb-12 sm:mb-16">
          
          {/* Left Column: Gallery */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF6F4] border border-[#E8B7C5]/30">
              <img
                src={selectedProduct.images[activeImgIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {selectedProduct.discount > 0 && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#351C2B] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 tracking-wider uppercase rounded-xs">
                  -{selectedProduct.discount}% Off
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {selectedProduct.images.length > 1 && (
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1">
                {selectedProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImgIndex === idx
                        ? 'border-[#C96C8A] ring-2 ring-[#C96C8A]/20'
                        : 'border-[#E8B7C5]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${selectedProduct.name} preview ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Brand and SKU */}
              <div className="flex items-center justify-between text-xs text-[#2B2024]/60 mb-2">
                <span className="font-semibold uppercase tracking-wider text-[#C96C8A]">
                  {selectedProduct.brand}
                </span>
                <span className="font-mono text-[11px]">SKU: {selectedProduct.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#351C2B] font-medium leading-tight mb-3">
                {selectedProduct.name}
              </h1>

              {/* Rating and Reviews Count */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-[#C9A227]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating)
                          ? 'fill-[#C9A227]'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#351C2B] tabular-nums">
                  {selectedProduct.rating}
                </span>
                <span className="text-xs text-stone-400">·</span>
                <span className="text-xs text-[#2B2024]/75">
                  {selectedProduct.reviewCount} customer reviews
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 p-4 bg-[#FFF8F3] rounded-xl border border-[#E8B7C5]/30 mb-6">
                <span className="text-3xl font-bold text-[#351C2B] tabular-nums">
                  ৳{selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.compareAtPrice > selectedProduct.price && (
                  <span className="text-base text-stone-400 line-through tabular-nums">
                    ৳{selectedProduct.compareAtPrice.toLocaleString()}
                  </span>
                )}
                <span className="ml-auto text-xs font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-1 rounded-sm">
                  In Stock ({selectedProduct.stock} units available)
                </span>
              </div>

              {/* Short Description */}
              <p className="text-sm text-[#2B2024]/80 leading-relaxed mb-6 font-normal">
                {selectedProduct.description}
              </p>

              {/* Skin Types Recommended */}
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#351C2B] mb-2">
                  Recommended For
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-stone-600">
                  {selectedProduct.skinType.map((st, i) => (
                    <span key={st} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C96C8A]" />
                      <span>{st} Skin</span>
                      {i < selectedProduct.skinType.length - 1 && <span className="text-stone-300">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Buttons */}
              <div className="space-y-4 pt-4 border-t border-[#E8B7C5]/30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#E8B7C5]/60 rounded-lg bg-white overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2.5 text-stone-600 hover:bg-[#FFF8F3] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-4 py-2.5 text-xs font-bold text-[#351C2B] tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(selectedProduct.stock, q + 1))}
                      className="px-3.5 py-2.5 text-stone-600 hover:bg-[#FFF8F3] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-3 rounded-lg border transition-all flex items-center justify-center ${
                      isFavorited
                        ? 'border-[#C96C8A] bg-[#FFF8F3] text-[#C96C8A]'
                        : 'border-[#E8B7C5]/60 hover:border-[#C96C8A] text-stone-600 hover:text-[#C96C8A]'
                    }`}
                    aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#C96C8A]' : ''}`} />
                  </button>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => addToCart(selectedProduct, quantity)}
                    className="w-full py-4 bg-[#351C2B] text-[#FFF8F3] hover:bg-[#C96C8A] rounded-lg text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO CART</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-4 bg-[#C96C8A] text-white hover:bg-[#b55877] rounded-lg text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#C9A227]" />
                    <span>BUY NOW</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-[#E8B7C5]/30 text-center">
              <div className="p-2">
                <Truck className="w-4 h-4 mx-auto text-[#C96C8A] mb-1" />
                <p className="text-[11px] font-bold text-[#351C2B]">Fast Delivery</p>
                <p className="text-[10px] text-stone-500">24-48h Dhaka</p>
              </div>
              <div className="p-2">
                <RotateCcw className="w-4 h-4 mx-auto text-[#C96C8A] mb-1" />
                <p className="text-[11px] font-bold text-[#351C2B]">7-Day Return</p>
                <p className="text-[10px] text-stone-500">Unopened items</p>
              </div>
              <div className="p-2">
                <ShieldCheck className="w-4 h-4 mx-auto text-[#C96C8A] mb-1" />
                <p className="text-[11px] font-bold text-[#351C2B]">100% Authentic</p>
                <p className="text-[10px] text-stone-500">Original luxury</p>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Product Insights: Description, Benefits, Ingredients, How to Use, Reviews */}
        <div className="bg-white rounded-2xl p-4 sm:p-10 border border-[#E8B7C5]/30 shadow-xs mb-12 sm:mb-16">
          <div className="flex items-center gap-2 sm:gap-6 border-b border-[#E8B7C5]/40 overflow-x-auto pb-px mb-6 sm:mb-8">
            {(
              [
                { id: 'description', label: 'Description' },
                { id: 'benefits', label: 'Key Benefits' },
                { id: 'ingredients', label: 'Ingredients' },
                { id: 'howToUse', label: 'How to Use' },
                { id: 'reviews', label: `Reviews (${localReviews.length})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-2 sm:px-4 text-xs font-semibold uppercase tracking-wider transition-all relative whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#C96C8A] font-bold'
                    : 'text-[#2B2024]/60 hover:text-[#351C2B]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C96C8A]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="space-y-4 text-sm text-[#2B2024]/85 leading-relaxed max-w-3xl">
              <p>{selectedProduct.description}</p>
              <p>
                Created with the highest grade international standards, LUMÉRA formulas are rigorously tested
                to deliver visible, lasting results while being gentle on the skin barrier. Every batch is packaged
                in protective UV-resistant flacons to retain botanical potency.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div className="p-3 bg-[#FFF8F3] rounded-lg">
                  <strong className="text-[#351C2B]">Shipping inside Dhaka:</strong> 24 to 48 business hours (৳70).
                </div>
                <div className="p-3 bg-[#FFF8F3] rounded-lg">
                  <strong className="text-[#351C2B]">Nationwide delivery:</strong> 2 to 3 business days via courier (৳130).
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Benefits */}
          {activeTab === 'benefits' && (
            <div className="space-y-3 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C96C8A] mb-2">
                Clinical & Sensory Advantages
              </p>
              <ul className="space-y-3">
                {selectedProduct.keyBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#2B2024]/85">
                    <Check className="w-4 h-4 text-[#C96C8A] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tab 3: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-4 max-w-3xl">
              <p className="text-xs text-[#2B2024]/70 mb-2">
                Transparency in formulation. Free of parabens, mineral oil, formaldehyde-releasers, and synthetic dyes.
              </p>
              <div className="p-4 bg-[#FFF8F3] rounded-xl border border-[#E8B7C5]/30">
                <p className="text-xs text-stone-700 leading-relaxed font-mono">
                  {selectedProduct.ingredients.join(' · ')}
                </p>
              </div>
            </div>
          )}

          {/* Tab 4: How to Use */}
          {activeTab === 'howToUse' && (
            <div className="space-y-4 max-w-3xl text-sm text-[#2B2024]/85 leading-relaxed">
              <p>{selectedProduct.howToUse}</p>
              <div className="p-4 bg-[#FFF8F3] rounded-lg border-l-2 border-[#C96C8A] text-xs text-[#351C2B]">
                <strong className="block mb-1">LUMÉRA Beauty Tip:</strong>
                For enhanced absorption and cooling relief, store this product in a cool vanity refrigerator before applying.
              </div>
            </div>
          )}

          {/* Tab 5: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8B7C5]/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-serif font-bold text-[#351C2B]">
                      {selectedProduct.rating}
                    </span>
                    <div>
                      <div className="flex items-center text-[#C9A227]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#C9A227]" />
                        ))}
                      </div>
                      <span className="text-xs text-stone-500">
                        Based on {localReviews.length} verified experiences
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-5 py-2.5 bg-[#351C2B] text-white hover:bg-[#C96C8A] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Review'}
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleAddReview}
                  className="p-6 bg-[#FFF8F3] rounded-xl border border-[#E8B7C5]/40 space-y-4 max-w-xl"
                >
                  <h4 className="font-serif text-lg font-medium text-[#351C2B]">
                    Share Your Experience
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#2B2024] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Nusrat Jahan"
                        className="w-full text-xs p-2.5 bg-white border border-[#E8B7C5]/60 rounded-md focus:outline-none focus:border-[#C96C8A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#2B2024] mb-1">
                        Rating *
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full text-xs p-2.5 bg-white border border-[#E8B7C5]/60 rounded-md focus:outline-none focus:border-[#C96C8A]"
                      >
                        <option value={5}>5 Stars - Exceptional</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Below Expectation</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Absorbs like a dream, zero sticky feel"
                      className="w-full text-xs p-2.5 bg-white border border-[#E8B7C5]/60 rounded-md focus:outline-none focus:border-[#C96C8A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Detailed Review *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Tell other beauty lovers how this product felt on your skin..."
                      className="w-full text-xs p-2.5 bg-white border border-[#E8B7C5]/60 rounded-md focus:outline-none focus:border-[#C96C8A]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#C96C8A] text-white hover:bg-[#b55877] rounded-md text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Review Cards List */}
              <div className="space-y-4">
                {localReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 bg-[#FAF6F4] rounded-xl border border-[#E8B7C5]/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#351C2B]">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-sm">
                            Verified Purchaser
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-[#C9A227]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-[#C9A227]' : 'fill-stone-200 text-stone-200'
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="text-xs font-bold text-[#2B2024]">{rev.title}</h5>
                    <p className="text-xs text-[#2B2024]/80 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C96C8A] mb-1">
                Complementary Ritual
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#351C2B] font-medium">
                You May Also Adore
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
