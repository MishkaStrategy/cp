---
schema: hq-critical-path/v1
repository: MishkaStrategy/cp
default_branch: main
critical_path_revision: 2
updated_at: 2026-09-05T09:27:00Z
project_state: EXECUTING
critical_path_status: VERIFIED
release_contract_status: EXPLICIT
handoff_status: NOT_READY
basis_ref: main
basis_sha: 674a11dab9baf31df9ce0721bd79f5a3bcb9f87c
---

# HQ Critical Path

## 1. Current Release Contract

Release target:

Create production-ready mobile adaptations for every existing top-level desktop/source page in Figma file `dxbfwhhp5N9sTsKv5ErTPW`.

Release surface:

- Figma design file `dxbfwhhp5N9sTsKv5ErTPW` is the visual/design source of truth and release target.
- GitHub `MishkaStrategy/cp`, directory `figma/`, is the technical control/provenance/handoff surface.
- `MishkaStrategy/ai-control` is the organizational execution-control repository for Worker.ai/Codex runtime execution only; it is not a second project repository.

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
- Worker.ai/Codex terminal result and HQ post-run live verification.
- Final GitHub report under `figma/` and this control state updated to DONE.

Known explicit exclusions:

- Do not create a new Figma file.
- Do not modify/delete/replace/detach/overwrite original desktop pages.
- Do not invent, rewrite, shorten, remove, reorder, or hide source content.
- Do not create duplicate project directories.
- GitHub tag/release/deployment is not part of this design release.
- Codex does not own `HQ_CRITICAL_PATH.md` and must not declare project DONE.

Owner execution policy:

- Owner explicitly requires the Figma implementation work to run through the Worker.ai/Codex execution plane.
- HQ remains decision/control/verification plane and does not perform implementation writes directly in Figma while this owner decision is active.
- Mechanical GitHub control remains HQ/zero-model work and is never delegated to Codex.
- The Worker.ai task is an exact `kind: code` runtime-execution packet because the worker must execute the configured Figma MCP/Plugin-API JavaScript runtime against one exact Figma file; no project-repository code patch is required.
- Placement evidence: the otherwise-capable direct HQ Figma connector is unavailable as an implementation route under the active owner governance decision; no separate project runner with the required configured Figma runtime is available. Required Codex-only capability for this execution is `runtime_execution`.

## 2. Repository Basis

Default branch: `main`

Default branch observed SHA: `674a11dab9baf31df9ce0721bd79f5a3bcb9f87c`

Critical-path basis ref: `main`

Critical-path basis SHA: `674a11dab9baf31df9ce0721bd79f5a3bcb9f87c`

Canonical integration branch, if any: NONE

Canonical PR / RC, if any: NONE

Relevant open PRs: NONE

Relevant Issues: NONE

Relevant CI / workflows: no project workflow is a release gate for the Figma design target. External execution is event-driven through `MishkaStrategy/ai-control/.github/workflows/codex-microtask.yml` after an exact queued packet is persisted.

Relevant release/deployment state: release is the validated state of the specified Figma file plus durable GitHub handoff evidence.

## 3. Repository Scan Summary

Project purpose:

Technical workspace and provenance for adapting the specified existing desktop Figma pages to production-ready 390 px mobile pages.

Architecture / major components:

- `figma/README.md` — project/source-of-truth rules.
- `omniroute-tasks/prompts/figma-mobile-adapt-zero-defect-20260904.md` — exact Worker.ai/Codex runtime prompt/provenance.
- Figma file `dxbfwhhp5N9sTsKv5ErTPW`, page `0:1` — actual design target.
- `MishkaStrategy/ai-control` — external organizational Worker.ai/Codex control plane; `MishkaStrategy/cp` is already allowlisted.

Build / packaging: N/A for current design release.

Tests / validation: Figma structural inspection, source/mobile content reconciliation, spacing/overflow/layer audits, screenshots, and repeated full QA passes.

CI: project CI is not a release gate. Worker execution is triggered by a push creating `tasks/queued/**/*.yaml` in `MishkaStrategy/ai-control`.

Release / deployment: validated Figma state; no GitHub deployment required.

Governance:

- Live organizational HQ master: `MishkaStrategy/.github/HQ_MASTER_PROMPT.md`, version 1.2.
- Project-specific repository/Figma source-of-truth rules apply.
- Owner explicitly requires Worker.ai/Codex for implementation execution; HQ retains routing and release authority.

External release dependencies:

Worker.ai self-hosted Codex runner with configured Figma integration; Figma file write/read access; reliable post-write verification.

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

Evidence: live Figma inventory of page `0:1`; source nodes and dimensions recorded above; desktop baseline screenshots captured for all four pages.

Blocking items: NONE

### GATE-2 — Four production mobile counterparts

Status: UNSATISFIED

Evidence: no verified four-page 390 px mobile set exists yet.

Blocking items: Worker.ai/Codex runtime adaptation.

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

### CP-2 — Execute full four-page mobile adaptation and per-screen QA through Worker.ai/Codex

Status: ACTIVE

Release gate: GATE-2, GATE-3

Why critical: all remaining design implementation and per-screen integrity gates depend on an exact Worker.ai runtime execution against the configured Figma integration.

Depends on: CP-1.

Blocks: global QA and handoff.

Execution plane: CODEX

Exact scope: execute the existing zero-defect runtime specification in `omniroute-tasks/prompts/figma-mobile-adapt-zero-defect-20260904.md` against Figma file `dxbfwhhp5N9sTsKv5ErTPW`; create exactly four separate mobile counterparts; preserve originals/content; enforce 390/10/60/20/burger/content-driven-height rules; perform at least two full QA passes per source/mobile pair.

Acceptance condition: all four source/mobile pairs individually PASS with 100% content integrity and zero clipping/overlap/overflow/structural defects on their last full audit.

Evidence: pending Worker.ai/Codex terminal result plus HQ live Figma verification.

### CP-3 — Global cross-screen QA and fresh content reconciliation

Status: PENDING

Release gate: GATE-4

Why critical: required release-wide consistency and zero-defect gate.

Depends on: CP-2.

Blocks: final release evidence.

Execution plane: CODEX for implementation/fixes; HQ_DIRECT for independent post-run verification.

Exact scope: widths; 10/60/20 spacing; headers/burgers; typography; buttons/cards/forms/images/footers; repeated components; fresh desktop->mobile item reconciliation; cleanup only technical trash created during execution; full re-audit after cleanup.

Acceptance condition: complete global pass finds zero new issues and no missing content/unadapted source pages; HQ independently verifies the claimed final state live.

Evidence: pending.

### CP-4 — Persist final mapping/audit evidence and verify release

Status: PENDING

Release gate: GATE-5

Why critical: project rules require durable technical handoff and HQ cannot declare DONE without release evidence.

Depends on: CP-3.

Blocks: DONE.

Execution plane: HQ_DIRECT

Exact scope: save concise final source->mobile mapping and audit result under `figma/`; update this file with final live evidence and DONE state; verify no unintended repository changes or duplicate project directory.

Acceptance condition: report saved and live-verified; final Figma evidence proves release contract complete.

Evidence: pending.

## 6. Active Execution Registry

HQ:

- Executor: HQ control/verification only.
- Exact scope: maintain critical path, enqueue one exact Worker.ai/Codex runtime task, inspect terminal result, independently verify Figma, persist final report/control state.
- Write surface: GitHub control/provenance; no direct Figma implementation writes while owner Codex-only execution decision is active.
- Expected evidence: exact ai-control task ID/path/run, terminal packet, post-run Figma verification.

Workers: NONE separate from Worker.ai/Codex pool.

Codex:

- Executor: Worker.ai self-hosted Codex pool through `MishkaStrategy/ai-control`.
- Planned exact task id: `cp-figma-mobile-zero-defect-20260905-a1`.
- Target repository: `MishkaStrategy/cp`.
- Execution capability: `runtime_execution` using configured Figma integration.
- Write surface: Figma file `dxbfwhhp5N9sTsKv5ErTPW`; target repository is source/provenance only and should remain unchanged by the runtime task.
- Expected evidence: task terminal result, four mobile node IDs/mapping, audit summary and verified Figma state.

Zero-model control: `ai-control` router/pre-model gate only; no project GitHub-control action delegated to Codex.

CI/runtime: event-driven `codex-microtask.yml` after queue persistence.

## 7. Safe Parallel Work

NONE — only one Codex task per target repository may run, and concurrent writers to the same Figma file would create avoidable conflict risk. Worker gate result: `NO_SAFE_NONOVERLAP_SCOPE`.

## 8. Current Blockers

NONE before enqueue. The task must fail closed if the Worker.ai runner lacks Figma auth/integration or reliable post-write verification.

## 9. Critical Path Audits

Repository Coverage Audit: PASS

Evidence: current repository/default branch/HEAD, `figma/`, project control artifacts, open PRs/Issues, relevant Figma target surfaces, and the organizational `ai-control` execution plane were checked.

Evidence Audit: PASS

Evidence: source count/dimensions/node IDs and screenshots come from live Figma; Worker.ai routing contract and allowlist/workflow/schema were live-read from `MishkaStrategy/ai-control`; direct implementation route restriction is an explicit current owner decision.

Release Alignment Audit: PASS

Evidence: runtime task scope is exactly the four required mobile counterparts plus mandatory QA; HQ-only final persistence remains separate.

Dependency & Ordering Audit: PASS

Evidence: source inventory precedes Worker execution; Worker completion precedes independent global verification; durable handoff follows verified Figma state.

Execution & Parallelism Audit: PASS

Evidence: one exact runtime task writes one Figma file; no concurrent writers; HQ preserves control and independently verifies.

Adversarial Audit: PASS

Evidence: `MishkaStrategy/cp` is allowlisted in `ai-control`; `codex-microtask.yml` is event-driven on `tasks/queued/**/*.yaml`; no active queued/running task currently exists for `MishkaStrategy/cp`; the task uses `runtime_execution`, not GitHub control.

Material findings and resolutions:

- Source count remains `N=4`.
- Owner requires Worker.ai/Codex implementation execution; direct HQ Figma implementation is therefore not an authorized normal path in this project state.
- `MishkaStrategy/ai-control` is the correct control repository; `cp` is already allowlisted.
- One exact runtime task avoids cross-writer Figma conflicts and uses the existing zero-defect specification.

## 10. Next Action

Exact next action:

Persist `tasks/queued/MishkaStrategy__cp/cp-figma-mobile-zero-defect-20260905-a1.yaml` in `MishkaStrategy/ai-control` with live `cp/main` source SHA, route `CODEX`, placement capability `runtime_execution`, and the exact Figma zero-defect goal; then verify the event-driven workflow accepted/claimed it.

Executor: HQ for deterministic enqueue; Worker.ai/Codex for runtime execution.

Expected evidence: queue commit, Actions run/claim state, exact task ID/path.

Acceptance condition: the queued packet is accepted by zero-model gates and reaches the Worker.ai/Codex executor, or returns a concrete fail-closed blocker.

## 11. Last Material Revision

What changed:

Execution routing changed from direct HQ Figma implementation to Worker.ai/Codex runtime execution after explicit owner instruction. The organizational `ai-control` workflow/schema/allowlist were live-verified and incorporated.

Why the critical path changed:

Owner requires the implementation to run through Worker.ai/Codex rather than direct Figma writes from HQ.

Evidence causing the change:

Explicit owner decision; live `MishkaStrategy/ai-control` README/AGENTS/schema/workflow; `MishkaStrategy/cp` present and enabled in `repos.yaml`; no active cp task in queued/running state.

## 12. Chat Rotation Checkpoint

Safe to rotate chat: NO

Last completed atomic action: verified Worker.ai/Codex control plane, allowlist, workflow trigger, task schema, and absence of active cp tasks.

Active external executions and exact refs: planned task `cp-figma-mobile-zero-defect-20260905-a1`, not yet enqueued at this snapshot.

Unpersisted material reasoning: NONE.

Recovery entrypoint: re-read live master and this file; validate `cp/main`; inspect exact ai-control task ID across queued/running/done/blocked before creating anything new; never duplicate the task.

Exact next action after recovery: enqueue the planned task only if it does not already exist; otherwise resume verification from its current terminal/running state.

Rotation blockers, if any: Worker.ai task has not yet reached a terminal state and release gates GATE-2..5 remain unsatisfied.
