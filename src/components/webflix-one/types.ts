export interface Theme {
  brand: string;
  text: string;
  accent: string;
  background: string;
  font: string;
}

export interface SEO {
  title: string;
  description: string;
  image?: string;
}

export interface Industry {
  id: string;
  slug: string;
  name: string;
  theme: Theme;
  seo: SEO;
  is_active: boolean;
}

export interface HeroProps {
  headline: string;
  subheadline: string;
  highlightedText?: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  badge?: string;
  trustPoints?: Array<{ icon: string; text: string }>;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  // Legacy support
  title?: string;
  subtitle?: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export interface Service {
  name: string;
  description: string;
  price?: string;
  image?: string;
  features?: string[];
}

export interface ServicesProps {
  title: string;
  subtitle?: string;
  services: Service[];
}

export interface CTAProps {
  title: string;
  description: string;
  primaryText: string;
  primaryLink: string;
  secondaryText?: string;
  secondaryLink?: string;
  backgroundImage?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image?: string;
  rating?: number;
}

export interface TestimonialsProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaLink: string;
}

export interface PricingProps {
  title: string;
  subtitle?: string;
  tiers: PricingTier[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQProps {
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export interface ContactProps {
  title: string;
  subtitle?: string;
  email: string;
  phone: string;
  address?: string;
  mapUrl?: string;
  openingHours?: string;
}

export interface BeforeAfterImage {
  before: string;
  after: string;
  title: string;
}

export interface BeforeAfterProps {
  title: string;
  subtitle?: string;
  images: BeforeAfterImage[];
}

export interface PortfolioItem {
  image: string;
  title: string;
  category: string;
}

export interface PortfolioGridProps {
  title: string;
  subtitle?: string;
  items: PortfolioItem[];
}

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
  features: string[];
}

export interface VehicleSelectorProps {
  title?: string;
  subtitle?: string;
  vehicles: Vehicle[];
  onVehicleSelect?: (vehicleId: string) => void;
}

export interface BeforeAfterComparisonProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  images: BeforeAfterImage[];
  showSlider?: boolean;
}

export interface GalleryImage {
  id: number;
  image: string;
  title: string;
  category: string;
}

export interface GalleryShowcaseProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  images: GalleryImage[];
  ctaText?: string;
  ctaLink?: string;
  showCTA?: boolean;
}

export interface TrustPoint {
  text: string;
  icon: string;
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface TrustBadgesProps {
  title?: string;
  subtitle?: string;
  description?: string;
  trustPoints: TrustPoint[];
  reviews?: Review[];
  showReviews?: boolean;
  googleRating?: number;
  googleReviewCount?: number;
  googleReviewLink?: string;
}

export interface LocationMapProps {
  title?: string;
  subtitle?: string;
  businessName?: string;
  address: string;
  phone: string;
  email: string;
  openingHours?: string;
  mapUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export type SectionProps =
  | HeroProps
  | FeaturesProps
  | ServicesProps
  | CTAProps
  | TestimonialsProps
  | PricingProps
  | FAQProps
  | ContactProps
  | BeforeAfterProps
  | PortfolioGridProps
  | VehicleSelectorProps
  | BeforeAfterComparisonProps
  | GalleryShowcaseProps
  | TrustBadgesProps
  | LocationMapProps;

export interface Section {
  id: string;
  page_id: string;
  key: string;
  props: SectionProps;
  visible: boolean;
  order: number;
}

export interface PageData {
  theme: Theme;
  seo: SEO;
  layout: Section[];
}
