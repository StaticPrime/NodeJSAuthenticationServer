import { Request, Response, NextFunction } from 'express'

import { logger } from 'helpers/logger'
import { ApiError, ReturnCode } from 'helpers/api-response'

export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, {stackTrace: err.stack})
    next(err)
}

export const errorResponder = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.header('Content-Type', 'applicaiton/json')

    const status = err.statusCode || ReturnCode.BAD_REQUEST
    res.status(status).send({ error: err.message})
}