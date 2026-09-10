import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// GET all portfolio categories
router.get("/", async (req, res) => {
  try {
    const categories = await prisma.portfolioCategory.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch portfolio categories" });
  }
});

// POST new portfolio category (Protected)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, items } = req.body;

    const category = await prisma.portfolioCategory.create({
      data: {
        name,
        items: {
          create: items || [],
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create portfolio category" });
  }
});

export default router;
