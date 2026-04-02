import type { Metadata } from 'next';
import NewsContent from './NewsContent';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Stay informed with the latest news, stories, and updates from Tshilidzi Development Trust and our work with Zimbabwean youth.',
};

export default function NewsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'News & Updates', url: '/news' }]} />
      <NewsContent />
    </>
  );
}
