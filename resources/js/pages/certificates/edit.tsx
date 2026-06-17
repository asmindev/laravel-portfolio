import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    image_url: string | null;
    order: number;
}

interface Props {
    certificate: Certificate;
}

export default function CertificatesEdit({ certificate }: Props) {
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return '';
        return dateStr.split('T')[0];
    };

    const { data, setData, put, processing, errors } = useForm({
        title: certificate.title || '',
        issuer: certificate.issuer || '',
        issue_date: formatDate(certificate.issue_date),
        expiry_date: formatDate(certificate.expiry_date),
        credential_id: certificate.credential_id || '',
        credential_url: certificate.credential_url || '',
        image_url: certificate.image_url || '',
        order: certificate.order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('certificates.update', certificate.id));
    };

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Edit Sertifikat</h2>}>
            <Head title={`Edit Sertifikat - ${certificate.title}`} />

            <div className="flex flex-col gap-6 w-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <Link href={route('certificates.index')}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Edit Sertifikat</h1>
                            <p className="text-sm text-muted-foreground">Perbarui rincian sertifikasi "{certificate.title}".</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                        <CardContent className="flex flex-col p-0.5">
                            <div className="px-3 py-1.5">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Informasi Utama</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">Detail dasar tentang sertifikasi Anda.</p>
                            </div>
                            <div className="rounded-lg border bg-background p-4 space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Judul Sertifikat</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Contoh: Sertifikasi Teknis Odoo 17"
                                            required
                                        />
                                        {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="issuer">Lembaga Penerbit (Issuer)</Label>
                                        <Input
                                            id="issuer"
                                            value={data.issuer}
                                            onChange={(e) => setData('issuer', e.target.value)}
                                            placeholder="Contoh: Odoo S.A."
                                            required
                                        />
                                        {errors.issuer && <p className="text-xs text-destructive">{errors.issuer}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="issue_date">Tanggal Terbit</Label>
                                        <Input
                                            id="issue_date"
                                            type="date"
                                            value={data.issue_date}
                                            onChange={(e) => setData('issue_date', e.target.value)}
                                            required
                                        />
                                        {errors.issue_date && <p className="text-xs text-destructive">{errors.issue_date}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="expiry_date">Tanggal Kedaluwarsa</Label>
                                        <Input
                                            id="expiry_date"
                                            type="date"
                                            value={data.expiry_date}
                                            onChange={(e) => setData('expiry_date', e.target.value)}
                                            placeholder="Kosongkan jika seumur hidup"
                                        />
                                        {errors.expiry_date && <p className="text-xs text-destructive">{errors.expiry_date}</p>}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden bg-muted p-0 shadow-none border-none">
                        <CardContent className="flex flex-col p-0.5">
                            <div className="px-3 py-1.5">
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kredensial & Tautan</h4>
                                <p className="text-xs text-muted-foreground mt-0.5">Informasi verifikasi kredensial sertifikat.</p>
                            </div>
                            <div className="rounded-lg border bg-background p-4 space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="credential_id">ID Kredensial</Label>
                                        <Input
                                            id="credential_id"
                                            value={data.credential_id}
                                            onChange={(e) => setData('credential_id', e.target.value)}
                                            placeholder="Masukkan ID Kredensial"
                                        />
                                        {errors.credential_id && <p className="text-xs text-destructive">{errors.credential_id}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="credential_url">URL Kredensial (Verifikasi)</Label>
                                        <Input
                                            id="credential_url"
                                            type="url"
                                            value={data.credential_url}
                                            onChange={(e) => setData('credential_url', e.target.value)}
                                            placeholder="https://example.com/verify/..."
                                        />
                                        {errors.credential_url && <p className="text-xs text-destructive">{errors.credential_url}</p>}
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="image_url">URL Gambar / Logo Sertifikat</Label>
                                        <Input
                                            id="image_url"
                                            value={data.image_url}
                                            onChange={(e) => setData('image_url', e.target.value)}
                                            placeholder="https://example.com/logo.png"
                                        />
                                        {errors.image_url && <p className="text-xs text-destructive">{errors.image_url}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="order">Urutan Tampilan</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                        />
                                        {errors.order && <p className="text-xs text-destructive">{errors.order}</p>}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" asChild>
                            <Link href={route('certificates.index')}>Batal</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="gap-2">
                            <Save className="h-4 w-4" />
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
