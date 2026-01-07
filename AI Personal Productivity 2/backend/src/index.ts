import express from "express";
import { google } from "googleapis";
import { getOAuthClient, GMAIL_SCOPES } from "./integrations/googleAuth";

import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { inferContexts } from "./services/contextInference";
import { buildRecommendation } from "./services/recommendation";
import { buildInsights } from "./services/insights";
import { ActivityEvent } from "./types";
import { ingestAllSources } from "./ingestion/ingest";
import { analyzeCriticalItems } from "./services/criticalAnalysis";


dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/api/events", async (_req, res) => {
  // Now fetching from all sources + inferring similarity scores
  const rawEvents = await ingestAllSources(prisma);
  const { enrichedEvents } = await inferContexts(rawEvents);

  res.json({ events: enrichedEvents });
});

app.post("/api/events", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const event = await prisma.event.create({
      data: {
        userId: "user-1", // Simplified for hackathon
        type: "task",
        title,
        timestamp: new Date(),
        metadata: { status: "todo", manual: true },
      },
    });

    res.json(event);
  } catch (err) {
    console.error("Failed to create task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.get("/api/contexts", async (_req, res) => {
  const events: ActivityEvent[] = await ingestAllSources(prisma);
  const { contexts } = await inferContexts(events);
  res.json({ contexts });
});

app.get("/api/recommendation", async (_req, res) => {
  const events: ActivityEvent[] = await ingestAllSources(prisma);
  const { contexts } = await inferContexts(events);
  const rec = await buildRecommendation(contexts, events);
  res.json(rec);
});

app.get("/api/insights", async (_req, res) => {
  const events: ActivityEvent[] = await ingestAllSources(prisma);
  const { contexts } = await inferContexts(events);
  const insights = buildInsights(events, contexts);
  res.json(insights);
});

app.get("/api/analysis", async (_req, res) => {
  const events = await ingestAllSources(prisma);
  const analysis = await analyzeCriticalItems(events);
  res.json(analysis);
});
// =====================
// Google OAuth (Gmail)
// =====================

app.get("/auth/google", (_req, res) => {
  const auth = getOAuthClient();
  const url = auth.generateAuthUrl({
    access_type: "offline",
    scope: GMAIL_SCOPES,
    prompt: "consent",
  });
  res.redirect(url);
});

app.get("/auth/google/callback", async (req, res) => {
  try {
    const code = req.query.code as string;
    const auth = getOAuthClient();

    const { tokens } = await auth.getToken(code);
    auth.setCredentials(tokens);

    // Hackathon-safe: store in memory
    (global as any).googleAuth = auth;

    // Redirect back to frontend
    res.redirect("http://localhost:3000");
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).send("OAuth failed");
  }
});

app.get("/api/auth/status", (req, res) => {
  const g = (global as any).googleAuth;
  res.json({ authenticated: !!g });
});


app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
