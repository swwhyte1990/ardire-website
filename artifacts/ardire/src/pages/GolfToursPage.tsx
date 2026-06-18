import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";

const itinerary = [
  {
    day: "Day 1",
    location: "Arrival, Edinburgh to Angus",
    description:
      "Your driver meets you at Edinburgh Airport. Transfer north to exclusive private accommodation near St Andrews. Time to settle in, take a walk, and decompress from the journey. The evening is a private dinner prepared by the house chef, followed by a full briefing on the week ahead.",
  },
  {
    day: "Day 2",
    location: "St Andrews",
    description:
      "Morning transfer to St Andrews. A visit to the R&A Golf Museum before tee time on the Castle Course, perched on the cliffs above the North Sea. Eighteen holes with views that will distract you from your score. Dinner at the Rock and Spindle. Transfer back to your accommodation.",
  },
  {
    day: "Day 3",
    location: "Carnoustie",
    description:
      "Breakfast at the house, then a short transfer to Carnoustie Golf Links. Your morning includes a historical talk on the course and its Championship history before your round begins. Lunch at the Rookery Restaurant. Carnoustie is harder than it looks on television and we warn clients of this in advance. It is also one of the finest tests of links golf in the world.",
  },
  {
    day: "Day 4",
    location: "Cruden Bay, transfer north",
    description:
      "Cases packed and departure from your St Andrews base. En route north, a stop at Dunnottar Castle on the Aberdeenshire cliff edge, one of the most dramatic ruins in Scotland. Arrival at Cruden Bay Golf Course for an afternoon tee time, then onward transfer to exclusive private accommodation in Aberdeenshire. Evening whisky tasting at the house, dinner, and a briefing for the following day.",
  },
  {
    day: "Day 5",
    location: "Royal Aberdeen",
    description:
      "Morning tour of Aberdeen city, with lunch at The Silver Darling on the harbour front. Afternoon tee time at Royal Aberdeen Golf Links, one of the oldest clubs in the world and a course that rewards patience. Evening gin tasting masterclass back in the city before transfer to the house for dinner.",
  },
  {
    day: "Day 6",
    location: "Braemar",
    description:
      "A day away from the course. Transfer to the Braemar Highland Gathering, the largest and most prestigious Highland Games in Scotland, held annually in the presence of the Royal Family. A genuinely extraordinary afternoon. Transfer back to your accommodation for a final evening dinner.",
  },
  {
    day: "Day 7",
    location: "Edinburgh, departure",
    description:
      "Breakfast at the house, then transfer south to Edinburgh for a final morning in the city. Lunch, a chosen afternoon activity, and check-in at a landmark hotel on the Royal Mile. Dinner at the Tolbooth Tavern, Edinburgh's oldest pub, before a restful last night. Departure transfer to the airport at your chosen time the following morning.",
  },
];


const golfFaqs = [
  {
    q: "Can you get us onto the Old Course at St Andrews?",
    a: "The Old Course is allocated mainly through a daily public ballot, so a place on it can never be guaranteed. What we do is enter the ballot for you and build your St Andrews day around a confirmed round on one of the other Links courses, so the day is wonderful either way and a place on the Old Course is the bonus.",
  },
  {
    q: "How far in advance should we book?",
    a: "As early as you can. Tee times at most courses tend to open around the autumn before the year you want to play, so booking ahead gives you the most flexibility on dates and times, particularly for the well-known courses in summer. Shorter notice is still workable; it simply means fewer options on the busiest tee sheets.",
  },
  {
    q: "Which courses can you arrange?",
    a: "We can arrange rounds at the great majority of Scotland's championship and best-loved courses. A small number can only be played as the guest of a member, and we will always be straight with you about which those are rather than promise something we cannot deliver.",
  },
  {
    q: "What does a golf tour include?",
    a: "From the moment we meet you at the airport to the day you leave, everything is taken care of: private transfers throughout, green fees for your rounds, caddies and clubs where you want them, accommodation chosen for where you are playing next, meals and dining, and any experiences you would like around the golf. You simply play.",
  },
  {
    q: "How many rounds will we play in a week?",
    a: "A typical week runs to four or five rounds, with the other days left for rest, a distillery, sightseeing, or whatever suits the group. We build the pace around you rather than packing the schedule.",
  },
  {
    q: "Do you arrange caddies, clubs and transport between courses?",
    a: "Yes. A private driver looks after you for the whole trip, so you are never finding your own way to an early tee time, and we arrange caddies and club hire wherever you would like them.",
  },
  {
    q: "Can non-golfers come along?",
    a: "Absolutely. We are just as happy planning the days for anyone travelling with you who would rather be at a distillery, a spa, a castle or the coast while the golf is on.",
  },
  {
    q: "How much does a Scotland golf tour cost?",
    a: "Prices vary depending on what you decide to do, so the best guide is our sample itinerary, which is based on a real trip and shows the kind of week you can expect along with its cost. Once we know your plans, we put together a full, itemised proposal before anything is booked.",
  },
  {
    q: "Do you arrange tours for corporate or company groups?",
    a: "Yes. We plan golf trips for companies looking to reward a team or host clients, taking care of the group logistics, the hospitality and the evenings as well as the golf.",
  },
];

export default function GolfToursPage() {
  const [, navigate] = useLocation();
  const [itineraryOpen, setItineraryOpen] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<string | null>(null);

  function goToEnquiry(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setPendingScroll("enquiry");
    navigate("/");
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Private Golf Tours of Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Bespoke private golf tours across Scotland's finest championship links. Tee times, caddies, transfers, and accommodation all arranged by The ÁrdÍre Group."
    );
    const faqScript = document.createElement("script");
    faqScript.type = "application/ld+json";
    faqScript.id = "faq-schema-golf";
    faqScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": golfFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a },
      })),
    });
    document.head.appendChild(faqScript);
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev) desc.setAttribute("content", prev);
      document.getElementById("faq-schema-golf")?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <Navbar />

      {/* Hero */}
      <section id="main-content" className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet={`${import.meta.env.BASE_URL}images/golf-hero-sm.webp`}
              type="image/webp"
            />
            <img
              src={`${import.meta.env.BASE_URL}images/golf-hero.webp`}
              alt="Golfer silhouette at sunset on a Scottish links course"
              className="w-full h-full object-cover"
              width={1920}
              height={1358}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background z-10" />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-44 w-full">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-foreground/70 mb-4">
              Private Touring
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Private Golf Tours of Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              A week on the country's great courses, planned and looked after from the moment we meet you at the airport. You play. We take care of everything around it.
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
            className="mb-12"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">
              For Private Travellers &amp; Companies
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Scotland has the best golf in the world. <span className="italic text-primary">We arrange it properly.</span>
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
              We plan and run private golf tours across Scotland for small groups and individual golfers who want to play the country's finest courses without a thing to organise. You tell us how you like to play and the courses you have always wanted to tick off, and we shape the week around it: the rounds, the cars, the rooms, the dinners and the evenings, all looked after as the days unfold.
            </p>
            <p>
              Scotland is the home of golf, and showing it off is one of the things we love most. Whether you are here to play a lifetime's list of courses or to give a team a few days they will always remember, the week is built around you. You bring your clubs, and we look after the rest.
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
            className="mb-12"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Process</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              We plan the whole trip before you arrive, then look after it while you are here.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="max-w-3xl space-y-6 font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            <p>
              Your tee times are booked in the right order and early enough to get you onto the courses that matter most to you, a private driver takes care of getting you there, and your accommodation is chosen for where you are playing the next morning. Someone is with you through the week who knows your plans, so if the weather turns or you feel like changing something, it is easily done and never yours to worry about.
            </p>
            <p>
              What you bring is the golf you want to play. We bring everything it takes to make the week run beautifully around it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
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
              Built around what you want to play.
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
              There is no set price for a tour, since every week is built around the courses you want to play and the way you want to travel. To give you a sense of what is possible, we have put together a sample itinerary priced as a real example, showing the kind of week you can expect and what it comes to.
            </p>
            <p>
              It is shown per person so you can picture the cost at any group size. Your own figure will reflect the choices you make: the courses, the number of rounds, the standard of where you stay, and the experiences you add around the golf. We put together a full, itemised proposal before anything is booked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sample Itinerary */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Sample Itinerary</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              A real week of golf, written to show the shape and the standard.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-12"
          >
            This is a version of a tour we ran. The courses, order, accommodation, and cultural stops all change depending on your group, your dates, and what matters to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-background border-l-2 border-primary"
          >
            <button
              onClick={() => setItineraryOpen(itineraryOpen === "golf-7day" ? null : "golf-7day")}
              className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
              aria-expanded={itineraryOpen === "golf-7day"}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary shrink-0">Seven Days</span>
                <h3 className="font-display text-lg text-foreground">The East Coast Championship Circuit</h3>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="hidden sm:block font-sans text-xs text-muted-foreground">Guide price £10,000 (+VAT) per person</span>
                <ChevronDown
                  className="w-4 h-4 text-primary transition-transform duration-300"
                  style={{ transform: itineraryOpen === "golf-7day" ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {itineraryOpen === "golf-7day" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-2">
                    {itinerary.map((item) => (
                      <div key={item.day} className="bg-card border-l border-primary/40 p-4 md:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-2">
                          <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary shrink-0">{item.day}</span>
                          <span className="font-display text-sm text-foreground">{item.location}</span>
                        </div>
                        <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                    <p className="font-sans font-light text-sm text-primary pt-2">Guide price £10,000 (+VAT) per person</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
            {golfFaqs.map((faq, i) => {
              const key = `golf-faq-${i}`;
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
              Plan your golf tour.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us when you would like to come, who is travelling, and the courses you have always wanted to play. We will come back to you with a proposal built around it.
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
