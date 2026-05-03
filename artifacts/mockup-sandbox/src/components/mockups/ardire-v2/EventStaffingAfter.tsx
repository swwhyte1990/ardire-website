import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail, Check, Users, UserCheck, Wine } from "lucide-react";

const roles = [
  { icon: UserCheck, name: "Front-of-House", desc: "Door staff, registration, cloakroom, guest direction. Polished, briefed, and bilingual where required." },
  { icon: Wine, name: "Hospitality Service", desc: "Drinks reception, dinner service, butlers and silver service for fine-dining standards." },
  { icon: Users, name: "Guest Management", desc: "VIP liaison, hosted seating, table management, and discreet on-the-night problem solving." },
];

const examples = [
  {
    title: "Whisky Brand Launch · 120 guests",
    indicative: "Indicative £6,800",
    blurb: "Edinburgh gallery launch — eight-strong front-of-house and bar team for a four-hour reception.",
    detail: [
      "Two FOH on door and registration.",
      "Four bar and tasting-bar service staff.",
      "One floor manager coordinating the team on the night.",
      "One brand-trained host briefed to the launch narrative.",
      "Briefing session, uniformed kit, and travel within Edinburgh included.",
    ],
  },
  {
    title: "Highland Estate Wedding · 180 guests",
    indicative: "Indicative £14,500",
    blurb: "Marquee weekend at a private estate — sixteen-strong team across three services.",
    detail: [
      "Welcome reception team for arrival drinks on the lawn.",
      "Twelve dinner-service staff for a sit-down meal in the marquee.",
      "Late-night ceilidh team and bar staff into the small hours.",
      "Two senior floor managers across the weekend.",
      "Local accommodation arranged for the staff team.",
    ],
  },
];

const faqs = [
  { q: "Are your staff employed or freelance?", a: "We work with a vetted bench of trained, freelance staff who we know personally and have worked with repeatedly. Every member of the team is fully insured, briefed by us, and accountable to us — not subcontracted out." },
  { q: "How much notice do you need?", a: "Two to three weeks is comfortable for medium-sized teams. We have built teams in 48 hours when needed and will be honest with you on day one if a timeline puts quality at risk." },
  { q: "Can you provide uniforms?", a: "Yes. We hold a house uniform kit and can also dress staff to your brand or to a specified dress code. We brief and rehearse it ahead of the event." },
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
        {open ? "Hide breakdown" : "See team breakdown"}
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

export default function EventStaffingAfter() {
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
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">Events &amp; Hospitality / Event Staffing</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Event Staffing</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">Every Detail. Impeccably Handled.</p>
        </div>
      </section>

      <section className="border-b border-[hsl(43_80%_65%)]/15 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">On Pricing</p>
          <p className="font-['Cinzel'] text-2xl md:text-3xl text-[hsl(43_80%_65%)] leading-snug mb-4">Quoted by team and shift.</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            Every event needs a different shape of team. We quote per event — based on the
            roles, the hours, the location, and the level of service expected. The
            <a href="#examples" className="underline underline-offset-4 decoration-[hsl(43_80%_65%)]/40 hover:decoration-[hsl(43_80%_65%)] mx-1">sample bookings below</a>
            give an honest indication of what teams of that shape tend to cost.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Roles We Cover</p>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)]">A team for every part of the night</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.name} className="border border-[hsl(43_80%_65%)]/15 bg-[hsl(155_55%_10%)] p-7">
                  <Icon className="w-6 h-6 text-[hsl(43_80%_65%)] mb-5" />
                  <h3 className="font-['Cinzel'] text-xl text-[hsl(43_80%_65%)] mb-3">{r.name}</h3>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed">{r.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14">
          <div className="space-y-5 text-[hsl(43_80%_65%)]/85 leading-relaxed">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70">The Standard</p>
            <p>The impression your event makes starts with the people running it. Our team brings professionalism, warmth, and composure to every occasion — from intimate private dinners to large-scale corporate events.</p>
            <p>Discreet, well-presented, and completely reliable.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">What's Included</p>
            <ul className="space-y-3">
              {[
                "Trained, vetted, fully insured staff",
                "Uniformed and briefed to your event standards",
                "Flexible team sizes from a single host to large teams",
                "Floor managers on every booking of size",
                "Pre-event briefing and rehearsal where appropriate",
              ].map((h) => (
                <li key={h} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85"><Check className="w-4 h-4 mt-0.5 shrink-0 text-[hsl(43_80%_65%)]" /><span>{h}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="examples" className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">Sample Bookings</p>
            <h2 className="font-['Cinzel'] text-4xl md:text-5xl text-[hsl(43_80%_65%)]">Two we have staffed</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {examples.map((e) => <ExampleCard key={e.title} item={e} />)}
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
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Request Staff<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
