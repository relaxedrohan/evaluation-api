import { ErrorResponse } from './error.type'

export function handleServiceError(error: any): ErrorResponse {
    // Handle general service errors
    return {
        status: 500,
        error: error.message || 'Internal server error.',
    }
}
