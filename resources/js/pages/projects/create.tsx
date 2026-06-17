import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Tag {
    id: number;
    name: string;
}

interface Technology {
    id: number;
    name: string;
}

interface Props {
    tags: Tag[];
    technologies: Technology[];
}

export default function ProjectsCreate({ tags, technologies }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        detailed_description: '',
        project_url: '',
        github_url: '',
        demo_url: '',
        start_date: '',
        end_date: '',
        status: 'completed',
        order: 0,
        is_featured: false,
        is_published: true,
        tags: [] as number[],
        technologies: [] as number[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('projects.store'));
    };

    const handleTagChange = (tagId: number, checked: boolean) => {
        if (checked) {
            setData('tags', [...data.tags, tagId]);
        } else {
            setData('tags', data.tags.filter((id) => id !== tagId));
        }
    };

    const handleTechChange = (techId: number, checked: boolean) => {
        if (checked) {
            setData('technologies', [...data.technologies, techId]);
        } else {
            setData('technologies', data.technologies.filter((id) => id !== techId));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Tambah Proyek</h2>}>
            <Head title="Tambah Proyek" />

            <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route('projects.index')}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight font-sans">Tambah Proyek Baru</h1>
                            <p className="text-sm text-muted-foreground">Isi formulir di bawah untuk menambahkan proyek portofolio baru.</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                        <CardContent className="flex flex-col p-0.5">
                            <div className="px-3 py-1.5">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Informasi Utama</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">Detail dasar proyek Anda.</p>
                            </div>
                            <div className="rounded-lg border bg-background p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Proyek</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Masukkan judul proyek"
                                        required
                                    />
                                    {errors.title && <p className="text-sm font-medium text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Deskripsi Singkat</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Masukkan ringkasan singkat proyek"
                                        required
                                    />
                                    {errors.description && <p className="text-sm font-medium text-red-500">{errors.description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="detailed_description">Deskripsi Lengkap / Konten</Label>
                                    <Textarea
                                        id="detailed_description"
                                        value={data.detailed_description}
                                        onChange={(e) => setData('detailed_description', e.target.value)}
                                        placeholder="Masukkan deskripsi mendalam atau konten detail proyek"
                                        className="min-h-[150px]"
                                    />
                                    {errors.detailed_description && <p className="text-sm font-medium text-red-500">{errors.detailed_description}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                            <CardContent className="flex flex-col p-0.5">
                                <div className="px-3 py-1.5">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Link & Tanggal</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Tautan eksternal dan durasi pengerjaan proyek.</p>
                                </div>
                                <div className="rounded-lg border bg-background p-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="project_url">URL Proyek</Label>
                                        <Input
                                            id="project_url"
                                            type="url"
                                            value={data.project_url}
                                            onChange={(e) => setData('project_url', e.target.value)}
                                            placeholder="https://example.com"
                                        />
                                        {errors.project_url && <p className="text-sm font-medium text-red-500">{errors.project_url}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="github_url">URL GitHub</Label>
                                        <Input
                                            id="github_url"
                                            type="url"
                                            value={data.github_url}
                                            onChange={(e) => setData('github_url', e.target.value)}
                                            placeholder="https://github.com/username/project"
                                        />
                                        {errors.github_url && <p className="text-sm font-medium text-red-500">{errors.github_url}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="demo_url">URL Demo</Label>
                                        <Input
                                            id="demo_url"
                                            type="url"
                                            value={data.demo_url}
                                            onChange={(e) => setData('demo_url', e.target.value)}
                                            placeholder="https://demo.example.com"
                                        />
                                        {errors.demo_url && <p className="text-sm font-medium text-red-500">{errors.demo_url}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="start_date">Tanggal Mulai</Label>
                                            <Input
                                                id="start_date"
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                            />
                                            {errors.start_date && <p className="text-sm font-medium text-red-500">{errors.start_date}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="end_date">Tanggal Selesai</Label>
                                            <Input
                                                id="end_date"
                                                type="date"
                                                value={data.end_date}
                                                onChange={(e) => setData('end_date', e.target.value)}
                                            />
                                            {errors.end_date && <p className="text-sm font-medium text-red-500">{errors.end_date}</p>}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                            <CardContent className="flex flex-col p-0.5">
                                <div className="px-3 py-1.5">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Status & Konfigurasi</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Atur status tampilan dan opsi lainnya.</p>
                                </div>
                                <div className="rounded-lg border bg-background p-4 space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status Pengerjaan</Label>
                                        <select
                                            id="status"
                                            value={data.status}
                                            onChange={(e) => setData('status', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <option value="completed">Selesai (Completed)</option>
                                            <option value="ongoing">Sedang Berjalan (Ongoing)</option>
                                        </select>
                                        {errors.status && <p className="text-sm font-medium text-red-500">{errors.status}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="order">Urutan Tampilan</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        />
                                        {errors.order && <p className="text-sm font-medium text-red-500">{errors.order}</p>}
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/20">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_featured">Proyek Unggulan</Label>
                                            <p className="text-xs text-muted-foreground">Tampilkan proyek ini di bagian atas portofolio Anda.</p>
                                        </div>
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/20">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_published">Publikasikan Proyek</Label>
                                            <p className="text-xs text-muted-foreground">Proyek akan langsung dapat dilihat secara publik.</p>
                                        </div>
                                        <Switch
                                            id="is_published"
                                            checked={data.is_published}
                                            onCheckedChange={(checked) => setData('is_published', checked)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                        <CardContent className="flex flex-col p-0.5">
                            <div className="px-3 py-1.5">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Teknologi & Tag</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">Pilih teknologi dan tag yang digunakan dalam proyek ini.</p>
                            </div>
                            <div className="rounded-lg border bg-background p-4 space-y-6">
                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Teknologi</Label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {technologies.map((tech) => (
                                            <label
                                                key={tech.id}
                                                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer select-none text-sm font-medium transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                    checked={data.technologies.includes(tech.id)}
                                                    onChange={(e) => handleTechChange(tech.id, e.target.checked)}
                                                />
                                                {tech.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3 border-t pt-6">
                                    <Label className="text-sm font-semibold">Tag Kategori</Label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                        {tags.map((tag) => (
                                            <label
                                                key={tag.id}
                                                className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer select-none text-sm font-medium transition-colors"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                    checked={data.tags.includes(tag.id)}
                                                    onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                                                />
                                                {tag.name}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('projects.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> {processing ? 'Menyimpan...' : 'Simpan Proyek'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
