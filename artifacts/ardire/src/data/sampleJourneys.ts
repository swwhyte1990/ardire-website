export interface JourneyStop {
  name: string;
  lon: number;
  lat: number;
  // Which side of the dot the map label sits; defaults to the right.
  label?: "left" | "right";
}

export interface JourneyDay {
  title: string;
  drive: string;
  highlights: string[];
  onTheRoad?: string;
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

// Illustrative journeys to inspire, not itineraries to book. Places and landmarks
// are named; accommodation, restaurants and distilleries are described rather than
// named. Facts come from Árdíre's story notes.
export const sampleJourneys: Record<string, SampleJourney> = {
  "west-highlands-skye": {
    id: "west-highlands-skye",
    service: "luxury-tours",
    duration: "Five Days",
    title: "The West Highlands and Skye",
    story: [
      "This is the Scotland most people picture: mountains running down into sea lochs, single-track roads, islands on the horizon. It is also the country of the Jacobites, and their story runs along the route day by day.",
      "The journey passes Glencoe, where a massacre in 1692 is still remembered, and Glenfinnan, where Bonnie Prince Charlie raised his standard in 1745. It crosses to Skye, where Flora MacDonald later helped him escape, and comes back east to the moor at Culloden, where it ended. Five days, taken at a pace that lets you feel the place.",
    ],
    start: { name: "Glasgow", lon: -4.25, lat: 55.86 },
    days: [
      {
        title: "North to Glencoe",
        drive: "Around 2½ hours, with a break on the way",
        highlights: [
          "Collected and driven north as the landscape opens out",
          "Rannoch Moor, then the descent into Glencoe",
          "A Highland estate for the night",
        ],
        onTheRoad:
          "The figure of 38 dead at Glencoe comes from the soldiers who did the killing. Modern research puts it nearer 30.",
        stops: [
          { name: "Rannoch Moor", lon: -4.78, lat: 56.6 },
          { name: "Glencoe", lon: -5.1, lat: 56.68, label: "left" },
        ],
      },
      {
        title: "The Road to the Isles and over to Skye",
        drive: "Around 3½ hours, split with a lunch stop",
        highlights: [
          "Fort William, then west on the Road to the Isles",
          "Glenfinnan and its viaduct",
          "Across to Skye beneath Eilean Donan",
        ],
        onTheRoad:
          "Eilean Donan looks medieval, but the Navy blew it up in 1719 with 343 barrels of captured gunpowder. What stands today was rebuilt and finished in 1932.",
        stops: [
          { name: "Fort William", lon: -5.11, lat: 56.82 },
          { name: "Glenfinnan", lon: -5.43, lat: 56.87, label: "left" },
          { name: "Eilean Donan", lon: -5.52, lat: 57.27 },
          { name: "Skye", lon: -6.19, lat: 57.41, label: "left" },
        ],
      },
      {
        title: "Skye",
        drive: "Short drives, a day on the island",
        highlights: [
          "The Trotternish ridge and the Quiraing with a guide who knows the island",
          "A tasting at a distillery, arranged in your own time rather than the crowd's",
          "An evening at a country house on the shore",
        ],
        onTheRoad:
          "The MacLeods' Fairy Flag is said to come from the fairies. A V&A expert found the silk was woven in Syria or Rhodes.",
        stops: [
          { name: "The Quiraing", lon: -6.27, lat: 57.63, label: "left" },
          { name: "Skye", lon: -6.19, lat: 57.41, label: "left" },
        ],
      },
      {
        title: "East to Loch Ness and Speyside",
        drive: "Around 3 hours, with a break on the way",
        highlights: [
          "Along Loch Ness towards Inverness",
          "The moor at Culloden",
          "A castle for the night in Speyside, and a dinner to match the setting",
        ],
        onTheRoad:
          "Within a lifetime of Culloden it was illegal for a Highlander to wear tartan. A second offence meant seven years' transportation.",
        stops: [
          { name: "Loch Ness", lon: -4.6, lat: 57.22 },
          { name: "Culloden", lon: -4.07, lat: 57.48 },
          { name: "Speyside", lon: -3.23, lat: 57.47 },
        ],
      },
      {
        title: "Speyside, and home",
        drive: "Around 1 hour to Inverness",
        highlights: [
          "A quiet morning at a distillery that opens its doors for you",
          "Then to your flight",
        ],
        stops: [{ name: "Inverness", lon: -4.05, lat: 57.54 }],
      },
    ],
  },
};
