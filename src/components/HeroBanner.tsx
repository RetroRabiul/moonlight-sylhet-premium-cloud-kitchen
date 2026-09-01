import React from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Clock, ShieldCheck, Phone, ArrowRight, Zap, Facebook } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { language, setActiveTab, promos, applyPromo, setIsCartOpen } = useApp();

  const flashPromo = promos.find((p) => p.isFlashDeal) || promos[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-black border border-neutral-800 shadow-xl my-4">
      <div className="relative max-w-7xl mx-auto px-5 py-8 sm:py-12 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="w-full lg:max-w-xl space-y-4 text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-semibold tracking-wide">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {language === 'bn'
                  ? 'সিলেটের ১ নম্বর লেট-নাইট ক্লাউড কিচেন'
                  : "Sylhet's #1 Late-Night Cloud Kitchen"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {language === 'bn' ? (
              <>
                মধ্যরাতের ক্ষুধা মেটাতে <br />
                <span className="text-amber-400 font-extrabold">MOONLIGHT</span> সবসময় প্রস্তুত!
              </>
            ) : (
              <>
                Where the Moon Lights Up Every Bite, with{' '}
                <span className="text-amber-400 font-extrabold">MOONLIGHT</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            {language === 'bn'
              ? 'খাঁটি নাগা মরিচযুক্ত ফায়ার উইংস, ক্রিস্পি বার্গার, চিজি স্টোন-বেকড পিৎজা ও সুস্বাদু রাইস বাউল। রাত ৮টা থেকে ভোর ৪টা পর্যন্ত পুরো সিলেটে দ্রুততম ডেলিভারি।'
              : 'Authentic Sylheti Naga Fire Wings, gourmet juicy Burgers, stone-baked artisan Pizzas, and savory Rice Bowls delivered sizzling hot till 4:00 AM across Sylhet.'}
          </p>

          {/* Key Value Badges */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="flex flex-col items-center lg:items-start p-2.5 rounded-xl bg-black border border-neutral-800">
              <div className="flex items-center gap-1 text-white font-bold text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>8 PM - 4 AM</span>
              </div>
              <span className="text-[10px] text-neutral-400 mt-0.5">
                {language === 'bn' ? 'প্রতিদিন রাতভর' : 'All Night Long'}
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-start p-2.5 rounded-xl bg-black border border-neutral-800">
              <div className="flex items-center gap-1 text-white font-bold text-xs sm:text-sm">
                <Zap className="w-4 h-4 text-neutral-400" />
                <span>20-30 Mins</span>
              </div>
              <span className="text-[10px] text-neutral-400 mt-0.5">
                {language === 'bn' ? 'সিলড হট প্যাক' : 'Thermal Insulated'}
              </span>
            </div>

            <div className="flex flex-col items-center lg:items-start p-2.5 rounded-xl bg-black border border-neutral-800">
              <div className="flex items-center gap-1 text-white font-bold text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 text-neutral-400" />
                <span>bKash / Nagad</span>
              </div>
              <span className="text-[10px] text-neutral-400 mt-0.5">
                {language === 'bn' ? 'ডিজিটাল ওয়ালেট' : 'Instant Pay / COD'}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
            <a
              href="#menu-section"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm transition-transform active:scale-95 shadow"
              id="hero-explore-menu-btn"
            >
              <span>{language === 'bn' ? 'মেনু দেখুন ও অর্ডার করুন' : 'Order Food Now'}</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>

            <a
              href="tel:+8801912345678"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-800 text-white font-semibold text-sm transition-colors"
              id="hero-call-btn"
            >
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>+880 1324993344</span>
            </a>

            <a
              href="https://www.facebook.com/Nightfuel.sylhet/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-800 text-neutral-300 font-medium text-xs transition-colors"
              id="hero-facebook-btn"
            >
              <Facebook className="w-4 h-4 text-neutral-400" />
              <span>Facebook Page</span>
            </a>
          </div>
        </div>

        {/* Right Flash Deal Card */}
        {flashPromo && (
          <div className="w-full lg:max-w-md bg-black border border-neutral-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="px-2.5 py-1 rounded-md bg-neutral-900 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-neutral-700">
                <Flame className="w-3 h-3 text-amber-400" />
                {flashPromo.tag}
              </span>
              <span className="text-xs text-neutral-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {flashPromo.activeHours}
              </span>
            </div>

            <div className="py-4 space-y-2">
              <h3 className="text-xl font-bold text-white leading-tight">
                {language === 'bn' ? flashPromo.bengaliTitle : flashPromo.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {language === 'bn' ? flashPromo.bengaliDescription : flashPromo.description}
              </p>
            </div>

            <div className="bg-neutral-950 p-3 rounded-xl border border-dashed border-neutral-700 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                  {language === 'bn' ? 'কুপন কোড' : 'PROMO CODE'}
                </span>
                <span className="text-base font-mono font-bold text-white tracking-wider">
                  {flashPromo.code}
                </span>
              </div>

              <button
                onClick={() => {
                  applyPromo(flashPromo.code);
                  setIsCartOpen(true);
                }}
                id="apply-flash-promo-btn"
                className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-transform active:scale-95 shadow"
              >
                {language === 'bn' ? 'কুপন প্রয়োগ করুন' : 'Apply Promo'}
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400">
              <span>{language === 'bn' ? 'মিনিমাম অর্ডার:' : 'Min Spend:'} ৳{flashPromo.minSpend}</span>
              <button
                onClick={() => setActiveTab('promos')}
                className="text-neutral-300 hover:text-white font-semibold flex items-center gap-1"
              >
                <span>{language === 'bn' ? 'সব অফার দেখুন' : 'View all deals'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
