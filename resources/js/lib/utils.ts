import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function flashMessage(params: any) {
    return params.props.flash_message;
}

export function formatToRupiah(amount: any) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
}

export const message = {
    503: {
        title: 'Service Unavailable',
        description: 'Sorry, we are doing some maintenance. Please check back soon',
        status: '503',
    },
    500: {
        title: 'Server Error',
        description: 'Oops, something went wrong on our server',
        status: '500',
    },
    404: {
        title: 'Not Found',
        description: 'Sorry, the page you are looking for could not be found',
        status: '404',
    },
    403: {
        title: 'Forbidden',
        description: 'Sorry, you are forbidden from a accessing this page',
        status: '403',
    },
    401: {
        title: 'Unauthorized',
        description: 'Sorry, you are unauthorized to access this page',
        status: '401',
    },
    429: {
        title: 'Too Many Request',
        description: 'please try again in just a second',
        status: '429',
    },
};

export const FINEPAYMENTSTATUS = {
    PENDING: 'Tertunda',
    SUCCESS: 'Sukses',
    FAILED: 'Gagal',
};
