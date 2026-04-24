import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';
import { ArrowLeft, CheckCircle2, ShieldCheck, Banknote, CalendarDays, UploadCloud } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const formatImageUrl = (url: string) => {
  if (url && url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
  }
  return url;
};

export default function BookingPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const pickupDateParam = searchParams.get('pickup') || '';
  const dropoffDateParam = searchParams.get('dropoff') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    facebook: '',
    passengers: '1',
    purpose: 'Leisure / Tourism',
    deliveryMethod: 'pickup',
    deliveryAddress: '',
    pickupDate: pickupDateParam,
    dropoffDate: dropoffDateParam,
  });

  const [licenseFile, setLicenseFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('vehicles').select('*').eq('id', id).single();
      if (!error && data) {
        setVehicle(data);
      }
      setIsLoading(false);
    };
    if (id) fetchVehicle();
  }, [id]);

  // Calculate pricing
  const calculateDuration = () => {
    if (!formData.pickupDate || !formData.dropoffDate) return { days: 1, extraHours: 0 };
    const start = new Date(formData.pickupDate).getTime();
    const end = new Date(formData.dropoffDate).getTime();
    const diffTime = Math.max(0, end - start);
    
    const totalHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    // Default to at least 1 day if rented for 24 hours or less
    if (totalHours <= 24) {
      return { days: 1, extraHours: 0 };
    }
    
    const days = Math.floor(totalHours / 24);
    const extraHours = totalHours % 24;
    return { days, extraHours };
  };

  const duration = calculateDuration();
  const baseRent = vehicle ? vehicle.daily_rate * duration.days : 0;
  const extensionTotal = vehicle ? (vehicle.extension_fee || 0) * duration.extraHours : 0;
  const carwashFee = vehicle ? vehicle.carwash_fee : 0;
  const totalCost = baseRent + extensionTotal + carwashFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    try {
      let licenseUrl = '';
      
      // Attempt to upload image if a file was selected
      if (licenseFile) {
        const fileExt = licenseFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('booking_attachments')
          .upload(fileName, licenseFile);
          
        if (uploadError) {
          console.error("Storage upload error:", uploadError);
          // If storage bucket isn't set up yet, we will just proceed without the actual file url for demo resilience
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('booking_attachments')
            .getPublicUrl(fileName);
          licenseUrl = publicUrlData.publicUrl;
        }
      }

      // Save Booking details
      const { error: dbError } = await supabase.from('bookings').insert({
        vehicle_id: id,
        full_name: formData.fullName,
        phone: formData.phone,
        facebook: formData.facebook,
        passengers: parseInt(formData.passengers),
        purpose: formData.purpose,
        delivery_method: formData.deliveryMethod,
        delivery_address: formData.deliveryAddress,
        pickup_date: formData.pickupDate,
        dropoff_date: formData.dropoffDate,
        license_url: licenseUrl,
        status: 'pending',
        total_cost: totalCost
      });

      if (dbError) throw dbError;

      // Send Email Notification
      try {
        await emailjs.send(
          'service_ciralhd',
          'template_2auvj2a',
          {
            customer_name: formData.fullName,
            customer_phone: formData.phone,
            facebook_link: formData.facebook,
            vehicle_name: vehicle.name,
            pickup_date: new Date(formData.pickupDate).toLocaleString(),
            dropoff_date: new Date(formData.dropoffDate).toLocaleString(),
            delivery_method: formData.deliveryMethod,
            delivery_address: formData.deliveryAddress || 'N/A',
            trip_purpose: formData.purpose,
            passengers: formData.passengers,
            total_cost: totalCost,
            license_link: licenseUrl || 'No image uploaded'
          },
          'yeqZokXiTJ8A-GBt_'
        );
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }

      setSubmitStatus('success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to submit booking. Ensure the 'bookings' table exists.");
      setSubmitStatus('idle');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-light flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center font-inter text-charcoal/50">Loading vehicle details...</div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-surface-light flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center font-inter text-charcoal">
          <h2 className="text-2xl font-bold mb-4 font-poppins">Vehicle Not Found</h2>
          <button onClick={() => navigate('/fleet')} className="text-primary-gold hover:underline">Return to Fleet</button>
        </div>
        <Footer />
      </div>
    );
  }

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-surface-light flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white p-12 rounded-2xl shadow-lg border border-gray-100 max-w-lg text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="font-poppins text-3xl font-bold text-charcoal mb-4">Booking Requested!</h2>
            <p className="font-inter text-charcoal/70 mb-8 leading-relaxed">
              Thank you for choosing Thrifty Car Rental Tacloban. We have received your booking request for the <strong>{vehicle.name}</strong>. Our team will contact you shortly to confirm your reservation and assist with your driver's license verification.
            </p>
            <button 
              onClick={() => navigate('/')} 
              className="bg-charcoal text-white px-8 py-3 rounded hover:bg-black transition-colors font-poppins font-bold"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-charcoal/60 hover:text-charcoal font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </button>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Form */}
          <div className="flex-1">
            <h1 className="font-poppins text-3xl font-bold text-charcoal mb-2">Complete Your Booking</h1>
            <p className="font-inter text-charcoal/60 mb-8">Please provide your details below to reserve the vehicle.</p>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              
              {/* Section 1: Dates */}
              <div>
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-4 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-primary-gold" /> Dates & Times</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Pick-up Time</label>
                    <input type="datetime-local" required value={formData.pickupDate} onChange={e => setFormData({...formData, pickupDate: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold bg-surface-light" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Drop-off Time</label>
                    <input type="datetime-local" required value={formData.dropoffDate} onChange={e => setFormData({...formData, dropoffDate: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold bg-surface-light" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Section 2: Personal Info */}
              <div>
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Full Name</label>
                    <input type="text" required placeholder="Juan Dela Cruz" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Phone Number</label>
                    <input type="tel" required placeholder="09XX XXX XXXX" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Facebook Profile URL</label>
                    <input type="url" required placeholder="https://facebook.com/yourprofile" value={formData.facebook} onChange={e => setFormData({...formData, facebook: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold bg-surface-light" />
                    <p className="text-xs text-charcoal/50 mt-1">Required for identity verification purposes.</p>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Section 3: Verification */}
              <div>
                 <h3 className="font-poppins text-xl font-bold text-charcoal mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary-gold" /> Identity Verification</h3>
                 <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Upload Driver's License</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center text-center bg-surface-light hover:bg-gray-50 transition-colors">
                      <UploadCloud className="w-8 h-8 text-charcoal/40 mb-3" />
                      <span className="text-sm font-medium text-charcoal mb-1">Click or drag file to upload</span>
                      <span className="text-xs text-charcoal/50 mb-4">PNG, JPG or PDF (Max 5MB)</span>
                      <input type="file" accept="image/*,.pdf" onChange={(e) => setLicenseFile(e.target.files?.[0] || null)} className="text-sm text-charcoal/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-gold/10 file:text-primary-gold hover:file:bg-primary-gold/20" />
                    </div>
                 </div>
              </div>

              <hr className="border-gray-100" />

              {/* Section 4: Trip Details */}
              <div>
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-4">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">No. of Passengers</label>
                    <input type="number" min="1" max="15" required value={formData.passengers} onChange={e => setFormData({...formData, passengers: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Purpose of Trip</label>
                    <select required value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold bg-white">
                      <option>Leisure / Tourism</option>
                      <option>Business / Corporate</option>
                      <option>Family Visit</option>
                      <option>Event / Wedding</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Section 5: Delivery */}
              <div>
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-4">Delivery Method</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label className={`border rounded-lg p-4 cursor-pointer transition-all flex items-start gap-3 ${formData.deliveryMethod === 'pickup' ? 'border-primary-gold bg-primary-gold/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="delivery" value="pickup" checked={formData.deliveryMethod === 'pickup'} onChange={() => setFormData({...formData, deliveryMethod: 'pickup'})} className="mt-1" />
                    <div>
                      <span className="font-bold text-charcoal block text-sm">Pick up</span>
                      <span className="text-xs text-charcoal/60">Collect at local branch/hub.</span>
                    </div>
                  </label>
                  <label className={`border rounded-lg p-4 cursor-pointer transition-all flex items-start gap-3 ${formData.deliveryMethod === 'dropoff' ? 'border-primary-gold bg-primary-gold/5' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" name="delivery" value="dropoff" checked={formData.deliveryMethod === 'dropoff'} onChange={() => setFormData({...formData, deliveryMethod: 'dropoff'})} className="mt-1" />
                    <div>
                      <span className="font-bold text-charcoal block text-sm">Drop off (Delivery)</span>
                      <span className="text-xs text-charcoal/60">We bring the car to your location.</span>
                    </div>
                  </label>
                </div>
                
                {formData.deliveryMethod === 'dropoff' && (
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase tracking-widest mb-2">Drop-off Address</label>
                    <textarea required placeholder="Enter the exact hotel, airport, or residence address in Tacloban/Leyte..." value={formData.deliveryAddress} onChange={e => setFormData({...formData, deliveryAddress: e.target.value})} className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold resize-none" rows={3}></textarea>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={submitStatus === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-primary-gold text-[#FFFFFF] font-poppins font-bold text-lg rounded py-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:cursor-not-allowed"
              >
                {submitStatus === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Processing...
                  </>
                ) : 'Confirm Booking Request'}
              </button>

            </form>
          </div>

          {/* Right Column: Cost Summary */}
          <div className="w-full lg:w-[400px]">
             <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden sticky top-24">
               {/* Car Preview */}
               <div className="h-48 w-full bg-gray-100 relative">
                 <img src={formatImageUrl(vehicle.image_url)} alt={vehicle.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent flex items-end p-4">
                   <h3 className="font-poppins text-xl font-bold text-white">{vehicle.name}</h3>
                 </div>
               </div>

               <div className="p-6">
                 <h4 className="font-poppins font-bold text-charcoal mb-4 border-b border-gray-100 pb-2">Booking Summary</h4>
                 
                 <div className="space-y-3 mb-6 font-inter text-sm">
                   <div className="flex justify-between">
                     <span className="text-charcoal/70">Category</span>
                     <span className="font-medium text-charcoal">{vehicle.category}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-charcoal/70">Rental Duration</span>
                     <span className="font-medium text-charcoal">
                       {duration.days} {duration.days === 1 ? 'Day' : 'Days'} 
                       {duration.extraHours > 0 ? `, ${duration.extraHours} ${duration.extraHours === 1 ? 'Hour' : 'Hours'}` : ''}
                     </span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-charcoal/70">Daily Rate</span>
                     <span className="font-medium text-charcoal">₱{vehicle.daily_rate.toLocaleString()}</span>
                   </div>
                   {vehicle.extension_fee > 0 && (
                     <div className="flex justify-between">
                       <span className="text-charcoal/70">Extension Rate</span>
                       <span className="font-medium text-charcoal">₱{vehicle.extension_fee.toLocaleString()}/hr</span>
                     </div>
                   )}
                 </div>

                 <div className="space-y-3 mb-6 font-inter text-sm border-t border-gray-100 pt-4">
                   <div className="flex justify-between items-center">
                     <span className="text-charcoal/70 flex items-center gap-1.5"><Banknote className="w-4 h-4" /> Base Rent ({duration.days} {duration.days === 1 ? 'Day' : 'Days'})</span>
                     <span className="font-medium text-charcoal">₱{baseRent.toLocaleString()}</span>
                   </div>
                   {duration.extraHours > 0 && (
                     <div className="flex justify-between items-center text-charcoal/70 mt-3">
                       <span className="flex items-center gap-1.5 pl-6">Extension ({duration.extraHours} {duration.extraHours === 1 ? 'Hour' : 'Hours'})</span>
                       <span className="font-medium text-charcoal">₱{extensionTotal.toLocaleString()}</span>
                     </div>
                   )}
                   {carwashFee > 0 && (
                     <div className="flex justify-between items-center text-charcoal/70">
                       <span>Carwash Fee</span>
                       <span className="font-medium text-charcoal">₱{carwashFee.toLocaleString()}</span>
                     </div>
                   )}
                 </div>

                 <div className="border-t border-gray-200 pt-4 pb-2">
                   <div className="flex justify-between items-end">
                     <span className="font-poppins font-bold text-charcoal uppercase tracking-wider text-sm">Total Estimation</span>
                     <span className="font-poppins font-bold text-primary-gold text-3xl">₱{totalCost.toLocaleString()}</span>
                   </div>
                   <p className="text-xs text-charcoal/50 text-right mt-1">*Final amount subject to verification</p>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
