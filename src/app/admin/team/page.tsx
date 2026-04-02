"use client";

import { useEffect, useState, useRef } from 'react';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/services/team';
import { TeamMember } from '@/types/team';

const emptyForm = { name: '', role: '', order: 0, photoUrl: '' };

export default function AdminTeamPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState<TeamMember | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string>('');
    const [showForm, setShowForm] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { load(); }, []);

    const load = async () => {
        setLoading(true);
        try { setMembers(await getTeamMembers()); } finally { setLoading(false); }
    };

    const openNew = () => {
        setEditing(null);
        setForm(emptyForm);
        setPhotoFile(null);
        setPhotoPreview('');
        setShowForm(true);
    };

    const openEdit = (m: TeamMember) => {
        setEditing(m);
        setForm({ name: m.name, role: m.role, order: m.order, photoUrl: m.photoUrl || '' });
        setPhotoFile(null);
        setPhotoPreview(m.photoUrl || '');
        setShowForm(true);
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        if (!form.name.trim() || !form.role.trim()) return;
        setSaving(true);
        try {
            if (editing?.id) {
                await updateTeamMember(editing.id, form, photoFile || undefined);
            } else {
                await createTeamMember(form, photoFile || undefined);
            }
            setShowForm(false);
            await load();
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this team member?')) return;
        await deleteTeamMember(id);
        await load();
    };

    const cardStyle: React.CSSProperties = {
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '0.6rem 0.75rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '0.95rem',
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h1>Manage Team</h1>
                <button onClick={openNew} className="btn btn-primary">+ Add Member</button>
            </div>

            {showForm && (
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.25rem' }}>{editing ? 'Edit Member' : 'New Member'}</h3>

                    {/* Photo upload */}
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                width: '100px', height: '100px', borderRadius: '50%',
                                backgroundColor: '#eee', margin: '0 auto 0.75rem auto',
                                cursor: 'pointer', overflow: 'hidden', border: '2px dashed #ccc',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                        >
                            {photoPreview
                                ? <img src={photoPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                : <span style={{ fontSize: '0.75rem', color: '#999' }}>Upload Photo</span>
                            }
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                        <button onClick={() => fileInputRef.current?.click()} style={{ fontSize: '0.8rem', background: 'none', border: '1px solid #ccc', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
                            {photoPreview ? 'Change Photo' : 'Choose Photo'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Full Name *</label>
                            <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Jannet Taruvinga" />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Role / Title *</label>
                            <input style={inputStyle} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Executive Director" />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.25rem', width: '150px' }}>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Display Order</label>
                        <input style={inputStyle} type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={handleSave} disabled={saving} className="btn btn-primary">
                            {saving ? 'Saving...' : 'Save'}
                        </button>
                        <button onClick={() => setShowForm(false)} style={{ background: 'none', border: '1px solid #ccc', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <p style={{ color: '#888' }}>Loading...</p>
            ) : members.length === 0 ? (
                <p style={{ color: '#888', fontStyle: 'italic' }}>No team members yet. Add one above.</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {members.map(m => (
                        <div key={m.id} style={cardStyle}>
                            <div style={{ width: '52px', height: '52px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#ddd', flexShrink: 0 }}>
                                {m.photoUrl
                                    ? <img src={m.photoUrl} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#999' }}>
                                        {m.name.charAt(0)}
                                    </div>
                                }
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, margin: 0 }}>{m.name}</p>
                                <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>{m.role}</p>
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#bbb', marginRight: '0.5rem' }}>#{m.order}</span>
                            <button onClick={() => openEdit(m)} style={{ background: 'none', border: '1px solid #ccc', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Edit</button>
                            <button onClick={() => handleDelete(m.id!)} style={{ background: 'none', border: '1px solid #fca5a5', color: '#dc2626', padding: '0.3rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
