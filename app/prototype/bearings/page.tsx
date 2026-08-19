import type { Metadata } from "next";
import { Suspense } from "react";
import { PrototypeBearings } from "./PrototypeBearings";

export const metadata: Metadata = {
  title: "Crime and Punishment · Part II, Chapter 4",
  robots: { index: false, follow: false },
};

export default function PrototypeBearingsPage() {
  return (
    <Suspense fallback={null}>
      <PrototypeBearings />
    </Suspense>
  );
}
