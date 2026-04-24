import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-12 pb-20">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-gold hover:text-gold-hover font-bold mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-100">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-4 text-charcoal">Privacy Policy</h1>
          <p className="text-sm text-charcoal/60 mb-8 font-inter">Last Updated: April 2026</p>
          <div className="space-y-6 text-charcoal/80 leading-relaxed font-inter">
            <p>At Thrifty Car Rental Tacloban, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.</p>
            
            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">1. Information We Collect</h2>
            <p>We collect information strictly necessary to provide our rental services, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal details (Name, Date of Birth, Email Address, Phone Number).</li>
              <li>Identification documents (Valid Driver's License, Passport or Government ID).</li>
              <li>Payment details (Credit Card information for deposits, processed securely).</li>
            </ul>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">2. How We Use Your Information</h2>
            <p>Your data is practically used for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To confirm and manage your vehicle reservations.</li>
              <li>To verify your identity and driving eligibility.</li>
              <li>To contact you regarding your booking or emergencies.</li>
              <li>To process payments and refund security deposits.</li>
            </ul>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">3. Data Security & Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We employ industry-standard security measures to ensure your data is protected against unauthorized access. Information may only be disclosed to local law enforcement or authorities if strictly required by Philippine law.</p>

            <h2 className="font-poppins text-xl font-bold text-charcoal pt-4">4. Your Rights</h2>
            <p>You reserve the right to request access to the personal data we hold about you and to request corrections if any information is inaccurate. Contact us via our official email address to request data updates or deletions.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
