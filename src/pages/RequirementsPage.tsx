import { FileText, UserCheck, CreditCard } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RequirementsPage() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24 pt-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h1 className="font-poppins text-3xl md:text-5xl font-bold text-charcoal mb-4">Rental Requirements</h1>
            <p className="text-charcoal/80 font-inter max-w-2xl mx-auto leading-relaxed text-base">
              Everything you need to know before you hit the road. We keep our process simple and transparent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FileText className="text-primary-gold w-8 h-8" />
              </div>
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Valid Driver's License</h3>
              <p className="font-inter text-sm text-charcoal/70">Original local or international driver's license valid for the entire rental duration.</p>
            </div>
            <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <UserCheck className="text-primary-gold w-8 h-8" />
              </div>
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Age Requirement</h3>
              <p className="font-inter text-sm text-charcoal/70">Renters must be at least 21 years old. A valid government ID or Passport is required.</p>
            </div>
            <div className="bg-[#FFFFFF] p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="text-primary-gold w-8 h-8" />
              </div>
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Security Deposit</h3>
              <p className="font-inter text-sm text-charcoal/70">A refundable security deposit via credit card or cash is required upon car pickup.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
