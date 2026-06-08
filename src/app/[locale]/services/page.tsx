import { PageTemplate } from "@/components/ui/PageTemplate";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import { Monitor, Smartphone, Palette, Lightbulb, Bot } from "lucide-react";

export default async function ServicesPage() {
  const t = await getTranslations('Services');
  
  const services = [
    { id: "web", icon: Monitor, title: t('items.web.title'), description: t('items.web.description') },
    { id: "mobile", icon: Smartphone, title: t('items.mobile.title'), description: t('items.mobile.description') },
    { id: "design", icon: Palette, title: t('items.design.title'), description: t('items.design.description') },
    { id: "consulting", icon: Lightbulb, title: t('items.consulting.title'), description: t('items.consulting.description') },
    { id: "astrbot", icon: Bot, title: t('items.astrbot.title'), description: t('items.astrbot.description') }
  ];

  return (
    <PageTemplate title={t('title')}>
      <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-16">
        {t('description')}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <ScrollReveal key={service.id} delay={index * 0.1}>
            <Card className="glass-card h-full p-8 interactive">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-primary">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </PageTemplate>
  );
}
