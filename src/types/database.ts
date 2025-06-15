
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
  featured_image?: string;
  cover_image?: string;
  cartridge_image?: string;
  screenshots?: string[];
  trailer_url?: string;
  rating?: number;
  metacritic_score?: number;
  esrb_rating?: string;
  price?: number;
  is_featured?: boolean;
  release_date?: string;
  created_at: string;
  updated_at: string;
  platforms?: Platform[];
  genres?: Genre[];
  publishers?: Company[];
  developers?: Company[];
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
  logo_url: string;
  summary?: string;
  website_url?: string;
  facebook_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  discord_url?: string;
  instagram_url?: string;
  created_at: string;
  updated_at: string;
  images?: CommunityImage[];
}

export interface CommunityImage {
  id: string;
  community_id: string;
  image_url: string;
  alt_text?: string;
  created_at: string;
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
  author: string;
  status: 'draft' | 'published' | 'archived';
  view_count: number;
  read_time: number;
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
