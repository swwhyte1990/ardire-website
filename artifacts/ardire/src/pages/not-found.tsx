import { useEffect } from "react";
import { Link } from "wouter";
import { usePageMeta } from "@/lib/usePageMeta";
import { Button } from "@/components/ui/button";
import texture from "@/assets/images/texture.webp";

export default function NotFound() {
  usePageMeta("404");
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
      
      <div className="text-center relative z-10 space-y-6">
        <h1 className="text-8xl md:text-9xl font-display text-primary/20 select-none">404</h1>
        <h2 className="text-3xl md:text-4xl font-display text-foreground">Path Not Found</h2>
        <p className="text-muted-foreground font-sans font-light max-w-md mx-auto">
          The Highland path you are seeking seems to have faded into the mist. Let us guide you back to familiar terrain.
        </p>
        <div className="pt-8">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-sans tracking-widest uppercase text-xs rounded-none px-8 h-12">
            <Link href="/">Return to Árdíre</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
