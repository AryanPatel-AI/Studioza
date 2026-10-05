import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const title = resolvedParams.slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `${title} | Studioza Atelier`,
    description: `Explore the project: ${title} in the Studioza Atelier archive.`,
    openGraph: {
      title: `${title} | Studioza Atelier`,
      description: `Explore the project: ${title} in the Studioza Atelier archive.`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
