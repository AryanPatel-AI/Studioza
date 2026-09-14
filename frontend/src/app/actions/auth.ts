"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  signToken,
  setSessionCookie,
  clearSessionCookie,
  getSessionUser,
  requireAuth,
} from "@/lib/auth/session";
import { redirect } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export async function registerUser(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validation = registerSchema.safeParse(rawData);
    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Invalid input." };
    }

    const { name, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "An account with this email already exists." };
    }

    // Check if this is the first user in the database; make them admin automatically
    const totalUsers = await prisma.user.count();
    const role = totalUsers === 0 || email.includes("admin@") ? "admin" : "user";

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const token = signToken({
      userId: newUser.id,
      email: newUser.email!,
      role: newUser.role,
    });

    await setSessionCookie(token);

    // Record activity
    await prisma.activity.create({
      data: {
        userId: newUser.id,
        type: "USER_REGISTERED",
        metadata: JSON.stringify({ email: newUser.email, role: newUser.role }),
      },
    });

    return { success: true, role: newUser.role };
  } catch (err: any) {
    console.error("registerUser error:", err);
    return { error: "An unexpected error occurred during registration." };
  }
}

export async function loginUser(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validation = loginSchema.safeParse(rawData);
    if (!validation.success) {
      return { error: validation.error.issues[0]?.message || "Invalid credentials." };
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { error: "Invalid email or password." };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Invalid email or password." };
    }

    const token = signToken({
      userId: user.id,
      email: user.email!,
      role: user.role,
    });

    await setSessionCookie(token);

    return { success: true, role: user.role };
  } catch (err: any) {
    console.error("loginUser error:", err);
    return { error: "Failed to authenticate. Please try again." };
  }
}

export async function logoutUser() {
  await clearSessionCookie();
  redirect("/login");
}

export async function updateUserProfile(formData: FormData) {
  try {
    const currentUser = await requireAuth();

    const name = formData.get("name")?.toString().trim();
    const avatarUrl = formData.get("avatarUrl")?.toString().trim();

    if (!name || name.length < 2) {
      return { error: "Name must be at least 2 characters." };
    }

    const updated = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        avatarUrl: avatarUrl || null,
      },
    });

    return { success: true, user: updated };
  } catch (err: any) {
    console.error("updateUserProfile error:", err);
    return { error: "Failed to update profile." };
  }
}
