---
name: check-book
description: Audit a Book through catalog check and report named Place or Person failures without rewriting. Use when checking a Book, or as the last step of add-book.
---

# check-book

Report whether a loaded Book passes catalog check and is spoiler-safe. Leave the Book files untouched.

Vocabulary is `CONTEXT.md`. The machine bar is `catalog.check` — run it; do not reimplement it.

## 1. Load

Resolve the Book by slug (`getBook`). Walk Places with `resolvePlace` / `nextPlace` from the first chapter of the first part (or the epilogue if the Book has no parts).

**Done when:** the catalog returns that Book. If it does not, stop and report that nothing is loaded.

## 2. Catalog check

Run `npm run check-book -- <slug>`.

**Done when:** you have the printed `CheckReport`. `passes` are check codes that held; `failures` are the named misses. Each failure names a Place (`place`) or a Person (`person`) when the catalog has one.

## 3. Spoiler-safe audit

Catalog check cannot read plot. For every Place on the walk, read `bearings`. After the walk, read `completeRoster` once. Apply every rule the machine cannot:

- Orientation is a few paragraphs of original prose: this chapter plus earlier facts only as needed — not a beat-by-beat recap or a dump of the whole Book so far.
- Walk-ons stay in orientation; they are not Persons (a filled role line is not enough — key people only).
- Each Place's orientation and Roster contain only what the Book has shown or said through that Place. People not yet named or referred to are absent. Inferred future plot is absent. Famous-book knowledge does not count. The page is the source of truth, not the protagonist's head.
- Roster lines are who's-who through this Place. Plot beats stay in orientation.
- Complete roster is the same Persons with final roles only (not per-Place lines).

**Done when:** every Place and every Person is named pass or fail.

## 4. Report

Print catalog-check passes and failures, then audit passes and failures. Do not edit Book files.

**Done when:** the report is written and the Book is unchanged. Any failure leaves add-book unfinished.
