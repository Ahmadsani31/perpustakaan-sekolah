import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
type itemsProps = {
    title: string
    id: string
    value?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    errors?: string
    required?: boolean
}
export default function FormTextarea({ id, title, value, errors, placeholder, onChange, required }: itemsProps) {

    return (
        <div className='grid w-full items-center gap-1.5'>
            <Label htmlFor={id}>
                {title}
            </Label>
            <Textarea
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={cn(errors ? "border-red-500" : "")}
                required={required}
            />
            {errors && (
                <p className="text-sm m-0 text-red-500">{errors}</p>
            )}
        </div>
    )
}