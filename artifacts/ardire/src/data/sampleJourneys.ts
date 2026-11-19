export interface JourneyStop {
  name: string;
  lon: number;
  lat: number;
  // Which side of the dot the map label sits; defaults to the right.
  /** Which side of the dot the name sits; "none" keeps the stop on the route without a label, for a place too close to its neighbours. */
  label?: "left" | "right" | "none";
}

export interface JourneyDay {
  title: string;
  highlights: string[];
  onTheRoad?: string;
  /** The road line for the day as [lon, lat] pairs, from OpenStreetMap routing. */
  route?: [number, number][];
  stops: JourneyStop[];
}

export interface SampleJourney {
  id: string;
  service: string;
  duration: string;
  title: string;
  story: string[];
  start: JourneyStop;
  days: JourneyDay[];
}

import data from "./sampleJourneys.json";

// Illustrative journeys to inspire, not itineraries to book. Places, landmarks and
// golf courses are named; accommodation, restaurants and distilleries are described
// rather than named. Facts come from Árdíre's story notes. The data lives in JSON
// so scripts/generate-routes.mjs can read the same journeys for the static pages.
export const sampleJourneys = data as unknown as Record<string, SampleJourney>;
