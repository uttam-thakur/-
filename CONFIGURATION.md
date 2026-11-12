# Editing the invitation

The TSX components contain layout and behavior. Wedding details, editable copy and visibility live outside them.

| File                    | Edit here                                                               |
| ----------------------- | ----------------------------------------------------------------------- |
| `data/bride.ts`         | Bride's first/full name, parents, portrait and crop                     |
| `data/groom.ts`         | Groom's first/full name, parents, portrait and crop                     |
| `data/events.ts`        | Ceremony names, dates, times, venue IDs, dress codes and notes          |
| `data/venues.ts`        | Venue names, addresses and local images                                 |
| `data/wedding.ts`       | Main event ID, locale, timezone and optional custom hashtag             |
| `data/gallery.ts`       | Gallery images and captions; add/remove entries freely                  |
| `data/assets.ts`        | Decorative image paths                                                  |
| `content/invitation.ts` | Page headings, paragraphs, buttons, accessible labels and form feedback |
| `config/sections.ts`    | Show/hide sections and change their order                               |
| `config/invitation.ts`  | Local RSVP download limits, scroll offsets and gallery timing           |

## Show or hide sections

In `config/sections.ts`, change any boolean, for example:

```ts
scratchCard: false,
gallery: true,
festivities: false,
```

The hero, entrance, ribbon, footer, petals and blue flowers have independent switches too. Hidden sections are not rendered. Scroll animations and navigation automatically use the sections that remain.

Reorder the IDs in `contentOrder` to change the middle sections' order. To restore a section removed from this list, add its ID back and set its switch to `true`.

To implement a completely new type of section, add its ID/type and switch in `config/sections.ts`, put its copy in `content/invitation.ts` and its records in `data/`, and register its component in the `sectionComponents` map in `app/page.tsx`.

## Keep dates consistent

Use ISO timestamps with an explicit timezone offset in `data/events.ts`. `data/wedding.ts` selects the primary ceremony by ID. The hero date card, countdown, scratch reveal, footer, metadata and calendar download all derive their date from that event. Venue labels derive from the events referencing each venue ID.

Names, initials and the default hashtag derive from the bride/groom files. Set a custom `hashtag` in `data/wedding.ts` only if desired. No ceremony year or couple name needs editing in TSX.

## Verify changes

Run `node scripts/verify-invitation.cjs` to check section toggles and ordering, editable content/data propagation, calendar dates, gallery edge cases, and the absence of hardcoded visible/accessible JSX copy. Run the project's TypeScript check and production build before publishing.

## Restored sections and responsive artwork

- `data/family.ts`: family members, portraits and frame colors. Parent names derive from bride/groom data.
- `data/story.ts`: sample milestones, dates, years and story text. `{groom}` and `{bride}` follow the configured first names.
- `content/invitation.ts`: family/story headings and relationship labels.
- `config/sections.ts`: `family` and `story` can be hidden or reordered; `ribbon` is off by default.
- Scroll invitations use a shared full-width image coordinate system. The fabric clips as the bottom roller moves; reversing scroll reverses the animation. Reduced-motion mode keeps invitations open and stops decorative rotation.

## Reference scroll behavior

`config/invitation.ts` → `scrollAnimation`: the card opens as its top moves from 90% to 25% of viewport height while scrolling down. It stays open beyond that point. Scrolling upward reverses the same animation and closes it before its top exits below the viewport. There is no second closing phase on downward scroll.

## Frontend-only responses

RSVP downloads JSON to the visitor’s device. It does not send messages or call a service. Fonts, images and decorative artwork are local. There are no map embeds or remote click actions.
