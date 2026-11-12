# Royal Gateway — frontend only

React + TypeScript + Vite + GSAP. No backend, API routes, database, authentication, Cloudflare, Next.js, analytics or server functions.

## Run

Use Node.js 22.13+ and pnpm 10.26+ (tested with pnpm 11.25):

```sh
pnpm install
pnpm dev
```

```sh
pnpm test
pnpm build
pnpm preview
```

Deploy the generated `dist/` directory to a static host. The development/preview server only serves frontend files. No lockfile is required or generated.

## Browser-only interactions

- Gate opening, scroll animation, scratch/reveal, gallery navigation, counters and validation run in the browser.
- Calendar and RSVP buttons download files locally. RSVP does not send or save guest details to a service; its status explicitly says nothing was sent to the hosts.
- Copy hashtag uses the browser clipboard.
- Venue cards include lazy-loaded Google Maps embeds and an Open in Google Maps link, derived from each venue name/address. These request external Google content. Replace sample venue data with your exact locations.
- All images and fonts are bundled. Static asset loading is expected; no click handler calls an HTTP API.

## Editing

- `data/`: people, ceremonies, venue details, gallery and story records.
- `content/invitation.ts`: editable wording and accessible labels.
- `config/sections.ts`: visibility and order.
- `config/animation.ts`: gate/reveal/spring parameters.
- `config/invitation.ts`: local RSVP limits, gallery interval and scroll positions.

See CONFIGURATION.md and ANIMATION-AUDIT.md. Reduced-motion preferences disable decorative loops and show scroll invitations fully open. The preview strip is disabled.

## Validation limits

TypeScript, production build, configuration rendering tests, scroll mapping tests, and frontend-only/download checks are provided. Live visual and touch-device verification could not be completed in the authoring environment; see the animation audit for the distinction between inspected reference behavior and tested implementation.
