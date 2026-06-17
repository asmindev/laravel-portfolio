import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, MoreHorizontal, Search, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    issue_date: string;
    expiry_date: string | null;
    credential_id: string | null;
    credential_url: string | null;
    image_url: string | null;
}

interface PaginatedCertificates {
    data: Certificate[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    current_page: number;
    last_page: number;
    from: number | null;
}

interface Props {
    certificates: PaginatedCertificates;
}

const columnHelper = createColumnHelper<Certificate>();

export default function CertificatesIndex({ certificates }: Props) {
    const [deleteTarget, setDeleteTarget] = useState<Certificate | null>(null);
    const [search, setSearch] = useState('');

    const from = certificates.from ?? 1;

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('certificates.destroy', deleteTarget.id), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    const filteredCertificates = certificates.data.filter((certificate) => {
        return certificate.title.toLowerCase().includes(search.toLowerCase()) ||
            certificate.issuer.toLowerCase().includes(search.toLowerCase());
    });

    const columns = [
        columnHelper.display({
            id: 'index',
            header: '#',
            cell: ({ row }) => <span className="text-xs text-muted-foreground">{from + row.index}</span>,
        }),
        columnHelper.display({
            id: 'title',
            header: 'Sertifikat',
            cell: ({ row }) => {
                const cert = row.original;
                return (
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Award size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-medium text-sm">{cert.title}</span>
                            <span className="text-xs text-muted-foreground">{cert.issuer}</span>
                        </div>
                    </div>
                );
            },
        }),
        columnHelper.accessor('issue_date', {
            header: 'Tanggal Terbit',
            cell: ({ getValue }) => (
                <span className="text-muted-foreground text-sm">
                    {new Date(getValue()).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                    })}
                </span>
            ),
        }),
        columnHelper.accessor('expiry_date', {
            header: 'Tanggal Kedaluwarsa',
            cell: ({ getValue }) => {
                const val = getValue();
                return (
                    <span className="text-muted-foreground text-sm font-normal">
                        {val ? (
                            new Date(val).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })
                        ) : (
                            <span className="text-xs italic text-muted-foreground/80">Seumur Hidup</span>
                        )}
                    </span>
                );
            },
        }),
        columnHelper.accessor('credential_id', {
            header: 'ID Kredensial',
            cell: ({ getValue }) => {
                const val = getValue();
                return val ? (
                    <span className="text-xs font-mono text-muted-foreground">{val}</span>
                ) : (
                    <span className="text-xs text-muted-foreground/50">-</span>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: filteredCertificates,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Kelola Sertifikat</h2>}>
            <Head title="Kelola Sertifikat" />

            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Sertifikat & Lisensi</h1>
                    <p className="text-sm text-muted-foreground">Kelola kredensial profesional, sertifikat, dan penghargaan Anda.</p>
                </div>

                <Card className="overflow-hidden bg-muted p-0 shadow-none">
                    <CardContent className="flex flex-col p-0.5">
                        {/* Filters */}
                        <div className="flex flex-col items-center justify-between gap-3 px-3 py-1 sm:flex-row">
                            <div className="flex-1">
                                <h4 className="text-sm uppercase">Daftar Sertifikat</h4>
                            </div>
                            <div className="flex w-fit items-center gap-4">
                                <form onSubmit={(e) => e.preventDefault()} className="flex flex-1 items-center">
                                    <div className="relative w-full max-w-xs">
                                        <Search
                                            size={16}
                                            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                                        />
                                        <Input
                                            className="h-8 py-1 pr-4 pl-9 text-xs"
                                            placeholder="Cari sertifikat..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <div className="flex gap-2">
                                    <Button size="sm" className="h-8 px-3 text-xs" asChild>
                                        <Link href={route('certificates.create')}>
                                            <Plus className="mr-1.5 h-3.5 w-3.5" />
                                            Tambah Sertifikat
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="rounded-lg border bg-background">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => (
                                                <TableHead
                                                    key={header.id}
                                                    className={
                                                        header.column.id === 'index'
                                                            ? 'w-12 text-center'
                                                            : header.column.id === 'expiry_date'
                                                                ? 'hidden sm:table-cell'
                                                                : header.column.id === 'credential_id'
                                                                    ? 'hidden md:table-cell'
                                                                    : ''
                                                    }
                                                >
                                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                </TableHead>
                                            ))}
                                            <TableHead className="w-16 px-2 text-right">Aksi</TableHead>
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={columns.length + 1} className="py-8 text-center text-muted-foreground">
                                                Belum ada sertifikat yang ditambahkan.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        table.getRowModel().rows.map((row) => {
                                            const cert = row.original;
                                            return (
                                                <TableRow key={row.id} className="group">
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className={
                                                                cell.column.id === 'index'
                                                                    ? 'py-2 text-center'
                                                                    : cell.column.id === 'expiry_date'
                                                                        ? 'hidden py-2 sm:table-cell'
                                                                        : cell.column.id === 'credential_id'
                                                                            ? 'hidden py-2 md:table-cell'
                                                                            : 'py-2'
                                                            }
                                                        >
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    ))}
                                                    <TableCell className="w-16 px-2 py-2 text-right">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                 <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                     <MoreHorizontal className="h-4 w-4" />
                                                                 </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-36">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={route('certificates.edit', cert.id)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => setDeleteTarget(cert)}
                                                                    className="text-destructive focus:text-destructive"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Hapus
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {certificates.last_page > 1 && (
                            <div className="flex items-center justify-center gap-1 py-3 bg-muted/20 border-t">
                                {certificates.links.map((link, i) => {
                                    if (!link.url) return null;
                                    return (
                                        <Link
                                            key={i}
                                            href={link.url}
                                            className={`px-3 py-1 text-xs rounded border transition-colors ${
                                                link.active
                                                    ? 'bg-primary text-primary-foreground border-primary font-medium'
                                                    : 'bg-background hover:bg-muted text-muted-foreground border-input'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Sertifikat?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Sertifikat "{deleteTarget?.title}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
}
