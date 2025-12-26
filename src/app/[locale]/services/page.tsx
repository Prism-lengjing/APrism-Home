import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import { Monitor, Smartphone, Palette, Lightbulb } from "lucide-react";

export default function ServicesPage() {
  const t = useTranslations('Services');
  
  const services = [
    {
      id: "web",
      icon: Monitor,
      title: t('items.web.title'),
      description: t('items.web.description')
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: t('items.mobile.title'),
      description: t('items.mobile.description')
    },
    {
      id: "design",
      icon: Palette,
      title: t('items.design.title'),
      description: t('items.design.description')
    },
    {
      id: "consulting",
      icon: Lightbulb,
      title: t('items.consulting.title'),
      description: t('items.consulting.description')
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
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {service.description}
                  </p>
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
