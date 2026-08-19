import type { PlaceRef } from "@/catalog";
import {
  divisionSegment,
  parseChapterSegment,
  parseDivisionSegment,
} from "./place";

export function lastPlaceCookieName(slug: string): string {
  return `place.${slug}`;
}

export function writeLastPlace(place: PlaceRef): void {
  const value = `${divisionSegment(place.division)}/${place.chapter}`;
  document.cookie = `${lastPlaceCookieName(place.slug)}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function readLastPlace(slug: string): PlaceRef | undefined {
  const prefix = `${lastPlaceCookieName(slug)}=`;
  const raw = document.cookie
    .split("; ")
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);
  if (!raw) {
    return undefined;
  }
  const [divisionValue, chapterValue] = raw.split("/");
  const division = parseDivisionSegment(divisionValue ?? "");
  const chapter = parseChapterSegment(chapterValue ?? "");
  if (!division || chapter === undefined) {
    return undefined;
  }
  return { slug, division, chapter };
}
