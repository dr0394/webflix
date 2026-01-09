import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ServicesGrid from './components/ServicesGrid';
import EmergencyBanner from './components/EmergencyBanner';
import ProjectsGallery from './components/ProjectsGallery';
import WhyChooseUs from './components/WhyChooseUs';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const ElektrikerLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection />
      <EmergencyBanner />
      <ServicesGrid />
      <ProjectsGallery />
      <WhyChooseUs />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ElektrikerLanding;
