import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail, Check, Home, Plane, Sparkles } from "lucide-react";

const sample = [
  {
    title: "Ten Days · Private Estate, Highland Touring & Games Days",
    indicative: "Indicative £180,000+ for a party of 8",
    blurb: "Whole-house estate hire as a base. Helicopter to selected Games sessions. Touring, dining, and Highland life around the action.",
    detail: [
      "Whole-house hire of a private Highland estate for the duration.",
      "Private chef in residence, sommelier on call.",
      "Helicopter transfers to two selected Games sessions in Glasgow.",
      "Two private touring days — distillery, falconry, fly-fishing.",
      "Reservations at three of Scotland's most sought-after restaurants.",
      "Resident host and concierge throughout, briefed to each guest.",
      "Inbound and outbound private transfers from international arrival.",
    ],
  },
  {
    title: "Five Days · Glasgow City Stay With Two Games Days",
    indicative: "Indicative £62,000 for a party of 4",
    blurb: "Boutique five-star city stay with two Games days woven into a curated Glasgow week — dining, culture, a day on the west coast.",
    detail: [
      "Five nights at a boutique five-star Glasgow hotel — full suite floor.",
      "Two Games days with premium seating and chauffeured transfers.",
      "Three private dinners — including a hidden chef's table off the Royal Mile.",
      "A day on the west coast: lunch on Loch Lomond, return for evening play.",
      "On-call host across the programme and 24/7 concierge line.",
      "Bespoke gifting curated to each guest.",
    ],
  },
];

const faqs = [
  { q: "Do you arrange tickets to the Games themselves?", a: "Yes. We work with the official Glasgow 2026 hospitality programme and supplementary partners to confirm ticketed access in writing as part of your programme. Tickets are one part of the picture — most of what we do is the experience around them." },
  { q: "Why not a standard hospitality package?", a: "Off-the-shelf packages tend to be designed around a single venue and a single day. Our guests are visiting Scotland — the Games is the reason for the trip, not the whole of it. We design the rest of the experience to match the calibre of the visit." },
  { q: "When is the latest you can build a programme?", a: "Capacity gets tight as the Games approach. The earlier we engage, the better the position we can secure for accommodation, transport, and the venues around it. After early 2026 we will only take on programmes we are confident we can deliver to standard." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[hsl(43_80%_65%)]/15">
      <button onClick={() => setOpen(!open)} className="w-full flex items-start justify-between gap-4 py-5 text-left">
        <span className="font-['Cinzel'] text-lg text-[hsl(43_80%_65%)]">{q}</span>
        <ChevronDown className={`w-4 h-4 mt-1.5 shrink-0 text-[hsl(43_80%_65%)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{a}</p>}
    </div>
  );
}

function SampleCard({ item }: { item: typeof sample[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 mb-3">{item.indicative}</p>
      <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{item.title}</h3>
      <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5">{item.blurb}</p>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white">
        {open ? "Hide details" : "See programme"}
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

const around = [
  { icon: Home, label: "Where you stay", desc: "Whole-house estate hire, suite floors at five-star city hotels, or a Highland castle with private staff in residence." },
  { icon: Sparkles, label: "What you do around it", desc: "Private touring, distillery experiences, fly-fishing, falconry, golf, fine dining — the Scotland your visit deserves." },
  { icon: Plane, label: "How you move", desc: "Private chauffeur, helicopter, and transfer logistics across the entire stay — into the Games and back out again." },
];

export default function Commonwealth26After() {
  return (
    <div className="min-h-screen bg-[hsl(155_58%_7%)] text-[hsl(43_80%_65%)] font-['Raleway'] pb-20">
      <header className="border-b border-[hsl(43_80%_65%)]/15">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <a href="#" className="font-['Cinzel'] text-2xl tracking-[0.15em] text-[hsl(43_80%_65%)]">ÁRDÍRE</a>
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white">Travel</a>
            <a href="#" className="text-white">Events</a>
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
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">Events &amp; Hospitality / Glasgow 2026</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Glasgow 2026</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">In Scotland for the Games. Hosted for everything else.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">For Visiting Guests</p>
          <p className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] leading-snug mb-6">The Games is your reason for the trip. Not the whole of it.</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            For private guests travelling to Scotland for the Glasgow 2026 Commonwealth
            Games, Árdíre delivers everything that surrounds the event — the residence,
            the touring, the dining, the people, and the transport that turns a sporting
            visit into a Scottish stay worthy of the journey. We handle the Games access
            as part of the programme. We design the rest of it to match.
          </p>
        </div>
      </section>

      <section className="border-t border-b border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">What We Take On</p>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)]">Everything around the action</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {around.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.label} className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
                  <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
                  <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{a.label}</h3>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{a.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">On Pricing</p>
            <p className="font-['Cinzel'] text-2xl text-[hsl(43_80%_65%)] leading-snug">Built around your stay.</p>
            <p>Every Glasgow 2026 programme is private, bespoke, and quoted in writing — no off-the-shelf packages. The shape depends on how long you are with us, where you stay, and how much of Scotland you want woven around the Games.</p>
            <p>The <a href="#sample" className="underline underline-offset-4 decoration-[hsl(43_80%_65%)]/40 hover:decoration-[hsl(43_80%_65%)]">sample programmes</a> opposite show real arrangements at real scale, so you can see the shape of what an Árdíre Games stay tends to cost.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">What's Included</p>
            <ul className="space-y-3">
              {[
                "Confirmed Games access — tickets and venue hospitality",
                "Private accommodation: estate hire, suite floors, castle stays",
                "Resident host and 24/7 concierge across the programme",
                "Chauffeur, helicopter, and transfer logistics",
                "Private dining, restaurant reservations, in-residence chef",
                "Side experiences — distilleries, golf, touring, fishing, falconry",
                "Discreet protective and personal staff where required",
              ].map((h) => (
                <li key={h} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85"><Check className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]" /><span>{h}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="sample" className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Sample Programmes</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)] mb-4">Two we are building</h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">For an honest sense of scale and budget. Yours will be entirely its own thing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {sample.map((s) => <SampleCard key={s.title} item={s} />)}
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
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Open a Conversation<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
