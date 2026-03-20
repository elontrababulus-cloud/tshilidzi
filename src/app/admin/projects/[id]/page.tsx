"use client";

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getProjectById, createProject, updateProject } from '@/lib/services/projects';
import { Project } from '@/types/project';

type FormData = Omit<Project, 'id' | 'dateCreated'>;

const defaultForm: FormData = {
    title: '',
    category: 'youth',
    status: 'active',
    summary: '',
    description: '',
    imageUrl: '',
};

export default function AdminProjectEditor({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const isNew = resolvedParams.id === 'create';

    const [formData, setFormData] = useState<FormData>(defaultForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [loading, setLoading] = useState(!isNew);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isNew) loadProject();
    }, [isNew]);

    const loadProject = async () => {
        setLoading(true);
        try {
            const data = await getProjectById(resolvedParams.id);
            if (data) {
                const { id, dateCreated, ...rest } = data;
                setFormData(rest);
                if (data.imageUrl) setImagePreview(data.imageUrl);
            } else {
                alert('Project not found');
                router.push('/admin/projects');
            }
        } catch (error) {
            console.error('Failed to load project', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isNew) {
                await createProject(formData, imageFile ?? undefined);
            } else {
                await updateProject(resolvedParams.id, formData, imageFile ?? undefined);
            }
            router.push('/admin/projects');
        } catch (error) {
            console.error('Failed to save project', error);
            alert('Failed to save project. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading...</div>;

    const inputStyle = {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
    };

    const labelStyle = {
        display: 'block' as const,
        marginBottom: '0.4rem',
        fontWeight: '500' as const,
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <h1 style={{ marginBottom: '2rem' }}>{isNew ? 'Create Project' : 'Edit Project'}</h1>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Title */}
                <div>
                    <label style={labelStyle}>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                {/* Category + Status */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={labelStyle}>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                            <option value="youth">Youth &amp; Women</option>
                            <option value="climate">Climate Resilience</option>
                            <option value="education">Education</option>
                            <option value="governance">Governance</option>
                        </select>
                    </div>
                    <div>
                        <label style={labelStyle}>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
                            <option value="active">Active</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Image upload */}
                <div>
                    <label style={labelStyle}>Project Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ ...inputStyle, padding: '0.5rem' }}
                    />
                    {imagePreview && (
                        <div style={{ marginTop: '0.75rem', position: 'relative', width: '100%', height: '200px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #eee' }}>
                            <Image
                                src={imagePreview}
                                alt="Project image preview"
                                fill
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>
                    )}
                </div>

                {/* Summary */}
                <div>
                    <label style={labelStyle}>Summary <span style={{ fontWeight: 400, color: '#888', fontSize: '0.85rem' }}>(shown on project cards)</span></label>
                    <input
                        type="text"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        required
                        placeholder="One or two sentences describing the project"
                        style={inputStyle}
                    />
                </div>

                {/* Description */}
                <div>
                    <label style={labelStyle}>Full Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={8}
                        required
                        style={{ ...inputStyle, resize: 'vertical' }}
                    />
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Saving...' : isNew ? 'Create Project' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline"
                        onClick={() => router.push('/admin/projects')}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
