import React, { useState } from 'react';
import { SUITES_DATA } from '../data/hotelData';
import { X, Calendar, Users, Check, Sparkles, ShieldCheck, CreditCard, ChevronRight, CheckCircle2, Download, Plane, Coffee, Sparkle } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, initialData, currency, onBookingSuccess }) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [selectedSuite, setSelectedSuite] = useState(initialData?.suite || SUITES_DATA[0]);
  const [checkIn, setCheckIn] = useState(initialData?.checkIn || '2026-09-10');
  const [checkOut, setCheckOut] = useState(initialData?.checkOut || '2026-09-15');
  const [guestsCount, setGuestsCount] = useState(initialData?.guests || '2 Guests');
  
  // Addons state
  const [addons, setAddons] = useState({
    helicopter: false,
    spa: false,
    champagneBreakfast: true
  });

  // Guest details state
  const [guestInfo, setGuestInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const currencyRates = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.78 },
    JPY: { symbol: '¥', rate: 155.0 }
  };

  const curr = currencyRates[currency] || currencyRates.USD;

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(d2 - d1, 86400000);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 3;

  // Addon pricing in USD
  const addonPrices = {
    helicopter: 450,
    spa: 220,
    champagneBreakfast: 80
  };

  const basePriceUSD = selectedSuite.price * nights;
  const addonsTotalUSD = (addons.helicopter ? addonPrices.helicopter : 0) +
                         (addons.spa ? addonPrices.spa : 0) +
                         (addons.champagneBreakfast ? addonPrices.champagneBreakfast : 0);

  const grandTotalUSD = basePriceUSD + addonsTotalUSD;

  const formatAmount = (usd) => {
    return `${curr.symbol}${Math.round(usd * curr.rate).toLocaleString()}`;
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete booking
      setStep(4);
      onBookingSuccess({
        suite: selectedSuite.name,
        nights,
        total: formatAmount(grandTotalUSD),
        guest: guestInfo.fullName || 'Guest'
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      
      <div className="relative w-full max-w-3xl bg-hotel-emerald-dark border border-hotel-gold/40 rounded-3xl overflow-hidden shadow-2xl my-6 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-hotel-gold text-white hover:text-hotel-emerald-dark transition-colors flex items-center justify-center border border-white/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-hotel-emerald to-hotel-emerald-dark border-b border-hotel-gold/20 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-hotel-gold text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-4 h-4" /> Equalirio Reservation Engine
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            {step === 4 ? 'Booking Confirmed' : 'Reserve Your Luxury Sanctuary'}
          </h2>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step >= i ? 'bg-hotel-gold' : 'bg-white/10'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Select Suite & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              
              <h3 className="text-xs uppercase tracking-widest text-hotel-gold font-semibold">
                Step 1: Choose Accommodation & Dates
              </h3>

              {/* Dates & Guests selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <label className="text-[10px] uppercase text-gray-400 block mb-1">Check-In</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="bg-transparent text-white font-medium focus:outline-none focus:text-hotel-gold cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-400 block mb-1">Check-Out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="bg-transparent text-white font-medium focus:outline-none focus:text-hotel-gold cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase text-gray-400 block mb-1">Guests</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="bg-transparent text-white font-medium focus:outline-none cursor-pointer [&>option]:bg-hotel-emerald-dark"
                  >
                    <option value="1 Guest">1 Guest</option>
                    <option value="2 Guests">2 Guests</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6+ VIP">6+ VIP Guests</option>
                  </select>
                </div>
              </div>

              {/* Suite Options list */}
              <div className="space-y-3">
                <label className="text-[10px] uppercase text-gray-400 tracking-wider block">Available Accommodations:</label>
                {SUITES_DATA.map((suite) => (
                  <div
                    key={suite.id}
                    onClick={() => setSelectedSuite(suite)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      selectedSuite.id === suite.id
                        ? 'bg-hotel-gold/15 border-hotel-gold shadow-gold'
                        : 'bg-white/5 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={suite.image}
                        alt={suite.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-serif text-lg text-white font-medium">{suite.name}</h4>
                        <span className="text-xs text-gray-300 font-light">{suite.size} • {suite.guests}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-serif text-xl text-hotel-gold font-bold">
                        {formatAmount(suite.price)}
                      </span>
                      <span className="text-[10px] text-gray-400 block">/ night</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* STEP 2: VIP Add-ons */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-hotel-gold font-semibold">
                Step 2: Enhance Your Experience (VIP Add-ons)
              </h3>

              <div className="space-y-4">
                
                {/* Helicopter Addon */}
                <div
                  onClick={() => setAddons({ ...addons, helicopter: !addons.helicopter })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    addons.helicopter ? 'bg-hotel-gold/15 border-hotel-gold' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-hotel-gold/20 text-hotel-gold">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Private Helipad Airport Charter</h4>
                      <p className="text-xs text-gray-300 font-light">Direct scenic flight to Equalirio resort helipad</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg text-hotel-gold font-bold">+{formatAmount(addonPrices.helicopter)}</span>
                    {addons.helicopter && <CheckCircle2 className="w-5 h-5 text-hotel-gold ml-auto mt-1" />}
                  </div>
                </div>

                {/* Spa Addon */}
                <div
                  onClick={() => setAddons({ ...addons, spa: !addons.spa })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    addons.spa ? 'bg-hotel-gold/15 border-hotel-gold' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-hotel-gold/20 text-hotel-gold">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Aurelia Couple’s Hydrotherapy Ritual</h4>
                      <p className="text-xs text-gray-300 font-light">90 min hot stone & organic essential oils massage</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg text-hotel-gold font-bold">+{formatAmount(addonPrices.spa)}</span>
                    {addons.spa && <CheckCircle2 className="w-5 h-5 text-hotel-gold ml-auto mt-1" />}
                  </div>
                </div>

                {/* Champagne Breakfast Addon */}
                <div
                  onClick={() => setAddons({ ...addons, champagneBreakfast: !addons.champagneBreakfast })}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    addons.champagneBreakfast ? 'bg-hotel-gold/15 border-hotel-gold' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-hotel-gold/20 text-hotel-gold">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Floating Champagne Breakfast</h4>
                      <p className="text-xs text-gray-300 font-light">Served in your private infinity pool deck</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-lg text-hotel-gold font-bold">+{formatAmount(addonPrices.champagneBreakfast)}</span>
                    {addons.champagneBreakfast && <CheckCircle2 className="w-5 h-5 text-hotel-gold ml-auto mt-1" />}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 3: Guest Details & Payment info */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-hotel-gold font-semibold">
                Step 3: Primary Guest Information
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 uppercase tracking-wider mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Alexander Wright"
                    value={guestInfo.fullName}
                    onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 uppercase tracking-wider mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alexander@luxury.com"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 uppercase tracking-wider mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 019-2831"
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 uppercase tracking-wider mb-1">Special Concierge Requests</label>
                  <textarea
                    rows={3}
                    placeholder="Dietary requirements, anniversary surprises, preferred pillow type..."
                    value={guestInfo.specialRequests}
                    onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Booking Confirmation Voucher */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-hotel-gold/20 border-2 border-hotel-gold text-hotel-gold mx-auto flex items-center justify-center animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-3xl text-hotel-gold font-normal">
                Reservation Confirmed!
              </h3>

              <p className="text-gray-300 text-xs font-light max-w-md mx-auto">
                Thank you, <strong className="text-white font-semibold">{guestInfo.fullName || 'Valued Guest'}</strong>. Your stay at Equalirio Resort has been secured. A confirmation itinerary has been dispatched to your email.
              </p>

              {/* Voucher Ticket Box */}
              <div className="bg-hotel-emerald/60 border border-hotel-gold/40 rounded-2xl p-6 text-left space-y-3 font-mono text-xs shadow-2xl">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Booking Reference:</span>
                  <span className="text-hotel-gold font-bold">#EQL-2026-8942</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Selected Suite:</span>
                  <span className="text-white font-medium">{selectedSuite.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{nights} Nights ({checkIn} to {checkOut})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Butler Concierge:</span>
                  <span className="text-hotel-gold-light">Assigned (24/7 Dedicated)</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-sm">
                  <span className="text-white">Total Amount Paid:</span>
                  <span className="text-hotel-gold">{formatAmount(grandTotalUSD)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="bg-hotel-gold hover:bg-hotel-gold-light text-hotel-emerald-dark font-bold text-xs uppercase tracking-widest px-8 py-3 rounded-full shadow-gold"
              >
                Close & Return
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer with Pricing Summary & Step Buttons */}
        {step < 4 && (
          <div className="p-6 bg-black/40 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div>
              <span className="text-[10px] text-gray-400 uppercase block">Total ({nights} Nights + Addons)</span>
              <span className="font-serif text-3xl text-hotel-gold font-bold">
                {formatAmount(grandTotalUSD)}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-3 rounded-xl border border-white/20 text-xs uppercase tracking-wider text-gray-300 hover:text-white"
                >
                  Back
                </button>
              )}

              <button
                onClick={handleNextStep}
                className="flex-1 sm:flex-none bg-hotel-gold hover:bg-hotel-gold-light text-hotel-emerald-dark font-bold text-xs uppercase tracking-widest px-7 py-3.5 rounded-xl shadow-gold flex items-center justify-center gap-2"
              >
                <span>{step === 3 ? 'Confirm & Reserve' : 'Continue'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
