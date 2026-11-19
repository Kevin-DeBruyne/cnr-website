import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  CloudSun,
  MapPin,
  MessageSquareQuote,
  Plus,
  Trash2,
  X,
  Sparkles,
  RefreshCw,
  Droplets,
  Wind,
  Sun,
  Snowflake,
  CloudRain,
  Car,
  Train,
  Plane,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle2,
  Phone,
  Binoculars
} from 'lucide-react';
import { MenuItem } from '../types';
import {
  RETREAT_MENU,
  WILDLIFE_CALENDAR,
  FAQS,
  GUEST_REVIEWS
} from '../data/campsiteData';
import {
  CorbettWeatherData,
  fetchCorbettWeather,
  getWeatherDescription
} from '../data/weatherService';

interface RetreatInfoHubProps {
  onOpenBooking: () => void;
  onOpenMenu: () => void;
}

type HubTab = 'menu' | 'weather' | 'location' | 'reviews';

export const RetreatInfoHub: React.FC<RetreatInfoHubProps> = ({
  onOpenBooking,
  onOpenMenu
}) => {
  const [activeTab, setActiveTab] = useState<HubTab>('menu');

  // --- MENU STATE ---
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg' | 'specialty'>('all');
  const [customItems, setCustomItems] = useState<MenuItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('dinner');
  const [newItemDiet, setNewItemDiet] = useState<'veg' | 'non-veg'>('veg');
  const [newItemIsSpecialty, setNewItemIsSpecialty] = useState(false);
  const [newItemDescription, setNewItemDescription] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('corbett_custom_menu_items');
      if (saved) setCustomItems(JSON.parse(saved));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemDescription.trim()) return;
    const newItem: MenuItem = {
      id: `custom-dish-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      diet: newItemDiet,
      isPahadiSpecialty: newItemIsSpecialty,
      description: newItemDescription.trim()
    };
    const updated = [newItem, ...customItems];
    setCustomItems(updated);
    try {
      localStorage.setItem('corbett_custom_menu_items', JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
    setNewItemName('');
    setNewItemDescription('');
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomItem = (id: string) => {
    const updated = customItems.filter((i) => i.id !== id);
    setCustomItems(updated);
    try {
      localStorage.setItem('corbett_custom_menu_items', JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const allMenuItems = [...customItems, ...RETREAT_MENU];
  const filteredMenu = allMenuItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDiet =
      dietFilter === 'all'
        ? true
        : dietFilter === 'specialty'
        ? item.isPahadiSpecialty
        : item.diet === dietFilter;
    return matchesCat && matchesDiet;
  });

  // --- WEATHER STATE ---
  const [weather, setWeather] = useState<CorbettWeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  const loadWeather = async (force = false) => {
    setWeatherLoading(true);
    const data = await fetchCorbettWeather(force);
    setWeather(data);
    setWeatherLoading(false);
  };

  useEffect(() => {
    loadWeather(false);
  }, []);

  // --- FAQ STATE ---
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const hubTabs: { id: HubTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'menu', label: 'Dining & Kitchen Menu', icon: UtensilsCrossed },
    { id: 'weather', label: 'Live Weather & Wildlife', icon: CloudSun },
    { id: 'location', label: 'Location, Routes & FAQs', icon: MapPin },
    { id: 'reviews', label: 'Guest Reflections', icon: MessageSquareQuote }
  ];

  const menuCategories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'hightea', label: 'High Tea' },
    { id: 'barbecue', label: 'Barbecue' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'beverages', label: 'Beverages' }
  ];

  return (
    <section
      id="info-hub"
      className="py-12 sm:py-16 bg-white text-[#1F2421] border-t border-[#E4DDD4] scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header + Master 4-Tab Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#E4DDD4]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9B7E4F] block mb-1">
              Essential Retreat Information
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E3F20] tracking-tight">
              Menu, Seasons, Routes &amp; Reviews
            </h2>
          </div>

          <div
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1"
            role="tablist"
            aria-label="Retreat information sections"
          >
            {hubTabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2.5 rounded-sm text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-2 transition-colors border ${
                    isSelected
                      ? 'bg-[#1E3F20] text-white border-[#1E3F20] shadow-sm'
                      : 'bg-[#F4EFEC] text-[#4A534D] border-[#DED5CA] hover:text-[#1E3F20] hover:border-[#9B7E4F]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TAB 1: MENU */}
        {activeTab === 'menu' && (
          <div className="pt-6 space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#F4EFEC] border border-[#DED5CA] rounded-sm p-3.5">
              <div className="text-xs text-[#4A534D]">
                <strong className="text-[#1E3F20] font-semibold">Dining Note:</strong> All freshly prepared meals are served in our warm common restaurant hall. Private balcony room service is available at an extra cost.
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#1E3F20] bg-white hover:bg-[#EFE6D5] border border-[#DED5CA] rounded-sm inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Custom Dish</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenMenu}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#9B7E4F] hover:bg-[#856A3E] rounded-sm transition-colors whitespace-nowrap"
                >
                  Full Menu View
                </button>
              </div>
            </div>

            {/* Category + Diet Filter Strip */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {menuCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap shrink-0 transition-colors border ${
                      selectedCategory === cat.id
                        ? 'bg-[#9B7E4F] text-white border-[#9B7E4F]'
                        : 'bg-white text-[#4A534D] border-[#DED5CA] hover:border-[#9B7E4F]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {(['all', 'veg', 'non-veg', 'specialty'] as const).map((df) => (
                  <button
                    key={df}
                    type="button"
                    onClick={() => setDietFilter(df)}
                    className={`px-2.5 py-1 rounded-sm text-[11px] font-semibold uppercase tracking-wider border transition-colors ${
                      dietFilter === df
                        ? 'bg-[#1E3F20] text-white border-[#1E3F20]'
                        : 'bg-[#F4EFEC] text-[#4A534D] border-[#DED5CA] hover:text-[#1E3F20]'
                    }`}
                  >
                    {df === 'specialty' ? 'Pahadi Specials' : df}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Cards (3-col clean grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[420px] overflow-y-auto pr-1">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F9F6F2] border border-[#E4DDD4] hover:border-[#9B7E4F] rounded-sm p-4 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3 h-3 rounded-sm border flex items-center justify-center shrink-0 ${
                            item.diet === 'veg' ? 'border-emerald-700' : 'border-rose-700'
                          }`}
                          title={item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.diet === 'veg' ? 'bg-emerald-700' : 'bg-rose-700'
                            }`}
                          />
                        </span>
                        <h3 className="font-serif text-base font-semibold text-[#1E3F20]">
                          {item.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {item.isPahadiSpecialty && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#856A3E] bg-[#EFE6D5] px-2 py-0.5 rounded-sm">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Pahadi</span>
                          </span>
                        )}
                        {item.id.startsWith('custom-dish-') && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCustomItem(item.id)}
                            className="p-1 text-[#4A534D] hover:text-rose-700"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-[#4A534D] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E4DDD4] flex items-center justify-between text-[11px] text-[#78716C]">
                    <span className="capitalize">{item.category}</span>
                    <span className="font-medium text-[#1E3F20]">Fresh to order</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE WEATHER & WILDLIFE SEASONS */}
        {activeTab === 'weather' && (
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Live Weather Panel (5 cols) */}
            <div className="lg:col-span-5 bg-[#222222] text-[#F4EFEC] rounded-sm p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#D8C5A3]">
                    Khichri Valley Forecast
                  </span>
                  <button
                    type="button"
                    onClick={() => loadWeather(true)}
                    disabled={weatherLoading}
                    className="text-xs text-[#D6D3D1] hover:text-white inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${weatherLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>
                </div>

                {weather && (
                  <>
                    <div className="flex items-end gap-4 mb-4">
                      <div className="font-serif text-5xl font-semibold text-white tabular-nums">
                        {weather.current.temperature}°C
                      </div>
                      <div className="pb-1">
                        <div className="text-sm font-semibold text-[#EFE6D5]">
                          {getWeatherDescription(weather.current.weatherCode).label}
                        </div>
                        <div className="text-xs text-[#D6D3D1]">
                          Feels like {weather.current.apparentTemperature}°C
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-[#D6D3D1] leading-relaxed mb-5">
                      {getWeatherDescription(weather.current.weatherCode).safariImpact}
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-xs border-y border-white/15 py-3 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5 text-[#D8C5A3]" />
                        <span>{weather.current.humidity}% RH</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-[#D8C5A3]" />
                        <span>{weather.current.windSpeed} km/h</span>
                      </div>
                      <div className="text-right text-[#D8C5A3]">
                        {weather.isLive ? 'Live' : 'Seasonal'}
                      </div>
                    </div>

                    {/* Next 4 Days Compact Row */}
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {weather.daily.slice(0, 4).map((d) => (
                        <div
                          key={d.date}
                          className="bg-white/5 border border-white/10 rounded-sm p-2"
                        >
                          <div className="text-[11px] font-semibold text-[#EFE6D5]">
                            {d.dayName.slice(0, 3)}
                          </div>
                          <div className="text-xs font-mono text-white mt-1 tabular-nums">
                            {d.tempMax}° / {d.tempMin}°
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between gap-2">
                <span className="text-xs text-[#D6D3D1]">
                  Mango trees keep cottages cool even in warm spring.
                </span>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B7E4F] hover:bg-[#856A3E] rounded-sm shrink-0"
                >
                  Book Your Stay
                </button>
              </div>
            </div>

            {/* Wildlife & Birding Calendar (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {WILDLIFE_CALENDAR.map((season, idx) => (
                  <div
                    key={season.month}
                    className="bg-[#F9F6F2] border border-[#DED5CA] rounded-sm p-4 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-semibold text-[#1E3F20]">
                        {season.month}
                      </span>
                      {idx === 0 && <Snowflake className="w-4 h-4 text-[#9B7E4F]" />}
                      {idx === 1 && <Sun className="w-4 h-4 text-[#9B7E4F]" />}
                      {idx === 2 && <CloudRain className="w-4 h-4 text-[#9B7E4F]" />}
                    </div>
                    <div className="text-xs font-semibold text-[#856A3E]">
                      {season.season} · {season.tempRange}
                    </div>
                    <p className="text-xs text-[#4A534D] leading-relaxed">
                      <strong className="text-[#1F2421]">Tigers:</strong> {season.tigerActivity}
                    </p>
                    <p className="text-xs text-[#4A534D] leading-relaxed">
                      <strong className="text-[#1F2421]">Birdlife:</strong> {season.birdActivity}
                    </p>
                  </div>
                ))}
              </div>

              {/* Birdwatching & Forest Trail Compliance Card */}
              <div className="bg-[#F4EFEC] border border-[#DED5CA] rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Binoculars className="w-5 h-5 text-[#1E3F20] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#4A534D] leading-relaxed">
                    <strong className="text-[#1E3F20] block text-sm mb-0.5">
                      Bird Watching &amp; Village Trail Guidelines
                    </strong>
                    Self-guided bird watching around our mango canopy &amp; village periphery is <strong>Free / No charge</strong> (binoculars lent at camp). A dedicated bird watching guide is <strong>₹1,500 / trip</strong>. Walking into the reserve forest is prohibited—all guided walks explore peaceful village trails &amp; riverbanks.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LOCATION, ROUTES & FAQS */}
        {activeTab === 'location' && (
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Routes & Camp Coordinates (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#F4EFEC] border border-[#DED5CA] rounded-sm p-5 space-y-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9B7E4F] block">
                    How to Reach Village Kyari
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-[#1E3F20] mt-0.5">
                    Khichri Riverbank · Ramnagar, Uttarakhand
                  </h3>
                </div>

                <div className="space-y-3 text-xs text-[#4A534D]">
                  <div className="flex items-start gap-2.5">
                    <Car className="w-4 h-4 text-[#1E3F20] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1F2421] block">By Road (260 km / 5.5 hrs from New Delhi)</strong>
                      Hapur Bypass → Moradabad → Kashipur → Ramnagar → Village Kyari.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Train className="w-4 h-4 text-[#1E3F20] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1F2421] block">By Train (Ramnagar Station · 12 km)</strong>
                      Daily Ranikhet &amp; Corbett Link Express trains from Delhi. Private camp cab pickup arranged.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Plane className="w-4 h-4 text-[#1E3F20] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1F2421] block">By Air (Pantnagar · 80 km / ~2 hrs)</strong>
                      Connects daily to Delhi IGI Airport; private taxi transfers on request.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#9B7E4F] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1E3F20] block">Just 2 Hrs from Nainital (City of Lakes)</strong>
                      Ideal twin getaway—scenic 2-hour mountain drive to Naini Lake, boating &amp; viewpoints.
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#DED5CA] flex flex-wrap items-center justify-between gap-2">
                  <a
                    href="tel:+918449506167"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3F20] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>+91 84495 06167</span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Kyari+Village+Corbett+Ramnagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1E3F20] hover:bg-[#142D16] rounded-sm transition-colors"
                  >
                    Open Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Accordion FAQs (7 cols) */}
            <div className="lg:col-span-7 space-y-2.5 max-h-[390px] overflow-y-auto pr-1">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={faq.question}
                    className="bg-[#F9F6F2] border border-[#DED5CA] rounded-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 text-sm font-semibold text-[#1E3F20] hover:bg-[#F4EFEC] transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#9B7E4F] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#4A534D] shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-3.5 text-xs text-[#4A534D] leading-relaxed border-t border-[#E4DDD4] pt-2.5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: GUEST REFLECTIONS */}
        {activeTab === 'reviews' && (
          <div className="pt-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {GUEST_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#F9F6F2] border border-[#DED5CA] rounded-sm p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#9B7E4F] mb-2.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#9B7E4F] text-[#9B7E4F]" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A534D] italic leading-relaxed mb-4">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E4DDD4] flex items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-[#1E3F20]">{rev.name}</div>
                      <div className="text-[11px] text-[#78716C]">{rev.city} · {rev.stayDate}</div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#1E3F20]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#F4EFEC] border border-[#DED5CA] rounded-sm px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#4A534D]">
              <span>
                <strong className="text-[#1E3F20]">NTCA Responsible Tourism Pledge:</strong> Solar hot water, zero single-use plastics, and 100% Kumaoni community staffing.
              </span>
              <button
                type="button"
                onClick={onOpenBooking}
                className="text-xs font-semibold text-[#9B7E4F] hover:text-[#1E3F20] underline underline-offset-4 shrink-0 text-left"
              >
                Book Your Stay →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Dish Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white border border-[#DED5CA] rounded-sm max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4DDD4] pb-3">
              <h3 className="font-serif text-xl font-semibold text-[#1E3F20]">
                Add Dish to Menu
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#4A534D] hover:text-[#1F2421]"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDish} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-[#4A534D] mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Kumaoni Raita & Gahat Ki Dal"
                  className="w-full border border-[#DED5CA] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1E3F20]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#4A534D] mb-1">
                    Category
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as MenuItem['category'])}
                    className="w-full border border-[#DED5CA] rounded-sm px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#1E3F20]"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="hightea">High Tea</option>
                    <option value="barbecue">Barbecue</option>
                    <option value="dinner">Dinner</option>
                    <option value="beverages">Beverages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#4A534D] mb-1">
                    Diet
                  </label>
                  <select
                    value={newItemDiet}
                    onChange={(e) => setNewItemDiet(e.target.value as 'veg' | 'non-veg')}
                    className="w-full border border-[#DED5CA] rounded-sm px-3 py-2 text-xs bg-white focus:outline-none focus:border-[#1E3F20]"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-[#4A534D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItemIsSpecialty}
                  onChange={(e) => setNewItemIsSpecialty(e.target.checked)}
                  className="rounded border-[#DED5CA]"
                />
                <span>Mark as Pahadi Recipe Specialty</span>
              </label>

              <div>
                <label className="block text-xs font-medium text-[#4A534D] mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  placeholder="Describe preparation and ingredients..."
                  className="w-full border border-[#DED5CA] rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-[#1E3F20]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#4A534D] border border-[#DED5CA] rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1E3F20] hover:bg-[#142D16] rounded-sm"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
