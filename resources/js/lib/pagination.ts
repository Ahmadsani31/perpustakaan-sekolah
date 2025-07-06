export default function getPaginationRange(currentPage: number, totalPages: number, delta = 1): (number | '...')[] {
    const range: (number | '...')[] = [];
    let l: string = '';

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
            range.push(i);
        } else if (l !== '...') {
            range.push('...');
            l = '...';
        }
    }

    return range;
}
