import fs from "node:fs/promises";
import path from "node:path";
import { ResumeSchema, type Resume } from "../types/resume";
import type { z } from "zod";

export async function loadResume(): Promise<Resume> {
  const file = path.join(process.cwd(), "data", "resume.json");
  const raw = await fs.readFile(file, "utf8");
  const json = JSON.parse(raw);
  const parsed = ResumeSchema.safeParse(json);
  if (!parsed.success) {
    const message = parsed.error.issues
      .map((i: z.ZodIssue) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid resume.json: ${message}`);
  }
  return parsed.data;
}
