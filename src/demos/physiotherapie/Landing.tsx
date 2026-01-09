import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import TeamSection from './components/TeamSection';
import BookingSection from './components/BookingSection';
import TrustSection from './components/TrustSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const PhysiotherapieLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <TeamSection />
      <BookingSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default PhysiotherapieLanding;
