import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";
import SkillsCard from "@/components/cards/SkillsCard";
import YearsCard from "@/components/cards/YearsCard";
import ExperienceCard from "@/components/cards/ExperienceCard";
import FeaturedProjectCard from "@/components/cards/FeaturedProjectCard";
import ProjectCard from "@/components/cards/ProjectCard";
import ContactBar from "@/components/cards/ContactBar";
import { projects } from "@/data/projects";

const nonFeatured = projects.filter((p) => !p.featured);

const projectLayouts: { colSpan: number; rowSpan: number }[] = [
  { colSpan: 5, rowSpan: 3 },
  { colSpan: 5, rowSpan: 3 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <BentoGrid>
        <AboutCard />
        <SkillsCard />
        <YearsCard />
        <ExperienceCard />
        <FeaturedProjectCard />
        {nonFeatured.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            colSpan={projectLayouts[i]?.colSpan ?? 4}
            rowSpan={projectLayouts[i]?.rowSpan ?? 2}
          />
        ))}
        <ContactBar />
      </BentoGrid>
    </main>
  );
}
