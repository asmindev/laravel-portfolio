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

export interface User {
    id: number;
    name: string;
    email: string;
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
}
