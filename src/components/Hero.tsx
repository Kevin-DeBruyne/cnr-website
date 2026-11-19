import React, { useState } from 'react';
import { Calendar, Users, ArrowRight } from 'lucide-react';
import { ACCOMMODATIONS } from '../data/campsiteData';

interface HeroProps {
  onCheckAvailability: (tentId: string, checkIn: string, checkOut: string, guests: number) => void;
  onExploreMap?: () => void;
  isPlaying?: boolean;
  isMuted?: boolean;
  onTogglePlay?: () => void;
  onToggleMute?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 3);

  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDate(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDate(dayAfter));
  const [guests, setGuests] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability(ACCOMMODATIONS[0].id, checkIn, checkOut, guests);
  };

  return (
    <section className="relative bg-[#F4EFEC] pb-12">
      {/* Full-Bleed Atmospheric Site Photograph */}
      <div className="relative w-full h-[480px] sm:h-[540px] lg:h-auto lg:aspect-[1280/591] lg:max-h-[660px] overflow-hidden bg-[#18281A]">
        <img
          src="/assets/aistudio/624fa254-c20c-4cb6-b3a5-a4b3ba6b6f74_6965957a.jpeg"
          alt="Corbett Nature Retreat stone courtyard and cottages shaded under mature mango trees"
          className="w-full h-full object-cover object-center"
        />
        {/* Luxury Multi-Stop Scrim for High Legibility & Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/35 pointer-events-none" />

        {/* Centered Editorial Headline Lockup */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pb-14">
          <div className="flex items-center gap-3 text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-[#EFE6D5] mb-3.5">
            <span className="hidden sm:inline-block w-8 h-px bg-[#D8C5A3]/70" />
            <span>Village Kyari, Jim Corbett · Heritage Mango Orchard</span>
            <span className="hidden sm:inline-block w-8 h-px bg-[#D8C5A3]/70" />
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight max-w-3xl text-balance leading-[1.08] drop-shadow-md">
            Where the Wild Meets Natural Shade
          </h1>

          <p className="mt-4 text-sm sm:text-base text-[#F2ECE2] max-w-xl leading-relaxed drop-shadow-sm">
            Five luxury cottages shaded all around by mature mango trees, each with a private balcony · ₹3,250 + 5% GST / night.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onCheckAvailability(ACCOMMODATIONS[0].id, checkIn, checkOut, guests)}
              className="px-7 py-3.5 bg-[#9B7E4F] hover:bg-[#856A3E] active:scale-95 text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-sm transition-all shadow-xl inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Book Your Stay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Architectural Availability Dock (Matches Video Frame 00:00–00:01) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 -mt-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-sm border border-[#D8CFC2] shadow-xl p-2.5 sm:p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch"
        >
          <div className="flex items-center gap-3 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EBE4DB]">
            <Calendar className="w-4 h-4 text-[#1E3F20] shrink-0" />
            <div className="min-w-0 flex-1">
              <label htmlFor="hero-checkin" className="block text-[10px] font-semibold uppercase tracking-widest text-[#69706B]">
                Check In
              </label>
              <input
                id="hero-checkin"
                type="date"
                value={checkIn}
                min={formatDate(today)}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-xs font-semibold text-[#1F2421] bg-transparent focus:outline-none cursor-pointer"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EBE4DB]">
            <Calendar className="w-4 h-4 text-[#1E3F20] shrink-0" />
            <div className="min-w-0 flex-1">
              <label htmlFor="hero-checkout" className="block text-[10px] font-semibold uppercase tracking-widest text-[#69706B]">
                Check Out
              </label>
              <input
                id="hero-checkout"
                type="date"
                value={checkOut}
                min={checkIn}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-xs font-semibold text-[#1F2421] bg-transparent focus:outline-none cursor-pointer"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-3.5 py-2.5 bg-[#FAF8F5] border border-[#EBE4DB]">
            <Users className="w-4 h-4 text-[#1E3F20] shrink-0" />
            <div className="min-w-0 flex-1">
              <label htmlFor="hero-guests" className="block text-[10px] font-semibold uppercase tracking-widest text-[#69706B]">
                Guests
              </label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full text-xs font-semibold text-[#1F2421] bg-transparent focus:outline-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full min-h-[48px] px-5 py-2.5 bg-[#1E3F20] hover:bg-[#142D16] active:scale-95 text-white text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer whitespace-nowrap"
          >
            Check Availability
          </button>
        </form>
      </div>
    </section>
  );
};
