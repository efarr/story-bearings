import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import type { BearingsSample } from "./data";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const variantName = "Roster index";

export function VariantC({ data }: { data: BearingsSample }) {
  return (
    <div
      className={`${sans.className} min-h-screen flex-1 bg-[#11110f] text-[#ece7dc]`}
      style={{ colorScheme: "dark" }}
    >
      <div className="mx-auto max-w-[72rem] px-5 pb-28 pt-8 sm:px-8">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#2a2924] pb-6">
          <div>
            <p
              className={`${mono.className} text-[0.68rem] tracking-[0.28em] text-[#a39880] uppercase`}
            >
              {data.bookTitle}
            </p>
            <h1
              className={`${display.className} mt-2 text-[4.5rem] leading-none tracking-tight text-[#f3ead8] sm:text-[6rem]`}
            >
              II
              <span className="mx-3 text-[#5c574c]">·</span>
              4
            </h1>
          </div>
          <nav className={`${mono.className} flex items-center gap-6 text-sm text-[#cfc6b4]`}>
            <a href="#previous-place" className="hover:text-white">
              ← {data.previousLabel}
            </a>
            <a href="#next-place" className="hover:text-white">
              {data.nextLabel} →
            </a>
          </nav>
        </header>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
          <section>
            <h2
              className={`${mono.className} text-[0.68rem] tracking-[0.22em] text-[#a39880] uppercase`}
            >
              Roster
            </h2>
            <ul className="mt-4 divide-y divide-[#2a2924]">
              {data.roster.map((person, index) => (
                <li
                  key={person.name}
                  className="grid grid-cols-[2rem_minmax(0,14rem)_minmax(0,1fr)] gap-4 py-4 sm:grid-cols-[2.5rem_minmax(0,18rem)_minmax(0,1fr)]"
                >
                  <span
                    className={`${mono.className} pt-0.5 text-xs text-[#6d675c]`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-medium leading-snug text-[#f3ead8]">
                      {person.name}
                    </p>
                    {person.aliases.length > 0 && (
                      <p
                        className={`${mono.className} mt-1 text-[0.7rem] tracking-wide text-[#8d8574]`}
                      >
                        {person.aliases.join(" / ")}
                      </p>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-[#c4bba8]">
                    {person.role}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <aside className="lg:sticky lg:top-8">
            <h2
              className={`${mono.className} text-[0.68rem] tracking-[0.22em] text-[#a39880] uppercase`}
            >
              Orientation
            </h2>
            <div className="mt-4 space-y-4 border-l border-[#c4a35a] pl-4 text-[0.95rem] leading-[1.65] text-[#d8d0c0]">
              {data.orientation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p
              className={`${mono.className} mt-10 text-[0.68rem] leading-relaxed tracking-wide text-[#6d675c]`}
            >
              Complete roster lives on the Book landing — not here — so this
              page cannot opt the Reader out by accident.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
