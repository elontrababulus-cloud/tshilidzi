"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { Project } from '@/types/project';

export default function AdminProjectsPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formData, setFormData] = useState<Omit<Project, 'id' | 'dateCreated'>>({
        title: '',
        category: 'youth',
        status: 'active',
        summary: '',
        description: '',
        imageUrl: '',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');

        try {
            let downloadURL = '';

            if (imageFile) {
                const storageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                downloadURL = await getDownloadURL(snapshot.ref);
            }

            await addDoc(collection(db, "projects"), {
                ...formData,
                imageUrl: downloadURL,
                dateCreated: new Date(),
            });
            setSuccess('Project created successfully!');
            setFormData({
                title: '',
                category: 'youth',
                status: 'active',
                summary: '',
                description: '',
                imageUrl: '',
            });
            setImageFile(null);
        } catch (error) {
            console.error("Error creating project: ", error);
            alert("Error creating project");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Manage Projects</h1>

            {success && <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{success}</div>}

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Add New Project</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            required
                        />
                    </div>

                    <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                                <option value="youth">Youth & Women</option>
                                <option value="climate">Climate Resilience</option>
                                <option value="education">Education</option>
                                <option value="governance">Governance</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            >
                                <option value="active">Active</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Project Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Summary (Short)</label>
                        <input
                            type="text"
                            value={formData.summary}
                            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Full Description</label>
                        <textarea
                            rows={5}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Uploading & Creating...' : 'Create Project'}
                    </button>
                </form>
            </div>
        </div>
    );
}
