import type { Metadata } from 'next';
import ProjectsContent from './ProjectsContent';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse active and completed development projects by Tshilidzi Development Trust in Zimbabwe, focused on youth, education, and community upliftment.',
};

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', url: '/' }, { name: 'Projects', url: '/projects' }]} />
      <ProjectsContent />
    </>
  );
}
