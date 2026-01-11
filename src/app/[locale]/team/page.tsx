import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";

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
      name: "赤焰鸿燏advan10",
      role: t('members.advan10.role'),
      bio: t('members.advan10.bio'),
      image: "https://q1.qlogo.cn/g?b=qq&nk=3655144879&s=640"
    },
    {
      name: "不知道先生stralightnwn",
      role: t('members.stralightnwn.role'),
      bio: t('members.stralightnwn.bio'),
      image: "https://q1.qlogo.cn/g?b=qq&nk=1287830257&s=640"
    },
    {
      name: "暂无 欢迎加入\nNone for now, welcome to join",
      role: t('members.emily.role'),
      bio: t('members.emily.bio'),
      image: "/images/team/logo.png"
    }
  ];

  const subTeams = [
    {
      name: t('subTeams.items.lab.name'),
      description: t('subTeams.items.lab.description'),
      image: "/images/projects/APrism-Home.png", // 使用占位图或替换为实际团队封面
      category: t('subTeams.items.lab.category'),
      website: t('subTeams.items.lab.website')
    },
    {
      name: t('subTeams.items.design.name'),
      description: t('subTeams.items.design.description'),
      image: "/images/projects/APrism-Home.png", // 使用占位图或替换为实际团队封面
      category: t('subTeams.items.design.category'),
      website: t('subTeams.items.design.website')
    }
  ];

  const coCreationTeams = [
    {
      name: t('coCreationTeams.items.community.name'),
      description: t('coCreationTeams.items.community.description'),
      image: "https://docs.amethyst.ltd/icon.png", 
      category: t('coCreationTeams.items.community.category'),
      website: t('coCreationTeams.items.community.website')
    },
    {
      name: t('coCreationTeams.items.partners.name'),
      description: t('coCreationTeams.items.partners.description'),
      image: "https://furcraft.top/logo.png",
      category: t('coCreationTeams.items.partners.category'),
      website: t('coCreationTeams.items.partners.website')
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

      {/* Sub-teams Section */}
      <Section className="bg-muted/30 pt-24 pb-24">
        <ScrollReveal>
          <h2 className="text-apple-headline mb-12 text-center">{t('subTeams.title')}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subTeams.map((team, index) => (
            <ScrollReveal key={index} delay={index * 0.1 + 0.2}>
              <Card className="group cursor-pointer h-full text-left">
                <div className="aspect-video bg-muted rounded-t-xl mb-6 flex items-center justify-center text-muted-foreground/50 text-4xl font-light overflow-hidden relative">
                  {team.image ? (
                     <Image 
                       src={team.image} 
                       alt={team.name}
                       fill
                       className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      Preview
                    </>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xl font-medium text-accent uppercase tracking-wider">
                      {team.category}
                    </div>
                    {team.website && (
                      <ExternalLinkButton href={team.website} />
                    )}
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {team.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {team.description}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Co-creation Teams Section */}
      <Section className="pt-24 pb-24">
        <ScrollReveal>
          <h2 className="text-apple-headline mb-12 text-center">{t('coCreationTeams.title')}</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {coCreationTeams.map((team, index) => (
            <ScrollReveal key={index} delay={index * 0.1 + 0.2}>
              <Card className="group cursor-pointer h-full text-left">
                <div className="aspect-video bg-muted rounded-t-xl mb-6 flex items-center justify-center text-muted-foreground/50 text-4xl font-light overflow-hidden relative">
                  {team.image ? (
                     <Image 
                       src={team.image} 
                       alt={team.name}
                       fill
                       className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      Preview
                    </>
                  )}
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-xl font-medium text-accent uppercase tracking-wider">
                      {team.category}
                    </div>
                    {team.website && (
                      <ExternalLinkButton href={team.website} />
                    )}
                  </div>
                  <CardTitle className="group-hover:text-accent transition-colors">
                    {team.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {team.description}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      {/* Co-creation Plan Section */}
      <Section className="pt-24 pb-24">
        <ScrollReveal>
          <Card className="relative overflow-hidden p-8 md:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-apple-headline mb-6">{t('coCreation.title')}</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                {t('coCreation.description')}
              </p>
              <Link href="/contact">
                <button className="glass-button-primary px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl">
                  {t('coCreation.cta')}
                </button>
              </Link>
            </div>
          </Card>
        </ScrollReveal>
      </Section>

      <Footer />
    </main>
  );
}
