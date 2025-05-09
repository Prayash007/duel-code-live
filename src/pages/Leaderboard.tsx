
import Layout from '../components/Layout';
import { Trophy } from 'lucide-react';

// Extended mock leaderboard data
const leaderboardData = [
  { rank: 1, username: "codeNinja", wins: 87, losses: 12, score: 1250 },
  { rank: 2, username: "devMaster", wins: 76, losses: 15, score: 1150 },
  { rank: 3, username: "algorithmPro", wins: 68, losses: 21, score: 1050 },
  { rank: 4, username: "syntaxWizard", wins: 62, losses: 24, score: 980 },
  { rank: 5, username: "debugHero", wins: 59, losses: 20, score: 940 },
  { rank: 6, username: "javaJedi", wins: 54, losses: 25, score: 895 },
  { rank: 7, username: "pythonMaster", wins: 52, losses: 18, score: 880 },
  { rank: 8, username: "webDev99", wins: 49, losses: 22, score: 845 },
  { rank: 9, username: "cppWarrior", wins: 46, losses: 19, score: 815 },
  { rank: 10, username: "bitWizard", wins: 43, losses: 28, score: 790 },
];

const Leaderboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Trophy className="text-codeduels-primary h-8 w-8 mr-3" />
          <h1 className="text-3xl font-bold">Global Leaderboard</h1>
        </div>
        
        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted text-foreground">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Wins</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Losses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Win Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leaderboardData.map((user) => {
                  const totalMatches = user.wins + user.losses;
                  const winRate = totalMatches > 0 ? ((user.wins / totalMatches) * 100).toFixed(1) : '0';
                  
                  return (
                    <tr key={user.rank} className={user.rank <= 3 ? "bg-muted/30" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.rank === 1 && <Trophy className="h-5 w-5 text-yellow-500 mr-1" />}
                          <span className="font-medium">{user.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium">{user.username}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600">
                        {user.wins}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-red-500">
                        {user.losses}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {winRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-codeduels-primary">{user.score}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
