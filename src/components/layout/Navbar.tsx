"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const switchLocale = () => {
    const newLocale = locale === 'zh' ? 'en' : 'zh';
    // Use full page navigation to ensure server re-renders with new locale
    window.location.href = `/${newLocale}${pathname.replace(/^\/(zh|en)/, '')}`;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled && !isMenuOpen ? "glass border-b-0 shadow-sm py-3" : "bg-transparent py-5 border-transparent"
      )}
    >
      <div className="container-apple flex items-center justify-between mx-auto">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-apple-title font-bold tracking-tight hover:opacity-80 transition-opacity z-50 text-foreground"
        >
          <Image
            src="/images/team/logo.png"
            alt="Logo"
            width={28}
            height={28}
            className="object-contain rounded-full"
          />
          {t('brand')}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {['about', 'team', 'projects', 'friends', 'contact'].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
            >
              {t(`links.${item}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50">
            <button 
              onClick={switchLocale}
              className="text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-muted text-foreground"
            >
              {locale === 'zh' ? 'EN' : '中'}
            </button>
            <div className="text-foreground">
              <ModeToggle className="hover:bg-transparent text-foreground hover:text-foreground/80" />
            </div>
            <Link href="/contact" className="hidden md:block">
                <button className="glass-button-primary text-sm font-medium cursor-pointer">
                {t('cta')}
                </button>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -mr-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {['about', 'team', 'projects', 'friends', 'contact'].map((item) => (
                <Link
                  key={item}
                  onClick={() => setIsMenuOpen(false)}
                  href={`/${item}`}
                  className="text-2xl font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {t(`links.${item}`)}
                </Link>
              ))}
              <div className="mt-8 flex justify-center">
                <Link href="/contact" className="w-full">
                  <button className="glass-button-primary w-full py-4 text-lg font-medium cursor-pointer">
                    {t('cta')}
                  </button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
