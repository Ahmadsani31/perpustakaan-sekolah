import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const { state } = useSidebar();

    return (
        <>
            {items.map((item, index) => (
                <SidebarGroup className="px-2 py-0" key={index}>
                    {state == 'expanded' && (
                        <SidebarGroupLabel>
                            <h3 className='font-light'>{item.header}</h3>
                        </SidebarGroupLabel>
                    )}
                    <SidebarMenu>
                        {item.menu.map((itemMenu, index) => (
                            <SidebarMenuItem key={index}>
                                <SidebarMenuButton asChild isActive={page.url.startsWith(itemMenu.href)} tooltip={{ children: itemMenu.title }}>
                                    <Link href={itemMenu.href} prefetch>
                                        {itemMenu.icon && <itemMenu.icon />}
                                        <span>{itemMenu.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}

        </>

    );
}
