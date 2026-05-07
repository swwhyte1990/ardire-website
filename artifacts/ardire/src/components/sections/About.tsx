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
              The ÁrdÍre<br/>
              <span className="italic text-primary">Group.</span>
            </h2>

            <div className="space-y-6 text-muted-foreground font-sans text-base leading-relaxed font-light">
              <p>
                ÁrdÍre, meaning "high place" in Scottish Gaelic, was founded on a belief that truly exceptional experiences require more than a booking; they require vision, deep local knowledge, and a team that treats every detail as a privilege.
              </p>
              <p>
                We provide bespoke concierge and event planning services to elevate your holiday, corporate incentive or major event. Tour Scotland and beyond, blending your inspiration with our expertise to create unforgettable experiences.
              </p>
              <p>
                From intimate private tours to large-scale corporate incentive programmes, we blend your ambitions with our network, creativity, and on-the-ground expertise, seamlessly delivering moments that matter.
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
