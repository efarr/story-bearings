import type { Metadata } from "next";
import Link from "next/link";
import { catalog } from "@/catalog";

export const metadata: Metadata = {
  title: "Story Bearings",
  description: "Spoiler-safe bearings for dense novels.",
};

export default function Home() {
  const books = catalog.listBooks();

  return (
    <div className="min-h-screen flex-1 bg-[#f4efe4] px-6 py-16 text-[#2a241c] sm:px-8">
      <main className="mx-auto max-w-[40rem]">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Story Bearings
        </h1>
        <p className="font-sans mt-4 text-[0.95rem] leading-relaxed text-[#5c5348]">
          Set your Place in a Book and keep your bearings without being told
          what you have not yet read.
        </p>
        <ul className="mt-12 divide-y divide-[#e6dccf]">
          {books.map((book) => (
            <li key={book.slug} className="py-5">
              <Link
                href={`/${book.slug}`}
                className="text-xl font-semibold leading-snug"
              >
                {book.title}
              </Link>
              <p className="font-sans mt-1 text-sm text-[#7a6f62]">{book.author}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
