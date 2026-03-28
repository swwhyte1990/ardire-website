import { useState, useEffect, type MouseEvent } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-border/50 py-4 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
          <img
            src={`${import.meta.env.BASE_URL}images/logo.png`}
            alt="Ardire Logo"
            className="h-16 w-16 object-contain transition-transform duration-500 group-hover:scale-105"
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground hover:text-primary transition-colors relative z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu — full-screen overlay, toggle button sits above it via z-50 */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={`/#${link.sectionId}`}
                onClick={(e) => handleNavClick(e, link.sectionId)}
                className="text-2xl font-display italic text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
