import AgentCard from "./AgentCard";
import TeamBuilderButton from "./TeamBuilderButton";
import sarahChen from "@/assets/sarah-chen.jpg";
import marcusRodriguez from "@/assets/marcus-rodriguez.jpg";
import aishaPatel from "@/assets/aisha-patel.jpg";

const AgentShowcase = () => {
  const featuredAgents = [
    {
      id: "sarah-chen",
      name: "Sarah Chen",
      role: "Data Science Specialist",
      avatar: sarahChen,
      rating: 4.9,
      reviews: 127,
      price: 45,
      skills: ["Machine Learning", "Python", "SQL", "Data Visualization", "Statistics", "TensorFlow"],
      estimatedTime: 30
    },
    {
      id: "marcus-rodriguez", 
      name: "Marcus Rodriguez",
      role: "Full-Stack Developer",
      avatar: marcusRodriguez,
      rating: 4.8,
      reviews: 93,
      price: 38,
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL"],
      estimatedTime: 45
    },
    {
      id: "aisha-patel",
      name: "Aisha Patel", 
      role: "AI Strategy Consultant",
      avatar: aishaPatel,
      rating: 5.0,
      reviews: 84,
      price: 85,
      skills: ["AI Strategy", "Business Intelligence", "Process Automation", "ROI Analysis"],
      estimatedTime: 60
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--electric-blue) / 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, hsl(var(--emerald-green) / 0.1) 0%, transparent 50%)`
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-heading gradient-text mb-6">
            Meet Our Top Performing Agents
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked specialists ready to transform your business with cutting-edge AI solutions
          </p>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAgents.map((agent) => (
            <AgentCard key={agent.id} {...agent} price={`$${agent.price}/hour`} />
          ))}
        </div>

        {/* View All Agents Button */}
        <div className="text-center mt-12">
          <button className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors duration-200 group">
            View All 2,847 Agents
            <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">→</span>
          </button>
        </div>
      </div>

      {/* Team Builder Button */}
      <TeamBuilderButton availableAgents={featuredAgents} />
    </section>
  );
};

export default AgentShowcase;