// pages/spectate/[duelId].tsx
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import {DuelEditor} from '@/components/arena/DuelEditor';
import VideoFeed from '@/components/arena/VideoFeed';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';

const SpectatorView = ({ duelId }) => {
  const [players, setPlayers] = useState<{ player1: string, player2: string }>();

  useEffect(() => {
    const channel = supabase.channel(`duel-${duelId}`, {
      config: { 
        broadcast: { ack: true },
        presence: { key: 'spectator' }
      }
    });

    channel.on('presence', { event: 'sync' }, () => {
      const state = channel.presenceState();
      setPlayers({
        player1: Object.keys(state)[0],
        player2: Object.keys(state)[1]
      });
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [duelId]);

  return (
    <div className="grid grid-cols-2 gap-4 h-screen">
      <div className="border p-4">
        <DuelEditor 
          duelId={duelId} 
          userId={players?.player1} 
          isSpectator={true}
        />
      </div>
      <div className="border p-4">
        <DuelEditor
          duelId={duelId}
          userId={players?.player2}
          isSpectator={true}
        />
      </div>
    </div>
  );
};
