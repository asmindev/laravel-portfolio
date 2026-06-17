import { motion } from 'motion/react';
import { Briefcase, Building2, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import { Experience } from '../types';
import { fadeInUp, formatDate, staggerContainer } from './shared';

const renderDescription = (desc: string) => {
    const lines = desc.split('\n').map(l => l.trim()).filter(Boolean);
    const introLines: string[] = [];
    const listItems: string[] = [];

    lines.forEach(line => {
        if (line.startsWith('•') || line.startsWith('-')) {
            listItems.push(line.replace(/^[•-]\s*/, ''));
        } else {
            introLines.push(line);
        }
    });

    return (
        <div className="pt-2 space-y-3 text-sm leading-relaxed text-muted-foreground/90 font-sans border-l-2 border-border/60 pl-3.5 transition-colors duration-300 group-hover/card:border-primary/40">
            {introLines.map((line, i) => (
                <p key={`intro-${i}`}>{line}</p>
            ))}
            {listItems.length > 0 && (
                <ul className="space-y-2.5 mt-2">
                    {listItems.map((item, i) => (
                        <li key={`item-${i}`} className="relative pl-5 text-muted-foreground/90">
                            {/* Premium customized dot indicator */}
                            <span className="absolute left-1.5 top-2.5 h-1.5 w-1.5 rounded-full bg-primary/70 transition-transform duration-300 group-hover/card:scale-125" />
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

interface ExperienceSectionProps {
    experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
    if (experiences.length === 0) return null;

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-1/4 left-1/3 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

            <div className="container mx-auto max-w-5xl px-4">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    className="relative"
                >
                    {/* Section Header */}
                    <div className="mb-20 text-center md:text-left md:ml-0">
                        <span className="mb-2 block font-mono text-sm tracking-widest text-primary uppercase">Career Path</span>
                        <h2 className="font-heading text-4xl font-bold text-foreground md:text-5xl">Experience</h2>
                        <div className="mt-4 h-1 w-12 rounded-full bg-primary mx-auto md:mx-0" />
                    </div>

                    {/* Timeline Line */}
                    <div className="absolute top-36 bottom-0 left-4 w-0.5 bg-linear-to-b from-primary/40 via-border/50 to-transparent md:left-[220px]" />

                    <div className="space-y-16">
                        {experiences.map((exp) => (
                            <motion.div 
                                key={exp.id} 
                                variants={fadeInUp} 
                                className="group/edu-item relative flex flex-col gap-6 md:flex-row md:gap-0"
                            >
                                {/* Date & Employment Type Column */}
                                <div className="ml-12 flex flex-col pt-1.5 md:ml-0 md:w-[220px] md:items-end md:pr-12 md:text-right">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-secondary/50 px-3.5 py-1 border border-border/60 font-mono text-xs font-semibold text-muted-foreground transition-all duration-300 group-hover/edu-item:border-primary/30 group-hover/edu-item:text-primary md:bg-transparent md:border-none md:p-0">
                                        <Calendar className="h-3.5 w-3.5 md:hidden" />
                                        <span>
                                            {formatDate(exp.start_date)} — {exp.is_current ? 'Present' : exp.end_date ? formatDate(exp.end_date) : 'N/A'}
                                        </span>
                                    </div>
                                    <span className="text-xs text-muted-foreground/75 mt-1 hidden md:block">
                                        {exp.employment_type}
                                    </span>
                                </div>

                                {/* Timeline Node */}
                                <div className="absolute top-0 left-0 flex items-center justify-center md:top-1.5 md:left-[220px] md:-translate-x-1/2">
                                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card shadow-md ring-4 ring-background transition-all duration-500 group-hover/edu-item:border-primary group-hover/edu-item:scale-115 shadow-black/5 z-20">
                                        {/* Outer glowing pulsing ring on hover */}
                                        <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 scale-75 transition-all duration-500 group-hover/edu-item:opacity-100 group-hover/edu-item:scale-130" />
                                        <Briefcase className="relative z-10 h-4.5 w-4.5 text-muted-foreground transition-colors duration-500 group-hover/edu-item:text-primary" />
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="ml-12 flex-1 md:ml-0 md:pl-12">
                                    <div className="group/card relative overflow-hidden rounded-2xl border border-border/80 bg-card/45 backdrop-blur-md p-6 shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-xl dark:bg-zinc-900/40">
                                        {/* Glow overlay */}
                                        <div className="absolute -inset-px bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 pointer-events-none" />
                                        
                                        {/* Watermark Briefcase in background */}
                                        <div className="absolute -right-6 -bottom-6 h-28 w-28 text-foreground/5 dark:text-white/5 opacity-5 transition-all duration-700 ease-out group-hover/card:scale-125 group-hover/card:rotate-12 group-hover/card:opacity-10 pointer-events-none">
                                            <Briefcase className="h-full w-full" strokeWidth={1} />
                                        </div>

                                        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start">
                                            {/* Company Logo / Fallback */}
                                            <div className="flex-shrink-0">
                                                {exp.company_logo ? (
                                                    <div className="h-12 w-12 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-xs transition-transform duration-500 group-hover/card:scale-105">
                                                        <img src={exp.company_logo} alt={exp.company_name} className="h-full w-full object-contain" />
                                                    </div>
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-primary/10 to-secondary/10 border border-primary/20 text-primary shadow-xs transition-transform duration-500 group-hover/card:scale-105">
                                                        <Building2 className="h-6 w-6" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start sm:gap-4">
                                                    <div>
                                                        <h3 className="font-heading text-lg font-bold text-foreground transition-colors duration-300 group-hover/card:text-primary sm:text-xl">
                                                            {exp.position}
                                                        </h3>
                                                        <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground mt-0.5">
                                                            {exp.company_url ? (
                                                                <a
                                                                    href={exp.company_url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-0.5 text-foreground/80 transition-colors hover:text-primary"
                                                                >
                                                                    <span>{exp.company_name}</span>
                                                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                                                </a>
                                                            ) : (
                                                                <span className="text-foreground/80">{exp.company_name}</span>
                                                            )}
                                                            <span className="text-muted-foreground/30">•</span>
                                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary/70 border border-border md:hidden inline-block">
                                                                {exp.employment_type}
                                                            </span>
                                                            {exp.location && (
                                                                <>
                                                                    <span className="text-muted-foreground/30 hidden md:inline">•</span>
                                                                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/75">
                                                                        <MapPin className="h-3 w-3" />
                                                                        {exp.location}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {exp.description && renderDescription(exp.description)}
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
