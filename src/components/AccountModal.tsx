import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.tsx';
import { trackEcommerce } from '../analytics/ecommerce.ts';
import {
  X,
  User,
  Package,
  LogOut,
  Mail,
  Lock,
  Sparkles,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const AccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    userEmail,
    loginUser,
    logoutUser,
    orders,
    setCurrentView,
  } = useShop();

  const [inputEmail, setInputEmail] = useState('');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (!isAccountModalOpen) return null;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim() || !inputEmail.includes('@')) return;

    if (authMode === 'signup') {
      trackEcommerce.signUp({ method: 'email' });
    }
    loginUser(inputEmail.trim());
    setInputEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#351C2B]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-lg bg-[#FFF8F3] rounded-3xl shadow-2xl border border-[#E8B7C5]/40 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E8B7C5]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#C96C8A]" />
            <h3 className="font-serif text-xl font-bold text-[#351C2B]">
              {userEmail ? 'My LUMÉRA Account' : 'Welcome to LUMÉRA'}
            </h3>
          </div>
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="p-1.5 text-stone-500 hover:text-[#C96C8A] rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {userEmail ? (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8B7C5]/40 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#C96C8A] uppercase font-bold tracking-wider">
                    Privilege Member
                  </p>
                  <h4 className="text-sm font-bold text-[#351C2B] truncate">{userEmail}</h4>
                  <p className="text-xs text-stone-500 mt-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C9A227]" />
                    <span>250 Glow Reward Points</span>
                  </p>
                </div>
                <button
                  onClick={logoutUser}
                  className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Order History */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#351C2B] flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-[#C96C8A]" />
                  <span>Recent Orders ({orders.length})</span>
                </h4>

                {orders.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-xl border border-[#E8B7C5]/30">
                    <p className="text-xs text-stone-500 mb-3">No orders placed yet.</p>
                    <button
                      onClick={() => {
                        setIsAccountModalOpen(false);
                        setCurrentView('shop');
                      }}
                      className="px-4 py-2 bg-[#351C2B] text-white text-xs font-semibold rounded-md"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((ord) => (
                      <div
                        key={ord.orderNumber}
                        className="p-4 bg-white rounded-xl border border-[#E8B7C5]/30 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-bold text-[#351C2B]">
                            {ord.orderNumber}
                          </span>
                          <span className="text-[10px] text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{ord.status}</span>
                          </span>
                        </div>
                        <p className="text-stone-500">
                          {ord.date} · {ord.items.length} items
                        </p>
                        <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                          <span className="text-stone-600">Total:</span>
                          <span className="font-bold text-[#351C2B] tabular-nums">
                            ৳{ord.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-xs text-[#C96C8A] font-semibold uppercase tracking-wider">
                  Access Your Vanity
                </p>
                <h4 className="font-serif text-2xl text-[#351C2B]">
                  {authMode === 'signin' ? 'Sign In' : 'Create an Account'}
                </h4>
                <p className="text-xs text-stone-500">
                  Track orders, save favorite rituals, and enjoy member privileges.
                </p>
              </div>

              {/* Mode Toggle Tabs */}
              <div className="flex p-1 bg-stone-200/50 rounded-lg text-xs font-semibold">
                <button
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    authMode === 'signin' ? 'bg-white text-[#351C2B] shadow-xs' : 'text-stone-500'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    authMode === 'signup' ? 'bg-white text-[#351C2B] shadow-xs' : 'text-stone-500'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#2B2024] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className="w-full pl-10 pr-3 py-2.5 text-xs bg-white border border-[#E8B7C5]/60 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#2B2024] mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="password"
                      required
                      defaultValue="••••••••"
                      className="w-full pl-10 pr-3 py-2.5 text-xs bg-white border border-[#E8B7C5]/60 rounded-lg focus:outline-none focus:border-[#C96C8A]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#351C2B] text-white hover:bg-[#C96C8A] text-xs font-semibold uppercase tracking-[0.2em] rounded-lg transition-colors cursor-pointer"
                >
                  {authMode === 'signin' ? 'Sign In to Account' : 'Create My Account'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
