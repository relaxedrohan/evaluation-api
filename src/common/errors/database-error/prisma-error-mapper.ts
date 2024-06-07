import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { CustomError, ErrorResponse } from '../http-error/error.type'

// Utility function to handle Prisma errors
export async function handlePrismaError(error: CustomError): Promise<ErrorResponse> {
    // Log the error for debugging purposes
    console.error('Prisma error:', error)

    // Check if it's a Prisma error
    if (error instanceof PrismaClientKnownRequestError) {
        // Handle Prisma errors separately
        switch (error.code) {
            case 'P2002': {
                // Unique constraint violation error
                const fields = error.meta && (error.meta.target as string[]).join(', ')
                return { status: 400, error: `Duplicate entry. ${fields} record already exists.` }
            }
            case 'P2025':
                // Invalid input value error
                return { status: 400, error: 'Invalid input value.' }
            case 'P2023':
                // Required value missing error
                return { status: 400, error: 'Required value missing.' }
            case 'P2014':
                // Record to connect not found error
                return { status: 400, error: 'Record to connect not found.' }

            case 'P2020':
                // Unique constraint failed error
                return { status: 400, error: 'Unique constraint failed.' }

            case 'P1010':
                // Query parsing error
                return { status: 400, error: 'Query parsing error.' }

            default:
                // Other Prisma errors
                return { status: 400, error: 'Prisma server error' }
        }
    }
    // Other errors
    return { status: 500, error: 'Internal server error' }
}
