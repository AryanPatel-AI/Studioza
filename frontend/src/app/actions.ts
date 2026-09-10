"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setAdminCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("admin_token", token, { 
    path: "/", 
    secure: process.env.NODE_ENV === "production", 
    httpOnly: true,
    maxAge: 60 * 60 * 24 // 1 day
  });
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  redirect("/login");
}
