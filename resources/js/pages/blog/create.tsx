import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
}

export default function BlogCreate({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        excerpt: '',
        content: '',
        featured_image: '',
        published_at: '',
        is_published: true,
        is_featured: false,
        reading_time: 5,
        categories: [] as number[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('blog.store'));
    };

    const handleCategoryChange = (categoryId: number, checked: boolean) => {
        if (checked) {
            setData('categories', [...data.categories, categoryId]);
        } else {
            setData('categories', data.categories.filter((id) => id !== categoryId));
        }
    };

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Tulis Artikel</h2>}>
            <Head title="Tulis Artikel Baru" />

            <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <Link href={route('blog.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Tulis Artikel Baru</h1>
                        <p className="text-sm text-muted-foreground">Buat artikel blog baru yang menarik untuk portofolio Anda.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                        <CardContent className="flex flex-col p-0.5">
                            <div className="px-3 py-1.5">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Konten Artikel</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">Isi detail utama dari artikel blog Anda.</p>
                            </div>
                            <div className="rounded-lg border bg-background p-4 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Judul Artikel</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Masukkan judul artikel"
                                        required
                                    />
                                    {errors.title && <p className="text-sm font-medium text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Kutipan / Ringkasan</Label>
                                    <Textarea
                                        id="excerpt"
                                        value={data.excerpt}
                                        onChange={(e) => setData('excerpt', e.target.value)}
                                        placeholder="Masukkan kutipan singkat artikel (ditampilkan pada daftar blog)"
                                        required
                                    />
                                    {errors.excerpt && <p className="text-sm font-medium text-red-500">{errors.excerpt}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Isi Lengkap Artikel</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Tulis seluruh konten artikel Anda di sini..."
                                        className="min-h-[300px]"
                                        required
                                    />
                                    {errors.content && <p className="text-sm font-medium text-red-500">{errors.content}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                            <CardContent className="flex flex-col p-0.5">
                                <div className="px-3 py-1.5">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Media & Publikasi</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Gambar utama dan waktu penerbitan.</p>
                                </div>
                                <div className="rounded-lg border bg-background p-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="featured_image">URL Gambar Utama</Label>
                                        <Input
                                            id="featured_image"
                                            type="text"
                                            value={data.featured_image}
                                            onChange={(e) => setData('featured_image', e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        {errors.featured_image && <p className="text-sm font-medium text-red-500">{errors.featured_image}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="published_at">Tanggal Terbit</Label>
                                        <Input
                                            id="published_at"
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                        />
                                        {errors.published_at && <p className="text-sm font-medium text-red-500">{errors.published_at}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="reading_time">Estimasi Waktu Baca (Menit)</Label>
                                        <Input
                                            id="reading_time"
                                            type="number"
                                            value={data.reading_time}
                                            onChange={(e) => setData('reading_time', parseInt(e.target.value) || 0)}
                                        />
                                        {errors.reading_time && <p className="text-sm font-medium text-red-500">{errors.reading_time}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                            <CardContent className="flex flex-col p-0.5">
                                <div className="px-3 py-1.5">
                                    <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kategori & Opsi</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Tandai artikel dan set status publikasinya.</p>
                                </div>
                                <div className="rounded-lg border bg-background p-4 space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-sm font-semibold">Kategori</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {categories.map((cat) => (
                                                <label
                                                    key={cat.id}
                                                    className="flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer select-none text-sm font-medium transition-colors"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                        checked={data.categories.includes(cat.id)}
                                                        onChange={(e) => handleCategoryChange(cat.id, e.target.checked)}
                                                    />
                                                    {cat.name}
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/20">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_featured">Artikel Unggulan</Label>
                                            <p className="text-xs text-muted-foreground">Tampilkan di halaman utama atau sorotan blog.</p>
                                        </div>
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border p-4 shadow-sm bg-muted/20">
                                        <div className="space-y-0.5">
                                            <Label htmlFor="is_published">Publikasikan Artikel</Label>
                                            <p className="text-xs text-muted-foreground">Artikel akan langsung terlihat di daftar blog publik.</p>
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

                    <div className="flex items-center justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('blog.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            <Save className="mr-2 h-4 w-4" /> {processing ? 'Menyimpan...' : 'Simpan Artikel'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
