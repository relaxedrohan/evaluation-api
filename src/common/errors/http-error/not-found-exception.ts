export class NotFoundError extends Error {
    status: number

    constructor(message: string = 'Not Found') {
        super(message)
        this.name = 'NotFoundError'
        this.status = 404

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    toJSON() {
        return {
            status: this.status,
            error: this.message,
        }
    }
}
