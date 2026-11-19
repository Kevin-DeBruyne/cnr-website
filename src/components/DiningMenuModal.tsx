import React, { useState } from 'react';
import {
  X,
  UtensilsCrossed,
  Sparkles,
  PhoneCall,
  Info
} from 'lucide-react';
import { RETREAT_MENU } from '../data/campsiteData';

interface DiningMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiningMenuModal: React.FC<DiningMenuModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg' | 'specialty'>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'hightea', label: 'High Tea & Snacks' },
    { id: 'barbecue', label: 'Bonfire Barbecue' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'beverages', label: 'Beverages & Coolers' }
  ];

  const filteredItems = RETREAT_MENU.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDiet =
      dietFilter === 'all'
        ? true
        : dietFilter === 'specialty'
        ? item.isPahadiSpecialty
        : item.diet === dietFilter;
    return matchesCategory && matchesDiet;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white border border-[#DED5CA] rounded-sm max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col text-[#1F2421]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E4DDD4] bg-[#F4EFEC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-sm bg-[#1E3F20] text-[#EFE6D5]">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9B7E4F]">
                Common Restaurant Dining &middot; Balcony Service at Extra Cost
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#1E3F20] mt-0.5">
                Corbett Nature Retreat Menu
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <a
              href="tel:+918449506167"
              className="px-3.5 py-2 rounded-sm bg-white hover:bg-[#EFE6D5] text-[#1E3F20] text-xs font-semibold border border-[#DED5CA] flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#9B7E4F]" />
              <span>Chef Desk: +91 84495 06167</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-sm hover:bg-[#DED5CA]/50 text-[#4A534D] hover:text-[#1F2421] transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category & Diet Filters */}
        <div className="px-5 sm:px-6 py-3.5 border-b border-[#E4DDD4] bg-white flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-sm text-xs font-semibold whitespace-nowrap shrink-0 transition-colors border ${
                  selectedCategory === cat.id
                    ? 'bg-[#9B7E4F] text-white border-[#9B7E4F]'
                    : 'bg-[#F9F6F2] text-[#4A534D] border-[#DED5CA] hover:border-[#9B7E4F]'
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
                className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-sm border transition-colors ${
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

        {/* Menu Cards Grid */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-[#F9F6F2]">
          <div className="p-3 rounded-sm bg-white border border-[#DED5CA] text-xs text-[#4A534D] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#9B7E4F] shrink-0" />
            <span>
              Prepared fresh on order. Meals are served in our common restaurant hall; room service to your private cottage balcony is available at an extra charge.
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#4A534D]">
              <UtensilsCrossed className="w-8 h-8 text-[#9B7E4F] mx-auto mb-2" />
              <p className="text-sm">No dishes found matching your selection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-sm bg-white border border-[#DED5CA] hover:border-[#9B7E4F] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
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
                        <h4 className="font-serif text-base font-semibold text-[#1E3F20]">
                          {item.name}
                        </h4>
                      </div>

                      {item.isPahadiSpecialty && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#EFE6D5] text-[10px] text-[#856A3E] font-semibold uppercase tracking-wider shrink-0">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Pahadi</span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#4A534D] leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#E4DDD4] flex items-center justify-between text-[11px] text-[#78716C]">
                    <span className="capitalize">{item.category}</span>
                    <span className="text-[#1E3F20] font-medium">Available to order</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:px-6 border-t border-[#E4DDD4] bg-[#F4EFEC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#4A534D] text-center sm:text-left">
            Jain, vegan, and child-friendly custom dishes prepared gladly on advance notice.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-sm bg-[#1E3F20] hover:bg-[#142D16] text-white font-semibold transition-colors"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
};
