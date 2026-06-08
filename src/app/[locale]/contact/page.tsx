import { PageTemplate } from "@/components/ui/PageTemplate";
import { Mail, Globe } from "lucide-react";
import { FaGithub, FaDiscord, FaSlack, FaTelegramPlane, FaQq } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";

export default async function ContactPage() {
  const t = await getTranslations('Contact');

  const socialLinks = [
    { name: "GitHub", icon: FaGithub, href: "https://github.com/Prism-lengjing", color: "hover:text-[#333]" },
    { name: "QQ Group", icon: FaQq, href: "https://qm.qq.com/q/UYKp4asBa0", color: "hover:text-[#12B7F5]" },
    { name: "Discord", icon: FaDiscord, href: "https://discord.gg/NmGyMkwfPT", color: "hover:text-[#5865F2]" },
    { name: "Slack", icon: FaSlack, href: "https://join.slack.com/t/prism-mxy9862/shared_invite/zt-3llxiwe44-0~kEaQkbmOCuZgY_jYH2sA", color: "hover:text-[#4A154B]" },
    { name: "Telegram", icon: FaTelegramPlane, href: "https://t.me/apertureprism", color: "hover:text-[#0088cc]" },
  ];

  return (
    <PageTemplate title={t('title')}>
      <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-16">
        {t('description')}
      </p>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="glass-card p-8">
          <Suspense fallback={<div className="h-96 animate-pulse bg-muted rounded-xl" />}>
            <ContactForm />
          </Suspense>
        </div>

        <div className="space-y-12">
          <div className="glass-card p-8">
            <h3 className="text-apple-title mb-8 text-foreground">{t('info.title')}</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t('info.email')}</p>
                  <p className="text-muted-foreground">hello@aprism.top</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-secondary text-primary">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{t('info.workMode')}</p>
                  <p className="text-muted-foreground">Remote First / Global</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-apple-title mb-8 text-foreground">{t('social.title')}</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-xl bg-secondary/50 border border-border transition-all interactive ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-8 border-primary/20">
            <h4 className="font-semibold mb-2 text-foreground">{t('join.title')}</h4>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {t('join.description')}
            </p>
            <Link href="/careers" className="text-sm font-medium text-primary hover:underline interactive">
              {t('join.cta')}
            </Link>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
}
