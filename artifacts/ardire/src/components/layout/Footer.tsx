import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sidebar py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">

        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-4">
            <img
              src={`${import.meta.env.BASE_URL}images/logo.png`}
              alt="Árd Íre Logo"
              className="h-24 w-24 object-contain"
            />
            <div>
              <span className="font-display text-xl tracking-widest uppercase text-foreground block">
                ÁRD ÍRE
              </span>
              <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
                Hospitality Group
              </span>
            </div>
          </div>
          <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            Thoughtfully Curated. Seamlessly Delivered. Uniquely Yours.
          </p>
          <div className="text-muted-foreground font-sans text-xs leading-relaxed mt-2">
            <p>Clyde Offices, 2nd Floor, 48 West George Street</p>
            <p>Glasgow G2 1BP, Scotland</p>
            <a href="mailto:inquire@ardire.co.uk" className="hover:text-primary transition-colors">inquire@ardire.co.uk</a>
            <span className="mx-2">·</span>
            <a href="tel:+441412550796" className="hover:text-primary transition-colors">+44 (0)141 255 0796</a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={20} strokeWidth={1.5} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
          </div>
          <nav className="flex flex-col md:items-end gap-2 text-xs font-sans text-muted-foreground uppercase tracking-widest">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <a href="#experiences" className="hover:text-primary transition-colors">Experiences</a>
            <a href="#contact" className="hover:text-primary transition-colors">Get in Touch</a>
          </nav>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans text-muted-foreground">
          © {new Date().getFullYear()} Árd Íre Hospitality Group. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs font-sans text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
