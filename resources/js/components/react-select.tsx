import Select from 'react-select';
import { Label } from './ui/label';
type itemsProps = {
    id: string;
    title: string;
    value?: string;
    placeholder: string;
    dataValue: any[];
    onValueChange: (value: string) => void;
    errors?: string;
    required?: boolean;
};

export default function ReactSelect({ id, title, dataValue, value, errors, placeholder, onValueChange, required }: itemsProps) {
    return (
        <div className="grid w-full items-center">
            <Label htmlFor={id} className="mb-2">
                {title}
            </Label>
            <Select
                defaultValue={dataValue.find((e) => e.value == value)}
                options={dataValue}
                placeholder={placeholder}
                onChange={(selected) => onValueChange(selected ? selected.value : '')}
                isClearable
                isSearchable
                required={required}
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: errors ? 'red' : 'gray',
                        fontSize: '14px',
                    }),
                }}
            />
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
