
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { challenges } from '@/data/challenges';
import { ArrowRight } from 'lucide-react';

// Only display the first 3 challenges
const featuredChallenges = challenges.slice(0, 3);

const FeaturedChallenges = () => {
  return (
    <div className="py-16 sm:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Featured Challenges</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
            Test your skills with these popular coding problems.
          </p>
        </div>

        <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
          {featuredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden hover-scale"
            >
              <div className="flex-1 bg-card p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <Badge 
                      className={`
                        ${challenge.difficulty === 'Easy' ? 'bg-green-500' : ''}
                        ${challenge.difficulty === 'Medium' ? 'bg-yellow-500' : ''}
                        ${challenge.difficulty === 'Hard' ? 'bg-red-500' : ''}
                      `}
                    >
                      {challenge.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{challenge.timeLimit} min</span>
                  </div>
                  <Link to={`/challenges/${challenge.id}`} className="block mt-2">
                    <p className="text-xl font-semibold text-foreground">{challenge.title}</p>
                    <p className="mt-3 text-base text-muted-foreground line-clamp-3">
                      {challenge.description}
                    </p>
                  </Link>
                </div>
                <div className="mt-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="flex space-x-1">
                        {challenge.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link to={`/challenges/${challenge.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Start Challenge
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/challenges">
            <Button variant="outline">
              Browse All Challenges
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChallenges;
