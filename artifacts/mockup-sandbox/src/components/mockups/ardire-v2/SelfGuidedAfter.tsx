import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail, Check, Map, Compass, Mountain, Wine } from "lucide-react";

const routes = [
  { icon: Map, name: "North Coast 500", days: "7 days", price: "from £3,200", unit: "per traveller", desc: "Inverness loop · castle hotels · fully pre-booked." },
  { icon: Mountain, name: "West Highland Way", days: "8 days", price: "from £2,400", unit: "per walker", desc: "Milngavie to Fort William · luggage transferred · breakfast included." },
  { icon: Wine, name: "Whisky Trail", days: "5 days", price: "from £2,800", unit: "per traveller", desc: "Speyside distilleries · driver transfers · tastings booked." },
  { icon: Compass, name: "Bespoke Route", days: "Your dates", price: "Quoted", unit: "to the journey", desc: "Tell us where, how long, and how. We build the route." },
];

const sampleItineraries = [
  {
    title: "North Coast 500 — 7 Day Self-Drive",
    indicative: "From £3,200 per traveller (twin)",
    detail: [
      "Day 1 — Inverness arrival, hire car collection, evening at a Highland country house.",
      "Day 2 — Drive west to Applecross via Bealach na Bà, sea-view stay.",
      "Day 3 — Up the west coast to Lochinver, harbourside hotel.",
      "Day 4 — Across the top: Durness, Smoo Cave, Tongue.",
      "Day 5 — South via Thurso and the east coast.",
      "Day 6 — Dornoch, lunch at a celebrated golf links clubhouse.",
      "Day 7 — Return to Inverness, optional Loch Ness extension.",
    ],
  },
  {
    title: "Speyside Whisky Trail — 5 Day with Driver",
    indicative: "From £2,800 per traveller (twin)",
    detail: [
      "Day 1 — Edinburgh or Inverness arrival, transfer to Speyside, welcome dinner.",
      "Day 2 — Two distillery tours, lunch at a private dining room.",
      "Day 3 — Three distilleries with reservations confirmed in advance.",
      "Day 4 — A final cooperage and a walk on the Speyside Way.",
      "Day 5 — Return transfer; bottles shipped home if you wish.",
    ],
  },
];

function ItineraryCard({ item }: { item: typeof sampleItineraries[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 mb-3">{item.indicative}</p>
      <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-4">{item.title}</h3>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white">
        {open ? "Hide itinerary" : "See itinerary"}
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

export default function SelfGuidedAfter() {
  return (
    <div className="min-h-screen bg-[hsl(155_58%_7%)] text-[hsl(43_80%_65%)] font-['Raleway'] pb-20">
      <header className="border-b border-[hsl(43_80%_65%)]/15">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <a href="#" className="font-['Cinzel'] text-2xl tracking-[0.15em] text-[hsl(43_80%_65%)]">ÁRDÍRE</a>
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white">Travel</a>
            <a href="#" className="hover:text-white">Events</a>
            <a href="#" className="hover:text-white">Journal</a>
            <a href="#" className="hover:text-white">About</a>
          </nav>
          <a href="#enquire" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-[hsl(43_80%_65%)]/90">Make an Enquiry</a>
        </div>
      </header>

      <section className="relative h-[480px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-home.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">Travel &amp; Tours / Self-Guided Journeys</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Self-Guided Journeys</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">Your Pace. Our Expertise.</p>
        </div>
      </section>

      <section className="border-b border-[hsl(43_80%_65%)]/15 py-16 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Indicative Packages</p>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] mb-3">Routes, fully arranged</h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">
              We pre-book your accommodation, transport, key reservations, and luggage transfers — then hand over a route pack and a 24/7 support line. Below are starting prices for our most-requested routes; bespoke routes are quoted to your shape.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {routes.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.name} className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-6">
                  <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/70 mb-2">{r.name}</p>
                  <p className="font-['Cinzel'] text-2xl text-[hsl(43_80%_65%)] leading-tight">{r.price}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[hsl(43_80%_65%)]/60 mb-3">{r.days} · {r.unit}</p>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/50 mt-8">⚑ Placeholder rates · please replace with your published figures before launch</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">How it Works</p>
            <p>For travellers who want the freedom to explore independently, with the confidence of expert planning behind them. We design the route, secure every booking, and prepare detailed notes — then hand the keys over to you.</p>
            <p>If anything happens en route — a closed road, a missed train, a weather change — our 24/7 support line picks up. You travel alone; you are never on your own.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">What's Included</p>
            <ul className="space-y-3">
              {[
                "Day-by-day itinerary tailored to your interests",
                "Pre-booked accommodation, dining, and key attractions",
                "Detailed route notes, maps, and insider tips",
                "Luggage transfers between stays where applicable",
                "24/7 emergency support line",
              ].map((h) => (
                <li key={h} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85"><Check className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]" /><span>{h}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Sample Itineraries</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)]">Two journeys in detail</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {sampleItineraries.map((i) => <ItineraryCard key={i.title} item={i} />)}
          </div>
        </div>
      </section>

      <div id="enquire" className="fixed bottom-0 inset-x-0 z-40 bg-[hsl(155_55%_10%)]/95 backdrop-blur border-t border-[hsl(43_80%_65%)]/20">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5 text-xs text-[hsl(43_80%_65%)]/85">
            <a href="tel:+441410000000" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Phone className="w-3.5 h-3.5" />+44 (0) 141 000 0000</a>
            <a href="mailto:enquiries@ardire.co.uk" className="hidden sm:flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Mail className="w-3.5 h-3.5" />enquiries@ardire.co.uk</a>
          </div>
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Start Planning<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
