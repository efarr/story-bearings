import type { Book, Division, Person, Place } from "./index";

const PART_CHAPTERS = [7, 7, 6, 6, 5, 8] as const;
const EPILOGUE_CHAPTERS = 2;

const STUB_ORIENTATION = "You have read through this chapter.";
const FIRST_ORIENTATION = "Raskolnikov is at this Place in the Book.";

function stubChapters(count: number, firstOfBook: boolean): Place[] {
  return Array.from({ length: count }, (_, index) => ({
    chapter: index + 1,
    orientation:
      firstOfBook && index === 0 ? FIRST_ORIENTATION : STUB_ORIENTATION,
  }));
}

const divisions: Division[] = [
  ...PART_CHAPTERS.map(
    (count, index): Division => ({
      kind: "part",
      chapters: stubChapters(count, index === 0),
    }),
  ),
  {
    kind: "epilogue",
    chapters: stubChapters(EPILOGUE_CHAPTERS, false),
  },
];

const raskolnikov: Person = {
  canonicalName: "Raskolnikov",
  protagonist: true,
  firstKey: { divisionIndex: 0, chapter: 1 },
  lines: Array.from(
    { length: divisions.reduce((count, division) => count + division.chapters.length, 0) },
    () => ({
      aliases: ["Rodya"],
      role: "the student the Book follows",
    }),
  ),
  finalRole: "the student the Book follows",
};

export const crimeAndPunishment: Book = {
  title: "Crime and Punishment",
  author: "Fyodor Dostoevsky",
  slug: "crime-and-punishment",
  landing:
    "A novel by Fyodor Dostoevsky. Set your Place to read Bearings for the chapter you have just finished.",
  divisions,
  persons: [raskolnikov],
};
