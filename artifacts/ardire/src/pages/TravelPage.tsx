import { useEffect, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { services } from "@/data/services";
import { setPendingScroll } from "@/lib/pendingScroll";

const travelSlugs = ["luxury-tours", "golf-tours", "private-chauffeur", "self-guided-tours"];
const travelServices = travelSlugs.map((slug) => services.find((s) => s.slug === slug)!).filter(Boolean);

const cardImages: Record<string, string> = {
  "luxury-tours":      "tours-hero.webp",
  "golf-tours":        "golf-hero.webp",
  "self-guided-tours": "self-guided-hero.webp",
  "private-chauffeur": "chauffeur-hero.webp",
};

export default function TravelPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Private Tours & Travel in Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute("content", "Bespoke private tours, championship golf, chauffeur services and 24/7 concierge across Scotland — crafted by The ÁrdÍre Group.");
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev !== null) desc.setAttribute("content", prev);
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
            src={`${import.meta.env.BASE_URL}images/travel-glenfinnan.webp`}
            alt="Glenfinnan Viaduct, Scottish Highlands"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            width={1920}
            height={1081}
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
              For Private Travellers
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Private Tours &amp; Travel in Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              Privately guided journeys, championship golf, luxury chauffeur, self-guided adventures and round-the-clock concierge — all crafted around you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Our Services</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Every journey begins with a <span className="italic text-primary">conversation.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[calc(1px+2mm)] bg-background">
            {travelServices.map((service, i) => (
              <motion.button
                key={service.slug}
                onClick={() => goToService(service.slug)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 + i * 0.08 }}
                className="group relative h-[260px] md:h-[320px] overflow-hidden text-left w-full"
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/${cardImages[service.slug] ?? "hero.webp"}`}
                  alt={`${service.title} — The ÁrdÍre Group`}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={960}
                  height={640}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-foreground/70 mb-1">
                    {service.subtitle}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-foreground group-hover:gap-3 transition-all duration-300">
                    {service.cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.button>
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Begin Your Journey</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Ready to Explore Scotland?
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Share your vision and our team will be in touch to arrange a private consultation, with no obligation.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
            >
              <a href="/#enquiry" onClick={goToEnquiry}>Plan a Private Tour</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
