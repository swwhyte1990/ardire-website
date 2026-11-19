import { useId, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
import { useLocation } from "wouter";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { SampleJourney as Journey } from "@/data/sampleJourneys";
import { MAP_HEIGHT, MAP_WIDTH, SCOTLAND_PATH, project } from "@/components/scotlandOutline";
import { setPendingScroll } from "@/lib/pendingScroll";
import { setPendingEnquiry } from "@/lib/pendingEnquiry";
import { cn } from "@/lib/utils";

function toPoints(line: [number, number][]) {
  return line.map(([lon, lat]) => {
    const { x, y } = project(lon, lat);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

function RouteMap({ journey, active }: { journey: Journey; active: number }) {
  // Each day's leg starts where the previous day ended, so the line is continuous.
  const legs = useMemo(() => {
    let from = journey.start;
    return journey.days.map((d) => {
      const leg = [from, ...d.stops];
      from = d.stops[d.stops.length - 1] ?? from;
      return leg;
    });
  }, [journey]);

  // The line drawn for each day follows the roads where the data has them,
  // and falls back to straight lines between the stops where it does not.
  const lines = useMemo(
    () => legs.map((leg, i) => journey.days[i].route ?? leg.map((s): [number, number] => [s.lon, s.lat])),
    [legs, journey],
  );

  const all = [journey.start, ...journey.days.flatMap((d) => d.stops)];
  const activeLeg = legs[active];
  // Only the places this day visits are labelled; the leg's first point is where
  // yesterday ended, except on day one where it is the starting point.
  const labelled = (active === 0 ? activeLeg : activeLeg.slice(1)).filter((s) => s.label !== "none");

  // Zoom to the area the whole route covers, roads and labels included, so the
  // route is legible rather than a small mark on a map of the whole country.
  const { view, sides } = useMemo(() => {
    const pts = all.map((s) => ({ s, ...project(s.lon, s.lat) }));
    const road = lines.flat().map(([lon, lat]) => project(lon, lat));
    const xs = [...pts, ...road].map((p) => p.x), ys = [...pts, ...road].map((p) => p.y);
    const pad = 40;
    let x0 = Math.min(...xs) - pad, x1 = Math.max(...xs) + pad;
    let y0 = Math.min(...ys) - pad, y1 = Math.max(...ys) + pad;
    const minSide = 180;
    if (x1 - x0 < minSide) { const c = (x0 + x1) / 2; x0 = c - minSide / 2; x1 = c + minSide / 2; }
    if (y1 - y0 < minSide) { const c = (y0 + y1) / 2; y0 = c - minSide / 2; y1 = c + minSide / 2; }

    // Label sizes depend on the zoom, and the zoom on the labels, so settle in two passes.
    const sides = new Map<string, "left" | "right">();
    for (let pass = 0; pass < 2; pass++) {
      const u = (x1 - x0) / 300;
      for (const { s, x } of pts) {
        if (s.label === "none") continue;
        const width = (9 + s.name.length * 7.2) * u;
        let side = s.label ?? "right";
        // A label that would run off the edge of Scotland's map flips to the other side.
        if (side === "right" && x + width > MAP_WIDTH) side = "left";
        else if (side === "left" && x - width < 0) side = "right";
        sides.set(s.name, side);
        if (side === "right") x1 = Math.max(x1, x + width + 12 * u);
        else x0 = Math.min(x0, x - width - 12 * u);
      }
    }
    x0 = Math.max(0, x0); y0 = Math.max(0, y0);
    x1 = Math.min(MAP_WIDTH, x1); y1 = Math.min(MAP_HEIGHT, y1);
    return { view: { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, sides };
  }, [journey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Sizes scale with the zoom so dots and labels look the same on every journey.
  const u = view.w / 300;

  return (
    <svg
      viewBox={`${view.x.toFixed(1)} ${view.y.toFixed(1)} ${view.w.toFixed(1)} ${view.h.toFixed(1)}`}
      className="w-full h-auto max-h-[300px] lg:max-h-[560px]"
      role="img"
      aria-label={`Map of the route of ${journey.title}. Day ${active + 1}: ${labelled.map((s) => s.name).join(", ")}`}
    >
      <path d={SCOTLAND_PATH} className="fill-background stroke-primary/25" strokeWidth={0.8 * u} strokeLinejoin="round" />
      <polyline
        points={toPoints(lines.flat())}
        fill="none"
        className="stroke-primary/35"
        strokeWidth={1.4 * u}
        strokeDasharray={`${3 * u} ${4 * u}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <m.polyline
        key={active}
        points={toPoints(lines[active])}
        fill="none"
        className="stroke-primary"
        strokeWidth={3 * u}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />
      {all.map((s, i) => {
        const { x, y } = project(s.lon, s.lat);
        return <circle key={`${s.name}-${i}`} cx={x} cy={y} r={2.6 * u} className="fill-primary/50" />;
      })}
      {labelled.map((s, i) => {
        const { x, y } = project(s.lon, s.lat);
        const right = sides.get(s.name) !== "left";
        return (
          <g key={`${active}-${s.name}-${i}`}>
            <circle cx={x} cy={y} r={5 * u} className="fill-primary stroke-background" strokeWidth={1.5 * u} />
            <text
              x={right ? x + 9 * u : x - 9 * u}
              y={y + 4 * u}
              textAnchor={right ? "start" : "end"}
              className="fill-foreground font-sans"
              style={{ fontSize: 12 * u, paintOrder: "stroke" }}
              stroke="hsl(var(--background))"
              strokeWidth={3 * u}
            >
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function SampleJourney({ journey }: { journey: Journey }) {
  const [, navigate] = useLocation();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const pointerX = useRef<number | null>(null);
  const tabsId = useId();
  const last = journey.days.length - 1;
  const day = journey.days[active];

  function go(next: number) {
    const clamped = Math.max(0, Math.min(last, next));
    if (clamped === active) return;
    setDirection(clamped > active ? 1 : -1);
    setActive(clamped);
  }

  function onTabKey(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = Math.max(0, Math.min(last, keys[e.key]));
    go(next);
    document.getElementById(`${tabsId}-tab-${next}`)?.focus();
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    pointerX.current = e.clientX;
  }

  function onPointerUp(e: PointerEvent<HTMLDivElement>) {
    if (pointerX.current === null) return;
    const dx = e.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(dx) > 50) go(active + (dx < 0 ? 1 : -1));
  }

  function makeThisYours(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setPendingEnquiry({
      service: journey.service,
      message: `I'd love a journey like "${journey.title}", shaped around us.`,
    });
    setPendingScroll("enquiry");
    navigate("/");
  }

  return (
    <div className="space-y-10">
      <div className="max-w-3xl space-y-4 font-sans font-light text-muted-foreground leading-relaxed text-base">
        {journey.story.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 lg:gap-12 items-start">
        <div className="bg-card border border-border/40 p-3 md:p-6">
          <RouteMap journey={journey} active={active} />
          <p className="mt-2 text-right font-sans text-[10px] leading-none text-muted-foreground/70">
            Roads ©{" "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              OpenStreetMap
            </a>{" "}
            contributors
          </p>
        </div>

        <div>
          <div
            role="tablist"
            aria-label={`Days of ${journey.title}`}
            onKeyDown={onTabKey}
            className="grid grid-flow-col auto-cols-fr gap-2 mb-6 sm:flex sm:flex-wrap"
          >
            {journey.days.map((d, i) => (
              <button
                key={d.title}
                id={`${tabsId}-tab-${i}`}
                role="tab"
                aria-selected={i === active}
                aria-controls={`${tabsId}-panel`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => go(i)}
                className={cn(
                  "font-sans text-xs uppercase tracking-[0.2em] px-2 sm:px-4 py-2.5 border transition-colors duration-200",
                  i === active
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                <span className="sm:hidden" aria-hidden="true">{i + 1}</span>
                <span className="hidden sm:inline">Day {i + 1}</span>
                <span className="sr-only sm:hidden">Day {i + 1}</span>
              </button>
            ))}
          </div>

          <div
            id={`${tabsId}-panel`}
            role="tabpanel"
            aria-labelledby={`${tabsId}-tab-${active}`}
            aria-live="polite"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            className="relative min-h-[300px] touch-pan-y select-none overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <m.div
                key={active}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="bg-card border-l-2 border-primary p-6 md:p-8"
              >
                <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-2">Day {active + 1}</p>
                <h4 className="font-display text-2xl md:text-3xl text-foreground mb-6">{day.title}</h4>
                <ul className="space-y-3 mb-6">
                  {day.highlights.map((h) => (
                    <li key={h} className="flex gap-3 font-sans font-light text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 shrink-0 bg-primary" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
                {day.onTheRoad && (
                  <blockquote className="border-t border-border/40 pt-5">
                    <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-2">On the road</p>
                    <p className="font-sans italic font-light text-base text-foreground leading-relaxed">{day.onTheRoad}</p>
                  </blockquote>
                )}
              </m.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => go(active - 1)}
              disabled={active === 0}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors p-2 -ml-2"
              aria-label="Previous day"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
            <span className="font-sans text-xs text-muted-foreground" aria-hidden="true">
              {active + 1} / {journey.days.length}
            </span>
            <button
              onClick={() => go(active + 1)}
              disabled={active === last}
              className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary disabled:opacity-30 disabled:pointer-events-none transition-colors p-2 -mr-2"
              aria-label="Next day"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-border/40 pt-8">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-1">Price on enquiry</p>
          <p className="font-sans font-light text-sm text-muted-foreground max-w-md">
            Every journey is shaped around you, so the cost depends on the route, the stays and the pace you choose.
          </p>
        </div>
        <a
          href="/#enquiry"
          onClick={makeThisYours}
          className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-8 h-14 transition-colors shrink-0"
        >
          Make this yours <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
