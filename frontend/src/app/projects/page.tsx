import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/layout/AppShell";
import ProjectListClient from "./ProjectListClient";

export default async function ProjectsPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  return (
    <AppShell user={user}>
      <ProjectListClient initialProjects={projects} />
    </AppShell>
  );
}
