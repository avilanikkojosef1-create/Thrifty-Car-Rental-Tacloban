import { Link } from 'react-router-dom';
import { ArrowLeft, Plane, MapPin, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AirportGuidePage() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-12 pb-20 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-gold hover:text-gold-hover font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-4 text-charcoal">Tacloban Airport Guide</h1>
          <p className="text-sm text-charcoal/60 mb-8 font-inter">Daniel Z. Romualdez Airport (TAC) Drop-off & Pick-up Info</p>
          
          <div className="relative h-64 md:h-80 w-full mb-10 rounded-xl overflow-hidden shadow">
            <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1200" alt="Airplane landing" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-charcoal/30"></div>
          </div>

          <div className="space-y-8 text-charcoal/80 leading-relaxed font-inter">
            <p>Landing at Daniel Z. Romualdez Airport (Tacloban City Airport)? Here is a quick guide to make your arrival and vehicle pickup as seamless as possible.</p>
            
            <div className="bg-surface-light border border-gray-200 p-6 rounded-lg space-y-4">
              <h2 className="font-poppins text-xl font-bold text-charcoal flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary-gold" /> Airport Arrival & Pick-Up
              </h2>
              <p>As soon as you disembark and collect your luggage from the carousel, our representative will be waiting for you. We typically wait outside the main Arrival Gate holding a placard with your name or the Thrifty logo.</p>
              
              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
                  <span><strong>Meeting Point:</strong> Main Arrival Exit / Passenger Pick-up Lane.</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary-gold shrink-0 mt-0.5" />
                  <span><strong>Contact Person:</strong> Ensure you text or call <em>09387149877</em> upon landing so we can pull the vehicle up directly to the curb for you.</span>
                </div>
              </div>
            </div>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">Drop-Off Instructions</h2>
            <p>When your trip concludes, you may drop off the vehicle directly at the Tacloban Airport Departure area. Please coordinate with our team at least 2 hours before your flight time so a representative can perform the final inspection and release your security deposit on the spot, avoiding delays to your check-in.</p>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">About the Airport</h2>
            <p>Daniel Z. Romualdez Airport is the main gateway to Eastern Visayas. It is a relatively small and highly accessible domestic airport. The drive from the airport to Downtown Tacloban takes approximately 15-20 minutes depending on traffic. You'll find plenty of local food vendors and small cafes just outside the terminal.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
