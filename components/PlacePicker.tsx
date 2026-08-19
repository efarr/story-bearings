"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DivisionOutline, DivisionRef } from "@/catalog";
import {
  divisionLabel,
  divisionRefOf,
  outlineKey,
  placeHref,
} from "@/lib/place";

export function PlacePicker({
  slug,
  divisions,
  current,
  variant,
}: {
  slug: string;
  divisions: DivisionOutline[];
  current?: { division: DivisionRef; chapter: number };
  variant: "landing" | "rail";
}) {
  const router = useRouter();
  const first = divisions[0];
  const initialDivision = current
    ? (divisions.find((division) => outlineKey(division) === outlineKey(current.division)) ??
      first)
    : first;
  const [divisionKey, setDivisionKey] = useState(
    initialDivision ? outlineKey(initialDivision) : "",
  );
  const selected =
    divisions.find((division) => outlineKey(division) === divisionKey) ?? first;
  const [chapter, setChapter] = useState(
    current?.chapter ?? selected?.chapters[0] ?? 1,
  );

  const chapters = selected?.chapters ?? [];
  const chapterValue = chapters.includes(chapter)
    ? chapter
    : (chapters[0] ?? 1);

  function go(division: DivisionOutline, nextChapter: number) {
    router.push(
      placeHref({
        slug,
        division: divisionRefOf(division),
        chapter: nextChapter,
      }),
    );
  }

  if (!selected) {
    return null;
  }

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        go(selected, chapterValue);
      }}
    >
      <label className="block">
        <span className="font-sans text-[0.7rem] font-medium tracking-[0.14em] text-[#7a6f62] uppercase">
          Part or epilogue
        </span>
        <select
          className="mt-1.5 w-full rounded border border-[#d9cfc0] bg-[#faf6ee] px-2 py-2 font-sans text-sm text-[#2a241c]"
          value={outlineKey(selected)}
          onChange={(event) => {
            const next =
              divisions.find(
                (division) => outlineKey(division) === event.target.value,
              ) ?? selected;
            setDivisionKey(outlineKey(next));
            const nextChapter = next.chapters.includes(chapterValue)
              ? chapterValue
              : (next.chapters[0] ?? 1);
            setChapter(nextChapter);
            if (variant === "rail") {
              go(next, nextChapter);
            }
          }}
        >
          {divisions.map((division) => (
            <option key={outlineKey(division)} value={outlineKey(division)}>
              {divisionLabel(division)}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="font-sans text-[0.7rem] font-medium tracking-[0.14em] text-[#7a6f62] uppercase">
          Chapter
        </span>
        <select
          className="mt-1.5 w-full rounded border border-[#d9cfc0] bg-[#faf6ee] px-2 py-2 font-sans text-sm text-[#2a241c]"
          value={chapterValue}
          onChange={(event) => {
            const nextChapter = Number(event.target.value);
            setChapter(nextChapter);
            if (variant === "rail") {
              go(selected, nextChapter);
            }
          }}
        >
          {chapters.map((entry) => (
            <option key={entry} value={entry}>
              Chapter {entry}
            </option>
          ))}
        </select>
      </label>
      {variant === "landing" && (
        <button
          type="submit"
          className="font-sans text-sm text-[#5c5348] underline decoration-[#c4b8a4] underline-offset-4"
        >
          Open Bearings
        </button>
      )}
    </form>
  );
}
