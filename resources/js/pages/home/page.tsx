import { Head } from '@inertiajs/react';
import { Header } from './components/header';
import { Hero } from './components/hero';
import { Projects } from './components/projects';
import { About } from './components/about';
import { Experience } from './components/experience';
import { Contact } from './components/contact';
import { HomePageProps } from './types';

export default function HomePage({
    user,
    profile,
    skills = [],
    experiences = [],
    socialLinks = [],
    projects = [],
}: HomePageProps) {
    return (
        <>
            <Head title={profile?.full_name ? `${profile.full_name} — Portfolio` : 'Portfolio'} />

            <div className="min-h-screen bg-background text-foreground">
                <Header />
                <Hero profile={profile} />
                <Projects projects={projects} />
                <About profile={profile} skills={skills} />
                <Experience experiences={experiences} />
                <Contact profile={profile} socialLinks={socialLinks} />
            </div>
        </>
    );
}
