import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with dark wash */}
      <div className="absolute inset-0 z-0">
        {/* landing page hero dramatic scottish highlands landscape moody dark */}
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2940&auto=format&fit=crop"
          alt="Dramatic Scottish Highlands"
          className="w-full h-full object-cover scale-105 origin-center animate-[pulse_20s_ease-in-out_infinite_alternate]"
          style={{ animationName: 'kenburns' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center max-w-5xl mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <p className="font-sans tracking-[0.3em] uppercase text-primary mb-6 text-sm md:text-base">
            Bespoke Scottish Experiences
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-foreground leading-[1.1] mb-8 drop-shadow-2xl">
            Scotland.<br />
            <span className="italic text-primary/90 font-light">Crafted for You.</span>
          </h1>
          <p className="font-sans text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Exclusive access to Highland estates, rare whisky vaults, and unparalleled 
            concierge services for those who demand the extraordinary.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-8 h-14 rounded-none border border-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(184,134,11,0.3)]"
            >
              <a href="#experiences">Discover Experiences</a>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="bg-transparent hover:bg-background/50 border-border text-foreground font-sans tracking-widest uppercase text-xs px-8 h-14 rounded-none backdrop-blur-sm transition-all duration-300"
            >
              <a href="#contact">Private Enquiries</a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <a href="#about" className="text-muted-foreground hover:text-primary transition-colors flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown size={20} strokeWidth={1} />
          </motion.div>
        </a>
      </motion.div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
