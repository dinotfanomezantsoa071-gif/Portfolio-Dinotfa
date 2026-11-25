import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Interests } from "@/components/sections/Interests";
import { Languages } from "@/components/sections/Languages";
import { Projects } from "@/components/sections/Projects";
import { Qualities } from "@/components/sections/Qualities";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { PageTransition } from "@/components/providers/PageTransition";

export default function HomePage() {
  return (
    <PageTransition>
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />

        <div className="container-page space-y-6 pt-20 md:pt-28">
          <Qualities />
          <div className="grid gap-6 md:grid-cols-2">
            <Languages />
            <Interests />
          </div>
        </div>

        <Contact />
      </main>
    </PageTransition>
  );
}