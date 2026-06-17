import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MotionValue, motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Project } from '../types';
import { ExternalLinkIcon } from './shared';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProjectsSectionProps {
    projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    if (!projects.length) return null;

    return (
        <section id="projects" className="bg-background py-20">
            <div ref={containerRef} className="container mx-auto px-4">
                <div className="mb-20 space-y-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                    >
                        Karya Pilihan
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mx-auto max-w-2xl text-lg text-muted-foreground"
                    >
                        Kumpulan aplikasi dan sistem yang telah saya bangun.
                    </motion.p>
                </div>

                <div className="flex flex-col items-center gap-10 sm:gap-20">
                    {projects.map((project, i) => {
                        const step = 1 / projects.length;
                        const targetScale = 1 - (projects.length - 1 - i) * 0.02;
                        return (
                            <ProjectCard
                                key={project.id}
                                i={i}
                                project={project}
                                progress={scrollYProgress}
                                range={[i * step, 1]}
                                targetScale={targetScale}
                                total={projects.length}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

interface ProjectCardProps {
    i: number;
    project: Project;
    progress: MotionValue<number>;
    range: [number, number];
    targetScale: number;
    total: number;
}

function ProjectCard({ i, project, progress, range, targetScale, total }: ProjectCardProps) {
    const isMobile = useIsMobile();
    const containerRef = useRef(null);

    const scale = useTransform(progress, range, [1, targetScale]);

    // Calculate a dynamic top offset to create the stacking effect
    // As we scroll down, cards stick to the top.
    // On mobile, start higher (20px) and use smaller spacing to fit screen height
    const offsetStep = Math.min(25, 150 / total);
    const topOffset = isMobile ? (20 + i * 15) : (100 + i * offsetStep);

    const formattedIndex = (i + 1).toString().padStart(2, '0');

    return (
        <div
            ref={containerRef}
            className="sticky flex h-screen items-start justify-center pt-4 md:pt-10"
            style={{ top: 0 }} // The container is full height and sticky top 0, but content inside handles the visual placement
        >
            <motion.div
                style={{
                    scale,
                    top: topOffset, // This doesn't strictly work with flex center unless position is absolute or relative.
                    // Now with items-start, relative top pushes it down from the top.
                }}
                className="relative h-[68vh] md:h-[70vh] w-full max-w-5xl origin-top overflow-hidden rounded-3xl md:rounded-4xl border border-border/50 bg-card/75 backdrop-blur-md shadow-xl transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 dark:bg-card/40"
            >
                <div className="flex flex-col md:grid md:grid-cols-2 h-full">
                    {/* Content Section */}
                    <div className="relative flex flex-col justify-between p-5 md:p-12 flex-1 min-h-0 overflow-y-auto md:overflow-visible">
                        {/* Large Index Number background */}
                        <div className="absolute top-4 right-6 font-mono text-5xl md:text-8xl font-bold tracking-tighter text-foreground/5 select-none">
                            {formattedIndex}
                        </div>

                        <div className="space-y-4 md:space-y-6 relative z-10">
                            <div className="space-y-2">
                                <h3 className="font-heading text-xl md:text-4xl font-bold text-card-foreground pr-12 leading-tight">
                                    {project.title}
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.slice(0, 3).map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            variant="secondary"
                                            className="bg-primary/5 text-primary border border-primary/10 text-[9px] md:text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-md hover:bg-primary/10 transition-colors"
                                        >
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <p className="text-sm md:text-lg leading-relaxed text-muted-foreground font-normal line-clamp-3 md:line-clamp-none">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-1.5 pt-1">
                                {project.technologies.slice(0, 4).map((tech) => (
                                    <span 
                                        key={tech.id} 
                                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] md:text-xs font-semibold bg-secondary/85 text-secondary-foreground border border-border/30 hover:bg-secondary transition-colors"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-primary" />
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 md:mt-8 relative z-10">
                            {project.project_url ? (
                                <Button
                                    size={isMobile ? "sm" : "lg"}
                                    className="rounded-full bg-foreground text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                                    asChild
                                >
                                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        Lihat Proyek <ExternalLinkIcon />
                                    </a>
                                </Button>
                            ) : project.github_url ? (
                                <Button size={isMobile ? "sm" : "lg"} variant="outline" className="rounded-full hover:bg-secondary" asChild>
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                        Lihat Kode <ExternalLinkIcon />
                                    </a>
                                </Button>
                            ) : null}
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-40 md:h-full w-full shrink-0 overflow-hidden bg-muted border-t md:border-t-0 md:border-l border-border/50">
                        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        {project.thumbnail ? (
                            <motion.div className="h-full w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
                            </motion.div>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-secondary/30">
                                <span className="text-4xl animate-pulse">✨</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
