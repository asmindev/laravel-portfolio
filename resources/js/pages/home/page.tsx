import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';
import {
    AboutSection,
    CertificatesSection,
    EducationSection,
    ExperienceSection,
    Footer,
    HeroSection,
    SkillsSection,
    TestimonialsSection,
} from './components';
import { HomePageProps } from './types';

export default function HomePage({ user, profile, skills, experiences, educations, certificates, socialLinks, testimonials }: HomePageProps) {
    return (
        <>
            <Head title={profile?.full_name || 'Portfolio'} />

            <div className="min-h-screen bg-background">
                <HeroSection user={user} profile={profile} socialLinks={socialLinks} />

                <Separator />

                <AboutSection profile={profile} />
                {profile?.bio && <Separator />}

                <SkillsSection skills={skills} />
                {skills.length > 0 && <Separator />}

                <ExperienceSection experiences={experiences} />
                {experiences.length > 0 && <Separator />}

                <EducationSection educations={educations} />
                {educations.length > 0 && <Separator />}

                <CertificatesSection certificates={certificates} />
                {certificates.length > 0 && <Separator />}

                <TestimonialsSection testimonials={testimonials} />

                <Footer fullName={profile?.full_name} />
            </div>
        </>
    );
}
