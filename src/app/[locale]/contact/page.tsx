import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <Section className="pt-32 pb-12">
        <h1 className="text-apple-display mb-4">{t('title')}</h1>
        <p className="text-apple-body text-xl text-muted-foreground max-w-2xl">
          {t('description')}
        </p>
      </Section>

      <Section className="pt-0 pb-24">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-apple-title mb-6">{t('info.title')}</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-muted text-foreground">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{t('info.email')}</p>
                    <p className="text-muted-foreground">hello@apertureprism.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-muted text-foreground">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{t('info.phone')}</p>
                    <p className="text-muted-foreground">+1 (555) 000-0000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-muted text-foreground">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">{t('info.office')}</p>
                    <p className="text-muted-foreground">
                      123 Innovation Way<br />
                      Tech District, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-muted/30 border border-border/50">
              <h4 className="font-semibold mb-2">{t('join.title')}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {t('join.description')}
              </p>
              <button className="text-sm font-medium text-accent hover:underline">
                {t('join.cta')}
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
