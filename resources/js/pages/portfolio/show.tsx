import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FloatingHeader } from '@/pages/home/components/floating-header';
import { Footer } from '@/pages/home/components/footer';
import { ExternalLinkIcon, fadeInUp } from '@/pages/home/components/shared';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, FileCode2 } from 'lucide-react';
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
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

    const content = project.content ? normalizeContent(project.content) : '';

    return (
        <>
            <Head title={project.title}>
                <meta name="description" content={project.description || undefined} />
            </Head>

            <div className="min-h-screen bg-background">
                <FloatingHeader />

                {/* Hero */}
                <section className="relative pt-32 pb-8">
                    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />

                    <div className="relative container mx-auto max-w-4xl px-4">
                        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-6">
                            <Link
                                href={route('portfolio.index')}
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Semua Proyek
                            </Link>

                            <div className="space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
                                    <span className="font-mono text-xs font-bold tracking-[0.3em] text-primary uppercase">Detail Proyek</span>
                                </motion.div>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <Badge
                                            key={tag.id}
                                            variant="secondary"
                                            className="bg-primary/5 text-primary border border-primary/10 text-[10px] uppercase tracking-wider"
                                        >
                                            {tag.name}
                                        </Badge>
                                    ))}
                                </div>

                                <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                                    {project.title}
                                </h1>

                                <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                                    {project.detailed_description || project.description}
                                </p>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                {project.start_date && (
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {formatDate(project.start_date)}
                                            {project.end_date && ` — ${formatDate(project.end_date)}`}
                                        </span>
                                    </div>
                                )}
                                <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                                    {project.status === 'completed' ? 'Selesai' : 'Sedang Berjalan'}
                                </Badge>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {project.project_url && (
                                    <Button asChild>
                                        <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                                            <ExternalLinkIcon className="mr-2 h-4 w-4" />
                                            Lihat Proyek
                                        </a>
                                    </Button>
                                )}
                                {project.github_url && (
                                    <Button variant="outline" asChild>
                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            Lihat Kode
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Thumbnail */}
                {project.thumbnail && (
                    <section className="pb-12">
                        <div className="container mx-auto max-w-4xl px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="overflow-hidden rounded-2xl border border-border/50"
                            >
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="h-auto w-full object-cover"
                                />
                            </motion.div>
                        </div>
                    </section>
                )}

                <Separator className="max-w-4xl mx-auto" />

                {/* Tech Stack */}
                <section className="py-10">
                    <div className="container mx-auto max-w-4xl px-4">
                        <div className="flex items-center gap-2 mb-3">
                            <FileCode2 className="h-4 w-4 text-primary" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Teknologi</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech.id}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary/50 px-3 py-1.5 text-sm font-medium text-muted-foreground border border-border/50"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                <Separator className="max-w-4xl mx-auto" />

                {/* Content - Narrative */}
                {content && (
                    <section className="py-12">
                        <div className="container mx-auto max-w-4xl px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Markdown
                                    rehypePlugins={[rehypeRaw]}
                                    components={{
                                        h2({ children }) {
                                            return (
                                                <h2 className="font-heading text-xl font-bold tracking-tight text-foreground mt-12 mb-4 pb-3 border-b border-border/50">
                                                    {children}
                                                </h2>
                                            );
                                        },
                                        h3({ children }) {
                                            return (
                                                <h3 className="font-heading text-base font-semibold text-foreground mt-8 mb-3">
                                                    {children}
                                                </h3>
                                            );
                                        },
                                        p({ children }) {
                                            return (
                                                <p className="text-[15px] leading-relaxed text-muted-foreground mb-4">
                                                    {children}
                                                </p>
                                            );
                                        },
                                        strong({ children }) {
                                            return (
                                                <strong className="font-semibold text-foreground">
                                                    {children}
                                                </strong>
                                            );
                                        },
                                        ul({ children }) {
                                            return (
                                                <ul className="space-y-2.5 mb-6 pl-1">
                                                    {children}
                                                </ul>
                                            );
                                        },
                                        ol({ children }) {
                                            return (
                                                <ol className="space-y-2.5 mb-6 pl-1 list-decimal list-inside">
                                                    {children}
                                                </ol>
                                            );
                                        },
                                        li({ children }) {
                                            return (
                                                <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted-foreground">
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                                                    <span>{children}</span>
                                                </li>
                                            );
                                        },
                                        code({ className, children }) {
                                            const isBlock = className?.includes('language-');
                                            if (isBlock) {
                                                return (
                                                    <div className="my-4 overflow-hidden rounded-xl border border-border/50 bg-muted/30">
                                                        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                                                            <code className="font-mono text-foreground/70">{children}</code>
                                                        </pre>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <code className="rounded-md bg-primary/8 px-1.5 py-0.5 text-[13px] font-mono text-primary font-medium">
                                                    {children}
                                                </code>
                                            );
                                        },
                                        pre({ children }) {
                                            return <>{children}</>;
                                        },
                                        blockquote({ children }) {
                                            return (
                                                <blockquote className="my-6 border-l-4 border-primary/30 bg-primary/5 py-3 pl-5 pr-4 rounded-r-xl text-[15px] text-muted-foreground">
                                                    {children}
                                                </blockquote>
                                            );
                                        },
                                        hr() {
                                            return <hr className="my-8 border-border/30" />;
                                        },
                                        table({ children }) {
                                            return (
                                                <div className="my-6 overflow-x-auto rounded-xl border border-border/50">
                                                    <table className="w-full text-sm">{children}</table>
                                                </div>
                                            );
                                        },
                                        thead({ children }) {
                                            return (
                                                <thead className="border-b border-border/50 bg-muted/30">
                                                    {children}
                                                </thead>
                                            );
                                        },
                                        th({ children }) {
                                            return (
                                                <th className="px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                                    {children}
                                                </th>
                                            );
                                        },
                                        td({ children }) {
                                            return (
                                                <td className="px-4 py-2.5 text-muted-foreground">{children}</td>
                                            );
                                        },
                                    }}
                                >
                                    {content}
                                </Markdown>
                            </motion.div>
                        </div>
                    </section>
                )}

                {/* Project Images Gallery */}
                {project.images && project.images.length > 0 && (
                    <section className="py-12">
                        <div className="container mx-auto max-w-4xl px-4">
                            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground mb-6">
                                Galeri
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                {project.images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="overflow-hidden rounded-xl border border-border/50"
                                    >
                                        <img
                                            src={image.image_url}
                                            alt={image.caption || project.title}
                                            className="h-48 w-full object-cover"
                                        />
                                        {image.caption && (
                                            <div className="p-3 text-sm text-muted-foreground">
                                                {image.caption}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Navigation */}
                <section className="py-12">
                    <div className="container mx-auto max-w-4xl px-4">
                        <Separator className="mb-12" />
                        <div className="flex items-center justify-between">
                            <Button variant="outline" asChild>
                                <Link href={route('portfolio.index')}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Semua Proyek
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
