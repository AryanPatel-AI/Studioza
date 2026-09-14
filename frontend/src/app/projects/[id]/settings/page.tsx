import { redirect, notFound } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import AppShell from "@/components/layout/AppShell";
import ProjectSettingsClient from "./ProjectSettingsClient";

interface ProjectSettingsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectSettingsPage({ params }: ProjectSettingsPageProps) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  if (project.ownerId !== user.id && user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <AppShell user={user}>
      <ProjectSettingsClient project={project} />
    </AppShell>
  );
}
