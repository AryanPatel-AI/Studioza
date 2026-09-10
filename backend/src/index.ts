import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import servicesRoutes from "./routes/services";
import portfolioRoutes from "./routes/portfolio";
import inquiriesRoutes from "./routes/inquiries";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin/auth", authRoutes);
app.use("/api/admin/services", servicesRoutes);
app.use("/api/admin/portfolio", portfolioRoutes);
app.use("/api/admin/inquiries", inquiriesRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
