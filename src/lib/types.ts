export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      feedback: {
        Row: {
          created_at: string | null;
          message: string;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          message: string;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          message?: string;
          id?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
