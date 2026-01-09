import React from 'react';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Services } from './sections/Services';
import { CTA } from './sections/CTA';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { BeforeAfter } from './sections/BeforeAfter';
import { PortfolioGrid } from './sections/PortfolioGrid';
import { Navigation } from './sections/Navigation';
import { GoogleReviewsBanner } from './sections/GoogleReviewsBanner';
import { ServicesSlider } from './sections/ServicesSlider';
import { WhyUs } from './sections/WhyUs';
import { CTABanner } from './sections/CTABanner';
import { Footer } from './sections/Footer';
import { VehicleSelector } from './sections/VehicleSelector';
import { BeforeAfterComparison } from './sections/BeforeAfterComparison';
import { GalleryShowcase } from './sections/GalleryShowcase';
import { TrustBadges } from './sections/TrustBadges';
import { LocationMap } from './sections/LocationMap';
import { SectionProps } from './types';

type SectionComponent = React.FC<any>;

export const SectionRegistry: Record<string, SectionComponent> = {
  Navigation,
  Hero,
  GoogleReviewsBanner,
  ServicesSlider,
  Services,
  WhyUs,
  Features,
  BeforeAfter,
  BeforeAfterComparison,
  PortfolioGrid,
  GalleryShowcase,
  Contact,
  LocationMap,
  CTABanner,
  CTA,
  Testimonials,
  TrustBadges,
  Pricing,
  FAQ,
  VehicleSelector,
  Footer
};

export const getSectionComponent = (key: string): SectionComponent | null => {
  return SectionRegistry[key] || null;
};

export const renderSection = (
  key: string,
  props: SectionProps,
  index: number,
  designVariant?: string
) => {
  const Component = getSectionComponent(key);

  if (!Component) {
    console.warn(`Section component "${key}" not found in registry`);
    return null;
  }

  return <Component key={`section-${key}-${index}`} {...props} designVariant={designVariant} />;
};
