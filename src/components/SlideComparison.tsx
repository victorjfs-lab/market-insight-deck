import AnimatedSection from "./AnimatedSection";
import { DotGrid, AccentBar, SlideContainer } from "./SlideElements";

const leftItems = [
  { icon: "→", text: "Entrada por impulso", sub: "Reage ao candle sem contexto" },
  { icon: "→", text: "Saída precoce", sub: "Fecha posição no primeiro recuo" },
  { icon: "→", text: "Confusão em lateralização", sub: "Opera ruído como se fosse tendência" },
];

const rightItems = [
  { icon: "→", text: "Espera qualidade", sub: "Só entra quando o indicador confirma" },
  { icon: "→", text: "Interpreta ritmo", sub: "Diferencia expansão de ruído" },
  { icon: "→", text: "Usa o indicador como filtro", sub: "Separa tendência limpa do caos" },
];

export default function SlideComparison() {
  return (
    <SlideContainer>
      <DotGrid position="bottom-right" size="md" />

      <AnimatedSection>
        <AccentBar />
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95] mt-8 mb-4 max-w-5xl">
          O que o trader iniciante <span className="text-highlight">normalmente faz.</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left - bad habits */}
          <div className="relative p-10 md:p-14 border border-border/30" style={{ background: "linear-gradient(135deg, hsl(0 84% 60% / 0.06), transparent)" }}>
            <div className="w-10 h-1 bg-market-red mb-6" />
            <p className="font-display text-sm tracking-[0.3em] uppercase text-market-red font-bold mb-10">
              Vê apenas candles
            </p>
            <div className="space-y-8">
              {leftItems.map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <span className="text-market-red font-bold text-lg mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-display text-lg font-bold text-foreground">{item.text}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - good habits */}
          <div className="relative p-10 md:p-14 border border-border/30 border-l-0" style={{ background: "linear-gradient(135deg, hsl(160 84% 39% / 0.06), transparent)" }}>
            <div className="w-10 h-1 bg-lime mb-6" />
            <p className="font-display text-sm tracking-[0.3em] uppercase text-lime font-bold mb-10">
              Enxerga contexto
            </p>
            <div className="space-y-8">
              {rightItems.map((item) => (
                <div key={item.text} className="flex items-start gap-4">
                  <span className="text-lime font-bold text-lg mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-display text-lg font-bold text-foreground">{item.text}</p>
                    <p className="font-body text-sm text-muted-foreground mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </SlideContainer>
  );
}
