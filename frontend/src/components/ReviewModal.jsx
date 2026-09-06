import React, { useState } from 'react';
import { X, Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';

export default function ReviewModal({ isOpen, onClose, onAddReview }) {
  if (!isOpen) return null;

  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Verified Guest');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onAddReview({
        id: 'user-' + Date.now(),
        author: author || 'Anonymous Traveler',
        role,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating,
        date: 'Just Now',
        title: title || 'Unforgettable Luxury',
        content
      });
      setSubmitted(false);
      onClose();
    }, 1200);
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
          <MessageSquarePlus className="w-4 h-4" /> Guest Feedback
        </div>

        <h2 className="font-serif text-2xl text-white font-normal mb-6">
          Share Your Equalirio Experience
        </h2>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-hotel-gold mx-auto animate-bounce" />
            <h3 className="font-serif text-xl text-white">Review Submitted!</h3>
            <p className="text-xs text-gray-300">Thank you for sharing your thoughts with future guests.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 uppercase tracking-wider mb-1">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-hotel-gold focus:outline-none"
                  >
                    <Star className={`w-6 h-6 ${rating >= star ? 'fill-hotel-gold' : 'opacity-30'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-300 uppercase tracking-wider mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sarah Jenkins"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
              />
            </div>

            <div>
              <label className="block text-gray-300 uppercase tracking-wider mb-1">Review Headline</label>
              <input
                type="text"
                required
                placeholder="e.g. Pure Serenity & Outstanding Service"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
              />
            </div>

            <div>
              <label className="block text-gray-300 uppercase tracking-wider mb-1">Your Review</label>
              <textarea
                rows={3}
                required
                placeholder="Describe your villa, dining, spa or butler experience..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-hotel-gold"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-hotel-gold hover:bg-hotel-gold-light text-hotel-emerald-dark font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-gold transition-all"
            >
              Post Guest Review
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
