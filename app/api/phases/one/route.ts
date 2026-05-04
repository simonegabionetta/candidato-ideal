import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "../../../../lib/supabase/server";
import {
  runPhaseOneScan,
  validateJobUrl,
  type PhaseOneOutput,
} from "../../../../server/agents/phase-one";

type ApiSuccessResponse = {
  applicationId: string;
  phaseTwoUnlocked: boolean;
  result: PhaseOneOutput;
};

type ApiErrorResponse = {
  error: string;
};

type ApplicationRow = {
  id: string;
};

type SupabaseError = {
  message: string;
};

type SupabaseResult<T> = {
  data: T | null;
  error: SupabaseError | null;
};

type SelectableInsert<T> = {
  select(columns: string): {
    single(): PromiseLike<SupabaseResult<T>>;
  };
};

type SupabaseTable = {
  insert(values: unknown): PromiseLike<SupabaseResult<unknown>> | SelectableInsert<ApplicationRow>;
};

type SupabaseClientLike = {
  from(table: string): SupabaseTable;
};

const PHASE_ONE_NAME = "Varredura e decisão";
const PHASE_TWO_NAME = "Atenção e posicionamento";

export async function persistPhaseOneResult(
  supabaseClient: unknown,
  result: PhaseOneOutput,
): Promise<ApiSuccessResponse> {
  const supabase = supabaseClient as SupabaseClientLike;
  const phaseTwoUnlocked = result.decision === "apply";
  const applicationInsert = supabase.from("aplicacoes").insert({
    empresa: result.company,
    cargo: result.role,
    link_vaga: result.jobUrl,
    fase_atual: phaseTwoUnlocked ? 2 : 1,
    fase_mais_avancada: phaseTwoUnlocked ? 2 : 1,
    resultado: "em andamento",
  }) as SelectableInsert<ApplicationRow>;

  const applicationResult = await applicationInsert.select("id").single();

  if (applicationResult.error || !applicationResult.data) {
    throw new Error(applicationResult.error?.message ?? "Could not create application.");
  }

  const applicationId = applicationResult.data.id;
  const phaseOneInsert = supabase.from("fases").insert({
    aplicacao_id: applicationId,
    numero_fase: 1,
    nome_fase: PHASE_ONE_NAME,
    status: "concluida",
    resultado_ia: JSON.stringify(result),
    passou: phaseTwoUnlocked,
    iniciado_em: new Date().toISOString(),
    concluido_em: new Date().toISOString(),
  }) as PromiseLike<SupabaseResult<unknown>>;
  const phaseOneResult = await phaseOneInsert;

  if (phaseOneResult.error) {
    throw new Error(phaseOneResult.error.message);
  }

  if (phaseTwoUnlocked) {
    const phaseTwoInsert = supabase.from("fases").insert({
      aplicacao_id: applicationId,
      numero_fase: 2,
      nome_fase: PHASE_TWO_NAME,
      status: "ativa",
      iniciado_em: new Date().toISOString(),
    }) as PromiseLike<SupabaseResult<unknown>>;
    const phaseTwoResult = await phaseTwoInsert;

    if (phaseTwoResult.error) {
      throw new Error(phaseTwoResult.error.message);
    }
  }

  return {
    applicationId,
    phaseTwoUnlocked,
    result,
  };
}

export async function POST(request: Request): Promise<NextResponse<ApiSuccessResponse | ApiErrorResponse>> {
  try {
    const body = (await request.json()) as { jobUrl?: unknown };
    const jobUrl = validateJobUrl(body.jobUrl);
    const result = await runPhaseOneScan({ jobUrl });
    const response = await persistPhaseOneResult(createServerSupabaseClient(), result);

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("jobUrl")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Phase one scan failed", error);

    return NextResponse.json(
      { error: "Não foi possível executar a fase 1 agora." },
      { status: 500 },
    );
  }
}
