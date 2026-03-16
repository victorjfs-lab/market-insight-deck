import SlideHero from "@/components/SlideHero";
import SlideIndicator from "@/components/SlideIndicator";
import SlideComparison from "@/components/SlideComparison";
import SlideRole from "@/components/SlideRole";
import SlideDemo from "@/components/SlideDemo";

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <SlideHero />
      <SlideIndicator />
      <SlideComparison />
      <SlideRole />
      <SlideDemo />
      <footer className="py-16 text-center border-t border-border/20">
        <p className="font-body text-xs text-muted-foreground tracking-[0.2em] uppercase">
          Masterclass · Leitura de Preço e Qualidade de Movimento
        </p>
      </footer>
    </main>
  );
};

export default Index;
