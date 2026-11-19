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
import eventsHeroSm from "@/assets/images/events-hero-sm.webp";
import eventsHero from "@/assets/images/events-hero.webp";

const whatWeHandle = [
  "Venue sourcing and contract negotiation",
  "Supplier management: catering, bar, AV and technical production, lighting, entertainment",
  "Event design and styling",
  "Guest communications, registration and on-the-day reception",
  "Full on-site management with a dedicated event producer",
  "Post-event debrief and close-out",
];

// The FAQ text is shared with the static HTML and its FAQPage schema.
const eventManagementFaqs = faqs["services/event-management"].items;

export default function EventManagementPage() {
  usePageMeta("services/event-management");
  const [, navigate] = useLocation();
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

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
            src={eventsHero}
            srcSet={`${eventsHeroSm} 800w, ${eventsHero} 1440w`}
            sizes="100vw"
            alt="Event Management Scotland, The Árdíre Group"
            className="w-full h-full object-cover"
            width={1440}
            height={961}
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
              Full-Service Event Management
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Event Management in Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              We plan, produce and run events from start to finish, with one point of contact throughout.
            </p>
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Full-Service Event Management</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              One team. The whole event.
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
              We take full responsibility for your event, from the first conversation to the moment the last guest leaves. We manage the production, make the decisions on the day and answer for the result.
            </p>
            <p>
              Our clients want to hand the event over and know it will be run properly. The attention is the same whatever the size.
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
              Brief, plan, produce, run.
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
              We start with the brief: what the event is for, who is attending, what impression it should leave. From there we develop the concept, source the venue, build the supplier list, and manage every booking and contract. As the date approaches we coordinate logistics, brief the team, and build a production schedule. On the day, we are there with a full team, running the event.
            </p>
            <p>
              Most clients give us the whole project. Some come to us with a venue already chosen and want us to take the production from there. Either way works.
            </p>
          </m.div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">What We Handle</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Every part of the production.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl">
              {whatWeHandle.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </section>

      {/* The Kinds of Events */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Work</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              From private dinners to large-scale productions.
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
              Smaller occasions include private dinners, birthday celebrations and family gatherings. Larger ones include product launches, awards evenings, corporate hospitality days, charity galas and conference receptions. Each is produced differently. The approach stays the same: plan thoroughly, staff well and run it calmly.
            </p>
            <p>
              We work with venues across Scotland, from city hotels and private members' clubs to country estates and unconventional spaces.
            </p>
          </m.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
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
              {faqs["services/event-management"].heading}
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl divide-y divide-border/30"
          >
            {eventManagementFaqs.map((faq, i) => {
              const key = `em-faq-${i}`;
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
              Tell us about your event.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us the occasion, the guest numbers and how much you would like us to take on. We will come back with a clear proposal, costed in full.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
            >
              <a href="/#enquiry" onClick={goToEnquiry}>Start Planning Your Event</a>
            </Button>
          </m.div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
