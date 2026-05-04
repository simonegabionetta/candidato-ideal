import { beforeEach, describe, expect, it, vi } from "vitest";
import { generateObject } from "ai";
import {
  normalizePhaseOneDecision,
  runPhaseOneScan,
  validateJobUrl,
  type PhaseOneOutput,
} from "./phase-one";

vi.mock("@ai-sdk/openai", () => ({
  openai: vi.fn((model: string) => ({ model })),
}));

vi.mock("ai", () => ({
  generateObject: vi.fn(),
}));

const scanOutput: PhaseOneOutput = {
  company: "Acme",
  role: "Product Manager",
  jobUrl: "https://example.com/jobs/product-manager",
  jobSummary: "Vaga para liderar discovery e delivery.",
  requirements: ["Product discovery", "Stakeholder management"],
  cultureSignals: ["Ambiente orientado a produto"],
  risks: ["Poucas fontes publicas disponiveis"],
  opportunities: ["Boa aderencia a produto B2B"],
  companyDna: {
    businessModel: "SaaS B2B",
    products: ["Plataforma de automacao"],
    cultureSignals: ["Decisoes por dados"],
    leadershipSignals: ["Lideranca tecnica visivel"],
    strategicLevel: "Expansao de mercado",
    tacticalLevel: "Squads por dominio",
    operationalLevel: "Ritual de discovery continuo",
    limitations: ["Sem acesso autenticado a fontes restritas"],
  },
  decision: "apply",
  justification: "A oportunidade parece alinhada com o perfil.",
};

describe("phase one agent", () => {
  beforeEach(() => {
    vi.mocked(generateObject).mockReset();
  });

  it("validates required job URL", () => {
    expect(() => validateJobUrl("")).toThrow("jobUrl is required.");
  });

  it("validates invalid job URL", () => {
    expect(() => validateJobUrl("not-a-url")).toThrow("jobUrl must be a valid URL.");
  });

  it("normalizes supported decisions", () => {
    expect(normalizePhaseOneDecision("APLICAR")).toBe("apply");
    expect(normalizePhaseOneDecision("não aplicar")).toBe("do_not_apply");
  });

  it("returns structured output from the AI SDK", async () => {
    vi.mocked(generateObject).mockResolvedValue({
      object: scanOutput,
    } as Awaited<ReturnType<typeof generateObject>>);

    const result = await runPhaseOneScan({
      jobUrl: "https://example.com/jobs/product-manager",
    });

    expect(result).toEqual(scanOutput);
    expect(generateObject).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining("https://example.com/jobs/product-manager"),
        schema: expect.any(Object),
      }),
    );
  });
});
