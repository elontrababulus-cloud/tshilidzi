import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Get Involved | Tshilidzi Development Trust',
    description: 'Join hands with Tshilidzi to build a resilient, digital-ready Zimbabwe. Volunteer, mentor, partner, or donate today.',
};

export default function GetInvolvedPage() {
    return (
        <>
            <section className="section section-bg">
                <div className="container text-center">
                    <h1>Be the Change in Our Community</h1>
                    <p className="lead">Join hands with Tshilidzi to build a resilient, digital-ready Zimbabwe.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <p className="text-center" style={{ maxWidth: '800px', margin: '0 auto 4rem auto', fontSize: '1.1rem' }}>
                        Transforming a community takes a village. Whether you are an individual looking to volunteer your time, a professional ready to mentor, or an organization seeking impactful CSR opportunities, there is a place for you at Tshilidzi Development Trust. Your contribution directly fuels poverty reduction, climate action, and digital empowerment.
                    </p>

                    {/* 1. Volunteer Your Time */}
                    <div id="volunteer" style={{ marginBottom: '5rem', padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                        <div className="grid-cols-2">
                            <div>
                                <h2 style={{ color: 'var(--color-primary)' }}>1. Volunteer Your Time</h2>
                                <p className="mb-4" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Turn your compassion into action.</p>
                                <p className="mb-4">We are always looking for passionate individuals to support our on-the-ground projects.</p>
                                <Link href="#inquiry-form" className="btn btn-primary">Become a Volunteer</Link>
                            </div>
                            <div>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li className="mb-4">
                                        <strong>Digital Skills Trainers:</strong><br />
                                        Help us bridge the digital divide by teaching basic computer literacy or coding to local youth.
                                    </li>
                                    <li className="mb-4">
                                        <strong>Climate Champions:</strong><br />
                                        Get your hands dirty! Join our tree-planting drives and community resilience workshops.
                                    </li>
                                    <li>
                                        <strong>Community Support:</strong><br />
                                        Assist with logistics and planning during our outreach programs in rural areas.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 2. Become a Mentor */}
                    <div id="mentor" style={{ marginBottom: '5rem' }}>
                        <div className="grid-cols-2">
                            <div style={{ order: 2 }}>
                                <h2 style={{ color: 'var(--color-accent)' }}>2. Become a Mentor</h2>
                                <p className="mb-4" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Guide the next generation of leaders.</p>
                                <p className="mb-4">Our youth have the potential, but they need guidance. If you are a professional in Tech, Agriculture, or Business, your experience is invaluable.</p>
                                <Link href="#inquiry-form" className="btn btn-outline" style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>Apply to Mentor</Link>
                            </div>
                            <div style={{ order: 1, backgroundColor: '#f9f9f9', padding: '2rem', borderRadius: '8px' }}>
                                <h4 className="mb-4">What it involves:</h4>
                                <p>One-on-one virtual or in-person mentorship sessions to help young people navigate their career paths and entrepreneurial ventures.</p>
                            </div>
                        </div>
                    </div>

                    {/* 3. Partner With Us */}
                    <div id="partner" style={{ marginBottom: '5rem', padding: '2rem', backgroundColor: 'var(--color-secondary)', color: 'white', borderRadius: '12px' }}>
                        <div className="grid-cols-2">
                            <div>
                                <h2 style={{ color: 'white' }}>3. Partner With Us</h2>
                                <p className="mb-4" style={{ fontSize: '1.1rem', fontWeight: '500' }}>Let’s co-create sustainable impact.</p>
                                <p className="mb-4">We invite businesses, NGOs, and government bodies to partner with us on large-scale initiatives.</p>
                                <Link href="#inquiry-form" className="btn" style={{ backgroundColor: 'white', color: 'var(--color-secondary)' }}>Partner With Us</Link>
                            </div>
                            <div>
                                <div className="mb-4">
                                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>CSR Initiatives</h4>
                                    <p style={{ opacity: 0.9 }}>Sponsor a digital hub or a community garden to meet your Corporate Social Responsibility goals.</p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Technical Partnership</h4>
                                    <p style={{ opacity: 0.9 }}>Provide hardware (laptops/tablets) or agricultural tools to support our digital and climate programs.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Donate */}
                    <div id="donate" style={{ marginBottom: '5rem' }}>
                        <div className="text-center mb-5">
                            <h2 style={{ color: 'var(--color-primary)' }}>4. Donate</h2>
                            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Every contribution plants a seed for the future.</p>
                            <p>Your financial support helps us keep our programs running and free for the community.</p>
                        </div>

                        <div className="grid-cols-3" style={{ textAlign: 'center' }}>
                            <div style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>$20</div>
                                <p>Buys a seedling kit for a family garden.</p>
                            </div>
                            <div style={{ padding: '2rem', border: '2px solid var(--color-primary)', borderRadius: '8px', boxShadow: '0 8px 12px rgba(0,0,0,0.1)', transform: 'scale(1.05)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>$50</div>
                                <p>Provides internet data for a student's digital training.</p>
                            </div>
                            <div style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '1rem' }}>$100</div>
                                <p>Helps organize a community climate workshop.</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                            <h4>Bank Details / EcoCash</h4>
                            <p style={{ fontFamily: 'monospace', fontSize: '1.1rem' }}>[Insert Payment Details Here]</p>
                        </div>
                    </div>

                    {/* Inquiry Form */}
                    <div id="inquiry-form" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                        <h2 className="text-center mb-4">Ready to Get Involved?</h2>
                        <p className="text-center mb-4">Fill out the form below and let us know how you'd like to help.</p>

                        <form>
                            <div className="mb-4">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                                <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div className="mb-4">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                                <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div className="mb-4">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone (WhatsApp)</label>
                                <input type="tel" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} />
                            </div>
                            <div className="mb-4">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>I am interested in:</label>
                                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                    <label><input type="checkbox" style={{ marginRight: '0.5rem' }} /> Volunteering</label>
                                    <label><input type="checkbox" style={{ marginRight: '0.5rem' }} /> Mentorship</label>
                                    <label><input type="checkbox" style={{ marginRight: '0.5rem' }} /> Partnership</label>
                                    <label><input type="checkbox" style={{ marginRight: '0.5rem' }} /> Donating</label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                                <textarea rows={4} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Inquiry</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
