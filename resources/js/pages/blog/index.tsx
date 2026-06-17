import AdminLayout from '@/layouts/admin-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, MoreHorizontal, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    is_published: boolean;
    is_featured: boolean;
    views_count: number;
    created_at: string;
}

interface PaginatedPosts {
    data: BlogPost[];
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
    posts: PaginatedPosts;
}

const columnHelper = createColumnHelper<BlogPost>();

export default function BlogIndex({ posts }: Props) {
    const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const from = posts.from ?? 1;

    const handleDelete = () => {
        if (!deleteTarget) return;
        router.delete(route('blog.destroy', deleteTarget.id), {
            onFinish: () => setDeleteTarget(null),
        });
    };

    const filteredPosts = posts.data.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.slug.toLowerCase().includes(search.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' 
            ? true 
            : statusFilter === 'published' 
                ? post.is_published 
                : !post.is_published;

        return matchesSearch && matchesStatus;
    });

    const columns = [
        columnHelper.display({
            id: 'index',
            header: '#',
            cell: ({ row }) => <span className="text-xs text-muted-foreground">{from + row.index}</span>,
        }),
        columnHelper.display({
            id: 'title',
            header: 'Judul',
            cell: ({ row }) => {
                const post = row.original;
                return (
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">{post.title}</span>
                        <span className="text-xs text-muted-foreground font-mono">{post.slug}</span>
                    </div>
                );
            },
        }),
        columnHelper.accessor('is_published', {
            header: 'Status',
            cell: ({ getValue }) => (
                getValue() ? (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">Diterbitkan</Badge>
                ) : (
                    <Badge variant="outline">Draft</Badge>
                )
            ),
        }),
        columnHelper.accessor('is_featured', {
            header: 'Unggulan',
            cell: ({ getValue }) => (
                getValue() ? (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Ya</Badge>
                ) : (
                    <Badge variant="outline">Tidak</Badge>
                )
            ),
        }),
        columnHelper.accessor('views_count', {
            header: 'Dilihat',
            cell: ({ getValue }) => <span className="text-sm font-mono text-muted-foreground">{getValue()}x</span>,
        }),
        columnHelper.accessor('created_at', {
            header: 'Tanggal Dibuat',
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
    ];

    const table = useReactTable({
        data: filteredPosts,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">Kelola Blog</h2>}>
            <Head title="Kelola Blog" />

            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Artikel Blog</h1>
                    <p className="text-sm text-muted-foreground">Tulis, edit, dan publikasikan artikel portofolio Anda.</p>
                </div>

                <Card className="overflow-hidden bg-muted p-0 shadow-none">
                    <CardContent className="flex flex-col p-0.5">
                        {/* Filters */}
                        <div className="flex flex-col items-center justify-between gap-3 px-3 py-1 sm:flex-row">
                            <div className="flex-1">
                                <h4 className="text-sm uppercase">Daftar Artikel</h4>
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
                                            placeholder="Cari nama artikel..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                </form>
                                <div className="flex gap-2">
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="h-8 rounded-md border border-input bg-background px-3 py-1 text-xs text-muted-foreground shadow-xs outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    >
                                        <option value="all">Semua Status</option>
                                        <option value="published">Diterbitkan</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                    <Button size="sm" className="h-8 px-3 text-xs" asChild>
                                        <Link href={route('blog.create')}>
                                            <Plus className="mr-1.5 h-3.5 w-3.5" />
                                            Tulis Artikel
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
                                                            : header.column.id === 'is_featured' || header.column.id === 'views_count'
                                                                ? 'hidden sm:table-cell'
                                                                : header.column.id === 'created_at'
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
                                                Belum ada artikel blog yang ditambahkan.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        table.getRowModel().rows.map((row) => {
                                            const post = row.original;
                                            return (
                                                <TableRow key={row.id} className="group">
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell
                                                            key={cell.id}
                                                            className={
                                                                cell.column.id === 'index'
                                                                    ? 'py-2 text-center'
                                                                    : cell.column.id === 'is_featured' || cell.column.id === 'views_count'
                                                                        ? 'hidden py-2 sm:table-cell'
                                                                        : cell.column.id === 'created_at'
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
                                                                    <Link href={route('blog.edit', post.id)}>
                                                                        <Edit className="mr-2 h-4 w-4" />
                                                                        Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => setDeleteTarget(post)}
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

                        {/* Pagination inside CardContent */}
                        {posts.last_page > 1 && (
                            <div className="flex items-center justify-center gap-1 py-3 bg-muted/20 border-t">
                                {posts.links.map((link, i) => {
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
                        <AlertDialogTitle>Hapus Artikel?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Artikel "{deleteTarget?.title}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
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
