---
schema: hq-critical-path/v1
repository: MishkaStrategy/cp
default_branch: main
critical_path_revision: 1
updated_at: 2026-09-04T10:09:35Z
project_state: EXECUTING
critical_path_status: VERIFIED
release_contract_status: EXPLICIT
handoff_status: NOT_READY
basis_ref: main
basis_sha: 05fe5459fc24f0c1044b8b99eea0894e4131e911
---

# HQ Critical Path

## 1. Current Release Contract

Release target:

Create production-ready mobile adaptations for every existing top-level desktop/source page in Figma file `dxbfwhhp5N9sTsKv5ErTPW`.

Release surface:

- Figma design file `dxbfwhhp5N9sTsKv5ErTPW` is the visual/design source of truth and release target.
- GitHub `MishkaStrategy/cp`, directory `figma/`, is the technical control/provenance/handoff surface.

Definition of RELEASED:

All four live source desktop pages have separate 390 px mobile counterparts in the same Figma file; originals are untouched; all source content is preserved; per-screen and global QA have completed with zero unresolved visual, structural, content, overflow, clipping, overlap, spacing, or layer defects; durable GitHub handoff/report evidence is saved.

Mandatory release gates:

- [x] Exact source-page inventory established from live Figma.
- [ ] Four intended mobile counterparts exist at exactly 390 px width.
- [ ] Mobile layout rules are satisfied: 10 px side padding, 60 px major-section spacing, 20 px base content spacing, burger navigation, content-driven height.
- [ ] 100% source content reconciliation passes for every source/mobile pair.
- [ ] At least two complete per-screen QA passes have run for every mobile page and the final pass finds zero new defects.
- [ ] Global cross-screen QA and final zero-defect audit pass.
- [ ] Final source->mobile mapping and audit/handoff evidence are saved under `figma/`.

Required release evidence:

- Live Figma node IDs and screenshots/structural checks for all four mobile counterparts.
- Source -> mobile mapping with exact node IDs.
- Final audit status equivalent to `FINAL AUDIT: PASS`, `DEFECTS FOUND: 0`, `MISSING CONTENT: 0`, `UNADAPTED FRAMES: 0`.
- Final GitHub report under `figma/` and this control state updated to DONE.

Known explicit exclusions:

- Do not create a new Figma file.
- Do not modify/delete/replace/detach/overwrite original desktop pages.
- Do not invent, rewrite, shorten, remove, reorder, or hide source content.
- Do not create duplicate project directories.
- GitHub tag/release/deployment is not part of this design release.

Owner execution policy:

- Codex is explicitly permitted by owner decision on 2026-09-04.
- Codex remains subject to HQ routing and placement gates and is only eligible for legitimate bounded `kind: code` capability gaps.
- Mechanical GitHub control is never routed through Codex.
- Current Figma design execution is non-code and uses the connected Figma execution plane unless a separately proven code capability gap appears.

## 2. Repository Basis

Default branch: `main`

Default branch observed SHA: `05fe5459fc24f0c1044b8b99eea0894e4131e911`

Critical-path basis ref: `main`

Critical-path basis SHA: `05fe5459fc24f0c1044b8b99eea0894e4131e911`

Canonical integration branch, if any: NONE

Canonical PR / RC, if any: NONE

Relevant open PRs: NONE

Relevant Issues: NONE

Relevant CI / workflows: no workflow is a release gate for the Figma design target.

Relevant release/deployment state: release is the validated state of the specified Figma file plus durable GitHub handoff evidence.

## 3. Repository Scan Summary

Project purpose:

Technical workspace and provenance for adapting the specified existing desktop Figma pages to production-ready 390 px mobile pages.

Architecture / major components:

- `figma/README.md` — project/source-of-truth rules.
- `omniroute-tasks/` — worker/control provenance area; not the visual release target.
- Figma file `dxbfwhhp5N9sTsKv5ErTPW`, page `0:1` — actual design target.

Build / packaging: N/A for current design release.

Tests / validation: Figma structural inspection, source/mobile content reconciliation, spacing/overflow/layer audits, screenshots, and repeated full QA passes.

CI: no current CI gate for this Figma-only release.

Release / deployment: validated Figma state; no GitHub deployment required.

Governance:

- Live organizational HQ master: `MishkaStrategy/.github/HQ_MASTER_PROMPT.md`, version 1.2.
- Project-specific repository/Figma source-of-truth rules apply.
- Owner explicitly permits Codex subject to HQ route/placement rules.

External release dependencies:

Connected Figma file write/read access and reliable post-write verification.

Material findings:

Live Figma page `0:1` contains exactly four top-level 1200 px source pages:

1. `главная` — node `1:16`, 1200x4692, 9 direct section frames.
2. `управление` — node `1:3229`, 1200x5573, 10 direct section frames.
3. `партнерам` — node `1:4687`, 1200x5145, 9 direct section frames.
4. `франчайзи` — node `1:5768`, 1200x4722, 10 direct section frames.

The child `MacBook Air ...` frames are page sections, not separate release pages. Therefore hard source control number `N = 4`.

## 4. Release Gates

### GATE-1 — Live source inventory

Status: SATISFIED

Evidence: live Figma Plugin API inventory of page `0:1`; source nodes and dimensions recorded above; desktop baseline screenshots captured for all four pages.

Blocking items: NONE

### GATE-2 — Four production mobile counterparts

Status: UNSATISFIED

Evidence: no verified four-page 390 px mobile set exists yet.

Blocking items: adaptation work for four source pages.

### GATE-3 — Per-screen integrity and zero-defect QA

Status: UNSATISFIED

Evidence: mobile counterparts are not yet complete; required two-pass QA therefore cannot yet pass.

Blocking items: GATE-2 output.

### GATE-4 — Global final QA

Status: UNSATISFIED

Evidence: depends on all four individually passing mobile pages.

Blocking items: GATE-3.

### GATE-5 — Durable release handoff/report

Status: UNSATISFIED

Evidence: final mapping/audit report does not yet exist under `figma/`.

Blocking items: final Figma validation evidence.

## 5. Current Critical Path

### CP-1 — Establish exact live source inventory and desktop baselines

Status: DONE

Release gate: GATE-1

Why critical: establishes hard source count, immutable originals, source node IDs, composition, and visual baseline.

Depends on: Figma access.

Blocks: all adaptation work.

Execution plane: HQ_DIRECT

Exact scope: page `0:1`, top-level source frames only; enumerate direct sections and capture desktop screenshots.

Acceptance condition: exact source count and IDs verified live.

Evidence: `N=4`; nodes `1:16`, `1:3229`, `1:4687`, `1:5768`.

### CP-2 — Adapt `главная` to 390 px and pass per-screen QA

Status: ACTIVE

Release gate: GATE-2, GATE-3

Why critical: first complete source->mobile implementation establishes and validates the mobile adaptation method against the most content-rich mixed-layout page.

Depends on: CP-1.

Blocks: reliable completion of the remaining screens and global QA.

Execution plane: HQ_DIRECT

Exact scope: create `главная / Mobile / 390` as a separate mobile counterpart; preserve all source content; adapt each section; 10/60/20 spacing; burger header; content-driven height; minimum two full QA passes; original `1:16` untouched.

Acceptance condition: mobile page width 390; source/mobile content integrity 100%; no clipping/overlap/overflow/structural defects; final per-screen pass finds zero new defects.

Evidence: pending live Figma node ID and validation.

### CP-3 — Adapt `управление`, `партнерам`, `франчайзи` and pass per-screen QA

Status: PENDING

Release gate: GATE-2, GATE-3

Why critical: release requires coverage of all four source pages.

Depends on: CP-2 validated method; each page itself is otherwise content-independent.

Blocks: global QA.

Execution plane: HQ_DIRECT

Exact scope: one separate 390 px counterpart per remaining source with the same mandatory layout/content/QA contract.

Acceptance condition: all four source/mobile pairs individually PASS.

Evidence: pending.

### CP-4 — Global cross-screen QA and fresh content reconciliation

Status: PENDING

Release gate: GATE-4

Why critical: required release-wide consistency and zero-defect gate.

Depends on: CP-2, CP-3.

Blocks: final release evidence.

Execution plane: HQ_DIRECT

Exact scope: widths; 10/60/20 spacing; headers/burgers; typography; buttons/cards/forms/images/footers; repeated components; fresh desktop->mobile item reconciliation; cleanup only technical trash created during execution; full re-audit after cleanup.

Acceptance condition: complete global pass finds zero new issues and no missing content/unadapted source pages.

Evidence: pending.

### CP-5 — Persist final mapping/audit evidence and verify release

Status: PENDING

Release gate: GATE-5

Why critical: project rules require durable technical handoff and HQ cannot declare DONE without release evidence.

Depends on: CP-4.

Blocks: DONE.

Execution plane: HQ_DIRECT

Exact scope: save concise final source->mobile mapping and audit result under `figma/`; update this file with final live evidence and DONE state; verify no unintended repository changes or duplicate project directory.

Acceptance condition: report saved and live-verified; final Figma evidence proves release contract complete.

Evidence: pending.

## 6. Active Execution Registry

HQ:

- Executor: HQ_DIRECT via connected Figma integration.
- Exact scope: CP-2, source `главная` node `1:16` only until its per-screen PASS.
- Write surface: same Figma file, new mobile counterpart only; original source subtree is read-only.
- Expected evidence: new mobile node ID, dimensions, content reconciliation, screenshots/structural checks, two complete QA passes.

Workers: NONE

Codex: NONE active. Owner permission exists; no current `kind: code` placement evidence exists.

Zero-model control: NONE active.

CI/runtime: NONE relevant.

## 7. Safe Parallel Work

NONE — all useful current slices write to the same Figma file/page and require consistent adaptation conventions plus repeated post-write validation. Concurrent writers would add coordination/conflict risk without enough wall-clock benefit. Worker gate result: `NO_SAFE_NONOVERLAP_SCOPE`.

## 8. Current Blockers

NONE.

## 9. Critical Path Audits

Repository Coverage Audit: PASS

Evidence: current repository identity/default branch/HEAD, `figma/`, `.github`, project control artifacts, open PRs/Issues, and relevant Figma target surfaces were checked. No repository build/deploy subsystem is a hidden gate for this Figma-only release.

Evidence Audit: PASS

Evidence: release constraints come from explicit owner/project instructions; repository basis is pinned to live `main` SHA; source count/dimensions/node IDs and screenshots come from live Figma inspection. No critical claim relies only on stale chat memory.

Release Alignment Audit: PASS

Evidence: every CP node is required either to create one of the mandatory mobile counterparts, prove mandatory zero-defect/content gates, or persist required release evidence. No unrelated repository cleanup/refactor is included.

Dependency & Ordering Audit: PASS

Evidence: source inventory must precede writes; per-screen adaptation must precede per-screen QA; all four per-screen PASS states must precede global reconciliation; final evidence persistence follows validated Figma state. No hidden build/deploy/signing dependency applies.

Execution & Parallelism Audit: PASS

Evidence: each next action has bounded source node, write surface, acceptance, and verification. Parallel Figma writers were rejected because the common file/page plus convention/QA coupling creates avoidable conflict risk.

Adversarial Audit: PASS

Evidence: strongest contrary hypotheses were checked: there are four top-level source pages rather than dozens of section pages; the child `MacBook Air ...` frames are nested sections; no open PR/Issue or CI gate changes the release target; the release is not a GitHub deployment; Codex permission does not make non-code Figma execution a Codex task.

Material findings and resolutions:

- Source count resolved to `N=4` from live hierarchy.
- Release target is the four top-level desktop pages, not each nested section frame.
- Direct Figma execution is the current cheapest reliable safe route.

## 10. Next Action

Exact next action:

Create a separate `главная / Mobile / 390` counterpart from source `1:16`, preserving all content, then adapt its first section/header and proceed section-by-section with immediate validation.

Executor: HQ_DIRECT via Figma.

Expected evidence: new mobile wrapper node ID and first-section write/validation IDs.

Acceptance condition: original `1:16` unchanged; new counterpart exists at width 390 in clear canvas space; first section is structurally/visually valid before continuing.

## 11. Last Material Revision

What changed:

Initial verified HQ critical path established. Owner decision that Codex is permitted was incorporated as durable routing policy. Live Figma source inventory established `N=4`.

Why the critical path changed:

This is the first canonical project control snapshot.

Evidence causing the change:

Live GitHub basis `05fe5459fc24f0c1044b8b99eea0894e4131e911`, live Figma hierarchy/screenshots, explicit owner/project requirements.

## 12. Chat Rotation Checkpoint

Safe to rotate chat: NO

Last completed atomic action: live source inventory and desktop visual baseline for all four Figma source pages.

Active external executions and exact refs: NONE.

Unpersisted material reasoning: current CP-2 execution has not yet produced its first mobile node/write evidence.

Recovery entrypoint: re-read live master and this file; validate `main`; live-check source nodes and whether `главная / Mobile / 390` exists; if absent, create it; if present, inspect its exact state before continuing.

Exact next action after recovery: resume CP-2 from the first not-yet-verified mobile section without duplicating an existing mobile counterpart.

Rotation blockers, if any: WAVE is open for CP-2 and no completed atomic mobile write checkpoint exists yet.
