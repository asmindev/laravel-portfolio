import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { PageProps } from '@/types';
import { usePage, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ModeToggle } from '@/components/mode-toggle';

interface AdminLayoutProps {
    children: React.ReactNode;
    header?: React.ReactNode;
}

export default function AdminLayout({ children, header }: AdminLayoutProps) {
    const { props } = usePage<PageProps>();

    useEffect(() => {
        const flash = props.flash;

        if (flash.content) {
            toast[flash.type ?? 'message'](flash.content);
        }
    }, [props.flash]);

    let breadcrumbTitle = 'Overview';
    let breadcrumbParent = '';
    let parentUrl = '';

    if (route().current('projects.*')) {
        breadcrumbParent = 'Projects';
        parentUrl = route('projects.index');
        
        if (route().current('projects.index')) {
            breadcrumbTitle = 'Daftar Proyek';
        } else if (route().current('projects.create')) {
            breadcrumbTitle = 'Tambah Proyek';
        } else if (route().current('projects.edit')) {
            breadcrumbTitle = 'Edit Proyek';
        }
    } else if (route().current('blog.*')) {
        breadcrumbParent = 'Blog Posts';
        parentUrl = route('blog.index');
        
        if (route().current('blog.index')) {
            breadcrumbTitle = 'Daftar Artikel';
        } else if (route().current('blog.create')) {
            breadcrumbTitle = 'Tulis Artikel';
        } else if (route().current('blog.edit')) {
            breadcrumbTitle = 'Edit Artikel';
        }
    } else if (route().current('profile.edit')) {
        breadcrumbTitle = 'Profil';
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 bg-background">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={route('dashboard')}>Dashboard</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbParent && (
                                    <>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            <BreadcrumbLink asChild>
                                                <Link href={parentUrl}>{breadcrumbParent}</Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </>
                                )}
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{breadcrumbTitle}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <ModeToggle />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
