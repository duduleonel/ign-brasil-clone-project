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
      categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      communities: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          logo: string | null
          name: string
          slug: string
          social_links: Json | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          logo?: string | null
          name: string
          slug: string
          social_links?: Json | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          logo?: string | null
          name?: string
          slug?: string
          social_links?: Json | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      games: {
        Row: {
          created_at: string | null
          description: string | null
          developer: string | null
          download_link: string | null
          featured_image: string | null
          genre: string | null
          id: string
          official_site: string | null
          platforms: string[] | null
          publisher: string | null
          rating: number | null
          release_date: string | null
          slug: string
          summary: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          developer?: string | null
          download_link?: string | null
          featured_image?: string | null
          genre?: string | null
          id?: string
          official_site?: string | null
          platforms?: string[] | null
          publisher?: string | null
          rating?: number | null
          release_date?: string | null
          slug: string
          summary?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          developer?: string | null
          download_link?: string | null
          featured_image?: string | null
          genre?: string | null
          id?: string
          official_site?: string | null
          platforms?: string[] | null
          publisher?: string | null
          rating?: number | null
          release_date?: string | null
          slug?: string
          summary?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      pages: {
        Row: {
          content: string | null
          created_at: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          slug: string
          status: Database["public"]["Enums"]["post_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["post_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["post_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      post_media: {
        Row: {
          caption: string | null
          created_at: string | null
          file_size: number | null
          id: string
          media_type: string
          mime_type: string | null
          order_index: number | null
          post_id: string | null
          title: string | null
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          id?: string
          media_type: string
          mime_type?: string | null
          order_index?: number | null
          post_id?: string | null
          title?: string | null
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string | null
          file_size?: number | null
          id?: string
          media_type?: string
          mime_type?: string | null
          order_index?: number | null
          post_id?: string | null
          title?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_name: string | null
          category_id: string | null
          content: string | null
          created_at: string | null
          dislike_count: number | null
          excerpt: string | null
          featured_image: string | null
          game_id: string | null
          id: string
          is_featured: boolean | null
          is_sponsored: boolean | null
          is_updating: boolean | null
          like_count: number | null
          meta_description: string | null
          meta_title: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          published_at: string | null
          slug: string
          source: string | null
          status: Database["public"]["Enums"]["post_status"] | null
          subtitle: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_name?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          dislike_count?: number | null
          excerpt?: string | null
          featured_image?: string | null
          game_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_sponsored?: boolean | null
          is_updating?: boolean | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          post_type: Database["public"]["Enums"]["post_type"]
          published_at?: string | null
          slug: string
          source?: string | null
          status?: Database["public"]["Enums"]["post_status"] | null
          subtitle?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_name?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          dislike_count?: number | null
          excerpt?: string | null
          featured_image?: string | null
          game_id?: string | null
          id?: string
          is_featured?: boolean | null
          is_sponsored?: boolean | null
          is_updating?: boolean | null
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          post_type?: Database["public"]["Enums"]["post_type"]
          published_at?: string | null
          slug?: string
          source?: string | null
          status?: Database["public"]["Enums"]["post_status"] | null
          subtitle?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      related_games: {
        Row: {
          created_at: string | null
          id: string
          main_game_id: string
          related_game_id: string
          relationship_type: string | null
          similarity_score: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          main_game_id: string
          related_game_id: string
          relationship_type?: string | null
          similarity_score?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          main_game_id?: string
          related_game_id?: string
          relationship_type?: string | null
          similarity_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "related_games_main_game_id_fkey"
            columns: ["main_game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "related_games_related_game_id_fkey"
            columns: ["related_game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
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
      engine_type: "mugen" | "ikemen_go" | "openbor"
      post_status: "draft" | "published" | "updating" | "archived"
      post_type:
        | "news"
        | "review"
        | "interview"
        | "report"
        | "download"
        | "tutorial"
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
      engine_type: ["mugen", "ikemen_go", "openbor"],
      post_status: ["draft", "published", "updating", "archived"],
      post_type: [
        "news",
        "review",
        "interview",
        "report",
        "download",
        "tutorial",
      ],
    },
  },
} as const
