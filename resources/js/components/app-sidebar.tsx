import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, CookieIcon, BookIcon, HouseIcon, CassetteTapeIcon, LucideIcon, SettingsIcon, User2, User2Icon, InfoIcon } from 'lucide-react';
import AppLogo from './app-logo';



const mainNavItems: NavItem[] = [
    {
        header: 'Dashboard',
        menu: [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: CookieIcon,
            }
        ]
    },
    {
        header: 'Master',
        menu: [
            {
                title: "Catagory",
                href: "/admin/categories",
                icon: CassetteTapeIcon,
            },
            {
                title: "Penerbit",
                href: "/admin/publishers",
                icon: HouseIcon,
            },
            {
                title: "Buku",
                href: '/admin/books',
                icon: BookIcon,
            },
            {
                title: "Pengguna",
                href: "/admin/users",
                icon: User2Icon,
            },
            {
                title: "Pengaturan Denda",
                href: "/admin/fine-settings/create",
                icon: SettingsIcon,
            }
        ],
    },
    {
        header: 'Transaksi',
        menu: [
            {
                title: "Peminjaman",
                href: "/admin/loans",
                icon: CassetteTapeIcon,
            },
            {
                title: "Pengembalian",
                href: "/admin/return-books",
                icon: CassetteTapeIcon,
            }
        ],
    },
    {
        header: 'Lainya',
        menu: [
            {
                title: "Pengumuman",
                href: "/admin/announcements",
                icon: InfoIcon,
            }
        ],
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                {/* <hr /> */}
                {/* <NavUser /> */}
            </SidebarFooter>
        </Sidebar>
    );
}
