import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Trophy, Code, List, X, PlusCircle } from "lucide-react";
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth'; // ✅ Make sure the path is correct

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);

  const navLinks = [
    { name: 'Arena', path: '/arena', icon: <Code className="h-5 w-5 mr-1" /> },
    { name: 'Challenges', path: '/challenges', icon: <PlusCircle className="h-5 w-5 mr-1" /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy className="h-5 w-5 mr-1" /> },
  ];

  // "Create Challenge" button logic (can be replaced with modal or redirect)
  const handleCreateChallenge = () => {
    // You can navigate to a challenge creation page or open a modal
    window.location.href = '/challenges/new';
  };

  const authButtons = user ? (
    <Button variant="outline" onClick={signOut}>Sign Out</Button>
  ) : (
    <Button onClick={signInWithGoogle} className="bg-codeduels-primary hover:bg-codeduels-secondary">Login with Google</Button>
  );

  return (
    <nav className="bg-background border-b border-border py-4">
      <div className="container px-4 mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className="bg-codeduels-primary text-white p-2 rounded-md mr-2">
            <Code className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-foreground">CodeDuels</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center text-foreground hover:text-codeduels-primary transition-colors",
                location.pathname === link.path && "font-bold text-codeduels-primary"
              )}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          {/* Create Challenge Button */}
          <Button 
            onClick={handleCreateChallenge}
            className="flex items-center bg-codeduels-primary hover:bg-codeduels-secondary text-white"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Challenge
          </Button>
          <div className="flex items-center space-x-2">
            {authButtons}
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
          <button onClick={toggleMobileMenu} className="text-foreground p-2" aria-label="Close Menu">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={cn(
                "flex items-center text-foreground hover:text-codeduels-primary py-2",
                location.pathname === link.path && "font-bold text-codeduels-primary"
              )}
              onClick={toggleMobileMenu}
            >
              {link.icon}
              <span className="ml-2">{link.name}</span>
            </Link>
          ))}
          {/* Create Challenge Button */}
          <Button 
            onClick={() => { handleCreateChallenge(); setMobileMenuOpen(false); }}
            className="flex items-center bg-codeduels-primary hover:bg-codeduels-secondary text-white w-full"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Challenge
          </Button>
          <div className="flex flex-col space-y-2 mt-4">
            {user ? (
              <Button variant="outline" onClick={signOut} className="w-full">Sign Out</Button>
            ) : (
              <Button onClick={signInWithGoogle} className="w-full bg-codeduels-primary hover:bg-codeduels-secondary">
                Login with Google
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
