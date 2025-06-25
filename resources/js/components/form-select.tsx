import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

type itemsProps = {
    id: string
    title: string
    value?: string
    placeholder: string
    dataValue: any[]
    onValueChange: (value: string) => void
    errors?: string
    required?: boolean
}

export default function FormSelect({ id, title, dataValue, value, errors, placeholder, onValueChange, required }: itemsProps) {

    return (
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
        //                 {/* {dataValue.find((d) => d.value === value) ?? placeholder} */}
        //                 {dataValue.find((d) => d.value === value)?.value ?? placeholder}
        //                 {/* {value} */}
        //             </SelectValue>
        //         </SelectTrigger>
        //         <SelectContent>
        //             {dataValue.map((data, index) => (
        //                 <SelectItem key={index} value={data.value}>
        //                     {data.name}
        //                 </SelectItem>
        //             ))}
        //         </SelectContent>
        //     </Select>
        //     {errors && (
        //         <p className="text-sm m-0 text-red-500">{errors}</p>
        //     )}
        // </div>
        <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor={id}>
                {title}
            </Label>
            <Select
                defaultValue={dataValue?.toString() ?? ''}
                onValueChange={onValueChange}
                required={required}
            >
                <SelectTrigger>
                    <SelectValue>
                        {dataValue.find((d) => d.value.toString() === value) ? dataValue.find((d) => d.value.toString() === value)?.name : placeholder}
                    </SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {dataValue.map((data, index) => (
                        <SelectItem key={index} value={data.value.toString()}>
                            {data.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors && (
                <p className="text-sm m-0 text-red-500">{errors}</p>
            )}
        </div>
    )
}
