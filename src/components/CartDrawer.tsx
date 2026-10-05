import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  Check,
  ExternalLink,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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

  if (!isCartDrawerOpen) return null;

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

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('checkout');
  };

  const handleOpenCartPage = () => {
    setIsCartDrawerOpen(false);
    setCurrentView('cart');
  };

  const freeShippingThreshold = 3000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div
      className="fixed inset-0 z-50 bg-[#351C2B]/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartDrawerOpen(false)}
    >
      <div
        className="w-full max-w-md bg-[#FFF8F3] h-full shadow-2xl flex flex-col border-l border-[#E8B7C5]/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 bg-white border-b border-[#E8B7C5]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C96C8A]" />
            <h3 className="font-serif text-xl font-bold text-[#351C2B]">
              Cart ({cartCount})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-stone-500 hover:text-[#C96C8A] rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-3.5 bg-[#FFF0F5] border-b border-[#E8B7C5]/40 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-stone-700 mb-1.5 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C96C8A]" />
              <span>
                Add <strong className="text-[#351C2B] font-bold">৳{remainingForFreeShipping.toLocaleString()}</strong> more to unlock <strong className="text-emerald-700">Free Delivery</strong>!
              </span>
            </p>
          ) : (
            <p className="text-emerald-800 font-semibold mb-1.5 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Unlocked: You qualify for Free Delivery across Bangladesh ✨</span>
            </p>
          )}
          <div className="w-full h-1.5 bg-[#E8B7C5]/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C96C8A] transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF6F4] flex items-center justify-center text-[#C96C8A]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl text-[#351C2B]">Your cart is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our carefully crafted skincare, velvet lipsticks, and beauty rituals to begin.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setCurrentView('shop');
                }}
                className="px-6 py-3.5 bg-[#351C2B] text-white hover:bg-[#C96C8A] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Continue Shopping</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3.5 bg-white rounded-xl border border-[#E8B7C5]/30 shadow-2xs"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-[#E8B7C5]/20">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C96C8A] truncate">
                        {item.product.brand}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1 -mt-1 -mr-1 cursor-pointer"
                        aria-label={`Remove ${item.product.name} from cart`}
                        title="Remove product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h5 className="text-xs font-semibold text-[#2B2024] line-clamp-1 mb-1">
                      {item.product.name}
                    </h5>

                    <p className="text-xs text-stone-500">
                      Unit:{' '}
                      <strong className="text-[#351C2B] font-bold tabular-nums">
                        ৳{item.product.price.toLocaleString()}
                      </strong>
                    </p>
                  </div>

                  {/* Quantity Stepper & Line Subtotal */}
                  <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-stone-100">
                    <div className="flex items-center border border-[#E8B7C5]/60 rounded-md bg-[#FFF8F3]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200 cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-[#351C2B] tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1 text-xs text-stone-600 hover:bg-stone-200 cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#351C2B] tabular-nums">
                      ৳{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Calculations */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E8B7C5]/40 space-y-4">
            
            {/* Delivery Destination Selector */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600 font-medium">Delivery Destination:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryLocation('inside_dhaka')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    deliveryLocation === 'inside_dhaka'
                      ? 'bg-[#351C2B] text-white'
                      : 'bg-[#FFF8F3] text-stone-600 border border-stone-200'
                  }`}
                >
                  Inside Dhaka (৳70)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryLocation('outside_dhaka')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    deliveryLocation === 'outside_dhaka'
                      ? 'bg-[#351C2B] text-white'
                      : 'bg-[#FFF8F3] text-stone-600 border border-stone-200'
                  }`}
                >
                  Outside Dhaka (৳130)
                </button>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-[#FFF0F5] rounded-lg border border-[#E8B7C5]/50 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-medium">
                    <Tag className="w-3.5 h-3.5 text-[#C96C8A]" />
                    <span>Coupon <strong>{appliedCoupon}</strong> active</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-stone-700 text-xs font-semibold underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. GLOW10)"
                    className="flex-1 text-xs px-3 py-2 bg-[#FFF8F3] border border-[#E8B7C5]/60 rounded-md uppercase font-semibold text-[#351C2B] focus:outline-none focus:border-[#C96C8A]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#351C2B] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#C96C8A] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#351C2B] tabular-nums">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
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

              <div className="flex justify-between text-base font-bold text-[#351C2B] pt-2 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="tabular-nums">৳{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Proceed to Checkout CTA & View Cart Page link */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleProceedCheckout}
                className="w-full py-4 bg-[#351C2B] text-[#FFF8F3] hover:bg-[#C96C8A] rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleOpenCartPage}
                className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#C96C8A] transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Full Cart Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
