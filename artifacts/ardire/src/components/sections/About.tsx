import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative bg-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}images/texture.webp)`,
          backgroundSize: 'cover'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/about.webp`}
              alt="Scottish Highland Landscape"
              className="w-full aspect-[4/5] object-cover rounded-sm grayscale-[30%] contrast-[1.1] brightness-[0.9]"
              loading="lazy"
            />
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square border border-primary/30 -z-10" />
            <div className="absolute -top-8 -left-8 w-1/2 aspect-square bg-muted/50 -z-10 blur-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-8">
              The ÁrdÍre Group<span className="italic text-primary">.</span>
            </h2>

            <div className="space-y-6 text-muted-foreground font-sans text-base leading-relaxed font-light">
              <p>
                Truly exceptional experiences are rarely about what is arranged. They are about how it feels to arrive, to settle in, to be genuinely looked after. The difference between an impressive itinerary and an unforgettable one comes down to something far more personal.
              </p>
              <p>
                ÁrdÍre was founded by people who had spent their careers as butlers, working at the highest levels of private service in households, luxury hotels, and aboard private vessels. In those roles they developed something rare: an intimate, human understanding of what people from different cultures and backgrounds actually want when they finally have time to relax and enjoy the company of those around them.
              </p>
              <p>
                That understanding is what we bring to every experience we create. The network, the creativity, and the expertise you would expect from a premium Scottish concierge group, combined with a genuine instinct for people. We know what makes a moment feel looked after. That is what makes it unforgettable.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary/50" />
              <p className="font-display italic text-xl text-foreground">
                "Thoughtfully Curated. Seamlessly Delivered."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
