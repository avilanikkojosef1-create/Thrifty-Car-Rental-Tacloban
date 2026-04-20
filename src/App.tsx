/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Banknote, Calendar, CreditCard, Headset, Wallet, MapPin, Phone, Mail, Facebook, FileText, UserCheck, ChevronRight } from 'lucide-react';

export default function App() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen">
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 w-full flex items-center bg-[#FFFFFF] shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="font-poppins text-xl md:text-2xl font-bold italic text-primary-gold">
            Thrifty Car Rental Tacloban
          </div>
          <nav className="hidden items-center space-x-6 md:flex">
            <a href="#home" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Home</a>
            <a href="#fleet" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Fleet</a>
            <a href="#requirements" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Requirements</a>
            <a href="#about" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">About Us</a>
            <a href="#blog" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Blog</a>
            <a href="#contact" className="font-inter text-sm font-medium text-charcoal hover:text-primary-gold transition-colors">Contact</a>
          </nav>
          <button className="bg-primary-gold text-[#FFFFFF] rounded px-6 py-2.5 font-poppins font-bold transition-all hover:bg-gold-hover hover:shadow-lg active:scale-95 text-sm md:text-base">
            Book Now
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative flex min-h-[700px] md:min-h-[850px] w-full items-center justify-center text-center overflow-hidden pt-12 pb-24">
        <img
          alt="Premium SUV - Thrifty Car Rental Tacloban"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=2000"
        />
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
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-2xl w-full flex flex-col md:flex-row gap-4 text-left items-end">
            <div className="w-full md:w-[35%] flex flex-col gap-2">
              <label className="font-inter text-xs font-bold text-charcoal uppercase tracking-widest">Pick-Up Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select className="w-full pl-10 pr-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal appearance-none bg-white">
                  <option>Tacloban City Airport (DZR)</option>
                  <option>Downtown Tacloban</option>
                  <option>Palo, Leyte Hub</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-[25%] flex flex-col gap-2">
              <label className="font-inter text-xs font-bold text-charcoal uppercase tracking-widest">Pick-Up Time</label>
              <input type="datetime-local" className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal" />
            </div>
            <div className="w-full md:w-[25%] flex flex-col gap-2">
              <label className="font-inter text-xs font-bold text-charcoal uppercase tracking-widest">Drop-Off Time</label>
              <input type="datetime-local" className="w-full px-4 py-3 rounded border border-gray-200 focus:outline-none focus:border-primary-gold font-inter text-charcoal" />
            </div>
            <div className="w-full md:w-[15%]">
              <button className="w-full bg-primary-gold text-[#FFFFFF] flex items-center justify-center rounded px-4 py-3 h-[50px] font-poppins text-sm font-bold shadow-xl transition-all hover:bg-gold-hover">
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

      {/* Fleet Selection */}
      <section id="fleet" className="bg-white py-20 md:py-32">
        <div className="mx-auto mb-12 max-w-7xl px-6 text-center md:text-left">
          <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal">The Curated Fleet</h2>
        </div>
        
        {/* Fleet Ribbon */}
        <div className="no-scrollbar flex overflow-x-auto scroll-smooth pb-12 px-6 gap-6 md:gap-8 snap-x snap-mandatory 2xl:justify-center">
          
          {/* SUV Card */}
          <div className="bg-surface-light group min-w-[320px] md:min-w-[450px] snap-center overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <div className="relative h-[250px] md:h-[300px] overflow-hidden bg-gray-100">
              <img
                alt="Premium Explorer SUV"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0GUtmjK6ykiOIwVoL3AFZJ_uX4QZEegnEN5JwImyfudTOnZTSXmJseGYFjj6WsaDY6-IrK_M_YQ769D2HxsEyK2IfiYGEKSpeIimJAxYaI9y6U6Je4fHhj7uNcSzEXjPSvcUxmKxHMtnxV8atqNleY-PjQ3DhHZtKt_lCCAvomznNXgZiWf2ZzDgEoVzgzWRnEReYaniYB6eYgYq-WsN0yoXt9VqIAwddkRHQfpsl4Kk1q_0BZgD-DZIQhrNUy-cdbgqR106mfQY"
              />
              <div className="absolute top-4 right-4 rounded bg-white/90 px-3 py-1 text-xs font-bold font-inter text-primary-gold shadow-sm backdrop-blur">
                SUV
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="font-poppins mb-1.5 text-2xl font-bold text-charcoal">Premium Explorer</h3>
                  <p className="text-sm text-charcoal/60 font-inter">7 Seater • Auto • AWD</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-1">Daily Rate</span>
                  <span className="font-poppins text-xl md:text-2xl font-bold text-primary-gold">₱3,500</span>
                </div>
              </div>
              <button className="w-full rounded border border-gray-200 py-3 font-poppins font-bold text-charcoal transition-all hover:border-primary-gold hover:bg-primary-gold hover:text-white">
                View Details
              </button>
            </div>
          </div>

          {/* Sedan Card */}
          <div className="bg-surface-light group min-w-[320px] md:min-w-[450px] snap-center overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <div className="relative h-[250px] md:h-[300px] overflow-hidden bg-gray-100">
              <img
                alt="Executive Lounge Sedan"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRw2nyHljRKJ6bAlM2P5d9ZiNYpuTUrKe1ChaWd_BFLvfB3oeiCm7VtixVYj8zMriVPqEWqaPaKzxNelAYMhfu6Rb-3q6JPcZlvFGJKdG8gc1qXJ9w-pnX5q_RI2aZeB5y-0uuA-yHngTqbfuV948_0qLN170N75Chr7Sae_LbCSg0wyxu_w0j2N1nOC-hGb7OViLyjCVWDBTaHVApfVTuT5wwMh9NQt18e7TBEA-_-MkXCfZglOIUfxk_y6FDgA_l8xUlcoEuMvI"
              />
              <div className="absolute top-4 right-4 rounded bg-white/90 px-3 py-1 text-xs font-bold font-inter text-primary-gold shadow-sm backdrop-blur">
                SEDAN
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="font-poppins mb-1.5 text-2xl font-bold text-charcoal">Executive Lounge</h3>
                  <p className="text-sm text-charcoal/60 font-inter">5 Seater • Auto • Hybrid</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-1">Daily Rate</span>
                  <span className="font-poppins text-xl md:text-2xl font-bold text-primary-gold">₱2,800</span>
                </div>
              </div>
              <button className="w-full rounded border border-gray-200 py-3 font-poppins font-bold text-charcoal transition-all hover:border-primary-gold hover:bg-primary-gold hover:text-white">
                View Details
              </button>
            </div>
          </div>

          {/* Van Card */}
          <div className="bg-surface-light group min-w-[320px] md:min-w-[450px] snap-center overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <div className="relative h-[250px] md:h-[300px] overflow-hidden bg-gray-100">
              <img
                alt="Grand Voyager Van"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI9Ay5113Mmn3mYGLFrMnCJxcZEJ1qaLITB_GZnDGa-_Vwicmk6b5v2xUsVWIbXrxaUuqCl1i3mcNOK4G0w8Ywa7ILTb9dD-_5-WPVsi5-HzQ7-QJ_vOJbkFnt3BKVHim0_PJknklX7t8flCM7cR2nr6jUc84RkQ4gfWs2HNXBaUTlm2J51lUx2b42dBLcHC0OYOHT3v-PEIvmRTtE9SzfRl1M4ZKkr2P14fHUNh8w6j-pIUGwYh7HAra_89-rFHy6DjsrUPT-eFs"
              />
              <div className="absolute top-4 right-4 rounded bg-white/90 px-3 py-1 text-xs font-bold font-inter text-primary-gold shadow-sm backdrop-blur">
                VAN
              </div>
            </div>
            <div className="p-6 md:p-8">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3 className="font-poppins mb-1.5 text-2xl font-bold text-charcoal">Grand Voyager</h3>
                  <p className="text-sm text-charcoal/60 font-inter">12 Seater • Diesel • High Roof</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-1">Daily Rate</span>
                  <span className="font-poppins text-xl md:text-2xl font-bold text-primary-gold">₱5,000</span>
                </div>
              </div>
              <button className="w-full rounded border border-gray-200 py-3 font-poppins font-bold text-charcoal transition-all hover:border-primary-gold hover:bg-primary-gold hover:text-white">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section id="requirements" className="bg-surface-light py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal mb-4">Rental Requirements</h2>
            <p className="text-charcoal/80 font-inter max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              Everything you need to know before you hit the road. We keep our process simple and transparent.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <FileText className="text-primary-gold w-8 h-8" />
              </div>
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Valid Driver's License</h3>
              <p className="font-inter text-sm text-charcoal/70">Original local or international driver's license valid for the entire rental duration.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <UserCheck className="text-primary-gold w-8 h-8" />
              </div>
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Age Requirement</h3>
              <p className="font-inter text-sm text-charcoal/70">Renters must be at least 21 years old. A valid government ID or Passport is required.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="bg-primary-gold/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="text-primary-gold w-8 h-8" />
              </div>
              <h3 className="font-poppins text-xl font-bold text-charcoal mb-3">Security Deposit</h3>
              <p className="font-inter text-sm text-charcoal/70">A refundable security deposit via credit card or cash is required upon car pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-white py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2 relative lg:h-[500px]">
            <div className="absolute -inset-4 bg-primary-gold/10 rounded-xl transform rotate-3"></div>
            <img src="https://images.unsplash.com/photo-1541443131876-44b0360ba9c9?auto=format&fit=crop&q=80&w=1000" alt="Driving in Leyte" className="relative rounded-xl shadow-lg w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal mb-6">Your Journey, <span className="text-primary-gold">Our Priority</span></h2>
            <p className="font-inter text-charcoal/80 text-base leading-relaxed mb-6">
              Founded in the heart of Leyte, Thrifty Car Rental Tacloban was built on a simple premise: making exploration effortless. We understand that whether you're here for business, visiting family, or embarking on a coastal road trip, you need a vehicle you can trust.
            </p>
            <p className="font-inter text-charcoal/80 text-base leading-relaxed mb-8">
              Our fleet is meticulously maintained, and our team is deeply passionate about providing a seamless, premium service from the moment you land at Tacloban City Airport to the moment you hand back the keys.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-poppins text-3xl md:text-4xl font-bold text-primary-gold">10+</span>
                <span className="font-inter text-xs font-bold uppercase tracking-widest text-charcoal/50">Years Experience</span>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="flex flex-col">
                <span className="font-poppins text-3xl md:text-4xl font-bold text-primary-gold">100%</span>
                <span className="font-inter text-xs font-bold uppercase tracking-widest text-charcoal/50">Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="bg-surface-light py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-poppins text-3xl md:text-4xl font-bold text-charcoal mb-4">Travel Guides & Tips</h2>
              <p className="text-charcoal/80 font-inter leading-relaxed text-sm md:text-base">
                Discover the best routes, hidden gems, and travel advice for your next Leyte adventure.
              </p>
            </div>
            <button className="flex items-center gap-2 font-inter text-sm font-bold text-primary-gold hover:text-gold-hover transition-colors whitespace-nowrap">
              View All Posts <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Post 1 */}
            <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800" alt="Road trip" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-charcoal">Destinations</div>
              </div>
              <div className="p-6">
                <span className="font-inter text-xs text-charcoal/50 mb-2 block">April 12, 2026</span>
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-3 group-hover:text-primary-gold transition-colors">The Ultimate San Juanico Bridge Road Trip Guide</h3>
                <p className="font-inter text-sm text-charcoal/70 mb-4 line-clamp-2">Experience the longest bridge in the Philippines with our comprehensive guide to viewing decks and nearby stops.</p>
                <div className="flex items-center gap-2 font-inter text-sm font-bold text-primary-gold">
                  Read Article <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Post 2 */}
            <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" alt="Beach" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-charcoal">Travel Tips</div>
              </div>
              <div className="p-6">
                <span className="font-inter text-xs text-charcoal/50 mb-2 block">March 28, 2026</span>
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-3 group-hover:text-primary-gold transition-colors">Top 5 Hidden Beaches Near Tacloban City</h3>
                <p className="font-inter text-sm text-charcoal/70 mb-4 line-clamp-2">Escape the crowds and discover pristine white sands just a short drive from the city center.</p>
                <div className="flex items-center gap-2 font-inter text-sm font-bold text-primary-gold">
                  Read Article <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Post 3 */}
            <div className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className="h-48 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&q=80&w=800" alt="Car Maintenance" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-xs font-bold text-charcoal">Safety</div>
              </div>
              <div className="p-6">
                <span className="font-inter text-xs text-charcoal/50 mb-2 block">March 15, 2026</span>
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-3 group-hover:text-primary-gold transition-colors">Our Premium Fleet Safety Standards</h3>
                <p className="font-inter text-sm text-charcoal/70 mb-4 line-clamp-2">Learn about our rigorous 50-point inspection process that guarantees your safety on every journey.</p>
                <div className="flex items-center gap-2 font-inter text-sm font-bold text-primary-gold">
                  Read Article <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-charcoal pt-20 pb-10">
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
                <a href="#" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                  Tacloban Airport Guide
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-sm text-white/50 transition-colors hover:text-primary-gold">
                  Sitemap
                </a>
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
          <p className="font-inter text-sm text-white/30">© 2026 Thrifty Car Rental Tacloban. All rights reserved.</p>
          <div className="flex gap-4">
            <CreditCard className="text-white/30 h-5 w-5" />
            <Banknote className="text-white/30 h-5 w-5" />
            <Wallet className="text-white/30 h-5 w-5" />
          </div>
        </div>
      </footer>
    </div>
  );
}
