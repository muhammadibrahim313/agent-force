import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Zap } from "lucide-react";

interface AgentCardProps {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  reviews: number;
  price: string;
  skills: string[];
  isOnline?: boolean;
}

const AgentCard = ({
  name,
  role,
  avatar,
  rating,
  reviews,
  price,
  skills,
  isOnline = true,
}: AgentCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 hover-lift group border border-muted/20 hover:border-primary/30 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-muted/20"
            />
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background online-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
        </div>
        
        {/* Price Badge */}
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg px-3 py-1 border border-primary/30">
          <span className="text-primary font-semibold">{price}</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 font-medium text-foreground">{rating}</span>
        </div>
        <span className="text-muted-foreground text-sm">from {reviews} reviews</span>
      </div>

      {/* Skills */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 4).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="bg-muted/50 text-foreground hover:bg-muted/70 transition-colors"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 4 && (
            <Badge variant="outline" className="border-muted/30 text-muted-foreground">
              +{skills.length - 4} more
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Hire Button */}
      <Button 
        className="w-full bg-primary hover:bg-primary/90 glow-button group-hover:shadow-lg transition-all duration-300"
        size="lg"
      >
        <Zap className="w-4 h-4 mr-2" />
        Quick Hire
      </Button>
    </div>
  );
};

export default AgentCard;