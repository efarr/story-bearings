"use client";

import { useSearchParams } from "next/navigation";
import { PrototypeSwitcher } from "./PrototypeSwitcher";
import { sample, VARIANT_META, type VariantKey } from "./data";
import { VariantA } from "./VariantA";
import { VariantB } from "./VariantB";
import { VariantC } from "./VariantC";

function parseVariant(value: string | null): VariantKey {
  if (value === "B" || value === "C") return value;
  return "A";
}

export function PrototypeBearings() {
  const variant = parseVariant(useSearchParams().get("variant"));

  return (
    <>
      {variant === "A" && <VariantA data={sample} />}
      {variant === "B" && <VariantB data={sample} />}
      {variant === "C" && <VariantC data={sample} />}
      {process.env.NODE_ENV !== "production" && (
        <PrototypeSwitcher current={variant} />
      )}
      <p className="sr-only">
        Prototype state: variant {variant} {VARIANT_META[variant]}. Place:{" "}
        {sample.placeLabel}. Book: {sample.bookTitle}.
      </p>
    </>
  );
}
