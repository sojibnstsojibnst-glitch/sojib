import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { CustomerInfo } from '../types/index.ts';
import { trackEcommerce } from '../analytics/ecommerce.ts';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const BD_CITIES = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Comilla',
  'Gazipur',
  'Narayanganj',
  'Bogra',
  'Cox’s Bazar',
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    deliveryCharge,
    discountAmount,
    totalAmount,
    deliveryLocation,
    setDeliveryLocation,
    appliedCoupon,
    placeOrder,
    setCurrentView,
  } = useShop();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: 'Dhaka',
    area: '',
    postalCode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'sslcommerz'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4 bg-[#FFF8F3]">
        <h2 className="font-serif text-2xl text-[#351C2B] mb-4">Your Shopping Bag is Empty</h2>
        <p className="text-xs text-stone-500 mb-6">
          Add luxury beauty essentials to your bag before proceeding to checkout.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-[#351C2B] text-white text-xs uppercase tracking-wider rounded-md"
        >
          Return to Atelier
        </button>
      </div>
    );
  }

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.phone.trim() || formData.phone.length < 11) {
      errs.phone = 'Valid Bangladeshi phone number is required (e.g. 017XXXXXXXX)';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required for tracking updates';
    }
    if (!formData.address.trim()) errs.address = 'Street delivery address is required';
    if (!formData.area.trim()) errs.area = 'Area / Thana / Police Station is required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCityChange = (city: string) => {
    setFormData((prev) => ({ ...prev, city }));
    if (city === 'Dhaka') {
      setDeliveryLocation('inside_dhaka');
    } else {
      setDeliveryLocation('outside_dhaka');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Track GA4 payment info
    trackEcommerce.addPaymentInfo({
      currency: 'BDT',
      value: totalAmount,
      payment_type: paymentMethod,
      items: cart.map((i) => ({
        item_id: i.product.id,
        item_name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
    });

    // Simulate order submission
    setTimeout(() => {
      placeOrder(formData, paymentMethod);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="bg-[#FFF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8B7C5]/40">
          <button
            onClick={() => setCurrentView('shop')}
            className="flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-[#C96C8A] transition-colors uppercase tracking-wider"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <Lock className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            
            {/* Left 7 Columns: Delivery & Payment Details */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* Step 1: Customer & Delivery Address */}
              <div className="bg-white p-4 sm:p-8 rounded-2xl border border-[#E8B7C5]/30 shadow-xs space-y-4 sm:space-y-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C96C8A]">
                  <Truck className="w-4 h-4 text-[#C9A227]" />
                  <span>1. Shipping Information (Bangladesh)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Samira Rahman"
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Phone Number (Mobile) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 01711223344"
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="samira@example.com"
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Full Delivery Address (House, Road, Block) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. House 14, Road 7, Block D, Banani"
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      City / District *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleCityChange(e.target.value)}
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A] font-medium"
                    >
                      {BD_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Area / Thana / Police Station *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      placeholder="e.g. Banani / Dhanmondi / GEC"
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                    {formErrors.area && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.area}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      placeholder="e.g. 1213"
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#2B2024] mb-1">
                      Delivery Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Leave with concierge"
                      className="w-full text-xs p-3 bg-[#FFF8F3] border border-[#E8B7C5]/50 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Options */}
              <div className="bg-white p-4 sm:p-8 rounded-2xl border border-[#E8B7C5]/30 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C96C8A]">
                  <CreditCard className="w-4 h-4 text-[#C9A227]" />
                  <span>2. Payment Method</span>
                </div>

                <p className="text-xs text-stone-500">
                  Select your preferred payment method. Ready for direct mobile financial services.
                </p>

                <div className="space-y-3">
                  {/* Option 1: Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#C96C8A] bg-[#FFF8F3] ring-1 ring-[#C96C8A]'
                        : 'border-[#E8B7C5]/40 hover:bg-[#FFF8F3]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#C96C8A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#351C2B]">
                          Cash on Delivery (COD)
                        </span>
                        <span className="text-[10px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-semibold">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Pay cash upon receiving and inspecting your package at your doorstep.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: bKash */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-[#C96C8A] bg-[#FFF8F3] ring-1 ring-[#C96C8A]'
                        : 'border-[#E8B7C5]/40 hover:bg-[#FFF8F3]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="mt-1 accent-[#C96C8A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#351C2B]">
                          bKash Instant Mobile Payment
                        </span>
                        <span className="text-[10px] font-mono text-[#C96C8A] font-bold">
                          bKash
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Instant digital transfer via verified merchant wallet.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Nagad */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-[#C96C8A] bg-[#FFF8F3] ring-1 ring-[#C96C8A]'
                        : 'border-[#E8B7C5]/40 hover:bg-[#FFF8F3]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="mt-1 accent-[#C96C8A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#351C2B]">
                          Nagad Digital Wallet
                        </span>
                        <span className="text-[10px] font-mono text-[#C96C8A] font-bold">
                          Nagad
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Seamless payment via Nagad mobile app or USSD prompt.
                      </p>
                    </div>
                  </label>

                  {/* Option 4: SSLCommerz */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                      paymentMethod === 'sslcommerz'
                        ? 'border-[#C96C8A] bg-[#FFF8F3] ring-1 ring-[#C96C8A]'
                        : 'border-[#E8B7C5]/40 hover:bg-[#FFF8F3]/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'sslcommerz'}
                      onChange={() => setPaymentMethod('sslcommerz')}
                      className="mt-1 accent-[#C96C8A]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#351C2B]">
                          Online Card Gateway (SSLCommerz)
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          Visa / MC / Amex
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">
                        Pay securely with any Bangladeshi or international debit/credit card.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Order Summary & Place Order */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-4 sm:p-8 rounded-2xl border border-[#E8B7C5]/30 shadow-xs sticky top-24 space-y-6">
                
                <h3 className="font-serif text-xl font-bold text-[#351C2B] pb-3 border-b border-[#E8B7C5]/30">
                  Order Summary
                </h3>

                {/* Items Preview */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-semibold text-[#2B2024] truncate">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-stone-500">
                          Qty: {item.quantity} × ৳{item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#351C2B] tabular-nums">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="pt-4 border-t border-[#E8B7C5]/30 space-y-2 text-xs text-stone-600">
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
                    <span>
                      Delivery ({formData.city === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'})
                    </span>
                    <span className="font-semibold text-[#351C2B] tabular-nums">
                      {deliveryCharge === 0 ? (
                        <span className="text-emerald-700">FREE</span>
                      ) : (
                        `৳${deliveryCharge}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-[#351C2B] pt-3 border-t border-stone-200">
                    <span>Total Amount</span>
                    <span className="tabular-nums">৳{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#351C2B] hover:bg-[#C96C8A] text-[#FFF8F3] rounded-lg text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>CONFIRMING ORDER...</span>
                  ) : (
                    <>
                      <span>PLACE ORDER</span>
                      <Sparkles className="w-4 h-4 text-[#C9A227]" />
                    </>
                  )}
                </button>

                <div className="pt-2 text-center text-[11px] text-stone-500 space-y-1">
                  <p>Guaranteed authentic items · Dispatch within 24 hours</p>
                  <p>Need support? Call +880 1700-LUMERA</p>
                </div>

              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
