import { useState } from "react";
import { Grid3X3, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortingBarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalAgents: number;
}

const SortingBar = ({ viewMode, onViewModeChange, totalAgents }: SortingBarProps) => {
  const [sortBy, setSortBy] = useState("Relevance");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    "Relevance",
    "Price: Low to High", 
    "Price: High to Low",
    "Rating",
    "Recently Active",
    "Most Hired"
  ];

  return (
    <div className="flex items-center justify-between py-4 border-b border-muted/20">
      {/* Results count */}
      <div className="text-muted-foreground">
        <span className="font-medium text-foreground">{totalAgents}</span> agents available
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        {/* Sort Dropdown */}
        <div className="relative">
          <Button
            variant="ghost"
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
          >
            <span>Sort by: {sortBy}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>

          {showSortDropdown && (
            <div className="absolute top-full right-0 mt-2 glass-card rounded-xl border border-muted/20 shadow-lg p-2 min-w-48 z-50">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortDropdown(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    sortBy === option
                      ? 'bg-primary/20 text-primary'
                      : 'hover:bg-muted/20 text-foreground'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-muted/20 rounded-lg p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className={`p-2 ${
              viewMode === 'grid' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('list')}
            className={`p-2 ${
              viewMode === 'list' 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortingBar;