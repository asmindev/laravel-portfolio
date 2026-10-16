import { Project } from '../types';
import { Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectsProps {
    projects: Project[];
}

export function Projects({ projects = [] }: ProjectsProps) {
    if (!projects || projects.length === 0) return null;

    // First 4 featured flagship projects
    const flagship = projects[0];
    const secondaryPair = projects.slice(1, 3);
    const fourthProject = projects[3];
    // Remaining projects for the interactive editorial index table
    const tableProjects = projects.slice(4, 9);

    return (
        <section id="projects" className="py-24 sm:py-32 md:py-40 border-t border-border">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-12 sm:pb-16 border-b border-border gap-6">
                    <div>
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                            Portfolio
                        </span>
                        <h2 className="font-serif text-3xl sm:text-5xl text-foreground">
                            Proyek pilihan
                        </h2>
                    </div>

                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <span>Lihat semua ({projects.length})</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                </div>

                {/* 1. Flagship Hero Project (Monumental Asymmetric Layout) */}
                {flagship && (
                    <motion.article
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="py-16 sm:py-24 border-b border-border group"
                    >
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-6">
                            <span className="text-gold dark:text-gold-light font-medium">01 / Unggulan</span>
                            <span>{flagship.technologies?.map((t) => t.name).slice(0, 4).join(' · ')}</span>
                        </div>

                        {/* Large Serif Title */}
                        <Link href={`/portfolio/${flagship.slug}`} className="block mb-6 sm:mb-8">
                            <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground group-hover:text-olive dark:group-hover:text-olive-light transition-colors leading-[1.08]">
                                {flagship.title}
                            </h3>
                        </Link>

                        {/* Large Cinematic Frame */}
                        <Link
                            href={`/portfolio/${flagship.slug}`}
                            className="block relative overflow-hidden rounded-sm bg-muted border border-border/70 aspect-[16/9] md:aspect-[21/9]"
                        >
                            {flagship.thumbnail ? (
                                <img
                                    src={flagship.thumbnail}
                                    alt={flagship.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                    <span className="font-serif text-2xl text-muted-foreground/40">
                                        {flagship.title}
                                    </span>
                                </div>
                            )}

                            {/* Floating hover indicator */}
                            <div className="absolute bottom-5 right-5 hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-xs font-mono tracking-wider border border-border/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span>Lihat detail</span>
                                <ArrowUpRight className="w-3.5 h-3.5 text-olive dark:text-olive-light" />
                            </div>
                        </Link>

                        {/* Bottom Detail Strip */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                            <div className="md:col-span-8">
                                <p className="font-sans text-base text-muted-foreground font-light leading-relaxed max-w-2xl">
                                    {flagship.description}
                                </p>
                            </div>
                            <div className="md:col-span-4 flex md:justify-end items-center gap-5 text-xs font-mono uppercase tracking-wider">
                                <Link
                                    href={`/portfolio/${flagship.slug}`}
                                    className="text-foreground hover:text-olive dark:hover:text-olive-light underline underline-offset-4 decoration-border hover:decoration-olive transition-colors"
                                >
                                    Detail ↗
                                </Link>
                                {flagship.demo_url && (
                                    <a
                                        href={flagship.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Demo ↗
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.article>
                )}

                {/* 2. Asymmetric Staggered Duo (Projects 02 & 03) */}
                {secondaryPair.length > 0 && (
                    <div className="py-16 sm:py-24 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                        {secondaryPair.map((project, idx) => {
                            const indexStr = (idx + 2).toString().padStart(2, '0');
                            const isFirst = idx === 0;

                            return (
                                <motion.article
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                                    className={`group flex flex-col justify-between ${
                                        isFirst ? 'lg:col-span-7' : 'lg:col-span-5 lg:mt-16'
                                    }`}
                                >
                                    {/* Frame */}
                                    <Link
                                        href={`/portfolio/${project.slug}`}
                                        className={`block relative overflow-hidden rounded-sm bg-muted border border-border/70 ${
                                            isFirst ? 'aspect-[16/10]' : 'aspect-[4/3]'
                                        }`}
                                    >
                                        {project.thumbnail ? (
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                                <span className="font-serif text-xl text-muted-foreground/40">
                                                    {project.title}
                                                </span>
                                            </div>
                                        )}
                                    </Link>

                                    {/* Info */}
                                    <div className="mt-6">
                                        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
                                            <span className="text-gold dark:text-gold-light">{indexStr}</span>
                                            <span>{project.technologies?.map((t) => t.name).slice(0, 3).join(' · ')}</span>
                                        </div>

                                        <Link href={`/portfolio/${project.slug}`}>
                                            <h3 className="font-serif text-2xl sm:text-3xl text-foreground group-hover:text-olive dark:group-hover:text-olive-light transition-colors leading-snug">
                                                {project.title}
                                            </h3>
                                        </Link>

                                        <p className="mt-2.5 font-sans text-sm text-muted-foreground font-light leading-relaxed">
                                            {project.description}
                                        </p>

                                        <div className="mt-4 pt-3 border-t border-border/30 flex items-center gap-4 text-xs font-mono uppercase tracking-wider">
                                            <Link
                                                href={`/portfolio/${project.slug}`}
                                                className="text-foreground hover:text-olive dark:hover:text-olive-light transition-colors"
                                            >
                                                Detail ↗
                                            </Link>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                )}

                {/* 3. Fourth Project (Balanced Full-width Feature) */}
                {fourthProject && (
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5 }}
                        className="py-16 sm:py-24 border-b border-border group"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                            <div className="lg:col-span-5 order-2 lg:order-1">
                                <span className="text-xs font-mono text-gold dark:text-gold-light block mb-2">
                                    04 / ERP
                                </span>
                                <Link href={`/portfolio/${fourthProject.slug}`}>
                                    <h3 className="font-serif text-3xl sm:text-4xl text-foreground group-hover:text-olive dark:group-hover:text-olive-light transition-colors leading-snug">
                                        {fourthProject.title}
                                    </h3>
                                </Link>
                                <p className="mt-3 font-sans text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                                    {fourthProject.description}
                                </p>
                                <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-muted-foreground">
                                    {fourthProject.technologies?.map((tech) => (
                                        <span
                                            key={tech.id}
                                            className="px-2.5 py-1 rounded-sm border border-border/60 bg-secondary/20"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6">
                                    <Link
                                        href={`/portfolio/${fourthProject.slug}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-foreground hover:text-olive dark:hover:text-olive-light transition-colors"
                                    >
                                        <span>Lihat detail</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>

                            <div className="lg:col-span-7 order-1 lg:order-2">
                                <Link
                                    href={`/portfolio/${fourthProject.slug}`}
                                    className="block overflow-hidden rounded-sm bg-muted border border-border/70 aspect-[16/10]"
                                >
                                    {fourthProject.thumbnail ? (
                                        <img
                                            src={fourthProject.thumbnail}
                                            alt={fourthProject.title}
                                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                            <span className="font-serif text-xl text-muted-foreground/40">
                                                {fourthProject.title}
                                            </span>
                                        </div>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </motion.article>
                )}

                {/* 4. Interactive Editorial Index Table for Additional Implementations */}
                {tableProjects.length > 0 && (
                    <div className="py-16 sm:py-20 border-b border-border">
                        <div className="flex items-baseline justify-between mb-8">
                            <div>
                                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                                    Lainnya
                                </span>
                                <h3 className="font-serif text-2xl sm:text-3xl text-foreground">
                                    Proyek lainnya
                                </h3>
                            </div>
                            <span className="hidden sm:inline-block text-xs font-mono text-muted-foreground">
                                Klik buat lihat detail
                            </span>
                        </div>

                        <div className="divide-y divide-border/40">
                            {tableProjects.map((p, idx) => {
                                const indexStr = (idx + 5).toString().padStart(2, '0');
                                const stackString = p.technologies?.map((t) => t.name).slice(0, 3).join(', ');

                                return (
                                    <Link
                                        key={p.id}
                                        href={`/portfolio/${p.slug}`}
                                        className="group py-5 grid grid-cols-12 gap-4 items-baseline hover:bg-secondary/25 transition-colors -mx-4 px-4 rounded-sm"
                                    >
                                        <span className="col-span-1 text-xs font-mono text-gold dark:text-gold-light">
                                            {indexStr}
                                        </span>
                                        <span className="col-span-7 sm:col-span-5 font-serif text-lg sm:text-xl text-foreground group-hover:text-olive dark:group-hover:text-olive-light transition-colors truncate">
                                            {p.title}
                                        </span>
                                        <span className="hidden sm:inline-block col-span-3 text-xs font-sans text-muted-foreground truncate">
                                            {p.description}
                                        </span>
                                        <span className="hidden md:inline-block col-span-2 text-xs font-mono text-muted-foreground truncate">
                                            {stackString}
                                        </span>
                                        <span className="col-span-4 sm:col-span-1 text-right text-xs font-mono text-muted-foreground group-hover:text-foreground">
                                            <ArrowUpRight className="w-3.5 h-3.5 inline group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Bottom Full Archive Link */}
                <div className="mt-12 sm:mt-16 text-center">
                    <Link
                        href="/portfolio"
                        className="group inline-flex items-center gap-2 font-serif text-xl sm:text-2xl text-foreground hover:text-olive dark:hover:text-olive-light transition-colors"
                    >
                        <span>Lihat semua proyek ({projects.length})</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export const ProjectsSection = Projects;
