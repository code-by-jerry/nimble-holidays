'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS, Destination } from '@/data/destinations';
import { TourPackage } from '@/data/packages';

export type CurrencyCode = 'INR' | 'SAR' | 'AED' | 'QAR' | 'KWD' | 'OMR' | 'USD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstINR: number; // For indicative estimation
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateAgainstINR: 1 },
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rateAgainstINR: 0.045 },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateAgainstINR: 0.044 },
  QAR: { code: 'QAR', symbol: 'QAR', name: 'Qatari Riyal', rateAgainstINR: 0.044 },
  KWD: { code: 'KWD', symbol: 'KWD', name: 'Kuwaiti Dinar', rateAgainstINR: 0.0037 },
  OMR: { code: 'OMR', symbol: 'OMR', name: 'Omani Rial', rateAgainstINR: 0.0046 },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateAgainstINR: 0.012 },
};

export interface EnquiryItem {
  id: string;
  title: string;
  category: 'destination' | 'package' | 'ayurveda' | 'service' | 'flight';
  subtitle?: string;
  priceNote?: string;
}

export interface TripContextType {
  selectedIds: string[];
  selectedDestinations: Destination[];
  toggleDestination: (id: string) => void;
  addDestinations: (ids: string[]) => number;
  removeDestination: (id: string) => void;
  clearTrip: () => void;
  isDestinationSelected: (id: string) => boolean;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amountINR: number) => string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  plannerNotes: string;
  setPlannerNotes: React.Dispatch<React.SetStateAction<string>>;
  selectedPackage: TourPackage | null;
  loadPackageIntoTrip: (pkg: TourPackage) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  activeQuickView: Destination | null;
  setActiveQuickView: (d: Destination | null) => void;
  // WhatsApp Enquiry Item Management
  enquiryItems: EnquiryItem[];
  addEnquiryItem: (item: EnquiryItem, autoScroll?: boolean) => void;
  removeEnquiryItem: (id: string) => void;
  clearEnquiryItems: () => void;
  lastAddedNotification: EnquiryItem | null;
  clearNotification: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export const TripProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['alleppey', 'munnar']); // Initial friendly default
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [plannerNotes, setPlannerNotes] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<TourPackage | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeQuickView, setActiveQuickView] = useState<Destination | null>(null);
  const [enquiryItems, setEnquiryItems] = useState<EnquiryItem[]>([]);
  const [lastAddedNotification, setLastAddedNotification] = useState<EnquiryItem | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nh-trip-v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSelectedIds(parsed);
        }
      }
      const savedEnquiry = localStorage.getItem('nh-enquiry-items');
      if (savedEnquiry) {
        const parsedEnquiry = JSON.parse(savedEnquiry);
        if (Array.isArray(parsedEnquiry)) {
          setEnquiryItems(parsedEnquiry);
        }
      }
      const savedCur = localStorage.getItem('nh-currency') as CurrencyCode;
      if (savedCur && CURRENCIES[savedCur]) {
        setCurrency(savedCur);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Save enquiry items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nh-enquiry-items', JSON.stringify(enquiryItems));
    } catch {
      // Ignore
    }
  }, [enquiryItems]);

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('nh-trip-v2', JSON.stringify(selectedIds));
    } catch {
      // Ignore
    }
  }, [selectedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('nh-currency', currency);
    } catch {
      // Ignore
    }
  }, [currency]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const toggleDestination = (id: string) => {
    setSelectedIds((prev) => {
      const exists = prev.includes(id);
      const dest = DESTINATIONS.find((d) => d.id === id);
      const name = dest ? dest.name : 'Destination';
      if (exists) {
        showToast(`${name} removed from your trip list`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`${name} added to your trip list ✓`);
        return [...prev, id];
      }
    });
  };

  const addDestinations = (ids: string[]) => {
    let addedCount = 0;
    setSelectedIds((prev) => {
      const set = new Set(prev);
      ids.forEach((id) => {
        if (!set.has(id)) {
          set.add(id);
          addedCount++;
        }
      });
      return Array.from(set);
    });
    return addedCount;
  };

  const removeDestination = (id: string) => {
    const dest = DESTINATIONS.find((d) => d.id === id);
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    showToast(`${dest?.name || 'Item'} removed from trip`);
  };

  const clearTrip = () => {
    setSelectedIds([]);
    showToast('Trip list cleared');
  };

  const isDestinationSelected = (id: string) => selectedIds.includes(id);

  const selectedDestinations = selectedIds
    .map((id) => DESTINATIONS.find((d) => d.id === id))
    .filter((d): d is Destination => Boolean(d));

  const formatPrice = (amountINR: number) => {
    const cur = CURRENCIES[currency];
    const converted = Math.round(amountINR * cur.rateAgainstINR);
    return `${cur.symbol} ${converted.toLocaleString()}`;
  };

  const loadPackageIntoTrip = (pkg: TourPackage) => {
    setSelectedPackage(pkg);
    addDestinations(pkg.destinationIds);
    setPlannerNotes((prev) => {
      const note = `Inspired by package: ${pkg.title} (${pkg.durationNights}N / ${pkg.durationDays}D).`;
      if (prev.includes(pkg.title)) return prev;
      return prev ? `${prev}\n${note}` : note;
    });
    showToast(`Added places from ${pkg.title} into your trip list!`);
    const plannerEl = document.getElementById('trip-planner');
    if (plannerEl) {
      plannerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addEnquiryItem = (item: EnquiryItem, autoScroll = true) => {
    setEnquiryItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) return prev;
      return [...prev, item];
    });
    setLastAddedNotification(item);
    showToast(`✓ Added to WhatsApp Enquiry: ${item.title}`);
    if (autoScroll) {
      setTimeout(() => {
        const el =
          document.getElementById('whatsapp-enquiry') ||
          document.getElementById('trip-planner');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    }
  };

  const removeEnquiryItem = (id: string) => {
    setEnquiryItems((prev) => prev.filter((i) => i.id !== id));
    if (lastAddedNotification?.id === id) {
      setLastAddedNotification(null);
    }
  };

  const clearEnquiryItems = () => {
    setEnquiryItems([]);
    setLastAddedNotification(null);
  };

  const clearNotification = () => {
    setLastAddedNotification(null);
  };

  return (
    <TripContext.Provider
      value={{
        selectedIds,
        selectedDestinations,
        toggleDestination,
        addDestinations,
        removeDestination,
        clearTrip,
        isDestinationSelected,
        currency,
        setCurrency,
        formatPrice,
        isDrawerOpen,
        setIsDrawerOpen,
        plannerNotes,
        setPlannerNotes,
        selectedPackage,
        loadPackageIntoTrip,
        toastMessage,
        showToast,
        activeQuickView,
        setActiveQuickView,
        enquiryItems,
        addEnquiryItem,
        removeEnquiryItem,
        clearEnquiryItems,
        lastAddedNotification,
        clearNotification,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrip must be used within a TripProvider');
  return ctx;
};
