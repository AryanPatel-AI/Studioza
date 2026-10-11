/**
 * Admin Seed Script
 * Creates or updates the default administrative user with hashed credentials for studio management.
 */
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@studio.com";
  const password = "password123";

  // Hash password using 10 bcrypt salt rounds
  const hashedPassword = await bcrypt.hash(password, 10);

  // Upsert ensures script is idempotent (safe to re-run)
  const admin = await prisma.user.upsert({
    where: { email },
    update: { password: hashedPassword, role: "admin" },
    create: { email, name: "Studio Admin", password: hashedPassword, role: "admin" },
  });

  console.log(`Admin user created/updated: ${admin.email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error("Failed to seed admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
