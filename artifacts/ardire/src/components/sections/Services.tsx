import { motion } from "framer-motion";
import { Key, Map, Users, Compass, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { services } from "@/data/services";

const icons: Record<string, React.ReactNode> = {
  "luxury-tours": <Map className="w-8 h-8 text-primary" strokeWidth={1} />,
  "corporate-incentives": <Star className="w-8 h-8 text-primary" strokeWidth={1} />,
  "self-guided-tours": <Compass className="w-8 h-8 text-primary" strokeWidth={1} />,
  "event-staffing": <Users className="w-8 h-8 text-primary" strokeWidth={1} />,
  "concierge": <Key className="w-8 h-8 text-primary" strokeWidth={1} />,
  "commonwealth-26": <Star className="w-8 h-8 text-primary" strokeWidth={1} />,
};

const descriptions: Record<string, string> = {
  "luxury-tours": "Expertly guided journeys through Scotland's most dramatic landscapes, private estates, and hidden corners. Tailored entirely around your pace, interests, and appetite for adventure.",
  "corporate-incentives": "High-impact incentive programmes that reward, inspire, and motivate. From Highland challenges to exclusive gala dinners, we create experiences your team will never forget.",
  "self-guided-tours": "For those who seek freedom with a safety net of expertise. We curate the itinerary, pre-book the best stops, and provide round-the-clock support. You choose the pace.",
  "event-staffing": "Professional, discreet, and impeccably presented event staff for any occasion. Our team bring expertise, warmth, and composure to every event we support.",
  "concierge": "Round-the-clock lifestyle management for discerning individuals. From securing impossible reservations to orchestrating complex logistics, handled with absolute discretion.",
  "commonwealth-26": "Árdíre is proud to be supporting the Glasgow 2026 Commonwealth Games, delivering bespoke visitor experiences, VIP hospitality, and corporate programmes around this landmark event.",
};

export function Services() {
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
            className="font-display text-3xl md:text-4xl text-foreground"
          >
            What We <span className="italic">Deliver</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="block h-full"
              >
                <Card className="bg-card border-border/50 rounded-none h-full hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <CardHeader className="pt-10 pb-6 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      {icons[service.slug]}
                    </div>
                    <CardTitle className="font-display text-xl text-foreground font-medium">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground font-sans leading-relaxed font-light mb-6">
                      {descriptions[service.slug]}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-xs font-sans tracking-widest uppercase group-hover:gap-4 transition-all duration-300">
                      <span>Learn More</span>
                      <ArrowRight size={14} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
