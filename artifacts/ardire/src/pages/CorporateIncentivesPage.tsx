import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";

const programmeDays = [
  {
    day: "Day 1",
    location: "Edinburgh",
    description:
      "The group lands at Edinburgh airport, met on arrival, and taken to a landmark hotel in the heart of the city. After time to settle in, a private evening walk through the closes and hidden corners of the Old Town with a guide who knows its darker history, then dinner at one of the city's best tables.",
  },
  {
    day: "Day 2",
    location: "Stirling, Loch Lomond and the Highlands",
    description:
      "West out of the city, with a private tour of Stirling Castle along the way, and on into Loch Lomond and the Trossachs for a cruise on the loch with lunch aboard. From there the group carries on north into the Highlands to a private castle near Fort William, their home for the next three nights, where the first evening is a gala dinner in the castle.",
  },
  {
    day: "Day 3",
    location: "Glencoe",
    description:
      "A day in the landscape around Glencoe, some of the most dramatic scenery in the country, built around a challenge on a Highland estate: clay shooting, off-road driving and a few events run in the spirit of the Highland Games. Back to the castle for a ceilidh in the evening, which tends to be the night everyone remembers.",
  },
  {
    day: "Day 4",
    location: "Fort William",
    description:
      "A gentler day. A private tour and tasting at a distillery in Fort William, an afternoon to walk, fish or simply take in the surroundings, and a farewell dinner to close the trip properly.",
  },
  {
    day: "Day 5",
    location: "Departure",
    description:
      "A relaxed final morning and a transfer to Glasgow or Inverness for departing flights, with the option to add a night for anyone staying on.",
  },
];

const experiences = [
  "A welcome that sets the tone from the first minute, whether that is a piper as the group arrives or a private dinner on the first evening",
  "Stays in places worth the trip in themselves, from exclusive-use castles and Highland lodges to landmark city hotels",
  "Whisky at its source, with private tastings and the chance to get behind how it is made",
  "Golf on courses your team will be talking about long after, arranged around every level of ability",
  "Days that bring a group together, from Highland Games style challenges to time on the lochs, the islands and the open country",
  "Dinners with a real sense of occasion, a gala evening and a ceilidh among them",
];

const corpFaqs = [
  {
    q: "How far in advance should we start planning?",
    a: "The more notice you give us, the more options we have, particularly for the most sought-after locations and experiences in the summer months. For a trip of three days or more, we recommend coming to us at least four to six months ahead of when you want to travel. That said, we are used to working at shorter notice and can generally put something strong together even with a tighter timeline.",
  },
  {
    q: "How many people can you accommodate?",
    a: "We work with groups of all sizes, from small leadership teams to larger company-wide reward trips. The size of the group shapes some of the choices we make on venues and transport, and we will tell you honestly if something works better at a certain scale.",
  },
  {
    q: "Can the trip be themed around our company or its goals?",
    a: "Yes. If there is a theme, a goal or a message you want the trip to carry, we build it into the experience rather than just the brief. That might mean the welcome, the choice of activities, the way evenings are framed, or the small details that connect the days to each other. A well-designed incentive trip feels purposeful throughout, not just at the gala dinner.",
  },
  {
    q: "Do you handle everything from the moment the group lands?",
    a: "Yes. From the airport welcome to the final transfer home, every part of the trip is ours to plan and run. Flights to Scotland are arranged separately, and everything from arrival onward is taken care of.",
  },
  {
    q: "How does pricing work for a corporate trip?",
    a: "Every programme is priced around what you want to do, so there is no set figure. We work out the cost per person based on group size, the experiences you choose, where you stay, and how you travel. Once we understand your brief, we put together a full, itemised proposal before anything is confirmed.",
  },
  {
    q: "Can you accommodate a mixed group with different interests?",
    a: "Absolutely. Most of our programmes are designed for groups with a range of interests, and we plan the days so that everyone has something they would choose to do. Distillery visits, Highland activities, wildlife, walking, spa time and cultural experiences can all sit alongside each other in a well-built week.",
  },
  {
    q: "Can you arrange photography, video or branded elements for the trip?",
    a: "Yes. We can arrange a photographer for key moments, branded welcome gifts or printed materials, and any touches that make the trip feel like it belongs to your company rather than a generic package. Tell us what matters and we will make it work.",
  },
  {
    q: "What if our numbers change between booking and travel?",
    a: "We build flexibility into the planning wherever we can, and we manage changes as they come up. Some elements, particularly exclusive-use venues, are harder to adjust at short notice, which is why we are honest about what is fixed and what is not from the start.",
  },
  {
    q: "Do you work with incentive travel agencies as well as directly with companies?",
    a: "Yes, we work both ways. If you are coming to us through an agency or working with a travel manager, we are happy to work within that structure. If you are coming to us directly, we handle everything in house from brief to delivery.",
  },
];

export default function CorporateIncentivesPage() {
  const [, navigate] = useLocation();
  const [programmeOpen, setProgrammeOpen] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Corporate Incentive Trips in Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Bespoke corporate incentive trips across Scotland. Golf, whisky, castles and Highland experiences, designed around your goals and run end to end by The ÁrdÍre Group."
    );
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "faq-schema-corp";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": corpFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    });
    document.head.appendChild(faqScript);
    const serviceScript = document.createElement("script");
    serviceScript.type = "application/ld+json";
    serviceScript.id = "service-schema-corp";
    serviceScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Corporate Incentive Trips in Scotland",
      "serviceType": "Corporate Incentive Travel",
      "provider": { "@type": "LocalBusiness", "name": "Árdíre Hospitality Group" },
      "areaServed": "Scotland",
      "description": "Bespoke corporate incentive trips across Scotland. Golf, whisky, castles and Highland experiences, designed around your goals and run end to end.",
      "url": "https://ardire.co.uk/services/corporate-incentives",
    });
    document.head.appendChild(serviceScript);
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev) desc.setAttribute("content", prev);
      document.getElementById("faq-schema-corp")?.remove();
      document.getElementById("service-schema-corp")?.remove();
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
            src={`${import.meta.env.BASE_URL}images/corporate-hero.webp`}
            srcSet={`${import.meta.env.BASE_URL}images/corporate-hero-sm.webp 800w, ${import.meta.env.BASE_URL}images/corporate-hero.webp 1200w`}
            sizes="100vw"
            alt="Corporate Incentives Scotland, The ÁrdÍre Group"
            className="w-full h-full object-cover"
            width={1200}
            height={800}
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
              Corporate Incentives
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Corporate Incentive Trips in Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              Reward a team, motivate your top performers, or bring clients somewhere they will not forget. We design and run the whole trip, from the moment everyone arrives to the day they head home.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Corporate Incentives</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Built around what the trip <span className="italic text-primary">is meant to achieve.</span>
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
              We plan and run corporate incentive trips across Scotland for companies who want to reward people, motivate them, or bring them closer together. You tell us what the trip is meant to achieve, and we build a programme around it, looking after every part as the days unfold.
            </p>
            <p>
              Scotland makes a strong case for itself here. There are few better places to make a group feel genuinely rewarded: world-famous golf, whisky at its source, castles to stay in rather than only visit, and scenery that does a great deal of the work before a single thing is planned. Our part is knowing how to turn all of that into days that run smoothly and land the way you intended.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What It Is For */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              The best incentive trips are built around an outcome rather than just an itinerary, and knowing yours shapes everything we plan. Some companies come to us to reward and recognise the people who have driven their year. Others want to motivate a team toward a shared goal, with something memorable waiting at the end of it, or to strengthen how a group works together away from the office. And some are here to host clients or partners in a way that deepens the relationship for years afterwards. Tell us which of these matters most, or the mix of them, and the trip takes its shape from there.
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
              We plan the programme before anyone travels, then run it while you are here.
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
              We plan the programme before anyone travels, then run it on the ground while you are here, so that on the day your only job is to enjoy it alongside your people.
            </p>
            <p>
              From the welcome at the airport to the final farewell, the detail is ours: the travel between places, the accommodation, the dining, the experiences, and the small touches that make a trip feel considered rather than booked. Everything is planned with you and signed off before it is arranged, and someone is with you throughout, so if anything needs to flex on the day, it is taken care of quietly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What a Trip Can Include */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-10"
          >
            <p>
              Every programme is different, but to give you a sense of what is possible:
            </p>
          </motion.div>
          <motion.div
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
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl"
          >
            We will suggest plenty you would not have thought of, and build in anything you already have in mind.
          </motion.p>
        </div>
      </section>

      {/* Sample Programme */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
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
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-12"
          >
            This is one example for a group of around twelve. It is there to show the shape and standard, not to be taken as a fixed plan. Every trip we build looks different.
          </motion.p>

          <motion.div
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
                <h3 className="font-display text-lg text-foreground">Edinburgh, the Highlands and the West Coast</h3>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="hidden sm:block font-sans text-xs text-muted-foreground">Priced on enquiry</span>
                <ChevronDown
                  className="w-4 h-4 text-primary transition-transform duration-300"
                  style={{ transform: programmeOpen === "corp-5day" ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {programmeOpen === "corp-5day" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-2">
                    {programmeDays.map((item) => (
                      <div key={item.day} className="bg-card border-l border-primary/40 p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                          <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary shrink-0">{item.day}</span>
                          <span className="font-display text-sm text-foreground">{item.location}</span>
                        </div>
                        <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                    <p className="font-sans font-light text-sm text-muted-foreground pt-2 italic">
                      Each day pairs one memorable thing by day with an evening that feels like an occasion, and the whole programme is planned and run on the ground, so the company can be a guest at its own trip rather than its organiser.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
              Built around your goals, your group and the time you have.
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
              There is no set price for an incentive trip, since every programme is built around your goals, your group and the time you have. We can price a programme like the one above as a worked example, so you can picture the cost before committing to anything.
            </p>
            <p>
              Your own figure will reflect the choices you make: where you stay, how you travel, the experiences you build in, and the number of people coming. We put together a full, itemised proposal before anything is confirmed.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Begin Here</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Plan your incentive trip.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us what the trip is meant to achieve, roughly how many are coming and when, and we will design a programme around it and come back to you with a proposal.
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
