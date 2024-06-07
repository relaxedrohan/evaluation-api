export function validatePaginationParams(page: any, pageSize: any) {
    if (isNaN(page) || isNaN(pageSize) || +page <= 0 || +pageSize <= 0) {
        throw new Error('Invalid page or pageSize parameters.')
    }
}

export function validateSortParams(sortBy: string, sortOrder: string) {
    const allowedSortByValues = ['created_at', 'first_name', 'last_name', 'email', 'phone']
    const allowedSortOrderValues = ['asc', 'desc']

    if (
        !allowedSortByValues.includes(sortBy.toLowerCase()) ||
        !allowedSortOrderValues.includes(sortOrder.toLowerCase())
    ) {
        throw new Error('Invalid sortBy or sortOrder parameters.')
    }
}
