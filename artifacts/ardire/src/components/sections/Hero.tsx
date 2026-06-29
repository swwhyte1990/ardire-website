import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full flex items-end md:items-end justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-home.webp`}
          alt="Scottish Castle on a Loch"
          className="kenburns-img w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1280}
          height={853}
        />
        {/* Black at top — no green cast over the image */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/35 to-transparent" />
        {/* Brand green at bottom — dissolves cleanly into the page background */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, hsl(155 58% 7%) 0%, hsl(155 58% 7% / 0.7) 25%, transparent 55%)" }}
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0 }}
        >
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-foreground/80 mb-6">
            The ÁrdÍre Group · Glasgow
          </p>
          <h1 className="font-display text-4xl md:text-[3.4rem] text-foreground leading-[1.05] mb-6 max-w-2xl">
            Luxury Tours of Scotland &amp; Event Services
          </h1>
          <p className="hidden sm:block font-sans text-base md:text-lg text-foreground/85 max-w-xl leading-relaxed">
            Bespoke private tours, concierge and event hospitality, crafted in Glasgow and delivered across Scotland.
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1.02); }
          to   { transform: scale(1.08); }
        }
        .kenburns-img {
          animation: kenburns 20s ease-in-out 1 forwards;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .kenburns-img {
            animation: none;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
