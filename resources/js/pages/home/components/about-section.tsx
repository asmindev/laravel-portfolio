import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { Profile } from '../types';
import { fadeIn, fadeInUp, viewAnimationProps } from './shared';

interface AboutSectionProps {
    profile: Profile | null;
}

export function AboutSection({ profile }: AboutSectionProps) {
    if (!profile?.bio) return null;

    return (
        <motion.section className="py-16 lg:py-24" {...viewAnimationProps} variants={fadeIn} transition={{ duration: 0.5 }}>
            <div className="container mx-auto max-w-5xl px-4">
                <motion.h2 className="mb-6 text-2xl font-semibold text-foreground" variants={fadeInUp}>
                    About Me
                </motion.h2>
                <Card className="border-border/40 bg-background/70 shadow-[0_2px_8px_rgba(0,0,0,0.04)] backdrop-blur-sm">
                    <CardContent className="p-6 lg:p-8">
                        <p className="leading-relaxed whitespace-pre-line text-muted-foreground">{profile.bio}</p>
                    </CardContent>
                </Card>
            </div>
        </motion.section>
    );
}
