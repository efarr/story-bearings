import type { Metadata } from "next";
import { PrototypeSwitcher } from "./PrototypeSwitcher";
import { sample, VARIANT_META, type VariantKey } from "./data";
import { VariantA } from "./VariantA";
import { VariantB } from "./VariantB";
import { VariantC } from "./VariantC";

// Three variants of the Bearings page, switchable via ?variant=,
// on throwaway route /prototype/bearings.

export const metadata: Metadata = {
  title: "Crime and Punishment · Part II, Chapter 4",
  robots: { index: false, follow: false },
};

function parseVariant(value: string | string[] | undefined): VariantKey {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "B" || raw === "C") return raw;
  return "A";
}

export default async function PrototypeBearingsPage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string | string[] }>;
}) {
  const variant = parseVariant((await searchParams).variant);

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
