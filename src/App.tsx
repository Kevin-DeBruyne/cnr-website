import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConceptSection } from './components/ConceptSection';
import { Accommodations } from './components/Accommodations';
import { EverythingAvailable } from './components/EverythingAvailable';
import { InteractivePanorama } from './components/InteractivePanorama';
import { RetreatInfoHub } from './components/RetreatInfoHub';
import { Footer } from './components/Footer';
import { DiningMenuModal } from './components/DiningMenuModal';
import { BookingModal } from './components/BookingModal';
import { ActivityItem } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [bookingPrefill, setBookingPrefill] = useState<{
    tentId?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    safariZoneId?: string;
  }>({});

  const handleOpenBooking = (tentId?: string) => {
    setBookingPrefill((prev) => ({
      ...prev,
      tentId,
      safariZoneId: undefined
    }));
    setIsBookingOpen(true);
  };

  const handleCheckAvailability = (
    tentId: string,
    checkIn: string,
    checkOut: string,
    guests: number
  ) => {
    setBookingPrefill({
      tentId,
      checkIn,
      checkOut,
      guests
    });
    setIsBookingOpen(true);
  };

  const handleBookActivity = (activity?: ActivityItem) => {
    if (activity?.id === 'activity-canter-safari') {
      setBookingPrefill((prev) => ({ ...prev, safariZoneId: 'dhikala-canter' }));
    } else if (activity?.id === 'activity-corbett-safari') {
      setBookingPrefill((prev) => ({ ...prev, safariZoneId: 'bijrani-safari' }));
    } else {
      setBookingPrefill((prev) => ({ ...prev, safariZoneId: undefined }));
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4EFEC] font-sans text-[#1F2421] flex flex-col selection:bg-[#1E3F20] selection:text-white">
      {/* Top Bar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      {/* Compact Video-Style Low-Scroll Section Flow */}
      <main className="flex-1">
        {/* Hero Banner + Overlapping Availability Bar */}
        <Hero onCheckAvailability={handleCheckAvailability} />

        {/* 1. Multi-Photo Orchard & Sanctuary Collages + Text Beside It */}
        <ConceptSection onBookStay={() => handleOpenBooking()} />

        {/* 2. The 5 Cottages — Horizontal Swipe Showcase + 6-Icon Amenity Bar */}
        <Accommodations onSelectAccommodation={(tentId) => handleOpenBooking(tentId)} />

        {/* 3. Everything Available — Horizontal Filterable Photo Carousel + 3-Perspective Modal */}
        <EverythingAvailable onBookActivity={handleBookActivity} />

        {/* 4. Interactive 360° Retreat & Cottage Showcase — Drag Pan, Zoom & Hotspots */}
        <InteractivePanorama />

        {/* 5. Compact Tabbed Retreat Information Hub — Menu, Weather & Wildlife, Location/FAQs, Reviews */}
        <RetreatInfoHub
          onOpenBooking={() => handleOpenBooking()}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      </main>

      {/* Deep Forest Green Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Consolidated Dining Menu Modal */}
      <DiningMenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* Reservation & Booking Voucher Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedTentId={bookingPrefill.tentId}
        initialCheckIn={bookingPrefill.checkIn}
        initialCheckOut={bookingPrefill.checkOut}
        initialGuests={bookingPrefill.guests}
        initialSafariZoneId={bookingPrefill.safariZoneId}
      />
    </div>
  );
}
