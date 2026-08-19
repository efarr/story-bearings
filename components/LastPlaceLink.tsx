"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { readLastPlace } from "@/lib/last-place";
import { placeHref } from "@/lib/place";

function subscribe() {
  return () => {};
}

export function LastPlaceLink({ slug }: { slug: string }) {
  const href = useSyncExternalStore(
    subscribe,
    () => {
      const place = readLastPlace(slug);
      return place ? placeHref(place) : "";
    },
    () => "",
  );

  if (!href) {
    return null;
  }

  return (
    <p className="font-sans text-sm text-[#5c5348]">
      <Link href={href} className="underline decoration-[#c4b8a4] underline-offset-4">
        Continue from last Place
      </Link>
    </p>
  );
}
