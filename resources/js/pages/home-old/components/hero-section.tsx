import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Profile, SocialLink, User } from '../types';
import { ExternalLinkIcon, fadeInUp, staggerContainer } from './shared';

interface HeroSectionProps {
    user: User | null;
    profile: Profile | null;
    socialLinks: SocialLink[];
}

export function HeroSection({ profile, socialLinks }: HeroSectionProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden py-20 pt-32">
            {/* Animated Gradient Orbs */}
            <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] animate-blob rounded-full bg-primary/20 mix-blend-screen blur-[120px]" />
            <div className="animation-delay-2000 absolute bottom-[-20%] left-[-10%] h-[500px] w-[500px] animate-blob rounded-full bg-blue-500/20 mix-blend-screen blur-[120px]" />

            <div className="relative z-10 container mx-auto px-4">
                <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col gap-8">
                    {/* Role Tag */}
                    <motion.div variants={fadeInUp} className="flex items-center gap-4">
                        <div className="h-px w-12 bg-primary"></div>
                        <span className="font-mono text-sm tracking-widest text-primary uppercase">{profile?.title || 'Creative Developer'}</span>
                    </motion.div>

                    {/* Massive Typography */}
                    <div className="relative">
                        <motion.h1 variants={fadeInUp} className="font-heading text-[8vw] leading-[0.85] font-black tracking-tighter text-foreground">
                            CREATIVE
                            <br />
                            <span className="stroke-text text-outline transition-colors duration-500 hover:text-primary">DEVELOPER.</span>
                        </motion.h1>

                        {/* Floating visual element overlapping text */}
                        <motion.div
                            style={{ y, opacity }}
                            className="absolute top-1/2 right-0 hidden h-[40vh] w-[30vw] -translate-y-1/2 rotate-[-5deg] overflow-hidden border border-white/10 bg-neutral-900 transition-transform duration-700 hover:rotate-0 lg:block"
                        >
                            {profile?.profile_image ? (
                                <img
                                    src={profile.profile_image}
                                    alt="Profile"
                                    className="h-full w-full object-cover opacity-80 transition-opacity duration-700 hover:scale-110 hover:opacity-100"
                                />
                            ) : (
                                <div className="h-full w-full bg-linear-to-br from-neutral-800 to-neutral-900" />
                            )}
                        </motion.div>
                    </div>

                    {/* Description & CTA */}
                    <div className="mt-12 flex flex-col items-end justify-between gap-8 lg:flex-row">
                        <motion.p variants={fadeInUp} className="max-w-md text-xl leading-relaxed font-light text-muted-foreground">
                            {profile?.bio?.slice(0, 150) ||
                                'Startups and established brands love working with me. I create digital products that are outstanding.'}
                            ...
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex gap-4">
                            {socialLinks.map((link) => (
                                <Button
                                    key={link.id}
                                    variant="outline"
                                    className="group h-14 w-14 rounded-full border-border transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                    asChild
                                >
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLinkIcon />
                                    </a>
                                </Button>
                            ))}
                            {profile?.resume_url && (
                                <Button
                                    size="lg"
                                    className="h-14 rounded-full bg-foreground px-8 text-lg font-bold text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                                >
                                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                                        Let's Talk
                                    </a>
                                </Button>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Infinite Marquee text at bottom */}
            <div className="absolute bottom-8 left-0 w-full overflow-hidden border-y border-foreground/5 bg-background/50 py-4 backdrop-blur-sm">
                <div className="flex w-max animate-scroll items-center gap-8">
                    {[...Array(6)].map((_, i) => (
                        <span key={i} className="font-heading text-4xl font-bold text-foreground/10 uppercase">
                            DESIGN • DEVELOPMENT • MOTION • INTERACTION •
                        </span>
                    ))}
                </div>
            </div>

            <style>{`
                .stroke-text {
                    -webkit-text-stroke: 2px var(--primary);
                    color: transparent;
                }
            `}</style>
        </section>
    );
}
