import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

export default function CareersPage() {
  const t = useTranslations('Contact.careers');

  const positions = [
    {
      id: "frontend",
      title: t('positions.frontend.title'),
      type: t('positions.frontend.type'),
      location: t('positions.frontend.location'),
      description: t('positions.frontend.description'),
    },
    {
      id: "backend",
      title: t('positions.backend.title'),
      type: t('positions.backend.type'),
      location: t('positions.backend.location'),
      description: t('positions.backend.description'),
    }
  ];

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <Section className="pt-32 pb-12">
        <ScrollReveal>
          <h1 className="text-apple-display mb-4">{t('title')}</h1>
          <p className="text-apple-body text-xl text-muted-foreground max-w-2xl">
            {t('description')}
          </p>
        </ScrollReveal>
      </Section>

      <Section className="pt-0 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          {positions.map((position, index) => (
            <ScrollReveal key={position.id} delay={index * 0.1}>
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 text-accent">
                      {position.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{position.location}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-6">
                    {position.description}
                  </p>
                  <Link href="/contact">
                    <button className="glass-button-primary w-full text-sm font-medium">
                      {t('apply')}
                    </button>
                  </Link>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
