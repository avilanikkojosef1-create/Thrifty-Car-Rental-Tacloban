import { Link } from 'react-router-dom';
import { CreditCard, Banknote, Wallet, MapPin, Phone, Mail, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-20 pb-10 mt-auto">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-3">
        <div className="space-y-4">
          <div className="font-poppins text-2xl font-bold text-primary-gold md:text-xl">Thrifty Car Rental Tacloban</div>
          <p className="text-sm font-inter text-white/50 leading-relaxed rounded">
            Tacloban's premier car rental service for travelers who demand style, safety, and transparency.
          </p>
        </div>
        <div>
          <h4 className="font-poppins mb-6 font-bold tracking-wide text-white">Quick Links</h4>
          <ul className="space-y-3.5">
            <li>
              <Link to="/privacy" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/airport-guide" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                Tacloban Airport Guide
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-poppins mb-6 font-bold tracking-wide text-white">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <span className="font-inter text-sm text-white/50 leading-tight">Brgy 77 Marasbaras Tacloban City</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <span className="font-inter text-sm text-white/50 leading-tight">09387149877<br/>09282576304</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <a href="mailto:michiko_alcaraz@yahoo.com" className="font-inter text-sm text-white/50 hover:text-primary-gold transition-colors break-all">michiko_alcaraz@yahoo.com</a>
            </li>
            <li className="flex items-start gap-3">
              <Facebook className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
              <a href="https://www.facebook.com/Thiftycarrental.com.ph" target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-white/50 hover:text-primary-gold transition-colors break-all">
                facebook.com/Thiftycarrental.com.ph
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-white/10 mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-6 border-t px-6 pt-8 md:flex-row">
        <p className="font-inter text-sm text-white/30 flex items-center gap-4">
          <span>© 2026 Thrifty Car Rental Tacloban. All rights reserved.</span>
          <Link to="/login" className="hover:text-primary-gold transition-colors">Admin</Link>
        </p>
        <div className="flex gap-4">
          <CreditCard className="text-white/30 h-5 w-5" />
          <Banknote className="text-white/30 h-5 w-5" />
          <Wallet className="text-white/30 h-5 w-5" />
        </div>
      </div>
    </footer>
  );
}
