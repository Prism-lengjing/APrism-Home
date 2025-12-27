"use client";

import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ExternalLink, Code2, Calendar, Users, Briefcase, Clock, Images } from "lucide-react";
import { notFound } from "next/navigation";
import { use } from "react";
import { Button } from "@/components/ui/button";

export default function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations('Projects');

  // Simple validation to check if project exists in our list
  // In a real app, you'd check against a database or a config list
  const validProjects = ['alpha', 'neon', 'quantum', 'aether'];
  if (!validProjects.includes(slug)) {
    notFound();
  }

  // Mock extended metadata
  const meta = {
    timeline: "3 Months",
    teamSize: "4 People",
    role: "Full Stack & Design",
    year: "2024",
    gallery: [
      "/images/projects/APrism-Home.png",
      "/images/projects/Fur-Img-API_V2.png",
      "/images/projects/aether.jpg"
    ]
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <ScrollReveal>
          <div className="mb-8">
            <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2 group-hover:bg-accent group-hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              {t('backToProjects') || "Back to Projects"}
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="text-accent font-medium mb-2 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                {t(`items.${slug}.category`)}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                {t(`items.${slug}.title`)}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                {t(`items.${slug}.description`)}
              </p>
            </div>
            <div className="flex gap-4">
              <Button className="glass-button-primary rounded-full px-8 h-12 text-base">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Main Image */}
      <Section className="pt-0 pb-16">
        <ScrollReveal delay={0.1}>
          <div className="aspect-video w-full relative rounded-3xl overflow-hidden bg-muted border border-white/10 shadow-2xl">
             <Image 
               src={
                 slug === 'alpha' ? "/images/projects/APrism-Home.png" :
                 slug === 'neon' ? "/images/projects/Fur-Img-API_V2.png" :
                 slug === 'quantum' ? "/images/projects/quantum-flow.jpg" :
                 "/images/projects/aether.jpg"
               }
               alt={t(`items.${slug}.title`)}
               fill
               className="object-cover"
               priority
             />
          </div>
        </ScrollReveal>
      </Section>

      {/* Project Stats Grid */}
      <Section className="pt-0 pb-16">
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calendar, label: t('stats.year'), value: meta.year },
              { icon: Clock, label: t('stats.timeline'), value: meta.timeline },
              { icon: Users, label: t('stats.teamSize'), value: meta.teamSize },
              { icon: Briefcase, label: t('stats.role'), value: meta.role },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-white/5 flex flex-col items-center text-center hover:bg-muted/50 transition-colors">
                <stat.icon className="w-6 h-6 text-accent mb-3" />
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="font-semibold text-lg">{stat.value}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Content & Tech Stack */}
      <Section className="pt-0 pb-24">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none text-muted-foreground">
                <p className="leading-relaxed">
                  {t(`items.${slug}.content`)}
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <ul className="grid gap-4">
                {[
                  "Responsive Design for all devices",
                  "High Performance & SEO Optimized",
                  "Modern UI/UX with smooth animations",
                  "Secure & Scalable Architecture"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/20 border border-white/5">
                    <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            {/* Gallery Section */}
            <ScrollReveal delay={0.4}>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Images className="w-8 h-8 text-accent" />
                {t('gallery')}
              </h2>
              <div className="grid gap-6">
                {meta.gallery.map((img, i) => (
                  <div key={i} className="aspect-video relative rounded-2xl overflow-hidden bg-muted border border-white/10 group">
                    <Image 
                      src={img}
                      alt={`Gallery ${i}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            <ScrollReveal delay={0.4}>
              <div className="p-8 rounded-3xl bg-muted/30 border border-white/5 sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-accent" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t(`items.${slug}.technologies`).split(', ').map((tech, i) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-background text-sm font-medium text-muted-foreground border border-white/10 hover:border-accent/50 hover:text-foreground transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Project Links</h4>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start h-12" asChild>
                      <Link href="#">GitHub Repository</Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-12" asChild>
                      <Link href="#">Design System</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
