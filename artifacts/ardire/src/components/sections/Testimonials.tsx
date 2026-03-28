import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Ardire delivered the impossible. They secured a private tasting with a master distiller that money simply cannot buy, followed by a helicopter transit to a castle we had entirely to ourselves. Flawless execution.",
    author: "James M.",
    title: "Private Client, New York"
  },
  {
    quote: "Our corporate retreat in the Highlands was transformed into an unforgettable saga. The attention to detail, the seamless logistics, and the breathtaking venues were beyond anything we've experienced globally.",
    author: "Elena R.",
    title: "CEO, Tech Enterprise"
  },
  {
    quote: "Discreet, deeply connected, and intuitively preemptive of our every need. Ardire is not just a concierge; they are the ultimate custodians of Scottish luxury.",
    author: "Lord & Lady B.",
    title: "London"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-card relative overflow-hidden">
      {/* Decorative large quotes */}
      <div className="absolute top-10 left-10 md:top-20 md:left-20 text-[200px] leading-none font-display text-muted/10 select-none pointer-events-none">
        "
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <p className="font-sans tracking-[0.3em] uppercase text-primary mb-16 text-xs">
          Client Journal
        </p>

        <div className="h-[250px] md:h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="px-4"
            >
              <h3 className="font-display text-xl md:text-2xl text-foreground italic leading-relaxed mb-8">
                "{testimonials[currentIndex].quote}"
              </h3>
              <div className="font-sans uppercase tracking-widest text-sm text-primary">
                {testimonials[currentIndex].author}
              </div>
              <div className="font-sans text-xs text-muted-foreground mt-2">
                {testimonials[currentIndex].title}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prev}
            className="rounded-full border-border/50 text-muted-foreground hover:text-primary hover:border-primary bg-transparent"
          >
            <ChevronLeft size={18} />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1 transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-border'}`}
              />
            ))}
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={next}
            className="rounded-full border-border/50 text-muted-foreground hover:text-primary hover:border-primary bg-transparent"
          >
            <ChevronRight size={18} />
          </Button>
        </div>

      </div>
    </section>
  );
}
