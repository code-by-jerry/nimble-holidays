export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  durationDays: number;
  durationNights: number;
  route: string;
  destinationIds: string[];
  image: string;
  description: string;
  inclusions: string[];
  highlights: string[];
  startingPriceINR: number;
  startingPriceSAR: number;
  tag: string;
  featured?: boolean;
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-kerala-classic',
    title: 'Kerala Classic: Backwaters & Misty Hills',
    subtitle: 'From historic Cochin to misty tea gardens and tranquil houseboat lagoons',
    category: 'Kerala Flagship',
    durationDays: 7,
    durationNights: 6,
    route: 'Kochi (1N) → Munnar (2N) → Thekkady (1N) → Alleppey (1N Houseboat) → Marari Beach (1N)',
    destinationIds: ['kochi', 'munnar', 'thekkady', 'alleppey', 'houseboat_exp'],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=85',
    description: 'Our most beloved signature route. Experience the complete essence of God’s Own Country: colonial spice streets in Fort Kochi, misty tea gardens of Munnar, wildlife boat safari in Periyar, and a private luxury houseboat night on the Vembanad Lake.',
    inclusions: [
      '6 nights in premium 4-star hotels & luxury houseboat',
      'Dedicated private air-conditioned car with English/Arabic friendly chauffeur',
      'Daily breakfast + all meals onboard houseboat',
      'Guided spice plantation walk & tea museum entry',
      'Airport pickups and drops at Cochin International Airport (COK)',
    ],
    highlights: ['Private Houseboat Cruise', 'Kolukkumalai Sunrise', 'Periyar Wildlife Safari', 'Fort Kochi Heritage Stroll'],
    startingPriceINR: 28500,
    startingPriceSAR: 1290,
    tag: 'Most Popular',
    featured: true,
  },
  {
    id: 'pkg-kerala-beaches-wellness',
    title: 'Kerala Coastal Breeze & Rejuvenation',
    subtitle: 'Golden cliffside beaches, Poovar estuaries & gentle Ayurvedic relaxation',
    category: 'Relaxation & Wellness',
    durationDays: 6,
    durationNights: 5,
    route: 'Trivandrum → Kovalam (3N) → Varkala (1N) → Poovar Estuary (1N)',
    destinationIds: ['kovalam', 'varkala', 'ayurveda_exp'],
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85',
    description: 'Designed for deep relaxation and coastal serenity. Rest alongside crescent beaches, witness sunset at Varkala’s dramatic cliffs, explore golden Poovar mangrove estuaries, and enjoy authentic Ayurvedic Abhyanga sessions.',
    inclusions: [
      '5 nights in beachside resort with swimming pool & sea views',
      '2 authentic Ayurvedic rejuvenation massage sessions included',
      'Private air-conditioned car for all transfers & excursions',
      'Poovar golden sand island boat cruise',
      'Daily sumptuous coastal Kerala breakfasts',
    ],
    highlights: ['Varkala Cliff Sunset', 'Poovar Estuary Boat Cruise', '2x Ayurvedic Massages', 'Lighthouse Beach Stroll'],
    startingPriceINR: 24900,
    startingPriceSAR: 1120,
    tag: 'Wellness & Beach',
  },
  {
    id: 'pkg-kashmir-heaven',
    title: 'Kashmir Valley & Gulmarg Snowfields',
    subtitle: 'Cedar houseboats on Dal Lake, meadow trails & Gulmarg alpine heights',
    category: 'Domestic Signature',
    durationDays: 7,
    durationNights: 6,
    route: 'Srinagar (2N) → Gulmarg (2N) → Pahalgam (2N)',
    destinationIds: ['kashmir'],
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=85',
    description: 'Step into Paradise on Earth. Float peacefully in a carved cedar shikara across Dal Lake, sleep in heritage houseboats, ride the highest cable car in Gulmarg, and enjoy the snow-fed Lidder River in Pahalgam.',
    inclusions: [
      '5 nights luxury hotel + 1 night heritage cedar houseboat on Dal Lake',
      'Private vehicle with mountain specialist chauffeur',
      'Shikara ride on Dal Lake with floating vegetable market visit',
      'Gulmarg Gondola Phase 1 & 2 guidance',
      'Mughal gardens (Nishat & Shalimar) entries',
    ],
    highlights: ['Dal Lake Shikara Ride', 'Gulmarg Snow Gondola', 'Betaab Valley Pony Trail', 'Floating Market Experience'],
    startingPriceINR: 32500,
    startingPriceSAR: 1470,
    tag: 'Mountain Romance',
    featured: true,
  },
  {
    id: 'pkg-dubai-desert-glamour',
    title: 'Dubai Glamour & Arabian Desert Dunes',
    subtitle: 'Skyline icons, marina yachts & VIP desert safari with starry dinner',
    category: 'International / GCC',
    durationDays: 5,
    durationNights: 4,
    route: 'Dubai Downtown (2N) → Dubai Marina (2N)',
    destinationIds: ['dubai', 'safari_exp'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
    description: 'An unforgettable escape in the City of Gold. Stand atop Burj Khalifa, shop at Dubai Mall and traditional Gold Souks, cruise Dubai Marina on a luxury glass catamaran, and experience thrilling red dune bashing.',
    inclusions: [
      '4 nights in 4-star / 5-star Dubai city hotel with daily breakfast',
      'Red Dune Desert Safari with 4x4, camel ride & BBQ buffet dinner',
      'Burj Khalifa 124th Floor observation deck tickets',
      'Dubai Marina Dhow / Yacht cruise with live entertainment',
      'Private airport transfers to/from Dubai International (DXB)',
    ],
    highlights: ['Burj Khalifa Level 124/125', 'VIP Red Dune 4x4 Safari', 'Dubai Marina Luxury Cruise', 'Miracle Garden & Souks'],
    startingPriceINR: 38900,
    startingPriceSAR: 1750,
    tag: 'GCC Family Favorite',
  },
  {
    id: 'pkg-maldives-lagoon',
    title: 'Maldives Private Overwater Escape',
    subtitle: 'Direct lagoon access, turquoise infinity pools & sea turtle reefs',
    category: 'Luxury Honeymoon',
    durationDays: 5,
    durationNights: 4,
    route: 'Male → Private Island Resort (4N Overwater Villa)',
    destinationIds: ['maldives'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85',
    description: 'The definitive turquoise romance. Stay in a private overwater villa with ocean sun deck, snorkel along coral drop-offs teeming with sea turtles, and enjoy all-inclusive gourmet island dining with champagne sunsets.',
    inclusions: [
      '4 nights in luxury Overwater Pavilion Villa',
      'Return speed boat / seaplane transfers from Velana Airport (MLE)',
      'All-inclusive meal plan (breakfast, lunch, dinner & beverages)',
      'Complimentary coral reef snorkelling equipment & non-motorized water sports',
      'Sunset dolphin spotting cruise',
    ],
    highlights: ['Private Overwater Villa', 'Nurse Shark Snorkelling', 'Sunset Dolphin Cruise', 'Candlelit Beach Dinner'],
    startingPriceINR: 76000,
    startingPriceSAR: 3420,
    tag: 'Ultra Luxury',
  },
  {
    id: 'pkg-thailand-islands',
    title: 'Thailand Tropical Discovery: Bangkok & Phuket',
    subtitle: 'Gilded Buddhist temples, street food alleys & emerald karst bays',
    category: 'International Explorer',
    durationDays: 6,
    durationNights: 5,
    route: 'Bangkok (2N) → Phuket (3N)',
    destinationIds: ['thailand'],
    image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=85',
    description: 'The perfect mix of urban vibrant culture and world-class island bliss. Explore Bangkok’s Grand Palace and Chao Phraya river ferries, then fly south to Phuket for speedboat trips across Maya Bay and Phi Phi Islands.',
    inclusions: [
      '5 nights accommodation in boutique central hotels',
      'Domestic flight Bangkok to Phuket included',
      'Full-day Phi Phi & Maya Bay Speedboat Tour with lunch',
      'Bangkok City & Temple tour (Wat Pho, Wat Arun)',
      'All airport transfers in private air-conditioned vehicles',
    ],
    highlights: ['Phi Phi Islands Speedboat', 'Bangkok Grand Palace', 'James Bond Island', 'Chao Phraya River Cruise'],
    startingPriceINR: 35500,
    startingPriceSAR: 1600,
    tag: 'Island Adventure',
  },
];
