import { Badge } from '@/components/ui/badge';
import { FloatingHeader } from '@/pages/home/components/floating-header';
import { Footer } from '@/pages/home/components/footer';
import { Head, Link } from '@inertiajs/react';
import { MotionValue, motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ArrowLeft, ArrowUpRight, Layers } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string | null;
}

interface Technology {
    id: number;
    name: string;
    slug: string;
    icon: string | null;
    category: string | null;
}

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    detailed_description: string | null;
    content: string | null;
    thumbnail: string | null;
    project_url: string | null;
    github_url: string | null;
    demo_url: string | null;
    is_featured: boolean;
    tags: Tag[];
    technologies: Technology[];
}

interface Props {
    projects: Project[];
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

    const offsetStep = Math.min(25, 150 / total);
    const topOffset = isMobile ? (20 + i * 15) : (100 + i * offsetStep);

    const formattedIndex = (i + 1).toString().padStart(2, '0');

    return (
        <div
            ref={containerRef}
            className="sticky flex h-screen items-start justify-center pt-4 md:pt-10"
            style={{ top: 0 }}
        >
            <motion.div
                style={{
                    scale,
                    top: topOffset,
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
                            <Button
                                size={isMobile ? "sm" : "lg"}
                                className="rounded-full bg-foreground text-background transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20"
                                asChild
                            >
                                <Link href={route('portfolio.show', project.slug)} className="flex items-center gap-2">
                                    Detail Proyek <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-40 md:h-full w-full shrink-0 overflow-hidden bg-muted border-t md:border-t-0 md:border-l border-border/50">
                        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        <Link href={route('portfolio.show', project.slug)} className="block h-full w-full">
                            {project.thumbnail ? (
                                <motion.div className="h-full w-full" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                                    <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
                                </motion.div>
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-secondary/30">
                                    <span className="text-4xl animate-pulse">✨</span>
                                </div>
                            )}
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function PortfolioIndex({ projects }: Props) {
    const totalTechs = new Set(projects.flatMap((p) => p.technologies.map((t) => t.name))).size;
    
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <>
            <Head title="Portofolio" />

            <div className="min-h-screen bg-background">
                <FloatingHeader />

                {/* Hero */}
                <section className="relative pt-32 pb-12">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/5 blur-[150px]" />
                        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-[120px]" />
                        <div className="absolute top-60 left-0 h-[300px] w-[300px] rounded-full bg-emerald-500/5 blur-[100px]" />
                    </div>

                    <div className="relative container mx-auto max-w-6xl px-4">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Kembali ke Beranda
                            </Link>

                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
                                    <span className="font-mono text-xs font-bold tracking-[0.3em] text-primary uppercase">
                                        Portofolio
                                    </span>
                                </motion.div>

                                <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                                    Karya Saya
                                </h1>
                                <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                                    Kumpulan proyek yang telah saya bangun — mulai dari implementasi ERP
                                    untuk klien industri hingga aplikasi web fullstack.
                                </p>
                            </div>

                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-wrap gap-8 border-t border-border/50 pt-6"
                            >
                                {[
                                    { label: 'Total Proyek', value: projects.length },
                                    { label: 'Unggulan', value: projects.filter((p) => p.is_featured).length },
                                    { label: 'Teknologi', value: totalTechs },
                                ].map((stat) => (
                                    <div key={stat.label} className="space-y-1">
                                        <div className="text-2xl font-bold text-foreground">
                                            {stat.value}
                                        </div>
                                        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Stacking Cards Section */}
                <section className="pb-24 pt-10">
                    <div ref={containerRef} className="container mx-auto px-4">
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

                        {projects.length === 0 && (
                            <div className="py-32 text-center">
                                <Layers className="mx-auto h-16 w-16 text-foreground/10" />
                                <p className="mt-4 text-muted-foreground">
                                    Belum ada proyek yang dipublikasikan.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
