export interface Article {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: string;
  date: string;
  slug?: string;
  author?: string;
  category?: string;
  likes?: number;
  tg_link?: string;
  dzen_link?: string;
  youtube_link?: string;
  vk_link?: string;
  sections?: ArticleSection[];
  status?: 'draft' | 'published' | 'archived';
  created_at?: string;
  updated_at?: string;
}

export interface ArticleSection {
  id?: string;
  title: string;
  content?: string;
  list?: string[];
  text?: string[];
  image?: string;
  order?: number;
}
