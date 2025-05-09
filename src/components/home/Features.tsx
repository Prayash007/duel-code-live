
import { Code, Users, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  {
    name: 'Live Coding Arena',
    description:
      'Compete in real-time with other developers. Solve problems side-by-side with live updates on progress.',
    icon: Code,
  },
  {
    name: 'Challenge Friends',
    description:
      'Send direct challenges to friends or colleagues. Choose difficulty levels and programming languages.',
    icon: Users,
  },
  {
    name: 'Leaderboard & Rankings',
    description:
      'Track your progress, earn points, and climb the global leaderboard as you win more duels.',
    icon: Trophy,
  },
];

const Features = () => {
  return (
    <div className="py-16 sm:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            How CodeDuels Works
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
            Sharpen your programming skills through real-time competitions.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6 hover-scale">
                <div className="flow-root rounded-lg bg-card px-6 pb-8 shadow-md">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center rounded-md bg-codeduels-primary p-3 shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-xl font-medium text-foreground">{feature.name}</h3>
                    <p className="mt-5 text-base text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/arena">
            <Button size="lg" className="bg-codeduels-primary hover:bg-codeduels-secondary">
              Start Coding Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
