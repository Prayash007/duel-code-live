
import { Check } from "lucide-react";

const steps = [
  {
    name: 'Step 1: Choose a Challenge',
    description: 'Browse available challenges or accept a direct invitation to duel.',
  },
  {
    name: 'Step 2: Join the Arena',
    description: 'Enter the coding arena with your opponent where you can see each other\'s progress.',
  },
  {
    name: 'Step 3: Solve the Problems',
    description: 'Write efficient code to solve the programming problems before your opponent.',
  },
  {
    name: 'Step 4: Submit & Win',
    description: 'Submit your solutions for automated testing and see who wins the duel.',
  },
];

const HowItWorks = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
            From challenge to victory, join the CodeDuels community in four simple steps.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10">
            {steps.map((step) => (
              <div key={step.name} className="relative">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-codeduels-primary text-white">
                      <Check className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-foreground">{step.name}</h3>
                    <p className="mt-2 text-base text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10 sm:pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-medium text-foreground">Spectator Mode</h3>
                <div className="mt-4 text-base text-muted-foreground">
                  <p>
                    Watch live duels in progress, see both contestants' screens, and learn from the best coders.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex">
                      <Check className="h-5 w-5 text-codeduels-primary mr-2" />
                      <span>Split-screen view of both contestants</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-codeduels-primary mr-2" />
                      <span>Live updates on problem-solving progress</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-codeduels-primary mr-2" />
                      <span>Inspect completed solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-medium text-foreground">Challenge Mode</h3>
                <div className="mt-4 text-base text-muted-foreground">
                  <p>
                    Challenge friends or colleagues to private duels with customized difficulty levels.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex">
                      <Check className="h-5 w-5 text-codeduels-primary mr-2" />
                      <span>Direct invitations via email or link</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-codeduels-primary mr-2" />
                      <span>Choose difficulty and number of problems</span>
                    </li>
                    <li className="flex">
                      <Check className="h-5 w-5 text-codeduels-primary mr-2" />
                      <span>Set time limits for each challenge</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
