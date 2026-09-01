import React from 'react';
import { REVIEWS_DATA } from '../data/hotelData';
import { Star, Quote, MessageSquarePlus, Award, CheckCircle } from 'lucide-react';

export default function Reviews({ onWriteReview, reviewsList }) {
  const reviews = reviewsList || REVIEWS_DATA;

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-hotel-emerald-dark text-white relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-hotel-gold text-xs uppercase tracking-[0.3em] font-medium mb-2">
            <Award className="w-4 h-4" /> Guest Testimonials & Recognition
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-4">
            Endorsed by World Travelers
          </h2>
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            Read authentic stories from guests who experienced total equilibrium at Equalirio Resort.
          </p>
        </div>

        {/* Rating Breakdown Banner */}
        <div className="bg-hotel-emerald/40 border border-hotel-gold/30 rounded-3xl p-6 sm:p-8 mb-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-hotel-gold text-hotel-emerald-dark flex items-center justify-center font-serif text-3xl font-bold shadow-gold">
              4.98
            </div>
            <div>
              <div className="flex text-hotel-gold gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-hotel-gold" />
                ))}
              </div>
              <span className="text-xs uppercase tracking-widest text-white font-semibold">
                Exceptional — 342 Verified Guest Reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-xs text-gray-300 font-light border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
            <div>
              <span className="block text-hotel-gold font-bold text-base font-serif">5.0 / 5</span>
              <span className="text-[10px] uppercase">Service & Butler</span>
            </div>
            <div>
              <span className="block text-hotel-gold font-bold text-base font-serif">5.0 / 5</span>
              <span className="text-[10px] uppercase">Villa Privacy</span>
            </div>
            <div>
              <span className="block text-hotel-gold font-bold text-base font-serif">4.9 / 5</span>
              <span className="text-[10px] uppercase">Gastronomy</span>
            </div>
            <div>
              <span className="block text-hotel-gold font-bold text-base font-serif">5.0 / 5</span>
              <span className="text-[10px] uppercase">Spa & Wellness</span>
            </div>
          </div>

          <button
            onClick={onWriteReview}
            className="shrink-0 bg-white/10 hover:bg-hotel-gold hover:text-hotel-emerald-dark text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full border border-hotel-gold/40 transition-all flex items-center gap-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>

        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:border-hotel-gold/50 transition-all duration-300 relative group"
            >
              <div>
                <Quote className="w-8 h-8 text-hotel-gold/30 mb-4 group-hover:text-hotel-gold/60 transition-colors" />

                <div className="flex text-hotel-gold gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-hotel-gold" />
                  ))}
                </div>

                <h3 className="font-serif text-xl text-white font-normal mb-2">
                  "{rev.title}"
                </h3>

                <p className="text-gray-300 text-xs font-light leading-relaxed mb-6 italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-hotel-gold/40"
                />
                <div>
                  <h4 className="text-xs font-semibold text-white flex items-center gap-1">
                    <span>{rev.author}</span>
                    <CheckCircle className="w-3 h-3 text-hotel-gold" />
                  </h4>
                  <span className="text-[10px] text-gray-400 block">{rev.role} • {rev.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
