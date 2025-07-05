import Banner from '@/components/banner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function ({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const notice = usePage().props.notice as { is_active: number; message: string; url?: string } | undefined;

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            {notice && notice.is_active == 1 && <Banner message={notice.message} url={notice.url} />}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                stacked
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </AppLayoutTemplate>
    );
}
