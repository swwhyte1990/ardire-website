import { useEffect, type MouseEvent } from "react";
import { Link, useLocation } from "wouter";
import { usePageMeta } from "@/lib/usePageMeta";
import texture from "@/assets/images/texture.webp";
import logoCrest from "@/assets/images/logo-crest.webp";
import { setPendingScroll } from "@/lib/pendingScroll";
import notFound from "@/data/notFound.json";

export default function NotFound() {
  usePageMeta("404");
  const [, navigate] = useLocation();

  // The enquiry form lives on the home page, so go there and scroll to it.
  function goToEnquiry(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setPendingScroll("enquiry");
    navigate("/");
  }
  // Keep search engines from indexing this page. A page loaded directly already
  // has the tag from the static 404.html; following a broken link inside the site
  // does not, so add it. Either way it goes when the visitor moves on.
  useEffect(() => {
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      robots.content = "noindex";
      document.head.appendChild(robots);
    }
    return () => robots.remove();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Background texture */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: `url(${texture})`,
          backgroundSize: 'cover'
        }}
      />
      
      {/* The same words and links are in the static 404.html, built from
          src/data/notFound.json, so the page reads the same before JavaScript runs. */}
      <div className="text-center relative z-10 px-6 flex flex-col items-center">
        <Link href="/" aria-label="The Árdíre Group, home" className="flex flex-col items-center gap-3 mb-10">
          <img src={logoCrest} alt="" width={96} height={96} className="w-20 h-20 md:w-24 md:h-24 object-contain" />
          <span className="font-display text-xl tracking-[0.25em] text-primary">ÁRDÍRE</span>
        </Link>
        <p className="text-7xl md:text-8xl font-display text-primary/20 select-none leading-none mb-4" aria-hidden="true">404</p>
        <h1 className="text-3xl md:text-4xl font-display text-foreground mb-5">{notFound.heading}</h1>
        <p className="text-muted-foreground font-sans font-light max-w-md mx-auto mb-10">{notFound.line}</p>
        <nav aria-label="Where to next" className="flex flex-wrap items-center justify-center gap-3">
          {notFound.links.map((l) =>
            l.href === "/#enquiry" ? (
              <a
                key={l.href}
                href={l.href}
                onClick={goToEnquiry}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans tracking-widest uppercase text-xs px-6 h-12 inline-flex items-center transition-colors"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-sans tracking-widest uppercase text-xs px-6 h-12 inline-flex items-center transition-colors"
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
