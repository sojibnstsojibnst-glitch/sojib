import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { PRODUCTS } from '../data/products.ts';
import { ProductCard } from './ProductCard.tsx';
import { ArrowRight, Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { navigateToShop } = useShop();

  // Filter products marked as new arrival, or latest products
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival || p.id === 'lum-04' || p.id === 'lum-06' || p.id === 'lum-08' || p.id === 'lum-09').slice(0, 4);

  return (
    <section className="py-16 md:py-20 bg-white border-b border-[#E8B7C5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Fresh Formulations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#351C2B] font-medium tracking-tight">
              New Arrivals
            </h2>
            <p className="text-sm text-[#2B2024]/75 mt-2">
              Just arrived at the atelier: restorative essences, radiant mists, and luxury extrait parfums.
            </p>
          </div>

          <button
            onClick={() => navigateToShop({ sortBy: 'newest' })}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#351C2B] hover:text-[#C96C8A] transition-colors group cursor-pointer"
          >
            <span>View All New Arrivals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
