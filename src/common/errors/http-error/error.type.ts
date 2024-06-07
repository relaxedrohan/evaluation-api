export interface ErrorResponse {
    status: number
    error: string
}

// Custom error interface with additional properties
export interface CustomError extends Error {
    code: string
    meta?: {
        target?: string[] // Property to store the names of the columns that failed the constraint
    }
}

export interface ErrorResponse {
    status: number
    error: string
}
