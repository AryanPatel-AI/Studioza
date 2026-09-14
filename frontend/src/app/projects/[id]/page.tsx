import { notFound, redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import WorkspaceEditor from "@/components/workspace/WorkspaceEditor";

interface ProjectWorkspacePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectWorkspacePage({ params }: ProjectWorkspacePageProps) {
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

  // Authorization check: must be owner or admin
  if (project.ownerId !== user.id && user.role !== "admin") {
    redirect("/dashboard");
  }

  return <WorkspaceEditor project={project} />;
}
