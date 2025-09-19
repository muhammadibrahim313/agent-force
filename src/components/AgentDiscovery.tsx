import { useState, useEffect, useRef } from "react";
import SearchFilterBar from "./SearchFilterBar";
import CategorySidebar from "./CategorySidebar";
import LiveActivityFeed from "./LiveActivityFeed";
import SortingBar from "./SortingBar";
import EnhancedAgentCard from "./EnhancedAgentCard";
import sarahChen from "@/assets/sarah-chen.jpg";
import marcusRodriguez from "@/assets/marcus-rodriguez.jpg";
import aishaPatel from "@/assets/aisha-patel.jpg";

const AgentDiscovery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mockAgents = [
    {
      name: "Sarah Chen",
      role: "Data Science Specialist",
      avatar: sarahChen,
      rating: 4.9,
      reviews: 127,
      price: "$45/hour",
      skills: ["Machine Learning", "Python", "SQL", "Data Visualization", "Statistics", "TensorFlow", "Pandas"],
      status: 'Available' as const,
      responseTime: "~2 min",
      performance: [85, 92, 88, 95, 90, 87, 93],
      frameworks: ["CrewAI", "LangChain"],
      bestSkill: "ML Expert"
    },
    {
      name: "Marcus Rodriguez",
      role: "Full-Stack Developer",
      avatar: marcusRodriguez,
      rating: 4.8,
      reviews: 93,
      price: "$38/hour",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL"],
      status: 'Busy' as const,
      responseTime: "~5 min",
      performance: [78, 85, 90, 87, 92, 89, 91],
      frameworks: ["CrewAI"],
      bestSkill: "Full-Stack"
    },
    {
      name: "Aisha Patel",
      role: "AI Strategy Consultant",
      avatar: aishaPatel,
      rating: 5.0,
      reviews: 84,
      price: "$85/hour",
      skills: ["AI Strategy", "Business Intelligence", "Process Automation", "ROI Analysis"],
      status: 'Queue' as const,
      queueCount: 3,
      responseTime: "~1 min",
      performance: [95, 98, 94, 97, 96, 99, 95],
      frameworks: ["LangChain", "CrewAI"],
      bestSkill: "Strategy"
    },
    // Additional mock agents
    {
      name: "Alex Thompson",
      role: "Content Marketing Expert",
      avatar: sarahChen, // Reusing for demo
      rating: 4.7,
      reviews: 156,
      price: "$42/hour",
      skills: ["Content Strategy", "SEO", "Social Media", "Copywriting"],
      status: 'Available' as const,
      responseTime: "~3 min",
      performance: [82, 88, 85, 90, 87, 84, 89],
      frameworks: ["CrewAI"],
      bestSkill: "Content"
    },
    {
      name: "Jordan Kim",
      role: "Customer Support AI",
      avatar: marcusRodriguez, // Reusing for demo
      rating: 4.6,
      reviews: 203,
      price: "$28/hour",
      skills: ["Customer Service", "Chatbot Development", "Process Automation"],
      status: 'Available' as const,
      responseTime: "~1 min",
      performance: [75, 80, 78, 85, 82, 79, 84],
      frameworks: ["LangChain"],
      bestSkill: "Support"
    },
    {
      name: "Emma Davis",
      role: "Research Analyst",
      avatar: aishaPatel, // Reusing for demo
      rating: 4.9,
      reviews: 67,
      price: "$55/hour",
      skills: ["Market Research", "Competitive Analysis", "Data Mining"],
      status: 'Queue' as const,
      queueCount: 2,
      responseTime: "~4 min",
      performance: [88, 91, 93, 89, 94, 90, 92],
      frameworks: ["CrewAI", "LangChain"],
      bestSkill: "Research"
    }
  ];

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-background min-h-screen">
      {/* Live Activity Feed */}
      <div className="relative">
        <LiveActivityFeed />
      </div>

      {/* Search & Filter Bar */}
      <SearchFilterBar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <CategorySidebar />
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Sorting Bar */}
            <SortingBar 
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalAgents={mockAgents.length}
            />

            {/* Agent Grid/List */}
            <div className="mt-6">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {mockAgents.map((agent, index) => (
                    <div
                      key={`${agent.name}-${index}`}
                      ref={(el) => (cardRefs.current[index] = el)}
                      data-index={index}
                      className={`transition-all duration-500 ${
                        visibleCards.has(index)
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <EnhancedAgentCard
                        {...agent}
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {mockAgents.map((agent, index) => (
                    <div
                      key={`${agent.name}-${index}`}
                      ref={(el) => (cardRefs.current[index] = el)}
                      data-index={index}
                      className={`transition-all duration-500 ${
                        visibleCards.has(index)
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <EnhancedAgentCard
                        {...agent}
                        viewMode={viewMode}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="text-primary hover:text-primary/80 font-semibold text-lg transition-colors duration-200 group">
                Load More Agents
                <span className="ml-2 transition-transform group-hover:translate-y-1 inline-block">↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentDiscovery;