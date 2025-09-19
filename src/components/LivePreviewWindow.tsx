import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, FileText, ArrowRight, Play, X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamAgent } from "./TeamBuilderInterface";

interface LivePreviewWindowProps {
  team: TeamAgent[];
  isVisible: boolean;
}

const LivePreviewWindow = ({ team, isVisible }: LivePreviewWindowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'input' | 'output'>('input');
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Generate mock input/output based on team composition
  const generateMockData = () => {
    const hasDataAnalyst = team.some(agent => agent.role.includes('Data'));
    const hasContentCreator = team.some(agent => agent.role.includes('Content'));
    const hasResearcher = team.some(agent => agent.role.includes('Research'));

    const input = {
      task: "Analyze competitor pricing strategies for SaaS products",
      data_sources: ["company_websites", "public_pricing_data", "market_reports"],
      requirements: ["pricing_comparison", "feature_analysis", "market_positioning"],
      budget: "$500",
      timeline: "24 hours"
    };

    const output = {
      analysis: {
        competitors_analyzed: hasDataAnalyst ? 15 : 8,
        pricing_models: ["freemium", "tiered", "usage_based", "flat_rate"],
        average_price_range: "$29 - $199/month",
        key_findings: [
          "Premium tiers show 40% higher conversion rates",
          "Usage-based pricing growing 25% YoY",
          hasContentCreator ? "Content marketing drives 60% of conversions" : "Marketing effectiveness varies",
          hasResearcher ? "Market research shows 3 emerging pricing trends" : "Limited trend analysis available"
        ]
      },
      recommendations: [
        "Implement tiered pricing with clear value differentiation",
        "Consider freemium model for market penetration",
        "Price point sweet spot: $49-79 for SMB segment"
      ],
      confidence_score: team.length > 2 ? 94 : team.length > 1 ? 87 : 72
    };

    return { input, output };
  };

  const { input, output } = generateMockData();

  const simulationSteps = [
    "Initializing agent collaboration...",
    "Data collection in progress...",
    "Cross-referencing findings...",
    "Generating insights...",
    "Finalizing recommendations...",
    "Complete!"
  ];

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setSimulationStep(prev => {
          if (prev >= simulationSteps.length - 1) {
            setIsSimulating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setSimulationStep(0);
    }
  }, [isSimulating, simulationSteps.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            width: isExpanded ? "60%" : "400px",
            height: isExpanded ? "70%" : "300px"
          }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-8 left-8 z-50 glass-card border border-muted/20 rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-muted/20 bg-muted/5">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <FileText className="w-3 h-3 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">Live Preview</h3>
              <div className="flex items-center space-x-1">
                {team.slice(0, 3).map((agent, index) => (
                  <img
                    key={agent.id}
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-5 h-5 rounded-full border border-muted/30"
                    style={{ marginLeft: index > 0 ? '-4px' : '0' }}
                  />
                ))}
                {team.length > 3 && (
                  <div className="w-5 h-5 rounded-full bg-muted/30 border border-muted/30 flex items-center justify-center text-xs text-muted-foreground -ml-1">
                    +{team.length - 3}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="hover:bg-muted/20"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-muted/20 bg-muted/5">
            <button
              onClick={() => setActiveTab('input')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'input'
                  ? 'text-primary border-b-2 border-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              Input Data
            </button>
            <button
              onClick={() => setActiveTab('output')}
              className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'output'
                  ? 'text-primary border-b-2 border-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
            >
              Expected Output
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'input' ? (
                  <div className="p-4 h-full overflow-auto">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">Task</h4>
                        <p className="text-sm text-muted-foreground bg-muted/20 p-2 rounded">
                          {input.task}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">Data Sources</h4>
                        <div className="flex flex-wrap gap-1">
                          {input.data_sources.map((source) => (
                            <span
                              key={source}
                              className="text-xs bg-primary/20 text-primary px-2 py-1 rounded"
                            >
                              {source.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-1">Requirements</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {input.requirements.map((req) => (
                            <li key={req} className="flex items-center">
                              <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                              {req.replace('_', ' ')}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span><strong>Budget:</strong> {input.budget}</span>
                        <span><strong>Timeline:</strong> {input.timeline}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 h-full overflow-auto">
                    <pre className="text-xs text-foreground bg-muted/20 p-3 rounded overflow-auto">
{JSON.stringify(output, null, 2)}
                    </pre>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Simulation Status */}
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-2 border-t border-muted/20 bg-primary/10"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">
                  {simulationSteps[simulationStep]}
                </span>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-muted/20 bg-muted/5">
            <div className="text-xs text-muted-foreground">
              {team.length} agents • Est. {Math.max(...team.map(a => a.estimatedTime), 0)}min
            </div>
            <Button
              size="sm"
              onClick={() => setIsSimulating(!isSimulating)}
              disabled={isSimulating}
              className="bg-primary hover:bg-primary/90"
            >
              <Play className="w-3 h-3 mr-1" />
              {isSimulating ? 'Running...' : 'Test Run'}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LivePreviewWindow;