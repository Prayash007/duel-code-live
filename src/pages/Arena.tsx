import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { DuelEditor } from '../components/arena/DuelEditor';
import VideoFeed from '../components/arena/VideoFeed';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import type { Database } from '@/integrations/supabase/types';

type Duel = Database['public']['Tables']['duels']['Row'];
type Problem = Database['public']['Tables']['problems']['Row'];

const Arena: React.FC = () => {
  const { duelId } = useParams<{ duelId: string }>();
  const { user } = useAuth();
  const [duel, setDuel] = useState<Duel | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Fetch duel and associated problems
  useEffect(() => {
    const fetchDuelData = async () => {
      setLoading(true);
      
      // Fetch duel
      const { data: duelData } = await supabase
        .from('duels')
        .select('*')
        .eq('id', duelId)
        .single();

      // Fetch problems if duel exists
      if (duelData?.problem_ids) {
        const { data: problemsData } = await supabase
          .from('problems')
          .select('*')
          .in('id', duelData.problem_ids);
        
        setProblems(problemsData as Problem[] || []);
      }

      setDuel(duelData);
      setLoading(false);
    };

    if (duelId) fetchDuelData();
  }, [duelId]);

  // Join as player2 if slot is open and status is 'waiting'
  const handleJoin = async () => {
    if (!user || !duel) return;
    setJoining(true);
    const { error } = await supabase
      .from('duels')
      .update({ player2_id: user.id, status: 'active' })
      .eq('id', duel.id);

    if (!error) {
      const { data } = await supabase
        .from('duels')
        .select('*')
        .eq('id', duel.id)
        .single();
      setDuel(data);
    }
    setJoining(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="p-8 text-center">Loading Arena...</div>
      </Layout>
    );
  }

  if (!duel) {
    return (
      <Layout>
        <div className="p-8 text-center text-red-500">Duel not found.</div>
      </Layout>
    );
  }

  // Determine user role
  const isPlayer1 = user?.id === duel.player1_id;
  const isPlayer2 = user?.id === duel.player2_id;
  const isParticipant = isPlayer1 || isPlayer2;
  const isSpectator = duel.is_public && !isParticipant && !!duel.player2_id;

  // Allow joining as player2 if slot is open and status is 'waiting'
  if (!isParticipant && !isSpectator && duel.status === 'waiting' && !duel.player2_id) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <div className="mb-4">Join this duel as Player 2?</div>
          <Button disabled={joining} onClick={handleJoin}>
            {joining ? 'Joining...' : 'Join Duel'}
          </Button>
        </div>
      </Layout>
    );
  }

  // Spectator split screen view
  if (isSpectator) {
    return (
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          <div>
            <VideoFeed participantId={duel.player1_id} />
            <DuelEditor 
              duelId={duel.id} 
              userId={duel.player1_id} 
              problem={problems[0]} 
              isSpectator={true} 
            />
          </div>
          <div>
            <VideoFeed participantId={duel.player2_id!} />
            <DuelEditor 
              duelId={duel.id} 
              userId={duel.player2_id!} 
              problem={problems[0]} 
              isSpectator={true} 
            />
          </div>
        </div>
      </Layout>
    );
  }

  // Participant view
  const myId = user?.id;
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-4rem)] p-4">
        {/* Left Side - Problem Description */}
        <div className="bg-card rounded-lg p-6 overflow-y-auto shadow-lg">
          {problems[0] && (
            <>
              <h1 className="text-2xl font-bold mb-4">{problems[0].title}</h1>
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-muted-foreground">
                  {problems[0].description}
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Right Side - Editor & Status */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 flex flex-col border rounded-lg shadow-md bg-muted overflow-hidden">
            <VideoFeed participantId={myId!} />
            <DuelEditor 
              duelId={duel.id} 
              userId={myId!} 
              problem={problems[0]} 
              isSpectator={false} 
            />
          </div>
          
          <div className="bg-muted rounded-lg p-4 flex items-center justify-center">
            <span className="text-muted-foreground">
              {isPlayer1 && !duel.player2_id
                ? 'Waiting for opponent to join...'
                : `Solving problem 1 of ${problems.length}`}
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Arena;
