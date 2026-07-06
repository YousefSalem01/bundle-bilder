# Bundle Builder

A data-driven, multi-step **bundle builder** with a live review panel, built as a React
prototype for the Wyze-style home-security system design.

- **Left:** a 4-step vertical accordion (cameras → plan → sensors → extra protection) with
  product cards (badge, image, variant chips, quantity stepper, pricing).
- **Right:** a live "Your security system" summary that recalculates as you configure.

## Tech stack

- **React 19 + TypeScript**
- **Vite** (dev server + build)
- **Tailwind CSS v4** (design tokens via `@theme` in `src/index.css`)
- **Zustand** for shared selection/cart state
- Data comes from a single **local JSON file** (`src/data/catalog.json`) — no backend required.

## Getting started

```bash
npm install
npm run dev      # start the dev server (prints a local URL)
```

Other scripts:

```bash
npm run build    # type-check (tsc) + production build
npm run preview  # preview the production build
npm run lint     # eslint
npm test         # run the vitest unit suite
```

The app runs and looks correct from a clean clone even before you add product photos —
missing images fall back to a neutral placeholder tile.

## Product images

Product photos live in `public/products/` and the plan/brand marks in `public/icons/`; each
product in `src/data/catalog.json` references its image by path (e.g.
`/products/Wyze Cam v4_sub_image_white.png`). To swap or add artwork, drop the file into
`public/` and point the product's `image` (or a variant's `image`) at it.

Any product whose image path is missing renders a graceful neutral placeholder via
[`ProductImage`](src/components/ui/ProductImage.tsx), so the app always builds and looks tidy
from a clean clone. Chevrons, step icons, steppers and badges are inline SVG / CSS — no export
needed.

## Architecture

```
src/
  data/catalog.json      Single source of truth: steps, products, variants, extras, seed state
  types/catalog.ts       Domain types
  lib/
    catalog.ts           Typed catalog access + line-key helpers
    lineItems.ts         Pure derivation of selected line items from a quantity map
    pricing.ts           Pure pricing math (line totals, grand totals, savings, financing)
    format.ts            Currency formatting
    storage.ts           localStorage save/load/clear
    cn.ts                Tiny class-name joiner (no dependency)
  store/
    bundleStore.ts       Zustand store: quantities, active variant, open step + actions
    selectors.ts         Derived hooks: line items, review groups, totals, step counts
  components/
    ui/                  Reusable primitives (Icon, Chevron, QuantityStepper, PriceTag, …)
    builder/             Left column (Builder, Step, ProductCard, VariantSelector)
    review/              Right column (ReviewPanel, ReviewGroup, ReviewLine, SummaryRow, SummaryFooter, …)
  App.tsx                Two-column responsive shell
```

**Styling.** All brand, status and text colours are defined once as design tokens in the
`@theme` block of `src/index.css` and referenced via Tailwind classes (`bg-primary`,
`text-savings`, `border-divider`, …), so the palette has a single source of truth. Conditional
class strings use the small `cn()` helper. The custom `tall-desktop` breakpoint (wide **and**
tall viewports) drives the alternate stacked Figma composition.

**State model.** Selections are keyed as `productId` (no variants) or `productId:variantId`
(with variants). This makes per-variant quantities fall out naturally, and both the card
stepper and the review-panel stepper mutate the same store entry, so they stay in sync.
Derived data (review lines, totals, "N selected" counts) is computed with memoized selector
hooks — never stored — so there's a single source of truth.

## Key behaviors

- **Per-variant quantities.** Each colour is tracked separately. The card's stepper is bound to
  the currently selected variant; add 2 White then switch to Black and the stepper reads 0,
  while White ×2 stays on the right as its own line.
- **Two-way stepper sync** between cards and review lines.
- **"N selected"** counts distinct products (not variants) with qty > 0 in a step.
- **Live totals**, savings and financing recalculate on every change.
- **Required items** (the Sense Hub) render a locked stepper and stay in the bundle.
- **Persistence.** *Save my system for later* writes the configuration to `localStorage`;
  on the next load the app hydrates from it and restores everything exactly. Without a saved
  system, the app loads the seeded design state.

## Notes, decisions & tradeoffs

- **Responsive & Multiple Desktop Layouts:** Added specific breakpoint handling (`tall-desktop`) to gracefully shift between the standard 1440x1077 side-by-side view and the extra-large 1440x1606 stacked view requested in the Figma designs, ensuring the UI always utilizes the maximum available width without breaking the grid constraints. 
- **Pricing is computed** (`unit × qty`); it isn't hardcoded. Seed unit prices were calibrated
  so the initial bundle matches the design's headline figures exactly: **total $187.89**,
  **compare-at $238.81**, **you save $50.92** (verified). Display-only free shipping is
  intentionally excluded from the savings figure to match the mockup.
- **Mockup inconsistency:** in the Figma the Wyze Cam Pan v3 *card* price (34.98/39.98) doesn't
  multiply to its *review line* (47.98/57.98 at qty 2). I use one consistent unit price
  (23.99 / was 28.99) everywhere so the grand total is internally correct.
- The **financing line** ("as low as $X/mo") is derived (`total ÷ term`, term in `catalog.json`),
  so it reflects the live total rather than a static Figma number.
- I added a couple of **unselected options** (entry sensor, second plan tier, solar panel) so the
  collapsed steps aren't empty when expanded; they're not part of the seeded bundle.
- **Fonts:** Inter (body) + Poppins (display) via Google Fonts — the closest free match to the
  design.
- **Checkout** shows an inline confirmation (the prototype has nowhere to submit).

## Testing

Vitest unit tests cover the pure pricing math and the store actions (including an integration
test asserting the seeded bundle matches the design's headline totals). Run `npm test`.

## Not done / possible next steps (bonus)

- Serving the catalog from a small backend/API (currently a local JSON file — allowed by the brief).
- Component/interaction tests (e.g. React Testing Library) on top of the current logic-level tests.
