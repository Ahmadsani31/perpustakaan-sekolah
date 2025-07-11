import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { NavUser } from './nav-user';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="flex h-18 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14 md:px-4">
            <div className="flex items-center">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className="absolute right-3">
                    <NavUser />
                </div>
            </div>
        </header>
    );
}
