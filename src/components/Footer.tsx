
import { Link } from 'react-router-dom';
import { Code } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <div className="bg-codeduels-primary text-white p-1 rounded-md mr-2">
                <Code className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold">CodeDuels</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Real-time competitive coding platform for developers to challenge each other and improve their skills.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/arena" className="text-muted-foreground hover:text-foreground">Arena</Link></li>
                <li><Link to="/challenges" className="text-muted-foreground hover:text-foreground">Challenges</Link></li>
                <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} CodeDuels. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">GitHub</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
