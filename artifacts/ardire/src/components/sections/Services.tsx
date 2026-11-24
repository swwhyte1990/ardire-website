import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import eventsHeroSm from "@/assets/images/events-hero-sm.webp";
import eventsHero from "@/assets/images/events-hero.webp";
import travelGlenfinnanSm from "@/assets/images/travel-glenfinnan-sm.webp";
import travelGlenfinnan from "@/assets/images/travel-glenfinnan.webp";
import homePage from "@/data/homePage.json";

// These two cards are the main entry points to the hub pages, so they need to be
// real anchors: a <button> gives a crawler no href to follow and a visitor no way
// to open the page in a new tab.
const toTop = () => window.scrollTo({ top: 0, behavior: "instant" });

// The words on the cards come from src/data/homePage.json, which the build also
// reads to write the homepage's raw HTML. The pictures stay here.
const cardImages = [
  {
    src: travelGlenfinnan,
    srcSet: `${travelGlenfinnanSm} 800w, ${travelGlenfinnan} 1440w`,
    alt: "Glenfinnan Viaduct, Travel and Tours across Scotland",
    width: 1440,
    height: 811,
  },
  {
    src: eventsHero,
    srcSet: `${eventsHeroSm} 800w, ${eventsHero} 1440w`,
    alt: "Events & Hospitality",
    width: 1440,
    height: 961,
  },
];

export function Services() {
  return (
    <section id="services" className="px-6 md:px-10 pt-16 md:pt-32 pb-20 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[calc(1px+2mm)] bg-background items-stretch">
        {homePage.cards.map((card, i) => (
          <Link
            key={card.href}
            href={card.href}
            onClick={toTop}
            className="group relative block w-full h-[300px] md:h-[360px] overflow-hidden text-left"
          >
            <img
              src={cardImages[i].src}
              srcSet={cardImages[i].srcSet}
              sizes="(min-width: 768px) 50vw, 100vw"
              alt={cardImages[i].alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
              loading="lazy"
              width={cardImages[i].width}
              height={cardImages[i].height}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)" }}
            />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-foreground/70 mb-2">
                {card.eyebrow}
              </p>
              <h2 className="font-display text-2xl md:text-4xl text-foreground mb-2">
                {card.title}
              </h2>
              <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-4 max-w-md hidden sm:block">
                {card.text}
              </p>
              <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-foreground group-hover:gap-3 transition-all duration-300">
                {card.cta} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
