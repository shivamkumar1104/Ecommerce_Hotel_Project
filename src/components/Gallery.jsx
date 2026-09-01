import React, { useState } from 'react';
import { GALLERY_DATA } from '../data/hotelData';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Architecture', 'Suites', 'Wellness', 'Dining'];

  const filteredGallery = activeCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredGallery.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredGallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-hotel-cream relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-hotel-gold-dark text-xs uppercase tracking-[0.3em] font-medium mb-2">
            <Camera className="w-4 h-4 text-hotel-emerald" /> Visual Moments
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-hotel-emerald-dark font-normal mb-4">
            The Equalirio Lookbook
          </h2>
          <p className="text-gray-600 text-sm font-light leading-relaxed">
            Immerse yourself in our architectural symmetry, pristine overwater suites, and natural sanctuary surroundings.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-hotel-emerald text-white shadow-luxury'
                  : 'bg-white text-gray-600 hover:text-hotel-emerald border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(idx)}
              className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer group border-2 border-white"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-widest text-hotel-gold font-bold mb-1">
                  {item.category}
                </span>
                <h3 className="font-serif text-xl text-white font-normal flex items-center justify-between">
                  <span>{item.title}</span>
                  <Maximize2 className="w-4 h-4 text-hotel-gold" />
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white p-2 rounded-full bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-hotel-gold/30 shadow-2xl"
          >
            <img
              src={filteredGallery[lightboxIndex].image}
              alt={filteredGallery[lightboxIndex].title}
              className="max-w-full max-h-[80vh] object-contain mx-auto"
            />
            <div className="bg-hotel-emerald-dark p-4 text-center">
              <span className="text-[10px] uppercase tracking-widest text-hotel-gold block">
                {filteredGallery[lightboxIndex].category}
              </span>
              <h4 className="font-serif text-xl text-white font-normal">
                {filteredGallery[lightboxIndex].title}
              </h4>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </section>
  );
}
