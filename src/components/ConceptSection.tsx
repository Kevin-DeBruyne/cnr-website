import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  X,
  Maximize2,
  Plus,
  Trash2,
  MapPin,
  Mountain,
  Compass
} from 'lucide-react';
import {
  mangoHeroImg,
  cottageInteriorImg,
  campfireImg,
  heroImg,
  tentImg
} from '../data/campsiteData';

interface PhotoTile {
  id: string;
  src: string;
  label: string;
  isCustom?: boolean;
}

interface ConceptSectionProps {
  onBookStay?: () => void;
}

const CUSTOM_GALLERY_STORAGE_KEY = 'corbett_retreat_attached_photos_v1';

const DEFAULT_SANCTUARY_PHOTOS: PhotoTile[] = [
  {
    id: 'sanctuary-1',
    src: '/assets/aistudio/624fa254-c20c-4cb6-b3a5-a4b3ba6b6f74_6965957a.jpeg',
    label: 'Stone-Paved Courtyard & Shaded Cottages Under Mango Trees'
  },
  {
    id: 'sanctuary-2',
    src: cottageInteriorImg,
    label: 'Handcrafted King Sheesham Bed & Private Balcony Suite'
  },
  {
    id: 'sanctuary-3',
    src: mangoHeroImg,
    label: 'Heritage Mango Canopy Shading All 5 Cottages'
  },
  {
    id: 'sanctuary-4',
    src: tentImg,
    label: 'Lantern-Lit Cottage Veranda at Dusk'
  },
  {
    id: 'sanctuary-5',
    src: heroImg,
    label: 'Shaded Orchard Grounds & Peaceful Sanctuary Trails'
  },
  {
    id: 'sanctuary-6',
    src: campfireImg,
    label: 'Designated On-Premises Evening Fire Pit (₹1,000 / Session)'
  }
];

export const ConceptSection: React.FC<ConceptSectionProps> = ({ onBookStay }) => {
  const [lightboxImg, setLightboxImg] = useState<PhotoTile | null>(null);
  const [attachedPhotos, setAttachedPhotos] = useState<{
    sanctuary: PhotoTile[];
    experiences: PhotoTile[];
  }>({ sanctuary: [], experiences: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CUSTOM_GALLERY_STORAGE_KEY);
      if (saved) {
        setAttachedPhotos(JSON.parse(saved));
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const persistAttached = (next: { sanctuary: PhotoTile[]; experiences: PhotoTile[] }) => {
    setAttachedPhotos(next);
    try {
      localStorage.setItem(CUSTOM_GALLERY_STORAGE_KEY, JSON.stringify(next));
    } catch {
      console.warn('Could not save attached photo');
    }
  };

  const handleAttachPhotos = (
    group: 'sanctuary' | 'experiences',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        const tile: PhotoTile = {
          id: `custom-${group}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          src,
          label: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ') || 'Site Photograph',
          isCustom: true
        };
        setAttachedPhotos((prev) => {
          const next = {
            ...prev,
            [group]: [...prev[group], tile]
          };
          try {
            localStorage.setItem(CUSTOM_GALLERY_STORAGE_KEY, JSON.stringify(next));
          } catch {
            // Ignore storage errors
          }
          return next;
        });
      };
      reader.readAsDataURL(file);
    });
    e.target.value = '';
  };

  const handleRemoveCustomPhoto = (group: 'sanctuary' | 'experiences', id: string) => {
    const next = {
      ...attachedPhotos,
      [group]: attachedPhotos[group].filter((p) => p.id !== id)
    };
    persistAttached(next);
  };

  const sanctuaryPhotos = [...DEFAULT_SANCTUARY_PHOTOS, ...attachedPhotos.sanctuary];
  const nainitalPhotos = attachedPhotos.experiences;

  return (
    <section id="concept" className="py-10 sm:py-16 bg-[#F4EFEC] text-[#1F2421] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* AREA 1: Architectural Edge-to-Edge Split — Natural-Ratio Photo Mosaic + Charcoal Editorial Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-white border border-[#DED5CA] shadow-sm">
          {/* Left 7 Cols: Unobstructed Edge-to-Edge Site Gallery */}
          <div className="lg:col-span-7 p-2 bg-[#FAF8F5] flex flex-col gap-2">
            {sanctuaryPhotos[0] && (
              <div className="relative group overflow-hidden bg-[#EAE2D8]">
                <button
                  type="button"
                  onClick={() => setLightboxImg(sanctuaryPhotos[0])}
                  className="w-full block text-left cursor-pointer"
                  aria-label={`View ${sanctuaryPhotos[0].label}`}
                >
                  <img
                    src={sanctuaryPhotos[0].src}
                    alt={sanctuaryPhotos[0].label}
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute top-3 right-3 p-1.5 bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            )}

            <div className="columns-2 sm:columns-3 gap-2 space-y-2">
              {sanctuaryPhotos.slice(1).map((photo) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid relative group overflow-hidden bg-[#EAE2D8]"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxImg(photo)}
                    className="w-full block text-left cursor-pointer"
                    aria-label={`View ${photo.label}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-2 right-2 p-1.5 bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </button>
                  {photo.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomPhoto('sanctuary', photo.id)}
                      className="absolute top-2 left-2 p-1.5 bg-rose-700/90 hover:bg-rose-800 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Remove attached photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Deep Charcoal Slate Editorial Panel (#222222 from Video) */}
          <div className="lg:col-span-5 bg-[#222222] text-[#F4EFEC] p-8 sm:p-11 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C7AD82] block mb-2.5">
                Kyari Village · Khichri Riverbank
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
                Immersive Wilderness, Naturally Shaded
              </h2>

              <p className="mt-4 text-sm text-[#D6D2CB] leading-relaxed">
                Our entire sanctuary sits surrounded all around by mature broad-leaf mango trees, creating a remarkably cool, tranquil microclimate beside the Khichri River. Each boutique cottage offers a hand-carved Sheesham king bed, continuous hot water, and its own private balcony.
              </p>

              <div className="mt-7 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#E5E0D8]">
                <div>
                  <span className="text-[#C7AD82] uppercase tracking-wider text-[10px] block mb-1">Stay Tariff</span>
                  <strong className="text-white text-sm font-semibold block">₹3,250 + 5% GST / night</strong>
                  <span className="text-[#B8B4AC]">Private balcony in each cottage</span>
                </div>
                <div>
                  <span className="text-[#C7AD82] uppercase tracking-wider text-[10px] block mb-1">Dining &amp; Evenings</span>
                  <strong className="text-white text-sm font-semibold block">Common Dining Hall</strong>
                  <span className="text-[#B8B4AC]">Balcony service extra · Fire pit ₹1,000</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              {onBookStay ? (
                <button
                  type="button"
                  onClick={onBookStay}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#9B7E4F] hover:bg-[#856A3E] active:scale-95 text-white text-xs font-semibold uppercase tracking-[0.14em] transition-all cursor-pointer"
                >
                  <span>Book Your Stay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <a
                  href="#accommodations"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#9B7E4F] hover:bg-[#856A3E] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-all"
                >
                  <span>Explore Cottages</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              <label
                htmlFor="attach-sanctuary-photos"
                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#C7AD82] hover:text-white cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Site Photos</span>
              </label>
              <input
                id="attach-sanctuary-photos"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleAttachPhotos('sanctuary', e)}
              />
            </div>
          </div>
        </div>

        {/* AREA 2 (Below First Collage): Beauty on Its Own + 2 Hours from Nainital (City of Lakes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-white border border-[#DED5CA] shadow-sm">
          {/* Editorial Story Side */}
          <div
            className={`${
              nainitalPhotos.length > 0 ? 'lg:col-span-5' : 'lg:col-span-7'
            } p-8 sm:p-11 flex flex-col justify-between bg-white`}
          >
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#9B7E4F] block mb-2.5">
                A Retreat on Its Own · Gateway to the Hills
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E3F20] tracking-tight leading-[1.15]">
                Peaceful Sanctuary Beauty, Just 2 Hours From Nainital
              </h3>

              <p className="mt-4 text-sm text-[#4A534D] leading-relaxed">
                Even without leaving the property, Corbett Nature Retreat is a serene world on its own—sun-dappled stone courtyards, flowering hedgerows shaded beneath heritage mango canopies, cool breezes drifting off the Khichri River, and unhurried mornings listening to songbirds from your private balcony.
              </p>

              <p className="mt-3 text-sm text-[#4A534D] leading-relaxed">
                And whenever you wish for a change of altitude, <strong className="text-[#1E3F20] font-semibold">Nainital—the iconic City of Lakes—lies just a scenic 2-hour mountain drive away</strong>, making it effortless to pair forest tranquility with lakeside boating, misty ridge viewpoints, and cool Himalayan promenades.
              </p>
            </div>

            <div className="mt-7 pt-5 border-t border-[#EBE4DB] flex flex-wrap items-center justify-between gap-3">
              <a
                href="#everything-available"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E3F20] hover:bg-[#142D16] text-white text-xs font-semibold uppercase tracking-[0.14em] transition-colors"
              >
                <span>See All Experiences</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <label
                htmlFor="attach-experience-photos"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#F4EFEC] hover:bg-[#EFE6D5] border border-[#DED5CA] text-[#1E3F20] text-xs font-semibold cursor-pointer transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>
                  {nainitalPhotos.length === 0 ? 'Add Nainital Photos' : 'Add More Nainital Photos'}
                </span>
              </label>
              <input
                id="attach-experience-photos"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleAttachPhotos('experiences', e)}
              />
            </div>
          </div>

          {/* Right Side: Refined Editorial Destination Highlights OR Natural-Ratio Nainital Photos Once Attached */}
          {nainitalPhotos.length === 0 ? (
            <div className="lg:col-span-5 bg-[#1E3F20] text-[#F4EFEC] p-8 sm:p-11 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#D8C5A3] block mb-4">
                  Two Landscapes · One Unhurried Trip
                </span>

                <div className="space-y-5">
                  <div className="pb-4 border-b border-white/15 flex items-start gap-3.5">
                    <Mountain className="w-5 h-5 text-[#D8C5A3] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-white">
                        2 Hours to Nainital (City of Lakes)
                      </h4>
                      <p className="text-xs text-[#CBD6CD] mt-1 leading-relaxed">
                        Scenic winding ascent past Kaladhungi waterfalls straight to emerald Naini Lake, Mall Road, and Snow View Point.
                      </p>
                    </div>
                  </div>

                  <div className="pb-4 border-b border-white/15 flex items-start gap-3.5">
                    <Compass className="w-5 h-5 text-[#D8C5A3] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-white">
                        Forest Safaris &amp; River Stillness
                      </h4>
                      <p className="text-xs text-[#CBD6CD] mt-1 leading-relaxed">
                        3-hour 4x4 Gypsy &amp; Dhikala Canter safaris, ₹500 Khichri river walks, free bird watching, and complimentary riverbank meditation.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-[#D8C5A3] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-white">
                        Village Homestead Hospitality
                      </h4>
                      <p className="text-xs text-[#CBD6CD] mt-1 leading-relaxed">
                        Share a traditional clay-chulha Kumaoni meal with local Kyari village hosts (₹850/person) or visit Xtreme Zone nearby.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 text-[11px] text-[#CBD6CD] flex items-center justify-between gap-2">
                <span>Twin Destination: Corbett Wilderness + Nainital Lakes</span>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-7 p-2.5 bg-[#FAF8F5] flex flex-col justify-between gap-2 border-t lg:border-t-0 lg:border-l border-[#E4DDD4]">
              <div className="columns-2 sm:columns-3 gap-2.5 space-y-2.5">
                {nainitalPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="break-inside-avoid relative group overflow-hidden bg-[#EAE2D8]"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxImg(photo)}
                      className="w-full block text-left cursor-pointer"
                      aria-label={`View ${photo.label}`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.label}
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="absolute top-2 right-2 p-1.5 bg-black/55 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveCustomPhoto('experiences', photo.id)}
                      className="absolute top-2 left-2 p-1.5 bg-rose-700/90 hover:bg-rose-800 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Remove Nainital photo"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Photo Inspection Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#1C1E1C] overflow-hidden border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-3 right-3 z-10 p-2 bg-black/70 text-white hover:bg-black cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImg.src}
              alt={lightboxImg.label}
              className="w-full max-h-[78vh] object-contain bg-black"
            />
            <div className="p-4 text-sm font-medium text-[#F4EFEC] text-center">
              {lightboxImg.label}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
