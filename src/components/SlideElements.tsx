import { ReactNode } from "react";

interface DotGridProps {
  position: "top-right" | "top-left" | "bottom-left" | "bottom-right";
  size?: "sm" | "md" | "lg";
}

export function DotGrid({ position, size = "md" }: DotGridProps) {
  const sizeMap = { sm: "w-16 h-16", md: "w-24 h-24", lg: "w-32 h-32" };
  const posMap = {
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
    "bottom-left": "bottom-6 left-6",
    "bottom-right": "bottom-6 right-6",
  };

  return (
    <div className={`absolute ${posMap[position]} ${sizeMap[size]} dot-grid opacity-80 pointer-events-none`} />
  );
}

export function AccentBar({ variant = "white" }: { variant?: "white" | "lime" }) {
  return <div className={variant === "lime" ? "accent-bar-lime" : "accent-bar"} />;
}

export function SlideNumber({ number }: { number: string }) {
  return (
    <span className="font-body text-xs tracking-[0.3em] uppercase text-muted-foreground">
      {number}
    </span>
  );
}

export function SlideContainer({ children, className = "", bgImage }: { children: ReactNode; className?: string; bgImage?: string }) {
  return (
    <section
      className={`slide-section ${className}`}
      style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
    >
      {bgImage && <div className="absolute inset-0 bg-background/70" />}
      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {children}
      </div>
    </section>
  );
}
