import { useState, useRef, useEffect } from "react";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SearchFilterBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const recentSearches = [
    "competitive analysis", 
    "content creation", 
    "data visualization",
    "customer support automation"
  ];
  
  const trendingQueries = [
    "AI strategy consulting",
    "market research",
    "lead generation",
    "social media management"
  ];

  const filterOptions = {
    "All Categories": [
      "Business Intelligence",
      "Content & Marketing", 
      "Development & Tech",
      "Data Analysis",
      "Customer Support",
      "Research & Strategy"
    ],
    "Price Range": ["$20-40/hr", "$40-60/hr", "$60-80/hr", "$80+/hr"],
    "Ratings 4+": ["4.0+", "4.5+", "4.8+", "5.0"],
    "Available Now": ["Available", "Quick Response", "Same Day"]
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTyping(false), 500);
    if (searchValue) setIsTyping(true);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleFilterClick = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const handleDropdownToggle = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="sticky top-16 z-40 glass-header py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Search Bar */}
        <div className="relative mb-4">
          <div className="glass-card rounded-xl p-4 border border-muted/20">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search 
                  className={`w-5 h-5 text-muted-foreground transition-all duration-300 ${
                    isTyping ? 'scale-110 text-primary' : ''
                  }`} 
                />
              </div>
              <input
                ref={searchRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setShowAutocomplete(true)}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                placeholder="Search for 'competitive analysis' or 'content creation'"
                className="w-full pl-12 pr-4 py-3 bg-transparent text-foreground placeholder-muted-foreground text-lg focus:outline-none"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {showAutocomplete && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl border border-muted/20 shadow-lg z-50">
                <div className="p-4 space-y-4">
                  {recentSearches.length > 0 && (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Recent searches</span>
                      </div>
                      <div className="space-y-1">
                        {recentSearches.map((search) => (
                          <button
                            key={search}
                            onClick={() => setSearchValue(search)}
                            className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted/20 transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Trending</span>
                    </div>
                    <div className="space-y-1">
                      {trendingQueries.map((query) => (
                        <button
                          key={query}
                          onClick={() => setSearchValue(query)}
                          className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted/20 transition-colors"
                        >
                          {query}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3">
          {Object.keys(filterOptions).map((filterKey) => (
            <div key={filterKey} className="relative">
              <Button
                variant={activeFilters.some(f => filterOptions[filterKey as keyof typeof filterOptions].includes(f)) ? "default" : "secondary"}
                onClick={() => handleDropdownToggle(filterKey)}
                className="rounded-full transition-all duration-300 hover:scale-105"
              >
                {filterKey}
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>

              {/* Filter Dropdown */}
              {openDropdown === filterKey && (
                <div className="absolute top-full left-0 mt-2 glass-card rounded-xl border border-muted/20 shadow-lg p-4 min-w-48 z-50">
                  <div className="space-y-2">
                    {filterOptions[filterKey as keyof typeof filterOptions].map((option) => (
                      <button
                        key={option}
                        onClick={() => handleFilterClick(option)}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          activeFilters.includes(option)
                            ? 'bg-primary/20 text-primary'
                            : 'hover:bg-muted/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="flex items-center space-x-2 bg-primary/20 text-primary border-primary/30"
              >
                <span>{filter}</span>
                <button
                  onClick={() => handleFilterClick(filter)}
                  className="ml-1 hover:text-primary/70"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilters([])}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterBar;