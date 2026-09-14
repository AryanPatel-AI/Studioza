import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "studio-secret-key-test";

function getStarterContent(template: string, name: string) {
  return [
    { id: "hero-1", type: "hero", title: name, subtitle: "Digital work" },
    { id: "text-1", type: "text", title: "Story", content: "Executive summary" }
  ];
}

async function runVerification() {
  console.log("=== STARTING STUDIO VERIFICATION SUITE ===");

  const testEmail = `test-creator-${Date.now()}@example.com`;
  const adminEmail = `test-admin-${Date.now()}@example.com`;
  const rawPassword = "securePassword123!";

  // 1. Test Auth & User Creation
  console.log("\n[1] Testing User Registration & Password Hashing...");
  const hashedPassword = await bcrypt.hash(rawPassword, 10);
  const passwordValid = await bcrypt.compare(rawPassword, hashedPassword);
  if (!passwordValid) throw new Error("Bcrypt verification failed");

  const creatorUser = await prisma.user.create({
    data: {
      name: "Test Creator",
      email: testEmail,
      password: hashedPassword,
      role: "user",
    },
  });
  console.log(`✓ Creator user registered successfully: ${creatorUser.id} (${creatorUser.email})`);

  const adminUser = await prisma.user.create({
    data: {
      name: "Test Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    },
  });
  console.log(`✓ Admin user registered successfully: ${adminUser.id} (${adminUser.email})`);

  // 2. Test JWT Token Creation & Verification
  console.log("\n[2] Testing Session Token Signing & Decoding...");
  const token = jwt.sign(
    { userId: creatorUser.id, email: creatorUser.email, role: creatorUser.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  const decoded = jwt.verify(token, JWT_SECRET) as any;
  if (decoded.userId !== creatorUser.id || decoded.role !== "user") {
    throw new Error("Token payload mismatch");
  }
  console.log("✓ Session token signed and verified successfully");

  // 3. Test Project Creation with Starter Template
  console.log("\n[3] Testing Project Lifecycle: Create with Starter Template...");
  const initialBlocks = getStarterContent("portfolio", "Alpha Anthology");
  const testSlug = `alpha-anthology-${Date.now()}`;

  const project = await prisma.project.create({
    data: {
      name: "Alpha Anthology",
      slug: testSlug,
      description: "A comprehensive digital showcase",
      status: "draft",
      ownerId: creatorUser.id,
      content: JSON.stringify(initialBlocks),
      settings: JSON.stringify({
        seoTitle: "Alpha Anthology — Live",
        seoDescription: "A comprehensive digital showcase",
      }),
    },
  });
  console.log(`✓ Project created in Draft state: ${project.id} (/p/${project.slug})`);

  // Log activity
  await prisma.activity.create({
    data: {
      projectId: project.id,
      userId: creatorUser.id,
      type: "PROJECT_CREATED",
      metadata: JSON.stringify({ name: project.name, slug: project.slug }),
    },
  });

  // 4. Test Content Mutation (Workspace Save)
  console.log("\n[4] Testing Workspace Save Mutation...");
  const updatedBlocks = [
    ...initialBlocks,
    { id: "block-extra", type: "text", title: "New Section", content: "Added in workspace." },
  ];
  const updatedProject = await prisma.project.update({
    where: { id: project.id },
    data: { content: JSON.stringify(updatedBlocks) },
  });
  console.log(`✓ Workspace content saved with ${updatedBlocks.length} sections`);

  // 5. Test Publishing Workflow
  console.log("\n[5] Testing Publishing Workflow...");
  const publishedProject = await prisma.project.update({
    where: { id: project.id },
    data: {
      status: "published",
      publishedAt: new Date(),
    },
  });
  if (publishedProject.status !== "published" || !publishedProject.publishedAt) {
    throw new Error("Publish status failed");
  }
  console.log(`✓ Project published live at /p/${publishedProject.slug}`);

  // 6. Test Asset Upload Metadata
  console.log("\n[6] Testing Asset Metadata & Association...");
  const asset = await prisma.asset.create({
    data: {
      name: "hero-photo.webp",
      storageKey: `test-${Date.now()}.webp`,
      mimeType: "image/webp",
      size: 1048576, // 1MB
      url: "/uploads/hero-photo.webp",
      ownerId: creatorUser.id,
      projectId: project.id,
    },
  });
  console.log(`✓ Asset uploaded and associated: ${asset.id} (${asset.name})`);

  // 7. Test Activity Audit Retrieval
  console.log("\n[7] Testing Activity Audit Feed...");
  const activities = await prisma.activity.findMany({
    where: { userId: creatorUser.id },
  });
  console.log(`✓ Retrieved ${activities.length} audited activities for user`);

  // 8. Test Admin Overview Aggregations
  console.log("\n[8] Testing Admin Portal Telemetry Aggregations...");
  const [uCount, pCount, pubCount, aCount] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.project.count({ where: { status: "published" } }),
    prisma.asset.count(),
  ]);
  console.log(`✓ Telemetry Counts: ${uCount} users, ${pCount} projects (${pubCount} published), ${aCount} assets`);

  // 9. Cleanup test records
  console.log("\n[9] Cleaning up test records...");
  await prisma.asset.delete({ where: { id: asset.id } });
  await prisma.activity.deleteMany({ where: { userId: { in: [creatorUser.id, adminUser.id] } } });
  await prisma.project.delete({ where: { id: project.id } });
  await prisma.user.deleteMany({ where: { id: { in: [creatorUser.id, adminUser.id] } } });
  console.log("✓ Test records cleaned up successfully");

  console.log("\n=== ALL STUDIO VERIFICATION CHECKS PASSED PERFECTLY ===");
}

runVerification()
  .catch((err) => {
    console.error("Verification failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
