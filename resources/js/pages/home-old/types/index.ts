export interface Profile {
    id: number;
    user_id: number;
    full_name: string | null;
    title: string | null;
    tagline: string | null;
    bio: string | null;
    profile_image: string | null;
    resume_url: string | null;
    location: string | null;
    phone: string | null;
    email: string | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Skill {
    id: number;
    name: string;
    category: string | null;
    proficiency_level: number | null;
    icon: string | null;
    order: number;
}

export interface Experience {
    id: number;
    company_name: string;
    position: string;
    location: string | null;
    employment_type: string | null;
    start_date: string;
    end_date: string | null;
    is_current: boolean;
    description: string | null;
    company_logo: string | null;
    company_url: string | null;
}

export interface Education {
    id: number;
    institution: string;
    degree: string;
    field_of_study: string | null;
    start_date: string;
    end_date: string | null;
    gpa: number | null;
    description: string | null;
    logo: string | null;
}

export interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    image_url: string | null;
}

export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string | null;
    order: number;
}

export interface Testimonial {
    id: number;
    client_name: string;
    client_position: string | null;
    client_company: string | null;
    client_image: string | null;
    content: string;
    rating: number;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string | null;
}

export interface Technology {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    category: string | null;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    content: string | null;
    thumbnail: string | null;
    project_url: string | null;
    github_url: string | null;
    demo_url: string | null;
    is_featured: boolean;
    tags: Tag[];
    technologies: Technology[];
}

export interface HomePageProps {
    user: User | null;
    profile: Profile | null;
    skills: Skill[];
    experiences: Experience[];
    educations: Education[];
    certificates: Certificate[];
    socialLinks: SocialLink[];
    testimonials: Testimonial[];
    projects: Project[];
}
