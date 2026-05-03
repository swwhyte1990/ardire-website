import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const services = [
  { title: "Luxury Tours", desc: "Scotland. Expertly Guided. Private, fully guided journeys across Highlands, Speyside, Hebrides.", img: "/__mockup/images/cinematicatelier-glencoe.png" },
  { title: "Golf Tours", desc: "The Home of Golf. Played Properly. Access to St Andrews, Carnoustie, Turnberry, Royal Troon.", img: "/__mockup/images/cinematicatelier-rover.png" },
  { title: "Private Chauffeur", desc: "Driven to a Different Standard. Discreet executive transport across Scotland.", img: "/__mockup/images/cinematicatelier-whisky.png" },
  { title: "Corporate Incentives", desc: "Performance. Rewarded. Unforgettably. Highland challenges, gala dinners, exclusive venues.", img: "/__mockup/images/cinematicatelier-hero.png" },
  { title: "Self-Guided Tours", desc: "Your Pace. Our Expertise. Curated itineraries with 24/7 support on standby.", img: "/__mockup/images/cinematicatelier-glencoe.png" },
  { title: "Event Staffing", desc: "Every Detail. Impeccably Handled. Trained, uniformed front-of-house and hospitality teams.", img: "/__mockup/images/cinematicatelier-whisky.png" },
  { title: "Event Management", desc: "Conceived, Managed, Delivered. Full end-to-end production of private and corporate events.", img: "/__mockup/images/cinematicatelier-rover.png" },
  { title: "Concierge", desc: "Nothing Is Too Much. 24/7 lifestyle management, reservations, private hire.", img: "/__mockup/images/cinematicatelier-hero.png" },
  { title: "Commonwealth '26", desc: "Glasgow 2026. Experience It Properly. VIP hospitality for the Commonwealth Games.", img: "/__mockup/images/cinematicatelier-glencoe.png" },
];

export default function CinematicAtelier() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="bg-[#0a1c12] min-h-screen text-white/90" style={{ fontFamily: '"Inter", sans-serif' }}>
      <style>{`
        .font-serif { font-family: "Cormorant Garamond", serif; }
        .text-gold { color: #c5a366; }
        .border-gold { border-color: #c5a366; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-8 mix-blend-difference">
        <div className="text-sm tracking-[0.2em] font-light uppercase">ÁRDÍRE</div>
        <div className="text-xs tracking-widest font-light uppercase text-white/60">Menu</div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24 px-12">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/cinematicatelier-hero.png" 
            alt="Scottish Highlands" 
            className="w-full h-[120%] object-cover object-center opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c12] via-transparent to-[#0a1c12]/50" />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tight mb-8"
          >
            Luxury Tours <br/><span className="italic text-white/70">of</span> Scotland
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="flex items-center gap-6"
          >
            <div className="w-12 h-[1px] bg-[#c5a366]" />
            <p className="text-sm tracking-widest font-light uppercase max-w-md leading-relaxed text-white/80">
              Bespoke concierge and event planning services to elevate your holiday, corporate incentive, or major event.
            </p>
          </motion.div>
        </div>
        
        <motion.div style={{ opacity }} className="absolute bottom-12 right-12 text-xs tracking-widest uppercase text-white/50 flex flex-col items-center gap-4">
          <span className="writing-vertical-rl">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20" />
        </motion.div>
      </section>

      {/* About / Interstitial */}
      <section className="py-48 px-12 flex justify-center items-center bg-[#0a1c12] relative z-20">
        <div className="max-w-3xl text-center">
          <p className="font-serif text-3xl md:text-5xl leading-tight text-white/90">
            Árdíre is a Scottish hospitality group offering bespoke private tours, concierge, and event management across Scotland. <span className="text-gold italic">Headquartered in Glasgow.</span>
          </p>
        </div>
      </section>

      {/* Image Grid Section */}
      <section className="py-24 px-4 bg-[#0a1c12] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-[1400px] mx-auto">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden bg-[#08150d] cursor-pointer"
            >
              <img 
                src={service.img} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c12]/90 via-transparent to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="text-xs font-light tracking-widest text-gold opacity-60 group-hover:opacity-100 transition-opacity">
                  0{idx + 1}
                </div>
                
                <div>
                  <h3 className="font-serif text-3xl mb-4 group-hover:text-gold transition-colors duration-500">{service.title}</h3>
                  <div className="w-0 h-[1px] bg-gold mb-4 group-hover:w-full transition-all duration-700 ease-out" />
                  <p className="text-sm font-light tracking-wide text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {service.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Image / Testimonial */}
      <section className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/cinematicatelier-whisky.png" 
            alt="Whisky" 
            className="w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-[#0a1c12]/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl text-center px-12">
          <div className="text-gold text-4xl font-serif mb-8">"</div>
          <p className="font-serif text-4xl md:text-5xl leading-tight mb-8 text-white/90">
            An unparalleled level of discretion and aesthetic refinement. They truly understand what constitutes a flawless experience.
          </p>
          <p className="text-xs tracking-[0.2em] font-light uppercase text-white/50">
            A. Mackintosh, Private Client
          </p>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="py-32 px-12 bg-[#050f09] relative z-20 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif text-5xl md:text-7xl mb-12">Private Enquiries</h2>
        
        <div className="flex gap-12 mb-24 text-sm tracking-widest font-light uppercase text-white/60">
          <a href="#" className="hover:text-gold transition-colors">Speak With Us</a>
          <a href="#" className="hover:text-gold transition-colors">Glasgow, Scotland</a>
          <a href="#" className="hover:text-gold transition-colors">+44 (0)141 000 0000</a>
        </div>
        
        <div className="flex flex-col items-center gap-6 text-xs tracking-widest font-light uppercase text-white/40">
          <div className="text-2xl font-serif text-white/80 tracking-normal mb-2">ÁRDÍRE</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="mt-8 opacity-50">&copy; {new Date().getFullYear()} Árd Íre Hospitality Group</p>
        </div>
      </footer>
    </div>
  );
}
