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
          "We collect you from Edinburgh airport and settle you into a suite in the Old Town. An afternoon walking the closes and wynds with a guide who knows the history that the tour groups miss, then a private evening visit to Edinburgh Castle before a Michelin-level dinner in the city.",
      },
      {
        day: "Day 2",
        description:
          "North for the day: Stirling and its castle, the Trossachs, and the shores of Loch Lomond, with a stop on a private estate for lunch and a Highland experience chosen to suit you, whether that is falconry, a stalk, or a quiet afternoon on the water. Back to Edinburgh for the evening.",
      },
      {
        day: "Day 3",
        description:
          "A relaxed morning, a final experience to your taste (a private whisky blending session, time with the city's best independent shops, or simply rest), and a transfer to your flight.",
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
          "Collected from Glasgow or Edinburgh and driven north into Glencoe, one of the most dramatic landscapes in Britain. A night at a Highland estate, dinner by the fire.",
      },
      {
        day: "Day 2",
        description:
          "Through Fort William and along the Road to the Isles, with the Glenfinnan Viaduct on the way. Onward to Skye, crossing under the shadow of Eilean Donan Castle. A night on the island.",
      },
      {
        day: "Day 3",
        description:
          "A full day on Skye with a private guide: the Trotternish ridge, the Quiraing, the Fairy Pools, and a tasting at Talisker arranged away from the crowds. The kind of day that ends with you understanding why people never forget this island.",
      },
      {
        day: "Day 4",
        description:
          "East toward Loch Ness and Inverness, then into Speyside, with a castle hotel for the night and a dinner to match it.",
      },
      {
        day: "Day 5",
        description:
          "A private morning at a distillery that opens its doors for you rather than the public, and a transfer from Inverness to your flight.",
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
          "Arrival in Edinburgh, the Old Town by private guide, the castle, and a dinner that sets the tone for the week.",
      },
      {
        day: "Day 2",
        description:
          "North through Stirling and Glencoe into the Highlands, a private estate for the night, and the first proper sense of the scale of the place.",
      },
      {
        day: "Day 3",
        description:
          "Skye: the Trotternish, the Quiraing, Talisker, and a night on the island.",
      },
      {
        day: "Day 4",
        description:
          "Onto the far northwest and the start of the great coastal road, through Torridon and Ullapool, mountains on one side and sea on the other, with the best room on the route waiting at the end of the drive.",
      },
      {
        day: "Day 5",
        description:
          "The north coast itself: empty white beaches, Dunrobin Castle, and distilleries that see few visitors, before turning south toward Speyside.",
      },
      {
        day: "Day 6",
        description:
          "A Speyside whisky day done the way it should be, private tastings and a cask or two the public never reach, then a castle dinner in the Cairngorms to close the week.",
      },
      {
        day: "Day 7",
        description: "A final morning at leisure and the drive south to your flight.",
      },
    ],
  },
];

const included = [
  "Private transfers throughout, with a driver for the full trip",
  "Accommodation across the stay, chosen for standard and for location",
  "Meals, including booked restaurants and a private chef where you want one",
  "Guides, experiences and access arranged around your interests",
  "All bookings, tickets and entries handled in advance",
  "One dedicated coordinator on the ground, reachable at any hour",
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
              You decide what Scotland means to you. We design the days around it, arrange everything worth arranging, and run the whole trip from arrival to departure. You travel. We handle the rest.
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
              A private tour is built entirely around you: what you want to see, the pace you want to keep, and the kind of days you want to have. We plan the itinerary, secure every booking, arrange the transport, the rooms, the meals and the experiences, and manage all of it on the ground so that for the length of your stay there is nothing to organise and nothing to chase.
            </p>
            <p>
              Most of our travellers come from abroad for a trip they have been meaning to take for years. Some know exactly what they want. Most have a few ideas and trust us to build the rest. Both are how it should start.
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
              We plan the trip before you arrive and run it while you are here.
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
              You get one coordinator for the whole stay, one person who knows your itinerary, your preferences and your plans for tomorrow. A private driver moves you between places, so you are never navigating, parking, or watching the clock. Accommodation is chosen for where you are the next morning and for the standard you expect. When something changes, the weather, your mood, a booking, we adjust it and you barely notice.
            </p>
            <p>
              We collect you from the airport. From that point until we drive you back, the days are ours to run and yours to enjoy.
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
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="max-w-3xl font-sans font-light text-muted-foreground leading-relaxed text-base"
          >
            The best trips start with something you already want: a place you have seen in a film, a whisky you have always drunk, a castle, a coastline, a name on a map. Bring that, and our job is to build outward from it with things you would not have known to ask for. You want to see Skye; we know the hour to be at the Quiraing before the coaches. You want a whisky day; we know which distillery will open a room and a cask that the public never see. You want somewhere memorable for an anniversary dinner; we know the table, the view, and the chef worth the detour. The idea is yours. The knowledge around it is what you are paying for.
          </motion.p>
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
              Three journeys written to show the range and the standard.
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl mb-12"
          >
            These are real, buildable itineraries written to show the range and the standard, not to be taken exactly as they are. Lengths, places and pace are all yours to set.
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
              A private chef in a castle you have to yourselves. A helicopter to skip a long drive. A distillery opened after hours. A table that is not taking bookings. A guide who is the leading authority on the thing you care about.
            </p>
            <p>
              As we grow, our relationships deepen, and that raises what is possible at the very top end. It does not lower the price, because what you are paying for is not a discount someone passed to us. It is that we can make these things happen at all, quietly, reliably, and to a standard you would not reach on your own. That capability is the product. The exclusivity is the point.
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
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-6">What's Included</p>
              <div className="space-y-4 mb-8">
                {included.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-sans font-light text-sm text-muted-foreground">
                Flights to Scotland are arranged separately. Everything from the moment you land is taken care of.
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
                Based on a small group travelling together. A larger party brings the per-person figure down, because the car, the driver and the planning are shared across more of you. Every trip is quoted in full and itemised before anything is booked.
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
              Tell us when you want to come, who is travelling, and the one thing you most want this trip to be. We will design the rest around it and come back with a proposal.
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
