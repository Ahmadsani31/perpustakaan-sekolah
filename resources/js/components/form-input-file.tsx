import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

type itemsProps = {
    id: string;
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string;
    required?: boolean;
    ref?: React.Ref<HTMLInputElement>;
};
export default function FormInputFile({ id, title, errors, onChange, required, ref }: itemsProps) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={id}>{title}</Label>
            <Input className="cursor-pointer" id={id} type="file" onChange={onChange} ref={ref} required={required} />
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
