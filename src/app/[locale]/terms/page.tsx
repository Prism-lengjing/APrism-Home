import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations('Terms');
  const currentDate = new Date().toLocaleDateString();

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <Section className="pt-32 pb-12">
        <ScrollReveal>
          <h1 className="text-apple-display mb-4">{t('title')}</h1>
          <p className="text-sm text-muted-foreground mb-8">
            {t('lastUpdated', { date: currentDate })}
          </p>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl leading-relaxed text-muted-foreground mb-12">
              {t('intro')}
            </p>
            
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('sections.acceptance.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('sections.acceptance.content')}</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('sections.usage.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('sections.usage.content')}</p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">{t('sections.disclaimer.title')}</h2>
                <p className="text-muted-foreground leading-relaxed">{t('sections.disclaimer.content')}</p>
              </section>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Footer />
    </main>
  );
}
