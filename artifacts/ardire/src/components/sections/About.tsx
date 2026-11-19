import { m } from "framer-motion";
import texture from "@/assets/images/texture.webp";

export function About() {
  return (
    <section id="about" className="py-16 md:py-32 relative bg-background overflow-hidden">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundSize: 'cover'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-8">
              The Árdíre Group<span className="italic text-primary">.</span>
            </h2>

            <div className="space-y-6 text-muted-foreground font-sans text-base leading-relaxed font-light">
              <p>
                What stays with people is how a trip felt. The arrival, the first evening, the sense of being well looked after.
              </p>
              <p>
                Árdíre is a team of event butlers. We work with private households, concierge services and event companies across Scotland and the UK, and that work has taught us what guests from many cultures want when they finally have time to rest and enjoy each other's company.
              </p>
              <p>
                We bring that instinct for people to everything we arrange, along with a wide network across Scotland and the ideas to use it well. We know what makes a moment feel looked after.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary/50" />
              <p className="font-display italic text-xl text-foreground">
                Thoughtfully Planned. Quietly Delivered.
              </p>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
