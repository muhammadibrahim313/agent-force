import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AgentDiscovery from "@/components/AgentDiscovery";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AgentDiscovery />
      </main>
    </div>
  );
};

export default Index;
