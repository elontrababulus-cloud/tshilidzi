"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNewsArticles } from "@/lib/services/news";
import { NewsArticle } from "@/types/news";

export default function NewsContent() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNewsArticles(true); // Only published
                setArticles(data);
            } catch (error) {
                console.error("Failed to fetch news", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <section className="section section-bg">
                <div className="container text-center">
                    <h1>Latest News & Updates</h1>
                    <p className="lead">Stay informed about our work, community stories, and impact in Zimbabwe.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {loading ? (
                        <div className="text-center">Loading news...</div>
                    ) : articles.length === 0 ? (
                        <div className="text-center">
                            <p>No news articles available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid-cols-3">
                            {articles.map((article) => (
                                <Link
                                    href={`/news/${article.id}`}
                                    key={article.id}
                                    style={{
                                        display: 'block',
                                        border: '1px solid #eee',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        backgroundColor: 'white'
                                    }}
                                    className="news-card"
                                >
                                    {article.imageUrl && (
                                        <div style={{ height: '200px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                                            <img
                                                src={article.imageUrl}
                                                alt={article.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                                            {new Date(article.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary-dark)' }}>
                                            {article.title}
                                        </h3>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {article.summary}
                                        </p>
                                        <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: '600' }}>
                                            Read More →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
