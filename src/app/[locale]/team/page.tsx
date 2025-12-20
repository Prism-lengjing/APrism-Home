import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";

export default function TeamPage() {
  const t = useTranslations('Team');
  const teamMembers = [
    {
      name: "Alex Chen",
      role: t('members.alex.role'),
      bio: t('members.alex.bio')
    },
    {
      name: "Sarah Miller",
      role: t('members.sarah.role'),
      bio: t('members.sarah.bio')
    },
    {
      name: "Jordan Lee",
      role: t('members.jordan.role'),
      bio: t('members.jordan.bio')
    },
    {
      name: "Emily Zhang",
      role: t('members.emily.role'),
      bio: t('members.emily.bio')
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="text-center h-full">
                <div className="w-24 h-24 mx-auto bg-muted rounded-full mb-4 flex items-center justify-center text-2xl font-medium text-muted-foreground">
                  {member.name.charAt(0)}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm font-medium text-accent">{member.role}</p>
                </CardHeader>
                <CardContent className="text-sm">
                  {member.bio}
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
