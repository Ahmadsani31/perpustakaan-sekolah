import { cva, VariantProps } from 'class-variance-authority';
import { CheckIcon, ChevronDown, WandSparkles, XCircle, XIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Option = {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
};

interface FormSelectMultiProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
    options: Option[];
    onValueChange: (values: string[]) => void;
    defaultValue?: string[];
    placeholder?: string;
    animation?: number;
    maxCount?: number;
    modalPopover?: boolean;
    asChild?: boolean;
}

const multiSelectVariants = cva('m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300', {
    variants: {
        variant: {
            default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
            secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            inverted: 'inverted',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export const FormSelectMulti = React.forwardRef<HTMLButtonElement, FormSelectMultiProps>(
    (
        {
            options,
            onValueChange,
            variant,
            defaultValue = [],
            placeholder = 'Select options',
            animation = 0,
            maxCount = 3,
            modalPopover = false,
            asChild = false,
            className,
            ...props
        },
        ref,
    ) => {
        const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
        const [isAnimating, setIsAnimating] = React.useState(false);

        const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                setIsPopoverOpen(true);
            } else if (event.key === 'Backspace' && !(event.currentTarget as HTMLInputElement).value) {
                const newSelectedValues = [...selectedValues];
                newSelectedValues.pop();
                setSelectedValues(newSelectedValues);
                onValueChange(newSelectedValues);
            }
        };

        const toggleOption = (option: string) => {
            const newSelectedValues = selectedValues.includes(option)
                ? selectedValues.filter((value) => value !== option)
                : [...selectedValues, option];
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        };

        const handleClear = () => {
            setSelectedValues([]);
            onValueChange([]);
        };

        const handleTogglePopover = () => {
            setIsPopoverOpen((prev) => !prev);
        };

        const clearExtraOptions = () => {
            const newSelectedValues = selectedValues.slice(0, maxCount);
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        };

        const toggleAll = () => {
            if (selectedValues.length === options.length) {
                handleClear();
            } else {
                const allValues = options.map((option) => option.value);
                setSelectedValues(allValues);
                onValueChange(allValues);
            }
        };

        return (
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        {...props}
                        onClick={handleTogglePopover}
                        variant="outline"
                        size={'select'}
                        className={cn('flex h-auto min-h-10 w-full items-center justify-between', className)}
                    >
                        {selectedValues.length > 0 ? (
                            <div className="flex w-full items-center justify-between">
                                <div className="flex flex-wrap items-center">
                                    {selectedValues.slice(0, maxCount).map((value) => {
                                        const option = options.find((o) => o.value === value);
                                        const IconComponent = option?.icon;
                                        return (
                                            <Badge
                                                key={value}
                                                className={cn(isAnimating ? 'animate-bounce' : '', multiSelectVariants({ variant }))}
                                                style={{ animationDuration: `${animation}s` }}
                                            >
                                                {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                                                {option?.label}
                                                <XCircle
                                                    className="ml-2 h-4 w-4 cursor-pointer"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        toggleOption(value);
                                                    }}
                                                />
                                            </Badge>
                                        );
                                    })}
                                    {selectedValues.length > maxCount && (
                                        <Badge
                                            className={cn(
                                                'border-foreground/1 bg-transparent text-foreground hover:bg-transparent',
                                                isAnimating ? 'animate-bounce' : '',
                                                multiSelectVariants({ variant }),
                                            )}
                                            style={{ animationDuration: `${animation}s` }}
                                        >
                                            {`+ ${selectedValues.length - maxCount} more`}
                                            <XCircle
                                                className="ml-2 h-4 w-4 cursor-pointer"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    clearExtraOptions();
                                                }}
                                            />
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center justify-between">
                                    <XIcon
                                        className="mx-2 h-4 cursor-pointer text-muted-foreground"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleClear();
                                        }}
                                    />
                                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                                    <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                                </div>
                            </div>
                        ) : (
                            <div className="mx-auto flex w-full items-center justify-between">
                                <span className="text-sm text-muted-foreground">{placeholder}</span>
                                <ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
                    <Command>
                        <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                                    <div
                                        className={cn(
                                            'mr-2 flex h-4 w-4 items-center justify-center rounded border border-primary',
                                            selectedValues.length === options.length ? 'bg-primary text-white' : 'opacity-50 [&_svg]:invisible',
                                        )}
                                    >
                                        <CheckIcon className="h-4 w-4" color="black" />
                                    </div>
                                    <span>(Select All)</span>
                                </CommandItem>
                                {options.map((option) => {
                                    const isSelected = selectedValues.includes(option.value);
                                    return (
                                        <CommandItem key={option.value} onSelect={() => toggleOption(option.value)} className="cursor-pointer">
                                            <div
                                                className={cn(
                                                    'mr-2 flex h-4 w-4 items-center justify-center rounded border border-primary',
                                                    isSelected ? 'bg-primary text-white' : 'opacity-50 [&_svg]:invisible',
                                                )}
                                            >
                                                <CheckIcon className="h-4 w-4" color="black" />
                                            </div>
                                            {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
                                            <span>{option.label}</span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="flex items-center justify-between">
                                    {selectedValues.length > 0 && (
                                        <>
                                            <CommandItem onSelect={handleClear} className="flex-1 cursor-pointer justify-center">
                                                Clear
                                            </CommandItem>
                                            <Separator orientation="vertical" className="flex h-full min-h-6" />
                                        </>
                                    )}
                                    <CommandItem onSelect={() => setIsPopoverOpen(false)} className="max-w-full flex-1 cursor-pointer justify-center">
                                        Close
                                    </CommandItem>
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
                {animation > 0 && selectedValues.length > 0 && (
                    <WandSparkles
                        className={cn('my-2 h-3 w-3 cursor-pointer bg-background text-foreground', isAnimating ? '' : 'text-muted-foreground')}
                        onClick={() => setIsAnimating(!isAnimating)}
                    />
                )}
            </Popover>
        );
    },
);

FormSelectMulti.displayName = 'FormSelectMulti';
