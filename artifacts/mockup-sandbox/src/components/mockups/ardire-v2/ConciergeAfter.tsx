import { ArrowRight, Phone, Mail, Check } from "lucide-react";

const examples = [
  "A table for six at a restaurant said to be fully booked.",
  "A helicopter from Glasgow to a Highland estate by lunch.",
  "A private viewing of a closed gallery, hosted by the curator.",
  "A bottle of a 1955 single malt, gift-wrapped and delivered before dinner.",
  "A medical specialist seen privately, the same afternoon.",
  "A nanny with native Mandarin in Edinburgh by Tuesday morning.",
];

export default function ConciergeAfter() {
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

      <section className="relative h-[460px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/about.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">Travel &amp; Tours / Concierge</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Concierge</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85">Nothing Is Too Much.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">A Standing Arrangement</p>
          <p className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] leading-snug mb-6">When the usual avenues will not do.</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            Round-the-clock lifestyle management for private individuals, executives, and visiting guests. We secure the impossible, coordinate the complex, and deliver everything with complete discretion.
          </p>
        </div>
      </section>

      <section className="border-t border-b border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-14">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">Recent Requests</p>
            <ul className="space-y-4">
              {examples.map((e) => (
                <li key={e} className="flex gap-3 text-sm text-[hsl(43_80%_65%)]/85 leading-relaxed">
                  <span className="text-[hsl(43_80%_65%)] mt-1">—</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">How It Works</p>
            <ul className="space-y-3">
              {[
                "24/7 availability wherever you are in the world",
                "A dedicated lead concierge who knows you",
                "A network of trusted partners across Scotland and beyond",
                "Discretion as standard, in writing where required",
                "Annual retainer or one-off engagement — your choice",
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

      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">On Pricing</p>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">
            Concierge work is priced by engagement, not by task. Most clients hold a
            modest annual retainer and are then billed at cost for what they request.
            We will discuss the right structure for you in confidence — there is no
            obligation to publish, and no obligation to commit.
          </p>
          <a href="#" className="inline-flex items-center gap-2 mt-7 bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-7 py-3.5 hover:bg-[hsl(43_80%_65%)]/90">
            Open a Conversation<ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <div id="enquire" className="fixed bottom-0 inset-x-0 z-40 bg-[hsl(155_55%_10%)]/95 backdrop-blur border-t border-[hsl(43_80%_65%)]/20">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5 text-xs text-[hsl(43_80%_65%)]/85">
            <a href="tel:+441410000000" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Phone className="w-3.5 h-3.5" />+44 (0) 141 000 0000</a>
            <a href="mailto:enquiries@ardire.co.uk" className="hidden sm:flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Mail className="w-3.5 h-3.5" />enquiries@ardire.co.uk</a>
          </div>
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-6 py-3 hover:bg-[hsl(43_80%_65%)]/90 inline-flex items-center gap-2">Enquire Now<ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </div>
  );
}
