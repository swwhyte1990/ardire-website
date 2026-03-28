import { Instagram } from "lucide-react";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
  );
}

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
              <span className="font-display text-xl tracking-widest uppercase text-foreground block">ÁRDÍRE</span>
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
            <a href="mailto:enquiries@ardire.co.uk" className="hover:text-primary transition-colors">enquiries@ardire.co.uk</a>
            <span className="mx-2">·</span>
            <a href="tel:+441412550796" className="hover:text-primary transition-colors">+44 (0)141 255 0796</a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex gap-6">
            <a
              href="https://www.instagram.com/ardiregroupsocial?igsh=MTh2OWNkZzJrZHBvdg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.tiktok.com/@ardiregroup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon size={20} />
            </a>
          </div>
        </div>

      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-sans text-muted-foreground">
          © {new Date().getFullYear()} Árdíre Hospitality Group. All rights reserved.
        </p>
        <div className="flex gap-6 text-xs font-sans text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
