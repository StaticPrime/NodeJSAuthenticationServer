import express, { Application, Request, Response } from 'express'
import { isEmpty } from 'lodash'

import { SuccessResponse, ApiError, ReturnCode } from 'helpers/api-response'
import isAuthenticated from 'middleware/authenticate'
import validator from 'middleware/validator'
import asyncHandler from 'middleware/async-handler'
import { findUser } from 'models/user'
import { AuthUserRequest } from 'api-schema/auth'
import { LoginUserRequest, LoginUserResponse } from 'api-schema/login'
import { createUserToken, decryptUserToken, validatePassword } from 'helpers/encrypt'
import { deleteRedisKeysByQuery } from 'cache'

const authRouter: Application = express();

authRouter.post('/login', validator((new LoginUserRequest).schema, 'body'), asyncHandler(async (req: Request, res: Response) => {
    const existingUser = await findUser(req.body.email)

    if (isEmpty(existingUser)) throw new ApiError(ReturnCode.BAD_REQUEST, 'User does not exist')
    if (validatePassword(req.body.password, existingUser.password) === false) throw new ApiError(ReturnCode.BAD_REQUEST, 'Invalid email or password')

    const authToken = await createUserToken(existingUser.id)
    if (isEmpty(authToken)) throw new ApiError(ReturnCode.INTERNAL_ERROR, 'Unable to generate token')

    const sanitizedResponse = (new LoginUserResponse).sanatize({ token: authToken })
    new SuccessResponse('Login Successful', sanitizedResponse).send(res)
}))

authRouter.post('/logout', validator((new AuthUserRequest).schema, 'headers'), isAuthenticated(), asyncHandler(async (req: Request, res: Response) => {
    const usersToken = req.headers['authorization'].split(' ')[1]
    const decryptInfo = decryptUserToken(usersToken)

    if (!isEmpty(decryptInfo)) deleteRedisKeysByQuery(`user_${decryptInfo['id'].toString()}_token_*`)
    new SuccessResponse('Logout Successful', {}).send(res)
}))

authRouter.get('/verify', validator((new AuthUserRequest).schema, 'headers'), isAuthenticated(), asyncHandler(async (req: Request, res: Response) => {
    new SuccessResponse('Authentication Successful', {}).send(res);
}))

export { authRouter }
