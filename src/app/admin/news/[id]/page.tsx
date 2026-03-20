"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { getNewsArticleById, createNewsArticle, updateNewsArticle } from "@/lib/services/news";
import { NewsArticle } from "@/types/news";

export default function AdminNewsEditor({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const isNew = resolvedParams.id === "create";

    const [article, setArticle] = useState<Partial<NewsArticle>>({
        title: "",
        summary: "",
        content: "",
        author: "",
        imageUrl: "",
        status: "draft",
        publishedAt: new Date().toISOString().split('T')[0] // Default to today
    });
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew) {
            loadArticle();
        }
    }, [isNew]);

    const loadArticle = async () => {
        setLoading(true);
        try {
            const data = await getNewsArticleById(resolvedParams.id);
            if (data) {
                setArticle({
                    ...data,
                    publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().split('T')[0] : ""
                });
            } else {
                alert("Article not found");
                router.push("/admin/news");
            }
        } catch (error) {
            console.error("Failed to load article", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isNew) {
                await createNewsArticle(article as NewsArticle);
            } else {
                await updateNewsArticle(resolvedParams.id, article);
            }
            router.push("/admin/news");
        } catch (error) {
            console.error("Failed to save article", error);
            alert("Failed to save article");
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setArticle(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '800px' }}>
            <h1 className="mb-4">{isNew ? "Create News Article" : "Edit News Article"}</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={article.title}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div className="grid-cols-2">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Author / Journalist</label>
                        <input
                            type="text"
                            name="author"
                            value={article.author}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Jane Doe"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Publish Date</label>
                        <input
                            type="date"
                            name="publishedAt"
                            value={article.publishedAt as string}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Status</label>
                    <select
                        name="status"
                        value={article.status}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Summary (Excerpt)</label>
                    <textarea
                        name="summary"
                        value={article.summary}
                        onChange={handleChange}
                        rows={3}
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Main Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={article.imageUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Content</label>
                    <small style={{ display: 'block', marginBottom: '0.5rem', color: '#666' }}>HTML is supported for basic formatting.</small>
                    <textarea
                        name="content"
                        value={article.content}
                        onChange={handleChange}
                        rows={15}
                        required
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', fontFamily: 'monospace' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving..." : "Save Article"}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => router.back()}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
