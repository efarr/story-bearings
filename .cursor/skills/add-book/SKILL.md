---
name: add-book
description: Author one complete Book into the catalog from chapter text or parametric knowledge. Use when adding a Book or replacing a stub fixture.
---

# add-book

Write one Book the catalog can load. Last step is check-book; this skill is unfinished while that check fails.

Vocabulary is `CONTEXT.md`. The record shape is the catalog `Book` type. The bar is `.cursor/skills/check-book/SKILL.md` — write to it, then run it.

## 1. Orient

Read `CONTEXT.md` and the catalog `Book` type. See how existing Books are loaded (`catalog/index.ts` and a Book module next to it).

**Done when:** you know the title, author, slug, and whether that slug is already in the catalog.

## 2. Source

Plot comes from chapter text or parametric knowledge. For Crime and Punishment chapter text, use a US-public-domain translation (Garnett 1914); see `docs/research/crime-and-punishment-translation-copyright.md`.

**Done when:** the source is named and is chapter text or parametric knowledge.

## 3. Map

Ordered Divisions — parts, and an epilogue if the Book has one — with chapter counts from that Book's map. For Crime and Punishment: six parts + epilogue; 7 / 7 / 6 / 6 / 5 / 8 and two epilogue chapters. See `docs/research/crime-and-punishment-chapter-map.md`.

**Done when:** every Place the map names exists as a chapter in a Division.

## 4. Persons

Choose the key people and write them. There is no human gate. Walk-ons live in orientation only.

Each Person: canonical name, protagonist flag, first-key Place, a Roster line at every Place from first-key through the end in Book order (aliases already used, one role/relationship sentence), and a final role.

List Persons in first-presentation order (earlier in the array = presented earlier). The Roster is newest-first; same-chapter ties reverse that array order.

**Done when:** every Person has first-key, a line at every later Place, and a final role, and walk-ons are not in the set.

## 5. Write

Write the Book record the catalog loads the way existing Books are loaded: spoiler-safe landing (title, author, invitation to set Place); orientation at every Place; Persons as in step 4. Prose is original.

**Done when:** the catalog lists the Book, every Place has orientation, and every Person is written as in step 4.

## 6. Check

Read and follow `.cursor/skills/check-book/SKILL.md`. Fix the record and check again until the report is ok.

**Done when:** check-book reports ok.
