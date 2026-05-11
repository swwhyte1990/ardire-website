import { useEffect, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { services } from "@/data/services";
import { setPendingScroll } from "@/lib/pendingScroll";

const eventsSlugs = ["corporate-incentives", "event-management", "event-staffing", "commonwealth-26"];
const eventsServices = eventsSlugs.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);

export default function EventsPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Events & Corporate | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute("content", "Corporate incentives, end-to-end event management, professional staffing and Glasgow 2026 support — delivered by The ÁrdÍre Group.");
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev) desc.setAttribute("content", prev);
    };
  }, []);

  function goToService(slug: string) {
    navigate(`/services/${slug}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

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
            src={`${import.meta.env.BASE_URL}images/about.webp`}
            alt="Luxury Corporate Events & Gala Dining"
            className="w-full h-full object-cover"
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
              For Companies &amp; Organisers
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Events &amp; Corporate
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              Corporate incentives, full-service event management, professional staffing and bespoke experiences for Glasgow 2026 — conceived, managed and delivered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="mb-16"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Our Services</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              From first concept to <span className="italic text-primary">final curtain.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
            {eventsServices.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 + i * 0.08 }}
                className="bg-background p-8 md:p-10 flex flex-col group"
              >
                <div className="mb-6">
                  <div className="w-8 h-px bg-primary mb-6 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-display text-2xl text-foreground mb-2">{service.title}</h3>
                  <p className="font-display italic text-primary text-base mb-4">{service.subtitle}</p>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed font-light line-clamp-4">
                    {service.intro}
                  </p>
                </div>
                <div className="mt-auto pt-6">
                  <button
                    onClick={() => goToService(service.slug)}
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-foreground hover:text-primary transition-colors duration-300 group/btn"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-card border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Work With Us</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Let's Create Something Extraordinary
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us about your event or programme and our team will be in touch to arrange a private consultation.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
            >
              <a href="/#enquiry" onClick={goToEnquiry}>Discuss Your Event</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
