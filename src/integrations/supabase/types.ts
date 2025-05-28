export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_prompt_completions: {
        Row: {
          completed_at: string
          id: string
          prompt_date: string
          prompt_title: string
          prompt_type: string
          user_id: string
          user_response: string | null
          word_count: number | null
        }
        Insert: {
          completed_at?: string
          id?: string
          prompt_date: string
          prompt_title: string
          prompt_type: string
          user_id: string
          user_response?: string | null
          word_count?: number | null
        }
        Update: {
          completed_at?: string
          id?: string
          prompt_date?: string
          prompt_title?: string
          prompt_type?: string
          user_id?: string
          user_response?: string | null
          word_count?: number | null
        }
        Relationships: []
      }
      idiom_practice_sessions: {
        Row: {
          completed_at: string
          id: string
          idioms_correct: number
          idioms_practiced: number
          score_percentage: number
          user_id: string
        }
        Insert: {
          completed_at?: string
          id?: string
          idioms_correct: number
          idioms_practiced: number
          score_percentage: number
          user_id: string
        }
        Update: {
          completed_at?: string
          id?: string
          idioms_correct?: number
          idioms_practiced?: number
          score_percentage?: number
          user_id?: string
        }
        Relationships: []
      }
      lesson_progress: {
        Row: {
          category: Database["public"]["Enums"]["lesson_category"]
          created_at: string
          id: string
          last_lesson_completed: string | null
          lessons_completed: number | null
          overall_progress: number | null
          status: Database["public"]["Enums"]["progress_status"] | null
          total_lessons: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["lesson_category"]
          created_at?: string
          id?: string
          last_lesson_completed?: string | null
          lessons_completed?: number | null
          overall_progress?: number | null
          status?: Database["public"]["Enums"]["progress_status"] | null
          total_lessons?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["lesson_category"]
          created_at?: string
          id?: string
          last_lesson_completed?: string | null
          lessons_completed?: number | null
          overall_progress?: number | null
          status?: Database["public"]["Enums"]["progress_status"] | null
          total_lessons?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          category: Database["public"]["Enums"]["lesson_category"]
          completed_at: string
          id: string
          questions_correct: number
          questions_total: number
          score_percentage: number
          time_taken_seconds: number | null
          user_id: string
        }
        Insert: {
          category: Database["public"]["Enums"]["lesson_category"]
          completed_at?: string
          id?: string
          questions_correct: number
          questions_total: number
          score_percentage: number
          time_taken_seconds?: number | null
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["lesson_category"]
          completed_at?: string
          id?: string
          questions_correct?: number
          questions_total?: number
          score_percentage?: number
          time_taken_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      saved_idioms: {
        Row: {
          category: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          example: string
          id: string
          idiom_text: string
          meaning: string
          origin: string | null
          saved_at: string
          user_id: string
        }
        Insert: {
          category: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          example: string
          id?: string
          idiom_text: string
          meaning: string
          origin?: string | null
          saved_at?: string
          user_id: string
        }
        Update: {
          category?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          example?: string
          id?: string
          idiom_text?: string
          meaning?: string
          origin?: string | null
          saved_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          created_at: string
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          overall_progress: number | null
          total_achievements: number | null
          total_lessons_completed: number | null
          total_words_learned: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          overall_progress?: number | null
          total_achievements?: number | null
          total_lessons_completed?: number | null
          total_words_learned?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          overall_progress?: number | null
          total_achievements?: number | null
          total_lessons_completed?: number | null
          total_words_learned?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      writing_analyses: {
        Row: {
          analyzed_at: string
          clarity_score: number | null
          grammar_score: number | null
          id: string
          reading_level: string | null
          suggestions_count: number | null
          text_content: string
          tone_score: number | null
          user_id: string
          word_count: number
        }
        Insert: {
          analyzed_at?: string
          clarity_score?: number | null
          grammar_score?: number | null
          id?: string
          reading_level?: string | null
          suggestions_count?: number | null
          text_content: string
          tone_score?: number | null
          user_id: string
          word_count: number
        }
        Update: {
          analyzed_at?: string
          clarity_score?: number | null
          grammar_score?: number | null
          id?: string
          reading_level?: string | null
          suggestions_count?: number | null
          text_content?: string
          tone_score?: number | null
          user_id?: string
          word_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      difficulty_level: "beginner" | "intermediate" | "advanced"
      lesson_category: "grammar" | "vocabulary" | "writing" | "idioms"
      progress_status: "not_started" | "in_progress" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      difficulty_level: ["beginner", "intermediate", "advanced"],
      lesson_category: ["grammar", "vocabulary", "writing", "idioms"],
      progress_status: ["not_started", "in_progress", "completed"],
    },
  },
} as const
