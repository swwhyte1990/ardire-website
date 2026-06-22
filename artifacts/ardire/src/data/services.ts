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
    subtitle: "A Private Tour and a Travel Concierge in One.",
    intro:
      "A private tour of Scotland designed entirely around you, with a dedicated travel concierge to arrange and look after every part of it. Tell us what you want the trip to be, and we plan the days, handle every booking, and run the whole journey from arrival to departure.",
    introRich: [
      { type: "heading", text: "Bespoke Luxury Tours in Scotland" },
      { type: "paragraph", text: "Discover Scotland on your own terms with our handcrafted luxury tour experiences, designed exclusively around you. Whether you're drawn to the dramatic landscapes of the Highlands, the cobbled streets of Edinburgh's Old Town, the rugged beauty of the North Coast 500, or the rolling countryside of the Scottish Borders, we create personalised itineraries that go far beyond the ordinary." },
      { type: "heading", text: "Tailored Scottish Experiences" },
      { type: "paragraph", text: "Our bespoke tours are carefully curated to match your interests, pace, and preferences. Explore the historic Royal Mile, venture deep into Glencoe, follow the celebrated Scotch Whisky Trail through Speyside and beyond, or take in the breathtaking scenery of Loch Lomond and the Trossachs. Whatever Scotland means to you, we bring it to life with expert local knowledge and seamless luxury service." },
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
    slug: "golf-tours",
    title: "Golf Tours",
    subtitle: "The Home of Golf. Planned and Run End to End.",
    intro:
      "We design and run private golf tours across Scotland for small groups and individual travellers, from championship links on the east coast to Highland gems in the north. You tell us how you want to play. We build the week around it.",
    introRich: [
      { type: "heading", text: "Bespoke Golf Tours in Scotland" },
      { type: "paragraph", text: "Play the courses that defined the game. The ÁrdÍre Group designs fully bespoke golf tours across Scotland for individuals, pairs, and groups who want more than a tee time — they want an experience. From the legendary Old Course at St Andrews to the dramatic links of the Outer Hebrides, we handle every detail so you can focus entirely on your game." },
      { type: "heading", text: "Championship Links & Hidden Gems" },
      { type: "paragraph", text: "Scotland boasts some of the finest golf courses in the world. We can secure access to celebrated venues including St Andrews, Carnoustie, Turnberry, Royal Troon, Muirfield, and Kingsbarns, as well as spectacular lesser-known courses where the scenery is as memorable as the golf. Every round is arranged in advance, with tee times, caddies, and transport all confirmed before you arrive." },
      { type: "heading", text: "Beyond the Fairway" },
      { type: "paragraph", text: "A great golf tour is about more than the game. We arrange luxury accommodation at castle hotels and boutique retreats, whisky distillery visits, fine dining at acclaimed restaurants, and private transfers between venues. Every moment off the course is as carefully planned as every moment on it." },
    ],
    highlights: [
      "Access to Scotland's most prestigious championship courses",
      "Pre-booked tee times, caddies, and club hire arranged",
      "Luxury accommodation at estate hotels and boutique retreats",
      "Private chauffeured transfers between courses and lodgings",
      "Whisky tastings, fine dining, and cultural experiences woven in",
    ],
    cta: "Plan Your Golf Tour",
  },
  {
    slug: "private-chauffeur",
    title: "Private Chauffeur",
    subtitle: "Driven to a Different Standard.",
    intro:
      "From airport arrivals to full-day touring, our private chauffeur service sets the benchmark for discreet, professional ground transportation across Scotland. Every journey is handled with precision, punctuality, and an unwavering attention to comfort.",
    introRich: [
      { type: "heading", text: "Private Chauffeur Services Across Scotland" },
      { type: "paragraph", text: "The ÁrdÍre Group provides a premium chauffeur service for private individuals, corporate clients, and visiting guests throughout Scotland. Whether you require a seamless airport transfer, a chauffeured day of meetings across Glasgow and Edinburgh, or a multi-day touring driver for a leisurely exploration of the country, our experienced chauffeurs deliver an impeccable standard of service every time." },
      { type: "heading", text: "Comfort, Discretion & Reliability" },
      { type: "paragraph", text: "Our chauffeurs are carefully selected for their professionalism, local knowledge, and calm composure. They are immaculately presented, punctual to the minute, and trained to anticipate your needs without being intrusive. All journeys are conducted in premium vehicles, maintained to the highest standard and specified for comfort on Scotland's varied roads." },
      { type: "heading", text: "Bespoke Ground Transportation" },
      { type: "paragraph", text: "We cater for a wide range of requirements: private airport transfers from Glasgow, Edinburgh, and Inverness; executive transfers between meetings and business events; full-day and multi-day touring itineraries; wedding and special occasion transport; and event shuttle services for corporate and private functions. Whatever your itinerary, we build the transport around it." },
    ],
    highlights: [
      "Premium executive and luxury vehicles, immaculately maintained",
      "Airport transfers, corporate runs, and multi-day touring",
      "Punctual, discreet, and professionally trained chauffeurs",
      "Advance route planning with local knowledge built in",
      "Available across Scotland including Glasgow, Edinburgh, and the Highlands",
    ],
    cta: "Arrange a Chauffeur",
  },
  {
    slug: "corporate-incentives",
    title: "Corporate Incentives",
    subtitle: "Built Around What the Trip Is Meant to Achieve.",
    intro:
      "We design and run corporate incentive trips across Scotland for companies who want to reward their people, motivate their teams, or bring clients somewhere genuinely memorable. You tell us what the trip is meant to achieve, and we build a programme around it.",
    introRich: [
      { type: "heading", text: "Corporate Incentive Travel in Scotland" },
      { type: "paragraph", text: "Scotland offers one of the most compelling natural backdrops for corporate incentive travel anywhere in the world. Ancient castles, dramatic Highland landscapes, private sporting estates, and world-class whisky culture combine to create an environment that inspires, motivates, and rewards in equal measure. The ÁrdÍre Group designs bespoke incentive programmes for businesses who want their people to feel genuinely extraordinary." },
      { type: "heading", text: "Experiences That Drive Performance" },
      { type: "paragraph", text: "We move well beyond the standard team-building itinerary. Whether it's a private Highland challenge followed by a castle dinner, a whisky blending masterclass at an exclusive distillery, a falconry experience on a private estate, or a clay shooting day in the Borders, every element is selected for its ability to create real connection and lasting memory. Your team's achievement deserves recognition that matches it." },
      { type: "heading", text: "Seamless from Brief to Debrief" },
      { type: "paragraph", text: "From initial brief through to post-event debrief, we manage every logistical and creative detail. Group travel coordination, accommodation at exclusive estate hotels, bespoke dining experiences, entertainment, AV and décor, photography, and on-the-ground coordination are all handled by our team. You arrive, and we take care of everything else." },
    ],
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
    subtitle: "Your Pace. Your Route.",
    intro:
      "A bespoke self-guided tour, planned and booked around you. Tell us where you would like to go, how long you have, and how you like to travel. We design the route, arrange the bookings, and hand the trip over to you to lead.",
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
    introRich: [
      { type: "heading", text: "Professional Event Staffing Across Scotland" },
      { type: "paragraph", text: "The ÁrdÍre Group provides experienced, professionally trained event staff for a wide range of occasions across Scotland. From front-of-house teams and reception staff to hospitality managers and guest liaison officers, our people bring the right combination of warmth, discretion, and polish to every event they work." },
      { type: "heading", text: "Front-of-House & Hospitality Expertise" },
      { type: "paragraph", text: "Our staff are selected for their composure under pressure, natural warmth with guests, and ability to represent your brand impeccably. They arrive fully briefed, uniformed to your specification, and ready to deliver. Whether you need a single host for a private dining experience or a full team for a large-scale corporate gala, we build the right team around your event." },
      { type: "heading", text: "Flexible, Reliable, and Fully Insured" },
      { type: "paragraph", text: "We understand that events rarely run exactly to plan. Our staff are trained to adapt, remain calm, and keep the guest experience seamless regardless of what happens behind the scenes. All of our event staff are background-checked, fully insured, and managed by a senior ÁrdÍre coordinator throughout your event." },
    ],
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
    slug: "event-management",
    title: "Event Management",
    subtitle: "Conceived, Managed, Delivered.",
    intro:
      "From the first concept to the final curtain, we take full ownership of your event. The ÁrdÍre Group provides end-to-end event management for private occasions, corporate functions, product launches, gala dinners, and high-profile gatherings across Scotland and beyond. We don't just supply the team — we lead the entire production.",
    introRich: [
      { type: "heading", text: "Full-Service Event Management Scotland" },
      { type: "paragraph", text: "Whether you're hosting an intimate private dinner for twenty or a corporate gala for five hundred, The ÁrdÍre Group manages every element of your event from initial concept through to post-event debrief. Our event management team brings creative vision, logistical precision, and an unwavering commitment to excellence to every occasion we take on." },
      { type: "heading", text: "From Concept to Execution" },
      { type: "paragraph", text: "We work closely with you to understand your objectives, brand, and vision, then develop a bespoke event strategy around them. Venue sourcing and negotiation, supplier management, catering, entertainment, AV and technical production, décor, guest management, and on-the-day coordination — all handled seamlessly under one roof." },
      { type: "heading", text: "Corporate Events & Private Functions" },
      { type: "paragraph", text: "Our portfolio spans product launches, awards ceremonies, corporate hospitality days, charity galas, private celebrations, and more. Whatever the occasion, we bring the same attention to detail and creative ambition, ensuring your guests leave with an experience that stays with them long after the evening ends." },
    ],
    highlights: [
      "Full end-to-end event planning and production management",
      "Venue sourcing across Scotland's finest estates, hotels, and unique spaces",
      "Supplier and contractor management including catering, AV, and entertainment",
      "Creative concept development and event styling",
      "On-the-day management with a dedicated senior event producer",
    ],
    cta: "Start Planning Your Event",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services.find((s) => s.slug === slug);
}
