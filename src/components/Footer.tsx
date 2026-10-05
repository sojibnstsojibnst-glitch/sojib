import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { ProductCategory } from '../types/index.ts';
import { CONTACT_CONFIG } from '../../config/contact.js';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, navigateToCategory, navigateToShop } = useShop();

  const handleCategory = (cat: ProductCategory) => {
    navigateToCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B1B26] text-[#FFF8F3] pt-16 pb-12 border-t border-[#C96C8A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-3xl font-bold tracking-[0.2em] text-[#FFF8F3] uppercase">
                LUMÉRA
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#E8B7C5] font-semibold">
                Beauty
              </span>
            </div>

            <p className="font-serif italic text-lg text-[#E8B7C5]">
              “Glow. Care. Confidence.”
            </p>

            <p className="text-xs text-stone-300/80 leading-relaxed max-w-sm font-light">
              LUMÉRA Beauty is an international luxury cosmetics and skincare boutique curated for modern women in Bangladesh. Formulated with pure botanical extracts and dermatologically verified bio-actives.
            </p>

            <div className="pt-2 text-xs text-stone-300/80 space-y-1.5">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C96C8A]" />
                <span>{CONTACT_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C96C8A]" />
                <span>Hotline: {CONTACT_CONFIG.hotline} ({CONTACT_CONFIG.supportHours})</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C96C8A]" />
                <span>{CONTACT_CONFIG.email}</span>
              </p>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8B7C5]">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => handleCategory('Skincare')}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('Makeup')}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  Makeup
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('Haircare')}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  Haircare
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('Body Care')}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  Body Care
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategory('Fragrance')}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  Fragrance
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateToShop({ sortBy: 'best-selling' });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E8B7C5] transition-colors font-medium text-white"
                >
                  Best Sellers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8B7C5]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  Track My Order
                </button>
              </li>
              <li>
                <span className="hover:text-[#E8B7C5] transition-colors cursor-pointer">
                  Shipping & Delivery Info
                </span>
              </li>
              <li>
                <span className="hover:text-[#E8B7C5] transition-colors cursor-pointer">
                  Returns & Exchanges (7-Day Policy)
                </span>
              </li>
              <li>
                <span className="hover:text-[#E8B7C5] transition-colors cursor-pointer">
                  Authenticity Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-[#E8B7C5] transition-colors cursor-pointer">
                  Frequently Asked Questions
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8B7C5]">
              Company & Connect
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  About LUMÉRA
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('journal');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#E8B7C5] transition-colors"
                >
                  Beauty Journal
                </button>
              </li>
              <li>
                <span className="hover:text-[#E8B7C5] transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[#E8B7C5] transition-colors cursor-pointer">
                  Terms & Conditions
                </span>
              </li>
            </ul>

            {/* Social Placeholder Links */}
            <div className="pt-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 mb-2">
                Follow Our Journey
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <a
                  href="#facebook"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-[#E8B7C5] transition-colors"
                  aria-label="Facebook placeholder"
                >
                  Facebook
                </a>
                <span>·</span>
                <a
                  href="#instagram"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-[#E8B7C5] transition-colors"
                  aria-label="Instagram placeholder"
                >
                  Instagram
                </a>
                <span>·</span>
                <a
                  href="#tiktok"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-[#E8B7C5] transition-colors"
                  aria-label="TikTok placeholder"
                >
                  TikTok
                </a>
                <span>·</span>
                <a
                  href="#youtube"
                  onClick={(e) => e.preventDefault()}
                  className="hover:text-[#E8B7C5] transition-colors"
                  aria-label="YouTube placeholder"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} LUMÉRA BEAUTY LTD. All rights reserved.</p>
          <div className="flex items-center gap-3 text-[11px] text-stone-400">
            <span>Cash on Delivery</span>
            <span>·</span>
            <span>bKash</span>
            <span>·</span>
            <span>Nagad</span>
            <span>·</span>
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
