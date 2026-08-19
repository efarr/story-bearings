import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.listBooks().map((book) => ({ book: book.slug }));
}

function warningTitle(bookTitle: string): string {
  return `Complete roster for ${bookTitle} — names people you may not have met`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string }>;
}): Promise<Metadata> {
  const { book: slug } = await params;
  const book = catalog.getBook(slug);
  if (!book) {
    return { title: "Not found", robots: { index: false, follow: false } };
  }
  const title = warningTitle(book.title);
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

export default async function CompleteRosterPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book: slug } = await params;
  const book = catalog.getBook(slug);
  const roster = catalog.completeRoster(slug);
  if (!book || !roster) {
    notFound();
  }

  return (
    <div className="min-h-screen flex-1 bg-[#f4efe4] px-6 py-16 font-serif text-[#2a241c] sm:px-8">
      <main className="mx-auto max-w-[40rem]">
        <p className="font-sans text-[0.7rem] tracking-[0.18em] text-[#7a6f62] uppercase">
          <Link
            href={`/${book.slug}`}
            className="underline decoration-[#c4b8a4] underline-offset-4"
          >
            {book.title}
          </Link>
        </p>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight">
          Complete roster
        </h1>
        <p className="font-sans mt-6 text-[0.95rem] leading-relaxed text-[#5c5348]">
          This page names the whole Book&apos;s key people and their final
          roles, including people and roles you may not have met. It leaves
          spoiler-safe Bearings.
        </p>
        <dl className="mt-10 divide-y divide-[#e6dccf]">
          {roster.map((person) => (
            <div key={person.name} className="py-5">
              <dt className="text-[1.05rem] font-semibold leading-snug">
                {person.name}
              </dt>
              <dd className="font-sans mt-1.5 text-[0.95rem] leading-relaxed text-[#5c5348]">
                {person.finalRole}
              </dd>
            </div>
          ))}
        </dl>
      </main>
    </div>
  );
}
