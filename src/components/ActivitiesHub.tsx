import React, { useState, useEffect } from 'react';
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Check,
  Camera,
  Upload,
  RotateCcw,
  Edit3,
  CheckCircle2,
  X,
  Flame,
  Binoculars,
  Footprints,
  Sun,
  ShieldCheck,
  Search,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { ActivityItem } from '../types';
import { RETREAT_ACTIVITIES } from '../data/campsiteData';

interface ActivitiesHubProps {
  onBookActivity?: (activityTitle: string) => void;
}

type PhotoPerspective = 'location' | 'hosts' | 'guests';

export const ActivitiesHub: React.FC<ActivitiesHubProps> = ({ onBookActivity }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active photo perspective per activity: activityId -> 'location' | 'hosts' | 'guests'
  const [activePerspective, setActivePerspective] = useState<Record<string, PhotoPerspective>>({});

  // Custom uploaded photos stored in localStorage: activityId -> { location?: string; hosts?: string; guests?: string }
  const [customPhotos, setCustomPhotos] = useState<Record<string, Partial<Record<PhotoPerspective, string>>>>({});

  // Custom prices stored in localStorage: activityId -> string
  const [customPrices, setCustomPrices] = useState<Record<string, string>>({});
  
  // Currently editing price for activityId
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPriceInput, setTempPriceInput] = useState('');

  // Lightbox modal for previewing high-res image
  const [lightboxImage, setLightboxImage] = useState<{ src: string; caption: string; title: string } | null>(null);

  // Load custom photos and prices from localStorage
  useEffect(() => {
    try {
      const savedPhotos = localStorage.getItem('corbett_activity_custom_photos');
      if (savedPhotos) {
        setCustomPhotos(JSON.parse(savedPhotos));
      }
      const savedPrices = localStorage.getItem('corbett_activity_custom_prices');
      if (savedPrices) {
        setCustomPrices(JSON.parse(savedPrices));
      }
    } catch (err) {
      console.warn('Could not read activity preferences from localStorage', err);
    }
  }, []);

  const handlePerspectiveChange = (activityId: string, perspective: PhotoPerspective) => {
    setActivePerspective(prev => ({ ...prev, [activityId]: perspective }));
  };

  const handlePhotoUpload = (activityId: string, perspective: PhotoPerspective, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        const dataUrl = event.target.result;
        setCustomPhotos(prev => {
          const currentActivityPhotos = prev[activityId] || {};
          const updated = {
            ...prev,
            [activityId]: {
              ...currentActivityPhotos,
              [perspective]: dataUrl
            }
          };
          try {
            localStorage.setItem('corbett_activity_custom_photos', JSON.stringify(updated));
          } catch (storageErr) {
            console.warn('LocalStorage error saving activity photo', storageErr);
          }
          return updated;
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetPhoto = (activityId: string, perspective: PhotoPerspective) => {
    setCustomPhotos(prev => {
      if (!prev[activityId]) return prev;
      const current = { ...prev[activityId] };
      delete current[perspective];
      const updated = { ...prev, [activityId]: current };
      try {
        localStorage.setItem('corbett_activity_custom_photos', JSON.stringify(updated));
      } catch (err) {
        console.warn(err);
      }
      return updated;
    });
  };

  const handleStartEditPrice = (activityId: string, currentPrice: string) => {
    setEditingPriceId(activityId);
    setTempPriceInput(currentPrice);
  };

  const handleSavePrice = (activityId: string) => {
    const trimmed = tempPriceInput.trim();
    if (trimmed) {
      setCustomPrices(prev => {
        const updated = { ...prev, [activityId]: trimmed };
        try {
          localStorage.setItem('corbett_activity_custom_prices', JSON.stringify(updated));
        } catch (err) {
          console.warn(err);
        }
        return updated;
      });
    }
    setEditingPriceId(null);
  };

  const categories = [
    { id: 'all', label: 'All Activities' },
    { id: 'river-trails', label: 'River & Village Trails' },
    { id: 'safari-wildlife', label: 'Wildlife & Safaris' },
    { id: 'adventure', label: 'Xtreme Zone & Adventure' },
    { id: 'evenings', label: 'Evening & Bonfire' },
    { id: 'wellness-culture', label: 'Culture & Wellness' }
  ];

  const filteredActivities = RETREAT_ACTIVITIES.filter(act => {
    const matchesCat = selectedCategory === 'all' || act.category === selectedCategory;
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.locationTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="activities-hub" className="py-24 bg-stone-950/35 backdrop-blur-xs text-stone-100 border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Master Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-stone-800 pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Complete Activities Directory</span>
              <span className="text-stone-600">&middot;</span>
              <span>Led by Resident Naturalists & Hosts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Retreat Activities & Experiences
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
              Everything our sanctuary offers gathered in one dedicated place. Explore pristine riverbank walks, private core tiger safaris, fireside folklore, live barbecue evenings, and village walks. View real moments across three perspectives: <strong>the location</strong>, <strong>our hosts enjoying</strong>, and <strong>our guests making lifelong memories</strong>.
            </p>
          </div>

          {/* Quick Stats / Host Contact Info */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 text-xs">
            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-stone-400 block text-[11px]">8 Curated Wilderness Activities</span>
                <span className="text-white font-semibold">Customizable Pricing & Timing</span>
              </div>
            </div>
            <a
              href="tel:+918449506167"
              className="px-4 py-2.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-emerald-300 hover:text-white transition-all flex items-center gap-2 font-medium"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Camp Host: +91 84495 06167</span>
            </a>
          </div>
        </div>

        {/* Controls Bar: Category Filter Tabs & Search */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-500 text-stone-950 shadow-md font-bold'
                      : 'bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-stone-950" />}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search activities, trails, safari..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Informative Host Banner: Upload Your Moments */}
        <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-stone-850 to-stone-900 border border-amber-700/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">
                Host & Guest Visual Journal
              </div>
              <div className="text-stone-300 text-xs mt-0.5">
                Every activity card below has <strong>3 photo slots</strong>: <em>The Location</em>, <em>Us The Hosts Enjoying</em>, and <em>Guests Enjoying</em>. You can click <strong>"Upload Photo"</strong> or <strong>"Edit Price"</strong> anytime to update your real photos and prices directly!
              </div>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-amber-300/80 text-[11px] bg-amber-950/80 px-3 py-1.5 rounded-lg border border-amber-600/30">
              Auto-saved to your browser
            </span>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredActivities.map((act) => {
            const currentPerspective = activePerspective[act.id] || 'location';
            const userUploadedPhotos = customPhotos[act.id] || {};
            
            // Determine active image and caption based on chosen perspective
            let activeImg = act.defaultPhotos.locationImg;
            let activeCaption = act.defaultPhotos.locationCaption;
            let perspectiveLabel = '1. The Location';
            
            if (currentPerspective === 'hosts') {
              activeImg = userUploadedPhotos.hosts || act.defaultPhotos.hostsImg;
              activeCaption = act.defaultPhotos.hostsCaption;
              perspectiveLabel = '2. Us The Hosts Enjoying';
            } else if (currentPerspective === 'guests') {
              activeImg = userUploadedPhotos.guests || act.defaultPhotos.guestsImg;
              activeCaption = act.defaultPhotos.guestsCaption;
              perspectiveLabel = '3. Guests Enjoying';
            } else {
              activeImg = userUploadedPhotos.location || act.defaultPhotos.locationImg;
              activeCaption = act.defaultPhotos.locationCaption;
              perspectiveLabel = '1. The Location';
            }

            const isCustomPhoto = Boolean(userUploadedPhotos[currentPerspective]);
            const currentPrice = customPrices[act.id] || act.defaultPrice;
            const isEditingThisPrice = editingPriceId === act.id;

            return (
              <div
                key={act.id}
                className="bg-stone-950/80 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Visual Header / 3-Perspective Carousel */}
                  <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden group">
                    <img
                      src={activeImg}
                      alt={`${act.title} - ${perspectiveLabel}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                      onClick={() => setLightboxImage({ src: activeImg, caption: activeCaption, title: act.title })}
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Protection Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

                    {/* Perspective Selector Tabs Overlaid on Photo */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <div className="flex items-center gap-1 bg-stone-950/85 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-lg text-[11px]">
                        <button
                          onClick={() => handlePerspectiveChange(act.id, 'location')}
                          className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                            currentPerspective === 'location'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-stone-300 hover:text-white'
                          }`}
                          title="View location photos"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>Location</span>
                          {userUploadedPhotos.location && <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />}
                        </button>

                        <button
                          onClick={() => handlePerspectiveChange(act.id, 'hosts')}
                          className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                            currentPerspective === 'hosts'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'text-stone-300 hover:text-white'
                          }`}
                          title="View hosts enjoying"
                        >
                          <Users className="w-3 h-3" />
                          <span>Hosts</span>
                          {userUploadedPhotos.hosts && <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />}
                        </button>

                        <button
                          onClick={() => handlePerspectiveChange(act.id, 'guests')}
                          className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                            currentPerspective === 'guests'
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'text-stone-300 hover:text-white'
                          }`}
                          title="View guests enjoying"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>Guests</span>
                          {userUploadedPhotos.guests && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300" />}
                        </button>
                      </div>

                      {/* Photo Upload / Reset Actions for current perspective */}
                      <div className="flex items-center gap-1.5">
                        <label className="cursor-pointer bg-stone-950/85 hover:bg-emerald-700 text-stone-200 hover:text-white backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 shadow-lg text-[11px] font-medium flex items-center gap-1 transition-all">
                          <Upload className="w-3 h-3" />
                          <span className="hidden sm:inline">Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(act.id, currentPerspective, e)}
                          />
                        </label>

                        {isCustomPhoto && (
                          <button
                            onClick={() => handleResetPhoto(act.id, currentPerspective)}
                            className="bg-stone-950/85 hover:bg-rose-900/80 text-stone-300 hover:text-white backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-lg text-[11px] transition-all"
                            title="Reset to default photo"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bottom Caption Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-stone-200 z-10 pointer-events-none">
                      <div className="bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[11px] font-medium truncate max-w-[85%]">
                        <span className="text-emerald-400 font-semibold mr-1.5">[{perspectiveLabel}]:</span>
                        <span>{activeCaption}</span>
                      </div>
                      <span className="text-[10px] text-stone-400 bg-stone-950/80 px-2 py-1 rounded-md border border-white/10 shrink-0">
                        Click to enlarge
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 sm:p-7">
                    {/* Header meta & Price Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800/50">
                            {act.categoryLabel}
                          </span>
                          <span className="text-xs text-stone-400 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-stone-500" />
                            <span>{act.duration}</span>
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                          {act.title}
                        </h3>
                        <p className="text-xs text-stone-400 mt-0.5 font-medium">
                          {act.tagline}
                        </p>
                      </div>

                      {/* Price Display & Inline Editor */}
                      <div className="bg-stone-900 border border-stone-800 rounded-xl p-2.5 sm:text-right shrink-0">
                        <div className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">
                          Activity Tariff
                        </div>
                        {isEditingThisPrice ? (
                          <div className="flex items-center gap-1.5 mt-1">
                            <input
                              type="text"
                              value={tempPriceInput}
                              onChange={(e) => setTempPriceInput(e.target.value)}
                              className="bg-stone-950 border border-emerald-500 text-white text-xs px-2 py-1 rounded-md w-28 focus:outline-none"
                              placeholder="e.g. ₹500 / person"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSavePrice(act.id)}
                              className="p-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white"
                              title="Save price"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingPriceId(null)}
                              className="p-1 rounded-md text-stone-400 hover:text-white"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                            <span className="text-sm font-bold text-amber-300 font-mono">
                              {currentPrice}
                            </span>
                            <button
                              onClick={() => handleStartEditPrice(act.id, currentPrice)}
                              className="text-stone-400 hover:text-emerald-400 p-0.5 transition-colors"
                              title="Click to edit activity price"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-5">
                      {act.description}
                    </p>

                    {/* Timing & Location Tip */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300 mb-5 bg-stone-900/60 p-3 rounded-xl border border-stone-850">
                      <div className="flex items-center gap-2">
                        <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span><strong>Timing:</strong> {act.timing}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate"><strong>Spot:</strong> {act.locationTip}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 mb-5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1">
                        What Makes It Special:
                      </span>
                      {act.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Inclusions */}
                    <div className="pt-4 border-t border-stone-850">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                        Included In Activity:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {act.included.map((inc, i) => (
                          <span
                            key={i}
                            className="text-[11px] bg-stone-900 text-stone-300 px-2.5 py-1 rounded-md border border-stone-800"
                          >
                            &bull; {inc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Card Bar */}
                <div className="p-6 sm:p-7 pt-0 border-t border-transparent">
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-850">
                    <span className="text-xs text-stone-400">
                      Custom group slots available
                    </span>
                    <button
                      onClick={() => onBookActivity ? onBookActivity(act.title) : window.location.assign('tel:+918449506167')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 shrink-0"
                    >
                      <span>Inquire / Reserve</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Concierge Banner */}
        <div className="mt-16 bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 rounded-3xl border border-stone-800 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400">
              Tailored Wilderness Itinerary
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Have Specific Activities or Group Plans in Mind?
            </h3>
            <p className="text-sm text-stone-300 mt-2 leading-relaxed">
              Whether you are an avid birdwatcher seeking specific Himalayan raptors, a family wanting evening bonfire barbecues and guided nature walks, or a photographer planning dawn tiger tracking, our camp hosts will prepare a customized daily schedule for your stay.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/918449506167?text=Hi%20Corbett%20Nature%20Retreat%2C%20I%20would%20like%20to%20know%20more%20about%20the%20activities%20provided%20at%20the%20property."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>WhatsApp Concierge</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+918449506167"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-stone-700"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>+91 84495 06167</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Enlarge Image */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 sm:p-5 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold text-sm sm:text-base font-display">
                  {lightboxImage.title}
                </h4>
                <p className="text-stone-400 text-xs mt-0.5">
                  {lightboxImage.caption}
                </p>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
