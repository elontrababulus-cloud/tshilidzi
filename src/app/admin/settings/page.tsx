"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        email: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, 'settings', 'general');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data() as any);
                } else {
                    // Initialize with defaults if not exists
                    setFormData({
                        address: 'Suit 6, The Tripple K Building 528, Great North Road',
                        phone: '+263 71 099 7996',
                        email: 'info@tshilidzi.org',
                        facebookUrl: 'https://www.facebook.com/TshilidziDevelopmentTrust',
                        instagramUrl: 'https://www.instagram.com/tshilidzi_development_trust',
                        twitterUrl: 'https://x.com/TrustTshilidzi',
                    });
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSuccess('');

        try {
            await setDoc(doc(db, 'settings', 'general'), formData);
            setSuccess('Settings updated successfully!');
        } catch (error) {
            console.error("Error saving settings:", error);
            alert("Error saving settings");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading settings...</div>;

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>General Site Settings</h1>

            {success && <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>{success}</div>}

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
                <form onSubmit={handleSubmit}>
                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Contact Information</h2>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Physical Address</label>
                        <textarea
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={3}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                            />
                        </div>
                    </div>

                    <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Social Media Links</h2>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Facebook URL</label>
                        <input
                            type="url"
                            value={formData.facebookUrl}
                            onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Instagram URL</label>
                        <input
                            type="url"
                            value={formData.instagramUrl}
                            onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>X (Twitter) URL</label>
                        <input
                            type="url"
                            value={formData.twitterUrl}
                            onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    );
}
