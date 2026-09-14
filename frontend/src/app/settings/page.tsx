import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";
import AppShell from "@/components/layout/AppShell";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <AppShell user={user}>
      <SettingsClient user={user} />
    </AppShell>
  );
}
