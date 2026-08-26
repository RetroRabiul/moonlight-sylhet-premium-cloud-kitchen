import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ChefHat,
  PackageCheck,
  Bike,
  Sparkles,
  Share2,
  Receipt,
  RotateCcw,
  Navigation,
  Flame,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LiveTracker: React.FC = () => {
  const { orders, activeOrder, setActiveOrder, updateOrderStatus, language, sendPushNotification } = useApp();

  const [copied, setCopied] = useState(false);

  // If no orders yet
  if (!activeOrder && orders.length === 0) {
    return (
      <div className="py-16 text-center space-y-4 bg-black border border-neutral-800 rounded-2xl p-8 max-w-xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-white">
          <Navigation className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">
          {language === 'bn' ? 'কোন সক্রিয় অর্ডার ট্র্যাকিং নেই' : 'No Active Delivery in Progress'}
        </h3>
        <p className="text-xs text-neutral-400">
          {language === 'bn'
            ? 'মেনু থেকে আপনার প্রিয় খাবার অর্ডার করুন এবং সরাসরি এখানে লাইভ ট্র্যাক করুন।'
            : 'Place an order from our midnight menu to track your delivery live on the Sylhet map!'}
        </p>
      </div>
    );
  }

  const currentOrder = activeOrder || orders[0];

  const statusSteps: { key: OrderStatus; label: string; bengaliLabel: string; icon: any }[] = [
    { key: 'placed', label: 'Order Confirmed', bengaliLabel: 'অর্ডার নিশ্চিত', icon: CheckCircle2 },
    { key: 'kitchen_prep', label: 'Cooking in Kitchen', bengaliLabel: 'রান্না প্রস্তুত হচ্ছে', icon: ChefHat },
    { key: 'quality_check', label: 'Thermal Sealed', bengaliLabel: 'থার্মাল সিল্ড ও প্যাকড', icon: PackageCheck },
    { key: 'out_for_delivery', label: 'Out for Delivery', bengaliLabel: 'রাইডার পথে আছে', icon: Bike },
    { key: 'delivered', label: 'Delivered Hot', bengaliLabel: 'ডেলিভারি সম্পন্ন', icon: Sparkles },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'placed':
      case 'confirmed':
        return 0;
      case 'kitchen_prep':
        return 1;
      case 'quality_check':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(currentOrder.status);

  // Manual simulation stepper for testing the live pipeline
  const advanceSimulatedStatus = () => {
    const sequence: OrderStatus[] = ['confirmed', 'kitchen_prep', 'quality_check', 'out_for_delivery', 'delivered'];
    const nextIdx = Math.min(sequence.length - 1, currentStepIdx + 1);
    const nextStatus = sequence[nextIdx];
    updateOrderStatus(currentOrder.id, nextStatus);

    if (nextStatus === 'delivered') {
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  const shareOrderLink = () => {
    const text = `Tracking my late-night order #${currentOrder.orderNumber} from MoonLight Sylhet! 🌙🔥 Hot food on the way!`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto" id="live-tracker-section">
      {/* Top Banner */}
      <div className="bg-black rounded-2xl p-6 text-white shadow border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-white text-black text-xs font-bold uppercase tracking-wider">
              {language === 'bn' ? 'লাইভ ট্র্যাকিং' : 'LIVE TRACKING'}
            </span>
            <span className="text-xs font-bold text-neutral-300">
              #{currentOrder.orderNumber}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-white">
            {currentOrder.status === 'delivered'
              ? (language === 'bn' ? '🎉 খাবার ডেলিভারি সম্পন্ন!' : '🎉 Food Delivered Hot & Fresh!')
              : currentOrder.status === 'out_for_delivery'
              ? (language === 'bn' ? '🛵 রাইডার আপনার ঠিকানায় আসছে!' : '🛵 Rider is on the way to you!')
              : (language === 'bn' ? '🍳 কিচেনে ফ্রেশ রান্না চলছে...' : '🍳 Freshly Cooking in Kitchen...')}
          </h2>

          <p className="text-xs font-medium text-neutral-400 mt-1">
            {language === 'bn' ? 'আনুমানিক সময়:' : 'Estimated Delivery Time:'}{' '}
            <span className="text-white font-bold">{currentOrder.estimatedDeliveryMinutes} mins</span> •{' '}
            {currentOrder.area}
          </p>
        </div>

        {/* Order Selector (if multiple orders) */}
        {orders.length > 1 && (
          <div className="bg-neutral-900 p-2 rounded-xl border border-neutral-800 text-xs">
            <span className="font-bold text-[10px] text-neutral-400 uppercase block mb-1">Switch Order:</span>
            <select
              value={currentOrder.id}
              onChange={(e) => {
                const found = orders.find((o) => o.id === e.target.value);
                if (found) setActiveOrder(found);
              }}
              className="bg-black text-white px-2 py-1 rounded-lg text-xs font-medium border border-neutral-800"
            >
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.orderNumber} ({o.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Sylhet Map & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Interactive Sylhet GPS Map Visualizer */}
          <div className="relative rounded-2xl bg-black border border-neutral-800 overflow-hidden shadow p-4 sm:p-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-white animate-spin" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {language === 'bn' ? 'সিলেট সিটি লাইভ রুট ম্যাপ' : 'Sylhet City GPS Route Simulator'}
                </h4>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>GPS Live Signal</span>
              </span>
            </div>

            {/* Sylhet Map Graphics Canvas (SVG) */}
            <div className="relative h-64 sm:h-72 w-full mt-3 rounded-xl bg-black border border-neutral-800 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                {/* Surma River */}
                <path
                  d="M0 160 Q 150 140, 250 170 T 500 150"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="24"
                  strokeLinecap="round"
                  opacity="0.6"
                />
                <text x="380" y="165" fill="#64748b" fontSize="10" fontWeight="bold" opacity="0.8">
                  Surma River
                </text>

                {/* Major Road Arteries */}
                <path
                  d="M80 80 L 180 120 L 250 150 L 350 190 L 420 250"
                  fill="none"
                  stroke="#262626"
                  strokeWidth="8"
                  strokeDasharray="4 2"
                />
                <path
                  d="M180 50 L 180 120 L 220 220 L 380 240"
                  fill="none"
                  stroke="#262626"
                  strokeWidth="6"
                />

                {/* Landmarks Markers */}
                {/* 1. MoonLight Cloud Kitchen Hub (Zindabazar) */}
                <g transform="translate(180, 110)">
                  <circle r="14" fill="#ffffff" opacity="0.2" className="animate-ping" />
                  <circle r="8" fill="#ffffff" />
                  <text x="12" y="4" fill="#ffffff" fontSize="11" fontWeight="bold">
                    MoonLight Hub (Zindabazar)
                  </text>
                </g>

                {/* 2. Amberkhana Point */}
                <g transform="translate(160, 45)">
                  <circle r="5" fill="#525252" />
                  <text x="10" y="4" fill="#a3a3a3" fontSize="9">
                    Amberkhana Point
                  </text>
                </g>

                {/* 3. Shahjalal Uposhohor */}
                <g transform="translate(340, 200)">
                  <circle r="5" fill="#525252" />
                  <text x="10" y="4" fill="#a3a3a3" fontSize="9">
                    Shahjalal Uposhohor
                  </text>
                </g>

                {/* 4. Shibgonj Point */}
                <g transform="translate(370, 110)">
                  <circle r="5" fill="#525252" />
                  <text x="10" y="4" fill="#a3a3a3" fontSize="9">
                    Shibgonj
                  </text>
                </g>

                {/* 5. Kean Bridge / Lamabazar */}
                <g transform="translate(240, 165)">
                  <rect x="-8" y="-4" width="16" height="8" fill="#ef4444" rx="2" />
                  <text x="-25" y="16" fill="#f87171" fontSize="8" fontWeight="bold">
                    Kean Bridge
                  </text>
                </g>

                {/* 6. Customer Delivery Point */}
                <g transform="translate(380, 230)">
                  <circle r="12" fill="#10b981" opacity="0.3" className="animate-ping" />
                  <circle r="7" fill="#10b981" />
                  <text x="12" y="4" fill="#34d399" fontSize="10" fontWeight="bold">
                    Your Location ({currentOrder.area})
                  </text>
                </g>

                {/* Animated Rider Scooter Icon */}
                {currentOrder.status === 'out_for_delivery' && (
                  <g transform="translate(280, 180)" className="animate-bounce">
                    <circle r="16" fill="#ffffff" opacity="0.2" />
                    <circle r="10" fill="#ffffff" />
                    <text x="-15" y="-14" fill="#ffffff" fontSize="10" fontWeight="bold">
                      🛵 Rider
                    </text>
                  </g>
                )}
              </svg>

              {/* Map Footer Overlay with current area */}
              <div className="absolute bottom-3 left-3 right-3 bg-black/95 backdrop-blur-md p-2.5 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-neutral-300 font-medium">
                    Destination:{' '}
                    <strong className="text-white">{currentOrder.address}</strong>
                  </span>
                </div>
                <span className="text-neutral-400 font-medium hidden sm:inline">
                  Thermal Insulated Bag
                </span>
              </div>
            </div>

            {/* Advance Simulation Step CTA (For interactive testing & demonstration) */}
            <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] text-neutral-400">
                {language === 'bn' ? 'লাইভ স্ট্যাটাস পরিবর্তন সিমুলেটর:' : 'Live Status Stepper:'}
              </span>
              <button
                onClick={advanceSimulatedStatus}
                id="advance-status-btn"
                className="px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {language === 'bn' ? 'পরবর্তী ধাপে অগ্রগতি' : 'Simulate Next Kitchen/Rider Step'}
                </span>
              </button>
            </div>
          </div>

          {/* 5-Stage Animated Timeline */}
          <div className="rounded-2xl bg-black border border-neutral-800 p-5 sm:p-6 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-white">
              {language === 'bn' ? 'অর্ডার স্ট্যাটাস টাইমলাইন' : 'Live Order Milestone Timeline'}
            </h4>

            <div className="space-y-4">
              {statusSteps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStepIdx;
                const isCurrent = idx === currentStepIdx;

                return (
                  <div key={step.key} className="flex items-start gap-3.5 relative">
                    {/* Connecting Line */}
                    {idx < statusSteps.length - 1 && (
                      <div
                        className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-[1px] transition-colors ${
                          idx < currentStepIdx ? 'bg-white' : 'bg-neutral-800'
                        }`}
                      />
                    )}

                    {/* Step Icon Bubble */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                        isPassed
                          ? 'bg-white text-black font-bold shadow'
                          : 'bg-black text-neutral-600 border border-neutral-800'
                      } ${isCurrent ? 'ring-4 ring-neutral-700 scale-110' : ''}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Step Text Info */}
                    <div className="flex-1 pb-3">
                      <div className="flex items-center justify-between">
                        <h5
                          className={`text-xs sm:text-sm font-bold ${
                            isPassed ? 'text-white' : 'text-neutral-500'
                          }`}
                        >
                          {language === 'bn' ? step.bengaliLabel : step.label}
                        </h5>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {isPassed ? (isCurrent ? 'In Progress' : 'Completed') : 'Upcoming'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {step.key === 'placed'
                          ? `Payment verified via ${currentOrder.paymentMethod.toUpperCase()}`
                          : step.key === 'kitchen_prep'
                          ? 'Fresh meat grilling & stone-oven baking'
                          : step.key === 'quality_check'
                          ? 'Thermal foil sealed & packed with dips'
                          : step.key === 'out_for_delivery'
                          ? `Rider ${currentOrder.rider?.name || 'Rashedul'} is navigating`
                          : 'Delivered at your doorstep. Enjoy the Midnight Fuel!'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: Rider Profile & Order Receipt Card */}
        <div className="space-y-6">
          {/* Rider Profile Card */}
          {currentOrder.rider && (
            <div className="p-5 rounded-2xl bg-black border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  {language === 'bn' ? 'আপনার ডেলিভারি রাইডার' : 'Assigned Rider'}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 font-medium border border-emerald-800">
                  Active On-Duty
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white font-bold text-lg">
                  {currentOrder.rider.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{currentOrder.rider.name}</h4>
                  <p className="text-[11px] text-neutral-400">{currentOrder.rider.vehicle}</p>
                  <div className="flex items-center gap-1 text-white text-xs font-bold mt-0.5">
                    <span>★ {currentOrder.rider.rating}</span>
                    <span className="text-neutral-500">• 1,420+ Deliveries</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${currentOrder.rider.phone}`}
                id="call-rider-btn"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>Call Rider ({currentOrder.rider.phone})</span>
              </a>
            </div>
          )}

          {/* Order Details & Receipt */}
          <div className="p-5 rounded-2xl bg-black border border-neutral-800 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-white" />
                <span>{language === 'bn' ? 'অর্ডার রসিদ' : 'Order Receipt'}</span>
              </span>
              <span className="font-mono text-neutral-400">#{currentOrder.orderNumber}</span>
            </div>

            {/* Items List */}
            <div className="divide-y divide-neutral-850 space-y-1">
              {currentOrder.items.map((item) => (
                <div key={item.id} className="pt-2 flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-white">
                      {item.quantity}x {language === 'bn' ? item.bengaliName : item.name}
                    </span>
                    {item.selectedSize && (
                      <span className="text-[10px] text-neutral-400 block">({item.selectedSize} Size)</span>
                    )}
                    {item.selectedOptions.map((o) => (
                      <span key={o.id} className="text-[10px] text-neutral-500 block">
                        + {o.name}
                      </span>
                    ))}
                  </div>
                  <span className="font-bold text-white">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div className="pt-3 border-t border-neutral-800 space-y-1 text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{currentOrder.subtotal}</span>
              </div>
              {currentOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Discount</span>
                  <span>-৳{currentOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>৳{currentOrder.deliveryFee}</span>
              </div>
              {currentOrder.tip > 0 && (
                <div className="flex justify-between">
                  <span>Rider Tip</span>
                  <span>৳{currentOrder.tip}</span>
                </div>
              )}
              <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-white text-sm">
                <span>Total Paid</span>
                <span className="text-white">৳{currentOrder.total}</span>
              </div>
            </div>

            {/* Share Order Action */}
            <button
              onClick={shareOrderLink}
              id="share-order-btn"
              className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-white" />}
              <span>{copied ? (language === 'bn' ? 'লিংক কপি হয়েছে!' : 'Link Copied!') : (language === 'bn' ? 'বন্ধুদের সাথে শেয়ার করুন' : 'Share Order Status')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
