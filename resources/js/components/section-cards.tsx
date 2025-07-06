import { Card, CardAction, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';

import { ComponentType, createElement } from 'react';

export function SectionCards({ name, icon, value }: { name: string; icon: ComponentType; value: number }) {
    return (
        <Card className="@container/card">
            <CardHeader>
                <CardDescription>{name}</CardDescription>
                <CardAction>{icon && createElement(icon)}</CardAction>
            </CardHeader>
            <CardFooter className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{value}</CardFooter>
        </Card>
    );
}
