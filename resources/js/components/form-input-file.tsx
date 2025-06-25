import { Input } from './ui/input'
import { Label } from './ui/label'
import { useRef } from 'react'
import React from 'react';

type itemsProps = {
    id: string
    title: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    errors?: string
    required?: boolean
    ref?: React.Ref<HTMLInputElement>
}
export default function FormInputFile({ id, title, errors, onChange, required, ref }: itemsProps) {
    return (
        <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor={id}>{title}</Label>
            <Input
                className='cursor-pointer'
                id={id}
                type="file"
                onChange={onChange}
                ref={ref}
                required={required}
            />
            {errors && (
                <p className="text-sm m-0 text-red-500">{errors}</p>
            )}
        </div>
    )
}