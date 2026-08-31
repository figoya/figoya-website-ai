# Front-end conventions — figoya-website-ai

This file is the house grammar for this site, written as rules. It has two jobs: brief any
collaborator (human or AI) so their output conforms first time, and act as the rule source for
the future FSP front-end plugin (FIG-79), where these rules become a linter and generated code
is validated against them.

Every rule carries an id (R1, R2 …) so violations can be reported against a rule, and a tag:

- **[CHECK]** — machine-checkable; the lint set.
- **[JUDGE]** — taste; stays with the author (or the model plus these exemplars).

"MUST" rules fail review when broken. "SHOULD" rules need a stated reason to break.

---

## 1. Philosophy

- **R1 [JUDGE]** The site is minimalist twice over: minimal code (the lightest website in the
  world) and minimal effort for the reader to get the message.
- **R2 [CHECK]** No front-end frameworks, no build step, no transpilation. What is in the repo
  is what the browser runs.
- **R3 [CHECK]** Dependencies: `low-carbon-state-manager` only, vendored in `node_modules/` and
  served from `/node_modules/low-carbon-state-manager/dist/index.min.js`. Nothing else may be
  installed into the repo (dev tools run outside it — see R51).
- **R4 [JUDGE]** Semantics first: choose the HTML element for what the content *is*. Divs are
  layout scaffolding, never meaning.
- **R5 [CHECK]** British spelling in all copy and class names ("organisational").

## 2. Repository layout

- **R6 [CHECK]** One folder per page, containing exactly `index.html`; the homepage is the root
  `index.html`. URLs never show a file name.
- **R7 [CHECK]** All assets live under `_/`: `_/css/`, `_/js/`, `_/img/`, `_/font/`.
- **R8 [CHECK]** CSS splits three ways: `_/css/site.css` (global), `_/css/section/*.css`
  (section styles), `_/css/page/<page>.css` (one per page, same name as the page folder).
- **R9 [CHECK]** JS splits by role: `_/js/index.js` (entry), `_/js/site.js` (site-wide
  behaviour), `_/js/state/*.js` (one state-modifier module per concern), `_/js/components/*.js`
  (custom elements) with their templates in `_/js/components/templates/`, `_/js/page/<page>.js`
  (page-specific behaviour, only when a page has any).
- **R10 [CHECK]** Copy source of truth is `website-copy.md` in the repo root. Page content is
  derived from it; when they diverge, the copy file wins or gets fixed in the same change.

## 3. The page contract

Every page MUST follow this skeleton, in this order:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset> <meta viewport>
  <title>…</title> <meta name="description" content="…">
  <link rel="icon" …>
  <link rel="stylesheet" href="/_/css/page/<page>.css">
  <script defer src="/_/js/index.js" type="module"></script>
  <!-- optional: <script defer src="/_/js/page/<page>.js" type="module"></script> -->
</head>
<body class="page <page>">
  <script>0;</script>
  <div>
    <main-header page="/<page>"></main-header>
    <main>
      <div>   <!-- hero: h1 + first section, over the charcoal/wave field -->
      <div>   <!-- content: all remaining sections -->
    </main>
    <main-footer></main-footer>
  </div>
</body>
</html>
```

- **R11 [CHECK]** `body` classes are exactly `page <page-name>`; the homepage is `page home`.
- **R12 [CHECK]** The inline `<script>0;</script>` immediately after `<body>` is required (it
  defeats the flash-of-unstyled-content in some browsers). Do not remove it.
- **R13 [CHECK]** `main` contains exactly two `div` children: hero, then content. Nothing else.
- **R14 [CHECK]** `main-header` carries `page="/<page>"` matching a nav href, so the menu marks
  the current page.
- **R15 [CHECK]** Every page links exactly one stylesheet: its own page CSS (R25 imports the
  rest). No page links site.css directly.
- **R16 [CHECK]** `<title>` pattern: homepage `Figoya — Organisational Intelligence`; inner
  pages `<Page Name> — Figoya`. Every page has a non-empty meta description.

## 4. The section grammar

- **R17 [CHECK]** A section is `<section class="s <name>">` where `<name>` is a content name
  (`why-figoya`, `recall`, `built`), never a style name. Style is decided in CSS by listing the
  section in a style family (R27).
- **R18 [CHECK]** A section contains one or two `div` children: `div:nth-child(1)` is the
  heading row (optional), `div:nth-child(2)` is the content row.
- **R19 [CHECK]** Components inside a section are `class="c <section-name> <role>"`. The
  section name is repeated in the component class — this is what makes CSS targeting flat and
  greppable.
- **R20 [CHECK]** Role vocabulary (closed set; extend it here before using a new one):
  `heading`, `text`, `items`, `item`, `actions`, `label`, `pull`, `stat`, `stats`, `closer`,
  `user-input`, `graphic`, `badge`. Modifier classes ride alongside (`heading banner`,
  `cards per-3`, an item's own name).
- **R21 [CHECK]** The hero's first section carries a semantic `h2` in `c <name> heading`; it is
  visually hidden by site.css but MUST exist (the page keeps a full heading outline).
- **R22 [CHECK]** Card lists are `<ol class="cards">` (add `per-3` for three-across at
  desktop); item lists with bold leads are `<ul>` with `h3` + `p` per `li`. Both live inside a
  `c <name> items` wrapper.
- **R23 [CHECK]** Every `a.more` contains a visually-hidden `<span>` completing the sentence
  ("Read More *about the problem*") for screen readers.

## 5. Text vocabulary

- **R24 [CHECK]** Inline meaning markup: `<b>` = deck-style green keyword emphasis; `<strong>`
  = plain bold; `<em>` inside headings = the green word of a two-tone heading; `<q>` for quoted
  phrases (never straight quotes in copy); `&mdash;`, `&rsquo;` entities in HTML copy.
  `p.lead` = the bordered green feature paragraph; `blockquote class="c <name> pull"` = the
  giant-quote pull; `div class="c <name> closer"` = the bordered brand line that ends a page or
  band.
- **R24a [JUDGE]** One `lead`, at most one `pull`, at most one `closer` per section. If
  everything is emphasised, nothing is.

## 6. CSS architecture

- **R25 [CHECK]** Each page CSS begins with the import stack, in this order:
  `accessibility.css`, `site.css`, `animation.css`, `section/shared.css`, then any extra
  section files (e.g. `section/by-email.css`), then page-specific rules.
- **R26 [CHECK]** site.css owns: font-face, element defaults, heading scale, buttons
  (`a.more`, `a.contact`, `button[type="submit"]`), the body background/wave sizing, the hero
  structure, and the shared decorative components (`label`, `pull`, `stat`, hex marker).
- **R27 [CHECK]** section/shared.css groups sections into style families by *listing their
  content names* in grouped selectors (family A prose, B item lists, C chamfered cards, D dark
  edge-to-edge bands, E stat rows). Adding a section to a family = adding its name to the
  family's selector lists. A section MUST appear in at most one family.
- **R28 [CHECK]** A section gets its own file in `_/css/section/` only when its rules are
  substantial and unshared (the contact form's `by-email.css`). Otherwise it lives in a family.
- **R29 [CHECK]** Selectors are flat: `.s.<name>`, `.c.<name>.<role>`, and structural
  `> div:nth-child(n)` — no deep descendant chains, no IDs for styling, no `!important`.
- **R30 [JUDGE]** Prefer structural selectors (`nth-child`) for the section's two-row shape and
  class selectors for everything else, matching the existing files.

## 7. Units, breakpoints, media queries

- **R31 [CHECK]** Root font-size is `0.625em` (1rem = 10px). All sizes in `rem`; no `px`
  except hairlines inherited from legacy shadow styles.
- **R32 [CHECK]** Every rule lives inside a media query; the base bucket is
  `@media only screen`. The ladder is min-width `400 / 500 / 600 / 700 / 800 / 900 / 1040`;
  `1040` is the desktop line (menu flexes, boxed layout at `max-width: 100rem`). No other
  breakpoints may be invented.
- **R33 [JUDGE]** Empty ladder rungs may be kept as placeholders in template files, but don't
  add new empty ones.

## 8. Colour and type

- **R34 [CHECK]** Palette (no other colours without adding them here): lime `#9dc41a`, light
  lime `#c6d768`, green `#76ac41`, deep green `#567f2b`, olive `#7dab05`, charcoal `#252625`
  (also `#232423` in the header), ink `#1d1d1b`, paper `#fff`, greys `#eee/#ddd/#ccc`.
- **R35 [CHECK]** Contrast duties: body-size green text on white is `#567f2b` (links, `b`);
  `#76ac41` only at heading/stat sizes; `#9dc41a` never as text on white — it is for surfaces,
  borders, waves, and text *on charcoal*. On dark bands, keywords are `#c6d768` and accents
  `#9dc41a`.
- **R36 [CHECK]** Type is Montserrat, self-hosted as ONE variable woff2
  (`_/font/montserrat/montserrat-latin-var.woff2`, `font-weight: 100 900`,
  `font-display: swap`), stack `"Montserrat", "Arial", "Helvetica", sans-serif`. No other font
  files, no font CDNs.
- **R37 [CHECK]** Headings are 800 uppercase; body 400; UI/emphasis 600–700. Weights are picked
  from the variable axis — never load a second font file for a weight.

## 9. The hero/wave contract

- **R38 [CHECK]** The hero (`main > div:nth-child(1)`) paints its OWN charcoal field:
  `background-color: #252625` on the element, with the wave (`wave-hero.svg`, a
  transparent-topped strip) anchored `bottom center`. The field is therefore bound to the
  hero's height and grows with its content. Nothing about the hero is ever painted on `body`.
- **R39 [CHECK]** Legibility is a structural invariant, not a sizing agreement: the hero's
  `padding-bottom` MUST be at least the wave's rendered height plus 4rem of clearance.
  `min-height` values are aesthetic minimums only — content may exceed them freely.
- **R39a [CHECK]** Full bleed from inside the constrained container uses the escape-and-repad
  pattern: below 1040px, negative side margins mirroring `main`'s padding ladder
  (`-2rem`/`-4rem`) with matching padding; at ≥1040px, `margin-inline: calc(50% - 50vw)` with
  `padding-inline: max(2rem, calc(50vw - 50rem))` so children need no explicit widths — the
  padding re-imposes the 100rem content line. The header uses the same escape at ≥1040 so
  header and hero read as one surface. (The footer's fixed `margin: 0 -46rem` variant is the
  same idea and is exact up to 192rem viewports.)
- **R39b [CHECK]** `overflow-x: hidden` lives on `body` and NOWHERE ELSE — never on
  `body > div` or any container. Container-level clipping silently kills every full-bleed
  escape on the page (this was learned the hard way: it clipped the footer and the dark bands
  to the 100rem box at desktop).
- **R40 [CHECK]** The hero `h1` is two stacked spans; the second carries `class="line-2"` and
  renders lime. Hero CTAs are `a.contact` (white text variant applies automatically).

## 10. JavaScript

- **R41 [CHECK]** All behaviour goes through `low-carbon-state-manager`: `publish` named
  events, change state only in `addStateModifier` reducers, react in `subscribe` actions.
  No direct cross-module calls, no other event buses, no globals.
- **R42 [CHECK]** Event names are UPPER_SNAKE past-tense facts (`MAIN_MENU_OPENED`,
  `CONTACT_FORM_SENT`) — something that happened, never an instruction.
- **R43 [CHECK]** One state-modifier module per concern in `_/js/state/`, imported from
  `_/js/state/index.js`.
- **R44 [CHECK]** Reusable chrome is a shadow-DOM custom element (`main-header`,
  `main-footer`): logic in `_/js/components/<name>.js`, markup+styles in
  `templates/<name>.js`. Component styles live in the shadow template, not in site CSS.
- **R45 [CHECK]** Page-specific behaviour goes in `_/js/page/<page>.js`, loaded only by that
  page. Pages without behaviour load no page JS.
- **R46 [JUDGE]** If a feature seems to need more machinery than this, the feature is probably
  wrong for this site.

## 11. Assets

- **R47 [CHECK]** SVG first for all graphics; raster only for photographs (there are none).
  Decorative SVGs (`wave-hero`, `wave-footer`, `hex-graph`) are referenced as CSS backgrounds;
  meaningful images are `<img>` with real `alt`.
- **R48 [CHECK]** The brand mark is `figoya-logo-no-text.svg`; the wordmark FIGOYA and the
  category line ORGANISATIONAL INTELLIGENCE are always live text (Montserrat), never baked
  into an image.
- **R49 [JUDGE]** Decoration must never cost readability: hex-graph sits at section edges at
  ≥800px only; background images never under body text.
- **R50 [CHECK]** Weight budget: no single page over 200KB transferred, JS under 15KB total,
  one font file. The heaviest asset in the repo today is the 37KB font — keep it that way.

## 12. Tooling

- **R51 [CHECK]** Dev tools (`http-server`, linters, screenshot scripts) are installed
  globally or run via `npx` — never into this repo's `node_modules` (it is tracked, because
  the site serves from it; see R3).

## 13. Accessibility

- **R52 [CHECK]** Keep the established focus pattern (`:focus-visible` outlines, `a:active`
  lime outline) in any new interactive styles, including inside shadow templates.
- **R53 [CHECK]** Every page has exactly one `h1` and an unbroken heading hierarchy beneath
  it (hidden headings count — R21). Landmarks come from real elements (`main`, `header`,
  `footer`, `section`), not ARIA roles.
- **R54 [CHECK]** `prefers-reduced-motion` disables smooth scrolling and any future
  animation beyond the page fade-in.

## 14. Toward the FIG-79 plugin

The [CHECK] rules above are the linter spec: each is decidable from the file tree, the DOM, or
the CSSOM. The [JUDGE] rules are the model's brief, with this repo as the exemplar corpus.
The missing third piece is the claim→section manifest — which claims from the corpus feed
which page and section — which today is performed by hand via `website-copy.md` (R10). When
that manifest exists as units, the pipeline is: slice → generate under these rules → lint
against [CHECK] → diff rendered content against the slice.

## 15. Read order for a new collaborator

`README` → this file → `_/css/site.css` → `_/css/section/shared.css` → `index.html` →
`problem/index.html` (fullest inner page) → `_/js/site.js` + `_/js/components/header.js` →
`node_modules/low-carbon-state-manager/dist/index.js` (200 lines; read all of it).
