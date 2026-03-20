import { MetadataRoute } from 'next';
import { getNewsArticles } from '@/lib/services/news';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://tshilidzi-a2712.web.app';

    // Static routes
    const routes = [
        '',
        '/about',
        '/programs',
        '/projects',
        '/news',
        '/contact',
        '/get-involved',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (News Articles)
    const articles = await getNewsArticles(true);
    const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/news/${article.id}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...articleRoutes];
}
