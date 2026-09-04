# Figma Mobile Adaptation — ZERO DEFECT

## Target
Work only in this Figma file:
https://www.figma.com/design/dxbfwhhp5N9sTsKv5ErTPW/%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D1%8B-%D0%B4%D0%BB%D1%8F-%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B0%D1%86%D0%B8%D0%B8?node-id=0-1&t=Gjoedyughb1NE5hZ-1

File key: `dxbfwhhp5N9sTsKv5ErTPW`
Root node: `0:1`

## Main objective
Create a production-ready mobile adaptation for every existing desktop/source frame in the same Figma file. Work directly through the configured Figma integration on the OmniRoute/Codex worker. Do not stop after planning, inventory, a first edit, or one QA pass. Continue until the full zero-defect completion gate passes or a real external blocker is proven.

## Immutable mobile requirements
- width exactly 390 px;
- horizontal side padding exactly 10 px;
- spacing between major sections/blocks exactly 60 px;
- base spacing between content elements exactly 20 px, except tightly related atomic elements where original hierarchy clearly requires a smaller internal gap;
- desktop/top navigation becomes a burger-menu mobile pattern;
- preserve 100% of original content;
- do not edit, delete, replace, detach, or overwrite original desktop frames;
- mobile height is content-driven; never crop content to preserve a fixed viewport height.

## File rules
- do not create another Figma file;
- do not move work to another document;
- for every source desktop frame create one separate mobile counterpart in this same file;
- preferred name: `[Original Frame Name] / Mobile / 390`;
- all text, images, controls, icons, data, links and semantic content must come from the source file;
- do not invent, rewrite, shorten, remove, replace, reorder, or hide original content;
- when something does not fit, solve through layout adaptation, wrapping, stacking, resizing, grid changes, image sizing or increased section/frame height.

## Phase 0 — full inventory
Before editing, inspect the entire file and build an internal registry:
`SOURCE FRAME -> MOBILE FRAME -> STATUS`
Record every source frame name, node id, sections, header/nav, hero, text, cards, images, forms, CTA, footer, repeated components, multi-column structures, absolute positioning, Auto Layout, masks, Clip Content and likely 390 px risks.
The discovered source count `N` is a hard control number. Completion requires exactly `N` intended mobile counterparts.

## Content inventory per frame
Before adapting each frame inventory every meaningful item: headings, subheadings, paragraphs, captions, images, icons, cards, badges, buttons, links, CTA, forms, fields, lists, numbers, metrics, tables, decorative elements, header, footer and any other meaningful content. Use this list for post-adaptation reconciliation.

## Layout adaptation
Do not mechanically scale desktop to 390 px. Rebuild as a real mobile composition while preserving visual identity, typography, color, hierarchy, meaning and style.
- multi-column layouts and card rows should normally become vertical stacks or another natural mobile structure;
- preserve logical content order;
- cards must fully fit and keep all children;
- text must wrap/read naturally; no truncation or tiny force-fit type;
- images keep aspect ratio and meaningful crop;
- use Auto Layout where it improves robustness; audit direction, gap, padding, alignment, Hug, Fill, fixed dimensions, min/max, nesting, child resizing and absolute positioning;
- do not retain fixed heights that crop content.

## Header / burger
For every desktop header/navigation:
- preserve logo and necessary actions;
- preserve every navigation item;
- replace non-fitting horizontal desktop navigation with a burger-menu mobile header;
- ensure no overlap, clipping, overflow or logo distortion;
- if safe prototyping support is available, connect minimal open/close interaction; otherwise create a clean closed burger state and a preserved menu representation without inventing content.

## Mandatory per-frame iterative loop
For each source -> mobile pair:
1. content/layer inventory;
2. mobile adaptation;
3. full visual QA top-to-bottom;
4. full layer audit;
5. desktop-vs-mobile content integrity audit item-by-item;
6. spacing audit;
7. overflow + left/right screen-edge scan;
8. fix every defect at root cause;
9. full re-audit from the beginning.

If any defect appears: `FIX -> FULL RE-AUDIT -> repeat`.
Perform at least TWO independent complete QA passes even when the first is clean. If pass #2 finds anything, continue with pass #3+ until an entire pass returns zero new defects.

## Visual QA
Check whole frame for overlap/collision, hidden layers, clipped text/images, wrong crop, out-of-bounds objects, bad alignment, unusably small controls, accidental empty/dense zones, broken hierarchy, inconsistent spacing, vertical-rhythm jumps, broken header, bad section gaps and footer placement.

## Layer audit
Check accidental duplicates, empty groups/layers, hidden required elements, bad masks, Clip Content misuse, objects outside parent, broken hierarchy, broken Auto Layout, wrong direction/gap/padding, negative spacing/coordinates, width/height conflicts, zero dimensions, unnecessary absolute positioning, fixed heights that cut content, wrong constraints, overlapping siblings, stray objects outside frame and technical trash. Final structure must be clean, logical, editable and predictable.

## Content integrity
Compare original desktop and mobile section-by-section and item-by-item. Every content-inventory item must exist in mobile. If even one required item is missing, frame status is FAIL: restore/adapt it and rerun full audit.

## Spacing / overflow / edges
- side padding: 10 px;
- major section gaps: 60 px;
- base content gaps: 20 px;
- no unintended horizontal overflow;
- no hidden text caused by clipping;
- no element escapes 390 px or its parent;
- explicitly inspect long text, buttons, horizontal groups, images, tables, forms, cards and header;
- inspect left/right frame edges for protrusions, unexplained <10 px spacing, broken borders/shadows/crops and horizontal overflow.

## Repair method
For each problem use `DEFECT -> CAUSE -> FIX -> RECHECK`. Fix root cause rather than arbitrary nudges. After any fix recheck the element, parent, siblings, adjacent sections above/below and the whole frame.

## Frame completion gate
A frame can be PASS only when all are true:
- width = 390 px;
- original desktop untouched;
- separate mobile copy exists;
- content integrity = 100%;
- no missing elements;
- no overlap;
- no clipping;
- no unintended horizontal overflow;
- no broken Auto Layout/constraints;
- no accidentally hidden content;
- header adapted and burger created where relevant;
- spacing and layer tree verified;
- at least two full QA passes completed;
- last full audit = 0 defects.

## Global QA
After all frames individually PASS, do not stop. Run global QA across all mobile frames for width, side padding, section/content gaps, headers, burger icons, typography, buttons, cards, forms, images, footers and repeated components. Fix cross-screen inconsistencies.

Then perform a fresh global desktop -> mobile content reconciliation for every source frame, followed by global layer cleanup of only technical trash created during execution. Cleanup counts as a change, so run one more full final audit after cleanup.

## Zero-defect stop condition
Stop only when simultaneously:
- 100% source frames adapted;
- 100% original content preserved;
- 0 visual defects;
- 0 structural/layer defects;
- 0 unintended overflow;
- 0 unintended clipping;
- 0 unintended overlaps;
- final complete pass found 0 new issues.

Final internal status must be equivalent to:
`FINAL AUDIT: PASS`
`DEFECTS FOUND: 0`
`MISSING CONTENT: 0`
`UNADAPTED FRAMES: 0`

If final audit finds even one error, do not finish: find root cause, fix, recheck affected areas and rerun the complete audit.

## Completion/report
DONE is allowed only after actual Figma writes plus post-write verification. Return file key/URL, source-frame count N, complete source -> mobile mapping, final dimensions, audits performed, defects found/fixed, coverage metrics and final status.

If Figma integration/auth/write access is unexpectedly unavailable, target file cannot be opened, or reliable post-write verification is impossible, return BLOCKED with exact evidence and recommended HQ action. Do not invent success.
