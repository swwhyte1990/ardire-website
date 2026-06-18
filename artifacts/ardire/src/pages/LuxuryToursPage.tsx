import { useEffect, useState, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { setPendingScroll } from "@/lib/pendingScroll";

const itineraries = [
  {
    id: "3-day",
    duration: "Three Days",
    title: "Edinburgh and the Heart of Scotland",
    price: "From £4,500 (+VAT) per person",
    days: [
      {
        day: "Day 1",
        description:
          "We meet you at Edinburgh airport and settle you into the heart of the Old Town. The afternoon is spent wandering its closes and wynds with a guide who knows the stories the crowds walk past, followed by a private evening at Edinburgh Castle and dinner at one of the city's finest tables.",
      },
      {
        day: "Day 2",
        description:
          "A day to the north, taking in Stirling, the Trossachs and the shores of Loch Lomond, with lunch on a private estate and an afternoon to suit you, whether that is falconry, time on the water, or simply the view. Back to the city for the evening.",
      },
      {
        day: "Day 3",
        description:
          "A gentle morning, a last experience chosen to your taste, perhaps a private whisky blending or an hour with the city's best independent shops, and then to your flight.",
      },
    ],
  },
  {
    id: "5-day",
    duration: "Five Days",
    title: "The West Highlands and Skye",
    price: "From £7,500 (+VAT) per person",
    days: [
      {
        day: "Day 1",
        description:
          "We collect you and head north into Glencoe, one of the most striking landscapes in Britain, and settle you at a Highland estate for the night.",
      },
      {
        day: "Day 2",
        description:
          "On through Fort William and along the Road to the Isles, with the Glenfinnan Viaduct along the way, and across to Skye beneath the walls of Eilean Donan.",
      },
      {
        day: "Day 3",
        description:
          "A full day on Skye with a guide who knows it intimately: the Trotternish ridge, the Quiraing, the Fairy Pools, and a tasting at Talisker arranged in your own time rather than the crowd's.",
      },
      {
        day: "Day 4",
        description:
          "East toward Loch Ness and Inverness, then into Speyside, with a castle for the night and a dinner to match the setting.",
      },
      {
        day: "Day 5",
        description:
          "A quiet morning at a distillery that opens its doors for you, and then to your flight from Inverness.",
      },
    ],
  },
  {
    id: "7-day",
    duration: "Seven Days",
    title: "The Grand Sweep, South to Far North",
    price: "From £10,000 (+VAT) per person",
    days: [
      {
        day: "Day 1",
        description:
          "Arrival in Edinburgh, the Old Town with a private guide, the castle, and a dinner to set the tone for the week.",
      },
      {
        day: "Day 2",
        description:
          "North through Stirling and Glencoe into the Highlands, a private estate for the night, and the first real sense of the scale of the place.",
      },
      {
        day: "Day 3",
        description:
          "Skye, with its ridges and pools and a tasting at Talisker, and a night on the island.",
      },
      {
        day: "Day 4",
        description:
          "Onto the great coastal road of the northwest, through Torridon and Ullapool, with mountains on one side and sea on the other, and the best room on the route waiting at the end of the drive.",
      },
      {
        day: "Day 5",
        description:
          "The north coast itself, its empty beaches and Dunrobin Castle and the distilleries few visitors reach, before turning south toward Speyside.",
      },
      {
        day: "Day 6",
        description:
          "A day of Speyside whisky done the way it should be, with private tastings and a cask or two off the usual path, and a castle dinner in the Cairngorms to close the week.",
      },
      {
        day: "Day 7",
        description: "A final morning at leisure and the journey south to your flight.",
      },
    ],
  },
];

const included = [
  "A private driver and transfers throughout",
  "Accommodation chosen for its standard and its setting",
  "Meals and dining, with a private chef whenever you would like one",
  "Guides, experiences and access arranged around your interests",
  "Every booking, ticket and reservation handled ahead of time",
  "Someone looking after your trip on the ground throughout, whenever you need them",
];

export default function LuxuryToursPage() {
  const [, navigate] = useLocation();
  const [openItinerary, setOpenItinerary] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Private Tours of Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Bespoke private tours of Scotland designed around you. Highlands, islands, whisky, castles and more, planned and run end to end by The ÁrdÍre Group."
    );
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev) desc.setAttribute("content", prev);
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
            alt="Private Tours of Scotland — The ÁrdÍre Group"
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
              Private Touring
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              Private Tours of Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              Tell us the Scotland you have always wanted to see, and we will build it around you. From the moment we meet you at the airport, every day is ours to plan and yours to enjoy.
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
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Private Touring</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Built entirely <span className="italic text-primary">around you.</span>
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
              We design private tours of Scotland for people who want to see it properly, at their own pace, with everything taken care of. You tell us what matters to you, the places, the kind of days, the things you have always meant to do, and we shape a journey around it.
            </p>
            <p>
              This is a country we know well and love showing off, and most of that love is in the detail: the right glen on the right morning, the dinner worth driving for, the distillery that will open a door for you. Some of our guests arrive knowing exactly what they want. Most come with a few ideas and let us fill in the rest. Either way is the right way to begin.
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
              From the moment we greet you to the day you head home.
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
              We take care of the itinerary, the bookings, the rooms, the meals and the experiences, and we look after all of it as the days unfold. You will have someone with you who knows your plans and your preferences, a private driver between places, and the freedom to change your mind whenever you like. If the weather turns or a mood takes you somewhere new, we simply rework the day around it.
            </p>
            <p>
              What you bring is the sense of what you want. We bring everything it takes to make it happen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Come With an Idea */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Start With Something</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Bring the idea. <span className="italic text-primary">We build around it.</span>
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
              The best trips tend to start with something you already love: a place you have seen in a film, a whisky you have always drunk, a castle, a coastline, a name on a map. Bring that to us, and we will build outward from it with the things you would not have thought to ask for.
            </p>
            <p>
              You want to see Skye, and we know the hour to be at the Quiraing before the crowds arrive. You want a day of whisky, and we know the distillery that will set aside a quiet room and a cask the public never reach. You want somewhere to remember for an anniversary, and we know the table, the view and the chef worth the journey. The idea is yours. The knowledge around it is ours to add.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Sample Journeys */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Sample Itineraries</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Three journeys written to give you a feel for the range.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-12"
          >
            These are real journeys we can build, written to spark a few ideas of your own. Nothing here is fixed. The length, the places and the pace are all yours to shape.
          </motion.p>

          <div className="space-y-3">
            {itineraries.map((itin, i) => (
              <motion.div
                key={itin.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
                className="bg-background border-l-2 border-primary"
              >
                <button
                  onClick={() => setOpenItinerary(openItinerary === itin.id ? null : itin.id)}
                  className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
                  aria-expanded={openItinerary === itin.id}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 min-w-0">
                    <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary shrink-0">{itin.duration}</span>
                    <h3 className="font-display text-lg text-foreground">{itin.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden sm:block font-sans text-xs text-muted-foreground">{itin.price}</span>
                    <ChevronDown
                      className="w-4 h-4 text-primary transition-transform duration-300"
                      style={{ transform: openItinerary === itin.id ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openItinerary === itin.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-2">
                        {itin.days.map((item) => (
                          <div key={item.day} className="bg-card border-l border-primary/40 p-4 md:p-6">
                            <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary block mb-2">{item.day}</span>
                            <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                          </div>
                        ))}
                        <p className="font-sans font-light text-sm text-primary pt-2">{itin.price}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Can Arrange */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">The Scope</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              There is very little we cannot arrange.
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
              There is very little we cannot arrange when it matters to you. A private chef in a castle you have to yourselves. A helicopter to turn a long drive into a short hop. A distillery opened after hours. The leading authority on the one thing you most want to understand.
            </p>
            <p>
              As we grow, those possibilities only widen, and the ceiling rises at the very top end. What you are paying for is not a list of suppliers but the fact that we can make these things happen at all, quietly and well, to a standard that would be hard to reach on your own.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included + Pricing */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-2">What's Included</p>
              <p className="font-sans font-light text-sm text-muted-foreground mb-6">
                From the moment you land to the moment you leave, everything is taken care of:
              </p>
              <div className="space-y-4 mb-8">
                {included.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans font-light text-sm text-muted-foreground">
                You simply arrive. We take care of the rest.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Pricing</p>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Three days", price: "From £4,500 (+VAT) per person" },
                  { label: "Five days", price: "From £7,500 (+VAT) per person" },
                  { label: "Seven days", price: "From £10,000 (+VAT) per person" },
                ].map((tier) => (
                  <div key={tier.label} className="flex items-baseline justify-between border-b border-border/30 pb-4">
                    <span className="font-sans font-light text-sm text-muted-foreground">{tier.label}</span>
                    <span className="font-display text-base text-primary">{tier.price}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">
                Each based on a small group travelling together. Where your own trip settles depends on the choices you make along the way. Travelling as a group brings the per-person figure down, since the car, the driver and the planning are shared across more of you. We will put together a full proposal, costed in detail, before anything is confirmed.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">Begin Here</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Start with an idea.
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Tell us when you would like to come, who is travelling, and the one thing you most want this trip to be. We will design the rest around it and come back to you with a proposal.
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
