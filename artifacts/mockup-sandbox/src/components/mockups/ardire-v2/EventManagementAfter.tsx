import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail, Check, Sparkles, ClipboardList, MapPin, Users } from "lucide-react";

const stages = [
  { icon: Sparkles, label: "01 — Brief & Concept", desc: "We sit down with you to understand the audience, the objective, and the feeling. We come back with a creative direction and a working budget." },
  { icon: MapPin, label: "02 — Venue & Suppliers", desc: "Venue sourcing across Scotland's finest estates, hotels, and unique spaces. Suppliers — catering, AV, entertainment, décor — selected and contracted." },
  { icon: ClipboardList, label: "03 — Production", desc: "Run-of-show, technical specification, guest journey, contingency planning. Every detail captured in a single production document." },
  { icon: Users, label: "04 — Delivery", desc: "On-the-day management with a dedicated senior event producer and a briefed staff team. You attend your own event as a guest." },
];

const examples = [
  {
    title: "Whisky Brand Launch — Edinburgh",
    indicative: "Indicative £45,000+",
    blurb: "120-guest evening event in a private gallery — bespoke tasting bar, live music, branded photography.",
    detail: [
      "Venue: a private gallery off the Royal Mile, dressed to brand.",
      "Bespoke tasting bar with three single-malt expressions.",
      "Live string quartet for arrival, jazz trio for after-dinner.",
      "Three-course menu with paired drams; canapé reception.",
      "Branded photographer, social-content videographer, full AV.",
      "Run by a senior producer with a six-strong on-site team.",
    ],
  },
  {
    title: "Highland Charity Gala — Perthshire",
    indicative: "Indicative £85,000+",
    blurb: "260-guest black-tie gala in a private estate — auction, headline performance, end-to-end staffing.",
    detail: [
      "Venue: a private estate marquee with full kit-out.",
      "Six-course tasting menu, two pipers on arrival, ceilidh band after dinner.",
      "Live and silent auction with on-screen integration.",
      "Headline performance and surprise act, full lighting and sound rig.",
      "End-to-end staffing including front-of-house and security liaison.",
      "Coach transport from Edinburgh and Glasgow with hostess service.",
    ],
  },
];

const faqs = [
  { q: "How early should we engage you?", a: "For a fully produced event, four to six months is comfortable. We have delivered at six weeks when needed, and we will be honest with you on day one if a timeline is unrealistic." },
  { q: "Do you charge a project fee or commission?", a: "We charge a transparent project management fee proportionate to the size and complexity of the event. We do not take hidden commissions from suppliers — every cost on your invoice is at supplier rate." },
  { q: "Can we use our existing suppliers?", a: "Yes. We are happy to integrate any supplier you already trust. We will manage and brief them as part of the wider production." },
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

function ExampleCard({ item }: { item: typeof examples[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 mb-3">{item.indicative}</p>
      <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{item.title}</h3>
      <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5">{item.blurb}</p>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] hover:text-white">
        {open ? "Hide breakdown" : "See what was included"}
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

export default function EventManagementAfter() {
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
          <img src="/images/about.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">Events &amp; Hospitality / Event Management</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Event Management</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">Conceived. Managed. Delivered.</p>
        </div>
      </section>

      <section className="border-b border-[hsl(43_80%_65%)]/15 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">On Pricing</p>
          <p className="font-['Cinzel'] text-2xl md:text-3xl text-[hsl(43_80%_65%)] leading-snug mb-4">Every event is bespoke.</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            We do not work from a price list. The <a href="#examples" className="underline underline-offset-4 decoration-[hsl(43_80%_65%)]/40 hover:decoration-[hsl(43_80%_65%)]">recent events below</a> show real budgets at real scale, so you can see the shape of what we deliver. Yours is scoped to your brief, and quoted in writing — line-by-line — before you commit.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">How We Work</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)]">Brief to delivery</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {stages.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-6">
                  <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[hsl(43_80%_65%)]/70 mb-3">{s.label}</p>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="examples" className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Recent Events</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)] mb-4">Two we have delivered</h2>
            <p className="text-sm text-[hsl(43_80%_65%)]/80 max-w-2xl mx-auto leading-relaxed">For an honest sense of scale and budget. Yours will be entirely its own thing.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {examples.map((e) => <ExampleCard key={e.title} item={e} />)}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">What We Cover</p>
            <p>Product launches, awards ceremonies, corporate hospitality days, charity galas, private celebrations, conferences, and more.</p>
            <p>Whatever the occasion, we bring the same attention to detail and creative ambition — and the same single-producer accountability.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">What's Included</p>
            <ul className="space-y-3">
              {[
                "Creative concept development and event styling",
                "Venue sourcing and contracting",
                "Supplier management — catering, AV, entertainment",
                "Run-of-show, guest journey, contingency planning",
                "On-the-day production with senior producer on site",
                "Post-event debrief and reporting",
              ].map((h) => (
                <li key={h} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85"><Check className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]" /><span>{h}</span></li>
              ))}
            </ul>
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
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Start Planning Your Event<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
