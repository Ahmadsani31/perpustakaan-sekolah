import { Label } from './ui/label'
import Select from 'react-select'
type itemsProps = {
    id: string
    title: string
    value?: string
    placeholder: string
    onChange: (value: string) => void
    errors?: string
    required?: boolean
}

export default function ReactSelectTahun({ id, title, value, errors, placeholder, onChange, required }: itemsProps) {

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, index) => {
        const year = currentYear - index;
        return {
            value: year,
            label: String(year)
        };
    });

    return (
        <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor={id}>
                {title}
            </Label>
            <Select<{ value: number; label: string }>
                value={yearOptions.find(option => option.value.toString() === value)}
                options={yearOptions}
                placeholder={placeholder}
                onChange={(selected) => onChange(selected ? selected.value.toString() : '')}
                isClearable
                isSearchable
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: errors ? 'red' : 'gray',
                        fontSize: '14px',
                    }),
                }}
                required={required}
            />
            {errors && (
                <p className="text-sm m-0 text-red-500">{errors}</p>
            )}
        </div>
        // <div className='grid w-full items-center gap-1.5'>
        //     <Label htmlFor={id}>
        //         {title}
        //     </Label>
        //     <Select
        //         defaultValue={value?.toString()}
        //         onValueChange={onValueChange}
        //         required={required}
        //     >
        //         <SelectTrigger>
        //             <SelectValue placeholder={placeholder}>
        //                 {/* {value?.toString()} */}
        //             </SelectValue>
        //         </SelectTrigger>
        //         <SelectContent>
        //             {dataValue.map((year, index) => (
        //                 <SelectItem key={index} value={year.toString()}>
        //                     {year}
        //                 </SelectItem>
        //             ))}
        //         </SelectContent>
        //     </Select>
        //     {errors && (
        //         <p className="text-sm m-0 text-red-500">{errors}</p>
        //     )}
        // </div>

    )
}
