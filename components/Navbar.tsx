'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTrip, CURRENCIES, CurrencyCode } from '@/context/TripContext';
import {
  Compass,
  Phone,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Plane,
  Heart,
  Home,
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { CONTACT_INFO } from '@/data/contact';

export const Navbar: React.FC = () => {
  const {
    selectedIds,
    currency,
    setCurrency,
    setIsDrawerOpen,
  } = useTrip();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  // Smooth scroll listener with hysteresis to prevent bouncing/flicker
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => {
        if (!prev && y > 35) return true;
        if (prev && y < 15) return false;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // WhatsApp link helper
  const whatsappNumber = CONTACT_INFO.whatsappNumber;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Nimble Holidays! I am visiting your website and would like help planning a trip.'
  )}`;

  // Services dropdown sub-items (dedicated routes)
  const serviceItems = [
    {
      title: 'Destinations',
      subtitle: 'Kerala, GCC & handpicked global spots',
      href: '/destinations',
      icon: Compass,
      accent: 'bg-cyan-50 text-[#42bfd8]',
    },
    {
      title: 'Packages',
      subtitle: 'Curated holiday itineraries & custom tours',
      href: '/packages',
      icon: Sparkles,
      accent: 'bg-amber-50 text-[#f89a2e]',
    },
    {
      title: 'Ayurveda',
      subtitle: 'Authentic Kerala wellness & rejuvenation retreats',
      href: '/ayurveda',
      icon: Heart,
      accent: 'bg-emerald-50 text-[#20a88a]',
    },
    {
      title: 'Flights',
      subtitle: 'Hassle-free bookings & GCC route assistance',
      href: '/flights',
      icon: Plane,
      accent: 'bg-sky-50 text-[#318bc6]',
    },
  ];

  return (
    <>
      {/* Top Banner with Spectrum Accent */}
      <div className="spectrum-bar" />
      <div className="bg-[#0e1e3e] text-slate-300 text-xs py-2 px-4 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#20a88a] animate-pulse" />
              <span>Rooted in Kerala Since 2010 · Onattukara, Mavelikkara</span>
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Serving Travellers from India & GCC Countries</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${CONTACT_INFO.phoneRaw}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors text-slate-300"
            >
              <Phone className="w-3.5 h-3.5 text-[#42bfd8]" />
              <span>Direct Desk: {CONTACT_INFO.phone}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#67C15E] hover:text-[#7de273] font-medium flex items-center gap-1.5 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header with Initial vs Sticky Transition (Zero Glitch / Butter Smooth) */}
      <header
        className={`sticky top-0 z-40 transition-[padding,background-color,border-color,box-shadow] duration-300 ease-in-out will-change-[padding] transform-gpu ${
          isScrolled
            ? 'glass-header border-b border-slate-200/90 shadow-sm py-2 sm:py-2.5'
            : 'bg-white border-b border-slate-100 shadow-none py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo (Complete Emblem & Text unified in emblem-logo-left-right.png) */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0 group"
            aria-label="Nimble Holidays Home"
          >
            <div
              className={`relative flex items-center transition-all duration-300 ease-in-out ${
                isScrolled ? 'h-9.5 sm:h-11' : 'h-13 sm:h-16'
              }`}
            >
              <Image
                src="/emblem-logo-left-right.png"
                alt="Nimble Holidays - The World Is For Everyone"
                width={280}
                height={94}
                className={`w-auto object-contain transition-all duration-300 ease-in-out ${
                  isScrolled ? 'h-9.5 sm:h-11' : 'h-13 sm:h-16'
                }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links: Services (with Dropdown), How It Works, Our Story */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm font-semibold text-slate-700">
            {/* Services Dropdown */}
            <div
              ref={servicesDropdownRef}
              className="relative group py-2"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesOpen((prev) => !prev)}
                aria-expanded={servicesOpen}
                className={`flex items-center gap-1.5 transition-colors font-medium hover:text-[#182e5c] ${
                  servicesOpen ? 'text-[#182e5c]' : 'text-slate-700'
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180 text-[#318bc6]' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
              </button>

              {/* Dropdown Menu Container with hover bridge */}
              <div
                className={`absolute left-0 top-full pt-2 w-80 transition-all duration-200 origin-top-left z-50 ${
                  servicesOpen
                    ? 'opacity-100 scale-100 pointer-events-auto visible'
                    : 'opacity-0 scale-95 pointer-events-none invisible'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-2 overflow-hidden">
                  <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Our Services & Offerings
                  </div>
                  <div className="flex flex-col gap-1">
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover/item:scale-105 ${item.accent}`}
                          >
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#182e5c] group-hover/item:text-[#318bc6] transition-colors leading-tight">
                              {item.title}
                            </span>
                            <span className="text-xs text-slate-500 font-normal leading-tight mt-0.5">
                              {item.subtitle}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Bottom helper */}
                  <div className="mt-1 pt-2 border-t border-slate-100 px-2.5 py-1.5 flex items-center justify-between text-xs bg-slate-50/70 rounded-lg">
                    <Link
                      href="/services/doorstep-transit"
                      onClick={() => setServicesOpen(false)}
                      className="font-bold text-[#20a88a] hover:text-[#182e5c] flex items-center gap-1 transition-colors text-[11px]"
                    >
                      <Home className="w-3 h-3 text-[#20a88a]" />
                      <span>Doorstep Transit Combo</span>
                    </Link>
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="font-bold text-[#182e5c] hover:text-[#318bc6] flex items-center gap-1 transition-colors text-[11px]"
                    >
                      <span>All Services</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works Link */}
            <Link
              href="/how-it-works"
              className="hover:text-[#182e5c] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#42bfd8] after:absolute after:bottom-0 after:left-0 after:transition-all font-medium"
            >
              How It Works
            </Link>

            {/* Our Story Link */}
            <Link
              href="/about"
              className="hover:text-[#182e5c] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#42bfd8] after:absolute after:bottom-0 after:left-0 after:transition-all font-medium"
            >
              Our Story
            </Link>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Currency Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-2 rounded-lg border border-slate-200 transition-colors"
                aria-label="Select Currency"
              >
                <span className="text-[#182e5c]">{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {currencyDropdownOpen && (
                <div
                  className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-1"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Display Currency
                  </div>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 transition-colors ${
                        currency === c ? 'font-bold text-[#182e5c] bg-slate-50' : 'text-slate-600'
                      }`}
                    >
                      <span>
                        {CURRENCIES[c].symbol} {c}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {CURRENCIES[c].name.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trip Cart / Wishlist Button */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-[#182e5c] hover:bg-[#203a78] text-white px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all hover:shadow hover:-translate-y-0.5"
              aria-label="Open Trip List Drawer"
            >
              <ShoppingBag className="w-4 h-4 text-[#42bfd8]" />
              <span className="hidden sm:inline">My Trip</span>
              <span className="inline-flex items-center justify-center bg-[#f89a2e] text-[#111e33] font-extrabold text-[11px] w-5 h-5 rounded-full shadow-xs">
                {selectedIds.length}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#182e5c] rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {/* Mobile Services Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between px-3 py-2.5 text-base font-bold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      mobileServicesOpen ? 'rotate-180 text-[#318bc6]' : ''
                    }`}
                  />
                </button>

                {mobileServicesOpen && (
                  <div className="pl-3 pr-1 py-1 flex flex-col gap-1 border-l-2 border-slate-200 ml-4 mt-1">
                    {serviceItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#182e5c] hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          <div
                            className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${item.accent}`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span>{item.title}</span>
                        </Link>
                      );
                    })}
                    <Link
                      href="/services/doorstep-transit"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm font-semibold text-[#20a88a] hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-emerald-50 text-[#20a88a]">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <span>Doorstep Transit Combo</span>
                    </Link>
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 text-xs font-bold text-[#318bc6] hover:underline"
                    >
                      + Visas, Forex & All Services →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
              >
                How It Works
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-semibold text-slate-800 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Our Story
              </Link>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsDrawerOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#182e5c] text-white py-3 rounded-xl font-bold text-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-[#42bfd8]" />
                  <span>View Trip Wishlist ({selectedIds.length} Places)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
