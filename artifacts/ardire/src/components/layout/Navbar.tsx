import { useState, useEffect, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "About Us", sectionId: "about" },
    { name: "Services", sectionId: "services" },
    { name: "Get in Touch", sectionId: "contact" },
  ];

  function handleNavClick(e: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    e.preventDefault();
    setMobileMenuOpen(false);
    const isHome = location === "/" || location === "";
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }

  return (
    <>
      {/* Main navbar */}
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
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="Ardire Logo"
              className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-105"
              style={{ filter: "brightness(0.86) saturate(1.45)" }}
            />
            <span className="font-display text-2xl font-medium tracking-widest uppercase text-foreground">
              ÁRDÍRE
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/#${link.sectionId}`}
                    onClick={(e) => handleNavClick(e, link.sectionId)}
                    className="text-sm font-sans tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
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
        {/* Drawer header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border/30">
          <span className="font-display text-base tracking-[0.25em] uppercase text-foreground">
            Menu
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col px-8 pt-10 gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={`/#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className="font-display text-xl italic text-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Drawer footer */}
        <div className="mt-auto px-8 pb-10 pt-8 border-t border-border/30">
          <p className="font-sans text-xs tracking-widest uppercase text-muted-foreground mb-3">
            Árd Íre Hospitality Group
          </p>
          <a
            href="mailto:enquiries@ardire.co.uk"
            className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors block mb-1"
          >
            enquiries@ardire.co.uk
          </a>
          <a
            href="tel:+441412550796"
            className="font-sans text-xs text-muted-foreground hover:text-primary transition-colors block"
          >
            +44 (0)141 255 0796
          </a>
        </div>
      </div>
    </>
  );
}
