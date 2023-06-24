import express, { Application, Request, Response } from 'express'
import { isEmpty } from 'lodash'

import { SuccessResponse, ApiError, ReturnCode } from 'helpers/api-response'
import { findUser, createUser } from 'models/user'
import validator from 'middleware/validator'
import asyncHandler from 'middleware/async-handler'
import { RegisterUserRequest, RegisterUserResponse } from 'api-schema/register'
import { createUserToken } from 'helpers/encrypt'

const registerRouter: Application = express()

registerRouter.post('/', validator((new RegisterUserRequest).schema, 'body'), asyncHandler(async (req: Request, res: Response) => {
    const existingUser = await findUser(req.body.email)
    if (!isEmpty(existingUser)) throw new ApiError(ReturnCode.BAD_REQUEST, 'User already registered')

    const newUserData = await createUser(req.body)
    if (isEmpty(newUserData)) throw new ApiError(ReturnCode.INTERNAL_ERROR, 'Unable to save new user')

    const accessToken = await createUserToken(newUserData.id)
    if (!isEmpty(newUserData)) newUserData['token'] = accessToken

    new SuccessResponse('Registration Successful', (new RegisterUserResponse).sanatize(newUserData)).send(res)
}))

export { registerRouter }