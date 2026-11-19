import React from 'react';
import { Flame, UtensilsCrossed, Footprints, Moon, Sparkles, Clock } from 'lucide-react';
import { CAMP_EXPERIENCES } from '../data/campsiteData';

interface ExperiencesProps {
  onPlanTrip: () => void;
  onOpenMenu?: () => void;
}

export const Experiences: React.FC<ExperiencesProps> = ({ onPlanTrip, onOpenMenu }) => {
  return (
    <section id="experiences" className="py-24 bg-stone-950/35 backdrop-blur-xs text-stone-100 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Beyond the Gypsy Track
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
              Unfiltered Camp Life & Kumaon Traditions
            </h2>
            <p className="mt-4 text-base text-stone-300 leading-relaxed">
              Camping at Corbett is far more than a place to sleep. It is the primal warmth of pine embers, the crackle of firewood, the taste of slow-cooked mountain lentils, and the night stillness broken only by the call of a barking deer.
            </p>
          </div>
          <button
            onClick={onPlanTrip}
            className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-stone-950 bg-emerald-400 hover:bg-emerald-300 transition-colors rounded-md self-start md:self-auto whitespace-nowrap"
          >
            Plan Your Itinerary
          </button>
        </div>

        {/* Feature Grid with Asymmetric Presence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {CAMP_EXPERIENCES.map((exp, idx) => (
            <div
              key={exp.id}
              className="bg-stone-900/90 rounded-2xl border border-stone-800 overflow-hidden flex flex-col group hover:border-stone-700 transition-all shadow-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-sm text-stone-300 text-xs px-3 py-1 rounded-md flex items-center gap-1.5 border border-stone-800">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{exp.timeOfDay}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                    {exp.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display mb-3">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-stone-300 leading-relaxed mb-6">
                    {exp.description}
                  </p>
                </div>

                {/* Clean unboxed tags with typographic dot separator */}
                <div className="pt-4 border-t border-stone-800 flex items-center flex-wrap gap-2 text-xs text-stone-400">
                  {exp.tags.map((tag, tIdx) => (
                    <React.Fragment key={tIdx}>
                      <span>{tag}</span>
                      {tIdx < exp.tags.length - 1 && <span aria-hidden="true" className="text-stone-600">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Camp Gastronomy Deep Dive */}
        <div id="camp-life" className="bg-stone-950/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 border-b border-stone-800/80 pb-6">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Kumaoni Kitchen Heritage
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                Slow Fire Mountain Cuisine
              </h3>
              <p className="text-sm text-stone-300 mt-2 leading-relaxed">
                Our culinary philosophy honors Uttarakhand's mountain villages. Everything is cooked fresh using iron pots and wood fire, with spices sourced directly from local farming cooperatives in Kyari and Kumaon.
              </p>
            </div>

            {onOpenMenu && (
              <button
                onClick={onOpenMenu}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 self-start sm:self-auto shrink-0"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Explore Our Menu</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-stone-300 mb-8">
            <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800/80">
              <span className="font-semibold text-white block mb-1 text-sm">
                Bhatt ki Churkani
              </span>
              <p className="text-stone-400">
                Nutrient-rich black soybean curry slow-cooked with roasted hill spices, served hot with steamed Basmati rice and fresh ghee.
              </p>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800/80">
              <span className="font-semibold text-white block mb-1 text-sm">
                Aloo ke Gutke & Mandua Rotis
              </span>
              <p className="text-stone-400">
                Pahadi potatoes tossed with aromatic jumbo herbs (Faran & Jakhiya) paired with handmade finger-millet flatbreads.
              </p>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800/80">
              <span className="font-semibold text-white block mb-1 text-sm">
                Fireside Bonfire Barbecue
              </span>
              <p className="text-stone-400">
                Woodsmoke-roasted skewers of spiced cottage cheese, river catch, wild mushrooms, and sweet corn prepared fresh at the evening bonfire.
              </p>
            </div>

            <div className="bg-stone-950/70 p-4 rounded-xl border border-stone-800/80">
              <span className="font-semibold text-white block mb-1 text-sm">
                Buransh Flower Nectar
              </span>
              <p className="text-stone-400">
                Refreshing welcome drinks made from wild rhododendron blossoms harvested from the high Kumaoni ridge forests.
              </p>
            </div>
          </div>

          {/* Dedicated Menu Jump Banner */}
          <div id="gastronomy-callout" className="p-5 sm:p-6 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-display">
                  Explore Our Complete Retreat Menu
                </h4>
                <p className="text-stone-400 text-xs mt-0.5">
                  Browse our full menu served in our common restaurant area or via cottage balcony room service (at an extra cost), featuring breakfast platters, traditional Kumaoni thalis, evening tea, and bonfire skewers.
                </p>
              </div>
            </div>

            <a
              href="#retreat-menu"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Explore Our Menu</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
