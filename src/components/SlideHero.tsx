import AnimatedSection from "./AnimatedSection";
import { DotGrid, AccentBar, SlideContainer } from "./SlideElements";
import heroBg from "@/assets/hero-bg.jpg";

// Price data for stylized chart
const priceData = [
  42, 41, 39, 38, 36, 35, 34, 33, 34, 33, 32, 31, 32, 31, 30,
  30, 31, 30, 31, 30, 31, 31, 30, 31, 32, 31, 32, 31, 32, 32,
  33, 34, 36, 37, 39, 41, 43, 44, 46, 48, 50, 52, 54, 55, 57,
];

const chartWidth = 900;
const chartHeight = 300;
const minPrice = 28;
const maxPrice = 60;
const toY = (p: number) => chartHeight - ((p - minPrice) / (maxPrice - minPrice)) * chartHeight;

function PriceChart() {
  const stepX = chartWidth / (priceData.length - 1);
  const pathD = priceData.map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${toY(p)}`).join(" ");
  const corrEnd = 14;
  const baseEnd = 29;

  return (
    <div className="relative w-full">
      <svg viewBox={`-40 -20 ${chartWidth + 80} ${chartHeight + 70}`} className="w-full">
        {[30, 40, 50].map((p) => (
          <g key={p}>
            <line x1={0} y1={toY(p)} x2={chartWidth} y2={toY(p)} stroke="hsl(220 14% 12%)" strokeWidth="1" />
            <text x={-10} y={toY(p) + 4} textAnchor="end" fill="hsl(215 20% 35%)" fontSize="11" fontFamily="DM Sans">{p}</text>
          </g>
        ))}

        {/* Phase zones */}
        <rect x={0} y={0} width={corrEnd * stepX} height={chartHeight} fill="hsl(0 84% 60% / 0.05)" />
        <rect x={corrEnd * stepX} y={0} width={(baseEnd - corrEnd) * stepX} height={chartHeight} fill="hsl(217 91% 60% / 0.05)" />
        <rect x={baseEnd * stepX} y={0} width={(priceData.length - 1 - baseEnd) * stepX} height={chartHeight} fill="hsl(160 84% 39% / 0.05)" />

        <path d={pathD} fill="none" stroke="hsl(210 40% 92%)" strokeWidth="2.5" />

        {/* Dividers */}
        <line x1={corrEnd * stepX} y1={0} x2={corrEnd * stepX} y2={chartHeight + 10} stroke="hsl(220 14% 18%)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1={baseEnd * stepX} y1={0} x2={baseEnd * stepX} y2={chartHeight + 10} stroke="hsl(220 14% 18%)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Phase labels */}
        <text x={(corrEnd * stepX) / 2} y={chartHeight + 35} textAnchor="middle" fill="hsl(0 84% 60%)" fontSize="13" fontFamily="Space Grotesk" fontWeight="700" letterSpacing="0.1em">CORREÇÃO</text>
        <text x={((corrEnd + baseEnd) / 2) * stepX} y={chartHeight + 35} textAnchor="middle" fill="hsl(217 91% 60%)" fontSize="13" fontFamily="Space Grotesk" fontWeight="700" letterSpacing="0.1em">BASE</text>
        <text x={((baseEnd + priceData.length - 1) / 2) * stepX} y={chartHeight + 35} textAnchor="middle" fill="hsl(68 100% 50%)" fontSize="13" fontFamily="Space Grotesk" fontWeight="700" letterSpacing="0.1em">EXPANSÃO</text>
      </svg>
    </div>
  );
}

const callouts = [
  { title: "Correção", description: "O preço recua. Observe a intensidade e o volume antes de agir.", color: "text-market-red", bar: "bg-market-red" },
  { title: "Base", description: "Consolidação lateral. O mercado respira antes de decidir a direção.", color: "text-market-blue", bar: "bg-market-blue" },
  { title: "Expansão", description: "Movimento direcional com qualidade. Aqui entra o trader preparado.", color: "text-lime", bar: "bg-lime" },
];

export default function SlideHero() {
  return (
    <SlideContainer bgImage={heroBg}>
      <DotGrid position="top-right" size="lg" />
      <DotGrid position="bottom-left" size="sm" />

      <AnimatedSection>
        <AccentBar variant="lime" />
        <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-foreground leading-[0.95] mt-8 mb-6 max-w-5xl">
          Veja o preço <br />
          <span className="text-highlight">antes da explicação.</span>
        </h1>
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium mt-4">
          O mercado sempre se move. O desafio real é reconhecer quando o movimento tem <strong className="text-foreground">qualidade.</strong>
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mt-20">
        <div className="border border-border/50 bg-secondary/40 p-4 md:p-6 backdrop-blur-sm">
          <PriceChart />
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.5} className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {callouts.map((c) => (
            <div key={c.title} className="border-l-2 border-border/30 first:border-l-0 px-8 py-6">
              <div className={`w-8 h-1 ${c.bar} mb-4`} />
              <h3 className={`font-display text-xl font-bold ${c.color} mb-2`}>{c.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{c.description}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </SlideContainer>
  );
}
