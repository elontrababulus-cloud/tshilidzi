import { getNewsArticleById } from "@/lib/services/news";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArticleSchema, BreadcrumbSchema } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getNewsArticleById(resolvedParams.id);
  
  if (!article || article.status !== 'published') {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.title,
    description: article.summary,
  };
}

// This is a Server Component
export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const article = await getNewsArticleById(resolvedParams.id);

    if (!article || article.status !== 'published') {
        notFound();
    }

    const publishedDate = new Date(article.publishedAt).toISOString();

    return (
        <article style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
            <ArticleSchema
              title={article.title}
              description={article.summary}
              datePublished={publishedDate}
              imageUrl={article.imageUrl}
              authorName={article.author}
            />
            <BreadcrumbSchema items={[
              { name: 'Home', url: '/' },
              { name: 'News & Updates', url: '/news' },
              { name: article.title, url: `/news/${article.id}` }
            ]} />
            {/* Hero / Header */}
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '4rem 0 3rem 0', marginBottom: '3rem' }}>
                <div className="container">
                    <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '1.5rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                        ← Back to News
                    </Link>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', maxWidth: '900px' }}>{article.title}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#666', fontSize: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>Author: <strong>{article.author}</strong></span>
                        </div>
                        <div>•</div>
                        <div>
                            {new Date(article.publishedAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '800px' }}>
                {/* Main Image */}
                {article.imageUrl && (
                    <div style={{ marginBottom: '3rem', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        <img
                            src={article.imageUrl}
                            alt={article.title}
                            style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#333' }}
                    dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }}
                />
            </div>
        </article>
    );
}
