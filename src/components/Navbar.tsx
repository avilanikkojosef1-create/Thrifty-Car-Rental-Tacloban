import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFFFF] shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-poppins text-xl md:text-2xl font-bold italic text-primary-gold relative z-20">
          Thrifty Car Rental Tacloban
        </Link>
        <nav className="hidden items-center space-x-6 md:flex">
          <Link to="/" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Home</Link>
          <Link to="/fleet" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Fleet</Link>
          <Link to="/requirements" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Requirements</Link>
          <Link to="/about" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">About Us</Link>
          <Link to="/blog" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Blog</Link>
          <Link to="/contact" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Contact</Link>
        </nav>
        <div className="hidden md:block">
          <Link to="/fleet" className="bg-primary-gold text-[#FFFFFF] rounded px-6 py-2.5 font-poppins font-bold transition-all hover:bg-gold-hover hover:shadow-lg active:scale-95 text-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden relative z-20 text-charcoal p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4 z-10 animate-in slide-in-from-top-2">
          <Link to="/" className="font-inter text-base font-medium text-charcoal block pb-2 border-b border-gray-50">Home</Link>
          <Link to="/fleet" className="font-inter text-base font-medium text-charcoal block pb-2 border-b border-gray-50">Fleet</Link>
          <Link to="/requirements" className="font-inter text-base font-medium text-charcoal block pb-2 border-b border-gray-50">Requirements</Link>
          <Link to="/about" className="font-inter text-base font-medium text-charcoal block pb-2 border-b border-gray-50">About Us</Link>
          <Link to="/blog" className="font-inter text-base font-medium text-charcoal block pb-2 border-b border-gray-50">Blog</Link>
          <Link to="/contact" className="font-inter text-base font-medium text-charcoal block pb-2 border-b border-gray-50">Contact</Link>
          <Link to="/fleet" className="bg-primary-gold text-[#FFFFFF] rounded px-6 py-3 font-poppins font-bold text-center mt-2 w-full">
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
