export interface Project {
    id?: string;
    title: string;
    category: 'youth' | 'climate' | 'education' | 'governance';
    status: 'active' | 'upcoming' | 'completed';
    summary: string;
    description: string;
    imageUrl?: string;
    dateCreated: Date;
}
