import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Tag,
  Truck,
  Check,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    deliveryCharge,
    discountAmount,
    totalAmount,
    deliveryLocation,
    setDeliveryLocation,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    setCurrentView,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 3000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-[#FFF8F3] min-h-[70vh] flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white p-8 sm:p-12 rounded-3xl border border-[#E8B7C5]/30 shadow-sm text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-[#FAF6F4] flex items-center justify-center mx-auto text-[#C96C8A]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-3xl text-[#351C2B] font-medium">
            Your cart is empty
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto leading-relaxed">
            Your vanity is waiting for its signature glow. Explore our carefully selected skincare, velvet lipsticks, and beauty essentials.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="w-full py-4 bg-[#351C2B] hover:bg-[#C96C8A] text-[#FFF8F3] rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#E8B7C5]/40 gap-4">
          <div>
            <button
              onClick={() => setCurrentView('shop')}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#C96C8A] uppercase tracking-wider mb-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#351C2B] font-medium">
              Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Genuine Products · Secure Checkout</span>
          </div>
        </div>

        {/* Free Shipping Progress Banner */}
        <div className="mb-8 p-4 bg-white rounded-2xl border border-[#E8B7C5]/40 shadow-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-xs sm:text-sm text-stone-700 mb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C96C8A]" />
              <span>
                Add <strong className="text-[#351C2B] font-bold">৳{remainingForFreeShipping.toLocaleString()}</strong> more to unlock <strong className="text-emerald-700">Free Delivery across Bangladesh</strong>!
              </span>
            </p>
          ) : (
            <p className="text-xs sm:text-sm text-emerald-800 font-semibold mb-2 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Unlocked: You qualify for Free Delivery across Bangladesh ✨</span>
            </p>
          )}
          <div className="w-full h-2 bg-[#FAF6F4] rounded-full overflow-hidden border border-stone-100">
            <div
              className="h-full bg-gradient-to-r from-[#C96C8A] to-[#E8B7C5] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main Grid: Items Table & Order Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Items List (Left 8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E8B7C5]/30 shadow-xs divide-y divide-stone-100 overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#FFF8F3]/30 transition-colors"
                >
                  {/* Thumbnail & Product Details */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-[#E8B7C5]/30">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#C96C8A] mb-0.5">
                        {item.product.brand}
                      </p>
                      <h3 className="text-sm sm:text-base font-semibold text-[#2B2024] truncate mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-stone-500 mb-2">
                        Unit Price:{' '}
                        <strong className="text-[#351C2B] font-bold tabular-nums">
                          ৳{item.product.price.toLocaleString()}
                        </strong>
                      </p>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-rose-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Quantity Stepper & Line Total */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div className="flex items-center border border-[#E8B7C5]/60 rounded-lg bg-white overflow-hidden shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-stone-600 hover:bg-[#FFF8F3] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 text-xs font-bold text-[#351C2B] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-stone-600 hover:bg-[#FFF8F3] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm sm:text-base font-bold text-[#351C2B] tabular-nums">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary (Right 4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8B7C5]/30 shadow-xs space-y-6 sticky top-24">
              <h2 className="font-serif text-xl font-bold text-[#351C2B] pb-3 border-b border-[#E8B7C5]/30">
                Order Summary
              </h2>

              {/* Delivery Destination Selector */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-600">Select Delivery Location:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryLocation('inside_dhaka')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                      deliveryLocation === 'inside_dhaka'
                        ? 'bg-[#351C2B] text-white border-[#351C2B]'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-[#FFF8F3]'
                    }`}
                  >
                    Inside Dhaka (৳70)
                  </button>
                  <button
                    onClick={() => setDeliveryLocation('outside_dhaka')}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border ${
                      deliveryLocation === 'outside_dhaka'
                        ? 'bg-[#351C2B] text-white border-[#351C2B]'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-[#FFF8F3]'
                    }`}
                  >
                    Outside Dhaka (৳130)
                  </button>
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="pt-2 border-t border-stone-100">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 bg-[#FFF0F5] rounded-xl border border-[#E8B7C5]/50 text-xs">
                    <div className="flex items-center gap-2 text-emerald-800 font-medium">
                      <Tag className="w-4 h-4 text-[#C96C8A]" />
                      <span>Coupon <strong>{appliedCoupon}</strong> active</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-stone-700 text-xs font-semibold underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Coupon code (e.g. GLOW10)"
                        className="flex-1 text-xs px-3 py-2.5 bg-[#FFF8F3] border border-[#E8B7C5]/60 rounded-lg uppercase font-semibold text-[#351C2B] focus:outline-none focus:border-[#C96C8A]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#351C2B] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#C96C8A] transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-rose-600">{couponError}</p>}
                    <p className="text-[10px] text-stone-400">
                      Use code <strong>GLOW10</strong> for 10% off or <strong>LUMERA15</strong> for 15% off.
                    </p>
                  </form>
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2.5 text-xs text-stone-600 pt-3 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#351C2B] tabular-nums">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount ({appliedCoupon})</span>
                    <span className="tabular-nums">-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-[#351C2B] tabular-nums">
                    {deliveryCharge === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `৳${deliveryCharge}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#351C2B] pt-3 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="tabular-nums">৳{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full py-4 bg-[#351C2B] hover:bg-[#C96C8A] text-[#FFF8F3] rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-stone-400">
                <span>Free delivery on orders over ৳3,000 · Cash on delivery available</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
