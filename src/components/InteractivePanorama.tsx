import React, { useState, useRef } from 'react';
import {
  ChevronDown,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  Compass,
  Info,
  X
} from 'lucide-react';
import {
  mangoHeroImg,
  cottageInteriorImg,
  heroImg,
  tentImg,
  riverXtremeImg,
  campfireImg,
  safariImg,
  villageFeastImg,
  wildlifeBirdsImg
} from '../data/campsiteData';

interface Hotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  label: string;
  detail: string;
}

interface PanoramaScene {
  id: string;
  label: string;
  shortTitle: string;
  caption: string;
  image: string;
  hotspots: Hotspot[];
}

const PANORAMA_SCENES: PanoramaScene[] = [
  {
    id: 'mango-exterior',
    label: 'Cottage Exterior & Mango Canopy',
    shortTitle: 'Mango Shade Exterior',
    caption: 'All 5 luxury cottages sit naturally shaded beneath heritage mango trees all around.',
    image: mangoHeroImg,
    hotspots: [
      {
        id: 'hs-canopy',
        xPercent: 28,
        yPercent: 26,
        label: 'Heritage Mango Tree Canopy',
        detail: 'Mature broad-leaf mango trees surround every cottage, keeping porches naturally cool all day.'
      },
      {
        id: 'hs-porch',
        xPercent: 56,
        yPercent: 64,
        label: 'Private Cottage Balcony',
        detail: 'Each cottage includes a private balcony overlooking the shaded mango orchard and foothills.'
      },
      {
        id: 'hs-tariff',
        xPercent: 78,
        yPercent: 50,
        label: '₹3,250 + 5% GST / Night',
        detail: 'Identical suite comfort across all 5 bird-named cottages with en-suite slate bath & continuous hot water.'
      }
    ]
  },
  {
    id: 'cottage-interior',
    label: 'Private Cottage Suite & Balcony',
    shortTitle: 'Cottage Suite',
    caption: 'Hand-carved Sheesham king bed opening straight onto your private balcony.',
    image: cottageInteriorImg,
    hotspots: [
      {
        id: 'hs-bed',
        xPercent: 45,
        yPercent: 58,
        label: 'King-Size Sheesham Bed',
        detail: 'Plush cotton linens, woolen quilts, bedside reading lamps, and universal charging ports.'
      },
      {
        id: 'hs-balcony-door',
        xPercent: 74,
        yPercent: 42,
        label: 'Private Balcony & Room Service',
        detail: 'Step out onto your private orchard balcony. Meals served at the common restaurant (balcony room service costs extra).'
      },
      {
        id: 'hs-mesh',
        xPercent: 22,
        yPercent: 40,
        label: '100% Insect-Screened Mesh',
        detail: 'Let the cool mango-orchard breeze flow through while keeping insects outside.'
      }
    ]
  },
  {
    id: 'village-feast',
    label: 'Kumaoni Village Home Feast',
    shortTitle: 'Village Home Feast',
    caption: 'Walk to a Kumaoni farming homestead where a family cooks a traditional meal on a clay chulha.',
    image: villageFeastImg,
    hotspots: [
      {
        id: 'hs-chulha',
        xPercent: 34,
        yPercent: 56,
        label: 'Clay Chulha Cooking',
        detail: 'Watch hot Mandua rotis, Bhatt ki Churkani, and Aloo ke Gutke prepared fresh in an ancestral kitchen.'
      },
      {
        id: 'hs-hospitality',
        xPercent: 66,
        yPercent: 48,
        label: 'Hosted by Local Families (₹850/pax)',
        detail: 'Converse warmly with village elders over spiced Pahadi tea while directly supporting local rural households.'
      }
    ]
  },
  {
    id: 'khichri-xtreme',
    label: 'Khichri River & Xtreme Zone',
    shortTitle: 'River Walk & Xtreme Zone',
    caption: 'Dawn Khichri River walks (₹500/person) alongside thrilling Xtreme Zone ziplines & sky courses.',
    image: riverXtremeImg,
    hotspots: [
      {
        id: 'hs-riverwalk',
        xPercent: 38,
        yPercent: 72,
        label: 'Khichri River Walk (₹500 / person)',
        detail: 'Guided pebble riverbank & village trail walks looking for kingfishers, otters, and fresh animal pugmarks.'
      },
      {
        id: 'hs-zipline',
        xPercent: 68,
        yPercent: 28,
        label: 'Xtreme Zone Adventure Park',
        detail: 'Soar on scenic valley ziplines, tackle the Burma bridge, rope courses, and climbing wall with certified marshals.'
      }
    ]
  },
  {
    id: 'gypsy-safari',
    label: '3-Hour 4x4 Gypsy & Canter Safaris',
    shortTitle: '3-Hour Wildlife Safari',
    caption: 'Explore Bijrani, Jhirna, Dhela (₹8,200/Gypsy) or Dhikala Canter (₹2,250/person).',
    image: safariImg,
    hotspots: [
      {
        id: 'hs-pickup',
        xPercent: 48,
        yPercent: 55,
        label: '72-Hr Advance Jeep Pickup',
        detail: 'Door-to-door camp pickup & drop is exclusively for 4x4 Jeep safaris booked 72+ hrs ahead (Canters board at gate).'
      },
      {
        id: 'hs-gate-gear',
        xPercent: 75,
        yPercent: 42,
        label: 'Gate Gear Rentals',
        detail: 'Binoculars, sun hats, and field optics can be rented at the safari gate at government-fixed prices.'
      }
    ]
  },
  {
    id: 'bonfire-pit',
    label: 'On-Premises Evening Bonfire',
    shortTitle: 'On-Premises Bonfire',
    caption: 'Safe circular stone fire pit inside the retreat premises (₹1,000 / session).',
    image: campfireImg,
    hotspots: [
      {
        id: 'hs-firepit',
        xPercent: 50,
        yPercent: 62,
        label: 'Designated Fire Pit (₹1,000)',
        detail: 'Located strictly inside camp premises since riverside fires are prohibited by forest conservation laws.'
      }
    ]
  },
  {
    id: 'bird-wildlife',
    label: 'Orchard Birdlife & Village Trails',
    shortTitle: 'Birding & Wildlife',
    caption: 'Self-guided bird watching is Free; dedicated expert guide available at ₹1,500 / trip.',
    image: wildlifeBirdsImg,
    hotspots: [
      {
        id: 'hs-birding',
        xPercent: 46,
        yPercent: 46,
        label: 'Free Self-Guided or ₹1,500 Guided',
        detail: 'Walk village trails and the mango orchard free on your own (reserve forest entry on foot is prohibited).'
      }
    ]
  },
  {
    id: 'orchard-sanctuary',
    label: 'Morning Mist Along Orchard Grounds',
    shortTitle: 'Orchard Grounds',
    caption: 'Peaceful landscaped pathways winding past mature mango trunks and sitting nooks.',
    image: heroImg,
    hotspots: [
      {
        id: 'hs-pathways',
        xPercent: 52,
        yPercent: 60,
        label: 'Quiet Zero-Traffic Grounds',
        detail: 'No loud amplified music or urban honking—only birdsong and breezes off the Kumaon hills.'
      }
    ]
  },
  {
    id: 'twilight-veranda',
    label: 'Golden Hour Cottage Verandas',
    shortTitle: 'Golden Hour Veranda',
    caption: 'Warm lantern light as dusk falls across Kyari Village and the Khichri Valley.',
    image: tentImg,
    hotspots: [
      {
        id: 'hs-dining-hall',
        xPercent: 42,
        yPercent: 55,
        label: 'Common Restaurant & Tea Station',
        detail: 'Enjoy fresh Kumaoni thalis in the common dining hall or brew complimentary herbal tea in-cottage.'
      }
    ]
  }
];

export const InteractivePanorama: React.FC = () => {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);

  const scene = PANORAMA_SCENES[sceneIdx];

  const handleSceneChange = (idx: number) => {
    setSceneIdx(idx);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setActiveHotspot(null);
  };

  const handleZoom = (nextZoom: number) => {
    const clamped = Math.max(1, Math.min(2.2, nextZoom));
    setZoom(clamped);
    if (clamped === 1) {
      setPan({ x: 0, y: 0 });
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const maxOffsetX = zoom > 1 ? (zoom - 1) * 260 : 60;
    const maxOffsetY = zoom > 1 ? (zoom - 1) * 140 : 20;
    setPan({
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, dragStartRef.current.panX + dx)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, dragStartRef.current.panY + dy))
    });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  return (
    <section
      id="panorama-gallery"
      className="py-12 sm:py-16 bg-[#F4EFEC] text-[#1F2421] border-t border-[#DED5CA] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Heading + Dropdown Scene Selector (Matches Video 00:07–00:09) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7E4F] block mb-1">
              360° Retreat &amp; Cottage Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E3F20] tracking-tight">
              Step Inside &amp; Inspect Every Detail
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <label htmlFor="panorama-scene-select" className="text-xs font-medium text-[#4A534D] whitespace-nowrap">
              View Scene:
            </label>
            <div className="relative">
              <select
                id="panorama-scene-select"
                value={sceneIdx}
                onChange={(e) => handleSceneChange(Number(e.target.value))}
                className="appearance-none bg-white border border-[#DED5CA] hover:border-[#9B7E4F] rounded-sm pl-3.5 pr-9 py-2 text-xs sm:text-sm font-medium text-[#1F2421] focus:outline-none focus:border-[#1E3F20] cursor-pointer shadow-sm"
              >
                {PANORAMA_SCENES.map((s, idx) => (
                  <option key={s.id} value={idx}>
                    {String(idx + 1).padStart(2, '0')} · {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-[#4A534D] pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {/* Interactive Panoramic Canvas */}
        <div
          className={`relative w-full h-[360px] sm:h-[460px] rounded-sm overflow-hidden border border-[#DED5CA] bg-[#1F2421] shadow-md select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Transformed Viewport Image + Hotspots Layer */}
          <div
            className="relative w-full h-full transition-transform duration-150 ease-out"
            style={{
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={scene.image}
              alt={scene.label}
              draggable={false}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 pointer-events-none" />

            {/* Clickable Amenity Hotspot Pins */}
            {scene.hotspots.map((hs) => {
              const isSelected = activeHotspot?.id === hs.id;
              return (
                <button
                  key={hs.id}
                  type="button"
                  onClick={() => setActiveHotspot(isSelected ? null : hs)}
                  style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-xs font-semibold shadow-lg transition-all border ${
                    isSelected
                      ? 'bg-[#1E3F20] text-white border-[#9B7E4F] scale-105 z-20'
                      : 'bg-white/95 text-[#1F2421] border-[#DED5CA] hover:bg-[#9B7E4F] hover:text-white z-10'
                  }`}
                >
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{hs.label}</span>
                </button>
              );
            })}
          </div>

          {/* Top Left Drag / Scene Badge */}
          <div className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-sm text-[#1F2421] border border-[#DED5CA] px-3 py-1.5 rounded-sm text-xs font-medium flex items-center gap-2 shadow-sm pointer-events-none">
            <Compass className="w-3.5 h-3.5 text-[#1E3F20]" />
            <span>{scene.label}</span>
          </div>

          {/* Top Right Zoom Controls */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-[#DED5CA] rounded-sm p-1 shadow-sm">
            <button
              type="button"
              onClick={() => handleZoom(zoom - 0.5)}
              disabled={zoom <= 1}
              className="p-1.5 text-[#1F2421] hover:bg-[#F4EFEC] disabled:opacity-40 rounded-sm transition-colors"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 text-xs font-mono font-semibold text-[#1E3F20] tabular-nums">
              {zoom.toFixed(1)}x
            </span>
            <button
              type="button"
              onClick={() => handleZoom(zoom + 0.5)}
              disabled={zoom >= 2.2}
              className="p-1.5 text-[#1F2421] hover:bg-[#F4EFEC] disabled:opacity-40 rounded-sm transition-colors"
              aria-label="Zoom in"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
              }}
              className="p-1.5 text-[#4A534D] hover:text-[#1E3F20] hover:bg-[#F4EFEC] rounded-sm transition-colors border-l border-[#E4DDD4]"
              aria-label="Reset view"
              title="Reset view"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Active Hotspot Popover Card */}
          {activeHotspot && (
            <div className="absolute bottom-14 left-3.5 right-3.5 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-md border border-[#DED5CA] rounded-sm p-4 shadow-xl text-[#1F2421] z-30">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-serif text-base font-semibold text-[#1E3F20]">
                  {activeHotspot.label}
                </h4>
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="p-1 text-[#4A534D] hover:text-[#1F2421]"
                  aria-label="Close hotspot details"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#4A534D] leading-relaxed">
                {activeHotspot.detail}
              </p>
            </div>
          )}

          {/* Bottom Caption & Drag Instruction Strip */}
          <div className="absolute inset-x-0 bottom-0 px-4 py-3 flex items-center justify-between gap-4 text-white pointer-events-none">
            <p className="text-xs sm:text-sm font-medium text-[#EFE6D5] truncate">
              {scene.caption}
            </p>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-white/90 bg-black/45 px-2.5 py-1 rounded-sm shrink-0">
              <Move className="w-3.5 h-3.5" />
              <span>Drag to pan · Click hotspots to inspect</span>
            </div>
          </div>
        </div>

        {/* 9-Photo Bottom Filmstrip Switcher */}
        <div className="mt-4 flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {PANORAMA_SCENES.map((s, idx) => {
            const isActive = sceneIdx === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => handleSceneChange(idx)}
                className={`group shrink-0 w-32 sm:w-36 rounded-sm overflow-hidden border text-left transition-all ${
                  isActive
                    ? 'border-[#1E3F20] ring-2 ring-[#9B7E4F] bg-white shadow-sm'
                    : 'border-[#DED5CA] bg-white/80 opacity-80 hover:opacity-100 hover:border-[#9B7E4F]'
                }`}
              >
                <div className="h-16 sm:h-20 overflow-hidden bg-[#E9E2D8]">
                  <img
                    src={s.image}
                    alt={s.shortTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="px-2 py-1.5">
                  <span
                    className={`block text-[11px] font-semibold truncate ${
                      isActive ? 'text-[#1E3F20]' : 'text-[#4A534D]'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}. {s.shortTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
