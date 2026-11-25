/**
 * Post-build script: generates pre-rendered HTML files for each route.
 * Each page's text is taken from a server render of the page itself
 * (dist/ssr/prerender.js, built from src/prerender.tsx), so the raw HTML says
 * exactly what the visitor sees and cannot drift from it. The static markup uses
 * brand-matched inline styles so the moment before React hydrates looks
 * intentional. React replaces the root content on mount; sighted users see
 * the full interactive site.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

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
      `<li style="margin:0 0 0.6rem"><strong>${d.departure ? esc(d.title) : `Day ${i + 1}, ${esc(d.title)}`}.</strong> ${esc(d.highlights.join('. '))}.</li>`
    ).join('');
    return `<h3 style="${h3}">${esc(j.duration)}: ${esc(j.title)}</h3>${story}<ol style="margin:0 0 1rem;padding-left:1.25rem;font-size:0.95rem">${days}</ol>`;
  }).join('');
  return `<h2 style="${h2}">Sample journeys</h2>${body}<p style="font-size:0.95rem;margin:1rem 0 0">${esc(JOURNEY_PRICE.label)}. ${esc(JOURNEY_PRICE.note)}</p>`;
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
const HOME = readData('homePage.json');
const JOURNEY_PRICE = readData('journeyPrice.json');
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

// The page's text in reading order, from the server render of the page: headings,
// paragraphs and list items inside <main>. Sections marked data-prerender-skip
// (sample journeys and FAQs, which are interactive and written below from their
// own JSON) are left out, as are buttons, navigation, SVG and anything aria-hidden.
const { render } = await import(pathToFileURL(join(__dirname, '../dist/ssr/prerender.js')).href);
const BLOCKS = new Set(['h1', 'h2', 'h3', 'h4', 'p', 'li']);
const VOID = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source', 'wbr', 'area', 'col', 'embed', 'track']);
const NEVER = new Set(['button', 'nav', 'svg', 'script', 'style', 'noscript', 'template', 'select', 'form']);
const decode = (t) => t
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, '\u00a0').replace(/&amp;/g, '&');

function pageText(route) {
  const html = render(route.path);
  const start = html.indexOf('<main');
  if (start < 0) throw new Error(`generate-routes: no <main> in the server render of ${route.path}`);
  const stack = [];
  const out = [];
  let block = null;
  const tokens = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>|([^<]+)/g;
  tokens.lastIndex = start;
  for (let m; (m = tokens.exec(html)); ) {
    const [, closing, rawTag, attrs = '', selfClosing, text] = m;
    if (text !== undefined) {
      if (block && !stack.at(-1)?.skip) block.text += decode(text);
      continue;
    }
    if (!rawTag) continue; // a comment
    const tag = rawTag.toLowerCase();
    if (closing) {
      const el = stack.pop();
      if (block && el === block.el) {
        const t = block.text.replace(/\s+/g, ' ').trim();
        if (t) out.push({ tag: block.tag, eyebrow: block.eyebrow, text: t });
        block = null;
      }
      if (tag === 'main' && !stack.length) break;
      continue;
    }
    if (tag === 'br') { if (block) block.text += ' '; continue; }
    if (VOID.has(tag) || selfClosing) continue;
    const skip = Boolean(stack.at(-1)?.skip) || NEVER.has(tag) ||
      /\sdata-prerender-skip/.test(attrs) || /\saria-hidden="true"/.test(attrs);
    const el = { tag, skip };
    stack.push(el);
    if (!skip && !block && BLOCKS.has(tag)) {
      const cls = attrs.match(/class="([^"]*)"/)?.[1] ?? '';
      block = { el, tag, text: '', eyebrow: tag === 'p' && /\buppercase\b/.test(cls) };
    }
  }
  const h1s = out.filter((b) => b.tag === 'h1');
  if (h1s.length !== 1) throw new Error(`generate-routes: ${route.path} renders ${h1s.length} <h1> elements, expected one`);
  if (out.length < 8) throw new Error(`generate-routes: only ${out.length} blocks of text found for ${route.path}`);
  return out;
}

function pageTextHtml(blocks) {
  const serif = 'font-family:Georgia,serif;font-weight:500;color:#c5a366';
  const style = {
    h1: `${serif};font-size:2rem;letter-spacing:0.05em;margin:0 0 1.5rem`,
    h2: `${serif};font-size:1.5rem;margin:2.5rem 0 1rem`,
    h3: `${serif};font-size:1.2rem;margin:1.75rem 0 0.5rem`,
    h4: `${serif};font-size:1.05rem;margin:1.25rem 0 0.4rem`,
    p: 'font-size:1.05rem;margin:0 0 1.25rem',
    eyebrow: 'margin:2rem 0 0.5rem;font-size:0.8rem;letter-spacing:0.3em;text-transform:uppercase',
    li: 'padding:0.3rem 0;font-size:1rem',
  };
  let html = '';
  let inList = false;
  for (const b of blocks) {
    if (b.tag === 'li' && !inList) { html += '<ul style="margin:1rem 0 1.5rem;padding-left:1.25rem">'; inList = true; }
    if (b.tag !== 'li' && inList) { html += '</ul>'; inList = false; }
    const css = b.eyebrow ? style.eyebrow : style[b.tag];
    html += `<${b.tag} style="${css}">${esc(b.text)}</${b.tag}>`;
  }
  return html + (inList ? '</ul>' : '');
}

function buildPageBlock(route) {
  const serviceLinksHtml = allServiceLinks
    .filter(s => route.path !== `services/${s.slug}`)
    .map(s => `<a href="https://ardire.co.uk/services/${s.slug}/" style="${linkStyle}">${esc(s.label)}</a>`)
    .join('');

  const navHtml = `<nav style="margin-top:2.5rem;padding-top:1.75rem;border-top:1px solid rgba(197,163,102,0.25);font-size:0.95rem"><a href="https://ardire.co.uk/" style="${linkStyle}">Árdíre Home</a>${serviceLinksHtml}${route.path !== 'privacy' ? `<a href="https://ardire.co.uk/privacy/" style="${linkStyle}">Privacy Policy</a>` : ''}<a href="https://ardire.co.uk/#enquiry" style="color:#c5a366;text-decoration:none;display:inline-block;padding:0.25rem 0">Contact Árdíre</a></nav>`;

  return `<div data-page-content style="max-width:760px;margin:0 auto;padding:3rem 1.5rem;font-family:Georgia,'Times New Roman',serif;color:#c5a366;line-height:1.7">${pageTextHtml(route.text)}${buildJourneysHtml(route)}${buildFaqHtml(route)}${navHtml}</div>`;
}

// The homepage's raw HTML. index.html carries only an empty placeholder; the words
// come from src/data/homePage.json, the file the React sections read, so what a
// crawler sees is what a visitor sees: the heading, hero line, both cards, the About
// section and the enquiry details.
function buildHomeBlock() {
  const serif = "font-family:Georgia,serif;font-weight:500;color:#c5a366";
  const small = "margin:0 0 0.5rem;font-size:0.8rem;letter-spacing:0.3em;text-transform:uppercase";
  const heroHtml =
    `<p style="${small}">${esc(HOME.hero.eyebrow)}</p>` +
    `<h1 style="${serif};font-size:2rem;letter-spacing:0.05em;margin:0 0 1rem">${esc(HOME.hero.title)}</h1>` +
    `<p style="font-size:1.05rem;margin:0 0 1.5rem">${esc(HOME.hero.subline)}</p>`;
  const cardsHtml = HOME.cards.map((c) =>
    `<a href="https://ardire.co.uk${c.href}" style="display:block;color:#c5a366;text-decoration:none;margin:0 0 1.25rem;padding:1rem 0;border-top:1px solid rgba(197,163,102,0.25)">` +
      `<span style="display:block;${small}">${esc(c.eyebrow)}</span>` +
      `<h2 style="${serif};font-size:1.5rem;margin:0 0 0.4rem">${esc(c.title)}</h2>` +
      `<span style="display:block;margin:0 0 0.4rem">${esc(c.text)}</span>` +
      `<span style="display:block;font-size:0.85rem;letter-spacing:0.2em;text-transform:uppercase">${esc(c.cta)}</span></a>`
  ).join('');
  const aboutHtml =
    `<section style="margin-top:2.5rem"><h2 style="${serif};font-size:1.75rem;margin:0 0 1rem">${esc(HOME.about.heading)}</h2>` +
    HOME.about.paragraphs.map((p) => `<p style="font-size:1.05rem;margin:0 0 1.25rem">${esc(p)}</p>`).join('') +
    `<p style="font-style:italic;font-size:1.15rem;margin:1.5rem 0 0">${esc(HOME.about.tagline)}</p></section>`;
  const e = HOME.enquiry;
  const enquiryHtml =
    `<section id="enquiry" style="margin-top:2.5rem"><h2 style="${serif};font-size:1.75rem;margin:0 0 1rem">${esc(e.heading)}</h2>` +
    `<p style="margin:0 0 1.25rem">${esc(e.intro)}</p>` +
    `<p style="margin:0 0 1rem">${esc(e.organisation)}<br />${esc(e.place)}</p>` +
    `<p style="margin:0 0 0.5rem">${esc(e.emailLabel)}: <a href="mailto:${esc(e.email)}" style="color:#c5a366">${esc(e.email)}</a></p>` +
    `<p style="margin:0">${esc(e.phoneLabel)}: <a href="tel:${esc(e.phoneHref)}" style="color:#c5a366">${esc(e.phone)}</a></p></section>`;
  const navHtml = `<nav style="margin-top:2.5rem;padding-top:1.75rem;border-top:1px solid rgba(197,163,102,0.25);font-size:0.95rem">` +
    allServiceLinks.map((s) => `<a href="https://ardire.co.uk/services/${s.slug}/" style="${linkStyle}">${esc(s.label)}</a>`).join('') +
    `<a href="https://ardire.co.uk/privacy/" style="${linkStyle}">Privacy Policy</a></nav>`;
  return `<div data-page-content style="max-width:760px;margin:0 auto;padding:3rem 1.5rem;font-family:Georgia,'Times New Roman',serif;color:#c5a366;line-height:1.7">${heroHtml}${cardsHtml}${aboutHtml}${enquiryHtml}${navHtml}</div>`;
}

// Every page except the homepage, with the hero image its static HTML preloads.
// The words come from the server render; see pageText().
const routes = [
  { path: 'travel', heroImage: 'travel-glenfinnan.webp' },
  { path: 'events', heroImage: 'events-hero.webp' },
  { path: 'services/luxury-tours', heroImage: 'tours-hero.webp' },
  { path: 'services/golf-tours', heroImage: 'golf-hero.webp' },
  { path: 'services/private-chauffeur', heroImage: 'chauffeur-hero.webp' },
  { path: 'services/corporate-incentives', heroImage: 'corporate-hero.webp' },
  { path: 'services/self-guided-tours', heroImage: 'self-guided-hero.webp' },
  { path: 'services/event-staffing', heroImage: 'events-hero.webp' },
  { path: 'services/event-management', heroImage: 'events-hero.webp' },
  { path: 'privacy', heroImage: null },
];

const indexHtml = readFileSync(join(distDir, 'index.html'), 'utf8');

// Titles and descriptions come from the same file the pages use at runtime.
const pageMeta = JSON.parse(readFileSync(join(__dirname, '../src/data/pageMeta.json'), 'utf8'));
for (const route of routes) {
  if (!pageMeta[route.path]) throw new Error(`No entry for ${route.path} in src/data/pageMeta.json`);
  Object.assign(route, pageMeta[route.path]);
  route.text = pageText(route);
  route.h1 = route.text.find((b) => b.tag === 'h1').text;
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

// The homepage itself: index.html with its raw HTML written from the shared data.
{
  const homeBlock = buildHomeBlock();
  const html = indexHtml.replace(
    /<div data-page-content[^>]*>[\s\S]*?<\/div><\/div>(?=\s*<\/body>)/,
    `${homeBlock}</div>`
  );
  const missing = [
    HOME.hero.title, HOME.hero.subline, ...HOME.cards.map((c) => c.text), HOME.about.heading,
    ...HOME.about.paragraphs, HOME.about.tagline, HOME.enquiry.heading, HOME.enquiry.email, HOME.enquiry.phone,
  ].filter((t) => !html.includes(esc(t)));
  if (missing.length) {
    throw new Error(`generate-routes: homepage raw HTML is missing: ${missing.map((t) => t.slice(0, 40)).join(' | ')}`);
  }
  writeFileSync(join(distDir, 'index.html'), html);
  console.log('Generated: /index.html  [h1: ' + HOME.hero.title + ']');
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
