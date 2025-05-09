
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Trophy, Code, List, X } from "lucide-react";
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const navLinks = [
    { name: 'Arena', path: '/arena', icon: <Code className="h-5 w-5 mr-1" /> },
    { name: 'Challenges', path: '/challenges', icon: <Trophy className="h-5 w-5 mr-1" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="h-5 w-5 mr-1" /> },
  ];

  return (
    <nav className="bg-background border-b border-border py-4">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="bg-codeduels-primary text-white p-2 rounded-md mr-2">
              <Code className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold text-foreground">CodeDuels</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center text-foreground hover:text-codeduels-primary transition-colors story-link"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          <div className="flex items-center space-x-2">
            <Button variant="outline">Login</Button>
            <Button className="bg-codeduels-primary hover:bg-codeduels-secondary">Sign Up</Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="text-foreground p-2"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <List className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-background z-50 md:hidden transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMobileMenu} className="text-foreground p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center text-foreground hover:text-codeduels-primary py-2"
              onClick={toggleMobileMenu}
            >
              {link.icon}
              <span className="ml-2">{link.name}</span>
            </Link>
          ))}
          <div className="flex flex-col space-y-2 mt-4">
            <Button variant="outline" className="w-full">Login</Button>
            <Button className="w-full bg-codeduels-primary hover:bg-codeduels-secondary">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
