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
          status: 'waiting' | 'active' | 'completed';
          is_public: boolean;
          created_at: string;
          winner: string | null;
        };
        Insert: {
          id?: string;
          player1_id: string;
          player2_id?: string | null;
          problem_ids: string[];
          status?: 'waiting' | 'active' | 'completed';
          is_public?: boolean;
          created_at?: string;
          winner?: string | null;
        };
        Update: {
          id?: string;
          player1_id?: string;
          player2_id?: string | null;
          problem_ids?: string[];
          status?: 'waiting' | 'active' | 'completed';
          is_public?: boolean;
          created_at?: string;
          winner?: string | null;
        };
      };
      problems: {
        Row: {
          id: string;
          title: string;
          description: string;
          starter_code: string;
          test_cases: Array<{
            input: string;
            output: string;
          }>;
          expected_output: string;
          language: 'python' | 'java' | 'cpp';
          difficulty: 'easy' | 'medium' | 'hard';
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          starter_code: string;
          test_cases: Array<{
            input: string;
            output: string;
          }>;
          expected_output: string;
          language: 'python' | 'java' | 'cpp';
          difficulty: 'easy' | 'medium' | 'hard';
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          starter_code?: string;
          test_cases?: Array<{
            input: string;
            output: string;
          }>;
          expected_output?: string;
          language?: 'python' | 'java' | 'cpp';
          difficulty?: 'easy' | 'medium' | 'hard';
          created_at?: string;
        };
      };
    };
    Views: {
      // Add view definitions here if needed
    };
    Functions: {
      // Add function definitions here if needed
    };
    Enums: {
      // Add enum definitions here if needed
    };
    CompositeTypes: {
      // Add composite type definitions here if needed
    };
  };
}
