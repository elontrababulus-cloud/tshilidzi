"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjects, deleteProject } from '@/lib/services/projects';
import { Project } from '@/types/project';

const categoryLabels: Record<Project['category'], string> = {
    youth: 'Youth & Women',
    climate: 'Climate Resilience',
    education: 'Education',
    governance: 'Governance',
};

const statusColors: Record<Project['status'], { bg: string; color: string }> = {
    active: { bg: '#d4edda', color: '#155724' },
    upcoming: { bg: '#fff3cd', color: '#856404' },
    completed: { bg: '#e2e3e5', color: '#383d41' },
};

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            await deleteProject(id);
            await loadProjects();
        } catch (error) {
            console.error('Failed to delete project', error);
            alert('Failed to delete project');
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Manage Projects</h1>
                <Link href="/admin/projects/create" className="btn btn-primary">
                    + New Project
                </Link>
            </div>

            {loading ? (
                <p>Loading projects...</p>
            ) : projects.length === 0 ? (
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
                    <p>No projects yet.</p>
                    <Link href="/admin/projects/create" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                        Create your first project
                    </Link>
                </div>
            ) : (
                <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee', backgroundColor: '#fafafa' }}>
                                <th style={{ padding: '1rem' }}>Title</th>
                                <th style={{ padding: '1rem' }}>Category</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Created</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => {
                                const status = statusColors[project.status];
                                return (
                                    <tr key={project.id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1rem', fontWeight: '500' }}>
                                            {project.title}
                                            {project.imageUrl && (
                                                <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#888' }}>📷</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '1rem', color: '#555' }}>
                                            {categoryLabels[project.category]}
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.6rem',
                                                borderRadius: '4px',
                                                backgroundColor: status.bg,
                                                color: status.color,
                                                fontSize: '0.8rem',
                                                fontWeight: '500',
                                            }}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', color: '#888', fontSize: '0.9rem' }}>
                                            {project.dateCreated
                                                ? new Date(project.dateCreated).toLocaleDateString()
                                                : 'N/A'}
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            <Link
                                                href={`/admin/projects/${project.id}`}
                                                className="btn btn-outline"
                                                style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id!)}
                                                className="btn"
                                                style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
