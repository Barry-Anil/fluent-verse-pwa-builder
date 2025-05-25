
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Globe, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Navigation = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    toast({
      title: "Theme changed",
      description: `Switched to ${isDark ? 'light' : 'dark'} mode`,
    });
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              EnglishMaster
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost">Lessons</Button>
            <Button variant="ghost">Practice</Button>
            <Button variant="ghost">Progress</Button>
            <Button variant="ghost">Community</Button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-3">
              <Button variant="ghost" className="justify-start">Lessons</Button>
              <Button variant="ghost" className="justify-start">Practice</Button>
              <Button variant="ghost" className="justify-start">Progress</Button>
              <Button variant="ghost" className="justify-start">Community</Button>
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-300">Theme</span>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
