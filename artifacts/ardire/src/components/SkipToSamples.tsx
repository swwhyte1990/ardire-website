import type { MouseEvent } from "react";
import { ArrowDown } from "lucide-react";

/** The id of the sample journeys section on each page that has one. */
export const SAMPLES_ID = "samples";

/**
 * A link in the hero for visitors who would rather see an example than read the
 * page first. It scrolls down to the sample journeys section and, where the page
 * passes onSkip, opens the sample so it is ready to step through.
 */
export function SkipToSamples({ label, onSkip }: { label: string; onSkip?: () => void }) {
  function skip(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const target = document.getElementById(SAMPLES_ID);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Move keyboard focus with the scroll, so the next Tab continues from the samples.
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (!onSkip) return;
    // Opening the sample changes the page height, which cancels a smooth scroll
    // that is still running, so open it once the scroll has arrived.
    let done = false;
    const open = () => { if (!done) { done = true; onSkip(); } };
    if ("onscrollend" in window && !reduce) {
      window.addEventListener("scrollend", open, { once: true });
      window.setTimeout(open, 1500); // in case the scroll is interrupted and never ends
    } else {
      window.setTimeout(open, reduce ? 0 : 700);
    }
  }

  return (
    <a
      href={`#${SAMPLES_ID}`}
      onClick={skip}
      className="group mt-8 inline-flex items-center gap-3 border border-primary/60 px-6 h-12 font-sans text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {label}
      <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
    </a>
  );
}
