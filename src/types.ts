export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  publishedAt: string;
  image: string;
}

export interface Framework {
  slug: string;
  name: string;
  description: string;
  originator: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Business' | 'Life' | 'Gaming' | 'Investing';
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  challenge: string;
  framework: string;
  outcome: string;
  image: string;
}
