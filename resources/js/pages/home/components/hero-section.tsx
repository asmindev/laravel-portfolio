import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Profile, SocialLink, User } from '../types';
import { ExternalLinkIcon, fadeInUp, MailIcon, MapPinIcon, scaleIn, staggerContainer } from './shared';

interface HeroSectionProps {
    user: User | null;
    profile: Profile | null;
    socialLinks: SocialLink[];
}

export function HeroSection({ user, profile, socialLinks }: HeroSectionProps) {
    return (
        <section className="relative py-20 lg:py-32">
            {/* Grid Pattern for Hero */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)`,
                    backgroundSize: '48px 48px',
                }}
            />
            <div className="container mx-auto max-w-5xl px-4">
                <div className="flex flex-col items-center gap-12 lg:flex-row">
                    {/* Avatar */}
                    <motion.div className="relative" initial="hidden" animate="visible" variants={scaleIn} transition={{ duration: 0.6 }}>
                        <div className="absolute inset-0 scale-150 rounded-full bg-primary/10 blur-3xl" />
                        <Avatar className="relative h-48 w-48 border-4 border-background shadow-xl lg:h-64 lg:w-64">
                            <AvatarImage src={profile?.profile_image || ''} alt={profile?.full_name || ''} />
                            <AvatarFallback className="bg-primary text-4xl text-primary-foreground lg:text-5xl">
                                {profile?.full_name?.charAt(0) || 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </motion.div>

                    {/* Info */}
                    <motion.div className="flex-1 text-center lg:text-left" initial="hidden" animate="visible" variants={staggerContainer}>
                        <motion.h1
                            className="mb-3 text-4xl font-bold tracking-tight text-foreground lg:text-5xl"
                            variants={fadeInUp}
                            transition={{ duration: 0.5 }}
                        >
                            {profile?.full_name || 'Your Name'}
                        </motion.h1>
                        <motion.p
                            className="mb-4 text-xl font-medium text-primary lg:text-2xl"
                            variants={fadeInUp}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {profile?.title || 'Your Title'}
                        </motion.p>
                        {profile?.tagline && (
                            <motion.p
                                className="mb-6 max-w-xl text-lg text-muted-foreground"
                                variants={fadeInUp}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {profile.tagline}
                            </motion.p>
                        )}

                        <div className="mb-6 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start">
                            {profile?.location && (
                                <span className="flex items-center gap-1.5">
                                    <MapPinIcon />
                                    {profile.location}
                                </span>
                            )}
                            {user?.email && (
                                <span className="flex items-center gap-1.5">
                                    <MailIcon />
                                    {user.email}
                                </span>
                            )}
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                            {socialLinks.map((link) => (
                                <Button key={link.id} variant="outline" size="sm" asChild>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.platform}
                                        <ExternalLinkIcon />
                                    </a>
                                </Button>
                            ))}
                            {profile?.resume_url && (
                                <Button size="sm" asChild>
                                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                                        Download CV
                                    </a>
                                </Button>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
