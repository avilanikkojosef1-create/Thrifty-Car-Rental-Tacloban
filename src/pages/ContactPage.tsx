import { MapPin, Phone, Mail, Facebook } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24 pt-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h1 className="font-poppins text-3xl md:text-5xl font-bold text-charcoal mb-4">Contact Us</h1>
            <p className="text-charcoal/80 font-inter max-w-2xl mx-auto leading-relaxed text-base">
              Have questions or ready to book? Reach out to our team via phone, email, or visit our local office.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-6">Get In Touch</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-primary-gold/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary-gold shrink-0" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block mb-1">Office Address</span>
                    <span className="font-inter text-sm text-charcoal/70">Brgy 77 Marasbaras<br/>Tacloban City, Leyte</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary-gold/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary-gold shrink-0" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block mb-1">Phone Numbers</span>
                    <span className="font-inter text-sm text-charcoal/70">09387149877<br/>09282576304</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-6">Online Support</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-primary-gold/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary-gold shrink-0" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block mb-1">Email Us</span>
                    <a href="mailto:michiko_alcaraz@yahoo.com" className="font-inter text-sm text-primary-gold hover:underline break-all">michiko_alcaraz@yahoo.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-primary-gold/10 p-3 rounded-full">
                    <Facebook className="w-6 h-6 text-primary-gold shrink-0" />
                  </div>
                  <div>
                    <span className="font-bold text-charcoal block mb-1">Facebook Page</span>
                    <a href="https://www.facebook.com/Thiftycarrental.com.ph" target="_blank" rel="noopener noreferrer" className="font-inter text-sm text-primary-gold hover:underline break-all">
                      Thrifty Car Rental Tacloban
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
