// src/pages/spectate/[duelId].tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DuelEditor } from '@/components/arena/DuelEditor';
import VideoFeed from '@/components/arena/VideoFeed';
import { supabase } from '@/integrations/supabase/client';

const SpectatorView = () => {
  const { duelId } = useParams();
  const [players, setPlayers] = useState<{ player1: string; player2: string }>();

  useEffect(() => {
    if (!duelId) return;

    const channel = supabase.channel(`duel-${duelId}`, {
      config: {
        broadcast: { ack: true },
        presence: { key: 'spectator' },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const playerIds = Object.keys(state);
        setPlayers({
          player1: playerIds[0],
          player2: playerIds[1],
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [duelId]);

  if (!duelId) return <div>Duel ID not provided.</div>;

  return (
    <div className="grid grid-cols-2 gap-4 h-screen p-4">
      <div className="border rounded p-4">
        {players?.player1 ? (
          <DuelEditor duelId={duelId} userId={players.player1} isSpectator />
        ) : (
          <p>Waiting for Player 1...</p>
        )}
      </div>
      <div className="border rounded p-4">
        {players?.player2 ? (
          <DuelEditor duelId={duelId} userId={players.player2} isSpectator />
        ) : (
          <p>Waiting for Player 2...</p>
        )}
      </div>
    </div>
  );
};

export default SpectatorView;
