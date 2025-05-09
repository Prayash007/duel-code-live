
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
              <span className="block text-foreground">Real-Time</span>
              <span className="block text-codeduels-primary mt-1">Competitive Coding</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground">
              Challenge other developers to head-to-head coding duels in real-time.
              Sharpen your skills, solve problems, and climb the leaderboard.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Link to="/arena">
                  <Button size="lg" className="bg-codeduels-primary hover:bg-codeduels-secondary">
                    Enter Arena
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/challenges">
                  <Button size="lg" variant="outline">
                    View Challenges
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-codeduels-dark rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    <div className="ml-2 text-xs text-gray-400">code_duel_arena.js</div>
                  </div>
                  <pre className="text-xs sm:text-sm text-green-400 code-editor">
                    <code>{`function findPairs(nums, target) {
  const pairs = [];
  const seen = new Set();

  for (const num of nums) {
    const complement = target - num;
    if (seen.has(complement)) {
      pairs.push([num, complement]);
    }
    seen.add(num);
  }

  return pairs;
}`}</code>
                  </pre>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-4 py-2 bg-codeduels-primary rounded-full text-white font-bold text-lg opacity-90">
                    Live Code Battle
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
