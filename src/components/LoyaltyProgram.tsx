import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Sparkles,
  Gift,
  Ticket,
  CheckCircle2,
  Crown,
  Zap,
  QrCode,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const LoyaltyProgram: React.FC = () => {
  const { loyalty, claimLoyaltyVoucher, language, applyPromo, setIsCartOpen } = useApp();

  return (
    <div className="py-6 space-y-8 max-w-5xl mx-auto" id="loyalty-rewards-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-white" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'bn' ? 'মুনলাইট রিওয়ার্ডস ক্লাব' : 'MoonLight Loyalty Pass'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {language === 'bn'
              ? 'প্রতিটি অর্ডারে পয়েন্ট অর্জন করুন এবং ফ্রি উইংস, ফ্রেঞ্চ ফ্রাইজ ও ডিসকাউন্ট ভাউচার রিডিম করুন।'
              : 'Earn Fuel Points with every late-night order and unlock free wings, sides & exclusive VIP discounts!'}
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-xs text-neutral-300 font-bold">
            {language === 'bn' ? '১০ টাকা = ১ ফুয়েল পয়েন্ট' : '10 TK Spent = 1 Fuel Point'}
          </span>
        </div>
      </div>

      {/* Digital Loyalty Card & Tier Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* VIP Membership Pass Card */}
        <div
          className="md:col-span-2 rounded-2xl p-6 sm:p-8 bg-black border border-neutral-800 text-white shadow relative overflow-hidden flex flex-col justify-between min-h-[220px]"
        >
          {/* Card Top */}
          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-1">
              <div className="bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 inline-block">
                <span className="font-bold text-sm text-white tracking-wider">MOONLIGHT</span>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium">Sylhet Late-Night Gastronomy Pass</p>
            </div>

            <span className="px-3 py-1 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow">
              <Crown className="w-3.5 h-3.5 text-black" />
              <span>{loyalty.tier}</span>
            </span>
          </div>

          {/* Card Bottom */}
          <div className="mt-8 pt-4 border-t border-neutral-800 flex items-end justify-between relative z-10">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-500 tracking-wider block">
                Member Name & Balance
              </span>
              <h4 className="text-lg font-bold text-white">{loyalty.customerName}</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-white tracking-tight">{loyalty.points}</span>
                <span className="text-xs uppercase font-bold text-neutral-400">Fuel Points</span>
              </div>
            </div>

            <div className="text-right">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 p-1.5 border border-neutral-800 flex items-center justify-center">
                <QrCode className="w-9 h-9 text-white" />
              </div>
              <span className="text-[9px] text-neutral-500 block mt-1">Pass #{loyalty.phone.slice(-4)}</span>
            </div>
          </div>
        </div>

        {/* Tier Progress & Stats Widget */}
        <div className="rounded-2xl bg-black border border-neutral-800 p-6 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-white" />
              <span>Tier Upgrade Progress</span>
            </h4>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-300">{loyalty.tier}</span>
                <span className="text-white font-bold">{loyalty.pointsToNextTier} pts to next tier</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-800">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (loyalty.points / (loyalty.points + loyalty.pointsToNextTier)) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block">Lifetime Orders</span>
              <span className="text-base font-black text-white">{loyalty.lifetimeOrders}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
              <span className="text-[10px] text-neutral-400 block">Total Spent</span>
              <span className="text-base font-black text-white">৳{loyalty.totalSpent}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Claimable Rewards & Vouchers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-white" />
            <span>{language === 'bn' ? 'পয়েন্ট দিয়ে কুপন রিডিম করুন' : 'Redeem Fuel Rewards Vouchers'}</span>
          </h3>
          <span className="text-xs text-neutral-400">
            Available Balance: <strong className="text-white font-bold">{loyalty.points} pts</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {loyalty.vouchers.map((vch) => {
            const canAfford = loyalty.points >= vch.pointsCost;
            return (
              <div
                key={vch.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                  vch.claimed
                    ? 'bg-neutral-950 border-neutral-800 text-neutral-300'
                    : canAfford
                    ? 'bg-black border-neutral-700 shadow hover:border-neutral-500'
                    : 'bg-neutral-950 border-neutral-900 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-neutral-300 text-[10px] font-bold uppercase border border-neutral-800">
                      {vch.pointsCost} Points
                    </span>
                    {vch.claimed ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Claimed</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-neutral-400">Min spend: ৳{vch.minSpend}</span>
                    )}
                  </div>

                  <h4 className="text-base font-bold text-white mt-3">
                    {language === 'bn' ? vch.bengaliTitle : vch.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-medium mt-0.5">{vch.discountValue}</p>
                </div>

                <div>
                  {vch.claimed ? (
                    <div className="space-y-2">
                      <div className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-center font-mono font-bold text-xs text-white">
                        {vch.code}
                      </div>
                      <button
                        onClick={() => {
                          applyPromo(vch.code);
                          setIsCartOpen(true);
                        }}
                        className="w-full py-2 rounded-lg bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
                      >
                        {language === 'bn' ? 'কার্টে কোড লাগান' : 'Apply Code to Bag'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => claimLoyaltyVoucher(vch.id)}
                      disabled={!canAfford}
                      id={`claim-voucher-${vch.id}`}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition-transform active:scale-95 flex items-center justify-center gap-1.5 ${
                        canAfford
                          ? 'bg-white hover:bg-neutral-200 text-black shadow'
                          : 'bg-neutral-900 text-neutral-600 cursor-not-allowed border border-neutral-800'
                      }`}
                    >
                      <span>{canAfford ? (language === 'bn' ? 'পয়েন্ট দিয়ে কুপন নিন' : 'Redeem with Points') : 'Need More Points'}</span>
                      {canAfford && <ArrowRight className="w-3.5 h-3.5 text-black" />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
