import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { initCalendlyTracking } from './lib/analytics';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PreviewModeHandler() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('preview') === 'true';

    if (isPreview) {
      // Add CSS to block all clicks but allow scrolling
      const style = document.createElement('style');
      style.id = 'preview-mode-style';
      style.innerHTML = `
        a, button, input, textarea, select, [role="button"], [onclick] {
          pointer-events: none !important;
          cursor: default !important;
        }
        body {
          overflow-y: auto !important;
          pointer-events: auto !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        const existingStyle = document.getElementById('preview-mode-style');
        if (existingStyle) {
          existingStyle.remove();
        }
      };
    }
  }, []);

  return null;
}

function CalendlyTrackingInitializer() {
  useEffect(() => {
    initCalendlyTracking();
  }, []);

  return null;
}
import Header from './components/Header';
import Hero from './components/Hero';
import PromoBar from './components/PromoBar';
import FeaturesSection from './components/FeaturesSection';
import WebflixCustomSection from './components/WebflixCustomSection';
import WebflixProcessSection from './components/WebflixProcessSection';
import ModelExplanation from './components/ModelExplanation';
import ComparisonSection from './components/ComparisonSection';
import AboutSection from './components/AboutSection';
import ConsultationBanner from './components/ConsultationBanner';
import CustomerProjects from './components/CustomerProjects';
import HighlightSection from './components/HighlightSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Modal from './components/Modal';
import AutoaufbereitungDemo from './demos/autoaufbereitung/Landing';
import AutoaufbereitungDemo2 from './demos/autoaufbereitung/Landing2';
import AutoaufbereitungDemoV3 from './demos/autoaufbereitung/LandingV3';
import GartenlandschaftsbauDemo from './demos/gartenlandschaftsbau/Landing';
import PersonalBrandDemo from './demos/personalbrand/Landing';
import BeautyDemo from './demos/beauty/Landing';
import HandwerkDemo from './demos/handwerk/Landing';
import GebaeudereinigungDemo from './demos/gebaeudereinigung/Landing';
import MetallbauDemo from './demos/metallbau/Landing';
import SecurityDemo from './demos/security/Landing';
import BauunternehmenDemo from './demos/bauunternehmen/Landing';
import MetzgereiDemo from './demos/metzgerei/Landing';
import MetzgereiImpressum from './demos/metzgerei/components/ImpressumPage';
import MetzgereiShop from './demos/metzgerei/components/ShopPage';
import MetzgereiCheckout from './demos/metzgerei/components/CheckoutPage';
import MetzgereiOrderConfirmation from './demos/metzgerei/components/OrderConfirmationPage';
import PhysiotherapieDemo from './demos/physiotherapie/Landing';
import ElektrikerDemo from './demos/elektriker/Landing';
import GastroDemo from './demos/gastro/Landing';
import CheckoutPage from './components/checkout/CheckoutPage';
import CheckoutSuccess from './components/checkout/CheckoutSuccess';
import CheckoutCancel from './components/checkout/CheckoutCancel';
import DeveloperDashboard from './components/developer/DeveloperDashboard';
import CustomerChecklist from './components/checklist/CustomerChecklist';
import AddOnsPage from './components/addons/AddOnsPage';
import ConfiguratorPage from './components/configurator/ConfiguratorPage';
import DemoWithEditor from './components/demo/DemoWithEditor';
import GeneratedWebsite from './components/demo/GeneratedWebsite';
import EditableDemo from './components/demo/EditableDemo';
import SubmissionsDashboard from './components/admin/SubmissionsDashboard';
import StripeSetup from './components/admin/StripeSetup';
import BlogListPage from './components/blog/BlogListPage';
import BlogPostPage from './components/blog/BlogPostPage';
import BlogAdminPage from './components/blog/BlogAdminPage';
import CustomWebsitePage from './components/custom/CustomWebsitePage';
import CustomWebsiteForm from './components/custom/CustomWebsiteForm';
import ThankYouPage from './components/custom/ThankYouPage';
import CustomSuccessPage from './components/custom/CustomSuccessPage';
import WebflixCustomPage from './components/custom/WebflixCustomPage';
import BookingPage from './components/custom/BookingPage';
import ShopPage from './components/shop/ShopPage';
import NewShopPage from './components/shop/NewShopPage';
import CustomerLogin from './components/customer/CustomerLogin';
import CustomerDashboard from './components/customer/CustomerDashboard';
import ChecklistPage from './components/checklist/ChecklistPage';
import OrderManagement from './components/admin/OrderManagement';
import GeneratedWebsitePage from './components/generated/GeneratedWebsitePage';
import PasswordReset from './components/auth/PasswordReset';
import WebflixLandingPage from './components/webflix/WebflixLandingPage';
import AboutPage from './components/about/AboutPage';
import ContactPage from './components/contact/ContactPage';
import ImpressumPage from './components/legal/ImpressumPage';
import DatenschutzPage from './components/legal/DatenschutzPage';
import AGBPage from './components/legal/AGBPage';
import NutzungsbedingungenPage from './components/legal/NutzungsbedingungenPage';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import LeadsManagement from './components/admin/LeadsManagement';
import ComponentLibraryPage from './components/library/ComponentLibraryPage';
import WebflixOne from './components/webflix/WebflixOne';
import { DynamicPage } from './components/webflix-one/DynamicPage';
import { AdminPanel } from './components/webflix-one/admin/AdminPanel';
import { WebflixOneDemo } from './components/webflix-one/DemoIndex';
import { HelmetProvider } from 'react-helmet-async';
import Offer499Page from './components/offers/Offer499Page';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <PreviewModeHandler />
        <CalendlyTrackingInitializer />
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-[#111111] text-white font-inter">
            <Header showNavigation={true} />
            <Hero />
            <FeaturesSection />
            <ModelExplanation />
            <WebflixCustomSection />
            <CustomerProjects />
            <ComparisonSection />
            <AboutSection />

            <ConsultationBanner />
            
            <HighlightSection />
            <FAQ />
            <Footer />
            <Modal />
          </div>
        } />
        <Route path="/demo/autoaufbereitung" element={<AutoaufbereitungDemo />} />
        <Route path="/demo/autoaufbereitung-2" element={<AutoaufbereitungDemo2 />} />
        <Route path="/demo/autoaufbereitung-v3" element={<AutoaufbereitungDemoV3 />} />
        <Route path="/demo/gartenlandschaftsbau" element={<GartenlandschaftsbauDemo />} />
        <Route path="/demo/personalbrand" element={<PersonalBrandDemo />} />
        <Route path="/demo/beauty" element={<BeautyDemo />} />
        <Route path="/demo/handwerk" element={<HandwerkDemo />} />
        <Route path="/demo/gebaeudereinigung" element={<GebaeudereinigungDemo />} />
        <Route path="/demo/metallbau" element={<MetallbauDemo />} />
        <Route path="/demo/security" element={<SecurityDemo />} />
        <Route path="/demo/bauunternehmen" element={<BauunternehmenDemo />} />
        <Route path="/demo/metzgerei" element={<MetzgereiDemo />} />
        <Route path="/demo/metzgerei/impressum" element={<MetzgereiImpressum />} />
        <Route path="/demo/metzgerei/shop" element={<MetzgereiShop />} />
        <Route path="/demo/metzgerei/checkout" element={<MetzgereiCheckout />} />
        <Route path="/demo/metzgerei/order-confirmation/:orderNumber" element={<MetzgereiOrderConfirmation />} />
        <Route path="/demo/physiotherapie" element={<PhysiotherapieDemo />} />
        <Route path="/demo/elektriker" element={<ElektrikerDemo />} />
        <Route path="/demo/gastro" element={<GastroDemo />} />
        <Route path="/demo/autoaufbereitung/editor" element={
          <EditableDemo
            demoType="autoaufbereitung"
            demoComponent={AutoaufbereitungDemo}
            editableFields={[
              { id: 'header_logo', elementId: 'header_logo', label: 'Logo Text', type: 'text', section: 'Header', defaultValue: 'Dein Logo' },
              { id: 'header_nav_1', elementId: 'header_nav_1', label: 'Navigation 1', type: 'text', section: 'Header', defaultValue: 'Home' },
              { id: 'header_nav_2', elementId: 'header_nav_2', label: 'Navigation 2', type: 'text', section: 'Header', defaultValue: 'Konfigurator' },
              { id: 'header_nav_3', elementId: 'header_nav_3', label: 'Navigation 3', type: 'text', section: 'Header', defaultValue: 'Kontakt' },
              { id: 'header_cta', elementId: 'header_cta', label: 'Header Button', type: 'text', section: 'Header', defaultValue: 'Website kaufen' },
              { id: 'hero_h1', elementId: 'demo-h1', label: 'Hauptüberschrift', type: 'text', section: 'Hero', defaultValue: 'Fahrzeugaufbereitung auf höchstem Niveau' },
              { id: 'hero_h2', elementId: 'demo-h2', label: 'Unterüberschrift', type: 'textarea', section: 'Hero', defaultValue: 'Bringen Sie mit unserer professionellen Autoreinigung & Fahrzeugaufbereitung ihr Fahrzeug wieder zum glänzen.' },
              { id: 'hero_cta', elementId: 'demo-cta-button', label: 'Button Text', type: 'text', section: 'Hero', defaultValue: 'Jetzt Termin buchen' },
              { id: 'badge_1', elementId: 'demo-badge-1', label: 'Badge 1', type: 'text', section: 'Badges', defaultValue: 'Sehr gute Preis Leistung' },
              { id: 'badge_2', elementId: 'demo-badge-2', label: 'Badge 2', type: 'text', section: 'Badges', defaultValue: 'Flexible Termine' },
              { id: 'badge_3', elementId: 'demo-badge-3', label: 'Badge 3', type: 'text', section: 'Badges', defaultValue: '5/5 Sterne' },
              { id: 'services_title', elementId: 'demo-services-title', label: 'Services Überschrift', type: 'text', section: 'Services', defaultValue: 'Welche Autoreinigung brauchst du?' },
              { id: 'service_1_title', elementId: 'demo-service-1-title', label: 'Service 1 Titel', type: 'text', section: 'Services', defaultValue: 'Innenraumreinigung' },
              { id: 'service_1_desc', elementId: 'demo-service-1-desc', label: 'Service 1 Beschreibung', type: 'textarea', section: 'Services', defaultValue: 'Gründliche Reinigung aller Innenraumflächen, Sitze, Teppiche und Polster. Entfernung von Flecken, Gerüchen und Staub für ein frisches Fahrgefühl.' },
              { id: 'service_2_title', elementId: 'demo-service-2-title', label: 'Service 2 Titel', type: 'text', section: 'Services', defaultValue: 'Außenwäsche' },
              { id: 'service_2_desc', elementId: 'demo-service-2-desc', label: 'Service 2 Beschreibung', type: 'textarea', section: 'Services', defaultValue: 'Professionelle Reinigung der Karosserie, Felgen und Reifen mit speziellen Pflegeprodukten für strahlenden Glanz und Schutz.' },
              { id: 'contact_address', elementId: 'demo-contact-address', label: 'Adresse', type: 'textarea', section: 'Kontakt', defaultValue: 'Musterstraße 123\n12345 Musterstadt' },
              { id: 'contact_phone', elementId: 'demo-contact-phone', label: 'Telefon', type: 'text', section: 'Kontakt', defaultValue: '0123 456 7890' },
              { id: 'contact_email', elementId: 'demo-contact-email', label: 'E-Mail', type: 'text', section: 'Kontakt', defaultValue: 'info@autopflege-profi.de' },
              { id: 'footer_company_name', elementId: 'footer_company_name', label: 'Firmenname', type: 'text', section: 'Footer', defaultValue: 'AutoPflege Profi' },
              { id: 'footer_tagline', elementId: 'footer_tagline', label: 'Tagline', type: 'text', section: 'Footer', defaultValue: 'Professionelle Fahrzeugpflege' },
              { id: 'footer_description', elementId: 'footer_description', label: 'Beschreibung', type: 'textarea', section: 'Footer', defaultValue: 'AutoPflege Profi - Ihr professioneller Partner für Autoreinigung und Fahrzeugaufbereitung. Wir bringen Ihr Fahrzeug zum Strahlen mit höchster Qualität und Leidenschaft.' },
              { id: 'footer_phone', elementId: 'footer_phone', label: 'Telefon (Footer)', type: 'text', section: 'Footer', defaultValue: '+49 123 456 7890' },
              { id: 'footer_email', elementId: 'footer_email', label: 'E-Mail (Footer)', type: 'text', section: 'Footer', defaultValue: 'info@autopflege-profi.de' },
              { id: 'footer_address', elementId: 'footer_address', label: 'Adresse (Footer)', type: 'textarea', section: 'Footer', defaultValue: 'Musterstraße 123\n12345 Musterstadt' },
              { id: 'footer_hours', elementId: 'footer_hours', label: 'Öffnungszeiten', type: 'textarea', section: 'Footer', defaultValue: 'Mo-Fr: 9:00 - 18:00 Uhr\nSa: 10:00 - 14:00 Uhr' },
              { id: 'footer_copyright', elementId: 'footer_copyright', label: 'Copyright', type: 'text', section: 'Footer', defaultValue: '© 2025 AutoPflege Profi. Alle Rechte vorbehalten.' },
              { id: 'beforeafter_title', elementId: 'beforeafter_title', label: 'Vorher/Nachher Titel', type: 'text', section: 'Before/After', defaultValue: 'Sehen Sie den Unterschied' },
              { id: 'beforeafter_subtitle', elementId: 'beforeafter_subtitle', label: 'Vorher/Nachher Untertitel', type: 'text', section: 'Before/After', defaultValue: 'Überzeugen Sie sich selbst von der Qualität unserer Autoreinigung' },
              { id: 'trust_point_1', elementId: 'trust_point_1', label: 'Trust Point 1', type: 'text', section: 'Trust', defaultValue: 'Professionelle Fahrzeugaufbereitung' },
              { id: 'trust_point_2', elementId: 'trust_point_2', label: 'Trust Point 2', type: 'text', section: 'Trust', defaultValue: 'Modernste Reinigungstechnik' },
              { id: 'trust_point_3', elementId: 'trust_point_3', label: 'Trust Point 3', type: 'text', section: 'Trust', defaultValue: 'Faire & transparente Preise' },
              { id: 'trust_point_4', elementId: 'trust_point_4', label: 'Trust Point 4', type: 'text', section: 'Trust', defaultValue: 'Schnelle Terminvergabe' },
            ]}
          />
        } />
        <Route path="/demo/gartenlandschaftsbau/editor" element={
          <DemoWithEditor
            demoType="gartenlandschaftsbau"
            demoComponent={GartenlandschaftsbauDemo}
            demoName="Garten- & Landschaftsbau Website"
          />
        } />
        <Route path="/demo/personalbrand/editor" element={
          <DemoWithEditor
            demoType="personalbrand"
            demoComponent={PersonalBrandDemo}
            demoName="Personal Brand Website"
          />
        } />
        <Route path="/demo/metallbau/editor" element={
          <DemoWithEditor
            demoType="metallbau"
            demoComponent={MetallbauDemo}
            demoName="Metallbau Website"
          />
        } />
        <Route path="/demo/security/editor" element={
          <DemoWithEditor
            demoType="security"
            demoComponent={SecurityDemo}
            demoName="Sicherheitsdienst Website"
          />
        } />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/developer" element={<DeveloperDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/submissions" element={<ProtectedRoute><SubmissionsDashboard /></ProtectedRoute>} />
        <Route path="/admin/stripe-setup" element={<ProtectedRoute><StripeSetup /></ProtectedRoute>} />
        <Route path="/checklist" element={<CustomerChecklist />} />
        <Route path="/addons" element={<AddOnsPage />} />
        <Route path="/configurator" element={<ConfiguratorPage />} />
        <Route path="/website/:websiteId" element={<GeneratedWebsite />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/admin/blog" element={<ProtectedRoute><BlogAdminPage /></ProtectedRoute>} />
        <Route path="/zum-mitnehmen" element={<ShopPage />} />
        <Route path="/shop" element={<NewShopPage />} />
        <Route path="/custom" element={<WebflixCustomPage />} />
        <Route path="/custom/buchung" element={<BookingPage />} />
        <Route path="/custom/anfrage" element={<CustomWebsitePage />} />
        <Route path="/custom/form" element={<CustomWebsiteForm />} />
        <Route path="/custom/thank-you" element={<ThankYouPage />} />
        <Route path="/custom/success" element={<CustomSuccessPage />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/checklist" element={<ChecklistPage />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/admin/orders" element={<ProtectedRoute><OrderManagement /></ProtectedRoute>} />
        <Route path="/admin/library" element={<ProtectedRoute><ComponentLibraryPage /></ProtectedRoute>} />
        <Route path="/admin/leads" element={<ProtectedRoute><LeadsManagement /></ProtectedRoute>} />
        <Route path="/w/:slug" element={<GeneratedWebsitePage />} />
        <Route path="/webflix" element={<WebflixLandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
        <Route path="/agb" element={<AGBPage />} />
        <Route path="/nutzungsbedingungen" element={<NutzungsbedingungenPage />} />
        <Route path="/webflix-one/:industrySlug" element={<WebflixOne industrySlug={window.location.pathname.split('/').pop() || ''} />} />
        <Route path="/webflix-one-demo" element={<WebflixOneDemo />} />
        <Route path="/dynamic/:industrySlug" element={<DynamicPage />} />
        <Route path="/demo/:industrySlug" element={<DynamicPage />} />
        <Route path="/admin/webflix-one" element={<AdminPanel />} />
        <Route path="/499" element={<Offer499Page />} />
      </Routes>
    </Router>
    </HelmetProvider>
  );
}

export default App;