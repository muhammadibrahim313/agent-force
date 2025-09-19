import { useState } from "react";
import { 
  BarChart3, 
  PenTool, 
  Code, 
  Database, 
  HeadphonesIcon, 
  Target,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CategorySidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories = [
    {
      name: "Business Intelligence",
      icon: BarChart3,
      count: 342,
      color: "text-blue-400"
    },
    {
      name: "Content & Marketing",
      icon: PenTool,
      count: 486,
      color: "text-purple-400"
    },
    {
      name: "Development & Tech",
      icon: Code,
      count: 623,
      color: "text-green-400"
    },
    {
      name: "Data Analysis",
      icon: Database,
      count: 298,
      color: "text-orange-400"
    },
    {
      name: "Customer Support",
      icon: HeadphonesIcon,
      count: 187,
      color: "text-pink-400"
    },
    {
      name: "Research & Strategy",
      icon: Target,
      count: 234,
      color: "text-cyan-400"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className={`transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-60'
    } flex-shrink-0`}>
      <div className="glass-card rounded-xl p-4 border border-muted/20 h-fit sticky top-32">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h3 className="font-semibold text-foreground">Categories</h3>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-muted/20"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Categories */}
        <div className="space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.name;
            
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(
                  isSelected ? null : category.name
                )}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 group ${
                  isSelected 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'hover:bg-muted/20'
                }`}
                title={isCollapsed ? category.name : undefined}
              >
                <Icon className={`w-5 h-5 ${category.color} flex-shrink-0`} />
                
                {!isCollapsed && (
                  <>
                    <div className="ml-3 flex-1 text-left">
                      <div className="font-medium text-foreground text-sm">
                        {category.name}
                      </div>
                    </div>
                    <div className="ml-2 px-2 py-1 bg-muted/30 rounded-full text-xs text-muted-foreground">
                      {category.count}
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Collapse indicator for mobile */}
        {!isCollapsed && (
          <div className="mt-6 pt-4 border-t border-muted/20">
            <div className="text-xs text-muted-foreground text-center">
              {categories.reduce((sum, cat) => sum + cat.count, 0)} total agents
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySidebar;