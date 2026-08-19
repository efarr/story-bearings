import { crimeAndPunishment } from "./crime-and-punishment";

export type Place = {
  chapter: number;
  orientation: string;
};

export type Division = {
  kind: "part" | "epilogue";
  chapters: Place[];
};

export type Person = {
  canonicalName: string;
  protagonist: boolean;
  firstKey: { divisionIndex: number; chapter: number };
  lines: { aliases: string[]; role: string }[];
  finalRole: string;
};

export type Book = {
  title: string;
  author: string;
  slug: string;
  landing: string;
  divisions: Division[];
  persons: Person[];
};

export type ListedBook = {
  slug: string;
  title: string;
  author: string;
  landing: string;
};

export type DivisionRef =
  | { kind: "part"; number: number }
  | { kind: "epilogue" };

export type DivisionOutline =
  | { kind: "part"; number: number; chapters: number[] }
  | { kind: "epilogue"; chapters: number[] };

export type PlaceRef = {
  slug: string;
  division: DivisionRef;
  chapter: number;
};

export type RosterEntry = {
  name: string;
  aliases: string[];
  role: string;
};

export type Bearings = {
  label: string;
  orientation: string;
  roster: RosterEntry[];
};

export type CompleteRosterEntry = {
  name: string;
  finalRole: string;
};

type LocatedPlace = {
  divisionIndex: number;
  division: DivisionRef;
  chapter: number;
  orientation: string;
};

function findDivisionIndex(book: Book, division: DivisionRef): number {
  if (division.kind === "epilogue") {
    return book.divisions.findIndex((entry) => entry.kind === "epilogue");
  }
  let seen = 0;
  return book.divisions.findIndex((entry) => {
    if (entry.kind !== "part") {
      return false;
    }
    seen += 1;
    return seen === division.number;
  });
}

function findChapter(book: Book, division: DivisionRef, chapter: number) {
  const divisionIndex = findDivisionIndex(book, division);
  const entry = book.divisions[divisionIndex];
  if (!entry) {
    return undefined;
  }
  const place = entry.chapters.find((item) => item.chapter === chapter);
  return place ? { divisionIndex, place } : undefined;
}

function divisionRefAt(book: Book, divisionIndex: number): DivisionRef {
  const division = book.divisions[divisionIndex];
  if (division.kind === "epilogue") {
    return { kind: "epilogue" };
  }
  const number =
    book.divisions.slice(0, divisionIndex).filter((entry) => entry.kind === "part")
      .length + 1;
  return { kind: "part", number };
}

function orderedPlaces(book: Book): LocatedPlace[] {
  return book.divisions.flatMap((division, divisionIndex) =>
    division.chapters.map((place) => ({
      divisionIndex,
      division: divisionRefAt(book, divisionIndex),
      chapter: place.chapter,
      orientation: place.orientation,
    })),
  );
}

function placeOrderIndex(
  book: Book,
  divisionIndex: number,
  chapter: number,
): number {
  return orderedPlaces(book).findIndex(
    (place) =>
      place.divisionIndex === divisionIndex && place.chapter === chapter,
  );
}

function labelFor(division: DivisionRef, chapter: number): string {
  if (division.kind === "epilogue") {
    return `Epilogue, Chapter ${chapter}`;
  }
  return `Part ${division.number}, Chapter ${chapter}`;
}

function rosterAt(book: Book, currentIndex: number): RosterEntry[] {
  const present = book.persons.filter((person) => {
    const keyIndex = placeOrderIndex(
      book,
      person.firstKey.divisionIndex,
      person.firstKey.chapter,
    );
    return keyIndex !== -1 && keyIndex <= currentIndex;
  });

  present.sort((a, b) => {
    if (a.protagonist !== b.protagonist) {
      return a.protagonist ? -1 : 1;
    }
    return (
      placeOrderIndex(book, a.firstKey.divisionIndex, a.firstKey.chapter) -
      placeOrderIndex(book, b.firstKey.divisionIndex, b.firstKey.chapter)
    );
  });

  return present.flatMap((person) => {
    const keyIndex = placeOrderIndex(
      book,
      person.firstKey.divisionIndex,
      person.firstKey.chapter,
    );
    const line = person.lines[currentIndex - keyIndex];
    if (!line) {
      return [];
    }
    return [
      {
        name: person.canonicalName,
        aliases: line.aliases,
        role: line.role,
      },
    ];
  });
}

export type CheckFailure = {
  code: string;
  place?: { division: DivisionRef; chapter: number };
  person?: string;
};

export type CheckReport = {
  ok: boolean;
  passes: string[];
  failures: CheckFailure[];
};

const QUOTE = /["\u201c\u201d]/;

function mentionsPerson(text: string, person: Person): boolean {
  const names = [
    person.canonicalName,
    ...person.lines.flatMap((line) => line.aliases),
  ].filter((name) => name.length > 0);
  return names.some((name) => text.includes(name));
}

export function checkBook(book: Book): CheckReport {
  const failures: CheckFailure[] = [];
  const places = orderedPlaces(book);

  for (const place of places) {
    if (place.orientation.trim() === "") {
      failures.push({
        code: "missing-orientation",
        place: { division: place.division, chapter: place.chapter },
      });
    }
    if (QUOTE.test(place.orientation)) {
      failures.push({
        code: "quotation",
        place: { division: place.division, chapter: place.chapter },
      });
    }
  }

  for (const person of book.persons) {
    const keyIndex = placeOrderIndex(
      book,
      person.firstKey.divisionIndex,
      person.firstKey.chapter,
    );
    const expectedLines = keyIndex === -1 ? 0 : places.length - keyIndex;
    if (keyIndex === -1 || person.lines.length < expectedLines) {
      failures.push({
        code: "missing-later-roster-line",
        person: person.canonicalName,
      });
    }

    const firstLine = person.lines[0];
    if (firstLine && firstLine.role.trim() === "") {
      failures.push({
        code: "walk-on-person",
        person: person.canonicalName,
      });
    }

    for (const line of person.lines) {
      if (QUOTE.test(line.role) || line.aliases.some((alias) => QUOTE.test(alias))) {
        failures.push({
          code: "quotation",
          person: person.canonicalName,
        });
        break;
      }
    }
    if (QUOTE.test(person.finalRole) || QUOTE.test(person.canonicalName)) {
      failures.push({
        code: "quotation",
        person: person.canonicalName,
      });
    }
  }

  for (const person of book.persons) {
    if (mentionsPerson(book.landing, person)) {
      failures.push({
        code: "landing-not-spoiler-safe",
        person: person.canonicalName,
      });
    }
  }
  if (QUOTE.test(book.landing)) {
    failures.push({
      code: "quotation",
    });
  }

  for (const person of book.persons) {
    if (person.finalRole.trim() === "") {
      failures.push({
        code: "complete-roster-mismatch",
        person: person.canonicalName,
      });
    }
  }

  const counts = new Map<string, number>();
  for (const person of book.persons) {
    counts.set(
      person.canonicalName,
      (counts.get(person.canonicalName) ?? 0) + 1,
    );
  }
  for (const [name, count] of counts) {
    if (count > 1) {
      failures.push({
        code: "complete-roster-mismatch",
        person: name,
      });
    }
  }

  const codes = [
    "missing-orientation",
    "missing-later-roster-line",
    "walk-on-person",
    "quotation",
    "landing-not-spoiler-safe",
    "complete-roster-mismatch",
  ];
  const failed = new Set(failures.map((failure) => failure.code));
  const passes = codes.filter((code) => !failed.has(code));

  return {
    ok: failures.length === 0,
    passes,
    failures,
  };
}

export function createCatalog(books: Book[]) {
  function listed(book: Book): ListedBook {
    return {
      slug: book.slug,
      title: book.title,
      author: book.author,
      landing: book.landing,
    };
  }

  function findBook(slug: string): Book | undefined {
    return books.find((entry) => entry.slug === slug);
  }

  function neighbor(
    slug: string,
    division: DivisionRef,
    chapter: number,
    step: -1 | 1,
  ): PlaceRef | undefined {
    const book = findBook(slug);
    const found = book ? findChapter(book, division, chapter) : undefined;
    if (!book || !found) {
      return undefined;
    }
    const places = orderedPlaces(book);
    const currentIndex = places.findIndex(
      (place) =>
        place.divisionIndex === found.divisionIndex &&
        place.chapter === found.place.chapter,
    );
    const neighborPlace = places[currentIndex + step];
    if (!neighborPlace) {
      return undefined;
    }
    return {
      slug,
      division: neighborPlace.division,
      chapter: neighborPlace.chapter,
    };
  }

  return {
    listBooks(): ListedBook[] {
      return books.map(listed);
    },

    getBook(slug: string): ListedBook | undefined {
      const book = findBook(slug);
      return book ? listed(book) : undefined;
    },

    listDivisions(slug: string): DivisionOutline[] | undefined {
      const book = findBook(slug);
      if (!book) {
        return undefined;
      }
      return book.divisions.map((division, divisionIndex) => {
        const ref = divisionRefAt(book, divisionIndex);
        const chapters = division.chapters.map((place) => place.chapter);
        return ref.kind === "epilogue"
          ? { kind: "epilogue" as const, chapters }
          : { kind: "part" as const, number: ref.number, chapters };
      });
    },

    resolvePlace(
      slug: string,
      division: DivisionRef,
      chapter: number,
    ): PlaceRef | undefined {
      const book = findBook(slug);
      if (!book || !findChapter(book, division, chapter)) {
        return undefined;
      }
      return { slug, division, chapter };
    },

    bearings(
      slug: string,
      division: DivisionRef,
      chapter: number,
    ): Bearings | undefined {
      const book = findBook(slug);
      const found = book
        ? findChapter(book, division, chapter)
        : undefined;
      if (!book || !found) {
        return undefined;
      }
      const currentIndex = placeOrderIndex(
        book,
        found.divisionIndex,
        found.place.chapter,
      );
      return {
        label: labelFor(division, chapter),
        orientation: found.place.orientation,
        roster: rosterAt(book, currentIndex),
      };
    },

    previousPlace(
      slug: string,
      division: DivisionRef,
      chapter: number,
    ): PlaceRef | undefined {
      return neighbor(slug, division, chapter, -1);
    },

    nextPlace(
      slug: string,
      division: DivisionRef,
      chapter: number,
    ): PlaceRef | undefined {
      return neighbor(slug, division, chapter, 1);
    },

    completeRoster(slug: string): CompleteRosterEntry[] | undefined {
      const book = findBook(slug);
      if (!book) {
        return undefined;
      }
      return [...book.persons]
        .sort((a, b) => a.canonicalName.localeCompare(b.canonicalName))
        .map((person) => ({
          name: person.canonicalName,
          finalRole: person.finalRole,
        }));
    },

    check(slug: string): CheckReport | undefined {
      const book = findBook(slug);
      return book ? checkBook(book) : undefined;
    },
  };
}

export const catalog = createCatalog([crimeAndPunishment]);
