import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";
import SkillsCard from "@/components/cards/SkillsCard";
import YearsCard from "@/components/cards/YearsCard";
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
        {/* Row 1: About + Skills + Years */}
        <AboutCard />
        <SkillsCard />
        <YearsCard />
        {/* Row 2: Featured project */}
        <FeaturedProjectCard />
        {/* Rows 3–4: remaining projects */}
        {nonFeatured.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            colSpan={projectLayouts[i]?.colSpan ?? 4}
            rowSpan={projectLayouts[i]?.rowSpan ?? 2}
          />
        ))}
        {/* Contact bar */}
        <ContactBar />
      </BentoGrid>
    </main>
  );
}
