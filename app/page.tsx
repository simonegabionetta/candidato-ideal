"use client";

import { FormEvent, useMemo, useState } from "react";
import type { PhaseOneOutput } from "../server/agents/phase-one";

const phases = [
  "Varredura e decisão",
  "Atenção e posicionamento",
  "Candidatura e currículo",
  "Entrevista comportamental",
  "Entrevista técnica",
];

type PhaseOneApiResponse = {
  applicationId: string;
  phaseTwoUnlocked: boolean;
  result: PhaseOneOutput;
};

type PhaseState = "blocked" | "active" | "completed";

function decisionLabel(decision: PhaseOneOutput["decision"]) {
  return decision === "apply" ? "APLICAR" : "NÃO APLICAR";
}

export default function ProcessPage() {
  const [jobUrl, setJobUrl] = useState("");
  const [result, setResult] = useState<PhaseOneApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const phaseStates = useMemo<PhaseState[]>(() => {
    if (!result) {
      return ["active", "blocked", "blocked", "blocked", "blocked"];
    }

    return [
      "completed",
      result.phaseTwoUnlocked ? "active" : "blocked",
      "blocked",
      "blocked",
      "blocked",
    ];
  }, [result]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/phases/one", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobUrl }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Não foi possível analisar a vaga.");
      }

      setResult(payload as PhaseOneApiResponse);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível analisar a vaga.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="pageShell">
      <div className="pageHeader">
        <p className="eyebrow">Processo</p>
        <h1>Cole uma vaga e avance fase por fase</h1>
        <p>
          A fase 1 faz a varredura da vaga e da empresa, registra o DNA
          encontrado e decide se vale investir tempo na candidatura.
        </p>
      </div>

      <form className="jobForm" onSubmit={handleSubmit}>
        <label htmlFor="job-url">Link da vaga</label>
        <div className="inputRow">
          <input
            id="job-url"
            name="jobUrl"
            type="url"
            placeholder="https://empresa.com/vagas/cargo"
            value={jobUrl}
            onChange={(event) => setJobUrl(event.target.value)}
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Analisando..." : "Iniciar análise"}
          </button>
        </div>
      </form>

      {error ? (
        <section className="statusPanel errorPanel" aria-live="polite">
          <h2>Erro na análise</h2>
          <p>{error}</p>
        </section>
      ) : null}

      {result ? (
        <section className="resultPanel" aria-live="polite">
          <div className="resultHeader">
            <div>
              <p className="eyebrow">Resultado da fase 1</p>
              <h2>
                {result.result.company} · {result.result.role}
              </h2>
            </div>
            <span className={`decisionBadge ${result.result.decision}`}>
              {decisionLabel(result.result.decision)}
            </span>
          </div>

          <p>{result.result.jobSummary}</p>
          <p className="justification">{result.result.justification}</p>

          <div className="resultGrid">
            <article>
              <h3>DNA da empresa</h3>
              <p>{result.result.companyDna.businessModel}</p>
              <ul>
                {result.result.companyDna.products.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Requisitos</h3>
              <ul>
                {result.result.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Oportunidades</h3>
              <ul>
                {result.result.opportunities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article>
              <h3>Riscos</h3>
              <ul>
                {result.result.risks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ) : null}

      <div className="phaseList">
        {phases.map((phase, index) => (
          <article className={`phaseCard ${phaseStates[index]}`} key={phase}>
            <span>Fase {index + 1}</span>
            <h2>{phase}</h2>
            <p>
              {phaseStates[index] === "completed"
                ? "Concluída."
                : phaseStates[index] === "active"
                  ? "Ativa."
                  : "Bloqueada."}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
