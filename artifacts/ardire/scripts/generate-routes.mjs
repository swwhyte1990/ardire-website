/**
 * Post-build script: generates pre-rendered HTML files for each route.
 * Each page is enriched with full intro text, highlights, and internal links
 * injected as hidden raw HTML so crawlers see 200+ words and can discover
 * all internal pages without executing JavaScript.
 * React replaces the root div content on hydration — sighted users never see
 * the hidden block.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist/public');

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;');
}

const allServiceLinks = [
  { slug: 'luxury-tours', label: 'Luxury Tours Scotland' },
  { slug: 'golf-tours', label: 'Golf Tours Scotland' },
  { slug: 'private-chauffeur', label: 'Private Chauffeur Scotland' },
  { slug: 'corporate-incentives', label: 'Corporate Incentive Travel Scotland' },
  { slug: 'self-guided-tours', label: 'Self-Guided Tours Scotland' },
  { slug: 'event-staffing', label: 'Event Staffing Scotland' },
  { slug: 'event-management', label: 'Event Management Scotland' },
  { slug: 'concierge', label: 'Private Concierge Scotland' },
  { slug: 'commonwealth-26', label: 'Commonwealth Games 2026 Hospitality Glasgow' },
];

function buildCrawlerBlock(route) {
  const paragraphsHtml = (route.paragraphs || [])
    .map(p => `<p>${esc(p)}</p>`)
    .join('\n    ');

  const highlightsHtml = (route.highlights || []).length
    ? `<ul>\n      ${(route.highlights).map(h => `<li>${esc(h)}</li>`).join('\n      ')}\n    </ul>`
    : '';

  const serviceLinksHtml = allServiceLinks
    .filter(s => route.path !== `services/${s.slug}`)
    .map(s => `<a href="https://ardire.co.uk/services/${s.slug}">${esc(s.label)}</a>`)
    .join('\n      ');

  return `<div style="display:none" aria-hidden="true">
    ${paragraphsHtml}
    ${highlightsHtml}
    <nav>
      <a href="https://ardire.co.uk/">Ardire Hospitality Group</a>
      ${serviceLinksHtml}
      <a href="https://ardire.co.uk/privacy">Privacy Policy</a>
      <a href="https://ardire.co.uk/#contact">Contact Ardire Hospitality Group</a>
    </nav>
  </div>`;
}

const routes = [
  {
    path: 'services/luxury-tours',
    title: 'Luxury Private Tours Scotland | Ardire Hospitality Group',
    description: 'Fully escorted private touring across Scotland\'s most breathtaking landscapes. Bespoke itineraries crafted by Ardire Hospitality Group, Glasgow.',
    h1: 'Luxury Private Tours Scotland',
    paragraphs: [
      'Every landscape tells a story; our guides know them all. We design private, fully guided journeys across Scotland\'s most dramatic and exclusive locations, from the ancient glens of the Highlands to the whisky distilleries of Speyside and the wild shores of the Outer Hebrides. Each tour is crafted around your interests, pace, and vision, never from a template.',
      'Discover Scotland on your own terms with our handcrafted luxury tour experiences, designed exclusively around you. Whether you\'re drawn to the dramatic landscapes of the Highlands, the cobbled streets of Edinburgh\'s Old Town, the rugged beauty of the North Coast 500, or the rolling countryside of the Scottish Borders, we create personalised itineraries that go far beyond the ordinary.',
      'Our bespoke tours are carefully curated to match your interests, pace, and preferences. Explore the historic Royal Mile, venture deep into Glencoe, follow the celebrated Scotch Whisky Trail through Speyside and beyond, or take in the breathtaking scenery of Loch Lomond and the Trossachs. Whatever Scotland means to you, we bring it to life with expert local knowledge and seamless luxury service.',
    ],
    highlights: [
      'Private, expert guides with deep local knowledge',
      'Premium transport by luxury vehicle, helicopter, or private charter',
      'Access to privately-owned estates and restricted locations',
      'Bespoke daily itineraries adjusted as you travel',
      'Fine dining and curated accommodation throughout',
    ],
  },
  {
    path: 'services/golf-tours',
    title: 'Golf Tours Scotland | St Andrews, Turnberry & Beyond',
    description: 'Play St Andrews, Carnoustie, and Turnberry on a luxury private golf tour of Scotland with private transport and luxury accomodation.',
    h1: 'Golf Tours Scotland',
    paragraphs: [
      'Scotland is the birthplace of golf, and no destination on earth rivals it for the sheer quality and variety of its courses. We arrange exclusive access to some of the world\'s most prestigious links, from St Andrews and Carnoustie on the east coast to Turnberry and Royal Troon in the west. Whether you\'re teeing off at a celebrated championship venue or discovering a hidden gem in the Highlands, our golf tours are crafted for those who demand excellence on and off the course.',
      'Play the courses that defined the game. Ardire designs fully bespoke golf tours across Scotland for individuals, pairs, and groups who want more than a tee time — they want an experience. From the legendary Old Course at St Andrews to the dramatic links of the Outer Hebrides, we handle every detail so you can focus entirely on your game.',
      'Scotland boasts some of the finest golf courses in the world. We can secure access to celebrated venues including St Andrews, Carnoustie, Turnberry, Royal Troon, Muirfield, and Kingsbarns, as well as spectacular lesser-known courses where the scenery is as memorable as the golf. Every round is arranged in advance, with tee times, caddies, and transport all confirmed before you arrive.',
      'A great golf tour is about more than the game. We arrange luxury accommodation at castle hotels and boutique retreats, whisky distillery visits, fine dining at acclaimed restaurants, and private transfers between venues. Every moment off the course is as carefully planned as every moment on it.',
    ],
    highlights: [
      'Access to Scotland\'s most prestigious championship courses',
      'Pre-booked tee times, caddies, and club hire arranged',
      'Luxury accommodation at estate hotels and boutique retreats',
      'Private chauffeured transfers between courses and lodgings',
      'Whisky tastings, fine dining, and cultural experiences woven in',
    ],
  },
  {
    path: 'services/private-chauffeur',
    title: 'Private Chauffeurs in Scotland | Glasgow, Edinburgh, Beyond.',
    description: 'Premium private chauffeur hire across Scotland. Airport transfers, executive transport, and bespoke touring by Ardire Hospitality Group, Glasgow.',
    h1: 'Private Chauffeur Scotland',
    paragraphs: [
      'From airport arrivals to full-day touring, our private chauffeur service sets the benchmark for discreet, professional ground transportation across Scotland. Every journey is handled with precision, punctuality, and an unwavering attention to comfort.',
      'Ardire provides a premium chauffeur service for private individuals, corporate clients, and visiting guests throughout Scotland. Whether you require a seamless airport transfer, a chauffeured day of meetings across Glasgow and Edinburgh, or a multi-day touring driver for a leisurely exploration of the country, our experienced chauffeurs deliver an impeccable standard of service every time.',
      'Our chauffeurs are carefully selected for their professionalism, local knowledge, and calm composure. They are immaculately presented, punctual to the minute, and trained to anticipate your needs without being intrusive. All journeys are conducted in premium vehicles, maintained to the highest standard and specified for comfort on Scotland\'s varied roads.',
      'We cater for a wide range of requirements: private airport transfers from Glasgow, Edinburgh, and Inverness; executive transfers between meetings and business events; full-day and multi-day touring itineraries; wedding and special occasion transport; and event shuttle services for corporate and private functions. Whatever your itinerary, we build the transport around it.',
    ],
    highlights: [
      'Premium executive and luxury vehicles, immaculately maintained',
      'Airport transfers, corporate runs, and multi-day touring',
      'Punctual, discreet, and professionally trained chauffeurs',
      'Advance route planning with local knowledge built in',
      'Available across Scotland including Glasgow, Edinburgh, and the Highlands',
    ],
  },
  {
    path: 'services/corporate-incentives',
    title: 'Corporate Incentivisation in Scotland',
    description: 'Reward your top performers with world-class Scottish experiences. Corporate incentive programmes designed by Ardire Hospitality Group.',
    h1: 'Corporate Incentive Travel Scotland',
    paragraphs: [
      'The best incentive is one your team still talks about years later. We design and deliver high-impact corporate incentive programmes that go far beyond the ordinary, creating moments of genuine awe, team connection, and cultural immersion across Scotland\'s most spectacular settings.',
      'From Highland challenges and outdoor adventure days to exclusive gala dinners at historic castle estates, our corporate incentive programmes are built around your business objectives and your people. We handle every element — venues, transport, accommodation, entertainment, staffing, and on-site coordination — so you can focus entirely on your team.',
      'Scotland provides an unrivalled backdrop for corporate incentive travel. Its dramatic landscapes, world-class whisky, historic venues, and warm hospitality create the conditions for experiences that genuinely move people. Ardire brings that Scotland to your team, shaped around your brand and your goals.',
    ],
    highlights: [
      'Bespoke programmes aligned to your business objectives',
      'Highland challenges, outdoor adventures, and team-building',
      'Exclusive venue hire including castles, estates, and private dining rooms',
      'Gala dinners, whisky tastings, and cultural experiences',
      'End-to-end logistics, staffing, and on-site coordination',
    ],
  },
  {
    path: 'services/self-guided-tours',
    title: 'Self-Guided Tours Scotland | Ardire Hospitality Group',
    description: 'Explore Scotland at your own pace with curated self-guided itineraries, pre-booked accommodations and 24/7 support from Ardire.',
    h1: 'Self-Guided Tours Scotland',
    paragraphs: [
      'For those who love to explore independently but want the confidence of expert planning behind them. We build the perfect itinerary, secure every booking, and prepare detailed route notes, then hand the keys over to you. Enjoy the freedom of self-guided travel with round-the-clock support on standby.',
      'Experience Scotland at your own pace with our thoughtfully planned self-guided tours. Perfect for independent travellers who want the freedom to explore without a fixed schedule, each tour comes with everything you need to make the most of your journey, from detailed route notes and maps to hand-picked accommodation and local tips along the way.',
      'Whether you\'re walking the iconic West Highland Way, cycling through Perthshire, driving the legendary North Coast 500, or tracing the Scotch Whisky Trail through the distilleries of Speyside, we take care of the planning so you can focus on the experience. Every route is researched and tailored to suit your timeframe, fitness level, and interests.',
      'Scotland offers some of the most rewarding self-guided journeys in the world. Follow ancient drovers\' roads through the Cairngorms, explore the rugged coastline of Argyll, or take your time wandering through the history-soaked streets of Edinburgh and Stirling. With so much to discover, no two tours ever look the same.',
    ],
    highlights: [
      'Fully curated, day-by-day itinerary tailored to your interests',
      'Pre-booked accommodation, dining, and key attractions',
      'Comprehensive route notes and insider tips',
      'Round-the-clock emergency support line',
      'Flexible, pause, extend, or alter your journey at any time',
    ],
  },
  {
    path: 'services/event-staffing',
    title: 'Event Staffing Scotland | Ardire Hospitality Group',
    description: 'Professional hospitality and event staffing for Scotland\'s most prestigious events. Sourced and managed by Ardire Hospitality Group.',
    h1: 'Event Staffing Scotland',
    paragraphs: [
      'The impression your event makes starts with the people running it. Our event staffing team brings professionalism, warmth, and composure to every occasion, from intimate private dinners to large-scale corporate events and major public gatherings. We are discreet, well-presented, and completely reliable.',
      'Ardire supplies trained, experienced event staff across a full range of disciplines — front-of-house, hospitality, guest management, bar, and specialist roles. Every team member is briefed to your event\'s specific standards, uniformed as required, and background-checked and fully insured. We scale to suit the occasion, from a small team for an intimate dinner to a large coordinated crew for a major venue.',
      'Our staffing service supports events across Scotland including Glasgow, Edinburgh, Aberdeen, and the Highlands. Whether you need a team for a corporate conference, a charity gala, a product launch, or a private celebration, we provide the people who make it work and who make it memorable.',
    ],
    highlights: [
      'Trained, experienced staff across a range of event disciplines',
      'Front-of-house, hospitality, and guest management roles',
      'Uniformed and briefed to your exact event standards',
      'Flexible team sizes from intimate to large-scale events',
      'Background-checked and fully insured professionals',
    ],
  },
  {
    path: 'services/event-management',
    title: 'Event Management Scotland | Ardire Hospitality Group',
    description: 'Full-service event management for corporate functions, gala dinners, and private occasions across Scotland. Conceived, managed, and delivered by Ardire.',
    h1: 'Event Management Scotland',
    paragraphs: [
      'From the first concept to the final curtain, we take full ownership of your event. Ardire provides end-to-end event management for private occasions, corporate functions, product launches, gala dinners, and high-profile gatherings across Scotland and beyond. We do not just supply the team — we lead the entire production.',
      'Whether you\'re hosting an intimate private dinner for twenty or a corporate gala for five hundred, Ardire manages every element of your event from initial concept through to post-event debrief. Our event management team brings creative vision, logistical precision, and an unwavering commitment to excellence to every occasion we take on.',
      'We work closely with you to understand your objectives, brand, and vision, then develop a bespoke event strategy around them. Venue sourcing and negotiation, supplier management, catering, entertainment, AV and technical production, decor, guest management, and on-the-day coordination — all handled seamlessly under one roof.',
      'Our portfolio spans product launches, awards ceremonies, corporate hospitality days, charity galas, private celebrations, and more. Whatever the occasion, we bring the same attention to detail and creative ambition, ensuring your guests leave with an experience that stays with them long after the evening ends.',
    ],
    highlights: [
      'Full end-to-end event planning and production management',
      'Venue sourcing across Scotland\'s finest estates, hotels, and unique spaces',
      'Supplier and contractor management including catering, AV, and entertainment',
      'Creative concept development and event styling',
      'On-the-day management with a dedicated senior event producer',
    ],
  },
  {
    path: 'services/concierge',
    title: 'Private Concierge Services in Scotland.',
    description: 'A discreet, personal concierge service for every detail of your Scottish visit. Ardire handles everything so you can focus on the experience.',
    h1: 'Private Concierge Glasgow &amp; Scotland',
    paragraphs: [
      'We are the people you call when the usual avenues simply will not do. Our concierge service offers round-the-clock lifestyle management for private individuals, executives, and visiting guests, securing the impossible, coordinating the complex, and delivering everything with complete discretion.',
      'Ardire\'s concierge team is available 24 hours a day, seven days a week, wherever you are in the world. From securing last-minute reservations at fully-booked restaurants and exclusive members\' clubs, to sourcing rare items, arranging private hire vehicles and helicopters, managing complex travel itineraries, and handling every detail of your time in Scotland, we do whatever needs to be done.',
      'Our private concierge service is trusted by high-net-worth individuals, corporate executives, visiting dignitaries, and guests of the world\'s finest hotels. Discretion is absolute. Every request is handled with the same quiet efficiency and personal attention that defines everything Ardire does.',
    ],
    highlights: [
      '24/7 availability wherever you are in the world',
      'Reservations at fully-booked restaurants and exclusive venues',
      'Private hire including vehicles, helicopters, yachts, and beyond',
      'Accommodation, travel logistics, and itinerary management',
      'Gifts, personal shopping, and bespoke arrangements',
    ],
  },
  {
    path: 'services/commonwealth-26',
    title: 'Commonwealth Games 2026 Services',
    description: 'Premium hospitality packages for the Glasgow 2026 Commonwealth Games. Accommodation, transfers, tickets and experiences by Ardire.',
    h1: 'Commonwealth Games 2026 Hospitality Glasgow',
    paragraphs: [
      'The Glasgow 2026 Commonwealth Games is set to be one of the most significant sporting events ever hosted in Scotland. Ardire is delivering bespoke visitor programmes, VIP hospitality packages, and corporate experiences that allow businesses and private guests to make the very most of this landmark occasion.',
      'Glasgow will welcome athletes, officials, and visitors from across the Commonwealth nations for the 2026 Games. Ardire is positioned to help corporate clients, private guests, and international visitors experience the Games and the city at the highest level — from VIP ticketing and venue hospitality to private accommodation, executive transfers, and curated cultural programmes.',
      'Our Commonwealth 2026 packages are tailored to each client. Whether you are entertaining key clients, rewarding your team, or simply want to experience one of the world\'s great sporting occasions in style, Ardire designs the programme around you — with the same attention to detail and standard of service that defines everything we do.',
    ],
    highlights: [
      'VIP hospitality packages for Games events',
      'Bespoke visitor experiences and itinerary planning',
      'Corporate entertainment and client engagement programmes',
      'Accommodation sourcing and travel logistics',
      'Event staffing for Games-adjacent functions and receptions',
    ],
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | Ardire Hospitality Group',
    description: 'Privacy policy for Ard Ire Hospitality Group trading as Ardire. How we collect, use and protect your personal data.',
    h1: 'Privacy Policy',
    paragraphs: [
      'This privacy policy explains how Ard Ire Hospitality Group, trading as Ardire, collects, uses, stores, and protects your personal data when you visit our website or contact us about our services.',
    ],
    highlights: [],
  },
];

const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const routeDir = join(distDir, route.path);
  mkdirSync(routeDir, { recursive: true });

  const canonicalUrl = `https://ardire.co.uk/${route.path}`;
  const crawlerBlock = buildCrawlerBlock(route);

  let html = indexHtml
    .replace(
      '<link rel="canonical" href="https://ardire.co.uk/" />',
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${route.title}</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${route.description}" />`
    )
    .replace(
      '<meta property="og:url" content="https://ardire.co.uk/" />',
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${route.title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${route.description}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${route.title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${route.description}" />`
    )
    .replace(
      /<h1 data-crawler-h1[^>]*>[^<]*<\/h1>/,
      `<h1 data-crawler-h1 style="font-family:serif;font-size:1.5rem;padding:1rem;color:#0d2b1f">${route.h1}</h1>`
    )
    .replace(
      '<div data-page-content></div>',
      crawlerBlock
    );

  writeFileSync(join(routeDir, 'index.html'), html);
  console.log(`Generated: /${route.path}/index.html  [h1: ${route.h1}]`);
}

console.log(`\nStatic route generation complete — ${routes.length} pages pre-rendered.`);
