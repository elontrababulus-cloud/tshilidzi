import type { Metadata } from 'next';
import ContactContent from './ContactContent';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Tshilidzi Development Trust. Reach out to partner, volunteer, donate, or learn more about our work in Zimbabwe.',
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Contact Us', url: '/contact' }]} />
      <ContactContent />
    </>
  );
}
