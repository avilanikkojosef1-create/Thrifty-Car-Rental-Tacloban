import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Helper to convert Google Drive viewing links into raw image source links
const formatImageUrl = (url: string) => {
  if (url && url.includes('drive.google.com/file/d/')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
  }
  return url;
};

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [isLoadingFleet, setIsLoadingFleet] = useState(true);
  const routerLocation = useLocation();
  const searchParams = new URLSearchParams(routerLocation.search);
  const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';

  useEffect(() => {
    const fetchFleet = async () => {
      setIsLoadingFleet(true);
      const { data, error } = await supabase.from('vehicles').select('*');
      if (!error && data) {
        setVehicles(data);
      }
      setIsLoadingFleet(false);
    };
    fetchFleet();
  }, []);

  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pb-24 pt-12">
        <div className="mx-auto mb-12 max-w-7xl px-6 text-center md:text-left">
          <h1 className="font-poppins text-3xl md:text-5xl font-bold text-charcoal mb-4">Our Premium Fleet</h1>
          <p className="text-charcoal/80 font-inter max-w-2xl leading-relaxed">
            Choose from our modern, meticulously maintained vehicles. Find the perfect ride for your next journey in Leyte.
          </p>
        </div>
        
        <div className="flex pb-12 px-6 justify-center w-full max-w-7xl mx-auto">
          {isLoadingFleet ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="group flex flex-col overflow-hidden rounded-xl bg-[#FFFFFF] border border-gray-100 shadow-sm animate-pulse">
                   <div className="aspect-[4/3] w-full bg-gray-200"></div>
                   <div className="p-6 flex flex-col flex-1">
                     <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                     <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                     <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                     <div className="flex items-end justify-between border-t border-gray-100 pt-4 mt-auto">
                       <div className="w-1/3">
                         <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                         <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                       </div>
                       <div className="h-9 bg-gray-200 rounded w-1/4"></div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          ) : vehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full text-left">
              {vehicles.map((v) => (
                <div key={v.id} className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#FFFFFF] border border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      alt={v.name}
                      src={formatImageUrl(v.image_url)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-charcoal/90 text-primary-gold px-3 py-1 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                        {v.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-poppins mb-2 text-xl font-bold text-charcoal">{v.name}</h3>
                    <p className="font-inter text-sm text-charcoal/70 mb-6 flex-1">{v.specifications}</p>
                    <div className="flex items-end justify-between border-t border-gray-100 pt-4 mt-auto">
                      <div>
                        <span className="font-inter text-xs text-charcoal/50 uppercase tracking-wider block mb-0.5">Daily Rate</span>
                        <span className="font-poppins text-2xl font-bold text-primary-gold">₱{v.daily_rate}</span>
                      </div>
                      <Link to={`/book/${v.id}${queryString}`} className="bg-primary-gold text-[#FFFFFF] hover:bg-gold-hover rounded px-4 py-2 text-sm font-bold transition-colors shadow">
                        Book Now
                      </Link>
                    </div>
                    <div className="flex flex-col items-end gap-1 mt-3">
                      {v.carwash_fee > 0 && <span className="font-inter text-xs text-charcoal/50">+ ₱{v.carwash_fee} Carwash</span>}
                      {v.extension_fee > 0 && <span className="font-inter text-xs text-blue-500/80">+ ₱{v.extension_fee}/hr Extension</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#FFFFFF] border border-gray-100 rounded-xl p-12 text-center w-full max-w-3xl flex flex-col items-center">
              <p className="font-inter text-charcoal/60">Our premium fleet is currently being updated. Please check back soon or contact us for immediate inquiries.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
