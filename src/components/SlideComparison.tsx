import AnimatedSection from "./AnimatedSection";

const leftItems = [
  { icon: "⚡", text: "Entrada por impulso", sub: "Reage ao candle sem contexto" },
  { icon: "🚪", text: "Saída precoce", sub: "Fecha posição no primeiro recuo" },
  { icon: "🌀", text: "Confusão em lateralização", sub: "Opera ruído como se fosse tendência" },
];

const rightItems = [
  { icon: "⏳", text: "Espera qualidade", sub: "Só entra quando o indicador confirma" },
  { icon: "📊", text: "Interpreta ritmo", sub: "Diferencia expansão de ruído" },
  { icon: "🔍", text: "Usa o indicador como filtro", sub: "Separa tendência limpa do caos" },
];

export default function SlideComparison() {
  return (
    <section className="slide-section">
      <div className="max-w-[1400px] mx-auto w-full">
        <AnimatedSection>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            03 · Mentalidade
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-6 max-w-4xl">
            O que o trader iniciante normalmente faz.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Left column */}
            <div className="border border-border bg-market-red/[0.03] p-10 md:p-14">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-market-red font-semibold mb-8">
                Vê apenas candles
              </p>
              <div className="space-y-8">
                {leftItems.map((item) => (
                  <div key={item.text} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-body text-base font-semibold text-foreground">{item.text}</p>
                      <p className="font-body text-sm text-muted-foreground mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="border border-border border-l-0 bg-market-green/[0.03] p-10 md:p-14">
              <p className="font-body text-xs tracking-[0.3em] uppercase text-market-green font-semibold mb-8">
                Enxerga contexto
              </p>
              <div className="space-y-8">
                {rightItems.map((item) => (
                  <div key={item.text} className="flex items-start gap-4">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <p className="font-body text-base font-semibold text-foreground">{item.text}</p>
                      <p className="font-body text-sm text-muted-foreground mt-1">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
