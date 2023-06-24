import { Application, Request, Response } from 'express'

import { ApiError, ReturnCode } from 'helpers/api-response'
import { authRouter } from 'routes/auth'
import { registerRouter } from 'routes/register'

export default (app: Application) => {
    app.use('/auth', authRouter)
    app.use('/register', registerRouter)

    // Set the invalid route
    app.use('*', (req: Request, res: Response) => {
        throw new ApiError(ReturnCode.NOT_FOUND, 'Not Found')
    })
}