import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sidebar py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo.png`} 
              alt="Ardire Logo" 
              className="h-24 w-24 object-contain"
            />
            <span className="font-display text-xl tracking-widest uppercase text-foreground">
              ARDIRE
            </span>
          </div>
          <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
            Scotland. Crafted for You.
          </p>
        </div>

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

      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans text-muted-foreground">
          © {new Date().getFullYear()} Ardire. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs font-sans text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
