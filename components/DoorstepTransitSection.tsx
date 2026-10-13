'use client';

import React, { useState } from 'react';
import { CONTACT_INFO, getWhatsAppLink } from '@/data/contact';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  Home,
  Plane,
  Car,
  Users,
  ShieldCheck,
  CheckCircle2,
  Send,
  MapPin,
  ArrowRight,
  Luggage,
  HeartHandshake,
  Clock,
  Sparkles,
  PhoneCall,
  UserCheck,
  Check,
  Copy,
} from 'lucide-react';

const POPULAR_ORIGINS = [
  'Dubai (DXB)',
  'Abu Dhabi (AUH)',
  'Doha (DOH)',
  'Riyadh / Jeddah (KSA)',
  'Muscat (MCT)',
  'Singapore (SIN)',
  'London (LHR)',
  'Chennai / Bengaluru',
];

const POPULAR_DESTINATIONS = [
  'Coimbatore & Surrounds',
  'Palakkad & Malabar',
  'Mavelikkara & Onattukara',
  'Kochi / Ernakulam',
  'Trivandrum / Kollam',
  'Tirupur / Erode',
  'Thrissur Cultural Hub',
  'Calicut / Wayanad',
];

const PASSENGER_PROFILES = [
  {
    id: 'family',
    title: 'Family with Kids',
    tagline: 'Extra luggage boot space, AC Innova Crysta, child safety pacing',
    icon: Users,
    badge: 'Most Popular',
  },
  {
    id: 'solo',
    title: 'Solo Traveller',
    tagline: 'Verified driver, 24/7 WhatsApp live location sharing for peace of mind',
    icon: UserCheck,
    badge: 'Safe & Verified',
  },
  {
    id: 'couple',
    title: 'Couple / Honeymoon',
    tagline: 'Private executive sedan or SUV, seamless luggage transition',
    icon: HeartHandshake,
    badge: 'Private & Relaxed',
  },
  {
    id: 'elderly',
    title: 'Senior Citizens / Parents Alone',
    tagline: 'Airport wheelchair escort, porter support & driver helping right to front door',
    icon: ShieldCheck,
    badge: 'Extra Gentle Care',
  },
];

export const DoorstepTransitSection: React.FC = () => {
  // Form State
  const [origin, setOrigin] = useState('Dubai (DXB)');
  const [customOrigin, setCustomOrigin] = useState('');
  const [destination, setDestination] = useState('Coimbatore & Surrounds');
  const [customDestination, setCustomDestination] = useState('');
  const [passengerType, setPassengerType] = useState('family');
  const [adults, setAdults] = useState('2');
  const [children, setChildren] = useState('1');
  const [travelDate, setTravelDate] = useState('');
  const [includeFlight, setIncludeFlight] = useState(true);
  const [includeCabToHome, setIncludeCabToHome] = useState(true);
  const [roundtrip, setRoundtrip] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');

  // Contact Info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    leadId: string;
    waUrl: string;
    summaryText: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const effectiveOrigin = origin === 'Other / Custom' ? (customOrigin.trim() || 'Custom Origin') : origin;
  const effectiveDestination =
    destination === 'Other / Custom' ? (customDestination.trim() || 'Custom Destination') : destination;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg('Please enter your full name so our coordinator can assist you.');
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, '').length < 6) {
      setErrorMsg('Please enter a valid WhatsApp or contact phone number.');
      return;
    }

    setIsSubmitting(true);

    const ref = `NH-DOOR-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const selectedProfile = PASSENGER_PROFILES.find((p) => p.id === passengerType);

    // Prepare Structured Message for WhatsApp
    const messageLines = [
      `🏡 *Nimble Holidays - Doorstep-to-Doorstep Transit Care* (${ref})`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Journey Route:*`,
      `• *Origin Pickup:* ${effectiveOrigin}`,
      `• *Final Home Drop:* ${effectiveDestination}`,
      `• *Profile:* ${selectedProfile?.title || passengerType} (${adults} Adults${Number(children) > 0 ? `, ${children} Children` : ''})`,
      `• *Travel Date:* ${travelDate || 'Flexible / To be confirmed'}`,
      `• *Flight Booking Included:* ${includeFlight ? 'Yes (Include Airline Quote)' : 'No (Flight booked by customer)'}`,
      `• *Chauffeur Home Drop:* ${includeCabToHome ? 'Yes (Private AC Vehicle to doorstep)' : 'No'}`,
      `• *Roundtrip Home Pickup:* ${roundtrip ? 'Yes (Both ways Door-to-Door)' : 'No (One-way to home)'}`,
      specialRequests.trim() ? `• *Special Notes:* ${specialRequests.trim()}` : null,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Lead Traveller:*`,
      `• *Name:* ${name.trim()}`,
      `• *WhatsApp:* ${phone.trim()}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Official Nimble Holidays Desk: +91 70929 36243_`,
      `_Please share available flight options & private vehicle door-drop quote._`,
    ]
      .filter(Boolean)
      .join('\n');

    // 1. Asynchronously submit lead to our API for CRM / Google Sheets tracking
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          serviceCategory: 'doorstep-transit',
          serviceTitle: 'Doorstep-to-Doorstep Transit Care',
          origin: effectiveOrigin,
          destination: effectiveDestination,
          passengerType,
          adults,
          children,
          travelDate,
          flightIncluded: includeFlight,
          cabIncluded: includeCabToHome,
          notes: `Roundtrip: ${roundtrip ? 'Yes' : 'No'} | Special: ${specialRequests.trim()}`,
          channel: 'whatsapp',
        }),
      });
    } catch (err) {
      console.warn('Lead async logging error (proceeding to WhatsApp anyway):', err);
    } finally {
      setIsSubmitting(false);
    }

    const waLink = getWhatsAppLink(messageLines);

    setSubmissionSuccess({
      leadId: ref,
      waUrl: waLink,
      summaryText: messageLines,
    });

    // Directly open WhatsApp
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    if (!submissionSuccess) return;
    navigator.clipboard.writeText(submissionSuccess.summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="doorstep-transit" className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50 to-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#20a88a]/10 border border-[#20a88a]/30 px-3.5 py-1.5 rounded-full text-[#20a88a] text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#f89a2e]" />
            <span>New Flagship Combo Service</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight">
            Doorstep-to-Doorstep <br className="hidden sm:inline" />
            <span className="text-[#318bc6] italic font-serif font-light">Transit Care.</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Travelling from abroad or outstation to your home? We take complete charge from your pickup location, coordinate your flights and luggage, receive you at the arrival airport with a name placard, and chauffeur you safely to your front door.
          </p>
        </div>

        {/* Visual 5-Step Journey Diagram */}
        <div className="bg-[#102347] rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#318bc6]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#42bfd8]">
                  Zero Hassle · End-to-End Coordination
                </span>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mt-1">
                  How The Doorstep Combo Pack Works
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#20a88a]" />
                <span>One single point of contact on WhatsApp</span>
              </div>
            </div>

            {/* 5 Journey Milestones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative">
              {/* Step 1 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#318bc6]/20 text-[#42bfd8] flex items-center justify-center font-bold text-sm mb-3">
                    01
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1">Origin Departure</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Leave Dubai, Doha, Riyadh, Singapore or any city. We arrange pickup to the airport or coordinate flight timing.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-[#42bfd8] flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5" />
                  <span>Flight Ticketing</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#20a88a]/20 text-[#20a88a] flex items-center justify-center font-bold text-sm mb-3">
                    02
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1">Luggage & Air Care</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    High allowance tickets (30-40kg), family seat allocation, and step-by-step WhatsApp reassurance during transit.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-[#20a88a] flex items-center gap-1">
                  <Luggage className="w-3.5 h-3.5" />
                  <span>30kg–40kg Luggage</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#f89a2e]/20 text-[#f89a2e] flex items-center justify-center font-bold text-sm mb-3">
                    03
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1">Airport Reception</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Personal representative waiting at the terminal (Coimbatore, Cochin, Calicut, Trivandrum) with your name board.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-[#f89a2e] flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Name Placard & Porter</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold text-sm mb-3">
                    04
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1">Private Chauffeur</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Sanitized AC Innova Crysta, Sedan, or Urbania Tempo dedicated solely to your family. No taxi queues or haggling.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-purple-300 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5" />
                  <span>GPS Tracked AC Fleet</span>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:bg-white/10 transition-colors">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm mb-3">
                    05
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1">Home Doorstep Drop</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Direct drop-off at your front gate in Coimbatore, Mavelikkara, Palakkad, or your hometown with luggage unloading.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-emerald-300 flex items-center gap-1">
                  <Home className="w-3.5 h-3.5" />
                  <span>Safely Home!</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Customizer & Enquiry Engine */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: Configurator */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-[#182e5c]">
                  Customize Your Doorstep Journey
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your route, travellers, and preferences to calculate an instant quote.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#20a88a] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Combo Customizer
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Origin */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5 text-[#318bc6]" />
                    <span>Origin City / Country</span>
                  </label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#318bc6]"
                  >
                    {POPULAR_ORIGINS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                    <option value="Other / Custom">Other Origin City (Type below)</option>
                  </select>
                  {origin === 'Other / Custom' && (
                    <input
                      type="text"
                      placeholder="e.g. Kuwait City, London, Sydney, etc."
                      value={customOrigin}
                      onChange={(e) => setCustomOrigin(e.target.value)}
                      className="mt-2 w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#318bc6]"
                    />
                  )}
                </div>

                {/* Final Destination */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-[#20a88a]" />
                    <span>Final Home Destination</span>
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#20a88a]"
                  >
                    {POPULAR_DESTINATIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                    <option value="Other / Custom">Other Home Town (Type below)</option>
                  </select>
                  {destination === 'Other / Custom' && (
                    <input
                      type="text"
                      placeholder="e.g. Gandhipuram Coimbatore, Chengannur, Kottayam..."
                      value={customDestination}
                      onChange={(e) => setCustomDestination(e.target.value)}
                      className="mt-2 w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#20a88a]"
                    />
                  )}
                </div>
              </div>

              {/* Passenger Profile */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Who Is Travelling? (Tailored Care Mode)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PASSENGER_PROFILES.map((prof) => {
                    const Icon = prof.icon;
                    const isSelected = passengerType === prof.id;
                    return (
                      <button
                        key={prof.id}
                        type="button"
                        onClick={() => setPassengerType(prof.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#182e5c]/5 border-[#182e5c] ring-2 ring-[#182e5c]/20'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-[#182e5c] text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className="font-heading font-bold text-xs sm:text-sm text-[#182e5c]">
                              {prof.title}
                            </span>
                            <span className="text-[10px] font-semibold text-[#20a88a] bg-emerald-50 px-1.5 py-0.5 rounded">
                              {prof.badge}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-light leading-tight line-clamp-2">
                            {prof.tagline}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number of People & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Adults (12+ yrs)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-800 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, '12+'].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Children (0-11 yrs)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-800 focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Child{n !== 1 ? 'ren' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Expected Travel Date
                  </label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#318bc6]"
                  />
                </div>
              </div>

              {/* Combo Package Components Toggle */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Combo Pack Services Included:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeFlight}
                      onChange={(e) => setIncludeFlight(e.target.checked)}
                      className="w-4 h-4 rounded text-[#318bc6] focus:ring-0"
                    />
                    <span>Flight Booking Quote</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={includeCabToHome}
                      onChange={(e) => setIncludeCabToHome(e.target.checked)}
                      className="w-4 h-4 rounded text-[#20a88a] focus:ring-0"
                    />
                    <span>Airport Cab to Home</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={roundtrip}
                      onChange={(e) => setRoundtrip(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f89a2e] focus:ring-0"
                    />
                    <span>Roundtrip Door-to-Door</span>
                  </label>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Luggage Details or Special Assistance
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. 4 big trolley suitcases, wheelchair needed for elderly mother at arrival gate, infant seat..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#318bc6]"
                />
              </div>

              {/* Customer Contact Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Full Name <span className="text-[#ed373b]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Kumar / Fatima Al-Zahra"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#318bc6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    WhatsApp Contact Number <span className="text-[#ed373b]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 70929 36243 / +971 50..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#20a88a]"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#20a88a] hover:bg-[#198a71] text-white rounded-xl font-heading font-extrabold text-sm sm:text-base transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
              >
                <WhatsAppIcon className="w-5 h-5 text-white" />
                <span>
                  {isSubmitting
                    ? 'Recording Lead & Preparing WhatsApp...'
                    : 'Get Doorstep Transit Quote on WhatsApp (+91 70929 36243)'}
                </span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Column: Live Summary / Confirmation (In-Page, NO popup modal) */}
          <div className="lg:col-span-4 space-y-6">
            {submissionSuccess ? (
              <div className="bg-[#102347] text-white border-2 border-[#20a88a] rounded-3xl p-6 sm:p-7 shadow-xl animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-[#20a88a] font-bold text-sm mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Enquiry Dispatched & Logged!</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed mb-4">
                  Reference ID: <strong className="text-white">{submissionSuccess.leadId}</strong>
                  <br />
                  Lead categorized under <strong>Doorstep-to-Doorstep Transit Care</strong>.
                </div>

                <a
                  href={submissionSuccess.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mb-3 inline-flex items-center justify-center gap-2 bg-[#20a88a] hover:bg-[#198a71] text-white font-bold py-3 rounded-xl text-xs sm:text-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Open WhatsApp Directly</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors border border-white/20 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Itinerary Text Copied!' : 'Copy Itinerary Text'}</span>
                </button>
              </div>
            ) : (
              <div className="bg-[#102347] text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold text-[#f5d64c] uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Why Families Prefer Nimble Transit</span>
                </div>

                <div className="space-y-4 text-xs text-slate-200">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-[#20a88a] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">No Mid-Journey Scrambling</strong>
                      <span className="text-slate-300 font-light">
                        Never stand in airport taxi queues or haggle late at night with local cabs after a long international flight.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Car className="w-4 h-4 text-[#42bfd8] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Dedicated Family Innova Crysta</strong>
                      <span className="text-slate-300 font-light">
                        Spacious boot for heavy suitcases, verified courteous driver, GPS live tracking for relatives at home.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <HeartHandshake className="w-4 h-4 text-[#f89a2e] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white block">Elderly Parents Assistance</strong>
                      <span className="text-slate-300 font-light">
                        Wheelchair meet at arrival, luggage loading, and safe delivery inside the house.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-slate-300">
                  <span>Questions? Call Desk:</span>{' '}
                  <a
                    href={`tel:${CONTACT_INFO.phoneRaw}`}
                    className="text-[#42bfd8] font-bold hover:underline"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Service Hubs Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 text-xs text-slate-600 space-y-3">
              <h4 className="font-heading font-bold text-sm text-[#182e5c] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#20a88a]" />
                <span>Primary Arrival Airports Covered</span>
              </h4>
              <p className="font-light text-slate-500 leading-relaxed">
                We handle arrival reception and home transfers from:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Coimbatore (CJB)',
                  'Cochin (COK)',
                  'Calicut (CCJ)',
                  'Trivandrum (TRV)',
                  'Kannur (CNN)',
                  'Madurai (IXM)',
                  'Trichy (TRZ)',
                  'Chennai (MAA)',
                  'Bengaluru (BLR)',
                ].map((hub) => (
                  <span
                    key={hub}
                    className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium"
                  >
                    {hub}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
