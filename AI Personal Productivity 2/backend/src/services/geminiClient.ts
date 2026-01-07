import { GoogleGenerativeAI } from "@google/generative-ai";
import { createHash } from "crypto";

const geminiKey = process.env.GEMINI_API_KEY || "";
const genAI = geminiKey ? new GoogleGenerativeAI(geminiKey) : null;

export async function askGemini(prompt: string): Promise<string | null> {
  if (!genAI) return null;
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini call failed, using fallback:", err);
    return null;
  }
}

// Deterministic fallback embedding so clustering still works without Gemini.
export function localEmbedding(text: string): number[] {
  const hash = createHash("sha256").update(text.toLowerCase()).digest();
  const vector: number[] = [];
  for (let i = 0; i < hash.length; i += 4) {
    vector.push(hash.readUInt32BE(i));
  }
  return vector.map((v) => v / 2 ** 32);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const len = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}
