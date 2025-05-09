
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight } from "lucide-react";

// Mock leaderboard data
const topCoders = [
  { rank: 1, username: "codeNinja", wins: 87, score: 1250 },
  { rank: 2, username: "devMaster", wins: 76, score: 1150 },
  { rank: 3, username: "algorithmPro", wins: 68, score: 1050 },
  { rank: 4, username: "syntaxWizard", wins: 62, score: 980 },
  { rank: 5, username: "debugHero", wins: 59, score: 940 },
];

const Leaderboard = () => {
  return (
    <div className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Top Performers</h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-muted-foreground sm:mt-4">
            Check out our leading coders and their achievements.
          </p>
        </div>

        <div className="mt-12 bg-card shadow rounded-lg overflow-hidden max-w-3xl mx-auto">
          <div className="px-4 py-5 sm:px-6 bg-muted/50">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-codeduels-primary mr-2" />
              <h3 className="text-lg leading-6 font-medium text-foreground">Global Leaderboard</h3>
            </div>
          </div>
          <div className="border-t border-border">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Wins
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {topCoders.map((coder) => (
                    <tr key={coder.rank} className={coder.rank <= 3 ? "bg-muted/30" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        <div className="flex items-center">
                          {coder.rank === 1 && (
                            <Trophy className="h-5 w-5 text-yellow-500 mr-1" />
                          )}
                          {coder.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {coder.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {coder.wins}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-codeduels-primary">
                        {coder.score}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-4 py-4 sm:px-6 text-center">
            <Link to="/leaderboard">
              <Button variant="outline" size="sm">
                View Full Leaderboard
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
