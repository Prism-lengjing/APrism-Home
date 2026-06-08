import { PageTemplate } from "@/components/ui/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <PageTemplate title={t('title')}>
      <div className="space-y-16">
        <p className="text-apple-body text-xl text-muted-foreground leading-relaxed max-w-3xl">
          {t('description')}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { key: 'precision' },
            { key: 'innovation' },
            { key: 'empathy' }
          ].map((item, index) => (
            <ScrollReveal key={item.key} delay={index * 0.1}>
              <Card className="glass-card h-full">
                <CardHeader>
                  <CardTitle className="text-foreground">{t(`cards.${item.key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  {t(`cards.${item.key}.description`)}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
}
