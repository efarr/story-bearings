import { describe, expect, test } from "vitest";
import { checkBook, catalog, createCatalog } from "./index";
import type { Book } from "./index";

const book: Book = {
  title: "A Dense Novel",
  author: "An Author",
  slug: "a-dense-novel",
  landing: "Set your Place to read Bearings for the chapter you have just finished.",
  divisions: [
    {
      kind: "part",
      chapters: [
        { chapter: 1, orientation: "Rodya walks at dusk." },
        { chapter: 2, orientation: "Rodya meets Petrovich." },
      ],
    },
    {
      kind: "part",
      chapters: [{ chapter: 1, orientation: "Dunya arrives to help Rodya." }],
    },
    {
      kind: "epilogue",
      chapters: [
        { chapter: 1, orientation: "Years later Rodya is far from home." },
        { chapter: 2, orientation: "The Book closes on Rodya and Dunya." },
      ],
    },
  ],
  persons: [
    {
      canonicalName: "Rodya",
      protagonist: true,
      firstKey: { divisionIndex: 0, chapter: 1 },
      lines: [
        { aliases: ["the student"], role: "the student the Book follows" },
        { aliases: ["the student"], role: "a student who has met the official" },
        { aliases: ["the student"], role: "a student whose sister has arrived" },
        { aliases: ["the student"], role: "a student far from home" },
        { aliases: ["the student"], role: "the student the Book has followed" },
      ],
      finalRole: "the student the Book followed",
    },
    {
      canonicalName: "Petrovich",
      protagonist: false,
      firstKey: { divisionIndex: 0, chapter: 2 },
      lines: [
        { aliases: ["the official"], role: "an official Rodya has just met" },
        { aliases: ["the official"], role: "the official Rodya met" },
        { aliases: ["the official"], role: "the official from earlier" },
        { aliases: ["the official"], role: "the official from earlier" },
      ],
      finalRole: "an official Rodya met",
    },
    {
      canonicalName: "Dunya",
      protagonist: false,
      firstKey: { divisionIndex: 1, chapter: 1 },
      lines: [
        { aliases: ["his sister"], role: "Rodya's sister, newly arrived" },
        { aliases: ["his sister"], role: "Rodya's sister" },
        { aliases: ["his sister"], role: "Rodya's sister, still with him" },
      ],
      finalRole: "Rodya's sister",
    },
  ],
};

const part1 = { kind: "part" as const, number: 1 };
const part2 = { kind: "part" as const, number: 2 };
const epilogue = { kind: "epilogue" as const };

describe("Book catalog", () => {
  test("lists Books by slug, title, author, and landing", () => {
    const catalog = createCatalog([book]);

    expect(catalog.listBooks()).toEqual([
      {
        slug: "a-dense-novel",
        title: "A Dense Novel",
        author: "An Author",
        landing:
          "Set your Place to read Bearings for the chapter you have just finished.",
      },
    ]);
  });

  test("resolves a Book by slug", () => {
    const catalog = createCatalog([book]);

    expect(catalog.getBook("a-dense-novel")).toEqual({
      slug: "a-dense-novel",
      title: "A Dense Novel",
      author: "An Author",
      landing:
        "Set your Place to read Bearings for the chapter you have just finished.",
    });
    expect(catalog.getBook("missing")).toBeUndefined();
  });

  test("resolves a Place by Book slug, Division, and chapter", () => {
    const catalog = createCatalog([book]);

    expect(catalog.resolvePlace("a-dense-novel", part1, 1)).toEqual({
      slug: "a-dense-novel",
      division: part1,
      chapter: 1,
    });
    expect(catalog.resolvePlace("a-dense-novel", part1, 9)).toBeUndefined();
    expect(catalog.resolvePlace("a-dense-novel", epilogue, 1)).toEqual({
      slug: "a-dense-novel",
      division: epilogue,
      chapter: 1,
    });
    expect(catalog.resolvePlace("missing", part1, 1)).toBeUndefined();
  });

  test("returns Bearings at a Place: label, orientation, and Roster", () => {
    const catalog = createCatalog([book]);

    expect(catalog.bearings("a-dense-novel", part1, 1)).toEqual({
      label: "Part 1, Chapter 1",
      orientation: "Rodya walks at dusk.",
      roster: [
        {
          name: "Rodya",
          aliases: ["the student"],
          role: "the student the Book follows",
        },
      ],
    });
  });

  test("omits a Person from the Roster before first-key and keeps them after", () => {
    const catalog = createCatalog([book]);

    expect(
      catalog.bearings("a-dense-novel", part1, 1)?.roster.map((entry) => entry.name),
    ).toEqual(["Rodya"]);
    expect(
      catalog.bearings("a-dense-novel", part1, 2)?.roster.map((entry) => entry.name),
    ).toEqual(["Rodya", "Petrovich"]);
    expect(
      catalog.bearings("a-dense-novel", part2, 1)?.roster.map((entry) => entry.name),
    ).toEqual(["Rodya", "Petrovich", "Dunya"]);
    expect(
      catalog
        .bearings("a-dense-novel", epilogue, 2)
        ?.roster.map((entry) => entry.name),
    ).toEqual(["Rodya", "Petrovich", "Dunya"]);
  });

  test("rewrites each Roster line at the Place", () => {
    const catalog = createCatalog([book]);

    expect(catalog.bearings("a-dense-novel", part1, 2)?.roster).toEqual([
      {
        name: "Rodya",
        aliases: ["the student"],
        role: "a student who has met the official",
      },
      {
        name: "Petrovich",
        aliases: ["the official"],
        role: "an official Rodya has just met",
      },
    ]);
  });

  test("orders the Roster protagonist first, then first-key", () => {
    const catalog = createCatalog([book]);
    const names = catalog
      .bearings("a-dense-novel", part2, 1)
      ?.roster.map((entry) => entry.name);

    expect(names).toEqual(["Rodya", "Petrovich", "Dunya"]);
  });

  test("walks previous and next across Divisions into the epilogue with no wrap", () => {
    const catalog = createCatalog([book]);

    expect(catalog.previousPlace("a-dense-novel", part1, 1)).toBeUndefined();
    expect(catalog.nextPlace("a-dense-novel", part1, 1)).toEqual({
      slug: "a-dense-novel",
      division: part1,
      chapter: 2,
    });
    expect(catalog.nextPlace("a-dense-novel", part1, 2)).toEqual({
      slug: "a-dense-novel",
      division: part2,
      chapter: 1,
    });
    expect(catalog.nextPlace("a-dense-novel", part2, 1)).toEqual({
      slug: "a-dense-novel",
      division: epilogue,
      chapter: 1,
    });
    expect(catalog.nextPlace("a-dense-novel", epilogue, 1)).toEqual({
      slug: "a-dense-novel",
      division: epilogue,
      chapter: 2,
    });
    expect(catalog.nextPlace("a-dense-novel", epilogue, 2)).toBeUndefined();
    expect(catalog.previousPlace("a-dense-novel", epilogue, 1)).toEqual({
      slug: "a-dense-novel",
      division: part2,
      chapter: 1,
    });
    expect(catalog.previousPlace("a-dense-novel", part1, 1)).toBeUndefined();
  });

  test("returns the Complete roster alphabetical with final roles only", () => {
    const catalog = createCatalog([book]);

    expect(catalog.completeRoster("a-dense-novel")).toEqual([
      { name: "Dunya", finalRole: "Rodya's sister" },
      { name: "Petrovich", finalRole: "an official Rodya met" },
      { name: "Rodya", finalRole: "the student the Book followed" },
    ]);
  });

  test("check passes a valid Book and does not rewrite it", () => {
    const original = structuredClone(book);
    const report = checkBook(book);

    expect(report.ok).toBe(true);
    expect(report.failures).toEqual([]);
    expect(report.passes.length).toBeGreaterThan(0);
    expect(book).toEqual(original);
  });

  test("check names the Place when orientation is missing", () => {
    const failing = structuredClone(book);
    failing.divisions[0].chapters[0].orientation = "   ";
    const report = checkBook(failing);

    expect(report.ok).toBe(false);
    expect(report.failures).toContainEqual({
      code: "missing-orientation",
      place: { division: part1, chapter: 1 },
    });
  });

  test("check names the Person when a later Roster line is missing", () => {
    const failing = structuredClone(book);
    failing.persons[1].lines.pop();
    const report = checkBook(failing);

    expect(report.ok).toBe(false);
    expect(report.failures).toContainEqual({
      code: "missing-later-roster-line",
      person: "Petrovich",
    });
  });

  test("check names a walk-on Person", () => {
    const failing = structuredClone(book);
    failing.divisions[0].chapters[0].orientation =
      "Rodya walks at dusk. A porter holds the door.";
    failing.persons.push({
      canonicalName: "A porter",
      protagonist: false,
      firstKey: { divisionIndex: 0, chapter: 1 },
      lines: [
        { aliases: [], role: "" },
        { aliases: [], role: "" },
        { aliases: [], role: "" },
        { aliases: [], role: "" },
        { aliases: [], role: "" },
      ],
      finalRole: "someone at the door",
    });
    const report = checkBook(failing);

    expect(report.ok).toBe(false);
    expect(report.failures).toContainEqual({
      code: "walk-on-person",
      person: "A porter",
    });
  });

  test("check names the Place when orientation contains a quotation", () => {
    const failing = structuredClone(book);
    failing.divisions[0].chapters[0].orientation = 'Rodya thinks "I am ill."';
    const report = checkBook(failing);

    expect(report.ok).toBe(false);
    expect(report.failures).toContainEqual({
      code: "quotation",
      place: { division: part1, chapter: 1 },
    });
  });

  test("check names the Person when landing is not spoiler-safe", () => {
    const failing = structuredClone(book);
    failing.landing = "Rodya will meet Petrovich. Set your Place.";
    const report = checkBook(failing);

    expect(report.ok).toBe(false);
    expect(report.failures).toContainEqual({
      code: "landing-not-spoiler-safe",
      person: "Rodya",
    });
  });

  test("check names the Person when the Complete roster does not match Persons", () => {
    const failing = structuredClone(book);
    failing.persons[2].finalRole = "";
    const report = checkBook(failing);

    expect(report.ok).toBe(false);
    expect(report.failures).toContainEqual({
      code: "complete-roster-mismatch",
      person: "Dunya",
    });
  });
});

describe("Crime and Punishment fixture", () => {
  test("is listed with slug, title, author, and landing", () => {
    expect(catalog.listBooks()).toContainEqual({
      slug: "crime-and-punishment",
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      landing:
        "A novel by Fyodor Dostoevsky. Set your Place to read Bearings for the chapter you have just finished.",
    });
    expect(catalog.getBook("crime-and-punishment")?.slug).toBe(
      "crime-and-punishment",
    );
  });

  test("follows the Garnett part and epilogue map", () => {
    expect(catalog.resolvePlace("crime-and-punishment", part1, 7)).toEqual({
      slug: "crime-and-punishment",
      division: part1,
      chapter: 7,
    });
    expect(catalog.resolvePlace("crime-and-punishment", part1, 8)).toBeUndefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 2 }, 7),
    ).toBeDefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 3 }, 6),
    ).toBeDefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 3 }, 7),
    ).toBeUndefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 4 }, 6),
    ).toBeDefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 5 }, 5),
    ).toBeDefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 5 }, 6),
    ).toBeUndefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 6 }, 8),
    ).toBeDefined();
    expect(
      catalog.resolvePlace("crime-and-punishment", { kind: "part", number: 6 }, 9),
    ).toBeUndefined();
    expect(catalog.resolvePlace("crime-and-punishment", epilogue, 2)).toEqual({
      slug: "crime-and-punishment",
      division: epilogue,
      chapter: 2,
    });
    expect(
      catalog.resolvePlace("crime-and-punishment", epilogue, 3),
    ).toBeUndefined();
    expect(
      catalog.nextPlace("crime-and-punishment", { kind: "part", number: 6 }, 8),
    ).toEqual({
      slug: "crime-and-punishment",
      division: epilogue,
      chapter: 1,
    });
    expect(catalog.nextPlace("crime-and-punishment", epilogue, 2)).toBeUndefined();
    expect(
      catalog.previousPlace("crime-and-punishment", part1, 1),
    ).toBeUndefined();
  });

  test("returns stub Bearings at a Place", () => {
    const bearings = catalog.bearings("crime-and-punishment", part1, 1);

    expect(bearings?.label).toBe("Part 1, Chapter 1");
    expect(bearings?.orientation.length).toBeGreaterThan(0);
    expect(bearings?.roster[0]?.name).toBe("Raskolnikov");
    expect(
      catalog.bearings("crime-and-punishment", epilogue, 2)?.label,
    ).toBe("Epilogue, Chapter 2");
  });

  test("passes check", () => {
    expect(catalog.check("crime-and-punishment")?.ok).toBe(true);
  });
});
