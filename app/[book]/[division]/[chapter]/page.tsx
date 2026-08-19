import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { catalog } from "@/catalog";
import { BearingsPage } from "@/components/Bearings";
import {
  parseChapterSegment,
  parseDivisionSegment,
} from "@/lib/place";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.listBooks().flatMap((book) => {
    const divisions = catalog.listDivisions(book.slug) ?? [];
    return divisions.flatMap((division) =>
      division.chapters.map((chapter) => ({
        book: book.slug,
        division:
          division.kind === "epilogue" ? "epilogue" : String(division.number),
        chapter: String(chapter),
      })),
    );
  });
}

async function loadBearings(params: {
  book: string;
  division: string;
  chapter: string;
}) {
  const division = parseDivisionSegment(params.division);
  const chapter = parseChapterSegment(params.chapter);
  if (!division || chapter === undefined) {
    return undefined;
  }
  const book = catalog.getBook(params.book);
  const place = catalog.resolvePlace(params.book, division, chapter);
  const bearings = catalog.bearings(params.book, division, chapter);
  const divisions = catalog.listDivisions(params.book);
  if (!book || !place || !bearings || !divisions) {
    return undefined;
  }
  return {
    book,
    place,
    bearings,
    divisions,
    previous: catalog.previousPlace(params.book, division, chapter),
    next: catalog.nextPlace(params.book, division, chapter),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string; division: string; chapter: string }>;
}): Promise<Metadata> {
  const page = await loadBearings(await params);
  if (!page) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }
  const title = `${page.book.title} · ${page.bearings.label}`;
  return {
    title,
    description: title,
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description: title,
    },
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ book: string; division: string; chapter: string }>;
}) {
  const page = await loadBearings(await params);
  if (!page) {
    notFound();
  }

  return (
    <BearingsPage
      book={page.book}
      place={page.place}
      bearings={page.bearings}
      divisions={page.divisions}
      previous={page.previous}
      next={page.next}
    />
  );
}
