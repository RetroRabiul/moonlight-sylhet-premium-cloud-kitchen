import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './AuthModal';
import {
  Flame,
  Moon,
  Sun,
  ShoppingBag,
  Bell,
  Phone,
  Facebook,
  Award,
  Clock,
  Menu as MenuIcon,
  X,
  ChefHat,
  BarChart3,
  Package,
  Layers,
  Sparkles,
  Tag,
  Star,
  Check,
  LogIn,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';
import { ActiveTab } from '../types';

export const Navbar: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    setTheme,
    activeTab,
    setActiveTab,
    cartItemCount,
    cartTotal,
    setIsCartOpen,
    loyalty,
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    clearAllNotifications,
    isStaffMode,
    setIsStaffMode,
  } = useApp();

  const { user, loading: authLoading, signOut } = useAuth();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; bengaliLabel: string; icon: any }[] = [
    { id: 'menu', label: 'Menu', bengaliLabel: 'মেনু', icon: Flame },
    { id: 'promos', label: 'Midnight Deals', bengaliLabel: 'অফার ও ডিল', icon: Tag },
    { id: 'loyalty', label: 'Fuel Rewards', bengaliLabel: 'ফুয়েল রিওয়ার্ডস', icon: Award },
    { id: 'reviews', label: 'Reviews', bengaliLabel: 'রিভিউ', icon: Star },
  ];

  const staffNavItems: { id: ActiveTab; label: string; bengaliLabel: string; icon: any }[] = [
    { id: 'staff', label: 'Kitchen KDS', bengaliLabel: 'কিচেন ড্যাশবোর্ড', icon: ChefHat },
    { id: 'inventory', label: 'Inventory', bengaliLabel: 'ইনভেন্টরি স্টক', icon: Package },
    { id: 'analytics', label: 'Sales Analytics', bengaliLabel: 'সেলস রিপোর্ট', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-black/95 backdrop-blur-md text-white transition-colors">
      {/* Top Hotline & Announcement Bar - Clean Full Black */}
      <div className="bg-black border-b border-neutral-850 text-neutral-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
          </span>
          <span className="truncate tracking-wide text-xs text-neutral-300">
            {language === 'bn'
              ? '🌙 খোলা আছে রাত ৮:০০ - ভোর ৪:০০ টা | পুরো সিলেটে দ্রুততম হট ডেলিভারি!'
              : '🌙 OPEN DAILY 8:00 PM - 4:00 AM | Late-Night Cloud Kitchen Across Sylhet'}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href="tel:+8801324993344"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white font-semibold transition-colors"
            id="nav-hotline-link"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">+880 1324993344</span>
            <span className="sm:hidden">Call</span>
          </a>

          <a
            href="https://www.facebook.com/Nightfuel.sylhet/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded font-medium transition-colors"
            id="nav-facebook-link"
          >
            <Facebook className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden md:inline">Nightfuel.sylhet</span>
          </a>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('menu');
              setIsStaffMode(false);
            }}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="brand-logo-button"
          >
            <img
              src={logo}
              alt="MOONLIGHT logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg sm:text-xl text-white tracking-wider">MOONLIGHT</span>
              <span className="text-[9px] uppercase font-bold text-slate-200 tracking-[0.25em] -mt-0.5">Premium Cloud Kitchen</span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-black p-1 rounded-xl border border-neutral-800">
          {(!isStaffMode ? navItems : staffNavItems).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                id={`desktop-nav-${item.id}`}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-black font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-neutral-400'}`} />
                <span>{language === 'bn' ? item.bengaliLabel : item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Staff Mode Switcher */}
          <button
            onClick={() => {
              const nextMode = !isStaffMode;
              setIsStaffMode(nextMode);
              setActiveTab(nextMode ? 'staff' : 'menu');
            }}
            id="staff-mode-toggle"
            className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
              isStaffMode
                ? 'bg-neutral-800 border-neutral-700 text-white'
                : 'bg-black border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
            }`}
            title="Toggle Staff Kitchen & Management Dashboard"
          >
            <ChefHat className="w-3.5 h-3.5 text-neutral-400" />
            <span>{isStaffMode ? (language === 'bn' ? 'স্টাফ মোড' : 'Staff Portal') : (language === 'bn' ? 'স্টাফ পোর্টাল' : 'Staff View')}</span>
          </button>

          {/* Loyalty Quick Pill */}
          <button
            onClick={() => setActiveTab('loyalty')}
            id="nav-loyalty-pill"
            className="hidden md:flex items-center gap-1.5 bg-black border border-neutral-800 px-2.5 py-1 rounded-lg text-xs hover:border-neutral-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-white">{loyalty.points}</span>
            <span className="text-neutral-400 text-[11px]">{language === 'bn' ? 'পয়েন্ট' : 'pts'}</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            id="language-toggle-btn"
            className="px-2.5 py-1 rounded-lg bg-black border border-neutral-800 hover:border-neutral-700 text-xs font-bold text-white transition-colors"
            title="Switch Language / ভাষা পরিবর্তন"
          >
            {language === 'en' ? 'বাংলা' : 'EN'}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            id="theme-toggle-btn"
            className="p-2 rounded-lg bg-black border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="Toggle Dark/Light Mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-neutral-300" /> : <Moon className="w-4 h-4 text-neutral-300" />}
          </button>

          {/* Auth Button - Login / User Menu */}
          {!authLoading && (
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black border border-neutral-800 hover:border-neutral-700 text-white transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-neutral-300" />
                  </div>
                  <span className="text-xs font-semibold hidden sm:inline max-w-[100px] truncate">
                    {user.user_metadata?.display_name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3 h-3 text-neutral-400" />
                </button>
              ) : (
                <button
                  onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{language === 'bn' ? 'লগইন' : 'Sign In'}</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {user && isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-black border border-neutral-800 rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-3 py-2 border-b border-neutral-800">
                      <p className="text-xs font-bold text-white truncate">{user.user_metadata?.display_name || 'User'}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { signOut(); setIsUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {language === 'bn' ? 'সাইন আউট' : 'Sign Out'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              id="notifications-bell-btn"
              className="p-2 rounded-lg bg-black border border-neutral-800 text-neutral-400 hover:text-white transition-colors relative"
            >
              <Bell className="w-4 h-4 text-neutral-300" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Drawer */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-black border border-neutral-800 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-neutral-400" />
                    <span className="font-bold text-sm text-white tracking-wider">
                      {language === 'bn' ? 'নোটিফিকেশন সেন্টার' : 'MoonLight Alerts'}
                    </span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAllNotifications}
                      className="text-[11px] text-neutral-400 hover:text-white transition-colors"
                    >
                      {language === 'bn' ? 'সব মুছুন' : 'Clear all'}
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-neutral-900 mt-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-6 text-neutral-500 text-xs">
                      {language === 'bn' ? 'কোন নতুন নোটিফিকেশন নেই' : 'No new notifications'}
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.linkTab) setActiveTab(notif.linkTab as ActiveTab);
                          setIsNotifOpen(false);
                        }}
                        className={`py-2.5 px-2 rounded-lg cursor-pointer transition-colors ${
                          notif.read ? 'opacity-60 hover:bg-neutral-900' : 'bg-neutral-900/60 hover:bg-neutral-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs font-bold text-white">
                            {language === 'bn' ? notif.bengaliTitle : notif.title}
                          </h4>
                          <span className="text-[10px] text-neutral-500 whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                          {language === 'bn' ? notif.bengaliMessage : notif.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Trigger Button - Clean Black / White */}
          <button
            onClick={() => setIsCartOpen(true)}
            id="nav-cart-btn"
            className="flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-bold px-3.5 py-1.5 rounded-xl shadow transition-transform active:scale-95 border border-neutral-200"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-black stroke-[2.5]" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2.5 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold hidden sm:inline text-black">
              ৳{cartTotal}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="lg:hidden p-2 rounded-lg bg-black border border-neutral-800 text-neutral-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black border-b border-neutral-800 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsStaffMode(false);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold ${
                    isActive && !isStaffMode
                      ? 'bg-white text-black font-bold'
                      : 'bg-black border border-neutral-800 text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive && !isStaffMode ? 'text-black' : 'text-neutral-400'}`} />
                  <span>{language === 'bn' ? item.bengaliLabel : item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Staff Portal Divider */}
          <div className="pt-2 border-t border-neutral-800">
            <p className="text-[11px] font-bold uppercase text-neutral-400 mb-2 tracking-wider">
              {language === 'bn' ? 'স্টাফ ও কিচেন ড্যাশবোর্ড' : 'Staff & Kitchen Management'}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {staffNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsStaffMode(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg text-[10px] font-semibold text-center ${
                      isActive && isStaffMode
                        ? 'bg-white text-black font-bold'
                        : 'bg-black border border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 mb-1 text-neutral-400" />
                    <span>{language === 'bn' ? item.bengaliLabel : item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Login Button */}
      {!authLoading && !user && isMobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <button
            onClick={() => { setAuthModalMode('login'); setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm transition-colors"
          >
            <LogIn className="w-4 h-4" />
            {language === 'bn' ? 'লগইন / সাইন আপ' : 'Sign In / Sign Up'}
          </button>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </header>
  );
};
