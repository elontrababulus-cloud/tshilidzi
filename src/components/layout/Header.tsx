"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <div className={styles.logo}>
                    <Link href="/" style={{ display: 'block' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/branding.png"
                            alt="Tshilidzi Development Trust Logo"
                            style={{ height: '60px', width: 'auto', objectFit: 'contain' }}
                        />
                    </Link>
                </div>

                <button
                    className={styles.mobileToggle}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                >
                    <span className={styles.hamburger}></span>
                </button>

                <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
                    <ul className={styles.navList}>
                        <li><Link href="/" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Home</Link></li>
                        <li><Link href="/about" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
                        <li><Link href="/programs" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Our Work</Link></li>
                        <li><Link href="/projects" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Projects</Link></li>
                        <li><Link href="/news" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>News</Link></li>
                        <li><Link href="/contact" className={styles.navLink} onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                        <li>
                            <Link href="/get-involved" className={`btn btn-secondary ${styles.ctaBtn}`} onClick={() => setIsMenuOpen(false)}>
                                Get Involved
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
