import { Accommodation, SafariPackage, ExperienceItem, WildlifeSighting, MenuItem, ActivityItem } from '../types';
import heroImg from '../assets/images/corbett_campsite_hero_1792819779238.jpg';
import tentImg from '../assets/images/corbett_luxury_tent_1792819780371.jpg';
import safariImg from '../assets/images/corbett_safari_gypsy_1792819781666.jpg';
import campfireImg from '../assets/images/corbett_campfire_evening_1792819781072.jpg';
import mangoHeroImg from '../assets/images/corbett_mango_cottage_hero_1794752082288.jpg';
import cottageInteriorImg from '../assets/images/corbett_cottage_interior_balcony_1794752082831.jpg';
import villageFeastImg from '../assets/images/corbett_kumaoni_village_feast_1794752083685.jpg';
import wildlifeBirdsImg from '../assets/images/corbett_wildlife_birdlife_1794752083227.jpg';
import riverXtremeImg from '../assets/images/corbett_xtreme_adventure_river_1794752084202.jpg';

export {
  heroImg,
  tentImg,
  safariImg,
  campfireImg,
  mangoHeroImg,
  cottageInteriorImg,
  villageFeastImg,
  wildlifeBirdsImg,
  riverXtremeImg
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'tent-monal',
    tentNumber: 1,
    name: 'Monal Cottage',
    birdName: 'Monal',
    category: 'riverfront',
    tagline: 'Naturally shaded under mature mango trees all around • Private balcony in each cottage',
    locationTip: 'Heritage Mango Orchard • Private Balcony',
    pricePerNight: 3250,
    capacity: '2 Adults + 1 Child',
    size: 'Private balcony in each cottage',
    bed: 'King-size hand-carved Sheesham bed',
    image: mangoHeroImg,
    images: [mangoHeroImg, cottageInteriorImg, heroImg, riverXtremeImg, campfireImg],
    galleryCaptions: [
      'Cottages Shaded Beneath Mature Mango Trees',
      'Handcrafted Sheesham King Bed & Private Balcony',
      'Lush Orchard Pathway & Morning Sanctuary Mist',
      'Nearby Khichri Pebble Stream & Valley View',
      'Evening Warmth at the On-Premises Fire Pit'
    ],
    description: 'Boutique luxury safari cottage shaded under lush heritage mango trees all around. Features a hand-carved Sheesham king bed, private balcony in each cottage overlooking the orchard and valley, an en-suite natural slate bathroom with continuous running hot water, in-cottage tea station, and 100% insect-screened mesh windows.',
    highlights: [
      'Naturally shaded under mature mango trees all around',
      'Private balcony in each cottage overlooking orchard & river valley',
      'En-suite natural slate bathroom with rain shower & continuous hot water',
      'Pure drinking water, in-cottage electric kettle & charging station',
      '100% insect-screened mesh windows with blackout canvas flaps'
    ],
    amenities: [
      'Continuous Running Hot & Cold Water',
      'Organic Lemongrass & Citronella Toiletries',
      'Charging Ports for Cameras & Phones',
      'Brass Reading Lanterns & Ceiling Fan',
      'Complimentary Corbett Herbal Tea & Press Kettle',
      'Plush Cotton Linens & Woolen Quilts'
    ],
    availableUnits: 1
  },
  {
    id: 'tent-paradise',
    tentNumber: 2,
    name: 'Paradise Cottage',
    birdName: 'Paradise',
    category: 'riverfront',
    tagline: 'Naturally shaded under mature mango trees all around • Private balcony in each cottage',
    locationTip: 'Central Mango Grove • Private Balcony',
    pricePerNight: 3250,
    capacity: '2 Adults + 1 Child',
    size: 'Private balcony in each cottage',
    bed: 'King-size hand-carved Sheesham bed',
    image: cottageInteriorImg,
    images: [cottageInteriorImg, mangoHeroImg, tentImg, wildlifeBirdsImg, campfireImg],
    galleryCaptions: [
      'Interior Suite & Private Balcony Doors',
      'Exterior Nestled Under Heritage Mango Canopy',
      'Natural Timber Porch & Warm Golden Lighting',
      'Orchard Birdlife & Peaceful Valley Edge',
      'Evening Lantern Glow at the Retreat'
    ],
    description: 'Boutique luxury safari cottage shaded under lush heritage mango trees all around. Features a hand-carved Sheesham king bed, private balcony in each cottage overlooking the orchard and valley, an en-suite natural slate bathroom with continuous running hot water, in-cottage tea station, and 100% insect-screened mesh windows.',
    highlights: [
      'Naturally shaded under mature mango trees all around',
      'Private balcony in each cottage overlooking orchard & river valley',
      'En-suite natural slate bathroom with rain shower & continuous hot water',
      'Pure drinking water, in-cottage electric kettle & charging station',
      '100% insect-screened mesh windows with blackout canvas flaps'
    ],
    amenities: [
      'Continuous Running Hot & Cold Water',
      'Organic Lemongrass & Citronella Toiletries',
      'Charging Ports for Cameras & Phones',
      'Brass Reading Lanterns & Ceiling Fan',
      'Complimentary Corbett Herbal Tea & Press Kettle',
      'Plush Cotton Linens & Woolen Quilts'
    ],
    availableUnits: 1
  },
  {
    id: 'tent-treepie',
    tentNumber: 3,
    name: 'Treepie Cottage',
    birdName: 'Treepie',
    category: 'riverfront',
    tagline: 'Naturally shaded under mature mango trees all around • Private balcony in each cottage',
    locationTip: 'Shaded Mango Canopy • Private Balcony',
    pricePerNight: 3250,
    capacity: '2 Adults + 1 Child',
    size: 'Private balcony in each cottage',
    bed: 'King-size hand-carved Sheesham bed',
    image: heroImg,
    images: [heroImg, cottageInteriorImg, mangoHeroImg, riverXtremeImg, campfireImg],
    galleryCaptions: [
      'Shaded Sanctuary Surrounded by Green Canopy',
      'Handcrafted King Suite & Private Balcony',
      'Mango Leaves Overlooking Misty Foothills',
      'Crystal Pebble Stream Nearby',
      'Evening Relaxation Under the Canopy'
    ],
    description: 'Boutique luxury safari cottage shaded under lush heritage mango trees all around. Features a hand-carved Sheesham king bed, private balcony in each cottage overlooking the orchard and valley, an en-suite natural slate bathroom with continuous running hot water, in-cottage tea station, and 100% insect-screened mesh windows.',
    highlights: [
      'Naturally shaded under mature mango trees all around',
      'Private balcony in each cottage overlooking orchard & river valley',
      'En-suite natural slate bathroom with rain shower & continuous hot water',
      'Pure drinking water, in-cottage electric kettle & charging station',
      '100% insect-screened mesh windows with blackout canvas flaps'
    ],
    amenities: [
      'Continuous Running Hot & Cold Water',
      'Organic Lemongrass & Citronella Toiletries',
      'Charging Ports for Cameras & Phones',
      'Brass Reading Lanterns & Ceiling Fan',
      'Complimentary Corbett Herbal Tea & Press Kettle',
      'Plush Cotton Linens & Woolen Quilts'
    ],
    availableUnits: 1
  },
  {
    id: 'tent-magpie',
    tentNumber: 4,
    name: 'Magpie Cottage',
    birdName: 'Magpie',
    category: 'riverfront',
    tagline: 'Naturally shaded under mature mango trees all around • Private balcony in each cottage',
    locationTip: 'Quiet Orchard Corner • Private Balcony',
    pricePerNight: 3250,
    capacity: '2 Adults + 1 Child',
    size: 'Private balcony in each cottage',
    bed: 'King-size hand-carved Sheesham bed',
    image: tentImg,
    images: [tentImg, cottageInteriorImg, mangoHeroImg, wildlifeBirdsImg, campfireImg],
    galleryCaptions: [
      'Golden Hour Glow at Cottage Veranda',
      'Hand-Carved Sheesham Bed & Private Balcony',
      'Mango Canopy Shade All Around',
      'Spotted Deer & Magpies Along Stream Edge',
      'Designated On-Premises Fire Pit Evenings'
    ],
    description: 'Boutique luxury safari cottage shaded under lush heritage mango trees all around. Features a hand-carved Sheesham king bed, private balcony in each cottage overlooking the orchard and valley, an en-suite natural slate bathroom with continuous running hot water, in-cottage tea station, and 100% insect-screened mesh windows.',
    highlights: [
      'Naturally shaded under mature mango trees all around',
      'Private balcony in each cottage overlooking orchard & river valley',
      'En-suite natural slate bathroom with rain shower & continuous hot water',
      'Pure drinking water, in-cottage electric kettle & charging station',
      '100% insect-screened mesh windows with blackout canvas flaps'
    ],
    amenities: [
      'Continuous Running Hot & Cold Water',
      'Organic Lemongrass & Citronella Toiletries',
      'Charging Ports for Cameras & Phones',
      'Brass Reading Lanterns & Ceiling Fan',
      'Complimentary Corbett Herbal Tea & Press Kettle',
      'Plush Cotton Linens & Woolen Quilts'
    ],
    availableUnits: 1
  },
  {
    id: 'tent-woodpecker',
    tentNumber: 5,
    name: 'Woodpecker Cottage',
    birdName: 'Woodpecker',
    category: 'riverfront',
    tagline: 'Naturally shaded under mature mango trees all around • Private balcony in each cottage',
    locationTip: 'Secluded Orchard Edge • Private Balcony',
    pricePerNight: 3250,
    capacity: '2 Adults + 1 Child',
    size: 'Private balcony in each cottage',
    bed: 'King-size hand-carved Sheesham bed',
    image: mangoHeroImg,
    images: [mangoHeroImg, cottageInteriorImg, riverXtremeImg, tentImg, villageFeastImg],
    galleryCaptions: [
      'Shaded Stone-and-Timber Cottage Under Mango Boughs',
      'King Suite Opening Onto Private Wooden Balcony',
      'Morning Mist Over the Valley Stream',
      'Evening Retreat Architecture',
      'Authentic Kumaoni Hospitality & Cuisine'
    ],
    description: 'Boutique luxury safari cottage shaded under lush heritage mango trees all around. Features a hand-carved Sheesham king bed, private balcony in each cottage overlooking the orchard and valley, an en-suite natural slate bathroom with continuous running hot water, in-cottage tea station, and 100% insect-screened mesh windows.',
    highlights: [
      'Naturally shaded under mature mango trees all around',
      'Private balcony in each cottage overlooking orchard & river valley',
      'En-suite natural slate bathroom with rain shower & continuous hot water',
      'Pure drinking water, in-cottage electric kettle & charging station',
      '100% insect-screened mesh windows with blackout canvas flaps'
    ],
    amenities: [
      'Continuous Running Hot & Cold Water',
      'Organic Lemongrass & Citronella Toiletries',
      'Charging Ports for Cameras & Phones',
      'Brass Reading Lanterns & Ceiling Fan',
      'Complimentary Corbett Herbal Tea & Press Kettle',
      'Plush Cotton Linens & Woolen Quilts'
    ],
    availableUnits: 1
  }
];

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'bijrani-safari',
    zone: 'Bijrani Safari Zone',
    duration: '3 Hours',
    timing: 'Morning 06:00 AM / Afternoon 02:30 PM',
    pricePerGypsy: 8200,
    priceType: 'per_gypsy',
    vehicleType: '4x4 Gypsy',
    priceLabel: '₹8,200 / Gypsy (up to 6 guests)',
    maxGuests: 6,
    bestFor: 'High Royal Bengal Tiger sighting probability & scenic grasslands',
    description: 'Bijrani is renowned for its diverse vegetation, scenic river beds, and open meadows (chaurs). It has one of the highest densities of tigers in Jim Corbett National Park.',
    permitRequired: true,
    included: [
      'Registered Open 4x4 Maruti Gypsy (Private for up to 6 guests)',
      'Certified Uttarakhand Forest Naturalist Guide',
      'Door-to-door campsite pickup & drop (only available when booked 72 hrs in advance)',
      'All Corbett Forest Entry permits & vehicle road taxes'
    ]
  },
  {
    id: 'jhirna-safari',
    zone: 'Jhirna Eco-Safari Zone',
    duration: '3 Hours',
    timing: 'Morning 06:00 AM / Afternoon 02:30 PM',
    pricePerGypsy: 8200,
    priceType: 'per_gypsy',
    vehicleType: '4x4 Gypsy',
    priceLabel: '₹8,200 / Gypsy (up to 6 guests)',
    maxGuests: 6,
    bestFor: 'Year-round open zone, wild Asiatic elephants & sloth bears',
    description: 'Situated on the southern boundary of the national park. Famous for herds of wild elephants wandering through bamboo thickets, nilgai, sambar deer, and sloth bears.',
    permitRequired: true,
    included: [
      'Registered 4x4 Gypsy (Private for up to 6 guests)',
      'Expert Tracker Naturalist',
      'Door-to-door campsite pickup & drop (only available when booked 72 hrs in advance)',
      'Permit processing with Government Corbett Portal'
    ]
  },
  {
    id: 'dhela-zone',
    zone: 'Dhela Wildlife Eco-Zone',
    duration: '3 Hours',
    timing: 'Morning 06:00 AM / Afternoon 02:30 PM',
    pricePerGypsy: 8200,
    priceType: 'per_gypsy',
    vehicleType: '4x4 Gypsy',
    priceLabel: '₹8,200 / Gypsy (up to 6 guests)',
    maxGuests: 6,
    bestFor: 'Grassland birding, Leopards, and Tiger tracking',
    description: 'A magnificent ecotourism zone rich in birdlife and active leopard tracking corridors. Features expansive water reservoirs where raptors and jackals congregate.',
    permitRequired: true,
    included: [
      'Open 4x4 Gypsy Safari (Private for up to 6 guests)',
      'Forest Department Verified Naturalist',
      'Door-to-door campsite pickup & drop (only available when booked 72 hrs in advance)',
      'All Entry Permits & Forest Cess'
    ]
  },
  {
    id: 'dhikala-canter',
    zone: 'Dhikala Canter Safari',
    duration: '3 Hours',
    timing: 'Morning 05:45 AM / Afternoon 11:30 AM',
    pricePerGypsy: 2250,
    priceType: 'per_person',
    vehicleType: 'Open Canter',
    priceLabel: '₹2,250 / person',
    maxGuests: 16,
    bestFor: 'Iconic Dhikala grasslands, Ramganga river reservoir & tiger tracking',
    description: 'Official Corbett Forest Department open-roof Canter Safari taking you deep into the legendary Dhikala core zone. Experience the vast open grasslands (Chaurs) and Ramganga riverbanks.',
    permitRequired: true,
    included: [
      'Official Forest Department Open Canter Seat (₹2,250 / person)',
      'Certified Uttarakhand Forest Naturalist Guide on board',
      'Dhikala Core Zone Entry Permit & Forest Cess',
      'Boarding at designated Forest Dept Gate (door-to-door pickup not available for Canter)'
    ]
  }
];

export const CAMP_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'campfire-folklore',
    title: 'Starlit Campfire & Kumaoni Folklore',
    category: 'Evenings at Camp',
    timeOfDay: '07:30 PM - 10:00 PM',
    duration: '2.5 Hours',
    description: 'Gather around our designated stone fire pit inside the retreat premises (riverside bonfires are strictly prohibited by forest conservation regulations). Listen to captivating wildlife trackers recount legendary encounters of Jim Corbett while savoring wood-roasted corn, slow-smoked appetizers, and spiced Himalayan tea.',
    image: campfireImg,
    tags: ['Campfire (₹1,000)', 'Designated Fire Pit', 'Starry Skies', 'Evening Gathering']
  },
  {
    id: 'khichri-river-walk',
    title: 'Dawn Khichri River & Pebble Trail Walk',
    category: 'River Adventure',
    timeOfDay: '06:30 AM - 08:00 AM',
    duration: '1.5 Hours',
    description: 'Walk through dewy Sal trees along the riverbank with our resident naturalist. Spot freshwater otters, kingfishers diving into turquoise pools, and examine fresh pugmarks left on the river sand during the night.',
    image: '/assets/aistudio/07aad3fc-dbfa-48fd-853e-38c428b06174_b915dab3.jpeg',
    tags: ['Pugmark Tracking', 'Otter Sighting', 'Gentle Walk', 'All Ages']
  },
  {
    id: 'gypsy-safari-expedition',
    title: 'Private Open 4x4 Corbett Gypsy Safaris',
    category: 'Wilderness Safari',
    timeOfDay: 'Dawn & Dusk Slots',
    duration: '3 Hours',
    description: 'Venture into the heart of Jim Corbett National Park. Our seasoned drivers and naturalists read alarm calls from deer and monkeys to track the elusive Royal Bengal Tiger and wild Asiatic elephants in their pristine habitat.',
    image: safariImg,
    tags: ['Tiger Tracking', 'Elephant Herds', 'Open 4x4 Gypsy', 'Permit Supported']
  },
  {
    id: 'kumaoni-pahadi-cuisine',
    title: 'Authentic Kumaoni Kitchen & Organic Harvest',
    category: 'Culinary Heritage',
    timeOfDay: 'All Meals',
    duration: 'Dining Hours',
    description: 'Taste authentic hill dishes prepared on slow wood-fire chulhas: Bhatt ki Churkani (black bean curry), Aloo ke Gutke, Mandua (finger millet) rotis, Pahadi raita with mountain mustard seeds, and fresh buransh (rhododendron) drinks.',
    image: tentImg,
    tags: ['Slow Wood Cooked', 'Local Farm Produce', 'Common Restaurant', 'Balcony Service']
  },
  {
    id: 'mango-canopy-sanctuary',
    title: 'Naturally Shaded Mango Orchard Sanctuary',
    category: 'Signature Sanctuary',
    timeOfDay: 'All Day Natural Shade',
    duration: 'At Your Leisure',
    description: 'Our biggest natural highlight: our entire campsite is surrounded by mature, broad-leaf mango trees all around. Take peaceful strolls beneath the cool canopy, enjoy gentle breezes on your private cottage balcony without harsh midday sun, and listen to the sweet birdsong of parakeets and barbets in the branches.',
    image: tentImg,
    tags: ['Surrounded by Mango Trees', '100% Shaded Canopy', 'Cool Orchard Breeze', 'Active Birdlife']
  }
];

export const WILDLIFE_CALENDAR: WildlifeSighting[] = [
  {
    month: 'Nov - Feb',
    season: 'Crisp Winter & Morning Mist',
    tempRange: '8°C - 22°C',
    tigerActivity: 'High - Basking in sunny grasslands and riverside boulders',
    elephantActivity: 'Moderate - Moving through lower Sal forests',
    birdActivity: 'Peak - Over 150+ migratory Himalayan bird species arrive',
    idealFor: 'Bonfires, misty photography, crisp morning safaris, birdwatching'
  },
  {
    month: 'Mar - Jun',
    season: 'Golden Spring & Warm Dry Wilderness',
    tempRange: '18°C - 36°C',
    tigerActivity: 'Peak - Frequent sightings around Khichri river & waterholes',
    elephantActivity: 'High - Large breeding herds grazing along riverbanks',
    birdActivity: 'High - Summer breeding plumage, nesting raptors',
    idealFor: 'Big cat sightings, swimming in safe river shallows, night sky astronomy'
  },
  {
    month: 'Jul - Oct',
    season: 'Lush Green Monsoon Rejuvenation',
    tempRange: '22°C - 30°C',
    tigerActivity: 'Moderate - Buffer zones & Sitabani trails accessible',
    elephantActivity: 'High - Roaming freely across lush hill ranges',
    birdActivity: 'High - Rain frogs, hornbills, lush jungle soundscapes',
    idealFor: 'Rejuvenating nature walks, rushing river rapids, quiet retreat'
  }
];

export const GUEST_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Aditya & Sunita Rao',
    city: 'New Delhi',
    stayDate: 'Stayed February 2026',
    tentType: 'Riverfront Luxury Safari Cottage',
    rating: 5,
    text: 'Sleeping with the sound of the Khichri River just outside our cottage was pure therapy. In the morning, our naturalist Devendra spotted fresh tiger pugmarks on the sand just 200m downstream! The bonfire and Kumaoni dinner were unforgettable.',
    highlight: 'Sound of the river at night & expert naturalist'
  },
  {
    id: 'rev-2',
    name: 'Marcus & Elena Vance',
    city: 'London, UK',
    stayDate: 'Stayed January 2026',
    tentType: 'Forest Glamping Dome',
    rating: 5,
    text: 'We spent two weeks traveling northern India and this campsite was the absolute crown jewel. The safari permits for Bijrani were arranged seamlessly, and we had an incredible 40-minute sighting of a tigress with two cubs. Zero plastic, pristine care.',
    highlight: 'Flawless Bijrani permit arrangement & 40-min tiger encounter'
  },
  {
    id: 'rev-3',
    name: 'Dr. Sameer Kapoor',
    city: 'Chandigarh',
    stayDate: 'Stayed March 2026',
    tentType: 'Heritage Kumaoni Sal Cottage',
    rating: 5,
    text: 'Traveled with our parents and children. The cottage had a working stone fireplace and plenty of space. The campsite staff treated us like family, and the food made from local organic grains was wholesome and delicious.',
    highlight: 'Family warmth, stone fireplace, and organic Pahadi food'
  }
];

export const FAQS = [
  {
    question: 'How do Jim Corbett Safari permits work and will the camp arrange them?',
    answer: 'Jim Corbett National Park has strict daily vehicle permit quotas managed by the Uttarakhand Forest Department. We assist our confirmed guests with end-to-end permit bookings for Bijrani, Jhirna, Dhela, and Sitabani zones. Since permits open 45 days in advance (and core zones sell out quickly), we strongly recommend booking your campsite stay and safari simultaneously.'
  },
  {
    question: 'Is the campsite safe from wild animals?',
    answer: 'Yes, completely. Our campsite has continuous solar perimeter fencing, well-lit pathways, and round-the-clock trained local wildlife night watchmen and naturalists. While we are right in nature on the Khichri riverbank, animals naturally avoid camp lights and human activity.'
  },
  {
    question: 'Is the campsite shaded and cool during the day?',
    answer: 'Yes, absolutely! The single biggest natural feature of our campsite is that it is surrounded by mature mango trees all around. Every cottage, pathway, and common relaxation area sits under this deep, natural green canopy, providing natural cool shade, gentle breezes, and protection from harsh midday sun. You can comfortably relax on your private teak balcony at any time of day.'
  },
  {
    question: 'What is included in the night tariff?',
    answer: 'Your cottage tariff is ₹3,250 + 5% GST per night. It includes accommodation in your chosen private luxury cottage, hand-carved Sheesham king bed, private balcony in each cottage, en-suite natural slate bathroom with continuous running hot water, in-cottage tea/coffee station, and self-guided bird watching around the mango grove and village periphery. 4x4 Jeep safaris are ₹8,200 per vehicle (3 hours duration; includes campsite pickup & drop when booked 72 hours in advance), Dhikala open Canter safaris are ₹2,250 per person (3 hours duration; boarding at gate), bird watching with a dedicated expert guide is ₹1,500 per trip (or free on your own), and evening bonfire setup is ₹1,000 per session at our designated on-premises fire pit (riverside bonfires and walking into the reserve forest are strictly prohibited by forest conservation laws).'
  },
  {
    question: 'How do we reach the campsite from Delhi or Pantnagar?',
    answer: 'By Road: A pleasant 5.5-hour drive (260 km) from New Delhi via Hapur bypass, Moradabad, and Ramnagar. By Train: Daily express trains from Old Delhi to Ramnagar (Ranikhet Express, Corbett City Park Express). We provide pickup and drop service from Ramnagar (30 mins drive) and Kathgodam railway stations.'
  },
  {
    question: 'What are the rules regarding music and alcohol?',
    answer: 'To preserve the delicate tranquility of the jungle and respect wildlife, loud amplified music, DJ speakers, and car honking are strictly prohibited at all times. Guests are welcome to enjoy personal acoustic instruments and quiet conversations by the campfire.'
  }
];

export const RETREAT_MENU: MenuItem[] = [
  // Breakfast
  {
    id: 'bf-1',
    name: 'Pahadi Kumaoni Breakfast Platter',
    category: 'breakfast',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Hot puffed pooris served with spiced Aloo ke Gutke, mountain yellow lentils, fresh curd, and house-made mint-coriander chutney.'
  },
  {
    id: 'bf-2',
    name: 'Farm Fresh Organic Eggs to Order',
    category: 'breakfast',
    isPahadiSpecialty: false,
    diet: 'non-veg',
    description: 'Scrambled, fried, or classic masala omelet made with free-range eggs, accompanied by buttered artisan toast and roasted tomatoes.'
  },
  {
    id: 'bf-3',
    name: 'Golden Wild Honey Porridge Bowl',
    category: 'breakfast',
    isPahadiSpecialty: false,
    diet: 'veg',
    description: 'Warm mountain oats or toasted muesli served with sliced local orchard fruits, roasted almonds, and raw Corbett forest honey.'
  },

  // Lunch
  {
    id: 'lu-1',
    name: 'Traditional Kumaoni Village Thali',
    category: 'lunch',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Nutritious Bhatt ki Churkani (black soybean curry), Gahat (horsegram) dal, Mandua finger-millet rotis, steamed Basmati rice, and Pahadi mustard raita.'
  },
  {
    id: 'lu-2',
    name: 'North Indian Homestyle Thali',
    category: 'lunch',
    isPahadiSpecialty: false,
    diet: 'veg',
    description: 'Paneer lababdar, yellow dal tadka with desi ghee tempering, seasonal vegetable subzi, hot butter tandoori phulkas, and fresh garden salad.'
  },
  {
    id: 'lu-3',
    name: 'Slow-Cooked Pahadi Desi Kukkad (Chicken Curry)',
    category: 'lunch',
    isPahadiSpecialty: true,
    diet: 'non-veg',
    description: 'Village-style free-range chicken simmered in a rich onion-tomato gravy infused with roasted wild coriander and dried hill red chilies.'
  },

  // High Tea & Evening Bites
  {
    id: 'ht-1',
    name: 'Riverside Onion & Mountain Potato Pakoras',
    category: 'hightea',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Crispy gram-flour fritters tossed with fresh mountain herbs, served straight from the kadhai with steaming ginger-tulsi chai.'
  },
  {
    id: 'ht-2',
    name: 'Artisanal Jute-Pot Filter Coffee',
    category: 'hightea',
    isPahadiSpecialty: false,
    diet: 'veg',
    description: 'Slow-dripped dark roast coffee brewed with milk and raw brown jaggery, ideal for sunset views over the Khichri River.'
  },

  // Bonfire Barbecue & Starters
  {
    id: 'bbq-1',
    name: 'Charcoal Smoked Paneer Tikka',
    category: 'barbecue',
    isPahadiSpecialty: false,
    diet: 'veg',
    description: 'Fresh farmhouse cottage cheese marinated in hung curd, roasted gram flour, and mustard oil, charred over glowing bonfire embers.'
  },
  {
    id: 'bbq-2',
    name: 'Corbett Spiced Chicken Skewers',
    category: 'barbecue',
    isPahadiSpecialty: true,
    diet: 'non-veg',
    description: 'Juicy boneless chicken thighs basted with mountain garlic, wild mint, and crushed black pepper roasted over glowing bonfire embers.'
  },
  {
    id: 'bbq-3',
    name: 'Ember-Roasted Sweet Corn & Mushrooms',
    category: 'barbecue',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Fresh sweet corn cobs rubbed with lime and rock salt, alongside wild forest mushrooms glazed in garlic herb butter.'
  },

  // Dinner
  {
    id: 'dn-1',
    name: 'Overnight Simmered Dal Makhani',
    category: 'dinner',
    isPahadiSpecialty: false,
    diet: 'veg',
    description: 'Whole black lentils slow-cooked on low wood fire for 12 hours with fresh butter and cream, served with aromatic Jeera Pulao.'
  },
  {
    id: 'dn-2',
    name: 'Kumaoni Mutton Kanti / Rogan Curry',
    category: 'dinner',
    isPahadiSpecialty: true,
    diet: 'non-veg',
    description: 'Tender goat meat slow-braised in an aromatic broth of whole Kashmiri spices, bay leaves, and roasted Kumaon coriander seeds.'
  },
  {
    id: 'dn-3',
    name: 'Warm Hill Kheer with Saffron & Forest Pine Nuts',
    category: 'dinner',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Fragrant Basmati rice simmered in thickened whole milk, flavored with green cardamom, Kashmiri saffron strands, and roasted nuts.'
  },

  // Beverages & Coolers
  {
    id: 'bv-1',
    name: 'Chilled Buransh (Rhododendron) Nectar',
    category: 'beverages',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Pure blossom nectar extracted from wild Himalayan scarlet rhododendron flowers, served with lemon squeeze and crushed ice.'
  },
  {
    id: 'bv-2',
    name: 'Pahadi Masala Chaas (Spiced Buttermilk)',
    category: 'beverages',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Fresh churned cultured yogurt beverage tempered with roasted cumin, Himalayan pink rock salt, and chopped green chilies.'
  },
  {
    id: 'bv-3',
    name: 'Himalayan Spiced Lemongrass & Ginger Brew',
    category: 'beverages',
    isPahadiSpecialty: true,
    diet: 'veg',
    description: 'Fresh garden lemongrass stalks, crushed ginger, whole cloves, green cardamom, and fragrant whole spices slow-steeped together into a soothing fireside herbal tea.'
  }
];

export const RETREAT_ACTIVITIES: ActivityItem[] = [
  {
    id: 'activity-river-walk',
    title: 'Dawn Khichri River & Village Pebble Walking',
    tagline: 'Pugmark tracking, freshwater otters & wading along crystal stream shallows',
    category: 'river-trails',
    categoryLabel: 'River & Village Trails',
    duration: '1.5 - 2 Hours',
    timing: 'Dawn 06:30 AM - 08:30 AM',
    defaultPrice: '₹500 / person',
    locationTip: 'Khichri Riverbank shallows & village paths outside forest boundary',
    description: 'Step out at sunrise along the crystal Khichri river pebbles and village trails outside the reserve forest (walking into the protected forest is strictly prohibited by law). Follow our resident naturalist along the pebble banks to discover fresh tiger and leopard pugmarks made during the night, look for playful river otters, and spot resident kingfishers and wagtails dipping in crystal pools.',
    highlights: [
      'Pugmark cast identification & wildlife tracking on river sand',
      'Safe river pebble walk & village paths (forest walking prohibited)',
      'Spotting river otters & resident kingfishers',
      'Fresh morning mountain breeze and misty canopy vistas'
    ],
    included: [
      'Certified camp naturalist guide',
      'Olympus safari binoculars provided for the walk',
      'Steaming hot ginger-lemongrass tea on the riverbank'
    ],
    defaultPhotos: {
      locationImg: '/assets/aistudio/07aad3fc-dbfa-48fd-853e-38c428b06174_b915dab3.jpeg',
      locationCaption: 'Pristine pebble bends and turquoise shallows of the Khichri River',
      hostsImg: mangoHeroImg,
      hostsCaption: 'Our camp naturalist host showing fresh pugmarks and river flora',
      guestsImg: wildlifeBirdsImg,
      guestsCaption: 'Morning wildlife and bird spotting along the stream edge'
    }
  },
  {
    id: 'activity-bird-watching',
    title: 'Corbett Bird Watching & Village Trails',
    tagline: 'Self-guided: Free / No price | Expert bird watching guide: ₹1,500 / trip',
    category: 'river-trails',
    categoryLabel: 'River & Village Trails',
    duration: '2 Hours',
    timing: 'Morning 06:30 AM or Afternoon 03:30 PM',
    defaultPrice: 'Free (Self-Guided) | ₹1,500 / trip (With Guide)',
    locationTip: 'Heritage mango grove, cottage balconies & village periphery',
    description: 'Our campsite is home to over 150 resident and migratory Himalayan bird species. If guests explore on their own around our shaded mango grove, their private cottage balcony, or along the village periphery, there is NO PRICE (complimentary binoculars and bird identification books are available at camp). If you would like an expert bird watching guide to accompany your group on a private guided excursion, the charge is ₹1,500 per trip. Please note: walking into the reserve forest is strictly prohibited by forest department regulations, so all walking trails are safely held along peaceful village roads, orchards, and river pebble banks.',
    highlights: [
      'On your own: 100% Free / No Charge with complimentary camp binoculars & guidebooks',
      'Accompanied by dedicated expert bird watching guide: ₹1,500 per trip',
      'Safe village trails & mango canopy (walking into reserve forest is prohibited)',
      'Spot Asian Paradise Flycatcher, Himalayan Monal, Hornbills, Crested Kingfisher, & Treepies'
    ],
    included: [
      'Self-guided: Free binoculars & field bird identification book',
      'Guided trip: Dedicated expert bird watching guide for your group (₹1,500 / trip)',
      'Fresh mountain herbal tea on return'
    ],
    defaultPhotos: {
      locationImg: wildlifeBirdsImg,
      locationCaption: 'Red-billed Blue Magpie & spotted deer by the morning pebble bed',
      hostsImg: mangoHeroImg,
      hostsCaption: 'Shaded mango orchard around the cottages alive with birdsong',
      guestsImg: cottageInteriorImg,
      guestsCaption: 'Spotting birds right from your private cottage balcony'
    }
  },
  {
    id: 'activity-corbett-safari',
    title: 'Private 4x4 Jim Corbett Gypsy Safari',
    tagline: 'Open 4x4 Maruti Gypsy deep inside Corbett core tiger zones',
    category: 'safari-wildlife',
    categoryLabel: 'Wildlife & Safaris',
    duration: '3 Hours',
    timing: 'Morning 06:00 AM / Afternoon 02:30 PM',
    defaultPrice: '₹8,200 / Gypsy (up to 6 guests)',
    locationTip: 'Bijrani / Jhirna / Dhela / Garjiya Safari Gates',
    description: 'Embark on the quintessential Corbett safari in a government-authorized open 4x4 Gypsy. 3-hour expedition through scenic grasslands (chaurs), riverine riverbeds, and dense bamboo forests tracking tiger pugmarks and deer alarm calls. ₹8,200 per private Gypsy. Door-to-door campsite pickup and drop is exclusively available for Jeep safari when booked at least 72 hours in advance.',
    highlights: [
      'Exclusive open 4x4 Gypsy private to your group (up to 6 guests)',
      'Exact 3 Hours core/buffer zone safari duration',
      'Door-to-door pickup & drop for Jeep safari (when booked 72 hrs in advance)',
      'Full assistance with government forest department permits'
    ],
    included: [
      'Private Maruti Gypsy & fuel',
      'Government authorized forest guide',
      'All gate permits & road cess taxes',
      'Door-to-door pickup & drop (only available when booked 72 hrs in advance)'
    ],
    defaultPhotos: {
      locationImg: safariImg,
      locationCaption: 'Open grasslands and bamboo groves in Corbett core zones',
      hostsImg: campfireImg,
      hostsCaption: 'Hosts coordinating safari permits and early morning gate departures',
      guestsImg: heroImg,
      guestsCaption: 'Excited guests on an open Gypsy tracking tiger calls in the wild'
    }
  },
  {
    id: 'activity-canter-safari',
    title: 'Dhikala Core Zone Open Canter Safari',
    tagline: 'Official Forest Dept open canter deep into Corbett premier tiger grassland',
    category: 'safari-wildlife',
    categoryLabel: 'Wildlife & Safaris',
    duration: '3 Hours',
    timing: 'Morning 05:45 AM / Afternoon 11:30 AM',
    defaultPrice: '₹2,250 / person',
    locationTip: 'Dhikala Tourism Zone Gate',
    description: 'Board the official open Safari Canter into Corbett’s iconic Dhikala zone. Famous worldwide for vast savannah grasslands, wild Asiatic elephant herds, Ramganga river views, and tigers. ₹2,250 per person inclusive of government seat permit and naturalist. (Note: Canter boarding takes place directly at the designated Forest Department gate; door-to-door pickup is only available for Jeep safaris booked 72 hrs in advance).',
    highlights: [
      'Official Forest Department open Canter Safari into Dhikala core',
      'Fixed per person pricing: ₹2,250 per passenger',
      'Vast Ramganga reservoir & high tiger and elephant density',
      '3-hour expedition with forest department naturalist guide'
    ],
    included: [
      'Open Canter seat permit issued by Uttarakhand Forest Dept',
      'Certified naturalist guide on board',
      'All forest entry taxes and cess',
      'Boarding at designated Forest Dept Gate (door-to-door pickup not available for Canter)'
    ],
    defaultPhotos: {
      locationImg: safariImg,
      locationCaption: 'Open grasslands of Dhikala zone',
      hostsImg: tentImg,
      hostsCaption: 'Camp hosts providing gate assistance',
      guestsImg: heroImg,
      guestsCaption: 'Guests on board the open Canter in Dhikala'
    }
  },
  {
    id: 'activity-bonfire-lore',
    title: 'Starlit On-Premises Bon-fire & Kumaoni Lore',
    tagline: 'Warm embers, acoustic forest melodies & thrilling tiger encounters',
    category: 'evenings',
    categoryLabel: 'Evening & Campfire',
    duration: '2.5 Hours',
    timing: 'Every Evening 07:30 PM - 10:00 PM',
    defaultPrice: '₹1,000 / session',
    locationTip: 'Designated Fire Pit Inside Retreat Premises',
    description: 'As dusk settles over the Kumaon foothills, gather around our circular stone fire pit safely located inside the retreat premises (riverside bonfires are strictly prohibited by forest rules). Available for a setup fee of ₹1,000 at our designated on-premises pit. Listen to seasoned local trackers share hair-raising true tales of Jim Corbett and wildlife encounters while savouring appetizers and warm spiced lemongrass & ginger tea.',
    highlights: [
      'Evening bonfire gathering at designated on-premises pit',
      'Wildlife trackers recounting historic Corbett stories',
      'Cosy woollen blankets and fireside cane chairs',
      'Warm Pahadi appetizers and roasted corn'
    ],
    included: [
      'Bonfire setup at designated on-premises fire pit (₹1,000 fee)',
      'Warm Pahadi appetizers & herbal tea by the embers',
      'Folk storytelling session'
    ],
    defaultPhotos: {
      locationImg: campfireImg,
      locationCaption: 'Circular stone fire pit glowing under the dark night sky',
      hostsImg: tentImg,
      hostsCaption: 'Hosts sharing folklore and roasting mountain treats with travelers',
      guestsImg: campfireImg,
      guestsCaption: 'Guests wrapped in blankets laughing around the golden embers'
    }
  },
  {
    id: 'activity-barbecue-night',
    title: 'Fireside Bonfire Barbecue & Skewer Night',
    tagline: 'Charcoal grilled kebabs, roasted sweet corn & herb marinades by the fire',
    category: 'evenings',
    categoryLabel: 'Evening & Campfire',
    duration: '2 Hours',
    timing: 'Evenings 08:00 PM onwards',
    defaultPrice: '₹850 / person',
    locationTip: 'At the central campfire circle under the trees',
    description: 'An open-air culinary experience where our chef fires up live charcoal grates beside the bonfire circle. Enjoy freshly skewered paneer tikka, marinated seasonal river catch, Himalayan wild mushrooms, charred spiced potatoes, and mint-coriander chutneys.',
    highlights: [
      'Live charcoal barbecue setup by the bonfire circle',
      'Fresh vegetarian and non-vegetarian skewers',
      'Homemade hill herb dips and hot buttered pav',
      'Dine under lanterns and celestial stars'
    ],
    included: [
      'Chef-curated skewer platter',
      'Unlimited side chutneys & salads',
      'Fireside service'
    ],
    defaultPhotos: {
      locationImg: campfireImg,
      locationCaption: 'Glowing charcoal grill set against the starlit riverbed',
      hostsImg: tentImg,
      hostsCaption: 'Our chef basting skewers with Himalayan mountain butter',
      guestsImg: heroImg,
      guestsCaption: 'Guests enjoying hot skewers fresh off the coal skewers'
    }
  },
  {
    id: 'activity-stargazing',
    title: 'Dark-Sky Constellation & Stargazing Session',
    tagline: 'Bortle-2 dark skies, planet rings & Milky Way galaxy exploration',
    category: 'evenings',
    categoryLabel: 'Evening & Campfire',
    duration: '1.5 Hours',
    timing: 'Post Dinner 09:30 PM - 11:00 PM',
    defaultPrice: '₹350 / person',
    locationTip: 'North Deck open viewing area, minimal light spill',
    description: 'With virtually zero urban light pollution, the night sky over our valley reveals the brilliant arch of the Milky Way. Using our refractor telescope and sky map laser guides, gaze into the craters of the Moon, Jupiter’s Galilean moons, and the rings of Saturn.',
    highlights: [
      'Deep astronomical telescope viewing',
      'Laser-guided constellation tour (Orion, Ursa Major, Cassiopeia)',
      'Astrophotography guidance for smartphones and DSLRs',
      'Hot spiced lemongrass & ginger tea served during the session'
    ],
    included: [
      'High-power telescope access',
      'Astronomy guide & constellation map',
      'Hot herbal fireside brew'
    ],
    defaultPhotos: {
      locationImg: heroImg,
      locationCaption: 'Crystal clear dark mountain sky free from city glow',
      hostsImg: campfireImg,
      hostsCaption: 'Host aligning telescope towards Saturn and lunar craters',
      guestsImg: tentImg,
      guestsCaption: 'Guests marveling at the rings of Saturn through eyepiece'
    }
  },
  {
    id: 'activity-village-walk',
    title: 'Kyari Village Heritage & Organic Farm Walk',
    tagline: 'Authentic Pahadi village life, organic terraced crops & local chai',
    category: 'wellness-culture',
    categoryLabel: 'Culture & Wellness',
    duration: '2 Hours',
    timing: 'Morning 09:30 AM or Evening 04:00 PM',
    defaultPrice: '₹300 / person',
    locationTip: 'Kyari Village, 10 min scenic walk across stream',
    description: 'Cross the small footbridge into the traditional hamlet of Kyari. Walk through terraced fields of finger millet, organic mustard, and seasonal vegetables. Meet warm Kumaoni farming families, see traditional carved wooden doorframes, and enjoy freshly brewed tea at a village home.',
    highlights: [
      'Interact with genuine Kumaoni village elders',
      'Pick fresh organic radishes, coriander, and greens',
      'Admire traditional Kumaoni timber architecture',
      'Support local village women handicraft collectives'
    ],
    included: [
      'Village escort & interpreter host',
      'Traditional clay cup chai & local hill snack',
      'Contribution to Kyari village welfare fund'
    ],
    defaultPhotos: {
      locationImg: heroImg,
      locationCaption: 'Terraced green mustard fields and traditional stone cottages',
      hostsImg: tentImg,
      hostsCaption: 'Hosts introducing travelers to local farming families',
      guestsImg: safariImg,
      guestsCaption: 'Guests sampling freshly picked hill herbs with villagers'
    }
  },
  {
    id: 'activity-morning-yoga',
    title: 'Riverbank Meditation, Yoga & Mindfulness Breathing',
    tagline: 'Silent sunrise & golden-hour meditation to the rhythm of flowing river rapids',
    category: 'wellness-culture',
    categoryLabel: 'Culture & Wellness',
    duration: '1 Hour',
    timing: 'Dawn & Dusk Golden Hour',
    defaultPrice: 'Complimentary (Included with Stay)',
    locationTip: 'Smooth pebble river beach beside the running stream',
    description: 'Begin or unwind your day grounded in pristine nature. Sit in peaceful stillness on the cool river pebbles for riverbank meditation, gentle stretching, and deep Pranayama breathwork synchronized with the flowing mountain river and forest birdsong—offered completely complimentary to all retreat guests with no extra price.',
    highlights: [
      'Completely complimentary—no price for retreat guests',
      'Invigorating mountain oxygen and soothing river breeze',
      'Suitable for all experience levels, solo quiet reflection or guided breathwork',
      'Natural soundscape of flowing rapids & morning songbirds'
    ],
    included: [
      'Clean jute meditation & yoga mats available at camp',
      'Quiet riverbank pebble access steps from the orchard',
      'Complimentary herbal tea upon return to camp'
    ],
    defaultPhotos: {
      locationImg: '/assets/aistudio/4f157062-94f5-44e6-8158-045f3e050269_c7b2f2f7.jpeg',
      locationCaption: 'Golden sun reflecting across the tranquil Khichri River pebble stream',
      hostsImg: tentImg,
      hostsCaption: 'Peaceful riverbank breathing & mindfulness gathering',
      guestsImg: campfireImg,
      guestsCaption: 'Quiet evening reflection & meditation by the water'
    }
  },
  {
    id: 'activity-xtreme-zone',
    title: 'Xtreme Zone Adventure Park',
    tagline: 'High-adrenaline outdoor adventures: zipline, sky rope course, Burma bridge & rock climbing',
    category: 'adventure',
    categoryLabel: 'Adventure & Xtreme Zone',
    duration: '2 - 3 Hours',
    timing: 'Open Daily 09:30 AM - 05:30 PM',
    defaultPrice: 'From ₹500 / activity (Combos available)',
    locationTip: 'Xtreme Zone Adventure Park, near campsite',
    description: 'An action-packed adventure park where thrill-seekers of all ages can test their courage. Soar on an aerial zipline across scenic valley lines, cross the swaying multi-tier Burma Bridge, tackle tire walks, commando net climbs, and natural rock climbing towers. Fully supervised by certified safety marshals using international-standard harnesses, carabiners, and safety helmets.',
    highlights: [
      'High-speed aerial zipline with mountain orchard vistas',
      'Multi-tier Burma Bridge, tire crossings & rope bridge circuits',
      'Rock climbing wall & rappelling challenges',
      'Certified double-carabiner safety harness & safety gear',
      'Thrilling fun for adults, teens, and adventurous kids'
    ],
    included: [
      'International UIAA-certified safety harness & helmet',
      'Professional adventure marshal instruction & supervision',
      'Access to chosen activity circuit or multi-challenge adventure pass'
    ],
    defaultPhotos: {
      locationImg: riverXtremeImg,
      locationCaption: 'High zipline wire suspended over green valley and river stream',
      hostsImg: safariImg,
      hostsCaption: 'Adventure marshals checking double-carabiner harnesses',
      guestsImg: campfireImg,
      guestsCaption: 'Travelers soaring across scenic zipline & rope courses'
    }
  },
  {
    id: 'activity-village-home-feast',
    title: 'Traditional Kumaoni Village Home Feast & Family Gathering',
    tagline: 'Step into a genuine Pahadi village home, watch food cook on clay chulhas & dine with a local family',
    category: 'wellness-culture',
    categoryLabel: 'Culture & Wellness',
    duration: '2.5 - 3 Hours',
    timing: 'Lunch 12:30 PM - 03:00 PM or Early Dinner 06:30 PM - 09:00 PM',
    defaultPrice: '₹850 / person (Hosted directly by village family)',
    locationTip: 'Kyari Village ancestral stone homestead, short scenic stroll from retreat',
    description: 'A deeply personal and authentic cultural highlight. Take a peaceful village walk to the ancestral stone-and-mud home of a welcoming Kumaoni farming family. Be greeted with traditional hill hospitality, sit beside the warm glow of their clay wood stove (mitti ka chulha), and watch as the family lovingly prepares a rustic mountain feast right before you using organic produce freshly harvested from their terraced gardens. Sip hot Pahadi spiced chai, exchange heartfelt stories with village elders, and share a communal family feast of hand-rolled Mandua (finger millet) rotis, Bhatt ki Churkani (slow-simmered black bean curry), Aloo ke Gutke, mountain mustard seed raita, fresh mint-coriander chutneys, and sweet Jhangora (barnyard millet) kheer.',
    highlights: [
      'Heartfelt invitation into an authentic traditional Kumaoni stone homestead',
      'Home-cooked meal prepared live on a traditional wood-fired clay chulha',
      '100% organic ingredients harvested directly from the family backyard farm',
      'Warm conversations, hill folklore, and genuine cultural bonding with the hosts',
      'Dine together family-style with fresh hot rotis served straight off the griddle',
      'Directly supports and empowers local village farming households'
    ],
    included: [
      'Complete authentic multi-course traditional Kumaoni home-cooked meal',
      'Welcome mountain spiced herbal tea and Pahadi appetisers',
      'Scenic escort to and from the village home across rural orchard paths',
      'Direct community contribution supporting the host family'
    ],
    defaultPhotos: {
      locationImg: villageFeastImg,
      locationCaption: 'Authentic Kumaoni feast cooked fresh at a Kyari village homestead',
      hostsImg: mangoHeroImg,
      hostsCaption: 'Warm Pahadi hosts preparing hand-rolled Mandua flatbreads',
      guestsImg: cottageInteriorImg,
      guestsCaption: 'Unforgettable farm-to-table cultural hospitality'
    }
  }
];
