import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tshilidzi.org';

  // Static routes with specific priorities and changeFrequency
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/get-involved`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic routes from Firestore - only if credentials available
  let dynamicRoutes: MetadataRoute.Sitemap = [];
  
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const { getAdminFirestore } = await import('@/lib/firebase-admin');
      const db = getAdminFirestore();

      // Fetch published news articles from Firestore
      try {
        const newsSnapshot = await db
          .collection('news')
          .where('status', '==', 'published')
          .get();

        const articleRoutes = newsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const updatedAt = data.updatedAt?.toDate?.() || data.publishedAt?.toDate?.() || new Date();
          return {
            url: `${baseUrl}/news/${doc.id}`,
            lastModified: updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          };
        });
        dynamicRoutes.push(...articleRoutes);
      } catch (error) {
        console.error('Error fetching news for sitemap:', error);
      }

      // Fetch projects from Firestore
      try {
        const projectsSnapshot = await db.collection('projects').get();

        const projectRoutes = projectsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const updatedAt = data.updatedAt?.toDate?.() || data.dateCreated?.toDate?.() || new Date();
          return {
            url: `${baseUrl}/projects/${doc.id}`,
            lastModified: updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          };
        });
        dynamicRoutes.push(...projectRoutes);
      } catch (error) {
        console.error('Error fetching projects for sitemap:', error);
      }
    } catch (error) {
      console.error('Firebase Admin not initialized:', error);
    }
  } else {
    console.warn('FIREBASE_SERVICE_ACCOUNT_KEY not set - sitemap will only include static routes');
  }

  return [...staticRoutes, ...dynamicRoutes];
}
