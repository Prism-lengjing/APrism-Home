import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { ConditionalAppShell } from "@/components/layout/ConditionalAppShell";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: "AperturePrism | 光圈棱镜",
    template: "%s | AperturePrism"
  },
  description: "AperturePrism is a collective of designers, engineers, and visionaries dedicated to refracting simple ideas into spectrums of possibility.",
  keywords: ["AperturePrism", "Design", "Development", "Innovation", "Web Design", "App Development"],
  authors: [{ name: "AperturePrism Team" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://apertureprism.com",
    siteName: "AperturePrism",
    title: "AperturePrism | 光圈棱镜",
    description: "Innovation Refracted Through Design",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AperturePrism Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AperturePrism | 光圈棱镜",
    description: "Innovation Refracted Through Design",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConditionalAppShell>
              {children}
            </ConditionalAppShell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
