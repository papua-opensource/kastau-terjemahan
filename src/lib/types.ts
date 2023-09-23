export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bahasa: {
        Row: {
          created_at: string
          id_bahasa: number
          nama_bahasa: string
        }
        Insert: {
          created_at?: string
          id_bahasa?: number
          nama_bahasa: string
        }
        Update: {
          created_at?: string
          id_bahasa?: number
          nama_bahasa?: string
        }
        Relationships: []
      }
      feedback: {
        Row: {
          created_at: string
          id: number
          message: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
        }
        Relationships: []
      }
      kelas_kata: {
        Row: {
          created_at: string
          id_kelas_kata: number
          nama: string
          singkatan: string | null
        }
        Insert: {
          created_at?: string
          id_kelas_kata?: number
          nama: string
          singkatan?: string | null
        }
        Update: {
          created_at?: string
          id_kelas_kata?: number
          nama?: string
          singkatan?: string | null
        }
        Relationships: []
      }
      kosakata: {
        Row: {
          arti: string | null
          contoh_asal: string | null
          contoh_terjemahan: string | null
          created_at: string
          id_bahasa: number | null
          id_kelas_kata: number | null
          id_kosakata: number
          kata: string | null
          lafal: string | null
        }
        Insert: {
          arti?: string | null
          contoh_asal?: string | null
          contoh_terjemahan?: string | null
          created_at?: string
          id_bahasa?: number | null
          id_kelas_kata?: number | null
          id_kosakata?: number
          kata?: string | null
          lafal?: string | null
        }
        Update: {
          arti?: string | null
          contoh_asal?: string | null
          contoh_terjemahan?: string | null
          created_at?: string
          id_bahasa?: number | null
          id_kelas_kata?: number | null
          id_kosakata?: number
          kata?: string | null
          lafal?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kosakata_id_bahasa_fkey"
            columns: ["id_bahasa"]
            referencedRelation: "bahasa"
            referencedColumns: ["id_bahasa"]
          },
          {
            foreignKeyName: "kosakata_id_kelas_kata_fkey"
            columns: ["id_kelas_kata"]
            referencedRelation: "kelas_kata"
            referencedColumns: ["id_kelas_kata"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}