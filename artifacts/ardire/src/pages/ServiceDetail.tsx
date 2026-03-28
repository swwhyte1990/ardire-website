import { useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getServiceBySlug } from "@/data/services";
import NotFound from "@/pages/not-found";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) return <NotFound />;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30">
      <Navbar />
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero.png`}
            alt="Scotland"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background z-10" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-40 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft size={14} />
              Back to Services
            </Link>
            <p className="font-sans tracking-[0.3em] uppercase text-primary mb-4 text-xs">
              Our Services
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
              {service.title}
            </h1>
            <p className="font-display italic text-xl md:text-2xl text-primary/80">
              {service.subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Content */}
      <section className="py-24 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary mb-6 text-xs">
                Overview
              </p>
              <p className="text-foreground font-sans text-lg leading-relaxed font-light">
                {service.intro}
              </p>

              <div className="mt-12">
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-8 h-14 rounded-none transition-all duration-300"
                >
                  <Link href="/#contact" className="inline-flex items-center gap-2">
                    {service.cta}
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card border border-border/50 p-10"
            >
              <p className="font-sans tracking-[0.3em] uppercase text-primary mb-8 text-xs">What to expect.</p>
              <ul className="space-y-5">
                {service.highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="text-muted-foreground font-sans font-light leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>
      {/* CTA Banner */}
      <section className="py-20 bg-card border-t border-border/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Ready to Begin?
            </h2>
            <p className="text-muted-foreground font-sans font-light text-base mb-10 max-w-xl mx-auto">
              Share your vision and our team will be in touch to arrange a private consultation.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans tracking-widest uppercase text-xs px-10 h-14 rounded-none transition-all duration-300"
            >
              <Link href="/#contact">
                Get in Touch
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
