import { useState, useEffect } from "react";

const LiveActivityFeed = () => {
  const [isPaused, setIsPaused] = useState(false);

  const activities = [
    "Sarah just hired Research Agent for competitive analysis",
    "Analysis Agent completed task for Mike Chen",
    "Content Creator finished blog post for Jessica",
    "Data Analyst delivered insights for TechCorp",
    "Marcus hired Full-Stack Developer for MVP",
    "AI Strategist completed roadmap for StartupXYZ",
    "Customer Support Agent resolved 15 tickets today",
    "Marketing Agent launched campaign for RetailCo"
  ];

  // Create duplicated array for seamless loop
  const duplicatedActivities = [...activities, ...activities];

  return (
    <>
      {/* Add CSS styles */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrolling-feed {
          animation: ${isPaused ? 'none' : 'scroll 60s linear infinite'};
        }
      `}</style>
      
      <div className="bg-muted/5 border-b border-muted/20 py-3 overflow-hidden relative">
        <div 
          className="flex whitespace-nowrap scrolling-feed"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center px-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>{activity}</span>
              </div>
              {/* Separator */}
              <div className="mx-8 w-px h-4 bg-muted/30" />
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </>
  );
};

export default LiveActivityFeed;