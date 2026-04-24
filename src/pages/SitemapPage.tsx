import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SitemapPage() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-12 pb-20 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-gold hover:text-gold-hover font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-8 text-charcoal">Sitemap</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-poppins text-xl font-bold text-primary-gold mb-4 border-b border-gray-100 pb-2">Main Pages</h2>
              <ul className="space-y-3 font-inter">
                <li><Link to="/" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Home</Link></li>
                <li><Link to="/fleet" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">The Fleet</Link></li>
                <li><Link to="/requirements" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Rental Requirements</Link></li>
                <li><Link to="/about" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">About Us</Link></li>
                <li><Link to="/blog" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Blog & Travel Guides</Link></li>
                <li><Link to="/contact" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Contact Information</Link></li>
              </ul>
            </div>
            
            <div>
              <h2 className="font-poppins text-xl font-bold text-primary-gold mb-4 border-b border-gray-100 pb-2">Legal & Helpful Links</h2>
              <ul className="space-y-3 font-inter">
                <li><Link to="/privacy" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Terms of Service</Link></li>
                <li><Link to="/airport-guide" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Tacloban Airport Guide</Link></li>
                <li><Link to="/sitemap" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Sitemap Directory</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="font-poppins text-xl font-bold text-primary-gold mb-4 border-b border-gray-100 pb-2">Administrative</h2>
              <ul className="space-y-3 font-inter">
                <li><Link to="/login" className="text-charcoal/80 hover:text-primary-gold transition-colors block font-medium">Admin Staff Login</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
