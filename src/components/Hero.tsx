import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { heroImg } from '../data/products.ts';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateToShop } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F3] via-[#FFF8F3] to-[#FFF0F5] border-b border-[#E8B7C5]/30">
      {/* Subtle Luxury Pattern / Glow Accents */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-[#E8B7C5]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Autumn/Winter Ritual 2026</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#351C2B] font-medium leading-[1.15] sm:leading-[1.1] tracking-tight">
              Your Glow <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C96C8A]">Starts Here.</span>
            </h1>

            <p className="text-sm sm:text-lg text-[#2B2024]/80 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Discover carefully selected beauty essentials designed to elevate your everyday routine.
              Dermatologically refined formulas crafted for radiance, care, and effortless confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigateToShop({ category: 'All' })}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-[#351C2B] text-[#FFF8F3] hover:bg-[#C96C8A] font-semibold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateToShop({ sortBy: 'best-selling' })}
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 border border-[#351C2B]/30 hover:border-[#C96C8A] text-[#351C2B] hover:text-[#C96C8A] font-semibold text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 bg-white/50 backdrop-blur-xs cursor-pointer"
              >
                EXPLORE BEST SELLERS
              </button>
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-6 sm:pt-8 border-t border-[#E8B7C5]/40 grid grid-cols-3 gap-2 sm:gap-4 text-center lg:text-left">
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-[#351C2B] tracking-wide">100% Authentic</p>
                <p className="text-[10px] sm:text-[11px] text-[#2B2024]/60">Directly sourced</p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-[#351C2B] tracking-wide">Fast Delivery</p>
                <p className="text-[10px] sm:text-[11px] text-[#2B2024]/60">24–48h Dhaka</p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs font-bold text-[#351C2B] tracking-wide">COD Available</p>
                <p className="text-[10px] sm:text-[11px] text-[#2B2024]/60">Cash on delivery</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#E8B7C5]/40 to-[#C9A227]/20 -rotate-1 blur-xs" />
              
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/60 bg-stone-100 aspect-[16/10] sm:aspect-[16/11]">
                <img
                  src={heroImg}
                  alt="LUMÉRA Beauty luxury skincare and cosmetics ritual display"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle Luxury Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#351C2B]/40 via-transparent to-transparent pointer-events-none" />

                {/* Floating Aesthetic Tag */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto bg-[#FFF8F3]/95 backdrop-blur-md p-2.5 sm:px-4 sm:py-3 rounded-lg shadow-lg border border-[#E8B7C5]/50 flex items-center gap-2.5 sm:gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C96C8A] animate-ping shrink-0" />
                  <div>
                    <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#351C2B]">
                      Hydrating Glow Elixir
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[#2B2024]/70">
                      Awarded Best Serum · Autumn 2026
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
