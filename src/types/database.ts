
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

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  featured_image?: string;
  category_id?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  view_count: number;
  read_time: number;
  created_at: string;
  updated_at: string;
  category?: Category;
  tags?: Tag[];
}

export interface PostTag {
  post_id: string;
  tag_id: string;
}
