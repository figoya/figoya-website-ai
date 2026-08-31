# Website copy — working file (v2, 2026-08-31)

Pages are separated by H1 headings (one per page). Voice: confident but not breathless, technical when the technical word is earned, plain English the rest of the time. British spelling. Most paragraphs lead with a topic sentence; occasional standalone lines for emphasis.

Brand system (agreed 2026-08-31): the logo lockup is **Figoya — Organisational Intelligence** (the category slot); the claim line is **"Answers you can stand behind."** (the hero slot). Vocabulary rule: Figoya never claims to *know*, *understand* or hold *truth* — permitted verbs are hold, show, trace, check, stand behind, still holds. "Organisational" takes the British s everywhere, deliberately. First mention on each page is "organisational intelligence (OI)"; "OI" thereafter.

---

# Homepage

## Answers you can stand behind.

Figoya is the organisational-intelligence platform for the work where *"roughly right"* isn't good enough.

**Organisational intelligence (OI) is an organisation's ability to see what it holds, trace where every claim came from, and tell whether it still stands.** Business intelligence shows you what happened. OI shows you what still holds — and what stopped holding when something changed. It is a category that management theory has wanted for sixty years. The mechanism now exists.

**Current AI is brilliant at creating text, but careless with facts.** It fabricates details, hides contradictions in fluent prose, and gives different answers to the same question on different days. For most of us most of the time, that's tolerable. For law, medicine, construction, mining, defence and other industries where lives and money depend on precision, it isn't.

**We built Figoya for that work.** Instead of asking a language model to construct meaning from text every time you query it, we structure the meaning once — every claim explicit, anchored to its source, linked to the claims it supports, contradicts or depends on. When you ask a question, you get a deterministic slice of that structure, rendered into prose. The substance of the answer is stable. Every claim is traceable. Contradictions are visible rather than smoothed away.

**It works because we changed the architecture, not because we added patches.** Current AI's characteristic failures — fabrication, weak lineage, smoothed contradictions, drifting retrieval — aren't bugs that better language models will eventually fix. They're properties of the underlying material. Figoya replaces that material.

This is not a thesis. The pipeline runs, the graph is live, and we measure it head-to-head against RAG — publishing comparisons only when they clear the reporting standard we'd demand from anyone else.

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

**The model fabricates plausible specifics when evidence is missing.** Names, numbers, citations, steps — confidently produced, because the model was optimised for plausible language rather than verified accuracy. The fabrications sound exactly like the correct parts of the answer, because they're produced by the same machinery.

**Confidence is uniform regardless of underlying certainty.** Well-established fact and forum-poster conjecture come out of the model sounding equally settled. The reader has no signal to distinguish "I'm confident" from "I'm confabulating."

**Sources can't be traced.** What the model carries from training has no per-claim provenance — only weights. For work where defending an answer to a regulator or a court is part of the job, that is a dealbreaker.

**The training data is frozen at the cutoff.** Updates require retraining; partial corrections aren't possible. The model that was right last quarter may be quietly wrong this quarter, with no signal flagging the change.

### When retrieval is doing the work

**RAG (retrieval-augmented generation) inserts a few snippets from your documents into the prompt and asks the model to construct meaning around them.** It's a sensible workaround, but the chain is structurally brittle at every step.

**Retrieval can miss the right sources or return similar-but-wrong fragments.** Text similarity is not the same as relevance, and snippet boundaries cut through meaningful content. The most relevant clause may sit in a paragraph the chunker split.

**Sources are cited but rarely verifiable claim-by-claim.** The model cites passages without guaranteeing that the cited passage actually supports the specific claim it appears next to. Studies in legal and medical contexts have found significant rates of misattribution and outright fabrication of citations.

**Contradictions across documents get smoothed into one fluent answer.** When two policies disagree, when a 2024 paper contradicts a 2019 paper, the model averages them into a single confident paragraph rather than flagging the disagreement.

**The same question yields a different answer on a different day.** Search-ranking jitter, slight prompt variation, and per-query meaning reconstruction all introduce variability. Audit-grade work cannot tolerate this.

### Even perfect recall wouldn't be enough

Suppose retrieval worked flawlessly. A deeper failure would remain, and no amount of search fixes it: **organisations are dense webs of interdependent claims, and changes propagate silently.** A property of an entity changes in project A, and a claim in project B — one that quietly rested on it — stops holding. Every higher claim stacked on top, about quality, compliance or safety, becomes less defendable. Nobody notices, because the dependency lived in prose and in people's heads, and because it crossed a boundary between teams, systems or suppliers that no tool and no owner covers.

Software engineers will recognise what's missing. **Code has a compiler: change a function's signature and the build breaks, loudly, at the point of change. Organisational knowledge has no compiler.** Claims rot silently, and the cost surfaces months later disguised as an incident, an audit finding, or a lawsuit — which is why the root cause almost never gets named. Requirements traceability, safety cases and data lineage each patch a corner of this, manually, inside one silo. The cross-project edge — the one that fails — belongs to nobody.

### These aren't bugs

The industry response to these failures has been more language models, better retrieval, longer context, multi-step agents. None of it changes the substrate underneath. **The failure modes are properties of the underlying material — unstructured text being asked to carry meaning it doesn't natively encode.** Bolt-on rigour (quote-grounding, claim-checking, provenance graphs) helps; it doesn't resolve.

### Why this matters

In law, medicine, construction, mining, defence, aviation, nuclear safety, pharma manufacturing, and other industries where lives and money depend on precision, *"roughly right"* is professionally and legally unacceptable. Confident-but-wrong is worse than visibly uncertain. An answer you can't trace is worse than no answer at all. **The gap between what current AI delivers and what these professions need is not a quality gap — it is a substrate gap.**

That's the gap Figoya was built to fix. [See how →](/solution)

---

# Our Solution

## We structure meaning first. Then we let language models do what they're good at.

Current AI retrieves fragments of text and asks a language model to construct meaning every time you query it. **Figoya removes that step.** We do the meaning-work once, at ingestion, and store the result. When you ask a question, we retrieve a precise slice of that structured knowledge and hand it to a language model whose only remaining job is to put the meaning into readable prose. Retrieve meaning, not text. Everything else follows.

### Build the graph

**Figoya Docs is the lightweight way in.** Upload a document — a brief, a contract, a research summary, a memo, a specification — and Figoya returns a structured version. Claims are made explicit, each anchored to the paragraph it came from. Equivalent claims are linked. Contradictions and gaps are surfaced. Ambiguity is flagged rather than hidden.

The user gets two artefacts: a structured rendering they can read and review (more useful than the original, because the meaning has been made explicit), and a machine-readable version optimised for downstream AI consumption (your own language model produces noticeably better answers when fed the structured version than the raw text). Behaviour change required of the user: none. Upload in, structured document out.

**Figoya Ingest scales that capability to an organisation.** Documents, emails, chats, connected systems — an organisation's full corpus structured into a single permission-aware claim graph. The graph is the asset. Every new document strengthens it. Permissions are enforced architecturally, not bolted on as tags.

### Use the graph

Sitting on top of the graph are four horizontal capabilities, available to every user and every vertical:

**Figoya Create** is claim-level collaborative authoring. Multiple authors contribute claims, each with their own lineage. Structural disagreement is surfaced as graph edges, not buried in track-changes. Git for code, Figma for design, Figoya for knowledge.

**Figoya People** makes identity, trust and expertise first-class citizens of the graph. Who contributed what, what they're credentialed for, who relies on whose claims — all queryable, all structural.

**Figoya Market** is discovery, distribution, licensing and monetisation of structured knowledge. Knowledge becomes an asset that can be found, valued and exchanged.

**Figoya Chat** is team conversation with the graph underneath. Conversations feed the graph; the graph feeds the conversations. Like Slack, except the record holds together.

### What falls out of the design

Because the meaning is structured once and then read off, three things naturally result.

**Determinism.** The same question yields the same meaning, every time. The wording the language model produces may vary; the substance underneath does not.

**Lineage.** Every claim in every answer is traceable back to its source. You can prove what an answer rests on, claim-by-claim. Audit-grade by construction.

**Ceiling.** Better language models make Figoya better at explaining. They don't change what the answer rests on — that is the architecture's job. Figoya rides every language-model advance *and* owns the substrate underneath. The ceiling rises in both directions.

### Built, not merely designed

**The pipeline runs end to end today** — documents in, claim graph on a live graph database, structured answers out, with the query plan compiled deterministically rather than improvised by a model. **And it is measured, not asserted.** We benchmark the substrate head-to-head against RAG on the same corpora and the same questions, scored by judges from a different model family than the one that did the work, and we publish comparisons only with confidence intervals attached — the standard we'd want applied to anyone else's claims. Headline numbers appear here as they clear that bar.

The strongest evidence is the working method: **Figoya is built using Figoya.** The project's own architecture, strategy and decisions live as a claim graph — five-hundred-odd claims across four linked corpora — and the daily working method, for humans and AI collaborators alike, is slice retrieval against it.

Answers you can stand behind.

---

# Vision

## One graph, three directions of read — into a category that is only growing.

Figoya is a substrate, not a tool. What an organisation does with a claim graph falls into three directions, and each is a market.

**Backward — defend.** Trace any claim to its sources. See what contradicts your latest filing before the regulator does. Preview the blast radius of a change — which claims downstream rest on this property — and get flagged when an ingested change quietly withdraws support from claims you've published. Assurance as a continuous property of the corpus rather than an annual ritual, summarised in health measures a board can read: open contradictions, claims pending re-verification, lineage coverage.

**Sideways — compound.** Claims that link instead of rotting in documents. Synthesis across verified structure, insight reused across projects, an organisation whose corpus gets denser and more valuable with every document rather than merely bigger.

**Forward — decide.** A business case is a structure of claims. Hold it as one: check what each premise rests on before capital commits, and have the *decision* flagged when a premise is later superseded. Strategy review becomes event-driven rather than annual.

Defend the business. Compound the knowledge. Direct the capital. The same substrate serves all three.

### The expansion pattern: regulators independently demanding the same thing

Across physical-asset industries, regulators keep arriving at the same demand: structured, audit-ready information about decisions over time, with full lineage, defensible to verifiers. **Different industries, different vocabularies, same structural problem.** Post-Grenfell, UK construction has the Building Safety Act's golden-thread mandate — lineage-preserved digital records of design and construction decisions throughout a building's lifetime. Post-Brumadinho, mining has the Global Industry Standard on Tailings Management. Nuclear has the safety-case framework. Aviation has airworthiness. Rail, marine, pharma GMP, defence platform certification — different names, same shape. Financial services now has its own instance in operational-resilience rules that require firms to map and evidence the dependencies of their important services. And the accounting profession has wanted *continuous audit* for decades — never realised, because the evidence was never structured.

We have identified 27 candidate verticals where this pattern applies. **The pattern is accelerating, not slowing.** Asset complexity, regulatory expectation and accountability culture are all increasing.

### How we get there

**Year 1–3 — Figoya Software Projects is our executable lead vertical.** Engineering buyers are technically literate, the architectural argument lands directly, and we use our own substrate to build the substrate — the product is its own demonstration. Short sales cycle, accessible buyers.

**Year 3 onward — Figoya Construction Co is our first regulated-industry vertical proper.** The UK Building Safety Act golden-thread mandate is the closest regulatory match for our architecture anywhere — a government requirement that buildings maintain lineage-preserved digital records throughout their lifetime, queryable by the regulator and duty-holders. The mandate maps one-to-one onto what Figoya delivers. Pilot in years 3–4, vertical revenue from year 5.

**Mining is the natural third commitment**, carried by a triple regulatory tailwind: GISTM (post-Brumadinho), JORC and equivalent reserve-reporting standards, and ESG / critical-mineral pressure.

### Vertical companies as independent businesses

Each vertical is delivered as an independent VerticalCo on top of the Figoya API — Domain Pack plus domain-specific UI plus domain expertise. **The API is a level playing field.** Figoya may co-invest in some VerticalCos; unaffiliated VerticalCos compete on equal terms with any we back. We sell the substrate; we don't gatekeep who builds on it.

### The long arc: a structured alternative to the parametric layer

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

**Equivalent claims are linked, and every voice is kept.** When the same proposition appears in multiple sources, the claims are joined by an equivalence relation — one proposition, many assertions, each with its own lineage and actor. What reads as a single canonical answer is a view computed over that equivalence at query time, so the graph gets denser, not noisier, as the corpus grows, and no source's voice is ever merged away.

**Epistemic edges between claims express how claims relate.** The edge types are grounded in epistemology and argumentation theory: *supports*, *contradicts*, *clarifies*, *depends-on*, *answers*, *supersedes*, alongside equivalence. Reasoning structure is data, not narrative — which is what makes questions like "what contradicts this?" and "what rests on this?" queries rather than research projects.

**Slices are how queries are answered.** A slice is a question-scoped subset of the graph — the claims and edges relevant to a specific question, with lineage and confidence preserved. When you ask Figoya something, what you get back is a slice rendered into prose: not a search result, not a generated answer, but a structured object whose substance you can inspect.

### The three pipelines

**PGP — PIC Generation Pipeline.** Documents enter, claims come out. Stage 1 normalises any input format (PDFs, spreadsheets, emails, chat logs, web pages) into a canonical structured form. Stage 2 semantically interprets that structure across multiple passes, preserving ambiguity rather than averaging it away. Stage 3 deterministically synthesises the result into the canonical claim format. The pipeline uses language models for interpretation but encloses them in structure that prevents drift: the same source produces the same (or extremely close) graph contribution.

**PRP — Prompt-to-Response Pipeline.** Query enters, answer comes out. The user's prompt is translated into a structured representation of intent; from it, a query plan is *compiled* — deterministically, not improvised by a model — and executed against the graph for the relevant slice. The slice is handed to a language model whose sole job is to render the structured meaning into prose. The output is then validated back against the graph: every claim in the rendered answer must map to a graph node with lineage. Claims that don't map are rejected.

**GGP — Graph Generation Pipeline.** The graph is not static. When claims change, GGP propagates the change through equivalence, edge updates, supersession marking and lineage tracking — surgical updates rather than re-indexing. This is what makes change a first-class event: the graph can show what a change touches before you make it, and what stopped holding after it.

### Where this lands, concretely

Of the 16 most common AI failure modes that make current AI unusable for regulated work — fabrication, no lineage, weak lineage, smoothed contradictions, drifting retrieval, inconsistent answers across runs, unstated uncertainty, retrieval miss, and others — **Figoya structurally resolves 8 and substantially mitigates 6 more**, leaving only 2 partial cases. The substrate is doing the work, not patches. (Full coverage analysis available on request.)

### Privacy and locality

The architecture works by structuring meaning, not by learning from it. Figoya does not need to train on user data. The system can run on customer infrastructure — on-premise, air-gapped, or in a regulated jurisdiction. **Privacy is credible by design, not by contract.**

### One substrate, many surfaces

The graph is the asset. Surfaces above it (Figoya Docs, Ingest, Create, People, Market, Chat) read from and write to the same graph. Domain Packs configure the graph for a specific vertical without rebuilding anything. VerticalCos build their own products on top of the Figoya API.

The architecture is general enough that we use it to build itself — the Figoya project's own thinking lives as a claim graph of five-hundred-odd claims across four linked corpora; our working method is slice retrieval. **The substrate is its own first customer.**

---

# Our Philosophy

## Most AI was built to create. We built Figoya to be answerable.

The current generation of AI is excellent at *creating* — producing plausible drafts, suggestions, summaries, conversational responses. That is what generative architectures are for, and it is a real capability with real value. But creation is not accountability. An answer you will act on in serious work has to carry its own basis — and current AI conflates the two in a way that breaks down at exactly the work where the distinction matters most.

### Creating versus standing behind

**To stand behind an answer, you need to point at where each claim came from, distinguish settled from contested, surface the contradictions, and stay coherent over time.** Current AI has no native representation for any of these. It has weights and prose. Lineage is a story bolted on at the end. Uncertainty is a hedge in language. Contradictions get smoothed by the same generation machinery that produced the answer.

Where the verb is *create*, use a generative model. Figoya does — internally we use language models for translation, rendering, and the last-mile prose. Where the answer must be *stood behind*, use a substrate built for warrant. That's the choice. Both tools exist; the question is which one you should be using for the work in front of you.

### No oracle

Most AI presents itself as something close to an oracle: ask, receive, believe. The confidence is uniform, the sources are unrecoverable, and the posture asks for faith. Voltaire gave the type a name three centuries ago — Pangloss, the tutor with a fluent answer for everything and a system no evidence could dent. Serious work does not need a Panglossian colleague.

**Figoya makes a smaller claim, and earns more with it.** It does not claim to know. It shows what is held, who asserted it, what it rests on, what contradicts it, and whether it still stands — and then it leaves the judgement where it belongs, with the professional. Nothing arrives on faith; everything arrives with its checkable basis. The user is not downstream of the machine's authority. The machine is an instrument of the user's.

### Claims, not facts

We chose *claims* as the atomic unit, deliberately. **A claim is something someone asserts, with lineage, in a context.** It is not a fact (which asserts truth), not an entity (which asserts existence), not a token (which is just a fragment of text). The shift to claims lets us preserve attribution, accept disagreement, encode confidence and resist false certainty — all of which are required to do serious knowledge work.

This is why we don't call Figoya a "fact graph" or a "knowledge graph" in the classical justified-true-belief sense. Figoya structures **claims and their relationships**. Whether any given claim is *true* is not the substrate's call to make — it is the consumer's, the regulator's, the court's, the auditor's, the expert's. The substrate's job is to give them a defensible structure to assess from. When a change withdraws support from a claim, Figoya marks it *unsupported pending review* — never *false*. Loss of support is computable; truth requires the world.

### Separating what is held from how it is said

Modern AI conflates two things that don't naturally belong together: where the substance is held, and what language is generated from it. **Figoya separates them.** The claim graph holds the substance — durable, structured, addressable, warranted. Language models do their proper job: turning structured meaning into readable prose.

Separating these two layers means that as language models improve, they get better at *expressing*. What the answer rests on doesn't move — that is the architecture's job. Each layer improves independently, and neither can corrupt the other.

### What we mean by "meaning"

When we say Figoya retrieves *meaning* rather than text, we mean something specific: **a set of claims and their relationships that we use to answer a question.** Operationally, that is a slice of the claim graph. We are not entering the broader philosophical debate about meaning — we declare what meaning is in this product context and point at its structural correlate. The slice that Figoya retrieves *is* a meaning under this definition. They are the same object.

### Validation by use

The Figoya project itself is built using Figoya. Our architectural thinking lives as a claim graph; our working method is slice retrieval against it. Multi-actor contributions (human and AI) carry full lineage; disagreements surface as edges rather than collapsing into a single voice. The pipeline that will do this for customers already does it for us, daily, and is measured against the alternative rather than merely preferred to it.

That is the kind of validation a deck cannot deliver.
