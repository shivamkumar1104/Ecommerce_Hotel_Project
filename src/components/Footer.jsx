import React, { useState } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Sparkles, MapPin, Phone, Mail, Send, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer({ onToast }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    onToast(`Thank you! Exclusive offers have been sent to ${newsletterEmail}`);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-hotel-emerald-dark text-white border-t border-hotel-gold/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-hotel-gold flex items-center justify-center bg-hotel-emerald">
                <Sparkles className="w-5 h-5 text-hotel-gold" />
              </div>
              <span className="font-serif text-3xl tracking-[0.2em] font-bold text-white">
                {HOTEL_INFO.name}
              </span>
            </div>

            <p className="text-gray-300 text-xs font-light leading-relaxed mb-6 max-w-sm">
              "{HOTEL_INFO.tagline}". An exclusive eco-resort sanctuary committed to modern equilibrium, sustainable luxury, and unforgettable stays.
            </p>

            <div className="flex items-center gap-4 text-hotel-gold">
              <a href="#" className="p-2 rounded-full border border-white/10 hover:border-hotel-gold hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-white/10 hover:border-hotel-gold hover:bg-white/10 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-full border border-white/10 hover:border-hotel-gold hover:bg-white/10 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-hotel-gold font-semibold mb-4">
              Accommodations
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li><a href="#suites" className="hover:text-hotel-gold transition-colors">Infinity Pool Villas</a></li>
              <li><a href="#suites" className="hover:text-hotel-gold transition-colors">Royal Penthouse</a></li>
              <li><a href="#suites" className="hover:text-hotel-gold transition-colors">Rainforest Eco Suites</a></li>
              <li><a href="#suites" className="hover:text-hotel-gold transition-colors">Overwater Bungalows</a></li>
            </ul>
          </div>

          {/* Resort Experiences */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-hotel-gold font-semibold mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-light">
              <li><a href="#amenities" className="hover:text-hotel-gold transition-colors">Aurelia Holistic Spa</a></li>
              <li><a href="#dining" className="hover:text-hotel-gold transition-colors">Rio Fine Dining</a></li>
              <li><a href="#amenities" className="hover:text-hotel-gold transition-colors">Helicopter Charter</a></li>
              <li><a href="#gallery" className="hover:text-hotel-gold transition-colors">Resort Gallery</a></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h4 className="text-xs uppercase tracking-widest text-hotel-gold font-semibold mb-2">
              Privé Privilege Club
            </h4>
            <p className="text-xs text-gray-300 font-light mb-4 leading-relaxed">
              Subscribe to receive private villa release dates, seasonal culinary tasting invitations, and exclusive guest packages.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your VIP email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-black/40 border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-hotel-gold"
              />
              <button
                type="submit"
                className="bg-hotel-gold hover:bg-hotel-gold-light text-hotel-emerald-dark font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all shadow-gold flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Contact & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-light">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-hotel-gold" />
              {HOTEL_INFO.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-hotel-gold" />
              {HOTEL_INFO.phone}
            </span>
          </div>

          <div>
            © 2026 EQUALIRIO Luxury Resort & Spa. All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
