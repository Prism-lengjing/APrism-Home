import { Hero } from "@/components/features/hero/Hero";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { Target, Zap, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />

      <section className="py-24 bg-background">
        <div className="container-apple">
          <BentoGrid>
            <BentoCard
              title="精准"
              description="我们坚信像素级的完美执行。"
              icon={<Target />}
              className="md:col-span-2"
            />
            <BentoCard
              title="创新"
              description="不断突破技术界限。"
              icon={<Zap />}
            />
            <BentoCard
              title="共情"
              description="为人类而设计。"
              icon={<Heart />}
              className="md:col-span-3"
            />
          </BentoGrid>
        </div>
      </section>
    </main>
  );
}
