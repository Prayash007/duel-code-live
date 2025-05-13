import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Challenge } from '@/data/challenges';

interface ProblemListProps {
  challenges: Challenge[];
  solvedProblems?: string[];
  currentProblemId?: string;
}

const ProblemList: React.FC<ProblemListProps> = ({ 
  challenges, 
  solvedProblems = [], 
  currentProblemId 
}) => {
  if (challenges.length === 0) {
    return (
      <div className="text-muted-foreground text-sm italic p-4">
        No challenges available yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      {challenges.map((challenge) => {
        const isSolved = solvedProblems.includes(challenge.id);
        const isCurrent = challenge.id === currentProblemId;

        return (
          <div
            key={challenge.id}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors
              ${isCurrent 
                ? 'bg-codeduels-primary/10 border border-codeduels-primary' 
                : 'hover:bg-muted/50'}
            `}
          >
            <div className="flex items-center space-x-3">
              {isSolved ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium">{challenge.title}</span>
            </div>
            
            <span className={`text-xs px-2 py-1 rounded-full 
              ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
               challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
               'bg-red-100 text-red-800'}
            `}>
              {challenge.difficulty}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ProblemList;
