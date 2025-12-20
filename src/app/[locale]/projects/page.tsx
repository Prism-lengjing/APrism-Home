import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations('Projects');
  const projects = [
    {
      title: t('items.alpha.title'),
      category: t('items.alpha.category'),
      description: t('items.alpha.description')
    },
    {
      title: t('items.neon.title'),
      category: t('items.neon.category'),
      description: t('items.neon.description')
    },
    {
      title: t('items.quantum.title'),
      category: t('items.quantum.category'),
      description: t('items.quantum.description')
    },
    {
      title: t('items.aether.title'),
      category: t('items.aether.category'),
      description: t('items.aether.description')
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
          {projects.map((project, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="group cursor-pointer h-full">
                <div className="aspect-video bg-muted rounded-t-xl mb-6 flex items-center justify-center text-muted-foreground/50 text-4xl font-light overflow-hidden relative">
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  Preview
                </div>
                <CardHeader>
                  <div className="text-xs font-medium text-accent mb-2 uppercase tracking-wider">
                    {project.category}
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {project.description}
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
