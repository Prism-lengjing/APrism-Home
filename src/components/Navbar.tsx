"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
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
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-[#161617]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container-apple flex items-center justify-between">
        <Link 
          href="/" 
          className={cn(
            "text-apple-title font-bold tracking-tight hover:opacity-80 transition-opacity z-50",
            scrolled || isMenuOpen ? "text-white" : "text-foreground"
          )}
        >
          {t('brand')}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {['about', 'team', 'projects', 'contact'].map((item) => (
            <Link
              key={item}
              href={`/${item}`}
              className={cn(
                "text-sm font-medium transition-colors",
                scrolled 
                  ? "text-gray-300 hover:text-white" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t(`links.${item}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 z-50">
            <button 
              onClick={switchLocale}
              className={cn(
                "text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-white/10",
                (scrolled || isMenuOpen) ? "text-white" : "text-foreground hover:bg-black/5"
              )}
            >
              {locale === 'zh' ? 'EN' : '中'}
            </button>
            <div className={cn((scrolled || isMenuOpen) ? "text-white" : "text-foreground")}>
              <ModeToggle className={cn(
                "hover:bg-transparent", 
                (scrolled || isMenuOpen) ? "text-white hover:text-white/80" : "text-foreground hover:text-foreground/80"
              )} />
            </div>
            <Link href="/contact" className="hidden md:block">
                <button className="glass-button-primary text-sm font-medium cursor-pointer">
                {t('cta')}
                </button>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className={cn(
                "md:hidden p-2 -mr-2",
                (scrolled || isMenuOpen) ? "text-white" : "text-foreground"
              )}
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
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {['about', 'team', 'projects', 'contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  className="text-2xl font-medium text-white/90 hover:text-white transition-colors py-2"
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
