/**
 * Legacy Admin Cookie Server Actions
 * Handles legacy administrative cookie lifecycle for backward compatibility with older portal routes.
 */
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/** Writes legacy admin token to an HTTP-only session cookie (1-day TTL) */
export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 day
  });
}

/** Deletes the legacy admin cookie and redirects back to the login interface */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/login");
}
