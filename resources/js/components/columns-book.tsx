import { flashMessage, formatToRupiah } from "@/lib/utils";
import { itemBook } from "@/types/book";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { LoaderCircle, PencilIcon, TrashIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export const ColumnsBook: ColumnDef<itemBook>[] = [
    {
        accessorKey: "book_code",
        header: "Kode Buku",
    },
    {
        accessorKey: "title",
        header: "Judul",
    },
    {
        accessorKey: "author",
        header: "Penulis",
    },
    {
        accessorKey: "stock.total",
        header: "Stok",
    },
    {
        accessorKey: "publication_year",
        header: "Tahun Terbit",
    },
    {
        accessorKey: "isbn",
        header: "ISBN",
    },
    {
        accessorKey: "language",
        header: "Bahasa",
    },
    {
        accessorKey: "number_of_pages",
        header: "Jumlah Halaman",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "price",
        header: "Harga",
        cell: ({ row }: any) => (formatToRupiah(row.original.price))
    },
    {
        accessorKey: "cover",
        header: "Cover",
        cell: ({ row }: any) => (
            <Avatar>
                <AvatarImage src={row.original.cover} />
                <AvatarFallback>{row.original.title.substring(0, 1)}</AvatarFallback>
            </Avatar>
        )
    },
    {
        accessorKey: "category.name",
        header: "Kategori",
    },
    {
        accessorKey: "publisher.name",
        header: "Penerbit",
    },
    {
        accessorKey: "created_at",
        header: "Dibuat Pada",
    },
    {
        id: "actions",
        header: () => (<span className='flex justify-center'> Aksi  </span>),
        cell: ({ row }: any) => {
            const [openDialog, setOpenDialog] = useState(false);
            const [loading, setLoading] = useState(false);

            const handleOnDelete = () => {
                setLoading(true);
                router.delete(
                    route('admin.books.destroy', [row.original]), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: (success) => {
                        const flash = flashMessage(success)
                        if (flash.type == 'success') {
                            setOpenDialog(false)
                            toast.success(flash.message)
                        };
                        if (flash.type == 'error') toast.error(flash.message);
                        setLoading(false);

                    }
                })
            }

            return (
                <div className='flex items-center justify-center gap-x-1'>

                    <Button variant={'default'} size={'sm'} asChild >
                        <Link href={route('admin.books.edit', row.original.id)}>
                            <PencilIcon />
                        </Link>
                    </Button>

                    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                        <AlertDialogTrigger asChild className='cursor-pointer'>
                            <Button variant={'destructive'} size={'sm'} >
                                <TrashIcon />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah anda sudah yakin?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Tindakan ini dapat menghapus data secara permanent dan tidak bisa dibatalkan. "Yes", berarti kamu sudah yakin untuk menghapus data secara permanent dari server.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <Button variant={'outline'} onClick={() => setOpenDialog(!openDialog)}>Cancel</Button>

                                <Button onClick={handleOnDelete} disabled={loading}>
                                    {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Yes, delete</Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    },
]
