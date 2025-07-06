import Select from 'react-select';
import { Label } from './ui/label';

type OptionType = {
    value: string;
    label: string;
};

type itemsProps = {
    id: string;
    title: string;
    value?: string[]; // Change to array for multi
    placeholder: string;
    dataValue: OptionType[];
    onValueChange: (value: string[]) => void; // Change to array for multi
    errors?: string;
    required?: boolean;
};

export default function ReactSelectMulti({ id, title, dataValue, value = [], errors, placeholder, onValueChange, required }: itemsProps) {
    return (
        <div className="grid w-full items-center">
            <Label htmlFor={id} className="mb-2">
                {title}
            </Label>
            <Select
                isMulti
                value={dataValue.filter((e) => value.includes(e.value))}
                options={dataValue}
                placeholder={placeholder}
                onChange={(selected) => onValueChange(Array.isArray(selected) ? selected.map((item) => item.value) : [])}
                isClearable
                isSearchable
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
