import Link from "next/link";
import type { Bearings, DivisionOutline, ListedBook, PlaceRef } from "@/catalog";
import { RememberPlace } from "@/components/RememberPlace";
import { PlacePicker } from "@/components/PlacePicker";
import { placeHref } from "@/lib/place";

function PlaceLinks({
  previous,
  next,
}: {
  previous?: PlaceRef;
  next?: PlaceRef;
}) {
  return (
    <nav className="font-sans mt-12 flex items-baseline justify-between text-[0.95rem] text-[#5c5348]">
      {previous ? (
        <Link
          href={placeHref(previous)}
          prefetch={false}
          className="underline decoration-[#c4b8a4] underline-offset-4"
        >
          Previous
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={placeHref(next)}
          prefetch={false}
          className="underline decoration-[#c4b8a4] underline-offset-4"
        >
          Next
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

function RosterList({ roster }: { roster: Bearings["roster"] }) {
  return (
    <dl className="mt-6 divide-y divide-[#e6dccf]">
      {roster.map((person) => (
        <div key={person.name} className="py-5">
          <dt className="text-[1.05rem] font-semibold leading-snug">
            {person.name}
            {person.aliases.length > 0 && (
              <span className="ml-2 font-sans font-normal text-[0.85rem] text-[#7a6f62]">
                {person.aliases.join(", ")}
              </span>
            )}
          </dt>
          <dd className="font-sans mt-1.5 text-[0.95rem] leading-relaxed text-[#5c5348]">
            {person.role}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function BearingsPage({
  book,
  place,
  bearings,
  divisions,
  previous,
  next,
}: {
  book: ListedBook;
  place: PlaceRef;
  bearings: Bearings;
  divisions: DivisionOutline[];
  previous?: PlaceRef;
  next?: PlaceRef;
}) {
  const paragraphs = bearings.orientation
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div
      className="min-h-screen flex-1 bg-[#f4efe4] font-serif text-[#2a241c]"
      style={{ colorScheme: "light" }}
    >
      <RememberPlace
        slug={place.slug}
        divisionKind={place.division.kind}
        divisionNumber={
          place.division.kind === "part" ? place.division.number : undefined
        }
        chapter={place.chapter}
      />
      <div className="mx-auto grid max-w-[88rem] grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)_20rem]">
        <aside className="hidden border-[#d9cfc0] px-5 py-6 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r">
          <Link
            href={`/${book.slug}`}
            className="font-sans text-[0.7rem] tracking-[0.18em] text-[#7a6f62] uppercase"
          >
            {book.title}
          </Link>
          <div className="mt-8">
            <PlacePicker
              slug={book.slug}
              divisions={divisions}
              current={{ division: place.division, chapter: place.chapter }}
              variant="rail"
            />
          </div>
          <PlaceLinks previous={previous} next={next} />
        </aside>

        <main className="px-6 pb-8 pt-10 sm:px-8 sm:pt-16 lg:px-10 lg:py-12">
          <header className="font-sans text-[0.7rem] tracking-[0.18em] text-[#7a6f62] uppercase lg:hidden">
            <Link href={`/${book.slug}`}>{book.title}</Link>
          </header>
          <p className="mt-10 text-[0.8rem] tracking-[0.22em] text-[#8a7d6c] uppercase lg:mt-0">
            {bearings.label}
          </p>
          <div className="mt-8 max-w-[40rem] space-y-5 text-[1.125rem] leading-[1.7] text-[#2f281f]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </main>

        <aside className="px-6 pb-8 sm:px-8 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-l lg:border-[#d9cfc0] lg:px-5 lg:py-6">
          <h2 className="font-sans text-[0.7rem] tracking-[0.22em] text-[#7a6f62] uppercase">
            Roster
          </h2>
          <RosterList roster={bearings.roster} />
        </aside>

        <div className="px-6 pb-28 sm:px-8 lg:hidden">
          <PlaceLinks previous={previous} next={next} />
        </div>
      </div>
    </div>
  );
}
