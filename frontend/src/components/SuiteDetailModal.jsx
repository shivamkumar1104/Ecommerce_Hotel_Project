import React, { useState } from 'react';
import { X, Check, Users, Maximize2, Bed, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export default function SuiteDetailModal({ suite, onClose, onBookNow, currency }) {
  if (!suite) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = suite.images && suite.images.length > 0 ? suite.images : [suite.image];

  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    JPY: { symbol: '¥', rate: 155.0 },
    IND: { symbol: '₹', rate: 85 }
  };
  const curr = currencyRates[currency] || currencyRates.USD;
  const formattedPrice = `${curr.symbol}${Math.round(suite.price * curr.rate).toLocaleString()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      <div className="relative w-full max-w-4xl bg-hotel-emerald-dark border border-hotel-gold/40 rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-hotel-gold text-white hover:text-hotel-emerald-dark transition-colors flex items-center justify-center border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Gallery Column */}
          <div className="lg:col-span-7 bg-black flex flex-col">
            <div className="relative h-72 sm:h-96 w-full">
              <img
                src={images[activeImgIndex]}
                alt={suite.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-hotel-gold text-hotel-emerald-dark text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                {suite.tag}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 p-4 bg-hotel-emerald-dark/90 border-t border-white/10 overflow-x-auto">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImgIndex === idx ? 'border-hotel-gold scale-105 shadow-gold' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-hotel-gold text-xs uppercase tracking-widest font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" /> {suite.category}
              </div>

              <h2 className="font-serif text-3xl text-white font-normal mb-3">
                {suite.name}
              </h2>

              <p className="text-gray-300 text-xs leading-relaxed font-light mb-6">
                {suite.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-200 mb-6">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Suite Size</span>
                  <span className="font-semibold text-hotel-gold-light">{suite.size}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Capacity</span>
                  <span className="font-semibold text-hotel-gold-light">{suite.guests}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Bedding</span>
                  <span className="font-semibold text-hotel-gold-light">{suite.beds}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">View</span>
                  <span className="font-semibold text-hotel-gold-light">{suite.view}</span>
                </div>
              </div>

              {/* Amenities List */}
              <h4 className="text-xs uppercase tracking-widest text-hotel-gold font-semibold mb-3">
                Included VIP Amenities:
              </h4>
              <div className="space-y-2 mb-6">
                {suite.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                    <Check className="w-4 h-4 text-hotel-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Nightly Rate</span>
                <span className="font-serif text-3xl text-hotel-gold font-bold">{formattedPrice}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBookNow(suite);
                }}
                className="bg-hotel-gold hover:bg-hotel-gold-light text-hotel-emerald-dark font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-gold flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Suite</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
