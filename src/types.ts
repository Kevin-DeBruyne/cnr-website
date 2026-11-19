export interface Accommodation {
  id: string;
  name: string;
  category: 'safari-tent' | 'riverfront' | 'dome' | 'cottage';
  tentNumber?: number;
  locationTip?: string;
  tagline: string;
  pricePerNight: number;
  capacity: string;
  size: string;
  bed: string;
  image: string;
  images: string[];
  galleryCaptions?: string[];
  birdName?: string;
  description: string;
  highlights: string[];
  amenities: string[];
  availableUnits: number;
}

export interface SafariPackage {
  id: string;
  zone: string;
  duration: string;
  timing: string;
  pricePerGypsy: number;
  priceType?: 'per_gypsy' | 'per_person';
  vehicleType?: '4x4 Gypsy' | 'Open Canter';
  priceLabel?: string;
  maxGuests: number;
  bestFor: string;
  description: string;
  permitRequired: boolean;
  included: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'hightea' | 'barbecue' | 'dinner' | 'beverages';
  isPahadiSpecialty?: boolean;
  diet: 'veg' | 'non-veg';
  description: string;
  priceNote?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  category: string;
  timeOfDay: string;
  duration: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ActivityPhotoPerspectives {
  locationImg: string;
  locationCaption: string;
  hostsImg: string;
  hostsCaption: string;
  guestsImg: string;
  guestsCaption: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  tagline: string;
  category: 'all' | 'river-trails' | 'safari-wildlife' | 'evenings' | 'wellness-culture' | 'adventure';
  categoryLabel: string;
  duration: string;
  timing: string;
  defaultPrice: string;
  locationTip: string;
  description: string;
  highlights: string[];
  included: string[];
  defaultPhotos: ActivityPhotoPerspectives;
}

export interface WildlifeSighting {
  month: string;
  season: string;
  tempRange: string;
  tigerActivity: string;
  elephantActivity: string;
  birdActivity: string;
  idealFor: string;
}

export interface BookingFormState {
  checkIn: string;
  checkOut: string;
  accommodationId: string;
  adults: number;
  children: number;
  safariZoneId?: string;
  safariDate?: string;
  safariSlot?: 'morning' | 'afternoon';
  addTransfers: boolean;
  addStarWalk: boolean;
  addBonfire?: boolean;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  specialNotes: string;
}

export interface ConfirmedBooking extends BookingFormState {
  bookingId: string;
  bookedAt: string;
  nights: number;
  accommodationName: string;
  roomTotal: number;
  safariTotal: number;
  addonsTotal: number;
  conservationCess: number;
  grandTotal: number;
}
