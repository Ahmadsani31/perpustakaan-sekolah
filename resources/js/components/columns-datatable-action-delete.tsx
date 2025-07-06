import { Button } from '@/components/ui/button';
import { flashMessage } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { LoaderCircle, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from './ui/alert-dialog';

export default function ColumnsDatatableActionDelete({ url }: { url: string }) {
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);

    const handleDetele = () => {
        setProcessing(true);
        router.delete(url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                // const flash = flashMessage(success);
                // if (flash.type == 'success') toast.success(flash.message);
                // if (flash.type == 'error') toast.error(flash.message);
                setProcessing(false);
                setDialogOpen(false);
            },
        });
    };
    return (
        <>
            <Button variant={'destructive'} size={'sm'} onClick={() => setDialogOpen(true)}>
                <TrashIcon />
            </Button>
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Apakah anda sudah yakin?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Tindakan ini dapat menghapus data secara permanent dan tidak bisa dibatalkan. "Yes", berarti kamu sudah yakin untuk
                            menghapus data secara permanent dari server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex justify-end gap-x-2">
                        <Button variant={'outline'} onClick={() => setDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant={'default'} onClick={handleDetele} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Yes, delete
                        </Button>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
