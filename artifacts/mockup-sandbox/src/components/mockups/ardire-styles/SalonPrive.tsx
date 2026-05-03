import React from 'react';
import { motion } from 'framer-motion';
import { Feather, MapPin, ChevronRight, Play } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const services = [
  { id: 'I', name: 'Luxury Tours', desc: 'Scotland. Expertly Guided. Private, fully guided journeys across Highlands, Speyside, Hebrides.' },
  { id: 'II', name: 'Golf Tours', desc: 'The Home of Golf. Played Properly. Access to St Andrews, Carnoustie, Turnberry, Royal Troon.' },
  { id: 'III', name: 'Private Chauffeur', desc: 'Driven to a Different Standard. Discreet executive transport across Scotland.' },
  { id: 'IV', name: 'Corporate Incentives', desc: 'Performance. Rewarded. Unforgettably. Highland challenges, gala dinners, exclusive venues.' },
  { id: 'V', name: 'Self-Guided Tours', desc: 'Your Pace. Our Expertise. Curated itineraries with 24/7 support on standby.' },
  { id: 'VI', name: 'Event Staffing', desc: 'Every Detail. Impeccably Handled. Trained, uniformed front-of-house and hospitality teams.' },
  { id: 'VII', name: 'Event Management', desc: 'Conceived, Managed, Delivered. Full end-to-end production of private and corporate events.' },
  { id: 'VIII', name: 'Concierge', desc: 'Nothing Is Too Much. 24/7 lifestyle management, reservations, private hire.' },
  { id: 'IX', name: 'Commonwealth \'26', desc: 'Glasgow 2026. Experience It Properly. VIP hospitality for the Commonwealth Games.' },
];

export default function SalonPrive() {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#0a1c12] font-['Cormorant_Garamond',serif] selection:bg-[#c5a366] selection:text-[#0a1c12]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 mix-blend-difference bg-[#f6f1e7]/90 backdrop-blur-sm border-b border-[#c5a366]/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-sm font-['Inter',sans-serif] tracking-[0.2em] uppercase text-[#0a1c12]">Glasgow, Scotland</div>
          <div className="text-2xl tracking-widest text-[#0a1c12] font-semibold">ÁRDÍRE</div>
          <div className="text-sm font-['Inter',sans-serif] tracking-[0.2em] uppercase text-[#0a1c12]">Private Enquiries</div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 min-h-screen flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.p variants={fadeUp} className="font-['Inter',sans-serif] text-sm tracking-[0.3em] text-[#c5a366] uppercase mb-8">
              Árd Íre Hospitality Group
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl tracking-tight leading-none mb-10">
              Luxury Tours <br />
              <span className="italic font-light">of Scotland</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="w-px h-24 bg-[#c5a366] mx-auto mb-10" />
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-[#0a1c12]/80 max-w-2xl mx-auto leading-relaxed">
              Bespoke concierge and event planning services to elevate your holiday, corporate incentive, or major event — blending your inspiration with our expertise.
            </motion.p>
          </motion.div>
        </div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[80vh] opacity-10 pointer-events-none mix-blend-multiply">
            <img src="/__mockup/images/salonprive-hero.png" alt="Scottish Castle" className="w-full h-full object-cover" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px w-full bg-[#c5a366]/30" />
      </div>

      {/* About */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Feather className="w-6 h-6 text-[#c5a366] mx-auto mb-8" />
          <p className="text-3xl md:text-4xl leading-relaxed">
            Árdíre is a Scottish hospitality group offering bespoke private tours, concierge, and event management across Scotland. Headquartered in Glasgow.
          </p>
        </div>
      </section>

      {/* Services Menu */}
      <section className="py-32 px-6 bg-[#0a1c12] text-[#f6f1e7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <p className="font-['Inter',sans-serif] text-sm tracking-[0.3em] text-[#c5a366] uppercase mb-4">Our Services</p>
            <h2 className="text-5xl tracking-wide">An Invitation to Experience</h2>
            <div className="w-12 h-px bg-[#c5a366] mx-auto mt-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {services.map((service) => (
              <div key={service.id} className="group relative border-b border-[#c5a366]/20 pb-6 hover:border-[#c5a366]/60 transition-colors">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-2xl tracking-wide flex items-center gap-4">
                    <span className="font-['Inter',sans-serif] text-xs tracking-widest text-[#c5a366] w-6">{service.id}.</span>
                    {service.name}
                  </h3>
                </div>
                <p className="text-[#f6f1e7]/60 text-lg pl-10 pr-4 leading-relaxed font-light italic">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights & Image */}
      <section className="py-32 px-6 border-b border-[#c5a366]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden">
            <div className="absolute inset-0 border border-[#c5a366] m-4 z-10 pointer-events-none" />
            <img src="/__mockup/images/salonprive-car.png" alt="Vintage Bentley in Highlands" className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-1000" />
          </div>
          <div className="px-8">
            <h2 className="text-4xl mb-8 tracking-wide">Curated Experiences</h2>
            <p className="text-xl text-[#0a1c12]/80 leading-loose mb-12">
              From historic castle hotels to exclusive whisky tastings, helicopter charters over the Isle of Skye, private estates, the North Coast 500, and the serene waters of Loch Lomond.
            </p>
            <div className="font-['Inter',sans-serif] text-sm tracking-[0.2em] uppercase text-[#0a1c12] border-b border-[#c5a366] inline-block pb-1 cursor-pointer hover:text-[#c5a366] transition-colors">
              Explore Itineraries
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl text-[#c5a366] font-serif mb-8 leading-none">"</div>
          <h4 className="text-3xl md:text-4xl leading-relaxed mb-12 italic font-light">
            An impeccably curated journey. Every detail was handled with a quiet, confident grace that allowed us to simply exist in the beauty of the Highlands.
          </h4>
          <p className="font-['Inter',sans-serif] text-sm tracking-[0.2em] uppercase text-[#0a1c12]">A. Mackintosh, Private Client</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 bg-[#0a1c12] text-[#f6f1e7] border-t-4 border-[#c5a366]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div>
            <h2 className="text-3xl tracking-widest mb-6">ÁRDÍRE</h2>
            <p className="font-['Inter',sans-serif] text-xs tracking-widest text-[#f6f1e7]/50 uppercase leading-loose">
              Árd Íre Hospitality Group<br />
              Glasgow, Scotland
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-4 font-['Inter',sans-serif] text-sm tracking-[0.1em] text-[#f6f1e7]/70">
            <a href="#" className="hover:text-[#c5a366] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#c5a366] transition-colors">LinkedIn</a>
          </div>
          <div className="md:text-right">
            <p className="font-['Inter',sans-serif] text-sm tracking-[0.1em] text-[#c5a366] uppercase mb-4">Speak with us</p>
            <a href="mailto:enquiries@ardire.co.uk" className="text-xl border-b border-[#c5a366]/30 pb-1 hover:border-[#c5a366] transition-colors">enquiries@ardire.co.uk</a>
            <p className="mt-4 text-[#f6f1e7]/70 font-['Inter',sans-serif] text-sm">+44 (0)141 000 0000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
