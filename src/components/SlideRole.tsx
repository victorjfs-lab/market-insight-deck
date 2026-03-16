import AnimatedSection from "./AnimatedSection";

const cards = [
  {
    title: "Confirmar tendência limpa",
    description: "O indicador separa movimentos de qualidade do ruído. Só opere quando a leitura estiver clara.",
    visual: (
      <svg viewBox="0 0 200 80" className="w-full h-20">
        <path d="M 10 60 Q 50 55 80 40 T 150 15 L 190 10" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="2.5" className="line-glow-green" />
        <line x1={10} y1={65} x2={190} y2={65} stroke="hsl(220 14% 18%)" strokeWidth="1" />
        <circle cx={150} cy={15} r="3" fill="hsl(160 84% 39%)" />
        {/* Arrow up */}
        <path d="M 160 30 L 165 20 L 170 30" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Evitar ruído lateral",
    description: "Mercados laterais destroem contas de iniciantes. O indicador identifica quando não há qualidade.",
    visual: (
      <svg viewBox="0 0 200 80" className="w-full h-20">
        <path d="M 10 40 L 30 38 L 50 42 L 70 39 L 90 41 L 110 38 L 130 42 L 150 39 L 170 41 L 190 40" fill="none" stroke="hsl(210 40% 60%)" strokeWidth="2" />
        <line x1={10} y1={65} x2={190} y2={65} stroke="hsl(220 14% 18%)" strokeWidth="1" />
        {/* X marks */}
        <g stroke="hsl(0 84% 60%)" strokeWidth="1.5">
          <line x1={55} y1={50} x2={65} y2={60} /><line x1={65} y1={50} x2={55} y2={60} />
          <line x1={115} y1={50} x2={125} y2={60} /><line x1={125} y1={50} x2={115} y2={60} />
        </g>
      </svg>
    ),
  },
  {
    title: "Melhorar timing de entrada e saída",
    description: "Combine leitura de preço com o indicador para entrar no momento certo e sair com disciplina.",
    visual: (
      <svg viewBox="0 0 200 80" className="w-full h-20">
        <path d="M 10 60 Q 40 58 60 45 T 120 20 L 150 25 L 190 35" fill="none" stroke="hsl(217 91% 60%)" strokeWidth="2" className="line-glow-blue" />
        <line x1={10} y1={65} x2={190} y2={65} stroke="hsl(220 14% 18%)" strokeWidth="1" />
        {/* Entry marker */}
        <circle cx={60} cy={45} r="4" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="1.5" />
        <text x={60} y={72} textAnchor="middle" fill="hsl(160 84% 39%)" fontSize="8" fontFamily="Inter">entrada</text>
        {/* Exit marker */}
        <circle cx={150} cy={25} r="4" fill="none" stroke="hsl(43 96% 56%)" strokeWidth="1.5" />
        <text x={150} y={72} textAnchor="middle" fill="hsl(43 96% 56%)" fontSize="8" fontFamily="Inter">saída</text>
      </svg>
    ),
  },
];

export default function SlideRole() {
  return (
    <section className="slide-section">
      <div className="max-w-[1400px] mx-auto w-full">
        <AnimatedSection>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            04 · Função
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-6 max-w-3xl">
            O papel do indicador.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="border border-border bg-secondary/30 p-8 flex flex-col">
                <div className="mb-6">{card.visual}</div>
                <h3 className="font-display text-2xl text-foreground mb-3">{card.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed font-medium">{card.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
