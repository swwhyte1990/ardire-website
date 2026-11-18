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
      url: `https://ardire.co.uk/${route.path}`,
      provider: { '@type': 'TravelAgency', name: 'The \u00c1rd\u00edre Group', url: 'https://ardire.co.uk' },
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
  return `    <script type="application/ld+json">\n${json}\n    </script>\n`;
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
    .map(s => `<a href="https://ardire.co.uk/services/${s.slug}" style="${linkStyle}">${esc(s.label)}</a>`)
    .join('');

  const navHtml = `<nav style="margin-top:2.5rem;padding-top:1.75rem;border-top:1px solid rgba(197,163,102,0.25);font-size:0.95rem"><a href="https://ardire.co.uk/" style="${linkStyle}">Árdíre Home</a>${serviceLinksHtml}${route.path !== 'privacy' ? `<a href="https://ardire.co.uk/privacy" style="${linkStyle}">Privacy Policy</a>` : ''}<a href="https://ardire.co.uk/#enquiry" style="color:#c5a366;text-decoration:none;display:inline-block;padding:0.25rem 0">Contact Árdíre</a></nav>`;

  return `<div data-page-content style="max-width:760px;margin:0 auto;padding:3rem 1.5rem;font-family:Georgia,'Times New Roman',serif;color:#c5a366;line-height:1.7">${h1Html}${paragraphsHtml}${highlightsHtml}${buildJourneysHtml(route)}${navHtml}</div>`;
}

const routes = [
  {
    path: 'travel',
    heroImage: 'travel-glenfinnan.webp',
    title: 'Private Tours & Travel in Scotland | The Árdíre Group',
    description: 'Bespoke private tours, championship golf, chauffeur services and a dedicated travel concierge across Scotland, crafted by The Árdíre Group.',
    h1: 'Private Tours & Travel in Scotland',
    paragraphs: [
      'Privately guided journeys, championship golf, luxury chauffeur, self-guided adventures and a dedicated travel concierge. All crafted around you.',
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
    title: 'Corporate Events & Incentive Travel in Scotland | The Árdíre Group',
    description: 'Corporate incentives, end-to-end event management and professional staffing across Scotland, planned and delivered by The Árdíre Group.',
    h1: 'Corporate Events & Incentive Travel in Scotland',
    paragraphs: [
      'Corporate incentives, full-service event management, professional staffing and bespoke experiences. Conceived, managed and delivered.',
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
    title: 'Luxury Private Tours Scotland | The Árdíre Group',
    description: 'Fully escorted private touring across Scotland\'s most breathtaking landscapes. Bespoke itineraries crafted by The Árdíre Group, Glasgow.',
    h1: 'Private Tours of Scotland',
    paragraphs: [
      'A private tour designed around you, with a travel concierge to arrange and look after every part of it. From the moment we meet you at the airport, every day is ours to plan and yours to enjoy.',
      'A private tour is built entirely around you: what you want to see, the pace you want to keep, and the kind of days you want to have. We plan the itinerary, secure every booking, arrange the transport, the rooms, the meals and the experiences, and manage all of it on the ground so that for the length of your stay there is nothing to organise and nothing to chase.',
      'This is a country we know well and love showing off, and most of that love is in the detail: the right glen on the right morning, the dinner worth driving for, the distillery that will open a door for you. Some of our guests arrive knowing exactly what they want. Most come with a few ideas and let us fill in the rest.',
      'Beyond the trips we design, we act as your travel concierge for the whole of your time in Scotland: one person to arrange, book and look after everything, whether you would like a complete journey planned and run for you, or simply the harder parts taken care of and someone on call while you are here.',
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
    title: 'Golf Tours Scotland | St Andrews, Turnberry & Beyond',
    description: 'Play St Andrews, Carnoustie, and Turnberry on a luxury private golf tour of Scotland with private transport and luxury accommodation.',
    h1: 'Private Golf Tours of Scotland',
    paragraphs: [
      'A week on the country\'s great courses, planned and looked after from the moment we meet you at the airport. You play. We take care of everything around it.',
      'We plan and run private golf tours across Scotland for small groups and individual golfers who want to play the country\'s finest courses without a thing to organise. You tell us how you like to play and the courses you have always wanted to tick off, and we shape the week around it: the rounds, the cars, the rooms, the dinners and the evenings, all looked after as the days unfold.',
      'Your tee times are booked in the right order and early enough to get you onto the courses that matter most to you, a private driver takes care of getting you there, and your accommodation is chosen for where you are playing the next morning. Someone is with you through the week who knows your plans, so if the weather turns or you feel like changing something, it is easily done.',
      'There is no set price for a tour, since every week is built around the courses you want to play and the way you want to travel. We put together a full, itemised proposal before anything is booked.',
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
    title: 'Private Chauffeurs in Scotland | Glasgow, Edinburgh, Beyond.',
    description: 'Premium private chauffeur hire across Scotland. Airport transfers, executive transport, and bespoke touring by The Árdíre Group, Glasgow.',
    h1: 'Private Chauffeur Service in Scotland',
    paragraphs: [
      'A professional driver and a comfortable car whenever you want to be somewhere without thinking about how to get there. Airport transfers, days out, and everything in between.',
      'We provide a private chauffeur service across Scotland, for a single transfer or for as long as you would like a car and driver at your disposal. That might be a quiet, comfortable run from the airport after a long flight, a day spent exploring at your own pace, or getting a group where it needs to be without anyone watching the clock.',
      'Our drivers know the roads and the country, and they bring the same care and discretion we put into everything we do. The driving that looks after our private tours and golf trips is the same service we offer on its own here, so you are in experienced hands whether you need us for an hour or a week.',
      'Pricing is quoted per journey or per day. Tell us where you need to be and when, and we will take care of the rest.',
    ],
    highlights: [
      'Airport transfers, met on arrival and looked after all the way to the door',
      'A car and driver for the day, or for several, with no route to plan',
      'Getting between courses, dinners and events comfortably and on time',
      'Reliable, considered transport for groups, occasions and corporate days',
    ],
  },
  {
    path: 'services/corporate-incentives',
    heroImage: 'corporate-hero.webp',
    title: 'Corporate Incentive Trips in Scotland | The Árdíre Group',
    description: 'Reward your top performers with world-class Scottish experiences. Corporate incentive programmes designed by The Árdíre Group.',
    h1: 'Corporate Incentive Trips in Scotland',
    paragraphs: [
      'Reward a team, motivate your top performers, or bring clients somewhere they will not forget. We design and run the whole trip, from the moment everyone arrives to the day they head home.',
      'We plan and run corporate incentive trips across Scotland for companies who want to reward people, motivate them, or bring them closer together. You tell us what the trip is meant to achieve, and we build a programme around it, looking after every part as the days unfold.',
      'Scotland makes a strong case for itself here: world-famous golf, whisky at its source, castles to stay in rather than only visit, and scenery that does a great deal of the work before a single thing is planned. Our part is knowing how to turn all of that into days that run smoothly and land the way you intended.',
      'There is no set price for an incentive trip, since every programme is built around your goals, your group and the time you have. We put together a full, itemised proposal before anything is confirmed.',
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
    title: 'Self-Guided Tours Scotland | The Árdíre Group',
    description: 'Explore Scotland at your own pace with a self-guided itinerary planned for you, accommodation booked, and a point of contact throughout.',
    h1: 'Self-Guided Tours of Scotland',
    paragraphs: [
      'The freedom to explore Scotland your own way, with the itinerary planned and the bookings made for you. You travel independently. We take care of arranging it all beforehand.',
      'You tell us where you would like to go, how long you have and how you like to travel, and we design a route to suit, recommend the places worth staying and stopping, and book whatever you would like handled, from accommodation to tables and experiences. From there, the trip is yours, with us on hand if you need anything along the way.',
      'Self-guided suits couples and families who would rather set their own rhythm than follow a guide, confident travellers who love the drive and the discovery, and people who have toured Scotland with a guide before and want to come back and explore it their own way.',
      'There is no set price, since every self-guided trip is built around your route, your pace and what you would like us to book.',
    ],
    highlights: [
      'A bespoke route and itinerary, built around what you want to see',
      'Accommodation booked throughout, from country houses and castles to the best small hotels',
      'Tables, tastings and experiences reserved in advance',
      'Detailed recommendations for each day: where to stop, what to see, and where to eat',
      'Anything else you would like arranged, from car hire to a private guide for a day',
      'A point of contact on hand throughout, if plans change or you simply want advice',
    ],
  },
  {
    path: 'services/event-staffing',
    heroImage: 'events-hero.webp',
    title: 'Event Staffing Scotland | The Árdíre Group',
    description: 'Professional hospitality and event staffing for Scotland\'s most prestigious events. Sourced and managed by The Árdíre Group.',
    h1: 'Event Staffing in Scotland',
    paragraphs: [
      'Professional waiting staff, butlers and hospitality teams for events of any size. Briefed, well presented, and ready to make the evening run beautifully.',
      'Pricing is by role and by the hour: front-of-house and bar staff from £25 per hour plus VAT (minimum four hours), butlers and event managers from £40 per hour plus VAT (minimum ten hours), and chefs on request for private dining and on-site catering.',
      'We provide trained, professional staff for events across Scotland, from a single butler for a private dinner to a full front-of-house team for a large gathering. Our staff arrive briefed on your event, uniformed to your specification, and led by a senior coordinator who runs the team on the day, so you have one person to deal with rather than a roomful.',
      'Everyone we provide is experienced, background-checked and insured. We work with private hosts, companies, private households, and the venues and event planners who want a reliable, well-presented team for an event they are running themselves.',
    ],
    highlights: [
      'Waiting staff for dinners, receptions and functions of every size',
      'Butlers and private service staff for households and private dinners',
      'Front-of-house and hospitality teams: reception, hosts and guest liaison',
      'Bar staff, from a quiet drinks reception to a full event bar',
      'Chefs on request, for private dining and on-site catering',
    ],
  },
  {
    path: 'services/event-management',
    heroImage: 'events-hero.webp',
    title: 'Event Management Scotland | The Árdíre Group',
    description: 'Full-service event management for corporate functions, gala dinners and private occasions across Scotland. Conceived, managed and delivered by The Árdíre Group.',
    h1: 'Event Management in Scotland',
    paragraphs: [
      'We plan, produce and run events from start to finish. One team, one point of contact, the whole thing taken care of.',
      'We take full responsibility for your event, from the first conversation about what you want to achieve to the moment the last guest leaves. That means we are not just coordinating between suppliers. We are managing the production, making the decisions on the day, and accountable for the result. Whether it is a private dinner for twenty or a corporate gala for several hundred, the level of attention is the same.',
      'We start with the brief: what the event is for, who is attending, what impression it should leave. From there we develop the concept, source the venue, build the supplier list, and manage every booking and contract. On the day, we are there, fully staffed, running the event so you do not have to think about it.',
      'We work across a wide range of occasions: private dinners, birthday celebrations and family gatherings; product launches, awards evenings, corporate hospitality days, charity galas and conference receptions at scale.',
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
    title: 'Privacy Policy | The Árdíre Group',
    description: 'Privacy policy for The Árdíre Group. How we collect, use and protect your personal data.',
    h1: 'Privacy Policy',
    paragraphs: [
      'This privacy policy explains how The Árdíre Group collects, uses, stores, and protects your personal data when you visit our website or contact us about our services.',
    ],
    highlights: [],
  },
];

const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const routeDir = join(distDir, route.path);
  mkdirSync(routeDir, { recursive: true });

  const canonicalUrl = `https://ardire.co.uk/${route.path}`;
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
      /<div data-page-content[^>]*>[\s\S]*?<\/div><\/div>(?=\s*<script)/,
      `${pageBlock}</div>`
    );

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

  const journeysLd = buildJourneysJsonLd(route);
  if (journeysLd) {
    if (!html.includes('</head>')) {
      throw new Error(`generate-routes: no </head> to attach journey structured data for ${route.path}`);
    }
    html = html.replace('</head>', `${journeysLd}  </head>`);
  }

  writeFileSync(join(routeDir, 'index.html'), html);
  console.log(`Generated: /${route.path}/index.html  [h1: ${route.h1}]`);
}

console.log(`\nStatic route generation complete — ${routes.length} pages pre-rendered.`);
