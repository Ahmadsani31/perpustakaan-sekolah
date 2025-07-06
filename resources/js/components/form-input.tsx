import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Label } from './ui/label';
type itemsProps = {
    id: string;
    title: string;
    value?: any;
    placeholder?: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string;
    required?: boolean;
    disabled?: boolean;
};
export default function FormInput({ id, title, value, errors, placeholder, type, onChange, required, disabled }: itemsProps) {
    let autoComplete = '';
    switch (type) {
        case 'password':
            autoComplete = 'current-password';
            break;
        case 'email':
            autoComplete = 'email';
            break;
        default:
            autoComplete = '';
            break;
    }
    return (
        <div className="grid w-full items-center">
            <Label htmlFor={id} className="mb-2">
                {title}
            </Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value !== undefined ? String(value) : ''}
                onChange={onChange}
                autoComplete={autoComplete}
                className={cn(errors ? 'border-red-500' : '')}
                required={required}
                min={0}
                disabled={disabled}
            />
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
