/**
 * Post-build script: generates pre-rendered HTML files for each route.
 * This ensures Google and other crawlers receive a 200 response with
 * the correct canonical URL for every page, enabling proper indexing.
 * H1 tags are injected into the root div so crawlers see them without JS.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist/public');

const routes = [
  {
    path: 'services/luxury-tours',
    title: 'Luxury Private Tours Scotland | Árdíre Hospitality Group',
    description: 'Fully escorted private touring across Scotland\'s most breathtaking landscapes. Bespoke itineraries crafted by Árdíre Hospitality Group, Glasgow.',
    h1: 'Luxury Private Tours Scotland',
  },
  {
    path: 'services/golf-tours',
    title: 'Golf Tours Scotland | St Andrews, Turnberry &amp; Beyond | Árdíre',
    description: 'Bespoke golf tours across Scotland\'s most prestigious courses. Tee times at St Andrews, Carnoustie, Turnberry, and Royal Troon arranged by Árdíre Hospitality Group.',
    h1: 'Golf Tours Scotland',
  },
  {
    path: 'services/private-chauffeur',
    title: 'Private Chauffeur Scotland | Glasgow &amp; Edinburgh Transfers | Árdíre',
    description: 'Premium private chauffeur hire across Scotland. Airport transfers, executive transport, and bespoke touring by Árdíre Hospitality Group, Glasgow.',
    h1: 'Private Chauffeur Scotland',
  },
  {
    path: 'services/corporate-incentives',
    title: 'Corporate Incentive Travel Scotland | Árdíre Hospitality Group',
    description: 'Reward your top performers with world-class Scottish experiences. Corporate incentive programmes designed by Árdíre Hospitality Group.',
    h1: 'Corporate Incentive Travel Scotland',
  },
  {
    path: 'services/self-guided-tours',
    title: 'Self-Guided Tours Scotland | Árdíre Hospitality Group',
    description: 'Explore Scotland at your own pace with curated self-guided itineraries, pre-booked accommodations and 24/7 support from Árdíre.',
    h1: 'Self-Guided Tours Scotland',
  },
  {
    path: 'services/event-staffing',
    title: 'Event Staffing Scotland | Árdíre Hospitality Group',
    description: 'Professional hospitality and event staffing for Scotland\'s most prestigious events. Sourced and managed by Árdíre Hospitality Group.',
    h1: 'Event Staffing Scotland',
  },
  {
    path: 'services/event-management',
    title: 'Event Management Scotland | Árdíre Hospitality Group',
    description: 'Full-service event management for corporate functions, gala dinners, and private occasions across Scotland. Conceived, managed, and delivered by Árdíre.',
    h1: 'Event Management Scotland',
  },
  {
    path: 'services/concierge',
    title: 'Private Concierge Glasgow &amp; Scotland | Árdíre Hospitality Group',
    description: 'A discreet, personal concierge service for every detail of your Scottish visit. Árdíre handles everything so you can focus on the experience.',
    h1: 'Private Concierge Glasgow &amp; Scotland',
  },
  {
    path: 'services/commonwealth-26',
    title: 'Commonwealth Games 2026 Hospitality | Árdíre Hospitality Group',
    description: 'Premium hospitality packages for the Glasgow 2026 Commonwealth Games. Accommodation, transfers, tickets and experiences by Árdíre.',
    h1: 'Commonwealth Games 2026 Hospitality Glasgow',
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | Árdíre Hospitality Group',
    description: 'Privacy policy for Árd Íre Hospitality Group trading as Árdíre. How we collect, use and protect your personal data.',
    h1: 'Privacy Policy',
  },
];

const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

for (const route of routes) {
  const routeDir = join(distDir, route.path);
  mkdirSync(routeDir, { recursive: true });

  const canonicalUrl = `https://ardire.co.uk/${route.path}`;

  let html = indexHtml
    // Canonical
    .replace(
      '<link rel="canonical" href="https://ardire.co.uk/" />',
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    // Page title
    .replace(
      /<title>[^<]*<\/title>/,
      `<title>${route.title}</title>`
    )
    // Meta description
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${route.description}" />`
    )
    // OG URL
    .replace(
      '<meta property="og:url" content="https://ardire.co.uk/" />',
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    // OG Title
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${route.title}" />`
    )
    // OG Description
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${route.description}" />`
    )
    // Twitter Title
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${route.title}" />`
    )
    // Twitter Description
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${route.description}" />`
    )
    // Replace crawler H1 text with page-specific H1 (React replaces on hydration)
    .replace(
      /<h1 data-crawler-h1[^>]*>[^<]*<\/h1>/,
      `<h1 data-crawler-h1 style="font-family:serif;font-size:1.5rem;padding:1rem;color:#0d2b1f">${route.h1}</h1>`
    );

  writeFileSync(join(routeDir, 'index.html'), html);
  console.log(`Generated: /${route.path}/index.html  [h1: ${route.h1}]`);
}

console.log(`\nStatic route generation complete — ${routes.length} pages pre-rendered.`);
