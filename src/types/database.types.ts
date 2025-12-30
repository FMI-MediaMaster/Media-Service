export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      anime: {
        Row: {
          anilist_id: number | null
          episode_duration: number | null
          id: number
          language: string | null
          media_id: number | null
          nr_episodes: number | null
        }
        Insert: {
          anilist_id?: number | null
          episode_duration?: number | null
          id?: never
          language?: string | null
          media_id?: number | null
          nr_episodes?: number | null
        }
        Update: {
          anilist_id?: number | null
          episode_duration?: number | null
          id?: never
          language?: string | null
          media_id?: number | null
          nr_episodes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'anime_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      app_achievement: {
        Row: {
          description: string
          id: number
          name: string
          xp: number | null
        }
        Insert: {
          description: string
          id?: never
          name: string
          xp?: number | null
        }
        Update: {
          description?: string
          id?: never
          name?: string
          xp?: number | null
        }
        Relationships: []
      }
      book: {
        Row: {
          format: string | null
          id: number
          language: string | null
          media_id: number | null
          nr_pages: number | null
        }
        Insert: {
          format?: string | null
          id?: never
          language?: string | null
          media_id?: number | null
          nr_pages?: number | null
        }
        Update: {
          format?: string | null
          id?: never
          language?: string | null
          media_id?: number | null
          nr_pages?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'book_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      creator: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      game: {
        Row: {
          cpu_minimum: string | null
          cpu_recommended: string | null
          gpu_minimum: string | null
          gpu_recommended: string | null
          hdd_minimum: string | null
          hdd_recommended: string | null
          hltb_all_styles: number | null
          hltb_completionist: number | null
          hltb_coop: number | null
          hltb_main: number | null
          hltb_main_side: number | null
          hltb_versus: number | null
          id: number
          igdb_id: number | null
          media_id: number | null
          os_minimum: string | null
          os_recommended: string | null
          parent_game_id: number | null
          ram_minimum: string | null
          ram_recommended: string | null
        }
        Insert: {
          cpu_minimum?: string | null
          cpu_recommended?: string | null
          gpu_minimum?: string | null
          gpu_recommended?: string | null
          hdd_minimum?: string | null
          hdd_recommended?: string | null
          hltb_all_styles?: number | null
          hltb_completionist?: number | null
          hltb_coop?: number | null
          hltb_main?: number | null
          hltb_main_side?: number | null
          hltb_versus?: number | null
          id?: never
          igdb_id?: number | null
          media_id?: number | null
          os_minimum?: string | null
          os_recommended?: string | null
          parent_game_id?: number | null
          ram_minimum?: string | null
          ram_recommended?: string | null
        }
        Update: {
          cpu_minimum?: string | null
          cpu_recommended?: string | null
          gpu_minimum?: string | null
          gpu_recommended?: string | null
          hdd_minimum?: string | null
          hdd_recommended?: string | null
          hltb_all_styles?: number | null
          hltb_completionist?: number | null
          hltb_coop?: number | null
          hltb_main?: number | null
          hltb_main_side?: number | null
          hltb_versus?: number | null
          id?: never
          igdb_id?: number | null
          media_id?: number | null
          os_minimum?: string | null
          os_recommended?: string | null
          parent_game_id?: number | null
          ram_minimum?: string | null
          ram_recommended?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'game_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'game_parent_game_id_fkey'
            columns: ['parent_game_id']
            isOneToOne: false
            referencedRelation: 'game'
            referencedColumns: ['id']
          },
        ]
      }
      game_achievement: {
        Row: {
          description: string | null
          game_id: number | null
          id: number
          name: string
        }
        Insert: {
          description?: string | null
          game_id?: number | null
          id?: never
          name: string
        }
        Update: {
          description?: string | null
          game_id?: number | null
          id?: never
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'game_achievement_game_id_fkey'
            columns: ['game_id']
            isOneToOne: false
            referencedRelation: 'game'
            referencedColumns: ['id']
          },
        ]
      }
      genre: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      link: {
        Row: {
          href: string
          id: number
          name: string
        }
        Insert: {
          href: string
          id?: never
          name: string
        }
        Update: {
          href?: string
          id?: never
          name?: string
        }
        Relationships: []
      }
      manga: {
        Row: {
          anilist_id: number | null
          id: number
          language: string | null
          media_id: number | null
          nr_chapters: number | null
          nr_pages: number | null
          nr_volumes: number | null
        }
        Insert: {
          anilist_id?: number | null
          id?: never
          language?: string | null
          media_id?: number | null
          nr_chapters?: number | null
          nr_pages?: number | null
          nr_volumes?: number | null
        }
        Update: {
          anilist_id?: number | null
          id?: never
          language?: string | null
          media_id?: number | null
          nr_chapters?: number | null
          nr_pages?: number | null
          nr_volumes?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'manga_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      media: {
        Row: {
          community_score: number | null
          critics_score: number | null
          description: string | null
          id: number
          media_type: string | null
          name: string | null
          release_date: string | null
        }
        Insert: {
          community_score?: number | null
          critics_score?: number | null
          description?: string | null
          id?: never
          media_type?: string | null
          name?: string | null
          release_date?: string | null
        }
        Update: {
          community_score?: number | null
          critics_score?: number | null
          description?: string | null
          id?: never
          media_type?: string | null
          name?: string | null
          release_date?: string | null
        }
        Relationships: []
      }
      media_creator: {
        Row: {
          creator_id: number
          media_id: number
        }
        Insert: {
          creator_id: number
          media_id: number
        }
        Update: {
          creator_id?: number
          media_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_creator_creator_id_fkey'
            columns: ['creator_id']
            isOneToOne: false
            referencedRelation: 'creator'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_creator_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      media_genre: {
        Row: {
          genre_id: number
          media_id: number
        }
        Insert: {
          genre_id: number
          media_id: number
        }
        Update: {
          genre_id?: number
          media_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_genre_genre_id_fkey'
            columns: ['genre_id']
            isOneToOne: false
            referencedRelation: 'genre'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_genre_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      media_link: {
        Row: {
          link_id: number
          media_id: number
        }
        Insert: {
          link_id: number
          media_id: number
        }
        Update: {
          link_id?: number
          media_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_link_link_id_fkey'
            columns: ['link_id']
            isOneToOne: false
            referencedRelation: 'link'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_link_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      media_platform: {
        Row: {
          media_id: number
          platform_id: number
        }
        Insert: {
          media_id: number
          platform_id: number
        }
        Update: {
          media_id?: number
          platform_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_platform_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_platform_platform_id_fkey'
            columns: ['platform_id']
            isOneToOne: false
            referencedRelation: 'platform'
            referencedColumns: ['id']
          },
        ]
      }
      media_publisher: {
        Row: {
          media_id: number
          publisher_id: number
        }
        Insert: {
          media_id: number
          publisher_id: number
        }
        Update: {
          media_id?: number
          publisher_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_publisher_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_publisher_publisher_id_fkey'
            columns: ['publisher_id']
            isOneToOne: false
            referencedRelation: 'publisher'
            referencedColumns: ['id']
          },
        ]
      }
      media_retailer: {
        Row: {
          media_id: number
          retailer_id: number
        }
        Insert: {
          media_id: number
          retailer_id: number
        }
        Update: {
          media_id?: number
          retailer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_retailer_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_retailer_retailer_id_fkey'
            columns: ['retailer_id']
            isOneToOne: false
            referencedRelation: 'retailer'
            referencedColumns: ['id']
          },
        ]
      }
      media_series: {
        Row: {
          index: number | null
          media_id: number
          series_id: number
        }
        Insert: {
          index?: number | null
          media_id: number
          series_id: number
        }
        Update: {
          index?: number | null
          media_id?: number
          series_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_series_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_series_series_id_fkey'
            columns: ['series_id']
            isOneToOne: false
            referencedRelation: 'series'
            referencedColumns: ['id']
          },
        ]
      }
      media_user: {
        Row: {
          added_date: string | null
          background: string | null
          book_read_pages: number | null
          cover: string | null
          game_time: number | null
          icon: string | null
          manga_read_chapters: number | null
          media_id: number
          modified_date: string
          movie_watched_seconds_: number | null
          name: string | null
          nr_seen_episodes: number | null
          series: string | null
          status: string | null
          user_id: string
          user_score: number | null
        }
        Insert: {
          added_date?: string | null
          background?: string | null
          book_read_pages?: number | null
          cover?: string | null
          game_time?: number | null
          icon?: string | null
          manga_read_chapters?: number | null
          media_id: number
          modified_date: string
          movie_watched_seconds_?: number | null
          name?: string | null
          nr_seen_episodes?: number | null
          series?: string | null
          status?: string | null
          user_id: string
          user_score?: number | null
        }
        Update: {
          added_date?: string | null
          background?: string | null
          book_read_pages?: number | null
          cover?: string | null
          game_time?: number | null
          icon?: string | null
          manga_read_chapters?: number | null
          media_id?: number
          modified_date?: string
          movie_watched_seconds_?: number | null
          name?: string | null
          nr_seen_episodes?: number | null
          series?: string | null
          status?: string | null
          user_id?: string
          user_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'media_user_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      media_user_source: {
        Row: {
          media_id: number
          source_id: number
          user_id: string
        }
        Insert: {
          media_id: number
          source_id: number
          user_id: string
        }
        Update: {
          media_id?: number
          source_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'media_user_source_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_user_source_source_id_fkey'
            columns: ['source_id']
            isOneToOne: false
            referencedRelation: 'source'
            referencedColumns: ['id']
          },
        ]
      }
      media_user_tag: {
        Row: {
          media_id: number
          user_id: string
          user_tag_id: number
        }
        Insert: {
          media_id: number
          user_id: string
          user_tag_id: number
        }
        Update: {
          media_id?: number
          user_id?: string
          user_tag_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'media_user_tag_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'media_user_tag_user_tag_id_fkey'
            columns: ['user_tag_id']
            isOneToOne: false
            referencedRelation: 'user_tag'
            referencedColumns: ['id']
          },
        ]
      }
      movie: {
        Row: {
          duration: number | null
          id: number
          language: string | null
          media_id: number | null
          tmdb_id: number | null
        }
        Insert: {
          duration?: number | null
          id?: never
          language?: string | null
          media_id?: number | null
          tmdb_id?: number | null
        }
        Update: {
          duration?: number | null
          id?: never
          language?: string | null
          media_id?: number | null
          tmdb_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'movie_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      note: {
        Row: {
          added_date: string | null
          content: string
          id: number
          media_id: number | null
          modified_date: string | null
          user_id: string | null
        }
        Insert: {
          added_date?: string | null
          content: string
          id?: never
          media_id?: number | null
          modified_date?: string | null
          user_id?: string | null
        }
        Update: {
          added_date?: string | null
          content?: string
          id?: never
          media_id?: number | null
          modified_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'note_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      platform: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      publisher: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      retailer: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
      season: {
        Row: {
          cover: string | null
          id: number
          name: string | null
          nr_episodes: number | null
          tv_series_id: number | null
        }
        Insert: {
          cover?: string | null
          id?: never
          name?: string | null
          nr_episodes?: number | null
          tv_series_id?: number | null
        }
        Update: {
          cover?: string | null
          id?: never
          name?: string | null
          nr_episodes?: number | null
          tv_series_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'season_tv_series_id_fkey'
            columns: ['tv_series_id']
            isOneToOne: false
            referencedRelation: 'tv_series'
            referencedColumns: ['id']
          },
        ]
      }
      series: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: never
          name?: string | null
        }
        Update: {
          id?: never
          name?: string | null
        }
        Relationships: []
      }
      source: {
        Row: {
          id: number
          media_type: string | null
          name: string | null
        }
        Insert: {
          id?: never
          media_type?: string | null
          name?: string | null
        }
        Update: {
          id?: never
          media_type?: string | null
          name?: string | null
        }
        Relationships: []
      }
      tv_series: {
        Row: {
          id: number
          language: string | null
          media_id: number | null
          tmdb_id: number | null
        }
        Insert: {
          id?: never
          language?: string | null
          media_id?: number | null
          tmdb_id?: number | null
        }
        Update: {
          id?: never
          language?: string | null
          media_id?: number | null
          tmdb_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'tv_series_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
        ]
      }
      user_achievement: {
        Row: {
          app_achievement_id: number
          unlock_date: string | null
          user_id: string
        }
        Insert: {
          app_achievement_id: number
          unlock_date?: string | null
          user_id: string
        }
        Update: {
          app_achievement_id?: number
          unlock_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'user_achievement_app_achievement_id_fkey'
            columns: ['app_achievement_id']
            isOneToOne: false
            referencedRelation: 'app_achievement'
            referencedColumns: ['id']
          },
        ]
      }
      user_tag: {
        Row: {
          id: number
          media_type: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          id?: never
          media_type?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          id?: never
          media_type?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          added_date: string | null
          background: string | null
          cover: string | null
          icon: string | null
          media_id: number
          modified_date: string
          name: string
          series: string | null
          user_id: string
          user_score: number | null
        }
        Insert: {
          added_date?: string | null
          background?: string | null
          cover?: string | null
          icon?: string | null
          media_id: number
          modified_date: string
          name: string
          series?: string | null
          user_id: string
          user_score?: number | null
        }
        Update: {
          added_date?: string | null
          background?: string | null
          cover?: string | null
          icon?: string | null
          media_id?: number
          modified_date?: string
          name?: string
          series?: string | null
          user_id?: string
          user_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'wishlist_media_id_fkey'
            columns: ['media_id']
            isOneToOne: false
            referencedRelation: 'media'
            referencedColumns: ['id']
          },
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

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
    public: {
        Enums: {},
    },
} as const
