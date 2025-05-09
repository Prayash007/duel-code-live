
import Layout from '../components/Layout';
import { challenges } from '@/data/challenges';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Challenges = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Coding Challenges</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-card rounded-lg shadow-md overflow-hidden hover-scale"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
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
                
                <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{challenge.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{challenge.participants} participants</span>
                  <Link to={`/challenges/${challenge.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Challenges;
