import { useEffect, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
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

const included = [
  "All tee times across four championship venues",
  "Experienced, course-licensed caddies at each round",
  "Private chauffeured transfers throughout the week",
  "Five-star and boutique estate hotel accommodation",
  "Welcome dinner and selected dining reservations",
  "Airport meet-and-greet on arrival",
  "A dedicated ÁrdÍre contact available throughout",
];

export default function GolfToursPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Private Golf Tours of Scotland | The ÁrdÍre Group";
    const desc = document.querySelector('meta[name="description"]');
    const prev = desc?.getAttribute("content") ?? null;
    desc?.setAttribute(
      "content",
      "Bespoke private golf tours across Scotland's finest championship links. Tee times, caddies, transfers, and accommodation — all arranged by The ÁrdÍre Group."
    );
    return () => {
      document.title = "Luxury Private Tours & Event Management | Scotland & Beyond";
      if (desc && prev) desc.setAttribute("content", prev);
    };
  }, []);

  function goToEnquiry(e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) {
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
            alt="Private Golf Tours of Scotland — The ÁrdÍre Group"
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
              Private Golf Tours of Scotland
            </h1>
            <p className="font-sans text-base md:text-lg text-foreground/80 max-w-xl leading-relaxed">
              A week of championship golf, planned and run end to end. You arrive at the airport. We handle everything between that and your flight home.
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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="lg:col-span-3 space-y-6 font-sans font-light text-muted-foreground leading-relaxed text-base"
            >
              <p>
                We design and run private golf tours across Scotland for small groups and individual travellers. Most of our clients are serious golfers who have always wanted to play the great Scottish links but have never had the time or inclination to organise it themselves. That is where we come in.
              </p>
              <p>
                Scotland is not a straightforward destination for golf. The Old Course ballot at St Andrews is genuinely unpredictable. Carnoustie and Muirfield have specific guest policies. The logistics of moving between the east coast, Ayrshire, and the Highlands while staying somewhere decent at each stop require real knowledge of what works and what looks good on paper but disappoints in practice.
              </p>
              <p>
                We have done this enough times that we know what to avoid and who to call. Our clients arrive, play exceptional golf on courses they have watched on television for years, and go home having had an experience that would have taken months to arrange themselves and would not have been as good.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card border border-border/50 p-8 h-full">
                <div className="w-8 h-px bg-primary mb-8" />
                <div className="space-y-6">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-3">You bring</p>
                    <ul className="space-y-2 font-sans font-light text-sm text-muted-foreground">
                      <li>Your clubs (or we hire them)</li>
                      <li>Your flights into Scotland</li>
                      <li>Your list of courses</li>
                      <li>Your group</li>
                    </ul>
                  </div>
                  <div className="w-full h-px bg-border/40" />
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-3">We do</p>
                    <ul className="space-y-2 font-sans font-light text-sm text-muted-foreground">
                      <li>Tee times and club access</li>
                      <li>Caddies at every round</li>
                      <li>All transfers and logistics</li>
                      <li>Hotels and dining</li>
                      <li>Airport pickup and drop-off</li>
                      <li>Everything else</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              We plan the whole trip before you land, then run it while you are here.
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
              We begin with a conversation. You tell us who is coming, how many days you have, which courses matter most to you, and how much you want organised versus how much you want to handle yourselves. Some clients want every evening planned. Others want tee times and transfers and nothing else. We build around what you actually want.
            </p>
            <p>
              From there, we secure the tee times. This is the part that requires the most lead time, and where local relationships matter most. The Old Course ballot is genuinely uncertain, but we have access to priority windows and preferred visitor slots at most major venues that are not available through direct booking. We are honest about what we can guarantee and what we cannot.
            </p>
            <p>
              Once the golf is confirmed, we build the accommodation and transfers around it. We use hotels and estate properties that we know well, which means you get honest recommendations rather than whatever happens to be available. Transport between venues is handled by our own drivers.
            </p>
            <p>
              On the day you arrive, one of our team meets you. From that point until your departure transfer, you have a single contact for anything that comes up. If a tee time shifts, we adjust. If you want to add a dinner or change a plan, we sort it. The point is that you are golfing, not managing logistics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sample Week */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Sample Itinerary</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              A seven-day tour, written to show the shape and standard.
            </h2>
          </motion.div>

          <div className="space-y-4">
            {itinerary.map((item, i) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.06 }}
                className="bg-card border-l-2 border-primary p-6 md:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-3">
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-primary">{item.day}</span>
                  <h3 className="font-display text-lg text-foreground">{item.location}</h3>
                </div>
                <p className="font-sans font-light text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 font-sans font-light text-sm text-muted-foreground italic max-w-2xl"
          >
            This is a version of a tour we ran. The courses, order, accommodation, and cultural stops all change depending on your group, your dates, and what matters to you. We use this to show the shape and standard of what we put together, not to sell you a fixed product.
          </motion.p>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">What's Included</p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground max-w-2xl">
              Everything from arrival to departure except your flights.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mb-8">
            {included.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.07 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-sans font-light text-sm text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans font-light text-sm text-muted-foreground max-w-2xl"
          >
            You arrange your own flights into Scotland. From the arrivals hall onward, the week is ours to run.
          </motion.p>
        </div>
      </section>

      {/* Courses & Pricing */}
      <section className="py-24 md:py-32 bg-background border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Courses & Timing */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Courses &amp; Access</p>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                Courses and timing, honestly.
              </h3>
              <div className="space-y-6 font-sans font-light text-muted-foreground leading-relaxed text-sm">
                <p>
                  The Old Course at St Andrews operates a public ballot for unaffiliated visitors. We enter on your behalf, and the success rate varies by time of year. Between October and March, the chances are good. In peak summer, they are lower. We will tell you honestly what the likelihood is for your specific dates, and we always have alternatives lined up so that your trip does not hinge on a single outcome.
                </p>
                <p>
                  Courses such as Muirfield and Royal Troon have their own guest policies, some of which require advance planning of several months. Carnoustie, Kingsbarns, Dundonald Links, Royal Dornoch, and Askernish on South Uist are accessible with the right contacts and enough notice. We know which ones to approach and how.
                </p>
                <p>
                  We do not promise courses we cannot deliver. If a course is unavailable for your dates, we will tell you and offer a genuine alternative that is worth the visit in its own right. There are more outstanding links in Scotland than most visitors ever get to play.
                </p>
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <div className="bg-card border border-border/50 p-8 md:p-10">
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-2">From</p>
                <p className="font-display text-4xl md:text-5xl text-foreground mb-2">£10,000</p>
                <p className="font-sans font-light text-sm text-muted-foreground mb-8">Per person, seven-day private tour</p>

                <div className="w-full h-px bg-border/40 mb-8" />

                <div className="space-y-4 font-sans font-light text-sm text-muted-foreground leading-relaxed mb-8">
                  <p>
                    Pricing reflects the scope of what is arranged: tee times at championship venues, caddies, private transfers, five-star accommodation, and a dedicated contact from arrival to departure. The figure varies based on group size, course selection, and the standard of hotel you want.
                  </p>
                  <p>
                    We provide a full, itemised quote once we know the details of your trip. Nothing is added afterwards that we have not discussed upfront. If the budget needs to flex in either direction, we are straightforward about what that means for the itinerary.
                  </p>
                </div>

                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs h-14 rounded-none transition-all duration-300"
                >
                  <a href="/#enquiry" onClick={goToEnquiry}>Plan Your Golf Tour</a>
                </Button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* For Companies */}
      <section className="py-24 md:py-32 bg-card border-t border-border/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary text-xs mb-4">Corporate &amp; Incentive Groups</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-8">
                The same operation. A different goal.
              </h2>
              <p className="font-sans font-light text-muted-foreground leading-relaxed text-base mb-10">
                We run corporate golf tours for companies who want to reward their people or entertain clients at a level that leaves a genuine impression. The logistics are identical to our private tours, but the brief is different: we build in the elements that make a group trip memorable rather than just functional. Gala dinners, whisky experiences, and team moments alongside the golf itself. If you are looking at this as an incentive programme or a client entertainment trip, contact us and we will talk through what that looks like for your group.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
              >
                <a href="/#enquiry" onClick={goToEnquiry}>Talk to us about a corporate trip</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
