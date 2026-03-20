"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NewsArticle } from '@/types/news';
import { Project } from '@/types/project';

interface Stats {
    totalProjects: number;
    publishedArticles: number;
    draftArticles: number;
    totalArticles: number;
}

interface RecentItem {
    id: string;
    title: string;
    type: 'news' | 'project';
    date: Date;
    status: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [recent, setRecent] = useState<RecentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        setLoading(true);
        try {
            const [projectsSnap, allNewsSnap, publishedNewsSnap] = await Promise.all([
                getDocs(collection(db, 'projects')),
                getDocs(collection(db, 'news')),
                getDocs(query(collection(db, 'news'), where('status', '==', 'published'))),
            ]);

            setStats({
                totalProjects: projectsSnap.size,
                publishedArticles: publishedNewsSnap.size,
                draftArticles: allNewsSnap.size - publishedNewsSnap.size,
                totalArticles: allNewsSnap.size,
            });

            // Build recent items from last 5 of each
            const recentNews = allNewsSnap.docs
                .map(d => {
                    const data = d.data() as NewsArticle;
                    return {
                        id: d.id,
                        title: data.title,
                        type: 'news' as const,
                        date: data.publishedAt ? new Date(data.publishedAt) : new Date(0),
                        status: data.status,
                    };
                })
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 5);

            const recentProjects = projectsSnap.docs
                .map(d => {
                    const data = d.data() as Project;
                    return {
                        id: d.id,
                        title: data.title,
                        type: 'project' as const,
                        date: data.dateCreated ? new Date(data.dateCreated as any) : new Date(0),
                        status: data.status,
                    };
                })
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 5);

            setRecent(
                [...recentNews, ...recentProjects]
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .slice(0, 8)
            );
        } catch (error) {
            console.error('Failed to load dashboard', error);
        } finally {
            setLoading(false);
        }
    };

    const cardStyle = {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    };

    if (loading) {
        return (
            <div>
                <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>
                <p style={{ color: '#888' }}>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={cardStyle}>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Projects</p>
                    <p style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>{stats?.totalProjects ?? 0}</p>
                    <Link href="/admin/projects" style={{ fontSize: '0.85rem', color: 'var(--color-primary, #2c6e49)' }}>View all →</Link>
                </div>

                <div style={cardStyle}>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Published Articles</p>
                    <p style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>{stats?.publishedArticles ?? 0}</p>
                    <Link href="/admin/news" style={{ fontSize: '0.85rem', color: 'var(--color-primary, #2c6e49)' }}>View all →</Link>
                </div>

                <div style={cardStyle}>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Draft Articles</p>
                    <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: stats?.draftArticles ? '#E65100' : 'inherit' }}>
                        {stats?.draftArticles ?? 0}
                    </p>
                    <Link href="/admin/news" style={{ fontSize: '0.85rem', color: 'var(--color-primary, #2c6e49)' }}>Review →</Link>
                </div>

                <div style={cardStyle}>
                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Articles</p>
                    <p style={{ fontSize: '2.25rem', fontWeight: 'bold' }}>{stats?.totalArticles ?? 0}</p>
                    <Link href="/admin/news" style={{ fontSize: '0.85rem', color: 'var(--color-primary, #2c6e49)' }}>Manage →</Link>
                </div>
            </div>

            {/* Quick actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div style={cardStyle}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Link href="/admin/news/create" className="btn btn-primary" style={{ textAlign: 'center' }}>
                            + New Article
                        </Link>
                        <Link href="/admin/projects/create" className="btn btn-outline" style={{ textAlign: 'center' }}>
                            + New Project
                        </Link>
                    </div>
                </div>

                {/* Recent activity */}
                <div style={cardStyle}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Recent Activity</h3>
                    {recent.length === 0 ? (
                        <p style={{ color: '#888', fontStyle: 'italic' }}>No content yet.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {recent.map(item => (
                                <li key={`${item.type}-${item.id}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            padding: '0.1rem 0.4rem',
                                            borderRadius: '3px',
                                            backgroundColor: item.type === 'news' ? '#e3f2fd' : '#e8f5e9',
                                            color: item.type === 'news' ? '#1565c0' : '#2e7d32',
                                            flexShrink: 0,
                                        }}>
                                            {item.type === 'news' ? 'News' : 'Project'}
                                        </span>
                                        <Link
                                            href={`/admin/${item.type === 'news' ? 'news' : 'projects'}/${item.id}`}
                                            style={{ color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                        >
                                            {item.title}
                                        </Link>
                                    </div>
                                    <span style={{ color: '#aaa', fontSize: '0.8rem', flexShrink: 0, marginLeft: '0.5rem' }}>
                                        {item.date.toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
