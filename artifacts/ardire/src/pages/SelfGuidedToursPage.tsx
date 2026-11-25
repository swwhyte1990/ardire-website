import { useEffect, useState, type MouseEvent } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
import faqs from "@/data/faqs.json";
import { useLocation } from "wouter";
import { m, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";
import { SampleJourney } from "@/components/SampleJourney";
import { SkipToSamples, SAMPLES_ID } from "@/components/SkipToSamples";
import { sampleJourneys } from "@/data/sampleJourneys";
import selfGuidedHeroSm from "@/assets/images/self-guided-hero-sm.webp";
import selfGuidedHero from "@/assets/images/self-guided-hero.webp";

// The FAQ text is shared with the static HTML and its FAQPage schema.
const selfGuidedFaqs = faqs["services/self-guided-tours"].items;

// Shortest first. The data, including each journey's title and length, lives in
// src/data/sampleJourneys.json, which the static HTML for search engines reads too.
const itineraries = [
  "abbeys-and-border-country",
  "perthshire-and-angus",
  "oban-argyll-and-kintyre",
  "ayrshire-and-the-south-west",
  "north-coast-slowly",
].map((id) => sampleJourneys[id]);

const whatWeArrange = [
  "A route and itinerary shaped by what you want to see and how far you like to travel each day",
  "Accommodation booked throughout, from country houses and castles to the best small hotels",
  "Tables, tastings and experiences reserved in advance",
  "Detailed recommendations for each day: where to stop, what to see, and where to eat",
  "Anything else you would like arranged, from car hire to a private guide for a day",
  "A point of contact throughout, for changes of plan or advice on the road",
];

export default function SelfGuidedToursPage() {
  usePageMeta("services/self-guided-tours");
  const [, navigate] = useLocation();
  const [faqOpen, setFaqOpen] = useState<string | null>(null);
  const [openItinerary, setOpenItinerary] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  function goToEnquiry(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setPendingScroll("enquiry");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <Navbar />
      <main id="main-content" className="flex-1 w-full">

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={selfGuidedHero}
            srcSet={`${selfGuidedHeroSm} 800w, ${selfGuidedHero} 1200w`}
            sizes="100vw"
            alt="Self-Guided Tours of Scotland, The Árdíre Group"
            className="w-full h-full object-cover"
            width={1200}
            height={800}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-44 w-full">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-foreground/70 mb-4">
              Self-Guided Touring
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Self-Guided Tours of Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              The freedom to explore Scotland your own way, with the route planned and the bookings made before you leave.
            </p>
            <SkipToSamples label="See Sample Journeys" />
          </m.div>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Self-Guided Touring</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Scotland on your own terms.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl space-y-6 font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              You travel independently, at your own pace. We design the itinerary and make the bookings, so the trip is arranged before you set off.
            </p>
            <p>
              Bring an appetite for the open road. We will have the route, the rooms and the best stops ready.
            </p>
          </m.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Process</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Your route designed, your bookings made.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              Tell us where you would like to go, how long you have and how you like to travel. We design a route, recommend places to stay and stop, and book whatever you would like handled, from rooms to tables and experiences. Then the trip is yours, and we are there if you need us.
            </p>
          </m.div>
        </div>
      </section>

      {/* What We Arrange */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">What We Arrange</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Everything in place before you set off.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {whatWeArrange.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
      </section>

      {/* Sample Journeys */}
      <section data-prerender-skip id={SAMPLES_ID} tabIndex={-1} className="scroll-mt-20 focus:outline-none py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Sample Journeys</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Five journeys, from three days to seven.
            </h2>
          </m.div>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-12"
          >
            These are journeys we can plan, here to spark a few ideas of your own. Nothing is fixed. The length, the places and the pace are yours to shape, and we will happily rework any of them. The samples are drives, but the route, the stays and the stops can be planned for any way of travelling.
          </m.p>

          <div className="space-y-3">
            {itineraries.map((itin, i) => (
              <m.div
                key={itin.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
                className="bg-card border-l-2 border-primary"
              >
                <button
                  onClick={() => setOpenItinerary(openItinerary === itin.id ? null : itin.id)}
                  className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
                  aria-expanded={openItinerary === itin.id}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary shrink-0">{itin.duration}</span>
                    <h3 className="font-display text-lg text-foreground">{itin.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden sm:block font-sans text-xs text-muted-foreground">Price on enquiry</span>
                    <ChevronDown
                      className="w-4 h-4 text-primary transition-transform duration-300"
                      style={{ transform: openItinerary === itin.id ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openItinerary === itin.id && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 md:pb-10 pt-2">
                        <SampleJourney journey={itin} />
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It Is For + The Árdíre Difference */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Who It Suits</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                For travellers who want independence and a trip that is properly thought through.
              </h2>
              <p className="font-sans font-light text-muted-foreground leading-relaxed text-base">
                Self-guided suits couples and families who would rather set their own rhythm than follow a guide. Confident travellers who love the drive and the discovery. And people who have toured Scotland with a guide before and want to come back and explore it their own way. Whether it is a few days or a fortnight, the trip is yours to lead.
              </p>
            </m.div>
            <m.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Difference</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                Independent travel, planned with care.
              </h2>
              <p className="font-sans font-light text-muted-foreground leading-relaxed text-base">
                Every itinerary draws on close knowledge of the country, and the best rooms and tables are held before they fill. You travel independently, with a good plan and someone to call.
              </p>
            </m.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-prerender-skip className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">FAQs</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              {faqs["services/self-guided-tours"].heading}
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl divide-y divide-border/30"
          >
            {selfGuidedFaqs.map((faq, i) => {
              const key = `sg-faq-${i}`;
              const open = faqOpen === key;
              return (
                <div key={key}>
                  <button
                    onClick={() => setFaqOpen(open ? null : key)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    aria-expanded={open}
                  >
                    <span className="font-display text-base text-foreground group-hover:text-primary transition-colors duration-200">{faq.q}</span>
                    <ChevronDown
                      className="w-4 h-4 text-primary shrink-0 transition-transform duration-300"
                      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed pb-5">{faq.a}</p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </m.div>
        </div>
      </section>

      {/* CTA with pricing note */}
      <section className="py-20 bg-card border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Begin Here</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Plan your self-guided tour.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us where you would like to go and how long you have. We will design the route.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
            >
              <a href="/#enquiry" onClick={goToEnquiry}>Enquire</a>
            </Button>
          </m.div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
