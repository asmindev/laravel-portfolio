import { Separator } from '@/components/ui/separator';
import { Head } from '@inertiajs/react';
import {
    AboutSection,
    CertificatesSection,
    EducationSection,
    ExperienceSection,
    FloatingHeader,
    Footer,
    HeroSection,
    ProjectsSection,
    SkillsSection,
    TestimonialsSection,
} from './components';
import { HomePageProps } from './types';

export default function HomePage({
    user,
    profile,
    skills,
    experiences,
    educations,
    certificates,
    socialLinks,
    testimonials,
    projects,
}: HomePageProps) {
    return (
        <>
            <Head title={profile?.full_name || 'Portfolio'} />

            <div className="min-h-screen bg-background">
                <FloatingHeader />

                <section id="home">
                    <HeroSection user={user} profile={profile} socialLinks={socialLinks} />
                </section>

                <Separator />

                <section id="about">
                    <AboutSection profile={profile} />
                </section>
                {profile?.bio && <Separator />}

                <section id="skills">
                    <SkillsSection skills={skills} />
                </section>
                {skills.length > 0 && <Separator />}

                <section id="projects">
                    <ProjectsSection projects={projects} />
                </section>
                {projects.length > 0 && <Separator />}

                <section id="experience">
                    <ExperienceSection experiences={experiences} />
                </section>
                {experiences.length > 0 && <Separator />}

                <section id="education">
                    <EducationSection educations={educations} />
                </section>
                {educations.length > 0 && <Separator />}

                {certificates && certificates.length > 0 && (
                    <>
                        <section id="certificates">
                            <CertificatesSection certificates={certificates} />
                        </section>
                        <Separator />
                    </>
                )}

                <TestimonialsSection testimonials={testimonials} />

                <Footer fullName={profile?.full_name} profile={profile} socialLinks={socialLinks} />
            </div>
        </>
    );
}
