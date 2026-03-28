import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Get in Touch", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-6 bg-background/60 backdrop-blur-md border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
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
                  href={link.href}
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
          className="md:hidden text-foreground hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile Menu — offset matches fixed navbar height (py-6 + h-16 logo = ~112px) */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-28 bg-background border-t border-border/50 flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-display italic text-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <Button
          asChild
          className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-sans tracking-widest uppercase text-sm px-8 py-6"
        >
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Enquire Now</a>
        </Button>
      </div>
    </nav>
  );
}
