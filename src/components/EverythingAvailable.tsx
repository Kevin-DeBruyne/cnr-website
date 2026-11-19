import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  X,
  ArrowRight,
  ShieldAlert,
  Car,
  Glasses
} from 'lucide-react';
import { RETREAT_ACTIVITIES } from '../data/campsiteData';
import { ActivityItem } from '../types';

interface EverythingAvailableProps {
  onBookActivity: (activity?: ActivityItem) => void;
}

export const EverythingAvailable: React.FC<EverythingAvailableProps> = ({ onBookActivity }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [activePhotoTab, setActivePhotoTab] = useState<'location' | 'hosts' | 'guests'>('location');
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: 'all', label: 'All Available' },
    { id: 'safari-wildlife', label: 'Safaris (3 Hrs)' },
    { id: 'river-trails', label: 'Village Trails & Birding' },
    { id: 'adventure', label: 'Xtreme Zone' },
    { id: 'evenings', label: 'On-Premises Bonfire' },
    { id: 'wellness-culture', label: 'Feast & Meditation' }
  ];

  const filtered = RETREAT_ACTIVITIES.filter(
    (act) => selectedCategory === 'all' || act.category === selectedCategory
  );

  const scrollTrack = (dir: 'left' | 'right') => {
    if (!scrollTrackRef.current) return;
    scrollTrackRef.current.scrollBy({
      left: dir === 'left' ? -360 : 360,
      behavior: 'smooth'
    });
  };

  const openDetails = (act: ActivityItem) => {
    setSelectedActivity(act);
    setActivePhotoTab('location');
  };

  return (
    <section
      id="everything-available"
      className="py-12 sm:py-16 bg-gradient-to-b from-[#1A351D] to-[#132615] text-[#F4EFEC] border-t border-[#142D16] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Filter Bar (Matches Atmospheric Dark Forest-Green Video Band 00:05–00:07) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D8C5A3] block mb-1.5">
              Safaris · Village Trails · Xtreme Zone · Village Home Feast · Bonfire
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Everything Available
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#9B7E4F] text-white border-[#9B7E4F]'
                        : 'bg-white/5 text-[#E6ECE7] border-white/15 hover:bg-white/10 hover:border-[#D8C5A3]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => scrollTrack('left')}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-[#9B7E4F] hover:border-[#9B7E4F] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTrack('right')}
                className="w-9 h-9 rounded-full border border-white/20 bg-white/10 hover:bg-[#9B7E4F] hover:border-[#9B7E4F] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Uniform 4:3 Gallery Cards on Deep Forest Backdrop */}
        <div
          ref={scrollTrackRef}
          className="flex items-stretch gap-5 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory"
        >
          {filtered.map((act) => (
            <div
              key={act.id}
              className="min-w-[290px] sm:min-w-[330px] max-w-[345px] shrink-0 snap-start bg-[#1D3920] border border-white/15 overflow-hidden flex flex-col justify-between hover:border-[#D8C5A3] transition-colors shadow-lg"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#122214] group">
                  <img
                    src={act.defaultPhotos.locationImg}
                    alt={act.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 bg-[#1E3F20]/90 text-[#EFE6D5] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 border border-white/15">
                    {act.categoryLabel}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold drop-shadow">
                    {act.defaultPrice}
                  </div>
                </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-[#CBD6CD] mb-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#D8C5A3]" />
                      <span>{act.duration}</span>
                      <span aria-hidden="true">&middot;</span>
                      <span className="truncate">{act.timing}</span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-white leading-snug line-clamp-1">
                      {act.title}
                    </h3>

                    <p className="mt-2 text-xs text-[#D6E0D7] leading-relaxed line-clamp-3">
                      {act.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    onClick={() => openDetails(act)}
                    className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white text-white hover:text-[#1E3F20] border border-white/20 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Photos &amp; Details
                  </button>
                  <button
                    onClick={() => onBookActivity(act)}
                    className="py-2.5 px-4 bg-[#9B7E4F] hover:bg-[#856A3E] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              </div>
          ))}
        </div>

        {/* Frosted Deep Forest Policy Summary Strip */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#E6ECE7]">
          <div className="flex items-start gap-2.5 p-4 bg-white/5 border border-white/15">
            <Car className="w-4 h-4 text-[#D8C5A3] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Safari Pickup &amp; 3-Hour Rule</strong>
              Jeep safari is ₹8,200 (pickup only when booked 72 hrs ahead); Canter is ₹2,250/person (boarding at gate). All safaris are 3 hrs.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-4 bg-white/5 border border-white/15">
            <Glasses className="w-4 h-4 text-[#D8C5A3] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Gate Gear Rental &amp; Birding</strong>
              Safari binoculars/hats are rented at the zone gate at govt-fixed rates. Self-guided birding is free; guide is ₹1,500/trip.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-4 bg-white/5 border border-white/15">
            <ShieldAlert className="w-4 h-4 text-[#D8C5A3] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-0.5">Conservation &amp; Fire Pit Rules</strong>
              Forest walking and riverside bonfires are prohibited. Walks follow village trails; bonfire pit is on-premises (₹1,000).
            </div>
          </div>
        </div>
      </div>

      {/* Activity Details & Multi-Photo Lightbox Modal */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#DED5CA] shadow-2xl text-[#1F2421]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image + 3 Perspective Switcher (Uncropped Natural Ratio) */}
            <div className="relative w-full bg-[#1C1E1C] flex justify-center">
              <img
                src={
                  activePhotoTab === 'location'
                    ? selectedActivity.defaultPhotos.locationImg
                    : activePhotoTab === 'hosts'
                    ? selectedActivity.defaultPhotos.hostsImg
                    : selectedActivity.defaultPhotos.guestsImg
                }
                alt={selectedActivity.title}
                className="w-full max-h-[65vh] object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

              <button
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 bg-black/65 hover:bg-black text-white p-2 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute top-4 left-4 flex items-center gap-1.5">
                {(['location', 'hosts', 'guests'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePhotoTab(tab)}
                    className={`px-3 py-1 text-xs font-semibold capitalize cursor-pointer ${
                      activePhotoTab === tab
                        ? 'bg-[#9B7E4F] text-white'
                        : 'bg-black/60 text-white/85 hover:bg-black/80'
                    }`}
                  >
                    {tab === 'location' ? 'The Location' : tab === 'hosts' ? 'Our Hosts' : 'Guest Moments'}
                  </button>
                ))}
              </div>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-wider text-[#EFE6D5] block">
                  {selectedActivity.categoryLabel} · {selectedActivity.duration}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mt-0.5">
                  {selectedActivity.title}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#EFEAE3]">
                <div className="text-xs text-[#69706B]">
                  <strong>Timing:</strong> {selectedActivity.timing} · <strong>Spot:</strong> {selectedActivity.locationTip}
                </div>
                <div className="font-serif text-xl font-semibold text-[#1E3F20]">
                  {selectedActivity.defaultPrice}
                </div>
              </div>

              <p className="text-sm text-[#3A423D] leading-relaxed">
                {selectedActivity.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#FAF8F5] border border-[#E4DDD4] space-y-2">
                  <strong className="text-xs uppercase tracking-wider text-[#4A534D] block">Highlights</strong>
                  {selectedActivity.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#3A423D]">
                      <Check className="w-3.5 h-3.5 text-[#1E3F20] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E4DDD4] space-y-2">
                  <strong className="text-xs uppercase tracking-wider text-[#4A534D] block">What&apos;s Included</strong>
                  {selectedActivity.included.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#3A423D]">
                      <Check className="w-3.5 h-3.5 text-[#9B7E4F] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFEAE3] flex justify-end gap-3">
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#5A625C] hover:text-[#1F2421] cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const act = selectedActivity;
                    setSelectedActivity(null);
                    onBookActivity(act);
                  }}
                  className="px-6 py-2.5 bg-[#9B7E4F] hover:bg-[#856A3E] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                >
                  <span>Include in Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
