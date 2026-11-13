import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { oskayiSuiteService } from "./src/server/oskayiSuiteService";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "25mb" }));

  // Health & Config Check
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "oskayi-consult-suite", timestamp: new Date().toISOString() });
  });

  app.get("/api/paystack/config", (_req, res) => {
    const rawKey = (process.env.VITE_PAYSTACK_PUBLIC_KEY || process.env.PAYSTACK_PUBLIC_KEY || "").trim();
    const publicKey = rawKey.startsWith("pk_") ? rawKey : "";
    res.json({
      publicKey,
      currency: "USD",
    });
  });

  app.post("/api/paystack/verify", (req, res) => {
    try {
      const result = oskayiSuiteService.recordPaystackPayment(req.body || {});
      res.json({ success: true, ...result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // 1. OSKAYI HOUSE GENERATED
  // ==========================================
  app.get("/api/house-plans/presets", (_req, res) => {
    res.json(oskayiSuiteService.getDemoHouses());
  });

  app.get("/api/house-plans/my-plans", (_req, res) => {
    res.json(oskayiSuiteService.getSavedHousePlans());
  });

  app.post("/api/house-plans/generate", (req, res) => {
    try {
      const plan = oskayiSuiteService.generateHousePlan(req.body || {});
      res.json({ success: true, plan });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // 2. OSKAYI HOUSE COST KILLER
  // ==========================================
  app.get("/api/cost-killer/materials", (_req, res) => {
    res.json(oskayiSuiteService.getMaterialsCatalog());
  });

  app.post("/api/cost-killer/analyze", async (req, res) => {
    try {
      const report = await oskayiSuiteService.analyzeBoqCostKiller(req.body || {});
      res.json({ success: true, report });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // 3. OSKAYI BEFORE & AFTER RENOVATION
  // ==========================================
  app.post("/api/renovation/generate", async (req, res) => {
    try {
      const result = await oskayiSuiteService.generateRenovationPlan(req.body || {});
      res.json({ success: true, result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // 4. SMART CITY PLANNER
  // ==========================================
  app.post("/api/smart-city/generate", (req, res) => {
    try {
      const { landAcres } = req.body || {};
      const plan = oskayiSuiteService.generateSmartCityMasterPlan(Number(landAcres) || 50);
      res.json({ success: true, plan });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // ==========================================
  // 5. AI INFLUENCER CLONE
  // ==========================================
  app.post("/api/influencer/generate-batch", async (req, res) => {
    try {
      const batch = await oskayiSuiteService.generateInfluencerBatch(req.body || {});
      res.json({ success: true, ...batch });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // Vite middleware for development / static serving for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Oskayi Consult server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
