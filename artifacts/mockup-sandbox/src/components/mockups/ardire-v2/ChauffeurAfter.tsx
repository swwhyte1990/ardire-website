import { useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Phone,
  Mail,
  Plane,
  Clock,
  CalendarDays,
  Route,
  Check,
} from "lucide-react";

interface PriceBand {
  icon: typeof Plane;
  label: string;
  price: string;
  unit: string;
  desc: string;
}

const priceBands: PriceBand[] = [
  {
    icon: Plane,
    label: "Airport Transfer",
    price: "from £150",
    unit: "per transfer",
    desc: "Glasgow, Edinburgh, or Inverness · meet & greet · luggage assistance.",
  },
  {
    icon: Clock,
    label: "Half-Day (4 hrs)",
    price: "£450",
    unit: "per vehicle",
    desc: "City and surrounds · executive transfers · short tours.",
  },
  {
    icon: CalendarDays,
    label: "Full-Day (10 hrs)",
    price: "£850",
    unit: "per vehicle",
    desc: "Full-day touring · meetings circuit · day-trips into the Highlands.",
  },
  {
    icon: Route,
    label: "Multi-Day Driver",
    price: "from £750",
    unit: "per day",
    desc: "Dedicated chauffeur for the duration · accommodation arranged.",
  },
];

interface SampleJourney {
  title: string;
  duration: string;
  est: string;
  blurb: string;
  detail: string[];
}

const sampleJourneys: SampleJourney[] = [
  {
    title: "Glasgow Arrival to a Highland Estate",
    duration: "Half-day",
    est: "Estimated £520",
    blurb: "Airport meet-and-greet, scenic transfer via Loch Lomond.",
    detail: [
      "Meet & greet at Glasgow International, luggage handled.",
      "Scenic route via Loch Lomond and the Trossachs.",
      "Drop-off at your estate or hotel; chilled water and Scottish papers in the vehicle.",
      "Approx. 3.5 hours · 1 vehicle (Range Rover or V-Class).",
    ],
  },
  {
    title: "Edinburgh & St Andrews Day",
    duration: "Full-day",
    est: "Estimated £980",
    blurb: "Edinburgh hotel pick-up, day in St Andrews, return.",
    detail: [
      "Morning collection in Edinburgh.",
      "Transfer to St Andrews via the Forth bridges.",
      "Driver on standby throughout the day for movement around town.",
      "Return to Edinburgh in the evening; approx. 10 hours billed.",
    ],
  },
  {
    title: "Speyside Whisky Trail Driver",
    duration: "3 days · 2 nights",
    est: "Estimated £2,650",
    blurb: "Dedicated chauffeur for a self-curated distillery tour.",
    detail: [
      "Day 1: Edinburgh or Inverness collection, transfer to Speyside, two distillery visits.",
      "Day 2: Three distilleries with reservations confirmed in advance.",
      "Day 3: Final distillery, lunch, return transfer.",
      "Driver accommodation included in the day rate.",
    ],
  },
];

const vehicles = [
  {
    name: "Mercedes E-Class",
    use: "Executive transfers, airport runs, 1–3 guests with light luggage.",
  },
  {
    name: "Mercedes V-Class",
    use: "Family or small groups (up to 6) · long-distance comfort · plenty of luggage.",
  },
  {
    name: "Range Rover",
    use: "Highland touring · estate access · all-terrain confidence.",
  },
];

const faqs = [
  {
    q: "Are these prices final?",
    a: "These are indicative rates for standard service in standard conditions. Out-of-hours collections, public holidays, very long distances, and special vehicles can vary the figure. We always confirm in writing before you commit.",
  },
  {
    q: "Is gratuity included?",
    a: "No. Tipping is entirely at your discretion. Our chauffeurs are paid properly regardless.",
  },
  {
    q: "Can the chauffeur wait or change plans on the day?",
    a: "Yes. Within the booked time, your chauffeur is yours — change a stop, add an errand, extend an hour. We will only re-quote if the booking changes shape significantly.",
  },
  {
    q: "Do you cover the whole of Scotland?",
    a: "Yes. We are based in Glasgow but routinely operate Edinburgh, the Highlands, the Borders, Fife, and the islands by arrangement.",
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

function JourneyCard({ item }: { item: SampleJourney }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 mb-3">
        {item.duration} · {item.est}
      </p>
      <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{item.title}</h3>
      <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5">{item.blurb}</p>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white"
      >
        {open ? "Hide details" : "See details"}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="mt-5 pt-5 border-t border-[hsl(43_80%_65%)]/15 space-y-2.5">
          {item.detail.map((d) => (
            <li key={d} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">
              <span className="text-[hsl(43_80%_65%)] mt-1">—</span>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function ChauffeurAfter() {
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
      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">
            Travel &amp; Tours / Private Chauffeur
          </p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">
            Private Chauffeur
          </h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">Driven to a Different Standard.</p>
        </div>
      </section>

      {/* Pricing Bands — appropriate here because service is more standardised */}
      <section className="border-b border-[hsl(43_80%_65%)]/15 py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">
              Indicative Rates
            </p>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] mb-3">
              Clear, honest pricing
            </h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">
              Chauffeur work is more predictable than a multi-day tour, so we can publish
              guide rates. Final figures depend on vehicle, distance, and timings — and
              are always confirmed in writing before the journey.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {priceBands.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.label}
                  className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-6 flex flex-col"
                >
                  <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/70 mb-2">
                    {b.label}
                  </p>
                  <p className="font-['Cinzel'] text-2xl text-[hsl(43_80%_65%)] leading-tight">
                    {b.price}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(43_80%_65%)]/60 mb-4">
                    {b.unit}
                  </p>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/50 mt-8">
            ⚑ Placeholder rates · please replace with your published figures before launch
          </p>
        </div>
      </section>

      {/* Intro + Highlights */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">
              About the Service
            </p>
            <p>
              From airport arrivals to full-day touring, our private chauffeur service
              sets the benchmark for discreet, professional ground transportation across
              Scotland. Every journey is handled with precision, punctuality, and an
              unwavering attention to comfort.
            </p>
            <p>
              Our chauffeurs are carefully selected for their professionalism, local
              knowledge, and calm composure — immaculately presented, punctual to the
              minute, and trained to anticipate without intruding.
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">
              What's Included
            </p>
            <ul className="space-y-3">
              {[
                "Premium vehicle, immaculately maintained",
                "Professional, uniformed chauffeur",
                "Meet & greet at airports with luggage assistance",
                "Bottled water, phone chargers, Scottish papers on arrival",
                "Full insurance and licensed operation",
                "Discretion as standard",
              ].map((h) => (
                <li key={h} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sample Journeys */}
      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">
              For Reference
            </p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)] mb-4">
              Sample Journeys
            </h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">
              Three real-world bookings to give you a sense of scope and cost. Yours is
              quoted to the journey we agree.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleJourneys.map((j) => (
              <JourneyCard key={j.title} item={j} />
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles */}
      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">
              The Fleet
            </p>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)]">
              Vehicles
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <div
                key={v.name}
                className="border border-[hsl(43_80%_65%)]/15 p-7 bg-[hsl(155_55%_10%)]"
              >
                <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{v.name}</h3>
                <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{v.use}</p>
              </div>
            ))}
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
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
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
            className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2"
          >
            Arrange a Chauffeur
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
