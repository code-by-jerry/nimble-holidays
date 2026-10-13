import React from 'react';
import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { FeaturedDestinationsPreview } from '@/components/FeaturedDestinationsPreview';
import { HowItWorks } from '@/components/HowItWorks';
import { FeaturedPackagesPreview } from '@/components/FeaturedPackagesPreview';
import { HomeSpotlights } from '@/components/HomeSpotlights';
import { WhatsAppEnquirySection } from '@/components/WhatsAppEnquirySection';
import { AboutSection } from '@/components/AboutSection';

export default function HomePage() {
  return (
    <>
      {/* Editorial Hero with Visuals & E-Commerce Concept */}
      <Hero />

      {/* 4-Pillar Trust Indicators */}
      <TrustStrip />

      {/* Executive Featured Destinations Showcase with + Add to Trip */}
      <FeaturedDestinationsPreview />

      {/* 4-Step Interactive Process */}
      <HowItWorks />

      {/* Flagship Curated Tour Packages Showcase */}
      <FeaturedPackagesPreview />

      {/* Dual Signature Spotlights: Kerala Ayurveda & GCC Flight Ticketing */}
      <HomeSpotlights />

      {/* Dynamic In-Page WhatsApp Quotation & Trip Enquiry Desk */}
      <WhatsAppEnquirySection
        sectionTitle="Create Your Custom Trip · WhatsApp Quotation Desk"
        sectionSubtitle="Selected destinations, packages, or services are automatically appended below. Complete your details and receive a transparent quotation on WhatsApp (+91 70929 36243)."
      />

      {/* Brand Narrative: Since 2010 in Onattukara, Kerala */}
      <AboutSection />
    </>
  );
}
