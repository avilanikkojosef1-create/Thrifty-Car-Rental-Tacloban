import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Banknote, Calendar, Headset, MapPin, Star, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroVideo from './San_Juanico_Bridge_202604231746.mp4';
import { supabase } from '../lib/supabase';

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

export default function HomePage() {
  const navigate = useNavigate();
  const [searchForm, setSearchForm] = useState({
    location: '',
    pickup: '',
    dropoff: ''
  });
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      const { data: vData } = await supabase.from('vehicles').select('*').limit(3);
      if (vData) setVehicles(vData);

      let { data: bData, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false }).limit(3);
      if (error && error.message?.includes('created_at')) {
        const fallback = await supabase.from('blogs').select('*').limit(3);
        bData = fallback.data;
      }
      if (bData) setBlogs(bData);
      setIsLoadingData(false);
    };
    fetchData();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedBlog]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchForm.location) params.append('location', searchForm.location);
    if (searchForm.pickup) params.append('pickup', searchForm.pickup);
    if (searchForm.dropoff) params.append('dropoff', searchForm.dropoff);
    navigate(`/fleet?${params.toString()}`);
  };

  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-[700px] md:min-h-[850px] w-full items-center justify-center text-center overflow-hidden pt-12 pb-24">
        
        {/* Mobile Image */}
        <img
          alt="Premium SUV - Thrifty Car Rental Tacloban"
          className="absolute inset-0 h-full w-full object-cover block md:hidden"
          src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2000"
        />

        {/* Desktop Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover hidden md:block"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Dark semi-transparent gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/60 to-charcoal/90 z-10"></div>
        
        <div className="relative z-20 mx-auto w-full max-w-5xl px-6 flex flex-col items-center pt-8">
          <h1 className="font-poppins mb-6 text-4xl md:text-6xl lg:text-7xl font-bold text-[#FFFFFF] drop-shadow-md leading-tight">
            Explore Tacloban with <span className="text-primary-gold">Style</span> and Ease
          </h1>
          <p className="mb-12 max-w-2xl text-lg md:text-xl font-inter text-white/90">
            Premium car rentals tailored for the modern navigator. Experience Leyte's beauty with our top-tier fleet.
          </p>
          
          {/* Booking Widget */}
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full flex flex-col md:flex-row gap-5 text-left md:items-end">
            <div className="w-full md:w-[35%] flex flex-col gap-2">
              <label className="font-inter text-xs font-bold text-charcoal uppercase tracking-widest pl-1">Pick-Up Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Enter pick-up location..." 
                  value={searchForm.location} 
                  onChange={(e) => setSearchForm({...searchForm, location: e.target.value})} 
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal bg-gray-50/50 focus:bg-white transition-colors" 
                />
              </div>
            </div>
            <div className="w-full md:w-[25%] flex flex-col gap-2">
              <label className="font-inter text-xs font-bold text-charcoal uppercase tracking-widest pl-1">Pick-Up Time</label>
              <input type="datetime-local" value={searchForm.pickup} onChange={(e) => setSearchForm({...searchForm, pickup: e.target.value})} className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal bg-gray-50/50 focus:bg-white transition-colors" />
            </div>
            <div className="w-full md:w-[25%] flex flex-col gap-2">
              <label className="font-inter text-xs font-bold text-charcoal uppercase tracking-widest pl-1">Drop-Off Time</label>
              <input type="datetime-local" value={searchForm.dropoff} onChange={(e) => setSearchForm({...searchForm, dropoff: e.target.value})} className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal bg-gray-50/50 focus:bg-white transition-colors" />
            </div>
            <div className="w-full md:w-[15%] pt-2 md:pt-0">
              <button onClick={handleSearch} className="w-full bg-primary-gold text-[#FFFFFF] flex items-center justify-center rounded-lg px-4 py-3.5 md:h-[54px] font-poppins text-sm font-bold shadow-lg transition-all hover:bg-gold-hover active:scale-95">
                Find Car
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="bg-surface-light py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal mb-4">Why Choose Us</h2>
            <p className="text-charcoal/80 font-inter max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Redefining the rental experience through cinematic service and uncompromising quality standards in the heart of Leyte.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {/* Signal 1 */}
            <div className="flex flex-col items-center md:items-start group">
              <Banknote className="text-primary-gold w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Transparent Pricing</h3>
              <p className="font-inter text-charcoal leading-relaxed text-sm md:text-base">
                No hidden fees or unexpected surcharges. What you see is exactly what you pay for your journey.
              </p>
            </div>
            {/* Signal 2 */}
            <div className="flex flex-col items-center md:items-start group">
              <Calendar className="text-primary-gold w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Flexible Terms</h3>
              <p className="font-inter text-charcoal leading-relaxed text-sm md:text-base">
                Plans that adapt to your schedule. Change or cancel with ease because we know travel plans shift.
              </p>
            </div>
            {/* Signal 3 */}
            <div className="flex flex-col items-center md:items-start group">
              <Headset className="text-primary-gold w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">24/7 Support</h3>
              <p className="font-inter text-charcoal leading-relaxed text-sm md:text-base">
                Our dedicated team is always on standby to ensure your trip through Tacloban remains seamless.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      {(isLoadingData || vehicles.length > 0) && (
        <section className="bg-surface-light py-20 md:py-24 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal mb-4">Our Premium Fleet</h2>
              <p className="text-charcoal/80 font-inter max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                Find the perfect ride for your next journey in Leyte.
              </p>
            </div>
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="group flex flex-col overflow-hidden rounded-xl bg-[#FFFFFF] border border-gray-100 shadow-sm animate-pulse text-left">
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((v) => (
                  <div key={v.id} className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-[#FFFFFF] border border-gray-100 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl text-left">
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
                        <Link to={`/book/${v.id}`} className="bg-primary-gold text-[#FFFFFF] hover:bg-gold-hover rounded px-4 py-2 text-sm font-bold transition-colors shadow">
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Link to="/fleet" className="inline-block bg-charcoal text-[#FFFFFF] hover:bg-charcoal/90 rounded px-8 py-4 font-poppins font-bold transition-colors shadow">
                View Full Fleet
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {(isLoadingData || blogs.length > 0) && (
        <section className="bg-white py-20 md:py-24 border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal mb-4">Latest Travel Guides</h2>
              <p className="text-charcoal/80 font-inter max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
                Discover the best routes, hidden gems, and travel advice for your next adventure.
              </p>
            </div>
            {isLoadingData ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-pulse text-left">
                    <div className="w-full h-48 bg-gray-200"></div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5 flex-1"></div>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <div 
                    key={blog.id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all group cursor-pointer text-left"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    {blog.image_url && (
                      <div className="w-full h-48 bg-gray-100 overflow-hidden relative">
                        <img 
                          src={formatImageUrl(blog.image_url)} 
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-primary-gold font-bold text-xs uppercase tracking-wider mb-2 block">{blog.category}</span>
                      <h3 className="font-poppins font-bold text-xl text-charcoal mb-3 line-clamp-2">{blog.title}</h3>
                      <p className="text-charcoal/70 text-sm font-inter flex-1 line-clamp-3 mb-4">{blog.content}</p>
                      <div className="mt-auto pt-4 border-t border-gray-100">
                        {blog.created_at && <p className="text-xs text-charcoal/50 font-inter">{new Date(blog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="text-center mt-12">
              <Link to="/blogs" className="inline-block bg-charcoal text-[#FFFFFF] hover:bg-charcoal/90 rounded px-8 py-4 font-poppins font-bold transition-colors shadow">
                View All Guides
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* What Customers Say Section */}
      <section className="bg-white py-20 md:py-24 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal mb-4">What Customers Say</h2>
            <p className="text-charcoal/80 font-inter max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Don't just take our word for it. Here is what some of our recent renters have to say about their journey with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-light p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex gap-1 mb-4 text-primary-gold">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="font-inter text-charcoal/80 text-sm italic mb-6 flex-grow">
                "Smooth transaction and very accommodating staff. The SUV was clean and well-maintained. Highly recommended for trips around Leyte and Samar!"
              </p>
              <div>
                <h4 className="font-poppins font-bold text-charcoal">Maria S.</h4>
                <p className="font-inter text-xs text-charcoal/50">Toyota Fortuner</p>
              </div>
            </div>

            <div className="bg-surface-light p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex gap-1 mb-4 text-primary-gold">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="font-inter text-charcoal/80 text-sm italic mb-6 flex-grow">
                "Thrifty Car Rental Tacloban made our family vacation hassle-free. The booking process was so easy, and the car performed flawlessly across San Juanico Bridge."
              </p>
              <div>
                <h4 className="font-poppins font-bold text-charcoal">Juan D.</h4>
                <p className="font-inter text-xs text-charcoal/50">Toyota Vios</p>
              </div>
            </div>

            <div className="bg-surface-light p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex gap-1 mb-4 text-primary-gold">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="font-inter text-charcoal/80 text-sm italic mb-6 flex-grow">
                "Great rates and excellent customer service. Five stars all the way. Will definitely book again next time I am in Tacloban."
              </p>
              <div>
                <h4 className="font-poppins font-bold text-charcoal">Elena G.</h4>
                <p className="font-inter text-xs text-charcoal/50">Toyota Innova</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-charcoal/60 backdrop-blur-sm z-[100]">
          <div 
            className="absolute inset-0 z-0" 
            onClick={() => setSelectedBlog(null)}
          ></div>
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col shadow-2xl text-left">
            <button 
              onClick={() => setSelectedBlog(null)} 
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-charcoal/60 hover:text-charcoal shadow-sm transition-colors z-20 backdrop-blur"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            
            {selectedBlog.image_url && (
              <div className="w-full h-64 md:h-96 shrink-0 relative">
                <img 
                  src={formatImageUrl(selectedBlog.image_url)} 
                  alt={selectedBlog.title} 
                  className="w-full h-full object-cover rounded-t-2xl" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 md:p-10 pointer-events-none">
                  <span className="bg-primary-gold px-3 pt-1 pb-1.5 rounded text-white text-xs font-bold uppercase tracking-wider shadow-sm table">
                    {selectedBlog.category}
                  </span>
                </div>
              </div>
            )}
            
            <div className="p-6 md:p-10 flex-1 flex flex-col">
              {!selectedBlog.image_url && (
                <span className="bg-primary-gold/10 text-primary-gold px-3 pt-1 pb-1.5 rounded text-xs font-bold uppercase tracking-wider table mb-4 self-start">
                  {selectedBlog.category}
                </span>
              )}
              
              <h2 className="font-poppins text-2xl md:text-4xl font-bold text-charcoal mb-4">
                {selectedBlog.title}
              </h2>
              
              {selectedBlog.created_at && (
                <p className="text-sm text-charcoal/50 font-inter mb-8 pb-8 border-b border-gray-100">
                  Published on {new Date(selectedBlog.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              )}
              
              <div className="font-inter text-charcoal/80 leading-relaxed max-w-none whitespace-pre-wrap">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
