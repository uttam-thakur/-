# Animation audit — Royal Gateway frontend

Reference inspected: https://invitima.com/template-frame/royal-gateway

This pass compared the live reference and its public animation definitions, then implemented the behaviors below with React, CSS and GSAP. It is a behavioral implementation, not a claim that a visual pixel comparison has passed. The reference uses Motion springs; this frontend uses the same 70/20 spring constants for the scroll invitations and GSAP/CSS for the other effects.

| Area                    | Reference behavior                                                                      | Implementation                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Gate                    | Opposite 3D door rotations, camera push, light flood and fading invitation prompt       | 86° doors, 0.9s swing start, 2.6s swing, 1.5s push start, 3s push, 3.3s flood                              |
| Gate atmosphere         | Floating gold dust and pulsing tap target                                               | Local CSS particles; fewer on mobile                                                                       |
| Palace                  | Rises 300px, fades/scales in                                                            | 2.6s rise; title stagger and ampersand scale                                                               |
| Hero scroll             | Sky parallax, palace lift, descending/fading title                                      | 18% sky movement, -60px palace, title fade over scroll 120–520px                                           |
| Hero atmosphere         | Slow sky movement, breathing sun/rays                                                   | CSS drift, radial glow and rays                                                                            |
| Background              | Color pools, twinkles and framed ornaments                                              | CSS ambient pools/twinkles, mobile particle reduction                                                      |
| Blue mandalas           | 90s continuous rotation plus opposite page-scroll turns; fade between hero and footer   | Separate wrapper and image transforms; 360°/-270° scroll rotation; 35% artwork opacity                     |
| Rosette                 | 60s rotation and scale-in entrance                                                      | Separate reveal wrapper and rotating image                                                                 |
| Petals                  | Rose gradient, tumbling along a swaying fall path                                       | Local SVG petals, matching rose colors, vertical drift and 3D tumble                                       |
| Section entrances       | Fade/up movement, title tilt, staggered details                                         | 28px/0.8s entrances; 36px/4° title reveal; venue/detail staggering                                         |
| Save-date and countdown | Floating frames; staggered flip-in countdown and pulsing seconds                        | CSS float, 40px/-60° countdown entrance with 0.12s stagger                                                 |
| Portrait frames         | Left/right shutters slide aside                                                         | ±101% translation over 1.6s after 0.5s delay; moving pearl border on desktop                               |
| Story/family            | Framed portraits and staggered entrances                                                | Local frames, revealed text; full sample proposal milestone restored                                       |
| Scroll invitations      | Top moves from 90% to 25% of viewport; opens down, closes up, remains open farther down | Same range; spring stiffness 70/damping 20; original 1024×1536 proportions, roller lift/tilt and text fade |
| Timeline                | Car sways while following growing gold line                                             | Top 70% to bottom 60% scroll range; car sway 2.4s, expanding line and jewel entrances                      |
| Event details           | Swaying event icon, gold title, decorative separator and dress pill                     | Event icons come from data; responsive container-based sizes                                               |
| Gallery                 | Animated card transitions, autoplay, arrow/thumbnail controls and interactive feedback  | Local carousel with swipe/arrow keys, hover/focus pause and lightbox; no remote requests                   |
| Scratch card            | Erased cover reveals date with a burst                                                  | Actual sampled erased area (>35%) triggers reveal once; local confetti and calendar file                   |
| Buttons                 | Hover/tap scale and moving gold sheen                                                   | CSS feedback and sheen; local-only actions                                                                 |
| RSVP                    | Decorative crest entrance and interactive radio/counter controls                        | Spring-like crest entrance; validated JSON download instead of server submission                           |
| Footer                  | Text reveal, glowing date and rising landscape                                          | Section reveal and 60px/1.4s landscape entrance                                                            |
| Reduced motion          | Decorative animation disabled, content readable                                         | No loops, hidden petals/dust, open scrolls, visible text, no portrait shutters                             |

## Deliberate frontend-only differences

- RSVP never submits to a server. The downloaded response must be shared by the visitor separately.
- Remote maps and their requests are removed; local venue imagery and address text remain.
- No authentication, analytics, database, API handlers, Workers or server adapters are included.
- The previously requested smaller names, hidden preview strip and configurable section switches remain.
- No new wishes-wall service, messaging action or other backend capability has been added.

## Verification

- `pnpm test`: section visibility/order, copy/data propagation, calendar dates, gallery edge cases, scroll mapping at four widths, frontend-only transport/dependency scan, and execution of the actual RSVP handler with a local download adapter.
- `pnpm build`: TypeScript and static production build.
- The local preview server starts successfully on loopback. Cloud-browser access to it is unavailable in the authoring environment. End-to-end screenshots, touch gestures, and exact desktop/mobile visual parity are therefore not verified.
