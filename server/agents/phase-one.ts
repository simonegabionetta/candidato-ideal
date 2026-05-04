import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export type PhaseOneInput = {
  jobUrl: string;
};

export type PhaseOneDecision = "apply" | "do_not_apply";

export type CompanyDna = {
  businessModel: string;
  products: string[];
  cultureSignals: string[];
  leadershipSignals: string[];
  strategicLevel: string;
  tacticalLevel: string;
  operationalLevel: string;
  limitations: string[];
};

export type PhaseOneOutput = {
  company: string;
  role: string;
  jobUrl: string;
  jobSummary: string;
  requirements: string[];
  cultureSignals: string[];
  risks: string[];
  opportunities: string[];
  companyDna: CompanyDna;
  decision: PhaseOneDecision;
  justification: string;
};

export const phaseOneOutputSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  jobUrl: z.string().url(),
  jobSummary: z.string().min(1),
  requirements: z.array(z.string()).min(1),
  cultureSignals: z.array(z.string()).min(1),
  risks: z.array(z.string()).min(1),
  opportunities: z.array(z.string()).min(1),
  companyDna: z.object({
    businessModel: z.string().min(1),
    products: z.array(z.string()).min(1),
    cultureSignals: z.array(z.string()).min(1),
    leadershipSignals: z.array(z.string()).min(1),
    strategicLevel: z.string().min(1),
    tacticalLevel: z.string().min(1),
    operationalLevel: z.string().min(1),
    limitations: z.array(z.string()),
  }),
  decision: z.enum(["apply", "do_not_apply"]),
  justification: z.string().min(1),
});

export function normalizePhaseOneDecision(value: string): PhaseOneDecision {
  const normalized = value.trim().toLowerCase();

  if (["apply", "aplicar", "sim", "yes"].includes(normalized)) {
    return "apply";
  }

  if (
    ["do_not_apply", "nao_aplicar", "não_aplicar", "nao aplicar", "não aplicar", "no"].includes(
      normalized,
    )
  ) {
    return "do_not_apply";
  }

  throw new Error(`Unsupported phase one decision: ${value}`);
}

export function validateJobUrl(value: unknown): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error("jobUrl is required.");
  }

  let url: URL;

  try {
    url = new URL(value.trim());
  } catch {
    throw new Error("jobUrl must be a valid URL.");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("jobUrl must use http or https.");
  }

  return url.toString();
}

export async function runPhaseOneScan(
  input: PhaseOneInput,
): Promise<PhaseOneOutput> {
  const jobUrl = validateJobUrl(input.jobUrl);

  const result = await generateObject({
    model: openai("gpt-4.1-mini"),
    schema: phaseOneOutputSchema,
    system:
      "You are a rigorous career research agent. Return only structured data that matches the schema. " +
      "Use the provided job URL as the primary clue, infer cautiously, and explicitly record limitations when external sources are unavailable.",
    prompt: [
      "Run phase 1 of Candidata Ideal for this job URL:",
      jobUrl,
      "",
      "Research and synthesize the job, company DNA, culture, leadership, recent signals, risks and opportunities.",
      "Cover strategic, tactical and operational levels.",
      "Decide whether the candidate should apply. Use decision apply only when the role appears promising enough to invest time.",
      "Use decision do_not_apply when risks, poor fit, unclear scope or weak opportunity outweigh the upside.",
      "Keep the answer in Brazilian Portuguese except technical names and URLs.",
    ].join("\n"),
  });

  return {
    ...result.object,
    jobUrl,
    decision: normalizePhaseOneDecision(result.object.decision),
  };
}
