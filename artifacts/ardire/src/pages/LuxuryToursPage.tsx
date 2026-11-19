import { useEffect, useState, type MouseEvent } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
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
import toursHeroSm from "@/assets/images/tours-hero-sm.webp";
import toursHero from "@/assets/images/tours-hero.webp";

const itineraries = [
  { id: "3-day", journey: "edinburgh-heart-of-scotland" },
  { id: "5-day", journey: "west-highlands-skye" },
  { id: "7-day", journey: "grand-sweep" },
].map((i) => ({ ...i, ...sampleJourneys[i.journey] }));

const included = [
  "A private driver and transfers throughout",
  "Accommodation chosen for its standard and its setting",
  "Meals and dining, with a private chef whenever you would like one",
  "Guides, experiences and access arranged around your interests",
  "Every booking, ticket and reservation handled ahead of time",
  "A dedicated concierge on the ground, there whenever you need them",
];

const luxuryFaqs = [
  {
    q: "How does the planning work?",
    a: "It starts with a conversation. You can plan every detail with us, or give us a sense of what you would like and we will send a draft itinerary for you to shape. Nothing is booked without your approval.",
  },
  {
    q: "Can the trip be fully tailored to us?",
    a: "Yes. The sample journeys are there to spark ideas, and nothing in them is fixed. Every trip follows your interests and your pace.",
  },
  {
    q: "What does the price include?",
    a: "Everything is taken care of: a private driver and transfers, accommodation, meals and dining, guides and experiences, and every booking handled ahead of time, with someone looking after your trip throughout.",
  },
  {
    q: "How does pricing work for a group?",
    a: "There is no set price. The cost per person depends on your plans and how many of you are travelling. Once we know both, we send a full proposal before anything is booked.",
  },
  {
    q: "Why do your sample journeys not show a price?",
    a: "The same route can vary widely with the season, the standard of stay, how you travel and how many of you there are. Tell us which journey appeals and we will send a full proposal for it.",
  },
  {
    q: "How far ahead should we book?",
    a: "As early as you can, especially for summer, when the best rooms and experiences go first. We also plan trips at shorter notice.",
  },
  {
    q: "Can you arrange things that are not in your sample itineraries?",
    a: "Almost certainly. The samples are only a starting point. Tell us what you have always wanted to do in Scotland, and we will look at building it in.",
  },
  {
    q: "What parts of Scotland do you cover?",
    a: "All of it, from Edinburgh and the Borders to the Highlands, Skye and the islands, Speyside and the far north. The route follows what you want to see. Scotland is our home, though we can plan beyond it when a trip calls for it.",
  },
  {
    q: "Can you look after families, special occasions and particular requirements?",
    a: "Yes. We plan for couples, families and groups marking something special. We look after the details that matter to you, from the pace of each day to where you dine.",
  },
];

export default function LuxuryToursPage() {
  usePageMeta("services/luxury-tours");
  const [, navigate] = useLocation();
  const [openItinerary, setOpenItinerary] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "faq-schema-luxury";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": luxuryFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    });
    document.head.appendChild(faqScript);
    const serviceScript = document.createElement("script");
    serviceScript.type = "application/ld+json";
    serviceScript.id = "service-schema-luxury";
    serviceScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Private Luxury Tours of Scotland",
      "serviceType": "Luxury Tour",
      "provider": { "@type": "LocalBusiness", "name": "The Árdíre Group" },
      "areaServed": "Scotland",
      "description": "Bespoke private tours of Scotland with a dedicated travel concierge. We plan, arrange and look after every part of your trip.",
      "url": "https://ardire.co.uk/services/luxury-tours/",
    });
    document.head.appendChild(serviceScript);
    return () => {
      document.getElementById("faq-schema-luxury")?.remove();
      document.getElementById("service-schema-luxury")?.remove();
    };
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
            src={toursHero}
            srcSet={`${toursHeroSm} 800w, ${toursHero} 1200w`}
            sizes="100vw"
            alt="Private Tours of Scotland, The Árdíre Group"
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
              Private Touring
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Private Tours of Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              A private tour of Scotland, with a travel concierge who arranges and looks after every part of it, from first idea to final evening.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Private Touring</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              A private tour and a travel concierge <span className="italic text-primary">in one.</span>
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
              A private tour follows what you want to see, the pace you want to keep and the kind of days you want to have. We plan the itinerary and book everything: transport, rooms, meals and experiences. Then we run it on the ground, so there is nothing to chase while you are here.
            </p>
            <p>
              This is a country we know well and love showing off, and most of that love is in the detail: the right glen on the right morning, the dinner worth driving for, the distillery that will open a door for you. Some of our guests arrive knowing exactly what they want. Most come with a few ideas and let us fill in the rest. Either way is the right way to begin.
            </p>
          </m.div>
        </div>
      </section>

      {/* Travel Concierge */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Travel Concierge</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Your travel concierge <span className="italic text-primary">in Scotland.</span>
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
              We can also be your travel concierge for the whole of your time in Scotland: one person who arranges, books and looks after everything, and is on call while you are here.
            </p>
            <p>
              Some guests hand us the trip from the first idea. Others arrive with much of it in place and want the bookings made, a few doors opened and someone there for whatever comes up. We are glad to do either, for a few days or a longer stay.
            </p>
          </m.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
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
              Every day in hand, from arrival to departure.
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
              The planning is in our hands from the start, and the trip is yours to enjoy.
            </p>
            <p>
              A dedicated concierge knows your plans and preferences, and a private driver takes you between places. You are free to change your mind at any point. If the weather turns, or you fancy somewhere new, we rework the day.
            </p>
            <p>
              You bring a sense of what you want. We make it happen.
            </p>
          </m.div>
        </div>
      </section>

      {/* Come With an Idea */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Start With Something</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Bring the idea. <span className="italic text-primary">We build around it.</span>
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
              The best trips tend to start with something you already love: a place you have seen in a film, a whisky you have always drunk, a castle, a coastline, a name on a map. Bring that to us, and we will build outward from it with the things you would not have thought to ask for.
            </p>
            <p>
              You want to see Skye, and we know the hour to be at the Quiraing before the crowds arrive. You want a day of whisky, and we know the distillery that will set aside a quiet room and a cask the public never reach. You want somewhere to remember for an anniversary, and we know the table, the view and the chef worth the journey. The idea is yours. The knowledge around it is ours to add.
            </p>
          </m.div>
        </div>
      </section>

      {/* Three Sample Journeys */}
      <section id={SAMPLES_ID} tabIndex={-1} className="scroll-mt-20 focus:outline-none py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Sample Itineraries</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Three journeys written to give you a feel for the range.
            </h2>
          </m.div>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-12"
          >
            These are journeys we can build, here to spark a few ideas of your own. Nothing is fixed. The length, the places and the pace are yours to shape, and we will happily rework any of them.
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
                        <SampleJourney journey={sampleJourneys[itin.journey]} />
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Arrange */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Scope</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              There is very little we cannot arrange.
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
              A private chef in a castle you have to yourselves. A helicopter to turn a long drive into a short hop. A ghillie for a day's fishing on the river or a stalk on the hill. A distillery opened after the public have gone. The leading authority on the one thing you most want to understand.
            </p>
          </m.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">What's Included</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              What every private tour includes.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <p className="font-sans font-light text-sm text-muted-foreground mb-8 max-w-2xl">
              Everything is taken care of:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-8">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-sans font-light text-sm text-muted-foreground">
              Arrive, and the rest is in hand.
            </p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
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
              Planning a private tour.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl divide-y divide-border/30"
          >
            {luxuryFaqs.map((faq, i) => {
              const key = `luxury-faq-${i}`;
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

      {/* CTA */}
      <section className="py-20 bg-background border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Begin Here</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Start with an idea.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us when you would like to come, who is travelling, and the one thing you most want this trip to be. We will plan the rest and send you a proposal.
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
