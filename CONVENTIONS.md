# Conventions — The House Method

A portable methodology for building small, fast, accessible websites from semantic HTML
and plain CSS — no framework, no build step, no utility classes.

This document is written to be **copied into any new project unchanged**. Everything
site-specific is quarantined in §1 (Project variables) and §12 (Section inventory); the
rest is the method itself.

Rules are tagged **[CHECK]** (mechanically verifiable — a reviewer can point at the file)
or **[JUDGE]** (requires taste; the rule states the intent, you supply the judgement).
Rule IDs are area-prefixed rather than globally sequential, so a new rule can be added
without renumbering the document.

---

## 0. First principles

Three ideas generate almost every rule below. If you understand these, you can derive the
rest, and you can settle questions this document does not cover.

**P1. A class is a statement of fact, never a hook.**
Every class in the markup says something true about what the element *is*. `class="s intro"`
asserts "this is a section, and it is the intro". `class="c intro heading"` asserts "this is
a component, it belongs to intro, and it plays the heading role". A class that exists only to
raise specificity, or only to hang a style on, is a defect — it makes the markup lie about
itself, and it makes the CSS unreadable to the next person. If you find yourself wanting one,
the real problem is that a rule is in the wrong file or at the wrong rung of the ladder (§4).

**P2. Specificity is managed by composing true labels, not by nesting.**
Because `.s` and `.c` are classes rather than elements, every selector in the system has
uniform, countable specificity. Narrowing scope means *adding one more true class*, which
adds exactly one point of specificity. That gives a monotonic ladder: general rules are short
selectors, specific rules are longer ones, and the specific one always wins — regardless of
what order the files happen to load in. Descendant chains break this, because they win by
depth rather than by meaning.

**P3. The class names carry the structure, so the selectors don't have to.**
This is why a component repeats its section's name. `.c.intro.heading` is already
unambiguous; `.s.intro .c.heading` says the same thing with a descendant combinator, an extra
element in the chain, and a dependency on the DOM shape. The repetition in the markup is the
price paid — deliberately — for flat, greppable, order-independent CSS.

---

## 1. Project variables

*Everything in this section is per-project. On a new project, replace this section and §12;
change nothing else in this file.*

**Project:** Figoya — Organisational Intelligence.

**Palette.** No colour may appear in CSS that is not listed here.

| Colour | Hex | Used for |
|---|---|---|
| lime | `#9dc41a` | surfaces, borders, the wave, rules; as text only on charcoal |
| light lime | `#c6d768` | keyword emphasis on dark grounds |
| green | `#76ac41` | two-tone heading words, stat figures |
| deep green | `#567f2b` | body-size green text: links, `b` |
| olive | `#7dab05` | reserved |
| charcoal | `#252625` | hero, header and dark-band ground (`#232423` in the mobile header) |
| ink | `#1d1d1b` | body text |
| paper | `#fff` | page ground, and text on charcoal |
| greys | `#eee` `#ddd` `#ccc` | header and footer text, hairlines |

**Contrast duties.**

- Body-size green text on white is `#567f2b` only (links, `b`).
- `#76ac41` only at heading or stat sizes.
- `#9dc41a` is never text on white — surfaces, borders and waves, and text on charcoal.
- On dark bands, keywords are `#c6d768` and accents `#9dc41a`.

**Type.** Montserrat, self-hosted as one variable `woff2`
(`_/font/montserrat/montserrat-latin-var.woff2`, `font-weight: 100 900`,
`font-display: swap`), stack `"Montserrat", "Arial", "Helvetica", sans-serif`. Headings 800
uppercase; body 400; UI and emphasis 600–700. Every weight comes from the variable axis.

**Weight budget.** No page over 200KB transferred; all JS under 15KB; one font file. The
heaviest asset in the repo is the 37KB font, and it should stay that way.

**Breakpoint additions.** None — the standard ladder (MQ-4) is used unchanged.

### 1.1 Project contracts

Structural agreements particular to this site, binding in the same way as the rules above.

- **FIG-1 [CHECK]** The hero (`main > div:nth-child(1)`) paints its own charcoal field:
  `background-color: #252625` on the element, with `wave-hero.svg` — a transparent-topped
  strip — anchored `bottom center`. The field is bound to the hero's height and grows with
  its content. Nothing about the hero is ever painted on `body`.
- **FIG-2 [CHECK]** Legibility here is a structural invariant, not a sizing agreement: the
  hero's `padding-bottom` must be at least the wave's rendered height plus 4rem of
  clearance. `min-height` values are aesthetic minimums only — content may exceed them.
- **FIG-3 [CHECK]** The claim line is two stacked spans, the second carrying
  `class="line-2"` and rendering lime. On inner pages it is the hero `h1`; on the homepage
  it is `section.intro`'s `h2`, because the header lockup takes the `h1` there (FIG-4).
- **FIG-4 [CHECK]** The header lockup is drawn as artwork on every page:
  `figoya-oi-center-blackbg.svg` (the dark-ground cut; `-whitebg` is its light-ground pair)
  as a background on `.logo a`, sized by height with `aspect-ratio` from the viewBox — 12rem
  at the desktop line, 7rem where the header carries `.alt`. The mark `img` and the live
  FIGOYA / ORGANISATIONAL INTELLIGENCE text stay in the DOM to supply the accessible name,
  removed with the clip pattern (A11Y-3) and restored under `forced-colors` (A11Y-6), which
  is the only state in which `.wordmark` and `.category` are ever painted.
- **FIG-4a [CHECK]** On the homepage only, `header.js` promotes `div.logo` to `h1.logo`,
  because the lockup is that page's heading. Inner pages leave it a `div` and keep their own
  hero `h1` (FIG-3, A11Y-1).
- **FIG-5 [CHECK]** The hero's first section carries a semantic `h2` in `c <name> heading`.
  On inner pages it is hidden — with the clip pattern, so the outline survives (A11Y-1,
  A11Y-3); on the homepage it is shown and carries the claim (FIG-3).
- **FIG-6 [CHECK]** Hero CTAs are `a.contact`; the white-text variant applies automatically
  inside the hero.

---

## 2. Repository layout

- **REPO-1 [CHECK]** All non-page assets live under a single `_/` directory:
  `_/css`, `_/js`, `_/img`, `_/font`, `_/test`. One underscore directory, no others at root.
- **REPO-2 [CHECK]** A `.nojekyll` file sits at the root. On GitHub Pages, Jekyll silently
  refuses to serve any path beginning with an underscore; without this file the entire `_/`
  tree 404s. This is not optional and not cosmetic.
- **REPO-3 [CHECK]** Each page is a directory containing `index.html`, giving clean URLs
  (`/services/`, not `/services.html`). The homepage is the root `index.html`.
- **REPO-4 [CHECK]** `node_modules` is committed, because the site serves runtime modules
  directly from it with no build step. Runtime dependencies must therefore be few, small, and
  chosen on that basis.
- **REPO-5 [CHECK]** Dev-only tools (a static server, linters, screenshot scripts) are run via
  `npx` or installed globally — never added to the committed `node_modules`.
- **REPO-6 [CHECK]** No build step, no bundler, no transpiler, no CSS preprocessor. What is in
  the repository is what the browser receives.

---

## 3. The page skeleton

- **HTML-1 [CHECK]** Every page has this shape and nothing else at the top level:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>...</title>
  <meta name="description" content="...">
  <link rel="icon" type="image/png" sizes="128x128" href="/_/img/favicon-128.png" />
  <link rel="stylesheet" href="/_/css/page/<page>.css">
  <script defer src="/_/js/index.js" type="module"></script>
  <!-- optional: <script defer src="/_/js/page/<page>.js" type="module"></script> -->
</head>
<body class="page <page-name>">
  <script>0;</script>
  <div>
    <main-header page="/<page>"></main-header>
    <main>
      <div>   <!-- row 1: the hero -->
      <div>   <!-- row 2: everything else -->
    </main>
    <main-footer></main-footer>
  </div>
</body>
</html>
```

- **HTML-2 [CHECK]** `body` classes are exactly `page <page-name>`. `.page` is the hook for
  "any page"; `.page.<name>` is the hook for one page. The homepage is `page home`.
- **HTML-3 [CHECK]** The inline `<script>0;</script>` immediately after `<body>` stays. It
  defeats a flash of unstyled content in some browsers. Do not remove it.
- **HTML-4 [CHECK]** `body > div` is the single layout wrapper: it carries the centring and
  the `max-width` at desktop. Nothing else may take that job.
- **HTML-5 [CHECK]** `main` contains exactly two `div` children — hero row, then content row —
  and nothing else. These are addressed structurally as `main > div:nth-child(1)` and
  `main > div:nth-child(2)`.
- **HTML-6 [CHECK]** `main-header` carries `page="/<page>"` matching one of its nav hrefs, so
  the component can mark the current page itself.
- **HTML-7 [CHECK]** Exactly one stylesheet link per page: its own page CSS, which imports
  everything else (§5). No page links `site.css` directly.
- **HTML-8 [CHECK]** Semantic elements do semantic work: `main`, `header`, `footer`,
  `section`, `figure`/`figcaption`, `ol`/`ul`, `dl`, `q`, `em`, `strong`, `sub`. Landmarks
  come from real elements, never from ARIA roles bolted onto divs.
- **HTML-9 [CHECK]** IDs are never used for styling. They exist only for fragment links
  (`<section class="s by-email" id="by-email">`) and for `label`/`for` pairing. Form control
  IDs are namespaced to their component and instance: `c-<component>-<instance>-<field>`,
  e.g. `c-email-form-1-name`. This keeps IDs unique even when a component appears twice.

---

## 4. The section grammar

This is the core of the method. Read §0 first; the rules here are consequences of it.

### 4.1 Sections

- **SG-1 [CHECK]** A section is `<section class="s <name>">`. `s` means section. `<name>` is a
  **content** name — what the section is about (`intro`, `how-we-can-help`, `did-you-know`),
  never a style name (`dark-band`, `two-col`). Style is assigned in CSS by listing the section
  in a style family (§7); the markup never names its own appearance.
- **SG-2 [JUDGE]** Read `class="s intro"` as two labels, not as a hierarchy: *this is a
  section, and it is the intro*. It is closer to a set of tags than to a subclass. The
  practical consequence is that `.s` alone is a legitimate selector for "every section", and
  it costs the same specificity as any other class.
- **SG-3 [CHECK]** Write `.s.intro`, never `section.intro`. Mixing element and class
  specificity is what makes override order unpredictable; keeping every selector class-only is
  what makes the ladder in §4.4 work. This applies everywhere: `.c.intro.heading`, not
  `h2.c.intro.heading`.
- **SG-4 [CHECK]** A section contains one or two `div` children and nothing else.
  `> div:nth-child(1)` is the heading row (optional); `> div:nth-child(2)` is the content row.
  These two rows are the section's only structural contract, and they are addressed
  structurally — this is the one place `nth-child` is preferred over a class.
- **SG-5 [CHECK]** Section names are unique across the site. A name identifies one kind of
  section, so the same name must never mean two different things on two pages.

### 4.2 Components

- **SG-6 [CHECK]** A component of a section is `<div class="c <section-name> <role>">`.
  `c` means component. The section name is repeated deliberately (P3): it makes
  `.c.<section-name>` a complete, flat address for "every component of that section", so no
  descendant selector is ever needed to reach one.
- **SG-7 [CHECK]** The role comes from a closed vocabulary. Extend the list here before using
  a new one; an unlisted role is a review failure, not a judgement call:

  `heading`, `text`, `items`, `item`, `actions`, `graphic`, `quote`, `badge`, `label`,
  `user-input`, `stat`, `stats`, `closer`

- **SG-8 [CHECK]** The role class attaches to whichever element is semantically correct. A
  `heading` may be the `h2` itself (`<h2 class="c intro heading">`) or a wrapper around it
  (`<div class="c esg heading"><h2>…</h2></div>`). Both are valid; pick the one that lets the
  markup stay honest. Be consistent within a section.
- **SG-9 [CHECK]** Instance modifiers ride alongside the role as a further class:
  `.c.how-much.text.one`, `.c.did-you-know.text.two`, `.c.services.item.audit`. Use ordinal
  words (`one`, `two`, `three`) when the instances are merely sequential, and a real name
  when they mean something.
- **SG-10 [CHECK]** Lists are `<div class="c <name> items">` wrapping a bare `<ol>` or `<ul>`,
  with each `<li class="c <name> item <modifier>">`. The `items` component is the container;
  each `item` is a component in its own right. Inside an already-scoped `.c.<name>.items`
  rule, a plain `li.<modifier>` is sufficient and preferred — the scope is already established.
- **SG-11 [JUDGE]** Plain, classless `<div>`s are allowed as pure layout scaffolding inside a
  row (for example, to make two flex columns). They carry no meaning and are addressed
  structurally (`> div > div`) or not at all. If you find yourself wanting to name one, it is
  probably a component.

### 4.3 What the grammar buys you

Given `<section class="s intro">` containing `.c.intro.heading`, `.c.intro.text` and
`.c.intro.actions`, all of these are available immediately, in any file, in any order:

| Selector | Addresses |
|---|---|
| `.s` | every section on the site |
| `.s.intro` | the intro section itself |
| `.s.intro > div:nth-child(2)` | the intro's content row |
| `.c` | every component of every section |
| `.c.intro` | every component of the intro |
| `.c.intro.text` | the intro's text component(s) |
| `.c.intro.text.one` | one specific instance |
| `.c.heading` | every heading component on the site |
| `.c.intro.heading` | this section's heading, overriding the above |

### 4.4 The specificity ladder

- **SP-1 [CHECK]** Scope is narrowed by **adding one more true class**, never by adding a
  combinator. Each rung adds exactly `(0,1,0)`, so a more specific rung always beats a less
  specific one no matter which file it lives in:

  ```
  .c                        (0,1,0)   every component
  .c.intro                  (0,2,0)   every component of the intro
  .c.intro.text             (0,3,0)   one role within it
  .c.intro.text.one         (0,4,0)   one instance of that role
  ```

- **SP-2 [CHECK]** Never write `.s.<name> .c.<role>` when `.c.<name>.<role>` says the same
  thing. The name repetition in SG-6 exists precisely so the descendant combinator is
  unnecessary; using it anyway spends specificity you cannot later undo cleanly.
- **SP-3 [CHECK]** There are exactly three legitimate reasons to descend from `.s` to a `.c`,
  and no others:
  1. **The section carries a state class.** State applied by JS lands on the section
     (JS-6), so the selector must start there: `.s.by-email.sending .c.user-input`.
  2. **Structural row targeting**, which is about the `div` rows and not about a component:
     `.s.<name> > div:nth-child(2)`.
  3. **Page or hero context owned by `site.css`** (§5), where the whole point of the rule is
     the position on the page: `.page main > div:nth-child(1) > .s:first-of-type .c.text`.
     No other file may write selectors of this shape.
- **SP-4 [CHECK]** Never add a class to an element in order to win a specificity contest. If a
  rule will not take effect, the cause is one of: the rule is in the wrong file; the competing
  rule is over-specific and should be shortened; or the thing you are styling deserves a
  genuine role or modifier class it does not yet have. Fix the cause.
- **SP-5 [CHECK]** No `!important`, anywhere, for any reason.
- **SP-6 [CHECK]** No IDs in selectors (HTML-9).
- **SP-7 [CHECK]** `:not()` is permitted where it expresses a true exception over the
  page or section label — `.page:not(.home)`, `header:not(.alt)`. It is not a licence to
  invert arbitrary conditions; if the `:not()` is doing the work a missing class should do,
  add the class instead. Note that `:not()` takes the specificity of its argument, so it sits
  on the ladder normally.
- **SP-8 [JUDGE]** Prefer shortening the over-specific rule to lengthening its challenger.
  Every unnecessary point of specificity is a debt the next override has to pay.

---

## 5. CSS file architecture

- **CSS-1 [CHECK]** The files and their fixed roles:

  | File | Owns |
  |---|---|
  | `_/css/accessibility.css` | focus/`:focus-visible` pattern, the visually-hidden pattern |
  | `_/css/site.css` | `@font-face`, element defaults, heading scale, links and buttons, the body/background, the page-level structure (`body > div`, `main`, the two rows), the hero contract |
  | `_/css/animation.css` | `@keyframes` only |
  | `_/css/section/shared.css` | the style families (§7) |
  | `_/css/section/<name>.css` | one section, when it earns its own file |
  | `_/css/page/<page>.css` | the import stack, then rules true only of that page |

- **CSS-2 [CHECK]** Every page CSS begins with the import stack in this exact order:
  `accessibility.css`, `site.css`, `animation.css`, `section/shared.css`, then any
  section files, then that page's own rules. Order is load-bearing: it is the only place in
  the system where cascade order matters, and it runs general → specific.
- **CSS-3 [CHECK]** A section gets its own file in `_/css/section/` only when its rules are
  substantial and not shared with any other section. Otherwise it joins a style family in
  `shared.css` (§7). Do not create a file per section by reflex.
- **CSS-4 [CHECK]** A new section file starts from the empty ladder skeleton, so the rungs
  are always in the same order and a reader can scan straight to the breakpoint they want:

  ```css
  @media only screen {}
  @media only screen and (min-width: 600px) {}
  @media only screen and (min-width: 600px) and (max-width: 1040px) {}
  @media only screen and (min-width: 800px) {}
  @media only screen and (min-width: 1040px) {}
  ```

- **CSS-5 [CHECK]** Page CSS holds only what is true of that page alone. A rule that would be
  true of the section anywhere belongs in the section's file or family. In particular, page
  CSS must not restate page structure (`main > div:nth-child(1) > …`) in order to out-specify
  `site.css` — that is SP-4. Put the exception in `site.css` where the structure is owned.
- **CSS-6 [JUDGE]** Comment blocks explain *why*, and label the family or the contract they
  implement. The selectors already say what.
- **CSS-7 [CHECK]** Full bleed from inside the constrained wrapper uses escape-and-repad, so
  that children need no widths of their own: below the desktop line, negative side margins
  mirroring `main`'s padding ladder with matching padding; at and above it,
  `margin-inline: calc(50% - 50vw)` with
  `padding-inline: max(<gutter>, calc(50vw - <half the wrapper width>))`, which re-imposes
  the content line inside a full-width band. A fixed-rem variant of the same idea is exact
  only up to a known viewport width; prefer the `vw` form.
- **CSS-8 [CHECK]** `overflow-x: hidden` lives on `body` and nowhere else — never on the
  layout wrapper, never on a container. Container-level clipping silently kills every
  full-bleed escape on the page, and the symptom (bands stopping at the content line) does
  not point anywhere near the cause.

---

## 6. Units, breakpoints, media queries

- **MQ-1 [CHECK]** `html { font-size: 0.625em; }` so `1rem` = `10px` at default settings, and
  every size in the codebase is expressed in `rem`. This keeps arithmetic trivial while
  remaining fully responsive to the user's font-size preference.
- **MQ-2 [CHECK]** `px` appears only for hairlines and for the `1px` of the visually-hidden
  pattern. Nowhere else.
- **MQ-3 [CHECK]** Every rule lives inside a media query. The base bucket — mobile, and the
  default for everything — is `@media only screen`. There are no rules outside a media query.
- **MQ-4 [CHECK]** The ladder is mobile-first `min-width`, in `px`:
  `400 / 500 / 600 / 700 / 800 / 900 / 1040`. `1040` is the desktop line: the menu becomes a
  horizontal bar and the layout boxes to `max-width: 100rem`.
- **MQ-5 [JUDGE]** Additional rungs may be introduced when the *content* demands one and no
  existing rung will do, but each addition must be recorded in §1. Prefer an existing rung.
- **MQ-6 [CHECK]** `max-width` queries are used only for rules that are genuinely mobile-only
  and cannot be expressed mobile-first, and for the bounded band
  `(min-width: 600px) and (max-width: 1040px)`.
- **MQ-7 [CHECK]** Empty rungs are kept as placeholders in section files (CSS-4) so the
  skeleton stays uniform. Do not add empty rungs beyond the skeleton.
- **MQ-8 [CHECK]** Non-breakpoint media features are permitted and expected where they carry
  an accessibility duty: `prefers-reduced-motion`, `forced-colors`, `prefers-contrast`.
  These are additional buckets, not rungs on the ladder.

---

## 7. Style families

- **FAM-1 [CHECK]** `section/shared.css` groups sections into visual families by **listing
  their content names in a grouped selector**. Giving a section a family is done by adding its
  name to that family's selector lists — never by adding a style-named class to the markup
  (SG-1).
- **FAM-2 [CHECK]** A section appears in **at most one** family. A section listed in two
  families is a bug: the outcome then depends on file order, which is exactly what this
  system exists to prevent. *(The reference implementation has one such collision. Do not
  copy it.)*
- **FAM-3 [JUDGE]** A family is worth creating at two members and is usually wrong at one.
  Families are defined by their *visual contract* — ground colour, whether they bleed to the
  screen edge, where the graphic sits, how the heading row behaves — and each family should
  be documented with that contract in a comment above it.
- **FAM-4 [CHECK]** Because a family's selector lists are long, they are the one place where
  a mechanical check pays: every name in a family list must exist in the markup, and every
  section in the markup must be accounted for in the inventory (§12) — in exactly one
  family, in its own file, or explicitly recorded as served by role-level rules alone.

---

## 8. Web components

- **WC-1 [CHECK]** Reusable chrome (`main-header`, `main-footer`) is a shadow-DOM custom
  element: behaviour in `_/js/components/<name>.js`, markup and styles in
  `_/js/components/templates/<name>.js`, which exports a `<template>`.
- **WC-2 [CHECK]** A component's styles live inside its shadow template, never in the site
  CSS. Shadow encapsulation means site CSS cannot reach in — this is the intended benefit,
  not an obstacle to work around.
- **WC-3 [CHECK]** Shadow styles follow the same media-query discipline as the rest of the
  system (§6): every rule inside `@media only screen` or a rung of the ladder.
- **WC-4 [CHECK]** Parameterise a component with CSS custom properties declared on `:host`
  and set by the host page. Do not expose internals via `::part` unless there is no
  alternative, and never reach into a shadow root from outside.
- **WC-5 [JUDGE]** Inside a shadow root the section grammar does not apply — there is no
  cascade to protect. Use plain, semantic selectors (`.menu li a`, `.logo img`), keeping
  them shallow.
- **WC-6 [CHECK]** A component that varies by page takes the variation as an attribute
  (`page="/services"`) and reflects it as a class on its own root element (e.g. `.alt`),
  which its styles then key off. Do not query the host document from inside a component.

---

## 9. JavaScript

- **JS-1 [CHECK]** JavaScript is progressive enhancement. Every page must be readable and
  navigable with JS disabled; nothing that carries meaning is injected by script.
- **JS-2 [CHECK]** All behaviour goes through the state manager: `publish` named events,
  change state only inside `addStateModifier` reducers, react in `subscribe` actions. No
  direct cross-module calls, no second event bus, no globals.
- **JS-3 [CHECK]** Event names are `UPPER_SNAKE_CASE` and name a fact that has already
  happened — `MAIN_MENU_OPENED`, `CONTACT_FORM_SENT`, `DOM_CONTENT_LOADED`. Never an
  instruction (`OPEN_MENU`).
- **JS-4 [CHECK]** One state-modifier module per concern in `_/js/state/`, each a pure
  `switch` returning a new state object, all imported by `_/js/state/index.js`.
- **JS-5 [CHECK]** Page-specific behaviour lives in `_/js/page/<page>.js` and is loaded only
  by that page. Pages with no behaviour load no page JS.
- **JS-6 [CHECK]** **JS talks to CSS through state classes, never through inline styles.** A
  subscriber toggles a class on the relevant `.s.<name>` element (`sending`, `sent`, `open`),
  and CSS decides what that looks like. JavaScript must never write to `element.style`, and
  CSS must never be duplicated in a script.
- **JS-7 [CHECK]** `_/js/index.js` is the single entry point and does nothing but import, in
  order: state, site behaviour, then components.
- **JS-8 [JUDGE]** If a feature appears to need more machinery than this, the feature is
  probably wrong for this kind of site. That is a legitimate finding to report.

---

## 10. Accessibility

- **A11Y-1 [CHECK]** Every page has exactly one `h1` and an unbroken heading hierarchy
  beneath it. Hidden headings still count toward the outline — which means they must be
  hidden in a way that keeps them in the accessibility tree (A11Y-3).
- **A11Y-2 [CHECK]** The focus pattern in `accessibility.css` — `:focus` fallback,
  `:focus:not(:focus-visible)` reset, `:focus-visible` outline, `a:active` outline — is
  reproduced in any new interactive styles, **including inside shadow templates**, which the
  site stylesheet cannot reach.
- **A11Y-3 [CHECK]** To hide something visually while keeping it available to assistive
  technology, use the clip pattern:

  ```css
  position: absolute; width: 1px; height: 1px; margin: -1px;
  padding: 0; border: 0; overflow: hidden;
  clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap;
  ```

  `display: none` and `visibility: hidden` both remove the element from the accessibility
  tree entirely. Neither is a way to hide something from sighted users only, and neither may
  be used on a heading that the outline depends on.
- **A11Y-4 [CHECK]** The link-suffix pattern: a repeated link label carries its
  disambiguating text in a nested span — `<a class="more" href="/x">Read More <span>about
  how we audit your site</span></a>` — which `accessibility.css` hides visually with A11Y-3
  via the `a span` selector. This gives every "Read More" a unique accessible name at no
  visual cost, and it is the reason bare `<span>` inside a link is reserved for this purpose.
- **A11Y-5 [CHECK]** Meaningful images are `<img>` with real `alt`; decorative images take
  `alt=""` or are CSS backgrounds. A graph or diagram gets an `alt` that states its finding,
  not its file name, and a `<figcaption>` where the finding needs a sentence.
- **A11Y-6 [CHECK]** Any element whose visible content comes from a CSS background image
  needs a `forced-colors: active` branch that restores a text equivalent — forced-colours
  modes drop background images, and an element hidden by A11Y-3 will not reappear on its own.
- **A11Y-7 [CHECK]** Colour contrast follows the duties recorded in §1. Body-size text meets
  4.5:1; large text and headings meet 3:1. Colour is never the sole carrier of meaning.
- **A11Y-8 [CHECK]** `prefers-reduced-motion: reduce` disables smooth scrolling and every
  animation beyond a page fade-in.
- **A11Y-9 [CHECK]** Form controls have real `<label for>` pairing with namespaced IDs
  (HTML-9). Placeholders are never used as labels.

---

## 11. Assets and weight

- **ASSET-1 [CHECK]** SVG for all graphics, icons and diagrams. Raster only for photographs
  and screenshots, as `webp`.
- **ASSET-2 [CHECK]** Decorative graphics are CSS backgrounds; meaningful ones are `<img>`
  with `alt` (A11Y-5).
- **ASSET-3 [CHECK]** Below-the-fold images carry `loading="lazy"`. Above-the-fold ones
  do not.
- **ASSET-4 [CHECK]** Fonts are self-hosted, subset, `woff2`, one variable file where
  possible, with `font-display: swap`. No font CDNs. Never load a second file to obtain a
  weight the variable axis already provides.
- **ASSET-5 [CHECK]** The weight budget in §1 is a hard limit, checked per page, and it is
  the reason for most of the decisions in this document. If a change breaks the budget, the
  change is wrong, not the budget.
- **ASSET-6 [JUDGE]** Decoration must never cost readability. Background images never sit
  under body text; decorative graphics are held back to section edges and larger viewports.

---

## 12. Section inventory

*Per-project. Every section name, the page it appears on, and where its style comes from.
This is the index that makes FAM-4 checkable and stops a name being reused for two
different things (SG-5). Update it in the same commit as any new section.*

Families live in `_/css/section/shared.css`: **A** prose · **B** item lists with bold leads ·
**C** chamfered cards · **D** dark bands, edge to edge · **E** stat rows (role-level).

| Section | Page | Style from |
|---|---|---|
| `build-graph` | solution | A |
| `built` | solution | D |
| `by-email` | contact-us | `section/by-email.css` |
| `claim-graph` | architecture | B |
| `claims-not-facts` | philosophy | A |
| `falls-out` | solution | C |
| `intro` | all | `site.css` — the hero contract (FIG-1, FIG-5) |
| `lands` | architecture | E, role-level only — no family entry |
| `learn-more` | home | C |
| `long-arc` | vision | D |
| `meaning` | philosophy | A |
| `no-oracle` | philosophy | D |
| `not-bugs` | problem | D |
| `oi` | home | `shared.css`, own block |
| `pattern` | vision | A |
| `pipelines` | architecture | C |
| `platform` | vision | A |
| `policy` | privacy-policy | `page/privacy-policy.css` |
| `privacy` | architecture | A |
| `proof` | home | D |
| `recall` | problem | A |
| `remembering` | problem | B |
| `retrieval` | problem | B |
| `separation` | philosophy | A |
| `sequence` | vision | A |
| `standing` | philosophy | A |
| `substrate` | architecture | D |
| `triad` | vision | C |
| `use-graph` | solution | C |
| `validation` | philosophy | A |
| `verticalco` | vision | A |
| `why-figoya` | home | C |
| `why-matters` | problem | A |

---

## 13. Review checklist

Run this against any diff before it lands.

**Markup**
- [ ] Every class is a true statement about the element (P1); none exists to win specificity (SP-4).
- [ ] Sections are `s <content-name>`; no style names in the markup (SG-1).
- [ ] Every component repeats its section's name and uses a listed role (SG-6, SG-7).
- [ ] Sections have one or two `div` rows and nothing else (SG-4).
- [ ] `main` has exactly two `div` children (HTML-5).
- [ ] One `h1`; heading hierarchy unbroken (A11Y-1).
- [ ] No IDs used for styling; form IDs namespaced (HTML-9).

**CSS**
- [ ] No `!important`, no ID selectors, no element-qualified class selectors (SP-3, SP-5, SP-6, SG-3).
- [ ] No descendant chain that a composed class selector would express (SP-2), and any
      descent from `.s` falls under one of the three exceptions (SP-3).
- [ ] Every rule inside a media query, on the ladder (MQ-3, MQ-4).
- [ ] All sizes in `rem` (MQ-1, MQ-2).
- [ ] Rules are in the file that owns them (CSS-1, CSS-5).
- [ ] Import order intact (CSS-2).
- [ ] Every section in exactly one family, or in its own file (FAM-2, FAM-4).
- [ ] No colour outside the palette in §1.

**Behaviour**
- [ ] Page works with JS off (JS-1).
- [ ] State changes only in reducers; events are past-tense facts (JS-2, JS-3).
- [ ] JS toggles classes, never inline styles (JS-6).

**Accessibility**
- [ ] Focus pattern present, including in any shadow template (A11Y-2).
- [ ] Anything hidden visually uses the clip pattern, not `display:none`/`visibility:hidden` (A11Y-3).
- [ ] Background-image content has a `forced-colors` fallback (A11Y-6).
- [ ] Contrast duties met (A11Y-7).
- [ ] Real `alt` on meaningful images (A11Y-5).

**Weight**
- [ ] Page still within the budget in §1 (ASSET-5).

---

## 14. Known deviations

Neither codebase is flawless. These are recorded so they are not mistaken for rules and
copied forward. Every one is mechanically detectable from the rules above, which is the
argument for having written them down.

### In the reference implementation

*(`figoya-website-green-software`, from which this method was derived.)*

- `.s.transparency` is listed in two style families (`shared.css` :292 and :418), so which
  one wins depends on file order — breaks FAM-2.
- `h2.c.how-we-can-help` is element-qualified (`site.css` :29), mixing specificity types —
  breaks SG-3.
- `.s.how-much .c.actions` descends where its neighbours in the same rule correctly compose
  `.c.<name>.actions` (`shared.css` :75) — breaks SP-2.
- The hero's first-section heading is hidden with `display: none`, which removes it from the
  accessibility tree, so the heading outline it exists to preserve is not in fact preserved
  — breaks A11Y-3.
- `_/css/section/via-social-media` has no `.css` extension, so the import in
  `page/contact-us.css` :6 resolves to nothing and those styles have never loaded.

### In this site

- Style families B and D in `shared.css` descend from the section to reach a component
  (`.s.remembering .c.items li`, `.s.proof .c.pull`, `.s.built .c.closer p` — 15 selectors
  in total) where the markup already provides the composed form (`.c.remembering.items`,
  `.c.no-oracle.pull`, `.c.built.closer`). The markup is correct; the CSS is not — breaks
  SP-2.
- The hero heading is hidden with `display: none` in `site.css`, inherited from the
  reference — breaks A11Y-3, and means inner pages do not have the unbroken outline A11Y-1
  requires. FIG-5 states the intended rule.
