import { useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import { supabase } from '@/integrations/supabase/client';

export const DuelEditor = ({ duelId, userId, isSpectator }) => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const channel = supabase.channel(`duel-${duelId}`, {
      config: { 
        broadcast: { ack: true },
        presence: { key: userId }
      }
    });

    // Receive code updates
    channel.on('broadcast', { event: 'code' }, ({ payload }) => {
      if (payload.userId !== userId) {
        setCode(payload.code);
      }
    }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [duelId, userId]);

  const handleCodeChange = (value) => {
    if (!isSpectator) {
      setCode(value);
      supabase.channel(`duel-${duelId}`).send({
        type: 'broadcast',
        event: 'code',
        payload: { code: value, userId }
      });
    }
  };

  return (
    <Editor
      height="90vh"
      language="python"
      value={code}
      onChange={handleCodeChange}
      options={{ readOnly: isSpectator }}
    />
  );
};
