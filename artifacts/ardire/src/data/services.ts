export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  cta: string;
}

// The cards on the Travel and Events pages. Each service's full copy lives on its
// own page, and the static copy search engines read is in scripts/generate-routes.mjs.
export const services: ServiceData[] = [
  {
    slug: "luxury-tours",
    title: "Luxury Tours",
    subtitle: "A Private Tour and a Travel Concierge in One.",
    cta: "Plan Your Tour",
  },
  {
    slug: "golf-tours",
    title: "Golf Tours",
    subtitle: "The Home of Golf. Planned and Run End to End.",
    cta: "Plan Your Golf Tour",
  },
  {
    slug: "private-chauffeur",
    title: "Private Chauffeur",
    subtitle: "Driven to a Different Standard.",
    cta: "Arrange a Chauffeur",
  },
  {
    slug: "corporate-incentives",
    title: "Corporate Incentives",
    subtitle: "Built Around What the Trip Is Meant to Achieve.",
    cta: "Discuss Your Programme",
  },
  {
    slug: "self-guided-tours",
    title: "Self-Guided Tours",
    subtitle: "Your Pace. Your Route.",
    cta: "Start Planning",
  },
  {
    slug: "event-staffing",
    title: "Event Staffing",
    subtitle: "Every Detail. Impeccably Handled.",
    cta: "Request Staff",
  },
  {
    slug: "event-management",
    title: "Event Management",
    subtitle: "Conceived, Managed, Delivered.",
    cta: "Start Planning Your Event",
  },
];
