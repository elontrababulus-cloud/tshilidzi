"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SiteSettings {
    address: string;
    phone: string;
    email: string;
    facebookUrl: string;
    instagramUrl: string;
    twitterUrl: string;
}

const defaultSettings: SiteSettings = {
    address: 'Suit 6, The Tripple K Building 528, Great North Road',
    phone: '+263 71 099 7996',
    email: 'info@tshilidzi.org',
    facebookUrl: 'https://www.facebook.com/TshilidziDevelopmentTrust',
    instagramUrl: 'https://www.instagram.com/tshilidzi_development_trust',
    twitterUrl: 'https://x.com/TrustTshilidzi',
};

const SettingsContext = createContext<SiteSettings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

    useEffect(() => {
        // Subscribe to real-time updates
        const docRef = doc(db, 'settings', 'general');
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setSettings({ ...defaultSettings, ...docSnap.data() } as SiteSettings);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
};
