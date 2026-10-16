import { FloatingHeader } from '@/pages/home/components/floating-header';
import { Footer } from '@/pages/home/components/footer';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Calendar, ExternalLink, Github } from 'lucide-react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

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

interface ProjectImage {
    id: number;
    image_url: string;
    caption: string | null;
    order: number;
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
    start_date: string | null;
    end_date: string | null;
    status: string;
    is_featured: boolean;
    tags: Tag[];
    technologies: Technology[];
    images: ProjectImage[];
}

interface Props {
    project: Project;
}

function normalizeContent(content: string): string {
    return content
        .replace(/\\n/g, '\n')
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n');
}

export default function PortfolioShow({ project }: Props) {
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString('id-ID', {
            month: 'short',
            year: 'numeric',
        });

    const content = project.content ? normalizeContent(project.content) : '';

    return (
        <>
            <Head title={`${project.title} — Asmin`} />

            <div className="min-h-screen bg-background text-foreground antialiased selection:bg-olive selection:text-white dark:selection:bg-olive-light dark:selection:text-black">
                <FloatingHeader />

                {/* Hero / Header */}
                <article className="pt-32 sm:pt-40 pb-16 sm:pb-24">
                    <div className="max-w-4xl mx-auto px-5 sm:px-8">
                        {/* Back link */}
                        <Link
                            href={route('portfolio.index')}
                            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-8 group"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            <span>Semua Proyek</span>
                        </Link>

                        {/* Title & Metadata */}
                        <div>
                            <span className="text-xs font-mono text-gold dark:text-gold-light uppercase tracking-widest block mb-2">
                                Studi Kasus
                            </span>
                            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-foreground leading-[1.08]">
                                {project.title}
                            </h1>

                            <p className="mt-6 font-sans text-base sm:text-lg text-muted-foreground font-light leading-relaxed">
                                {project.detailed_description || project.description}
                            </p>
                        </div>

                        {/* Metadata Bar */}
                        <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-6 text-xs font-mono">
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                                {project.start_date && (
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>
                                            {formatDate(project.start_date)}
                                            {project.end_date ? ` — ${formatDate(project.end_date)}` : ' — Sekarang'}
                                        </span>
                                    </div>
                                )}
                                <span>
                                    Status: <span className="text-foreground">{project.status === 'completed' ? 'Selesai' : 'Sedang Berjalan'}</span>
                                </span>
                            </div>

                            {/* Direct External Action Buttons */}
                            <div className="flex items-center gap-4 uppercase tracking-wider">
                                {project.demo_url && (
                                    <a
                                        href={project.demo_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-foreground hover:text-olive dark:hover:text-olive-light transition-colors font-medium underline underline-offset-4 decoration-border"
                                    >
                                        <span>Demo Langsung</span>
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                                {project.github_url && (
                                    <a
                                        href={project.github_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <span>Source Code</span>
                                        <Github className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Technologies Tags */}
                        {project.technologies && project.technologies.length > 0 && (
                            <div className="mt-6 pt-4 border-t border-border/30 flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span
                                        key={tech.id}
                                        className="px-3 py-1 rounded-sm text-xs font-mono border border-border/60 bg-secondary/30 text-foreground"
                                    >
                                        {tech.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Main Thumbnail Showcase */}
                        {project.thumbnail && (
                            <div className="mt-12 overflow-hidden rounded-sm border border-border/70 bg-muted aspect-[16/10]">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                        )}

                        {/* Markdown Content / Architectural Details */}
                        {content && (
                            <div className="mt-16 pt-12 border-t border-border/50">
                                <Markdown
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h2({ children }) {
                                            return (
                                                <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-normal mt-12 mb-4 pb-2 border-b border-border/40">
                                                    {children}
                                                </h2>
                                            );
                                        },
                                        h3({ children }) {
                                            return (
                                                <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal mt-8 mb-3">
                                                    {children}
                                                </h3>
                                            );
                                        },
                                        p({ children }) {
                                            return (
                                                <p className="font-sans text-[15px] sm:text-base leading-relaxed text-muted-foreground font-light mb-5">
                                                    {children}
                                                </p>
                                            );
                                        },
                                        ul({ children }) {
                                            return (
                                                <ul className="space-y-2 mb-6 font-sans text-sm text-muted-foreground font-light leading-relaxed pl-1">
                                                    {children}
                                                </ul>
                                            );
                                        },
                                        li({ children }) {
                                            return (
                                                <li className="flex items-start gap-2.5">
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-olive dark:bg-olive-light" />
                                                    <span className="flex-1">{children}</span>
                                                </li>
                                            );
                                        },
                                        code({ className, children }) {
                                            const isBlock = className?.includes('language-');
                                            if (isBlock) {
                                                return (
                                                    <div className="my-5 overflow-hidden rounded-sm border border-border/60 bg-secondary/30">
                                                        <pre className="overflow-x-auto p-4 text-xs font-mono text-foreground leading-relaxed">
                                                            <code>{children}</code>
                                                        </pre>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <code className="px-1.5 py-0.5 rounded-sm bg-secondary/60 text-xs font-mono text-foreground">
                                                    {children}
                                                </code>
                                            );
                                        },
                                        blockquote({ children }) {
                                            return (
                                                <blockquote className="my-6 pl-4 border-l-2 border-olive dark:border-olive-light font-serif italic text-lg text-foreground/80">
                                                    {children}
                                                </blockquote>
                                            );
                                        },
                                    }}
                                >
                                    {content}
                                </Markdown>
                            </div>
                        )}

                        {/* Project Images Gallery */}
                        {project.images && project.images.length > 0 && (
                            <div className="mt-16 pt-12 border-t border-border/50">
                                <h3 className="font-serif text-2xl text-foreground mb-6">
                                    Dokumentasi Visual
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {project.images.map((img) => (
                                        <div
                                            key={img.id}
                                            className="overflow-hidden rounded-sm border border-border/60 bg-muted"
                                        >
                                            <img
                                                src={img.image_url}
                                                alt={img.caption || project.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            {img.caption && (
                                                <p className="p-3 text-xs font-mono text-muted-foreground border-t border-border/30">
                                                    {img.caption}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Bottom Back Button */}
                        <div className="mt-16 pt-10 border-t border-border/40 flex justify-between items-center">
                            <Link
                                href={route('portfolio.index')}
                                className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                                <span>Kembali ke Katalog Proyek</span>
                            </Link>

                            <Link
                                href="/"
                                className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Beranda ↗
                            </Link>
                        </div>
                    </div>
                </article>

                <Footer />
            </div>
        </>
    );
}
