import React, { useState, useEffect } from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { Phone, Calendar, Globe, Menu, X, Sparkles, ChevronDown } from 'lucide-react';

export default function Navbar({ onOpenBooking, currency, setCurrency }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies = [
    { code: 'USD', symbol: '$', label: 'USD ($)' },
    { code: 'EUR', symbol: '€', label: 'EUR (€)' },
    { code: 'GBP', symbol: '£', label: 'GBP (£)' },
    { code: 'JPY', symbol: '¥', label: 'JPY (¥)' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Suites & Villas', href: '#suites' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Dining', href: '#dining' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQs', href: '#faqs' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-hotel-emerald-dark/90 backdrop-blur-md py-3 shadow-luxury border-b border-hotel-gold/20'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-hotel-gold/60 flex items-center justify-center bg-hotel-emerald/40 group-hover:border-hotel-gold transition-colors">
              <Sparkles className="w-5 h-5 text-hotel-gold group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.25em] font-bold text-white group-hover:text-hotel-gold transition-colors">
                {HOTEL_INFO.name}
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-hotel-gold-light opacity-80 -mt-1 font-sans">
                Resort & Spa
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-gray-200 hover:text-hotel-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-hotel-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions: Currency Selector, Contact & CTA */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-hotel-gold px-2.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-hotel-gold" />
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-hotel-emerald-dark border border-hotel-gold/30 rounded-lg shadow-2xl py-1 z-50 animate-fade-in">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCurrency(c.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                        currency === c.code
                          ? 'bg-hotel-gold/20 text-hotel-gold font-medium'
                          : 'text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{c.label}</span>
                      {currency === c.code && <span className="w-1.5 h-1.5 rounded-full bg-hotel-gold"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Phone Call Link */}
            <a
              href={`tel:${HOTEL_INFO.phone}`}
              className="hidden md:flex items-center gap-2 text-xs text-gray-300 hover:text-hotel-gold transition-colors"
              title="Concierge Desk"
            >
              <Phone className="w-3.5 h-3.5 text-hotel-gold" />
              <span className="font-mono text-[11px] opacity-80">{HOTEL_INFO.phone}</span>
            </a>

            {/* CTA Reserve Suite */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 bg-gradient-to-r from-hotel-gold to-hotel-gold-dark hover:from-hotel-gold-light hover:to-hotel-gold text-hotel-emerald-dark font-semibold text-xs tracking-wider uppercase px-5 py-2.5 rounded-full shadow-gold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve Suite</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="sm:hidden flex items-center gap-1 bg-hotel-gold text-hotel-emerald-dark text-[11px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full"
            >
              <Calendar className="w-3 h-3" />
              <span>Book</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-hotel-gold hover:bg-white/10 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] bg-hotel-emerald-dark/95 backdrop-blur-xl border-b border-hotel-gold/30 py-6 px-6 shadow-2xl animate-fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-serif tracking-widest text-gray-200 hover:text-hotel-gold transition-colors border-b border-white/5 pb-2"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Select Currency:</span>
                <div className="flex gap-2">
                  {currencies.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code)}
                      className={`px-2 py-1 rounded text-xs ${
                        currency === c.code
                          ? 'bg-hotel-gold text-hotel-emerald-dark font-bold'
                          : 'bg-white/10 text-gray-300'
                      }`}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-hotel-gold hover:bg-hotel-gold-light text-hotel-emerald-dark font-bold text-xs tracking-widest uppercase py-3 rounded-xl shadow-gold"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Suite Now</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
