const phases = [
  "Varredura e decisão",
  "Atenção e posicionamento",
  "Candidatura e currículo",
  "Entrevista comportamental",
  "Entrevista técnica",
];

export default function ProcessPage() {
  return (
    <section className="pageShell">
      <div className="pageHeader">
        <p className="eyebrow">Processo</p>
        <h1>Cole uma vaga e avance fase por fase</h1>
        <p>
          A primeira versão prepara a fundação do produto. Os agentes serão
          conectados nas próximas stories.
        </p>
      </div>

      <form className="jobForm">
        <label htmlFor="job-url">Link da vaga</label>
        <div className="inputRow">
          <input
            id="job-url"
            name="jobUrl"
            type="url"
            placeholder="https://empresa.com/vagas/cargo"
          />
          <button type="button">Iniciar análise</button>
        </div>
      </form>

      <div className="phaseList">
        {phases.map((phase, index) => (
          <article className="phaseCard" key={phase}>
            <span>Fase {index + 1}</span>
            <h2>{phase}</h2>
            <p>{index === 0 ? "Pronta para implementação." : "Bloqueada."}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
