"use client";

import { useSettings } from '@/context/SettingsContext';

export default function ContactContent() {
    const { address, phone, email } = useSettings();

    return (
        <>
            <section className="section section-bg">
                <div className="container text-center">
                    <h1>Contact Us</h1>
                    <p className="lead">We'd love to hear from you. Reach out with any questions or proposals.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid-cols-2">
                        <div>
                            <h2>Get in Touch</h2>
                            <p style={{ marginBottom: '2rem' }}>
                                Whether you want to volunteer, partner with us, or just learn more about our work, we are here to connect.
                            </p>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem' }}>📍 Visit Us</h4>
                                <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem' }}>📞 Call Us</h4>
                                <p>{phone}</p>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem' }}>✉️ Email Us</h4>
                                <p>{email}</p>
                            </div>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <form>
                                <div className="mb-4">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name</label>
                                    <input type="text" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Your Name" />
                                </div>
                                <div className="mb-4">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
                                    <input type="email" style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Your Email" />
                                </div>
                                <div className="mb-4">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subject</label>
                                    <select style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}>
                                        <option>General Inquiry</option>
                                        <option>Partnership</option>
                                        <option>Volunteering</option>
                                        <option>Donation</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Message</label>
                                    <textarea rows={5} style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="How can we help?"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
