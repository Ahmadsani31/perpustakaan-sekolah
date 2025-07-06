import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, SettingsIcon } from 'lucide-react';

import FormInput from '@/components/form-input';
import { flashMessage } from '@/lib/utils';
import { FormEventHandler, useRef } from 'react';
import { toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Category',
        href: '#',
    },
];

interface propsPage {
    page_settings: {
        title: string;
        subtitle: string;
        method: string;
        action: string;
    };
    fine_setting: {
        late_fee_per_day: number;
        damage_fee_percentage: number;
        lost_fee_percentage: number;
    };
}

type PropsForm = {
    late_fee_per_day: number;
    damage_fee_percentage: number;
    lost_fee_percentage: number;
    _method: string;
};

export default function Create({ page_settings, fine_setting }: propsPage) {
    const fileInputCover = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, reset, errors, processing } = useForm<Required<PropsForm>>({
        late_fee_per_day: fine_setting?.late_fee_per_day ?? 0,
        damage_fee_percentage: fine_setting?.damage_fee_percentage ?? 0,
        lost_fee_percentage: fine_setting?.lost_fee_percentage ?? 0,
        _method: page_settings.method,
    });

    const onHandleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(page_settings.action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash.type == 'success') toast.success(flash.message);
                if (flash.type == 'error') toast.error(flash.message);
            },
        });
    };

    const onHandleReset = () => {
        reset();
        if (fileInputCover.current) {
            fileInputCover.current.value = '';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Category" />
            <div className="flex w-full flex-col px-4 py-2 pb-32">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 md:flex-row md:items-center">
                    <HeaderTitle title={page_settings.title} subtitle={page_settings.subtitle} icon={SettingsIcon} />
                </div>
                <Card>
                    <CardContent>
                        <form onSubmit={onHandleSubmit} className="space-y-6">
                            <FormInput
                                id="late_fee_per_day"
                                title="Denda Keterlambatan"
                                type="number"
                                value={data.late_fee_per_day}
                                onChange={(e) => setData('late_fee_per_day', Number(e.target.value))}
                                errors={errors.late_fee_per_day}
                            />
                            <FormInput
                                id="damage_fee_percentage"
                                title="Denda Kerusakan"
                                type="number"
                                value={data.damage_fee_percentage}
                                onChange={(e) => setData('damage_fee_percentage', Number(e.target.value))}
                                errors={errors.damage_fee_percentage}
                            />
                            <FormInput
                                id="lost_fee_percentage"
                                title="Denda Hilang"
                                type="number"
                                value={data.lost_fee_percentage}
                                onChange={(e) => setData('lost_fee_percentage', Number(e.target.value))}
                                errors={errors.lost_fee_percentage}
                            />

                            <div className="flex justify-end gap-x-2">
                                <Button type="button" variant={'outline'} size={'lg'} onClick={onHandleReset}>
                                    Reset
                                </Button>
                                <Button type="submit" variant={'default'} size={'lg'} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

// Index.layout = (page: any) => <AppLayout children={page} title={page.props.page_settings.title} />
