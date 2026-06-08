import { PageTemplate } from "@/components/ui/PageTemplate";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const fallbackFriends = [
  { id: "nextjs", name: "Next.js", description: "Web 的 React 框架", url: "https://nextjs.org", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
  { id: "vercel", name: "Vercel", description: "开发、预览、发布", url: "https://vercel.com", logo: "https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico" },
  { id: "tailwindcss", name: "Tailwind CSS", description: "无需离开 HTML 即可快速构建现代网站", url: "https://tailwindcss.com", logo: "https://www.tailwindcss.cn/favicons/apple-touch-icon.png?v=3" },
  { id: "FurCraft", name: "FurCraft", description: "专注于furry相关项目的开发与维护。", url: "https://furcraft.top/", logo: "https://furcraft.top/logo.png" },
];

async function getFriendsData(locale: string) {
  try {
    const { getFriendLinks } = await import("@/lib/data/friends");
    const friends = await getFriendLinks(locale);
    return friends.length > 0 ? friends : fallbackFriends;
  } catch {
    return fallbackFriends;
  }
}

export default async function FriendsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Friends');
  const friends = await getFriendsData(locale);

  return (
    <PageTemplate title={t('title')}>
      <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-16">
        {t('description')}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {friends.map((friend, index) => (
          <ScrollReveal key={friend.id} delay={index * 0.1}>
            <a href={friend.url} target="_blank" rel="noopener noreferrer" className="block h-full interactive">
              <Card className="glass-card h-full flex items-center gap-6 p-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-secondary p-3 flex items-center justify-center border border-border">
                  <Image src={friend.logo} alt={friend.name} width={48} height={48} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{friend.name}</h3>
                  <p className="text-sm text-muted-foreground">{friend.description}</p>
                </div>
              </Card>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </PageTemplate>
  );
}
