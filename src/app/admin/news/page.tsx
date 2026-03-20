"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getNewsArticles, deleteNewsArticle } from "@/lib/services/news";
import { NewsArticle } from "@/types/news";

export default function AdminNewsPage() {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        setLoading(true);
        try {
            const data = await getNewsArticles();
            setArticles(data);
        } catch (error) {
            console.error("Failed to load articles", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this article?")) {
            await deleteNewsArticle(id);
            await loadArticles();
        }
    };

    return (
        <div className="container" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Manage News</h1>
                <Link href="/admin/news/create" className="btn btn-primary">
                    Create New Article
                </Link>
            </div>

            {loading ? (
                <p>Loading articles...</p>
            ) : articles.length === 0 ? (
                <p>No articles found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                            <th style={{ padding: '1rem' }}>Title</th>
                            <th style={{ padding: '1rem' }}>Author</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article) => (
                            <tr key={article.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '1rem' }}>{article.title}</td>
                                <td style={{ padding: '1rem' }}>{article.author}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        backgroundColor: article.status === 'published' ? '#d4edda' : '#fff3cd',
                                        color: article.status === 'published' ? '#155724' : '#856404',
                                        fontSize: '0.85rem'
                                    }}>
                                        {article.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}>
                                    <Link href={`/admin/news/${article.id}`} className="btn btn-outline" style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}>
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(article.id!)}
                                        className="btn"
                                        style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
