import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Tshilidzi Development Trust is a Zimbabwean NGO dedicated to youth empowerment, education access, and community development programs across Zimbabwe.',
};

export default function Home() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }]} />
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>
            Empowering Youth &<br />
            Transforming Communities
          </h1>
          <p className={styles.heroLead}>
            Tshilidzi Development Trust is dedicated to poverty reduction, climate resilience, and digital transformation in Zimbabwe.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/programs" className="btn btn-primary">
              Our Programs
            </Link>
            <Link href="/get-involved" className="btn btn-outline">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="section">
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Key Strategic Pillars</h2>
            <p>Our work is driven by four core areas of focus designed to create sustainable, long-term impact.</p>
          </div>

          <div className="grid-cols-4">
            {/* Pillar 1 */}
            <div className={styles.pillarCard}>
              <span className={styles.pillarIcon}>👩‍🎓</span>
              <h3 className={styles.pillarTitle}>Youth & Women Empowerment</h3>
              <p>Promoting leadership, gender equality, and economic inclusion for vulnerable groups.</p>
            </div>

            {/* Pillar 2 */}
            <div className={styles.pillarCard}>
              <span className={styles.pillarIcon}>🌱</span>
              <h3 className={styles.pillarTitle}>Climate Resilience</h3>
              <p>Building sustainable communities through environmental stewardship and climate action.</p>
            </div>

            {/* Pillar 3 */}
            <div className={styles.pillarCard}>
              <span className={styles.pillarIcon}>📚</span>
              <h3 className={styles.pillarTitle}>Education & Skills</h3>
              <p>Providing access to quality education and vocational training for the digital age.</p>
            </div>

            {/* Pillar 4 */}
            <div className={styles.pillarCard}>
              <span className={styles.pillarIcon}>💻</span>
              <h3 className={styles.pillarTitle}>Digital Transformation</h3>
              <p>Bridging the digital divide and fostering governance through technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Initiative Highlight (Placeholder) */}
      <section className="section section-bg">
        <div className="container">
          <div className="grid-cols-2">
            <div>
              <h2 className={styles.sectionTitle}>2025 Flagship: YCA4SOTRA</h2>
              <p style={{ marginBottom: '1.5rem' }}>
                The <strong>Youth Climate Action for Social Transformation</strong> project, funded by the EU, is our leading initiative for the coming year. We are mobilizing youth in Beitbridge to lead the charge against climate change.
              </p>
              <ul style={{ marginBottom: '2rem', listStyle: 'none', paddingLeft: 0 }}>
                <li style={{ marginBottom: '0.5rem' }}>✅ 5,000+ Youth Engaged</li>
                <li style={{ marginBottom: '0.5rem' }}>✅ 10 Community Hubs Established</li>
                <li style={{ marginBottom: '0.5rem' }}>✅ Policy Advocacy at National Level</li>
              </ul>
              <Link href="/projects/yca4sotra" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
            <div style={{
              backgroundColor: '#ddd',
              borderRadius: '8px',
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666'
            }}>
              {/* Image Placeholder */}
              [Image: Youth Action Field Work]
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className={`section ${styles.stats}`}>
        <div className="container">
          <div className="grid-cols-3">
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10k+</div>
              <div className={styles.statLabel}>Youth Reached</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Communities Engaged</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>8</div>
              <div className={styles.statLabel}>Global Partners</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`section ${styles.cta}`}>
        <div className="container">
          <div className={styles.ctaBox}>
            <h2 className={styles.ctaTitle}>Ready to Make an Impact?</h2>
            <p className={styles.ctaText}>Join us in building a more equitable and sustainable future for Zimbabwe.</p>
            <div className={styles.heroButtons}>
              <Link href="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
              <Link href="/donate" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                Support Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
