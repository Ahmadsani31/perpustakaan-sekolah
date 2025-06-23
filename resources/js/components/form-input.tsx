import { cn } from '@/lib/utils'
import { Input } from './ui/input'
import { Label } from './ui/label'
type itemsProps = {
    id: string
    title: string
    value?: string
    placeholder: string
    type: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    errors?: string
    required?: boolean
}
export default function FormInput({ id, title, value, errors, placeholder, type, onChange, required }: itemsProps) {
    let autoComplete = "";
    switch (type) {
        case "password":
            autoComplete = "current-password";
            break;
        case "email":
            autoComplete = "email";
            break;
        default:
            autoComplete = "";
            break;
    }
    return (
        <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor={id}>
                {title}
            </Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={cn(errors ? "border-red-500" : "")}
                required={required}
            />
            {errors && (
                <p className="text-sm m-0 text-red-500">{errors}</p>
            )}
        </div>
    )
}