import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";
import SkillsCard from "@/components/cards/SkillsCard";
import YearsCard from "@/components/cards/YearsCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <BentoGrid>
        <AboutCard />
        <SkillsCard />
        <YearsCard />
      </BentoGrid>
    </main>
  );
}
