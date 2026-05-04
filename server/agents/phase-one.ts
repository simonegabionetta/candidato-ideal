export type PhaseOneInput = {
  jobUrl: string;
};

export type PhaseOneDecision = "apply" | "do_not_apply";

export type PhaseOneOutput = {
  companyDna: string;
  decision: PhaseOneDecision;
  justification: string;
};

export async function runPhaseOneScan(
  input: PhaseOneInput,
): Promise<PhaseOneOutput> {
  return {
    companyDna: `Varredura pendente para ${input.jobUrl}.`,
    decision: "apply",
    justification: "Agente da fase 1 ainda será conectado.",
  };
}
