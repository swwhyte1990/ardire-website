import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";

const howWeCanHelp = [
  "Airport transfers, where you are met on arrival and looked after all the way to the door",
  "A car and driver for the day, or for several, to explore at your own pace with no route to plan",
  "Getting between courses, dinners and events comfortably and on time",
  "Reliable, considered transport for groups, occasions and corporate days",
];

const chauffeurFaqs = [
  {
    q: "What areas of Scotland do you cover?",
    a: "We are based in Glasgow and cover the whole of Scotland, from the cities to the Highlands and islands, travelling wherever suits you. Whether it is a short transfer in town or a day's drive across the country, we plan the journey around where you need to be.",
  },
  {
    q: "What kind of vehicles do you provide?",
    a: "We provide a vehicle to suit your party, from an executive saloon for one or two passengers, to a larger luxury car or SUV, to a people carrier for a group with luggage. Tell us how many of you there are and what you have planned, and we will match the right car to it.",
  },
  {
    q: "How many passengers can you take?",
    a: "Anything from a single passenger to a group of seven, depending on the vehicle. For larger parties, we can arrange more than one car so everyone travels together.",
  },
  {
    q: "Will you meet us at the airport?",
    a: "Yes. On airport pickups we meet you on arrival, keep an eye on your flight in case it lands early or late, and look after you and your luggage all the way to the car. You step off the plane and the rest is taken care of.",
  },
  {
    q: "Can we hire a car and driver for a full day, or longer?",
    a: "Of course. As well as transfers, we provide a car and driver by the day, or for several, so you can explore at your own pace with nothing to plan and no route to navigate. We simply take you where you would like to go.",
  },
  {
    q: "Do you provide transfers for golf trips and events?",
    a: "Yes. We look after getting you between courses, dinners and events comfortably and on time, so nobody is watching the clock or finding their own way to an early tee. It often works alongside our golf tours and event services, whether as part of a trip we have planned for you or simply the driving for one you are running yourself.",
  },
  {
    q: "What is included?",
    a: "Your driver, the vehicle, fuel and parking, and on airport pickups, the meet and greet and flight tracking. There is water and refreshments in the car, and the journey is planned around your day rather than a fixed timetable.",
  },
  {
    q: "How far ahead should we book?",
    a: "The more notice you can give us, the better, particularly in the busy summer months and around major events, when cars are in demand. Shorter notice is often workable too, so it is always worth asking.",
  },
];

export default function PrivateChauffeurPage() {
  const [, navigate] = useLocation();
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Private Chauffeur Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Private chauffeur service across Scotland. Airport transfers, days out and group transport, driven by professionals who know the country."
    );
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
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev !== null) desc.setAttribute("content", prev);
      document.getElementById("faq-schema-private-chauffeur")?.remove();
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
            src={`${import.meta.env.BASE_URL}images/chauffeur-hero.webp`}
            alt="Private Chauffeur Service Scotland — The ÁrdÍre Group"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-background z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-44 w-full">
          <motion.div
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
              A professional driver and a comfortable car whenever you want to be somewhere without thinking about how to get there. Airport transfers, days out, and everything in between.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Private Chauffeur</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              A car and driver whenever you need one.
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
              We provide a private chauffeur service across Scotland, for a single transfer or for as long as you would like a car and driver at your disposal. That might be a quiet, comfortable run from the airport after a long flight, a day spent exploring at your own pace, or getting a group where it needs to be without anyone watching the clock.
            </p>
            <p>
              Our drivers know the roads and the country, and they bring the same care and discretion we put into everything we do. The driving that looks after our private tours and golf trips is the same service we offer on its own here, so you are in experienced hands whether you need us for an hour or a week.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How We Can Help */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">How We Can Help</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Whatever the journey, we plan it around you.
            </h2>
          </motion.div>
          <motion.div
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
              Wherever you are headed and however long you need us, we plan the journey around you rather than a timetable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              A professional and discreet driver, a clean and comfortable vehicle suited to the size of your party, and a journey that runs to your day rather than ours. If plans change while you are out, that is no trouble; we simply adjust as we go.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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

      {/* CTA */}
      <section className="py-20 bg-card border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
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
              Pricing is quoted per journey or per day. Tell us where you need to be and when, and we will take care of the rest.
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
