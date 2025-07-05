
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Platform {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  created_at: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  type: 'publisher' | 'developer';
  logo_url?: string;
  created_at: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  featured_image?: string;
  rating?: number;
  genre?: string;
  developer?: string;
  publisher?: string;
  platforms?: string[];
  download_link?: string;
  official_site?: string;
  release_date?: string;
  created_at: string;
  updated_at: string;
}

export interface GameReview {
  id: string;
  game_id: string;
  user_name: string;
  rating: number;
  review_text?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  website_url?: string;
  social_links?: any;
  is_featured?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  category_id?: string;
  game_id?: string;
  author_name: string;
  status: 'draft' | 'published' | 'updating' | 'archived';
  post_type: 'news' | 'review' | 'interview' | 'report' | 'download' | 'tutorial';
  view_count: number;
  like_count: number;
  dislike_count: number;
  is_featured?: boolean;
  is_sponsored?: boolean;
  is_updating?: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  game?: Game;
  tags?: Tag[];
}

export interface PostTag {
  post_id: string;
  tag_id: string;
}
