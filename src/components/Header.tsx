import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold gradient-text">AgentForce</div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#marketplace"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Marketplace
            </a>
            <a
              href="#how-it-works"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Pricing
            </a>
          </nav>

          {/* Sign In Button */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary hover:bg-muted/10"
            >
              Sign In
            </Button>
            <Button className="bg-primary hover:bg-primary/90 glow-button">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;