import { Hero } from "@/components/features/hero/Hero";
import { BentoGrid, BentoCard } from "@/components/ui/BentoGrid";
import { Target, Zap, Heart } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations('Home');

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />

      <section className="py-24 bg-background">
        <div className="container-apple">
          <BentoGrid>
            <BentoCard
              title={t('cards.precision.title')}
              description={t('cards.precision.description')}
              icon={<Target />}
              className="md:col-span-2"
            />
            <BentoCard
              title={t('cards.innovation.title')}
              description={t('cards.innovation.description')}
              icon={<Zap />}
            />
            <BentoCard
              title={t('cards.empathy.title')}
              description={t('cards.empathy.description')}
              icon={<Heart />}
              className="md:col-span-3"
            />
          </BentoGrid>
        </div>
      </section>
    </main>
  );
}
