import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail, Check, Trophy, Sparkles, Building2 } from "lucide-react";

const packages = [
  {
    icon: Sparkles,
    label: "Single Day Hospitality",
    desc: "VIP day at a Games venue with curated dining, premium seating, and a host. For one to twelve guests.",
    indicative: "Indicative from £950 per guest",
  },
  {
    icon: Trophy,
    label: "Multi-Day Programme",
    desc: "Three to seven days across multiple Games venues with accommodation, transfers, and side experiences in Glasgow.",
    indicative: "Indicative from £4,500 per guest",
  },
  {
    icon: Building2,
    label: "Corporate Programme",
    desc: "Bespoke corporate hospitality for client engagement — branded lounge, dressed venues, gala night, fully staffed.",
    indicative: "Indicative from £45,000 per programme",
  },
];

const sample = [
  {
    title: "Three-Day Client Hospitality · Glasgow",
    indicative: "Indicative £36,000 for 8 guests",
    blurb: "Three Games sessions, two private dinners, accommodation in the city centre.",
    detail: [
      "Three days of Games sessions across athletics, swimming, and a closing event.",
      "Two private dinners — one at a Glasgow institution, one at a hidden chef's table.",
      "Boutique five-star accommodation, walking distance to the action.",
      "Chauffeured transfers throughout, branded welcome on arrival.",
      "On-call host across the programme, briefed on each guest.",
    ],
  },
  {
    title: "Single Day VIP · Hampden",
    indicative: "Indicative £8,400 for 6 guests",
    blurb: "Premier event-day with curated dining and a host. A statement client thank-you.",
    detail: [
      "Premium seating at a marquee Hampden event.",
      "Pre-event lunch in a private dining room.",
      "Drinks reception with a celebrated chef-host.",
      "Chauffeur transfers to and from the venue.",
      "Bespoke gifts presented at the close of play.",
    ],
  },
];

const faqs = [
  { q: "Do you have ticket allocation?", a: "We work with the official Glasgow 2026 hospitality programme and supplementary partners. Ticketed access is confirmed in writing as part of every package, before you commit." },
  { q: "Can you build a programme around our brand?", a: "Yes. Branded lounges, dressed venues, custom gifting, and tailored content are part of how we deliver corporate Games programmes. We brief and produce them as full events." },
  { q: "When is the latest you can build a programme?", a: "Capacity gets tight as the Games approach. The earlier we engage, the better the position we can secure for you. After early 2026 we will only take on programmes we are confident we can deliver to standard." },
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
          <p className="text-base text-[hsl(43_80%_65%)]/85">Commonwealth Games. Experienced Properly.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">A Generation in the Making</p>
          <p className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] leading-snug mb-6">Glasgow's biggest moment in a generation.</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            The Glasgow 2026 Commonwealth Games will be one of the most significant
            sporting events ever hosted in Scotland. Árdíre delivers bespoke visitor
            programmes, VIP hospitality packages, and corporate experiences that allow
            businesses and private guests to make the very most of this landmark occasion.
          </p>
        </div>
      </section>

      <section id="packages" className="border-t border-b border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Three Shapes of Programme</p>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)]">From a single day to a full week</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.label} className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
                  <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/70 mb-3">{p.label}</p>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5">{p.desc}</p>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[hsl(43_80%_65%)]/85">{p.indicative}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/50 mt-8">Indicative figures · every programme is quoted to its shape and confirmed in writing</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Sample Programmes</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)]">Two we are building</h2>
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
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Get Involved<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
