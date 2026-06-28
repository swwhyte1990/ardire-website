# Threat Model

## Project Overview

This repository is a pnpm monorepo. The only demonstrated production deployment is `artifacts/ardire`, a public static React + Vite brochure site for a hospitality and tours business. It serves marketing content and a contact form that sends enquiries directly from the browser to Web3Forms. Shared packages under `lib/` provide database and API client scaffolding, but there is no API server implementation in this workspace today.

## Assets

- **Inbound customer enquiries** — names, email addresses, service interests, and free-form messages submitted through the contact form. These contain personal data and business-sensitive travel/event requirements.
- **Brand and communications integrity** — the public site represents the business and can be abused for phishing, spam generation, or reputational harm if its contact flow is misused.
- **Application configuration** — environment-driven values such as the public Web3Forms access key, deployment base path, and any future API base URLs.
- **Future backend credentials** — `lib/db` expects `DATABASE_URL`, and `lib/api-client-react` can attach bearer tokens, so any future production service using these libraries would become a higher-risk trust boundary.

## Trust Boundaries

- **Browser to static site assets** — all visitors receive client-side code and public content. The browser must be treated as untrusted.
- **Browser to Web3Forms** — contact-form data is posted directly to `https://api.web3forms.com/submit`. This is the main production data egress path and must not rely on client-side-only controls for any security guarantee.
- **Build-time scripts to generated static HTML** — `artifacts/ardire/scripts/generate-routes.mjs` injects pre-rendered markup into built pages. Only repository-controlled content should reach these templates.
- **Dev-only preview tooling** — `artifacts/mockup-sandbox` is a local preview server and is out of production scope unless separately deployed.
- **Potential future server/database boundary** — `lib/db` and the generated API client are scaffold-only today, but if a backend is later added they would become critical injection/authentication boundaries.

## Scan Anchors

- Production entry point: `artifacts/ardire/src/main.tsx`, routes in `artifacts/ardire/src/App.tsx`, static shell in `artifacts/ardire/index.html`.
- Highest-risk production code area: `artifacts/ardire/src/components/sections/Contact.tsx` and the 404/session restore flow in `artifacts/ardire/public/404.html` plus inline restoration script in `artifacts/ardire/index.html`.
- Public surface: all `artifacts/ardire` routes are public; there is no authenticated or admin surface in current production code.
- Dev-only areas to usually ignore: `artifacts/mockup-sandbox/**`, build helper scripts, and scaffolded `lib/api-*` / `lib/db` packages unless a runtime service is added.

## Threat Categories

### Tampering

The current production site accepts untrusted input only through the contact form and URL path handling. Any business or anti-abuse logic that matters must be enforced by the downstream service, not only in client JavaScript. Pre-render generation must continue to use repository-controlled content or explicit escaping before interpolating values into HTML.

Required guarantees:
- Contact-form abuse protections MUST not depend solely on browser-side timing or honeypot checks.
- Any values interpolated into generated HTML MUST remain repository-controlled or be HTML-escaped first.
- Route-derived values MUST only select from an allowlisted set before affecting rendered content or asset paths.

### Information Disclosure

The site handles customer enquiry data and exposes all bundled client configuration to the public. No secrets should be assumed safe merely because they are stored in `VITE_` variables or shipped in static assets.

Required guarantees:
- Customer enquiry contents MUST only be sent to intended third-party processors and MUST not be logged or echoed back into the page unsafely.
- Only configuration intended to be public MUST be exposed in client bundles.
- Error handling in the contact flow MUST avoid exposing internal-only details beyond user-actionable messages.

### Denial of Service

The most plausible production abuse is automated submission of the public contact flow, causing inbox flooding or service disruption. Because there is no first-party backend, resilience depends on the third-party form processor and any anti-abuse controls configured there.

Required guarantees:
- The enquiry pipeline MUST have effective server-side spam and rate-limit controls at the receiving service.
- The site MUST not claim security from browser-only anti-bot measures such as hidden fields or minimum dwell time.
- Any future public API or backend added to this repo MUST implement server-side request throttling for unauthenticated endpoints.

### Elevation of Privilege

There is no authenticated or role-based production surface today. The main future risk is that scaffolded API/database libraries could be adopted later without corresponding server-side authorization boundaries.

Required guarantees:
- No client-side token helper or database package should be considered sufficient security control without a real server enforcing authorization.
- If a backend is introduced, all data access MUST be mediated by server-side authorization and parameterized database access.
