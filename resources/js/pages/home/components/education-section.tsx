import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'motion/react';
import { Education } from '../types';
import { fadeInUp, formatDate, staggerContainer } from './shared';

interface EducationSectionProps {
    educations: Education[];
}

export function EducationSection({ educations }: EducationSectionProps) {
    if (educations.length === 0) return null;

    return (
        <section className="py-12 lg:py-24">
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
                        <span className="mb-2 block font-mono text-sm tracking-widest text-primary uppercase">Academic Background</span>
                        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">Education.</h2>
                    </div>

                    {/* Timeline Line */}
                    <div className="absolute top-24 bottom-0 left-4 w-px bg-linear-to-b from-primary/50 via-border to-transparent md:left-[220px]" />

                    <div className="space-y-12">
                        {educations.map((edu) => (
                            <motion.div key={edu.id} variants={fadeInUp} className="relative flex flex-col gap-8 md:flex-row">
                                {/* Date Column */}
                                <div className="ml-12 flex flex-col pt-1 md:ml-0 md:w-[220px] md:items-end md:pr-12 md:text-right">
                                    <span className="font-mono text-sm font-medium text-primary">
                                        {formatDate(edu.start_date)} — {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                                    </span>
                                </div>

                                {/* Timeline Node */}
                                <div className="absolute top-0 left-0 flex items-center justify-center md:top-1 md:left-[220px] md:-translate-x-1/2">
                                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-lg ring-4 shadow-black/5 ring-card">
                                        <div className="h-2.5 w-2.5 rounded-full bg-secondary" /> {/* Different color for education node */}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="ml-12 flex-1 md:ml-0">
                                    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                                        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
                                            {edu.logo && (
                                                <Avatar className="h-12 w-12 rounded-lg border border-border">
                                                    <AvatarImage src={edu.logo} alt={edu.institution} />
                                                    <AvatarFallback className="rounded-lg bg-secondary text-secondary-foreground">
                                                        {edu.institution.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}

                                            <div className="flex-1 space-y-2">
                                                <div>
                                                    <h3 className="font-heading text-xl font-bold text-card-foreground">{edu.degree}</h3>
                                                    <div className="text-sm font-medium text-muted-foreground">
                                                        {edu.institution}
                                                        {edu.field_of_study && <span className="opacity-70"> · {edu.field_of_study}</span>}
                                                    </div>
                                                </div>

                                                {edu.gpa && (
                                                    <div className="inline-flex rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-primary">
                                                        GPA: {edu.gpa.toFixed(2)}
                                                    </div>
                                                )}

                                                {edu.description && (
                                                    <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
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
