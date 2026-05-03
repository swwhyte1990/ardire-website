import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail, Check, MapPin, Calendar } from "lucide-react";

const itineraries = [
  {
    title: "Fife Links Pilgrimage",
    duration: "5 days · 4 nights",
    indicative: "Indicative £6,800 per golfer",
    blurb: "St Andrews Old Course, New, Jubilee, plus Kingsbarns and Crail.",
    detail: [
      "Arrival at Edinburgh, chauffeured transfer to St Andrews.",
      "Old Course (ballot pre-arranged), New, Jubilee — caddies confirmed.",
      "Round at Kingsbarns and a hidden links at Crail.",
      "Two nights at Old Course Hotel, two at a Fife country house.",
      "Whisky tasting, fine dining, and clubhouse dinners woven in.",
    ],
  },
  {
    title: "Open Championship Coast",
    duration: "6 days · 5 nights",
    indicative: "Indicative £9,400 per golfer",
    blurb: "Carnoustie, Royal Troon, Turnberry — the championship rota in full.",
    detail: [
      "Carnoustie Championship and Burnside courses.",
      "Transfer west: Royal Troon Old and Turnberry Ailsa across two days.",
      "One round at a hidden Ayrshire links to round it out.",
      "Estate hotel accommodation throughout, private chauffeur every transfer.",
      "Pre-booked caddies, club hire, and tee times confirmed in advance.",
    ],
  },
  {
    title: "Highlands & Hidden Gems",
    duration: "7 days · 6 nights",
    indicative: "Indicative £8,200 per golfer",
    blurb: "Castle Stuart, Royal Dornoch, Cruden Bay — and the long drives between.",
    detail: [
      "Inverness arrival, Castle Stuart and Nairn day one and two.",
      "Royal Dornoch — caddies arranged, lunch in the clubhouse.",
      "Across to the east coast for Cruden Bay and Trump International.",
      "Highland castle hotel, sea-view boutique stays, distillery visit en route.",
      "Private chauffeur and luggage handling throughout.",
    ],
  },
];

const faqs = [
  {
    q: "Can you secure a tee time at the Old Course?",
    a: "We submit guests through the official ballot and, where appropriate, work with our partner concierges to maximise the chance of a confirmed time. We never promise what cannot be delivered — if the ballot is unsuccessful, we propose a strong alternative on the same coast.",
  },
  {
    q: "Are caddies and club hire included?",
    a: "Yes. Every round is arranged in advance with caddies, club hire (where required), and confirmed tee times. We brief the clubhouse on your party, your handicaps, and your preferences.",
  },
  {
    q: "Do you cater for non-golfing partners?",
    a: "Absolutely. Many of our parties travel with non-golfing partners. We arrange parallel itineraries — distillery tours, spa days, falconry, walking — so everyone enjoys the trip.",
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
        <ChevronDown className={`w-4 h-4 mt-1.5 shrink-0 text-[hsl(43_80%_65%)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{a}</p>}
    </div>
  );
}

function ItineraryCard({ item }: { item: typeof itineraries[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 mb-3 flex items-center gap-3">
        <Calendar className="w-3.5 h-3.5" /> {item.duration} · {item.indicative}
      </p>
      <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{item.title}</h3>
      <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5">{item.blurb}</p>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white"
      >
        {open ? "Hide details" : "See full itinerary"}
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

export default function GolfToursAfter() {
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
          <img src="/images/hero.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">Travel &amp; Tours / Golf Tours</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Golf Tours</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">The Home of Golf. Played Properly.</p>
        </div>
      </section>

      <section className="border-b border-[hsl(43_80%_65%)]/15 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">On Pricing</p>
          <p className="font-['Cinzel'] text-2xl md:text-3xl text-[hsl(43_80%_65%)] leading-snug mb-4">A round, a course, a journey.</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            Every golf tour is built around the courses you want to play and the
            standard of stay you expect between rounds. We secure tee times, caddies,
            club hire, transfers, and accommodation, then quote the whole journey in
            writing before you commit. The <a href="#itineraries" className="underline underline-offset-4 decoration-[hsl(43_80%_65%)]/40 hover:decoration-[hsl(43_80%_65%)]">sample itineraries</a> below give an honest indication of what a tour of that shape costs.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">About the Tours</p>
            <p>Play the courses that defined the game. From the Old Course at St Andrews to the dramatic links of the Outer Hebrides, we handle every detail so you can focus entirely on your game.</p>
            <p>We cover the full championship rota — St Andrews, Carnoustie, Turnberry, Royal Troon, Muirfield, Kingsbarns — alongside the spectacular hidden gems where the scenery is as memorable as the golf.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">What's Included</p>
            <ul className="space-y-3">
              {[
                "Pre-booked tee times, caddies, and club hire",
                "Luxury accommodation at estate hotels and boutique retreats",
                "Private chauffeured transfers between courses and lodgings",
                "Whisky tastings and fine dining woven in",
                "Parallel itineraries for non-golfing partners",
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

      <section id="itineraries" className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">For Inspiration</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)] mb-4">Sample Itineraries</h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">Three tours we have run, with indicative pricing based on real bookings. Yours is built and quoted to your party and dates.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {itineraries.map((i) => <ItineraryCard key={i.title} item={i} />)}
          </div>
        </div>
      </section>

      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Good Questions</p>
            <h2 className="font-['Cinzel'] text-4xl text-[hsl(43_80%_65%)]">Frequently Asked</h2>
          </div>
          {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>
      </section>

      <div id="enquire" className="fixed bottom-0 inset-x-0 z-40 bg-[hsl(155_55%_10%)]/95 backdrop-blur border-t border-[hsl(43_80%_65%)]/20">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5 text-xs text-[hsl(43_80%_65%)]/85">
            <a href="tel:+441410000000" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Phone className="w-3.5 h-3.5" />+44 (0) 141 000 0000</a>
            <a href="mailto:enquiries@ardire.co.uk" className="hidden sm:flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Mail className="w-3.5 h-3.5" />enquiries@ardire.co.uk</a>
          </div>
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Plan Your Golf Tour<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
