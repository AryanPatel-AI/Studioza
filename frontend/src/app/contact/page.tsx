"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/film/FilmGrain";
import { EditorialContactSection } from "@/components/editorial";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const requestedStyle = searchParams.get("style");

  return (
    <main className="flex-1">
      <EditorialContactSection initialStyle={requestedStyle ?? undefined} />
    </main>
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#080706] text-white flex flex-col relative selection:bg-amber-400 selection:text-black">
      <FilmGrain />
      <Navbar />
      <Suspense
        fallback={
          <div className="flex-1 py-40 text-center text-zinc-500 font-mono text-xs">
            Connecting to Atelier Dispatch...
          </div>
        }
      >
        <ContactPageContent />
      </Suspense>
      <Footer />
    </div>
  );
}

