export default function HistoryPage() {
  return (
    <section className="pageShell">
      <div className="pageHeader">
        <p className="eyebrow">Histórico</p>
        <h1>Vagas processadas e métricas</h1>
        <p>
          Esta área vai mostrar candidaturas salvas, funil de conversão e
          padrões aprendidos com o histórico.
        </p>
      </div>

      <div className="emptyState">
        <h2>Nenhuma candidatura registrada ainda</h2>
        <p>As métricas aparecerão quando a primeira vaga for processada.</p>
      </div>
    </section>
  );
}
