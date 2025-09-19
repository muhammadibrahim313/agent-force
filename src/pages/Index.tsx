import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AgentShowcase from "@/components/AgentShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AgentShowcase />
      </main>
    </div>
  );
};

export default Index;
