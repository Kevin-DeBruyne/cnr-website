import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudFog,
  CloudLightning,
  Wind,
  Droplets,
  Thermometer,
  Sunrise,
  Sunset,
  Flame,
  Binoculars,
  Sparkles,
  RefreshCw,
  Compass,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';
import {
  fetchCorbettWeather,
  CorbettWeatherData,
  getWeatherDescription,
  DailyForecast
} from '../data/weatherService';

interface WeatherWidgetProps {
  onBookSafariOrStay?: () => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ onBookSafariOrStay }) => {
  const [weather, setWeather] = useState<CorbettWeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'advisory' | '7day' | 'packing'>('advisory');

  const loadData = async (force = false) => {
    if (force) setRefreshing(true);
    try {
      const data = await fetchCorbettWeather(force);
      setWeather(data);
    } catch (err) {
      console.error('Error loading weather:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const convertTemp = (celsius: number): number => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  const tempSymbol = unit === 'C' ? '°C' : '°F';

  // Weather icon selector
  const renderWeatherIcon = (code: number, isDay = true, className = 'w-6 h-6') => {
    if (code === 0) {
      return isDay ? (
        <Sun className={`${className} text-amber-400`} />
      ) : (
        <Moon className={`${className} text-indigo-300`} />
      );
    }
    if (code === 1 || code === 2) {
      return <Sun className={`${className} text-amber-300`} />;
    }
    if (code === 3) {
      return <Cloud className={`${className} text-stone-400`} />;
    }
    if (code === 45 || code === 48) {
      return <CloudFog className={`${className} text-teal-300`} />;
    }
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
      return <CloudRain className={`${className} text-sky-400`} />;
    }
    if ([95, 96, 99].includes(code)) {
      return <CloudLightning className={`${className} text-amber-400`} />;
    }
    return <Sun className={`${className} text-amber-400`} />;
  };

  if (loading || !weather) {
    return (
      <section id="weather-advisory" className="py-20 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-stone-800 w-64 rounded"></div>
            <div className="h-4 bg-stone-800 w-96 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 bg-stone-800 rounded-xl"></div>
              <div className="h-48 bg-stone-800 rounded-xl"></div>
              <div className="h-48 bg-stone-800 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const selectedDay: DailyForecast = weather.daily[selectedDayIndex] || weather.daily[0];
  const conditionMeta = getWeatherDescription(selectedDay.weatherCode);

  // Dynamic Safari & Campfire Suitability Calculation
  const dawnTempEst = selectedDay.tempMin;
  const isMorningChilly = dawnTempEst < 16;
  const isCampfireOptimal = selectedDay.precipitationProbability < 25;
  const campfireRating = isCampfireOptimal ? '9.8 / 10 • Ideal' : '8.0 / 10 • Sheltered Deck Fire';

  return (
    <section id="weather-advisory" className="py-20 bg-stone-950/35 backdrop-blur-xs text-stone-100 border-b border-white/10 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-950/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Live Jim Corbett Weather & Safari Advisory</span>
              <span className="text-stone-600">|</span>
              <span className="text-stone-400 font-mono text-[11px]">29.39° N, 79.13° E (354m)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-white">
              Jungle Climate & Safari Conditions
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-2xl">
              Live temperatures, mountain dawn chill factor, and river valley wind data updated continuously from the Ramnagar-Khichri corridor to optimize your Gypsy safari and evening campfire.
            </p>
          </div>

          {/* Controls: Unit Toggle & Refresh */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            {/* Unit Toggle */}
            <div className="inline-flex items-center rounded-lg bg-stone-900 border border-stone-800 p-1 text-xs font-medium">
              <button
                onClick={() => setUnit('C')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  unit === 'C' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setUnit('F')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  unit === 'F' ? 'bg-emerald-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
                }`}
              >
                °F
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={() => loadData(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 hover:text-white text-xs font-medium transition-colors"
              title="Refresh live Corbett telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-400' : ''}`} />
              <span className="hidden sm:inline">{refreshing ? 'Updating...' : 'Live Refresh'}</span>
            </button>
          </div>
        </div>

        {/* Real-time Hero Weather Dashboard Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          
          {/* Main Current Conditions Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  Right Now by Khichri River
                </span>
                <h3 className="text-stone-300 text-sm font-medium mt-0.5">
                  Jim Corbett Buffer Zone
                </h3>
              </div>
              <div className="p-3 rounded-2xl bg-stone-800/80 border border-stone-700/50">
                {renderWeatherIcon(weather.current.weatherCode, weather.current.isDay, 'w-8 h-8')}
              </div>
            </div>

            <div className="my-6">
              <div className="flex items-baseline gap-3">
                <span className="text-6xl sm:text-7xl font-bold font-display text-white tracking-tight">
                  {convertTemp(weather.current.temperature)}
                  <span className="text-4xl text-emerald-400">{tempSymbol}</span>
                </span>
                <div className="space-y-0.5">
                  <div className="text-stone-200 text-base font-semibold">
                    {getWeatherDescription(weather.current.weatherCode).label}
                  </div>
                  <div className="text-stone-400 text-xs">
                    Feels like {convertTemp(weather.current.apparentTemperature)}{tempSymbol}
                  </div>
                </div>
              </div>
              <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed">
                {getWeatherDescription(weather.current.weatherCode).tagline}
              </p>
            </div>

            {/* Micro Key Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-800/80 text-xs">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <div className="text-stone-400 text-[11px]">Humidity</div>
                  <div className="font-semibold text-stone-200">{weather.current.humidity}%</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-teal-400 shrink-0" />
                <div>
                  <div className="text-stone-400 text-[11px]">Wind</div>
                  <div className="font-semibold text-stone-200">{weather.current.windSpeed} km/h</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-stone-400 text-[11px]">Range</div>
                  <div className="font-semibold text-stone-200">
                    {convertTemp(selectedDay.tempMin)}° / {convertTemp(selectedDay.tempMax)}°
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Safari & Campfire Quick Glance Advisories (7 Cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Morning Safari Card */}
            <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 flex flex-col justify-between hover:border-emerald-700/50 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40 font-medium">
                    <Sunrise className="w-3.5 h-3.5 text-amber-400" />
                    <span>Morning Safari Slot</span>
                  </span>
                  <span className="text-stone-400 text-[11px]">06:00 AM – 09:30 AM</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Dawn Open-Gypsy Chill
                </h4>
                <div className="text-sm font-medium text-emerald-300 mb-2">
                  Est. Dawn: {convertTemp(selectedDay.tempMin)}{tempSymbol} (Wind chill: ~{convertTemp(Math.max(selectedDay.tempMin - 4, 4))}{tempSymbol})
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {isMorningChilly
                    ? 'In open 4x4 Gypsies moving at 25 km/h, the morning forest air feels significantly colder. Wear warm fleeces, light gloves, and bring a woolen wrap.'
                    : 'Mild early breeze along the Sal canopy. Light jacket or full-sleeved safari shirt recommended.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-300">
                <span>Gate Opening: <strong className="text-amber-300">{selectedDay.sunrise}</strong></span>
                <span className="text-emerald-400 font-medium">Clear Forest Tracks</span>
              </div>
            </div>

            {/* Evening Campfire & Stargazing Card */}
            <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 flex flex-col justify-between hover:border-amber-700/50 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-orange-950/60 text-orange-300 border border-orange-800/40 font-medium">
                    <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                    <span>Campfire & Night Sky</span>
                  </span>
                  <span className="text-stone-400 text-[11px]">07:30 PM – 10:30 PM</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Khichri Riverbank Bonfire
                </h4>
                <div className="text-sm font-medium text-amber-400 mb-2">
                  Suitability: {campfireRating}
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {conditionMeta.campfireImpact}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-300">
                <span>Sunset: <strong className="text-orange-300">{selectedDay.sunset}</strong></span>
                <span>Rain Chance: <strong className="text-sky-300">{selectedDay.precipitationProbability}%</strong></span>
              </div>
            </div>

            {/* Afternoon Safari & Waterhole Activity Card */}
            <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 flex flex-col justify-between hover:border-emerald-700/50 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-medium">
                    <Sun className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Afternoon Safari Slot</span>
                  </span>
                  <span className="text-stone-400 text-[11px]">02:00 PM – 05:30 PM</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Waterhole & River Crossing
                </h4>
                <div className="text-sm font-medium text-emerald-300 mb-2">
                  Day Peak: {convertTemp(selectedDay.tempMax)}{tempSymbol} • UV Index: {selectedDay.uvIndexMax}/10
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  {selectedDay.tempMax > 28
                    ? 'Higher afternoon warmth triggers tigers and herd elephants to emerge toward the Ramganga riverbanks and forest pools. Keep binoculars ready.'
                    : 'Pleasant sunlight across grasslands with calm grazing herds and raptor sightings.'}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-300">
                <span>Dust Bandana & Hat: <strong>Advised</strong></span>
                <span className="text-amber-300">High Animal Movement</span>
              </div>
            </div>

            {/* River Trek & Night Temperature Card */}
            <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 flex flex-col justify-between hover:border-sky-700/50 transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-950/60 text-sky-300 border border-sky-800/40 font-medium">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span>Nature Walk & River Trek</span>
                  </span>
                  <span className="text-stone-400 text-[11px]">Guided Foot Exploration</span>
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Khichri River Pebble Trail
                </h4>
                <div className="text-sm font-medium text-sky-300 mb-2">
                  Mountain river stream is crystal clear & refreshing
                </div>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Dry boulder pathways and clear river streams. Best undertaken in the gentle morning light between 07:00 AM and 09:30 AM or at 04:00 PM.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-300">
                <span>Footwear: <strong>Grip Trek Shoes</strong></span>
                <span className="text-emerald-400">Naturalist Accompanied</span>
              </div>
            </div>

          </div>

        </div>

        {/* 24-Hour Hourly Timeline Strip */}
        <div className="rounded-2xl bg-stone-900/60 border border-stone-800 p-6 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-200">
                Corbett Valley 14-Hour Forecast Timeline
              </h4>
            </div>
            <span className="text-xs text-stone-400">
              Updated: {weather.lastUpdated} IST
            </span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-700">
            {weather.hourly.map((h, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-between min-w-[76px] p-3 rounded-xl border text-center transition-all ${
                  h.isDawnOrDusk
                    ? 'bg-amber-950/30 border-amber-800/50 text-amber-200'
                    : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <span className="text-[11px] font-medium text-stone-400 whitespace-nowrap">
                  {h.hourLabel}
                </span>
                <div className="my-2">
                  {renderWeatherIcon(h.weatherCode, !h.hourLabel.includes('PM') || parseInt(h.hourLabel) < 7, 'w-5 h-5')}
                </div>
                <span className="text-sm font-bold text-white">
                  {convertTemp(h.temperature)}°
                </span>
                <span className="text-[10px] text-sky-400 font-mono mt-1">
                  {h.precipitationProbability > 0 ? `${h.precipitationProbability}%` : '0%'}
                </span>
                {h.isDawnOrDusk && (
                  <span className="text-[9px] uppercase tracking-tighter text-amber-400 font-semibold mt-1">
                    Safari
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Interactive Forecast Selector */}
        <div className="rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h4 className="text-lg font-bold font-display text-white">
                7-Day Corbett Safari & Weather Outlook
              </h4>
              <p className="text-stone-400 text-xs sm:text-sm">
                Select a day to view target zone temperatures and custom wildlife activity forecasts.
              </p>
            </div>
            {onBookSafariOrStay && (
              <button
                onClick={onBookSafariOrStay}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors shrink-0 shadow-sm"
              >
                <span>Reserve Stay For These Dates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weather.daily.map((day, idx) => {
              const isSelected = idx === selectedDayIndex;
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                      : 'bg-stone-950/50 border-stone-800 hover:border-stone-700 hover:bg-stone-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-xs font-semibold text-white">
                      {day.dayName}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {day.formattedDate}
                    </span>
                  </div>

                  <div className="my-2 flex items-center justify-center py-1">
                    {renderWeatherIcon(day.weatherCode, true, 'w-7 h-7')}
                  </div>

                  <div className="mt-2 text-center w-full">
                    <div className="text-sm font-bold text-white">
                      {convertTemp(day.tempMax)}° <span className="text-stone-500 text-xs font-normal">/ {convertTemp(day.tempMin)}°</span>
                    </div>
                    <div className="text-[10px] text-stone-400 mt-1 flex items-center justify-center gap-1">
                      <Droplets className="w-2.5 h-2.5 text-sky-400" />
                      <span>{day.precipitationProbability}%</span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-2 pt-2 border-t border-emerald-500/40 text-[10px] text-center text-emerald-300 font-semibold">
                      Selected View
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Day Expanded Detail Strip */}
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-stone-950 border border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-800/60 text-emerald-400 shrink-0">
                <Binoculars className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">
                  {selectedDay.dayName} ({selectedDay.formattedDate}) Wildlife Outlook: {conditionMeta.label}
                </div>
                <div className="text-stone-400 text-xs mt-0.5">
                  {conditionMeta.safariImpact}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-800 text-stone-300">
              <div className="flex items-center gap-1.5">
                <Sunrise className="w-4 h-4 text-amber-400" />
                <span>Dawn Safari Entry: <strong>{selectedDay.sunrise}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sunset className="w-4 h-4 text-orange-400" />
                <span>Jungle Exit: <strong>{selectedDay.sunset}</strong></span>
              </div>
            </div>
          </div>

        </div>

        {/* Corbett Seasonal Planning Quick Guide Accordion */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-2">
              <Thermometer className="w-4 h-4" />
              <span>What to Wear for Safaris</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Open Gypsies pick up substantial dawn breeze. Always dress in layers: comfortable inner fleece, a windproof outer layer, earthy khakis/olive greens, and sunglasses to protect against dust trails.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
              <Flame className="w-4 h-4" />
              <span>On-Premises Campfire Safety</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Campfires are lit in our designated fire pit inside the retreat premises (riverside bonfires are strictly prohibited by forest rules). Guests enjoy acoustic Pahadi folk songs, roasted appetizers, and stargazing under the celestial Milky Way belt.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800">
            <div className="flex items-center gap-2 text-sky-400 font-semibold text-sm mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Forest Dept Weather Protocols</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              Corbett Tiger Reserve tracks remain open across Bijrani, Jhirna, Dhela, and Garjiya during standard clear and light weather. In sudden severe rain, morning permits are smoothly rescheduled.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
