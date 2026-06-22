import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";

const selfGuidedFaqs = [
  {
    q: "What is a self-guided tour?",
    a: "It is a trip you travel independently, at your own pace and with your own company, but with the planning and booking taken care of by us. We design the route, recommend and reserve the places to stay and the things worth doing, and you set off and enjoy it your own way, with us on hand if you need anything.",
  },
  {
    q: "What exactly do you arrange?",
    a: "We build the itinerary and book the parts you would like handled: your accommodation, restaurants, tastings, activities and experiences, along with detailed recommendations for each day. If you would like us to arrange car hire or a private guide for a day, we can add that too. The travelling itself is yours to do at your own pace.",
  },
  {
    q: "Do you provide transport or move our luggage?",
    a: "You travel in your own way, in whatever transport suits you, with your own luggage. We focus on planning the trip and making the bookings rather than driving you or moving your bags. If you would prefer a car arranged or a driver for part of the trip, just ask and we will look after it.",
  },
  {
    q: "How is this different from planning the trip myself?",
    a: "The difference is in the knowledge and the access behind it. We know which places are worth your time, which to avoid, and how to put a route together that flows. We can hold the right rooms and restaurants before they fill, and arrange things that are harder to reach on your own. You get a trip shaped around you rather than pieced together from scratch.",
  },
  {
    q: "Can we still change things once we are travelling?",
    a: "Yes. The pace and the days are yours, and if something needs to shift while you are away, we are on hand to help rework it. A self-guided trip is meant to leave room for spontaneity.",
  },
  {
    q: "Can we add a driver or guide for part of the trip?",
    a: "At any time. Some people travel the whole route independently, others like a private guide for a particular day or a driver for a stretch they would rather not drive. We can build that in wherever it suits you.",
  },
  {
    q: "How far ahead should we book?",
    a: "The earlier the better, since the best accommodation and experiences are booked well in advance, especially through the summer. Give us a good run at it and we can hold the places that make a trip, though shorter notice is still workable.",
  },
  {
    q: "How much does a self-guided tour cost?",
    a: "There is no set price, since it depends on your route, how long you travel and what you would like us to book. Tell us what you have in mind and we will put together a proposal, with a sample route to show what a trip can look like.",
  },
];

const whatWeArrange = [
  "A bespoke route and itinerary, built around what you want to see and how far you would like to travel each day",
  "Accommodation booked throughout, from country houses and castles to the best small hotels",
  "Tables, tastings and experiences reserved in advance, so the good places are held for you",
  "Detailed recommendations for each day: where to stop, what to see, and where to eat",
  "Anything else you would like arranged, from car hire to a private guide for a day",
  "A point of contact on hand throughout, if plans change or you simply want advice",
];

export default function SelfGuidedToursPage() {
  const [, navigate] = useLocation();
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Self-Guided Tours of Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "A bespoke self-guided tour of Scotland, planned and booked around you. Ardire designs the route and makes the bookings. You travel independently, at your own pace."
    );
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "faq-schema-self-guided";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": selfGuidedFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    });
    document.head.appendChild(faqScript);
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev !== null) desc.setAttribute("content", prev);
      document.getElementById("faq-schema-self-guided")?.remove();
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

      {/* Hero */}
      <section id="main-content" className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/self-guided-hero.webp`}
            alt="Self-Guided Tours of Scotland — The ÁrdÍre Group"
            className="w-full h-full object-cover"
            width={1920}
            height={1280}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-44 w-full">
          <motion.div
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
              The freedom to explore Scotland your own way, with the itinerary planned and the bookings made for you. You travel independently. We take care of arranging it all beforehand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What This Is */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl space-y-6 font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              A self-guided tour gives you Scotland on your own terms. You travel independently, in your own way and at your own pace, while we design the itinerary and make the bookings, so the whole trip is shaped and arranged before you set off, and yours to enjoy without the planning.
            </p>
            <p>
              You bring the appetite for the open road. We bring the route worth taking, the right places to stay, and the knowledge of what to see and where the best days are quietly waiting.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Process</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              We plan the journey around you, then arrange the parts you want booked.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              You tell us where you would like to go, how long you have and how you like to travel, and we design a route to suit, recommend the places worth staying and stopping, and book whatever you would like handled, from accommodation to tables and experiences. From there, the trip is yours. You travel in your own way, at your own pace, with everything already arranged and us on hand if you need anything along the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Arrange */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {whatWeArrange.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who It Is For + The Ardire Difference */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Who It Suits</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                For travellers who want independence without giving up on a trip that is properly thought through.
              </h2>
              <p className="font-sans font-light text-muted-foreground leading-relaxed text-base">
                Self-guided suits couples and families who would rather set their own rhythm than follow a guide. Confident travellers who love the drive and the discovery. And people who have toured Scotland with a guide before and want to come back and explore it their own way. Whether it is a few days or a fortnight, the trip is yours to lead.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Difference</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                A self-guided trip is only as good as the planning behind it.
              </h2>
              <p className="font-sans font-light text-muted-foreground leading-relaxed text-base">
                What you get with us is an itinerary built from real knowledge of the country, the right places held before they fill, and access you would struggle to arrange on your own, all shaped around you rather than pulled from a fixed catalogue. You travel independently, but never without a good plan and someone to call.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">FAQs</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Things people ask us.
            </h2>
          </motion.div>
          <motion.div
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
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed pb-5">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA with pricing note */}
      <section className="py-20 bg-card border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Begin Here</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Plan your self-guided tour.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-4 max-w-xl mx-auto">
              There is no set price, since every self-guided trip is built around your route, your pace and what you would like us to book.
            </p>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us where you would like to go, how long you have, and how you would like to travel, and we will design a route around it.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
            >
              <a href="/#enquiry" onClick={goToEnquiry}>Enquire</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
