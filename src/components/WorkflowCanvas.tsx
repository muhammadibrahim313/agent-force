import { forwardRef, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TeamAgent } from "./TeamBuilderInterface";

interface WorkflowCanvasProps {
  agents: TeamAgent[];
  selectedAgent: string | null;
  onAgentSelect: (agentId: string | null) => void;
  onAgentUpdate: (agentId: string, updates: Partial<TeamAgent>) => void;
  onAgentRemove: (agentId: string) => void;
  zoomLevel: number;
  center: { x: number; y: number };
}

interface ConnectionParticle {
  id: string;
  fromId: string;
  toId: string;
  progress: number;
  color: string;
}

const WorkflowCanvas = forwardRef<HTMLDivElement, WorkflowCanvasProps>(({
  agents,
  selectedAgent,
  onAgentSelect,
  onAgentUpdate,
  onAgentRemove,
  zoomLevel,
  center
}, ref) => {
  const [particles, setParticles] = useState<ConnectionParticle[]>([]);
  const animationRef = useRef<number>();

  // Get connections between agents based on dependencies
  const getConnections = () => {
    const connections: Array<{from: TeamAgent, to: TeamAgent}> = [];
    
    agents.forEach(agent => {
      agent.dependencies.forEach(depId => {
        const dependency = agents.find(a => a.id === depId);
        if (dependency) {
          connections.push({ from: dependency, to: agent });
        }
      });
    });
    
    return connections;
  };

  const connections = getConnections();

  // Animate particles along connections
  useEffect(() => {
    const animate = () => {
      setParticles(prev => 
        prev.map(particle => ({
          ...particle,
          progress: (particle.progress + 0.02) % 1
        }))
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    // Create particles for active connections
    const newParticles: ConnectionParticle[] = [];
    connections.forEach((conn, index) => {
      if (conn.from.status === 'processing' || conn.to.status === 'processing') {
        newParticles.push({
          id: `${conn.from.id}-${conn.to.id}`,
          fromId: conn.from.id,
          toId: conn.to.id,
          progress: (index * 0.3) % 1,
          color: conn.from.status === 'complete' ? '#10B981' : '#0EA5E9'
        });
      }
    });
    
    setParticles(newParticles);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [connections, agents]);

  const getNodeColor = (status: TeamAgent['status']) => {
    switch (status) {
      case 'waiting': return 'border-blue-400 bg-blue-400/20';
      case 'processing': return 'border-emerald-400 bg-emerald-400/20';
      case 'complete': return 'border-yellow-400 bg-yellow-400/20';
      default: return 'border-muted bg-muted/20';
    }
  };

  const getParticlePosition = (particle: ConnectionParticle) => {
    const fromAgent = agents.find(a => a.id === particle.fromId);
    const toAgent = agents.find(a => a.id === particle.toId);
    
    if (!fromAgent || !toAgent) return { x: 0, y: 0 };
    
    const x = fromAgent.x + (toAgent.x - fromAgent.x) * particle.progress;
    const y = fromAgent.y + (toAgent.y - fromAgent.y) * particle.progress;
    
    return { x, y };
  };

  return (
    <div
      ref={ref}
      className="w-full h-full relative overflow-hidden"
      style={{
        transform: `scale(${zoomLevel}) translate(${center.x}px, ${center.y}px)`
      }}
    >
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn, index) => (
          <motion.line
            key={`${conn.from.id}-${conn.to.id}`}
            x1={conn.from.x + 50}
            y1={conn.from.y + 50}
            x2={conn.to.x + 50}
            y2={conn.to.y + 50}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        ))}
      </svg>

      {/* Animated Particles */}
      {particles.map((particle) => {
        const pos = getParticlePosition(particle);
        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: pos.x + 49,
              top: pos.y + 49,
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );
      })}

      {/* Agent Nodes */}
      {agents.map((agent) => (
        <motion.div
          key={agent.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`absolute cursor-pointer group ${
            selectedAgent === agent.id ? 'z-20' : 'z-10'
          }`}
          style={{
            left: agent.x,
            top: agent.y,
            width: 100,
            height: 100
          }}
          onClick={() => onAgentSelect(agent.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Node Container */}
          <div className={`w-full h-full rounded-xl border-2 ${getNodeColor(agent.status)} transition-all duration-300 relative overflow-hidden`}>
            {/* Status Pulse */}
            {agent.status === 'processing' && (
              <motion.div
                className="absolute inset-0 rounded-xl bg-emerald-400/30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            {/* Agent Avatar */}
            <div className="relative w-full h-full p-2">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-full h-16 object-cover rounded-lg mb-1"
              />
              <div className="text-center">
                <p className="text-xs font-medium text-foreground truncate">
                  {agent.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {agent.role}
                </p>
              </div>

              {/* Status Indicator */}
              <div className="absolute top-1 right-1">
                <div className={`w-3 h-3 rounded-full ${
                  agent.status === 'waiting' ? 'bg-blue-400' :
                  agent.status === 'processing' ? 'bg-emerald-400' :
                  'bg-yellow-400'
                }`} />
              </div>

              {/* Priority Badge */}
              <div className="absolute top-1 left-1">
                <div className={`text-xs px-1 py-0.5 rounded text-white ${
                  agent.priority === 'High' ? 'bg-red-500' :
                  agent.priority === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}>
                  {agent.priority[0]}
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <Button
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onAgentRemove(agent.id);
              }}
            >
              <X className="w-3 h-3" />
            </Button>

            {/* Processing Animation */}
            {agent.status === 'processing' && (
              <div className="absolute bottom-1 left-1 right-1">
                <div className="w-full h-1 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Selection Ring */}
          {selectedAgent === agent.id && (
            <motion.div
              className="absolute -inset-2 border-2 border-primary rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <motion.div
                className="absolute inset-0 border-2 border-primary/50 rounded-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  );
});

WorkflowCanvas.displayName = "WorkflowCanvas";

export default WorkflowCanvas;