import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-12 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-gold hover:text-gold-hover font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-4 text-charcoal">Terms of Service</h1>
          <p className="text-sm text-charcoal/60 mb-8 font-inter">Last Updated: April 2026</p>
          <div className="space-y-6 text-charcoal/80 leading-relaxed font-inter">
            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">1. Agreement to Terms</h2>
            <p>By booking a vehicle with Thrifty Car Rental Tacloban, you agree to comply with and be bound by the following terms and conditions. These terms apply to all rentals in Tacloban City, Leyte, and Samar.</p>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">2. Driver Eligibility</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Renters must possess a valid Professional or Non-Professional Driver's License.</li>
              <li>A valid government-issued ID is required for identity verification.</li>
              <li>We reserve the right to refuse service to anyone who appears intoxicated or unable to operate a vehicle safely.</li>
            </ul>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">3. Booking & Fees</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>A reservation fee of ₱500 is required to secure your booking. This fee is non-refundable but deductible from the total rental cost.</li>
              <li>Full payment is expected upon vehicle pickup or delivery.</li>
              <li>Rental days are calculated on a 24-hour cycle. Exceeding the return time may incur additional hourly charges or a full day's rate.</li>
            </ul>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">4. Cancellation Policy</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Non-Refundable Cancellations:</strong> The reservation fee is non-refundable if the cancellation is made for reasons other than extreme weather conditions, documented health emergencies, or proven flight cancellations.</li>
              <li><strong>24-Hour Notice:</strong> Any cancellation made less than 24 hours before the scheduled pickup time for reasons not listed above will result in the total forfeiture of the reservation fee.</li>
              <li><strong>Rescheduling:</strong> If you need to change your dates, please contact us immediately. We will do our best to accommodate your new schedule based on vehicle availability.</li>
            </ul>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">5. Vehicle Use & Liability</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The vehicle must strictly be used within the agreed service areas (Leyte and Samar).</li>
              <li>Illegal activities, transporting prohibited goods, or subleasing the vehicle is strictly prohibited.</li>
              <li>The renter is responsible for any damage to the vehicle caused by negligence, as well as traffic violations incurred during the rental period.</li>
              <li>In case of accidents, the renter must notify Thrifty Car Rental Tacloban immediately.</li>
            </ul>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">6. Fuel Policy</h2>
            <p>Vehicles are delivered with varying levels of fuel. The renter is required to return the vehicle with the exact same fuel level as accurately recorded during the initial turnover. Alternatively, a refueling charge may be deducted from the security deposit if returned lower.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
