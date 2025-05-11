import React from 'react';

interface Problem {
  id: string;
  title: string;
  solved: boolean;
}

interface ProblemListProps {
  problems: Problem[];
}

const ProblemList: React.FC<ProblemListProps> = ({ problems }) => {
  return (
    <div className="flex flex-col space-y-2">
      {problems.map((problem) => (
        <div key={problem.id} className="flex items-center space-x-3">
          <div
            className={`w-4 h-4 rounded-full ${problem.solved ? 'bg-green-500' : 'bg-gray-400'}`}
            title={problem.title}
          />
          <span className="text-sm text-foreground">{problem.title}</span>
        </div>
      ))}
    </div>
  );
};
export default ProblemList;