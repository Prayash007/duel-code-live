import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import {DuelEditor} from '../components/arena/DuelEditor';
import VideoFeed from '../components/arena/VideoFeed';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import type { Database } from '@/integrations/supabase/types';

type Duel = Database['public']['Tables']['duels']['Row'];

const Arena: React.FC = () => {
  const { duelId } = useParams<{ duelId: string }>();
  const { user } = useAuth();
  const [duel, setDuel] = useState<Duel | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  // Fetch duel info
  useEffect(() => {
    const fetchDuel = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('duels')
        .select('*')
        .eq('id', duelId)
        .single();
      setDuel(data);
      setLoading(false);
    };
    if (duelId) fetchDuel();
  }, [duelId]);

  // Join as player2 if slot is open and status is 'waiting'
  const handleJoin = async () => {
    if (!user || !duel) return;
    setJoining(true);
    const { error } = await supabase
      .from('duels')
      .update({ player2_id: user.id, status: 'active' })
      .eq('id', duel.id);
    setJoining(false);
    if (!error) {
      // Refresh duel info
      const { data } = await supabase.from('duels').select('*').eq('id', duel.id).single();
      setDuel(data);
    }
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
  const isPlayer1 = user && duel.player1_id === user.id;
  const isPlayer2 = user && duel.player2_id === user.id;
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
            <DuelEditor duelId={duel.id} userId={duel.player1_id} isSpectator />
          </div>
          <div>
            <VideoFeed participantId={duel.player2_id!} />
            <DuelEditor duelId={duel.id} userId={duel.player2_id!} isSpectator />
          </div>
        </div>
      </Layout>
    );
  }

  // Participant view (only see own code/video)
  const myId = user?.id;
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        <div>
          <VideoFeed participantId={myId!} />
          <DuelEditor duelId={duel.id} userId={myId!} isSpectator={false} />
        </div>
        <div className="flex items-center justify-center bg-muted rounded-lg h-full">
          <span className="text-muted-foreground">
            {isPlayer1 && !duel.player2_id
              ? 'Waiting for opponent to join...'
              : 'Duel in progress!'}
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Arena;
