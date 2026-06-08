import { PageTemplate } from "@/components/ui/PageTemplate";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPage() {
  const t = await getTranslations('Privacy');
  const currentDate = new Date().toLocaleDateString();

  return (
    <PageTemplate title={t('title')}>
      <p className="text-sm text-muted-foreground mb-12">
        {t('lastUpdated', { date: currentDate })}
      </p>
      
      <ScrollReveal>
        <div className="prose prose-lg dark:prose-invert max-w-3xl">
          <p className="text-xl text-foreground leading-relaxed mb-16">
            {t('intro')}
          </p>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('sections.collection.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.collection.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('sections.usage.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.usage.content')}</p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">{t('sections.protection.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('sections.protection.content')}</p>
            </section>
          </div>
        </div>
      </ScrollReveal>
    </PageTemplate>
  );
}
