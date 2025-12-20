import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TeamPage() {
  const t = useTranslations('Team');
  const teamMembers = [
    {
      name: "彬彬Binbim",
      role: t('members.alex.role'),
      bio: t('members.alex.bio'),
      image: "https://q1.qlogo.cn/g?b=qq&nk=1721822150&s=640" // 替换为你的图片文件名
    },
    {
      name: "北尘BeiChen",
      role: t('members.sarah.role'),
      bio: t('members.sarah.bio'),
      image: "https://q1.qlogo.cn/g?b=qq&nk=3579267163&s=640" // 替换为你的图片文件名
    },
    {
      name: "顾雨晨Amazing",
      role: t('members.jordan.role'),
      bio: t('members.jordan.bio'),
      image: "https://q1.qlogo.cn/g?b=qq&nk=1280993766&s=640"
    },
    {
      name: "暂无 欢迎加入\nNone for now, welcome to join",
      role: t('members.emily.role'),
      bio: t('members.emily.bio'),
      image: "/images/team/logo.png"
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
                <div className="w-24 h-24 mx-auto mb-4 relative rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  {/* 如果图片加载失败或没有图片，显示首字母占位符 (需要自己处理图片存在性，这里简单处理) */}
                  {/* 为了简单起见，我们假设如果配置了 image 路径，就优先显示 Image 组件 */}
                  {/* 注意：在生产环境中，你可能需要一个 ImageWithFallback 组件来处理图片加载失败的情况 */}
                  
                  {member.image ? (
                     <Image 
                       src={member.image} 
                       alt={member.name}
                       fill
                       className="object-cover"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                  ) : (
                    <span className="text-2xl font-medium text-muted-foreground">
                      {member.name.charAt(0)}
                    </span>
                  )}
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
