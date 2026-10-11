import { redirect } from "next/navigation";

export default async function JournalSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = await params;
  redirect(`/stories/${resolved.slug}`);
}
