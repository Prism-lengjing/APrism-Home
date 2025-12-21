"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle Background Gradient - Removed */}
      {/* <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100/30 via-background to-background dark:from-white/5 pointer-events-none" /> */}

      <div className="container-apple flex flex-col items-center text-center space-y-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
          className="flex flex-col items-center"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-muted/50 backdrop-blur-md text-xs font-medium text-muted-foreground mb-6 border border-border/50">
            {t('welcome')}
          </span>
          <h1 className="text-apple-display max-w-5xl tracking-tight text-foreground">
            {t('title_line1')} <br className="hidden sm:block" />
            <span className="text-muted-foreground">{t('title_line2')}</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
          className="text-apple-body text-muted-foreground max-w-2xl text-lg md:text-xl font-normal leading-relaxed"
        >
          {t('description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-8"
        >
          <Link href="/projects">
            <button className="glass-button-primary text-base px-8 py-3 font-medium cursor-pointer w-full sm:w-auto">
              {t('cta_primary')}
            </button>
          </Link>
          <Link href="/contact">
            <button className="glass-button text-base px-8 py-3 font-medium cursor-pointer bg-white/50 dark:bg-black/50 w-full sm:w-auto">
              {t('cta_secondary')}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
