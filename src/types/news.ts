export interface NewsArticle {
    id?: string;
    title: string;
    summary: string;
    content: string; // HTML or Markdown content
    author: string; // Journalist Name
    publishedAt: Date | any; // Supports Firestore Timestamp
    imageUrl?: string;
    status: 'draft' | 'published';
}
