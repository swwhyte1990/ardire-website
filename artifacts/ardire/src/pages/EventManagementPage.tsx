import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";

const whatWeHandle = [
  "Venue sourcing and contract negotiation",
  "Supplier management: catering, bar, AV and technical production, lighting, entertainment",
  "Event design and styling",
  "Guest communications, registration and on-the-day reception",
  "Full on-site management with a dedicated event producer",
  "Post-event debrief and close-out",
];

const eventManagementFaqs = [
  {
    q: "What does your event management service include?",
    a: "We take on the whole event, from the first idea to the last guest leaving. That covers the concept, the venue, the suppliers, the catering, the production and styling, the guest arrangements, and the running of it on the day. You have one team leading all of it, so the parts come together as a single event rather than a dozen things to chase.",
  },
  {
    q: "What kinds of events do you manage?",
    a: "A wide range, from private dinners and celebrations to corporate functions, product launches, awards evenings, gala dinners and charity events. Whatever the occasion, the approach is the same: we build it around your purpose and your guests.",
  },
  {
    q: "What is the difference between event management and event staffing?",
    a: "Event management is us running the whole event, the planning, the suppliers, the production and the day itself. Event staffing is us providing the people, a front-of-house and hospitality team, for an event that you or someone else is running. Many clients take both, with our team managing the event and staffing it as well.",
  },
  {
    q: "How large or small an event can you manage?",
    a: "Both ends of the scale. We are as comfortable with an intimate dinner for twenty as with a corporate gathering for several hundred. The care is the same, only the scale changes.",
  },
  {
    q: "Do you source the venue, or work with one we already have?",
    a: "Either, depending on where you are starting from. If you need a venue, finding and securing the right setting is part of what we do, whether that is a country estate, a city hotel, or somewhere more unexpected. If the venue is already decided, or you have come to us through one, we work within it and manage everything around it.",
  },
  {
    q: "Who runs the event on the day?",
    a: "A dedicated event producer from our team leads it throughout, with the staff and suppliers reporting to them. That way, on the day, you are a guest at your own event rather than the one solving problems.",
  },
  {
    q: "Do you manage the suppliers, catering and production as well?",
    a: "Yes, all of it under one roof: catering, entertainment, the technical and audiovisual side, the styling and décor, and the timing that holds it together. You deal with us, and we deal with everyone else.",
  },
  {
    q: "Can you manage events beyond Scotland?",
    a: "Scotland is our home and where most of our events take place. Where an occasion calls for it, we can manage events beyond Scotland too.",
  },
  {
    q: "How far ahead should we start planning?",
    a: "The sooner the better, particularly for the best venues and for events at busy times of year, since those are taken well ahead. That said, we are used to working to tighter timelines when an occasion calls for it.",
  },
  {
    q: "How much does event management cost?",
    a: "There is no set price, since it depends on the scale of the event, the venue, and what you would like it to involve. Tell us about the occasion and we will put together a detailed proposal, costed in full, before anything is committed.",
  },
];

export default function EventManagementPage() {
  const [, navigate] = useLocation();
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Event Management Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Full-service event management across Scotland. Ardire plans, produces and runs your event from brief to close, with one team accountable for the whole thing."
    );
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "faq-schema-event-management";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": eventManagementFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    });
    document.head.appendChild(faqScript);
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev !== null) desc.setAttribute("content", prev);
      document.getElementById("faq-schema-event-management")?.remove();
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
            src={`${import.meta.env.BASE_URL}images/hero.webp`}
            alt="Event Management Scotland — The ÁrdÍre Group"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
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
              Full-Service Event Management
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Event Management
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              We plan, produce and run events from start to finish. One team, one point of contact, the whole thing taken care of.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Full-Service Event Management</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              One team. The whole event.
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
              We take full responsibility for your event, from the first conversation about what you want to achieve to the moment the last guest leaves. That means we are not just coordinating between suppliers — we are managing the production, making the decisions on the day, and accountable for the result.
            </p>
            <p>
              The clients who come to us typically have one thing in common: they want to hand the event over and trust that it will be handled properly. Whether it is a private dinner for twenty or a corporate gala for three hundred, the level of attention is the same.
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
              Brief, plan, produce, run.
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
              We start with the brief: what the event is for, who is attending, what impression it should leave. From there we develop the concept, source the venue, build the supplier list, and manage every booking and contract. As the date approaches we coordinate logistics, brief the team, and build a production schedule. On the day, we are there, fully staffed, running the event so you do not have to think about it.
            </p>
            <p>
              Most clients give us the whole project. Some come to us with a venue already chosen and want us to take the production from there. Either way works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Handle */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.div
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
          </motion.div>
        </div>
      </section>

      {/* The Kinds of Events */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl space-y-6 font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              We work across a wide range of occasions — private dinners, birthday celebrations and family gatherings on the smaller side; product launches, awards evenings, corporate hospitality days, charity galas and conference receptions at scale. The production challenge is different for each, but the approach is the same: plan thoroughly, staff well, and run it calmly.
            </p>
            <p>
              We have experience working with venues across Scotland, from city hotels and private members' clubs to country estates and non-traditional spaces that take more work to get right.
            </p>
          </motion.div>
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
              Tell us about your event.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              There is no standard price for event management — it depends on the scale, the venue, the suppliers involved and how much of the production you want us to own. We scope against the brief and come back with a clear proposal.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
            >
              <a href="/#enquiry" onClick={goToEnquiry}>Start Planning Your Event</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
