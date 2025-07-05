import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type itemsProps = {
    id: string;
    title: string;
    value?: string;
    placeholder: string;
    dataValue: number[];
    onValueChange: (value: string) => void;
    errors?: string;
    required?: boolean;
};

export default function FormSelectTahun({ id, title, dataValue, value, errors, placeholder, onValueChange, required }: itemsProps) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={id}>{title}</Label>
            <Select defaultValue={value?.toString()} onValueChange={onValueChange} required={required}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder}>{/* {value?.toString()} */}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {dataValue.map((year, index) => (
                        <SelectItem key={index} value={year.toString()}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
