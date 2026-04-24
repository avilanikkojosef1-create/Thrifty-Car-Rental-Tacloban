import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="font-inter bg-surface-light text-charcoal min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pb-24 pt-12">
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2 relative lg:h-[500px]">
              <div className="absolute -inset-4 bg-primary-gold/10 rounded-xl transform rotate-3"></div>
              <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Driving in Leyte" className="relative rounded-xl shadow-lg w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="font-poppins text-3xl md:text-5xl font-bold text-charcoal mb-6">Your Journey, <span className="text-primary-gold">Our Priority</span></h1>
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
      </main>

      <Footer />
    </div>
  );
}
