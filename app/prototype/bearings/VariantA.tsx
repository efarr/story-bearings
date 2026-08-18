import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import type { BearingsSample } from "./data";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const variantName = "Essay column";

export function VariantA({ data }: { data: BearingsSample }) {
  return (
    <div
      className={`${serif.className} min-h-screen flex-1 bg-[#f4efe4] text-[#2a241c]`}
      style={{ colorScheme: "light" }}
    >
      <div className="mx-auto flex max-w-[40rem] flex-col px-6 pb-28 pt-10 sm:px-8 sm:pt-16">
        <header className={`${sans.className} text-[0.7rem] tracking-[0.18em] text-[#7a6f62] uppercase`}>
          <p>{data.bookTitle}</p>
        </header>

        <p className="mt-10 text-[0.8rem] tracking-[0.22em] text-[#8a7d6c] uppercase">
          {data.divisionLabel}
          <span className="mx-3 text-[#c4b8a4]">·</span>
          {data.chapterLabel}
        </p>

        <div className="mt-8 space-y-5 text-[1.125rem] leading-[1.7] text-[#2f281f]">
          {data.orientation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <hr className="mt-12 border-0 border-t border-[#d9cfc0]" />

        <h2
          className={`${sans.className} mt-10 text-[0.7rem] tracking-[0.22em] text-[#7a6f62] uppercase`}
        >
          Roster
        </h2>

        <dl className="mt-6 divide-y divide-[#e6dccf]">
          {data.roster.map((person) => (
            <div key={person.name} className="py-5">
              <dt className="text-[1.05rem] font-semibold leading-snug">
                {person.name}
                {person.aliases.length > 0 && (
                  <span className={`${sans.className} ml-2 font-normal text-[0.85rem] text-[#7a6f62]`}>
                    {person.aliases.join(", ")}
                  </span>
                )}
              </dt>
              <dd className={`${sans.className} mt-1.5 text-[0.95rem] leading-relaxed text-[#5c5348]`}>
                {person.role}
              </dd>
            </div>
          ))}
        </dl>

        <nav
          className={`${sans.className} mt-12 flex items-baseline justify-between text-[0.95rem] text-[#5c5348]`}
        >
          <a href="#previous-place" className="underline decoration-[#c4b8a4] underline-offset-4">
            {data.previousLabel}
          </a>
          <a href="#next-place" className="underline decoration-[#c4b8a4] underline-offset-4">
            {data.nextLabel}
          </a>
        </nav>

        <p className={`${sans.className} mt-10 text-xs leading-relaxed text-[#9a8e80]`}>
          <a href="#complete-roster" className="underline underline-offset-2">
            Complete roster
          </a>
          {" — "}
          names the whole Book&apos;s key people and their final roles. Opening it
          leaves spoiler-safe Bearings.
        </p>
      </div>
    </div>
  );
}
