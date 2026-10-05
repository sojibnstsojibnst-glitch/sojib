import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  CheckCircle,
  Gem,
} from 'lucide-react';

const PILLARS = [
  {
    icon: Gem,
    title: 'Carefully Selected Products',
    description: 'Each formulation is hand-curated and evaluated for safety, efficacy, and sensory delight.',
  },
  {
    icon: ShieldCheck,
    title: 'Authentic Beauty Essentials',
    description: 'Direct partnerships with certified laboratories and brand houses ensuring guaranteed genuine products.',
  },
  {
    icon: LockIcon,
    title: 'Secure Shopping',
    description: 'End-to-end encrypted transactions supporting Cash on Delivery and trusted Bangladesh gateways.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Dispatched within 24 hours. Reliable doorstep delivery across Dhaka and nationwide divisions.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free 7-day return policy for unopened and untampered beauty products.',
  },
  {
    icon: Headphones,
    title: 'Dedicated Customer Support',
    description: 'Our knowledgeable beauty advisory team is ready via phone, WhatsApp, and email every day.',
  },
];

function LockIcon(props: any) {
  return <CheckCircle {...props} />;
}

export const WhyLumera: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#FFF8F3] to-white border-b border-[#E8B7C5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A] mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>The LUMÉRA Standard</span>
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#351C2B] font-medium tracking-tight">
            Beauty You Can Feel Good About.
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A227] mx-auto mt-4 mb-3" />
          <p className="text-sm text-[#2B2024]/75">
            We hold ourselves to uncompromising standards of transparency, quality, and attentive service.
          </p>
        </div>

        {/* 6 Trust Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8B7C5]/30 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF8F3] text-[#C96C8A] flex items-center justify-center mb-4 border border-[#E8B7C5]/40">
                  <Icon className="w-5 h-5 text-[#C96C8A]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#351C2B] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2B2024]/70 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
