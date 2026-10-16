import { FloatingHeader } from '@/pages/home/components/floating-header';
import { Footer } from '@/pages/home/components/footer';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from 'lucide-react';

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

type FilterCategory = 'all' | 'erp' | 'web';

export default function PortfolioIndex({ projects = [] }: Props) {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

    // Categorize projects based on technologies / keywords
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'all') return projects;
        if (activeFilter === 'erp') {
            return projects.filter((p) => {
                const names = (p.technologies || []).map((t) => t.name.toLowerCase());
                const title = (p.title || '').toLowerCase();
                const desc = (p.description || '').toLowerCase();
                return (
                    names.includes('odoo') ||
                    names.includes('python') ||
                    title.includes('erp') ||
                    desc.includes('erp') ||
                    desc.includes('odoo')
                );
            });
        }
        if (activeFilter === 'web') {
            return projects.filter((p) => {
                const names = (p.technologies || []).map((t) => t.name.toLowerCase());
                return (
                    names.includes('laravel') ||
                    names.includes('react') ||
                    names.includes('flutter') ||
                    names.includes('inertia.js')
                );
            });
        }
        return projects;
    }, [projects, activeFilter]);

    const erpCount = useMemo(() => {
        return projects.filter((p) => {
            const names = (p.technologies || []).map((t) => t.name.toLowerCase());
            const title = (p.title || '').toLowerCase();
            const desc = (p.description || '').toLowerCase();
            return (
                names.includes('odoo') ||
                names.includes('python') ||
                title.includes('erp') ||
                desc.includes('erp') ||
                desc.includes('odoo')
            );
        }).length;
    }, [projects]);

    const webCount = useMemo(() => {
        return projects.filter((p) => {
            const names = (p.technologies || []).map((t) => t.name.toLowerCase());
            return (
                names.includes('laravel') ||
                names.includes('react') ||
                names.includes('flutter') ||
                names.includes('inertia.js')
            );
        }).length;
    }, [projects]);

    return (
        <>
            <Head title="Arsip Portofolio — Asmin" />

            <div className="min-h-screen bg-background text-foreground antialiased selection:bg-olive selection:text-white dark:selection:bg-olive-light dark:selection:text-black">
                <FloatingHeader />

                {/* Hero / Header Section */}
                <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 border-b border-border">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            <span>Kembali ke Beranda</span>
                        </Link>

                        <div className="max-w-4xl">
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                                Arsip Lengkap
                            </span>
                            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-foreground leading-[1.05]">
                                Seluruh Proyek &amp; Sistem
                            </h1>
                            <p className="mt-6 font-sans text-base sm:text-lg text-muted-foreground font-light max-w-2xl leading-relaxed">
                                Dokumentasi komprehensif implementasi modul ERP enterprise,
                                arsitektur basis data, dan aplikasi web modern yang dibangun
                                untuk menyelesaikan tantangan operasional bisnis.
                            </p>
                        </div>

                        {/* Category Filter Tabs */}
                        <div className="mt-12 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
                            <button
                                onClick={() => setActiveFilter('all')}
                                className={`px-4 py-2 rounded-full border transition-all ${
                                    activeFilter === 'all'
                                        ? 'bg-foreground text-background border-foreground font-medium'
                                        : 'border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40'
                                }`}
                            >
                                Semua ({projects.length})
                            </button>
                            <button
                                onClick={() => setActiveFilter('erp')}
                                className={`px-4 py-2 rounded-full border transition-all ${
                                    activeFilter === 'erp'
                                        ? 'bg-foreground text-background border-foreground font-medium'
                                        : 'border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40'
                                }`}
                            >
                                Odoo &amp; ERP ({erpCount})
                            </button>
                            <button
                                onClick={() => setActiveFilter('web')}
                                className={`px-4 py-2 rounded-full border transition-all ${
                                    activeFilter === 'web'
                                        ? 'bg-foreground text-background border-foreground font-medium'
                                        : 'border-border/70 text-muted-foreground hover:text-foreground hover:border-foreground/40'
                                }`}
                            >
                                Web &amp; Mobile ({webCount})
                            </button>
                        </div>
                    </div>
                </section>

                {/* Projects Showcase Grid */}
                <section className="py-16 sm:py-24">
                    <div className="max-w-6xl mx-auto px-5 sm:px-8">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16"
                            >
                                {filteredProjects.map((project, idx) => {
                                    const indexStr = (idx + 1).toString().padStart(2, '0');
                                    const stackString = project.technologies?.map((t) => t.name).join(' · ');

                                    return (
                                        <motion.article
                                            layout
                                            key={project.id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.98 }}
                                            transition={{ duration: 0.4 }}
                                            className="group flex flex-col justify-between"
                                        >
                                            {/* Preview Frame */}
                                            <div>
                                                <Link
                                                    href={`/portfolio/${project.slug}`}
                                                    className="block relative overflow-hidden rounded-sm bg-muted border border-border/70 group-hover:border-olive/50 dark:group-hover:border-olive-light/50 transition-colors aspect-[16/10]"
                                                >
                                                    {project.thumbnail ? (
                                                        <img
                                                            src={project.thumbnail}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-secondary/20 text-center">
                                                            <span className="font-serif text-2xl text-muted-foreground/50">
                                                                {project.title}
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-sm bg-background/85 backdrop-blur-sm text-[11px] font-mono text-gold dark:text-gold-light border border-border/60">
                                                        {indexStr}
                                                    </div>
                                                </Link>

                                                {/* Text Info */}
                                                <div className="mt-5">
                                                    <Link href={`/portfolio/${project.slug}`}>
                                                        <h3 className="font-serif text-2xl sm:text-3xl text-foreground group-hover:text-olive dark:group-hover:text-olive-light transition-colors leading-snug">
                                                            {project.title}
                                                        </h3>
                                                    </Link>

                                                    <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
                                                        {project.description}
                                                    </p>

                                                    {stackString && (
                                                        <p className="mt-3 text-xs font-mono text-muted-foreground/80 tracking-wide">
                                                            {stackString}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Links */}
                                            <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                                                <Link
                                                    href={`/portfolio/${project.slug}`}
                                                    className="inline-flex items-center gap-1.5 text-foreground hover:text-olive dark:hover:text-olive-light transition-colors font-medium"
                                                >
                                                    <span>Studi Kasus</span>
                                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                                </Link>

                                                <div className="flex items-center gap-4">
                                                    {project.demo_url && (
                                                        <a
                                                            href={project.demo_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                                                        >
                                                            <span>Demo</span>
                                                            <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                    {project.github_url && (
                                                        <a
                                                            href={project.github_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                                                        >
                                                            <span>Repo</span>
                                                            <Github className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </motion.div>
                        </AnimatePresence>

                        {filteredProjects.length === 0 && (
                            <div className="py-24 text-center">
                                <p className="font-serif text-2xl text-muted-foreground">
                                    Tidak ada proyek yang cocok dengan filter ini.
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
