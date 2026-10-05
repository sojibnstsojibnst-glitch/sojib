import React from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, setIsCartDrawerOpen } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-sm w-full px-4 sm:px-0">
      <div className="bg-[#351C2B] text-[#FFF8F3] p-4 rounded-xl shadow-2xl border border-[#E8B7C5]/40 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2.5 min-w-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="truncate">{toast.message}</span>
        </div>

        <button
          type="button"
          onClick={() => setIsCartDrawerOpen(true)}
          className="px-3 py-1.5 bg-[#C96C8A] hover:bg-[#b55877] text-white text-xs font-bold uppercase tracking-wider rounded-lg shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Cart</span>
        </button>
      </div>
    </div>
  );
};
