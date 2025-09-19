import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, DollarSign, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TeamAgent } from "./TeamBuilderInterface";

interface ConfigurationPanelProps {
  agent: TeamAgent;
  availableAgents: TeamAgent[];
  onUpdate: (updates: Partial<TeamAgent>) => void;
}

const ConfigurationPanel = ({ agent, availableAgents, onUpdate }: ConfigurationPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const priorityOptions = [
    { value: 'High', color: 'bg-red-500', label: 'High Priority' },
    { value: 'Medium', color: 'bg-yellow-500', label: 'Medium Priority' },
    { value: 'Low', color: 'bg-green-500', label: 'Low Priority' }
  ] as const;

  const toggleDependency = (dependencyId: string) => {
    const newDependencies = agent.dependencies.includes(dependencyId)
      ? agent.dependencies.filter(id => id !== dependencyId)
      : [...agent.dependencies, dependencyId];
    
    onUpdate({ dependencies: newDependencies });
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="border-t border-muted/20"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-8 h-8 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-foreground">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">{agent.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-muted/20"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-6"
            >
              {/* Priority Selection */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Priority Level
                </label>
                <div className="flex space-x-2">
                  {priorityOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={agent.priority === option.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => onUpdate({ priority: option.value })}
                      className={`${
                        agent.priority === option.value 
                          ? `${option.color} hover:${option.color}/90` 
                          : 'hover:bg-muted/20'
                      } transition-all duration-200`}
                    >
                      <div className={`w-2 h-2 rounded-full ${option.color} mr-2`} />
                      {option.value}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Task Assignment */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Task Assignment
                </label>
                <Textarea
                  placeholder="Describe the specific task for this agent..."
                  value={agent.task}
                  onChange={(e) => onUpdate({ task: e.target.value })}
                  className="glass-card border border-muted/20 bg-background/50 backdrop-blur-sm"
                  rows={3}
                />
              </div>

              {/* Dependencies */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dependencies
                  <span className="text-muted-foreground text-xs ml-2">
                    (Agents to wait for)
                  </span>
                </label>
                {availableAgents.length > 0 ? (
                  <div className="space-y-2">
                    {availableAgents.map((availableAgent) => (
                      <motion.div
                        key={availableAgent.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleDependency(availableAgent.id)}
                          className={`w-full justify-start glass-card border border-muted/20 ${
                            agent.dependencies.includes(availableAgent.id)
                              ? 'bg-primary/20 border-primary/30'
                              : 'hover:bg-muted/20'
                          }`}
                        >
                          <img
                            src={availableAgent.avatar}
                            alt={availableAgent.name}
                            className="w-4 h-4 rounded object-cover mr-2"
                          />
                          <span className="flex-1 text-left">{availableAgent.name}</span>
                          {agent.dependencies.includes(availableAgent.id) && (
                            <Badge variant="secondary" className="ml-2">
                              Selected
                            </Badge>
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Add more agents to set dependencies
                  </p>
                )}
              </div>

              {/* Estimated Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card border border-muted/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Estimated Time</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {agent.estimatedTime} min
                  </p>
                </div>

                <div className="glass-card border border-muted/20 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    ${agent.price}
                  </p>
                </div>
              </div>

              {/* Skills Overview */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Skills & Capabilities
                </label>
                <div className="flex flex-wrap gap-2">
                  {agent.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-muted/50 text-foreground hover:bg-muted/70 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status Controls */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Current Status
                </label>
                <div className="flex space-x-2">
                  {(['waiting', 'processing', 'complete'] as const).map((status) => (
                    <Button
                      key={status}
                      variant={agent.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => onUpdate({ status })}
                      className={`capitalize ${
                        agent.status === status 
                          ? status === 'waiting' ? 'bg-blue-500 hover:bg-blue-600' :
                            status === 'processing' ? 'bg-emerald-500 hover:bg-emerald-600' :
                            'bg-yellow-500 hover:bg-yellow-600'
                          : 'hover:bg-muted/20'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        status === 'waiting' ? 'bg-blue-400' :
                        status === 'processing' ? 'bg-emerald-400' :
                        'bg-yellow-400'
                      }`} />
                      {status}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ConfigurationPanel;