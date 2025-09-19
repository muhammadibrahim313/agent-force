import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Users, TrendingUp, AlertTriangle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TeamAgent, Agent } from "./TeamBuilderInterface";

interface SmartSuggestionsProps {
  currentTeam: TeamAgent[];
  availableAgents: Agent[];
  onAddAgent: (agent: Agent, position: { x: number; y: number }) => void;
}

const SmartSuggestions = ({ currentTeam, availableAgents, onAddAgent }: SmartSuggestionsProps) => {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'templates' | 'insights'>('recommendations');

  const getRecommendedAgents = () => {
    // Mock logic for agent recommendations based on current team
    const currentSkills = new Set(currentTeam.flatMap(agent => agent.skills));
    
    return availableAgents
      .filter(agent => !currentTeam.some(ta => ta.id === agent.id))
      .map(agent => ({
        ...agent,
        relevanceScore: agent.skills.filter(skill => currentSkills.has(skill)).length,
        reason: agent.skills.some(skill => currentSkills.has(skill)) 
          ? "Complements your current team skills"
          : "Adds new capabilities to your workflow"
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);
  };

  const getMissingSkills = () => {
    const currentSkills = new Set(currentTeam.flatMap(agent => agent.skills));
    const allSkills = ['Strategy', 'Analytics', 'Content Creation', 'Technical Implementation', 'Quality Assurance'];
    
    return allSkills.filter(skill => !currentSkills.has(skill));
  };

  const getTeamTemplates = () => [
    {
      name: "Full Analysis Team",
      description: "Complete research and analysis workflow",
      agents: ["Data Analyst", "Research Specialist", "Strategy Consultant"],
      successRate: 94,
      estimatedTime: "15-20 minutes"
    },
    {
      name: "Content Creation Squad",
      description: "End-to-end content production pipeline",
      agents: ["Content Writer", "SEO Specialist", "Social Media Manager"],
      successRate: 89,
      estimatedTime: "10-15 minutes"
    },
    {
      name: "Research Unit",
      description: "Comprehensive market research team",
      agents: ["Market Researcher", "Competitive Analyst", "Trend Forecaster"],
      successRate: 92,
      estimatedTime: "20-25 minutes"
    }
  ];

  const recommendedAgents = getRecommendedAgents();
  const missingSkills = getMissingSkills();
  const templates = getTeamTemplates();

  const tabs = [
    { id: 'recommendations', label: 'Recommended', icon: Sparkles },
    { id: 'templates', label: 'Templates', icon: Users },
    { id: 'insights', label: 'Insights', icon: TrendingUp }
  ] as const;

  return (
    <div className="p-6 border-b border-muted/20">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Smart Suggestions</h3>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-muted/20 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 ${
                activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              } transition-all duration-200`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </Button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === 'recommendations' && (
          <div className="space-y-3">
            {recommendedAgents.length > 0 ? (
              recommendedAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card border border-muted/20 p-3 rounded-lg hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => onAddAgent(agent, { 
                    x: Math.random() * 300, 
                    y: Math.random() * 200 
                  })}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-foreground">{agent.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {agent.relevanceScore > 0 ? `${agent.relevanceScore} matches` : 'New skills'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{agent.reason}</p>
                      <p className="text-sm text-primary font-medium">{agent.price}/hour</p>
                    </div>
                    <Button size="sm" className="shrink-0">
                      <Zap className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No additional agents to recommend at this time
              </p>
            )}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="space-y-3">
            {templates.map((template) => (
              <motion.div
                key={template.name}
                whileHover={{ scale: 1.02 }}
                className="glass-card border border-muted/20 p-4 rounded-lg hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{template.agents.length} agents</span>
                      <span>{template.successRate}% success rate</span>
                      <span>{template.estimatedTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.agents.map((agentType) => (
                        <Badge key={agentType} variant="outline" className="text-xs">
                          {agentType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" className="shrink-0 ml-4">
                    Use Template
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-4">
            {/* Missing Skills Alert */}
            {missingSkills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card border border-orange-500/30 bg-orange-500/10 p-4 rounded-lg"
              >
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Missing Skills Detected</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your team might benefit from these additional capabilities:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {missingSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs border-orange-500/30">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Performance Insights */}
            <div className="glass-card border border-muted/20 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Team Performance Insights</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Estimated Success Rate</span>
                  <span className="font-medium text-emerald-400">
                    {currentTeam.length > 0 ? Math.min(85 + currentTeam.length * 5, 98) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Collaboration Score</span>
                  <span className="font-medium text-primary">
                    {currentTeam.length > 1 ? 'High' : currentTeam.length === 1 ? 'Solo' : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Complexity Level</span>
                  <span className="font-medium text-yellow-400">
                    {currentTeam.length <= 2 ? 'Simple' : currentTeam.length <= 4 ? 'Moderate' : 'Complex'}
                  </span>
                </div>
              </div>
            </div>

            {/* Popular Combinations */}
            <div className="glass-card border border-muted/20 p-4 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Popular Combinations</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>• Data Analyst + Research Specialist → 94% success rate</div>
                <div>• Content Writer + SEO Specialist → 91% success rate</div>
                <div>• Strategy Consultant + Market Researcher → 96% success rate</div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SmartSuggestions;