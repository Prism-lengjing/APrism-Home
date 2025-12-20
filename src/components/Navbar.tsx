"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ModeToggle } from "./ModeToggle";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
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
            "text-apple-title font-bold tracking-tight hover:opacity-80 transition-opacity",
            scrolled ? "text-white" : "text-foreground"
          )}
        >
          {t('brand')}
        </Link>
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
        <div className="flex items-center gap-4">
            <button 
              onClick={switchLocale}
              className={cn(
                "text-sm font-medium transition-colors px-2 py-1 rounded hover:bg-white/10",
                scrolled ? "text-white" : "text-foreground hover:bg-black/5"
              )}
            >
              {locale === 'zh' ? 'EN' : '中'}
            </button>
            <ModeToggle className={scrolled ? "text-white hover:bg-white/10" : "text-foreground hover:bg-black/5"} />
            <Link href="/contact" className="hidden md:block">
                <button className="glass-button-primary text-sm font-medium cursor-pointer">
                {t('cta')}
                </button>
            </Link>
        </div>
      </div>
    </header>
  );
}
