import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import AboutCard from "@/components/cards/AboutCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <BentoGrid>
        <AboutCard />
      </BentoGrid>
    </main>
  );
}
