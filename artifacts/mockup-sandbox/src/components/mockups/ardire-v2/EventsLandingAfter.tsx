import { ArrowRight, Phone, Mail } from "lucide-react";

const services = [
  {
    title: "Event Management",
    sub: "Conceived, Managed, Delivered.",
    desc: "End-to-end production for private occasions, corporate functions, product launches, gala dinners, and high-profile gatherings.",
    img: "/images/about.webp",
  },
  {
    title: "Corporate Incentives",
    sub: "Performance. Rewarded. Unforgettably.",
    desc: "High-impact incentive programmes — Highland challenges, exclusive venue hire, gala dinners — designed around your business objectives.",
    img: "/images/hero.webp",
  },
  {
    title: "Event Staffing",
    sub: "Every Detail. Impeccably Handled.",
    desc: "Trained, presentable, fully insured event staff for hospitality, front-of-house, and guest management. Single hire to large teams.",
    img: "/images/hero-home.webp",
  },
  {
    title: "Glasgow 2026",
    sub: "Commonwealth Games Hospitality.",
    desc: "VIP hospitality packages, corporate entertainment programmes, and bespoke visitor itineraries around the 2026 Games.",
    img: "/images/about.webp",
  },
];

export default function EventsLandingAfter() {
  return (
    <div className="min-h-screen bg-[hsl(155_58%_7%)] text-[hsl(43_80%_65%)] font-['Raleway']">
      <header className="border-b border-[hsl(43_80%_65%)]/15">
        <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
          <a href="#" className="font-['Cinzel'] text-2xl tracking-[0.15em] text-[hsl(43_80%_65%)]">ÁRDÍRE</a>
          <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-white">Travel</a>
            <a href="#" className="text-white">Events</a>
            <a href="#" className="hover:text-white">Journal</a>
            <a href="#" className="hover:text-white">About</a>
          </nav>
          <a href="#" className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-[hsl(43_80%_65%)]/90">Make an Enquiry</a>
        </div>
      </header>

      <section className="relative h-[520px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/about.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-5">For Companies &amp; Organisers</p>
          <h1 className="font-['Cinzel'] text-5xl md:text-6xl text-[hsl(43_80%_65%)] leading-[1.05] mb-5">Events &amp; Hospitality</h1>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed">Corporate incentives, end-to-end event management, professional event staffing, and Glasgow 2026 hospitality — delivered to a single, uncompromising standard.</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-4">The Offering</p>
            <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)]">Four sides to one service</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <a key={s.title} href="#" className="group relative block aspect-[5/3] overflow-hidden border border-[hsl(43_80%_65%)]/15 hover:border-[hsl(43_80%_65%)]/50 transition-colors">
                <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/70 mb-2">{s.sub}</p>
                  <h3 className="font-['Cinzel'] text-2xl md:text-3xl text-[hsl(43_80%_65%)] mb-3">{s.title}</h3>
                  <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-4 max-w-md">{s.desc}</p>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] group-hover:gap-3 transition-all">Explore<ArrowRight className="w-4 h-4" /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-5">A Single Point of Contact</p>
          <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] mb-6">Brief us once.</h2>
          <p className="text-base text-[hsl(43_80%_65%)]/85 leading-relaxed mb-7">
            Whether you need a fully produced gala for five hundred or a twelve-person incentive in the Highlands, brief us once and we coordinate everything that follows — venue, catering, AV, staffing, transport, accommodation, and on-the-day production.
          </p>
          <a href="#" className="inline-flex items-center gap-2 bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.25em] px-7 py-3.5 hover:bg-[hsl(43_80%_65%)]/90">Discuss Your Event<ArrowRight className="w-4 h-4" /></a>
        </div>
      </section>

      <footer className="border-t border-[hsl(43_80%_65%)]/15 py-7 px-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 flex-wrap text-xs text-[hsl(43_80%_65%)]/70">
          <div className="flex items-center gap-5">
            <a href="tel:+441410000000" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Phone className="w-3.5 h-3.5" />+44 (0) 141 000 0000</a>
            <a href="mailto:enquiries@ardire.co.uk" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]"><Mail className="w-3.5 h-3.5" />enquiries@ardire.co.uk</a>
          </div>
          <p>© 2026 Árd Íre Hospitality Group · Glasgow</p>
        </div>
      </footer>
    </div>
  );
}
