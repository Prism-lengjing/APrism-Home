import { PageTemplate } from "@/components/ui/PageTemplate";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ExternalLink } from "lucide-react";

// Fallback data
const fallbackMembers = [
  { name: "彬彬Binbim", nameEn: "Binbim", role: "创始人 & 核心开发者", roleEn: "Founder & Lead Designer", bio: "全栈开发者，热爱折腾新技术的极客。", bioEn: "Full Stack Developer, a geek who loves tinkering with new technologies.", image: "https://q1.qlogo.cn/g?b=qq&nk=1721822150&s=640" },
  { name: "北尘BeiChen", nameEn: "BeiChen", role: "创始人 & 核心开发者", roleEn: "Founder & Core Developer", bio: "前端工程师 & 摸鱼小能手", bioEn: "Frontend Engineer & Expert at Slacking Off", image: "https://q1.qlogo.cn/g?b=qq&nk=3579267163&s=640" },
  { name: "赤焰鸿燏advan10", nameEn: "advan10", role: "创始人 & 核心开发者", roleEn: "Founder & Core Developer", bio: "做一条鱼", bioEn: "Be a fish", image: "https://q1.qlogo.cn/g?b=qq&nk=3655144879&s=640" },
  { name: "不知道先生stralightnwn", nameEn: "stralightnwn", role: "创始人 & 核心开发者", roleEn: "Founder & Core Developer", bio: "信竞大手子(", bioEn: "Top hacker in information competitions(", image: "https://q1.qlogo.cn/g?b=qq&nk=1287830257&s=640" },
  { name: "欢迎加入", nameEn: "Join Us", role: "暂无 欢迎加入", roleEn: "None for now, welcome to join", bio: "暂无 欢迎加入", bioEn: "None for now, welcome to join", image: "/images/team/logo.png" },
];

const fallbackSubTeams = [
  { name: "Quantum Flow（模拟数据）", nameEn: "Quantum Flow (Simulated)", description: "专注于前沿技术探索、实验性项目孵化与技术基础设施构建。", descriptionEn: "Focused on frontier technology exploration.", image: "/images/projects/APrism-Home.png", category: "研发", categoryEn: "R&D", website: "https://lab.apertureprism.com" },
  { name: "Quantum Flow（模拟数据）", nameEn: "Quantum Flow (Simulated)", description: "负责视觉识别系统、用户体验设计与创意交互的落地。", descriptionEn: "Responsible for visual identity systems and UX design.", image: "/images/projects/APrism-Home.png", category: "设计", categoryEn: "Design", website: "https://design.apertureprism.com" },
];

const fallbackCoCreation = [
  { name: "FurCraft", description: "专注于furry相关项目的开发与维护。", descriptionEn: "Focus on furry-related projects.", image: "https://furcraft.top/logo.png", category: "团队", categoryEn: "Team", website: "https://furcraft.top/" },
];

async function getTeamData(locale: string) {
  try {
    const { getTeamMembers, getSubTeams, getCoCreationTeams } = await import("@/lib/data/team");
    const [members, subTeams, coCreationTeams] = await Promise.all([
      getTeamMembers(locale),
      getSubTeams(locale),
      getCoCreationTeams(locale),
    ]);
    if (members.length > 0) return { members, subTeams, coCreationTeams };
  } catch {}
  // Fallback
  const isZh = locale === 'zh';
  return {
    members: fallbackMembers.map(m => ({
      name: isZh ? m.name : m.nameEn,
      role: isZh ? m.role : m.roleEn,
      bio: isZh ? m.bio : m.bioEn,
      image: m.image,
    })),
    subTeams: fallbackSubTeams.map(t => ({
      name: isZh ? t.name : t.nameEn,
      description: isZh ? t.description : t.descriptionEn,
      image: t.image,
      category: isZh ? t.category : t.categoryEn,
      website: t.website,
    })),
    coCreationTeams: fallbackCoCreation.map(t => ({
      name: t.name,
      description: isZh ? t.description : t.descriptionEn,
      image: t.image,
      category: isZh ? t.category : t.categoryEn,
      website: t.website,
    })),
  };
}

export default async function TeamPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Team');
  const { members, subTeams, coCreationTeams } = await getTeamData(locale);

  return (
    <PageTemplate title={t('title')}>
      <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-16">
        {t('description')}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-24">
        {members.map((member: any, index: number) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <Card className="glass-card h-full p-6 text-center interactive">
              <div className="w-20 h-20 mx-auto mb-4 relative rounded-full overflow-hidden bg-muted">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-xs font-medium text-primary mb-3 uppercase">{member.role}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <h2 className="text-apple-headline mb-12 text-center">{t('subTeams.title')}</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-24">
        {subTeams.map((team: any, index: number) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <Card className="glass-card h-full p-0 overflow-hidden interactive">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <Image src={team.image} alt={team.name} fill className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-medium text-primary uppercase tracking-wider">{team.category}</div>
                  {team.website && <a href={team.website} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" /></a>}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{team.name}</h3>
                <p className="text-sm text-muted-foreground">{team.description}</p>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <h2 className="text-apple-headline mb-12 text-center">{t('coCreationTeams.title')}</h2>
      <div className="grid md:grid-cols-2 gap-8 mb-24">
        {coCreationTeams.map((team: any, index: number) => (
          <ScrollReveal key={index} delay={index * 0.1}>
            <Card className="glass-card h-full p-0 overflow-hidden interactive">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <Image src={team.image} alt={team.name} fill className="object-contain p-8 transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-xs font-medium text-primary uppercase tracking-wider">{team.category}</div>
                  {team.website && <a href={team.website} target="_blank" rel="noreferrer"><ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" /></a>}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{team.name}</h3>
                <p className="text-sm text-muted-foreground">{team.description}</p>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <Card className="glass-card p-12 text-center interactive">
        <h2 className="text-apple-headline mb-6">{t('coCreation.title')}</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">{t('coCreation.description')}</p>
        <Link href="/contact" className="glass-button-primary px-8 py-3 rounded-full font-medium inline-block">
          {t('coCreation.cta')}
        </Link>
      </Card>
    </PageTemplate>
  );
}
