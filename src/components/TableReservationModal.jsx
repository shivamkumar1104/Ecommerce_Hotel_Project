import React, { useState } from 'react';
import { X, Utensils, Calendar, Clock, Users, CheckCircle2 } from 'lucide-react';

export default function TableReservationModal({ isOpen, onClose, restaurantName, onSuccess }) {
  if (!isOpen) return null;

  const [date, setDate] = useState('2026-09-12');
  const [time, setTime] = useState('08:00 PM');
  const [guests, setGuests] = useState('2 Guests');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSuccess(`Table reserved at ${restaurantName} for ${guests} on ${date} at ${time}`);
      onClose();
      setSubmitted(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-hotel-emerald-dark border border-hotel-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-hotel-gold text-xs uppercase tracking-widest font-semibold mb-1">
          <Utensils className="w-4 h-4" /> Fine Dining Reservation
        </div>

        <h2 className="font-serif text-2xl text-white font-normal mb-6">
          Reserve Table at {restaurantName || 'Rio Gastronomy'}
        </h2>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-hotel-gold mx-auto animate-bounce" />
            <h3 className="font-serif text-xl text-white">Table Reserved!</h3>
            <p className="text-xs text-gray-300">A seating confirmation email has been sent.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 uppercase tracking-wider mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-300 uppercase tracking-wider mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-hotel-gold"
                />
              </div>
              <div>
                <label className="block text-gray-300 uppercase tracking-wider mb-1">Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none [&>option]:bg-hotel-emerald-dark"
                >
                  <option>07:00 PM</option>
                  <option>08:00 PM</option>
                  <option>09:00 PM</option>
                  <option>10:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 uppercase tracking-wider mb-1">Party Size</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none [&>option]:bg-hotel-emerald-dark"
              >
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6 Guests</option>
                <option>8+ Private Dining Room</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-hotel-gold hover:bg-hotel-gold-light text-hotel-emerald-dark font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-gold transition-all"
            >
              Confirm Table Seating
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
