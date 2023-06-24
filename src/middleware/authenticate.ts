import { Request, Response, NextFunction } from 'express'
import { includes } from 'lodash'

import { validateUserToken } from 'helpers/encrypt'
import { ApiError, ReturnCode } from 'helpers/api-response'
import { logger } from 'helpers/logger'

export default () => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const sentToken = includes(req.headers['authorization'], ' ') ? req.headers['authorization'].split(' ')[1] : req.headers['authorization']
        if (await validateUserToken(sentToken)) return next()

        next(new ApiError(ReturnCode.UNAUTHORIZED, 'Invalid Token'))
    } catch (ex) {
        logger.error(`Error in Authenticate: ${ex}`)
        next(new ApiError(ReturnCode.INTERNAL_ERROR, 'System Error'))
    }
}