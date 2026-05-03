import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail, Check, Target, Mountain, Trophy } from "lucide-react";

const programmes = [
  {
    icon: Mountain,
    title: "Highland Challenge — 3 Days",
    indicative: "Indicative £85,000+ for 30 guests",
    blurb: "Estate-based team programme combining outdoor activity, cultural immersion, and high-end hospitality.",
    detail: [
      "Private estate hire for the duration with exclusive use.",
      "Day 1: arrival, falconry display, gala welcome dinner.",
      "Day 2: Highland games activities and a guided summit walk.",
      "Day 3: a curated whisky session, presentation dinner, ceilidh band.",
      "Full transport, staffing, AV, and on-site producer included.",
    ],
  },
  {
    icon: Target,
    title: "Glasgow Sales Reward — 2 Nights",
    indicative: "Indicative £42,000 for 20 guests",
    blurb: "City-based reward weekend for top performers — four-star stays, fine dining, sport.",
    detail: [
      "Two nights at a five-star Glasgow hotel.",
      "Welcome dinner at a celebrated city restaurant.",
      "Day at Royal Troon or a Glasgow championship course.",
      "Closing dinner with a guest speaker and surprise act.",
      "Chauffeur transfers throughout, branded gifting on arrival.",
    ],
  },
  {
    icon: Trophy,
    title: "Speyside Innovation Off-Site — 4 Days",
    indicative: "Indicative £120,000+ for 25 guests",
    blurb: "Distillery-immersion strategic off-site combining facilitated workshops with private hospitality.",
    detail: [
      "Whole-house hire of a Speyside country estate.",
      "Two days of facilitated workshops in a private boardroom.",
      "Three private distillery experiences with master distillers.",
      "Bespoke blending session and a personalised bottle for each guest.",
      "Closing dinner with a Scottish chef-host and live music.",
    ],
  },
];

const faqs = [
  { q: "What size of group do you cater for?", a: "Most of our incentive programmes sit between 12 and 60 guests, but we have run programmes of 100+. Below 10 we usually recommend a private group tour rather than an incentive." },
  { q: "Do you handle international logistics?", a: "We handle everything once your guests land in the UK — transfers, accommodation, programme, return. We coordinate closely with your travel partner on inbound flights and visas." },
  { q: "Can the programme be branded?", a: "Yes. Branded gifting, dressed venues, custom menus, and bespoke content are all part of how we work. We build a brand brief into the production document." },
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

function ProgrammeCard({ item }: { item: typeof programmes[number] }) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  return (
    <article className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
      <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
      <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 mb-3">{item.indicative}</p>
      <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{item.title}</h3>
      <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5">{item.blurb}</p>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white">
        {open ? "Hide breakdown" : "See programme"}
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

export default function CorporateIncentivesAfter() {
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
          <img src="/images/hero.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">Events &amp; Hospitality / Corporate Incentives</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Corporate Incentives</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">Performance. Rewarded. Unforgettably.</p>
        </div>
      </section>

      <section className="border-b border-[hsl(43_80%_65%)]/15 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">On Pricing</p>
          <p className="font-['Cinzel'] text-2xl md:text-3xl text-[hsl(43_80%_65%)] leading-snug mb-4">Built around your objective.</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            Every incentive programme is shaped around your business objective, your group,
            and the impression you want to leave. We do not work from packages. The
            <a href="#programmes" className="underline underline-offset-4 decoration-[hsl(43_80%_65%)]/40 hover:decoration-[hsl(43_80%_65%)] mx-1">sample programmes below</a>
            give an honest indication of what programmes of that scale and ambition tend to cost.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">The Approach</p>
            <p>The best incentive is one your team still talks about years later. We design and deliver high-impact programmes that go beyond the ordinary, creating moments of genuine awe, team connection, and cultural immersion.</p>
            <p>Every programme starts with a conversation about your objective. The activity, the venue, the hospitality, and the surprise moments are all designed to serve it.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">What's Included</p>
            <ul className="space-y-3">
              {[
                "Bespoke programme design aligned to your objectives",
                "Highland challenges, outdoor adventures, and team-building",
                "Exclusive venue hire — castles, estates, private dining rooms",
                "Gala dinners, whisky tastings, cultural experiences",
                "End-to-end logistics, staffing, and on-site coordination",
                "Branded gifting and personalised guest touches",
              ].map((h) => (
                <li key={h} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85"><Check className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]" /><span>{h}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="programmes" className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">For Inspiration</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)] mb-4">Sample Programmes</h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">Three programmes we have run, with indicative budgets based on real bookings.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {programmes.map((p) => <ProgrammeCard key={p.title} item={p} />)}
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
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Discuss Your Programme<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
