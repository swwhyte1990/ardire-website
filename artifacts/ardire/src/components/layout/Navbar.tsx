import { useState, useEffect, useRef, type MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { setPendingScroll } from "@/lib/pendingScroll";

// A tap on a touchscreen fires mouseenter and then click, so hover-to-open and
// click-to-toggle cancelled each other out and the first tap did nothing. iPads
// get the desktop nav, so this was every tablet visitor's first impression.
const CAN_HOVER =
  typeof window !== "undefined" && window.matchMedia?.("(hover: hover)").matches;
import logoCrest from "@/assets/images/logo-crest.webp";

const travelServices = [
  { slug: "luxury-tours",     title: "Luxury Tours" },
  { slug: "golf-tours",       title: "Golf Tours" },
  { slug: "private-chauffeur",title: "Private Chauffeur" },
  { slug: "self-guided-tours",title: "Self-Guided Tours" },
];

const eventsServices = [
  { slug: "corporate-incentives", title: "Corporate Incentives" },
  { slug: "event-management",     title: "Event Management" },
  { slug: "event-staffing",       title: "Event Staffing" },
];

function NavDropdown({
  label,
  items,
  hubHref,
  hubLabel,
}: {
  label: string;
  items: { slug: string; title: string }[];
  hubHref: string;
  hubLabel: string;
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
      onMouseEnter={CAN_HOVER ? () => setOpen(true) : undefined}
      onMouseLeave={CAN_HOVER ? () => setOpen(false) : undefined}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
      >
        {label}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div
        inert={!open}
        className={cn(
          "absolute left-0 top-full pt-2 z-50 transition-all duration-200",
          open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
        )}
      >
        <div className="bg-card border border-border min-w-[210px] py-2 shadow-2xl">
          <Link
            href={hubHref}
            onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}
            className="w-full text-left block px-5 py-2.5 text-xs font-sans uppercase tracking-[0.18em] text-primary font-semibold hover:bg-secondary/50 transition-colors duration-200"
          >
            {hubLabel}
          </Link>
          <div className="mx-5 border-t border-border/50 my-1" />
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/services/${item.slug}`}
              onClick={() => { setOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}
              className="w-full text-left block px-5 py-2.5 text-xs font-sans uppercase tracking-[0.18em] text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  function handleNavLinkClick(e: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setPendingScroll(sectionId);
      navigate("/");
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
              src={logoCrest}
              alt="Árdíre Logo"
              className="h-14 w-14 object-contain transition-transform duration-500 group-hover:scale-105"
              width={56}
              height={56}
            />
            <span className="font-display text-xl font-medium tracking-widest uppercase text-foreground">ÁRDÍRE</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavDropdown label="For Private Travellers" items={travelServices} hubHref="/travel" hubLabel="View All Travel" />
            <NavDropdown label="For Business & Events" items={eventsServices} hubHref="/events" hubLabel="View All Events" />
            <a
              href="/#enquiry"
              onClick={(e) => handleNavLinkClick(e, "enquiry")}
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

      {/* Full-screen mobile overlay */}
      <div
        inert={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-0 z-50 bg-background/60 backdrop-blur-md flex flex-col md:hidden transition-all duration-500 ease-in-out",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/20 shrink-0">
          <button
            onClick={() => { setMobileMenuOpen(false); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-3 group"
            aria-label="Go to homepage"
          >
            <img
              src={logoCrest}
              alt="Árdíre Logo"
              className="h-10 w-10 object-contain"
              width={40}
              height={40}
            />
            <span className="font-display text-base tracking-widest uppercase text-foreground">ÁRDÍRE</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors p-1"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable nav body */}
        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-10">

          {/* Travel section */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Travel &amp; Tours</p>
            <Link
              href="/travel"
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}
              className="group flex items-center gap-2 font-display text-2xl italic text-foreground hover:text-primary transition-colors duration-300 mb-5 text-left"
            >
              For Private Travellers
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">→</span>
            </Link>
            <div className="flex flex-col border-t border-border/20">
              {travelServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  className="py-3.5 text-left font-sans text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary border-b border-border/10 transition-colors duration-200"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Events section */}
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-primary mb-4">Events &amp; Corporate</p>
            <Link
              href="/events"
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}
              className="group flex items-center gap-2 font-display text-2xl italic text-foreground hover:text-primary transition-colors duration-300 mb-5 text-left"
            >
              For Business &amp; Events
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">→</span>
            </Link>
            <div className="flex flex-col border-t border-border/20">
              {eventsServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }}
                  className="py-3.5 text-left font-sans text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-primary border-b border-border/10 transition-colors duration-200"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact removed — Enquire CTA handles all inquiries */}
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 px-6 pb-10 pt-6 border-t border-border/20 flex flex-col gap-5">
          <a
            href="/#enquiry"
            onClick={(e) => handleNavLinkClick(e, "enquiry")}
            className="block bg-primary hover:bg-primary/90 text-primary-foreground font-sans text-xs uppercase tracking-[0.3em] py-4 text-center transition-colors duration-300"
          >
            Enquire Now
          </a>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-sans text-muted-foreground">
            <a href="mailto:enquiries@ardire.co.uk" className="hover:text-primary transition-colors">enquiries@ardire.co.uk</a>
            <span className="text-border">·</span>
            <a href="tel:+441412550796" className="hover:text-primary transition-colors">+44 (0)141 255 0796</a>
          </div>
        </div>
      </div>
    </>
  );
}
