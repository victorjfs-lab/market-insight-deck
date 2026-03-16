import { useState, useMemo } from "react";
import AnimatedSection from "./AnimatedSection";

interface DemoState {
  ativo: string;
  timeframe: string;
  periodo: number;
  media: number;
  niveis: string;
  serie: string;
}

const defaultState: DemoState = {
  ativo: "BTCUSD",
  timeframe: "1H",
  periodo: 14,
  media: 5,
  niveis: "20, 50, 80",
  serie: "45200, 45350, 45100, 45400, 45600, 45550, 45800, 46000, 46200, 46150, 46400, 46300, 46500, 46700, 46600",
};

function computeIndicator(closes: number[], period: number) {
  if (closes.length < 2) return closes.map(() => 50);
  const result: number[] = [];
  for (let i = 0; i < closes.length; i++) {
    const start = Math.max(0, i - period + 1);
    const slice = closes.slice(start, i + 1);
    const min = Math.min(...slice);
    const max = Math.max(...slice);
    const range = max - min || 1;
    result.push(((closes[i] - min) / range) * 100);
  }
  return result;
}

function movingAvg(data: number[], window: number) {
  return data.map((_, i) => {
    const start = Math.max(0, i - window + 1);
    const slice = data.slice(start, i + 1);
    return slice.reduce((s, v) => s + v, 0) / slice.length;
  });
}

export default function SlideDemo() {
  const [state, setState] = useState<DemoState>(defaultState);

  const closes = useMemo(() => {
    return state.serie.split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
  }, [state.serie]);

  const indicator = useMemo(() => computeIndicator(closes, state.periodo), [closes, state.periodo]);
  const avg = useMemo(() => movingAvg(indicator, state.media), [indicator, state.media]);
  const levels = useMemo(() => state.niveis.split(",").map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n)), [state.niveis]);

  const chartW = 600;
  const chartH = 180;
  const toX = (i: number) => (i / Math.max(indicator.length - 1, 1)) * chartW;
  const toY = (v: number) => chartH - (v / 100) * chartH;

  const indicatorPath = indicator.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
  const avgPath = avg.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");

  const update = (key: keyof DemoState, value: string | number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const inputClass = "bg-secondary border border-border text-foreground font-body text-xs px-3 py-2 w-full focus:outline-none focus:border-primary/50";

  return (
    <section className="slide-section" style={{ minHeight: "auto", paddingTop: "80px", paddingBottom: "120px" }}>
      <div className="max-w-[1000px] mx-auto w-full">
        <AnimatedSection>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            05 · Laboratório
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-[0.95] mb-4">
            Demo opcional
          </h2>
          <p className="font-body text-sm text-muted-foreground max-w-xl font-medium">
            Experimente com seus próprios dados. Ajuste os parâmetros e observe como o indicador responde.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-10">
          <div className="border border-border bg-secondary/20 p-6">
            {/* Inputs row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Ativo</label>
                <input className={inputClass} value={state.ativo} onChange={(e) => update("ativo", e.target.value)} />
              </div>
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Timeframe</label>
                <input className={inputClass} value={state.timeframe} onChange={(e) => update("timeframe", e.target.value)} />
              </div>
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Período</label>
                <input className={inputClass} type="number" value={state.periodo} onChange={(e) => update("periodo", parseInt(e.target.value) || 1)} />
              </div>
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Média</label>
                <input className={inputClass} type="number" value={state.media} onChange={(e) => update("media", parseInt(e.target.value) || 1)} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Níveis (separados por vírgula)</label>
                <input className={inputClass} value={state.niveis} onChange={(e) => update("niveis", e.target.value)} />
              </div>
              <div>
                <label className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Série de fechamentos</label>
                <input className={inputClass} value={state.serie} onChange={(e) => update("serie", e.target.value)} />
              </div>
            </div>

            {/* Chart */}
            <svg viewBox={`-30 -10 ${chartW + 60} ${chartH + 30}`} className="w-full">
              {levels.map((l) => (
                <g key={l}>
                  <line x1={0} y1={toY(l)} x2={chartW} y2={toY(l)} stroke="hsl(220 14% 16%)" strokeWidth="1" strokeDasharray="4 4" />
                  <text x={-8} y={toY(l) + 4} textAnchor="end" fill="hsl(215 20% 40%)" fontSize="9" fontFamily="Inter">{l}</text>
                </g>
              ))}
              <path d={avgPath} fill="none" stroke="hsl(43 96% 56%)" strokeWidth="1.5" className="line-glow-yellow" />
              <path d={indicatorPath} fill="none" stroke="hsl(210 40% 92%)" strokeWidth="2" />
            </svg>

            <div className="flex items-center gap-4 mt-4">
              <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{state.ativo}</span>
              <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground">{state.timeframe}</span>
              <span className="font-body text-[10px] tracking-[0.15em] uppercase text-muted-foreground">P{state.periodo}</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
