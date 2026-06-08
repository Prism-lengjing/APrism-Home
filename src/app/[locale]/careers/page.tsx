import { PageTemplate } from "@/components/ui/PageTemplate";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

const jobTemplates: Record<string, string> = {
  frontend: `Hi AperturePrism Team,

I'm interested in the Frontend Developer position.

About me:
- Name:
- Email:
- GitHub/Portfolio:

Experience:
-

Why I'm interested:
-

I'd love to discuss how I can contribute to your team.

Best regards,`,
  backend: `Hi AperturePrism Team,

I'm interested in the Backend Developer position.

About me:
- Name:
- Email:
- GitHub/Portfolio:

Experience:
-

Why I'm interested:
-

I'd love to discuss how I can contribute to your team.

Best regards,`,
};

export default async function CareersPage() {
  const t = await getTranslations('Contact.careers');

  const positions = [
    { id: "frontend", title: t('positions.frontend.title'), type: t('positions.frontend.type'), location: t('positions.frontend.location'), description: t('positions.frontend.description') },
    { id: "backend", title: t('positions.backend.title'), type: t('positions.backend.type'), location: t('positions.backend.location'), description: t('positions.backend.description') }
  ];

  return (
    <PageTemplate title={t('title')}>
      <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-16">
        {t('description')}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {positions.map((position, index) => (
          <ScrollReveal key={position.id} delay={index * 0.1}>
            <Card className="glass-card h-full flex flex-col interactive">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl text-foreground">{position.title}</CardTitle>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {position.type}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{position.location}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                  {position.description}
                </p>
                <Link href={`/contact?template=job&position=${position.id}`} className="block">
                  <button className="glass-button-primary w-full text-sm font-medium">
                    {t('apply')}
                  </button>
                </Link>
              </CardContent>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </PageTemplate>
  );
}
