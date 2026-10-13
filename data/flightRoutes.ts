export interface FlightRoute {
  id: string;
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  region: 'gcc-kerala' | 'domestic' | 'international';
  airlineHint: string;
  flightType: string;
  badge?: string;
}

export const POPULAR_ROUTES: FlightRoute[] = [
  {
    id: 'ruh-cok',
    fromCity: 'Riyadh',
    fromCode: 'RUH',
    toCity: 'Kochi (Cochin)',
    toCode: 'COK',
    region: 'gcc-kerala',
    airlineHint: 'Saudia, Air India Express, IndiGo',
    flightType: 'Direct & 1-Stop',
    badge: 'Popular GCC',
  },
  {
    id: 'jed-trv',
    fromCity: 'Jeddah',
    fromCode: 'JED',
    toCity: 'Thiruvananthapuram',
    toCode: 'TRV',
    region: 'gcc-kerala',
    airlineHint: 'Saudia, Air India Express, Gulf Air',
    flightType: 'Direct & 1-Stop',
    badge: 'High Demand',
  },
  {
    id: 'dmm-ccj',
    fromCity: 'Dammam',
    fromCode: 'DMM',
    toCity: 'Kozhikode (Calicut)',
    toCode: 'CCJ',
    region: 'gcc-kerala',
    airlineHint: 'Air India Express, IndiGo, Flynas',
    flightType: 'Direct Flights',
    badge: 'Daily Direct',
  },
  {
    id: 'dxb-cok',
    fromCity: 'Dubai',
    fromCode: 'DXB',
    toCity: 'Kochi (Cochin)',
    toCode: 'COK',
    region: 'gcc-kerala',
    airlineHint: 'Emirates, flydubai, Air India, IndiGo',
    flightType: 'Multiple Daily Directs',
    badge: 'Top Route',
  },
  {
    id: 'kwi-cok',
    fromCity: 'Kuwait City',
    fromCode: 'KWI',
    toCity: 'Kochi (Cochin)',
    toCode: 'COK',
    region: 'gcc-kerala',
    airlineHint: 'Kuwait Airways, Jazeera, IndiGo',
    flightType: 'Direct & 1-Stop',
  },
  {
    id: 'doh-ccj',
    fromCity: 'Doha',
    fromCode: 'DOH',
    toCity: 'Kozhikode (Calicut)',
    toCode: 'CCJ',
    region: 'gcc-kerala',
    airlineHint: 'Qatar Airways, Air India Express',
    flightType: 'Direct Flights',
  },
  {
    id: 'del-cok',
    fromCity: 'Delhi',
    fromCode: 'DEL',
    toCity: 'Kochi',
    toCode: 'COK',
    region: 'domestic',
    airlineHint: 'IndiGo, Air India, Akasa Air',
    flightType: 'Frequent Daily Directs',
  },
  {
    id: 'del-sxr',
    fromCity: 'Delhi',
    fromCode: 'DEL',
    toCity: 'Srinagar (Kashmir)',
    toCode: 'SXR',
    region: 'domestic',
    airlineHint: 'IndiGo, Air India, SpiceJet',
    flightType: 'Scenic Direct',
  },
  {
    id: 'cok-mle',
    fromCity: 'Kochi',
    fromCode: 'COK',
    toCity: 'Maldives (Male)',
    toCode: 'MLE',
    region: 'international',
    airlineHint: 'IndiGo, Maldivian Airlines',
    flightType: 'Quick 1h 30m Direct',
    badge: 'Short Flight',
  },
];
