"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { VARIANT_META, type VariantKey } from "./data";

const KEYS: VariantKey[] = ["A", "B", "C"];

function cycle(current: VariantKey, delta: number): VariantKey {
  const i = KEYS.indexOf(current);
  return KEYS[(i + delta + KEYS.length) % KEYS.length];
}

export function PrototypeSwitcher({ current }: { current: VariantKey }) {
  const router = useRouter();
  const pathname = usePathname();

  function go(key: VariantKey) {
    router.replace(`${pathname}?variant=${key}`);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(cycle(current, -1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(cycle(current, 1));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, pathname, router]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-zinc-950 px-2 py-2 text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <button
          type="button"
          aria-label="Previous variant"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg hover:bg-white/10"
          onClick={() => go(cycle(current, -1))}
        >
          ←
        </button>
        <div className="min-w-[11rem] text-center text-sm font-medium tracking-wide">
          {current} — {VARIANT_META[current]}
        </div>
        <button
          type="button"
          aria-label="Next variant"
          className="flex h-9 w-9 items-center justify-center rounded-full text-lg hover:bg-white/10"
          onClick={() => go(cycle(current, 1))}
        >
          →
        </button>
      </div>
    </div>
  );
}
