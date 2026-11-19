import React, { useState, useEffect } from 'react';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Trash2,
  Sparkles,
  PhoneCall,
  Clock,
  CheckCircle2,
  X,
  Coffee,
  Flame,
  Sun,
  Moon,
  Info,
  ChefHat
} from 'lucide-react';
import { MenuItem } from '../types';
import { RETREAT_MENU } from '../data/campsiteData';

interface DiningMenuSectionProps {
  onOpenBooking?: () => void;
}

export const DiningMenuSection: React.FC<DiningMenuSectionProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg' | 'specialty'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Custom user-added dishes stored in localStorage
  const [customItems, setCustomItems] = useState<MenuItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<MenuItem['category']>('dinner');
  const [newItemDiet, setNewItemDiet] = useState<'veg' | 'non-veg'>('veg');
  const [newItemIsSpecialty, setNewItemIsSpecialty] = useState(false);
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  // Load saved custom menu items
  useEffect(() => {
    try {
      const saved = localStorage.getItem('corbett_custom_menu_items');
      if (saved) {
        setCustomItems(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load custom menu items', e);
    }
  }, []);

  // Save new dish to localStorage
  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemDescription.trim()) return;

    const newItem: MenuItem = {
      id: `custom-dish-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      diet: newItemDiet,
      isPahadiSpecialty: newItemIsSpecialty,
      description: newItemDescription.trim(),
      priceNote: newItemPrice.trim() || undefined
    };

    const updated = [newItem, ...customItems];
    setCustomItems(updated);
    try {
      localStorage.setItem('corbett_custom_menu_items', JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not save custom menu items', err);
    }

    // Reset form
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
    setIsAddModalOpen(false);
  };

  const handleDeleteCustomItem = (id: string) => {
    const updated = customItems.filter((i) => i.id !== id);
    setCustomItems(updated);
    try {
      localStorage.setItem('corbett_custom_menu_items', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }
  };

  const categories = [
    { id: 'all', label: 'All Dishes', icon: UtensilsCrossed },
    { id: 'breakfast', label: 'Breakfast', icon: Sun },
    { id: 'lunch', label: 'Lunch', icon: Sun },
    { id: 'hightea', label: 'High Tea & Snacks', icon: Coffee },
    { id: 'barbecue', label: 'Bonfire Barbecue', icon: Flame },
    { id: 'dinner', label: 'Dinner', icon: Moon },
    { id: 'beverages', label: 'Beverages & Coolers', icon: Coffee }
  ];

  // Merge default menu with user's custom dishes
  const allMenuItems = [...customItems, ...RETREAT_MENU];

  const filteredItems = allMenuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDiet =
      dietFilter === 'all'
        ? true
        : dietFilter === 'specialty'
        ? item.isPahadiSpecialty
        : item.diet === dietFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesDiet && matchesSearch;
  });

  return (
    <section id="retreat-menu" className="py-24 bg-stone-950/35 backdrop-blur-xs text-stone-100 border-b border-white/10 scroll-mt-20">
      <div id="dining-menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Master Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-stone-800 pb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <ChefHat className="w-4 h-4 text-amber-400" />
              <span>Common Restaurant & Balcony Room Service</span>
              <span className="text-stone-600">&middot;</span>
              <span>Slow-Cooked Mountain Flavors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
              Explore Our Menu
            </h2>
            <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed">
              Meals are served fresh in our welcoming common restaurant area, or delivered directly to your cottage balcony through room service at an extra cost. Enjoy authentic Kumaoni thalis, home-style specialties, and evening snacks roasted around the crackling bonfire circle.
            </p>
          </div>

          {/* Action Row: Add Dish Button & Chef Inquiries */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dish / Item</span>
            </button>

            <a
              href="tel:+918449506167"
              className="px-4 py-3 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-xs font-medium transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dietary / Chef Desk</span>
            </a>
          </div>
        </div>

        {/* Filter Toolbar: Categories, Diet Filters, Search */}
        <div className="mb-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = cat.icon;
              const count =
                cat.id === 'all'
                  ? allMenuItems.length
                  : allMenuItems.filter((i) => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                      : 'bg-stone-950 text-stone-300 hover:bg-stone-850 hover:text-white border border-stone-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-stone-950 text-amber-300' : 'bg-stone-900 text-stone-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Second Row: Diet Switcher & Live Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
            {/* Diet Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mr-1">
                Filter:
              </span>
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  dietFilter === 'all'
                    ? 'bg-stone-800 text-white font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  dietFilter === 'veg'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/80 font-semibold'
                    : 'text-stone-400 hover:text-emerald-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Vegetarian</span>
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  dietFilter === 'non-veg'
                    ? 'bg-red-950 text-red-300 border border-red-700/80 font-semibold'
                    : 'text-stone-400 hover:text-red-400'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>Non-Vegetarian</span>
              </button>
              <button
                onClick={() => setDietFilter('specialty')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  dietFilter === 'specialty'
                    ? 'bg-amber-950 text-amber-300 border border-amber-700/80 font-semibold'
                    : 'text-stone-400 hover:text-amber-400'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Pahadi Village Specialties</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                placeholder="Search dishes or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-800 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors"
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
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isCustom = item.id.startsWith('custom-dish-');
            return (
              <div
                key={item.id}
                className="bg-stone-950/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-amber-400/40 transition-all shadow-md group relative"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {/* Veg / Non-Veg Official Symbol */}
                      <span
                        className={`w-4 h-4 border flex items-center justify-center rounded-xs ${
                          item.diet === 'veg'
                            ? 'border-emerald-500'
                            : 'border-red-500'
                        }`}
                        title={item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.diet === 'veg' ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                      </span>

                      <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 bg-stone-900 px-2 py-0.5 rounded-md border border-stone-850">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.isPahadiSpecialty && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-300 bg-amber-950/80 border border-amber-600/40 px-2 py-0.5 rounded-md">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Pahadi Special</span>
                        </span>
                      )}

                      {/* Delete button if user-added */}
                      {isCustom && (
                        <button
                          onClick={() => handleDeleteCustomItem(item.id)}
                          className="text-stone-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove custom dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Dish Title */}
                  <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Footer Note / Price Tag */}
                <div className="mt-5 pt-4 border-t border-stone-850 flex items-center justify-between text-xs">
                  <span className="text-stone-400 text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-stone-500" />
                    <span>Freshly Prepared</span>
                  </span>
                  <span className="font-semibold text-amber-300 font-mono text-[11px]">
                    {item.priceNote || 'À la carte / To Order'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-stone-950 rounded-2xl border border-stone-800">
            <UtensilsCrossed className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <h4 className="text-base font-semibold text-stone-300">No dishes match your filter</h4>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Try switching category or clearing the search term. You can also add your own retreat dishes using the button above.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setDietFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs text-white"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Informative Dining Note Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Personalized Campsite Dining</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Have Specific Tastes or Special Requests?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed">
              Our chef gladly caters to customized culinary requests, Jain preparations, children’s meals, evening bonfire barbecue skewers, and in-cottage balcony room service.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/918449506167?text=Hi%20Corbett%20Nature%20Retreat%2C%20I%20have%20a%20special%20dining%20inquiry%20regarding%20the%20menu."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 text-xs font-bold uppercase tracking-wider transition-all shadow-md"
            >
              Message Camp Chef
            </a>
          </div>
        </div>

      </div>

      {/* Add Dish Modal Dialog */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative text-stone-100">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    Add New Menu Dish
                  </h3>
                  <p className="text-xs text-stone-400">
                    Instantly saved to your retreat menu
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDish} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-300 uppercase tracking-wider font-semibold mb-1">
                  Dish Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kumaoni Mutton Curry, Gahat Dal, Pahadi Raita"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 uppercase tracking-wider font-semibold mb-1">
                    Meal Category *
                  </label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as MenuItem['category'])}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="hightea">High Tea & Snacks</option>
                    <option value="barbecue">Bonfire Barbecue</option>
                    <option value="dinner">Dinner</option>
                    <option value="beverages">Beverages & Coolers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-300 uppercase tracking-wider font-semibold mb-1">
                    Dietary Classification *
                  </label>
                  <select
                    value={newItemDiet}
                    onChange={(e) => setNewItemDiet(e.target.value as 'veg' | 'non-veg')}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="veg">Vegetarian</option>
                    <option value="non-veg">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-300 uppercase tracking-wider font-semibold mb-1">
                  Description & Key Ingredients *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the dish, hill spices used, how it is cooked or served..."
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-stone-300 uppercase tracking-wider font-semibold mb-1">
                    Price / Serving Note (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹350, Serves 2, Inquire"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-4">
                  <label className="flex items-center gap-2 cursor-pointer text-stone-300">
                    <input
                      type="checkbox"
                      checked={newItemIsSpecialty}
                      onChange={(e) => setNewItemIsSpecialty(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-0 bg-stone-950 border-stone-700"
                    />
                    <span className="font-medium">Mark as Pahadi Village Specialty</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 font-bold text-stone-950 uppercase tracking-wider shadow-md"
                >
                  Save Dish to Menu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
