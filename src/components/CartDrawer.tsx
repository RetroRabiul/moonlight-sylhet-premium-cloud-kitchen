import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SYLHET_AREAS } from '../data/initialData';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    cartItemCount,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    appliedPromo,
    applyPromo,
    removePromo,
    promos,
    language,
    setIsCheckoutOpen,
  } = useApp();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState('zindabazar');
  const [selectedTip, setSelectedTip] = useState(20);

  if (!isCartOpen) return null;

  const currentArea = SYLHET_AREAS.find((a) => a.id === selectedAreaId) || SYLHET_AREAS[0];
  const deliveryFee = currentArea.deliveryFee;
  const grandTotal = cartTotal + deliveryFee + selectedTip;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const res = applyPromo(promoCodeInput);
    setPromoMessage({ text: res.message, isError: !res.success });
    if (res.success) {
      setPromoCodeInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-black border-l border-neutral-800 text-neutral-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
          id="cart-drawer-container"
        >
          {/* Cart Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-black">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-bold text-base text-white">
                  {language === 'bn' ? 'আপনার খাবার ব্যাগ' : 'Your MoonLight Bag'}
                </h3>
                <span className="text-xs text-neutral-400 font-medium">
                  {cartItemCount} {language === 'bn' ? 'টি আইটেম' : 'items'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-red-400 font-medium px-2 py-1 rounded-lg hover:bg-neutral-900"
                  title="Clear Cart"
                >
                  {language === 'bn' ? 'সব মুছুন' : 'Clear'}
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                id="close-cart-btn"
                className="p-1.5 rounded-lg bg-black border border-neutral-800 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  {language === 'bn' ? 'ব্যাগটি খালি আছে' : 'Your bag is empty'}
                </h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto">
                  {language === 'bn'
                    ? 'মেনু থেকে আপনার প্রিয় হট বার্গার, পিৎজা বা ফায়ার উইংস যুক্ত করুন।'
                    : 'Add piping hot food from our interactive menu to fuel your night!'}
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs shadow"
                >
                  {language === 'bn' ? 'মেনু ব্রাউজ করুন' : 'Browse Signature Menu'}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => {
                  const optionsPrice = item.selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
                  const itemUnitPrice = item.price + optionsPrice;
                  const itemTotalPrice = itemUnitPrice * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-black border border-neutral-800 flex items-start gap-3 relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border border-neutral-800 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                            {language === 'bn' ? item.bengaliName : item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-500 hover:text-red-400 p-0.5"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Selected Size / Add-ons */}
                        <div className="text-[11px] text-neutral-400 space-y-0.5 mt-0.5">
                          {item.selectedSize && (
                            <span className="inline-block px-1.5 py-0.2 rounded bg-neutral-800 text-white font-bold mr-1">
                              {item.selectedSize} Size
                            </span>
                          )}
                          {item.selectedOptions.map((opt) => (
                            <span key={opt.id} className="block text-[10px] text-neutral-300">
                              + {language === 'bn' ? opt.bengaliName : opt.name} (৳{opt.price})
                            </span>
                          ))}
                          {item.specialInstructions && (
                            <span className="block text-[10px] italic text-neutral-400">
                              Note: {item.specialInstructions}
                            </span>
                          )}
                        </div>

                        {/* Price & Quantity Controls */}
                        <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-neutral-800">
                          <span className="text-xs font-bold text-white">
                            ৳{itemTotalPrice}
                          </span>

                          <div className="flex items-center gap-1.5 bg-black border border-neutral-800 px-1 py-0.5 rounded-lg">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-neutral-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-neutral-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Sylhet Area Selection & ETA */}
            {cart.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{language === 'bn' ? 'সিলেট ডেলিভারি এলাকা' : 'Sylhet Delivery Area'}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-neutral-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{currentArea.etaMin} mins ETA</span>
                  </span>
                </div>

                <select
                  value={selectedAreaId}
                  onChange={(e) => setSelectedAreaId(e.target.value)}
                  id="cart-area-select"
                  className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs font-medium text-white focus:outline-none focus:border-neutral-600"
                >
                  {SYLHET_AREAS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {language === 'bn' ? a.bengaliName : a.name} (৳{a.deliveryFee} Fee • ~{a.etaMin}m)
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Promo Voucher Input */}
            {cart.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{language === 'bn' ? 'ডিসকাউন্ট ভাউচার' : 'Have a Promo Code?'}</span>
                </span>

                {appliedPromo ? (
                  <div className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{appliedPromo.code}</span>
                      <span className="text-[10px] text-neutral-300">
                        {language === 'bn' ? appliedPromo.bengaliTitle : appliedPromo.title}
                      </span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-xs text-red-400 hover:underline font-bold"
                    >
                      {language === 'bn' ? 'বাতিল' : 'Remove'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      placeholder="e.g. MIDNIGHT20"
                      id="cart-promo-input"
                      className="flex-1 px-3 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white uppercase font-mono placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                    />
                    <button
                      type="submit"
                      id="apply-promo-btn"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs shadow"
                    >
                      {language === 'bn' ? 'প্রয়োগ' : 'Apply'}
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <p
                    className={`text-[11px] font-medium ${
                      promoMessage.isError ? 'text-red-400' : 'text-neutral-300'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>
            )}

            {/* Late Night Rider Tip */}
            {cart.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-black border border-neutral-800 space-y-2">
                <span className="text-xs font-bold text-neutral-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{language === 'bn' ? 'লেট-নাইট রাইডার বকশিশ' : 'Late-Night Rider Tip'}</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">100% goes to rider</span>
                </span>

                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 20, 50, 100].map((tip) => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => setSelectedTip(tip)}
                      id={`tip-opt-${tip}`}
                      className={`py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                        selectedTip === tip
                          ? 'bg-neutral-800 border-white text-white'
                          : 'bg-black border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tip === 0 ? 'None' : `৳${tip}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer Calculation */}
          {cart.length > 0 && (
            <div className="p-5 bg-black border-t border-neutral-800 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>{language === 'bn' ? 'সাবটোটাল' : 'Subtotal'}</span>
                  <span className="font-semibold text-neutral-200">৳{cartSubtotal}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-neutral-200 font-bold">
                    <span>{language === 'bn' ? 'কুপন ছাড়' : 'Promo Discount'}</span>
                    <span>-৳{cartDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    {language === 'bn' ? 'ডেলিভারি চার্জ' : 'Delivery Fee'} ({currentArea.name})
                  </span>
                  <span className="font-semibold text-neutral-200">৳{deliveryFee}</span>
                </div>

                {selectedTip > 0 && (
                  <div className="flex justify-between">
                    <span>{language === 'bn' ? 'রাইডার বকশিশ' : 'Rider Tip'}</span>
                    <span className="font-semibold text-neutral-200">৳{selectedTip}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-neutral-800 flex justify-between items-baseline text-sm font-bold text-white">
                  <span>{language === 'bn' ? 'সর্বমোট' : 'Grand Total'}</span>
                  <span className="text-xl text-white">৳{grandTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                id="cart-checkout-proceed-btn"
                className="w-full py-3.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm flex items-center justify-between shadow active:scale-[0.98] transition-transform"
              >
                <span>{language === 'bn' ? 'চেকআউট করুন' : 'Proceed to Checkout'}</span>
                <div className="flex items-center gap-1">
                  <span>৳{grandTotal}</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
