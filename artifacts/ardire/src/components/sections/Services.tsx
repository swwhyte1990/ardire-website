import { motion } from "framer-motion";
import { Key, Map, GlassWater } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      icon: <Key className="w-8 h-8 text-primary" strokeWidth={1} />,
      title: "Private Concierge",
      description: "Round-the-clock dedicated lifestyle management. From securing elusive reservations to handling complex logistics with absolute discretion."
    },
    {
      icon: <Map className="w-8 h-8 text-primary" strokeWidth={1} />,
      title: "Luxury Expeditions",
      description: "Curated journeys through the Highlands and Isles. Travel by private helicopter, classic car, or chartered yacht to destinations unknown."
    },
    {
      icon: <GlassWater className="w-8 h-8 text-primary" strokeWidth={1} />,
      title: "Event Management",
      description: "Masterfully orchestrated gatherings. Corporate retreats in historic manors, milestone celebrations, and exclusive stag or hen experiences."
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-secondary/50 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans tracking-[0.3em] uppercase text-primary mb-4 text-xs"
          >
            Our Expertise
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl text-foreground"
          >
            The Pillars of <span className="italic">Ardire</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-card border-border/50 rounded-none h-full hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative">
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="pt-10 pb-6 relative z-10">
                  <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    {service.icon}
                  </div>
                  <CardTitle className="font-display text-2xl text-foreground font-medium">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-muted-foreground font-sans leading-relaxed font-light">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
