import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from './ui/label';

type itemsProps = {
    id: string;
    title: string;
    value?: string;
    placeholder: string;
    onSelect: (value: any) => void;
    errors?: string;
};

export default function FormDatePicker({ id, title, value, errors, placeholder, onSelect }: itemsProps) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>(undefined);
    return (
        <div className="flex flex-col gap-1.5">
            <Label htmlFor={id} className="px-1">
                {title}
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" id={id} size={'lg'} className="w-full justify-between rounded font-normal">
                        {value ? format(value, 'EE MMMM dd, yyyy') : placeholder}
                        <CalendarDays />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setOpen(false);
                            if (date) {
                                onSelect(format(date, 'yyyy-MM-dd'));
                            }
                        }}
                    />
                </PopoverContent>
            </Popover>
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
