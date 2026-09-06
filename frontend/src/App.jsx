import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Suites from './components/Suites';
import SuiteDetailModal from './components/SuiteDetailModal';
import Amenities from './components/Amenities';
import Dining from './components/Dining';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

// Modals & Overlay Utilities
import BookingModal from './components/BookingModal';
import TableReservationModal from './components/TableReservationModal';
import ReviewModal from './components/ReviewModal';
import Toast from './components/Toast';
import RegisterTest from './components/RegisterTest';

import { REVIEWS_DATA } from './data/hotelData';

export default function App() {
  // Global States
  const [currency, setCurrency] = useState('USD');
  const [toastMessage, setToastMessage] = useState(null);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);

  // Suite Detail Modal State
  const [selectedSuiteDetail, setSelectedSuiteDetail] = useState(null);

  // Table Reservation Modal State
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableRestaurant, setTableRestaurant] = useState('');

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(REVIEWS_DATA);

  // Handlers
  const handleOpenBooking = (data = null) => {
    setBookingInitialData(data);
    setIsBookingOpen(true);
  };

  const handleBookSuite = (suite) => {
    setBookingInitialData({ suite });
    setIsBookingOpen(true);
  };

  const handleReserveTable = (restaurantName) => {
    setTableRestaurant(restaurantName);
    setIsTableModalOpen(true);
  };

  const handleAddReview = (newReview) => {
    setReviewsList([newReview, ...reviewsList]);
    setToastMessage("Thank you! Your guest review has been posted.");
  };

  const handleExperienceInquiry = (experienceTitle) => {
    setToastMessage(`Experience inquiry for "${experienceTitle}" submitted to Concierge.`);
  };

  return (
    <div className="min-h-screen bg-hotel-cream text-hotel-dark font-sans selection:bg-hotel-gold selection:text-hotel-emerald-dark">
      
      {/* Sticky Header Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        currency={currency}
        setCurrency={setCurrency}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Banner with Quick Search */}
        <Hero
          onSearchBooking={(searchData) => handleOpenBooking(searchData)}
        />

        {/* About Equalirio Philosophy & Stats */}
        <About />

        {/* Suites & Villas Showcase */}
        <Suites
          onSelectSuite={(suite) => setSelectedSuiteDetail(suite)}
          onBookSuite={(suite) => handleBookSuite(suite)}
          currency={currency}
        />

        {/* Amenities & VIP Privileges */}
        <Amenities
          onOpenInquiry={(title) => handleExperienceInquiry(title)}
        />

        {/* Michelin Dining & Lounges */}
        <Dining
          onReserveTable={(name) => handleReserveTable(name)}
        />

        {/* Lookbook Visual Gallery & Lightbox */}
        <Gallery />

        {/* Guest Reviews & Testimonials */}
        <Reviews
          reviewsList={reviewsList}
          onWriteReview={() => setIsReviewModalOpen(true)}
        />

        {/* Accordion FAQs & Concierge Inquiry Box */}
        <FaqSection
          onToast={(msg) => setToastMessage(msg)}
        />
      </main>

      {/* Footer */}
      <Footer
        onToast={(msg) => setToastMessage(msg)}
      />

      {/* MODALS */}
      {/* 1. Multi-step Suite Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
        currency={currency}
        onBookingSuccess={(details) => {
          setToastMessage(`Booking Confirmed! Reference #EQL-2026 for ${details.suite}`);
        }}
      />

      {/* 2. Suite Specs Detail Modal */}
      <SuiteDetailModal
        suite={selectedSuiteDetail}
        onClose={() => setSelectedSuiteDetail(null)}
        onBookNow={(suite) => handleBookSuite(suite)}
        currency={currency}
      />

      {/* 3. Dining Table Reservation Modal */}
      <TableReservationModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        restaurantName={tableRestaurant}
        onSuccess={(msg) => setToastMessage(msg)}
      />

      {/* 4. Write Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onAddReview={handleAddReview}
      />

      {/* 5. Toast Notification System */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Temporary Backend Register API Tester */}
      <RegisterTest />

    </div>
  );
}
