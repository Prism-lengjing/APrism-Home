"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle radial gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/40 via-background to-background pointer-events-none" />

      <div className="container-apple flex flex-col items-center text-center space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-apple-display max-w-5xl tracking-tight text-foreground font-bold">
            {t('title_line1')} <br className="hidden sm:block" />
            <span className="text-primary">{t('title_line2')}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-apple-body text-muted-foreground max-w-2xl text-lg md:text-xl font-normal leading-relaxed"
        >
          {t('description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Button asChild variant="glass-primary" size="lg" className="w-full sm:w-auto">
            <Link href="/projects">
              {t('cta_primary')}
            </Link>
          </Button>
          <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
            <Link href="/contact">
              {t('cta_secondary')}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
