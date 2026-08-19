import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catalog } from "@/catalog";
import { LastPlaceLink } from "@/components/LastPlaceLink";
import { PlacePicker } from "@/components/PlacePicker";

export const dynamicParams = false;

export function generateStaticParams() {
  return catalog.listBooks().map((book) => ({ book: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ book: string }>;
}): Promise<Metadata> {
  const { book: slug } = await params;
  const book = catalog.getBook(slug);
  if (!book) {
    return { title: "Not found" };
  }
  return {
    title: book.title,
    description: book.title,
    openGraph: {
      title: book.title,
      description: book.title,
    },
  };
}

export default async function BookLandingPage({
  params,
}: {
  params: Promise<{ book: string }>;
}) {
  const { book: slug } = await params;
  const book = catalog.getBook(slug);
  const divisions = catalog.listDivisions(slug);
  if (!book || !divisions) {
    notFound();
  }

  return (
    <div className="min-h-screen flex-1 bg-[#f4efe4] px-6 py-16 text-[#2a241c] sm:px-8">
      <main className="mx-auto max-w-[40rem]">
        <p className="font-sans text-[0.7rem] tracking-[0.18em] text-[#7a6f62] uppercase">
          <Link href="/" className="underline decoration-[#c4b8a4] underline-offset-4">
            Story Bearings
          </Link>
        </p>
        <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight">
          {book.title}
        </h1>
        <p className="font-sans mt-2 text-sm text-[#7a6f62]">{book.author}</p>
        <p className="mt-8 text-[1.125rem] leading-[1.7] text-[#2f281f]">
          {book.landing}
        </p>
        <div className="mt-10 max-w-sm">
          <PlacePicker slug={book.slug} divisions={divisions} variant="landing" />
        </div>
        <div className="mt-8">
          <LastPlaceLink slug={book.slug} />
        </div>
      </main>
    </div>
  );
}
