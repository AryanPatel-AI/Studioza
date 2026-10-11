/**
 * Authentication and Session Management
 * Provides JWT-based token generation, HTTP-only cookie serialization, and role-based route guard helpers.
 */
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.AUTH_SECRET ||
  "studio-secret-key-change-in-production-33fa224c51d81dc977386cd4e655ba5bc24fde4dbb14b6ada3b979a23c5b10c2";

/** Cookie identifier for storing session JWT */
export const AUTH_COOKIE_NAME = "studio_session";

/** Session payload encoded inside JWT tokens */
export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
}

/** Signs a 7-day expiration JWT token for a given user payload */
export function signToken(payload: SessionPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

/** Verifies and decodes a session JWT, returning null if invalid or expired */
export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

/** Stores session JWT inside a secure HTTP-only cookie */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/** Clears the session cookie upon user logout */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  cookieStore.delete("admin-token"); // Clear legacy cookie if present
}

/** Reads the current session cookie, decodes the JWT, and fetches the User from DB */
export async function getSessionUser() {
  try {
    const cookieStore = await cookies();
    const token =
      cookieStore.get(AUTH_COOKIE_NAME)?.value ||
      cookieStore.get("admin-token")?.value;

    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload?.userId) return null;

    return await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
  } catch (err) {
    console.error("Error retrieving session user:", err);
    return null;
  }
}

/** Guard helper requiring an authenticated user; throws UNAUTHORIZED if unauthenticated */
export async function requireAuth() {
  const user = await getSessionUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

/** Guard helper requiring an administrator; throws UNAUTHORIZED or FORBIDDEN */
export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}
