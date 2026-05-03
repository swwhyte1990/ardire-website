import React from "react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, ArrowRight, Menu, Phone, Mail } from "lucide-react";

export default function LuxuryToursAfter() {
  return (
    <div className="min-h-screen bg-[hsl(155_58%_7%)] text-[hsl(43_80%_65%)] font-['Raleway']">
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(155_58%_7%)]/95 backdrop-blur-md border-b border-[hsl(155_50%_16%)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/logo.webp" alt="Árdíre" className="h-10 w-auto" />
              <span className="font-['Cinzel'] text-xl tracking-widest hidden sm:block">Árdíre</span>
            </Link>
            <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest">
              <Link href="#" className="hover:text-[hsl(43_80%_65%)]/70 transition-colors">Travel</Link>
              <Link href="#" className="hover:text-[hsl(43_80%_65%)]/70 transition-colors">Events</Link>
              <Link href="#" className="hover:text-[hsl(43_80%_65%)]/70 transition-colors">Journal</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button className="hidden md:flex bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-12 rounded-none border border-[hsl(43_80%_65%)] hover:bg-[hsl(43_80%_65%)]/90">
              Make an Enquiry
            </Button>
            <button className="md:hidden p-2">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative pt-20 h-[600px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero.webp" alt="Luxury Tours" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)]/75 via-[hsl(155_58%_7%)]/80 to-[hsl(155_58%_7%)]"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70 mb-6">Travel & Tours / Luxury Tours</span>
          <h1 className="font-['Cinzel'] text-5xl md:text-7xl mb-6 leading-tight">Luxury Tours<br/>of Scotland</h1>
          <p className="text-xl md:text-2xl font-['Cinzel'] mb-4 text-[hsl(43_80%_65%)]/90">Scotland. Expertly Guided.</p>
          <p className="text-sm tracking-wide text-[hsl(43_80%_65%)]/70 mb-10">From £950 per guest per day · all-inclusive · bespoke itineraries from 2 to 14 nights.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-14 rounded-none border border-[hsl(43_80%_65%)] hover:bg-[hsl(43_80%_65%)]/90">
              Plan Your Tour
            </Button>
            <Button className="bg-transparent border border-[hsl(155_50%_16%)] text-[hsl(43_80%_65%)] hover:bg-[hsl(155_55%_10%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-14 rounded-none">
              Download Sample Itineraries (PDF)
            </Button>
          </div>
        </div>
      </section>

      {/* 3. PRICING BAND */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-[hsl(155_55%_10%)] border border-[hsl(155_50%_16%)] p-8 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[hsl(155_50%_16%)]">
            <div className="flex flex-col gap-2 pt-4 md:pt-0 md:px-6 first:px-0">
              <h3 className="font-['Cinzel'] text-xl">Day Touring</h3>
              <p className="text-sm text-[hsl(43_80%_65%)]/70">From £950 pp / day · guide, vehicle, lunch</p>
            </div>
            <div className="flex flex-col gap-2 pt-4 md:pt-0 md:px-6">
              <h3 className="font-['Cinzel'] text-xl">Multi-Night Tour</h3>
              <p className="text-sm text-[hsl(43_80%_65%)]/70">From £1,650 pp / day · all-inclusive, accom, dining</p>
            </div>
            <div className="flex flex-col gap-2 pt-4 md:pt-0 md:px-6">
              <h3 className="font-['Cinzel'] text-xl">Estate & Helicopter</h3>
              <p className="text-sm text-[hsl(43_80%_65%)]/70">From £3,500 pp / day · privately-owned estates, charter</p>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-[hsl(43_80%_65%)]/50 mt-4">(All prices indicative — confirm with you before publishing.) Indicative pricing. Final fees are shaped around party size, season, and itinerary. Every tour is quoted bespoke.</p>
      </section>

      {/* 4. INTRO COPY */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="prose prose-invert prose-p:text-[hsl(43_80%_65%)]/80 prose-p:font-light max-w-[60ch]">
            <p className="text-lg leading-relaxed mb-6">
              A country is best understood through the people who know it intimately. Our private tours of Scotland are designed for those who seek to experience the landscape, the history, and the culture without the friction of modern travel.
            </p>
            <p className="text-lg leading-relaxed">
              We provide expert guiding, seamless logistics, and access to places often closed to the public. From the moment you arrive to your departure, every detail is considered, allowing you to focus entirely on the journey.
            </p>
          </div>
          <div>
            <h3 className="font-['Cinzel'] text-2xl mb-8">Tour Highlights</h3>
            <ul className="space-y-4">
              {[
                "Unrivalled access to private estates and distilleries.",
                "Hand-picked, world-class accommodations.",
                "Expert storytelling from our seasoned guides.",
                "Immaculate luxury vehicles, from Range Rovers to helicopters.",
                "A dedicated concierge available 24/7 throughout your stay."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(43_80%_65%)] mt-2 shrink-0"></div>
                  <span className="text-[hsl(43_80%_65%)]/80 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. SAMPLE ITINERARIES */}
      <section className="bg-[hsl(155_55%_10%)] py-24 border-y border-[hsl(155_50%_16%)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Cinzel'] text-4xl mb-16 text-center">Itineraries for Inspiration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-[hsl(155_58%_7%)] border border-[hsl(155_50%_16%)] flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img src="/images/hero-home.webp" alt="The Highland Weekend" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="font-['Cinzel'] text-2xl mb-2">The Highland Weekend</h3>
                <p className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70 mb-6">3 days · 2 nights · From £4,200 pp</p>
                <ul className="space-y-3 text-sm text-[hsl(43_80%_65%)]/80 mb-8 grow">
                  <li><strong>Day 1:</strong> Arrival in Glasgow, scenic transfer to Loch Lomond, dinner at a private estate.</li>
                  <li><strong>Day 2:</strong> Glencoe and Rannoch Moor by Range Rover, picnic lunch on the moor, evening whisky tasting.</li>
                  <li><strong>Day 3:</strong> Stirling Castle, return transfer.</li>
                </ul>
                <Link href="#" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white transition-colors">
                  Plan a version of this <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[hsl(155_58%_7%)] border border-[hsl(155_50%_16%)] flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img src="/images/about.webp" alt="The Old Course Pilgrimage" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="font-['Cinzel'] text-2xl mb-2">The Old Course Pilgrimage</h3>
                <p className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70 mb-6">4 days · 3 nights · From £8,400 pp</p>
                <ul className="space-y-3 text-sm text-[hsl(43_80%_65%)]/80 mb-8 grow">
                  <li><strong>Day 1:</strong> Edinburgh arrival, transfer to St Andrews, welcome dinner at the Old Course Hotel.</li>
                  <li><strong>Day 2:</strong> Round at the Old Course (advance ballot), caddie-led tour of the town.</li>
                  <li><strong>Day 3:</strong> Round at Kingsbarns, afternoon at the British Golf Museum, dinner.</li>
                  <li><strong>Day 4:</strong> Round at Carnoustie, return transfer.</li>
                </ul>
                <Link href="#" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white transition-colors">
                  Plan a version of this <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[hsl(155_58%_7%)] border border-[hsl(155_50%_16%)] flex flex-col group">
              <div className="h-64 overflow-hidden relative">
                <img src="/images/texture.webp" alt="The North Coast 500 in Style" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8 flex flex-col grow">
                <h3 className="font-['Cinzel'] text-2xl mb-2">The North Coast 500 in Style</h3>
                <p className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70 mb-6">7 days · 6 nights · From £14,500 pp</p>
                <ul className="space-y-3 text-sm text-[hsl(43_80%_65%)]/80 mb-8 grow">
                  <li><strong>Highlights:</strong> Inverness, Dornoch, John o'Groats, Durness, Ullapool, Applecross, Skye.</li>
                  <li className="italic">"Castle hotels, helicopter side-trips, and the world's most scenic drive — at our pace."</li>
                </ul>
                <Link href="#" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white transition-colors">
                  Plan a version of this <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WHAT'S INCLUDED / NOT INCLUDED */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-[hsl(155_55%_10%)] border border-[hsl(155_50%_16%)] p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div>
              <h3 className="font-['Cinzel'] text-2xl mb-6">What's Included</h3>
              <ul className="space-y-3 text-[hsl(43_80%_65%)]/80">
                <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 mt-1 shrink-0 text-[hsl(43_80%_65%)]" /> Private guide and chauffeur</li>
                <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 mt-1 shrink-0 text-[hsl(43_80%_65%)]" /> Luxury vehicle (Range Rover, Bentley or Mercedes V-Class)</li>
                <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 mt-1 shrink-0 text-[hsl(43_80%_65%)]" /> All accommodation at hand-selected hotels and estates</li>
                <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 mt-1 shrink-0 text-[hsl(43_80%_65%)]" /> Daily fine dining</li>
                <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 mt-1 shrink-0 text-[hsl(43_80%_65%)]" /> Distillery and estate access</li>
                <li className="flex items-start gap-3"><ChevronRight className="w-4 h-4 mt-1 shrink-0 text-[hsl(43_80%_65%)]" /> Round-the-clock concierge</li>
              </ul>
            </div>
            <div>
              <h3 className="font-['Cinzel'] text-2xl mb-6">Not Included</h3>
              <ul className="space-y-3 text-[hsl(43_80%_65%)]/70">
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(43_80%_65%)]/50 mt-2 shrink-0"></span> International flights</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(43_80%_65%)]/50 mt-2 shrink-0"></span> Personal shopping</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(43_80%_65%)]/50 mt-2 shrink-0"></span> Spa treatments</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(43_80%_65%)]/50 mt-2 shrink-0"></span> Optional helicopter or yacht charters (quoted separately)</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(43_80%_65%)]/50 mt-2 shrink-0"></span> Gratuities (at your discretion)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HOW WE WORK */}
      <section className="py-24 border-t border-[hsl(155_50%_16%)]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['Cinzel'] text-4xl mb-16 text-center">How We Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { num: "01", title: "Enquire", desc: "Tell us a little about who you are and what you'd love." },
              { num: "02", title: "Design", desc: "We respond within 24 hours with an outline itinerary and pricing." },
              { num: "03", title: "Refine", desc: "Together we shape every day, every meal, every detail." },
              { num: "04", title: "Travel", desc: "Arrive in Scotland; we handle everything else." }
            ].map((step, i) => (
              <div key={i} className="flex flex-col gap-4 relative">
                <span className="font-['Cinzel'] text-5xl text-[hsl(43_80%_65%)]/20">{step.num}</span>
                <h3 className="font-['Cinzel'] text-xl">{step.title}</h3>
                <p className="text-[hsl(43_80%_65%)]/70 text-sm leading-relaxed">{step.desc}</p>
                {i < 3 && <div className="hidden lg:block absolute top-12 right-0 w-full h-[1px] bg-[hsl(155_50%_16%)] translate-x-1/2"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GALLERY */}
      <section className="py-12 bg-[hsl(155_55%_10%)] border-y border-[hsl(155_50%_16%)] overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6">
          <h2 className="font-['Cinzel'] text-4xl mb-12 text-center">Glimpses</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="/images/hero-home.webp" alt="Gallery 1" className="w-full h-64 object-cover object-center border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
            <img src="/images/about.webp" alt="Gallery 2" className="w-full h-64 object-cover object-top border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
            <img src="/images/texture.webp" alt="Gallery 3" className="w-full h-64 object-cover object-bottom border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
            <img src="/images/hero.webp" alt="Gallery 4" className="w-full h-64 object-cover object-center border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
            
            <img src="/images/about.webp" alt="Gallery 5" className="w-full h-64 object-cover object-bottom border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
            <img src="/images/texture.webp" alt="Gallery 6" className="w-full h-64 object-cover object-top border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
            <img src="/images/hero-home.webp" alt="Gallery 7" className="w-full h-64 object-cover object-left border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
            <img src="/images/hero.webp" alt="Gallery 8" className="w-full h-64 object-cover object-right border border-transparent hover:border-[hsl(43_80%_65%)] transition-colors duration-300" />
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="font-['Cinzel'] text-4xl mb-12 text-center">Frequently Asked</h2>
        <Accordion type="single" collapsible className="w-full border-t border-[hsl(155_50%_16%)]">
          {[
            { q: "How far in advance should we book?", a: "We typically recommend booking 3–6 months in advance, especially for the peak summer season and for accessing highly sought-after properties or golf tee times." },
            { q: "What is your minimum tour length?", a: "We accept single-day touring in the local area as well as extensive multi-night journeys across the Highlands and Islands." },
            { q: "Do you cater for dietary or accessibility requirements?", a: "Yes. Every itinerary is personalised, and we work closely with our partners to ensure all dietary, medical, or accessibility needs are seamlessly accommodated." },
            { q: "Can you arrange international travel and flights?", a: "While we can coordinate timing and logistics with your arrival, international flights themselves are not included or booked by Árdíre." },
            { q: "How are tours priced?", a: "We quote bespoke. The bands provided above are indicative and help establish a baseline, but the final cost depends heavily on accommodation choices, party size, and specific experiences." },
            { q: "What if the weather turns?", a: "Every itinerary includes a foul-weather alternate. The beauty of a private, flexible tour is that we can adjust the day's plans each morning based on conditions." },
          ].map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-[hsl(155_50%_16%)] px-4">
              <AccordionTrigger className="text-left font-['Raleway'] font-medium text-lg hover:no-underline py-6 data-[state=open]:text-white">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[hsl(43_80%_65%)]/70 pb-6 leading-relaxed text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* 10. TESTIMONIAL */}
      <section className="py-24 bg-[hsl(155_55%_10%)]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-[1px] bg-[hsl(43_80%_65%)]/50 mx-auto mb-12"></div>
          <p className="font-['Cinzel'] text-2xl md:text-3xl leading-relaxed mb-10">
            "Árdíre arranged ten days across the Highlands and Hebrides for our family and we still talk about every meal, every drive, every stop. They thought of things we hadn't even known to want."
          </p>
          <p className="uppercase tracking-widest text-sm text-[hsl(43_80%_65%)]/70">
            — A. Mackintosh, Private Client, New York
          </p>
          <div className="w-16 h-[1px] bg-[hsl(43_80%_65%)]/50 mx-auto mt-12"></div>
        </div>
      </section>

      {/* 11. ENQUIRY FORM */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="font-['Cinzel'] text-4xl mb-6">Begin Your Tour</h2>
            <p className="text-lg leading-relaxed text-[hsl(43_80%_65%)]/80 mb-8">
              Tell us your dates, your party, and the kind of Scotland you want to see. We'll respond within 24 hours.
            </p>
            <div className="space-y-4 text-sm tracking-widest uppercase">
              <a href="mailto:enquiries@ardire.co.uk" className="flex items-center gap-4 hover:text-white transition-colors">
                <Mail className="w-5 h-5" /> enquiries@ardire.co.uk
              </a>
              <a href="tel:+441410000000" className="flex items-center gap-4 hover:text-white transition-colors">
                <Phone className="w-5 h-5" /> +44 (0) 141 000 0000
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 bg-[hsl(155_55%_10%)] border border-[hsl(155_50%_16%)] p-8 md:p-12">
            <form className="space-y-6">
              <input type="hidden" name="service" value="Luxury Tours" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70">Name</label>
                  <Input className="bg-transparent border-[hsl(155_50%_16%)] rounded-none h-12 text-[hsl(43_80%_65%)] focus-visible:ring-1 focus-visible:ring-[hsl(43_80%_65%)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70">Email</label>
                  <Input type="email" className="bg-transparent border-[hsl(155_50%_16%)] rounded-none h-12 text-[hsl(43_80%_65%)] focus-visible:ring-1 focus-visible:ring-[hsl(43_80%_65%)]" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70">Approx. Dates</label>
                  <Input placeholder="e.g. June 2024" className="bg-transparent border-[hsl(155_50%_16%)] rounded-none h-12 text-[hsl(43_80%_65%)] focus-visible:ring-1 focus-visible:ring-[hsl(43_80%_65%)] placeholder:text-[hsl(43_80%_65%)]/30" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70">Party Size</label>
                  <Input type="number" min="1" className="bg-transparent border-[hsl(155_50%_16%)] rounded-none h-12 text-[hsl(43_80%_65%)] focus-visible:ring-1 focus-visible:ring-[hsl(43_80%_65%)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-[hsl(43_80%_65%)]/70">Message</label>
                <Textarea rows={4} className="bg-transparent border-[hsl(155_50%_16%)] rounded-none text-[hsl(43_80%_65%)] focus-visible:ring-1 focus-visible:ring-[hsl(43_80%_65%)] resize-none" />
              </div>
              <Button type="button" className="w-full bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] font-['Raleway'] tracking-widest uppercase text-xs h-14 rounded-none hover:bg-[hsl(43_80%_65%)]/90 mt-4">
                Send Enquiry
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-[hsl(155_58%_7%)] border-t border-[hsl(155_50%_16%)] py-16 text-sm pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src="/images/logo.webp" alt="Árdíre" className="h-12 w-auto mb-6 opacity-80" />
            <p className="text-[hsl(43_80%_65%)]/60 max-w-xs leading-relaxed">
              Luxury Scottish concierge, private touring, and event company based in Glasgow, Scotland.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 text-[hsl(43_80%_65%)]/70 uppercase tracking-widest text-xs">
              <span className="text-[hsl(43_80%_65%)] mb-2 font-semibold">Travel</span>
              <Link href="#" className="hover:text-white transition-colors">Luxury Tours</Link>
              <Link href="#" className="hover:text-white transition-colors">Golf</Link>
              <Link href="#" className="hover:text-white transition-colors">Concierge</Link>
            </div>
            <div className="flex flex-col gap-4 text-[hsl(43_80%_65%)]/70 uppercase tracking-widest text-xs">
              <span className="text-[hsl(43_80%_65%)] mb-2 font-semibold">Events</span>
              <Link href="#" className="hover:text-white transition-colors">Corporate</Link>
              <Link href="#" className="hover:text-white transition-colors">Private Retreats</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-[hsl(43_80%_65%)]/70 text-xs tracking-widest uppercase">
            <a href="mailto:enquiries@ardire.co.uk" className="hover:text-white transition-colors">enquiries@ardire.co.uk</a>
            <a href="tel:+441410000000" className="hover:text-white transition-colors">+44 (0) 141 000 0000</a>
            <p className="mt-4 text-[hsl(43_80%_65%)]/40 normal-case tracking-normal text-sm">
              © {new Date().getFullYear()} Árd Íre Hospitality Group. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* 12. STICKY MOBILE-STYLE ENQUIRE */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[hsl(155_55%_10%)] border-t border-[hsl(43_80%_65%)]/30 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm tracking-widest uppercase text-[hsl(43_80%_65%)]/80">
            <a href="tel:+441410000000" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> <span className="hidden sm:inline">+44 (0) 141 000 0000</span>
            </a>
            <a href="mailto:enquiries@ardire.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4" /> <span className="hidden sm:inline">enquiries@ardire.co.uk</span>
            </a>
            <span className="text-[hsl(43_80%_65%)]/40 text-xs hidden md:inline ml-4">
              (Always-visible enquiry bar - sticky on mobile)
            </span>
          </div>
          <Button className="w-full sm:w-auto bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] font-['Raleway'] tracking-widest uppercase text-xs px-8 h-12 rounded-none hover:bg-[hsl(43_80%_65%)]/90 shrink-0">
            Make an Enquiry
          </Button>
        </div>
      </div>

    </div>
  );
}
