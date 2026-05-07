import { motion } from "framer-motion";

const experiences = [
  {
    title: "Highland Estates",
    image: "https://images.unsplash.com/photo-1560082022-f38b482088ee?q=80&w=2940&auto=format&fit=crop",
    className: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    title: "Rare Whisky Experiences",
    image: "https://images.unsplash.com/photo-1516048015710-7a3b4c86be47?q=80&w=2940&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Private Dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Corporate Incentives",
    image: "https://images.unsplash.com/photo-1518182170546-076616fdcbca?q=80&w=2940&auto=format&fit=crop",
    className: "col-span-1 row-span-1",
  },
  {
    title: "Commonwealth '26",
    image: "https://images.unsplash.com/photo-1593118247619-e2d6f056869e?q=80&w=2940&auto=format&fit=crop",
    className: "col-span-1 md:col-span-2 row-span-1",
  }
];

export function Experiences() {
  return (
    <section id="experiences" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Curated <span className="italic text-primary">Experiences</span>
            </h2>
            <p className="text-muted-foreground font-sans max-w-xl font-light">
              A glimpse into the world of ÁrdÍre. Each moment is tailored entirely to your preferences, blending your inspiration with our expertise to ensure no two journeys are ever the same.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${exp.className}`}
            >
              <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors z-10 duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[20%]"
              />

              <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-8 h-[1px] bg-primary mb-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <h3 className="font-display text-xl md:text-2xl text-foreground">
                  {exp.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
