import AdminLayout from '@/layouts/admin-layout';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, BookOpen, Mail, ArrowRight, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VisitorStats {
    today: number;
    this_month: number;
}

interface Props {
    projectsCount: number;
    postsCount: number;
    messagesCount: number;
    visitorStats: VisitorStats;
}

export default function Dashboard({ projectsCount, postsCount, messagesCount, visitorStats }: Props) {
    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Dashboard</h2>}>
            <Head title="Dashboard Overview" />

            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Selamat Datang Kembali!</h1>
                    <p className="text-muted-foreground">Berikut adalah ringkasan status portofolio Anda hari ini.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Visitor Card */}
                    <Card className="overflow-hidden border-none bg-muted p-0 shadow-none">
                        <CardContent className="flex w-full flex-col items-center p-0">
                            <div className="w-full p-1">
                                <div className="rounded-lg bg-card p-4">
                                    <p className="font-mono text-xs text-muted-foreground/80 uppercase">Pengunjung Hari Ini</p>
                                    <h3 className="font-mono text-2xl text-muted-foreground">{visitorStats.today.toLocaleString('id-ID')}</h3>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between px-3 py-2">
                                <p className="text-xs text-muted-foreground">Bulan ini</p>
                                <p className="font-mono text-xs font-semibold">{visitorStats.this_month.toLocaleString('id-ID')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Projects Card */}
                    <Card className="overflow-hidden border-none bg-muted p-0 shadow-none">
                        <CardContent className="flex w-full flex-col items-center p-0">
                            <div className="w-full p-1">
                                <div className="rounded-lg bg-card p-4">
                                    <p className="font-mono text-xs text-muted-foreground/80 uppercase">Proyek Portofolio</p>
                                    <h3 className="font-mono text-2xl text-muted-foreground">{projectsCount.toLocaleString('id-ID')}</h3>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between px-3 py-2">
                                <p className="text-xs text-muted-foreground">Total proyek</p>
                                <p className="font-mono text-xs font-semibold">{projectsCount.toLocaleString('id-ID')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Blog Card */}
                    <Card className="overflow-hidden border-none bg-muted p-0 shadow-none">
                        <CardContent className="flex w-full flex-col items-center p-0">
                            <div className="w-full p-1">
                                <div className="rounded-lg bg-card p-4">
                                    <p className="font-mono text-xs text-muted-foreground/80 uppercase">Artikel Blog</p>
                                    <h3 className="font-mono text-2xl text-muted-foreground">{postsCount.toLocaleString('id-ID')}</h3>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between px-3 py-2">
                                <p className="text-xs text-muted-foreground">Total tulisan</p>
                                <p className="font-mono text-xs font-semibold">{postsCount.toLocaleString('id-ID')}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Messages Card */}
                    <Card className="overflow-hidden border-none bg-muted p-0 shadow-none">
                        <CardContent className="flex w-full flex-col items-center p-0">
                            <div className="w-full p-1">
                                <div className="rounded-lg bg-card p-4">
                                    <p className="font-mono text-xs text-muted-foreground/80 uppercase">Pesan Masuk</p>
                                    <h3 className="font-mono text-2xl text-muted-foreground">{messagesCount.toLocaleString('id-ID')}</h3>
                                </div>
                            </div>
                            <div className="flex w-full items-center justify-between px-3 py-2">
                                <p className="text-xs text-muted-foreground">Total pesan</p>
                                <p className="font-mono text-xs font-semibold">{messagesCount.toLocaleString('id-ID')}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold leading-none tracking-tight">Akses Cepat</h3>
                            <p className="text-sm text-muted-foreground mt-1.5 mb-4">Kelola konten portofolio Anda dengan mudah.</p>
                            <div className="grid gap-2">
                                <Button variant="outline" className="w-full justify-between" asChild>
                                    <Link href={route('projects.index')}>
                                        <span className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                                            Kelola Proyek Portofolio
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full justify-between" asChild>
                                    <Link href={route('blog.index')}>
                                        <span className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                                            Kelola Artikel Blog
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full justify-between" asChild>
                                    <Link href={route('profile.edit')}>
                                        <span className="flex items-center gap-2">
                                            <User className="h-4 w-4 text-muted-foreground" />
                                            Edit Informasi Profil
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-6">
                            <h3 className="text-lg font-semibold leading-none tracking-tight">Tips Portofolio</h3>
                            <p className="text-sm text-muted-foreground mt-1.5 mb-4">Cara membuat portofolio Anda lebih menarik.</p>
                            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                                <p>
                                    🌟 <strong>Selalu perbarui profil Anda:</strong> Pastikan deskripsi diri, riwayat pendidikan, dan pengalaman kerja Anda adalah yang terbaru.
                                </p>
                                <p>
                                    💻 <strong>Tunjukkan proyek unggulan:</strong> Tandai proyek terbaik Anda sebagai proyek <em>unggulan (featured)</em> agar tampil menonjol di halaman depan.
                                </p>
                                <p>
                                    ✍️ <strong>Bagikan pemikiran di Blog:</strong> Menulis artikel teknis secara rutin dapat meningkatkan visibilitas dan membuktikan kompetensi Anda kepada calon klien/perekrut.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
