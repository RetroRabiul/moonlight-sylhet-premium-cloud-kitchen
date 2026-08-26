import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Phone,
  MapPin,
  Clock,
  Facebook,
  ShieldCheck,
  Heart,
  ExternalLink
} from 'lucide-react';
import { SYLHET_AREAS } from '../data/initialData';

export const Footer: React.FC = () => {
  const { language, setActiveTab } = useApp();

  return (
    <footer className="mt-16 border-t border-neutral-800 bg-black text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white tracking-wider">MOONLIGHT</span>
                <span className="text-[9px] uppercase font-bold text-slate-200 tracking-[0.25em] -mt-0.5">Premium Cloud Kitchen</span>
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed">
              {language === 'bn'
                ? 'সিলেটের প্রিমিয়াম লেট-নাইট ক্লাউড কিচেন। রাত ৮টা থেকে ভোর ৪টা পর্যন্ত খাঁটি নাগা স্পাইস ফ্লেভার ও মজাদার খাবার সরবরাহ করা হয়।'
                : "Sylhet's premier midnight cloud kitchen serving authentic Naga fire wings, gourmet burgers, artisan stone pizzas and rice bowls till 4:00 AM."}
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/Nightfuel.sylhet/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-800 text-neutral-300 flex items-center justify-center transition-colors shadow-sm"
                title="Facebook Page"
              >
                <Facebook className="w-4 h-4 text-white" />
              </a>

              <a
                href="tel:+8801324993344"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-white font-bold text-xs hover:border-neutral-700 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-neutral-300" />
                <span>+880 1324993344</span>
              </a>
            </div>
          </div>

          {/* Col 2: Operational Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              {language === 'bn' ? 'অপারেশনাল সময় ও লোকেশন' : 'Hours & Kitchen Hub'}
            </h4>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-bold block">
                    8:00 PM – 4:00 AM (Midnight)
                  </span>
                  <span className="text-[11px] text-neutral-400">Every Night • 7 Days a Week</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <div>
                  <span className="text-neutral-200 font-bold block">
                    Zindabazar Central Hub
                  </span>
                  <span className="text-[11px] text-neutral-500">Sylhet 3100, Bangladesh</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-neutral-300 shrink-0 mt-0.5" />
                <span className="text-neutral-300">
                  100% Halal & Hygienic Thermal Insulated Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Sylhet Delivery Coverage Areas */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              {language === 'bn' ? 'ডেলিভারি কভারেজ এরিয়া' : 'Sylhet Delivery Zones'}
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {SYLHET_AREAS.map((a) => (
                <span
                  key={a.id}
                  className="px-2.5 py-1 rounded-lg bg-black border border-neutral-800 text-[10px] text-neutral-300 hover:border-neutral-700 transition-colors"
                >
                  {a.name}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Quick Navigation & Digital Wallets */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">
              {language === 'bn' ? 'পেমেন্ট পার্টনার' : 'Payment Methods'}
            </h4>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-black border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e2136e]" />
                <span>bKash Wallet</span>
              </div>
              <div className="p-2 rounded-xl bg-black border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#f7941d]" />
                <span>Nagad Wallet</span>
              </div>
              <div className="p-2 rounded-xl bg-black border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Rocket</span>
              </div>
              <div className="p-2 rounded-xl bg-black border border-neutral-800 text-neutral-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Cash on Delivery</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveTab('staff')}
                className="text-[11px] text-neutral-400 hover:text-white underline font-medium"
              >
                Restaurant Staff & KDS Login
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} MoonLight Sylhet. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/Nightfuel.sylhet/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1 text-neutral-400"
            >
              <span>facebook.com/Nightfuel.sylhet</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
            <span>•</span>
            <span className="text-neutral-400">Hotline: +880 1324993344</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
