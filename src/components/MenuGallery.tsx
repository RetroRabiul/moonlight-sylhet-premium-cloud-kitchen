import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem, CategoryId } from '../types';
import { FoodModal } from './FoodModal';
import {
  Flame,
  Search,
  Sparkles,
  UtensilsCrossed,
  Clock,
  Plus,
  SlidersHorizontal,
  Star,
  Info,
  Pizza,
  Sandwich,
  Drumstick,
  Soup
} from 'lucide-react';

export const MenuGallery: React.FC = () => {
  const { menuItems, language, addToCart, setIsCartOpen } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'naga' | 'popular' | 'budget' | 'veg'>('all');
  const [selectedModalItem, setSelectedModalItem] = useState<MenuItem | null>(null);

  const categories: { id: CategoryId; label: string; bengaliLabel: string }[] = [
    { id: 'all', label: 'Full Menu', bengaliLabel: 'সকল আইটেম' },
    { id: 'rice_bowl', label: 'Rice Bowl', bengaliLabel: 'রাইস বাউল' },
    { id: 'burger', label: 'Burger', bengaliLabel: 'বার্গার' },
    { id: 'pizza', label: 'Pizza (8", 10", 12")', bengaliLabel: 'পিৎজা' },
    { id: 'wings', label: 'Wings (6 pcs)', bengaliLabel: 'উইংস' },
    { id: 'fried_chicken', label: 'Fried Chicken', bengaliLabel: 'ফ্রাইড চিকেন' },
    { id: 'pasta', label: 'Oven Pasta', bengaliLabel: 'বেকড পাস্তা' },
    { id: 'french_fries', label: 'French Fries', bengaliLabel: 'ফ্রেঞ্চ ফ্রাইজ' },
    { id: 'chow_mein_shawarma', label: 'Chow Mein & Shawarma', bengaliLabel: 'চাউমিন ও শর্মা' },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q) || item.bengaliName.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q) || item.bengaliDescription.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc) return false;
      }

      // Additional quick filters
      if (activeFilter === 'naga' && item.spicyLevel < 2) return false;
      if (activeFilter === 'popular' && !item.isPopular) return false;
      if (activeFilter === 'budget' && item.price > 200) return false;
      if (activeFilter === 'veg' && !item.isVegetarian) return false;

      return true;
    });
  }, [menuItems, selectedCategory, searchQuery, activeFilter]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.sizeOptions && item.sizeOptions.length > 0) {
      // Open modal to select size
      setSelectedModalItem(item);
    } else {
      addToCart(item, undefined, [], 1);
    }
  };

  return (
    <section id="menu-section" className="py-6 space-y-6">
      {/* Header with Search and Filter Pills */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {language === 'bn' ? 'MOONLIGHT স্পেশাল মেনু' : 'MoonLight Signature Menu'}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {language === 'bn'
                ? 'সিলেট শহরের জন্য স্পেশাল নাইট হট মেনু — ফ্রেশ উপকরণে তাৎক্ষণিক তৈরি।'
                : 'Piping hot late-night meals crafted fresh upon order in Sylhet.'}
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'bn' ? 'খাবার খুঁজুন (যেমন: নাগা, বার্গার...)' : 'Search items (e.g. Naga, Pizza...)'}
              id="menu-search-input"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-neutral-600 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              id={`cat-filter-${cat.id}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-bold shadow'
                  : 'bg-black border border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
              }`}
            >
              <span>{language === 'bn' ? cat.bengaliLabel : cat.label}</span>
            </button>
          ))}
        </div>

        {/* Sub-Filters (Naga 🔥, Popular ⭐, Budget ৳, Veg 🥗) */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-neutral-400 font-medium flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <span>{language === 'bn' ? 'ফিল্টার:' : 'Filter:'}</span>
          </span>

          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1 rounded-lg border font-medium ${
              activeFilter === 'all'
                ? 'bg-neutral-800 border-neutral-700 text-white font-bold'
                : 'bg-black border-neutral-800 text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {language === 'bn' ? 'সকল' : 'All'}
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'naga' ? 'all' : 'naga')}
            id="filter-naga-blast"
            className={`px-3 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-colors ${
              activeFilter === 'naga'
                ? 'bg-red-950/80 border-red-700 text-red-300'
                : 'bg-black border-neutral-800 text-neutral-400 hover:border-red-800 hover:text-red-400'
            }`}
          >
            <Flame className="w-3 h-3 text-red-400" />
            <span>{language === 'bn' ? 'নাগা স্পেশাল 🔥' : 'Naga Fire 🔥'}</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'popular' ? 'all' : 'popular')}
            id="filter-popular"
            className={`px-3 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-colors ${
              activeFilter === 'popular'
                ? 'bg-neutral-800 border-neutral-700 text-white'
                : 'bg-black border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
            }`}
          >
            <Star className="w-3 h-3 text-amber-400" />
            <span>{language === 'bn' ? 'টপ সেলার' : 'Bestsellers'}</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'budget' ? 'all' : 'budget')}
            id="filter-budget"
            className={`px-3 py-1 rounded-lg border font-semibold transition-colors ${
              activeFilter === 'budget'
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                : 'bg-black border-neutral-800 text-neutral-400 hover:border-emerald-800 hover:text-emerald-300'
            }`}
          >
            <span>{language === 'bn' ? '≤ ২০০ টাকা' : 'Under 200 TK'}</span>
          </button>

          <button
            onClick={() => setActiveFilter(activeFilter === 'veg' ? 'all' : 'veg')}
            id="filter-veg"
            className={`px-3 py-1 rounded-lg border font-semibold transition-colors ${
              activeFilter === 'veg'
                ? 'bg-green-950/80 border-green-700 text-green-300'
                : 'bg-black border-neutral-800 text-neutral-400 hover:border-green-800 hover:text-green-300'
            }`}
          >
            <span>{language === 'bn' ? 'ভেজ / মার্গারিটা' : 'Veg Options'}</span>
          </button>
        </div>
      </div>

      {/* Food Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-black border border-neutral-800 rounded-2xl space-y-3">
          <UtensilsCrossed className="w-10 h-10 text-neutral-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">
            {language === 'bn' ? 'কোন খাবার পাওয়া যায়নি' : 'No items match your search'}
          </h3>
          <p className="text-xs text-neutral-400">
            {language === 'bn' ? 'অনুগ্রহ করে অন্য শব্দ দিয়ে খুঁজুন।' : 'Try resetting your filter or searching for another dish.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs shadow"
          >
            {language === 'bn' ? 'সব মেনু দেখুন' : 'Reset All Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => {
            const hasSizes = item.sizeOptions && item.sizeOptions.length > 0;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedModalItem(item)}
                id={`menu-card-${item.id}`}
                className="group relative bg-black border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden shadow transition-all flex flex-col cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  {/* Top floating badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {item.spicyLevel > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-red-600/90 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                        <Flame className="w-3 h-3 fill-white" />
                        <span>
                          {item.spicyLevel === 3 ? 'NAGA 🔥🔥🔥' : item.spicyLevel === 2 ? 'HOT 🔥🔥' : 'SPICY 🔥'}
                        </span>
                      </span>
                    )}

                    {item.isPopular && (
                      <span className="px-2 py-0.5 rounded-md bg-white text-black text-[10px] font-bold shadow flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{language === 'bn' ? 'জনপ্রিয়' : 'POPULAR'}</span>
                      </span>
                    )}
                  </div>

                  {/* Prep Time pill */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/90 border border-neutral-800 text-[10px] font-semibold text-neutral-300 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <span>{item.prepTimeMinutes}m</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {language === 'bn' ? item.bengaliName : item.name}
                      </h3>
                    </div>

                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'bn' ? item.bengaliDescription : item.description}
                    </p>
                  </div>

                  {/* Bottom Price and Actions */}
                  <div className="pt-2 border-t border-neutral-850 flex items-center justify-between">
                    <div>
                      {hasSizes ? (
                        <div>
                          <span className="text-[10px] text-neutral-400 block uppercase">
                            {language === 'bn' ? 'শুরু মাত্র' : 'From'}
                          </span>
                          <span className="text-base font-bold text-white">
                            ৳{item.price}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-base font-bold text-white">
                            ৳{item.price}
                          </span>
                          <span className="text-[10px] text-neutral-400 ml-1">TK</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        id={`quick-add-${item.id}`}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center gap-1 shadow transition-transform active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3] text-black" />
                        <span>{hasSizes ? (language === 'bn' ? 'সাইজ' : 'Sizes') : (language === 'bn' ? 'অর্ডার' : 'Add')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Food Detail Modal */}
      {selectedModalItem && (
        <FoodModal
          item={selectedModalItem}
          onClose={() => setSelectedModalItem(null)}
        />
      )}
    </section>
  );
};
