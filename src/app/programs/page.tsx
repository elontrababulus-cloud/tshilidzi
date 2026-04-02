import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata = {
    title: 'Our Programs',
    description: 'Explore Tshilidzi Development Trust\'s youth empowerment and education programs in Zimbabwe — from skills training to mentorship and community outreach.',
};

export default function ProgramsPage() {
    return (
        <>
            <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Our Programs', url: '/programs' }]} />
            <section className="section section-bg">
                <div className="container text-center">
                    <h1>Our Work / Programs</h1>
                    <p className="lead">We focus on four key pillars to drive holistic community development.</p>
                </div>
            </section>

            {/* Program 1 */}
            <section className="section">
                <div className="container">
                    <div className="grid-cols-2">
                        <div style={{ order: 2 }}>
                            <h2 style={{ color: 'var(--color-primary)' }}>Youth & Women Empowerment</h2>
                            <p>
                                We provide platforms for youth and women to voice their needs, access resources, and participate in decision-making processes. Our empowerment programs focus on:
                            </p>
                            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Leadership training and mentorship</li>
                                <li>Entrepreneurship support</li>
                                <li>Gender-based violence (GBV) awareness and prevention</li>
                            </ul>
                        </div>
                        <div style={{ order: 1, backgroundColor: '#eee', borderRadius: '8px', minHeight: '250px' }}>
                            {/* Image Placeholder */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Program 2 */}
            <section className="section section-bg">
                <div className="container">
                    <div className="grid-cols-2">
                        <div>
                            <h2 style={{ color: 'var(--color-primary)' }}>Climate Resilience</h2>
                            <p>
                                Climate change disproportionately affects vulnerable communities. We work to build resilience through:
                            </p>
                            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Community-led adaptation strategies</li>
                                <li>Sustainable agriculture practices</li>
                                <li>Renewable energy promotion</li>
                                <li>Youth Climate Action initiatives</li>
                            </ul>
                        </div>
                        <div style={{ backgroundColor: '#ddd', borderRadius: '8px', minHeight: '250px' }}>
                            {/* Image Placeholder */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Program 3 */}
            <section className="section">
                <div className="container">
                    <div className="grid-cols-2">
                        <div style={{ order: 2 }}>
                            <h2 style={{ color: 'var(--color-primary)' }}>Education & Skills Development</h2>
                            <p>
                                Education is the key to unlocking potential. We support:
                            </p>
                            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Vocational training programs</li>
                                <li>Digital literacy workshops</li>
                                <li>School support and resource provision</li>
                            </ul>
                        </div>
                        <div style={{ order: 1, backgroundColor: '#eee', borderRadius: '8px', minHeight: '250px' }}>
                            {/* Image Placeholder */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Program 4 */}
            <section className="section section-bg">
                <div className="container">
                    <div className="grid-cols-2">
                        <div>
                            <h2 style={{ color: 'var(--color-primary)' }}>Governance & Digital Transformation</h2>
                            <p>
                                Leveraging technology to improve governance and service delivery.
                            </p>
                            <ul style={{ marginLeft: '1.5rem', marginTop: '1rem' }}>
                                <li>Civic tech initiatives</li>
                                <li>Open data advocacy</li>
                                <li>Digital rights education</li>
                            </ul>
                        </div>
                        <div style={{ backgroundColor: '#ddd', borderRadius: '8px', minHeight: '250px' }}>
                            {/* Image Placeholder */}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
