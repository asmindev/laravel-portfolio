import { Profile } from '../types';
import { motion } from 'motion/react';

interface HeroProps {
    profile: Profile | null;
}

export function Hero({ profile }: HeroProps) {
    return (
        <section className="pt-32 sm:pt-44 pb-20 sm:pb-28">
            <div className="max-w-5xl mx-auto px-5">
                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.1] tracking-tight text-foreground max-w-4xl"
                >
                    Saya Asmin, software engineer di Kendari.
                    Fokus saya ada di implementasi Odoo ERP dan
                    pengembangan web fullstack.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-8 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed"
                >
                    Saat ini bekerja di Technoindo, menangani kustomisasi modul Odoo untuk klien
                    di sektor ritel dan distribusi. Di waktu lain, saya membangun proyek web
                    dan mobile secara mandiri dengan Laravel, React, dan Flutter.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-8 flex items-center gap-6 text-sm"
                >
                    <a
                        href={`mailto:${profile?.email || 'asminmin477@gmail.com'}`}
                        className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                    >
                        {profile?.email || 'asminmin477@gmail.com'}
                    </a>
                    <a
                        href={profile?.resume_url || '/resume/preview'}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Resume ↗
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
