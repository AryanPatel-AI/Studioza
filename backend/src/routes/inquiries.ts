import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// GET all inquiries (Protected)
router.get("/", requireAdmin, async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inquiries" });
  }
});

// POST new inquiry (Public)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        message,
      },
    });

    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to create inquiry" });
  }
});

// PATCH update inquiry status (Protected)
router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    res.json(inquiry);
  } catch (error) {
    res.status(500).json({ error: "Failed to update inquiry status" });
  }
});

export default router;
