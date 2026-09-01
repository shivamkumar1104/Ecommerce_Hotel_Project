import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-hotel-emerald-dark border border-hotel-gold text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 animate-fade-in gold-border-glow">
      <div className="p-2 rounded-xl bg-hotel-gold/20 text-hotel-gold shrink-0">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="flex-1 text-xs font-light">
        <span className="font-semibold text-hotel-gold block mb-0.5 uppercase tracking-wider text-[10px]">
          Equalirio Concierge Notification
        </span>
        <p className="text-gray-200">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-white p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
