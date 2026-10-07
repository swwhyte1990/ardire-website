import { lazy, Suspense, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";

// The enquiry form drags react-hook-form, zod and Radix Select onto the critical
// path of every route, so it loads on its own after first paint instead.
const loadContact = () => import("@/components/sections/Contact");
const Contact = lazy(() => loadContact().then((m) => ({ default: m.Contact })));

export default function Home() {
  // Fetch straight after paint, so the form is ready long before anyone scrolls
  // to it or presses Enquire — it is just no longer a first-paint dependency.
  useEffect(() => {
    void loadContact();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />
      <main id="main-content" className="flex-1 w-full">
        <Hero />
        <Services />
        <About />
        {/* The placeholder carries the id and the real section's height, so the
            Enquire anchor resolves immediately and nothing shifts on swap. */}
        <Suspense fallback={<div id="enquiry" className="h-[1199px] md:h-[755px]" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
