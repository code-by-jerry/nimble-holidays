'use client';

import React, { useState } from 'react';
import { POPULAR_ROUTES, FlightRoute } from '@/data/flightRoutes';
import {
  Plane,
  ArrowRight,
  Send,
  Copy,
  Check,
  Calendar,
  Users,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { getWhatsAppLink } from '@/data/contact';

export const FlightBookingSection: React.FC = () => {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [fromCity, setFromCity] = useState('Riyadh');
  const [toCity, setToCity] = useState('Kochi (Cochin)');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState('1');
  const [children, setChildren] = useState('0');
  const [passengerName, setPassengerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [flightRef, setFlightRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSelectRoute = (r: FlightRoute) => {
    setFromCity(r.fromCity);
    setToCity(r.toCity);
    setFormError(null);
  };

  const [today, setToday] = useState('');

  React.useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fromCity.trim() || !toCity.trim()) {
      setFormError('Please enter both departure and arrival destinations.');
      return;
    }
    if (!departDate) {
      setFormError('Please select a departure date.');
      return;
    }
    if (tripType === 'round' && returnDate && returnDate < departDate) {
      setFormError('Return date cannot be earlier than departure date.');
      return;
    }
    if (!passengerName.trim()) {
      setFormError('Please provide your name.');
      return;
    }
    if (!whatsappNumber.trim() || whatsappNumber.replace(/\D/g, '').length < 8) {
      setFormError('Please enter a valid WhatsApp contact number with at least 8 digits.');
      return;
    }

    const ref = `NH-FL-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    setFlightRef(ref);

    const summaryText = [
      `✈️ *Nimble Holidays Flight Enquiry* (${ref})`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `• *Name:* ${passengerName.trim()}`,
      `• *WhatsApp:* ${whatsappNumber.trim()}`,
      `• *Route:* ${fromCity.trim()} ➔ ${toCity.trim()}`,
      `• *Type:* ${tripType === 'round' ? 'Round Trip 🔄' : 'One Way ➡️'}`,
      `• *Departure Date:* ${departDate}`,
      tripType === 'round' ? `• *Return Date:* ${returnDate || 'Flexible'}` : null,
      `• *Passengers:* ${adults} Adult(s)${Number(children) > 0 ? `, ${children} Child(ren)` : ''}`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `Please check current fares and WhatsApp back the best flight options. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    setSubmittedSummary(summaryText);
  };

  const copyToClipboard = () => {
    if (!submittedSummary) return;
    navigator.clipboard.writeText(submittedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappHref = submittedSummary
    ? getWhatsAppLink(submittedSummary)
    : '#';

  return (
    <section id="flights" className="py-16 sm:py-20 lg:py-28 bg-[#f8fafc] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#182e5c] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#318bc6]" />
              <span>Flight Booking Assistance · Domestic & International</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#182e5c] tracking-tight leading-tight">
              Need a ticket? <br />
              <span className="text-[#318bc6] italic font-serif font-light">Let’s get you there.</span>
            </h2>
          </div>

          <p className="max-w-md text-slate-600 text-sm sm:text-base leading-relaxed">
            Direct airline fares, seat selection, extra baggage allowances, and convenient timings.
            Popular among Indian residents in Saudi Arabia, UAE, Qatar, and across the GCC.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Popular Route Chips */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-7 lg:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-heading font-bold text-lg text-[#182e5c]">
                Popular GCC & Indian Routes
              </h3>
              <Plane className="w-5 h-5 text-[#318bc6]" />
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Tap any route to quickly populate the flight enquiry form.
            </p>

            <div className="space-y-2.5">
              {POPULAR_ROUTES.map((route) => (
                <button
                  key={route.id}
                  type="button"
                  onClick={() => handleSelectRoute(route)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center justify-between transition-all cursor-pointer touch-manipulation ${
                    fromCity === route.fromCity && toCity === route.toCity
                      ? 'border-[#318bc6] bg-blue-50/70 text-[#182e5c]'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#182e5c]">{route.fromCity}</span>
                    <span className="text-slate-400">→</span>
                    <span className="font-bold text-[#182e5c]">{route.toCity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {route.badge && (
                      <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-full">
                        {route.badge}
                      </span>
                    )}
                    <span className="text-slate-400 text-xs">select</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-[#20a88a] flex-shrink-0" />
              <span>Multi-airline comparisons across Saudia, Emirates, Air India Express, IndiGo & Qatar Airways.</span>
            </div>
          </div>

          {/* Right Column: Flight Enquiry Form / Summary */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-7 lg:p-8 rounded-3xl border border-slate-200 shadow-xs">
            {submittedSummary ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#20a88a]">
                      Enquiry Formatted & Ready
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-[#182e5c]">
                      Reference #{flightRef}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#20a88a]/15 text-[#20a88a] flex items-center justify-center font-bold">
                    ✓
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600">
                  Your flight preferences have been synthesized into a structured summary. Send it to our ticketing desk on WhatsApp to receive fare breakdowns and itinerary options immediately:
                </p>

                {/* Preformatted Summary Box */}
                <pre className="font-mono-code text-xs bg-slate-50 border border-slate-200 p-4 rounded-xl whitespace-pre-wrap text-slate-800 leading-relaxed overflow-x-auto max-h-[300px]">
                  {submittedSummary}
                </pre>

                {/* WhatsApp & Copy Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#67C15E] hover:bg-[#5bb353] text-white py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all text-center touch-manipulation min-h-[48px]"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Send on WhatsApp</span>
                    <span>↗</span>
                  </a>

                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer touch-manipulation min-h-[44px]"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#20a88a]" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedSummary(null)}
                    className="py-2 sm:py-3.5 px-3 text-xs font-bold text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer text-center"
                  >
                    Edit Form
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Trip Type Radios */}
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-2">Trip Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setTripType('round')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        tripType === 'round'
                          ? 'bg-[#182e5c] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Round Trip
                    </button>
                    <button
                      type="button"
                      onClick={() => setTripType('oneway')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        tripType === 'oneway'
                          ? 'bg-[#182e5c] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      One Way
                    </button>
                  </div>
                </div>

                {/* From & To inputs */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Departure City / Airport
                    </label>
                    <input
                      type="text"
                      required
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      placeholder="e.g. Riyadh, Jeddah, Dubai"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Destination City / Airport
                    </label>
                    <input
                      type="text"
                      required
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      placeholder="e.g. Kochi, Trivandrum, Delhi"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    />
                  </div>
                </div>

                {/* Travel Dates */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      required
                      min={today}
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    />
                  </div>

                  {tripType === 'round' && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        Return Date
                      </label>
                      <input
                        type="date"
                        min={departDate || today}
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                      />
                    </div>
                  )}
                </div>

                {/* Passengers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Adults (12+ yrs)
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} Adult{n > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Children (under 12)
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n} Child{n > 1 ? 'ren' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Passenger Contact */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      placeholder="e.g. Faisal Al-Harbi / Rahul Nair"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+966 5X XXX XXXX / +91 98XXX"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#318bc6] text-slate-800"
                    />
                  </div>
                </div>

                {formError && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-4 bg-[#182e5c] hover:bg-[#203a78] text-white rounded-xl font-bold text-sm shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plane className="w-4 h-4 text-[#42bfd8]" />
                  <span>Check Airfares & Generate Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
