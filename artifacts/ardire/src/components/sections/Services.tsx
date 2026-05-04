import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export function Services() {
  const [, navigate] = useLocation();

  function goToTravel() {
    navigate("/services/luxury-tours");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function goToEvents() {
    navigate("/services/event-management");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <section id="services" className="px-6 md:px-10 pb-20 -mt-20 relative z-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1 bg-background">

        {/* Travel & Tours */}
        <button
          onClick={goToTravel}
          className="group relative block w-full h-[360px] md:h-[420px] overflow-hidden text-left"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/hero.webp`}
            alt="Travel & Tours — Scottish Highlands"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-foreground/70 mb-3">
              For Private Travellers
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Travel &amp; Tours
            </h2>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-5 max-w-md">
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
          className="group relative block w-full h-[360px] md:h-[420px] overflow-hidden text-left"
        >
          <img
            src={`${import.meta.env.BASE_URL}images/about.webp`}
            alt="Events & Hospitality"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, transparent 65%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
            <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-foreground/70 mb-3">
              For Companies &amp; Organisers
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-3">
              Events &amp; Hospitality
            </h2>
            <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-5 max-w-md">
              Corporate incentives, end-to-end event management, professional event staffing, and Glasgow 2026 hospitality.
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
