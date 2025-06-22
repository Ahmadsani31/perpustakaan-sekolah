import { useCallback, useEffect } from 'react';
import pkg from 'lodash';
import { router } from '@inertiajs/react';

export default function useFilter({ route, values, only, wait = 300 }: any) {
    console.log('====================================');
    console.log(values);
    console.log('====================================');
    const { debounce, pickBy } = pkg
    const reload = useCallback(
        debounce((query: any) => {
            router.get(route, pickBy(query), {
                only: only,
                preserveScroll: true,
                preserveState: true
            })
        }, wait), []);

    useEffect(() => reload(values), [values, reload]);

    return { values }
}
