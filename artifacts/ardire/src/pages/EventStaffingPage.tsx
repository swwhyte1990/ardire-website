import { useEffect, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";

const staffProvided = [
  "Waiting staff for dinners, receptions and functions of every size",
  "Butlers and private service staff, for households, private dinners and occasions that call for a more personal touch",
  "Front-of-house and hospitality teams: reception, hosts and guest liaison",
  "Bar staff, for everything from a quiet drinks reception to a full event bar",
  "Chefs on request, for private dining and events that would like food prepared on site",
];

const pricingCards = [
  {
    role: "Front-of-House & Bar Staff",
    price: "From £25",
    unit: "per hour, plus VAT",
    minimum: "Minimum four hours",
  },
  {
    role: "Butlers & Event Managers",
    price: "From £50",
    unit: "per hour, plus VAT",
    minimum: "Minimum ten hours",
  },
  {
    role: "Chefs",
    price: "On request",
    unit: "for private dining and on-site catering",
    minimum: null,
  },
];

export default function EventStaffingPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Event Staffing Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Professional event staff for occasions across Scotland. Waiting staff, butlers and hospitality teams, briefed, well presented and ready to serve."
    );
    const serviceScript = document.createElement("script");
    serviceScript.type = "application/ld+json";
    serviceScript.id = "service-schema-event-staffing";
    serviceScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Professional Event Staffing Scotland",
      "serviceType": "Event Staffing",
      "provider": { "@type": "LocalBusiness", "name": "Árdíre Hospitality Group" },
      "areaServed": "Scotland",
      "description": "Professional event staff for occasions across Scotland. Waiting staff, butlers and hospitality teams, briefed, well presented and ready to serve.",
      "url": "https://ardire.co.uk/services/event-staffing",
    });
    document.head.appendChild(serviceScript);
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev !== null) desc.setAttribute("content", prev);
      document.getElementById("service-schema-event-staffing")?.remove();
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
            src={`${import.meta.env.BASE_URL}images/events-hero.webp`}
            srcSet={`${import.meta.env.BASE_URL}images/events-hero-sm.webp 800w, ${import.meta.env.BASE_URL}images/events-hero.webp 1440w`}
            sizes="100vw"
            alt="Event Staffing Scotland — The ÁrdÍre Group"
            className="w-full h-full object-cover"
            width={1440}
            height={961}
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
              Professional Event Staffing
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Event Staffing in Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              Professional waiting staff, butlers and hospitality teams for events of any size. Briefed, well presented, and ready to make the evening run beautifully.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Professional Event Staffing</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              The people who make an event feel effortless.
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
              The impression an event makes owes a great deal to the people running it. We provide trained, professional staff for events across Scotland, from a single butler for a private dinner to a full front-of-house team for a large gathering. They arrive briefed, well presented, and ready to look after your guests, so the occasion feels effortless from the door onward.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Staff We Provide */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Staff We Provide</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Every role your event needs.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-6">
              {staffProvided.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-sans font-light text-sm text-muted-foreground max-w-3xl">
              If there is a role you need that is not listed here, ask. The chances are we can provide it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
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
              You tell us what you need. We build the team.
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
              You tell us about the event — the kind of occasion, the number of guests, and the feel you are after — and we build the right team around it.
            </p>
            <p>
              Our staff arrive briefed on your event, uniformed to your specification, and led by a senior coordinator who runs the team on the day, so you have one person to deal with rather than a roomful. We can provide staff on their own, for an event you or someone else is running, or as part of an event we are managing for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect + Who It Is For */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">What to Expect</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                A team your guests notice for all the right reasons.
              </h2>
              <p className="font-sans font-light text-muted-foreground leading-relaxed text-base">
                Staff chosen for warmth and composure as much as for polish, who represent you well and stay calm when an event does what events sometimes do. Everyone we provide is experienced, background-checked and insured, and properly briefed before they arrive. The aim is a team your guests notice for all the right reasons, and never for the wrong ones.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Who We Work With</p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-6">
                Private hosts, companies, households and venues.
              </h2>
              <p className="font-sans font-light text-muted-foreground leading-relaxed text-base">
                Private hosts planning a dinner or a celebration, companies running corporate functions and hospitality, and families marking something special. Private households who need staff for an occasion or a season. And the venues and event planners who want a reliable, well-presented team for an event they are running themselves.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing — product cards */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              By role and by the hour.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border/30 mb-10">
              {pricingCards.map((card) => (
                <div key={card.role} className="bg-background p-8 md:p-10 flex flex-col">
                  <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-primary mb-6">
                    {card.role}
                  </p>
                  <p className="font-display text-4xl md:text-5xl text-foreground mb-1">
                    {card.price}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground font-light mb-auto pb-6">
                    {card.unit}
                  </p>
                  {card.minimum && (
                    <div className="border-t border-border/40 pt-5">
                      <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                        {card.minimum}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="font-sans font-light text-sm text-muted-foreground max-w-2xl">
              The total comes down to the roles you need, how many staff, and the hours involved. Tell us about the event and we will put together a clear quote before anything is confirmed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Request Staff</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Request staff for your event.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us the occasion, the date, and roughly how many guests, and we will build the right team around it.
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
