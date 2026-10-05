import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { Sparkles, Mail, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubscribed(true);
    showToast('Welcome to the LUMÉRA circle! Check your email for 10% off code.');
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-tr from-[#351C2B] via-[#452438] to-[#351C2B] text-white relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#E8B7C5]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#C9A227]/10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8B7C5] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
          <span>Exclusive Beauty Invitation</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4 text-[#FFF8F3]">
          Get Your Glow Updates ✨
        </h2>

        <p className="text-sm sm:text-base text-stone-200/90 max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Be the first to discover new arrivals, beauty tips, and exclusive offers. Receive a complimentary 10% welcome privilege on your initial order.
        </p>

        {isSubscribed ? (
          <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl max-w-md mx-auto border border-emerald-400/40 flex items-center justify-center gap-3 text-emerald-300 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Thank you for joining. Welcome to LUMÉRA Beauty!</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-[#E8B7C5] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#E8B7C5] text-[#351C2B] hover:bg-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-md shrink-0 cursor-pointer"
            >
              SUBSCRIBE
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-300/60 mt-4">
          Respecting your privacy. Unsubscribe at any time with a single click.
        </p>
      </div>
    </section>
  );
};
