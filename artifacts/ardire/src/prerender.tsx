import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import { LazyMotion, domAnimation } from "framer-motion";
import TravelPage from "@/pages/TravelPage";
import EventsPage from "@/pages/EventsPage";
import LuxuryToursPage from "@/pages/LuxuryToursPage";
import GolfToursPage from "@/pages/GolfToursPage";
import SelfGuidedToursPage from "@/pages/SelfGuidedToursPage";
import CorporateIncentivesPage from "@/pages/CorporateIncentivesPage";
import EventManagementPage from "@/pages/EventManagementPage";
import EventStaffingPage from "@/pages/EventStaffingPage";
import PrivateChauffeurPage from "@/pages/PrivateChauffeurPage";
import Privacy from "@/pages/Privacy";

// A server render of each page, built to dist/ssr by the second step of the build
// script. scripts/generate-routes.mjs takes each page's text from it for the
// static HTML that search engines and visitors without JavaScript read, so that
// text is always the page's own. Effects do not run here, so nothing in a page's
// render may touch window or document. The homepage is written from
// src/data/homePage.json instead, and the 404 page from src/data/notFound.json.
const pages = {
  travel: TravelPage,
  events: EventsPage,
  "services/luxury-tours": LuxuryToursPage,
  "services/golf-tours": GolfToursPage,
  "services/self-guided-tours": SelfGuidedToursPage,
  "services/corporate-incentives": CorporateIncentivesPage,
  "services/event-management": EventManagementPage,
  "services/event-staffing": EventStaffingPage,
  "services/private-chauffeur": PrivateChauffeurPage,
  privacy: Privacy,
};

export function render(path: keyof typeof pages) {
  const Page = pages[path];
  return renderToString(
    <LazyMotion features={domAnimation} strict>
      <Router ssrPath={`/${path}/`}>
        <Page />
      </Router>
    </LazyMotion>
  );
}
