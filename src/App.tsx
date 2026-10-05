/**
 * LUMÉRA BEAUTY – “Glow. Care. Confidence.”
 * Complete, functional luxury beauty & cosmetics e-commerce storefront.
 */
import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { CategorySection } from './components/CategorySection.tsx';
import { BestSellers } from './components/BestSellers.tsx';
import { NewArrivals } from './components/NewArrivals.tsx';
import { ProductDetailPage } from './components/ProductDetailPage.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { ShopPage } from './components/ShopPage.tsx';
import { CartPage } from './components/CartPage.tsx';
import { CheckoutPage } from './components/CheckoutPage.tsx';
import { OrderSuccess } from './components/OrderSuccess.tsx';
import { BeautyJournal } from './components/BeautyJournal.tsx';
import { JournalDetailView } from './components/JournalDetailView.tsx';
import { WhyLumera } from './components/WhyLumera.tsx';
import { Newsletter } from './components/Newsletter.tsx';
import { Footer } from './components/Footer.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { WishlistPage } from './components/WishlistPage.tsx';
import { AccountModal } from './components/AccountModal.tsx';
import { MobileBottomNav } from './components/MobileBottomNav.tsx';
import { Toast } from './components/Toast.tsx';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3] text-[#2B2024] selection:bg-[#E8B7C5] selection:text-[#351C2B] pb-20 lg:pb-0">
      {/* Sticky Main Navigation */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <Hero />
            <CategorySection />
            <BestSellers />
            <NewArrivals />
            <WhyLumera />
            <BeautyJournal />
            <Newsletter />
          </>
        )}

        {currentView === 'shop' && <ShopPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'product' && <ProductDetailPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'order-success' && <OrderSuccess />}
        {currentView === 'journal' && (
          <>
            <BeautyJournal />
            <Newsletter />
          </>
        )}
        {currentView === 'journal-detail' && <JournalDetailView />}
        {currentView === 'wishlist' && <WishlistPage />}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Overlays & Drawers */}
      <CartDrawer />
      <SearchModal />
      <ProductDetailModal />
      <AccountModal />
      <Toast />

      {/* Mobile Sticky Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
