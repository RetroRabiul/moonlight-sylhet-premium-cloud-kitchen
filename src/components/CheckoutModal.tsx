import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SYLHET_AREAS } from '../data/initialData';
import {
  X,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  MapPin
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartDiscount,
    cartSubtotal,
    appliedPromo,
    placeOrder,
    language,
  } = useApp();

  if (!isCheckoutOpen) return null;

  // Form States
  const [customerName, setCustomerName] = useState('Shahriar Ahmed');
  const [phone, setPhone] = useState('+880 1712 345678');
  const [selectedArea, setSelectedArea] = useState('zindabazar');
  const [address, setAddress] = useState('Flat 4A, Green Garden Apartment, Zindabazar Point');
  const [notes, setNotes] = useState('Late night delivery: Please call once you reach the main gate.');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket' | 'card' | 'cod'>('bkash');
  const [tip, setTip] = useState(20);

  // Digital Wallet Simulation states
  const [walletPhone, setWalletPhone] = useState('01712345678');
  const [walletPin, setWalletPin] = useState('•••••');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentAreaObj = SYLHET_AREAS.find((a) => a.id === selectedArea) || SYLHET_AREAS[0];
  const deliveryFee = currentAreaObj.deliveryFee;
  const grandTotal = cartTotal + deliveryFee + tip;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setErrorMsg(language === 'bn' ? 'দয়া করে সকল তথ্য পূরণ করুন।' : 'Please fill in all delivery details.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      placeOrder({
        customerName,
        phone,
        address,
        area: currentAreaObj.name,
        notes,
        paymentMethod,
        transactionId: paymentMethod !== 'cod' ? `TXN${Math.random().toString(36).substring(2, 9).toUpperCase()}` : undefined,
        tip,
      });
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-black border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col text-neutral-100"
        id="checkout-modal-container"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 bg-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="font-bold text-base text-white">
                {language === 'bn' ? 'নিরাপদ চেকআউট ও পেমেন্ট' : 'Secure Checkout & Delivery'}
              </h3>
              <p className="text-[11px] text-neutral-400 font-medium tracking-wider">
                MOONLIGHT PREMIUM CLOUD KITCHEN
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            id="close-checkout-modal-btn"
            className="p-1.5 rounded-lg bg-black border border-neutral-800 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5 text-neutral-300" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Step 1: Delivery Address & Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-neutral-800">
              <MapPin className="w-4 h-4 text-neutral-300" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-300">
                {language === 'bn' ? '১. ডেলিভারি ঠিকানা ও যোগাযোগ' : '1. Delivery & Contact Details'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400 font-medium">
                  {language === 'bn' ? 'আপনার নাম' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Shahriar Ahmed"
                  id="checkout-name-input"
                  className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400 font-medium">
                  {language === 'bn' ? 'মোবাইল নম্বর (হটলাইন কল)' : 'Mobile Phone (Hotline)'} *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1712 345678"
                  id="checkout-phone-input"
                  className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400 font-medium">
                {language === 'bn' ? 'সিলেট ডেলিভারি এরিয়া' : 'Sylhet Delivery Area'} *
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                id="checkout-area-select"
                className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs font-semibold text-white focus:outline-none focus:border-neutral-600"
              >
                {SYLHET_AREAS.map((a) => (
                  <option key={a.id} value={a.id}>
                    {language === 'bn' ? a.bengaliName : a.name} (৳{a.deliveryFee} Fee • ~{a.etaMin}m Delivery)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400 font-medium">
                {language === 'bn' ? 'সম্পূর্ণ ঠিকানা / বাড়ি / ফ্ল্যাট / রোড' : 'Exact Street Address / Flat / Floor'} *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House #, Road #, Landmark..."
                id="checkout-address-input"
                className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400 font-medium">
                {language === 'bn' ? 'লেট-নাইট ডেলিভারি নোট' : 'Late-Night Delivery Instructions'}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Call upon reaching gate, leave at doorstep..."
                id="checkout-notes-input"
                className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Step 2: Payment Method Choice */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-neutral-800">
              <Smartphone className="w-4 h-4 text-neutral-300" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-neutral-300">
                {language === 'bn' ? '২. পেমেন্ট গেটওয়ে নির্বাচন করুন' : '2. Select Payment Method'}
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {/* bKash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                id="pay-method-bkash"
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'bkash'
                    ? 'bg-[#e2136e]/20 border-[#e2136e] text-white font-bold ring-2 ring-[#e2136e]/40'
                    : 'bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-[#e2136e] text-white flex items-center justify-center text-[10px] font-bold">
                  bK
                </div>
                <span className="text-xs font-bold">bKash</span>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                id="pay-method-nagad"
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'nagad'
                    ? 'bg-[#f7941d]/20 border-[#f7941d] text-white font-bold ring-2 ring-[#f7941d]/40'
                    : 'bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-[#f7941d] text-white flex items-center justify-center text-[10px] font-bold">
                  NG
                </div>
                <span className="text-xs font-bold">Nagad</span>
              </button>

              {/* Rocket */}
              <button
                type="button"
                onClick={() => setPaymentMethod('rocket')}
                id="pay-method-rocket"
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'rocket'
                    ? 'bg-purple-600/20 border-purple-500 text-white font-bold ring-2 ring-purple-500/40'
                    : 'bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center text-[10px] font-bold">
                  RK
                </div>
                <span className="text-xs font-bold">Rocket</span>
              </button>

              {/* Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                id="pay-method-card"
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'card'
                    ? 'bg-blue-600/20 border-blue-500 text-white font-bold ring-2 ring-blue-500/40'
                    : 'bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <CreditCard className="w-5 h-5 text-blue-400" />
                <span className="text-xs font-bold">Cards</span>
              </button>

              {/* COD */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                id="pay-method-cod"
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                  paymentMethod === 'cod'
                    ? 'bg-emerald-600/20 border-emerald-500 text-white font-bold ring-2 ring-emerald-500/40'
                    : 'bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold">Cash (COD)</span>
              </button>
            </div>

            {/* Interactive bKash / Nagad Wallet Simulation Panel */}
            {(paymentMethod === 'bkash' || paymentMethod === 'nagad' || paymentMethod === 'rocket') && (
              <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        paymentMethod === 'bkash'
                          ? 'bg-[#e2136e]'
                          : paymentMethod === 'nagad'
                          ? 'bg-[#f7941d]'
                          : 'bg-purple-600'
                      }`}
                    />
                    <span className="text-xs font-bold text-white capitalize">
                      {paymentMethod} Direct Checkout Gateway
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400">
                    Merchant: <strong className="text-white font-mono">01912345678</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                      {paymentMethod.toUpperCase()} Account Number
                    </label>
                    <input
                      type="text"
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      id="wallet-account-input"
                      className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono focus:border-neutral-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-neutral-400 block mb-1">
                      Simulated 6-Digit OTP / PIN
                    </label>
                    <input
                      type="password"
                      value={walletPin}
                      onChange={(e) => setWalletPin(e.target.value)}
                      placeholder="Enter PIN"
                      id="wallet-pin-input"
                      className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs font-mono focus:border-neutral-600"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified 256-bit SSL encrypted digital wallet token.</span>
                </p>
              </div>
            )}

            {/* Card form */}
            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Card Number (4111 2222 3333 4444)"
                  className="w-full px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white font-mono text-xs focus:border-neutral-600"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs focus:border-neutral-600"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    className="px-3 py-1.5 rounded-lg bg-black border border-neutral-800 text-white text-xs focus:border-neutral-600"
                  />
                </div>
              </div>
            )}

            {/* COD notice */}
            {paymentMethod === 'cod' && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <Banknote className="w-4 h-4 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'ডেলিভারির সময় রাইডারের কাছে নগদ ৳' + grandTotal + ' টাকা পরিশোধ করুন।'
                    : 'Please keep exact cash ৳' + grandTotal + ' ready for the rider upon arrival.'}
                </span>
              </div>
            )}
          </div>

          {/* Order Summary Box */}
          <div className="p-4 rounded-2xl bg-black border border-neutral-800 space-y-2 text-xs">
            <h5 className="font-bold text-neutral-300 uppercase tracking-wider text-[11px]">
              {language === 'bn' ? 'অর্ডার সারসংক্ষেপ' : 'Order Summary'}
            </h5>
            <div className="space-y-1 text-neutral-400">
              <div className="flex justify-between">
                <span>Items ({cart.length})</span>
                <span className="text-neutral-200">৳{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Promo Discount ({appliedPromo?.code})</span>
                  <span>-৳{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge ({currentAreaObj.name})</span>
                <span className="text-neutral-200">৳{deliveryFee}</span>
              </div>
              {tip > 0 && (
                <div className="flex justify-between">
                  <span>Rider Tip</span>
                  <span className="text-neutral-200">৳{tip}</span>
                </div>
              )}
              <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                <span>Total Payable</span>
                <span className="text-white text-lg">৳{grandTotal}</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isProcessing}
            id="confirm-place-order-btn"
            className="w-full py-3.5 px-5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm flex items-center justify-center gap-2 shadow active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {isProcessing ? (
              <span>{language === 'bn' ? 'অর্ডার প্রসেস হচ্ছে...' : 'Processing Order...'}</span>
            ) : (
              <>
                <span>
                  {language === 'bn'
                    ? `অর্ডার নিশ্চিত করুন • ৳${grandTotal}`
                    : `Confirm & Place Order • ৳${grandTotal}`}
                </span>
                <ArrowRight className="w-4 h-4 text-black" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
