import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Plus, Minus, Maximize2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import WorkflowCanvas from "./WorkflowCanvas";
import ConfigurationPanel from "./ConfigurationPanel";
import SmartSuggestions from "./SmartSuggestions";
import LivePreviewWindow from "./LivePreviewWindow";
import TeamCostCalculator from "./TeamCostCalculator";

export interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  price: number;
  estimatedTime: number;
}

export interface TeamAgent extends Agent {
  x: number;
  y: number;
  priority: 'High' | 'Medium' | 'Low';
  task: string;
  dependencies: string[];
  status: 'waiting' | 'processing' | 'complete';
}

interface TeamBuilderInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  availableAgents: Agent[];
}

const TeamBuilderInterface = ({ isOpen, onClose, availableAgents }: TeamBuilderInterfaceProps) => {
  const [teamAgents, setTeamAgents] = useState<TeamAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [canvasCenter, setCanvasCenter] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleAgentDrop = useCallback((agent: Agent, position: { x: number; y: number }) => {
    const newTeamAgent: TeamAgent = {
      ...agent,
      x: position.x,
      y: position.y,
      priority: 'Medium',
      task: '',
      dependencies: [],
      status: 'waiting'
    };
    
    setTeamAgents(prev => [...prev, newTeamAgent]);
  }, []);

  const handleRemoveAgent = useCallback((agentId: string) => {
    setTeamAgents(prev => prev.filter(agent => agent.id !== agentId));
    if (selectedAgent === agentId) {
      setSelectedAgent(null);
    }
  }, [selectedAgent]);

  const handleAgentUpdate = useCallback((agentId: string, updates: Partial<TeamAgent>) => {
    setTeamAgents(prev => 
      prev.map(agent => 
        agent.id === agentId ? { ...agent, ...updates } : agent
      )
    );
  }, []);

  const totalCost = teamAgents.reduce((sum, agent) => sum + agent.price, 0);
  const estimatedTime = Math.max(...teamAgents.map(agent => agent.estimatedTime), 0);

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const fitToScreen = () => {
    setZoomLevel(1);
    setCanvasCenter({ x: 0, y: 0 });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Main Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-[40%] min-w-[600px] z-50 flex flex-col"
          >
            {/* Glass Panel */}
            <div className="h-full glass-card border-l border-muted/20 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-muted/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold gradient-text">Build Your Dream Team</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="hover:bg-muted/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content Area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Workflow Canvas Section */}
                <div className="flex-1 relative">
                  <div className="absolute inset-4 rounded-xl border-2 border-dashed border-muted/30 overflow-hidden">
                    {teamAgents.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex items-center justify-center"
                      >
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center">
                            <Target className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-lg font-medium text-muted-foreground">
                              Drop agents here to build your team
                            </p>
                            <p className="text-sm text-muted-foreground/70">
                              Drag agents from the marketplace to start collaborating
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <WorkflowCanvas
                        ref={canvasRef}
                        agents={teamAgents}
                        selectedAgent={selectedAgent}
                        onAgentSelect={setSelectedAgent}
                        onAgentUpdate={handleAgentUpdate}
                        onAgentRemove={handleRemoveAgent}
                        zoomLevel={zoomLevel}
                        center={canvasCenter}
                      />
                    )}
                  </div>

                  {/* Canvas Controls */}
                  {teamAgents.length > 0 && (
                    <div className="absolute top-8 right-8 flex flex-col space-y-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={zoomIn}
                        className="glass-card border border-muted/20 hover:bg-muted/20"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={zoomOut}
                        className="glass-card border border-muted/20 hover:bg-muted/20"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={fitToScreen}
                        className="glass-card border border-muted/20 hover:bg-muted/20"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  {/* Mini-map */}
                  {teamAgents.length > 2 && (
                    <div className="absolute bottom-8 right-8 w-32 h-24 glass-card border border-muted/20 rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-muted/10 relative">
                        {teamAgents.map((agent) => (
                          <div
                            key={agent.id}
                            className="absolute w-2 h-2 bg-primary rounded-full"
                            style={{
                              left: `${(agent.x + 200) / 4}px`,
                              top: `${(agent.y + 150) / 3}px`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Configuration Panel */}
                {selectedAgent && (
                  <ConfigurationPanel
                    agent={teamAgents.find(a => a.id === selectedAgent)!}
                    availableAgents={teamAgents.filter(a => a.id !== selectedAgent)}
                    onUpdate={(updates) => handleAgentUpdate(selectedAgent, updates)}
                  />
                )}

                {/* Bottom Panel */}
                <div className="border-t border-muted/20">
                  {/* Smart Suggestions */}
                  <SmartSuggestions
                    currentTeam={teamAgents}
                    availableAgents={availableAgents}
                    onAddAgent={handleAgentDrop}
                  />

                  {/* Cost Calculator */}
                  <TeamCostCalculator
                    agents={teamAgents}
                    totalCost={totalCost}
                    estimatedTime={estimatedTime}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Live Preview Window */}
          {teamAgents.length > 0 && (
            <LivePreviewWindow
              team={teamAgents}
              isVisible={teamAgents.length > 0}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default TeamBuilderInterface;