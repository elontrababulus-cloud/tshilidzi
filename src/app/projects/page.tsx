"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Project {
    id: string;
    title: string;
    category: 'youth' | 'climate' | 'education' | 'governance';
    status: 'active' | 'upcoming' | 'completed';
    summary: string;
    description: string;
    imageUrl: string;
}

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(collection(db, 'projects'), orderBy('dateCreated', 'desc'));
                const querySnapshot = await getDocs(q);
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Project[];
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <>
            <section className="section section-bg">
                <div className="container text-center">
                    <h1>Projects & Initiatives</h1>
                    <p className="lead">See our impact in action through our various on-the-ground projects.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filter Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
                        <button
                            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </button>
                        <button
                            className={`btn ${filter === 'youth' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilter('youth')}
                        >
                            Youth & Women
                        </button>
                        <button
                            className={`btn ${filter === 'climate' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilter('climate')}
                        >
                            Climate
                        </button>
                        <button
                            className={`btn ${filter === 'education' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilter('education')}
                        >
                            Education
                        </button>
                        <button
                            className={`btn ${filter === 'governance' ? 'btn-primary' : 'btn-outline'}`}
                            onClick={() => setFilter('governance')}
                        >
                            Governance
                        </button>
                    </div>

                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>Loading projects...</div>
                    ) : (
                        <div className="grid-cols-3">
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project) => (
                                    <div key={project.id} style={{ border: '1px solid var(--color-border)', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ height: '200px', backgroundColor: '#f0f0f0', position: 'relative' }}>
                                            {project.imageUrl ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ marginBottom: '0.5rem' }}>
                                                <span style={{
                                                    fontSize: '0.75rem',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',
                                                    color: project.status === 'active' ? 'var(--color-accent)' : 'var(--color-primary)',
                                                    marginRight: '0.5rem'
                                                }}>
                                                    {project.status}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: '#666', textTransform: 'uppercase' }}>
                                                    | {project.category}
                                                </span>
                                            </div>

                                            <h3 style={{ fontSize: '1.25rem', marginTop: '0', marginBottom: '0.5rem' }}>{project.title}</h3>
                                            <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', flex: 1 }}>
                                                {project.summary}
                                            </p>
                                            {/* Link to detail page could be added here in future */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                                    <p>No projects found in this category.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
