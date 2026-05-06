import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import FleetPage from './pages/FleetPage';
import BookingPage from './pages/BookingPage';
import RequirementsPage from './pages/RequirementsPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import AirportGuidePage from './pages/AirportGuidePage';
import SitemapPage from './pages/SitemapPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/requirements" element={<RequirementsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/airport-guide" element={<AirportGuidePage />} />
        <Route path="/sitemap" element={<SitemapPage />} />
        {/* Catch-all route for non-existent pages */}
        <Route path="*" element={
          <div className="min-h-screen bg-surface-light flex flex-col items-center justify-center p-6 text-center font-inter">
            <h1 className="text-6xl font-bold text-primary-gold mb-4 font-poppins">404</h1>
            <p className="text-xl text-charcoal/70 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="bg-charcoal text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all">
              Go Back Home
            </Link>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
