import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import TeamBuilderInterface from "./TeamBuilderInterface";
import type { Agent } from "./TeamBuilderInterface";

interface TeamBuilderButtonProps {
  availableAgents: Agent[];
}

const TeamBuilderButton = ({ availableAgents }: TeamBuilderButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-30"
      >
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 glow-button shadow-2xl"
        >
          <Users className="w-5 h-5 mr-2" />
          Build Team
        </Button>
      </motion.div>

      <TeamBuilderInterface
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        availableAgents={availableAgents}
      />
    </>
  );
};

export default TeamBuilderButton;