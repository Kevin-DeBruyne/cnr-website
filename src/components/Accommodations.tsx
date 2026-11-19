import React, { useState, useRef } from 'react';
import {
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Edit3,
  Trees,
  BedDouble,
  SunMedium,
  ShowerHead,
  Utensils,
  Coffee
} from 'lucide-react';
import { ACCOMMODATIONS } from '../data/campsiteData';
import { Accommodation } from '../types';

interface AccommodationsProps {
  onSelectAccommodation: (tentId: string) => void;
}

const COTTAGE5_NAME_STORAGE_KEY = 'corbett_cottage5_custom_name_v2';

export const Accommodations: React.FC<AccommodationsProps> = ({ onSelectAccommodation }) => {
  const [cottage5Name, setCottage5Name] = useState<string>(() => {
    try {
      return localStorage.getItem(COTTAGE5_NAME_STORAGE_KEY) || 'Woodpecker';
    } catch {
      return 'Woodpecker';
    }
  });
  const [isRenamingCottage5, setIsRenamingCottage5] = useState(false);
  const [selectedCottageForModal, setSelectedCottageForModal] = useState<Accommodation | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const saveCottage5Name = (newName: string) => {
    const cleaned = newName.trim() || 'Woodpecker';
    setCottage5Name(cleaned);
    setIsRenamingCottage5(false);
    try {
      localStorage.setItem(COTTAGE5_NAME_STORAGE_KEY, cleaned);
    } catch {
      // Ignore storage errors
    }
  };

  const scrollTrack = (dir: 'left' | 'right') => {
    if (!scrollTrackRef.current) return;
    scrollTrackRef.current.scrollBy({
      left: dir === 'left' ? -360 : 360,
      behavior: 'smooth'
    });
  };

  const amenityStrip = [
    { icon: Trees, label: 'Mango Tree Canopy Shade' },
    { icon: SunMedium, label: 'Private Cottage Balcony' },
    { icon: BedDouble, label: 'Sheesham King Bed' },
    { icon: ShowerHead, label: 'Hot Slate Rain Shower' },
    { icon: Utensils, label: 'Common Dining Area' },
    { icon: Coffee, label: 'Balcony Service (Extra)' }
  ];

  const sampleCottage = ACCOMMODATIONS[0];

  return (
    <section
      id="accommodations"
      className="py-12 sm:py-16 bg-[#F4EFEC] text-[#1F2421] border-t border-[#DED5CA] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header (Video 00:03–00:04) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9B7E4F] block mb-1.5">
              Five Identical Sanctuary Suites · ₹3,250 + 5% GST / Night
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E3F20] tracking-tight">
              The 5 Cottages
            </h2>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scrollTrack('left')}
              className="w-10 h-10 rounded-full border border-[#CFC5B7] bg-white hover:bg-[#1E3F20] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll cottages left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('right')}
              className="w-10 h-10 rounded-full border border-[#CFC5B7] bg-white hover:bg-[#1E3F20] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Scroll cottages right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onSelectAccommodation(ACCOMMODATIONS[0].id)}
              className="px-5 py-2.5 bg-[#9B7E4F] hover:bg-[#856A3E] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Your Stay
            </button>
          </div>
        </div>

        {/* Horizontal Luxury Cottage Cards (Matching Video Frame 00:04 Gallery Aesthetic) */}
        <div
          ref={scrollTrackRef}
          className="flex items-start gap-5 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory"
        >
          {ACCOMMODATIONS.map((cottage) => {
            const isCottage5 = cottage.id === 'tent-woodpecker';
            const displayTitle = isCottage5 ? `${cottage5Name} Cottage` : cottage.name;

            return (
              <div
                key={cottage.id}
                className="min-w-[290px] sm:min-w-[335px] max-w-[355px] shrink-0 snap-start bg-white border border-[#DED5CA] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#9B7E4F] transition-colors"
              >
                {/* Natural-Ratio Photography Frame with Luxury Gradient & Editorial Title */}
                <div className="relative w-full overflow-hidden bg-[#18281A] group">
                  <img
                    src={cottage.image}
                    alt={displayTitle}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Price Lockup on Top Left */}
                  <div className="absolute top-3 left-3 text-white text-[11px] font-semibold tracking-wide bg-black/55 backdrop-blur-xs px-2.5 py-1 tabular-nums">
                    ₹{cottage.pricePerNight.toLocaleString('en-IN')} + 5% GST / night
                  </div>

                  {isCottage5 && (
                    <button
                      type="button"
                      onClick={() => setIsRenamingCottage5(!isRenamingCottage5)}
                      className="absolute top-3 right-3 p-1.5 bg-black/55 hover:bg-black text-white transition-colors cursor-pointer"
                      title="Rename 5th cottage"
                      aria-label="Rename 5th cottage"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Bottom Title Lockup Directly Over Scrim (Video Style) */}
                  <div className="absolute bottom-3.5 left-4 right-4 text-white">
                    <h3 className="font-serif text-2xl font-semibold tracking-tight drop-shadow">
                      {displayTitle}
                    </h3>
                  </div>
                </div>

                {/* Inline Rename Input for Cottage 5 when Active */}
                {isCottage5 && isRenamingCottage5 && (
                  <div className="mx-4 mt-3 flex items-center gap-1.5 bg-[#FAF8F5] border border-[#DED5CA] p-1.5">
                    <input
                      type="text"
                      defaultValue={cottage5Name}
                      id="cottage5-inline-input"
                      placeholder="Cottage 5 name"
                      className="bg-white border border-[#D4CCC1] text-xs px-2 py-1 w-full focus:outline-none focus:border-[#1E3F20]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const val = (document.getElementById('cottage5-inline-input') as HTMLInputElement)?.value;
                        if (val) saveCottage5Name(val);
                      }}
                      className="bg-[#1E3F20] text-white text-[11px] px-2.5 py-1 font-semibold cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                )}

                {/* Uniform Description & Action Row */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <p className="text-xs text-[#4A534D] leading-relaxed line-clamp-3">
                    {cottage.description}
                  </p>

                  <div className="mt-4 pt-3.5 border-t border-[#EFEAE3] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectAccommodation(cottage.id)}
                      className="flex-1 py-2.5 px-3 bg-[#9B7E4F] hover:bg-[#856A3E] text-white text-xs font-semibold uppercase tracking-[0.12em] transition-colors cursor-pointer"
                    >
                      Book Your Stay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCottageForModal(cottage)}
                      className="py-2.5 px-3.5 bg-[#FAF8F5] hover:bg-[#EFE6D5] text-[#1E3F20] text-xs font-semibold border border-[#DED5CA] transition-colors cursor-pointer"
                    >
                      Specs
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Summary + 6-Icon Amenity Strip (Matches Video Frame 00:05) */}
        <div className="mt-6 bg-white border border-[#DED5CA] p-5 sm:p-6 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#EFEAE3]">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3F20] mb-2">
                What makes your stay special:
              </h4>
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-[#3A423D]">
                {sampleCottage.highlights.map((h, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#9B7E4F] shrink-0" />
                    <span>{h}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:max-w-xs shrink-0 text-xs text-[#4A534D] bg-[#FAF8F5] border border-[#E4DDD4] px-4 py-3">
              <strong className="text-[#1E3F20] block mb-0.5">Common Restaurant Dining</strong>
              <span>Meals served in our common dining hall; room service to private balcony costs extra.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {amenityStrip.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 px-3 py-2.5 bg-[#FAF8F5] border border-[#E4DDD4] text-xs font-medium text-[#1F2421]"
                >
                  <IconComp className="w-4 h-4 text-[#1E3F20] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Specifications Modal */}
      {selectedCottageForModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedCottageForModal(null)}
        >
          <div
            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#DED5CA] shadow-2xl text-[#1F2421]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full bg-[#1E3F20] flex justify-center">
              <img
                src={selectedCottageForModal.image}
                alt={selectedCottageForModal.name}
                className="w-full max-h-[50vh] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
              <button
                onClick={() => setSelectedCottageForModal(null)}
                className="absolute top-4 right-4 bg-black/65 hover:bg-black text-white p-2 cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-4 left-6 text-white">
                <span className="text-xs uppercase tracking-wider text-[#EFE6D5]">
                  Cottage 0{selectedCottageForModal.tentNumber} of 05
                </span>
                <h3 className="font-serif text-2xl font-semibold mt-0.5">
                  {selectedCottageForModal.id === 'tent-woodpecker'
                    ? `${cottage5Name} Cottage`
                    : selectedCottageForModal.name}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-3 gap-3 p-3.5 bg-[#FAF8F5] border border-[#E4DDD4] text-xs">
                <div>
                  <span className="text-[#69706B] block">Balcony</span>
                  <strong>Private Balcony</strong>
                </div>
                <div>
                  <span className="text-[#69706B] block">Bedding</span>
                  <strong>{selectedCottageForModal.bed}</strong>
                </div>
                <div>
                  <span className="text-[#69706B] block">Occupancy</span>
                  <strong>{selectedCottageForModal.capacity}</strong>
                </div>
              </div>

              <p className="text-sm text-[#4A534D] leading-relaxed">
                {selectedCottageForModal.description}
              </p>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#1E3F20] mb-2">
                  What makes your stay special:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#3A423D]">
                  {selectedCottageForModal.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#1E3F20] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF8F5] border border-[#E4DDD4] text-xs text-[#4A534D]">
                <strong className="text-[#1F2421] block mb-0.5">Common Restaurant &amp; Balcony Room Service</strong>
                <span>
                  Enjoy fresh meals in our common dining hall; room service delivered to your private balcony costs extra.
                </span>
              </div>

              <div className="pt-4 border-t border-[#EFEAE3] flex items-center justify-between gap-4">
                <div className="tabular-nums">
                  <span className="text-xs text-[#69706B] block">Tariff</span>
                  <strong className="font-serif text-xl text-[#1E3F20]">
                    ₹{selectedCottageForModal.pricePerNight.toLocaleString('en-IN')} + 5% GST{' '}
                    <span className="font-sans text-xs font-normal text-[#69706B]">/ night</span>
                  </strong>
                </div>
                <button
                  onClick={() => {
                    const id = selectedCottageForModal.id;
                    setSelectedCottageForModal(null);
                    onSelectAccommodation(id);
                  }}
                  className="px-6 py-2.5 bg-[#9B7E4F] hover:bg-[#856A3E] text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Book Your Stay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
