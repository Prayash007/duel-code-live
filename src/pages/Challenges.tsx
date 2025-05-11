import React, { useState } from 'react';
import Layout from '../components/Layout';
import { challenges } from '@/data/challenges';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Swords } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

const Challenges = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  // Create a new duel (arena)
  const handleCreateDuel = async (challengeId: string, isPublic = false) => {
    if (!user) return;
    setCreating(true);

    // For demo, use a single problem per duel; you can randomize or select multiple
    const { data, error } = await supabase
      .from('duels')
      .insert([{
        player1_id: user.id,
        problem_ids: [challengeId],
        status: 'waiting',
        is_public: isPublic,
      }as any])
      .select()
      .single();

    setCreating(false);

    if (data && !error) {
      const link = `${window.location.origin}/arena/${data.id}`;
      setInviteLink(link);
      // Optionally, navigate directly to the arena as player 1
      // navigate(`/arena/${data.id}`);
    } else {
      alert('Failed to create duel.');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Coding Challenges</h1>
        {inviteLink && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
            <div className="mb-2 font-semibold">Invite your friend to this duel:</div>
            <input
              type="text"
              value={inviteLink}
              readOnly
              className="w-full p-2 border rounded mb-2"
              onClick={e => (e.target as HTMLInputElement).select()}
            />
            <Button
              onClick={() => navigator.clipboard.writeText(inviteLink)}
              className="mr-2"
            >
              Copy Link
            </Button>
            <Button variant="outline" onClick={() => setInviteLink(null)}>
              Close
            </Button>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <Badge className={`capitalize ${challenge.difficulty === 'Easy' ? 'bg-green-500' : challenge.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {challenge.difficulty}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{challenge.timeLimit} min</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">{challenge.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-medium">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-muted-foreground">{challenge.participants} participants</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="gap-1"
                      disabled={creating}
                      onClick={() => handleCreateDuel(challenge.id, false)}
                    >
                      <Swords className="h-4 w-4" />
                      Duel (Private)
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={creating}
                      onClick={() => handleCreateDuel(challenge.id, true)}
                    >
                      <Swords className="h-4 w-4" />
                      Duel (Public)
                    </Button>
                    <Link to={`/arena/${challenge.id}`}>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
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
