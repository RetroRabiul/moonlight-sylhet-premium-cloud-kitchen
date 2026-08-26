import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Tag,
  Bell,
  Sparkles,
  Flame,
  Clock,
  Copy,
  Check,
  Zap,
  Volume2,
  Share2,
  ArrowRight
} from 'lucide-react';

export const PromosView: React.FC = () => {
  const { promos, notifications, sendPushNotification, applyPromo, setIsCartOpen, language } = useApp();

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [customPromoTitle, setCustomPromoTitle] = useState('Midnight Flash Deal');
  const [customPromoMsg, setCustomPromoMsg] = useState('Get 20% OFF all Gourmet Pizzas until 3:30 AM across Sylhet!');

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleTriggerSimulatedPush = (title: string, msg: string) => {
    sendPushNotification(title, msg, 'promo');
  };

  return (
    <div className="py-6 space-y-8 max-w-5xl mx-auto" id="promos-notifications-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-6 h-6 text-white" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'bn' ? 'স্পেশাল অফার ও নোটিফিকেশন' : 'Deals, Promos & Push Alerts'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {language === 'bn'
              ? 'মধ্যরাতের এক্সক্লুসিভ ডিসকাউন্ট কুপন এবং তাৎক্ষণিক পুশ নোটিফিকেশন।'
              : 'Exclusive midnight flash deals, Sylhet student vouchers, and real-time push alerts.'}
          </p>
        </div>

        <button
          onClick={() =>
            handleTriggerSimulatedPush(
              '🔥 Flash Sale: 20% OFF Naga Wings!',
              'Freshly made Sylheti Naga Fire Wings are hot on discount until 3:00 AM!'
            )
          }
          className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-2 shadow active:scale-95 transition-transform"
        >
          <Bell className="w-4 h-4 text-black" />
          <span>{language === 'bn' ? 'টেস্ট পুশ নোটিফিকেশন পাঠান' : 'Test Push Notification'}</span>
        </button>
      </div>

      {/* Promos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {promos.map((promo) => {
          return (
            <div
              key={promo.id}
              className="relative rounded-2xl bg-black border border-neutral-800 hover:border-neutral-700 p-6 flex flex-col justify-between space-y-5 transition-all shadow group overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-300 border border-red-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-400" />
                    <span>{promo.tag}</span>
                  </span>
                  <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>{promo.activeHours}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mt-3 group-hover:text-amber-300 transition-colors">
                  {language === 'bn' ? promo.bengaliTitle : promo.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {language === 'bn' ? promo.bengaliDescription : promo.description}
                </p>

                <div className="mt-3 text-[11px] text-neutral-300 font-semibold">
                  Min. Order: ৳{promo.minSpend}
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-neutral-950 border border-dashed border-neutral-700 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400 block font-bold">
                      PROMO CODE
                    </span>
                    <span className="text-base font-mono font-bold text-white">
                      {promo.code}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(promo.code)}
                    id={`copy-code-${promo.code}`}
                    className="p-2 rounded-lg bg-black hover:bg-neutral-900 text-neutral-300 hover:text-white transition-colors border border-neutral-800"
                    title="Copy Code"
                  >
                    {copiedCode === promo.code ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <button
                  onClick={() => {
                    applyPromo(promo.code);
                    setIsCartOpen(true);
                  }}
                  id={`apply-code-btn-${promo.code}`}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow active:scale-95 transition-transform"
                >
                  <span>{language === 'bn' ? 'অর্ডারে যোগ করুন' : 'Apply & Open Cart'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Push Notification Simulator & Feed */}
      <div className="p-6 rounded-2xl bg-black border border-neutral-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-bold text-white text-base">
                {language === 'bn' ? 'লাইভ পুশ নোটিফিকেশন ফিড' : 'Real-time Push Notification Feed'}
              </h3>
              <p className="text-xs text-neutral-400">
                Simulate upcoming midnight offers & driver dispatch broadcast
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400">Total Alerts:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-white font-bold text-xs">
              {notifications.length}
            </span>
          </div>
        </div>

        {/* Custom Push Broadcaster Box */}
        <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-3">
          <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
            Broadcast Custom Offer / Status Alert
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={customPromoTitle}
              onChange={(e) => setCustomPromoTitle(e.target.value)}
              placeholder="Notification Title"
              className="px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
            />
            <input
              type="text"
              value={customPromoMsg}
              onChange={(e) => setCustomPromoMsg(e.target.value)}
              placeholder="Notification Body..."
              className="px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:border-neutral-600 focus:outline-none"
            />
          </div>

          <button
            onClick={() => handleTriggerSimulatedPush(customPromoTitle, customPromoMsg)}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-2 border border-neutral-800 transition-colors"
          >
            <Zap className="w-4 h-4 text-white" />
            <span>Broadcast Push Notification</span>
          </button>
        </div>

        {/* List of Recent Notifications */}
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border flex items-start justify-between gap-4 transition-colors ${
                notif.read
                  ? 'bg-black border-neutral-850 text-neutral-400'
                  : 'bg-black border-neutral-800 text-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 text-neutral-300 flex items-center justify-center shrink-0 mt-0.5 border border-neutral-800">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-xs sm:text-sm text-white">{notif.title}</h5>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 mt-0.5">{notif.message}</p>
                </div>
              </div>

              <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                {notif.time || 'Just now'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
