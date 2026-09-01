import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MenuGallery } from './components/MenuGallery';
import { LoyaltyProgram } from './components/LoyaltyProgram';
import { PromosView } from './components/PromosView';
import { ReviewsView } from './components/ReviewsView';
import { StaffDashboard } from './components/StaffDashboard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-neutral-800 selection:text-white relative">
      {/* Top Sticky Header */}
      <Navbar />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-16">
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <HeroBanner />
            <MenuGallery />
          </div>
        )}

        {activeTab === 'loyalty' && <LoyaltyProgram />}

        {activeTab === 'promos' && <PromosView />}

        {activeTab === 'reviews' && <ReviewsView />}

        {(activeTab === 'staff' || activeTab === 'inventory' || activeTab === 'analytics') && (
          <StaffDashboard />
        )}
      </main>

      {/* Slide-in Cart Drawer */}
      <CartDrawer />

      {/* Interactive Digital Wallet Checkout Modal */}
      <CheckoutModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </AuthProvider>
  );
}
