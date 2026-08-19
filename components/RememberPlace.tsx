"use client";

import { useEffect } from "react";
import { writeLastPlace } from "@/lib/last-place";

export function RememberPlace({
  slug,
  divisionKind,
  divisionNumber,
  chapter,
}: {
  slug: string;
  divisionKind: "part" | "epilogue";
  divisionNumber?: number;
  chapter: number;
}) {
  useEffect(() => {
    writeLastPlace({
      slug,
      division:
        divisionKind === "epilogue"
          ? { kind: "epilogue" }
          : { kind: "part", number: divisionNumber ?? 1 },
      chapter,
    });
  }, [slug, divisionKind, divisionNumber, chapter]);
  return null;
}
