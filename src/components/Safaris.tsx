import React, { useState } from 'react';
import { Clock, ShieldAlert, Award, CheckCircle2, ArrowRight, Car, Compass, Info, Glasses } from 'lucide-react';
import { SAFARI_PACKAGES, safariImg } from '../data/campsiteData';
import { SafariPackage } from '../types';

interface SafarisProps {
  onBookSafariWithStay: (safariId: string) => void;
}

export const Safaris: React.FC<SafarisProps> = ({ onBookSafariWithStay }) => {
  const [selectedZone, setSelectedZone] = useState<SafariPackage>(SAFARI_PACKAGES[0]);

  return (
    <section id="safaris" className="py-24 bg-stone-950/35 backdrop-blur-xs text-stone-100 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
            Jim Corbett Wildlife Expeditions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Open 4x4 Gypsy Safaris, Canter &amp; Village Trails
          </h2>
          <p className="mt-4 text-base text-stone-300 leading-relaxed">
            Experience Corbett’s wilderness through official authorized wildlife safaris: private 4x4 Gypsies (₹8,200 / vehicle) and Dhikala Canters (₹2,250 / person). Each safari is exactly 3 hours of immersive wildlife tracking.
          </p>
        </div>

        {/* Legal Advisory Strip: Forest vs Village Trails */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-amber-950/40 border border-amber-600/30 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 text-xs text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="leading-relaxed">
            <strong className="text-amber-100 uppercase tracking-wider block sm:inline mr-2">Forest Conservation Notice:</strong>
            Walking on foot into the reserve forest is strictly prohibited by government wildlife conservation laws. All wildlife expeditions inside the park are conducted exclusively inside authorized open 4x4 Gypsies or Canters. On-foot walking trails are safely held along peaceful Kumaoni village lanes and Khichri river pebbles outside the forest boundary.
          </div>
        </div>

        {/* 2-Column Split: Interactive Zone Selector & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Zone Selection List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <span className="text-xs uppercase tracking-wider text-stone-400 font-medium px-1">
              Select Safari Expedition (3 Hours Duration)
            </span>
            {SAFARI_PACKAGES.map((pkg) => {
              const isSelected = selectedZone.id === pkg.id;
              const isCanter = pkg.priceType === 'per_person';
              return (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedZone(pkg)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'bg-stone-800 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                      : 'bg-stone-950/60 border-stone-800 hover:bg-stone-800/60 hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-white font-display text-base flex items-center gap-2">
                      <span>{pkg.zone}</span>
                      {isCanter && (
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                          Canter
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 tabular-nums">
                      {isCanter ? (
                        <>₹2,250 <span className="text-stone-400 font-normal">/ person</span></>
                      ) : (
                        <>₹8,200 <span className="text-stone-400 font-normal">/ gypsy</span></>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                    <span className="font-medium text-emerald-400">3 Hours</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{isCanter ? '16 Seats Open Canter' : 'Private (Up to 6 Guests)'}</span>
                  </div>
                  <p className="text-xs text-stone-300 line-clamp-1">
                    {pkg.bestFor}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Zone Detailed Spotlight (7 cols) */}
          <div className="lg:col-span-7 bg-stone-950/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between">
            {/* Visual Header */}
            <div className="relative h-60 sm:h-64">
              <img
                src={safariImg}
                alt="Open 4x4 Gypsy driving through Jim Corbett wilderness"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    {selectedZone.vehicleType || '4x4 Gypsy Safari'} &bull; 3 Hours
                  </span>
                  <h3 className="text-2xl font-bold text-white font-display">
                    {selectedZone.zone}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xs text-stone-400">Tariff</div>
                  <div className="text-xl font-bold text-emerald-400 font-display">
                    {selectedZone.priceType === 'per_person' ? '₹2,250 / person' : '₹8,200 / Gypsy'}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-stone-300 text-sm leading-relaxed mb-6">
                  {selectedZone.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-stone-900/80 p-3.5 rounded-lg border border-stone-800">
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="uppercase tracking-wider">Exact Duration &amp; Timings</span>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      3 Hours &middot; {selectedZone.timing}
                    </div>
                  </div>

                  <div className="bg-stone-900/80 p-3.5 rounded-lg border border-stone-800">
                    <div className="flex items-center gap-2 text-xs text-stone-400 mb-1">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="uppercase tracking-wider">Prime Sightings</span>
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {selectedZone.bestFor}
                    </div>
                  </div>
                </div>

                {/* Inclusions List */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
                    What is Included in this Expedition
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                    {selectedZone.included.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-stone-400">
                  <span className="text-white font-medium">Govt Permit Notice:</span> Govt ID required for all travelers.
                </div>
                <button
                  onClick={() => onBookSafariWithStay(selectedZone.id)}
                  className="w-full sm:w-auto px-6 py-3 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all rounded-md flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Include {selectedZone.zone} in Booking</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Crucial Policy & Advisory Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-stone-300">
          <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider">
              <Car className="w-4 h-4" />
              <span>Door-to-Door Pickup Policy</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Direct door-to-door campsite pickup and drop is available <strong>only for 4x4 Jeep safaris</strong>, and <strong>only when booked at least 72 hours in advance</strong>. For Canter safaris, guests board directly at the designated Forest Dept Gate.
            </p>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Exact 3-Hour Duration</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Every wildlife safari in Jim Corbett National Park operates on an <strong>exact 3-hour window</strong> strictly scheduled and regulated by the Uttarakhand Forest Department.
            </p>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider">
              <Glasses className="w-4 h-4" />
              <span>Gear Rental at Zone Gate</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              During safari, guests can rent high-power binoculars, safari sun hats, and jungle gear. These items have a rental price <strong>fixed by the government and payable directly at the door/gate of the safari zone</strong>.
            </p>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>Village Trails Only</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Walking into the reserve forest is strictly prohibited by law. Our guided nature and bird walks are conducted along peaceful <strong>Kumaoni village trails</strong>, organic orchards, and Khichri river pebbles outside the forest boundary.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
