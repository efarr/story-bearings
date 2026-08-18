import { IBM_Plex_Sans } from "next/font/google";
import type { BearingsSample } from "./data";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const variantName = "Split pane";

export function VariantB({ data }: { data: BearingsSample }) {
  return (
    <div
      className={`${sans.className} min-h-screen flex-1 bg-[#f3f5f7] text-[#1b242c]`}
      style={{ colorScheme: "light" }}
    >
      <div className="mx-auto grid max-w-[88rem] gap-0 lg:grid-cols-[16rem_minmax(0,1fr)_20rem]">
        <aside className="border-b border-[#d8dee4] bg-white px-5 py-6 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
          <p className="text-[0.7rem] font-medium tracking-[0.16em] text-[#6b7784] uppercase">
            Story Bearings
          </p>
          <h1 className="mt-3 text-xl font-semibold leading-tight tracking-tight">
            {data.bookTitle}
          </h1>
          <p className="mt-1 text-sm text-[#5c6a78]">{data.author}</p>

          <div className="mt-8 space-y-4">
            <label className="block">
              <span className="text-[0.7rem] font-medium tracking-[0.14em] text-[#6b7784] uppercase">
                Part
              </span>
              <select
                defaultValue={data.divisionLabel}
                className="mt-1.5 w-full rounded border border-[#cfd6dd] bg-white px-2 py-2 text-sm"
              >
                <option>Part I</option>
                <option>Part II</option>
                <option>Part III</option>
                <option>Part IV</option>
                <option>Part V</option>
                <option>Part VI</option>
                <option>Epilogue</option>
              </select>
            </label>
            <label className="block">
              <span className="text-[0.7rem] font-medium tracking-[0.14em] text-[#6b7784] uppercase">
                Chapter
              </span>
              <select
                defaultValue={data.chapterLabel}
                className="mt-1.5 w-full rounded border border-[#cfd6dd] bg-white px-2 py-2 text-sm"
              >
                <option>Chapter 1</option>
                <option>Chapter 2</option>
                <option>Chapter 3</option>
                <option>Chapter 4</option>
                <option>Chapter 5</option>
                <option>Chapter 6</option>
                <option>Chapter 7</option>
              </select>
            </label>
          </div>

          <div className="mt-8 flex gap-2">
            <a
              href="#previous-place"
              className="flex-1 rounded border border-[#cfd6dd] px-3 py-2 text-center text-sm text-[#3d4a57]"
            >
              Previous
            </a>
            <a
              href="#next-place"
              className="flex-1 rounded bg-[#1b242c] px-3 py-2 text-center text-sm text-white"
            >
              Next
            </a>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-[#6b7784]">
            Linear. Does not wrap. Currently {data.placeLabel}.
          </p>
        </aside>

        <main className="px-5 py-8 sm:px-10 sm:py-12">
          <p className="text-[0.7rem] font-medium tracking-[0.16em] text-[#6b7784] uppercase">
            Bearings
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            {data.placeLabel}
          </h2>
          <div className="mt-8 max-w-[38rem] space-y-5 text-[1.05rem] leading-[1.7] text-[#24303a]">
            {data.orientation.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </main>

        <aside className="border-t border-[#d8dee4] bg-white px-5 py-6 pb-28 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-l lg:border-t-0 lg:pb-6">
          <h2 className="text-[0.7rem] font-medium tracking-[0.16em] text-[#6b7784] uppercase">
            Roster through this Place
          </h2>
          <ol className="mt-5 space-y-4">
            {data.roster.map((person) => (
              <li key={person.name} className="rounded-lg bg-[#f3f5f7] px-3 py-3">
                <p className="text-sm font-semibold leading-snug">{person.name}</p>
                {person.aliases.length > 0 && (
                  <p className="mt-0.5 text-xs text-[#6b7784]">
                    {person.aliases.join(" · ")}
                  </p>
                )}
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-[#3d4a57]">
                  {person.role}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-lg border border-[#e2b86a] bg-[#fff8e8] px-3 py-3 text-[0.8rem] leading-relaxed text-[#5a4a22]">
            <p className="font-semibold">Complete roster</p>
            <p className="mt-1">
              A separate page. It names the whole Book&apos;s key people and
              their final roles. Opening it leaves spoiler-safe Bearings.
            </p>
            <a
              href="#complete-roster"
              className="mt-2 inline-block font-medium underline underline-offset-2"
            >
              Open anyway
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
