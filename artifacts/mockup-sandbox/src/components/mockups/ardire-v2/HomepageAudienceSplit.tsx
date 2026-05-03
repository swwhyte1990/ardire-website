import { useState } from "react";
import { ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";

const travelLinks = [
  { label: "Luxury Tours", href: "#" },
  { label: "Golf Tours", href: "#" },
  { label: "Private Chauffeur", href: "#" },
  { label: "Self-Guided Tours", href: "#" },
  { label: "Concierge", href: "#" },
  { label: "Commonwealth '26", href: "#" },
];

const eventsLinks = [
  { label: "Corporate Incentives", href: "#" },
  { label: "Event Management", href: "#" },
  { label: "Event Staffing", href: "#" },
];

function Dropdown({ label, items }: { label: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-['Raleway'] text-[hsl(43_80%_65%)] hover:text-white transition-colors py-2">
        {label}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-2 z-50">
          <div className="bg-[hsl(155_55%_10%)] border border-[hsl(155_50%_16%)] min-w-[220px] py-2 shadow-2xl">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-['Raleway'] text-[hsl(43_80%_65%)]/80 hover:text-[hsl(43_80%_65%)] hover:bg-[hsl(155_50%_14%)] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomepageAudienceSplit() {
  return (
    <div className="min-h-screen bg-[hsl(155_58%_7%)] text-[hsl(43_80%_65%)] font-['Raleway']">
      {/* Top Bar */}
      <header className="absolute top-0 inset-x-0 z-40">
        <div className="max-w-[1400px] mx-auto px-8 py-6 flex items-center justify-between">
          <a href="#" className="flex items-baseline gap-2">
            <span className="font-['Cinzel'] text-2xl tracking-[0.15em] text-[hsl(43_80%_65%)]">
              ÁRDÍRE
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(43_80%_65%)]/60 hidden sm:inline">
              Hospitality Group
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            <Dropdown label="Travel" items={travelLinks} />
            <Dropdown label="Events" items={eventsLinks} />
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-[hsl(43_80%_65%)] hover:text-white transition-colors">
              Journal
            </a>
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-[hsl(43_80%_65%)] hover:text-white transition-colors">
              About
            </a>
            <a href="#" className="text-xs uppercase tracking-[0.2em] text-[hsl(43_80%_65%)] hover:text-white transition-colors">
              Contact
            </a>
          </nav>
          <a
            href="#"
            className="bg-[hsl(43_80%_65%)] text-[hsl(155_58%_7%)] text-xs uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-[hsl(43_80%_65%)]/90 transition-colors hidden md:inline-block"
          >
            Enquire
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-[640px] flex items-start justify-center pt-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-home.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(155_58%_7%)]/70 via-[hsl(155_58%_7%)]/40 to-[hsl(155_58%_7%)]" />
        </div>
        <div className="relative z-10 text-center max-w-3xl px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/80 mb-6">
            Árd Íre Hospitality Group · Glasgow
          </p>
          <h1 className="font-['Cinzel'] text-5xl md:text-7xl text-[hsl(43_80%_65%)] leading-[1.05] mb-6">
            Privately Guided<br />Scotland
          </h1>
          <p className="text-base md:text-lg text-[hsl(43_80%_65%)]/85 max-w-xl mx-auto leading-relaxed">
            Bespoke private tours, concierge and event hospitality, crafted in
            Glasgow and delivered across Scotland.
          </p>
        </div>
      </section>

      {/* Twin Image Gateways — replaces text buttons */}
      <section className="relative -mt-40 z-20 px-6 md:px-10 pb-24">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-6">
          <a
            href="#"
            className="group relative block aspect-[4/3] md:aspect-[4/5] overflow-hidden border border-[hsl(43_80%_65%)]/15 hover:border-[hsl(43_80%_65%)]/50 transition-colors"
          >
            <img
              src="/images/hero.webp"
              alt="Travel & Tours"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/60 to-[hsl(155_58%_7%)]/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-3">
                For Private Travellers
              </p>
              <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] mb-3">
                Travel &amp; Tours
              </h2>
              <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5 max-w-md">
                Privately guided tours, championship golf, chauffeur, self-guided
                journeys and 24/7 concierge across Scotland.
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] group-hover:gap-3 transition-all">
                Plan a Private Tour
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>

          <a
            href="#"
            className="group relative block aspect-[4/3] md:aspect-[4/5] overflow-hidden border border-[hsl(43_80%_65%)]/15 hover:border-[hsl(43_80%_65%)]/50 transition-colors"
          >
            <img
              src="/images/about.webp"
              alt="Events & Hospitality"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(155_58%_7%)] via-[hsl(155_58%_7%)]/60 to-[hsl(155_58%_7%)]/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
              <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-3">
                For Companies &amp; Organisers
              </p>
              <h2 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] mb-3">
                Events &amp; Hospitality
              </h2>
              <p className="text-sm text-[hsl(43_80%_65%)]/80 leading-relaxed mb-5 max-w-md">
                Corporate incentives, end-to-end event management, professional
                event staffing, and Glasgow 2026 hospitality.
              </p>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[hsl(43_80%_65%)] group-hover:gap-3 transition-all">
                Discuss an Event
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Brief intro strip */}
      <section className="border-t border-[hsl(43_80%_65%)]/15 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[hsl(43_80%_65%)]/70 mb-6">
            Glasgow · Highlands · Islands
          </p>
          <h3 className="font-['Cinzel'] text-3xl md:text-4xl text-[hsl(43_80%_65%)] mb-6">
            Two doors. One standard.
          </h3>
          <p className="text-base text-[hsl(43_80%_65%)]/80 leading-relaxed">
            Whether you are arriving as a private guest or organising on behalf of
            a company, every Árdíre experience is shaped around you — privately
            guided, fully managed, and delivered with the same attention to
            detail.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[hsl(43_80%_65%)]/15 py-10 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[hsl(43_80%_65%)]/60">
          <div className="flex items-center gap-6">
            <a href="tel:+441410000000" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]">
              <Phone className="w-3.5 h-3.5" />
              +44 (0) 141 000 0000
            </a>
            <a href="mailto:enquiries@ardire.co.uk" className="flex items-center gap-2 hover:text-[hsl(43_80%_65%)]">
              <Mail className="w-3.5 h-3.5" />
              enquiries@ardire.co.uk
            </a>
          </div>
          <p>© {new Date().getFullYear()} Árd Íre Hospitality Group · Glasgow</p>
        </div>
      </footer>
    </div>
  );
}
