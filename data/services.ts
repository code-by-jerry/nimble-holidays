export interface TravelService {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  color: string;
  badge?: string;
  href?: string;
}

export const TRAVEL_SERVICES: TravelService[] = [
  {
    id: 'svc-doorstep-transit',
    name: 'Doorstep-to-Doorstep Transit Care',
    tagline: 'Complete Journey Combo: Flights, airport reception & private chauffeur drop right to your home',
    description:
      'From your origin city abroad or interstate directly to your home address. We manage flight booking, luggage allowance, airport arrival meet-and-greet with name placard, and a sanitized private chauffeur vehicle waiting to drive you right to your front door.',
    iconName: 'Home',
    features: [
      'Origin-to-doorstep journey coordination (GCC to South India)',
      'Flight tickets with verified baggage allowance & family seating',
      'Arrival terminal reception with name board & luggage portering',
      'Direct chauffeur vehicle to your home (Coimbatore, Kerala & beyond)',
      'Tailored options: Family with kids, Solo travellers, Couples & Senior citizens',
    ],
    color: '#20a88a',
    badge: 'Flagship Combo Pack',
    href: '/services/doorstep-transit',
  },
  {
    id: 'svc-flights',
    name: 'Flight Booking Assistance',
    tagline: 'Competitive domestic and international fares with fast WhatsApp quotes',
    description: 'We track multi-airline fares, seat availability, luggage allowances, and GCC connections to get you the best combination of price and flight schedule.',
    iconName: 'Plane',
    features: ['GCC direct flights & connections', 'Baggage allowance coordination', 'Group flight discounts', 'Instant WhatsApp e-ticket sharing'],
    color: '#318bc6',
    href: '/flights',
  },
  {
    id: 'svc-hotels',
    name: 'Curated Hotels & Luxury Stays',
    tagline: 'Inspected heritage bungalows, 5-star resorts, and authentic homestays',
    description: 'Avoid internet booking surprises. Our team physically inspects accommodations in Kerala, India, and abroad to ensure cleanliness, hospitable service, and prime locations.',
    iconName: 'Building',
    features: ['Direct contracted hotel rates', 'Private pool villas & heritage estates', 'Halal & vegetarian meal preferences', 'Family interconnecting room requests'],
    color: '#20a88a',
  },
  {
    id: 'svc-transfers',
    name: 'Airport Transfers & Private Fleet',
    tagline: 'Chauffeur-driven sedans, luxury SUVs, and spacious family tempo vans',
    description: 'Punctual, polite, and uniformed drivers waiting at the terminal with your name board. Modern, sanitized, air-conditioned vehicles fitted with GPS.',
    iconName: 'Car',
    features: ['Cochin, Trivandrum & Calicut airport desks', 'Innova Crysta, Fortuner & Urbania vans', 'Drivers speaking Malayalam, Hindi & English', 'Tolls, parking & driver allowances included'],
    color: '#f89a2e',
  },
  {
    id: 'svc-ayurveda',
    name: 'Kerala Ayurveda & Wellness Stays',
    tagline: 'NABH-accredited healing retreats with resident Vaidyas and Satvik cuisine',
    description: 'Hand-picked authentic Ayurvedic resorts along Kerala backwaters and beaches. Individualized dosha consultations, medicated herbal therapies, and daily yoga.',
    iconName: 'Sparkles',
    features: ['Certified Ayurvedic doctors & therapists', 'Tailored herbal diets & yoga sessions', 'Panchakarma & anti-stress treatments', 'Peaceful natural waterfront settings'],
    color: '#10b981',
    href: '/ayurveda',
  },
  {
    id: 'svc-sightseeing',
    name: 'Curated Sightseeing & Local Guides',
    tagline: 'Certified local storytellers, skip-the-line entries, and cultural immersions',
    description: 'Deepen your journey with licensed local guides who explain hidden histories, arrange artisanal spice tastings, and take you past tourist crowds into authentic communities.',
    iconName: 'Compass',
    features: ['Licensed English/Arabic speaking guides', 'Skip-the-line monument entries', 'Village craft & cuisine workshops', 'Private boat rentals & wildlife safaris'],
    color: '#42bfd8',
  },
  {
    id: 'svc-custom',
    name: 'Tailor-Made Corporate & Group Trips',
    tagline: 'Custom group planning, family reunions, and executive incentive getaways',
    description: 'Managing 10 to 100+ travellers requires precision. We coordinate group accommodations, dedicated coaches, custom banquets, and stage entertainment effortlessly.',
    iconName: 'Users',
    features: ['Dedicated 24/7 group coordinator', 'Customized welcome kits & banners', 'Bespoke culinary menus & banquets', 'Flexible group cancellation policies'],
    color: '#ed373b',
  },
];

