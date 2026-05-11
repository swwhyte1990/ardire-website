import { useState, useEffect, useRef, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

const travelServices = [
  { slug: "luxury-tours",     title: "Luxury Tours" },
  { slug: "golf-tours",       title: "Golf Tours" },
  { slug: "private-chauffeur",title: "Private Chauffeur" },
  { slug: "self-guided-tours",title: "Self-Guided Tours" },
  { slug: "concierge",        title: "Concierge" },
];

const eventsServices = [
  { slug: "corporate-incentives", title: "Corporate Incentives" },
  { slug: "event-management",     title: "Event Management" },
  { slug: "event-staffing",       title: "Event Staffing" },
  { slug: "commonwealth-26",      title: "Commonwealth '26" },
];

function NavDropdown({
  label,
  items,
  onItemClick,
  hubHref,
  hubLabel,
  onHubClick,
}: {
  label: string;
  items: { slug: string; title: string }[];
  onItemClick: (slug: string) => void;
  hubHref: string;
  hubLabel: string;
  onHubClick: (href: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
      >
        {label}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div
        className={cn(
          "absolute left-0 top-full pt-2 z-50 transition-all duration-200",
          open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
        )}
      >
        <div className="bg-card border border-border min-w-[210px] py-2 shadow-2xl">
          <button
            onClick={() => { setOpen(false); onHubClick(hubHref); }}
            className="w-full text-left block px-5 py-2.5 text-xs font-sans uppercase tracking-[0.18em] text-primary font-semibold hover:bg-secondary/50 transition-colors duration-200"
          >
            {hubLabel}
          </button>
          <div className="mx-5 border-t border-border/50 my-1" />
          {items.map((item) => (
            <button
              key={item.slug}
              onClick={() => { setOpen(false); onItemClick(item.slug); }}
              className="w-full text-left block px-5 py-2.5 text-xs font-sans uppercase tracking-[0.18em] text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors duration-200"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileTravel, setMobileTravel] = useState(false);
  const [mobileEvents, setMobileEvents] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    if (!mobileMenuOpen) { setMobileTravel(false); setMobileEvents(false); }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  function goToService(slug: string) {
    navigate(`/services/${slug}`);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function goToHub(href: string) {
    navigate(href);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function handleNavLinkClick(e: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out border-b border-transparent",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-border/50 py-4 shadow-lg shadow-black/20"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/logo.webp`}
              alt="Ardire Logo"
              className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "brightness(0.86) saturate(1.45)" }}
            />
            <span className="font-display text-xl font-medium tracking-widest uppercase text-foreground">ÁRDÍRE</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavDropdown label="Travel" items={travelServices} onItemClick={goToService} hubHref="/travel" hubLabel="View All Travel" onHubClick={goToHub} />
            <NavDropdown label="Events" items={eventsServices} onItemClick={goToService} hubHref="/events" hubLabel="View All Events" onHubClick={goToHub} />
            <a
              href="/#enquiry"
              onClick={(e) => handleNavLinkClick(e, "contact")}
              className="text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </a>
            <a
              href="/#enquiry"
              onClick={(e) => handleNavLinkClick(e, "contact")}
              className="bg-primary text-primary-foreground text-xs font-sans uppercase tracking-[0.2em] px-5 py-2.5 hover:bg-primary/90 transition-colors"
            >
              Enquire
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-400 md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Slide-in drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 z-50 bg-background flex flex-col transition-transform duration-500 ease-in-out md:hidden shadow-2xl",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-border/30">
          <span className="font-display text-base tracking-[0.25em] uppercase text-foreground">Menu</span>
          <button onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Close menu">
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <ul className="flex flex-col px-8 pt-10 gap-7 overflow-y-auto">
          {/* Travel */}
          <li>
            <button
              type="button"
              onClick={() => setMobileTravel((v) => !v)}
              className="w-full flex items-center justify-between font-display text-xl italic text-foreground hover:text-primary transition-colors"
            >
              <span>Travel</span>
              <ChevronDown size={18} strokeWidth={1.5} className={cn("transition-transform duration-300", mobileTravel && "rotate-180")} />
            </button>
            <div className={cn("grid transition-all duration-400 ease-in-out", mobileTravel ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0")}>
              <ul className="overflow-hidden flex flex-col gap-3 pl-4 border-l border-border/40">
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); goToHub("/travel"); }} className="font-display text-base text-primary font-semibold hover:text-primary/80 transition-colors block py-0.5 text-left w-full">
                    View All Travel
                  </button>
                </li>
                <li className="-ml-4 border-t border-border/40" />
                {travelServices.map((s) => (
                  <li key={s.slug}>
                    <button onClick={() => { setMobileMenuOpen(false); goToService(s.slug); }} className="font-display text-base text-muted-foreground hover:text-primary transition-colors block py-0.5 text-left w-full">
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Events */}
          <li>
            <button
              type="button"
              onClick={() => setMobileEvents((v) => !v)}
              className="w-full flex items-center justify-between font-display text-xl italic text-foreground hover:text-primary transition-colors"
            >
              <span>Events</span>
              <ChevronDown size={18} strokeWidth={1.5} className={cn("transition-transform duration-300", mobileEvents && "rotate-180")} />
            </button>
            <div className={cn("grid transition-all duration-400 ease-in-out", mobileEvents ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0")}>
              <ul className="overflow-hidden flex flex-col gap-3 pl-4 border-l border-border/40">
                <li>
                  <button onClick={() => { setMobileMenuOpen(false); goToHub("/events"); }} className="font-display text-base text-primary font-semibold hover:text-primary/80 transition-colors block py-0.5 text-left w-full">
                    View All Events
                  </button>
                </li>
                <li className="-ml-4 border-t border-border/40" />
                {eventsServices.map((s) => (
                  <li key={s.slug}>
                    <button onClick={() => { setMobileMenuOpen(false); goToService(s.slug); }} className="font-display text-base text-muted-foreground hover:text-primary transition-colors block py-0.5 text-left w-full">
                      {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Contact */}
          <li>
            <a href="/#enquiry" onClick={(e) => handleNavLinkClick(e, "contact")} className="font-display text-xl italic text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </li>
        </ul>

        <div className="mt-auto px-8 pb-10 pt-8 border-t border-border/30">
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">The ÁrdÍre Group</p>
          <a href="mailto:enquiries@ardire.co.uk" className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors block mb-1">enquiries@ardire.co.uk</a>
          <a href="tel:+441412550796" className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors block">+44 (0)141 255 0796</a>
        </div>
      </div>
    </>
  );
}
