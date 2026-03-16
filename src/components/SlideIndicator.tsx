import AnimatedSection from "./AnimatedSection";

// Simulated indicator data with phases
const indicatorData: { value: number; phase: "neutral" | "trend" | "pressure" }[] = [
  // Neutral/transition
  { value: 50, phase: "neutral" }, { value: 48, phase: "neutral" }, { value: 52, phase: "neutral" },
  { value: 49, phase: "neutral" }, { value: 51, phase: "neutral" }, { value: 47, phase: "neutral" },
  { value: 50, phase: "neutral" }, { value: 53, phase: "neutral" },
  // Trend (green)
  { value: 58, phase: "trend" }, { value: 63, phase: "trend" }, { value: 68, phase: "trend" },
  { value: 72, phase: "trend" }, { value: 75, phase: "trend" }, { value: 78, phase: "trend" },
  { value: 82, phase: "trend" }, { value: 85, phase: "trend" }, { value: 83, phase: "trend" },
  { value: 80, phase: "trend" }, { value: 76, phase: "trend" },
  // Pressure (red)
  { value: 45, phase: "pressure" }, { value: 40, phase: "pressure" }, { value: 35, phase: "pressure" },
  { value: 30, phase: "pressure" }, { value: 28, phase: "pressure" }, { value: 25, phase: "pressure" },
  { value: 22, phase: "pressure" },
  // Back neutral
  { value: 35, phase: "neutral" }, { value: 40, phase: "neutral" }, { value: 45, phase: "neutral" },
  { value: 48, phase: "neutral" }, { value: 50, phase: "neutral" },
];

// Moving average
const avgWindow = 5;
const avgData = indicatorData.map((_, i) => {
  const start = Math.max(0, i - avgWindow + 1);
  const slice = indicatorData.slice(start, i + 1);
  return slice.reduce((s, d) => s + d.value, 0) / slice.length;
});

const chartW = 800;
const chartH = 260;

function toX(i: number) { return (i / (indicatorData.length - 1)) * chartW; }
function toY(v: number) { return chartH - (v / 100) * chartH; }

const phaseColor = { neutral: "hsl(210 40% 92%)", trend: "hsl(160 84% 39%)", pressure: "hsl(0 84% 60%)" };
const phaseGlow = { neutral: "", trend: "line-glow-green", pressure: "line-glow-red" };

function IndicatorChart() {
  // Build segments by phase
  const segments: { phase: string; points: string }[] = [];
  let currentPhase = indicatorData[0].phase;
  let currentPoints = `${toX(0)},${toY(indicatorData[0].value)}`;

  for (let i = 1; i < indicatorData.length; i++) {
    const d = indicatorData[i];
    if (d.phase !== currentPhase) {
      // Close current segment including the bridge point
      currentPoints += ` ${toX(i)},${toY(d.value)}`;
      segments.push({ phase: currentPhase, points: currentPoints });
      currentPhase = d.phase;
      currentPoints = `${toX(i)},${toY(d.value)}`;
    } else {
      currentPoints += ` ${toX(i)},${toY(d.value)}`;
    }
  }
  segments.push({ phase: currentPhase, points: currentPoints });

  // Average line
  const avgPath = avgData.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");

  return (
    <svg viewBox={`-30 -10 ${chartW + 60} ${chartH + 30}`} className="w-full max-w-[860px]">
      {/* Reference lines */}
      {[20, 50, 80].map((v) => (
        <g key={v}>
          <line x1={0} y1={toY(v)} x2={chartW} y2={toY(v)} stroke="hsl(220 14% 14%)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={-8} y={toY(v) + 4} textAnchor="end" fill="hsl(215 20% 40%)" fontSize="10" fontFamily="Inter">{v}</text>
        </g>
      ))}

      {/* Average line */}
      <path d={avgPath} fill="none" stroke="hsl(43 96% 56%)" strokeWidth="1.5" className="line-glow-yellow" />

      {/* Main indicator segments */}
      {segments.map((seg, i) => (
        <polyline
          key={i}
          points={seg.points}
          fill="none"
          stroke={phaseColor[seg.phase as keyof typeof phaseColor]}
          strokeWidth="2.5"
          className={phaseGlow[seg.phase as keyof typeof phaseGlow]}
        />
      ))}
    </svg>
  );
}

const legend = [
  { label: "Transição", desc: "Mercado indefinido, sem qualidade direcional", color: "bg-foreground" },
  { label: "Tendência limpa", desc: "Movimento com qualidade e continuidade", color: "bg-market-green" },
  { label: "Pressão vendedora", desc: "Força negativa dominante", color: "bg-market-red" },
  { label: "Média do indicador", desc: "Referência de equilíbrio dinâmico", color: "bg-market-yellow" },
];

const metrics = [
  { label: "Corr", value: "0.87" },
  { label: "Média", value: "52.4" },
  { label: "Deslocamento", value: "+18.6" },
  { label: "Leitura final", value: "Tendência" },
];

export default function SlideIndicator() {
  return (
    <section className="slide-section">
      <div className="max-w-[1400px] mx-auto w-full">
        <AnimatedSection>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            02 · O Indicador
          </p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-6 max-w-3xl">
            Agora sim: qualidade do movimento.
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <AnimatedSection delay={0.2}>
            <div className="border border-border bg-secondary/30 p-6">
              <IndicatorChart />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="space-y-5">
              {legend.map((l) => (
                <div key={l.label} className="flex items-start gap-3">
                  <div className={`w-3 h-3 mt-1.5 ${l.color} shrink-0`} style={{ borderRadius: "1px" }} />
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">{l.label}</p>
                    <p className="font-body text-xs text-muted-foreground mt-0.5">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-10">
              {metrics.map((m) => (
                <div key={m.label} className="border border-border bg-secondary/40 p-4">
                  <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{m.label}</p>
                  <p className="font-display text-2xl text-foreground mt-1">{m.value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
