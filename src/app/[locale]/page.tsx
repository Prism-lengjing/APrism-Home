import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <section className="py-8 bg-muted/30 border-t border-border/40">
        <div className="container-apple text-center">
          <p className="text-apple-caption">
            © {new Date().getFullYear()} AperturePrism. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}
