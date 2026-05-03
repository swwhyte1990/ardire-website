import { useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  FileText,
  Sparkles,
  Compass,
  Check,
  X,
} from "lucide-react";

interface Itinerary {
  title: string;
  duration: string;
  fromPrice: string;
  image: string;
  blurb: string;
  days: { label: string; text: string }[];
}

const itineraries: Itinerary[] = [
  {
    title: "The Highland Weekend",
    duration: "3 days · 2 nights",
    fromPrice: "From £4,200 pp",
    image: "/images/hero-home.webp",
    blurb: "A short, dramatic introduction to the western Highlands.",
    days: [
      { label: "Day 1", text: "Glasgow collection. Scenic transfer via Loch Lomond and Glen Coe to a private estate near Fort William. Welcome dinner with the estate's chef." },
      { label: "Day 2", text: "Private tour of Glencoe and Rannoch Moor by Range Rover with your guide. Picnic lunch on the moor. Afternoon whisky tasting at a working distillery; evening at leisure." },
      { label: "Day 3", text: "Stirling Castle and a quiet visit to the Wallace Monument. Late lunch en route, return transfer to Glasgow or Edinburgh." },
    ],
  },
  {
    title: "The Old Course Pilgrimage",
    duration: "4 days · 3 nights",
    fromPrice: "From £8,400 pp",
    image: "/images/hero.webp",
    blurb: "St Andrews and Fife, played and explored properly.",
    days: [
      { label: "Day 1", text: "Edinburgh arrival, private transfer to St Andrews. Welcome dinner at the Old Course Hotel." },
      { label: "Day 2", text: "Round at the Old Course (advance ballot arranged). Caddie-led walking tour of the town and University in the afternoon." },
      { label: "Day 3", text: "Round at Kingsbarns. Afternoon at the British Golf Museum, dinner at a private club." },
      { label: "Day 4", text: "Round at Carnoustie. Late lunch and return transfer to Edinburgh." },
    ],
  },
  {
    title: "The North Coast 500 in Style",
    duration: "7 days · 6 nights",
    fromPrice: "From £14,500 pp",
    image: "/images/about.webp",
    blurb: "Scotland's signature drive — at our pace, in our cars, with our access.",
    days: [
      { label: "Day 1", text: "Inverness arrival, private transfer, welcome dinner at a Highland country house hotel." },
      { label: "Day 2", text: "East coast: Inverness to Dornoch via Glenmorangie. Round of golf or coastal walk." },
      { label: "Day 3", text: "North coast: Dornoch to John o'Groats. Stops at Dunrobin Castle and Whaligoe Steps." },
      { label: "Day 4", text: "Far north: Durness, Smoo Cave, Cape Wrath. Optional helicopter excursion." },
      { label: "Day 5", text: "West coast: Ullapool, Inverpolly, Achiltibuie. Seafood lunch on the harbour." },
      { label: "Day 6", text: "Applecross pass, Bealach na Bà, Skye crossing for an afternoon and dinner." },
      { label: "Day 7", text: "Return south via Loch Ness, late lunch, transfer to Inverness or Glasgow." },
    ],
  },
];

function ItineraryCard({ item }: { item: Itinerary }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)]">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-7">
        <h3 className="font-['Cinzel'] text-2xl text-[hsl(43_80%_65%)] mb-2">{item.title}</h3>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 mb-4">
          {item.duration} · {item.fromPrice}
        </p>
        <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5">{item.blurb}</p>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white transition-colors"
        >
          {open ? "Hide full itinerary" : "See full itinerary"}
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="mt-6 pt-6 border-t border-[hsl(43_80%_65%)]/15 space-y-4">
            {item.days.map((d) => (
              <div key={d.label}>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)] mb-1.5">
                  {d.label}
                </p>
                <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{d.text}</p>
              </div>
            ))}
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white"
            >
              Plan a version of this
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

const processSteps = [
  {
    icon: MessageSquare,
    label: "01 · Conversation",
    text: "A relaxed call or email exchange. We learn what matters — pace, interests, party, anything you've already loved or want to avoid.",
  },
  {
    icon: FileText,
    label: "02 · Proposal",
    text: "Within five working days, a written proposal: a draft day-by-day itinerary, accommodation options, transport, and a clear all-inclusive quote.",
  },
  {
    icon: Sparkles,
    label: "03 · Refinement",
    text: "We adjust as much as you wish. Swap a day, add a round, change a hotel — until the journey reads exactly the way you want it to.",
  },
  {
    icon: Compass,
    label: "04 · Journey",
    text: "Your guide and chauffeur look after every detail on the ground. We remain on a 24/7 line throughout — flexing the plan as the days unfold.",
  },
];

const included = [
  "Private guide and chauffeur for the duration",
  "Luxury vehicle (Range Rover, Mercedes V-Class, or equivalent)",
  "All accommodation in hand-picked hotels and country houses",
  "All meals and beverages on tour, including reservations",
  "Entry to estates, distilleries, and private locations",
  "24/7 concierge support throughout the journey",
];

const notIncluded = [
  "International flights to and from Scotland",
  "Personal travel insurance",
  "Optional add-ons (helicopter charters, gala tickets)",
  "Gratuities (entirely at your discretion)",
];

const faqs = [
  {
    q: "How far in advance should we book?",
    a: "For peak season (May–September) and golf at championship venues, six to nine months is ideal. We do take shorter-notice enquiries year-round and will be honest about what is realistic.",
  },
  {
    q: "Can the itinerary change once we are travelling?",
    a: "Yes. The whole point of a privately guided tour is that the day belongs to you. Your guide can adjust pacing, add or skip stops, and rebook on the move where weather or mood demands it.",
  },
  {
    q: "What size of party do you cater for?",
    a: "Most of our private tours are designed for one to six guests in a single vehicle. Larger parties are arranged as a small fleet with multiple guides — please ask.",
  },
  {
    q: "Why don't you publish fixed prices?",
    a: "Because no two tours are the same. The honest answer is that a real quote depends on the season, the hotels you choose, the access you need, and the length. We give you a clear all-inclusive figure once we understand the brief.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[hsl(43_80%_65%)]/15">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-['Cinzel'] text-lg text-[hsl(43_80%_65%)]">{q}</span>
        <ChevronDown
          className={`w-4 h-4 mt-1.5 shrink-0 text-[hsl(43_80%_65%)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed max-w-3xl">{a}</p>
      )}
    </div>
  );
}

export default function LuxuryToursAfter() {
  return (
    <div className="min-h-screen bg-[hsl(155_58%_7%)] text-[hsl(43_80%_65%)] font-['Raleway'] pb-20">
      {/* Header */}
      <header className="border-b border-[hsl(43_80%_65%)]/15">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-2">
            <span className="font-['Cinzel'] text-2xl tracking-[0.15em] text-[hsl(43_80%_65%)]">
              ÁRDÍRE
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em]">
            <a href="#" className="text-[hsl(43_80%_65%)] hover:text-white">Travel</a>
            <a href="#" className="text-[hsl(43_80%_65%)] hover:text-white">Events</a>
            <a href="#" className="text-[hsl(43_80%_65%)] hover:text-white">Journal</a>
            <a href="#" className="text-[hsl(43_80%_65%)] hover:text-white">About</a>
          </nav>
          <a
            href="#enquire"
            className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-[hsl(43_80%_65%)]/90"
          >
            Make an Enquiry
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-home.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)]/70 via-[hsl(155_58%_7%)]/50 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">
            Travel &amp; Tours / Luxury Tours
          </p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">
            Luxury Tours<br />of Scotland
          </h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">Scotland. Expertly Guided.</p>
        </div>
      </section>

      {/* Bespoke pricing line — no starting price; refers to sample itineraries */}
      <section className="border-b border-[hsl(43_80%_65%)]/15 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">
            On Pricing
          </p>
          <p className="font-['Cinzel'] text-2xl md:text-3xl text-[hsl(43_80%_65%)] leading-snug mb-4">
            We don't sell from a price list.
          </p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed max-w-2xl mx-auto">
            Every tour is built from scratch around what you want to do, where you want
            to stay, and how you want to travel. We book what you want — it costs what
            it costs — and we price it at the end, in writing, before you commit to
            anything. The <a href="#itineraries" className="underline underline-offset-4 decoration-[hsl(43_80%_65%)]/40 hover:decoration-[hsl(43_80%_65%)]">sample itineraries below</a> use real
            accommodation, transport, and access, so they give you an honest sense of
            what a journey of that shape might cost.
          </p>
          <a
            href="#enquire"
            className="inline-flex items-center gap-2 mt-7 bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-7 py-3.5 hover:bg-[hsl(43_80%_65%)]/90"
          >
            Plan Your Tour
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Intro + Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">
              About a Privately Guided Tour
            </p>
            <p>
              A country is best understood through the people who know it intimately. Our
              private tours of Scotland are designed for those who want to experience the
              landscape, the history, and the culture without the friction of modern travel.
            </p>
            <p>
              We provide expert guiding, seamless logistics, and access to places often
              closed to the public — from working estates and private distilleries to small
              hotels and country houses with no online booking system.
            </p>
            <p>
              From the moment you arrive in Glasgow, Edinburgh, or Inverness to the moment
              you leave, the journey is yours. We simply make sure every detail of it works.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">
              Tour Highlights
            </p>
            <ul className="space-y-3.5">
              {[
                "Private, expert guides with deep local knowledge",
                "Premium transport: Range Rover, Mercedes V-Class, or helicopter",
                "Access to privately-owned estates, distilleries, and restricted locations",
                "Bespoke daily itineraries adjusted as you travel",
                "Fine dining and curated accommodation throughout",
                "A dedicated concierge available 24/7 for the duration",
              ].map((h) => (
                <li key={h} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85">
                  <span className="text-[hsl(43_80%_65%)] mt-1">—</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Itineraries for Inspiration */}
      <section id="itineraries" className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">
              For Inspiration
            </p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)] mb-4">
              Sample Itineraries
            </h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">
              Three journeys we have designed before — to give you a sense of pace, scale,
              and what an Árdíre tour can feel like. Yours will be entirely your own.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {itineraries.map((it) => (
              <ItineraryCard key={it.title} item={it} />
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION — How We Plan Your Tour */}
      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">
              The Process
            </p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)] mb-4">
              How We Plan Your Tour
            </h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">
              From first email to final farewell, the way we work is straightforward — and
              there is no obligation until you ask us to confirm.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7"
                >
                  <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)] mb-3">
                    {s.label}
                  </p>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{s.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included / Not Included */}
      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10">
          <div className="border border-[hsl(43_80%_65%)]/15 p-8">
            <h3 className="font-['Cinzel'] text-2xl text-[hsl(43_80%_65%)] mb-6">
              What's Included
            </h3>
            <ul className="space-y-3">
              {included.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[hsl(43_80%_65%)]/15 p-8">
            <h3 className="font-['Cinzel'] text-2xl text-[hsl(43_80%_65%)] mb-6">
              Not Included
            </h3>
            <ul className="space-y-3">
              {notIncluded.map((i) => (
                <li key={i} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85">
                  <X className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]/60" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">
              Good Questions
            </p>
            <h2 className="font-['Cinzel'] text-4xl text-[hsl(43_80%_65%)]">
              Frequently Asked
            </h2>
          </div>
          <div>
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Sticky enquiry bar */}
      <div
        id="enquire"
        className="fixed bottom-0 inset-x-0 z-40 bg-[hsl(155_55%_10%)]/95 backdrop-blur border-t border-[hsl(43_80%_65%)]/20"
      >
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5 text-xs text-[hsl(43_80%_65%)]/85">
            <a href="tel:+441410000000" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]">
              <Phone className="w-3.5 h-3.5" />
              +44 (0) 141 000 0000
            </a>
            <a href="mailto:enquiries@ardire.co.uk" className="hidden sm:flex items-center gap-2 hover:text-[hsl(43_80%_65%)]">
              <Mail className="w-3.5 h-3.5" />
              enquiries@ardire.co.uk
            </a>
          </div>
          <a
            href="#"
            className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90"
          >
            Make an Enquiry
          </a>
        </div>
      </div>
    </div>
  );
}
