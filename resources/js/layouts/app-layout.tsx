import Banner from '@/components/banner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function ({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const dataProps = usePage().props;

    const flash = dataProps.flash_message as { type: string; message: string };
    // if (flash.type != null && !flash.message != null) {

    //     if (flash.type == 'success') toast.success(flash.message);
    //     if (flash.type == 'error') toast.error(flash.message);
    // }

    useEffect(() => {
        if (flash?.type && flash?.message) {
            if (flash.type === 'success') toast.success(flash.message);
            if (flash.type === 'error') toast.error(flash.message);
        }
    }, [flash]);

    const notice = dataProps.notice as { is_active: number; message: string; url?: string } | undefined;

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
