import React, { useState, useEffect } from 'react';
import {
  Flame,
  Sparkles,
  Music,
  Moon,
  Upload,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Camera,
  Heart,
  Coffee,
  MessageSquare,
  ArrowRight,
  Volume2,
  VolumeX,
  Users
} from 'lucide-react';
import { campfireImg, heroImg, tentImg, safariImg } from '../data/campsiteData';

interface BonfireShowcaseProps {
  onBookCampfireStay: () => void;
}

export const BonfireShowcase: React.FC<BonfireShowcaseProps> = ({ onBookCampfireStay }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [customPhotos, setCustomPhotos] = useState<string[]>(['', '', '', '', '']);
  const [isAmbientSoundOn, setIsAmbientSoundOn] = useState(false);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [noiseNode, setNoiseNode] = useState<AudioNode | null>(null);

  // Default initial guest bonfire moments
  const defaultImages = [
    campfireImg,
    heroImg,
    campfireImg,
    tentImg,
    safariImg,
  ];

  const slideCaptions = [
    'Acoustic Kumaoni Melodies & Folk Songs by the Crackling Fire',
    'Guests Roasting Appetizers & Barbecue around the Property Fire Pit',
    'Stargazing & Milky Way Arc Directly Above the Bonfire Circle',
    'Jungle Lore & Tiger Tracking Stories with Corbett Naturalists',
    'Warm Campfire Conversations with Families, Friends & Travelers',
  ];

  const slideTags = [
    'Acoustic Melodies',
    'Bonfire Barbecue',
    'Dark-Sky Stargazing',
    'Naturalist Jungle Lore',
    'Traveler Bonding',
  ];

  // Load custom photos from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('corbett_custom_bonfire_photos');
      if (saved) {
        setCustomPhotos(JSON.parse(saved));
      }
    } catch (err) {
      console.warn('Could not load custom bonfire photos', err);
    }
  }, []);

  const saveCustomPhoto = (slideIdx: number, dataUrl: string) => {
    setCustomPhotos((prev) => {
      const updated = [...prev];
      updated[slideIdx] = dataUrl;
      try {
        localStorage.setItem('corbett_custom_bonfire_photos', JSON.stringify(updated));
      } catch (err) {
        console.warn('LocalStorage error', err);
      }
      return updated;
    });
  };

  const resetPhoto = (slideIdx: number) => {
    setCustomPhotos((prev) => {
      const updated = [...prev];
      updated[slideIdx] = '';
      try {
        localStorage.setItem('corbett_custom_bonfire_photos', JSON.stringify(updated));
      } catch (err) {
        console.warn(err);
      }
      return updated;
    });
  };

  const handleFileUpload = (slideIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        saveCustomPhoto(slideIdx, event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSlideChange = (newIdx: number) => {
    setActiveSlide((newIdx + 5) % 5);
  };

  // Optional cozy procedural audio crackle using Web Audio API
  const toggleFireCrackle = () => {
    if (isAmbientSoundOn) {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsAmbientSoundOn(false);
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink noise + randomized pops to simulate gentle hearth fire crackle
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        const pop = Math.random() < 0.002 ? (Math.random() * 2 - 1) * 3 : 0;
        data[i] = (white * 0.08 + pop) * 0.15;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();

      setAudioCtx(ctx);
      setNoiseNode(noise);
      setIsAmbientSoundOn(true);
    } catch (e) {
      console.warn('AudioContext not allowed or supported', e);
    }
  };

  const currentCustom = customPhotos[activeSlide];
  const activeImage = currentCustom || defaultImages[activeSlide];
  const isCustom = Boolean(currentCustom);

  return (
    <section id="bonfire-experience" className="py-24 bg-stone-950/35 backdrop-blur-xs text-stone-100 border-b border-white/10 relative overflow-hidden">
      
      {/* Warm Ambient Ember Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-stone-800/80 pb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Designated On-Premises Bonfire Pit</span>
              <span className="text-amber-600">&bull;</span>
              <span className="text-amber-200 font-bold">Charge: ₹1,000</span>
              <span className="text-amber-600">&bull;</span>
              <span>07:30 PM Onwards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white">
              The Magic of the Bon-Fire
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              A campsite evening isn't truly complete without the warmth of a crackling fire. As dusk settles over the Jim Corbett foothills, guests gather inside our retreat premises around our dedicated, safe stone fire pit (riverside bonfires are strictly prohibited by forest conservation laws) to listen to acoustic Pahadi melodies, roast skewers, and share jungle tales under unpolluted Himalayan night skies.
            </p>
          </div>

          {/* Interactive Crackle Ambience Sound Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleFireCrackle}
              className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
                isAmbientSoundOn
                  ? 'bg-amber-500 text-stone-950 border-amber-400 ring-2 ring-amber-400/30'
                  : 'bg-stone-900/90 text-stone-300 hover:text-white border-stone-700 hover:border-amber-500/50'
              }`}
              title="Experience cozy fire crackle sound"
            >
              {isAmbientSoundOn ? <Volume2 className="w-4 h-4 text-stone-950 animate-bounce" /> : <VolumeX className="w-4 h-4 text-amber-400" />}
              <span>{isAmbientSoundOn ? 'Bonfire Crackle Playing' : 'Play Fire Ambiance'}</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* LEFT: 5-SLOT GUEST PHOTO CAROUSEL (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shadow-2xl group">
              <img
                src={activeImage}
                alt={`Corbett Retreat Bonfire - Photo ${activeSlide + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-stone-950/40 pointer-events-none" />

              {/* Top Left: Slide Number & Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 text-xs font-semibold text-amber-200 flex items-center gap-1.5 shadow-md">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Guest Moment {activeSlide + 1} of 5</span>
                </div>
                <div className="hidden sm:inline-block bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-[11px] text-stone-300">
                  {slideTags[activeSlide]}
                </div>
              </div>

              {/* Top Right: Upload / Replace Picture Button for Previous Guests */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {isCustom && (
                  <button
                    onClick={() => resetPhoto(activeSlide)}
                    className="bg-stone-950/85 hover:bg-rose-950/90 text-stone-300 hover:text-rose-200 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 text-xs font-medium transition-colors flex items-center gap-1"
                    title="Reset back to default preview"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
                <label
                  htmlFor={`upload-bonfire-${activeSlide}`}
                  className="cursor-pointer bg-amber-600 hover:bg-amber-500 active:scale-95 text-stone-950 font-bold backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-amber-400/40 text-xs transition-all shadow-lg flex items-center gap-1.5"
                  title="Upload a photo of previous guests enjoying the fire"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isCustom ? 'Change Photo' : 'Upload Guest Photo'}</span>
                </label>
                <input
                  id={`upload-bonfire-${activeSlide}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(activeSlide, e)}
                />
              </div>

              {/* Nav Arrows */}
              <button
                onClick={() => handleSlideChange(activeSlide - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-950/75 hover:bg-stone-950 text-white border border-white/10 backdrop-blur-md transition-all active:scale-90"
                aria-label="Previous bonfire photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleSlideChange(activeSlide + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-stone-950/75 hover:bg-stone-950 text-white border border-white/10 backdrop-blur-md transition-all active:scale-90"
                aria-label="Next bonfire photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div className="bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 max-w-md truncate">
                  {slideCaptions[activeSlide]}
                </div>
                {isCustom && (
                  <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-1 rounded border border-amber-700">
                    Guest Photo Loaded
                  </span>
                )}
              </div>
            </div>

            {/* 5 Thumbnails */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4].map((idx) => {
                const thumbCustom = customPhotos[idx];
                const thumbImg = thumbCustom || defaultImages[idx];
                const isCurrent = idx === activeSlide;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSlideChange(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border transition-all text-left ${
                      isCurrent
                        ? 'border-amber-400 ring-2 ring-amber-400/40 scale-102'
                        : 'border-stone-800 hover:border-stone-600 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={thumbImg}
                      alt={`Bonfire moment thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-stone-950/30 group-hover:bg-transparent" />
                    <div className="absolute bottom-1 left-1.5 text-[10px] font-bold text-white bg-black/60 px-1 rounded">
                      {idx + 1}
                    </div>
                    {thumbCustom && (
                      <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-400 px-1">
              <span>Ready for your guest photos &bull; Upload directly into any of the 5 slots</span>
              <span className="text-amber-400 font-medium">Nightly at the campsite</span>
            </div>

          </div>

          {/* RIGHT: WHY THE BONFIRE MAKES ALL THE DIFFERENCE (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            
            <div className="space-y-4">
              
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                  Campsite Highlight
                </span>
                <h3 className="text-xl font-bold font-display text-white">
                  Why Guests Love the Fire Pit
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  After a day tracking tigers in the Jim Corbett core zones, there’s nothing quite like gathering around glowing logs by the soothing sound of the Khichri River. It turns strangers into friends and provides an authentic, unplugged wilderness memory.
                </p>
              </div>

              {/* 4 Experience Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Music className="w-4 h-4" />
                    <span>Acoustic Melodies</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Strum along with local naturalists and fellow travelers with acoustic guitar & Pahadi folk songs.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Moon className="w-4 h-4" />
                    <span>Dark-Sky Stargazing</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Zero city glare lets you spot the Milky Way, constellations, and shooting stars over the Sal forest.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Coffee className="w-4 h-4" />
                    <span>Barbecue & Brews</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Roasted skewered starters, mountain lemon-ginger tea, and hot beverages by the embers.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
                    <Users className="w-4 h-4" />
                    <span>Jungle Stories</span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Hear authentic tiger tracking tales, elephant herd encounters, and Kumaoni folklore from camp guides.
                  </p>
                </div>

              </div>

            </div>

            {/* Direct Reservation CTA */}
            <div className="pt-2">
              <button
                onClick={onBookCampfireStay}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <span>Reserve A Stay With Bon-Fire Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-center text-[11px] text-amber-300/90 mt-2 font-medium">
                Bonfire setup charge: ₹1,000 per session &bull; Located at designated on-premises fire pit (riverside bonfires are prohibited)
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
