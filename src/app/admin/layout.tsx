"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/news', label: 'Manage News' },
    { href: '/admin/projects', label: 'Manage Projects' },
    { href: '/admin/team', label: 'Manage Team' },
    { href: '/admin/settings', label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { signOut } = useAuth();
    const pathname = usePathname();

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
                    flexDirection: 'column',
                    flexShrink: 0,
                }}>
                    <h2 style={{ marginBottom: '2rem', fontSize: '1.25rem', fontWeight: 'bold' }}>TDT Admin</h2>

                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {navLinks.map(({ href, label }) => {
                            const isActive = href === '/admin'
                                ? pathname === '/admin'
                                : pathname.startsWith(href);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    style={{
                                        padding: '0.6rem 0.75rem',
                                        borderRadius: '6px',
                                        color: 'white',
                                        textDecoration: 'none',
                                        backgroundColor: isActive ? '#333' : 'transparent',
                                        opacity: isActive ? 1 : 0.75,
                                        transition: 'background-color 0.15s',
                                    }}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div style={{ marginTop: 'auto' }}>
                        <button
                            onClick={signOut}
                            style={{
                                background: 'none',
                                border: '1px solid #444',
                                color: 'white',
                                padding: '0.5rem 1rem',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                width: '100%',
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '2rem', overflowY: 'auto' }}>
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
