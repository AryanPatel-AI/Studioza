import type { Metadata } from "next";
import "./globals.css";
import { AtelierTransitionProvider } from "@/components/transitions";
import LenisProvider from "@/components/ui/LenisProvider";

export const metadata: Metadata = {
  title: "Studioza — Digital Photography Magazine & Creative Atelier",
  description:
    "An editorial photography studio platform operating at the intersection of cinematic storytelling, medium-format discipline, and digital architecture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <LenisProvider>
          <AtelierTransitionProvider>{children}</AtelierTransitionProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

