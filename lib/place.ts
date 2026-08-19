import type { DivisionOutline, DivisionRef, PlaceRef } from "@/catalog";

export function divisionSegment(division: DivisionRef): string {
  return division.kind === "epilogue" ? "epilogue" : String(division.number);
}

export function parseDivisionSegment(segment: string): DivisionRef | undefined {
  if (segment === "epilogue") {
    return { kind: "epilogue" };
  }
  if (/^[1-9]\d*$/.test(segment)) {
    return { kind: "part", number: Number(segment) };
  }
  return undefined;
}

export function parseChapterSegment(segment: string): number | undefined {
  if (/^[1-9]\d*$/.test(segment)) {
    return Number(segment);
  }
  return undefined;
}

export function placeHref(place: PlaceRef): string {
  return `/${place.slug}/${divisionSegment(place.division)}/${place.chapter}`;
}

export function completeRosterHref(slug: string): string {
  return `/${slug}/complete-roster`;
}

export function divisionLabel(division: DivisionOutline | DivisionRef): string {
  return division.kind === "epilogue" ? "Epilogue" : `Part ${division.number}`;
}

export function divisionRefOf(
  division: DivisionOutline,
): DivisionRef {
  return division.kind === "epilogue"
    ? { kind: "epilogue" }
    : { kind: "part", number: division.number };
}

export function outlineKey(division: DivisionOutline | DivisionRef): string {
  return divisionSegment(
    division.kind === "epilogue"
      ? { kind: "epilogue" }
      : { kind: "part", number: division.number },
  );
}
