import { m } from "framer-motion";
import texture from "@/assets/images/texture.webp";
import homePage from "@/data/homePage.json";

// Shared with the build, which writes the same words into the homepage's raw HTML.
const { about } = homePage;

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
              {about.heading}
            </h2>

            <div className="space-y-6 text-muted-foreground font-sans text-base leading-relaxed font-light">
              {about.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary/50" />
              <p className="font-display italic text-xl text-foreground">
                {about.tagline}
              </p>
            </div>
          </m.div>

        </div>
      </div>
    </section>
  );
}
