import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations('About');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <Section className="pt-32 pb-16">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-apple-display">{t('title')}</h1>
            <p className="text-apple-body text-xl text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
          </div>
        </ScrollReveal>
      </Section>

      <Section className="bg-muted/30">
        <div className="grid md:grid-cols-3 gap-8">
          <ScrollReveal delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>{t('cards.precision.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {t('cards.precision.description')}
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>{t('cards.innovation.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {t('cards.innovation.description')}
              </CardContent>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>{t('cards.empathy.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                {t('cards.empathy.description')}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
