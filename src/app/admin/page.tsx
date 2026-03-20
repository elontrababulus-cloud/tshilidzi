export const metadata = {
    title: 'Dashboard | TDT Admin',
};

export default function AdminDashboard() {
    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Dashboard Overview</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>Total Projects</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>12</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>Active News Articles</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>45</p>
                </div>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '1rem', color: '#666', marginBottom: '0.5rem' }}>Pending Inquiries</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#E65100' }}>3</p>
                </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Recent Activity</h2>
                <p style={{ color: '#666', fontStyle: 'italic' }}>No recent activity to show.</p>
            </div>
        </div>
    );
}
