import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
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
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
  { colSpan: 4, rowSpan: 2 },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <TechMarquee />
      <BentoGrid>
        <AboutCard />
        <SkillsCard />
        <YearsCard />
        <ExperienceCard />
        <div
          id="projects"
          style={{ gridColumn: "span 12", gridRow: "span 2" }}
          className="flex items-end pb-1 px-1"
        >
          <h2
            className="font-display font-black leading-[0.92] tracking-[-2px]"
            style={{ fontSize: "clamp(36px, 5.5vw, 80px)" }}
          >
            <span className="text-stroke">PRODUCTS</span>
            <span className="text-stroke-blue"> + PROJECTS</span>
          </h2>
        </div>
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
