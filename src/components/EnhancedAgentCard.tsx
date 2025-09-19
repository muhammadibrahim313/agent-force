import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Zap, 
  Clock, 
  Heart,
  BarChart3,
  CheckSquare,
  Eye,
  Workflow,
  Brain
} from "lucide-react";

interface EnhancedAgentCardProps {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  reviews: number;
  price: string;
  skills: string[];
  status: 'Available' | 'Busy' | 'Queue';
  queueCount?: number;
  responseTime: string;
  performance: number[];
  frameworks: string[];
  isOnline?: boolean;
  bestSkill: string;
  viewMode: 'grid' | 'list';
}

const EnhancedAgentCard = ({
  name,
  role,
  avatar,
  rating,
  reviews,
  price,
  skills,
  status,
  queueCount,
  responseTime,
  performance,
  frameworks,
  isOnline = true,
  bestSkill,
  viewMode
}: EnhancedAgentCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isComparing, setIsComparing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'Available': return 'bg-accent text-accent-foreground';
      case 'Busy': return 'bg-orange-500 text-white';
      case 'Queue': return 'bg-yellow-500 text-black';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework.toLowerCase()) {
      case 'crewai': return <Workflow className="w-4 h-4" />;
      case 'langchain': return <Brain className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="glass-card rounded-xl p-6 hover-lift group border border-muted/20 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center space-x-6">
          {/* Avatar & Status */}
          <div className="relative flex-shrink-0">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded">
                {bestSkill}
              </div>
            </div>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background online-pulse" />
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-lg truncate">{name}</h3>
                <p className="text-muted-foreground text-sm">{role}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`${getStatusColor()} text-xs`}>
                  {status} {status === 'Queue' && queueCount && `(${queueCount})`}
                </Badge>
                <div className="text-primary font-semibold">{price}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium text-foreground">{rating}</span>
                <span className="ml-1 text-muted-foreground text-sm">({reviews})</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {responseTime} response
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="text-xs">+{skills.length - 3}</Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsComparing(!isComparing)}
              className="p-2"
            >
              <CheckSquare className={`w-4 h-4 ${isComparing ? 'text-primary' : 'text-muted-foreground'}`} />
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Zap className="w-4 h-4 mr-2" />
              Quick Hire
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 hover-lift group border border-muted/20 hover:border-primary/30 transition-all duration-300 relative">
      {/* Status Ribbon */}
      <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg rounded-tr-xl text-xs font-medium ${getStatusColor()}`}>
        {status} {status === 'Queue' && queueCount && `(${queueCount})`}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden">
              <img
                src={avatar}
                alt={name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-1 left-1 text-xs font-medium text-white bg-black/50 px-1 py-0.5 rounded">
                {bestSkill}
              </div>
            </div>
            {isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background online-pulse" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{name}</h3>
            <p className="text-muted-foreground text-sm">{role}</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorited(!isFavorited)}
            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsComparing(!isComparing)}
            className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <CheckSquare className={`w-4 h-4 ${isComparing ? 'text-primary' : 'text-muted-foreground'}`} />
          </Button>
        </div>
      </div>

      {/* Rating & Response Time */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-medium text-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">({reviews})</span>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1" />
          {responseTime}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">7-day performance</span>
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="flex items-end space-x-1 h-8">
          {performance.map((value, index) => (
            <div
              key={index}
              className="bg-primary/60 rounded-sm flex-1 transition-all duration-300 hover:bg-primary"
              style={{ height: `${(value / Math.max(...performance)) * 100}%` }}
            />
          ))}
        </div>
      </div>

      {/* Skills & Frameworks */}
      <div className="space-y-3 mb-6">
        <div className="flex flex-wrap gap-2">
          {skills.slice(0, 3).map((skill) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="bg-muted/50 text-foreground hover:bg-muted/70 transition-colors text-xs"
            >
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="border-muted/30 text-muted-foreground text-xs">
              +{skills.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Frameworks */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Works with:</span>
          <div className="flex space-x-1">
            {frameworks.slice(0, 2).map((framework) => (
              <div
                key={framework}
                className="flex items-center space-x-1 text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded"
                title={framework}
              >
                {getFrameworkIcon(framework)}
                <span>{framework}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Work Link */}
      <div className="mb-4">
        <button
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
          className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview Work
        </button>
        
        {showPreview && (
          <div className="absolute left-0 top-full mt-2 glass-card rounded-xl p-4 border border-muted/20 shadow-lg z-50 w-full">
            <div className="text-sm text-muted-foreground">
              Sample outputs and portfolio preview would appear here...
            </div>
          </div>
        )}
      </div>

      {/* Price & Quick Hire */}
      <div className="flex items-center justify-between">
        <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg px-3 py-2 border border-primary/30">
          <span className="text-primary font-semibold">{price}</span>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 glow-button group-hover:shadow-lg transition-all duration-300"
        >
          <Zap className="w-4 h-4 mr-2" />
          Quick Hire
        </Button>
      </div>
    </div>
  );
};

export default EnhancedAgentCard;