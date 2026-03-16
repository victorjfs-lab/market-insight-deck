import AnimatedSection from "./AnimatedSection";

// Generate realistic-looking price data for a candlestick-style chart
const priceData = [
  // Correction phase
  42, 41, 39, 38, 36, 35, 34, 33, 34, 33, 32, 31, 32, 31, 30,
  // Base phase
  30, 31, 30, 31, 30, 31, 31, 30, 31, 32, 31, 32, 31, 32, 32,
  // Expansion phase
  33, 34, 36, 37, 39, 41, 43, 44, 46, 48, 50, 52, 54, 55, 57,
];

const chartWidth = 900;
const chartHeight = 320;
const minPrice = 28;
const maxPrice = 60;

function priceToY(price: number) {
  return chartHeight - ((price - minPrice) / (maxPrice - minPrice)) * chartHeight;
}

function PriceChart() {
  const stepX = chartWidth / (priceData.length - 1);
  
  const pathD = priceData
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${priceToY(p)}`)
    .join(" ");

  // Phase boundaries
  const correctionEnd = 14;
  const baseEnd = 29;

  return (
    <div className="relative w-full max-w-[960px]">
      <svg viewBox={`-40 -20 ${chartWidth + 80} ${chartHeight + 60}`} className="w-full">
        {/* Horizontal reference lines */}
        {[30, 35, 40, 45, 50, 55].map((p) => (
          <g key={p}>
            <line x1={0} y1={priceToY(p)} x2={chartWidth} y2={priceToY(p)} stroke="hsl(220 14% 14%)" strokeWidth="1" />
            <text x={-10} y={priceToY(p) + 4} textAnchor="end" fill="hsl(215 20% 45%)" fontSize="11" fontFamily="Inter">
              {p}
            </text>
          </g>
        ))}

        {/* Phase zones */}
        <rect x={0} y={0} width={correctionEnd * stepX} height={chartHeight} fill="hsl(0 84% 60% / 0.04)" />
        <rect x={correctionEnd * stepX} y={0} width={(baseEnd - correctionEnd) * stepX} height={chartHeight} fill="hsl(217 91% 60% / 0.04)" />
        <rect x={baseEnd * stepX} y={0} width={(priceData.length - 1 - baseEnd) * stepX} height={chartHeight} fill="hsl(160 84% 39% / 0.04)" />

        {/* Price line */}
        <path d={pathD} fill="none" stroke="hsl(210 40% 92%)" strokeWidth="2" className="line-glow-blue" />

        {/* Phase labels at bottom */}
        <text x={(correctionEnd * stepX) / 2} y={chartHeight + 30} textAnchor="middle" fill="hsl(0 84% 60%)" fontSize="12" fontFamily="Inter" fontWeight="600">
          CORREÇÃO
        </text>
        <text x={((correctionEnd + baseEnd) / 2) * stepX} y={chartHeight + 30} textAnchor="middle" fill="hsl(217 91% 60%)" fontSize="12" fontFamily="Inter" fontWeight="600">
          BASE
        </text>
        <text x={((baseEnd + priceData.length - 1) / 2) * stepX} y={chartHeight + 30} textAnchor="middle" fill="hsl(160 84% 39%)" fontSize="12" fontFamily="Inter" fontWeight="600">
          EXPANSÃO
        </text>

        {/* Phase divider lines */}
        <line x1={correctionEnd * stepX} y1={0} x2={correctionEnd * stepX} y2={chartHeight + 10} stroke="hsl(220 14% 20%)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={baseEnd * stepX} y1={0} x2={baseEnd * stepX} y2={chartHeight + 10} stroke="hsl(220 14% 20%)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

const callouts = [
  {
    title: "Correção",
    description: "O preço recua após um movimento. Observe a intensidade e o volume.",
    color: "text-market-red",
    border: "border-market-red/20",
  },
  {
    title: "Base",
    description: "Consolidação lateral. O mercado respira antes de decidir a direção.",
    color: "text-market-blue",
    border: "border-market-blue/20",
  },
  {
    title: "Expansão",
    description: "Movimento direcional com qualidade. Aqui entra o trader preparado.",
    color: "text-market-green",
    border: "border-market-green/20",
  },
];

export default function SlideHero() {
  return (
    <section className="slide-section grid-bg">
      <div className="max-w-[1400px] mx-auto w-full">
        <AnimatedSection>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            Masterclass · Leitura de Preço
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground leading-[0.95] mb-6 max-w-4xl">
            Veja o preço antes da explicação.
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            O mercado sempre se move. O desafio real é reconhecer quando o movimento tem qualidade.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="mt-16">
          <PriceChart />
        </AnimatedSection>

        <AnimatedSection delay={0.5} className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[960px]">
            {callouts.map((c) => (
              <div key={c.title} className={`border ${c.border} bg-secondary/50 p-6`}>
                <h3 className={`font-display text-2xl ${c.color} mb-2`}>{c.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed font-medium">{c.description}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
