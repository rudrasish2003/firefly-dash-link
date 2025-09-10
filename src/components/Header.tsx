import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg">
              AI
            </div>
            <span className="text-xl font-bold">VyomAi</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#partners" className="text-foreground hover:text-primary transition-colors">
              Partners
            </a>
            <a href="#process" className="text-foreground hover:text-primary transition-colors">
              Process
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Log In
            </Button>
            <Button variant="gradient" className="glow-effect">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};