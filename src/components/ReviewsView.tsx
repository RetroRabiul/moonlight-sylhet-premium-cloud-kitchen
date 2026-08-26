import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ReviewItem } from '../types';
import {
  Star,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Send,
  ShieldCheck
} from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const { reviews, addReview, menuItems, language } = useApp();

  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [orderedItemName, setOrderedItemName] = useState(menuItems[0]?.name || 'Naga Fire Wings');
  const [selectedTag, setSelectedTag] = useState<string>('Naga Lover 🔥');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    addReview({
      customerName: name,
      rating,
      comment,
      menuItemName: orderedItemName,
      tags: [selectedTag],
      verifiedOrder: true,
    });

    setSubmitted(true);
    setName('');
    setComment('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="py-6 space-y-8 max-w-5xl mx-auto" id="reviews-feedback-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-white" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'bn' ? 'কাস্টমার রিভিউ ও মতামত' : 'Sylhet Diner Reviews & Ratings'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            {language === 'bn'
              ? 'সিলেটের খাদ্যরসিকদের আসল অভিজ্ঞতা ও রিভিউ জানুন।'
              : 'Real feedback from midnight foodies across Zindabazar, Amberkhana & SUST.'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-black border border-neutral-800 p-3 rounded-2xl">
          <div className="flex items-center gap-1 text-white font-bold text-2xl">
            <span>★ {avgRating}</span>
          </div>
          <div className="text-xs text-neutral-400 border-l border-neutral-800 pl-3">
            <span className="text-white font-bold block">{reviews.length} Verified Reviews</span>
            <span className="text-neutral-400">Sylhet Cloud Kitchen</span>
          </div>
        </div>
      </div>

      {/* Review Submission Card & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Form */}
        <div className="lg:col-span-1 rounded-2xl bg-black border border-neutral-800 p-6 space-y-4 shadow">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-white" />
              <span>{language === 'bn' ? 'আপনার রিভিউ লিখুন' : 'Leave Your Review'}</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">Share your late-night food experience</p>
          </div>

          {submitted && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! Your review has been published.</span>
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-3 text-xs">
            <div>
              <label className="text-neutral-400 font-medium block mb-1">Your Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mahdi Hassan"
                className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div>
              <label className="text-neutral-400 font-medium block mb-1">Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-neutral-600 hover:text-white focus:outline-none transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-neutral-400 font-medium block mb-1">Dish Ordered</label>
              <select
                value={orderedItemName}
                onChange={(e) => setOrderedItemName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
              >
                {menuItems.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-neutral-400 font-medium block mb-1">Badge Tag</label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
              >
                <option value="Naga Lover 🔥">Naga Lover 🔥</option>
                <option value="Fast Delivery ⚡">Fast Delivery ⚡</option>
                <option value="Cheesy Goodness 🧀">Cheesy Goodness 🧀</option>
                <option value="Midnight Regular 🌙">Midnight Regular 🌙</option>
              </select>
            </div>

            <div>
              <label className="text-neutral-400 font-medium block mb-1">Review Comment</label>
              <textarea
                rows={3}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was the taste, spice level & delivery speed?"
                className="w-full px-3 py-2 rounded-xl bg-black border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>

            <button
              type="submit"
              id="submit-review-btn"
              className="w-full py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-transform active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-black" />
              <span>Post Review</span>
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2 space-y-4">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-black border border-neutral-800 space-y-3 shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white font-bold text-sm">
                    {r.customerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{r.customerName}</span>
                      {r.tags && r.tags.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-neutral-900 text-neutral-300 text-[10px] font-medium border border-neutral-800">
                          {r.tags[0]}
                        </span>
                      )}
                    </h4>
                    <span className="text-[11px] text-neutral-400 block">Ordered: {r.menuItemName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                "{r.comment}"
              </p>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                <span>{r.date}</span>
                <span className="flex items-center gap-1 text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Order</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
