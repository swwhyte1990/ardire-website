/**
 * Post-build script: generates pre-rendered HTML files for each route.
 * Each page contains genuine, visible content matching what React renders
 * (intro paragraphs, highlights and internal links). The static markup uses
 * brand-matched inline styles so the moment before React hydrates looks
 * intentional. React replaces the root content on mount; sighted users see
 * the full interactive site.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist/public');

// The same sample journeys the pages render, so crawlers read the story and the
// day outline without running JavaScript.
const journeys = JSON.parse(
  readFileSync(join(__dirname, '../src/data/sampleJourneys.json'), 'utf8')
);
const JOURNEYS_BY_ROUTE = {
  'services/luxury-tours': ['edinburgh-heart-of-scotland', 'west-highlands-skye', 'grand-sweep'],
  'services/golf-tours': ['golf-east-coast'],
  'services/corporate-incentives': ['corporate-highlands'],
  'services/self-guided-tours': [
    'abbeys-and-border-country',
    'perthshire-and-angus',
    'oban-argyll-and-kintyre',
    'ayrshire-and-the-south-west',
    'north-coast-slowly',
  ],
};

function routeJourneys(route) {
  return (JOURNEYS_BY_ROUTE[route.path] || []).map((id) => {
    const j = journeys[id];
    if (!j) throw new Error(`generate-routes: unknown sample journey "${id}" for ${route.path}`);
    return j;
  });
}

function buildJourneysHtml(route) {
  const list = routeJourneys(route);
  if (!list.length) return '';
  const h2 = 'font-family:Georgia,serif;font-size:1.5rem;font-weight:500;color:#c5a366;margin:2.5rem 0 1rem';
  const h3 = 'font-family:Georgia,serif;font-size:1.2rem;font-weight:500;color:#c5a366;margin:2rem 0 0.75rem';
  const body = list.map((j) => {
    const story = j.story.map((s) => `<p style="font-size:1rem;margin:0 0 1rem">${esc(s)}</p>`).join('');
    const days = j.days.map((d, i) =>
      `<li style="margin:0 0 0.6rem"><strong>Day ${i + 1}, ${esc(d.title)}.</strong> ${esc(d.highlights.join('. '))}.</li>`
    ).join('');
    return `<h3 style="${h3}">${esc(j.duration)}: ${esc(j.title)}</h3>${story}<ol style="margin:0 0 1rem;padding-left:1.25rem;font-size:0.95rem">${days}</ol>`;
  }).join('');
  return `<h2 style="${h2}">Sample journeys</h2>${body}<p style="font-size:0.95rem;margin:1rem 0 0">Price on enquiry. Every journey is shaped around you.</p>`;
}

// Page-specific structured data. Each block is marked data-page-schema so the
// app can drop it when the visitor moves to another page in the browser; the
// sitewide TravelAgency block in index.html is left alone.
function ldScript(json) {
  return `    <script type="application/ld+json" data-page-schema>\n${json}\n    </script>\n`;
}
// "<" escaped so copy can never close the script element early.
const toJson = (data) => JSON.stringify(data, null, 2).replace(/</g, '\\u003c');

// The same files the React pages read, so schema and page cannot disagree.
const readData = (name) => JSON.parse(readFileSync(join(__dirname, `../src/data/${name}`), 'utf8'));
const FAQS = readData('faqs.json');
const SERVICES = readData('serviceSchema.json');
const STAFFING_PRICES = readData('staffingPrices.json');
const PROVIDER = { '@type': 'TravelAgency', name: 'The \u00c1rd\u00edre Group', url: 'https://ardire.co.uk/' };

// Offers come only from the price cards shown on the Event Staffing page: a
// "From £N" price per hour. Cards without a figure ("On request") are left out.
function staffingOffers() {
  return STAFFING_PRICES.flatMap((card) => {
    const m = card.price.match(/^From £(\d+(?:\.\d+)?)$/);
    if (!m) return [];
    if (!/^per hour/.test(card.unit)) throw new Error(`generate-routes: unexpected staffing unit "${card.unit}"`);
    return [{
      '@type': 'Offer',
      name: card.role,
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: Number(m[1]),
        priceCurrency: 'GBP',
        unitCode: 'HUR',
        unitText: 'per hour',
        valueAddedTaxIncluded: !/plus VAT/.test(card.unit),
      },
    }];
  });
}

function buildServiceJsonLd(route) {
  const svc = SERVICES[route.path];
  if (!svc) return '';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: svc.name,
    serviceType: svc.serviceType,
    description: svc.description,
    provider: PROVIDER,
    areaServed: { '@type': 'Country', name: 'Scotland' },
    url: `https://ardire.co.uk/${route.path}/`,
  };
  if (route.path === 'services/event-staffing') data.offers = staffingOffers();
  return ldScript(toJson(data));
}

function buildFaqJsonLd(route) {
  const faq = FAQS[route.path];
  if (!faq) return '';
  return ldScript(toJson({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }));
}

// The same questions and answers as visible text in the static fallback, so the
// raw HTML says what the FAQPage schema says.
function buildFaqHtml(route) {
  const faq = FAQS[route.path];
  if (!faq) return '';
  return `<section style="margin-top:2.5rem"><h2 style="font-family:Georgia,serif;font-size:1.5rem;font-weight:500;margin:0 0 1rem">${esc(faq.heading)}</h2>` +
    faq.items.map((f) => `<h3 style="font-family:Georgia,serif;font-size:1.1rem;font-weight:500;margin:1.25rem 0 0.4rem">${esc(f.q)}</h3><p style="font-size:1rem;margin:0">${esc(f.a)}</p>`).join('') +
    `</section>`;
}

function buildJourneysJsonLd(route) {
  const list = routeJourneys(route);
  if (!list.length) return '';
  const trips = list.map((j) => {
    const seen = new Set();
    const places = [j.start, ...j.days.flatMap((d) => d.stops)]
      .map((s) => s.name)
      .filter((n) => !seen.has(n) && seen.add(n));
    return {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: j.title,
      description: j.story[0],
      url: `https://ardire.co.uk/${route.path}/`,
      provider: { '@type': 'TravelAgency', name: 'The \u00c1rd\u00edre Group', url: 'https://ardire.co.uk/' },
      itinerary: {
        '@type': 'ItemList',
        numberOfItems: places.length,
        itemListElement: places.map((name, i) => ({
          '@type': 'ListItem', position: i + 1, item: { '@type': 'Place', name },
        })),
      },
    };
  });
  // "<" escaped so story text can never close the script element early.
  const json = JSON.stringify(trips.length === 1 ? trips[0] : trips, null, 2).replace(/</g, '\\u003c');
  return ldScript(json);
}

// Images are imported from src/assets and content-hashed by Vite, so their built
// filenames are only knowable from the manifest.
const manifest = JSON.parse(
  readFileSync(join(distDir, '.vite/manifest.json'), 'utf8')
);

function hashedImage(name) {
  const entry = manifest[`src/assets/images/${name}`];
  if (!entry) {
    throw new Error(
      `generate-routes: no built asset for "${name}". Images must be imported ` +
      `from src/assets/images/ so Vite emits and hashes them.`
    );
  }
  return `/${entry.file}`;
}

// Matches whatever hashed URL the build produced, rather than a fixed filename.
const HERO_PRELOAD = /<link rel="preload" as="image" href="[^"]*"[^>]*\/>/;

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
];

const linkStyle = "color:#c5a366;text-decoration:none;margin-right:1rem;display:inline-block;padding:0.25rem 0";

function buildPageBlock(route) {
  const h1Html = `<h1 style="font-family:Georgia,serif;font-size:2rem;font-weight:500;letter-spacing:0.05em;color:#c5a366;margin:0 0 1.5rem">${esc(route.h1)}</h1>`;

  const paragraphsHtml = (route.paragraphs || [])
    .map(p => `<p style="font-size:1.05rem;margin:0 0 1.25rem">${esc(p)}</p>`)
    .join('');

  const highlightsHtml = (route.highlights || []).length
    ? `<ul style="margin:1.5rem 0;padding:0;list-style:none">${(route.highlights).map(h => `<li style="padding:0.4rem 0 0.4rem 1.25rem;position:relative;font-size:1rem">&middot; ${esc(h)}</li>`).join('')}</ul>`
    : '';

  const serviceLinksHtml = allServiceLinks
    .filter(s => route.path !== `services/${s.slug}`)
    .map(s => `<a href="https://ardire.co.uk/services/${s.slug}/" style="${linkStyle}">${esc(s.label)}</a>`)
    .join('');

  const navHtml = `<nav style="margin-top:2.5rem;padding-top:1.75rem;border-top:1px solid rgba(197,163,102,0.25);font-size:0.95rem"><a href="https://ardire.co.uk/" style="${linkStyle}">Árdíre Home</a>${serviceLinksHtml}${route.path !== 'privacy' ? `<a href="https://ardire.co.uk/privacy/" style="${linkStyle}">Privacy Policy</a>` : ''}<a href="https://ardire.co.uk/#enquiry" style="color:#c5a366;text-decoration:none;display:inline-block;padding:0.25rem 0">Contact Árdíre</a></nav>`;

  return `<div data-page-content style="max-width:760px;margin:0 auto;padding:3rem 1.5rem;font-family:Georgia,'Times New Roman',serif;color:#c5a366;line-height:1.7">${h1Html}${paragraphsHtml}${highlightsHtml}${buildJourneysHtml(route)}${buildFaqHtml(route)}${navHtml}</div>`;
}

const routes = [
  {
    path: 'travel',
    heroImage: 'travel-glenfinnan.webp',
    h1: 'Private Tours & Travel in Scotland',
    paragraphs: [
      'Privately guided tours, championship golf, a private chauffeur, self-guided routes and a dedicated travel concierge. Each one planned with you.',
      'Whether you want a private tour of the Highlands, a week on Scotland\'s championship links, a chauffeur on call for the duration of your stay, or a self-guided route with everything booked ahead of you, each journey is built around how you prefer to travel rather than a fixed itinerary.',
    ],
    highlights: [
      'Luxury Tours - a private tour and a travel concierge in one',
      'Golf Tours - a week on Scotland\'s great courses, planned end to end',
      'Private Chauffeur - discreet, professional drivers across the country',
      'Self-Guided Tours - routes, stays and access arranged in advance',
    ],
  },
  {
    path: 'events',
    heroImage: 'events-hero.webp',
    h1: 'Corporate Events & Incentive Travel in Scotland',
    paragraphs: [
      'Corporate incentives, full-service event management, professional staffing and bespoke experiences across Scotland.',
      'From the first concept through to the final curtain, we plan and run events across Scotland: incentive programmes that reward the people who earned them, full event management for conferences, dinners and launches, and experienced hospitality staff for occasions of any scale.',
    ],
    highlights: [
      'Corporate Incentives - programmes that reward and motivate teams',
      'Event Management - conferences, dinners and launches run end to end',
      'Event Staffing - experienced hospitality staff at any scale',
    ],
  },
  {
    path: 'services/luxury-tours',
    heroImage: 'tours-hero.webp',
    h1: 'Private Tours of Scotland',
    paragraphs: [
      'A private tour of Scotland, with a travel concierge who arranges and looks after every part of it, from first idea to final evening.',
      'A private tour follows what you want to see, the pace you want to keep and the kind of days you want to have. We plan the itinerary and book everything: transport, rooms, meals and experiences. Then we run it on the ground, so there is nothing to chase while you are here.',
      'This is a country we know well and love showing off, and most of that love is in the detail: the right glen on the right morning, the dinner worth driving for, the distillery that will open a door for you. Some of our guests arrive knowing exactly what they want. Most come with a few ideas and let us fill in the rest.',
      'We can also be your travel concierge for the whole of your time in Scotland: one person who arranges, books and looks after everything, and is on call while you are here.',
    ],
    highlights: [
      'A private driver and transfers throughout',
      'Accommodation chosen for its standard and its setting',
      'Meals and dining, with a private chef whenever you would like one',
      'Guides, experiences and access arranged around your interests',
      'Every booking, ticket and reservation handled ahead of time',
      'A dedicated concierge looking after your trip on the ground throughout',
    ],
  },
  {
    path: 'services/golf-tours',
    heroImage: 'golf-hero.webp',
    h1: 'Private Golf Tours of Scotland',
    paragraphs: [
      'A week on Scotland\'s great courses, planned and run from arrival to departure. You play. We look after everything around it.',
      'We plan and run private golf tours across Scotland for small groups of golfers. Tell us how you like to play and the courses on your list. We shape the trip around them: the rounds, the cars, the rooms, the dinners and the evenings.',
      'Tee times are booked in the right order, and early enough to secure the courses that matter most to you. A private driver takes you to each one. Each night\'s stay is chosen for where you play the next morning. Someone who knows your plans is with you through the week, so if the weather turns or you want to change something, it is quickly done.',
      'There is no set price for a tour. Each trip depends on the courses you play and the way you travel. You receive a full, itemised proposal before anything is booked.',
    ],
    highlights: [
      'Tee times booked in the right order, for the courses that matter most to you',
      'A private driver between courses, hotels and dinners',
      'Accommodation chosen for where you are playing next',
      'Evenings, dinners and experiences arranged around the golf',
      'Someone with you through the week who knows your plans',
    ],
  },
  {
    path: 'services/private-chauffeur',
    heroImage: 'chauffeur-hero.webp',
    h1: 'Private Chauffeur Service in Scotland',
    paragraphs: [
      'A professional driver and a comfortable car, anywhere in Scotland. Airport transfers, days out and everything in between.',
      'We provide a private chauffeur service across Scotland, for a single transfer or for as long as you would like a car and driver. That might be a quiet run from the airport after a long flight, a day exploring at your own pace, or getting a group where it needs to be, on time.',
      'Our drivers know the roads and the country, and work with care and discretion. This is the same driving that runs our private tours and golf trips, offered on its own for an hour or a week.',
      'Pricing is per journey or per day. Send us the details and we will reply with a quote.',
    ],
    highlights: [
      'Airport transfers, met at arrivals and driven to your door',
      'A car and driver for a day or several, to explore at your own pace',
      'Getting between courses, dinners and events comfortably and on time',
      'Transport for groups, occasions and corporate days',
    ],
  },
  {
    path: 'services/corporate-incentives',
    heroImage: 'corporate-hero.webp',
    h1: 'Corporate Incentive Trips in Scotland',
    paragraphs: [
      'Reward a team, motivate your top performers, or bring clients somewhere they will not forget. We design and run the whole trip, from arrival to the journey home.',
      'We plan and run incentive trips across Scotland for companies who want to reward their people, motivate them or bring them closer together. Tell us the aim, and we build the programme and run every part of it.',
      'Scotland gives a group plenty to remember: famous golf, whisky at its source, castles to stay in, and scenery that does much of the work. We turn it into days that run smoothly and land as you intended.',
      'There is no set price for an incentive trip. Your figure reflects where you stay, how you travel, the experiences you choose and the number coming. We send a full, itemised proposal before anything is confirmed.',
    ],
    highlights: [
      'A welcome that sets the tone, from a piper on arrival to a private first-night dinner',
      'Stays worth the trip in themselves, from exclusive-use castles to landmark city hotels',
      'Whisky at its source, with private tastings',
      'Golf arranged around every level of ability',
      'Days that bring a group together, on the lochs, the islands and the open country',
      'Dinners with a real sense of occasion, a gala evening and a ceilidh among them',
    ],
  },
  {
    path: 'services/self-guided-tours',
    heroImage: 'self-guided-hero.webp',
    h1: 'Self-Guided Tours of Scotland',
    paragraphs: [
      'The freedom to explore Scotland your own way, with the route planned and the bookings made before you leave.',
      'Tell us where you would like to go, how long you have and how you like to travel. We design a route, recommend places to stay and stop, and book whatever you would like handled, from rooms to tables and experiences. Then the trip is yours, and we are there if you need us.',
      'Self-guided suits couples and families who would rather set their own rhythm than follow a guide, confident travellers who love the drive and the discovery, and people who have toured Scotland with a guide before and want to come back and explore it their own way.',
      'There is no set price. Each self-guided trip depends on your route, your pace and what you would like us to book.',
    ],
    highlights: [
      'A route and itinerary shaped by what you want to see and how far you like to travel each day',
      'Accommodation booked throughout, from country houses and castles to the best small hotels',
      'Tables, tastings and experiences reserved in advance',
      'Detailed recommendations for each day: where to stop, what to see, and where to eat',
      'Anything else you would like arranged, from car hire to a private guide for a day',
      'A point of contact throughout, for changes of plan or advice on the road',
    ],
  },
  {
    path: 'services/event-staffing',
    heroImage: 'events-hero.webp',
    h1: 'Event Staffing in Scotland',
    paragraphs: [
      'Waiting staff, butlers and hospitality teams for events of any size. Briefed, well presented and ready to look after your guests.',
      'Pricing is by role and by the hour: front-of-house and bar staff from £25 per hour plus VAT (minimum four hours), butlers and event managers from £40 per hour plus VAT (minimum ten hours), and chefs on request for private dining and on-site catering.',
      'We provide trained staff for events across Scotland, from a single butler for a private dinner to a full front-of-house team for a large gathering. Our staff arrive briefed and uniformed to your specification. A senior coordinator runs the team on the day, so you deal with one person.',
      'Everyone we provide is experienced, background-checked, insured and briefed before they arrive. We work with private hosts, companies, families, private households, and the venues and event planners who need a reliable team for an event they are running.',
    ],
    highlights: [
      'Waiting staff for dinners, receptions and functions of every size',
      'Butlers and private service staff for households, private dinners and smaller occasions',
      'Front-of-house and hospitality teams: reception, hosts and guest liaison',
      'Bar staff, from a quiet drinks reception to a full event bar',
      'Chefs on request, for private dining and on-site catering',
    ],
  },
  {
    path: 'services/event-management',
    heroImage: 'events-hero.webp',
    h1: 'Event Management in Scotland',
    paragraphs: [
      'We plan, produce and run events from start to finish, with one point of contact throughout.',
      'We take full responsibility for your event, from the first conversation to the moment the last guest leaves. We manage the production, make the decisions on the day and answer for the result. Our clients want to hand the event over and know it will be run properly, whatever the size.',
      'We start with the brief: what the event is for, who is attending, what impression it should leave. From there we develop the concept, source the venue, build the supplier list, and manage every booking and contract. On the day, we are there with a full team, running the event.',
      'Smaller occasions include private dinners, birthday celebrations and family gatherings. Larger ones include product launches, awards evenings, corporate hospitality days, charity galas and conference receptions. Each is produced differently. The approach stays the same: plan thoroughly, staff well and run it calmly.',
    ],
    highlights: [
      'Venue sourcing and contract negotiation',
      'Supplier management: catering, bar, AV and technical production, lighting, entertainment',
      'Event design and styling',
      'Guest communications, registration and on-the-day reception',
      'Full on-site management with a dedicated event producer',
      'Post-event debrief and close-out',
    ],
  },
  {
    path: 'privacy',
    heroImage: null,
    h1: 'Privacy Policy',
    paragraphs: [
      'This privacy policy explains how The Árdíre Group collects, uses, stores, and protects your personal data when you visit our website or contact us about our services.',
    ],
    highlights: [],
  },
];

const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

// Titles and descriptions come from the same file the pages use at runtime.
const pageMeta = JSON.parse(readFileSync(join(__dirname, '../src/data/pageMeta.json'), 'utf8'));
for (const route of routes) {
  if (!pageMeta[route.path]) throw new Error(`No entry for ${route.path} in src/data/pageMeta.json`);
  Object.assign(route, pageMeta[route.path]);
}
// The home page's tags are written by hand in index.html; make sure they match too.
for (const [label, re] of [['title', /<title>([^<]*)<\/title>/], ['description', /name="description"\s+content="([^"]*)"/]]) {
  const found = indexHtml.match(re)?.[1].replace(/&amp;/g, '&');
  if (found !== pageMeta[''][label]) throw new Error(`index.html ${label} does not match src/data/pageMeta.json: "${found}"`);
}

for (const route of routes) {
  const routeDir = join(distDir, route.path);
  mkdirSync(routeDir, { recursive: true });

  // Cloudflare Pages serves each route at its trailing-slash URL and redirects
  // the bare one there, so the trailing-slash form is the canonical.
  const canonicalUrl = `https://ardire.co.uk/${route.path}/`;
  const pageBlock = buildPageBlock(route);

  let html = indexHtml
    .replace(
      '<link rel="canonical" href="https://ardire.co.uk/" />',
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      '<link rel="alternate" hreflang="en-GB" href="https://ardire.co.uk/" />',
      `<link rel="alternate" hreflang="en-GB" href="${canonicalUrl}" />`
    )
    .replace(
      '<link rel="alternate" hreflang="x-default" href="https://ardire.co.uk/" />',
      `<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`
    )
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${esc(route.title)}</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${esc(route.description)}" />`
    )
    .replace(
      '<meta property="og:url" content="https://ardire.co.uk/" />',
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${esc(route.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${esc(route.description)}" />`
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${esc(route.title)}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${esc(route.description)}" />`
    )
    .replace(
      /<div data-page-content[^>]*>[\s\S]*?<\/div><\/div>(?=\s*<\/body>)/,
      `${pageBlock}</div>`
    );

  if (!html.includes(pageBlock)) {
    throw new Error(`generate-routes: page content not inserted for route "${route.path}". The shape of #root in index.html changed.`);
  }

  // A non-matching replace fails silently and would leave every route preloading
  // the homepage hero, so require the match instead of hoping for it.
  if (!HERO_PRELOAD.test(html)) {
    throw new Error(
      `generate-routes: hero preload tag not found for route "${route.path}". ` +
      `Its shape in index.html changed, so per-route preloads would be wrong.`
    );
  }
  html = html.replace(
    HERO_PRELOAD,
    route.heroImage
      ? `<link rel="preload" as="image" href="${hashedImage(route.heroImage)}" fetchpriority="high" />`
      : ''
  );

  const pageLd = buildServiceJsonLd(route) + buildFaqJsonLd(route) + buildJourneysJsonLd(route);
  if (pageLd) {
    if (!html.includes('</head>')) {
      throw new Error(`generate-routes: no </head> to attach structured data for ${route.path}`);
    }
    html = html.replace('</head>', `${pageLd}  </head>`);
  }

  writeFileSync(join(routeDir, 'index.html'), html);
  console.log(`Generated: /${route.path}/index.html  [h1: ${route.h1}]`);
}

// The page Cloudflare Pages serves, with a 404 status, for any address that does
// not exist: Pages returns the nearest 404.html with a 404 whenever a project has
// one, and only falls back to serving index.html (the SPA mode) when it has none.
// It is the full app, so React shows its not-found page at the visitor's address
// with no redirect. The same words and links are written into the raw HTML from
// src/data/notFound.json, so they are there before any JavaScript runs. Search
// engines are told not to index it, and it carries no canonical, hreflang or
// og:url, since it is not a page in its own right.
{
  const notFound = pageMeta['404'];
  const copy = JSON.parse(readFileSync(join(__dirname, '../src/data/notFound.json'), 'utf8'));
  const linkHtml = copy.links
    .map(l => `<a href="${esc(l.href)}" style="color:#c5a366;text-decoration:none;display:inline-block;padding:0.25rem 0.5rem">${esc(l.label)}</a>`)
    .join('');
  const block =
    `<div data-page-content style="max-width:760px;margin:0 auto;padding:4rem 1.5rem;font-family:Georgia,'Times New Roman',serif;color:#c5a366;line-height:1.7;text-align:center">` +
      `<a href="/" style="display:inline-block;color:#c5a366;text-decoration:none;margin-bottom:2rem">` +
        `<img src="${hashedImage('logo-crest.webp')}" alt="" width="96" height="96" style="display:block;margin:0 auto 0.75rem" />` +
        `<span style="letter-spacing:0.25em">ÁRDÍRE</span></a>` +
      `<p aria-hidden="true" style="font-size:4rem;line-height:1;margin:0 0 1rem;opacity:0.25">404</p>` +
      `<h1 style="font-family:Georgia,serif;font-size:2rem;font-weight:500;margin:0 0 1.25rem">${esc(copy.heading)}</h1>` +
      `<p style="margin:0 auto 2rem;max-width:30rem">${esc(copy.line)}</p>` +
      `<nav aria-label="Where to next">${linkHtml}</nav>` +
    `</div></div>`;
  let html = indexHtml
    .replace(/\s*<link rel="canonical"[^>]*\/>/, '')
    .replace(/\s*<link rel="alternate" hreflang="[^"]*"[^>]*\/>/g, '')
    .replace(/\s*<meta property="og:url"[^>]*\/>/, '')
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(notFound.title)}</title>\n    <meta name="robots" content="noindex" />`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(notFound.description)}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${esc(notFound.title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${esc(notFound.description)}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${esc(notFound.title)}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${esc(notFound.description)}" />`)
    .replace(HERO_PRELOAD, '')
    .replace(/<div data-page-content[^>]*>[\s\S]*?<\/div><\/div>(?=\s*<\/body>)/, block);
  const problems = [
    !html.includes('<meta name="robots" content="noindex" />') && 'no noindex tag',
    /rel="canonical"|hreflang=|og:url/.test(html) && 'a canonical, hreflang or og:url tag survived',
    !html.includes(esc(copy.heading)) && 'the page content was not inserted',
    /location\.(replace|href|assign)|http-equiv="refresh"/.test(html) && 'a redirect is present',
  ].filter(Boolean);
  if (problems.length) throw new Error(`generate-routes: 404.html is wrong: ${problems.join(', ')}`);
  writeFileSync(join(distDir, '404.html'), html);
  console.log('Generated: /404.html  [404 status on Cloudflare Pages, noindex]');
}

console.log(`\nStatic route generation complete — ${routes.length} pages pre-rendered.`);
