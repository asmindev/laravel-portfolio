import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { Profile } from '../types';
import { fadeInUp, staggerContainer } from './shared';

interface AboutSectionProps {
    profile: Profile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
    if (!profile?.bio) return null;

    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="grid gap-12 lg:grid-cols-2 lg:gap-20"
                >
                    {/* Left Column: Image/Visual */}
                    <motion.div variants={fadeInUp} className="relative aspect-square max-h-[600px] w-full lg:order-last">
                        <div className="absolute inset-0 rotate-3 rounded-2xl border border-white/10 bg-neutral-900 transition-transform duration-500 hover:rotate-6" />
                        <div className="absolute inset-0 -rotate-3 rounded-2xl bg-neutral-800 transition-transform duration-500 hover:-rotate-6" />

                        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-900">
                            {profile.profile_image ? (
                                <img
                                    src={profile.profile_image}
                                    alt={profile.full_name || 'About Me'}
                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-neutral-800 to-neutral-900 text-neutral-700">
                                    <span className="text-6xl font-bold">Image</span>
                                </div>
                            )}
                        </div>

                        {/* Decorative Badge */}
                        <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-background/80 backdrop-blur-md lg:flex">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-primary">5+</span>
                                <span className="text-xs text-muted-foreground uppercase">
                                    Years of
                                    <br />
                                    Experience
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col justify-center">
                        <motion.span variants={fadeInUp} className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
                            About Me
                        </motion.span>

                        <motion.h2
                            variants={fadeInUp}
                            className="mb-8 font-heading text-4xl leading-tight font-bold text-foreground md:text-5xl lg:text-6xl"
                        >
                            {profile.tagline || 'Crafting digital experiences with passion & precision.'}
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                            <p className="whitespace-pre-line">{profile.bio}</p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
                            {profile.resume_url && (
                                <Button size="lg" className="rounded-full px-8" asChild>
                                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                                        Download CV
                                    </a>
                                </Button>
                            )}
                            {profile.location && (
                                <div className="flex items-center gap-3 rounded-full border border-border px-6 py-2 text-sm text-foreground">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                                    </span>
                                    Based in {profile.location}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
