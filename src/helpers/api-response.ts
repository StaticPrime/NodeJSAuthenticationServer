import { Response } from 'express'

export enum ReturnCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
}

abstract class ApiResponse {
    constructor(protected message: string) { }

    protected prepare<T extends ApiResponse>(res: Response, payload: T, returnCode: number): Response {
        res.header('Content-Type', 'application/json')
        return res.status(returnCode).json(payload)
    }
}

export class SuccessResponse<T> extends ApiResponse {
    constructor(message: string, private data?: T) {
        super(message)
    }

    send(res: Response): Response {
        return super.prepare<SuccessResponse<T>>(res, this, ReturnCode.SUCCESS)
    }
}

export class ApiError extends Error {
    statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)
        this.name = Error.name
        this.statusCode = statusCode
    }
}