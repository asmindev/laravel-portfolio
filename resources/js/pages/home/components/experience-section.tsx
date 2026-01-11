import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { Experience } from '../types';
import { fadeInUp, formatDate, MapPinIcon, staggerContainer } from './shared';

interface ExperienceSectionProps {
    experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
    if (experiences.length === 0) return null;

    return (
        <section className="py-24 lg:py-32">
            <div className="container mx-auto max-w-5xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="relative"
                >
                    {/* Section Header */}
                    <div className="mb-16 ml-12 md:ml-0">
                        <span className="mb-2 block font-mono text-sm tracking-widest text-primary uppercase">Career Path</span>
                        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Experience.</h2>
                    </div>

                    {/* Timeline Line */}
                    <div className="absolute top-24 bottom-0 left-4 w-px bg-linear-to-b from-primary/50 via-border to-transparent md:left-[220px]" />

                    <div className="space-y-12">
                        {experiences.map((exp) => (
                            <motion.div key={exp.id} variants={fadeInUp} className="relative flex flex-col gap-8 md:flex-row">
                                {/* Date Column (Desktop) / Mobile Header */}
                                <div className="ml-12 flex flex-col pt-1 md:ml-0 md:w-[220px] md:items-end md:pr-12 md:text-right">
                                    <span className="font-mono text-sm font-medium text-primary">
                                        {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}
                                    </span>
                                    <span className="text-xs text-muted-foreground">{exp.employment_type}</span>
                                </div>

                                {/* Timeline Node */}
                                <div className="absolute top-0 left-0 flex items-center justify-center md:top-1 md:left-[220px] md:-translate-x-1/2">
                                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-lg ring-4 shadow-black/5 ring-card">
                                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="ml-12 flex-1 md:ml-0">
                                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                                        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
                                            {exp.company_logo && (
                                                <Avatar className="h-12 w-12 rounded-lg border border-border">
                                                    <AvatarImage src={exp.company_logo} alt={exp.company_name} />
                                                    <AvatarFallback className="rounded-lg bg-secondary text-secondary-foreground">
                                                        {exp.company_name.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}

                                            <div className="flex-1 space-y-2">
                                                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                                                    <h3 className="font-heading text-xl font-bold text-card-foreground">{exp.position}</h3>
                                                    {exp.company_url ? (
                                                        <a
                                                            href={exp.company_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                                        >
                                                            {exp.company_name} ↗
                                                        </a>
                                                    ) : (
                                                        <span className="text-sm font-medium text-muted-foreground">{exp.company_name}</span>
                                                    )}
                                                </div>

                                                {exp.location && (
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <MapPinIcon />
                                                        {exp.location}
                                                    </div>
                                                )}

                                                {exp.description && (
                                                    <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
