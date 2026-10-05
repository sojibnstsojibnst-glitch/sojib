import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { ChevronLeft, Clock, User, Share2, Sparkles, BookOpen } from 'lucide-react';

export const JournalDetailView: React.FC = () => {
  const { selectedArticle, setCurrentView, showToast, navigateToShop } = useShop();

  if (!selectedArticle) {
    return (
      <div className="py-24 text-center max-w-lg mx-auto px-4 bg-[#FFF8F3]">
        <h2 className="font-serif text-2xl text-[#351C2B] mb-4">No Article Selected</h2>
        <button
          onClick={() => setCurrentView('journal')}
          className="px-6 py-3 bg-[#351C2B] text-white text-xs uppercase tracking-wider rounded-md"
        >
          Return to Journal
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!');
    }
  };

  return (
    <article className="bg-[#FFF8F3] min-h-screen py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Back */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E8B7C5]/40">
          <button
            onClick={() => setCurrentView('journal')}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#C96C8A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Journal</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#C96C8A] transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Article</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4 mb-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C96C8A]">
            {selectedArticle.category}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#351C2B] font-medium leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center justify-center gap-3 text-xs text-stone-500 pt-2">
            <span>{selectedArticle.author}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C96C8A]" />
              <span>{selectedArticle.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{selectedArticle.publishedDate}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative rounded-3xl overflow-hidden aspect-[16/9] mb-12 shadow-xl border border-[#E8B7C5]/40 bg-stone-100">
          <img
            src={selectedArticle.image}
            alt={selectedArticle.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8B7C5]/30 shadow-xs space-y-6 max-w-3xl mx-auto">
          <p className="text-base sm:text-lg text-[#351C2B] font-serif italic border-l-2 border-[#C96C8A] pl-4 leading-relaxed">
            {selectedArticle.excerpt}
          </p>

          <div className="space-y-5 text-sm sm:text-base text-[#2B2024]/85 leading-relaxed">
            {selectedArticle.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Practical Atelier Recommendation */}
          <div className="mt-8 p-6 bg-[#FFF8F3] rounded-2xl border border-[#E8B7C5]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C96C8A] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Recommended Routine Essentials</span>
              </div>
              <p className="text-xs text-stone-700">
                Explore products formulated to support the dermal principles discussed in this guide.
              </p>
            </div>
            <button
              onClick={() => navigateToShop({ category: 'Skincare' })}
              className="px-5 py-2.5 bg-[#351C2B] text-white hover:bg-[#C96C8A] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              Shop Curated Skincare
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};
