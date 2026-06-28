import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export function Services() {
  const [, navigate] = useLocation();

  function goToTravel() {
    navigate("/travel");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function goToEvents() {
    navigate("/events");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <section id="services" className="px-6 md:px-10 pb-20 -mt-20 relative z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-[calc(1px+2mm)] bg-background items-stretch">

        {/* Travel & Tours */}
        <button
          onClick={goToTravel}
          className="group relative block w-full h-[300px] md:h-[360px] overflow-hidden text-left"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/travel-glenfinnan.webp`}
            srcSet={`${import.meta.env.BASE_URL}images/travel-glenfinnan-sm.webp 800w, ${import.meta.env.BASE_URL}images/travel-glenfinnan.webp 1440w`}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Glenfinnan Viaduct — Travel & Tours across Scotland"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            loading="lazy"
            width={1440}
            height={811}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-foreground/70 mb-2">
              For Private Travellers
            </p>
            <h2 className="font-display text-2xl md:text-4xl text-foreground mb-2">
              Travel &amp; Tours
            </h2>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-4 max-w-md hidden sm:block">
              Privately guided tours, championship golf, chauffeur, self-guided journeys and 24/7 concierge across Scotland.
            </p>
            <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-foreground group-hover:gap-3 transition-all duration-300">
              Plan a Private Tour <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </button>

        {/* Events & Hospitality */}
        <button
          onClick={goToEvents}
          className="group relative block w-full h-[300px] md:h-[360px] overflow-hidden text-left"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/events-hero.webp`}
            srcSet={`${import.meta.env.BASE_URL}images/events-hero-sm.webp 800w, ${import.meta.env.BASE_URL}images/events-hero.webp 1920w`}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Events & Hospitality"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            loading="lazy"
            width={1920}
            height={1281}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-foreground/70 mb-2">
              For Businesses &amp; Organisers
            </p>
            <h2 className="font-display text-2xl md:text-4xl text-foreground mb-2">
              Events &amp; Corporate
            </h2>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-4 max-w-md hidden sm:block">
              Corporate incentives, end-to-end event management, professional event staffing, and Glasgow 2026 support.
            </p>
            <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-foreground group-hover:gap-3 transition-all duration-300">
              Discuss an Event <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </button>

      </div>
    </section>
  );
}
