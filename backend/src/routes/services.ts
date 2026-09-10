import { Router } from "express";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      include: {
        packages: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

// POST new service (Protected)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const { name, description, price, packages } = req.body;

    const service = await prisma.service.create({
      data: {
        name,
        description,
        price,
        packages: {
          create: packages || [],
        },
      },
      include: {
        packages: true,
      },
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: "Failed to create service" });
  }
});

export default router;
