export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'NGO',
        name: 'Tshilidzi Development Trust',
        url: 'https://tshilidzi-a2712.web.app',
        logo: 'https://tshilidzi-a2712.web.app/branding.png',
        sameAs: [
            'https://facebook.com/tshilidzidevtrust',
            'https://twitter.com/tshilidzidevtrust',
            'https://instagram.com/tshilidzidevtrust',
        ],
        description: 'Empowering youth and women, reducing poverty, and building climate resilience in Zimbabwe.',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Beitbridge',
            addressCountry: 'Zimbabwe',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+263 71 099 7996',
            contactType: 'customer service',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
