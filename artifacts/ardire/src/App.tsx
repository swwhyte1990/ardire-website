import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { takePendingScroll } from "@/lib/pendingScroll";

const ServiceDetail = lazy(() => import("@/pages/ServiceDetail"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const TravelPage = lazy(() => import("@/pages/TravelPage"));
const EventsPage = lazy(() => import("@/pages/EventsPage"));
const GolfToursPage = lazy(() => import("@/pages/GolfToursPage"));
const LuxuryToursPage = lazy(() => import("@/pages/LuxuryToursPage"));
const LuxuryToursPage = lazy(() => import("@/pages/LuxuryToursPage"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    const target = takePendingScroll();
    if (target) {
      const tryScroll = () => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }), 150);
        }
      };
      requestAnimationFrame(tryScroll);
      return;
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/travel" component={TravelPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/services/luxury-tours" component={LuxuryToursPage} />
        <Route path="/services/luxury-tours" component={LuxuryToursPage} />
        <Route path="/services/golf-tours" component={GolfToursPage} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/privacy" component={Privacy} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <TooltipProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:text-primary focus:border focus:border-primary focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:tracking-widest focus:uppercase"
      >
        Skip to main content
      </a>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />
        <Router />
      </WouterRouter>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
