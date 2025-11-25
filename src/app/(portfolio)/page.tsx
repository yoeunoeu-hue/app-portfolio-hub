import { Hero } from "@/components/sections/hero";
import { Education } from "@/components/sections/education";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Achievements } from "@/components/sections/achievements";
import { Experience } from "@/components/sections/experience";
import { Testimonials } from "@/components/sections/testimonials";
import { Updates } from "@/components/sections/updates";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Education />
      <Skills />
      <Projects />
      <Achievements />
      <Experience />
      <Testimonials />
      <Updates />
      <Contact />
    </>
  );
}
