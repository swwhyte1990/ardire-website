import { useEffect, useState, type MouseEvent } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
import { useLocation } from "wouter";
import { m, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";
import chauffeurHeroSm from "@/assets/images/chauffeur-hero-sm.webp";
import chauffeurHero from "@/assets/images/chauffeur-hero.webp";

const howWeCanHelp = [
  "Airport transfers, met at arrivals and driven to your door",
  "A car and driver for a day or several, to explore at your own pace",
  "Getting between courses, dinners and events comfortably and on time",
  "Transport for groups, occasions and corporate days",
];

const chauffeurFaqs = [
  {
    q: "What areas of Scotland do you cover?",
    a: "We are based in Glasgow and cover the whole of Scotland, from the cities to the Highlands and islands. That might be a short transfer in town or a day's drive across the country.",
  },
  {
    q: "What kind of vehicles do you provide?",
    a: "A car to suit your party: an executive saloon for one or two, a larger luxury car or SUV, or a people carrier for a group with luggage. Tell us how many are travelling and what you have planned, and we will match the car to it.",
  },
  {
    q: "How many passengers can you take?",
    a: "Anything from a single passenger to a group of seven, depending on the vehicle. For larger parties, we can arrange more than one car so everyone travels together.",
  },
  {
    q: "Will you meet us at the airport?",
    a: "Yes. We meet you on arrival, track your flight in case it lands early or late, and see you and your luggage to the car.",
  },
  {
    q: "Can we hire a car and driver for a full day, or longer?",
    a: "Yes. Book a car and driver for a day or for several, and explore at your own pace. Your driver takes you wherever you would like to go.",
  },
  {
    q: "Do you provide transfers for golf trips and events?",
    a: "Yes. We get you between courses, dinners and events comfortably and on time, early tee times included. We drive as part of our golf tours and event services, or for a trip you are running yourself.",
  },
  {
    q: "What is included?",
    a: "Your driver, the vehicle, fuel and parking, plus meet and greet and flight tracking on airport pickups. Water and refreshments are in the car.",
  },
  {
    q: "How far ahead should we book?",
    a: "Early, if you can, especially in summer and around major events, when cars are in demand. Shorter notice is often possible, so do ask.",
  },
];

export default function PrivateChauffeurPage() {
  usePageMeta("services/private-chauffeur");
  const [, navigate] = useLocation();
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "faq-schema-private-chauffeur";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": chauffeurFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    });
    document.head.appendChild(faqScript);
    const serviceScript = document.createElement("script");
    serviceScript.type = "application/ld+json";
    serviceScript.id = "service-schema-private-chauffeur";
    serviceScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Private Chauffeur Service Scotland",
      "serviceType": "Chauffeur Service",
      "provider": { "@type": "LocalBusiness", "name": "The Árdíre Group" },
      "areaServed": "Scotland",
      "description": "Private chauffeur service across Scotland. Airport transfers, days out and group transport, driven by professionals who know the country.",
      "url": "https://ardire.co.uk/services/private-chauffeur/",
    });
    document.head.appendChild(serviceScript);
    return () => {
      document.getElementById("faq-schema-private-chauffeur")?.remove();
      document.getElementById("service-schema-private-chauffeur")?.remove();
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
            src={chauffeurHero}
            srcSet={`${chauffeurHeroSm} 800w, ${chauffeurHero} 1200w`}
            sizes="100vw"
            alt="Private Chauffeur Service Scotland, The Árdíre Group"
            className="w-full h-full object-cover"
            width={1200}
            height={675}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-background z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-44 w-full">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-foreground/70 mb-4">
              Private Chauffeur Service
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Private Chauffeur Service in Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              A professional driver and a comfortable car, anywhere in Scotland. Airport transfers, days out and everything in between.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Private Chauffeur</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              A car and driver whenever you need one.
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
              We provide a private chauffeur service across Scotland, for a single transfer or for as long as you would like a car and driver. That might be a quiet run from the airport after a long flight, a day exploring at your own pace, or getting a group where it needs to be, on time.
            </p>
            <p>
              Our drivers know the roads and the country, and work with care and discretion. This is the same driving that runs our private tours and golf trips, offered on its own for an hour or a week.
            </p>
          </m.div>
        </div>
      </section>

      {/* How We Can Help */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">How We Can Help</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Whatever the journey, wherever in Scotland.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-8">
              {howWeCanHelp.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-sans font-light text-sm text-muted-foreground max-w-3xl">
              For an hour, a day or a week.
            </p>
          </m.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">What to Expect</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              A journey that runs to your day, not ours.
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
              A professional, discreet driver and a clean, comfortable car suited to your party. If plans change while you are out, your driver adjusts as you go.
            </p>
          </m.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Coming soon.
            </h2>
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
              Before you book a car.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl divide-y divide-border/30"
          >
            {chauffeurFaqs.map((faq, i) => {
              const key = `ch-faq-${i}`;
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
      <section className="py-20 bg-card border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Arrange a Driver</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Tell us where you need to be and when.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Pricing is per journey or per day. Send us the details and we will reply with a quote.
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
