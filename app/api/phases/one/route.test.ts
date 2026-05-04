import { beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { createServerSupabaseClient } from "../../../../lib/supabase/server";
import { runPhaseOneScan, type PhaseOneOutput } from "../../../../server/agents/phase-one";

type ServerSupabaseClient = ReturnType<typeof createServerSupabaseClient>;

vi.mock("../../../../lib/supabase/server", () => ({
  createServerSupabaseClient: vi.fn(),
}));

vi.mock("../../../../server/agents/phase-one", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../../server/agents/phase-one")>();

  return {
    ...actual,
    runPhaseOneScan: vi.fn(),
  };
});

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

function createRequest(body: object) {
  return new Request("http://localhost/api/phases/one", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

function createSupabaseMock() {
  const inserts: Array<{ table: string; values: unknown }> = [];
  const from = vi.fn((table: string) => ({
    insert: vi.fn((values: unknown) => {
      inserts.push({ table, values });

      if (table === "aplicacoes") {
        return {
          select: vi.fn(() => ({
            single: vi.fn(async () => ({
              data: { id: "application-1" },
              error: null,
            })),
          })),
        };
      }

      return Promise.resolve({
        data: null,
        error: null,
      });
    }),
  }));

  return {
    client: { from },
    inserts,
  };
}

describe("POST /api/phases/one", () => {
  beforeEach(() => {
    vi.mocked(createServerSupabaseClient).mockReset();
    vi.mocked(runPhaseOneScan).mockReset();
  });

  it("returns 400 when jobUrl is missing", async () => {
    const response = await POST(createRequest({}));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("jobUrl is required.");
    expect(runPhaseOneScan).not.toHaveBeenCalled();
  });

  it("returns 400 when jobUrl is invalid", async () => {
    const response = await POST(createRequest({ jobUrl: "invalid" }));
    const payload = await response.json();

    expect(response.status).toBe(400);
    expect(payload.error).toBe("jobUrl must be a valid URL.");
  });

  it("returns the structured result and persists phase two as active for apply", async () => {
    const supabase = createSupabaseMock();
    vi.mocked(createServerSupabaseClient).mockReturnValue(
      supabase.client as unknown as ServerSupabaseClient,
    );
    vi.mocked(runPhaseOneScan).mockResolvedValue(scanOutput);

    const response = await POST(createRequest({ jobUrl: scanOutput.jobUrl }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload).toMatchObject({
      applicationId: "application-1",
      phaseTwoUnlocked: true,
      result: { decision: "apply", company: "Acme" },
    });
    expect(supabase.inserts).toHaveLength(3);
    expect(supabase.inserts[0]).toMatchObject({
      table: "aplicacoes",
      values: {
        empresa: "Acme",
        cargo: "Product Manager",
        fase_atual: 2,
        fase_mais_avancada: 2,
      },
    });
    expect(supabase.inserts[2]).toMatchObject({
      table: "fases",
      values: {
        numero_fase: 2,
        status: "ativa",
      },
    });
  });

  it("keeps phase two blocked for do_not_apply", async () => {
    const supabase = createSupabaseMock();
    vi.mocked(createServerSupabaseClient).mockReturnValue(
      supabase.client as unknown as ServerSupabaseClient,
    );
    vi.mocked(runPhaseOneScan).mockResolvedValue({
      ...scanOutput,
      decision: "do_not_apply",
    });

    const response = await POST(createRequest({ jobUrl: scanOutput.jobUrl }));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.phaseTwoUnlocked).toBe(false);
    expect(supabase.inserts).toHaveLength(2);
    expect(supabase.inserts[0]).toMatchObject({
      values: {
        fase_atual: 1,
        fase_mais_avancada: 1,
      },
    });
  });
});
