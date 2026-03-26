import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative bg-background overflow-hidden">
      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ 
          backgroundImage: `url(${import.meta.env.BASE_URL}images/texture.png)`,
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
            className="relative"
          >
            {/* about section elegant ancient scottish map or compass detail */}
            <img 
              src="https://pixabay.com/get/ga83448586fe88b173f16c96661b5a8e4e56a63852556afcc977c9d194d9e79143891f6501eb132c9af389f8c1efe1b5f57ca6cbf81e8aefaa4d8d54a4374f928_1280.jpg" 
              alt="Scottish Heritage" 
              className="w-full aspect-[4/5] object-cover rounded-sm grayscale-[30%] contrast-[1.1] brightness-[0.9]"
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
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8">
              The True Essence<br/>
              <span className="italic text-primary">of Alba.</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground font-sans text-lg leading-relaxed font-light">
              <p>
                Ardire was born from a profound connection to the Scottish landscape and a desire to reveal its most closely guarded secrets to a discerning few. 
              </p>
              <p>
                We do not offer pre-packaged itineraries. Instead, we act as your personal keyholder to the Highlands—opening doors to privately-owned castles, securing tastings of unreleased single malts, and curating expeditions that transcend typical luxury travel.
              </p>
              <p>
                Our ethos is rooted in discretion, deep local knowledge, and an uncompromising dedication to bespoke service. Whether you seek the solitude of a remote estate or the vibrant energy of an exclusive Edinburgh gala, Ardire orchestrates perfection.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-[1px] bg-primary/50" />
              <p className="font-display italic text-2xl text-foreground">
                "Beyond Travel. Total Immersion."
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
