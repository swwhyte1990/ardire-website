import React from "react";
import { ArrowRight, ChevronDown, Instagram, Linkedin } from "lucide-react";

export default function HomepageAudienceSplit() {
  return (
    <div className="min-h-[100dvh] bg-[hsl(155_58%_7%)] text-[hsl(43_80%_65%)] font-['Raleway'] antialiased selection:bg-[hsl(43_80%_65%)]/20">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between border-b border-[hsl(155_50%_16%)]/50 bg-[hsl(155_58%_7%)]/80 backdrop-blur-md">
        <div className="font-['Cinzel'] text-2xl tracking-widest">ÁRDÍRE</div>
        
        <div className="hidden lg:flex items-center gap-12 text-xs tracking-widest uppercase">
          <div className="flex items-center gap-8">
            <span className="text-[hsl(43_80%_65%)]/50 mr-2">Travel</span>
            <a href="#" className="hover:text-white transition-colors">Tours</a>
            <a href="#" className="hover:text-white transition-colors">Golf</a>
            <a href="#" className="hover:text-white transition-colors">Chauffeur</a>
            <a href="#" className="hover:text-white transition-colors">Self-Guided</a>
            <a href="#" className="hover:text-white transition-colors">Concierge</a>
            <a href="#" className="hover:text-white transition-colors">Commonwealth '26</a>
          </div>
          
          <div className="w-px h-8 bg-[hsl(155_50%_16%)]"></div>
          
          <div className="flex items-center gap-8">
            <span className="text-[hsl(43_80%_65%)]/50 mr-2">Events</span>
            <a href="#" className="hover:text-white transition-colors">Incentives</a>
            <a href="#" className="hover:text-white transition-colors">Management</a>
            <a href="#" className="hover:text-white transition-colors">Staffing</a>
          </div>
          
          <button className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-12 rounded-none border border-[hsl(43_80%_65%)] hover:bg-[hsl(43_80%_65%)]/90 ml-4 transition-colors">
            Make an Enquiry
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[85vh] min-h-[700px] flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/hero-home.webp" 
            alt="Scottish Castle" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)]/75 via-[hsl(155_58%_7%)]/80 to-[hsl(155_58%_7%)]"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <div className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[hsl(43_80%_65%)] mb-6">
            Árd Íre Hospitality Group · Glasgow
          </div>
          <h1 className="font-['Cinzel'] text-5xl sm:text-6xl md:text-7xl mb-6 leading-tight">
            Privately Guided<br />Scotland
          </h1>
          <p className="text-[hsl(43_80%_65%)]/80 text-lg sm:text-xl max-w-2xl mb-12 font-light leading-relaxed">
            Bespoke private tours, concierge and event hospitality, crafted in Glasgow and delivered across Scotland.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-14 rounded-none border border-[hsl(43_80%_65%)] hover:bg-[hsl(43_80%_65%)]/90 transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
              Plan a Private Tour <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-transparent border border-[hsl(155_50%_16%)] text-[hsl(43_80%_65%)] hover:bg-[hsl(155_55%_10%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-14 rounded-none transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
              Discuss an Event <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* AUDIENCE SPLIT SECTION */}
      <section className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT PANEL: Travel & Tours */}
          <div className="bg-[hsl(155_55%_10%)] border border-[hsl(155_50%_16%)] p-8 md:p-12 flex flex-col h-full relative group">
            <div className="absolute top-8 right-8 font-['Cinzel'] text-[hsl(43_80%_65%)]/40 text-xl">01</div>
            
            <div className="aspect-[4/3] w-full mb-10 overflow-hidden relative border border-[hsl(155_50%_16%)]">
               <img 
                src="/__mockup/images/hero.webp" 
                alt="Travel & Tours" 
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
            
            <h2 className="font-['Cinzel'] text-4xl mb-6">Travel & Tours</h2>
            <p className="text-[hsl(43_80%_65%)]/70 text-sm leading-relaxed mb-12 font-light min-h-[80px]">
              For private individuals, families and groups who want Scotland delivered with discretion, expertise and complete personalisation. Castle estates, championship golf, North Coast 500, Highland weekends — every itinerary written from scratch around you.
            </p>

            <div className="flex-grow flex flex-col gap-4 mb-12">
              {[
                { name: "Luxury Tours", desc: "Bespoke itineraries across the Highlands and Islands." },
                { name: "Golf Tours", desc: "Championship links and hidden gems." },
                { name: "Private Chauffeur", desc: "Discreet, luxury transport across the country." },
                { name: "Self-Guided Tours", desc: "Curated routes, arranged logistics, independent travel." },
                { name: "Concierge", desc: "Restaurant bookings, private dining and experiences." },
                { name: "Commonwealth '26", desc: "Exclusive packages for the Glasgow 2026 Games." }
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[hsl(155_50%_16%)] pb-4 group/item cursor-pointer">
                  <div>
                    <div className="font-['Cinzel'] text-lg mb-1 group-hover/item:text-white transition-colors">{service.name}</div>
                    <div className="text-[hsl(43_80%_65%)]/50 text-xs">{service.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[hsl(43_80%_65%)]/30 group-hover/item:text-[hsl(43_80%_65%)] transition-colors" />
                </div>
              ))}
            </div>

            <button className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-14 rounded-none border border-[hsl(43_80%_65%)] hover:bg-[hsl(43_80%_65%)]/90 transition-all w-full mt-auto">
              Begin a Tour
            </button>
          </div>

          {/* RIGHT PANEL: Events & Hospitality */}
          <div className="bg-[hsl(155_55%_10%)] border border-[hsl(155_50%_16%)] p-8 md:p-12 flex flex-col h-full relative group">
            <div className="absolute top-8 right-8 font-['Cinzel'] text-[hsl(43_80%_65%)]/40 text-xl">02</div>
            
            <div className="aspect-[4/3] w-full mb-10 overflow-hidden relative border border-[hsl(155_50%_16%)] bg-[hsl(155_58%_7%)]">
              {/* Fallback pattern/texture since we don't have a specific event image, using about image or texture */}
               <img 
                src="/__mockup/images/texture.webp" 
                alt="Events & Hospitality" 
                className="w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-60 transition-all duration-700"
              />
            </div>
            
            <h2 className="font-['Cinzel'] text-4xl mb-6">Events & Hospitality</h2>
            <p className="text-[hsl(43_80%_65%)]/70 text-sm leading-relaxed mb-12 font-light min-h-[80px]">
              For businesses, venues and event organisers who need staffing, planning or full event production. From a single uniformed front-of-house team to end-to-end gala production, Árdíre brings hospitality precision to every occasion.
            </p>

            <div className="flex-grow flex flex-col gap-4 mb-12">
              {[
                { name: "Corporate Incentives", desc: "Reward programs and executive retreats." },
                { name: "Event Management", desc: "Full-scale production for galas and brand activations." },
                { name: "Event Staffing", desc: "Elite front-of-house, mixologists and waiting teams." }
              ].map((service, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[hsl(155_50%_16%)] pb-4 group/item cursor-pointer">
                  <div>
                    <div className="font-['Cinzel'] text-lg mb-1 group-hover/item:text-white transition-colors">{service.name}</div>
                    <div className="text-[hsl(43_80%_65%)]/50 text-xs">{service.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[hsl(43_80%_65%)]/30 group-hover/item:text-[hsl(43_80%_65%)] transition-colors" />
                </div>
              ))}
            </div>

            <button className="bg-transparent border border-[hsl(155_50%_16%)] text-[hsl(43_80%_65%)] hover:bg-[hsl(155_55%_10%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-14 rounded-none transition-all w-full mt-auto">
              Speak to the Events Team
            </button>
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 md:px-12 py-24 border-t border-[hsl(155_50%_16%)] bg-[hsl(155_58%_7%)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-4">
            <div className="aspect-[3/4] border border-[hsl(155_50%_16%)] p-2 relative">
              <div className="absolute inset-0 border border-[hsl(43_80%_65%)]/20 translate-x-2 translate-y-2 -z-10"></div>
              <img 
                src="/__mockup/images/about.webp" 
                alt="About Árdíre" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          <div className="md:col-span-8 md:pl-8">
            <div className="text-[10px] tracking-[0.3em] uppercase text-[hsl(43_80%_65%)]/60 mb-6">Our Story</div>
            <h2 className="font-['Cinzel'] text-3xl mb-8">Crafted in Glasgow. Delivered across Scotland.</h2>
            <div className="space-y-6 text-[hsl(43_80%_65%)]/80 font-light text-sm leading-relaxed">
              <p>
                Árdíre Hospitality Group was born from a desire to elevate the standard of private touring and event production in Scotland. Based in Glasgow, we leverage decades of high-end hospitality experience to deliver uncompromised service.
              </p>
              <p>
                Whether orchestrating a multi-week Highland itinerary for a private family, or deploying a fifty-strong front-of-house team for a corporate gala, our approach remains identical: meticulous planning, absolute discretion, and a relentless pursuit of perfection.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px bg-[hsl(43_80%_65%)] w-12"></div>
              <span className="font-['Cinzel'] text-xs tracking-widest">Founded in Glasgow</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST ROW */}
      <section className="py-20 border-t border-b border-[hsl(155_50%_16%)] bg-[hsl(155_55%_10%)]/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[hsl(43_80%_65%)]/40 mb-12">Trusted By</div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20">
            {["ROYAL & ANCIENT", "GLENEAGLES", "BALMORAL ESTATE", "MACALLAN", "SCOTTISH GOLF UNION", "TURNBERRY"].map((partner, i) => (
              <React.Fragment key={i}>
                <div className="font-['Cinzel'] text-sm tracking-widest text-[hsl(43_80%_65%)]/60">
                  {partner}
                </div>
                {i < 5 && (
                  <div className="hidden md:block w-px h-8 bg-[hsl(155_50%_16%)]"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[hsl(155_58%_7%)] py-24 px-6 md:px-12 border-t border-[hsl(155_50%_16%)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          <div className="md:col-span-4 flex flex-col">
            <div className="font-['Cinzel'] text-3xl tracking-widest mb-6">ÁRDÍRE</div>
            <p className="text-[hsl(43_80%_65%)]/60 text-sm font-light max-w-xs mb-8">
              Bespoke private tours, concierge and event hospitality.
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[hsl(43_80%_65%)]/40 mb-6">Travel</h3>
              <ul className="space-y-4 text-sm font-light text-[hsl(43_80%_65%)]/80">
                <li><a href="#" className="hover:text-white transition-colors">Luxury Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Golf Tours</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Private Chauffeur</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Self-Guided</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Concierge</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] tracking-[0.2em] uppercase text-[hsl(43_80%_65%)]/40 mb-6">Events</h3>
              <ul className="space-y-4 text-sm font-light text-[hsl(43_80%_65%)]/80">
                <li><a href="#" className="hover:text-white transition-colors">Corporate Incentives</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Event Staffing</a></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-3">
             <h3 className="text-[10px] tracking-[0.2em] uppercase text-[hsl(43_80%_65%)]/40 mb-6">Contact</h3>
             <address className="not-italic text-sm font-light text-[hsl(43_80%_65%)]/80 space-y-2 mb-8">
               <p>Glasgow, Scotland</p>
               <p><a href="tel:+441410000000" className="hover:text-white transition-colors">+44 (0)141 000 0000</a></p>
               <p><a href="mailto:enquiries@ardire.co.uk" className="hover:text-white transition-colors">enquiries@ardire.co.uk</a></p>
             </address>
             <div className="flex gap-4">
               <a href="#" className="w-10 h-10 border border-[hsl(155_50%_16%)] flex items-center justify-center hover:bg-[hsl(155_55%_10%)] transition-colors">
                 <Instagram className="w-4 h-4" />
               </a>
               <a href="#" className="w-10 h-10 border border-[hsl(155_50%_16%)] flex items-center justify-center hover:bg-[hsl(155_55%_10%)] transition-colors">
                 <Linkedin className="w-4 h-4" />
               </a>
             </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-[hsl(155_50%_16%)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light text-[hsl(43_80%_65%)]/40">
          <p>© {new Date().getFullYear()} Árd Íre Hospitality Group. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[hsl(43_80%_65%)]/80 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[hsl(43_80%_65%)]/80 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
