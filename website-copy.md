# Website copy — working file

Pages are separated by H1 headings (one per page). Voice: confident but not breathless, technical when the technical word is earned, plain English the rest of the time. British spelling. Most paragraphs lead with a topic sentence; occasional standalone lines for emphasis.

---

# Homepage

## Knowing, not guessing — by design.

Figoya is the knowledge-first platform for the professions where *"roughly right"* isn't good enough.

**Current AI is brilliant at creating text, but unreliable at knowing facts.** It fabricates details, hides contradictions in fluent prose, and gives different answers to the same question on different days. For most of us most of the time, that's tolerable. For law, medicine, construction, mining, defence and other industries where lives and money depend on precision, it isn't.

**We built Figoya for that work.** Instead of asking a language model to construct meaning from text every time you query it, we structure the meaning once — every claim linked to its source, similar claims clustered, contradictions surfaced. When you ask a question, you get a deterministic slice of structured knowledge, rendered into prose. The substance of the answer is stable. Every claim is traceable. Contradictions are visible rather than smoothed away.

**It works because we changed the architecture, not because we added patches.** Current AI's characteristic failures — fabrication, weak lineage, smoothed contradictions, drifting retrieval — aren't bugs that better language models will eventually fix. They're properties of the underlying material. Figoya replaces that material.

---

**Want to know more?**

- [The Problem](/problem) — why current AI fails industries that need precision
- [Our Solution](/solution) — what Figoya is, in more depth
- [Vision](/vision) — where this goes
- [Our Architecture](/architecture) — how it works under the hood
- [Our Philosophy](/philosophy) — why we made the choices we did

---

# The Problem

## Current AI fails the work where being right matters most.

There are two knowledge sources behind every AI answer. The model remembers things from its training. Retrieval pulls things from documents at query time. Both are useful. Both have characteristic failure modes that disqualify them from work where lives and money depend on getting the answer right.

### When the model is remembering

**The model fabricates plausible specifics when evidence is missing.** Names, numbers, citations, steps — confidently produced, because the model was optimised for plausible language rather than verified truth. The fabrications sound exactly like the correct parts of the answer, because they're produced by the same machinery.

**Confidence is uniform regardless of underlying certainty.** Well-established fact and forum-poster conjecture come out of the model sounding equally settled. The reader has no signal to distinguish "I'm confident" from "I'm confabulating."

**Sources can't be traced.** What the model knows from training has no per-claim provenance — only weights. For work where defending an answer to a regulator or a court is part of the job, that is a dealbreaker.

**The knowledge is frozen at the training cutoff.** Updates require retraining; partial corrections aren't possible. The model that was right last quarter may be quietly wrong this quarter, with no signal flagging the change.

### When retrieval is doing the work

**RAG (retrieval-augmented generation) inserts a few snippets from your documents into the prompt and asks the model to construct meaning around them.** It's a sensible workaround, but the chain is structurally brittle at every step.

**Retrieval can miss the right sources or return similar-but-wrong fragments.** Text similarity is not the same as relevance, and snippet boundaries cut through meaningful content. The most relevant clause may sit in a paragraph the chunker split.

**Sources are cited but rarely verifiable claim-by-claim.** The model cites passages without guaranteeing that the cited passage actually supports the specific claim it appears next to. Studies in legal and medical contexts have found significant rates of misattribution and outright fabrication of citations.

**Contradictions across documents get smoothed into one fluent answer.** When two policies disagree, when a 2024 paper contradicts a 2019 paper, the model averages them into a single confident paragraph rather than flagging the disagreement.

**The same question yields a different answer on a different day.** Search-ranking jitter, slight prompt variation, and per-query meaning reconstruction all introduce variability. Audit-grade work cannot tolerate this.

### These aren't bugs

The industry response to these failures has been more language models, better retrieval, longer context, multi-step agents. None of it changes the substrate underneath. **The failure modes are properties of the underlying material — unstructured text being asked to carry meaning it doesn't natively encode.** Bolt-on rigour (quote-grounding, claim-checking, provenance graphs) helps; it doesn't resolve.

### Why this matters

In law, medicine, construction, mining, defence, aviation, nuclear safety, pharma manufacturing, and other industries where lives and money depend on precision, *"roughly right"* is professionally and legally unacceptable. Confident-but-wrong is worse than visibly uncertain. An answer you can't trace is worse than no answer at all. **The gap between what current AI delivers and what these professions need is not a quality gap — it is a substrate gap.**

That's the gap Figoya was built to fix. [See how →](/solution)

---

# Our Solution

## We structure meaning first. Then we let language models do what they're good at.

Current AI retrieves fragments of text and asks a language model to construct meaning every time you query it. **Figoya inverts this.** We do the meaning-work once, at ingestion, and store the result. When you ask a question, we retrieve a precise slice of that structured knowledge and hand it to a language model whose only remaining job is to put the meaning into readable prose.

### Build the graph

**Figoya Docs is the lightweight way in.** Upload a document — a brief, a contract, a research summary, a memo, a specification — and Figoya returns a structured version. Claims are made explicit, each anchored to the paragraph it came from. Equivalent claims are clustered. Contradictions and gaps are surfaced. Ambiguity is flagged rather than hidden.

The user gets two artefacts: a structured rendering they can read and review (more useful than the original, because the meaning has been made explicit), and a machine-readable version optimised for downstream AI consumption (your own language model produces noticeably better answers when fed the structured version than the raw text). Behaviour change required of the user: none. Upload in, structured document out.

**Figoya Ingest scales that capability to an organisation.** Documents, emails, chats, connected systems — an organisation's full corpus structured into a single permission-aware claim graph. The graph is the asset. Every new document strengthens it. Permissions are enforced architecturally, not bolted on as tags.

### Use the graph

Sitting on top of the graph are four horizontal capabilities, available to every user and every vertical:

**Figoya Create** is claim-level collaborative authoring. Multiple authors contribute claims, each with their own lineage. Structural disagreement is surfaced as graph edges, not buried in track-changes. Git for code, Figma for design, Figoya for knowledge.

**Figoya People** makes identity, trust and expertise first-class citizens of the graph. Who contributed what, what they're credentialed for, who relies on whose claims — all queryable, all structural.

**Figoya Market** is discovery, distribution, licensing and monetisation of structured knowledge. Knowledge becomes an asset that can be found, valued and exchanged.

**Figoya Chat** is team conversation with the graph underneath. Conversations feed the graph; the graph feeds the conversations. Like Slack, except your organisation actually learns.

### What falls out of the design

Because the meaning is structured once and then read off, three things naturally result.

**Determinism.** The same question yields the same meaning, every time. The wording the language model produces may vary; the substance underneath does not.

**Lineage.** Every claim in every answer is traceable back to its source. You can prove what an answer rests on, claim-by-claim. Audit-grade by construction.

**Ceiling.** Better language models make Figoya better at explaining. They don't change whether the answer is right — that is the architecture's job. Figoya rides every language-model advance *and* owns the substrate underneath. The ceiling rises in both directions.

Knowing, not guessing — by design.

---

# Vision

## A platform that expands in a pattern, into a category that is only growing.

Figoya is a substrate, not a tool. The path from where we are now to where we are going follows a pattern that is already visible across the industries we are building for.

### The expansion pattern: regulators independently demanding the same thing

Across physical-asset industries, regulators keep arriving at the same demand: structured, audit-ready information about decisions over time, with full lineage, defensible to verifiers. **Different industries, different vocabularies, same structural problem.** Post-Grenfell, UK construction has the Building Safety Act's golden-thread mandate — lineage-preserved digital records of design and construction decisions throughout a building's lifetime. Post-Brumadinho, mining has the Global Industry Standard on Tailings Management. Nuclear has the safety-case framework. Aviation has airworthiness. Rail, marine, pharma GMP, defence platform certification — different names, same shape.

We have identified 27 candidate verticals where this pattern applies. **The pattern is accelerating, not slowing.** Asset complexity, regulatory expectation and accountability culture are all increasing.

### How we get there

**Year 1–3 — Figoya Software Projects is our executable lead vertical.** Engineering buyers are technically literate, the architectural argument lands directly, and we use our own substrate to build the substrate — the product is its own demonstration. Short sales cycle, accessible buyers.

**Year 3 onward — Figoya Construction Co is our first regulated-industry vertical proper.** The UK Building Safety Act golden-thread mandate is the closest regulatory match for our architecture anywhere — a government requirement that buildings maintain lineage-preserved digital records throughout their lifetime, queryable by the regulator and duty-holders. The mandate maps one-to-one onto what Figoya delivers. Pilot in years 3–4, vertical revenue from year 5.

**Mining is the natural third commitment**, carried by a triple regulatory tailwind: GISTM (post-Brumadinho), JORC and equivalent reserve-reporting standards, and ESG / critical-mineral pressure.

### Vertical companies as independent businesses

Each vertical is delivered as an independent VerticalCo on top of the Figoya API — Domain Pack plus domain-specific UI plus domain expertise. **The API is a level playing field.** Figoya may co-invest in some VerticalCos; unaffiliated VerticalCos compete on equal terms with any we back. We sell the substrate; we don't gatekeep who builds on it.

### The long arc: a knowledge-first alternative to the parametric layer

In the long term, Figoya Ingest extends from organisational corpora to public records — web crawls, government and corporate disclosures, academic papers, news. **The same source material that trained the language models, ingested differently, producing a structured claim graph with lineage instead of trained weights without it.** At that scale, Figoya is no longer merely a complement to LLMs — it is a structured alternative to the parametric knowledge layer underneath them. That's the long arc, and we are honest that it is a long arc. We are focused on the near-term wedge.

### Platform, not product

The claim graph is the asset. More documents make it more valuable, not less. Privacy is structural — we don't train on user data, we can run on customer infrastructure. Over time, we replace third-party language models with Figoya-native specialist models purpose-built for the substrate. Competitors can't replicate this without rebuilding the substrate from scratch.

That is the kind of moat that compounds.

---

# Our Architecture

## One architectural commitment: claims as the atomic unit.

Figoya's architecture has one central choice from which everything else follows: the atomic unit is not a token, not a chunk of text, not an entity — it is a *claim*. A statement, question, instruction, decision, constraint, correction, hypothesis or reflection, made explicit, with structure around it. Everything else in the substrate is consequence.

### The claim graph

**Each claim is a node.** Claims carry their content, type, source-document lineage (so the original paragraph can be reconstructed), and the actor who made or recorded them. Confidence is first-class: every claim carries an epistemic-confidence score.

**Equivalent claims across documents merge into clusters.** When the same proposition appears in multiple sources, it becomes one canonical node with multi-source lineage. The graph gets denser, not noisier, as the corpus grows.

**Epistemic edges between claims express how claims relate.** The edge types are grounded in epistemology and argumentation theory: *supports*, *contradicts*, *clarifies*, *depends-on*, *answers*, *supersedes*. Reasoning structure is data, not narrative.

**Slices are how queries are answered.** A slice is a question-scoped subset of the graph — the claims and edges relevant to a specific question, with lineage and confidence preserved. When you ask Figoya something, what you get back is a slice rendered into prose: not a search result, not a generated answer, but a structured object whose substance you can inspect.

### The three pipelines

**PGP — PIC Generation Pipeline.** Documents enter, claims come out. Stage 1 normalises any input format (PDFs, spreadsheets, emails, chat logs, web pages) into a canonical structured form. Stage 2 semantically interprets that structure across multiple passes, preserving ambiguity rather than averaging it away. Stage 3 deterministically synthesises the result into the canonical claim format. The pipeline uses language models for interpretation but encloses them in structure that prevents drift: the same source produces the same (or extremely close) graph contribution.

**PRP — Prompt-to-Response Pipeline.** Query enters, answer comes out. The user's prompt is translated into a structured intent. The graph is queried for the relevant slice. The slice is handed to a language model whose sole job is to render the structured meaning into prose. The output is then validated back against the graph: every claim in the rendered answer must map to a graph node with lineage. Claims that don't map are rejected.

**GGP — Graph Generation Pipeline.** The graph is not static. When claims change, GGP propagates the change through cluster membership, edge updates, supersession marking and lineage tracking — surgical updates rather than re-indexing.

### Where this lands, concretely

Of the 16 most common AI failure modes that make current AI unusable for regulated work — fabrication, no lineage, weak lineage, smoothed contradictions, drifting retrieval, inconsistent answers across runs, unstated uncertainty, retrieval miss, and others — **Figoya structurally resolves 8 and substantially mitigates 6 more**, leaving only 2 partial cases. The substrate is doing the work, not patches. (Full coverage analysis available on request.)

### Privacy and locality

The architecture works by structuring meaning, not by learning from it. Figoya does not need to train on user data. The system can run on customer infrastructure — on-premise, air-gapped, or in a regulated jurisdiction. **Privacy is credible by design, not by contract.**

### One substrate, many surfaces

The graph is the asset. Surfaces above it (Figoya Docs, Ingest, Create, People, Market, Chat) read from and write to the same graph. Domain Packs configure the graph for a specific vertical without rebuilding anything. VerticalCos build their own products on top of the Figoya API.

The architecture is general enough that we use it to build itself — the Figoya project's own thinking lives as a claim graph; our working method is slice retrieval. **The substrate is its own first customer.**

---

# Our Philosophy

## Most AI was designed to create. We designed Figoya to know.

The current generation of AI is excellent at *creating* — producing plausible drafts, suggestions, summaries, conversational responses. That is what generative architectures are for, and it is a real capability with real value. But generation is not knowing. The two are different verbs, and current AI conflates them in a way that breaks down at exactly the work where the distinction matters most.

### Creating versus knowing

**To know something, you need to be able to point at where the claim came from, distinguish settled from contested, surface contradictions, and stay coherent over time.** Current AI doesn't have a native representation for any of these. It has weights and prose. Lineage is a story bolted on at the end. Uncertainty is a hedge in language. Contradictions get smoothed by the same generation machinery that produced the answer.

Where the verb is *create*, use a generative model. Figoya does — internally we use language models for translation, rendering, and the last-mile prose. Where the verb is *know*, use a substrate built for knowing. That's the choice. Both tools exist; the question is which one you should be using for the work in front of you.

### Claims, not facts

We chose *claims* as the atomic unit, deliberately. **A claim is something someone asserts, with lineage, in a context.** It is not a fact (which asserts truth), not an entity (which asserts existence), not a token (which is just a fragment of text). The shift to claims lets us preserve attribution, accept disagreement, encode confidence and resist false certainty — all of which are required to do serious knowledge work.

This is why we don't call Figoya a "fact graph" or a "knowledge graph" in the classical justified-true-belief sense. Figoya structures **claims and their relationships**. Whether any given claim is *true* is not the substrate's call to make — it is the consumer's, the regulator's, the court's, the auditor's, the expert's. The substrate's job is to give them a defensible structure to assess from.

### Separating knowledge from language

Modern AI conflates two things that don't naturally belong together: where knowledge is stored, and what language is generated from it. **Figoya separates them.** The claim graph holds the knowledge — durable, structured, addressable. Language models do their proper job: turning structured meaning into readable prose.

Separating these two layers means that as language models improve, they get better at *expressing* — not better at *knowing*. The architecture's commitment to knowing is what makes the answers right; the language model is what makes the answers readable. Each can improve independently. **Better language models make Figoya better at explaining. They don't change whether the answer is right. That is the architecture's job.**

### What we mean by "meaning"

When we say Figoya retrieves *meaning* rather than text, we mean something specific: **a set of claims and their relationships that we use to answer a question.** Operationally, that is a slice of the claim graph. We are not entering the broader philosophical debate about meaning — we declare what meaning is in this product context and point at its structural correlate. The slice that Figoya retrieves *is* a meaning under this definition. They are the same object.

### Validation by use

The Figoya project itself is built using Figoya. Our architectural thinking lives as a claim graph; our working method is slice retrieval against it. Multi-actor contributions (human and AI) carry full lineage; disagreements surface as edges rather than collapsing into a single voice. The architecture is general enough to build itself, and concrete enough that we depend on it daily.

That is the kind of validation a deck cannot deliver.
