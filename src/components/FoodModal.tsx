import React, { useState } from 'react';
import { MenuItem, MenuItemOption, PizzaSizeOption } from '../types';
import { useApp } from '../context/AppContext';
import { X, Flame, Clock, Plus, Minus, Check, Sparkles, ShieldAlert } from 'lucide-react';

interface FoodModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const FoodModal: React.FC<FoodModalProps> = ({ item, onClose }) => {
  const { language, addToCart, setIsCartOpen } = useApp();

  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState<'8"' | '10"' | '12"' | undefined>(
    item.sizeOptions && item.sizeOptions.length > 0 ? item.sizeOptions[0].size : undefined
  );
  const [selectedOptions, setSelectedOptions] = useState<MenuItemOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Calculate dynamic price
  let basePrice = item.price;
  if (selectedSize && item.sizeOptions) {
    const matched = item.sizeOptions.find((s) => s.size === selectedSize);
    if (matched) basePrice = matched.price;
  }

  const optionsTotal = selectedOptions.reduce((sum, opt) => sum + opt.price, 0);
  const singleItemPrice = basePrice + optionsTotal;
  const totalPrice = singleItemPrice * quantity;

  const toggleOption = (opt: MenuItemOption) => {
    if (selectedOptions.some((o) => o.id === opt.id)) {
      setSelectedOptions(selectedOptions.filter((o) => o.id !== opt.id));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  const handleAddToCart = () => {
    addToCart(item, selectedSize, selectedOptions, quantity, specialInstructions);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-black border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        id="food-detail-modal"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          id="close-food-modal-btn"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/80 hover:bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
        >
          <X className="w-5 h-5 text-neutral-300" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-950">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Badges on image */}
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
            {item.spicyLevel > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold flex items-center gap-1 shadow">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>
                  {item.spicyLevel === 3
                    ? 'Naga Fire Blast 🔥🔥🔥'
                    : item.spicyLevel === 2
                    ? 'Extra Spicy 🔥🔥'
                    : 'Spicy 🔥'}
                </span>
              </span>
            )}

            {item.isPopular && (
              <span className="px-2.5 py-1 rounded-full bg-white text-black text-xs font-bold flex items-center gap-1 shadow">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span>{language === 'bn' ? 'টপ সেলার' : 'Bestseller'}</span>
              </span>
            )}

            <span className="px-2.5 py-1 rounded-full bg-black/90 text-neutral-200 text-xs font-semibold flex items-center gap-1 border border-neutral-800">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>{item.prepTimeMinutes} mins</span>
            </span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-neutral-200">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {language === 'bn' ? item.bengaliName : item.name}
                </h2>
                {language === 'bn' && (
                  <p className="text-xs text-neutral-400 font-medium">{item.name}</p>
                )}
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">৳{singleItemPrice}</span>
                <span className="text-[11px] text-neutral-400 block">{language === 'bn' ? 'মূল্য' : 'Base Price'}</span>
              </div>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {language === 'bn' ? item.bengaliDescription : item.description}
            </p>
          </div>

          {/* Pizza Size Selection */}
          {item.sizeOptions && item.sizeOptions.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300 flex items-center justify-between">
                <span>{language === 'bn' ? 'সাইজ নির্বাচন করুন' : 'Select Pizza Size'}</span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  {language === 'bn' ? 'বাধ্যতামূলক' : 'Required'}
                </span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {item.sizeOptions.map((opt) => (
                  <button
                    key={opt.size}
                    type="button"
                    onClick={() => setSelectedSize(opt.size)}
                    id={`pizza-size-${opt.size}`}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      selectedSize === opt.size
                        ? 'bg-neutral-900 border-white text-white font-bold'
                        : 'bg-black border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-sm font-bold">{opt.size}</div>
                    <div className="text-[11px] text-neutral-400">{opt.label.split('(')[1]?.replace(')', '') || ''}</div>
                    <div className="text-xs font-bold text-white mt-1">৳{opt.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customization / Add-ons Options */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-neutral-800">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                {language === 'bn' ? 'অতিরিক্ত কাস্টমাইজেশন ও সস' : 'Add Extra Dips & Toppings'}
              </label>
              <div className="space-y-2">
                {item.options.map((opt) => {
                  const isChecked = selectedOptions.some((o) => o.id === opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleOption(opt)}
                      id={`addon-opt-${opt.id}`}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-neutral-900 border-white text-white'
                          : 'bg-black border-neutral-800 text-neutral-300 hover:bg-neutral-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                            isChecked
                              ? 'bg-white border-white text-black'
                              : 'border-neutral-700 bg-black'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3] text-black" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">
                          {language === 'bn' ? opt.bengaliName : opt.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-neutral-200">+৳{opt.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5 pt-2 border-t border-neutral-800">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              {language === 'bn' ? 'বিশেষ রিকোয়েস্ট (ঐচ্ছিক)' : 'Special Instructions (Optional)'}
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={
                language === 'bn'
                  ? 'যেমন: সস আলাদা দেবেন, বেশি ক্রিস্পি করবেন...'
                  : 'e.g., Less spicy, sauce on the side, extra crispy...'
              }
              id="food-special-instructions-input"
              className="w-full px-3.5 py-2 rounded-xl bg-black border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-5 bg-black border-t border-neutral-800 flex items-center justify-between gap-4">
          {/* Quantity selector */}
          <div className="flex items-center gap-2 bg-black border border-neutral-800 p-1 rounded-xl">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              id="modal-qty-minus-btn"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 flex items-center justify-center text-white"
            >
              <Minus className="w-4 h-4 text-neutral-300" />
            </button>
            <span className="w-8 text-center text-sm font-bold text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              id="modal-qty-plus-btn"
              className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-white"
            >
              <Plus className="w-4 h-4 text-neutral-300" />
            </button>
          </div>

          {/* Add to Cart Submit */}
          <button
            onClick={handleAddToCart}
            disabled={!item.inStock}
            id="modal-add-to-cart-btn"
            className="flex-1 py-3 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm flex items-center justify-between shadow transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            <span>{language === 'bn' ? 'অর্ডারে যুক্ত করুন' : 'Add to Order'}</span>
            <span className="text-base font-bold">৳{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
