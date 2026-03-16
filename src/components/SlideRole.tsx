import AnimatedSection from "./AnimatedSection";
import { DotGrid, AccentBar, SlideContainer } from "./SlideElements";

const cards = [
  {
    number: "01",
    title: "Confirmar tendência limpa",
    description: "O indicador separa movimentos de qualidade do ruído. Só opere quando a leitura estiver clara.",
    visual: (
      <svg viewBox="0 0 220 90" className="w-full h-24">
        <line x1={10} y1={75} x2={210} y2={75} stroke="hsl(220 14% 15%)" strokeWidth="1" />
        <path d="M 15 65 Q 55 60 85 45 T 160 18 L 205 12" fill="none" stroke="hsl(160 84% 39%)" strokeWidth="2.5" className="line-glow-green" />
        <circle cx={160} cy={18} r="4" fill="none" stroke="hsl(68 100% 50%)" strokeWidth="1.5" />
        <line x1={160} y1={22} x2={160} y2={70} stroke="hsl(68 100% 50% / 0.3)" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Evitar ruído lateral",
    description: "Mercados laterais destroem contas de iniciantes. O indicador identifica quando não há qualidade.",
    visual: (
      <svg viewBox="0 0 220 90" className="w-full h-24">
        <line x1={10} y1={75} x2={210} y2={75} stroke="hsl(220 14% 15%)" strokeWidth="1" />
        <path d="M 15 45 L 35 42 L 55 47 L 75 43 L 95 46 L 115 42 L 135 47 L 155 43 L 175 46 L 195 44" fill="none" stroke="hsl(215 20% 55%)" strokeWidth="2" />
        {/* X marks */}
        <g stroke="hsl(0 84% 60%)" strokeWidth="2">
          <line x1={60} y1={55} x2={70} y2={65} /><line x1={70} y1={55} x2={60} y2={65} />
          <line x1={130} y1={55} x2={140} y2={65} /><line x1={140} y1={55} x2={130} y2={65} />
        </g>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Melhorar timing de entrada e saída",
    description: "Combine leitura de preço com o indicador para entrar no momento certo e sair com disciplina.",
    visual: (
      <svg viewBox="0 0 220 90" className="w-full h-24">
        <line x1={10} y1={75} x2={210} y2={75} stroke="hsl(220 14% 15%)" strokeWidth="1" />
        <path d="M 15 65 Q 45 60 65 48 T 130 22 L 165 28 L 200 38" fill="none" stroke="hsl(217 91% 60%)" strokeWidth="2" className="line-glow-blue" />
        {/* Entry */}
        <circle cx={65} cy={48} r="5" fill="none" stroke="hsl(68 100% 50%)" strokeWidth="2" />
        <text x={65} y={85} textAnchor="middle" fill="hsl(68 100% 50%)" fontSize="9" fontFamily="DM Sans" fontWeight="600">ENTRADA</text>
        {/* Exit */}
        <circle cx={165} cy={28} r="5" fill="none" stroke="hsl(43 96% 56%)" strokeWidth="2" />
        <text x={165} y={85} textAnchor="middle" fill="hsl(43 96% 56%)" fontSize="9" fontFamily="DM Sans" fontWeight="600">SAÍDA</text>
      </svg>
    ),
  },
];

export default function SlideRole() {
  return (
    <SlideContainer>
      <DotGrid position="top-right" size="lg" />

      <AnimatedSection>
        <AccentBar variant="lime" />
        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[0.95] mt-8 mb-4 max-w-3xl">
          O papel do <span className="text-highlight">indicador.</span>
        </h2>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.number} className="relative border border-border/30 bg-secondary/30 p-8 group">
              <span className="font-display text-5xl font-bold text-lime/10 absolute top-4 right-6">{card.number}</span>
              <div className="mb-6">{card.visual}</div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </SlideContainer>
  );
}
