// services/duelService.ts
import { supabase } from '@/integrations/supabase/client';

export const createDuel = async (userId: string, isPublic: boolean) => {
  const { data, error } = await supabase
    .from('duels')
    .insert({
      player1_id: userId,
      is_public: isPublic,
      problem_ids: ['problem1', 'problem2'] // Fetch from your problem bank
    })
    .select()
    .single();

  return {
    duelId: data?.id,
    inviteLink: `${window.location.origin}/duel/${data?.id}`
  };
};

export const joinDuel = async (duelId: string, userId: string) => {
  await supabase
    .from('duels')
    .update({ player2_id: userId })
    .eq('id', duelId);
};
