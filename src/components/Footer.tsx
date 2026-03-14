import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-muted/30 border-t border-border/40 py-12 md:py-16">
      <div className="container-apple grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="text-apple-title font-bold tracking-tight">
            APrism
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            {t('slogan')}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">{t('columns.company')}</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground transition-colors">{t('links.about')}</Link></li>
            <li><Link href="/team" className="hover:text-foreground transition-colors">{t('links.team')}</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">{t('links.contact')}</Link></li>
            <li><Link href="/friends" className="hover:text-foreground transition-colors">{t('links.friends')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">{t('columns.work')}</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/projects" className="hover:text-foreground transition-colors">{t('links.projects')}</Link></li>
            <li><Link href="/services" className="hover:text-foreground transition-colors">{t('links.services')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">{t('columns.legal')}</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/privacy" className="hover:text-foreground transition-colors">{t('links.privacy')}</Link></li>
            <li><Link href="/terms" className="hover:text-foreground transition-colors">{t('links.terms')}</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container-apple mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>{t('copyright', { year: new Date().getFullYear() })}</p>
        <div className="flex gap-4">
            {/* Social icons could go here */}
        </div>
      </div>
    </footer>
  );
}
