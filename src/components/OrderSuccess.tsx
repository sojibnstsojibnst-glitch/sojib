import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import {
  CheckCircle2,
  Package,
  Truck,
  Sparkles,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const { lastOrder, setCurrentView } = useShop();

  if (!lastOrder) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4 bg-[#FFF8F3]">
        <h2 className="font-serif text-2xl text-[#351C2B] mb-4">No recent order found</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-3 bg-[#351C2B] text-white text-xs uppercase tracking-wider rounded-md"
        >
          Explore Atelier
        </button>
      </div>
    );
  }

  const { customer, items, orderNumber, date, total, delivery, subtotal, discount, paymentMethod } = lastOrder;

  return (
    <div className="bg-[#FFF8F3] min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Success Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#E8B7C5]/40 shadow-xl space-y-8">
          
          {/* Header Banner */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A]">
              Order Confirmation
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#351C2B] font-medium">
              Your Order Is Confirmed! ✨
            </h1>

            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Thank you for choosing LUMÉRA Beauty. We are delicately preparing your luxury items for dispatch.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFF8F3] rounded-full border border-[#E8B7C5]/40 text-xs text-[#351C2B] font-mono">
              <span>Order Reference:</span>
              <strong className="text-[#C96C8A] font-bold">{orderNumber}</strong>
            </div>
          </div>

          {/* Delivery & Timeline Estimate Card */}
          <div className="p-5 bg-[#FAF6F4] rounded-2xl border border-[#E8B7C5]/30 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-[#C96C8A] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#351C2B] mb-1">Estimated Delivery:</strong>
                <p className="text-stone-600">
                  {customer.city === 'Dhaka'
                    ? '24 to 48 Hours (Express Dhaka Courier)'
                    : '2 to 3 Business Days (Nationwide Courier)'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[#351C2B] mb-1">Order Date & Payment:</strong>
                <p className="text-stone-600">
                  {date} · {paymentMethod === 'cod' ? 'Cash on Delivery (Pending)' : 'Online Payment (Verified)'}
                </p>
              </div>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="p-5 bg-white rounded-2xl border border-[#E8B7C5]/30 space-y-3 text-xs">
            <h4 className="font-bold text-[#351C2B] uppercase tracking-wider text-[11px]">
              Delivery Destination
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-600">
              <div className="space-y-1">
                <p className="font-semibold text-[#351C2B]">{customer.fullName}</p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C96C8A]" />
                  <span>{customer.phone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C96C8A]" />
                  <span>{customer.email}</span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C96C8A] shrink-0 mt-0.5" />
                  <span>
                    {customer.address}, {customer.area}, {customer.city}
                    {customer.postalCode ? ` - ${customer.postalCode}` : ''}
                  </span>
                </p>
                {customer.notes && (
                  <p className="text-stone-500 italic mt-1">Note: “{customer.notes}”</p>
                )}
              </div>
            </div>
          </div>

          {/* Itemized Products List */}
          <div className="space-y-4">
            <h4 className="font-bold text-[#351C2B] uppercase tracking-wider text-[11px] pb-2 border-b border-stone-200">
              Purchased Essentials ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </h4>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between gap-4 p-3 bg-[#FFF8F3] rounded-xl border border-[#E8B7C5]/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#C96C8A] font-semibold">
                        {item.product.brand}
                      </p>
                      <h5 className="text-xs font-semibold text-[#2B2024]">
                        {item.product.name}
                      </h5>
                      <p className="text-[11px] text-stone-500">
                        Qty: {item.quantity} × ৳{item.product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#351C2B] tabular-nums">
                    ৳{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="p-4 bg-[#FAF6F4] rounded-xl space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#351C2B] tabular-nums">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="tabular-nums">-৳{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="font-semibold text-[#351C2B] tabular-nums">
                  {delivery === 0 ? 'FREE' : `৳${delivery}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#351C2B] pt-2 border-t border-stone-200">
                <span>Total Paid / Due on Delivery</span>
                <span className="tabular-nums">৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex-1 py-4 bg-[#351C2B] hover:bg-[#C96C8A] text-white rounded-xl text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => window.print()}
              className="px-6 py-4 border border-[#351C2B]/30 hover:border-[#C96C8A] text-[#351C2B] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Print Receipt
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
