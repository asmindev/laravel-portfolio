import { GalleryVerticalEnd, LayoutDashboard, Settings, Briefcase, BookOpen, LogOut, ChevronsUpDown, Award } from 'lucide-react';
import * as React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
    SidebarFooter,
} from '@/components/ui/sidebar';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface NavItem {
    title: string;
    url: string;
    icon?: React.ComponentType;
    isActive: boolean;
    items?: {
        title: string;
        url: string;
        isActive: boolean;
    }[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const navMain: NavItem[] = [
        {
            title: 'Dashboard',
            url: route('dashboard'),
            icon: LayoutDashboard,
            isActive: route().current('dashboard'),
        },
        {
            title: 'Projects',
            url: route('projects.index'),
            icon: Briefcase,
            isActive: route().current('projects.*'),
        },
        {
            title: 'Blog Posts',
            url: route('blog.index'),
            icon: BookOpen,
            isActive: route().current('blog.*'),
        },
        {
            title: 'Certificates',
            url: route('certificates.index'),
            icon: Award,
            isActive: route().current('certificates.*'),
        },
        {
            title: 'Profile',
            url: route('profile.edit'),
            icon: Settings,
            isActive: route().current('profile.edit'),
        },
    ];

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    return (
        <Sidebar {...props} collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <GalleryVerticalEnd className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold">Asmin Portofolio</span>
                                    <span className="text-xs text-muted-foreground">Panel Admin</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild tooltip={item.title} isActive={item.isActive}>
                                    <Link href={item.url} className="font-medium">
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                                    <Link href={subItem.url}>{subItem.title}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        {user.avatar ? (
                                            <AvatarImage src={user.avatar as string} alt={user.name} />
                                        ) : (
                                            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} />
                                        )}
                                        <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{user.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            {user.avatar ? (
                                                <AvatarImage src={user.avatar as string} alt={user.name} />
                                            ) : (
                                                <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} />
                                            )}
                                            <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{user.name}</span>
                                            <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={route('profile.edit')} className="w-full cursor-pointer flex items-center">
                                        <Settings className="mr-2 h-4 w-4" />
                                        Pengaturan Profil
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href={route('logout')} method="post" as="button" className="w-full text-left cursor-pointer flex items-center">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Keluar (Logout)
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
