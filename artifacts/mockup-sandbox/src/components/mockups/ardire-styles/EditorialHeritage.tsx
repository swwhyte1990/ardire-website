import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const theme = {
  green: '#0a1c12',
  gold: '#c5a366',
  cream: '#f2eee9',
  darkCream: '#e0d8cd',
};

const services = [
  { num: '01', title: 'Luxury Tours', desc: 'Scotland. Expertly Guided. Private, fully guided journeys across Highlands, Speyside, Hebrides.' },
  { num: '02', title: 'Golf Tours', desc: 'The Home of Golf. Played Properly. Access to St Andrews, Carnoustie, Turnberry, Royal Troon.' },
  { num: '03', title: 'Private Chauffeur', desc: 'Driven to a Different Standard. Discreet executive transport across Scotland.' },
  { num: '04', title: 'Corporate Incentives', desc: 'Performance. Rewarded. Unforgettably. Highland challenges, gala dinners, exclusive venues.' },
  { num: '05', title: 'Self-Guided Tours', desc: 'Your Pace. Our Expertise. Curated itineraries with 24/7 support on standby.' },
  { num: '06', title: 'Event Staffing', desc: 'Every Detail. Impeccably Handled. Trained, uniformed front-of-house and hospitality teams.' },
  { num: '07', title: 'Event Management', desc: 'Conceived, Managed, Delivered. Full end-to-end production of private and corporate events.' },
  { num: '08', title: 'Concierge', desc: 'Nothing Is Too Much. 24/7 lifestyle management, reservations, private hire.' },
  { num: '09', title: 'Commonwealth \'26', desc: 'Glasgow 2026. Experience It Properly. VIP hospitality for the Commonwealth Games.' }
];

export default function EditorialHeritage() {
  return (
    <div 
      className="min-h-screen selection:bg-[#c5a366] selection:text-[#0a1c12] overflow-x-hidden"
      style={{ backgroundColor: theme.green, color: theme.cream, fontFamily: '"Playfair Display", serif' }}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference" style={{ fontFamily: '"Inter", sans-serif' }}>
        <div className="text-sm tracking-[0.2em] uppercase font-light">Árdíre</div>
        <div className="text-xs tracking-widest uppercase flex gap-8">
          <a href="#about" className="hover:text-[#c5a366] transition-colors">The Story</a>
          <a href="#services" className="hover:text-[#c5a366] transition-colors">Index</a>
          <a href="#enquiries" className="hover:text-[#c5a366] transition-colors">Enquiries</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-[95vh] w-full flex flex-col justify-end p-8 md:p-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/editorialheritage-hero.png" 
            alt="Scottish Castle at Golden Hour" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c12] via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[1px] w-12 bg-[#c5a366]"></span>
            <span className="text-[#c5a366] uppercase tracking-[0.3em] text-xs font-sans">Issue 01 &mdash; The Scotland Edition</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl tracking-tight leading-[0.9] mb-8"
          >
            Luxury Tours<br/>
            <span className="italic font-light text-[#c5a366]">of</span> Scotland.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="max-w-xl text-lg md:text-xl font-light leading-relaxed text-[#e0d8cd]"
          >
            Bespoke concierge and event planning services to elevate your holiday, corporate incentive, or major event — blending your inspiration with our expertise.
          </motion.p>
        </div>
      </section>

      {/* About / Prologue */}
      <section id="about" className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-4 border-t border-[#c5a366] pt-6">
            <h2 className="text-[#c5a366] font-sans text-xs tracking-[0.2em] uppercase mb-4">Prologue</h2>
            <div className="text-4xl italic text-[#e0d8cd]">
              "Headquartered in Glasgow, delivering the extraordinary across the Highlands and beyond."
            </div>
          </div>
          <div className="md:col-span-8 md:pl-16 md:border-l border-white/10">
            <p className="text-2xl md:text-3xl leading-snug font-light text-[#f2eee9] columns-1 md:columns-2 gap-12">
              <span className="float-left text-7xl md:text-8xl leading-none pr-4 pt-2 text-[#c5a366]">Á</span>
              rdíre is a Scottish hospitality group offering bespoke private tours, concierge, and event management across Scotland. We do not deal in the mass-produced. Every itinerary, every event, every transfer is curated with exacting precision to reflect the quiet luxury of our homeland.
            </p>
          </div>
        </div>
      </section>

      {/* Services Index */}
      <section id="services" className="py-24 bg-[#f2eee9] text-[#0a1c12]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex justify-between items-end border-b-2 border-[#0a1c12] pb-6 mb-16">
            <h2 className="text-4xl md:text-6xl tracking-tight">The Index</h2>
            <span className="font-sans text-xs tracking-widest uppercase">Select Services</span>
          </div>

          <div className="grid grid-cols-1 divide-y divide-[#0a1c12]/20 border-b border-[#0a1c12]/20">
            {services.map((service, idx) => (
              <div key={idx} className="py-8 group flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-12 hover:bg-black/5 transition-colors px-4 -mx-4 cursor-pointer">
                <div className="flex items-baseline gap-8 md:w-1/3 shrink-0">
                  <span className="text-[#c5a366] font-sans text-sm tracking-widest">{service.num}</span>
                  <h3 className="text-2xl md:text-3xl font-medium">{service.title}</h3>
                </div>
                <div className="md:w-2/3 flex items-center gap-6">
                  <div className="flex-grow border-b border-dotted border-[#0a1c12]/30 hidden md:block"></div>
                  <p className="text-lg md:text-xl font-light italic shrink-0 max-w-xl text-[#0a1c12]/80">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature / Image Break */}
      <section className="py-32 px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[70vh] w-full">
            <img 
              src="/__mockup/images/editorialheritage-whisky.png" 
              alt="Whisky detail"
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute -bottom-6 -right-6 bg-[#c5a366] text-[#0a1c12] p-8 max-w-xs">
              <p className="font-sans text-xs tracking-widest uppercase mb-2">Experiences</p>
              <p className="text-xl italic">Castle hotels, whisky tastings, helicopter charter, private estates, North Coast 500, Loch Lomond.</p>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <div className="font-sans text-[#c5a366] text-xs tracking-widest uppercase border-t border-[#c5a366] pt-4 inline-block">The Details</div>
            <h2 className="text-5xl md:text-6xl leading-tight">Quiet Exclusivity.</h2>
            <p className="text-xl text-[#e0d8cd] font-light leading-relaxed">
              We provide access to Scotland's most guarded secrets. From a linen-set table in a private stately room to the dawn mist rising off the Old Course. The luxury is not just in the destination, but in the seamless, imperceptible orchestration of the journey.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-[#c5a366] text-[#0a1c12] px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-6xl mb-8 font-serif leading-none opacity-50">"</div>
          <h3 className="text-3xl md:text-5xl font-light italic leading-snug mb-12">
            The attention to detail was startling. They didn't just plan a tour; they choreographed an experience that felt entirely our own. Scotland at its most profound.
          </h3>
          <div className="font-sans text-xs tracking-[0.2em] uppercase font-semibold">
            — A. Mackintosh, Private Client
          </div>
        </div>
      </section>

      {/* Contact / Footer Spread */}
      <footer id="enquiries" className="pt-32 pb-16 px-8 md:px-16 border-t border-white/10 mt-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mb-32">
          <div>
            <h2 className="text-6xl md:text-7xl mb-8">Speak with us.</h2>
            <p className="text-xl text-[#e0d8cd] font-light mb-12 max-w-md">
              For private enquiries, corporate incentives, or bespoke itinerary planning.
            </p>
            <div className="space-y-6 font-sans text-sm tracking-widest text-[#c5a366]">
              <p>GLASGOW, SCOTLAND</p>
              <p>+44 (0)141 555 0199</p>
              <p className="underline underline-offset-4 cursor-pointer">ENQUIRIES@ARDIRE.CO.UK</p>
            </div>
          </div>
          
          <div className="bg-black/20 p-8 md:p-12 border border-white/5">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="border-b border-white/20 pb-2">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-white/30 text-white font-serif"
                />
              </div>
              <div className="border-b border-white/20 pb-2">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-none outline-none text-xl font-light placeholder:text-white/30 text-white font-serif"
                />
              </div>
              <div className="border-b border-white/20 pb-2 h-32">
                <textarea 
                  placeholder="How may we assist you?" 
                  className="w-full h-full bg-transparent border-none outline-none text-xl font-light placeholder:text-white/30 text-white font-serif resize-none"
                />
              </div>
              <button className="flex items-center gap-4 text-[#c5a366] font-sans text-xs tracking-[0.2em] uppercase group">
                Submit Enquiry
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-sans tracking-widest text-white/50">
          <div>&copy; {new Date().getFullYear()} ÁRD ÍRE HOSPITALITY GROUP</div>
          <div className="text-2xl font-serif text-[#c5a366] my-4 md:my-0 tracking-widest">ÁRDÍRE</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#c5a366] transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-[#c5a366] transition-colors">LINKEDIN</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
