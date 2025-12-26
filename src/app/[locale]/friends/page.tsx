import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function FriendsPage() {
  const t = useTranslations('Friends');

  const friends = [
    {
      id: "nextjs",
      url: "https://nextjs.org",
      logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png"
    },
    {
      id: "vercel",
      url: "https://vercel.com",
      logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico" 
    },
    {
      id: "tailwindcss",
      url: "https://tailwindcss.com",
      logo: "https://www.tailwindcss.cn/favicons/apple-touch-icon.png?v=3"
    },
    {
      id: "Amethyst",
      url: "https://www.amethyst.ltd/",
      logo: "https://docs.amethyst.ltd/icon.png"
    },
    {
      id: "FurCraft",
      url: "https://furcraft.top/",
      logo: "https://furcraft.top/logo.png"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <a 
                href={friend.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block h-full group"
              >
                <Card className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-muted p-2 flex items-center justify-center border border-border/50">
                      <Image 
                        src={friend.logo} 
                        alt={t(`items.${friend.id}.name`)} 
                        width={32} 
                        height={32} 
                        className="object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors">
                      {t(`items.${friend.id}.name`)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {t(`items.${friend.id}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
