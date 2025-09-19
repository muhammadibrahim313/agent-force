import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DollarSign, Clock, Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamAgent } from "./TeamBuilderInterface";

interface TeamCostCalculatorProps {
  agents: TeamAgent[];
  totalCost: number;
  estimatedTime: number;
}

const TeamCostCalculator = ({ agents, totalCost, estimatedTime }: TeamCostCalculatorProps) => {
  const [progress, setProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Progress simulation
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsSimulating(false);
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }, 200);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isSimulating]);

  const calculateTotalCost = () => {
    return agents.reduce((total, agent) => {
      const timeInHours = agent.estimatedTime / 60;
      return total + (agent.price * timeInHours);
    }, 0);
  };

  const getEfficiencyScore = () => {
    if (agents.length === 0) return 0;
    if (agents.length === 1) return 70;
    if (agents.length <= 3) return 90;
    return Math.max(60, 90 - (agents.length - 3) * 5);
  };

  const actualTotalCost = calculateTotalCost();
  const efficiencyScore = getEfficiencyScore();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Team Overview</h3>
        {agents.length > 0 && (
          <Button
            onClick={() => setIsSimulating(!isSimulating)}
            disabled={isSimulating}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Play className="w-4 h-4 mr-2" />
            {isSimulating ? 'Simulating...' : 'Test Run'}
          </Button>
        )}
      </div>

      {agents.length > 0 ? (
        <div className="space-y-6">
          {/* Cost Breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card border border-muted/20 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Total Cost</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                ${actualTotalCost.toFixed(2)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on estimated time
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card border border-muted/20 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Completion Time</span>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {Math.max(...agents.map(a => a.estimatedTime), 0)} min
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Parallel execution
              </p>
            </motion.div>
          </div>

          {/* Progress Simulator */}
          {isSimulating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card border border-primary/30 bg-primary/10 p-4 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Simulation Progress</span>
                <span className="text-sm text-primary font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Estimated completion: {Math.round((100 - progress) / 20)} minutes remaining
              </div>
            </motion.div>
          )}

          {/* Agent Breakdown */}
          <div>
            <h4 className="font-medium text-foreground mb-3">Cost Breakdown by Agent</h4>
            <div className="space-y-2">
              {agents.map((agent) => {
                const agentCost = (agent.price * agent.estimatedTime) / 60;
                return (
                  <motion.div
                    key={agent.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between p-3 glass-card border border-muted/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {agent.estimatedTime} min • ${agent.price}/hour
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        ${agentCost.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {agent.priority} priority
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Efficiency Metrics */}
          <div className="glass-card border border-muted/20 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h4 className="font-medium text-foreground">Efficiency Metrics</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-emerald-400">{efficiencyScore}%</p>
                <p className="text-xs text-muted-foreground">Efficiency</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{agents.length}</p>
                <p className="text-xs text-muted-foreground">Agents</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">
                  {agents.filter(a => a.dependencies.length > 0).length}
                </p>
                <p className="text-xs text-muted-foreground">Dependencies</p>
              </div>
            </div>
          </div>

          {/* Start Team Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 glow-button text-lg py-6"
            >
              Start Team Collaboration
              <div className="ml-3 text-sm opacity-80">
                ${actualTotalCost.toFixed(2)} • {Math.max(...agents.map(a => a.estimatedTime), 0)} min
              </div>
            </Button>
          </motion.div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">
            Add agents to see cost breakdown and team metrics
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamCostCalculator;