// src/integrations/supabase/types.ts
export interface Database {
  public: {
    Tables: {
      duels: {
        Row: {
          id: string;
          player1_id: string;
          player2_id: string | null;
          problem_ids: string[];
          status: string;
          is_public: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          player1_id: string;
          player2_id?: string | null;
          problem_ids: string[];
          status: string;
          is_public: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          player1_id?: string;
          player2_id?: string | null;
          problem_ids?: string[];
          status?: string;
          is_public?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
