import { useEffect, useState, type MouseEvent } from "react";
import { usePageMeta } from "@/lib/usePageMeta";
import faqs from "@/data/faqs.json";
import { useLocation } from "wouter";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";
import { SampleJourney } from "@/components/SampleJourney";
import { SkipToSamples, SAMPLES_ID } from "@/components/SkipToSamples";
import { sampleJourneys } from "@/data/sampleJourneys";
import corporateHeroSm from "@/assets/images/corporate-hero-sm.webp";
import corporateHero from "@/assets/images/corporate-hero.webp";


const experiences = [
  "A welcome that sets the tone, from a piper as the group arrives to a private dinner on the first evening",
  "Stays in places worth the trip in themselves, from exclusive-use castles and Highland lodges to landmark city hotels",
  "Whisky at its source, with private tastings and the chance to get behind how it is made",
  "Golf on courses your team will talk about for years, arranged for every level of ability",
  "Days that bring a group together, from Highland Games style challenges to time on the lochs, the islands and the open country",
  "Dinners with a real sense of occasion, a gala evening and a ceilidh among them",
];

// The FAQ text is shared with the static HTML and its FAQPage schema.
const corpFaqs = faqs["services/corporate-incentives"].items;

export default function CorporateIncentivesPage() {
  usePageMeta("services/corporate-incentives");
  const [, navigate] = useLocation();
  const [programmeOpen, setProgrammeOpen] = useState<string | null>(null);
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
            src={corporateHero}
            srcSet={`${corporateHeroSm} 800w, ${corporateHero} 1200w`}
            sizes="100vw"
            alt="Corporate Incentives Scotland, The Árdíre Group"
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
              Corporate Incentives
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Corporate Incentive Trips in Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              Reward a team, motivate your top performers, or bring clients somewhere they will not forget. We design and run the whole trip, from arrival to the journey home.
            </p>
            <SkipToSamples label="See Sample Journeys" onSkip={() => setProgrammeOpen("corp-5day")} />
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Corporate Incentives</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Built around what the trip <span className="italic text-primary">is meant to achieve.</span>
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
              We plan and run incentive trips across Scotland for companies who want to reward their people, motivate them or bring them closer together. Tell us the aim, and we build the programme and run every part of it.
            </p>
            <p>
              Scotland gives a group plenty to remember: famous golf, whisky at its source, castles to stay in, and scenery that does much of the work. We turn it into days that run smoothly and land as you intended.
            </p>
          </m.div>
        </div>
      </section>

      {/* What It Is For */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Purpose</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Start with the outcome. <span className="italic text-primary">We build from there.</span>
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
              The best incentive trips start with an outcome, and yours shapes everything we plan. Some companies want to reward the people who drove their year. Others want to motivate a team toward a shared goal, or strengthen how a group works together away from the office. Some are here to host clients or partners and deepen the relationship. Tell us which matters most, or the mix, and the trip takes its shape from there.
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
              Planned with you, then run on the ground.
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
              On the ground, we run the programme, so your only job is to enjoy it alongside your people.
            </p>
            <p>
              From the airport welcome to the final farewell, the detail is ours: travel between places, accommodation, dining, experiences and the small touches. Everything is planned with you and signed off before it is booked. Someone is with you throughout, so anything that changes on the day is handled quietly.
            </p>
          </m.div>
        </div>
      </section>

      {/* What a Trip Can Include */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Experience</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              What a trip can include.
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-10"
          >
            <p>
              Every programme is different, but to give you a sense of what is possible:
            </p>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mb-10"
          >
            {experiences.map((item, i) => (
              <div key={i} className="border-l-2 border-primary pl-5">
                <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </m.div>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl"
          >
            We will suggest plenty you would not have thought of, and build in anything you already have in mind.
          </m.p>
        </div>
      </section>

      {/* Sample Programme */}
      <section id={SAMPLES_ID} tabIndex={-1} className="scroll-mt-20 focus:outline-none py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Sample Programme</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              A five-day trip, written to show how a programme comes together.
            </h2>
          </m.div>
          <m.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-12"
          >
            One example, for a group of around twelve. Every programme we build is different.
          </m.p>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-background border-l-2 border-primary"
          >
            <button
              onClick={() => setProgrammeOpen(programmeOpen === "corp-5day" ? null : "corp-5day")}
              className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
              aria-expanded={programmeOpen === "corp-5day"}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary shrink-0">Five Days</span>
                <h3 className="font-display text-lg text-foreground">A Programme in the Highlands</h3>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="hidden sm:block font-sans text-xs text-muted-foreground">Price on enquiry</span>
                <ChevronDown
                  className="w-4 h-4 text-primary transition-transform duration-300"
                  style={{ transform: programmeOpen === "corp-5day" ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {programmeOpen === "corp-5day" && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-8 md:pb-10 pt-2">
                    <SampleJourney journey={sampleJourneys["corporate-highlands"]} />
                  </div>
                </m.div>
              )}
            </AnimatePresence>
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
              Shaped by your goals and your group.
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
              There is no set price for an incentive trip. We can price the sample programme above as a worked example, so you can picture the cost.
            </p>
            <p>
              Your own figure reflects where you stay, how you travel, the experiences you choose and the number coming. We send a full, itemised proposal before anything is confirmed.
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
              {faqs["services/corporate-incentives"].heading}
            </h2>
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl divide-y divide-border/30"
          >
            {corpFaqs.map((faq, i) => {
              const key = `corp-faq-${i}`;
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Begin Here</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Plan your incentive trip.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us what the trip is for, roughly how many are coming and when. We will come back with a proposed programme.
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
