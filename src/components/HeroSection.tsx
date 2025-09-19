import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    agents: 0,
    saved: 0,
    time: 0,
  });

  useEffect(() => {
    const targets = {
      agents: 2847,
      saved: 2.3,
      time: 15,
    };

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(currentStep / steps, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedNumbers({
        agents: Math.floor(targets.agents * easeOutQuart),
        saved: Number((targets.saved * easeOutQuart).toFixed(1)),
        time: Math.floor(targets.time * easeOutQuart),
      });

      if (progress >= 1) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const createParticles = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${6 + Math.random() * 4}s`,
        }}
      />
    ));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
      {/* Particle Animation */}
      <div className="particles">
        {createParticles()}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Hero Headline */}
          <h1 className="text-hero gradient-text max-w-5xl mx-auto">
            Hire Elite AI Agent Teams in Seconds
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect with specialized AI agents that collaborate seamlessly to solve complex business challenges
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 glow-button text-lg px-8 py-4 group"
            >
              Browse Agent Teams
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Metric Cards */}
      <div className="absolute bottom-8 left-4 right-4 z-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Active Agents Card */}
            <div className="glass-card rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                {animatedNumbers.agents.toLocaleString()}
              </div>
              <div className="text-muted-foreground mt-1">Active Agents</div>
            </div>

            {/* Savings Card */}
            <div className="glass-card rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-accent">
                ${animatedNumbers.saved}M
              </div>
              <div className="text-muted-foreground mt-1">Saved by Users</div>
            </div>

            {/* Speed Card */}
            <div className="glass-card rounded-lg p-6 text-center hover-lift">
              <div className="text-3xl md:text-4xl font-bold text-emerald-green">
                {animatedNumbers.time} sec
              </div>
              <div className="text-muted-foreground mt-1">Average Task Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;