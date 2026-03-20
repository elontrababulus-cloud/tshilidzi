import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ProtectedRoute>
            <div style={{ display: 'flex', minHeight: '100vh' }}>
                {/* Sidebar */}
                <aside style={{
                    width: '250px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h2 style={{ marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>TDT Admin</h2>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Link href="/admin" style={{ opacity: 0.8 }}>Dashboard</Link>
                        <Link href="/admin/posts" style={{ opacity: 0.8 }}>Manage News</Link>
                        <Link href="/admin/projects" style={{ opacity: 0.8 }}>Manage Projects</Link>
                        <Link href="/admin/users" style={{ opacity: 0.8 }}>Users</Link>
                        <Link href="/admin/settings" style={{ opacity: 0.8 }}>Settings</Link>
                    </nav>

                    <div style={{ marginTop: 'auto' }}>
                        <button style={{
                            background: 'none',
                            border: '1px solid #444',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            width: '100%'
                        }}>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '2rem' }}>
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
