interface OrganizationSchemaProps {
  description?: string;
}

export function OrganizationSchema({ description }: OrganizationSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Tshilidzi Development Trust',
    url: 'https://tshilidzi.org',
    logo: 'https://tshilidzi.org/logo.png',
    description: description || 'Tshilidzi Development Trust empowers Zimbabwean youth through education, skills development, and community programs. Building futures across Zimbabwe.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZW',
    },
    sameAs: [],
    areaServed: 'Zimbabwe',
    knowsAbout: ['youth empowerment', 'education', 'community development', 'skills training', 'Zimbabwe NGO'],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteSchema() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tshilidzi Development Trust',
    url: 'https://tshilidzi.org',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tshilidzi.org/news?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
  authorName?: string;
}

export function ArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  imageUrl,
  authorName,
}: ArticleSchemaProps) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    datePublished: datePublished,
    author: {
      '@type': authorName ? 'Person' : 'Organization',
      name: authorName || 'Tshilidzi Development Trust',
    },
    publisher: {
      '@type': 'NGO',
      name: 'Tshilidzi Development Trust',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tshilidzi.org/logo.png',
      },
    },
  };

  if (dateModified) {
    jsonLd.dateModified = dateModified;
  }

  if (imageUrl) {
    jsonLd.image = imageUrl;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://tshilidzi.org${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Legacy default export for backward compatibility
export default function JsonLd() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
    </>
  );
}
