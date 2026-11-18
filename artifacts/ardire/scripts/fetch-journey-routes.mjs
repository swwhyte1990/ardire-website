/**
 * One-off: fetch road routes for each sample journey day and store them in
 * src/data/sampleJourneys.json, so the maps follow real roads without the site
 * calling a routing service at runtime. Re-run after changing a journey's stops:
 *
 *   node scripts/fetch-journey-routes.mjs
 *
 * Routes come from the public OSRM demo server, built on OpenStreetMap data
 * (© OpenStreetMap contributors, ODbL), credited on the map itself.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const file = join(dirname(fileURLToPath(import.meta.url)), '../src/data/sampleJourneys.json');
const journeys = JSON.parse(readFileSync(file, 'utf8'));
const OSRM = 'https://router.project-osrm.org/route/v1/driving/';
const TOLERANCE = 0.006; // degrees: about half a kilometre, finer than one pixel on the map

// Douglas-Peucker, with longitude scaled by cos(57°) so the tolerance is even in both directions.
function simplify(pts) {
  const k = Math.cos((57 * Math.PI) / 180);
  const keep = new Uint8Array(pts.length);
  keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = [pts[a][0] * k, pts[a][1]];
    const [bx, by] = [pts[b][0] * k, pts[b][1]];
    const len = Math.hypot(bx - ax, by - ay);
    let worst = -1, at = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = [pts[i][0] * k, pts[i][1]];
      // a round trip starts and ends at one point, so measure from that point instead
      const d = len < 1e-9
        ? Math.hypot(px - ax, py - ay)
        : Math.abs((bx - ax) * (ay - py) - (ax - px) * (by - ay)) / len;
      if (d > worst) { worst = d; at = i; }
    }
    if (worst > TOLERANCE) { keep[at] = 1; stack.push([a, at], [at, b]); }
  }
  return pts.filter((_, i) => keep[i]).map(([x, y]) => [+x.toFixed(3), +y.toFixed(3)]);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const journey of Object.values(journeys)) {
  let from = journey.start;
  for (const [i, day] of journey.days.entries()) {
    const leg = [from, ...day.stops];
    from = day.stops.at(-1) ?? from;
    const coords = leg.map((s) => `${s.lon},${s.lat}`).join(';');
    const res = await fetch(`${OSRM}${coords}?overview=full&geometries=geojson`);
    const data = await res.json();
    if (data.code !== 'Ok') throw new Error(`${journey.id} day ${i + 1}: ${data.code} ${data.message ?? ''}`);
    const r = data.routes[0];
    day.route = simplify(r.geometry.coordinates);
    console.log(
      `${journey.id.padEnd(28)} day ${i + 1}: ${String(Math.round(r.distance / 1609.34)).padStart(3)} mi, ` +
      `${String(Math.round(r.duration / 60)).padStart(3)} min driving, ${day.route.length} points   (copy says: ${day.drive})`
    );
    await sleep(1100); // the demo server asks for at most one request a second
  }
}
// one [lon, lat] pair per line keeps the file readable
const json = JSON.stringify(journeys, null, 2).replace(/\[\s+(-?[\d.]+),\s+(-?[\d.]+)\s+\]/g, '[$1, $2]');
writeFileSync(file, json + '\n');
