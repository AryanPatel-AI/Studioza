import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/layout/AppShell";
import AssetsClient from "./AssetsClient";

export default async function AssetsPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const assets = await prisma.asset.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      project: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  return (
    <AppShell user={user}>
      <AssetsClient assets={assets} />
    </AppShell>
  );
}
