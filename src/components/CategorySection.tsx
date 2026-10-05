import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { ProductCategory } from '../types/index.ts';
import { serumImg, makeupImg, fragranceImg, heroImg } from '../data/products.ts';
import { ArrowRight } from 'lucide-react';

interface CategoryItem {
  name: ProductCategory;
  subtitle: string;
  image: string;
  description: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    name: 'Skincare',
    subtitle: 'Hydration & Radiance',
    image: serumImg,
    description: 'Serums, moisturisers, gentle essences & SPF rituals.',
  },
  {
    name: 'Makeup',
    subtitle: 'Velvet & Satin',
    image: makeupImg,
    description: 'Weightless foundations, dusky lipsticks & radiant powders.',
  },
  {
    name: 'Haircare',
    subtitle: 'Silk & Gloss',
    image: heroImg,
    description: 'Nourishing botanical elixirs, keratin serums & moisture oils.',
  },
  {
    name: 'Body Care',
    subtitle: 'Velvet Soufflés & Shimmers',
    image: serumImg,
    description: 'Whipped creams, golden illuminating oils & gentle scrubs.',
  },
  {
    name: 'Fragrance',
    subtitle: 'Haute Parfumerie',
    image: fragranceImg,
    description: 'Sensual extraits, amber notes & delicate floral bouquets.',
  },
];

export const CategorySection: React.FC = () => {
  const { navigateToCategory } = useShop();

  return (
    <section className="py-16 md:py-24 bg-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A] mb-2">
            Curated Collections
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#351C2B] font-medium tracking-tight">
            Explore by Category
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A227] mx-auto mt-4 mb-3" />
          <p className="text-sm text-[#2B2024]/75">
            Meticulously developed beauty formulations designed to harmonize and nurture your daily routine.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigateToCategory(cat.name)}
              className="group cursor-pointer rounded-xl overflow-hidden bg-white border border-[#E8B7C5]/40 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Image Container with Elegant Zoom */}
              <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                <img
                  src={cat.image}
                  alt={`${cat.name} Collection – LUMÉRA Beauty`}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#351C2B]/60 via-[#351C2B]/10 to-transparent group-hover:from-[#351C2B]/75 transition-colors duration-300" />
                
                {/* Overlay Text on Bottom of Image */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#E8B7C5] font-semibold mb-0.5 sm:mb-1">
                    {cat.subtitle}
                  </p>
                  <h3 className="font-serif text-base sm:text-xl font-medium tracking-wide">
                    {cat.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-3 sm:p-4 bg-white flex items-center justify-between mt-auto border-t border-[#E8B7C5]/20 group-hover:bg-[#FFF8F3] transition-colors">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[#351C2B] group-hover:text-[#C96C8A] transition-colors">
                  Shop Now
                </span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#FFF8F3] group-hover:bg-[#C96C8A] group-hover:text-white flex items-center justify-center transition-all duration-300 text-[#351C2B]">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
