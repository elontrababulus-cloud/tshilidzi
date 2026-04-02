import Link from 'next/link';
import { getTeamMembers } from '@/lib/services/team';

export const metadata = {
    title: 'About Us | Tshilidzi Development Trust',
    description: 'Learn about our history, mission, and the team driving change in Zimbabwe.',
};

export const revalidate = 60;

export default async function AboutPage() {
    let team = [];
    try { team = await getTeamMembers(); } catch { team = []; }

    return (
        <>
            <section className="section section-bg">
                <div className="container">
                    <h1 className="text-center" style={{ marginBottom: '2rem' }}>About Tshilidzi Development Trust</h1>
                    <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto 3rem auto', fontSize: '1.2rem', color: 'var(--color-text-secondary)' }}>
                        We are a community-driven organization committed to sustainable development and empowerment in Beitbridge and beyond.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid-cols-2">
                        <div>
                            <h2>Our Story</h2>
                            <p>
                                Founded with a vision to uplift vulnerable communities, Tshilidzi Development Trust (TDT) has been at the forefront of grassroots development in Zimbabwe. We believe that true change comes from within the community, empowered by education, resources, and opportunity.
                            </p>
                            <p>
                                Our name "Tshilidzi" means "Grace" in Venda, reflecting our commitment to serving with compassion, integrity, and a deep respect for human dignity.
                            </p>
                        </div>
                        <div style={{ backgroundColor: '#eee', borderRadius: '8px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            [Image: Community Meeting]
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section-bg">
                <div className="container">
                    <div className="grid-cols-3">
                        <div className="text-center" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
                            <h3 style={{ color: 'var(--color-primary)' }}>Our Vision</h3>
                            <p>To be the leading catalyst for sustainable community development and youth empowerment in Southern Africa.</p>
                        </div>
                        <div className="text-center" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
                            <h3 style={{ color: 'var(--color-primary)' }}>Our Mission</h3>
                            <p>To empower women and youth through skills development, climate action, and digital transformation initiatives.</p>
                        </div>
                        <div className="text-center" style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px' }}>
                            <h3 style={{ color: 'var(--color-primary)' }}>Our Values</h3>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>Integrity</li>
                                <li>Inclusivity</li>
                                <li>Sustainability</li>
                                <li>Accountability</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container text-center">
                    <h2 style={{ marginBottom: '2rem' }}>Governance & Leadership</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto 3rem auto' }}>
                        TDT is governed by a diverse Board of Trustees comprising experts in law, development, finance, and education, ensuring transparency and strategic direction.
                    </p>
                    <div className="grid-cols-3">
                        {team.map(member => (
                            <div key={member.id} style={{ padding: '1rem' }}>
                                <div style={{
                                    width: '120px', height: '120px', borderRadius: '50%',
                                    margin: '0 auto 1rem auto', overflow: 'hidden',
                                    backgroundColor: '#ddd',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    {member.photoUrl
                                        ? <img src={member.photoUrl} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        : <span style={{ fontSize: '2rem', color: '#999' }}>{member.name.charAt(0)}</span>
                                    }
                                </div>
                                <h4 style={{ color: 'var(--color-primary)' }}>{member.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
