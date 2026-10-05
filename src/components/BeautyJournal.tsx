import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { ARTICLES } from '../data/articles.ts';
import { ArrowRight, BookOpen, Clock, User } from 'lucide-react';

export const BeautyJournal: React.FC = () => {
  const { navigateToArticle, setCurrentView } = useShop();

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E8B7C5]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A] mb-2 flex items-center justify-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial & Skincare Wisdom</span>
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#351C2B] font-medium tracking-tight">
            The Beauty Journal
          </h2>
          <div className="w-12 h-[1px] bg-[#C9A227] mx-auto mt-4 mb-3" />
          <p className="text-sm text-[#2B2024]/75">
            Expert dermal guidance, ingredient science, and routine curation written for radiant living.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              onClick={() => navigateToArticle(article)}
              className={`group cursor-pointer rounded-2xl overflow-hidden bg-[#FFF8F3] border border-[#E8B7C5]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              {/* Cover Image */}
              <div className={`relative overflow-hidden bg-stone-100 ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#351C2B]/60 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest text-[#FFF8F3] bg-[#351C2B]/80 px-2.5 py-1 rounded-sm backdrop-blur-xs">
                  {article.category}
                </span>
              </div>

              {/* Text Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C96C8A]" />
                      <span>{article.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className={`font-serif text-[#351C2B] group-hover:text-[#C96C8A] transition-colors leading-snug mb-3 font-medium ${
                    idx === 0 ? 'text-2xl sm:text-3xl' : 'text-xl'
                  }`}>
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#2B2024]/75 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E8B7C5]/30 flex items-center justify-between">
                  <span className="text-xs text-stone-600 truncate max-w-[200px]">
                    By {article.author.split(',')[0]}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#C96C8A] group-hover:translate-x-1 transition-transform">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
