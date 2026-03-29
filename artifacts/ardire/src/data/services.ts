export interface RichIntroBlock {
  type: "heading" | "paragraph";
  text: string;
}

export interface ServiceData {
  slug: string;
  title: string;
  subtitle: string;
  intro: string;
  introRich?: RichIntroBlock[];
  highlights: string[];
  cta: string;
}

export const services: ServiceData[] = [
  {
    slug: "luxury-tours",
    title: "Luxury Tours",
    subtitle: "Scotland. Expertly Guided.",
    intro:
      "Every landscape tells a story; our guides know them all. We design private, fully guided journeys across Scotland's most dramatic and exclusive locations, from the ancient glens of the Highlands to the whisky distilleries of Speyside and the wild shores of the Outer Hebrides. Each tour is crafted around your interests, pace, and vision, never from a template.",
    introRich: [
      { type: "heading", text: "Bespoke Luxury Tours in Scotland" },
      { type: "paragraph", text: "Discover Scotland on your own terms with our handcrafted luxury tour experiences, designed exclusively around you. Whether you're drawn to the dramatic landscapes of the Highlands, the cobbled streets of Edinburgh's Old Town, the rugged beauty of the North Coast 500, or the rolling countryside of the Scottish Borders, we create personalised itineraries that go far beyond the ordinary." },
      { type: "heading", text: "Tailored Scottish Experiences" },
      { type: "paragraph", text: "Our bespoke tours are carefully curated to match your interests, pace, and preferences. Explore the historic Royal Mile, venture deep into Glencoe, follow the celebrated Scotch Whisky Trail through Speyside and beyond, or take in the breathtaking scenery of Loch Lomond and the Trossachs. Whatever Scotland means to you, we bring it to life with expert local knowledge and seamless luxury service." },
      { type: "heading", text: "Golf Tours Across Scotland" },
      { type: "paragraph", text: "Scotland is the birthplace of golf, and no destination on earth rivals it for the sheer quality and variety of its courses. We arrange exclusive access to some of the world's most prestigious links, from St Andrews and Carnoustie on the east coast, to Turnberry and Royal Troon in the west. Whether you're teeing off at a celebrated championship venue or discovering a hidden gem in the Highlands, our golf tours are crafted for those who demand excellence on and off the course." },
    ],
    highlights: [
      "Private, expert guides with deep local knowledge",
      "Premium transport by luxury vehicle, helicopter, or private charter",
      "Access to privately-owned estates and restricted locations",
      "Bespoke daily itineraries adjusted as you travel",
      "Fine dining and curated accommodation throughout",
    ],
    cta: "Plan Your Tour",
  },
  {
    slug: "corporate-incentives",
    title: "Corporate Incentives",
    subtitle: "Performance. Rewarded. Unforgettably.",
    intro:
      "The best incentive is one your team still talks about years later. We design and deliver high-impact corporate incentive programmes that go far beyond the ordinary, creating moments of genuine awe, team connection, and cultural immersion across Scotland's most spectacular settings.",
    highlights: [
      "Bespoke programmes aligned to your business objectives",
      "Highland challenges, outdoor adventures, and team-building",
      "Exclusive venue hire including castles, estates, and private dining rooms",
      "Gala dinners, whisky tastings, and cultural experiences",
      "End-to-end logistics, staffing, and on-site coordination",
    ],
    cta: "Discuss Your Programme",
  },
  {
    slug: "self-guided-tours",
    title: "Self-Guided Tours",
    subtitle: "Your Pace. Our Expertise.",
    intro:
      "For those who love to explore independently but want the confidence of expert planning behind them. We build the perfect itinerary, secure every booking, and prepare detailed route notes, then hand the keys over to you. Enjoy the freedom of self-guided travel with round-the-clock support on standby.",
    introRich: [
      { type: "heading", text: "Self-Guided Tours in Scotland" },
      { type: "paragraph", text: "Experience Scotland at your own pace with our thoughtfully planned self-guided tours. Perfect for independent travellers who want the freedom to explore without a fixed schedule, each tour comes with everything you need to make the most of your journey, from detailed route notes and maps to hand-picked accommodation and local tips along the way." },
      { type: "heading", text: "Your Journey, Your Way" },
      { type: "paragraph", text: "Whether you're walking the iconic West Highland Way, cycling through Perthshire, driving the legendary North Coast 500, or tracing the Scotch Whisky Trail through the distilleries of Speyside, we take care of the planning so you can focus on the experience. Every route is researched and tailored to suit your timeframe, fitness level, and interests." },
      { type: "heading", text: "Explore Scotland's Most Iconic Routes" },
      { type: "paragraph", text: "Scotland offers some of the most rewarding self-guided journeys in the world. Follow ancient drovers' roads through the Cairngorms, explore the rugged coastline of Argyll, or take your time wandering through the history-soaked streets of Edinburgh and Stirling. With so much to discover, no two tours ever look the same." },
    ],
    highlights: [
      "Fully curated, day-by-day itinerary tailored to your interests",
      "Pre-booked accommodation, dining, and key attractions",
      "Comprehensive route notes and insider tips",
      "Round-the-clock emergency support line",
      "Flexible, pause, extend, or alter your journey at any time",
    ],
    cta: "Start Planning",
  },
  {
    slug: "event-staffing",
    title: "Event Staffing",
    subtitle: "Every Detail. Impeccably Handled.",
    intro:
      "The impression your event makes starts with the people running it. Our event staffing team brings professionalism, warmth, and composure to every occasion, from intimate private dinners to large-scale corporate events and major public gatherings. We are discreet, well-presented, and completely reliable.",
    highlights: [
      "Trained, experienced staff across a range of event disciplines",
      "Front-of-house, hospitality, and guest management roles",
      "Uniformed and briefed to your exact event standards",
      "Flexible team sizes from intimate to large-scale events",
      "Background-checked and fully insured professionals",
    ],
    cta: "Request Staff",
  },
  {
    slug: "concierge",
    title: "Concierge and Event Management",
    subtitle: "Nothing Is Too Much.",
    intro:
      "We are the people you call when the usual avenues simply will not do. Our concierge service offers round-the-clock lifestyle management for private individuals, executives, and visiting guests, securing the impossible, coordinating the complex, and delivering everything with complete discretion.",
    highlights: [
      "24/7 availability wherever you are in the world",
      "Reservations at fully-booked restaurants and exclusive venues",
      "Private hire including vehicles, helicopters, yachts, and beyond",
      "Accommodation, travel logistics, and itinerary management",
      "Gifts, personal shopping, and bespoke arrangements",
    ],
    cta: "Enquire Now",
  },
  {
    slug: "commonwealth-26",
    title: "Commonwealth '26",
    subtitle: "Glasgow 2026. Experience It Properly.",
    intro:
      "The Glasgow 2026 Commonwealth Games is set to be one of the most significant sporting events ever hosted in Scotland. Árd Íre is offering it's support, delivering bespoke visitor programmes, VIP hospitality packages, and corporate experiences that allow businesses and private guests to make the very most of this landmark occasion.",
    highlights: [
      "VIP hospitality packages for Games events",
      "Bespoke visitor experiences and itinerary planning",
      "Corporate entertainment and client engagement programmes",
      "Accommodation sourcing and travel logistics",
      "Event staffing for Games-adjacent functions and receptions",
    ],
    cta: "Get Involved",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
