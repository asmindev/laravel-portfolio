import AdminLayout from '@/layouts/admin-layout';
import { Head, useForm } from '@inertiajs/react';
import { Save, Upload, User as UserIcon, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef } from 'react';

interface Profile {
    id?: number;
    full_name: string;
    title: string | null;
    tagline: string | null;
    bio: string | null;
    profile_image: string | null;
    resume_url: string | null;
    location: string | null;
    phone: string | null;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Props {
    profile: Profile | null;
    user: User;
}

export default function ProfileEdit({ profile, user }: Props) {
    const [previewUrl, setPreviewUrl] = useState<string>(profile?.profile_image || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'PATCH', // Laravel method spoofing for PATCH request with files
        full_name: profile?.full_name || user.name || '',
        title: profile?.title || '',
        tagline: profile?.tagline || '',
        bio: profile?.bio || '',
        profile_image: (profile?.profile_image || '') as string | File | null,
        resume_url: (profile?.resume_url || '') as string | File | null,
        location: profile?.location || '',
        phone: profile?.phone || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('profile.update'));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('profile_image', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Pengaturan Profil</h2>}>
            <Head title="Pengaturan Profil" />

            <div className="w-full py-2">
                {/* Form Wrapper - Styled full white & premium */}
                <div className="bg-white dark:bg-card rounded-2xl border border-border/80 shadow-sm p-6 md:p-8">
                    {/* Header */}
                    <div className="border-b pb-6 mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground font-sans">Profil Portofolio</h1>
                        <p className="text-sm text-muted-foreground mt-1">Perbarui informasi personal Anda untuk ditampilkan pada halaman beranda portofolio.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Profil Utama (Avatar & Nama) */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
                            {/* Avatar Column */}
                            <div className="md:col-span-1 flex flex-col items-center gap-3">
                                <Label className="text-sm font-semibold text-foreground">Foto Profil</Label>
                                <div 
                                    className="relative group cursor-pointer h-32 w-32 rounded-full border border-border overflow-hidden bg-muted flex items-center justify-center transition-all hover:border-primary shadow-inner"
                                    onClick={triggerFileInput}
                                >
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Pratinjau Foto Profil" className="h-full w-full object-cover" />
                                    ) : (
                                        <UserIcon className="h-14 w-14 text-muted-foreground/60" />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                                        <Upload className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <Button type="button" variant="outline" size="sm" className="mt-1" onClick={triggerFileInput}>
                                    Pilih Foto
                                </Button>
                                <p className="text-[10px] text-center text-muted-foreground leading-normal max-w-[120px]">
                                    JPEG, PNG, JPG maksimal 2MB.
                                </p>
                                {errors.profile_image && (
                                    <p className="text-xs font-medium text-red-500 text-center">{errors.profile_image}</p>
                                )}
                            </div>

                            {/* Main Info Fields */}
                            <div className="md:col-span-3 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full_name" className="text-sm font-medium">Nama Lengkap</Label>
                                    <Input
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        placeholder="Masukkan nama lengkap Anda"
                                        className="h-10 bg-transparent"
                                        required
                                    />
                                    {errors.full_name && <p className="text-sm font-medium text-red-500">{errors.full_name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-sm font-medium">Jabatan / Pekerjaan (Title)</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Contoh: Odoo Developer & Fullstack Engineer"
                                        className="h-10 bg-transparent"
                                    />
                                    {errors.title && <p className="text-sm font-medium text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="tagline" className="text-sm font-medium">Tagline Utama</Label>
                                    <Input
                                        id="tagline"
                                        value={data.tagline}
                                        onChange={(e) => setData('tagline', e.target.value)}
                                        placeholder="Contoh: Membangun solusi ERP yang efisien dan aplikasi web modern"
                                        className="h-10 bg-transparent"
                                    />
                                    {errors.tagline && <p className="text-sm font-medium text-red-500">{errors.tagline}</p>}
                                </div>
                            </div>
                        </div>

                        <hr className="border-border/60" />

                        {/* Section 2: Deskripsi Diri */}
                        <div className="space-y-2">
                            <Label htmlFor="bio" className="text-sm font-medium">Tentang Saya (Bio)</Label>
                            <Textarea
                                id="bio"
                                value={data.bio}
                                onChange={(e) => setData('bio', e.target.value)}
                                placeholder="Tulis deskripsi detail diri Anda yang akan ditampilkan pada profil..."
                                className="min-h-[150px] bg-transparent leading-relaxed"
                            />
                            {errors.bio && <p className="text-sm font-medium text-red-500">{errors.bio}</p>}
                        </div>

                        <hr className="border-border/60" />

                        {/* Section 3: Detail Kontak & Resume */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-medium">Lokasi</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Contoh: Kendari, Indonesia"
                                    className="h-10 bg-transparent"
                                />
                                {errors.location && <p className="text-sm font-medium text-red-500">{errors.location}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="Contoh: +62 812-3456-7890"
                                    className="h-10 bg-transparent"
                                />
                                {errors.phone && <p className="text-sm font-medium text-red-500">{errors.phone}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="resume_url" className="text-sm font-medium">Berkas CV / Resume (PDF / DOCX)</Label>
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                <Input
                                    id="resume_url"
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setData('resume_url', file);
                                        }
                                    }}
                                    accept=".pdf,.doc,.docx"
                                    className="h-10 bg-transparent max-w-md cursor-pointer file:text-primary file:font-semibold"
                                />
                                {profile?.resume_url && (
                                    <a
                                        href={profile.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-primary hover:underline inline-flex items-center gap-1 font-semibold whitespace-nowrap self-center"
                                    >
                                        Lihat CV Saat Ini <ExternalLink className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                            {errors.resume_url && <p className="text-sm font-medium text-red-500">{errors.resume_url}</p>}
                            
                            {/* Small File Indicator */}
                            {profile?.resume_url && (
                                <div className="mt-3 flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-muted/30 max-w-md">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Berkas Aktif</p>
                                        <p className="text-sm font-semibold truncate text-foreground/90">
                                            {profile.resume_url.split('/').pop()}
                                        </p>
                                    </div>
                                    <a
                                        href={profile.resume_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-semibold whitespace-nowrap px-2 py-1 rounded bg-background border border-border shadow-2xs"
                                    >
                                        Lihat <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            )}
                        </div>

                        {/* Submit Button Row */}
                        <div className="flex items-center justify-end border-t pt-6 gap-3">
                            <Button type="submit" size="lg" className="px-6 font-semibold" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" /> {processing ? 'Menyimpan...' : 'Simpan Profil'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
